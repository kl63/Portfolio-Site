"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { Send, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Header } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

// Types for our form data
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Eyeballs component that follows cursor movement and reacts to text changes
const EyeballsAnimation = ({ currentTextIndex }: { currentTextIndex: number }) => {
  
  // Eye positions (calculated values, not motion values)
  const [leftEye, setLeftEye] = useState({ x: 0, y: 0 });
  const [rightEye, setRightEye] = useState({ x: 0, y: 0 });
  
  // Spring animation values for smooth movement
  const leftSpringX = useSpring(0, { stiffness: 300, damping: 20 });
  const leftSpringY = useSpring(0, { stiffness: 300, damping: 20 });
  const rightSpringX = useSpring(0, { stiffness: 300, damping: 20 });
  const rightSpringY = useSpring(0, { stiffness: 300, damping: 20 });
  
  // Track if eyes are blinking
  const [isBlinking, setIsBlinking] = useState(false);
  
  // Text-based vertical movement
  const [textOffset, setTextOffset] = useState(0);
  
  // Update textOffset when the text index changes - creates a bouncing effect
  useEffect(() => {
    // Make the eyes "jump" when text changes
    setTextOffset(5);
    
    // Trigger a blink
    setIsBlinking(true);
    
    const timeout1 = setTimeout(() => {
      setTextOffset(-3);
    }, 150);
    
    const timeout2 = setTimeout(() => {
      setTextOffset(0);
      setIsBlinking(false);
    }, 300);
    
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [currentTextIndex]);
  
  // Update spring values when mouse or text offset changes
  useEffect(() => {
    leftSpringX.set(leftEye.x);
    leftSpringY.set(leftEye.y + textOffset);
    rightSpringX.set(rightEye.x);
    rightSpringY.set(rightEye.y + textOffset);
  }, [leftEye, rightEye, textOffset, leftSpringX, leftSpringY, rightSpringX, rightSpringY]);

  // Reference to the container for relative positioning calculations
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent | MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Normalized mouse position relative to center
    const mouseXNorm = (e.clientX - centerX) / (rect.width / 2) * 8;
    const mouseYNorm = (e.clientY - centerY) / (rect.height / 2) * 5;

    
    // Update eye positions
    setLeftEye({
      x: mouseXNorm * 0.4,
      y: mouseYNorm * 0.4
    });
    
    setRightEye({
      x: mouseXNorm * 0.38, // Slightly different factor for subtle effect
      y: mouseYNorm * 0.42
    });
  };

  // Set up mouse move listener
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full flex justify-center items-center gap-12 mb-8 mt-4 h-40">
      {/* Left Eyeball */}
      <div className="relative w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-xl border border-gray-200">
        <motion.div 
          className={`w-16 h-16 rounded-full bg-black flex items-center justify-center transition-opacity duration-100 ${isBlinking ? 'opacity-10' : 'opacity-100'}`} 
          style={{ x: leftSpringX, y: leftSpringY }}
        >
          <div className="w-7 h-7 rounded-full bg-white opacity-60"></div>
        </motion.div>
      </div>
      
      {/* Right Eyeball */}
      <div className="relative w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-xl border border-gray-200">
        <motion.div 
          className={`w-16 h-16 rounded-full bg-black flex items-center justify-center transition-opacity duration-100 ${isBlinking ? 'opacity-10' : 'opacity-100'}`} 
          style={{ x: rightSpringX, y: rightSpringY }}
        >
          <div className="w-7 h-7 rounded-full bg-white opacity-60"></div>
        </motion.div>
      </div>
    </div>
  );
};

// Rotating text animation component
const RotatingText = ({ 
  textArray, 
  onTextChange 
}: { 
  textArray: string[],
  onTextChange: (index: number) => void 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = (currentIndex + 1) % textArray.length;
      setCurrentIndex(newIndex);
      onTextChange(newIndex);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [currentIndex, onTextChange, textArray.length]);

  return (
    <div className="h-16 relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute w-full text-center"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            {textArray[currentIndex]}
          </h1>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default function ContactPage() {
  const rotatingTextOptions = [
    "Let's Connect",
    "Get In Touch",
    "Say Hello",
    "Start A Project",
    "Drop A Line"
  ];
  
  // Track the current text index to sync with eyeball animations
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  const handleTextChange = (index: number) => {
    setCurrentTextIndex(index);
  };

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"" | "success" | "error">("");
  
  // Define contact info directly in the UI where needed

  // Social links are used directly in the UI

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus("success");
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(""), 3000);
    }
  };


  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <EyeballsAnimation currentTextIndex={currentTextIndex} />
          
          <div className="text-center mb-4">
            <RotatingText 
              textArray={rotatingTextOptions} 
              onTextChange={handleTextChange}
            />
          </div>
          
          <p className="text-xl text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            I&apos;m always open to discussing new opportunities, interesting projects, or just having a chat about technology.
          </p>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Contact Information */}
                <div className="lg:col-span-1 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                      <CardDescription>Feel free to reach out through any of these channels</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-muted-foreground">alex@example.com</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Phone</p>
                          <p className="text-muted-foreground">+1 (555) 123-4567</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Location</p>
                          <p className="text-muted-foreground">San Francisco, CA</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Response Time</p>
                          <p className="text-muted-foreground">Within 24 hours</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Availability</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Freelance Projects</span>
                          <span className="text-green-600 font-medium">Available</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Full-time Roles</span>
                          <span className="text-green-600 font-medium">Open</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Consulting</span>
                          <span className="text-green-600 font-medium">Available</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Send a Message</CardTitle>
                      <CardDescription>We&apos;ll get back to you as soon as possible!</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name">Name *</Label>
                            <Input
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              placeholder="Your full name"
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">Email *</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              placeholder="your.email@example.com"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="subject">Subject *</Label>
                          <Input
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            placeholder="What's this about?"
                          />
                        </div>
                        <div>
                          <Label htmlFor="message">Message *</Label>
                          <Textarea
                            id="message"
                            name="message"
                            rows={6}
                            value={formData.message}
                            onChange={handleChange}
                            required
                            placeholder="Tell me about your project or what you&apos;d like to discuss..."
                          />
                        </div>

                        {submitStatus === "success" && (
                          <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                            <p className="text-green-800">Thank you for your message! I&apos;ll get back to you soon.</p>
                          </div>
                        )}

                        {submitStatus === "error" && (
                          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-red-800">
                              Sorry, there was an error sending your message. Please try again.
                            </p>
                          </div>
                        )}

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4 mr-2" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
