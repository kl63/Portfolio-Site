import { Header } from "@/components/NavBar"
import { Hero } from "@/components/Hero"
import { Footer } from "@/components/Footer"
import { Skills } from "@/components/skills"
import { ProjectsCarousel } from "@/components/ProjectsCarousel"
import { TechBranding } from "@/components/TechBranding"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <TechBranding />
        <Skills />
        <ProjectsCarousel />
      </main>
      <Footer />
    </div>
  )
}
