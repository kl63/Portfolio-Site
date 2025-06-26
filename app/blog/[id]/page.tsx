import { Header } from "@/components/NavBar"
import { Footer } from "@/components/Footer"
import { getBlogPosts, getBlogPostById } from "@/lib/blog-data"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft, Tag, MessageCircle, ThumbsUp, ChevronLeft, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { notFound } from "next/navigation"
import { BlogCard, BlogPost } from "@/components/ui/blog-card"
import { Metadata } from "next"
import { ReadingProgress } from "@/components/ui/reading-progress"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import rehypeHighlight from "rehype-highlight"
import { TableOfContents } from "@/components/ui/table-of-contents"
import { MarkdownImage } from "@/components/ui/markdown-image"

export const revalidate = 1800 // Revalidate every 30 minutes

// Generate static pages for all blog posts
export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({
    id: post.id,
  }))
}

// Related posts function
function getRelatedPosts(currentPostId: string, allPosts: BlogPost[], limit: number = 3): BlogPost[] {
  // Find the current post
  const currentPost = allPosts.find(post => post.id === currentPostId)
  if (!currentPost) {
    return []
  }
  
  // Get posts with matching tags
  return allPosts
    .filter(post => post.id !== currentPostId) // Exclude current post
    .map(post => {
      // Count matching tags
      const matchingTags = post.tags.filter(tag => 
        currentPost.tags.includes(tag)
      ).length
      
      return {
        ...post,
        relevance: matchingTags
      }
    })
    .filter(post => post.relevance > 0) // Only include posts with at least one matching tag
    .sort((a, b) => b.relevance - a.relevance) // Sort by most relevant first
    .slice(0, limit)
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const id = params.id
  // Use getBlogPostById to directly get the post by ID
  const post = await getBlogPostById(id)
  
  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found."
    }
  }
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
      type: 'article',
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { id: string }
}) {
  const id = params.id
  
  // Get the full post with content
  const post = await getBlogPostById(id)
  
  if (!post) {
    notFound()
  }
  
  // Get all posts for navigation and related posts
  const posts = await getBlogPosts()
  
  // Get adjacent posts for navigation
  const currentIndex = posts.findIndex(p => p.id === id)
  const previousPost = currentIndex > 0 ? posts[currentIndex - 1] : null
  const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null
  
  // Get related posts
  const relatedPosts = getRelatedPosts(id, posts)

  return (
    <div className="min-h-screen bg-background">
      <ReadingProgress />
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-3xl mx-auto">
            {/* Back button */}
            <div className="mb-8">
              <Link href="/blog">
                <Button variant="ghost" className="pl-0 hover:bg-transparent group">
                  <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  Back to all posts
                </Button>
              </Link>
            </div>
            
            {/* Blog post header */}
            <div className="mb-6">
              <Badge variant="outline" className="mb-4">
                {post.category}
              </Badge>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-y-3 gap-x-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
                    {post.author.charAt(0)}
                  </div>
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime} min read</span>
                </div>
              </div>
            </div>
            
            {/* Featured image */}
            {post.featuredImage && (
              <div className="relative w-full h-56 sm:h-72 md:h-96 mb-8 rounded-lg overflow-hidden">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  priority
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 95vw, 1000px"
                  className="object-cover"
                />
              </div>
            )}
            
            {/* Blog post content */}
            <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
              <p className="text-lg mb-6">{post.excerpt}</p>
              
              {/* Blog post content */}
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="hidden lg:block w-64 flex-shrink-0">
                  <TableOfContents articleId={post.id} />
                </div>
                
                <div 
                  id={`article-${post.id}`} 
                  className="prose dark:prose-invert prose-headings:scroll-mt-20 prose-img:rounded-lg prose-img:mx-auto max-w-none mt-8 flex-grow"
                >
                  <div className="relative">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw, rehypeHighlight]}
                    components={{
                      img: ({src, alt, title}) => (
                        <MarkdownImage 
                          src={String(src || '')} 
                          alt={String(alt || '')}
                          title={title ? String(title) : undefined}
                        />
                      ),
                      pre: ({className, children}) => (
                        <div className="relative group">
                          {className?.includes('language-') && (
                            <div className="absolute top-2 right-2 bg-muted/80 rounded px-2 py-1 text-xs text-muted-foreground">
                              {className.replace('language-', '')}
                            </div>
                          )}
                          <pre className={className}>{children}</pre>
                        </div>
                      )
                    }}
                  >
                    {post.content || ''}
                  </ReactMarkdown>
                </div>
                </div>
              </div>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-12">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="cursor-pointer">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
            
            {/* Social share section */}
            <div className="flex items-center gap-4 my-8 py-8 border-t border-b">
              <span className="font-medium">Share:</span>
              <div className="flex gap-3">
                <Button size="icon" variant="ghost" className="h-9 w-9 rounded-full">
                  <span className="sr-only">Share on Twitter</span>
                  <MessageCircle className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="h-9 w-9 rounded-full">
                  <span className="sr-only">Share on Facebook</span>
                  <ThumbsUp className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Author bio */}
            <div className="bg-muted/50 rounded-lg p-6 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg font-semibold">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{post.author}</h3>
                  <p className="text-muted-foreground mb-3">
                    Tech enthusiast and software engineer with over 5 years of experience in frontend development.
                    Passionate about creating user-friendly interfaces and optimizing performance.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Comments section */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Comments (2)</h2>
              
              {/* Comment form */}
              <div className="mb-8">
                <div className="mb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      Y
                    </div>
                    <span className="font-medium">You</span>
                  </div>
                  <div className="border rounded-md p-2 mb-2">
                    <textarea 
                      rows={3} 
                      className="w-full resize-none border-0 focus:ring-0 focus:outline-none bg-transparent p-1" 
                      placeholder="Add a comment..." 
                    />
                  </div>
                  <Button>Post Comment</Button>
                </div>
              </div>
              
              {/* Comments List */}
              <div className="space-y-6">
                {/* Comment 1 */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-medium">
                    SW
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Sarah Williams</h4>
                      <span className="text-xs text-muted-foreground">2 days ago</span>
                    </div>
                    <p className="my-2 text-sm">Great article! I&apos;ve been using these techniques in my projects and they really do make a difference in performance.</p>
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="p-0 h-auto hover:bg-transparent hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1">
                        <ThumbsUp className="h-3 w-3" />
                        <span className="text-xs">12</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="p-0 h-auto hover:bg-transparent hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" />
                        <span className="text-xs">Reply</span>
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Comment 2 */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-medium">
                    JD
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">James Davis</h4>
                      <span className="text-xs text-muted-foreground">3 days ago</span>
                    </div>
                    <p className="my-2 text-sm">I would love to see a follow-up article diving deeper into the performance aspects. Especially around SSR vs. ISR in Next.js.</p>
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="p-0 h-auto hover:bg-transparent hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1">
                        <ThumbsUp className="h-3 w-3" />
                        <span className="text-xs">8</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="p-0 h-auto hover:bg-transparent hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" />
                        <span className="text-xs">Reply</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Previous/Next Post Navigation */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 my-12 pt-6 border-t">
              {previousPost ? (
                <Link href={`/blog/${previousPost.id}`} className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto flex items-center gap-2">
                    <ChevronLeft className="h-4 w-4" />
                    <div className="flex flex-col items-start text-left">
                      <span className="text-xs text-muted-foreground">Previous</span>
                      <span className="text-sm font-medium truncate max-w-[150px] sm:max-w-[120px] md:max-w-[150px]">{previousPost.title}</span>
                    </div>
                  </Button>
                </Link>
              ) : (
                <div className="hidden sm:block"></div>
              )}
              {nextPost ? (
                <Link href={`/blog/${nextPost.id}`} className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto flex items-center gap-2">
                    <div className="flex flex-col items-end text-right">
                      <span className="text-xs text-muted-foreground">Next</span>
                      <span className="text-sm font-medium truncate max-w-[150px] sm:max-w-[120px] md:max-w-[150px]">{nextPost.title}</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <div className="hidden sm:block"></div>
              )}
            </div>
            
            {/* Related Posts */}
            <div className="mt-12 pt-6 border-t">
              <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost, i) => (
                  <BlogCard key={relatedPost.id} post={relatedPost} index={i} />
                ))}
                {relatedPosts.length === 0 && (
                  <p className="text-muted-foreground col-span-3 text-center py-8">
                    No related posts found
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
