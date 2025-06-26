'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface MarkdownImageProps {
  src: string
  alt: string
  title?: string
  className?: string
}

export function MarkdownImage({ src, alt, title, className }: MarkdownImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  // Handle relative paths for local images in the content folder
  const imageSrc = src.startsWith('/') || src.startsWith('http') 
    ? src 
    : `/content/blog/images/${src}`

  return (
    <div className="my-8 flex flex-col items-center">
      <div className={cn(
        "relative w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800",
        isLoading ? "min-h-[200px]" : "",
        className
      )}>
        <Image
          src={imageSrc}
          alt={alt || "Blog post image"}
          width={800}
          height={500}
          className={cn(
            "mx-auto rounded-lg transition-opacity duration-300",
            isLoading ? "opacity-0" : "opacity-100"
          )}
          style={{ objectFit: 'contain' }}
          onLoad={() => setIsLoading(false)}
        />
        
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-primary"></div>
          </div>
        )}
      </div>
      
      {title && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground italic">
          {title}
        </figcaption>
      )}
    </div>
  )
}
