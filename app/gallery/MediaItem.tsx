'use client'

import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Calendar, Eye, Loader2, Play, Users } from 'lucide-react'
import { CldImage } from 'next-cloudinary'
import { Badge } from '../_components/badge'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '../_components/GalleryUI/dialog'
import SpinnerMini from '../_components/SpinnerMini'
import { useState } from 'react'

interface MediaItemProps {
  id: string
  type: 'image' | 'video'
  src: string
  videoSrc: string
  title: string
  eventType: string
  date: string
  views?: number
  attendees?: number
  priority?: boolean
}

export default function MediaItem({
  id,
  type,
  src,
  videoSrc,
  title,
  eventType,
  date,
  views,
  attendees,
  priority,
}: MediaItemProps) {
  const imgLoadingMode: 'lazy' | 'eager' | undefined = priority
    ? undefined
    : 'lazy'
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="group relative overflow-hidden cursor-pointer transition-transform duration-200">
          <div className="relative h-full w-full overflow-hidden ">
            {type === 'image' ? (
              <CldImage
                src={src}
                alt={title}
                className="object-cover w-full h-full aspect-square"
                width={800}
                height={800}
                loading={imgLoadingMode}
                priority={priority}
                quality="auto:good"
                format="auto"
                dpr="auto"
              />
            ) : (
              <div className="relative w-full h-full overflow-hidden">
                <video
                  className="object-cover w-full h-full"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src={videoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <Play className="absolute top-2 right-1 z-10" color="white" />
              </div>
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-sm mb-1">{title}</h3>
                <div className="flex items-center gap-3 text-xs text-white/80">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{date}</span>
                  </div>
                  {attendees && (
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{attendees}</span>
                    </div>
                  )}
                  {views && (
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{views}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Event Type Badge */}
            <div className="absolute top-2 left-2">
              <Badge
                variant="secondary"
                className={`text-xs  text-foreground ${
                  eventType === 'פרטי'
                    ? 'bg-card-2'
                    : eventType === 'עסקי'
                    ? 'bg-card-1'
                    : 'bg-card-4'
                }`}
              >
                {eventType}
              </Badge>
            </div>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[90vh] p-0 rounded-md">
        <VisuallyHidden>
          <DialogTitle>{title}</DialogTitle>
        </VisuallyHidden>
        <div className="relative max-h-screen rounded-md">
          {!imgLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Loader2 className="animate-spin h-8 w-8 text-white" />
            </div>
          )}
          {type === 'video' ? (
            <video
              controls
              playsInline
              autoPlay
              className="w-full h-auto object-contain cursor-pointer rounded-md"
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <CldImage
              src={src}
              alt={title}
              className="w-full h-auto object-contain rounded-md"
              width={1600}
              height={1600}
              loading="eager"
              priority
              format="auto"
              quality="auto:best"
              dpr="auto"
              onLoad={() => setImgLoaded(true)}
            />
          )}

          <div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white"
            dir="rtl"
          >
            <h2 className="text-xl mb-2">{title}</h2>
            <div className="flex items-center gap-4 text-sm text-white/80">
              <Badge variant="outline" className="border-white/40 text-white">
                {eventType}
              </Badge>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{date}</span>
              </div>
              {attendees && (
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{attendees} אורחים</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
