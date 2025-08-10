import { sanitizeSearch } from '../utils/utils'

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
  eventType?: string
  mediaType?: string
  year?: string
  search?: string
}

{
  /* Fetch media for gallery by chunks*/
}
export async function getCloudinaryMedia({
  folderName,
  maxResults = 20,
  nextCursor,
  eventType,
  mediaType,
  year,
  search,
}: GetCloudinaryMediaOptions): Promise<CloudinarySearchResponse> {
  const clampedMax = Math.min(Math.max(maxResults, 1), 50)
  const mediaTypeSafe =
    mediaType === 'image' || mediaType === 'video' ? mediaType : undefined

  let expression = `folder="${folderName}"`

  if (eventType) expression += ` AND tags:${eventType}`
  if (mediaTypeSafe)
    expression = `resource_type:${mediaTypeSafe} AND ${expression}`
  if (year) expression += ` AND tags:${year}`

  if (search) {
    const safeSearch = sanitizeSearch(search)
    expression += ` AND (
      context.title:${safeSearch}*
      OR context.event_type:${safeSearch}*
      OR context.year:${safeSearch}*
    )`
  }

  console.log('Cloudinary Search Expression:', expression)

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10_000)

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
        max_results: clampedMax,
        with_field: 'context',
        next_cursor: nextCursor,
        sort_by: [{ created_at: 'desc' }],
      }),
    }
  ).catch((err) => {
    clearTimeout(timeout)
    console.error('Cloudinary fetch crashed:', err?.message)
    throw new Error('Failed to reach Cloudinary')
  })

  clearTimeout(timeout)

  if (!res.ok) {
    const errorText = await res.text()
    console.error('Cloudinary fetch error:', {
      status: res.status,
      expression,
      errorText,
    })
    throw new Error('Failed to fetch Cloudinary media')
  }

  return (await res.json()) as CloudinarySearchResponse
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
