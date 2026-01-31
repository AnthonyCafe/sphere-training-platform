'use client'

import { ChevronDown, ChevronRight, AlertTriangle, CheckCircle, Info, Lightbulb, ExternalLink, ArrowRight, Target, Shield, Clock, DollarSign, Building, Globe, AlertCircle, BookOpen, Zap, TrendingUp, FileText, Users } from 'lucide-react'
import { useState } from 'react'

// Collapsible section component
const CollapsibleSection = ({ title, children, defaultOpen = false, icon: Icon, color = 'blue' }: { 
  title: string; 
  children: React.ReactNode; 
  defaultOpen?: boolean;
  icon?: any;
  color?: string;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const colorClasses: Record<string, string> = {
    blue: 'border-blue-500/30 bg-blue-500/5',
    green: 'border-emerald-500/30 bg-emerald-500/5',
    amber: 'border-amber-500/30 bg-amber-500/5',
    red: 'border-red-500/30 bg-red-500/5',
    purple: 'border-purple-500/30 bg-purple-500/5',
    cyan: 'border-cyan-500/30 bg-cyan-500/5',
    slate: 'border-slate-500/30 bg-slate-500/5',
  }
  const textColors: Record<string, string> = {
    blue: 'text-blue-400',
    green: 'text-emerald-400',
    amber: 'text-amber-400',
    red: 'text-red-400',
    purple: 'text-purple-400',
    cyan: 'text-cyan-400',
    slate: 'text-slate-300',
  }

  return (
    <div className={`border rounded-lg ${colorClasses[color] || colorClasses.blue} mb-4`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 p-4 text-left"
      >
        {isOpen ? <ChevronDown className="w-5 h-5 text-slate-400" /> : <ChevronRight className="w-5 h-5 text-slate-400" />}
        {Icon && <Icon className={`w-5 h-5 ${textColors[color] || textColors.blue}`} />}
        <span className={`font-semibold ${textColors[color] || textColors.blue}`}>{title}</span>
      </button>
      {isOpen && <div className="px-4 pb-4">{children}</div>}
    </div>
  )
}

// Table renderer
const DataTable = ({ table }: { table: any }) => {
  if (!table) return null
  return (
    <div className="my-4 overflow-x-auto">
      {table.title && <h4 className="font-semibold text-white mb-3">{table.title}</h4>}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-slate-700/50">
            {table.headers?.map((header: string, i: number) => (
              <th key={i} className="border border-slate-600 p-3 text-left text-slate-200 font-medium">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows?.map((row: string[], i: number) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-slate-800/50' : 'bg-slate-700/30'}>
              {row.map((cell: string, j: number) => (
                <td key={j} className="border border-slate-600 p-3 text-slate-300">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Steps renderer
const StepsRenderer = ({ steps, title }: { steps: any[]; title?: string }) => {
  if (!steps || steps.length === 0) return null
  return (
    <div className="my-4">
      {title && <h4 className="font-semibold text-white mb-3">{title}</h4>}
      <div className="space-y-3">
        {steps.map((step: any, i: number) => (
          <div key={i} className="flex items-start gap-3 p-3 bg-slate-700/30 rounded-lg">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
              <span className="text-blue-400 font-semibold">{i + 1}</span>
            </div>
            <div className="flex-1">
              {typeof step === 'string' ? (
                <p className="text-slate-300">{step}</p>
              ) : (
                <>
                  {step.title && <p className="font-medium text-white">{step.title}</p>}
                  {step.description && <p className="text-slate-300 mt-1">{step.description}</p>}
                  {step.detail && <p className="text-slate-400 text-sm mt-1">{step.detail}</p>}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Metrics renderer
const MetricsRenderer = ({ metrics, title }: { metrics: any[]; title?: string }) => {
  if (!metrics || metrics.length === 0) return null
  return (
    <div className="my-4">
      {title && <h4 className="font-semibold text-white mb-3">{title}</h4>}
      <div className="grid gap-3 md:grid-cols-2">
        {metrics.map((m: any, i: number) => (
          <div key={i} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
            <div className="flex justify-between items-start mb-2">
              <span className="font-medium text-white">{m.metric || m.name}</span>
              {m.target && <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">Target: {m.target}</span>}
            </div>
            {m.value && <p className="text-2xl font-bold text-blue-400">{m.value}</p>}
            {m.calculation && <p className="text-sm text-slate-400">{m.calculation}</p>}
            {m.frequency && <p className="text-xs text-slate-500 mt-1">{m.frequency}</p>}
            {m.source && <p className="text-xs text-slate-500 mt-1">Source: {m.source}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

// Failure scenarios renderer
const FailureScenariosRenderer = ({ scenarios, title }: { scenarios: any[]; title?: string }) => {
  if (!scenarios || scenarios.length === 0) return null
  return (
    <div className="my-4">
      {title && <h4 className="font-semibold text-white mb-3">{title}</h4>}
      <div className="space-y-4">
        {scenarios.map((s: any, i: number) => (
          <div key={i} className="border border-red-500/30 bg-red-500/5 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <h5 className="font-semibold text-red-400">{s.scenario}</h5>
            </div>
            {s.trigger && (
              <div className="mb-2">
                <span className="text-xs text-slate-400 uppercase">Trigger:</span>
                <p className="text-slate-300">{s.trigger}</p>
              </div>
            )}
            {s.immediateActions && (
              <div className="mb-2">
                <span className="text-xs text-emerald-400 uppercase">Immediate Actions:</span>
                <ul className="list-disc list-inside text-slate-300 ml-2">
                  {s.immediateActions.map((a: string, j: number) => <li key={j}>{a}</li>)}
                </ul>
              </div>
            )}
            {/* Support both 'recovery' and 'recoverySteps' field names */}
            {(s.recovery || s.recoverySteps) && (
              <div className="mb-2">
                <span className="text-xs text-blue-400 uppercase">Recovery Steps:</span>
                <ul className="list-disc list-inside text-slate-300 ml-2">
                  {(s.recovery || s.recoverySteps).map((r: string, j: number) => <li key={j}>{r}</li>)}
                </ul>
              </div>
            )}
            {/* Support both 'targetRecoveryTime' and 'targetRecovery' field names */}
            {(s.targetRecoveryTime || s.targetRecovery) && (
              <div className="flex items-center gap-2 mt-2 text-amber-400">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Target: {s.targetRecoveryTime || s.targetRecovery}</span>
              </div>
            )}
            {/* Support both 'lesson' and 'lessonsFromSVB' field names */}
            {(s.lesson || s.lessonsFromSVB) && (
              <div className="mt-3 p-2 bg-slate-700/50 rounded text-sm text-slate-300 italic">
                💡 {s.lesson || s.lessonsFromSVB}
              </div>
            )}
            {/* Prevention guidance (new field) */}
            {s.prevention && (
              <div className="mt-3 p-2 bg-emerald-500/10 border border-emerald-500/30 rounded text-sm text-emerald-300">
                <span className="text-xs text-emerald-400 uppercase block mb-1">Prevention:</span>
                {s.prevention}
              </div>
            )}
            {s.crossReference && (
              <div className="mt-2 text-xs text-blue-400 flex items-center gap-1">
                <ExternalLink className="w-3 h-3" />
                {s.crossReference}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// Warning box
const WarningBox = ({ text }: { text: string }) => (
  <div className="my-4 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-start gap-3">
    <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
    <p className="text-amber-200">{text}</p>
  </div>
)

// Info box
const InfoBox = ({ title, content }: { title?: string; content: string }) => (
  <div className="my-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
    {title && <h5 className="font-semibold text-blue-400 mb-2">{title}</h5>}
    <p className="text-slate-300">{content}</p>
  </div>
)

// Key takeaway box
const KeyTakeawayBox = ({ content }: { content: string }) => (
  <div className="my-4 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-start gap-3">
    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
    <div>
      <span className="text-emerald-400 font-semibold text-sm uppercase">Key Takeaway</span>
      <p className="text-slate-200 mt-1">{content}</p>
    </div>
  </div>
)

// Example box
const ExampleBox = ({ title, example }: { title?: string; example: string }) => (
  <div className="my-3 p-3 bg-slate-700/30 border-l-4 border-blue-500 rounded-r-lg">
    {title && <span className="text-xs text-blue-400 uppercase">{title}</span>}
    <p className="text-slate-300 italic">{example}</p>
  </div>
)

// Render nested content recursively
const renderContent = (content: any, depth = 0): React.ReactNode => {
  if (!content) return null
  
  // Handle arrays
  if (Array.isArray(content)) {
    return content.map((item, i) => (
      <div key={i}>{renderContent(item, depth)}</div>
    ))
  }

  // Handle strings
  if (typeof content === 'string') {
    return <p className="text-slate-300 mb-3">{content}</p>
  }

  // Handle objects with known structures
  const elements: React.ReactNode[] = []
  const key = JSON.stringify(content).slice(0, 50)

  // Title
  if (content.title) {
    const HeadingTag = depth === 0 ? 'h2' : depth === 1 ? 'h3' : 'h4'
    const headingClass = depth === 0 
      ? 'text-2xl font-bold text-white mb-4 mt-8' 
      : depth === 1 
        ? 'text-xl font-semibold text-white mb-3 mt-6' 
        : 'text-lg font-medium text-white mb-2 mt-4'
    elements.push(<HeadingTag key={`title-${key}`} className={headingClass}>{content.title}</HeadingTag>)
  }

  // Subtitle
  if (content.subtitle) {
    elements.push(<p key={`subtitle-${key}`} className="text-slate-400 mb-4 italic">{content.subtitle}</p>)
  }

  // Introduction
  if (content.introduction) {
    elements.push(<p key={`intro-${key}`} className="text-slate-300 mb-4 leading-relaxed">{content.introduction}</p>)
  }

  // Content
  if (content.content) {
    elements.push(<p key={`content-${key}`} className="text-slate-300 mb-3">{content.content}</p>)
  }

  // Description
  if (content.description && typeof content.description === 'string') {
    elements.push(<p key={`desc-${key}`} className="text-slate-300 mb-3">{content.description}</p>)
  }

  // Definition
  if (content.definition) {
    elements.push(
      <div key={`def-${key}`} className="my-3 p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
        <span className="text-purple-400 font-semibold">Definition: </span>
        <span className="text-slate-200">{content.definition}</span>
      </div>
    )
  }

  // Warning
  if (content.warning) {
    elements.push(<WarningBox key={`warn-${key}`} text={content.warning} />)
  }

  // Example
  if (content.example) {
    if (typeof content.example === 'string') {
      elements.push(<ExampleBox key={`ex-${key}`} example={content.example} />)
    } else if (content.example.title && content.example.content) {
      elements.push(<ExampleBox key={`ex-${key}`} title={content.example.title} example={content.example.content} />)
    }
  }

  // Examples array
  if (content.examples && Array.isArray(content.examples)) {
    elements.push(
      <div key={`examples-${key}`} className="my-3 space-y-2">
        {content.examples.map((ex: any, i: number) => (
          <ExampleBox key={i} example={typeof ex === 'string' ? ex : ex.text || ex.description || JSON.stringify(ex)} />
        ))}
      </div>
    )
  }

  // Key takeaway
  if (content.keyTakeaway) {
    elements.push(<KeyTakeawayBox key={`kt-${key}`} content={content.keyTakeaway} />)
  }

  // Summary
  if (content.summary) {
    elements.push(
      <div key={`sum-${key}`} className="my-4 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
        <span className="text-slate-400 font-semibold text-sm uppercase">Summary</span>
        <p className="text-slate-200 mt-2">{content.summary}</p>
      </div>
    )
  }

  // Table
  if (content.table) {
    elements.push(<DataTable key={`table-${key}`} table={content.table} />)
  }
  
  // Inline table
  if (content.headers && content.rows) {
    elements.push(<DataTable key={`inline-table-${key}`} table={content} />)
  }

  // Steps
  if (content.steps) {
    elements.push(<StepsRenderer key={`steps-${key}`} steps={content.steps} title={content.stepsTitle} />)
  }

  // Metrics
  if (content.metrics) {
    elements.push(<MetricsRenderer key={`metrics-${key}`} metrics={content.metrics} title={content.metricsTitle} />)
  }

  // Failure scenarios
  if (content.scenarios && content.scenarios[0]?.trigger) {
    elements.push(<FailureScenariosRenderer key={`scenarios-${key}`} scenarios={content.scenarios} />)
  }

  // Counter party failure scenarios
  if (content.counterpartyFailureScenarios) {
    elements.push(
      <CollapsibleSection 
        key={`cpfs-${key}`} 
        title={content.counterpartyFailureScenarios.title || 'Failure Scenarios'} 
        icon={AlertTriangle} 
        color="red"
        defaultOpen={false}
      >
        <FailureScenariosRenderer scenarios={content.counterpartyFailureScenarios.scenarios} />
      </CollapsibleSection>
    )
  }

  // Counterparty risk metrics
  if (content.counterpartyRiskMetrics) {
    elements.push(
      <CollapsibleSection 
        key={`crm-${key}`} 
        title={content.counterpartyRiskMetrics.title || 'Risk Metrics'} 
        icon={Target} 
        color="amber"
        defaultOpen={false}
      >
        <MetricsRenderer metrics={content.counterpartyRiskMetrics.metrics} />
        {/* Support reportingCadence as array */}
        {content.counterpartyRiskMetrics.reportingCadence && Array.isArray(content.counterpartyRiskMetrics.reportingCadence) && (
          <div className="mt-3 p-3 bg-slate-700/30 rounded-lg">
            <span className="text-xs text-slate-400 uppercase">Reporting Cadence</span>
            <ul className="list-disc list-inside text-slate-300 ml-2 mt-1">
              {content.counterpartyRiskMetrics.reportingCadence.map((r: string, i: number) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        )}
        {/* Support reporting as object with daily/weekly/monthly/quarterly keys */}
        {content.counterpartyRiskMetrics.reporting && typeof content.counterpartyRiskMetrics.reporting === 'object' && (
          <div className="mt-3 p-3 bg-slate-700/30 rounded-lg">
            <span className="text-xs text-slate-400 uppercase mb-2 block">Reporting Schedule</span>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(content.counterpartyRiskMetrics.reporting).map(([period, desc]: [string, any]) => (
                <div key={period} className="bg-slate-600/30 rounded p-2">
                  <span className="text-xs text-amber-400 uppercase">{period}</span>
                  <p className="text-sm text-slate-300">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CollapsibleSection>
    )
  }

  // Analogy
  if (content.analogy) {
    elements.push(
      <div key={`analogy-${key}`} className="my-4 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-5 h-5 text-cyan-400" />
          <span className="text-cyan-400 font-semibold">Analogy</span>
        </div>
        <p className="text-slate-200">{content.analogy}</p>
      </div>
    )
  }

  // Points array
  if (content.points && Array.isArray(content.points)) {
    elements.push(
      <ul key={`points-${key}`} className="my-3 space-y-2">
        {content.points.map((point: any, i: number) => (
          <li key={i} className="flex items-start gap-2 text-slate-300">
            <span className="text-blue-400 mt-1">•</span>
            <span>{typeof point === 'string' ? point : point.text || point.point || JSON.stringify(point)}</span>
          </li>
        ))}
      </ul>
    )
  }

  // Nested sections
  if (content.sections && Array.isArray(content.sections)) {
    content.sections.forEach((section: any, i: number) => {
      elements.push(
        <div key={`section-${i}-${key}`} className="ml-0">
          {renderContent(section, depth + 1)}
        </div>
      )
    })
  }

  // Detail sections
  if (content.detail && typeof content.detail === 'object') {
    elements.push(
      <CollapsibleSection key={`detail-${key}`} title={content.detail.title || 'Details'} color="slate">
        {renderContent(content.detail, depth + 1)}
      </CollapsibleSection>
    )
  }

  // Deep dive
  if (content.deepDive) {
    elements.push(
      <CollapsibleSection key={`deep-${key}`} title={content.deepDive.title || 'Deep Dive'} icon={BookOpen} color="purple">
        {renderContent(content.deepDive, depth + 1)}
      </CollapsibleSection>
    )
  }

  // Sphere approach
  if (content.sphereApproach) {
    elements.push(
      <div key={`sphere-${key}`} className="my-4 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg">
        <div className="flex items-center gap-2 mb-3">
          <Globe className="w-5 h-5 text-blue-400" />
          <span className="text-blue-400 font-semibold">Sphere's Approach</span>
        </div>
        {typeof content.sphereApproach === 'string' ? (
          <p className="text-slate-200">{content.sphereApproach}</p>
        ) : (
          renderContent(content.sphereApproach, depth + 1)
        )}
      </div>
    )
  }

  // Why it matters
  if (content.whyItMatters) {
    elements.push(
      <div key={`why-${key}`} className="my-4 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-5 h-5 text-amber-400" />
          <span className="text-amber-400 font-semibold">Why This Matters</span>
        </div>
        <p className="text-slate-200">{content.whyItMatters}</p>
      </div>
    )
  }

  // Cross reference
  if (content.crossReference) {
    elements.push(
      <p key={`xref-${key}`} className="my-2 text-sm text-blue-400 flex items-center gap-1">
        <ExternalLink className="w-3 h-3" />
        {content.crossReference}
      </p>
    )
  }

  // Use cases
  if (content.useCases && Array.isArray(content.useCases)) {
    elements.push(
      <div key={`uc-${key}`} className="my-3">
        <span className="text-xs text-slate-400 uppercase">Use Cases:</span>
        <div className="flex flex-wrap gap-2 mt-1">
          {content.useCases.map((uc: string, i: number) => (
            <span key={i} className="px-2 py-1 bg-slate-700/50 rounded text-sm text-slate-300">{uc}</span>
          ))}
        </div>
      </div>
    )
  }

  // Comparison table
  if (content.comparisonTable) {
    elements.push(<DataTable key={`comp-${key}`} table={content.comparisonTable} />)
  }

  return elements.length > 0 ? <>{elements}</> : null
}

// Main component
export default function LearnContentRenderer({ learn }: { learn: any }) {
  if (!learn) return <p className="text-slate-400">No content available</p>

  return (
    <div className="space-y-6">
      {/* Introduction */}
      {learn.introduction && (
        <div className="p-6 bg-slate-800 rounded-xl border border-slate-700">
          <p className="text-slate-300 leading-relaxed text-lg">{learn.introduction}</p>
        </div>
      )}

      {/* Core question */}
      {learn.coreQuestion && (
        <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-purple-400" />
            <span className="text-purple-400 font-semibold">Core Question</span>
          </div>
          <p className="text-white text-lg font-medium">{learn.coreQuestion}</p>
        </div>
      )}

      {/* Main sections */}
      {learn.sections && learn.sections.map((section: any, index: number) => (
        <div key={index} className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          {renderContent(section, 0)}
        </div>
      ))}

      {/* Parable/Story */}
      {learn.parable && (
        <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-indigo-400 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            {learn.parable.storyTitle || 'The Story'}
          </h3>
          {learn.parable.narrator && <p className="text-indigo-300 italic mb-4">{learn.parable.narrator}</p>}
          {learn.parable.content && <div className="text-slate-300 whitespace-pre-wrap">{learn.parable.content}</div>}
          {learn.parable.sections && learn.parable.sections.map((s: any, i: number) => (
            <div key={i} className="mt-4">
              {s.title && <h4 className="font-semibold text-white mb-2">{s.title}</h4>}
              {s.content && <p className="text-slate-300">{s.content}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Key takeaway */}
      {learn.keyTakeaway && <KeyTakeawayBox content={learn.keyTakeaway} />}

      {/* Summary */}
      {learn.summary && (
        <div className="p-6 bg-slate-700/50 rounded-xl border border-slate-600">
          <h3 className="font-semibold text-white mb-3">Summary</h3>
          <p className="text-slate-300 leading-relaxed">{learn.summary}</p>
        </div>
      )}

      {/* Table at root level */}
      {learn.table && <DataTable table={learn.table} />}

      {/* Sphere positioning */}
      {learn.spherePositioning && (
        <div className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl">
          <h3 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Sphere Positioning
          </h3>
          {renderContent(learn.spherePositioning, 0)}
        </div>
      )}

      {/* Glossary */}
      {learn.glossary && (
        <CollapsibleSection title="Glossary" icon={BookOpen} color="cyan">
          <div className="space-y-3">
            {learn.glossary.map((item: any, i: number) => (
              <div key={i} className="p-3 bg-slate-700/30 rounded-lg">
                <span className="font-semibold text-cyan-400">{item.term}:</span>
                <span className="text-slate-300 ml-2">{item.definition}</span>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}
    </div>
  )
}
