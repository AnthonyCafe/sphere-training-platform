'use client'

import { useState } from 'react'
import { MessageSquareWarning, X, Send, Loader2, CheckCircle } from 'lucide-react'

interface FeedbackButtonProps {
  section: string
  pillar: string
}

export default function FeedbackButton({ section, pillar }: FeedbackButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [feedbackType, setFeedbackType] = useState<'error' | 'suggestion' | 'other'>('error')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async () => {
    if (!feedback.trim()) return

    setSending(true)
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pillar,
          section,
          feedbackType,
          feedback: feedback.trim(),
          url: window.location.href,
          timestamp: new Date().toISOString()
        })
      })

      if (response.ok) {
        setSent(true)
        setTimeout(() => {
          setIsOpen(false)
          setSent(false)
          setFeedback('')
        }, 2000)
      }
    } catch (error) {
      console.error('Failed to send feedback:', error)
    }
    setSending(false)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 transition-colors"
        title="Report an issue"
      >
        <MessageSquareWarning className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Feedback</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl border border-slate-700 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <MessageSquareWarning className="w-5 h-5 text-amber-400" />
                Report Issue
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {sent ? (
              <div className="p-8 text-center">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <p className="text-white font-medium">Thanks for your feedback!</p>
                <p className="text-slate-400 text-sm mt-1">We'll review it shortly.</p>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                <div>
                  <p className="text-xs text-slate-400 mb-2">
                    <span className="text-slate-500">Section:</span> {pillar} → {section}
                  </p>
                </div>

                <div>
                  <label className="text-sm text-slate-300 mb-2 block">Type of issue</label>
                  <div className="flex gap-2">
                    {[
                      { value: 'error', label: 'Content Error' },
                      { value: 'suggestion', label: 'Suggestion' },
                      { value: 'other', label: 'Other' }
                    ].map((type) => (
                      <button
                        key={type.value}
                        onClick={() => setFeedbackType(type.value as any)}
                        className={`px-3 py-1.5 text-xs rounded-lg transition ${
                          feedbackType === type.value
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/50'
                            : 'bg-slate-700 text-slate-400 hover:text-white'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-slate-300 mb-2 block">Describe the issue</label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="What's wrong or what could be improved?"
                    className="w-full h-32 bg-slate-700 border border-slate-600 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!feedback.trim() || sending}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium flex items-center justify-center gap-2 transition"
                >
                  {sending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Feedback
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
