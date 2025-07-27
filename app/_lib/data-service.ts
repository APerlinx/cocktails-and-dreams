type CloudinaryMediaItem = {
  public_id: string
  filename: string
  resource_type?: string
  secure_url?: string
  context?: {
    [key: string]: string
  }
  [key: string]: any
}

type CloudinarySearchResponse = {
  resources: CloudinaryMediaItem[]
  next_cursor?: string
}

type GetCloudinaryMediaOptions = {
  folderName: string
  maxResults?: number // default to 100
  nextCursor?: string // used for infinite scroll
}

{
  /* Fetch media for gallery by chunks*/
}
export async function getCloudinaryMedia({
  folderName,
  maxResults = 100,
  nextCursor,
}: GetCloudinaryMediaOptions): Promise<CloudinarySearchResponse> {
  const expression = `folder="${folderName}"`

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/resources/search`,
    {
      method: 'POST',
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
      }),
    }
  )

  if (!res.ok) throw new Error('Failed to fetch Cloudinary media')

  return await res.json()
}

{
  /* Fetch media for about page and video for home page */
}
export async function getStaticMedia(folder: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/cloudinary?folder=${folder}`,
      { cache: 'no-store' }
    )

    if (!res.ok) throw new Error('Failed to fetch media')

    const { items } = await res.json()

    return items.map((item: any) => ({
      public_id: item.public_id,
      resource_type: item.resource_type,
      url: item.url,
      filename: item.filename,
      context: item.context || {},
    }))
  } catch (err) {
    console.error(`getStaticMedia(${folder}) failed:`, err)
    return []
  }
}

{
  /* Fetch media for stats once a week */
}
export async function getStaticMediaStats(folder: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/cloudinary?folder=${folder}`,
      { next: { revalidate: 60 * 60 * 24 * 7 } }
    )

    if (!res.ok) throw new Error('Failed to fetch media')

    const { items } = await res.json()

    const totalPhotos = items.filter(
      (item: any) => item.resource_type === 'image'
    ).length
    const totalVideos = items.filter(
      (item: any) => item.resource_type === 'video'
    ).length
    const totalEventTypes = new Set(
      items.map((item: any) => item.context?.event_type).filter(Boolean)
    ).size

    return {
      totalPhotos,
      totalVideos,
      totalEventTypes,
    }
  } catch (err) {
    console.error(`getStaticMediaStats(${folder}) failed:`, err)
    return {
      totalPhotos: 0,
      totalVideos: 0,
      totalEventTypes: 0,
    }
  }
}
