import { NextRequest, NextResponse } from 'next/server'
import { getCloudinaryMedia } from '../../_lib/data-service'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const folderName = searchParams.get('folder') || 'gallery'
  const maxResults = parseInt(searchParams.get('max') || '20', 10)
  const nextCursor = searchParams.get('nextCursor') || undefined

  try {
    const { resources, next_cursor } = await getCloudinaryMedia({
      folderName,
      maxResults,
      nextCursor,
    })

    return NextResponse.json({
      items: resources,
      nextCursor: next_cursor ?? null,
      hasMore: !!next_cursor,
    })
  } catch (error) {
    console.error('Cloudinary fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch media' },
      { status: 500 }
    )
  }
}
