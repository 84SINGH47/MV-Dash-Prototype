"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { SparklesCore } from "@/components/sparkles"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Target, Award } from "lucide-react"

export default function AboutPage() {
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
                About
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                  {" "}
                  MailVoid
                </span>
              </h1>
              <p className="text-gray-400 text-xl max-w-3xl mx-auto">
                We're on a mission to revolutionize email productivity through the power of artificial intelligence.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Our Story</h2>
                    <p className="text-gray-300 leading-relaxed">
                      MailVoid was born from the frustration of spending countless hours managing overflowing inboxes.
                      Our founders, experienced professionals and students alike, recognized that email had become a
                      productivity killer rather than a communication tool. We set out to change that by harnessing the
                      power of artificial intelligence to create a smarter, more efficient email experience.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Card className="bg-white/5 backdrop-blur-sm border-white/10 h-full">
                    <CardContent className="p-6">
                      <Target className="w-12 h-12 text-blue-500 mb-4" />
                      <h3 className="text-xl font-bold text-white mb-3">Our Mission</h3>
                      <p className="text-gray-300">
                        To empower individuals and teams with AI-driven email management tools that save time, reduce
                        stress, and enhance productivity.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Card className="bg-white/5 backdrop-blur-sm border-white/10 h-full">
                    <CardContent className="p-6">
                      <Award className="w-12 h-12 text-blue-500 mb-4" />
                      <h3 className="text-xl font-bold text-white mb-3">Our Vision</h3>
                      <p className="text-gray-300">
                        A world where email enhances rather than hinders productivity, where AI seamlessly handles the
                        mundane so humans can focus on what matters most.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      <Users className="w-8 h-8 text-blue-500 mr-3" />
                      <h2 className="text-2xl font-bold text-white">Our Values</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="text-blue-400 font-semibold mb-2">Privacy First</h4>
                        <p className="text-gray-300 text-sm">
                          Your data is yours. We use enterprise-grade security and never store your email content.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-blue-400 font-semibold mb-2">Innovation</h4>
                        <p className="text-gray-300 text-sm">
                          We continuously push the boundaries of what's possible with AI and email management.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-blue-400 font-semibold mb-2">User-Centric</h4>
                        <p className="text-gray-300 text-sm">
                          Every feature we build is designed with our users' needs and feedback at the center.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer brand="MailVoid" />
      </div>
    </main>
  )
}
