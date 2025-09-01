"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { ThemeToggle } from "@/components/theme-toggle"
import { EmailCard } from "@/components/email-card"
import { EmailDetailModal } from "@/components/email-detail-modal"
import { BulkActionsBar } from "@/components/bulk-actions-bar"
import { AIInsightsPanel } from "@/components/ai-insights-panel"
import { DeadlineCalendar } from "@/components/deadline-calendar"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Filter, Pin, Mail, Trash2, Calendar, Sparkles, Shield, RefreshCw } from "lucide-react"
import { mockEmails, mockJunkEmails, mockDeadlines, mockAIInsights } from "@/lib/mock-data"
import type { Email, JunkEmail, Deadline } from "@/types/email"

export default function MailVoid() {
  const [activeTab, setActiveTab] = useState("prioritization")
  const [emails, setEmails] = useState<Email[]>([])
  const [junkEmails, setJunkEmails] = useState<JunkEmail[]>([])
  const [deadlines, setDeadlines] = useState<Deadline[]>([])
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  const [selectedEmails, setSelectedEmails] = useState<string[]>([])
  const [selectedJunkEmails, setSelectedJunkEmails] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [priorityFilter, setPriorityFilter] = useState<"all" | "high" | "medium" | "low">("all")
  const [timeFilter, setTimeFilter] = useState<"all" | "today" | "week">("all")
  const [junkFilter, setJunkFilter] = useState<"all" | "spam" | "scam" | "promotion" | "newsletter">("all")
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setEmails(mockEmails)
      setJunkEmails(mockJunkEmails)
      setDeadlines(mockDeadlines)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Filter emails based on search and filters
  const filteredEmails = emails.filter((email) => {
    const matchesSearch =
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.snippet.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesPriority = priorityFilter === "all" || email.priority === priorityFilter

    const matchesTime =
      timeFilter === "all" ||
      (timeFilter === "today" && email.timestamp.includes("hour")) ||
      (timeFilter === "week" && (email.timestamp.includes("hour") || email.timestamp.includes("day")))

    return matchesSearch && matchesPriority && matchesTime
  })

  const filteredJunkEmails = junkEmails.filter((email) => {
    const matchesSearch =
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.sender.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = junkFilter === "all" || email.junkType === junkFilter

    return matchesSearch && matchesType
  })

  const pinnedEmails = filteredEmails.filter((email) => email.isPinned)
  const regularEmails = filteredEmails.filter((email) => !email.isPinned)

  // Event handlers
  const handleEmailSelect = (emailId: string, selected: boolean) => {
    setSelectedEmails((prev) => (selected ? [...prev, emailId] : prev.filter((id) => id !== emailId)))
  }

  const handleJunkEmailSelect = (emailId: string, selected: boolean) => {
    setSelectedJunkEmails((prev) => (selected ? [...prev, emailId] : prev.filter((id) => id !== emailId)))
  }

  const handleMarkAsRead = (emailId?: string) => {
    const idsToUpdate = emailId ? [emailId] : selectedEmails
    setEmails((prev) => prev.map((email) => (idsToUpdate.includes(email.id) ? { ...email, isRead: true } : email)))
    if (!emailId) setSelectedEmails([])
    toast({ title: "Marked as read", description: `${idsToUpdate.length} email(s) marked as read` })
  }

  const handleSnooze = (emailId: string) => {
    toast({ title: "Email snoozed", description: "Email will reappear in 4 hours" })
  }

  const handlePin = (emailId: string) => {
    setEmails((prev) => prev.map((email) => (email.id === emailId ? { ...email, isPinned: !email.isPinned } : email)))
    toast({ title: "Email pinned", description: "Email moved to pinned section" })
  }

  const handleDeleteEmails = () => {
    const count = selectedEmails.length
    setEmails((prev) => prev.filter((email) => !selectedEmails.includes(email.id)))
    setSelectedEmails([])
    toast({ title: "Emails deleted", description: `${count} email(s) moved to trash` })
  }

  const handleDeleteJunkEmails = () => {
    const count = selectedJunkEmails.length
    setJunkEmails((prev) => prev.filter((email) => !selectedJunkEmails.includes(email.id)))
    setSelectedJunkEmails([])
    toast({ title: "Junk emails deleted", description: `${count} email(s) permanently deleted` })
  }

  const handleMarkAsSpam = () => {
    const count = selectedJunkEmails.length
    setSelectedJunkEmails([])
    toast({ title: "Moved to spam", description: `${count} email(s) moved to spam folder` })
  }

  const handleMarkAsNotJunk = () => {
    const count = selectedJunkEmails.length
    const emailsToMove = junkEmails.filter((email) => selectedJunkEmails.includes(email.id))

    // Move to regular emails
    setEmails((prev) => [
      ...prev,
      ...emailsToMove.map(
        (email) =>
          ({
            ...email,
            junkType: undefined,
            riskLevel: undefined,
          }) as Email,
      ),
    ])

    // Remove from junk
    setJunkEmails((prev) => prev.filter((email) => !selectedJunkEmails.includes(email.id)))
    setSelectedJunkEmails([])

    toast({ title: "Moved to inbox", description: `${count} email(s) moved back to inbox` })
  }

  const handleAddToCalendar = (deadline: Deadline) => {
    setDeadlines((prev) => prev.map((d) => (d.id === deadline.id ? { ...d, isSynced: true } : d)))
    toast({
      title: "Added to calendar",
      description: `"${deadline.title}" synced to Google Calendar`,
    })
  }

  const handleMarkDeadlineComplete = (deadlineId: string) => {
    setDeadlines((prev) => prev.map((d) => (d.id === deadlineId ? { ...d, isCompleted: true } : d)))
    toast({ title: "Deadline completed", description: "Deadline marked as completed" })
  }

  const handleRegenerateInsights = () => {
    toast({ title: "AI insights updated", description: "Summary regenerated successfully" })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto p-6">
          <div className="space-y-6">
            <Skeleton className="h-12 w-64" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-24" />
              ))}
            </div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-32" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold">MailVoid</h1>
              </div>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                Beta
              </Badge>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search emails..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="prioritization" className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">Smart Priority</span>
            </TabsTrigger>
            <TabsTrigger value="junk-cleaner" className="flex items-center space-x-2">
              <Trash2 className="h-4 w-4" />
              <span className="hidden sm:inline">Junk Cleaner</span>
            </TabsTrigger>
            <TabsTrigger value="deadlines" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Deadlines</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">AI Insights</span>
            </TabsTrigger>
          </TabsList>

          {/* Smart Email Prioritization */}
          <TabsContent value="prioritization" className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
              <div>
                <h2 className="text-2xl font-bold">Smart Email Prioritization</h2>
                <p className="text-muted-foreground">AI-identified important emails with smart filtering</p>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Priority: {priorityFilter}
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Time: {timeFilter}
                </Button>
              </div>
            </div>

            {/* Mobile Search */}
            <div className="md:hidden">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search emails..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Priority:</span>
                {["all", "high", "medium", "low"].map((priority) => (
                  <Button
                    key={priority}
                    variant={priorityFilter === priority ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPriorityFilter(priority as any)}
                    className="capitalize"
                  >
                    {priority}
                  </Button>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Time:</span>
                {["all", "today", "week"].map((time) => (
                  <Button
                    key={time}
                    variant={timeFilter === time ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimeFilter(time as any)}
                    className="capitalize"
                  >
                    {time === "week" ? "This Week" : time}
                  </Button>
                ))}
              </div>
            </div>

            <BulkActionsBar
              selectedCount={selectedEmails.length}
              onClearSelection={() => setSelectedEmails([])}
              onDelete={handleDeleteEmails}
              onMarkAsSpam={() => {}}
              onMarkAsNotJunk={() => {}}
              onMarkAsRead={() => handleMarkAsRead()}
              onArchive={() => toast({ title: "Archived", description: "Emails archived successfully" })}
            />

            <div className="space-y-6">
              {/* Pinned Section */}
              {pinnedEmails.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <Pin className="h-4 w-4 text-blue-600" />
                    <h3 className="font-semibold">Pinned</h3>
                    <Badge variant="secondary">{pinnedEmails.length}</Badge>
                  </div>
                  <div className="space-y-3">
                    {pinnedEmails.map((email) => (
                      <EmailCard
                        key={email.id}
                        email={email}
                        isSelected={selectedEmails.includes(email.id)}
                        onSelect={(selected) => handleEmailSelect(email.id, selected)}
                        onPin={() => handlePin(email.id)}
                        onMarkRead={() => handleMarkAsRead(email.id)}
                        onSnooze={() => handleSnooze(email.id)}
                        onClick={() => setSelectedEmail(email)}
                        showCheckbox={true}
                      />
                    ))}
                  </div>
                  <Separator className="my-6" />
                </div>
              )}

              {/* Regular Emails */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">All Emails</h3>
                  <Badge variant="secondary">{regularEmails.length}</Badge>
                </div>

                {regularEmails.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Mail className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium text-muted-foreground mb-2">No emails found</h3>
                      <p className="text-sm text-muted-foreground text-center">
                        Try adjusting your filters or search query
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {regularEmails.map((email) => (
                      <EmailCard
                        key={email.id}
                        email={email}
                        isSelected={selectedEmails.includes(email.id)}
                        onSelect={(selected) => handleEmailSelect(email.id, selected)}
                        onPin={() => handlePin(email.id)}
                        onMarkRead={() => handleMarkAsRead(email.id)}
                        onSnooze={() => handleSnooze(email.id)}
                        onClick={() => setSelectedEmail(email)}
                        showCheckbox={true}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Junk Mail Cleaner */}
          <TabsContent value="junk-cleaner" className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
              <div>
                <h2 className="text-2xl font-bold">Spam, Scam & Junk Mail Cleaner</h2>
                <p className="text-muted-foreground">AI-identified irrelevant emails for bulk management</p>
              </div>

              <Button>
                <RefreshCw className="h-4 w-4 mr-2" />
                Scan for Junk
              </Button>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium">Category:</span>
              {["all", "spam", "scam", "promotion", "newsletter"].map((type) => (
                <Button
                  key={type}
                  variant={junkFilter === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setJunkFilter(type as any)}
                  className="capitalize"
                >
                  {type}
                </Button>
              ))}
            </div>

            <BulkActionsBar
              selectedCount={selectedJunkEmails.length}
              onClearSelection={() => setSelectedJunkEmails([])}
              onDelete={handleDeleteJunkEmails}
              onMarkAsSpam={handleMarkAsSpam}
              onMarkAsNotJunk={handleMarkAsNotJunk}
              onMarkAsRead={() => {}}
              onArchive={() => {}}
              variant="junk"
            />

            {/* Junk Email Categories */}
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">All Junk</TabsTrigger>
                <TabsTrigger value="spam">Spam</TabsTrigger>
                <TabsTrigger value="scam" className="text-red-600">
                  Scam
                </TabsTrigger>
                <TabsTrigger value="promotion">Promotions</TabsTrigger>
                <TabsTrigger value="newsletter">Newsletters</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-3">
                {filteredJunkEmails.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Shield className="h-12 w-12 text-green-500 mb-4" />
                      <h3 className="text-lg font-medium text-muted-foreground mb-2">No junk emails found</h3>
                      <p className="text-sm text-muted-foreground text-center">
                        Your inbox is clean! AI hasn't detected any spam or junk emails.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredJunkEmails.map((email) => (
                    <EmailCard
                      key={email.id}
                      email={email}
                      isSelected={selectedJunkEmails.includes(email.id)}
                      onSelect={(selected) => handleJunkEmailSelect(email.id, selected)}
                      onClick={() => setSelectedEmail(email)}
                      showCheckbox={true}
                      variant="junk"
                    />
                  ))
                )}
              </TabsContent>

              {["spam", "scam", "promotion", "newsletter"].map((category) => (
                <TabsContent key={category} value={category} className="space-y-3">
                  {filteredJunkEmails
                    .filter((email) => email.junkType === category)
                    .map((email) => (
                      <EmailCard
                        key={email.id}
                        email={email}
                        isSelected={selectedJunkEmails.includes(email.id)}
                        onSelect={(selected) => handleJunkEmailSelect(email.id, selected)}
                        onClick={() => setSelectedEmail(email)}
                        showCheckbox={true}
                        variant="junk"
                      />
                    ))}

                  {filteredJunkEmails.filter((email) => email.junkType === category).length === 0 && (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-8">
                        <p className="text-muted-foreground">No {category} emails found</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </TabsContent>

          {/* Deadline Detection & Calendar Sync */}
          <TabsContent value="deadlines" className="space-y-6">
            <DeadlineCalendar
              deadlines={deadlines}
              onAddToCalendar={handleAddToCalendar}
              onMarkComplete={handleMarkDeadlineComplete}
              onViewEmail={(emailId) => {
                const email =
                  emails.find((e) => e.id === emailId) || deadlines.find((d) => d.source.id === emailId)?.source
                if (email) setSelectedEmail(email)
              }}
              onAddManualDeadline={() =>
                toast({
                  title: "Manual deadline",
                  description: "Manual deadline form would open here",
                })
              }
            />
          </TabsContent>

          {/* AI Insights Dashboard */}
          <TabsContent value="insights" className="space-y-6">
            <AIInsightsPanel
              insights={mockAIInsights}
              onRegenerateInsights={handleRegenerateInsights}
              onViewInbox={() => setActiveTab("prioritization")}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Email Detail Modal */}
      <EmailDetailModal email={selectedEmail} isOpen={!!selectedEmail} onClose={() => setSelectedEmail(null)} />

      <Toaster />
    </div>
  )
}
