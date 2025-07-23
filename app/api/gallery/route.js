import { getCloudinaryMedia } from '../../_lib/data-service'

export async function GET(req) {
  const folderName = 'gallery'
  try {
    const media = await getCloudinaryMedia(folderName)
    return Response.json(media)
  } catch (error) {
    return new Response('Failed to fetch media', { status: 500 })
  }
}
