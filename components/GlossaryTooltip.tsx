'use client'

import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface GlossaryTerm {
  term: string
  definition: string
}

interface GlossaryTooltipProps {
  term: string
  definition: string
}

export function GlossaryTooltip({ term, definition }: GlossaryTooltipProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const tooltipRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLSpanElement>(null)
  const [mounted, setMounted] = useState(false)

  // Only render portal after mount (for SSR compatibility)
  useEffect(() => {
    setMounted(true)
  }, [])

  // Update position when tooltip opens
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      const tooltipWidth = 288 // w-72 = 18rem = 288px

      // Calculate left position (centered on trigger, but keep within viewport)
      let left = rect.left + rect.width / 2 - tooltipWidth / 2
      left = Math.max(8, Math.min(left, window.innerWidth - tooltipWidth - 8))

      // Position above the trigger
      const top = rect.top - 8 + window.scrollY

      setPosition({ top, left })
    }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node) &&
          triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleScroll = () => {
      if (isOpen) setIsOpen(false)
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      window.addEventListener('scroll', handleScroll, true)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('scroll', handleScroll, true)
    }
  }, [isOpen])

  const tooltip = isOpen && mounted ? createPortal(
    <div
      ref={tooltipRef}
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        transform: 'translateY(-100%)',
      }}
      className="z-[9999] w-72 p-3 bg-slate-700 border border-slate-600 rounded-lg shadow-2xl"
    >
      <div className="flex items-start justify-between gap-2 mb-1">
        <span className="text-blue-300 font-semibold text-sm">{term}</span>
        <button
          onClick={() => setIsOpen(false)}
          className="text-slate-400 hover:text-white text-xs leading-none"
        >
          ✕
        </button>
      </div>
      <p className="text-gray-300 text-xs leading-relaxed">{definition}</p>
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-full"
        style={{ left: `${Math.min(Math.max(triggerRef.current ? (triggerRef.current.getBoundingClientRect().left + triggerRef.current.getBoundingClientRect().width / 2 - position.left) : 144, 20), 268)}px` }}
      >
        <div className="border-8 border-transparent border-t-slate-700"></div>
      </div>
    </div>,
    document.body
  ) : null

  return (
    <span className="inline">
      <span
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="border-b border-dotted border-slate-500/50 hover:border-slate-400 cursor-pointer transition-colors"
      >
        {term}
      </span>
      {tooltip}
    </span>
  )
}

// Utility function to linkify glossary terms in text
export function linkifyGlossaryTerms(
  text: string,
  glossary: GlossaryTerm[]
): (string | JSX.Element)[] {
  if (!glossary || glossary.length === 0) return [text]

  // Sort by term length (longest first) to match longer terms before shorter ones
  const sortedGlossary = [...glossary].sort((a, b) => b.term.length - a.term.length)

  // Create a map for quick lookup
  const termMap = new Map(sortedGlossary.map(g => [g.term.toLowerCase(), g]))

  // Build regex pattern for all terms (case insensitive, word boundaries)
  const pattern = sortedGlossary
    .map(g => g.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|')

  if (!pattern) return [text]

  const regex = new RegExp(`\\b(${pattern})\\b`, 'gi')

  const parts: (string | JSX.Element)[] = []
  let lastIndex = 0
  let match
  let keyIndex = 0
  const usedTerms = new Set<string>() // Only linkify first occurrence of each term

  while ((match = regex.exec(text)) !== null) {
    const matchedTerm = match[1]
    const termLower = matchedTerm.toLowerCase()

    // Skip if we've already linked this term
    if (usedTerms.has(termLower)) continue

    const glossaryEntry = termMap.get(termLower)
    if (!glossaryEntry) continue

    usedTerms.add(termLower)

    // Add text before match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    // Add tooltip component
    parts.push(
      <GlossaryTooltip
        key={`glossary-${keyIndex++}`}
        term={matchedTerm}
        definition={glossaryEntry.definition}
      />
    )

    lastIndex = match.index + matchedTerm.length
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts.length > 0 ? parts : [text]
}
