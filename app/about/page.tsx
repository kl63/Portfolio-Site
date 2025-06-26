"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Header } from "@/components/NavBar"
import { Footer } from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Code, Users, BookOpen } from "lucide-react"



export default function AboutPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse position for interactive gradient effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const gradientStyle = {
    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(124, 58, 237, 0.1), rgba(219, 39, 119, 0.05), transparent)`,
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background gradient elements */}
      <div className="fixed inset-0 opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 -right-20 w-80 h-80 bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        <div className="absolute -bottom-20 left-20 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-3000"></div>
      </div>
      <div className="relative min-h-screen" style={gradientStyle}>
      <Header />
      <main className="pt-20 relative z-10">
        <section className="py-20 bg-gradient-to-b from-muted/30 to-muted/60 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl font-bold text-center mb-12 text-foreground">
                About Me
              </h1>

              <Card className="border-none bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                      <div className="relative overflow-hidden rounded-lg border border-purple-100 dark:border-slate-800">
                        <Image
                          src="/placeholder.svg?height=400&width=400"
                          width={400}
                          height={400}
                          alt="Profile"
                          className="rounded-lg w-full max-w-sm mx-auto hover:scale-105 transition-all duration-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-semibold mb-4 text-foreground">
                          Hello, I&apos;m <span className="font-bold">Alex Johnson</span>
                        </h2>
                        <p className="text-lg text-muted-foreground mb-4">
                          I&apos;m a passionate full-stack developer with over 5 years of experience building web
                          applications. I love turning complex problems into simple, beautiful designs that users love
                          to interact with.
                        </p>
                        <p className="text-lg text-muted-foreground mb-4">
                          My journey in tech started during college when I built my first website. Since then, I&apos;ve
                          worked with startups and established companies, helping them bring their digital visions to
                          life.
                        </p>
                        <p className="text-lg text-muted-foreground">
                          When I&apos;m not coding, you can find me exploring new technologies, contributing to open source
                          projects, hiking in the mountains, or enjoying a good cup of coffee while reading about the
                          latest in web development.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-6 pt-6 border-t border-purple-100 dark:border-slate-800">
                        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 p-3 rounded-xl">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-6 w-6 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
                              <Sparkles className="h-3 w-3 text-white" />
                            </div>
                            <h4 className="font-semibold text-primary">Experience</h4>
                          </div>
                          <p className="text-muted-foreground font-medium">5+ Years</p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-3 rounded-xl">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                              <Code className="h-3 w-3 text-white" />
                            </div>
                            <h4 className="font-semibold text-primary">Projects</h4>
                          </div>
                          <p className="text-muted-foreground font-medium">50+ Completed</p>
                        </div>
                        <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/30 p-3 rounded-xl">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center">
                              <Users className="h-3 w-3 text-white" />
                            </div>
                            <h4 className="font-semibold text-primary">Location</h4>
                          </div>
                          <p className="text-muted-foreground font-medium">San Francisco, CA</p>
                        </div>
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 p-3 rounded-xl">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-6 w-6 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                              <BookOpen className="h-3 w-3 text-white" />
                            </div>
                            <h4 className="font-semibold text-primary">Availability</h4>
                          </div>
                          <p className="text-muted-foreground font-medium">Open to work</p>
                          <Badge className="mt-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 border-0">Available Now</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-12 grid md:grid-cols-3 gap-8">
                <Card className="overflow-hidden group border-none hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
                  <div className="h-2 bg-gradient-to-r from-purple-500 via-purple-600 to-violet-600"></div>
                  <CardContent className="p-6 text-center bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-2">Problem Solver</h3>
                    <p className="text-muted-foreground">
                      I enjoy breaking down complex challenges into manageable solutions that drive real business value.
                    </p>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden group border-none hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
                  <div className="h-2 bg-gradient-to-r from-blue-500 via-indigo-600 to-blue-600"></div>
                  <CardContent className="p-6 text-center bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-2">Team Player</h3>
                    <p className="text-muted-foreground">
                      Collaboration is key. I work well with designers, product managers, and fellow developers.
                    </p>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden group border-none hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300">
                  <div className="h-2 bg-gradient-to-r from-pink-500 via-rose-600 to-pink-600"></div>
                  <CardContent className="p-6 text-center bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-2">Lifelong Learner</h3>
                    <p className="text-muted-foreground">
                      Technology evolves rapidly, and I&apos;m committed to staying current with the latest trends and tools.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      </div>
      {/* Add CSS animations */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
