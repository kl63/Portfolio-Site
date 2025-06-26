"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, MotionConfig, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Mail, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
// Remove the logo import as it's not currently available

interface NavigationItem {
  id: number;
  title: string;
  url: string;
  dropdown?: boolean;
  items?: NavigationItem[];
}

interface HeaderProps {
  navigationItems?: NavigationItem[];
  showMobileMenu?: boolean;
}

const defaultNavigationItems: NavigationItem[] = [
  {
    id: 1,
    title: "About",
    url: "/about",
    dropdown: false,
  },
  {
    id: 2,
    title: "Projects",
    url: "/projects",
    dropdown: true,
    items: [
      {
        id: 21,
        title: "Web Applications",
        url: "/projects/web",
      },
      {
        id: 22,
        title: "Mobile Apps",
        url: "/projects/mobile",
      },
      {
        id: 23,
        title: "Open Source",
        url: "/projects/opensource",
      },
    ],
  },
  {
    id: 3,
    title: "Experience",
    url: "/experience",
    dropdown: false,
  },
  {
    id: 4,
    title: "Blog",
    url: "/blog",
    dropdown: false,
  },
  {
    id: 5,
    title: "Contact",
    url: "/contact",
    dropdown: false,
  },
];

const DesktopNavigation = ({ items }: { items: NavigationItem[] }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <MotionConfig transition={{ bounce: 0, type: "spring", duration: 0.4 }}>
      <nav className="hidden lg:flex gap-1 items-center">
        <ul className="flex items-center space-x-1 relative">
          <div
            className="absolute h-8 bg-primary/10 dark:bg-primary/20 rounded-md -z-10 transition-all duration-200"
            style={{
              left: `${position.left}px`,
              width: `${position.width}px`,
              opacity: position.opacity,
            }}
          />
          {items.map((item) => (
            <li key={item.id} className="relative">
              <Link
                href={item.url}
                className="px-3 py-2 rounded-md text-sm font-medium relative flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                onMouseEnter={(e) => {
                  setHovered(item.id);
                  const rect = e.currentTarget.getBoundingClientRect();
                  setPosition({
                    left: 0,
                    width: rect.width,
                    opacity: 1,
                  });
                }}
                onMouseLeave={() => {
                  setHovered(null);
                  setPosition((prev) => ({ ...prev, opacity: 0 }));
                }}
              >
                {item.title}
                {item.dropdown && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-200"
                    style={{
                      transform: hovered === item.id ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                )}
              </Link>

              {/* Dropdown Menu */}
              {item.dropdown && item.items && (
                <AnimatePresence>
                  {hovered === item.id && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="absolute left-0 mt-1 w-48 rounded-md shadow-lg bg-background border border-border overflow-hidden z-20"
                    >
                      <div className="py-1">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.id}
                            href={subItem.url}
                            className="block px-4 py-2 text-sm hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </MotionConfig>
  );
};

const MobileNavigation = ({
  items,
  isOpen,
  onToggle,
}: {
  items?: NavigationItem[];
  isOpen: boolean;
  onToggle: () => void;
}) => {
  if (!items) return null;

  return (
    <div className="lg:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className="relative z-50"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isOpen ? "close" : "menu"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.div>
        </AnimatePresence>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-x-0 top-[64px] z-40 overflow-hidden bg-background/95 backdrop-blur-sm border-b"
          >
            <div className="container px-4 py-6 flex flex-col gap-4">
              {items.map((item, index) => (
                <div key={item.id}>
                  <MobileDropdownItem item={item} index={index} />
                </div>
              ))}

              <div className="flex items-center gap-4 pt-4 border-t">
                <Button
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                  size="sm"
                >
                  Get In Touch
                </Button>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="p-2">
                    <Github className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MobileDropdownItem = ({
  item,
  index,
}: {
  item: NavigationItem;
  index: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between">
        <Link
          href={item.dropdown ? "#" : item.url}
          className="text-foreground font-medium"
          onClick={(e) => {
            if (item.dropdown) {
              e.preventDefault();
              setIsOpen(!isOpen);
            }
          }}
        >
          <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-1"
          >
            {item.title}
            {item.dropdown && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-200"
                style={{
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            )}
          </motion.div>
        </Link>
      </div>

      {/* Mobile Dropdown Menu */}
      {item.dropdown && item.items && (
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden ml-4 mt-2"
            >
              <div className="border-l border-border pl-4 flex flex-col gap-2 py-1">
                {item.items.map((subItem) => (
                  <Link
                    key={subItem.id}
                    href={subItem.url}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                  >
                    {subItem.title}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export function Header({
  navigationItems = defaultNavigationItems,
  showMobileMenu = true,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const [hidden, setHidden] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Detect scrolling down more than 10px
      const currentScrollY = window.scrollY;
      
      // Handle scroll-based header visibility
      if (currentScrollY > 20) {
        setScrolled(true);
        
        if (currentScrollY > lastScrollY.current + 10) {
          setHidden(true);
        } else if (currentScrollY < lastScrollY.current - 10) {
          setHidden(false);
        }
      } else {
        setScrolled(false);
        setHidden(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-background/50"}`}
    >
      <div className="mx-auto px-4 sm:px-6 md:container">
        <div className="h-16 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-between w-full"
          >
            {/* Logo and Brand */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                <Code className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight">
                  Kevin Lin
                </span>
                <span className="text-xs text-muted-foreground -mt-1 hidden sm:block">
                  Full Stack Developer
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-2">
              {/* Desktop Navigation */}
              <DesktopNavigation items={navigationItems} />
              
              {/* Social Media Icons - Only visible on desktop */}
              <div className="hidden lg:flex items-center gap-1">
                <Button variant="ghost" size="sm" className="p-2">
                  <Github className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>

              {/* CTA Button */}
              <Button 
                className="hidden sm:inline-flex bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                size="sm"
              >
                Get In Touch
              </Button>

              {/* Mobile Menu */}
              {showMobileMenu && (
                <MobileNavigation
                  items={navigationItems}
                  isOpen={mobileMenuOpen}
                  onToggle={toggleMobileMenu}
                />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
