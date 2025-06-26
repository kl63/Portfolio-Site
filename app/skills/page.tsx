import { Header } from "@/components/NavBar"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export const revalidate = 86400 // Revalidate daily

export default function SkillsPage() {
  const skillCategories = [
    {
      title: "Frontend Development",
      skills: [
        { name: "React", level: 95 },
        { name: "Next.js", level: 90 },
        { name: "TypeScript", level: 88 },
        { name: "Tailwind CSS", level: 92 },
        { name: "Vue.js", level: 75 },
        { name: "HTML5", level: 98 },
        { name: "CSS3", level: 95 },
      ],
    },
    {
      title: "Backend Development",
      skills: [
        { name: "Node.js", level: 90 },
        { name: "Python", level: 85 },
        { name: "Express", level: 88 },
        { name: "FastAPI", level: 80 },
        { name: "PostgreSQL", level: 85 },
        { name: "MongoDB", level: 82 },
        { name: "Redis", level: 75 },
      ],
    },
    {
      title: "Tools & DevOps",
      skills: [
        { name: "Git", level: 95 },
        { name: "Docker", level: 80 },
        { name: "AWS", level: 78 },
        { name: "Vercel", level: 92 },
        { name: "Jest", level: 85 },
        { name: "Cypress", level: 80 },
        { name: "Figma", level: 70 },
      ],
    },
  ]

  const certifications = [
    "AWS Certified Developer Associate",
    "Google Cloud Professional Developer",
    "MongoDB Certified Developer",
    "React Developer Certification",
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-4xl sm:text-5xl font-bold text-center mb-4">Skills & Technologies</h1>
              <p className="text-xl text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                A comprehensive overview of my technical skills and proficiency levels across different technologies.
              </p>

              <div className="grid lg:grid-cols-3 gap-8 mb-12">
                {skillCategories.map((category, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-center">{category.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {category.skills.map((skill, skillIndex) => (
                        <div key={skillIndex} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-sm text-muted-foreground">{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-2" />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Certifications & Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {certifications.map((cert, index) => (
                      <Badge key={index} variant="secondary" className="text-sm py-2 px-4">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
