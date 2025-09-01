"use client"

import { Mail, Github, Twitter, Linkedin } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  const handleSocialClick = (platform: string) => {
    // In a real app, these would link to actual social media pages
    alert(`Visit our ${platform} page!`)
  }

  return (
    <footer className="bg-black/50 backdrop-blur-sm border-t border-white/10 py-12 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Mail className="w-8 h-8 text-blue-500" />
              <span className="text-white font-medium text-xl">MailVoid</span>
            </Link>
            <p className="text-gray-400">Revolutionizing email productivity with AI-powered inbox management.</p>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">Product</h3>
            <div className="space-y-2">
              <Link href="/features" className="text-gray-400 hover:text-white block transition-colors">
                Features
              </Link>
              <Link href="/pricing" className="text-gray-400 hover:text-white block transition-colors">
                Pricing
              </Link>
              <Link href="/how-it-works" className="text-gray-400 hover:text-white block transition-colors">
                How it Works
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">Company</h3>
            <div className="space-y-2">
              <Link href="/about" className="text-gray-400 hover:text-white block transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white block transition-colors">
                Contact
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white block transition-colors">
                Privacy
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">Connect</h3>
            <div className="flex space-x-4">
              <button
                onClick={() => handleSocialClick("GitHub")}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleSocialClick("Twitter")}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleSocialClick("LinkedIn")}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-400">© 2024 MailVoid. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
