'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface Heading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  articleId: string
}

export function TableOfContents({ articleId }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const articleElement = document.getElementById(`article-${articleId}`)
    if (!articleElement) return

    // Get all heading elements within the article
    const headingElements = Array.from(
      articleElement.querySelectorAll('h2, h3, h4')
    )

    // Extract heading data
    const headingData = headingElements.map((element) => {
      // Create an id if one doesn't exist
      if (!element.id) {
        element.id = element.textContent?.toLowerCase()
          .replace(/[^\w\s]/g, '')
          .replace(/\s+/g, '-') || `heading-${Math.random().toString(36).substr(2, 9)}`
      }
      
      return {
        id: element.id,
        text: element.textContent || '',
        level: parseInt(element.tagName.charAt(1))
      }
    })

    setHeadings(headingData)

    // Set up intersection observer to track active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '0px 0px -80% 0px',
        threshold: 0.1
      }
    )

    headingElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [articleId])

  if (headings.length === 0) return null

  return (
    <div className="border rounded-md p-4 sticky top-24 max-h-[calc(100vh-150px)] overflow-y-auto">
      <h3 className="text-lg font-semibold mb-3">Table of Contents</h3>
      <nav>
        <ul className="space-y-1 text-sm">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={cn(
                "transition-colors",
                heading.level === 2 ? "ml-0" : "",
                heading.level === 3 ? "ml-3" : "",
                heading.level === 4 ? "ml-6" : ""
              )}
            >
              <Link
                href={`#${heading.id}`}
                className={cn(
                  "block py-1 hover:text-primary transition-colors",
                  activeId === heading.id
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                )}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(heading.id)?.scrollIntoView({
                    behavior: 'smooth'
                  })
                }}
              >
                {heading.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
