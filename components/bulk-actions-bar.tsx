"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Trash2, Archive, Mail, MailOpen, Shield, X } from "lucide-react"

interface BulkActionsBarProps {
  selectedCount: number
  onClearSelection: () => void
  onDelete: () => void
  onMarkAsSpam: () => void
  onMarkAsNotJunk: () => void
  onMarkAsRead: () => void
  onArchive: () => void
  variant?: "default" | "junk"
}

export function BulkActionsBar({
  selectedCount,
  onClearSelection,
  onDelete,
  onMarkAsSpam,
  onMarkAsNotJunk,
  onMarkAsRead,
  onArchive,
  variant = "default",
}: BulkActionsBarProps) {
  if (selectedCount === 0) return null

  return (
    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">{selectedCount} selected</Badge>
            <Button variant="ghost" size="sm" onClick={onClearSelection}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Separator orientation="vertical" className="h-6" />
        </div>

        <div className="flex items-center space-x-2">
          {variant === "junk" ? (
            <>
              <Button variant="destructive" size="sm" onClick={onDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Selected
              </Button>
              <Button variant="outline" size="sm" onClick={onMarkAsSpam}>
                <Shield className="h-4 w-4 mr-2" />
                Move to Spam
              </Button>
              <Button variant="outline" size="sm" onClick={onMarkAsNotJunk}>
                <Mail className="h-4 w-4 mr-2" />
                Not Junk
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" onClick={onMarkAsRead}>
                <MailOpen className="h-4 w-4 mr-2" />
                Mark as Read
              </Button>
              <Button variant="outline" size="sm" onClick={onArchive}>
                <Archive className="h-4 w-4 mr-2" />
                Archive
              </Button>
              <Button variant="destructive" size="sm" onClick={onDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
