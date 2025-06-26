"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Filter, 
  Github, 
  ExternalLink, 
  Calendar, 
  Star, 
  Eye,
  Code,
  Palette,
  Smartphone,
  Globe,
  Database,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TiltCard from "@/components/ui/tilt-card";

// Types
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  technologies: string[];
  category: string;
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
  completedDate: string;
}

// Function to get category icon
const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "frontend":
      return <Palette className="w-5 h-5" />;
    case "backend":
      return <Database className="w-5 h-5" />;
    case "mobile":
      return <Smartphone className="w-5 h-5" />;
    case "full-stack":
      return <Code className="w-5 h-5" />;
    case "web":
      return <Globe className="w-5 h-5" />;
    default:
      return <Zap className="w-5 h-5" />;
  }
};

// Project Card Component
const ProjectCard: React.FC<{project: Project}> = ({ project }) => {
  return (
    <TiltCard className="h-full">
      <Card className="overflow-hidden group h-full flex flex-col border-border/50 bg-card relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-purple-400/25 z-10"></div>
        <div className="aspect-video overflow-hidden relative">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <CardHeader className="pb-2 relative">
          <div className="flex items-center justify-between mb-1">
            <Badge 
              variant="outline" 
              className="text-xs border-primary/50 bg-background/80 backdrop-blur-sm"
            >
              <span className="mr-1.5 text-primary">{getCategoryIcon(project.category)}</span>
              {project.category}
            </Badge>
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              {project.completedDate}
            </div>
          </div>
          <CardTitle className="text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {project.title}
          </CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-3 mt-1">
            {project.description}
          </p>
        </CardHeader>

        <CardContent className="pt-2 mt-auto">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies.slice(0, 3).map((tech, index) => (
              <Badge key={index} variant="secondary" className="text-xs py-0">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 3 && (
              <Badge variant="secondary" className="text-xs py-0">
                +{project.technologies.length - 3}
              </Badge>
            )}
          </div>

          <div className="flex gap-2">
            {project.liveUrl && (
              <Button asChild size="sm" className="flex-1 group relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center">
                    <ExternalLink className="h-3.5 w-3.5 mr-1.5 group-hover:scale-125 transition-transform" />
                    Demo
                  </span>
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button variant="outline" size="sm" asChild className="border-slate-600 hover:border-blue-500 hover:bg-blue-500/5">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="group">
                  <Github className="h-3.5 w-3.5 group-hover:scale-125 transition-transform" />
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </TiltCard>
  );
};

// Featured Project Card Component
const FeaturedProjectCard: React.FC<{project: Project}> = ({ project }) => {
  return (
    <TiltCard className="h-full">
      <Card className="overflow-hidden group h-full flex flex-col border-border/50 bg-card relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600/80 to-purple-400/25 z-10"></div>
        <div className="lg:flex">
          <div className="lg:w-1/2 aspect-video overflow-hidden relative">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          
          <div className="lg:w-1/2 flex flex-col p-6">
            <div className="flex items-center justify-between mb-2">
              <Badge 
                variant="outline" 
                className="text-sm border-primary/50"
              >
                <span className="mr-1.5 text-primary">{getCategoryIcon(project.category)}</span>
                {project.category}
              </Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                {project.completedDate}
              </div>
            </div>
            
            <h3 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            
            <p className="text-muted-foreground mb-4 flex-grow">
              {project.longDescription || project.description}
            </p>
            
            <div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.technologies.map((tech, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-2">
                {project.liveUrl && (
                  <Button asChild size="sm" className="relative group overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative z-10 flex items-center">
                        <ExternalLink className="h-4 w-4 mr-2 group-hover:scale-125 transition-transform" />
                        Live Demo
                      </span>
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button variant="outline" size="sm" asChild className="border-slate-600 hover:border-blue-500 hover:bg-blue-500/5">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2 group-hover:scale-125 transition-transform" />
                      Code
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </TiltCard>
  );
};
const FilterBadge: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, isActive, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Badge
        variant={isActive ? "default" : "outline"}
        className={`cursor-pointer transition-all duration-300 ${isActive 
          ? "bg-gradient-to-r from-blue-500 to-purple-600 border-none text-white shadow-md" 
          : "hover:border-blue-400 bg-white/5 backdrop-blur-sm hover:text-blue-500"}`}
        onClick={onClick}
      >
        {label}
      </Badge>
    </motion.div>
  );
};

// ProjectsShowcase Component
export const ProjectsShowcase: React.FC<{ projects: Project[] }> = ({ 
  projects 
}) => {
  // State for filters
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [filteredProjects, setFilteredProjects] = useState(projects);

  // Get unique technologies and categories
  const uniqueTechnologies = Array.from(
    new Set(projects.flatMap((project) => project.technologies))
  ).sort();
  
  const uniqueCategories = Array.from(
    new Set(projects.map((project) => project.category))
  ).sort();

  // Filter projects when filters change
  useEffect(() => {
    let result = projects;

    if (activeTech) {
      result = result.filter((project) =>
        project.technologies.includes(activeTech)
      );
    }

    if (activeCategory) {
      result = result.filter((project) => project.category === activeCategory);
    }

    setFilteredProjects(result);
  }, [activeTech, activeCategory, projects]);

  // Handle filter clicks
  const handleTechClick = (tech: string) => {
    setActiveTech(activeTech === tech ? null : tech);
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  const resetFilters = () => {
    setActiveTech(null);
    setActiveCategory(null);
  };

  // Sort projects: featured first, then rest
  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const regularProjects = filteredProjects.filter((p) => !p.featured);

  return (
    <div className="py-12">
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">My Projects</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore my portfolio of projects showcasing my skills and passion for development.
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div 
        className="mb-8 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 backdrop-blur-sm border border-blue-100/20 dark:border-purple-800/20 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md text-white shadow-md">
              <Filter className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-lg">Filter Projects</h3>
          </div>
          
          {(activeTech || activeCategory) && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={resetFilters} 
              className="text-xs bg-white/60 dark:bg-slate-800/60 shadow-sm border border-slate-200 dark:border-slate-700 hover:border-blue-400 text-slate-600 dark:text-slate-300 hover:text-blue-600 hover:bg-white/80 dark:hover:bg-slate-800/80"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Clear filters
              </motion.span>
            </Button>
          )}
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              className="p-3 rounded-md bg-white/60 dark:bg-slate-800/30 border border-blue-100/30 dark:border-purple-900/20"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
            <h4 className="text-sm font-medium mb-3 text-blue-600 dark:text-blue-400 flex items-center gap-2">
              <div className="h-1 w-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              Categories
            </h4>
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {uniqueCategories.map((category) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FilterBadge
                      label={category}
                      isActive={activeCategory === category}
                      onClick={() => handleCategoryClick(category)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div 
            className="p-3 rounded-md bg-white/60 dark:bg-slate-800/30 border border-purple-100/30 dark:border-blue-900/20"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <h4 className="text-sm font-medium mb-3 text-purple-600 dark:text-purple-400 flex items-center gap-2">
              <div className="h-1 w-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {uniqueTechnologies.map((tech) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FilterBadge
                      label={tech}
                      isActive={activeTech === tech}
                      onClick={() => handleTechClick(tech)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="space-y-16">
        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Star className="w-6 h-6 text-purple-600" />
              Featured Projects
            </h2>

            <div className="grid gap-8">
              <AnimatePresence>
                {featuredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    layout
                  >
                    <FeaturedProjectCard project={project} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Regular Projects */}
        {regularProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Eye className="w-6 h-6 text-purple-600" />
              All Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {regularProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    layout
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No projects found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProjectsShowcase;
