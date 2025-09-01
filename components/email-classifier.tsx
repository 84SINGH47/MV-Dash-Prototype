"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Sparkles, Mail, Clock, AlertTriangle, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

interface Email {
  id: number
  subject: string
  sender: string
  time: string
  priority: "high" | "medium" | "low"
  category: string
  confidence: number
  aiReason: string
}

const mockEmails: Email[] = [
  {
    id: 1,
    subject: "URGENT: Server Downtime Scheduled",
    sender: "ops@company.com",
    time: "5m ago",
    priority: "high",
    category: "work",
    confidence: 95,
    aiReason: "Contains urgent keywords and is from operations team",
  },
  {
    id: 2,
    subject: "Weekly Newsletter - Tech Updates",
    sender: "newsletter@techblog.com",
    time: "1h ago",
    priority: "low",
    category: "newsletter",
    confidence: 88,
    aiReason: "Newsletter format detected, non-urgent content",
  },
  {
    id: 3,
    subject: "Meeting Rescheduled to Tomorrow",
    sender: "manager@company.com",
    time: "2h ago",
    priority: "medium",
    category: "work",
    confidence: 92,
    aiReason: "Meeting-related content from manager, moderate urgency",
  },
]

export function EmailClassifier() {
  const [isClassifying, setIsClassifying] = useState(false)
  const [classifiedEmails, setClassifiedEmails] = useState<Email[]>([])

  const handleClassify = async () => {
    setIsClassifying(true)
    // Simulate AI classification process
    setTimeout(() => {
      setClassifiedEmails(mockEmails)
      setIsClassifying(false)
    }, 2000)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="w-4 h-4" />
      case "medium":
        return <Clock className="w-4 h-4" />
      case "low":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Mail className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-blue-600" />
            AI Email Classifier
          </CardTitle>
          <p className="text-sm text-gray-600">
            Automatically categorize emails by priority and importance using advanced AI algorithms
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">3</span> emails ready for classification
              </div>
              {isClassifying && (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span className="text-sm text-blue-600">Analyzing...</span>
                </div>
              )}
            </div>
            <Button onClick={handleClassify} disabled={isClassifying}>
              <Sparkles className="w-4 h-4 mr-2" />
              {isClassifying ? "Classifying..." : "Classify Emails"}
            </Button>
          </div>

          {classifiedEmails.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h3 className="font-medium text-gray-900">Classification Results</h3>
              {classifiedEmails.map((email, index) => (
                <motion.div
                  key={email.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium text-gray-900">{email.subject}</h4>
                        <Badge className={`${getPriorityColor(email.priority)} flex items-center space-x-1`}>
                          {getPriorityIcon(email.priority)}
                          <span className="capitalize">{email.priority}</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        From: {email.sender} • {email.time}
                      </p>
                      <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                        <p className="text-sm text-blue-800">
                          <strong>AI Analysis:</strong> {email.aiReason}
                        </p>
                        <div className="flex items-center mt-2">
                          <span className="text-xs text-blue-600 mr-2">Confidence:</span>
                          <Progress value={email.confidence} className="flex-1 max-w-32" />
                          <span className="text-xs text-blue-600 ml-2">{email.confidence}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
