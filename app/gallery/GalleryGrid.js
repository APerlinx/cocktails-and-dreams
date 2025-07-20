'use client'
import { CldImage, CldVideoPlayer } from 'next-cloudinary'

export default function GalleryGrid({ media }) {
  return (
    <div className="flex gap-2 flex-row flex-wrap">
      {media.map((asset) =>
        asset.resource_type === 'image' ? (
          <CldImage
            key={asset.public_id}
            src={asset.public_id}
            width="300"
            height="200"
            alt={asset.public_id}
          />
        ) : (
          <video
            autoPlay
            loop
            muted
            playsInline
            width={300}
            height={200}
            key={asset.public_id}
          >
            <source
              src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/q_auto,f_auto/${asset.public_id}.mp4`}
              type="video/mp4"
            />
          </video>
        )
      )}
    </div>
  )
}
