'use client'

import { CldImage } from 'next-cloudinary'

type MediaItem = {
  public_id: string
  filename: string
}

type ContactImagesProps = {
  media: MediaItem[]
}

function ContactImages({ media }: ContactImagesProps) {
  const founders = media.find((item) => item.filename.includes('jy0sz5'))

  return (
    <>
      {founders && (
        <CldImage
          src={founders.public_id}
          alt="Cover"
          width={400}
          height={200}
          className="mx-auto rounded-lg"
        />
      )}
    </>
  )
}

export default ContactImages
