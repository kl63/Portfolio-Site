"use client"

import React, { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Filter, X, ChevronLeft, ChevronRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { BlogPost, BlogCard } from "./blog-card"

interface BlogPostsGridProps {
  posts: BlogPost[]
  postsPerPage?: number
}

export const BlogPostsGrid = ({ posts, postsPerPage = 6 }: BlogPostsGridProps) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  // Extract unique categories from posts
  const categories = useMemo(() => {
    const allCategories = posts.map((post) => post.category)
    return [...new Set(allCategories)]
  }, [posts])

  // Filter posts based on search query and active category
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch = 
        searchQuery === "" || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesCategory = activeCategory === null || post.category === activeCategory
      
      return matchesSearch && matchesCategory
    })
  }, [posts, searchQuery, activeCategory])

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  )

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, activeCategory])

  const handleCategoryClick = (category: string) => {
    setActiveCategory(activeCategory === category ? null : category)
  }

  const resetFilters = () => {
    setActiveCategory(null)
    setSearchQuery("")
  }

  return (
    <section className="py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center mb-8">
          <div className="h-10 w-1.5 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-4"></div>
          <h2 className="text-3xl font-bold">Blog Posts</h2>
        </div>
      </motion.div>

      <motion.div 
        className="mb-8 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 backdrop-blur-sm border border-blue-100/20 dark:border-purple-800/20 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="relative w-full md:w-64">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts..."
              className="pl-9 bg-white/70 dark:bg-slate-800/70 border-blue-100 dark:border-slate-700"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            {searchQuery && (
              <Button
                size="sm"
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
          
          {(activeCategory || searchQuery) && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={resetFilters} 
              className="text-xs bg-white/60 dark:bg-slate-800/60 shadow-sm border border-slate-200 dark:border-slate-700 hover:border-blue-400"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1"
              >
                <X className="h-3.5 w-3.5 mr-1" /> Clear filters
              </motion.span>
            </Button>
          )}
        </div>
        
        <div className="h-px w-full my-4 bg-blue-100/50 dark:bg-slate-700/50" />
        
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-blue-500 mr-1" />
          <h4 className="text-sm font-medium text-muted-foreground">Categories:</h4>
          <div className="flex flex-wrap gap-2 mt-1">
            <AnimatePresence>
              {categories.map((category) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Badge
                    variant={activeCategory === category ? "default" : "outline"}
                    className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                      activeCategory === category 
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 border-0 text-white" 
                        : "hover:border-blue-400 bg-white/50 dark:bg-slate-800/50"
                    }`}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </Badge>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {filteredPosts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <h3 className="text-xl font-medium mb-2">No posts found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </motion.div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex justify-center mt-10 gap-2"
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 dark:hover:bg-blue-950/20"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={`min-w-[40px] ${
                    currentPage === page
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0'
                      : 'hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 dark:hover:bg-blue-950/20'
                  }`}
                  aria-label={`Go to page ${page}`}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </Button>
              ))}
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 dark:hover:bg-blue-950/20"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </>
      )}
    </section>
  )
}
