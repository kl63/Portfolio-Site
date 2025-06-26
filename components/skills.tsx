"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { motion } from "framer-motion";

type SkillLevel = 0 | 1 | 2 | 3 | 4 | 5;

interface Skill {
  name: string;
  level: SkillLevel;
  color?: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
  color: string;
  gradientStart: string;
  gradientEnd: string;
}

// Radar chart component for skill visualization
interface SkillRadarChartProps {
  skills: Skill[];
  color: string;
  gradientStart: string;
  gradientEnd: string;
}

const SkillRadarChart: React.FC<SkillRadarChartProps> = ({ skills, color, gradientStart, gradientEnd }) => {
  // Format data for the radar chart
  const data = skills.map(skill => ({
    subject: skill.name,
    value: skill.level,
    fullMark: 5
  }));

  const gradientId = `skillGradient-${color.replace('#', '')}`;

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="55%" data={data} startAngle={30} endAngle={-330}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={gradientStart} stopOpacity={0.8} />
              <stop offset="95%" stopColor={gradientEnd} stopOpacity={0.5} />
            </linearGradient>
          </defs>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={props => {
              const { x, y, payload, index } = props;
              // Calculate position for text to avoid overlaps - ensure x is defined
              const xPos = typeof x === 'number' ? x : 0;
              const yPos = typeof y === 'number' ? y : 0;
              const textAnchor = index === 0 ? 'middle' : (xPos > 50 ? 'start' : 'end');
              // Adjust y position based on index to avoid overlapping with the polar grid
              // For the top label (typically index 0), push it up more to avoid overlap
              const adjustedY = index === 0 ? yPos - 15 : yPos;
              // Add more spacing to avoid overlapping with the "5" value
              const spacing = 8;
              return (
                <g transform={`translate(${xPos},${adjustedY})`}>
                  <text 
                    x={textAnchor === 'start' ? spacing : textAnchor === 'end' ? -spacing : 0} 
                    y={0} 
                    dy={3}
                    textAnchor={textAnchor} 
                    fill="#64748b"
                    fontSize={8}
                  >
                    {payload.value}
                  </text>
                </g>
              );
            }}
            tickLine={false}
          />
          <PolarRadiusAxis 
            angle={75} 
            domain={[0, 5]} 
            tick={{ fill: '#64748b', fontSize: 8 }}
            tickCount={6}
            axisLine={false}
            // Hide all the numbers by returning empty strings
            tickFormatter={() => ''}
          />
          <Radar 
            name="Skills" 
            dataKey="value" 
            stroke={color} 
            fill={`url(#${gradientId})`} 
            fillOpacity={0.6} 
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Skill level indicator
const SkillLevelDisplay: React.FC<{ level: SkillLevel; color: string }> = ({ level, color }) => {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <div 
          key={i} 
          className="w-2 h-2 rounded-full"
          style={{ 
            backgroundColor: i < level ? color : '#e2e8f0' 
          }}
        />
      ))}
    </div>
  );
};

export function Skills() {
  const skillCategories: SkillCategory[] = [
    {
      title: "Frontend",
      color: "#3b82f6",
      gradientStart: "#60a5fa",
      gradientEnd: "#93c5fd",
      skills: [
        { name: "React", level: 5 },
        { name: "Next.js", level: 5 },
        { name: "TypeScript", level: 5 },
        { name: "Tailwind CSS", level: 5 },
        { name: "Vue.js", level: 4 },
        { name: "HTML5/CSS3", level: 5 },
      ],
    },
    {
      title: "Backend",
      color: "#10b981", 
      gradientStart: "#34d399",
      gradientEnd: "#6ee7b7",
      skills: [
        { name: "Node.js", level: 5 },
        { name: "Python", level: 3 },
        { name: "Express", level: 3 },
        { name: "FastAPI", level: 5 },
        { name: "PostgreSQL", level: 5 },
        { name: "MongoDB", level: 4 },
      ],
    },
    {
      title: "Tools & Platforms",
      color: "#f59e0b",
      gradientStart: "#fbbf24",
      gradientEnd: "#fcd34d",
      skills: [
        { name: "Git", level: 5 },
        { name: "Docker", level: 4 },
        { name: "AWS", level: 3 },
        { name: "Vercel", level: 5 },
        { name: "Figma", level: 3 },
        { name: "Jest/Cypress", level: 4 },
      ],
    },
  ];

  // Animation variants for elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="skills" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-center mb-4"
          >
            Skills & Proficiency
          </motion.h2>
          
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-slate-600 text-center mb-12 max-w-2xl mx-auto"
          >
            Visualizing my technical expertise with interactive radar charts
          </motion.p>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {skillCategories.map((category, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full overflow-hidden shadow-md hover:shadow-lg transition-all duration-300" 
                  style={{
                    background: `linear-gradient(135deg, rgba(255,255,255,0.95) 0%, ${category.color}25 100%)`,
                    borderRadius: '8px',
                    border: `1px solid ${category.color}20`,
                  }}>
                  <CardHeader className="border-b pb-2" style={{ 
                    background: `linear-gradient(to right, rgba(255,255,255,0.8), ${category.color}25)`,
                    borderBottom: `1px solid ${category.color}30`
                  }}>
                    <CardTitle className="text-center flex items-center justify-center gap-2">
                      <span 
                        className="inline-block w-3 h-3 rounded-full" 
                        style={{ backgroundColor: category.color }}
                      ></span>
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <SkillRadarChart 
                      skills={category.skills} 
                      color={category.color}
                      gradientStart={category.gradientStart}
                      gradientEnd={category.gradientEnd}
                    />
                    
                    <div className="mt-6 space-y-3">
                      {category.skills.map((skill, skillIndex) => (
                        <div key={skillIndex} className="flex justify-between items-center">
                          <div className="text-sm font-medium">{skill.name}</div>
                          <SkillLevelDisplay level={skill.level} color={category.color} />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
