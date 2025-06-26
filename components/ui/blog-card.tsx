"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  author: string
  publishedAt: string
  readTime: number
  category: string
  tags: string[]
  featuredImage?: string
  featured: boolean
}

interface BlogCardProps {
  post: BlogPost
  index: number
}

export const BlogCard = ({ post, index }: BlogCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full flex flex-col transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-muted group">
        {post.featuredImage && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {post.featured && (
              <div className="absolute top-3 left-3">
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
                  Featured
                </Badge>
              </div>
            )}
            <div className="absolute top-3 right-3">
              <Badge variant="outline" className="bg-white/80 backdrop-blur-sm dark:bg-black/50">
                {post.category}
              </Badge>
            </div>
          </div>
        )}
        <CardHeader className="p-4 pb-2">
          <Link href={`/blog/${post.id}`} className="hover:underline hover:text-blue-600 dark:hover:text-blue-400">
            <h3 className="text-lg font-semibold line-clamp-2 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {post.title}
            </h3>
          </Link>
        </CardHeader>
        <CardContent className="p-4 pt-0 flex-grow">
          <p className="text-muted-foreground line-clamp-3 text-sm mb-4">{post.excerpt}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs">
              {post.author.charAt(0)}
            </div>
            <span className="text-xs">{post.author}</span>
          </div>
          <Link href={`/blog/${post.id}`}>
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-auto hover:bg-transparent hover:text-blue-600 dark:hover:text-blue-400 group-hover:translate-x-1 transition-transform"
            >
              <span className="text-xs">Read</span>
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
