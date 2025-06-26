import { Header } from "@/components/NavBar"
import { Footer } from "@/components/Footer"
import { ProjectsShowcase } from "@/components/ui/projects-showcase"

export const revalidate = 1800 // Revalidate every 30 minutes

interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  technologies: string[]
  liveUrl: string
  githubUrl: string
  featured: boolean
  completedDate: string
  category: string
}

async function getProjects(): Promise<Project[]> {
  // Simulate API call - in real app, this would fetch from a CMS or API
  await new Promise((resolve) => setTimeout(resolve, 100))

  return [
    {
      id: "1",
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
      longDescription:
        "Built a comprehensive e-commerce platform from scratch featuring user authentication, product catalog, shopping cart, payment processing with Stripe, order management, and an admin dashboard for inventory and sales analytics. Implemented advanced features like product recommendations, wishlist, and real-time inventory updates.",
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop&q=60",
      technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Prisma", "Tailwind CSS"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: true,
      completedDate: "2023-12",
      category: "Full-Stack",
    },
    {
      id: "2",
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates and team collaboration features.",
      longDescription:
        "Developed a comprehensive project management tool with features like task assignment, progress tracking, team collaboration, file sharing, and real-time notifications. Integrated with popular tools like Slack and Google Calendar for seamless workflow integration.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Express", "JWT"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: true,
      completedDate: "2023-10",
      category: "Full-Stack",
    },
    {
      id: "3",
      title: "Weather Dashboard",
      description: "A responsive weather dashboard with location-based forecasts and interactive charts.",
      longDescription:
        "Created an intuitive weather application that provides detailed weather information, 7-day forecasts, interactive maps, and weather alerts. Features include geolocation support, favorite locations, and beautiful data visualizations using Chart.js.",
      image: "https://images.unsplash.com/photo-1530563885674-66db50a1af19?w=800&auto=format&fit=crop&q=60",
      technologies: ["Vue.js", "Chart.js", "OpenWeather API", "Tailwind CSS", "Vuex"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: false,
      completedDate: "2023-08",
      category: "Frontend",
    },
    {
      id: "4",
      title: "Blog Platform",
      description: "A modern blog platform with markdown support, SEO optimization, and content management.",
      longDescription:
        "Built a feature-rich blogging platform with markdown editor, syntax highlighting, SEO optimization, comment system, and analytics dashboard. Includes features like draft saving, scheduled publishing, and social media integration.",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=60",
      technologies: ["Next.js", "MDX", "Prisma", "PostgreSQL", "NextAuth.js"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: true,
      completedDate: "2023-06",
      category: "Full-Stack",
    },
    {
      id: "5",
      title: "Fitness Tracker API",
      description: "RESTful API for fitness tracking with user authentication and data analytics.",
      longDescription:
        "Developed a robust REST API for fitness applications with endpoints for user management, workout tracking, nutrition logging, and progress analytics. Implemented comprehensive testing and API documentation.",
      image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&auto=format&fit=crop&q=60",
      technologies: ["Node.js", "Express", "MongoDB", "JWT", "Jest", "Swagger"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: false,
      completedDate: "2023-04",
      category: "Backend",
    },
    {
      id: "6",
      title: "Real Estate Finder",
      description: "Property search application with advanced filtering and map integration.",
      longDescription:
        "Created a comprehensive real estate platform with property listings, advanced search filters, interactive maps, mortgage calculator, and user favorites. Integrated with multiple MLS APIs for real-time property data.",
      image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&auto=format&fit=crop&q=60",
      technologies: ["React", "Redux", "Google Maps API", "Firebase", "Material-UI"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: false,
      completedDate: "2023-02",
      category: "Frontend",
    },
  ]
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <ProjectsShowcase projects={projects} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
