"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Plus, AlertTriangle, CheckCircle, Mail, Bell } from "lucide-react"
import { motion } from "framer-motion"

interface Deadline {
  id: number
  title: string
  description: string
  dueDate: string
  dueTime: string
  priority: "high" | "medium" | "low"
  source: string
  category: string
  status: "upcoming" | "today" | "overdue" | "completed"
  daysUntil: number
}

const mockDeadlines: Deadline[] = [
  {
    id: 1,
    title: "Project Proposal Submission",
    description: "Submit final project proposal to client",
    dueDate: "Tomorrow",
    dueTime: "11:59 PM",
    priority: "high",
    source: "manager@company.com",
    category: "work",
    status: "today",
    daysUntil: 0,
  },
  {
    id: 2,
    title: "Client Presentation",
    description: "Present quarterly results to client stakeholders",
    dueDate: "Jan 28, 2024",
    dueTime: "2:00 PM",
    priority: "high",
    source: "client@business.com",
    category: "work",
    status: "upcoming",
    daysUntil: 2,
  },
  {
    id: 3,
    title: "Monthly Report",
    description: "Complete and submit monthly team performance report",
    dueDate: "Jan 30, 2024",
    dueTime: "5:00 PM",
    priority: "medium",
    source: "hr@company.com",
    category: "work",
    status: "upcoming",
    daysUntil: 4,
  },
  {
    id: 4,
    title: "Invoice Payment",
    description: "Pay monthly subscription invoice",
    dueDate: "Jan 30, 2024",
    dueTime: "End of day",
    priority: "medium",
    source: "billing@service.com",
    category: "finance",
    status: "upcoming",
    daysUntil: 4,
  },
  {
    id: 5,
    title: "Conference Registration",
    description: "Register for annual tech conference",
    dueDate: "Feb 5, 2024",
    dueTime: "11:59 PM",
    priority: "low",
    source: "events@conference.com",
    category: "personal",
    status: "upcoming",
    daysUntil: 10,
  },
]

export function DeadlineTracker() {
  const [deadlines, setDeadlines] = useState(mockDeadlines)
  const [filter, setFilter] = useState<"all" | "today" | "upcoming" | "overdue">("all")

  const handleMarkComplete = (id: number) => {
    setDeadlines((prev) =>
      prev.map((deadline) => (deadline.id === id ? { ...deadline, status: "completed" as const } : deadline)),
    )
  }

  const handleAddToCalendar = (deadline: Deadline) => {
    // In a real app, this would integrate with Google Calendar API
    alert(`Adding "${deadline.title}" to your calendar`)
  }

  const filteredDeadlines = deadlines.filter((deadline) => {
    if (filter === "all") return deadline.status !== "completed"
    return deadline.status === filter
  })

  const getStatusColor = (status: string, priority: string) => {
    if (status === "completed") return "bg-green-100 text-green-800"
    if (status === "overdue") return "bg-red-100 text-red-800"
    if (status === "today") return "bg-orange-100 text-orange-800"

    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "overdue":
        return <AlertTriangle className="w-4 h-4" />
      case "today":
        return <Clock className="w-4 h-4" />
      default:
        return <Calendar className="w-4 h-4" />
    }
  }

  const stats = {
    total: deadlines.filter((d) => d.status !== "completed").length,
    today: deadlines.filter((d) => d.status === "today").length,
    upcoming: deadlines.filter((d) => d.status === "upcoming").length,
    overdue: deadlines.filter((d) => d.status === "overdue").length,
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Deadlines</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Due Today</p>
                <p className="text-2xl font-bold text-orange-600">{stats.today}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold text-blue-600">{stats.upcoming}</p>
              </div>
              <Bell className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-600" />
              Deadline Management
            </CardTitle>
            <div className="flex space-x-2">
              {["all", "today", "upcoming", "overdue"].map((filterOption) => (
                <Button
                  key={filterOption}
                  size="sm"
                  variant={filter === filterOption ? "default" : "outline"}
                  onClick={() => setFilter(filterOption as any)}
                  className="capitalize"
                >
                  {filterOption}
                </Button>
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-600">AI-detected deadlines from your emails with calendar integration</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDeadlines.map((deadline, index) => (
              <motion.div
                key={deadline.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`border rounded-lg p-4 hover:shadow-md transition-all ${
                  deadline.status === "today"
                    ? "border-orange-300 bg-orange-50"
                    : deadline.status === "overdue"
                      ? "border-red-300 bg-red-50"
                      : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-medium text-gray-900">{deadline.title}</h3>
                      <Badge className={getStatusColor(deadline.status, deadline.priority)}>
                        {getStatusIcon(deadline.status)}
                        <span className="ml-1 capitalize">{deadline.priority}</span>
                      </Badge>
                      {deadline.daysUntil <= 1 && deadline.status !== "completed" && (
                        <Badge variant="destructive">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Urgent
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 mb-2">{deadline.description}</p>

                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {deadline.dueDate} at {deadline.dueTime}
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-1" />
                        From: {deadline.source.split("@")[0]}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {deadline.category}
                      </Badge>
                    </div>

                    {deadline.daysUntil > 0 && (
                      <div className="mt-2">
                        <Badge variant="secondary" className="text-xs">
                          {deadline.daysUntil} day{deadline.daysUntil !== 1 ? "s" : ""} remaining
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2 ml-4">
                    {deadline.status !== "completed" && (
                      <>
                        <Button size="sm" variant="outline" onClick={() => handleAddToCalendar(deadline)}>
                          <Plus className="w-4 h-4 mr-1" />
                          Calendar
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleMarkComplete(deadline.id)}>
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Complete
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredDeadlines.length === 0 && (
              <div className="text-center py-8">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No deadlines found</h3>
                <p className="text-gray-500">
                  {filter === "all" ? "All your deadlines are completed!" : `No ${filter} deadlines at the moment.`}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
