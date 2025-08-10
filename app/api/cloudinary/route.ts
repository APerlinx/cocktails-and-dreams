import { NextRequest, NextResponse } from 'next/server'
import { buildExpression } from '../../_lib/buildExpression'
import { MEDIA_TYPES } from '../../utils/security'

const MAX_RESULTS_MIN = 1
const MAX_RESULTS_MAX = 50

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const folderName = searchParams.get('folder') || 'gallery'
  const nextCursor = searchParams.get('nextCursor') || undefined

  const rawMax = parseInt(searchParams.get('max') || '20', 10)
  const maxResults = Math.min(
    Math.max(rawMax, MAX_RESULTS_MIN),
    MAX_RESULTS_MAX
  )

  const eventType = searchParams.get('eventType') || undefined
  const year = searchParams.get('year') || undefined

  const mediaTypeParam = searchParams.get('mediaType') || undefined
  const mediaType =
    mediaTypeParam && MEDIA_TYPES.has(mediaTypeParam as any)
      ? (mediaTypeParam as 'image' | 'video')
      : undefined

  const search = searchParams.get('search') || undefined

  const expression = buildExpression({
    folderName,
    eventType,
    year,
    mediaType,
    search,
  })

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/resources/search`,
      {
        method: 'POST',
        signal: controller.signal,
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`
          ).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          expression,
          max_results: maxResults,
          with_field: 'context',
          next_cursor: nextCursor,
          sort_by: [{ created_at: 'desc' }],
        }),
      }
    )

    clearTimeout(timeout)

    if (!res.ok) {
      const errText = await res.text()
      console.error('Cloudinary search failed', {
        status: res.status,
        expression,
        errText,
      })
      return NextResponse.json(
        { error: 'Cloudinary search failed' },
        { status: 502 }
      )
    }

    const data = await res.json()

    return NextResponse.json({
      items: data.resources ?? [],
      nextCursor: data.next_cursor ?? null,
      hasMore: Boolean(data.next_cursor),
    })
  } catch (err: any) {
    clearTimeout(timeout)
    console.error('Cloudinary search error', { expression, err: err?.message })
    return NextResponse.json({ error: 'Upstream error' }, { status: 502 })
  }
}
