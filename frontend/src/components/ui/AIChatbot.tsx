import { useState, useRef, useEffect } from 'react'

type Message = { id: number; role: 'user' | 'ai'; text: string }

const initialMessages: Message[] = [
  {
    id: 1,
    role: 'ai',
    text: "Hi! I'm your AI assistant. Ask me about the portfolio, projects, or my technical strengths.",
  },
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      })

      if (!res.ok) throw new Error('Failed to fetch AI response')

      const data = await res.json()
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: 'ai', text: data.response },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: 'ai', text: 'Error connecting to AI server.' },
      ])
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
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4"
      style={{ background: 'rgba(0,0,0,0.5)' }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0" aria-hidden="true" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-full max-w-sm rounded-2xl border border-[#2a2928] bg-[#0e0e10] shadow-2xl flex flex-col"
        style={{ boxShadow: '0 24px 48px rgba(0,0,0,0.6)' }}
      >

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1c1b1a]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#1e1c1a] border border-[#2a2928] flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-[#c8a87a] fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 10 10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </div>
            <div>
              <div className="text-sm font-bold text-[#dbd9d3] leading-none">AI Assistant</div>
              <div className="font-mono text-[10px] text-[#4a4846] mt-0.5">portfolio · projects · skills</div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg border border-[#1c1b1a] bg-[#0c0c0e] flex items-center justify-center text-[#6b6968] hover:text-[#e8e6e0] hover:border-[#2a2928] transition-colors font-mono text-xs"
            aria-label="Close chat"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 max-h-72 overflow-y-auto px-4 py-3 space-y-3"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#2a2928 transparent' }}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'ai' && (
                <div className="w-5 h-5 rounded-md bg-[#1e1c1a] border border-[#2a2928] flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                  <span className="text-[#c8a87a] font-mono text-[8px] font-bold">AI</span>
                </div>
              )}
              <div
                className={`max-w-[78%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                  message.role === 'user'
                    ? 'bg-[#c8a87a] text-[#0c0c0e] font-semibold'
                    : 'bg-[#141414] border border-[#1c1b1a] text-[#a09d98] font-mono text-[12px]'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}

          {/* Thinking indicator */}
          {isThinking && (
            <div className="flex justify-start">
              <div className="w-5 h-5 rounded-md bg-[#1e1c1a] border border-[#2a2928] flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                <span className="text-[#c8a87a] font-mono text-[8px] font-bold">AI</span>
              </div>
              <div className="bg-[#141414] border border-[#1c1b1a] rounded-xl px-3 py-2 flex items-center gap-1">
                {[0, 150, 300].map((delay) => (
                  <span
                    key={delay}
                    className="w-1.5 h-1.5 rounded-full bg-[#c8a87a] animate-pulse"
                    style={{ animationDelay: `${delay}ms` }}
                  />
                ))}
              </div>
            </div>
          )}

          <div ref={endRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={onSubmit}
          className="flex items-center gap-2 px-4 py-3 border-t border-[#1c1b1a]"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something..."
            className="flex-1 rounded-lg border border-[#1c1b1a] bg-[#0c0c0e] px-3 py-2 font-mono text-[12px] text-[#e8e6e0] placeholder-[#3a3836] focus:outline-none focus:border-[#c8a87a]/40 transition-colors"
            aria-label="Chat input"
          />
          <button
            type="submit"
            disabled={!input.trim() || isThinking}
            className="rounded-lg bg-[#c8a87a] text-[#0c0c0e] px-4 py-2 font-bold text-xs tracking-wide hover:bg-[#d9bc93] transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
          >
            {isThinking ? '...' : 'Send'}
          </button>
        </form>

      </div>
    </div>
  )
}