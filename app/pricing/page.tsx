"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { SparklesCore } from "@/components/sparkles"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Mail } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started with email organization",
    features: ["Up to 1,000 emails processed", "Basic AI classification", "Email summaries", "Standard support"],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "per month",
    description: "Ideal for professionals and power users",
    features: [
      "Unlimited email processing",
      "Advanced AI classification",
      "Calendar sync & deadline detection",
      "Auto inbox cleanup",
      "Custom labels & filters",
      "Priority support",
      "Productivity analytics",
    ],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Team",
    price: "$19",
    period: "per user/month",
    description: "Built for teams and organizations",
    features: [
      "Everything in Pro",
      "Team collaboration features",
      "Admin dashboard",
      "Advanced security",
      "Custom integrations",
      "24/7 dedicated support",
      "Team analytics",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

export default function PricingPage() {
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
                Simple, Transparent
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                  {" "}
                  Pricing
                </span>
              </h1>
              <p className="text-gray-400 text-xl max-w-3xl mx-auto">
                Choose the perfect plan for your email productivity needs. Start free, upgrade anytime.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <Card
                    className={`bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 h-full ${
                      plan.popular ? "border-blue-500/50 bg-blue-500/5" : ""
                    }`}
                  >
                    <CardHeader className="text-center">
                      <CardTitle className="text-white text-2xl">{plan.name}</CardTitle>
                      <div className="text-4xl font-bold text-white mb-2">
                        {plan.price}
                        <span className="text-lg text-gray-400 font-normal">/{plan.period}</span>
                      </div>
                      <CardDescription className="text-gray-400">{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <ul className="space-y-3">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-gray-300">
                            <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Link href="/login" className="block">
                        <Button
                          className={`w-full ${
                            plan.popular
                              ? "bg-blue-600 hover:bg-blue-700 text-white"
                              : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                          }`}
                        >
                          <Mail className="mr-2 h-4 w-4" />
                          {plan.cta}
                        </Button>
                      </Link>
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
