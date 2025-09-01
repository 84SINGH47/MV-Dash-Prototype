"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Mail, Trash2, Calendar, TrendingUp, RefreshCw, Sparkles, BarChart3 } from "lucide-react"
import type { AIInsights } from "@/types/email"

interface AIInsightsPanelProps {
  insights: AIInsights
  onRegenerateInsights: () => void
  onViewInbox: () => void
}

export function AIInsightsPanel({ insights, onRegenerateInsights, onViewInbox }: AIInsightsPanelProps) {
  const totalPriority =
    insights.priorityBreakdown.high + insights.priorityBreakdown.medium + insights.priorityBreakdown.low

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">AI Insights Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={onRegenerateInsights}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Regenerate AI Summary
          </Button>
          <Button size="sm" onClick={onViewInbox}>
            <Mail className="h-4 w-4 mr-2" />
            View Inbox
          </Button>
        </div>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Important Emails Today</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{insights.importantEmailsToday}</div>
            <p className="text-xs text-muted-foreground">Requires immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Junk Mails Filtered</CardTitle>
            <Trash2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{insights.junkMailsFiltered}</div>
            <p className="text-xs text-muted-foreground">Automatically cleaned</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deadlines Detected</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{insights.deadlinesDetected}</div>
            <p className="text-xs text-muted-foreground">Upcoming deadlines</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Emails</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insights.totalEmails}</div>
            <p className="text-xs text-muted-foreground">Processed this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Priority Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Priority Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">High Priority</span>
              <span className="text-sm text-muted-foreground">{insights.priorityBreakdown.high} emails</span>
            </div>
            <Progress value={(insights.priorityBreakdown.high / totalPriority) * 100} className="h-2" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Medium Priority</span>
              <span className="text-sm text-muted-foreground">{insights.priorityBreakdown.medium} emails</span>
            </div>
            <Progress value={(insights.priorityBreakdown.medium / totalPriority) * 100} className="h-2" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Low Priority</span>
              <span className="text-sm text-muted-foreground">{insights.priorityBreakdown.low} emails</span>
            </div>
            <Progress value={(insights.priorityBreakdown.low / totalPriority) * 100} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="h-5 w-5 mr-2" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
              <div>
                <p className="text-sm font-medium">Focus on high-priority emails</p>
                <p className="text-xs text-muted-foreground">
                  You have {insights.priorityBreakdown.high} high-priority emails that need attention
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
              <div>
                <p className="text-sm font-medium">Clean up completed</p>
                <p className="text-xs text-muted-foreground">
                  {insights.junkMailsFiltered} junk emails were automatically filtered
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
              <div>
                <p className="text-sm font-medium">Upcoming deadlines</p>
                <p className="text-xs text-muted-foreground">
                  {insights.deadlinesDetected} deadlines detected - consider adding to calendar
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
