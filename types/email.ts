export interface Email {
  id: string
  sender: string
  subject: string
  snippet: string
  timestamp: string
  priority: "high" | "medium" | "low"
  category: "work" | "personal" | "finance" | "newsletter" | "promotion"
  isRead: boolean
  isPinned: boolean
  isImportant: boolean
  aiConfidence: number
  tags: string[]
  hasDeadline?: boolean
  deadline?: {
    date: string
    description: string
  }
}

export interface JunkEmail extends Email {
  junkType: "spam" | "scam" | "promotion" | "newsletter"
  riskLevel: "low" | "medium" | "high"
}

export interface Deadline {
  id: string
  title: string
  date: string
  time?: string
  source: Email
  isCompleted: boolean
  isSynced: boolean
}

export interface AIInsights {
  importantEmailsToday: number
  junkMailsFiltered: number
  deadlinesDetected: number
  totalEmails: number
  priorityBreakdown: {
    high: number
    medium: number
    low: number
  }
}
