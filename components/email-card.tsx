"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Pin, Star, Eye, EyeOff, AlarmClockIcon as Snooze, Calendar, AlertTriangle, Shield, Mail } from "lucide-react"
import type { Email, JunkEmail } from "@/types/email"
import { cn } from "@/lib/utils"

interface EmailCardProps {
  email: Email | JunkEmail
  isSelected?: boolean
  onSelect?: (selected: boolean) => void
  onPin?: () => void
  onMarkRead?: () => void
  onSnooze?: () => void
  onClick?: () => void
  showCheckbox?: boolean
  variant?: "default" | "junk"
}

export function EmailCard({
  email,
  isSelected = false,
  onSelect,
  onPin,
  onMarkRead,
  onSnooze,
  onClick,
  showCheckbox = false,
  variant = "default",
}: EmailCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    }
  }

  const getRiskIcon = (email: JunkEmail) => {
    switch (email.riskLevel) {
      case "high":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "medium":
        return <Shield className="h-4 w-4 text-yellow-500" />
      default:
        return <Mail className="h-4 w-4 text-gray-500" />
    }
  }

  const isJunkEmail = (email: Email | JunkEmail): email is JunkEmail => {
    return "junkType" in email
  }

  return (
    <Card
      className={cn(
        "transition-all duration-200 cursor-pointer hover:shadow-md",
        !email.isRead && "border-l-4 border-l-blue-500",
        email.isImportant && variant === "default" && "bg-blue-50 dark:bg-blue-950/20",
        isSelected && "ring-2 ring-blue-500",
        variant === "junk" && "border-orange-200 dark:border-orange-800",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          {showCheckbox && (
            <Checkbox
              checked={isSelected}
              onCheckedChange={onSelect}
              onClick={(e) => e.stopPropagation()}
              className="mt-1"
            />
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className={cn("font-medium text-sm truncate", !email.isRead && "font-semibold")}>
                  {email.sender}
                </span>
                {email.isPinned && <Pin className="h-3 w-3 text-blue-500" />}
                {email.isImportant && variant === "default" && (
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                )}
                {isJunkEmail(email) && getRiskIcon(email)}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground">{email.timestamp}</span>
                {!email.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
              </div>
            </div>

            <h3 className={cn("text-sm mb-1 truncate", !email.isRead && "font-semibold")}>{email.subject}</h3>

            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{email.snippet}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 flex-wrap gap-1">
                <Badge className={getPriorityColor(email.priority)}>{email.priority}</Badge>

                {email.hasDeadline && (
                  <Badge variant="outline" className="text-xs">
                    <Calendar className="h-3 w-3 mr-1" />
                    Deadline
                  </Badge>
                )}

                {variant === "default" && email.isImportant && (
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    AI Marked Important
                  </Badge>
                )}

                {variant === "junk" && isJunkEmail(email) && (
                  <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                    {email.aiConfidence}% AI confidence - {email.junkType}
                  </Badge>
                )}

                {email.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>

              {(isHovered || !email.isRead) && variant === "default" && (
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onMarkRead?.()
                    }}
                  >
                    {email.isRead ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onSnooze?.()
                    }}
                  >
                    <Snooze className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
