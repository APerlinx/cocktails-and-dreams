export async function getCloudinaryMedia(folderName) {
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
      }),
    }
  )

  if (!res.ok) throw new Error('Failed to fetch Cloudinary media')
  const data = await res.json()
  return data.resources
}
