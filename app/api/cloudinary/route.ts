// app/api/cloudinary/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getCloudinaryMedia } from '../../_lib/data-service'
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
    mediaTypeParam === 'image' || mediaTypeParam === 'video'
      ? (mediaTypeParam as 'image' | 'video')
      : undefined

  const search = searchParams.get('search') || undefined

  try {
    const { resources, next_cursor } = await getCloudinaryMedia({
      folderName,
      maxResults,
      nextCursor,
      eventType,
      mediaType,
      year,
      search,
    })

    return NextResponse.json({
      items: resources ?? [],
      nextCursor: next_cursor ?? null,
      hasMore: Boolean(next_cursor),
    })
  } catch (error: any) {
    console.error('Cloudinary fetch error:', error?.message)
    return NextResponse.json(
      { error: 'Failed to fetch media' },
      { status: 502 }
    )
  }
}
