"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { SparklesCore } from "@/components/sparkles"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Eye, Database } from "lucide-react"

export default function PrivacyPage() {
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
                Privacy
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                  {" "}
                  Policy
                </span>
              </h1>
              <p className="text-gray-400 text-xl max-w-3xl mx-auto">
                Your privacy is our priority. Learn how we protect and handle your data.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Shield className="w-6 h-6 mr-2 text-blue-500" />
                      Data Protection
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-300 space-y-4">
                    <p>
                      MailVoid is committed to protecting your privacy and ensuring the security of your personal
                      information. We use industry-standard encryption and security measures to protect your data.
                    </p>
                    <p>
                      We only access your email metadata necessary to provide our AI-powered features. We never store
                      the content of your emails on our servers.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Database className="w-6 h-6 mr-2 text-blue-500" />
                      Information We Collect
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-300 space-y-4">
                    <ul className="list-disc list-inside space-y-2">
                      <li>Email metadata (sender, subject, date, labels)</li>
                      <li>Account information (name, email address)</li>
                      <li>Usage analytics (feature usage, performance metrics)</li>
                      <li>Preferences and settings</li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Lock className="w-6 h-6 mr-2 text-blue-500" />
                      How We Use Your Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-300 space-y-4">
                    <ul className="list-disc list-inside space-y-2">
                      <li>Provide AI-powered email classification and organization</li>
                      <li>Extract deadlines and important dates from emails</li>
                      <li>Generate email summaries and insights</li>
                      <li>Improve our AI algorithms and service quality</li>
                      <li>Send service updates and important notifications</li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Eye className="w-6 h-6 mr-2 text-blue-500" />
                      Your Rights
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-300 space-y-4">
                    <p>You have the right to:</p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Access your personal data</li>
                      <li>Correct inaccurate information</li>
                      <li>Delete your account and data</li>
                      <li>Export your data</li>
                      <li>Opt-out of non-essential communications</li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
              >
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardContent className="p-6">
                    <p className="text-gray-300 text-center">
                      <strong className="text-white">Questions about our privacy policy?</strong>
                      <br />
                      Contact us at privacy@mailvoid.ai or through our contact page.
                    </p>
                    <p className="text-gray-400 text-sm text-center mt-4">Last updated: January 2024</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
