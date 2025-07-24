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
}

export async function getCloudinaryMedia(
  folderName: string
): Promise<CloudinaryMediaItem[]> {
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/resources/search`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(
          process.env.CLOUDINARY_API_KEY +
            ':' +
            process.env.CLOUDINARY_API_SECRET
        ).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        expression: `folder="${folderName}"`,
        max_results: 100,
        with_field: 'context',
      }),
    }
  )

  if (!res.ok) throw new Error('Failed to fetch Cloudinary media')

  const data: CloudinarySearchResponse = await res.json()
  return data.resources
}
