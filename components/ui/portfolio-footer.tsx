"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Send, 
  Code, 
  Briefcase, 
  ArrowUp
} from "lucide-react"
import { cn } from "@/lib/utils"

// Minimal Footer Component
interface MinimalFooterProps {
  name?: string
  email?: string
  socialLinks?: Array<{
    icon: React.ReactNode
    href: string
    label: string
  }>
  currentYear?: number
}

export function MinimalFooter({
  name = "Kevin Lin",
  email = "kevin@example.com",
  socialLinks = [
    {
      icon: <Github className="h-4 w-4" />,
      href: "https://github.com/kevinlin",
      label: "GitHub",
    },
    {
      icon: <Linkedin className="h-4 w-4" />,
      href: "https://linkedin.com/in/kevinlin",
      label: "LinkedIn",
    },
    {
      icon: <Twitter className="h-4 w-4" />,
      href: "https://twitter.com/kevinlin",
      label: "Twitter",
    },
  ],
  currentYear = new Date().getFullYear(),
}: MinimalFooterProps) {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
              <Code className="h-4 w-4" />
            </div>
            <span className="font-semibold">{name}</span>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.href} 
                aria-label={link.label}
                className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                {link.icon}
              </a>
            ))}
            <a 
              href={`mailto:${email}`}
              className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t pt-8 text-sm text-muted-foreground md:flex-row">
          <p>© {currentYear} {name}. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Graphics Footer Component
export function GraphicsFooter() {
  const currentYear = new Date().getFullYear()
  const quickLinks = [
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ]
  
  return (
    <footer className="relative border-t bg-background">
      {/* Graphics/patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-10" />
      </div>

      {/* Gradient spheres */}
      <div className="absolute -top-12 -right-12 h-24 w-24 rounded-full bg-purple-500 opacity-10 blur-xl" />
      <div className="absolute bottom-12 left-12 h-32 w-32 rounded-full bg-blue-500 opacity-10 blur-xl" />
      <div className="absolute -bottom-8 right-36 h-16 w-16 rounded-full bg-pink-500 opacity-10 blur-xl" />

      <div className="container relative z-10 mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-[1px] relative group">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 opacity-30 blur-lg" />
                <div className="h-full w-full rounded-[10px] bg-background flex items-center justify-center overflow-hidden">
                  <Code className="h-5 w-5 relative z-10 text-foreground" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold">Kevin Lin</h3>
                <p className="text-sm text-muted-foreground">Full Stack Developer</p>
              </div>
            </div>

            <p className="text-muted-foreground">
              Building beautiful and functional web experiences with attention to detail and performance.
            </p>

            <div className="flex gap-3">
              <a 
                href="https://github.com/kevinlin"
                className="rounded-full bg-background p-2 text-muted-foreground hover:text-foreground shadow-sm border border-border transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a 
                href="https://linkedin.com/in/kevinlin"
                className="rounded-full bg-background p-2 text-muted-foreground hover:text-foreground shadow-sm border border-border transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a 
                href="https://twitter.com/kevinlin"
                className="rounded-full bg-background p-2 text-muted-foreground hover:text-foreground shadow-sm border border-border transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a 
                href="mailto:kevin@example.com"
                className="rounded-full bg-background p-2 text-muted-foreground hover:text-foreground shadow-sm border border-border transition-colors"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h4 className="text-base font-semibold">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:underline"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-base font-semibold">Work</h4>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="/projects/web" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:underline"
                  >
                    Web Development
                  </a>
                </li>
                <li>
                  <a 
                    href="/projects/design" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:underline"
                  >
                    UI/UX Design
                  </a>
                </li>
                <li>
                  <a 
                    href="/projects/mobile" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:underline"
                  >
                    Mobile Apps
                  </a>
                </li>
                <li>
                  <a 
                    href="/projects/all" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:underline"
                  >
                    All Projects
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-base font-semibold">Contact</h4>
              <address className="not-italic">
                <p className="text-sm text-muted-foreground">New York City, NY</p>
                <p className="text-sm text-muted-foreground">United States</p>
              </address>
              <a 
                href="mailto:kevin@example.com"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:underline block"
              >
                kevin@example.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 border-t pt-8 text-sm text-muted-foreground">
          <p>© {currentYear} Kevin Lin. All rights reserved.</p>
          
          <div className="flex gap-4">
            <a 
              href="/privacy" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </a>
            <a 
              href="/terms" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </a>
          </div>

          <a 
            href="#top" 
            className="hidden sm:flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to top
            <ArrowUp className="h-3 w-3" />
          </a>
        </div>
      </div>
    </footer>
  )
}

// Newsletter Footer Component
export function NewsletterFooter() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = React.useState("")
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    alert(`Thank you for subscribing with ${email}!`)
    setEmail("")
  }
  
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-16 md:grid-cols-2">
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-[1px]">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 opacity-40 blur-md" />
                  <div className="h-full w-full rounded-full bg-background flex items-center justify-center">
                    <Code className="h-5 w-5 text-foreground" />
                  </div>
                </div>
                <h3 className="text-xl font-bold">Kevin Lin</h3>
              </div>
              <p className="text-muted-foreground max-w-md">
                I write about web development, design, and building software products. 
                Subscribe to get my latest posts by email.
              </p>
            </div>
            
            <form 
              className="flex w-full max-w-sm flex-col sm:flex-row gap-2"
              onSubmit={handleSubmit}
            >
              <Input 
                type="email" 
                placeholder="Email address" 
                className="rounded-xl" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button 
                type="submit" 
                className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
              >
                <Send className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </form>
            
            <div className="flex gap-4">
              <a 
                href="https://github.com/kevinlin"
                className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com/in/kevinlin"
                className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com/kevinlin"
                className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="mailto:kevin@example.com"
                className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div className="space-y-3">
              <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Portfolio</h4>
              <ul className="space-y-1.5">
                <li>
                  <a href="/about" className="text-foreground hover:text-blue-600 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="/projects" className="text-foreground hover:text-blue-600 transition-colors">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="/uses" className="text-foreground hover:text-blue-600 transition-colors">
                    Uses
                  </a>
                </li>
                <li>
                  <a href="/blog" className="text-foreground hover:text-blue-600 transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Connect</h4>
              <ul className="space-y-1.5">
                <li>
                  <a href="https://github.com/kevinlin" className="text-foreground hover:text-blue-600 transition-colors">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/kevinlin" className="text-foreground hover:text-blue-600 transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com/in/kevinlin" className="text-foreground hover:text-blue-600 transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-foreground hover:text-blue-600 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Legal</h4>
              <ul className="space-y-1.5">
                <li>
                  <a href="/privacy" className="text-foreground hover:text-blue-600 transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-foreground hover:text-blue-600 transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {currentYear} Kevin Lin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// Main Portfolio Footer Component
interface PortfolioFooterProps {
  variant?: "minimal" | "graphics" | "newsletter"
}

export function PortfolioFooter({ variant = "minimal" }: PortfolioFooterProps) {
  switch (variant) {
    case "graphics":
      return <GraphicsFooter />
    case "newsletter":
      return <NewsletterFooter />
    default:
      return <MinimalFooter />
  }
}
