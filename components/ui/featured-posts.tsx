"use client"

import React from "react"
import { motion } from "framer-motion"
import { BlogPost, BlogCard } from "./blog-card"

interface FeaturedPostsProps {
  posts: BlogPost[]
}

export const FeaturedPosts = ({ posts }: FeaturedPostsProps) => {
  const featuredPosts = posts.filter(post => post.featured)

  if (featuredPosts.length === 0) {
    return null
  }

  return (
    <section className="py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-8">
          <div className="h-10 w-1.5 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-4"></div>
          <h2 className="text-3xl font-bold">Featured Posts</h2>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredPosts.map((post, index) => (
          <BlogCard key={post.id} post={post} index={index} />
        ))}
      </div>
    </section>
  )
}
