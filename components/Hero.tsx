'use client';

import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GlowEffect } from '@/components/ui/glow-effect';

export function Hero() {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background effects - higher z-index to ensure visibility */}
      <div className="fixed inset-0 bg-gradient-to-b from-white via-slate-50 to-slate-100 -z-10" />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] z-0" />
      
      {/* Blue glow effect */}
      <GlowEffect
        colors={['#3b82f6', '#4f46e5', '#6366f1', '#8b5cf6']} 
        mode="breathe"
        blur="strong"
        className="opacity-30 z-0"
      />
      
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto">
          {/* Top animated badge */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 py-1.5 px-3 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-xs font-medium tracking-wider uppercase">Available for hire</span>
            </motion.div>
          </motion.div>

          {/* Main content */}
          <div className="text-center">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-slate-600 text-sm md:text-base font-mono mb-3"
            >
              <span className="text-blue-400">&lt;</span>
              <span>Welcome</span>
              <span className="text-blue-400">/&gt;</span>
            </motion.div>
            
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              I&apos;m <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Kevin Lin</span>
            </motion.h1>
            
            {/* Animated code block */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 }}
              className="relative mx-auto mb-12 max-w-md"
            >
              <div className="bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4 font-mono text-left overflow-hidden shadow-lg">
                <div className="flex items-center mb-2">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs text-slate-400 mx-auto pr-7">Developer.js</div>
                </div>
                <div className="text-sm">
                  <div className="text-slate-400">
                    <span className="text-purple-400">const </span>
                    <span className="text-blue-300">developer</span>
                    <span> = </span>
                    <span className="text-orange-300">&#123;</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-green-300">name</span>
                    <span className="text-slate-400">: </span>
                    <span className="text-yellow-300">&apos;Kevin Lin&apos;</span>
                    <span className="text-slate-400">,</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-green-300">role</span>
                    <span className="text-slate-400">: </span>
                    <span className="text-yellow-300">&apos;Full Stack Developer&apos;</span>
                    <span className="text-slate-400">,</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-green-300">skills</span>
                    <span className="text-slate-400">: [</span>
                    <span className="text-yellow-300">&apos;React&apos;</span>
                    <span className="text-slate-400">, </span>
                    <span className="text-yellow-300">&apos;Node.js&apos;</span>
                    <span className="text-slate-400">, </span>
                    <span className="text-yellow-300">&apos;TypeScript&apos;</span>
                    <span className="text-slate-400">, ...</span>
                    <span className="text-slate-400">],</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-green-300">status</span>
                    <span className="text-slate-400">: </span>
                    <span className="text-yellow-300">&apos;Crafting digital experiences&apos;</span>
                  </div>
                  <div className="text-orange-300">&#125;</div>
                  <div className="flex items-center mt-1">
                    <span className="text-blue-300">developer</span>
                    <span className="text-slate-400">.</span>
                    <span className="text-purple-400">connect</span>
                    <span className="text-slate-400">()</span>
                    <div className="w-2 h-5 bg-blue-400 ml-1 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="text-slate-600 mb-8 max-w-2xl mx-auto text-lg"
            >
              Building elegant user interfaces and robust backends with a passion for clean,
              efficient code and exceptional user experiences.
            </motion.p>

            {/* Call to action buttons */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              <Button
                size="lg"
                className="relative group overflow-hidden rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6 text-white"
                asChild
              >
                <Link href="/projects">
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10">View My Work</span>
                </Link>
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-slate-600 hover:border-blue-500 hover:bg-blue-500/5 px-8 py-6"
                asChild
              >
                <Link href="/contact">Get In Touch</Link>
              </Button>
            </motion.div>

            {/* Social icons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="flex justify-center gap-5"
            >
              {[
                { icon: Github, href: 'https://github.com', label: 'GitHub' },
                { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:contact@kevinlin.dev', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full text-slate-600 hover:text-blue-600 hover:border-blue-500 hover:bg-blue-50/50 transition-all duration-300 shadow-sm"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center shadow-sm"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-slate-400/70 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
