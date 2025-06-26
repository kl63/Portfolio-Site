"use client"

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  GraduationCap, 
  Briefcase, 
  Calendar, 
  MapPin, 
  Building
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface TimelineItemProps {
  id: string
  type: 'education' | 'work'
  title: string
  subtitle: string
  location?: string
  startDate: string
  endDate: string
  description?: string[]
  technologies?: string[]
  achievements?: string[]
  index: number
  isLast: boolean
}

export function TimelineItem({
  type,
  title,
  subtitle,
  location,
  startDate,
  endDate,
  description,
  technologies,
  achievements,
  index,
  isLast
}: TimelineItemProps) {
  const itemRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(itemRef, { once: true, margin: "-100px" })
  
  const isEven = index % 2 === 0;
  
  return (
    <div ref={itemRef} className="relative mb-14">
      {/* Timeline connector - moved into icon container to avoid line showing through */}
      <div className="relative">
        {!isLast && (
          <div className="absolute top-16 h-full left-8 hidden md:block">
            <div className="h-full w-[1px] bg-gradient-to-b from-primary/30 via-primary/10 to-transparent rounded-full" />
          </div>
        )}
      </div>
      
      <div className={cn(
        "flex flex-col md:flex-row items-start gap-4",
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      )}>
        {/* Icon bubble */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={cn(
            "relative z-10 flex items-center justify-center w-16 h-16 rounded-full",
            type === 'education' ? "bg-blue-100 dark:bg-blue-950/50" : "bg-amber-100 dark:bg-amber-950/50"
          )}
        >
          <div className={cn(
            "flex items-center justify-center w-12 h-12 rounded-full shadow-md",
            type === 'education' ? "bg-gradient-to-br from-blue-400 to-blue-600" : 
                                  "bg-gradient-to-br from-amber-400 to-amber-600"
          )}>
            {type === 'education' ? (
              <GraduationCap className="h-6 w-6 text-white" />
            ) : (
              <Briefcase className="h-6 w-6 text-white" />
            )}
          </div>
        </motion.div>

        {/* Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1"
        >
          <Card className={cn(
            "overflow-hidden border-t-4",
            type === 'education' ? "border-t-blue-500" : "border-t-amber-500"
          )}>
            <CardHeader>
              <div className="flex flex-col space-y-1">
                <CardTitle className="text-xl">{title}</CardTitle>
                <CardDescription className="text-lg font-medium text-primary">
                  {subtitle}
                </CardDescription>
                
                <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    {startDate} - {endDate}
                  </div>
                  {location && (
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4" />
                      {location}
                    </div>
                  )}
                  {type === 'work' && (
                    <div className="flex items-center">
                      <Building className="mr-1 h-4 w-4" />
                      {subtitle}
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {description && description.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold">Responsibilities:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {achievements && achievements.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold">Key Achievements:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {achievements.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {technologies && technologies.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, i) => (
                      <Badge 
                        key={i} 
                        className={cn(
                          "transition-all hover:scale-105",
                          type === 'education' ? "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/40 dark:text-blue-300" : 
                                               "bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/40 dark:text-amber-300"
                        )}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

interface ExperienceItem {
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

interface EducationItem {
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

interface TimelineSectionProps {
  title: string
  items: ExperienceItem[] | EducationItem[]
  type: 'education' | 'work'
  className?: string
}

export function TimelineSection({ title, items, type, className }: TimelineSectionProps) {
  return (
    <div className={cn("space-y-8", className)}>
      <h2 className="text-3xl font-bold relative">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary">
          {title}
        </span>
      </h2>
      
      <div className="space-y-12">
        {items.map((item, index) => {
          // Type guard functions to help TypeScript understand our data types
          const isEducation = (item: ExperienceItem | EducationItem): item is EducationItem => type === 'education';
          const isExperience = (item: ExperienceItem | EducationItem): item is ExperienceItem => type === 'work';
          
          return (
            <TimelineItem
              key={item.id}
              id={item.id}
              type={type}
              title={isEducation(item) ? item.degree : isExperience(item) ? item.position : ''}
              subtitle={isEducation(item) ? item.institution : isExperience(item) ? item.company : ''}
              location={item.location}
              startDate={item.startDate}
              endDate={item.endDate}
              description={isExperience(item) ? item.description : undefined}
              technologies={isExperience(item) ? item.technologies : undefined}
              achievements={isEducation(item) ? item.honors : isExperience(item) ? item.achievements : undefined}
              index={index}
              isLast={index === items.length - 1}
            />
          );
        })}
      </div>
    </div>
  )
}
