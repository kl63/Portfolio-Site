import { Header } from "@/components/NavBar"
import { Footer } from "@/components/Footer"
import { FeaturedPosts } from "@/components/ui/featured-posts"
import { BlogPostsGrid } from "@/components/ui/blog-posts-grid"
import { getBlogPosts } from "@/lib/blog-data"

export const revalidate = 1800 // Revalidate every 30 minutes

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="pt-10 pb-8 px-4 md:pt-16 md:pb-12">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="mb-4 text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Blog & Insights
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-6">
                Thoughts, ideas, and insights on web development, design, and technology
              </p>
            </div>
          </div>
        </section>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Featured Posts */}
            <FeaturedPosts posts={posts} />
            
            {/* Blog Posts Grid with Filtering */}
            <BlogPostsGrid posts={posts} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
