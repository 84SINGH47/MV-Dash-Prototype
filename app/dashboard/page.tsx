"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Mail,
  Calendar,
  Inbox,
  Settings,
  Search,
  Filter,
  Tag,
  Clock,
  AlertCircle,
  Trash2,
  Plus,
  Bell,
  LogOut,
  BarChart3,
  Sparkles,
  FileText,
  TrendingUp,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data
const mockEmails = [
  {
    id: 1,
    subject: "Project Deadline Tomorrow - Final Review Required",
    sender: "manager@company.com",
    time: "2h ago",
    priority: "high",
    category: "work",
    unread: true,
    hasDeadline: true,
    deadline: "Tomorrow 11:59 PM",
    summary: "Final project review needed before submission deadline tomorrow.",
  },
  {
    id: 2,
    subject: "Weekly Team Update - Sprint Progress",
    sender: "team@company.com",
    time: "1d ago",
    priority: "medium",
    category: "work",
    unread: false,
    hasDeadline: false,
    summary: "Team completed 85% of sprint goals, minor blockers identified.",
  },
  {
    id: 3,
    subject: "Invoice #1234 - Payment Due",
    sender: "billing@service.com",
    time: "2d ago",
    priority: "medium",
    category: "finance",
    unread: true,
    hasDeadline: true,
    deadline: "Jan 30, 2024",
    summary: "Monthly subscription payment of $99 due by end of month.",
  },
  {
    id: 4,
    subject: "Newsletter: Latest Tech Updates",
    sender: "news@techblog.com",
    time: "3d ago",
    priority: "low",
    category: "newsletter",
    unread: false,
    hasDeadline: false,
    summary: "Weekly roundup of technology news and industry updates.",
  },
]

const mockDeadlines = [
  {
    title: "Project Proposal Due",
    date: "Tomorrow",
    time: "11:59 PM",
    priority: "high",
    source: "manager@company.com",
  },
  { title: "Client Presentation", date: "Jan 28", time: "2:00 PM", priority: "medium", source: "client@business.com" },
  { title: "Monthly Report", date: "Jan 30", time: "5:00 PM", priority: "low", source: "hr@company.com" },
  { title: "Invoice Payment", date: "Jan 30", time: "End of day", priority: "medium", source: "billing@service.com" },
]

const mockAnalytics = {
  emailsProcessed: 1247,
  timesSaved: "12.5 hours",
  deadlinesDetected: 23,
  spamCleaned: 156,
  responseTime: "2.3 hours",
  productivityScore: 87,
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [selectedEmail, setSelectedEmail] = useState<number | null>(null)

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      window.location.href = "/"
    }
  }

  const filteredEmails = mockEmails.filter((email) => {
    const matchesSearch =
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.sender.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = selectedFilter === "all" || email.priority === selectedFilter
    return matchesSearch && matchesFilter
  })

  const stats = {
    importantToday: mockEmails.filter((e) => e.priority === "high").length,
    deadlinesDetected: mockDeadlines.length,
    promotionsCleaned: 47,
    unreadEmails: mockEmails.filter((e) => e.unread).length,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Mail className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">MailVoid</span>
            </Link>

            <div className="flex items-center space-x-8">
              <button
                onClick={() => setActiveTab("overview")}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === "overview" ? "bg-blue-100 text-blue-700" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Overview</span>
              </button>
              <button
                onClick={() => setActiveTab("inbox")}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === "inbox" ? "bg-blue-100 text-blue-700" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Inbox className="w-4 h-4" />
                <span>Inbox</span>
              </button>
              <button
                onClick={() => setActiveTab("calendar")}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === "calendar" ? "bg-blue-100 text-blue-700" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Deadlines</span>
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === "analytics" ? "bg-blue-100 text-blue-700" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>Analytics</span>
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === "settings" ? "bg-blue-100 text-blue-700" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Avatar className="cursor-pointer">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
          <div className="space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search emails..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                <Sparkles className="w-4 h-4 mr-2" />
                AI Actions
              </h3>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clean Promotions
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <FileText className="w-4 h-4 mr-2" />
                  Summarize Threads
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <Calendar className="w-4 h-4 mr-2" />
                  Extract Deadlines
                </Button>
              </div>
            </div>

            {/* Filters */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Priority Filters
              </h3>
              <div className="space-y-2">
                {[
                  { key: "all", label: "All Emails", color: "bg-gray-500", count: mockEmails.length },
                  {
                    key: "high",
                    label: "High Priority",
                    color: "bg-red-500",
                    count: mockEmails.filter((e) => e.priority === "high").length,
                  },
                  {
                    key: "medium",
                    label: "Medium Priority",
                    color: "bg-yellow-500",
                    count: mockEmails.filter((e) => e.priority === "medium").length,
                  },
                  {
                    key: "low",
                    label: "Low Priority",
                    color: "bg-green-500",
                    count: mockEmails.filter((e) => e.priority === "low").length,
                  },
                ].map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setSelectedFilter(filter.key)}
                    className={`flex items-center justify-between text-sm w-full text-left p-2 rounded ${
                      selectedFilter === filter.key ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${filter.color}`} />
                      <span>{filter.label}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {filter.count}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>

            {/* Labels */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                Smart Labels
              </h3>
              <div className="space-y-2">
                {[
                  { name: "Work", count: 12, color: "bg-blue-500" },
                  { name: "Finance", count: 5, color: "bg-green-500" },
                  { name: "Personal", count: 8, color: "bg-purple-500" },
                  { name: "Newsletters", count: 23, color: "bg-orange-500" },
                  { name: "Deadlines", count: 4, color: "bg-red-500" },
                ].map((label) => (
                  <div
                    key={label.name}
                    className="flex items-center justify-between text-sm text-gray-600 hover:text-gray-900 cursor-pointer p-1"
                  >
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${label.color}`} />
                      <span>{label.name}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {label.count}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-600">Your AI-powered email productivity center</p>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  {
                    title: "Important Emails Today",
                    value: stats.importantToday,
                    icon: Mail,
                    color: "text-blue-600",
                    bgColor: "bg-blue-100",
                    change: "+12%",
                  },
                  {
                    title: "Deadlines Detected",
                    value: stats.deadlinesDetected,
                    icon: Clock,
                    color: "text-yellow-600",
                    bgColor: "bg-yellow-100",
                    change: "+3",
                  },
                  {
                    title: "Promotions Cleaned",
                    value: stats.promotionsCleaned,
                    icon: Trash2,
                    color: "text-green-600",
                    bgColor: "bg-green-100",
                    change: "+47",
                  },
                  {
                    title: "Unread Emails",
                    value: stats.unreadEmails,
                    icon: AlertCircle,
                    color: "text-red-600",
                    bgColor: "bg-red-100",
                    change: "-8",
                  },
                ].map((stat, index) => (
                  <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                      <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                        <stat.icon className={`w-4 h-4 ${stat.color}`} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-gray-500 mt-1">
                        <span className={stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}>
                          {stat.change}
                        </span>{" "}
                        from yesterday
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Emails */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Smart Inbox</CardTitle>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Sparkles className="w-4 h-4 mr-2" />
                            AI Classify
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Clean Up
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {filteredEmails.map((email) => (
                          <div
                            key={email.id}
                            className={`p-4 rounded-lg border ${
                              email.unread ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"
                            } hover:shadow-md transition-all cursor-pointer ${
                              selectedEmail === email.id ? "ring-2 ring-blue-500" : ""
                            }`}
                            onClick={() => setSelectedEmail(selectedEmail === email.id ? null : email.id)}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-1">
                                  <p
                                    className={`text-sm font-medium truncate ${
                                      email.unread ? "text-gray-900" : "text-gray-700"
                                    }`}
                                  >
                                    {email.subject}
                                  </p>
                                  {email.unread && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                                  {email.hasDeadline && <Clock className="w-4 h-4 text-red-500" />}
                                </div>
                                <p className="text-xs text-gray-500 truncate">{email.sender}</p>
                                <div className="flex items-center space-x-2 mt-2">
                                  <Badge
                                    variant={
                                      email.priority === "high"
                                        ? "destructive"
                                        : email.priority === "medium"
                                          ? "default"
                                          : "secondary"
                                    }
                                  >
                                    {email.priority}
                                  </Badge>
                                  <Badge variant="outline">{email.category}</Badge>
                                  {email.hasDeadline && (
                                    <Badge variant="destructive" className="text-xs">
                                      Due: {email.deadline}
                                    </Badge>
                                  )}
                                </div>
                                {selectedEmail === email.id && (
                                  <div className="mt-3 p-3 bg-white rounded border">
                                    <h4 className="font-medium text-sm mb-2">AI Summary:</h4>
                                    <p className="text-sm text-gray-600">{email.summary}</p>
                                    <div className="flex space-x-2 mt-3">
                                      <Button size="sm" variant="outline">
                                        <FileText className="w-3 h-3 mr-1" />
                                        Full Summary
                                      </Button>
                                      <Button size="sm" variant="outline">
                                        <Calendar className="w-3 h-3 mr-1" />
                                        Add to Calendar
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center text-xs text-gray-400 ml-2">
                                <Clock className="w-3 h-3 mr-1" />
                                {email.time}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Deadlines & Analytics */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                        Upcoming Deadlines
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {mockDeadlines.slice(0, 3).map((deadline, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div
                            className={`w-3 h-3 rounded-full mt-1 ${
                              deadline.priority === "high"
                                ? "bg-red-500"
                                : deadline.priority === "medium"
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                            }`}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">{deadline.title}</p>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <Clock className="w-3 h-3 mr-1" />
                              {deadline.date} at {deadline.time}
                            </div>
                            <p className="text-xs text-gray-400 mt-1">From: {deadline.source}</p>
                          </div>
                        </div>
                      ))}

                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        <Plus className="w-4 h-4 mr-2" />
                        Sync with Google Calendar
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                        Productivity Score
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">{mockAnalytics.productivityScore}%</div>
                        <Progress value={mockAnalytics.productivityScore} className="mb-4" />
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Time Saved</p>
                            <p className="font-medium">{mockAnalytics.timesSaved}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Avg Response</p>
                            <p className="font-medium">{mockAnalytics.responseTime}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "inbox" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Smart Inbox</h1>
                <p className="text-gray-600">AI-powered email organization and management</p>
              </div>

              <Tabs defaultValue="classified" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="classified">AI Classified</TabsTrigger>
                  <TabsTrigger value="summaries">Email Summaries</TabsTrigger>
                  <TabsTrigger value="cleanup">Auto Cleanup</TabsTrigger>
                </TabsList>

                <TabsContent value="classified" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>AI Email Classification</CardTitle>
                      <p className="text-sm text-gray-600">Emails automatically sorted by importance and category</p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {[
                          {
                            category: "High Priority",
                            count: 3,
                            color: "bg-red-100 text-red-800",
                            emails: mockEmails.filter((e) => e.priority === "high"),
                          },
                          {
                            category: "Medium Priority",
                            count: 5,
                            color: "bg-yellow-100 text-yellow-800",
                            emails: mockEmails.filter((e) => e.priority === "medium"),
                          },
                          {
                            category: "Low Priority",
                            count: 2,
                            color: "bg-green-100 text-green-800",
                            emails: mockEmails.filter((e) => e.priority === "low"),
                          },
                        ].map((group) => (
                          <Card key={group.category} className="border-2">
                            <CardHeader className="pb-3">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-sm">{group.category}</CardTitle>
                                <Badge className={group.color}>{group.count}</Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              {group.emails.slice(0, 2).map((email) => (
                                <div key={email.id} className="p-2 bg-gray-50 rounded text-xs">
                                  <p className="font-medium truncate">{email.subject}</p>
                                  <p className="text-gray-500 truncate">{email.sender}</p>
                                </div>
                              ))}
                              {group.emails.length > 2 && (
                                <p className="text-xs text-gray-500 text-center">+{group.emails.length - 2} more</p>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="summaries" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Email Thread Summaries</CardTitle>
                      <p className="text-sm text-gray-600">AI-generated summaries of long email conversations</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {mockEmails.map((email) => (
                        <div key={email.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-medium">{email.subject}</h3>
                              <p className="text-sm text-gray-500">
                                {email.sender} • {email.time}
                              </p>
                            </div>
                            <Badge variant="outline">
                              <FileText className="w-3 h-3 mr-1" />
                              Summary
                            </Badge>
                          </div>
                          <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                            <p className="text-sm text-gray-700">{email.summary}</p>
                          </div>
                          <div className="flex space-x-2 mt-3">
                            <Button size="sm" variant="outline">
                              View Full Thread
                            </Button>
                            <Button size="sm" variant="outline">
                              Generate Action Items
                            </Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="cleanup" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Auto Inbox Cleanup</CardTitle>
                      <p className="text-sm text-gray-600">
                        Automatically identify and manage promotional emails and spam
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-medium mb-3">Cleanup Statistics</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                              <span className="text-sm">Promotions Cleaned</span>
                              <Badge className="bg-green-100 text-green-800">47 emails</Badge>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-red-50 rounded">
                              <span className="text-sm">Spam Blocked</span>
                              <Badge className="bg-red-100 text-red-800">12 emails</Badge>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                              <span className="text-sm">Newsletters Organized</span>
                              <Badge className="bg-blue-100 text-blue-800">23 emails</Badge>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium mb-3">Cleanup Actions</h3>
                          <div className="space-y-2">
                            <Button className="w-full justify-start bg-transparent" variant="outline">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Clean Promotions Now
                            </Button>
                            <Button className="w-full justify-start bg-transparent" variant="outline">
                              <Filter className="w-4 h-4 mr-2" />
                              Update Spam Filters
                            </Button>
                            <Button className="w-full justify-start bg-transparent" variant="outline">
                              <Tag className="w-4 h-4 mr-2" />
                              Organize Newsletters
                            </Button>
                            <Button className="w-full justify-start bg-transparent" variant="outline">
                              <Settings className="w-4 h-4 mr-2" />
                              Cleanup Settings
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          )}

          {activeTab === "calendar" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Deadline Management</h1>
                <p className="text-gray-600">AI-detected deadlines and calendar integration</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Detected Deadlines</CardTitle>
                      <p className="text-sm text-gray-600">Automatically extracted from your emails</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockDeadlines.map((deadline, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                          >
                            <div className="flex items-start space-x-3">
                              <div
                                className={`w-4 h-4 rounded-full mt-1 ${
                                  deadline.priority === "high"
                                    ? "bg-red-500"
                                    : deadline.priority === "medium"
                                      ? "bg-yellow-500"
                                      : "bg-green-500"
                                }`}
                              />
                              <div>
                                <h3 className="font-medium">{deadline.title}</h3>
                                <p className="text-sm text-gray-500">From: {deadline.source}</p>
                                <div className="flex items-center text-sm text-gray-600 mt-1">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {deadline.date} at {deadline.time}
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Calendar className="w-4 h-4 mr-1" />
                                Add to Calendar
                              </Button>
                              <Button size="sm" variant="outline">
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Mark Done
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Calendar Integration</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center p-6 bg-blue-50 rounded-lg">
                        <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                        <h3 className="font-medium mb-2">Google Calendar</h3>
                        <p className="text-sm text-gray-600 mb-4">Sync deadlines automatically</p>
                        <Button size="sm" className="w-full">
                          <Plus className="w-4 h-4 mr-2" />
                          Connect Calendar
                        </Button>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium">Quick Stats</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>This Week</span>
                            <Badge variant="destructive">3 deadlines</Badge>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Next Week</span>
                            <Badge variant="default">1 deadline</Badge>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Overdue</span>
                            <Badge variant="secondary">0 deadlines</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "analytics" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Productivity Analytics</h1>
                <p className="text-gray-600">Insights into your email habits and productivity</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                  {
                    title: "Emails Processed",
                    value: mockAnalytics.emailsProcessed,
                    icon: Mail,
                    color: "text-blue-600",
                  },
                  { title: "Time Saved", value: mockAnalytics.timesSaved, icon: Clock, color: "text-green-600" },
                  {
                    title: "Deadlines Detected",
                    value: mockAnalytics.deadlinesDetected,
                    icon: Calendar,
                    color: "text-yellow-600",
                  },
                  { title: "Spam Cleaned", value: mockAnalytics.spamCleaned, icon: Trash2, color: "text-red-600" },
                ].map((stat) => (
                  <Card key={stat.title}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">{stat.title}</p>
                          <p className="text-2xl font-bold">{stat.value}</p>
                        </div>
                        <stat.icon className={`w-8 h-8 ${stat.color}`} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Email Volume Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                      <div className="text-center">
                        <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">Email volume chart would be displayed here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Response Time Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Average Response Time</span>
                        <Badge className="bg-green-100 text-green-800">{mockAnalytics.responseTime}</Badge>
                      </div>
                      <Progress value={75} className="mb-2" />
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Fastest</p>
                          <p className="font-medium">15 minutes</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Slowest</p>
                          <p className="font-medium">2 days</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Email Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { category: "Work", percentage: 45, color: "bg-blue-500" },
                        { category: "Personal", percentage: 25, color: "bg-green-500" },
                        { category: "Newsletters", percentage: 20, color: "bg-yellow-500" },
                        { category: "Promotions", percentage: 10, color: "bg-red-500" },
                      ].map((item) => (
                        <div key={item.category} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-4 h-4 rounded ${item.color}`} />
                            <span className="text-sm">{item.category}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${item.color}`}
                                style={{ width: `${item.percentage}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-600">{item.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Productivity Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-600 mb-4">{mockAnalytics.productivityScore}%</div>
                      <Progress value={mockAnalytics.productivityScore} className="mb-4" />
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">This Week</p>
                          <p className="font-medium text-green-600">+5%</p>
                        </div>
                        <div>
                          <p className="text-gray-500">This Month</p>
                          <p className="font-medium text-green-600">+12%</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {activeTab === "settings" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-600">Configure your MailVoid preferences and integrations</p>
              </div>

              <Tabs defaultValue="general" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="ai">AI Settings</TabsTrigger>
                  <TabsTrigger value="integrations">Integrations</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src="/placeholder.svg?height=64&width=64" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">John Doe</h3>
                          <p className="text-sm text-gray-500">john.doe@gmail.com</p>
                          <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                            Change Avatar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="ai" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>AI Classification Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Auto-classify emails</h4>
                            <p className="text-sm text-gray-500">Automatically sort emails by priority</p>
                          </div>
                          <input type="checkbox" defaultChecked className="rounded" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Extract deadlines</h4>
                            <p className="text-sm text-gray-500">Automatically detect dates and deadlines</p>
                          </div>
                          <input type="checkbox" defaultChecked className="rounded" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Generate summaries</h4>
                            <p className="text-sm text-gray-500">Create AI summaries for long emails</p>
                          </div>
                          <input type="checkbox" defaultChecked className="rounded" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="integrations" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Connected Services</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Mail className="w-8 h-8 text-red-500" />
                          <div>
                            <h4 className="font-medium">Gmail</h4>
                            <p className="text-sm text-gray-500">Connected</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Disconnect
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-8 h-8 text-blue-500" />
                          <div>
                            <h4 className="font-medium">Google Calendar</h4>
                            <p className="text-sm text-gray-500">Not connected</p>
                          </div>
                        </div>
                        <Button size="sm">Connect</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">High priority emails</h4>
                            <p className="text-sm text-gray-500">Get notified for important emails</p>
                          </div>
                          <input type="checkbox" defaultChecked className="rounded" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Deadline reminders</h4>
                            <p className="text-sm text-gray-500">Remind me about upcoming deadlines</p>
                          </div>
                          <input type="checkbox" defaultChecked className="rounded" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Weekly summary</h4>
                            <p className="text-sm text-gray-500">Send weekly productivity reports</p>
                          </div>
                          <input type="checkbox" defaultChecked className="rounded" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
