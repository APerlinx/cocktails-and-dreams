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
