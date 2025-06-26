import { BlogPost } from "@/components/ui/blog-card";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Define the blog post with content field for markdown content
export interface BlogPostWithContent extends BlogPost {
  content: string;
}

// Path to our blog content directory
const contentDirectory = path.join(process.cwd(), 'content/blog');

// Get all markdown files from the blog directory
export async function getBlogPosts(): Promise<BlogPost[]> {
  // Create the blog directory if it doesn't exist
  if (!fs.existsSync(contentDirectory)) {
    console.log('Blog content directory not found, returning fallback data');
    return getFallbackPosts();
  }

  // Get all markdown files
  const files = fs.readdirSync(contentDirectory);
  const markdownFiles = files.filter(file => file.endsWith('.md'));

  // If there are no markdown files, use fallback data
  if (markdownFiles.length === 0) {
    console.log('No markdown files found, returning fallback data');
    return getFallbackPosts();
  }

  // Parse all markdown files
  const posts = markdownFiles.map(filename => {
    const filePath = path.join(contentDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    // Only need the frontmatter data, not the content here
    const { data } = matter(fileContents);
    
    // Create slug from filename
    const slug = filename.replace(/\.md$/, '');
    
    // Return the blog post data with default values for required fields
    return {
      id: data.id || slug,
      title: data.title || 'Untitled Post',
      excerpt: data.excerpt || 'No excerpt available',
      author: data.author || 'Anonymous',
      publishedAt: data.publishedAt || new Date().toISOString(),
      readTime: data.readTime || 5,
      category: data.category || 'Uncategorized',
      tags: data.tags || [],
      featuredImage: data.featuredImage,
      featured: data.featured || false
    } as BlogPost;
  });

  // Sort posts by publish date (newest first)
  return posts.sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}

// Get a specific blog post by ID including the content
export async function getBlogPostById(id: string): Promise<BlogPostWithContent | null> {
  if (!fs.existsSync(contentDirectory)) {
    return null;
  }

  const files = fs.readdirSync(contentDirectory);
  const markdownFiles = files.filter(file => file.endsWith('.md'));

  // Try to find the file by ID or by slug
  for (const filename of markdownFiles) {
    const filePath = path.join(contentDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Create slug from filename
    const slug = filename.replace(/\.md$/, '');
    
    // Check if this is the file we're looking for
    if (data.id === id || slug === id) {
      return {
        id: data.id || slug,
        title: data.title || 'Untitled Post',
        excerpt: data.excerpt || 'No excerpt available',
        author: data.author || 'Anonymous',
        publishedAt: data.publishedAt || new Date().toISOString(),
        readTime: data.readTime || 5,
        category: data.category || 'Uncategorized',
        tags: data.tags || [],
        featuredImage: data.featuredImage,
        featured: data.featured || false,
        content: content
      };
    }
  }

  // If we reach here, no matching post was found
  return null;
}

// Fallback data to use if no markdown files are found
function getFallbackPosts(): BlogPost[] {
  return [
    {
      id: "1",
      title: "Building Scalable React Applications with Modern Architecture Patterns",
      excerpt: "Explore advanced patterns and best practices for creating maintainable and scalable React applications that can grow with your team.",
      author: "Sarah Johnson",
      publishedAt: "2024-01-15",
      readTime: 8,
      category: "Development",
      tags: ["React", "Architecture", "JavaScript"],
      featuredImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
      featured: true
    },
    {
      id: "2",
      title: "The Future of UI Design: Trends to Watch in 2025",
      excerpt: "From neomorphism to adaptive interfaces, discover the design trends that are shaping the future of user interfaces.",
      author: "Michael Chen",
      publishedAt: "2024-02-03",
      readTime: 6,
      category: "Design",
      tags: ["UI", "Design Trends", "UX"],
      featuredImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop",
      featured: true
    },
    {
      id: "3",
      title: "Optimizing Performance in Next.js Applications",
      excerpt: "Learn practical strategies for improving load times, reducing bundle sizes, and creating lightning-fast user experiences with Next.js.",
      author: "Ava Williams",
      publishedAt: "2024-02-28",
      readTime: 10,
      category: "Development",
      tags: ["Next.js", "Performance", "JavaScript"],
      featuredImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
      featured: true
    }
  ];
}
