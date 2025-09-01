"use client"

import type React from "react"
import { createContext, useContext, useReducer } from "react"
import type { Email, Deadline, User, Analytics } from "@/types"
import { apiService } from "@/lib/api"

interface AppState {
  user: User | null
  emails: Email[]
  deadlines: Deadline[]
  analytics: Analytics | null
  isLoading: boolean
  error: string | null
}

type AppAction =
  | { type: "SET_USER"; payload: User }
  | { type: "SET_EMAILS"; payload: Email[] }
  | { type: "SET_DEADLINES"; payload: Deadline[] }
  | { type: "SET_ANALYTICS"; payload: Analytics }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "UPDATE_EMAIL"; payload: Email }
  | { type: "MARK_DEADLINE_COMPLETE"; payload: number }

const initialState: AppState = {
  user: null,
  emails: [],
  deadlines: [],
  analytics: null,
  isLoading: false,
  error: null,
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload }
    case "SET_EMAILS":
      return { ...state, emails: action.payload }
    case "SET_DEADLINES":
      return { ...state, deadlines: action.payload }
    case "SET_ANALYTICS":
      return { ...state, analytics: action.payload }
    case "SET_LOADING":
      return { ...state, isLoading: action.payload }
    case "SET_ERROR":
      return { ...state, error: action.payload }
    case "UPDATE_EMAIL":
      return {
        ...state,
        emails: state.emails.map((email) => (email.id === action.payload.id ? action.payload : email)),
      }
    case "MARK_DEADLINE_COMPLETE":
      return {
        ...state,
        deadlines: state.deadlines.map((deadline) =>
          deadline.id === action.payload ? { ...deadline, status: "completed" as const } : deadline,
        ),
      }
    default:
      return state
  }
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
  actions: {
    classifyEmails: () => Promise<void>
    loadAnalytics: () => Promise<void>
    markDeadlineComplete: (id: number) => void
  }
} | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  const actions = {
    classifyEmails: async () => {
      dispatch({ type: "SET_LOADING", payload: true })
      try {
        const classified = await apiService.classifyEmails(state.emails)
        dispatch({ type: "SET_EMAILS", payload: classified })
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: "Failed to classify emails" })
      } finally {
        dispatch({ type: "SET_LOADING", payload: false })
      }
    },

    loadAnalytics: async () => {
      try {
        const analytics = await apiService.getAnalytics()
        dispatch({ type: "SET_ANALYTICS", payload: analytics })
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: "Failed to load analytics" })
      }
    },

    markDeadlineComplete: (id: number) => {
      dispatch({ type: "MARK_DEADLINE_COMPLETE", payload: id })
    },
  }

  return <AppContext.Provider value={{ state, dispatch, actions }}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within AppProvider")
  }
  return context
}
