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
  maxResults?: number
  nextCursor?: string
}

{
  /* Fetch media for gallery by chunks*/
}
export async function getCloudinaryMedia({
  folderName,
  maxResults = 20,
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
        sort_by: [{ created_at: 'desc' }],
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
          expression: `folder="${folder}"`,
          max_results: 100,
          with_field: 'context',
        }),
      }
    )

    if (!res.ok) throw new Error('Failed to fetch media')

    const { resources: items } = await res.json()

    return items.map((item: any) => ({
      public_id: item.public_id,
      resource_type: item.resource_type,
      url: item.secure_url,
      filename: item.filename,
      context: item.context || {},
    }))
  } catch (err) {
    console.error(`getStaticMedia(${folder}) failed:`, err)
    return []
  }
}

export async function getStaticMediaStats(folder: string) {
  try {
    const expression = `folder="${folder}"`
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const apiKey = process.env.CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_API_SECRET

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${apiKey}:${apiSecret}`
          ).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          expression,
          max_results: 500,
          with_field: 'context',
        }),
        next: { revalidate: 0 },
      }
    )

    if (!res.ok) throw new Error('Failed to fetch media stats')

    const { resources } = (await res.json()) as CloudinarySearchResponse

    const totalPhotos = resources.filter(
      (r) => r.resource_type === 'image'
    ).length
    const totalVideos = resources.filter(
      (r) => r.resource_type === 'video'
    ).length
    const totalEventTypes = new Set(
      resources.map((r) => r.context?.event_type).filter(Boolean)
    ).size
    const eventTypes = [
      ...new Set(
        resources
          .map((r) => r.context?.event_type)
          .filter((val): val is string => !!val)
      ),
    ]

    const years = [
      ...new Set(
        resources
          .map((r) => r.context?.year)
          .filter((val): val is string => !!val)
      ),
    ]

    return {
      totalPhotos,
      totalVideos,
      totalEventTypes,
      eventTypes: eventTypes ?? [],
      years: years ?? [],
    }
  } catch (err) {
    console.error(`getStaticMediaStats(${folder}) failed:`, err)
    return {
      totalPhotos: 0,
      totalVideos: 0,
      totalEventTypes: 0,
      eventTypes: [],
      years: [],
    }
  }
}
