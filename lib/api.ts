// API service layer
import type { Email, EmailThread, Analytics } from "./types" // Assuming these types are declared in a separate file

export class ApiService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"

  async classifyEmails(emails: Email[]): Promise<Email[]> {
    try {
      const response = await fetch(`${this.baseUrl}/classify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emails }),
      })
      return await response.json()
    } catch (error) {
      console.error("Email classification failed:", error)
      throw error
    }
  }

  async generateSummary(threadId: number): Promise<EmailThread> {
    try {
      const response = await fetch(`${this.baseUrl}/summarize/${threadId}`)
      return await response.json()
    } catch (error) {
      console.error("Summary generation failed:", error)
      throw error
    }
  }

  async cleanupInbox(categories: string[]): Promise<{ cleaned: number }> {
    try {
      const response = await fetch(`${this.baseUrl}/cleanup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categories }),
      })
      return await response.json()
    } catch (error) {
      console.error("Inbox cleanup failed:", error)
      throw error
    }
  }

  async getAnalytics(): Promise<Analytics> {
    try {
      const response = await fetch(`${this.baseUrl}/analytics`)
      return await response.json()
    } catch (error) {
      console.error("Analytics fetch failed:", error)
      throw error
    }
  }
}

export const apiService = new ApiService()
