"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Project {
  id?: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

interface ProjectsCarouselProps {
  className?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export function ProjectsCarousel({
  className,
  autoPlay = true,
  autoPlayInterval = 5000,
}: ProjectsCarouselProps) {
  // Sample project data - replace with your actual projects
  const projects: Project[] = useMemo(() => [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
      image: "https://images.unsplash.com/photo-1661956600684-97d3a4320e45?w=800&auto=format&fit=crop&q=60",
      technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: true
    },
    {
      id: 2,
      title: "AI Content Generator",
      description:
        "An AI-powered application that generates marketing content, blog posts, and social media captions.",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=60",
      technologies: ["React", "OpenAI API", "Node.js", "MongoDB"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: true
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "A responsive weather dashboard with location-based forecasts and interactive charts.",
      image: "https://images.unsplash.com/photo-1530563885674-66db50a1af19?w=800&auto=format&fit=crop&q=60",
      technologies: ["Vue.js", "Chart.js", "OpenWeather API", "Tailwind"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com"
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "A modern, responsive portfolio website built with Next.js and Tailwind CSS.",
      image: "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=800&auto=format&fit=crop&q=60",
      technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com"
    },
    {
      id: 5,
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates and team collaboration features.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com"
    },
    {
      id: 6,
      title: "Blog Platform",
      description: "A modern blog platform with markdown support, SEO optimization, and content management.",
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=60",
      technologies: ["Next.js", "MDX", "Prisma", "Vercel"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com"
    }
  ], []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  
  const visibleCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 3;
  
  // Define handlers with useCallback to avoid dependency changes on each render
  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    setTimeout(() => setIsAnimating(false), 500); // Match this with animation duration
  }, [isAnimating, projects.length]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
    setTimeout(() => setIsAnimating(false), 500); // Match this with animation duration
  }, [isAnimating, projects.length]);

  const handleDotClick = useCallback((index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500); // Match this with animation duration
  }, [isAnimating, currentIndex]);
  
  // Reset autoplay timer when index changes
  useEffect(() => {
    if (autoPlay) {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
      autoPlayRef.current = setInterval(() => {
        if (!isAnimating) {
          handleNext();
        }
      }, autoPlayInterval);
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [currentIndex, autoPlay, autoPlayInterval, isAnimating, handleNext]);

  // Calculate the drag constraints and positions
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  
  // Update width when window resizes or component mounts
  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
    
    const handleResize = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [projects]);

  // Generate all projects for the carousel
  const getVisibleProjects = () => {
    // Return all projects for the natural scrolling implementation
    return projects.map((project, index) => ({
      ...project,
      index
    }));
  };

  return (
    <section id="projects" className={cn("py-12 overflow-hidden", className)}>
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <motion.h2 
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-center mb-4"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-slate-600 text-center mb-12 max-w-2xl mx-auto"
          >
            Explore my latest work. Swipe through the projects that showcase my skills and passion for creating 
            innovative digital solutions.
          </motion.p>
        </div>

        <div className="relative">
          {/* Carousel Navigation */}
          <div className="absolute top-1/2 -left-4 z-10 -translate-y-1/2 lg:-left-6">
            <Button
              onClick={handlePrev}
              size="icon"
              aria-label="Previous project"
              className="relative group overflow-hidden rounded-full p-3 bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-500 hover:bg-blue-50/50 transition-all duration-300 shadow-sm"
              disabled={isAnimating}
            >
              <motion.div 
                className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              />
              <ChevronLeft className="h-5 w-5 relative z-10" />
              <span className="sr-only">Previous</span>
            </Button>
          </div>

          <div className="absolute top-1/2 -right-4 z-10 -translate-y-1/2 lg:-right-6">
            <Button
              onClick={handleNext}
              size="icon"
              aria-label="Next project"
              className="relative group overflow-hidden rounded-full p-3 bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-500 hover:bg-blue-50/50 transition-all duration-300 shadow-sm"
              disabled={isAnimating}
            >
              <motion.div 
                className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              />
              <ChevronRight className="h-5 w-5 relative z-10" />
              <span className="sr-only">Next</span>
            </Button>
          </div>

          {/* Carousel Wrapper */}
          <div className="mx-auto max-w-6xl overflow-hidden py-4">
            <motion.div 
              ref={carouselRef}
              className="cursor-grab active:cursor-grabbing"
            >
              <motion.div 
                drag="x"
                dragConstraints={{ right: 0, left: -width }}
                dragTransition={{ 
                  bounceStiffness: 600,
                  bounceDamping: 30,
                  power: 0.5 
                }}
                className="flex space-x-6"
                whileTap={{ cursor: "grabbing" }}
                animate={{ x: -currentIndex * (300 + 24) }} // Card width + gap
                transition={{ 
                  type: "spring", 
                  damping: 30, 
                  stiffness: 200,
                  mass: 1
                }}
                onDragEnd={(e, { offset }) => {
                  // Handle swipe to next/previous based on drag distance and velocity
                  const swipeThreshold = 50; // minimum distance to be considered swipe
                  const swipe = offset.x < -swipeThreshold ? 1 : offset.x > swipeThreshold ? -1 : 0;
                  
                  if (swipe !== 0) {
                    const moveBy = swipe < 0 ? Math.max(swipe, -1) : Math.min(swipe, 1);
                    const nextIndex = Math.max(0, Math.min(projects.length - visibleCount, currentIndex + moveBy));
                    setCurrentIndex(nextIndex);
                  }
                }}
              >
                {getVisibleProjects().map((project, idx) => (
                  <motion.div
                    key={`${project.id}-${idx}`}
                    className="flex-shrink-0 w-full sm:w-[300px] px-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      ease: "easeOut",
                      delay: idx * 0.1 % 0.3 // Stagger effect but reset every 3 items
                    }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {projects.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => handleDotClick(idx)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all", 
                  idx === currentIndex 
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 w-5"
                    : "bg-slate-300 hover:bg-blue-400"
                )}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to project ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <Card className="overflow-hidden h-full transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-muted">
      <div 
        className="relative aspect-video overflow-hidden" 
        style={{
          backgroundImage: `url(${project.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        {project.featured && (
          <div className="absolute top-2 right-2 z-10">
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 border-0 text-white">
              Featured
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-5">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, idx) => (
            <Badge key={idx} variant="secondary" className="bg-muted/50">
              {tech}
            </Badge>
          ))}
        </div>
        
        <div className="flex gap-3 mt-auto pt-2">
          {project.liveUrl && (
            <Button asChild size="sm" className="relative group overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Live Demo
                </span>
              </Link>
            </Button>
          )}
          {project.githubUrl && (
            <Button variant="outline" size="sm" asChild className="border-slate-600 hover:border-blue-500 hover:bg-blue-500/5">
              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                Code
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
