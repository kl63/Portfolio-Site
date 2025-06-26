"use client"

import { useState } from "react"
import { MinimalFooter, GraphicsFooter, NewsletterFooter } from "@/components/ui/portfolio-footer"
import { Button } from "@/components/ui/button"

export default function FooterDemo() {
  const [selectedFooter, setSelectedFooter] = useState<"minimal" | "graphics" | "newsletter">("minimal")
  
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 px-4 py-12">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8">Footer Variants</h1>
          
          <div className="flex flex-wrap gap-4 mb-12">
            <Button 
              variant={selectedFooter === "minimal" ? "default" : "outline"}
              onClick={() => setSelectedFooter("minimal")}
            >
              Minimal Footer
            </Button>
            <Button 
              variant={selectedFooter === "graphics" ? "default" : "outline"}
              onClick={() => setSelectedFooter("graphics")}
            >
              Graphics Footer
            </Button>
            <Button 
              variant={selectedFooter === "newsletter" ? "default" : "outline"}
              onClick={() => setSelectedFooter("newsletter")}
            >
              Newsletter Footer
            </Button>
          </div>
          
          <div className="p-6 border rounded-lg bg-gray-50 dark:bg-gray-900 mb-8">
            <h2 className="text-lg font-semibold mb-4">
              {selectedFooter === "minimal" && "Minimal Footer"}
              {selectedFooter === "graphics" && "Graphics Footer"}
              {selectedFooter === "newsletter" && "Newsletter Footer"}
            </h2>
            <p className="mb-6">Click the buttons above to preview each footer variant.</p>
            
            <div className="text-sm mb-4">
              <strong>Description:</strong>
              {selectedFooter === "minimal" && (
                <p className="mt-1">A clean, simple footer with just the essential information. Perfect for minimalist designs.</p>
              )}
              {selectedFooter === "graphics" && (
                <p className="mt-1">An elegant footer with subtle graphics and a two-column layout. Includes more navigation options.</p>
              )}
              {selectedFooter === "newsletter" && (
                <p className="mt-1">A full-featured footer with newsletter signup form and comprehensive navigation links.</p>
              )}
            </div>
            
            <div className="text-right">
              <Button asChild>
                <a href="/">Return to Home</a>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      {selectedFooter === "minimal" && <MinimalFooter />}
      {selectedFooter === "graphics" && <GraphicsFooter />}
      {selectedFooter === "newsletter" && <NewsletterFooter />}
    </div>
  )
}
