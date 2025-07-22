'use client'

import { CldImage } from 'next-cloudinary'

function ContactImages({ media }) {
  const founders = media.find((item) => item.filename.includes('jy0sz5'))

  return (
    <CldImage
      src={founders.public_id}
      alt="Cover"
      width={400}
      height={200}
      className="mx-auto rounded-lg"
    />
  )
}

export default ContactImages
