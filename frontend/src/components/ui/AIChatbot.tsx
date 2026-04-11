import { useState, useRef, useEffect } from 'react'

type Message = { id: number; role: 'user' | 'ai'; text: string }

const initialMessages: Message[] = [
  { id: 1, role: 'ai', text: 'Hi! I’m your AI assistant. Ask me about the portfolio, projects, or my technical strengths.' },
]

export function AIChatbot({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const sendMessage = async () => {
    const trimmed = input.trim()
    if (!trimmed || isThinking) return

    const userMessage: Message = { id: Date.now(), role: 'user', text: trimmed }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsThinking(true)

    try {
      const res = await fetch('https://myportfolio-production-0bd1.up.railway.app/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: trimmed }),
      })

      if (!res.ok) {
        throw new Error('Failed to fetch AI response')
      }

      const data = await res.json()

      const aiMessage: Message = {
        id: Date.now() + 1,
        role: 'ai',
        text: data.response,
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now() + 1,
        role: 'ai',
        text: 'Error connecting to AI server.',
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsThinking(false)
    }
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    sendMessage()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/30 p-4">
      <div className="absolute inset-0" aria-hidden="true" onClick={onClose} />

      <div className="relative w-full max-w-sm rounded-2xl border border-border bg-white p-4 shadow-2xl ring-1 ring-slate-200 dark:bg-slate-900 dark:border-slate-700 dark:ring-slate-700">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold">AI Assistant</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-1 text-sm text-text/70 hover:bg-slate-100 hover:text-text dark:hover:bg-slate-800"
          >
            ✕
          </button>
        </div>

        <p className="mt-1 text-xs text-text/70">
          Ask about the portfolio, projects, and technologies.
        </p>

        <div className="mt-4 max-h-72 overflow-y-auto space-y-2 rounded-xl border border-border bg-white p-3 dark:bg-slate-950">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${
                  message.role === 'user'
                    ? 'bg-accent text-white'
                    : 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-200'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        <form onSubmit={onSubmit} className="mt-3 flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            className="flex-1 rounded-lg border border-border bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent dark:bg-slate-800"
            aria-label="Chat input"
          />

          <button
            type="submit"
            disabled={!input.trim() || isThinking}
            className="rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isThinking ? '...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  )
}