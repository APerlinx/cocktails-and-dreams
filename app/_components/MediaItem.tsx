'use client'

import { useState } from 'react'
import { CldImage } from 'next-cloudinary'
import { Badge } from './GalleryUI/badge'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from './GalleryUI/dialog'
import { Play, Calendar, Users, Eye } from 'lucide-react'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

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
}

export function MediaItem({
  id,
  type,
  src,
  videoSrc,
  title,
  eventType,
  date,
  views,
  attendees,
}: MediaItemProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="group relative overflow-hidden  cursor-pointer transition-transform duration-200">
          <div className="relative">
            {type === 'image' ? (
              <CldImage
                src={src}
                alt={title}
                className="w-full h-auto object-cover transition-opacity duration-200"
                onLoad={() => setIsLoaded(true)}
                width={80}
                height={80}
              />
            ) : (
              <div className="relative aspect-video">
                <video className="w-full h-auto max-h-[80vh] object-contain cursor-pointer">
                  <source src={videoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Play className="h-10 w-10 text-white opacity-80" />
                </div>
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
                className="text-xs bg-white/90 text-foreground"
              >
                {eventType}
              </Badge>
            </div>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <VisuallyHidden>
          <DialogTitle>{title}</DialogTitle>
        </VisuallyHidden>
        <div className="relative">
          {type === 'video' ? (
            <video
              controls
              playsInline
              autoPlay
              className="w-full h-auto max-h-[80vh] object-contain cursor-pointer"
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <CldImage
              src={src}
              alt={title}
              className="w-full h-auto max-h-[80vh] object-contain "
              width={200}
              height={200}
            />
          )}

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
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
                  <span>{attendees} attendees</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
