"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { SparklesCore } from "@/components/sparkles"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Settings, Sparkles, CheckCircle } from "lucide-react"
import Link from "next/link"

const steps = [
  {
    step: "01",
    icon: Mail,
    title: "Connect Your Gmail",
    description:
      "Securely connect your Gmail account with one click using Google OAuth. We never store your passwords.",
    details:
      "Our secure integration reads your emails to provide AI-powered organization while maintaining complete privacy and security.",
  },
  {
    step: "02",
    icon: Sparkles,
    title: "AI Analyzes Your Inbox",
    description:
      "Our advanced AI immediately starts categorizing your emails by priority, extracting deadlines, and identifying spam.",
    details:
      "Machine learning algorithms analyze sender patterns, content importance, and your email behavior to create personalized classifications.",
  },
  {
    step: "03",
    icon: Settings,
    title: "Customize Your Experience",
    description: "Set up custom labels, notification preferences, and automation rules that match your workflow.",
    details:
      "Fine-tune the AI to match your specific needs with custom filters, priority rules, and integration preferences.",
  },
  {
    step: "04",
    icon: CheckCircle,
    title: "Enjoy Organized Productivity",
    description:
      "Experience a clean, organized inbox with automated cleanup, deadline reminders, and intelligent prioritization.",
    details:
      "Focus on what matters most while SmartMail AI handles the routine email management tasks in the background.",
  },
]

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <div className="h-full w-full absolute inset-0 z-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={50}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      <div className="relative z-10">
        <Navbar />

        <section className="py-20 px-6">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                How MailVoid
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"> Works</span>
              </h1>
              <p className="text-gray-400 text-xl max-w-3xl mx-auto">
                Get started with MailVoid in just a few simple steps. Transform your email experience in minutes.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {steps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="mb-12"
                >
                  <div className="flex flex-col lg:flex-row items-center gap-8">
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center">
                        <step.icon className="w-12 h-12 text-white" />
                      </div>
                    </div>

                    <Card className="bg-white/5 backdrop-blur-sm border-white/10 flex-1">
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <span className="text-blue-400 font-bold text-2xl">{step.step}</span>
                          <CardTitle className="text-white text-2xl">{step.title}</CardTitle>
                        </div>
                        <CardDescription className="text-gray-400 text-lg">{step.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300">{step.details}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="flex justify-center my-8">
                      <div className="w-px h-12 bg-gradient-to-b from-blue-500 to-transparent"></div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-center mt-16"
            >
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
              <p className="text-gray-400 mb-8">
                Join thousands of users who have revolutionized their email experience
              </p>
              <Link href="/login">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                  <Mail className="mr-2 h-5 w-5" />
                  Get Started with Gmail
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
