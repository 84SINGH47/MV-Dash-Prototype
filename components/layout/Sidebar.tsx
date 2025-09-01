"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  BarChart3,
  Inbox,
  Calendar,
  TrendingUp,
  Settings,
  Sparkles,
  Trash2,
  FileText,
  Filter,
  Tag,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useApp } from "@/contexts/AppContext"
import { useDebounce } from "@/hooks/useDebounce"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const navigation = [
  { name: "Overview", href: "/dashboard", icon: BarChart3 },
  { name: "Smart Inbox", href: "/dashboard/inbox", icon: Inbox },
  { name: "Deadlines", href: "/dashboard/deadlines", icon: Calendar },
  { name: "Analytics", href: "/dashboard/analytics", icon: TrendingUp },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const debouncedSearch = useDebounce(searchQuery, 300)
  const pathname = usePathname()
  const { state, actions } = useApp()

  const filters = [
    { key: "all", label: "All Emails", color: "bg-gray-500", count: state.emails.length },
    {
      key: "high",
      label: "High Priority",
      color: "bg-red-500",
      count: state.emails.filter((e) => e.priority === "high").length,
    },
    {
      key: "medium",
      label: "Medium Priority",
      color: "bg-yellow-500",
      count: state.emails.filter((e) => e.priority === "medium").length,
    },
    {
      key: "low",
      label: "Low Priority",
      color: "bg-green-500",
      count: state.emails.filter((e) => e.priority === "low").length,
    },
  ]

  const labels = [
    { name: "Work", count: 12, color: "bg-blue-500" },
    { name: "Finance", count: 5, color: "bg-green-500" },
    { name: "Personal", count: 8, color: "bg-purple-500" },
    { name: "Newsletters", count: 23, color: "bg-orange-500" },
    { name: "Deadlines", count: 4, color: "bg-red-500" },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Close button (mobile only) */}
          <div className="flex items-center justify-between p-4 lg:hidden">
            <span className="text-lg font-semibold">Menu</span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Navigation */}
            <nav className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                    )}
                    onClick={() => onClose()}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>

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

            {/* AI Actions */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                <Sparkles className="w-4 h-4 mr-2" />
                AI Actions
              </h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-transparent"
                  onClick={actions.classifyEmails}
                  disabled={state.isLoading}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Classify Emails
                </Button>
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

            {/* Priority Filters */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Priority Filters
              </h3>
              <div className="space-y-2">
                {filters.map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setSelectedFilter(filter.key)}
                    className={cn(
                      "flex items-center justify-between text-sm w-full text-left p-2 rounded transition-colors",
                      selectedFilter === filter.key
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                    )}
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

            {/* Smart Labels */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                Smart Labels
              </h3>
              <div className="space-y-2">
                {labels.map((label) => (
                  <div
                    key={label.name}
                    className="flex items-center justify-between text-sm text-gray-600 hover:text-gray-900 cursor-pointer p-1 rounded hover:bg-gray-50 transition-colors"
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
      </div>
    </>
  )
}
