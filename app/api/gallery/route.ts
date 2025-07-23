import { getCloudinaryMedia } from '../../_lib/data-service'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const folderName = 'gallery'
  try {
    const media = await getCloudinaryMedia(folderName)
    return Response.json(media)
  } catch (error) {
    return new Response('Failed to fetch media', { status: 500 })
  }
}
