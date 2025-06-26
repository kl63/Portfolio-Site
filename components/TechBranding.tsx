"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Interface for the technology logo item
interface TechLogo {
  name: string;
  logo: string;
  darkMode?: boolean;
}

// Props for the component
interface TechBrandingProps {
  className?: string;
}

export function TechBranding({ className }: TechBrandingProps) {
  // Array of technology logos - these can be updated with your actual tech stack
  const techLogos: TechLogo[] = [
    { name: "React", logo: "/logos/react.svg" },
    { name: "Next.js", logo: "/logos/nextjs.svg", darkMode: true },
    { name: "TypeScript", logo: "/logos/typescript.svg" },
    { name: "JavaScript", logo: "/logos/javascript.svg" },
    { name: "Node.js", logo: "/logos/nodejs.svg" },
    { name: "Python", logo: "/logos/python.svg" },
    { name: "MongoDB", logo: "/logos/mongodb.svg" },
    { name: "PostgreSQL", logo: "/logos/postgresql.svg" },
    { name: "Tailwind CSS", logo: "/logos/tailwind.svg" },
    { name: "Docker", logo: "/logos/docker.svg" },
    { name: "Git", logo: "/logos/git.svg" },
    { name: "Vercel", logo: "/logos/vercel.svg" },
  ];
  
  // All logos will be in a single row

  return (
    <section className={`py-12 bg-white relative overflow-hidden ${className || ''}`}>
      {/* Subtle gradient background instead of grid lines */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-950 z-0" />
      
      <div className="container mx-auto px-4 mb-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            My Tech Stack
          </motion.h2>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-slate-600"
          >
            Technologies, frameworks and tools I work with
          </motion.p>
        </div>
      </div>
      
      {/* Single row of logos - moves right to left */}
      <div className="relative marquee-container">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 40,
            ease: "linear"
          }}
          className="flex whitespace-nowrap"
        >
          {/* Display each logo twice to create seamless loop */}
          {[...techLogos, ...techLogos].map((tech, index) => (
            <div key={index} className="flex flex-col items-center mx-8">
              <div className="relative h-16 w-16 mb-3 flex items-center justify-center bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                <div className={`relative h-12 w-12 ${tech.darkMode ? "dark-logo" : ""}`}>
                  <Image
                    src={tech.logo}
                    alt={tech.name}
                    fill
                    style={{ objectFit: "contain" }}
                    className="transition-all duration-300 hover:scale-110"
                  />
                </div>
              </div>
              <span className="text-sm font-medium text-slate-600">{tech.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Gradient overlays for fade effect on edges */}
      <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10" />
      
      {/* Add some global styles for the dark logos */}
      <style jsx global>{`
        .dark-logo {
          filter: invert(1) brightness(1.8);
        }
        .marquee-container {
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
