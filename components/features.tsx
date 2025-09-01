"use client"

import { motion } from "framer-motion"
import { Mail, Calendar, FileText, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const features = [
  {
    icon: Mail,
    title: "AI Email Classification",
    description: "Automatically categorize emails by priority and importance using advanced AI algorithms.",
  },
  {
    icon: Calendar,
    title: "Deadline Detection + Calendar Sync",
    description: "Never miss important deadlines with AI-powered date extraction and calendar integration.",
  },
  {
    icon: FileText,
    title: "Email Summarizer",
    description: "Get instant summaries of long email threads and important messages.",
  },
  {
    icon: Trash2,
    title: "Auto Inbox Cleanup",
    description: "Automatically identify and clean promotional emails and spam from your inbox.",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Core Features</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Powerful AI tools to transform your email experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-colors h-full">
                <CardHeader>
                  <feature.icon className="w-12 h-12 text-blue-500 mb-4" />
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link href="/features">
            <Button variant="outline" className="text-white border-blue-500 hover:bg-blue-500/20 bg-transparent">
              View All Features
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
