"use client"

import { Button } from "@/components/ui/button"
import { Mail, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import type React from "react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is logged in (in a real app, this would check authentication state)
    const checkAuthStatus = () => {
      // For demo purposes, we'll consider user logged in if they're on dashboard
      setIsLoggedIn(pathname?.startsWith("/dashboard") || false)
    }

    checkAuthStatus()
  }, [pathname])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  // Don't show navbar on dashboard pages
  if (pathname?.startsWith("/dashboard")) {
    return null
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="flex items-center justify-between px-6 py-4 backdrop-blur-sm border-b border-white/10 relative z-50"
      >
        <Link href="/" className="flex items-center space-x-2">
          <Mail className="w-8 h-8 text-blue-600" />
          <span className="text-white font-medium text-xl">MailVoid</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <NavLink href="/features">Features</NavLink>
          <NavLink href="/how-it-works">How it Works</NavLink>
          <NavLink href="/pricing">Pricing</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <Link href="/dashboard">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Go to Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="text-white hover:text-purple-400">
                  Sign In
                </Button>
              </Link>
              <Link href="/login">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Get Started with Gmail</Button>
              </Link>
            </>
          )}
        </div>

        <Button variant="ghost" size="icon" className="md:hidden text-white" onClick={toggleMenu}>
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/90 backdrop-blur-sm border-b border-white/10 absolute top-full left-0 right-0 z-40"
          >
            <div className="px-6 py-4 space-y-4">
              <Link href="/features" className="block text-white hover:text-blue-400 py-2" onClick={toggleMenu}>
                Features
              </Link>
              <Link href="/how-it-works" className="block text-white hover:text-blue-400 py-2" onClick={toggleMenu}>
                How it Works
              </Link>
              <Link href="/pricing" className="block text-white hover:text-blue-400 py-2" onClick={toggleMenu}>
                Pricing
              </Link>
              <Link href="/contact" className="block text-white hover:text-blue-400 py-2" onClick={toggleMenu}>
                Contact
              </Link>
              <div className="pt-4 space-y-2">
                {isLoggedIn ? (
                  <Link href="/dashboard" className="block" onClick={toggleMenu}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Go to Dashboard</Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/login" className="block" onClick={toggleMenu}>
                      <Button variant="ghost" className="w-full text-white hover:text-purple-400">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/login" className="block" onClick={toggleMenu}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Get Started with Gmail
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-gray-300 hover:text-white transition-colors relative group">
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full" />
    </Link>
  )
}
