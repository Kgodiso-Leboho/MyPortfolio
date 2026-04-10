import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { AIChatbot } from '../ui/AIChatbot'
import { ChatIcon } from '../ui/InlineIcons'

export function AppLayout() {
  const [chatOpen, setChatOpen] = useState(false)
  return (
    <div className="flex min-h-[100svh] flex-col bg-bg text-text">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 z-[60] rounded-lg bg-bg border border-border px-3 py-2 text-sm text-text shadow-soft"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="content" className="flex-1">
        <Outlet />
      </main>

      <button
        type="button"
        aria-label="Open AI chatbot"
        onClick={() => setChatOpen((value) => !value)}
        className="fixed bottom-4 left-4 z-50 grid h-12 w-12 place-items-center rounded-full border border-border bg-accent text-white shadow-lg transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent/80"
      >
        <ChatIcon className="h-5 w-5" />
      </button>

      <AIChatbot open={chatOpen} onClose={() => setChatOpen(false)} />

      <Footer />
    </div>
  )
}

