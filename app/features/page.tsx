"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { SparklesCore } from "@/components/sparkles"
import { motion } from "framer-motion"
import { Mail, Calendar, FileText, Trash2, Sparkles, Clock, Filter, Tag } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Mail,
    title: "AI Email Classification",
    description: "Automatically categorize emails by priority and importance using advanced AI algorithms.",
    details:
      "Our AI analyzes email content, sender importance, and context to intelligently sort your inbox into High, Medium, and Low priority categories.",
  },
  {
    icon: Calendar,
    title: "Deadline Detection + Calendar Sync",
    description: "Never miss important deadlines with AI-powered date extraction and calendar integration.",
    details:
      "Automatically extracts dates and deadlines from emails and syncs them with your Google Calendar for seamless scheduling.",
  },
  {
    icon: FileText,
    title: "Email Summarizer",
    description: "Get instant summaries of long email threads and important messages.",
    details:
      "Transform lengthy email chains into concise, actionable summaries that highlight key points and required actions.",
  },
  {
    icon: Trash2,
    title: "Auto Inbox Cleanup",
    description: "Automatically identify and clean promotional emails and spam from your inbox.",
    details: "Smart filtering removes newsletters, promotions, and spam while preserving important communications.",
  },
  {
    icon: Sparkles,
    title: "Smart Labels",
    description: "Automatically tag emails with relevant labels for better organization.",
    details:
      "AI-powered labeling system categorizes emails by topic, urgency, and context for effortless organization.",
  },
  {
    icon: Clock,
    title: "Productivity Analytics",
    description: "Track your email habits and get insights to improve productivity.",
    details: "Detailed analytics on response times, email volume, and productivity patterns to optimize your workflow.",
  },
  {
    icon: Filter,
    title: "Advanced Filtering",
    description: "Create custom rules and filters for automated email management.",
    details:
      "Set up sophisticated filtering rules based on sender, content, attachments, and more for automated organization.",
  },
  {
    icon: Tag,
    title: "Custom Workflows",
    description: "Build personalized email workflows that match your unique needs.",
    details:
      "Create custom automation workflows that handle routine email tasks and streamline your communication process.",
  },
]

export default function FeaturesPage() {
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
                Powerful Features for
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                  {" "}
                  Email Mastery
                </span>
              </h1>
              <p className="text-gray-400 text-xl max-w-3xl mx-auto">
                Discover all the AI-powered tools that make MailVoid the ultimate email productivity solution
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
                    <CardHeader>
                      <feature.icon className="w-12 h-12 text-blue-500 mb-4" />
                      <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                      <CardDescription className="text-gray-400">{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 text-sm">{feature.details}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
