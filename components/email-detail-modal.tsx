"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Reply, Forward, Archive, Trash2, Star, Pin, Calendar, Clock, User } from "lucide-react"
import type { Email } from "@/types/email"

interface EmailDetailModalProps {
  email: Email | null
  isOpen: boolean
  onClose: () => void
}

export function EmailDetailModal({ email, isOpen, onClose }: EmailDetailModalProps) {
  if (!email) return null

  const mockFullContent = `
    ${email.snippet}
    
    This is the full email content that would be displayed here. In a real application, this would contain the complete email body with proper formatting, images, and attachments.
    
    Key points from AI analysis:
    • This email has been marked as ${email.priority} priority
    • AI confidence level: ${email.aiConfidence}%
    • Category: ${email.category}
    ${email.hasDeadline ? `• Contains deadline: ${email.deadline?.description}` : ""}
    
    Best regards,
    ${email.sender.split("@")[0]}
  `

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">{email.subject}</DialogTitle>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Star className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Pin className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Email Header */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium">{email.sender}</p>
                <p className="text-sm text-muted-foreground">
                  <Clock className="h-3 w-3 inline mr-1" />
                  {email.timestamp}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge
                className={
                  email.priority === "high"
                    ? "bg-red-100 text-red-800"
                    : email.priority === "medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                }
              >
                {email.priority} priority
              </Badge>
              {email.isImportant && <Badge className="bg-blue-100 text-blue-800">AI Important</Badge>}
            </div>
          </div>

          {/* AI Summary */}
          <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">AI Summary & Actions</h4>
            <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
              This email discusses {email.category} matters with {email.priority} priority.
              {email.hasDeadline && ` Contains a deadline: ${email.deadline?.description}.`}
            </p>
            <div className="flex flex-wrap gap-2">
              {email.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Deadline Alert */}
          {email.hasDeadline && (
            <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="font-medium text-orange-900 dark:text-orange-100">Deadline Detected</p>
                  <p className="text-sm text-orange-800 dark:text-orange-200">
                    {email.deadline?.description} - {email.deadline?.date}
                  </p>
                </div>
              </div>
              <Button size="sm" className="mt-2">
                <Calendar className="h-4 w-4 mr-2" />
                Add to Google Calendar
              </Button>
            </div>
          )}

          <Separator />

          {/* Email Content */}
          <div className="prose dark:prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-sm">{mockFullContent}</div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-2">
              <Button>
                <Reply className="h-4 w-4 mr-2" />
                Reply
              </Button>
              <Button variant="outline">
                <Forward className="h-4 w-4 mr-2" />
                Forward
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <Archive className="h-4 w-4 mr-2" />
                Archive
              </Button>
              <Button variant="outline">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
