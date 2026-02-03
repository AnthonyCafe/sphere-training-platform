'use client'

import { useState, useRef, useEffect } from 'react'
import { HelpCircle, X, Send, Loader2 } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

// Format AI response with markdown-like styling
const FormattedMessage = ({ content }: { content: string }) => {
  const lines = content.split('\n')

  return (
    <div className="text-sm space-y-1">
      {lines.map((line, i) => {
        const trimmed = line.trim()
        if (!trimmed) return <div key={i} className="h-1" />

        // Headers
        if (trimmed.startsWith('### ')) {
          return <p key={i} className="font-semibold text-white mt-2">{trimmed.slice(4)}</p>
        }
        if (trimmed.startsWith('## ')) {
          return <p key={i} className="font-semibold text-white mt-2">{trimmed.slice(3)}</p>
        }

        // Bold headers like **Something:**
        if (/^\*\*.*?\*\*:?$/.test(trimmed)) {
          return <p key={i} className="font-semibold text-white mt-2">{trimmed.replace(/\*\*/g, '')}</p>
        }

        // Bullet points
        if (trimmed.startsWith('- ') || trimmed.startsWith('• ') || trimmed.startsWith('* ')) {
          const text = trimmed.slice(2)
          return (
            <div key={i} className="flex items-start gap-2 ml-2">
              <span className="text-blue-400">•</span>
              <span dangerouslySetInnerHTML={{ __html: text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
            </div>
          )
        }

        // Numbered items
        if (/^\d+[\.\\)]\s/.test(trimmed)) {
          const match = trimmed.match(/^(\d+)[\.\\)]\s*(.*)/)
          if (match) {
            return (
              <div key={i} className="flex items-start gap-2 ml-2">
                <span className="text-blue-400 font-medium">{match[1]}.</span>
                <span dangerouslySetInnerHTML={{ __html: match[2].replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
              </div>
            )
          }
        }

        // Regular text with bold support
        const formatted = trimmed.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
        return <p key={i} dangerouslySetInnerHTML={{ __html: formatted }} />
      })}
    </div>
  )
}

export default function HelpChat({ hidden }: { hidden: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      const response = await fetch('/api/ai-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'help',
          question: userMessage
        })
      })
      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.feedback || 'Sorry, I couldn\'t process that request.' }])
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, there was an error. Please try again.' }])
    }

    setLoading(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (hidden) return null

  return (
    <>
      {/* Floating Help Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 z-50"
        >
          <HelpCircle className="w-7 h-7" />
        </button>
      )}

      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl flex flex-col z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-700">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-400" />
              <h3 className="font-semibold text-white">Ask a Question</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-slate-400 mt-8">
                <HelpCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">Ask any question about the training content.</p>
                <p className="text-xs mt-2 text-slate-500">I'm here to help clarify concepts!</p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700 text-gray-200'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  ) : (
                    <FormattedMessage content={msg.content} />
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-700 rounded-2xl px-4 py-2">
                  <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your question..."
                className="flex-1 bg-slate-700 border border-slate-600 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl px-4 py-2 transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
