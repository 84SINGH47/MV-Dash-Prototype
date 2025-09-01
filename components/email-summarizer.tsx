"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Clock, Users, CheckSquare, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

interface EmailThread {
  id: number
  subject: string
  participants: string[]
  messageCount: number
  lastActivity: string
  summary?: {
    keyPoints: string[]
    actionItems: string[]
    decisions: string[]
    nextSteps: string[]
  }
}

const mockThreads: EmailThread[] = [
  {
    id: 1,
    subject: "Q1 Budget Planning Discussion",
    participants: ["manager@company.com", "finance@company.com", "team@company.com"],
    messageCount: 12,
    lastActivity: "2h ago",
    summary: {
      keyPoints: [
        "Q1 budget increased by 15% compared to last quarter",
        "New hiring budget allocated for 3 additional team members",
        "Marketing spend to focus on digital channels",
      ],
      actionItems: [
        "Finance team to prepare detailed breakdown by Friday",
        "HR to post job listings for new positions",
        "Marketing to submit campaign proposals",
      ],
      decisions: [
        "Approved additional $50K for software licenses",
        "Postponed office renovation until Q2",
        "Agreed on monthly budget review meetings",
      ],
      nextSteps: [
        "Schedule follow-up meeting for next week",
        "Distribute final budget document to all stakeholders",
        "Begin recruitment process for approved positions",
      ],
    },
  },
  {
    id: 2,
    subject: "Client Project Timeline Updates",
    participants: ["client@business.com", "project@company.com", "dev@company.com"],
    messageCount: 8,
    lastActivity: "1d ago",
  },
  {
    id: 3,
    subject: "Team Offsite Planning",
    participants: ["hr@company.com", "team@company.com", "events@company.com"],
    messageCount: 15,
    lastActivity: "3d ago",
  },
]

export function EmailSummarizer() {
  const [selectedThread, setSelectedThread] = useState<number | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateSummary = async (threadId: number) => {
    setIsGenerating(true)
    setSelectedThread(threadId)

    // Simulate AI summary generation
    setTimeout(() => {
      setIsGenerating(false)
    }, 3000)
  }

  const selectedThreadData = mockThreads.find((t) => t.id === selectedThread)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2 text-blue-600" />
            Email Thread Summarizer
          </CardTitle>
          <p className="text-sm text-gray-600">Get instant AI-generated summaries of long email conversations</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockThreads.map((thread) => (
              <div
                key={thread.id}
                className={`border rounded-lg p-4 hover:shadow-md transition-all cursor-pointer ${
                  selectedThread === thread.id ? "ring-2 ring-blue-500 bg-blue-50" : ""
                }`}
                onClick={() => setSelectedThread(selectedThread === thread.id ? null : thread.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-2">{thread.subject}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {thread.participants.length} participants
                      </div>
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-1" />
                        {thread.messageCount} messages
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {thread.lastActivity}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {thread.participants.slice(0, 3).map((participant, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {participant.split("@")[0]}
                        </Badge>
                      ))}
                      {thread.participants.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{thread.participants.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {thread.summary ? (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckSquare className="w-3 h-3 mr-1" />
                        Summarized
                      </Badge>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleGenerateSummary(thread.id)
                        }}
                        disabled={isGenerating && selectedThread === thread.id}
                      >
                        <Sparkles className="w-4 h-4 mr-1" />
                        {isGenerating && selectedThread === thread.id ? "Generating..." : "Summarize"}
                      </Button>
                    )}
                  </div>
                </div>

                {selectedThread === thread.id && thread.summary && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                          <FileText className="w-4 h-4 mr-2 text-blue-600" />
                          Key Points
                        </h4>
                        <ul className="space-y-2">
                          {thread.summary.keyPoints.map((point, index) => (
                            <li key={index} className="text-sm text-gray-700 flex items-start">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                          <CheckSquare className="w-4 h-4 mr-2 text-green-600" />
                          Action Items
                        </h4>
                        <ul className="space-y-2">
                          {thread.summary.actionItems.map((item, index) => (
                            <li key={index} className="text-sm text-gray-700 flex items-start">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                          <Badge className="w-4 h-4 mr-2 bg-purple-600" />
                          Decisions Made
                        </h4>
                        <ul className="space-y-2">
                          {thread.summary.decisions.map((decision, index) => (
                            <li key={index} className="text-sm text-gray-700 flex items-start">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                              {decision}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-orange-600" />
                          Next Steps
                        </h4>
                        <ul className="space-y-2">
                          {thread.summary.nextSteps.map((step, index) => (
                            <li key={index} className="text-sm text-gray-700 flex items-start">
                              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-4 pt-4 border-t">
                      <Button size="sm" variant="outline">
                        <FileText className="w-4 h-4 mr-1" />
                        Export Summary
                      </Button>
                      <Button size="sm" variant="outline">
                        <CheckSquare className="w-4 h-4 mr-1" />
                        Create Tasks
                      </Button>
                      <Button size="sm" variant="outline">
                        <Users className="w-4 h-4 mr-1" />
                        Share Summary
                      </Button>
                    </div>
                  </motion.div>
                )}

                {selectedThread === thread.id && isGenerating && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t"
                  >
                    <div className="flex items-center justify-center py-8">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-sm text-gray-600">AI is analyzing the email thread...</p>
                        <p className="text-xs text-gray-500 mt-1">This may take a few moments</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
