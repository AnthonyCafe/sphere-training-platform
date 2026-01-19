'use client';

import React from 'react';

// Type definitions for the structured learn content
interface DetailItem {
  label: string;
  value: string;
}

interface LearnSection {
  title: string;
  icon?: string;
  content: string;
  details?: DetailItem[];
  example?: string;
  warning?: string;
  flow?: string[];
  perHop?: string[];
}

interface TableData {
  title: string;
  headers: string[];
  rows: string[][];
}

interface SphereRelevance {
  title: string;
  points: string[];
  keyInsight?: string;
}

interface QuoteData {
  quote: string;
  speaker: string;
  context?: string;
}

interface StatItem {
  label?: string;
  metric?: string;
  value: string;
  context?: string;
}

interface ComparisonRow {
  myth?: string;
  truth?: string;
}

interface DangerZone {
  title: string;
  statement: string;
  reality: ComparisonRow[];
  whatCanGoWrong?: string[];
}

interface RiskCategory {
  category: string;
  icon?: string;
  examples?: string[];
  description?: string;
}

interface QuestionItem {
  number: number;
  question: string;
  shortAnswer?: string;
  context?: string;
  doNotSay?: string;
  emphasis?: string;
  answer?: {
    key: string;
    details?: string[];
    doNotSay?: string;
  };
}

// Main learn content type - flexible to accommodate all pillars
interface LearnContent {
  introduction: string;
  coreQuestion?: string;
  sections?: LearnSection[];
  table?: TableData;
  comparison?: TableData;
  sphereRelevance?: SphereRelevance;
  keyTakeaway: string;
  arnoldQuote?: QuoteData;
  arnoldInsight?: QuoteData;
  arnoldOnOrigin?: { quotes: QuoteData[] };
  arnoldQuotes?: { title: string; quotes: QuoteData[] };
  stats?: { title: string; items: StatItem[] };
  coreMetrics?: { title: string; items: StatItem[] };
  dangerZone?: DangerZone;
  keyPhrase?: { phrase: string; explanation: string };
  languageGuide?: { wrong: string[]; correct: string[] };
  riskCategories?: { title: string; items: RiskCategory[] };
  caseStudy?: any;
  questions?: QuestionItem[];
  tips?: { tip: string; explanation: string }[];
  [key: string]: any; // Allow additional properties
}

interface LearnContentProps {
  learn: LearnContent | string;
}

export default function LearnContentRenderer({ learn }: LearnContentProps) {
  // If learn is a string (old markdown format), render it simply
  if (typeof learn === 'string') {
    return (
      <div className="prose prose-slate max-w-none">
        <div className="whitespace-pre-wrap">{learn}</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="text-lg text-slate-700 leading-relaxed">
        {learn.introduction}
      </div>

      {/* Core Question */}
      {learn.coreQuestion && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg">
          <p className="text-sm font-medium text-blue-600 uppercase tracking-wide mb-1">
            Core Question
          </p>
          <p className="text-xl font-semibold text-blue-900">
            {learn.coreQuestion}
          </p>
        </div>
      )}

      {/* Arnold Quote (if at top) */}
      {learn.arnoldQuote && (
        <QuoteBlock quote={learn.arnoldQuote} />
      )}

      {/* Stats Block */}
      {learn.stats && (
        <StatsBlock title={learn.stats.title} items={learn.stats.items} />
      )}

      {/* Core Metrics */}
      {learn.coreMetrics && (
        <StatsBlock title={learn.coreMetrics.title} items={learn.coreMetrics.items} />
      )}

      {/* Risk Categories */}
      {learn.riskCategories && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-800">
            {learn.riskCategories.title}
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {learn.riskCategories.items.map((item, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  {item.icon && <span className="text-2xl">{item.icon}</span>}
                  <h4 className="font-semibold text-slate-800">{item.category}</h4>
                </div>
                {item.description && (
                  <p className="text-slate-600 text-sm mb-2">{item.description}</p>
                )}
                {item.examples && (
                  <ul className="text-sm text-slate-600 space-y-1">
                    {item.examples.map((ex, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <span className="text-slate-400">•</span>
                        {ex}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Sections */}
      {learn.sections && learn.sections.length > 0 && (
        <div className="space-y-6">
          {learn.sections.map((section, index) => (
            <SectionCard key={index} section={section} />
          ))}
        </div>
      )}

      {/* Questions (for Pillar 6) */}
      {learn.questions && learn.questions.length > 0 && (
        <div className="space-y-6">
          {learn.questions.map((q, index) => (
            <QuestionCard key={index} question={q} />
          ))}
        </div>
      )}

      {/* Tips (for Pillar 6 masterclass) */}
      {learn.tips && learn.tips.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-800">Key Tips</h3>
          <div className="space-y-3">
            {learn.tips.map((tip, i) => (
              <div key={i} className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="font-semibold text-amber-800">{tip.tip}</p>
                <p className="text-amber-700 text-sm mt-1">{tip.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Case Study */}
      {learn.caseStudy && (
        <CaseStudyBlock caseStudy={learn.caseStudy} />
      )}

      {/* Danger Zone */}
      {learn.dangerZone && (
        <DangerZoneBlock dangerZone={learn.dangerZone} />
      )}

      {/* Key Phrase */}
      {learn.keyPhrase && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-5">
          <p className="text-xl font-semibold text-indigo-900 text-center mb-2">
            "{learn.keyPhrase.phrase}"
          </p>
          <p className="text-indigo-700 text-center text-sm">
            {learn.keyPhrase.explanation}
          </p>
        </div>
      )}

      {/* Table */}
      {learn.table && (
        <TableBlock table={learn.table} />
      )}

      {/* Comparison Table */}
      {learn.comparison && (
        <TableBlock table={learn.comparison} />
      )}

      {/* Language Guide */}
      {learn.languageGuide && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="font-semibold text-red-800 mb-2">❌ Never Say</p>
            <ul className="space-y-1">
              {learn.languageGuide.wrong.map((item, i) => (
                <li key={i} className="text-red-700 text-sm">• {item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="font-semibold text-green-800 mb-2">✅ Always Say</p>
            <ul className="space-y-1">
              {learn.languageGuide.correct.map((item, i) => (
                <li key={i} className="text-green-700 text-sm">• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Sphere Relevance */}
      {learn.sphereRelevance && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
          <h3 className="text-lg font-semibold text-purple-900 mb-3">
            🎯 {learn.sphereRelevance.title}
          </h3>
          <ul className="space-y-2 mb-4">
            {learn.sphereRelevance.points.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-purple-800">
                <span className="text-purple-400 mt-1">•</span>
                {point}
              </li>
            ))}
          </ul>
          {learn.sphereRelevance.keyInsight && (
            <div className="bg-purple-100 rounded p-3 mt-3">
              <p className="font-medium text-purple-900">
                💡 {learn.sphereRelevance.keyInsight}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Arnold Insight (bottom quote) */}
      {learn.arnoldInsight && (
        <QuoteBlock quote={learn.arnoldInsight} />
      )}

      {/* Arnold Quotes (multiple) */}
      {learn.arnoldQuotes && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-800">
            {learn.arnoldQuotes.title}
          </h3>
          {learn.arnoldQuotes.quotes.map((q, i) => (
            <QuoteBlock key={i} quote={q} />
          ))}
        </div>
      )}

      {/* Key Takeaway */}
      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-lg p-5">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <p className="text-sm font-medium text-emerald-600 uppercase tracking-wide mb-1">
              Key Takeaway
            </p>
            <p className="text-lg font-semibold text-emerald-900">
              {learn.keyTakeaway}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-components

function SectionCard({ section }: { section: LearnSection }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 px-5 py-3">
        <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          {section.icon && <span className="text-xl">{section.icon}</span>}
          {section.title}
        </h3>
      </div>
      
      {/* Content */}
      <div className="p-5 space-y-4">
        <p className="text-slate-700">{section.content}</p>
        
        {/* Details Grid */}
        {section.details && section.details.length > 0 && (
          <div className="bg-slate-50 rounded-lg p-4 space-y-2">
            {section.details.map((detail, i) => (
              <div key={i} className="flex items-start">
                <span className="font-medium text-slate-600 w-36 flex-shrink-0">
                  {detail.label}:
                </span>
                <span className="text-slate-800">{detail.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Flow diagram */}
        {section.flow && section.flow.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 justify-center py-3">
            {section.flow.map((step, i) => (
              <React.Fragment key={i}>
                <div className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm font-medium">
                  {step}
                </div>
                {i < section.flow!.length - 1 && (
                  <span className="text-slate-400">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Per-hop items */}
        {section.perHop && section.perHop.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="font-medium text-amber-800 mb-2">At each hop:</p>
            <ul className="text-sm text-amber-700 space-y-1">
              {section.perHop.map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Example */}
        {section.example && (
          <div className="bg-blue-50 border-l-4 border-blue-300 p-4 rounded-r-lg">
            <p className="text-sm font-medium text-blue-600 mb-1">Example</p>
            <p className="text-blue-800">{section.example}</p>
          </div>
        )}
        
        {/* Warning */}
        {section.warning && (
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
            <p className="text-amber-800 font-medium">
              ⚠️ {section.warning}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function QuoteBlock({ quote }: { quote: QuoteData }) {
  return (
    <div className="bg-slate-100 border-l-4 border-slate-400 p-5 rounded-r-lg">
      <p className="text-lg italic text-slate-700 mb-2">
        "{quote.quote}"
      </p>
      <p className="text-sm text-slate-600">
        — {quote.speaker}
        {quote.context && <span className="text-slate-500"> ({quote.context})</span>}
      </p>
    </div>
  );
}

function StatsBlock({ title, items }: { title: string; items: StatItem[] }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <div key={i} className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-lg p-4">
            <p className="text-2xl font-bold text-slate-800">{item.value}</p>
            <p className="text-sm text-slate-600">{item.label || item.metric}</p>
            {item.context && (
              <p className="text-xs text-slate-500 mt-1">{item.context}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function TableBlock({ table }: { table: TableData }) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-slate-800">{table.title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-100">
              {table.headers.map((header, i) => (
                <th 
                  key={i} 
                  className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-700"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                {row.map((cell, j) => (
                  <td 
                    key={j} 
                    className="border border-slate-300 px-4 py-3 text-slate-700"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CaseStudyBlock({ caseStudy }: { caseStudy: any }) {
  return (
    <div className="bg-orange-50 border border-orange-200 rounded-lg p-5 space-y-4">
      <h3 className="text-lg font-semibold text-orange-900">
        📋 {caseStudy.title}
      </h3>
      
      {caseStudy.parties && (
        <div className="grid md:grid-cols-2 gap-4">
          {caseStudy.parties.map((party: any, i: number) => (
            <div key={i} className="bg-white rounded-lg p-4 border border-orange-200">
              <p className="font-semibold text-orange-800">{party.name}</p>
              <p className="text-sm text-orange-700">{party.location}</p>
              <p className="text-sm text-slate-600 mt-1">{party.role}</p>
            </div>
          ))}
        </div>
      )}
      
      {caseStudy.problem && (
        <div>
          <p className="font-medium text-orange-800 mb-2">The Problem:</p>
          <ul className="text-orange-700 space-y-1">
            {caseStudy.problem.map((item: string, i: number) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
        </div>
      )}

      {caseStudy.timeline && (
        <div className="space-y-2">
          {caseStudy.timeline.map((item: any, i: number) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="font-medium text-orange-800 w-28 flex-shrink-0">{item.time}:</span>
              <span className="text-orange-700">{item.event}</span>
            </div>
          ))}
        </div>
      )}

      {caseStudy.keyInsight && (
        <div className="bg-orange-100 rounded p-3">
          <p className="font-medium text-orange-900">💡 {caseStudy.keyInsight}</p>
        </div>
      )}
    </div>
  );
}

function DangerZoneBlock({ dangerZone }: { dangerZone: DangerZone }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-5 space-y-4">
      <h3 className="text-lg font-semibold text-red-900">
        ⚠️ {dangerZone.title}
      </h3>
      
      <div className="bg-red-100 border border-red-300 rounded-lg p-4 text-center">
        <p className="text-lg font-medium text-red-800">
          "{dangerZone.statement}"
        </p>
      </div>
      
      {dangerZone.reality && dangerZone.reality.length > 0 && (
        <div className="space-y-2">
          {dangerZone.reality.map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="bg-red-200 text-red-800 px-3 py-1 rounded text-sm flex-1 text-center">
                {item.myth}
              </span>
              <span className="text-red-400">→</span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm flex-1 text-center">
                {item.truth}
              </span>
            </div>
          ))}
        </div>
      )}
      
      {dangerZone.whatCanGoWrong && (
        <div>
          <p className="font-medium text-red-800 mb-2">What can still go wrong:</p>
          <ul className="text-red-700 space-y-1 text-sm">
            {dangerZone.whatCanGoWrong.map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function QuestionCard({ question }: { question: QuestionItem }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
      <div className="bg-slate-800 text-white px-5 py-3">
        <div className="flex items-center gap-3">
          <span className="bg-white text-slate-800 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
            {question.number}
          </span>
          <h3 className="font-semibold">{question.question}</h3>
        </div>
      </div>
      
      <div className="p-5 space-y-4">
        {question.context && (
          <p className="text-slate-600 text-sm italic">{question.context}</p>
        )}
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="font-medium text-green-800 mb-1">✅ Answer:</p>
          <p className="text-green-900">
            {question.shortAnswer || question.answer?.key}
          </p>
        </div>
        
        {question.answer?.details && (
          <ul className="text-slate-700 space-y-1 text-sm">
            {question.answer.details.map((detail, i) => (
              <li key={i}>• {detail}</li>
            ))}
          </ul>
        )}
        
        {question.emphasis && (
          <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r">
            <p className="text-blue-800 text-sm font-medium">💡 {question.emphasis}</p>
          </div>
        )}
        
        {(question.doNotSay || question.answer?.doNotSay) && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-800 text-sm">
              ❌ <span className="font-medium">Don't say:</span> {question.doNotSay || question.answer?.doNotSay}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
