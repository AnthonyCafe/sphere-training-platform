'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, ChevronDown, ChevronUp } from 'lucide-react';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

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

interface DangerZone {
  title?: string;
  statement: string;
  reality?: { myth?: string; truth?: string }[];
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
  honesty?: string;
  answer?: {
    key: string;
    details?: string[];
    doNotSay?: string;
  };
}

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
  closingExample?: string;
  [key: string]: any;
}

interface LearnContentProps {
  learn: LearnContent | string;
}

// =============================================================================
// HELPER: Calculate read time
// =============================================================================

function calculateReadTime(learn: LearnContent): number {
  let wordCount = 0;
  
  const countWords = (text: string | undefined) => {
    if (text) wordCount += text.split(/\s+/).length;
  };
  
  countWords(learn.introduction);
  countWords(learn.coreQuestion);
  countWords(learn.keyTakeaway);
  countWords(learn.keyPhrase?.phrase);
  countWords(learn.keyPhrase?.explanation);
  countWords(learn.arnoldQuote?.quote);
  countWords(learn.arnoldInsight?.quote);
  countWords(learn.closingExample);
  
  learn.sections?.forEach(s => {
    countWords(s.content);
    countWords(s.example);
    countWords(s.warning);
    s.details?.forEach(d => {
      countWords(d.label);
      countWords(d.value);
    });
  });
  
  learn.questions?.forEach(q => {
    countWords(q.question);
    countWords(q.shortAnswer);
    countWords(q.context);
    countWords(q.answer?.key);
  });
  
  learn.sphereRelevance?.points?.forEach(p => countWords(p));
  learn.tips?.forEach(t => {
    countWords(t.tip);
    countWords(t.explanation);
  });
  
  return Math.max(1, Math.ceil(wordCount / 200));
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function LearnContentRenderer({ learn }: LearnContentProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (typeof learn === 'string') {
    return (
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="text-gray-300 whitespace-pre-wrap">{learn}</div>
      </div>
    );
  }

  const readTime = calculateReadTime(learn);

  return (
    <div className="space-y-6">
      {/* Progress Bar & Read Time */}
      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Clock className="w-4 h-4" />
            <span>{readTime} min read</span>
          </div>
          <span className="text-gray-400 text-sm">{Math.round(scrollProgress)}% complete</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>

      {/* Introduction */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <p className="text-gray-300 text-lg leading-relaxed">{learn.introduction}</p>
      </div>

      {/* Core Question */}
      {learn.coreQuestion && (
        <div className="bg-blue-500/10 border border-blue-500/50 rounded-xl p-6">
          <p className="text-xs font-medium text-blue-400 uppercase tracking-wide mb-2">
            Core Question
          </p>
          <p className="text-xl font-semibold text-white">
            {learn.coreQuestion}
          </p>
        </div>
      )}

      {/* Arnold Quote (top) */}
      {learn.arnoldQuote && <QuoteBlock quote={learn.arnoldQuote} />}

      {/* Stats Block */}
      {learn.stats && <StatsBlock title={learn.stats.title} items={learn.stats.items} />}

      {/* Core Metrics */}
      {learn.coreMetrics && <StatsBlock title={learn.coreMetrics.title} items={learn.coreMetrics.items} />}

      {/* Risk Categories */}
      {learn.riskCategories && (
        <div className="space-y-4">
          <h3 className="font-semibold text-white">{learn.riskCategories.title}</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {learn.riskCategories.items.map((item, i) => (
              <div key={i} className="bg-slate-800 border border-slate-700 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  {item.icon && <span className="text-2xl">{item.icon}</span>}
                  <h4 className="font-semibold text-white">{item.category}</h4>
                </div>
                {item.description && (
                  <p className="text-gray-400 text-sm mb-2">{item.description}</p>
                )}
                {item.examples && (
                  <ul className="text-sm text-gray-300 space-y-1">
                    {item.examples.map((ex, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <span className="text-gray-500">•</span>
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
        <div className="space-y-4">
          {learn.sections.map((section, index) => (
            <SectionCard key={index} section={section} />
          ))}
        </div>
      )}

      {/* Questions (Pillar 6) */}
      {learn.questions && learn.questions.length > 0 && (
        <div className="space-y-4">
          {learn.questions.map((q, index) => (
            <QuestionCard key={index} question={q} />
          ))}
        </div>
      )}

      {/* Tips */}
      {learn.tips && learn.tips.length > 0 && (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="font-semibold text-white mb-4">Key Tips</h3>
          <div className="space-y-3">
            {learn.tips.map((tip, i) => (
              <div key={i} className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <p className="font-medium text-amber-400">{tip.tip}</p>
                <p className="text-gray-300 text-sm mt-1">{tip.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Closing Example */}
      {learn.closingExample && (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="font-semibold text-white mb-3">Example Close</h3>
          <p className="text-gray-300 italic">"{learn.closingExample}"</p>
        </div>
      )}

      {/* Case Study */}
      {learn.caseStudy && <CaseStudyBlock caseStudy={learn.caseStudy} />}

      {/* Danger Zone */}
      {learn.dangerZone && <DangerZoneBlock dangerZone={learn.dangerZone} />}

      {/* Key Phrase */}
      {learn.keyPhrase && (
        <div className="bg-purple-500/10 border border-purple-500/50 rounded-xl p-6 text-center">
          <p className="text-xl font-semibold text-white mb-2">
            "{learn.keyPhrase.phrase}"
          </p>
          <p className="text-purple-300 text-sm">
            {learn.keyPhrase.explanation}
          </p>
        </div>
      )}

      {/* Table */}
      {learn.table && <TableBlock table={learn.table} />}

      {/* Comparison Table */}
      {learn.comparison && <TableBlock table={learn.comparison} />}

      {/* Language Guide */}
      {learn.languageGuide && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
            <p className="font-semibold text-red-400 mb-3">❌ Never Say</p>
            <ul className="space-y-2">
              {learn.languageGuide.wrong.map((item, i) => (
                <li key={i} className="text-gray-300 text-sm">• {item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
            <p className="font-semibold text-emerald-400 mb-3">✅ Always Say</p>
            <ul className="space-y-2">
              {learn.languageGuide.correct.map((item, i) => (
                <li key={i} className="text-gray-300 text-sm">• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Sphere Relevance */}
      {learn.sphereRelevance && (
        <div className="bg-purple-500/10 border border-purple-500/50 rounded-xl p-6">
          <h3 className="font-semibold text-white mb-4">
            🎯 {learn.sphereRelevance.title}
          </h3>
          <ul className="space-y-2 mb-4">
            {learn.sphereRelevance.points.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-300">
                <CheckCircle className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
                {point}
              </li>
            ))}
          </ul>
          {learn.sphereRelevance.keyInsight && (
            <div className="bg-purple-500/20 rounded-lg p-4 mt-4">
              <p className="text-purple-200 font-medium">
                💡 {learn.sphereRelevance.keyInsight}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Arnold Insight (bottom) */}
      {learn.arnoldInsight && <QuoteBlock quote={learn.arnoldInsight} />}

      {/* Arnold Quotes (multiple) */}
      {learn.arnoldQuotes && (
        <div className="space-y-4">
          <h3 className="font-semibold text-white">{learn.arnoldQuotes.title}</h3>
          {learn.arnoldQuotes.quotes.map((q, i) => (
            <QuoteBlock key={i} quote={q} />
          ))}
        </div>
      )}

      {/* Key Takeaway */}
      <div className="bg-emerald-500/10 border border-emerald-500/50 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <p className="text-xs font-medium text-emerald-400 uppercase tracking-wide mb-1">
              Key Takeaway
            </p>
            <p className="text-lg font-semibold text-white">
              {learn.keyTakeaway}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

function SectionCard({ section }: { section: LearnSection }) {
  const [expanded, setExpanded] = useState(true);
  
  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full bg-slate-700/50 border-b border-slate-700 px-6 py-4 flex items-center justify-between hover:bg-slate-700/70 transition"
      >
        <h3 className="font-semibold text-white flex items-center gap-2">
          {section.icon && <span className="text-xl">{section.icon}</span>}
          {section.title}
        </h3>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>
      
      {expanded && (
        <div className="p-6 space-y-4">
          <p className="text-gray-300">{section.content}</p>
          
          {section.details && section.details.length > 0 && (
            <div className="bg-slate-700/50 rounded-lg p-4 space-y-2">
              {section.details.map((detail, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="font-medium text-gray-400 min-w-[140px]">
                    {detail.label}:
                  </span>
                  <span className="text-gray-200">{detail.value}</span>
                </div>
              ))}
            </div>
          )}

          {section.flow && section.flow.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 justify-center py-4">
              {section.flow.map((step, i) => (
                <React.Fragment key={i}>
                  <div className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-lg text-sm font-medium border border-blue-500/30">
                    {step}
                  </div>
                  {i < section.flow!.length - 1 && (
                    <span className="text-gray-500 text-xl">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}

          {section.perHop && section.perHop.length > 0 && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <p className="font-medium text-amber-400 mb-2">At each hop:</p>
              <ul className="text-sm text-gray-300 space-y-1">
                {section.perHop.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
          )}
          
          {section.example && (
            <div className="bg-blue-500/10 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-xs font-medium text-blue-400 mb-1">Example</p>
              <p className="text-gray-300">{section.example}</p>
            </div>
          )}
          
          {section.warning && (
            <div className="bg-amber-500/10 border-l-4 border-amber-500 p-4 rounded-r-lg">
              <p className="text-amber-300 font-medium">
                ⚠️ {section.warning}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function QuoteBlock({ quote }: { quote: QuoteData }) {
  return (
    <div className="bg-slate-800 border-l-4 border-slate-500 rounded-r-xl p-6">
      <p className="text-lg italic text-gray-300 mb-2">
        "{quote.quote}"
      </p>
      <p className="text-sm text-gray-400">
        — {quote.speaker}
        {quote.context && <span className="text-gray-500"> ({quote.context})</span>}
      </p>
    </div>
  );
}

function StatsBlock({ title, items }: { title: string; items: StatItem[] }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4">{title}</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4">
            <p className="text-2xl font-bold text-white">{item.value}</p>
            <p className="text-sm text-gray-400">{item.label || item.metric}</p>
            {item.context && (
              <p className="text-xs text-gray-500 mt-1">{item.context}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function TableBlock({ table }: { table: TableData }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4">{table.title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-600">
              {table.headers.map((header, i) => (
                <th 
                  key={i} 
                  className="px-4 py-3 text-left font-semibold text-gray-300 bg-slate-700/50"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, i) => (
              <tr key={i} className="border-b border-slate-700/50">
                {row.map((cell, j) => (
                  <td key={j} className="px-4 py-3 text-gray-300">
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
    <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6 space-y-4">
      <h3 className="font-semibold text-white">
        📋 {caseStudy.title}
      </h3>
      
      {caseStudy.parties && (
        <div className="grid md:grid-cols-2 gap-4">
          {caseStudy.parties.map((party: any, i: number) => (
            <div key={i} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <p className="font-semibold text-white">{party.name}</p>
              <p className="text-sm text-orange-300">{party.location}</p>
              <p className="text-sm text-gray-400 mt-1">{party.role}</p>
            </div>
          ))}
        </div>
      )}
      
      {caseStudy.problem && (
        <div>
          <p className="font-medium text-orange-300 mb-2">The Problem:</p>
          <ul className="text-gray-300 space-y-1">
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
              <span className="font-medium text-orange-300 w-28 flex-shrink-0">{item.time}:</span>
              <span className="text-gray-300">{item.event}</span>
            </div>
          ))}
        </div>
      )}

      {caseStudy.keyInsight && (
        <div className="bg-orange-500/20 rounded-lg p-4">
          <p className="text-orange-200 font-medium">💡 {caseStudy.keyInsight}</p>
        </div>
      )}
    </div>
  );
}

function DangerZoneBlock({ dangerZone }: { dangerZone: DangerZone }) {
  return (
    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 space-y-4">
      <h3 className="font-semibold text-white">
        ⚠️ {dangerZone.title || 'Danger Zone'}
      </h3>
      
      <div className="bg-red-500/20 border border-red-500/40 rounded-lg p-4 text-center">
        <p className="text-lg font-medium text-red-300">
          "{dangerZone.statement}"
        </p>
      </div>
      
      {dangerZone.reality && dangerZone.reality.length > 0 && (
        <div className="space-y-2">
          {dangerZone.reality.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="bg-red-500/20 text-red-300 px-3 py-2 rounded text-sm flex-1 text-center border border-red-500/30">
                {item.myth}
              </span>
              <span className="text-gray-500">→</span>
              <span className="bg-emerald-500/20 text-emerald-300 px-3 py-2 rounded text-sm flex-1 text-center border border-emerald-500/30">
                {item.truth}
              </span>
            </div>
          ))}
        </div>
      )}
      
      {dangerZone.whatCanGoWrong && (
        <div>
          <p className="font-medium text-red-300 mb-2">What can still go wrong:</p>
          <ul className="text-gray-300 space-y-1 text-sm">
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
  const [expanded, setExpanded] = useState(true);
  
  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full bg-slate-700 px-6 py-4 flex items-center justify-between hover:bg-slate-600 transition"
      >
        <div className="flex items-center gap-3">
          <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
            {question.number}
          </span>
          <h3 className="font-semibold text-white text-left">{question.question}</h3>
        </div>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
        )}
      </button>
      
      {expanded && (
        <div className="p-6 space-y-4">
          {question.context && (
            <p className="text-gray-400 text-sm italic">{question.context}</p>
          )}
          
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
            <p className="font-medium text-emerald-400 mb-1">✅ Answer:</p>
            <p className="text-gray-200">
              {question.shortAnswer || question.answer?.key}
            </p>
          </div>
          
          {question.answer?.details && (
            <ul className="text-gray-300 space-y-1 text-sm pl-4">
              {question.answer.details.map((detail, i) => (
                <li key={i}>• {detail}</li>
              ))}
            </ul>
          )}
          
          {question.emphasis && (
            <div className="bg-blue-500/10 border-l-4 border-blue-500 p-3 rounded-r-lg">
              <p className="text-blue-300 text-sm font-medium">💡 {question.emphasis}</p>
            </div>
          )}

          {question.honesty && (
            <div className="bg-amber-500/10 border-l-4 border-amber-500 p-3 rounded-r-lg">
              <p className="text-amber-300 text-sm">{question.honesty}</p>
            </div>
          )}
          
          {(question.doNotSay || question.answer?.doNotSay) && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <p className="text-red-300 text-sm">
                ❌ <span className="font-medium">Don't say:</span> {question.doNotSay || question.answer?.doNotSay}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
