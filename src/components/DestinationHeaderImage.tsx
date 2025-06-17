import React from 'react'
import { Card, CardContent } from './ui/card'
import Image from 'next/image'
import { ImageIcon, Star } from 'lucide-react'
import { Badge } from './ui/badge'
import { cn } from '@/lib/utils'

type DestinationHeaderImageProps = {
    name?: string,
    region?: string,
    image?: string,
    rating: number,
    className?: string
}

const DestinationHeaderImage = ({name, region, image, rating, className}: DestinationHeaderImageProps) => {
  return (
    <Card className={cn("overflow-clip p-0", className)}>
        <CardContent className="p-0 h-full">
          <figure className="bg-muted relative h-full">
            <div className="absolute inset-0 flex items-center justify-center">
              {image ? (
                <Image
                  src={image}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 700px"
                  alt="destination-image"
                  className="object-cover"
                />
              ) : (
                <ImageIcon className="text-muted-foreground size-16 opacity-50" />
              )}
            </div>
            <div className="from-primary/60 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"></div>
            <figcaption className="absolute inset-0 flex items-end p-6">
              <div>
                {region && (
                  <Badge className="rounded-full px-2.5">
                    {region}
                  </Badge>
                )}
                <h2 className="text-secondary text-3xl leading-relaxed font-bold">
                  {name}
                </h2>
                <div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`h-4 w-4 ${index < Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="tex text-secondary ml-2 font-medium">
                      {rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            </figcaption>
          </figure>
        </CardContent>
      </Card>
  )
}

export default DestinationHeaderImage