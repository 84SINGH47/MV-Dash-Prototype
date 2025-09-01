"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trash2, Filter, Tag, Settings, AlertTriangle, CheckCircle, Mail } from "lucide-react"
import { motion } from "framer-motion"

interface CleanupCategory {
  id: string
  name: string
  description: string
  count: number
  examples: string[]
  color: string
  icon: React.ElementType
}

const cleanupCategories: CleanupCategory[] = [
  {
    id: "promotions",
    name: "Promotional Emails",
    description: "Marketing emails, sales offers, and promotional content",
    count: 47,
    examples: ["50% Off Sale!", "Limited Time Offer", "Newsletter Signup Bonus"],
    color: "bg-red-100 text-red-800",
    icon: Tag,
  },
  {
    id: "newsletters",
    name: "Newsletters",
    description: "Regular newsletters and subscription emails",
    count: 23,
    examples: ["Weekly Tech Update", "Industry News Digest", "Company Newsletter"],
    color: "bg-blue-100 text-blue-800",
    icon: Mail,
  },
  {
    id: "social",
    name: "Social Notifications",
    description: "Social media notifications and updates",
    count: 15,
    examples: ["New follower", "Photo tagged", "Event invitation"],
    color: "bg-purple-100 text-purple-800",
    icon: Filter,
  },
  {
    id: "automated",
    name: "Automated Messages",
    description: "System notifications and automated responses",
    count: 12,
    examples: ["Password reset", "Account verification", "System maintenance"],
    color: "bg-gray-100 text-gray-800",
    icon: Settings,
  },
]

export function InboxCleanup() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [isCleaningUp, setIsCleaningUp] = useState(false)
  const [cleanupComplete, setCleanupComplete] = useState(false)
  const [cleanupProgress, setCleanupProgress] = useState(0)

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const handleCleanup = async () => {
    if (selectedCategories.length === 0) return

    setIsCleaningUp(true)
    setCleanupProgress(0)

    // Simulate cleanup progress
    const interval = setInterval(() => {
      setCleanupProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsCleaningUp(false)
          setCleanupComplete(true)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const selectedCount = selectedCategories.reduce((total, categoryId) => {
    const category = cleanupCategories.find((c) => c.id === categoryId)
    return total + (category?.count || 0)
  }, 0)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trash2 className="w-5 h-5 mr-2 text-red-600" />
            Auto Inbox Cleanup
          </CardTitle>
          <p className="text-sm text-gray-600">
            Automatically identify and manage promotional emails, newsletters, and spam
          </p>
        </CardHeader>
        <CardContent>
          {!cleanupComplete ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cleanupCategories.map((category) => (
                  <motion.div
                    key={category.id}
                    whileHover={{ scale: 1.02 }}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedCategories.includes(category.id) ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"
                    }`}
                    onClick={() => handleCategoryToggle(category.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <category.icon className="w-5 h-5 text-gray-600" />
                        <div>
                          <h3 className="font-medium text-gray-900">{category.name}</h3>
                          <p className="text-sm text-gray-600">{category.description}</p>
                        </div>
                      </div>
                      <Badge className={category.color}>{category.count} emails</Badge>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs text-gray-500 font-medium">Examples:</p>
                      {category.examples.map((example, index) => (
                        <div key={index} className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">
                          {example}
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => handleCategoryToggle(category.id)}
                        className="rounded border-gray-300"
                      />
                      <span className="text-xs text-gray-500">
                        {selectedCategories.includes(category.id) ? "Selected for cleanup" : "Click to select"}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {selectedCategories.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
                >
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-yellow-800">Cleanup Summary</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        You've selected {selectedCount} emails across {selectedCategories.length} categories for
                        cleanup. These emails will be moved to a separate folder and can be restored if needed.
                      </p>
                      <div className="flex space-x-2 mt-3">
                        <Button
                          size="sm"
                          onClick={handleCleanup}
                          disabled={isCleaningUp}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          {isCleaningUp ? "Cleaning..." : `Clean ${selectedCount} Emails`}
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setSelectedCategories([])}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {isCleaningUp && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-blue-50 border border-blue-200 rounded-lg p-4"
                >
                  <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                    <div className="flex-1">
                      <h4 className="font-medium text-blue-800">Cleaning up your inbox...</h4>
                      <Progress value={cleanupProgress} className="mt-2" />
                      <p className="text-sm text-blue-700 mt-1">{cleanupProgress}% complete</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Cleanup Complete!</h3>
              <p className="text-gray-600 mb-6">
                Successfully cleaned {selectedCount} emails from your inbox. Your emails have been organized and moved
                to appropriate folders.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-800">Emails Cleaned</h4>
                  <p className="text-2xl font-bold text-green-600">{selectedCount}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800">Time Saved</h4>
                  <p className="text-2xl font-bold text-blue-600">~2.5 hrs</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-medium text-purple-800">Storage Freed</h4>
                  <p className="text-2xl font-bold text-purple-600">45 MB</p>
                </div>
              </div>

              <div className="flex justify-center space-x-3">
                <Button
                  onClick={() => {
                    setCleanupComplete(false)
                    setSelectedCategories([])
                    setCleanupProgress(0)
                  }}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clean More Emails
                </Button>
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Setup Auto-Cleanup
                </Button>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
