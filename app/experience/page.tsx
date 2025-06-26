import { Header } from "@/components/NavBar"
import { Footer } from "@/components/Footer"
import { TimelineSection } from "@/components/ui/timeline"

export const revalidate = 3600 // Revalidate every hour

interface Experience {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  description: string[]
  technologies: string[]
  achievements: string[]
}

interface Education {
  id: string
  institution: string
  degree: string
  field: string
  location: string
  startDate: string
  endDate: string
  gpa?: string
  honors?: string[]
}

async function getExperienceData(): Promise<{ experiences: Experience[]; education: Education[] }> {
  // Simulate API call - in real app, this would fetch from a CMS or API
  await new Promise((resolve) => setTimeout(resolve, 100))

  return {
    experiences: [
      {
        id: "1",
        company: "TechCorp Solutions",
        position: "Senior Full-Stack Developer",
        location: "San Francisco, CA",
        startDate: "2022-03",
        endDate: "Present",
        description: [
          "Lead development of customer-facing web applications serving 100K+ daily active users",
          "Architect and implement scalable microservices using Node.js and PostgreSQL",
          "Mentor junior developers and conduct code reviews to maintain high code quality",
          "Collaborate with product and design teams to deliver user-centric solutions",
        ],
        technologies: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Docker"],
        achievements: [
          "Reduced page load times by 40% through performance optimization",
          "Led migration from monolith to microservices architecture",
          "Implemented CI/CD pipeline reducing deployment time by 60%",
        ],
      },
      {
        id: "2",
        company: "StartupXYZ",
        position: "Full-Stack Developer",
        location: "Remote",
        startDate: "2020-06",
        endDate: "2022-02",
        description: [
          "Built and maintained multiple client projects using React and Node.js",
          "Developed RESTful APIs and integrated third-party services",
          "Implemented responsive designs and ensured cross-browser compatibility",
          "Participated in agile development process and sprint planning",
        ],
        technologies: ["React", "Vue.js", "Express", "MongoDB", "Firebase", "Stripe API"],
        achievements: [
          "Delivered 15+ projects on time and within budget",
          "Increased client satisfaction scores by 25%",
          "Reduced bug reports by 50% through comprehensive testing",
        ],
      },
      {
        id: "3",
        company: "Digital Agency Pro",
        position: "Frontend Developer",
        location: "Los Angeles, CA",
        startDate: "2019-01",
        endDate: "2020-05",
        description: [
          "Created responsive websites and web applications for various clients",
          "Collaborated with designers to implement pixel-perfect UI/UX designs",
          "Optimized websites for SEO and performance",
          "Maintained and updated existing client websites",
        ],
        technologies: ["HTML5", "CSS3", "JavaScript", "jQuery", "WordPress", "Sass"],
        achievements: [
          "Improved website performance scores by average of 35%",
          "Successfully launched 20+ client websites",
          "Reduced development time by 30% through reusable component library",
        ],
      },
    ],
    education: [
      {
        id: "1",
        institution: "University of California, Berkeley",
        degree: "Bachelor of Science",
        field: "Computer Science",
        location: "Berkeley, CA",
        startDate: "2015-08",
        endDate: "2019-05",
        gpa: "3.8/4.0",
        honors: ["Magna Cum Laude", "Dean's List (6 semesters)", "CS Department Honors"],
      },
      {
        id: "2",
        institution: "Codecademy",
        degree: "Full-Stack Engineer",
        field: "Web Development",
        location: "Online",
        startDate: "2018-06",
        endDate: "2018-12",
        honors: ["Certificate of Completion", "Top 5% of cohort"],
      },
    ],
  }
}

export default async function ExperiencePage() {
  const { experiences, education } = await getExperienceData()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-20 bg-gradient-to-b from-muted/10 to-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto relative z-10">
              <div className="mb-16 text-center animate-fade-in">
                <h1 className="text-4xl sm:text-5xl font-bold mb-4">Experience & Education</h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  My professional journey, achievements, and academic background
                </p>
              </div>

              {/* Background decorative elements */}
              <div className="fixed top-40 left-0 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl opacity-70 -z-10"></div>
              <div className="fixed top-80 right-0 w-72 h-72 bg-secondary/5 rounded-full filter blur-3xl opacity-70 -z-10"></div>

              {/* Work Experience */}
              <TimelineSection 
                title="Work Experience" 
                items={experiences} 
                type="work" 
                className="mb-24"
              />
              
              {/* Education */}
              <TimelineSection 
                title="Education" 
                items={education} 
                type="education" 
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
