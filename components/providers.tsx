"use client"

import { AppProvider } from "@/contexts/AppContext"
import { ThemeProvider } from "@/components/theme-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <AppProvider>{children}</AppProvider>
    </ThemeProvider>
  )
}
