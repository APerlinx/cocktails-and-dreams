'use client'
import { CldImage } from 'next-cloudinary'

export default function GalleryGrid() {
  return (
    <div className="flex gap-1">
      <CldImage
        src="cld-sample-5"
        width="200"
        height="200"
        crop={{
          type: 'auto',
          source: true,
        }}
        alt="Sample image"
      />
      <CldImage
        src="cld-sample-5"
        width="200"
        height="200"
        crop={{
          type: 'auto',
          source: true,
        }}
        alt="Sample image"
      />
      <CldImage
        src="cld-sample-5"
        width="200"
        height="200"
        crop={{
          type: 'auto',
          source: true,
        }}
        alt="Sample image"
      />
      <CldImage
        src="cld-sample-5"
        width="200"
        height="200"
        crop={{
          type: 'auto',
          source: true,
        }}
        alt="Sample image"
      />
    </div>
  )
}
