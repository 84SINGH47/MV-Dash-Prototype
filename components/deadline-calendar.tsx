"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Clock, Plus, ExternalLink, CheckCircle, AlertCircle, Mail } from "lucide-react"
import type { Deadline } from "@/types/email"

interface DeadlineCalendarProps {
  deadlines: Deadline[]
  onAddToCalendar: (deadline: Deadline) => void
  onMarkComplete: (deadlineId: string) => void
  onViewEmail: (emailId: string) => void
  onAddManualDeadline: () => void
}

export function DeadlineCalendar({
  deadlines,
  onAddToCalendar,
  onMarkComplete,
  onViewEmail,
  onAddManualDeadline,
}: DeadlineCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [filter, setFilter] = useState<"all" | "upcoming" | "missed">("all")

  const today = new Date()
  const filteredDeadlines = deadlines.filter((deadline) => {
    const deadlineDate = new Date(deadline.date)

    switch (filter) {
      case "upcoming":
        return deadlineDate >= today && !deadline.isCompleted
      case "missed":
        return deadlineDate < today && !deadline.isCompleted
      default:
        return true
    }
  })

  const getDeadlineStatus = (deadline: Deadline) => {
    const deadlineDate = new Date(deadline.date)
    const today = new Date()

    if (deadline.isCompleted) return "completed"
    if (deadlineDate < today) return "missed"
    if (deadlineDate.toDateString() === today.toDateString()) return "today"
    return "upcoming"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "missed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "today":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "missed":
        return <AlertCircle className="h-4 w-4" />
      case "today":
        return <Clock className="h-4 w-4" />
      default:
        return <CalendarIcon className="h-4 w-4" />
    }
  }

  // Get dates that have deadlines for calendar highlighting
  const deadlineDates = deadlines.map((d) => new Date(d.date))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Deadline Detection & Calendar Sync</h2>
        <Button onClick={onAddManualDeadline}>
          <Plus className="h-4 w-4 mr-2" />
          Add Manual Deadline
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2" />
              Calendar View
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              modifiers={{
                deadline: deadlineDates,
              }}
              modifiersStyles={{
                deadline: {
                  backgroundColor: "rgb(59 130 246)",
                  color: "white",
                  fontWeight: "bold",
                },
              }}
            />
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <CalendarIcon className="h-4 w-4 inline mr-1" />
                Blue dates have deadlines
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Deadlines List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Detected Deadlines</CardTitle>
              <Tabs value={filter} onValueChange={(value) => setFilter(value as any)}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="missed">Missed</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredDeadlines.length === 0 ? (
                <div className="text-center py-8">
                  <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-muted-foreground mb-2">No deadlines found</h3>
                  <p className="text-sm text-muted-foreground">
                    {filter === "all"
                      ? "No deadlines detected in your emails yet."
                      : `No ${filter} deadlines at the moment.`}
                  </p>
                </div>
              ) : (
                filteredDeadlines.map((deadline) => {
                  const status = getDeadlineStatus(deadline)
                  return (
                    <Card key={deadline.id} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-medium">{deadline.title}</h3>
                            <Badge className={getStatusColor(status)}>
                              {getStatusIcon(status)}
                              <span className="ml-1 capitalize">{status}</span>
                            </Badge>
                            {deadline.isSynced && (
                              <Badge variant="outline">
                                <CalendarIcon className="h-3 w-3 mr-1" />
                                Synced
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {deadline.date} {deadline.time && `at ${deadline.time}`}
                            </span>
                            <span className="flex items-center">
                              <Mail className="h-4 w-4 mr-1" />
                              From: {deadline.source.sender.split("@")[0]}
                            </span>
                          </div>

                          <p className="text-sm text-muted-foreground">{deadline.source.subject}</p>
                        </div>

                        <div className="flex items-center space-x-2 ml-4">
                          <Button variant="outline" size="sm" onClick={() => onViewEmail(deadline.source.id)}>
                            <ExternalLink className="h-4 w-4 mr-1" />
                            View Email
                          </Button>

                          {!deadline.isCompleted && (
                            <Button variant="outline" size="sm" onClick={() => onMarkComplete(deadline.id)}>
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Complete
                            </Button>
                          )}

                          {!deadline.isSynced && (
                            <Button size="sm" onClick={() => onAddToCalendar(deadline)}>
                              <CalendarIcon className="h-4 w-4 mr-1" />
                              Add to Calendar
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  )
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
