import React from "react";
import { Github, Linkedin, Mail, Twitter, Code, FileCode, BookOpen, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative bg-gradient-to-br from-background via-background/95 to-background/90 py-16 overflow-hidden border-t">
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Profile Section */}
            <div className="md:col-span-1 group">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <Code className="h-5 w-5" />
                </div>
                <h3 className="ml-3 text-xl font-bold tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-foreground/80 bg-clip-text text-transparent">
                  Kevin Lin
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Crafting beautiful, user-friendly, and performant web applications with modern technologies.
              </p>
              <div className="flex space-x-3">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-blue-500/10 hover:text-blue-500 transition-colors" asChild>
                  <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-blue-600/10 hover:text-blue-600 transition-colors" asChild>
                  <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-sky-500/10 hover:text-sky-500 transition-colors" asChild>
                  <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </Link>
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-1">
              <h4 className="font-semibold text-lg mb-4 flex items-center">
                <FileCode className="w-4 h-4 mr-2 text-blue-500" />
                Quick Links
              </h4>
              <ul className="space-y-2">
                {[
                  { name: "Home", href: "/" },
                  { name: "About", href: "/about" },
                  { name: "Projects", href: "/projects" },
                  { name: "Blog", href: "/blog" },
                  { name: "Contact", href: "/contact" }
                ].map(item => (
                  <li key={item.name}>
                    <Link 
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-300 hover:pl-1 block"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Projects */}
            <div className="md:col-span-1">
              <h4 className="font-semibold text-lg mb-4 flex items-center">
                <BookOpen className="w-4 h-4 mr-2 text-purple-500" />
                Projects
              </h4>
              <ul className="space-y-2">
                {[
                  { name: "Web Applications", href: "/projects/web" },
                  { name: "Mobile Apps", href: "/projects/mobile" },
                  { name: "Open Source", href: "/projects/opensource" },
                  { name: "UI/UX Designs", href: "/projects/design" },
                  { name: "Case Studies", href: "/projects/case-studies" }
                ].map(item => (
                  <li key={item.name}>
                    <Link 
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-300 hover:pl-1 block"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="md:col-span-1">
              <h4 className="font-semibold text-lg mb-4 flex items-center">
                <Briefcase className="w-4 h-4 mr-2 text-pink-500" />
                Contact
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="mailto:kevin@example.com" 
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center group"
                  >
                    <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                    kevin@example.com
                  </Link>
                </li>
                <li className="text-muted-foreground flex items-center">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-4 rounded-xl bg-background/90 border border-border/30 hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-500 hover:text-white hover:border-transparent transition-all duration-300"
                  >
                    <Link href="/contact">Get in touch</Link>
                  </Button>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-border/20 text-center">
            <p className="text-muted-foreground text-sm">
              &copy; {currentYear} Kevin Lin. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
