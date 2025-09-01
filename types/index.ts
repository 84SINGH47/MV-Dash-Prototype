export interface Email {
  id: number
  subject: string
  sender: string
  time: string
  priority: "high" | "medium" | "low"
  category: string
  unread: boolean
  hasDeadline?: boolean
  deadline?: string
  summary?: string
  confidence?: number
  aiReason?: string
}

export interface Deadline {
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

export interface EmailThread {
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

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface Analytics {
  emailsProcessed: number
  timesSaved: string
  deadlinesDetected: number
  spamCleaned: number
  responseTime: string
  productivityScore: number
}
