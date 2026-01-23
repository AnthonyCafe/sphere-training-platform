'use client';

import React, { useState } from 'react';
import { CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

// =============================================================================
// MAIN COMPONENT - Renders any learn content structure
// =============================================================================

interface LearnContentProps {
  learn: any;
}

export default function LearnContentRenderer({ learn }: LearnContentProps) {
  // Handle string format (old markdown)
  if (typeof learn === 'string') {
    return (
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="text-gray-300 whitespace-pre-wrap">{learn}</div>
      </div>
    );
  }

  // Render order for known properties
  const renderOrder = [
    'introduction', 'glossary', 'coreQuestion', 'warning',
    'arnoldQuote', 'parable', 'keyFact', 'keyPhrase',
    'stats', 'coreMetrics', 'sphereMetrics',
    'antarcticaStory',
    'riskCategories', 'definitions', 'types',
    'sections',
    'stablecoinSandwichDeepDive', 'howSphereUtilizesStablecoins',
    'swiftAckExplained', 'dangerZone', 'howToVerifySettlement',
    'systemDetails', 'bitcoinClarification',
    'identifyingCorrespondents',
    'issuanceVsTransmission', 'globalFrameworks',
    'uaeDeepDive', 'singaporeDeepDive', 'ukDeepDive', 'brazilDeepDive',
    'potentialFrictionPoints', 'howSphereAddresses',
    'adoptionCurve', 'enterpriseUseCases',
    'realEnterpriseUseCases', 'whySphereIsRightPartner',
    'speedComparison', 'asymmetryProblem', 'fourLedgers', 'capitalEfficiency',
    'globalFrameworks', 'micaDetails', 'geniusAct', 'uaeFramework', 'convergencePattern',
    'adoptionCurve', 'enterpriseUseCases', 'unbankedOpportunity', 'arnoldOnMarkets',
    'whatSphereIs', 'whatSphereIsNot', 'classificationMatters', 'complianceNative', 'sampleResponse',
    'complianceFlow', 'complianceEnablesGrowth',
    'sanctionsRegimes', 'whatGetsScreened', 'screeningProcess', 'highRiskJurisdictions',
    'whatIsIt', 'thresholds', 'travelRuleFlow', 'whyItMatters',
    'mitigationFramework', 'sphereCertifications',
    'counterpartyTypes', 'dueDiligenceFramework',
    'liquidityTypes', 'managementStrategies',
    'keyMetrics', 'sphereResilience',
    'severityLevels', 'postIncidentReview',
    'foundingContext', 'arnoldQuotes',
    'productComponents', 'paymentFlow',
    'vsTraditional', 'vsCryptoNative',
    'primaryUseCases', 'bobAndAhmed',
    'questions', 'tips', 'closingExample',
    'caseStudy', 'systemicRisk', 'sphereMitigation', 'sphereApproach', 'spherePosition',
    'regulatorQA', 'reserveComposition',
    'table', 'comparison', 'languageGuide',
    'sphereRelevance', 'sphereSolution',
    'arnoldInsight',
    'keyTakeaway'
  ];

  // Get all keys from learn object
  const learnKeys = Object.keys(learn);

  return (
    <div className="space-y-6">
      {/* Render in order */}
      {renderOrder.map(key => {
        if (!learn[key]) return null;
        return <RenderProperty key={key} propKey={key} value={learn[key]} />;
      })}

      {/* Render any remaining properties not in renderOrder */}
      {learnKeys
        .filter(key => !renderOrder.includes(key))
        .map(key => {
          if (!learn[key]) return null;
          return <RenderProperty key={key} propKey={key} value={learn[key]} />;
        })}
    </div>
  );
}

// =============================================================================
// PROPERTY RENDERER - Routes to appropriate component based on key
// =============================================================================

function RenderProperty({ propKey, value }: { propKey: string; value: any }) {
  switch (propKey) {
    case 'introduction':
      return (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <p className="text-gray-300 text-lg leading-relaxed">{value}</p>
        </div>
      );

    case 'coreQuestion':
      return (
        <div className="bg-blue-500/10 border border-blue-500/50 rounded-xl p-6">
          <p className="text-xs font-medium text-blue-400 uppercase tracking-wide mb-2">Core Question</p>
          <p className="text-xl font-semibold text-white">{value}</p>
        </div>
      );

    case 'warning':
      return (
        <div className="bg-amber-500/10 border-l-4 border-amber-500 p-4 rounded-r-lg">
          <p className="text-amber-300 font-medium">⚠️ {value}</p>
        </div>
      );

    case 'keyTakeaway':
      return (
        <div className="bg-emerald-500/10 border border-emerald-500/50 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <p className="text-xs font-medium text-emerald-400 uppercase tracking-wide mb-1">Key Takeaway</p>
              <p className="text-lg font-semibold text-white">{value}</p>
            </div>
          </div>
        </div>
      );

    case 'keyFact':
      // Handle both simple format (stat/context) and complex format (title/points/conclusion)
      if (value.points) {
        return (
          <div className="bg-blue-500/10 border border-blue-500/50 rounded-xl p-6">
            <h3 className="font-semibold text-white mb-3">{value.title}</h3>
            <ul className="text-gray-300 space-y-2 mb-3">
              {value.points.map((p: string, i: number) => <li key={i}>• {p}</li>)}
            </ul>
            {value.conclusion && <p className="text-blue-300 font-medium">{value.conclusion}</p>}
          </div>
        );
      }
      return (
        <div className="bg-blue-500/10 border border-blue-500/50 rounded-xl p-6 text-center">
          <p className="text-2xl font-bold text-white">{value.stat || value}</p>
          {value.context && <p className="text-blue-300 text-sm mt-2">{value.context}</p>}
        </div>
      );

    case 'keyPhrase':
      return (
        <div className="bg-purple-500/10 border border-purple-500/50 rounded-xl p-6 text-center">
          <p className="text-xl font-semibold text-white mb-2">"{value.phrase}"</p>
          <p className="text-purple-300 text-sm">{value.explanation}</p>
        </div>
      );

    case 'arnoldQuote':
    case 'arnoldInsight':
      return <QuoteBlock quote={value} />;

    case 'arnoldQuotes':
      return (
        <div className="space-y-4">
          {value.title && <h3 className="font-semibold text-white">{value.title}</h3>}
          {value.quotes?.map((q: any, i: number) => <QuoteBlock key={i} quote={q} />)}
        </div>
      );

    case 'arnoldOnMarkets':
      return (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="font-semibold text-white mb-4">{value.title}</h3>
          {value.quotes?.map((q: any, i: number) => (
            <p key={i} className="text-gray-300 italic mb-2">"{q}"</p>
          ))}
          {value.insight && (
            <p className="text-purple-300 mt-4 font-medium">💡 {value.insight}</p>
          )}
        </div>
      );

    case 'parable':
      return (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6">
          <h3 className="font-semibold text-white mb-3">📖 {value.title}</h3>
          <p className="text-gray-300 mb-3">{value.content}</p>
          {value.quote && <p className="text-amber-300 italic mb-3">"{value.quote}"</p>}
          {value.lesson && (
            <div className="bg-amber-500/20 rounded-lg p-3 mt-3">
              <p className="text-amber-200 font-medium">Lesson: {value.lesson}</p>
            </div>
          )}
        </div>
      );

    case 'sections':
      return (
        <div className="space-y-4">
          {value.map((section: any, i: number) => <SectionCard key={i} section={section} />)}
        </div>
      );

    case 'questions':
      return (
        <div className="space-y-4">
          {value.map((q: any, i: number) => <QuestionCard key={i} question={q} />)}
        </div>
      );

    case 'stats':
    case 'coreMetrics':
    case 'sphereMetrics':
      return <StatsBlock title={value.title} items={value.items} />;

    case 'riskCategories':
      return <RiskCategoriesBlock data={value} />;

    case 'definitions':
    case 'types':
      return <DefinitionsBlock data={value} />;

    case 'table':
    case 'comparison':
    case 'classificationMatters':
      return <TableBlock data={value} />;

    case 'speedComparison':
      // Handle new detailed format with stablecoin/fiat leg breakdowns
      if (value.stablecoinLegDetail || value.fiatLegDetail) {
        return <SpeedComparisonDetailedBlock data={value} />;
      }
      return <TableBlock data={value} />;

    case 'convergencePattern':
    case 'classificationMatters':
      return <TableBlock data={value} />;

    case 'sphereMitigation':
      // Handle new detailed strategies format or old table format
      if (value.strategies) {
        return <SphereMitigationDetailedBlock data={value} />;
      }
      return <TableBlock data={value} />;

    case 'caseStudy':
      return <CaseStudyBlock data={value} />;

    case 'systemicRisk':
      return <SystemicRiskBlock data={value} />;

    case 'asymmetryProblem':
      return <AsymmetryBlock data={value} />;

    case 'fourLedgers':
      return <FourLedgersBlock data={value} />;

    case 'capitalEfficiency':
      return <CapitalEfficiencyBlock data={value} />;

    case 'sphereApproach':
    case 'spherePosition':
    case 'sphereSolution':
      return <SphereApproachBlock data={value} />;

    case 'globalFrameworks':
      return <GlobalFrameworksBlock data={value} />;

    case 'micaDetails':
    case 'geniusAct':
    case 'uaeFramework':
      return <RegulationBlock data={value} />;

    case 'adoptionCurve':
      return <AdoptionCurveBlock data={value} />;

    case 'enterpriseUseCases':
    case 'primaryUseCases':
      return <UseCasesBlock data={value} />;

    case 'unbankedOpportunity':
      return <UnbankedBlock data={value} />;

    case 'whatSphereIs':
    case 'whatSphereIsNot':
      return <WhatSphereBlock data={value} isNot={propKey === 'whatSphereIsNot'} />;

    case 'complianceNative':
      return <ComplianceNativeBlock data={value} />;

    case 'sampleResponse':
      return <SampleResponseBlock data={value} />;

    case 'complianceFlow':
      return <FlowBlock data={value} />;

    case 'complianceEnablesGrowth':
      return <ComparisonBlock data={value} />;

    case 'sanctionsRegimes':
    case 'whatGetsScreened':
      return <ListBlock data={value} />;

    case 'screeningProcess':
      return <ProcessBlock data={value} />;

    case 'highRiskJurisdictions':
      return <HighRiskBlock data={value} />;

    case 'whatIsIt':
      return <WhatIsItBlock data={value} />;

    case 'thresholds':
      return <ThresholdsBlock data={value} />;

    case 'travelRuleFlow':
      return <FlowBlock data={value} />;

    case 'whyItMatters':
      return <WhyMattersBlock data={value} />;

    case 'mitigationFramework':
      return <MitigationBlock data={value} />;

    case 'sphereCertifications':
      return <CertificationsBlock data={value} />;

    case 'counterpartyTypes':
      return <CounterpartyBlock data={value} />;

    case 'dueDiligenceFramework':
      return <DueDiligenceBlock data={value} />;

    case 'liquidityTypes':
      return <LiquidityTypesBlock data={value} />;

    case 'managementStrategies':
      return <StrategiesBlock data={value} />;

    case 'keyMetrics':
      return <KeyMetricsBlock data={value} />;

    case 'sphereResilience':
      return <ResilienceBlock data={value} />;

    case 'severityLevels':
      return <SeverityBlock data={value} />;

    case 'postIncidentReview':
      return <PostIncidentBlock data={value} />;

    case 'foundingContext':
      return <FoundingBlock data={value} />;

    case 'productComponents':
      return <ProductComponentsBlock data={value} />;

    case 'paymentFlow':
      return <PaymentFlowBlock data={value} />;

    case 'vsTraditional':
    case 'vsCryptoNative':
      return <VsComparisonBlock data={value} />;

    case 'bobAndAhmed':
      return <BobAhmedBlock data={value} />;

    case 'tips':
      return <TipsBlock data={value} />;

    case 'closingExample':
      return (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="font-semibold text-white mb-3">Example Close</h3>
          <p className="text-gray-300 italic">"{value}"</p>
        </div>
      );

    case 'languageGuide':
      return <LanguageGuideBlock data={value} />;

    case 'sphereRelevance':
      return <SphereRelevanceBlock data={value} />;

    case 'regulatorQA':
      return <RegulatorQABlock data={value} />;

    case 'reserveComposition':
      return <ReserveBlock data={value} />;

    // NEW PILLAR 1 FIELDS
    case 'glossary':
      return <GlossaryBlock data={value} />;

    case 'swiftAckExplained':
      return <SwiftAckBlock data={value} />;

    case 'dangerZone':
      return <DangerZoneBlock data={value} />;

    case 'howToVerifySettlement':
      return <VerifySettlementBlock data={value} />;

    case 'systemDetails':
      return <SystemDetailsBlock data={value} />;

    case 'bitcoinClarification':
      return <BitcoinClarificationBlock data={value} />;

    case 'identifyingCorrespondents':
      return <IdentifyingCorrespondentsBlock data={value} />;

    // NEW PILLAR 2.1 FIELDS
    case 'stablecoinSandwichDeepDive':
      return <StablecoinSandwichBlock data={value} />;

    case 'howSphereUtilizesStablecoins':
      return <HowSphereUtilizesStablecoinsBlock data={value} />;

    // NEW PILLAR 2.2 FIELDS
    case 'antarcticaStory':
      return <AntarcticaStoryBlock data={value} />;

    // NEW PILLAR 2.4 FIELDS
    case 'issuanceVsTransmission':
      return <IssuanceVsTransmissionBlock data={value} />;

    case 'uaeDeepDive':
    case 'singaporeDeepDive':
    case 'ukDeepDive':
    case 'brazilDeepDive':
      return <MarketDeepDiveBlock data={value} />;

    case 'potentialFrictionPoints':
      return <FrictionPointsBlock data={value} />;

    case 'howSphereAddresses':
      return <SphereAdvantagesBlock data={value} />;

    // NEW PILLAR 2.5 FIELDS
    case 'realEnterpriseUseCases':
      return <RealUseCasesBlock data={value} />;

    case 'whySphereIsRightPartner':
      return <WhySpherePartnerBlock data={value} />;

    default:
      // Generic object renderer for any missed properties
      if (typeof value === 'object' && value !== null) {
        return <GenericBlock propKey={propKey} data={value} />;
      }
      return null;
  }
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

function QuoteBlock({ quote }: { quote: any }) {
  if (typeof quote === 'string') {
    return (
      <div className="bg-slate-800 border-l-4 border-slate-500 rounded-r-xl p-6">
        <p className="text-lg italic text-gray-300">"{quote}"</p>
      </div>
    );
  }
  return (
    <div className="bg-slate-800 border-l-4 border-slate-500 rounded-r-xl p-6">
      <p className="text-lg italic text-gray-300 mb-2">"{quote.quote}"</p>
      <p className="text-sm text-gray-400">
        — {quote.speaker}
        {quote.context && <span className="text-gray-500"> ({quote.context})</span>}
      </p>
    </div>
  );
}

function SectionCard({ section }: { section: any }) {
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
        {expanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>
      
      {expanded && (
        <div className="p-6 space-y-4">
          <p className="text-gray-300">{section.content}</p>
          
          {section.details && (
            <div className="bg-slate-700/50 rounded-lg p-4 space-y-2">
              {section.details.map((d: any, i: number) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="font-medium text-gray-400 min-w-[140px]">{d.label}:</span>
                  <span className="text-gray-200">{d.value}</span>
                </div>
              ))}
            </div>
          )}

          {section.flow && (
            <div className="flex flex-wrap items-center gap-2 justify-center py-4">
              {section.flow.map((step: string, i: number) => (
                <React.Fragment key={i}>
                  <div className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-lg text-sm font-medium border border-blue-500/30">{step}</div>
                  {i < section.flow.length - 1 && <span className="text-gray-500 text-xl">→</span>}
                </React.Fragment>
              ))}
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
              <p className="text-amber-300 font-medium">⚠️ {section.warning}</p>
            </div>
          )}
          
          {section.partiesInvolved && (
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h4 className="text-blue-300 font-semibold mb-3">{section.partiesInvolved.title}</h4>
              <div className="space-y-3">
                {section.partiesInvolved.parties?.map((party: any, i: number) => (
                  <div key={i} className="bg-slate-600/50 rounded p-3">
                    <p className="text-white font-semibold mb-1">{party.name}</p>
                    <p className="text-gray-300 text-sm mb-2">{party.role}</p>
                    {party.responsibilities && (
                      <ul className="text-gray-400 text-sm space-y-1">
                        {party.responsibilities.map((resp: string, j: number) => (
                          <li key={j}>• {resp}</li>
                        ))}
                      </ul>
                    )}
                    {party.examples && (
                      <p className="text-gray-400 text-sm mt-2">Examples: {party.examples.join(', ')}</p>
                    )}
                    {party.whyTheyExist && (
                      <p className="text-blue-300 text-sm mt-2 italic">{party.whyTheyExist}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {section.riskExplained && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <h4 className="text-amber-300 font-semibold mb-2">{section.riskExplained.title}</h4>
              <p className="text-gray-300 text-sm mb-3">{section.riskExplained.explanation}</p>
              {section.riskExplained.scenario && (
                <div className="bg-amber-500/20 rounded p-3 mb-3">
                  <p className="text-amber-200 text-sm italic">{section.riskExplained.scenario}</p>
                </div>
              )}
              {section.riskExplained.commonErrors && (
                <div>
                  <p className="text-amber-300 text-sm font-semibold mb-2">Common Errors:</p>
                  <ul className="text-gray-300 text-sm space-y-1">
                    {section.riskExplained.commonErrors.map((error: string, i: number) => (
                      <li key={i}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}
              {section.riskExplained.whatCanGoWrong && (
                <div>
                  <p className="text-amber-300 text-sm font-semibold mb-2">What Can Go Wrong:</p>
                  <ul className="text-gray-300 text-sm space-y-1">
                    {section.riskExplained.whatCanGoWrong.map((issue: string, i: number) => (
                      <li key={i}>• {issue}</li>
                    ))}
                  </ul>
                </div>
              )}
              {section.riskExplained.keyPoint && (
                <p className="text-emerald-300 text-sm mt-3 font-medium">💡 {section.riskExplained.keyPoint}</p>
              )}
            </div>
          )}
          
          {section.whyCorrespondentsExist && (
            <div className="bg-blue-500/10 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-300 font-medium text-sm">{section.whyCorrespondentsExist}</p>
            </div>
          )}
          
          {section.whySendingBankBearsRisk && (
            <div className="bg-amber-500/10 border-l-4 border-amber-500 p-4 rounded-r-lg">
              <p className="text-amber-300 font-medium text-sm">{section.whySendingBankBearsRisk}</p>
            </div>
          )}
          
          {section.riskScenario && (
            <div className="bg-slate-700/50 rounded-lg p-4">
              <p className="text-gray-300 italic text-sm">{section.riskScenario}</p>
            </div>
          )}
          
          {section.whatCanGoWrong && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-300 font-semibold mb-2 text-sm">What Can Go Wrong:</p>
              <p className="text-gray-300 text-sm">{section.whatCanGoWrong}</p>
            </div>
          )}
          
          {section.whyCustomerBearsRisk && (
            <div className="bg-amber-500/10 border-l-4 border-amber-500 p-4 rounded-r-lg">
              <p className="text-amber-300 font-medium text-sm">{section.whyCustomerBearsRisk}</p>
            </div>
          )}
          
          {section.commonErrors && (
            <div className="bg-slate-700/50 rounded-lg p-4">
              <p className="text-gray-400 font-semibold mb-2 text-sm">Common Errors:</p>
              <p className="text-gray-300 text-sm">{section.commonErrors}</p>
            </div>
          )}
          
          {section.whyRiskIsEliminated && (
            <div className="bg-emerald-500/10 border-l-4 border-emerald-500 p-4 rounded-r-lg">
              <p className="text-emerald-300 font-medium text-sm">{section.whyRiskIsEliminated}</p>
            </div>
          )}
          
          {section.whyCentralBanksMatter && (
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <p className="text-blue-200 font-medium text-sm">💡 {section.whyCentralBanksMatter}</p>
            </div>
          )}
          
          {section.perHop && (
            <div className="bg-slate-700/50 rounded-lg p-4">
              <p className="text-gray-400 font-semibold mb-2 text-sm">At Each Hop:</p>
              <ul className="text-gray-300 text-sm space-y-1">
                {section.perHop.map((item: string, i: number) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function QuestionCard({ question }: { question: any }) {
  const [expanded, setExpanded] = useState(true);
  
  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full bg-slate-700 px-6 py-4 flex items-center justify-between hover:bg-slate-600 transition"
      >
        <div className="flex items-center gap-3">
          <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">{question.number}</span>
          <h3 className="font-semibold text-white text-left">{question.question}</h3>
        </div>
        {expanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>
      
      {expanded && (
        <div className="p-6 space-y-4">
          {question.context && <p className="text-gray-400 text-sm italic">{question.context}</p>}
          
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
            <p className="font-medium text-emerald-400 mb-1">✅ Answer:</p>
            <p className="text-gray-200">{question.shortAnswer || question.answer?.key}</p>
          </div>
          
          {question.answer?.details && (
            <ul className="text-gray-300 space-y-1 text-sm pl-4">
              {question.answer.details.map((d: string, i: number) => <li key={i}>• {d}</li>)}
            </ul>
          )}
          
          {question.emphasis && (
            <div className="bg-blue-500/10 border-l-4 border-blue-500 p-3 rounded-r-lg">
              <p className="text-blue-300 text-sm font-medium">💡 {question.emphasis}</p>
            </div>
          )}
          
          {(question.doNotSay || question.answer?.doNotSay) && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <p className="text-red-300 text-sm">❌ <span className="font-medium">Don't say:</span> {question.doNotSay || question.answer?.doNotSay}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function StatsBlock({ title, items }: { title: string; items: any[] }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4">{title}</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4">
            <p className="text-2xl font-bold text-white">{item.value}</p>
            <p className="text-sm text-gray-400">{item.label || item.metric}</p>
            {item.context && <p className="text-xs text-gray-500 mt-1">{item.context}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

function RiskCategoriesBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4">{data.title}</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {data.items.map((item: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              {item.icon && <span className="text-2xl">{item.icon}</span>}
              <h4 className="font-semibold text-white">{item.category}</h4>
            </div>
            <p className="text-gray-300 text-sm mb-2">{item.description}</p>
            {item.examples && (
              <div className="mb-2">
                <p className="text-amber-300 text-xs font-semibold mb-1">Examples:</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  {item.examples.map((ex: string, j: number) => <li key={j}>• {ex}</li>)}
                </ul>
              </div>
            )}
            {item.context && (
              <div className="bg-blue-500/10 border border-blue-500/30 rounded p-2 mt-2">
                <p className="text-blue-200 text-xs">{item.context}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function DefinitionsBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4">{data.title}</h3>
      <div className="space-y-3">
        {data.items.map((item: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              {item.icon && <span className="text-xl">{item.icon}</span>}
              <span className="font-semibold text-white">{item.term || item.type}</span>
            </div>
            <p className="text-gray-300 text-sm">{item.meaning || item.description}</p>
            {item.examples && <p className="text-gray-400 text-xs mt-1">Examples: {item.examples}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

function TableBlock({ data }: { data: any }) {
  const headers = data.headers || [];
  const rows = data.rows || [];
  
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      {data.title && <h3 className="font-semibold text-white mb-4">{data.title}</h3>}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-600">
              {headers.map((h: string, i: number) => (
                <th key={i} className="px-4 py-3 text-left font-semibold text-gray-300 bg-slate-700/50">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row: any[], i: number) => (
              <tr key={i} className="border-b border-slate-700/50">
                {row.map((cell, j) => (
                  <td key={j} className="px-4 py-3 text-gray-300">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.conclusion && <p className="text-gray-400 text-sm mt-4">{data.conclusion}</p>}
      {data.keyPoint && <p className="text-purple-300 text-sm mt-4 font-medium">💡 {data.keyPoint}</p>}
    </div>
  );
}

function CaseStudyBlock({ data }: { data: any }) {
  return (
    <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6 space-y-4">
      <h3 className="font-semibold text-white text-xl">📋 {data.title}</h3>
      {data.subtitle && <p className="text-orange-200 text-sm italic">{data.subtitle}</p>}
      
      {/* Background section */}
      {data.background && (
        <div className="bg-slate-700/50 rounded-lg p-4">
          <h4 className="font-semibold text-white mb-2">{data.background.title}</h4>
          <p className="text-emerald-300 text-sm mb-2">{data.background.status}</p>
          <ul className="text-gray-300 text-sm space-y-1 mb-2">
            {data.background.characteristics?.map((char: string, i: number) => (
              <li key={i}>• {char}</li>
            ))}
          </ul>
          {data.background.circlesBanking && (
            <p className="text-gray-400 text-sm mt-2">{data.background.circlesBanking}</p>
          )}
        </div>
      )}
      
      {data.parties && (
        <div className="grid md:grid-cols-2 gap-4">
          {data.parties.map((p: any, i: number) => (
            <div key={i} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <p className="font-semibold text-white">{p.name}</p>
              <p className="text-sm text-orange-300">{p.location}</p>
              {p.role && <p className="text-sm text-gray-400 mt-1">{p.role}</p>}
            </div>
          ))}
        </div>
      )}
      
      {data.timeline && (
        <div className="space-y-3">
          <h4 className="font-semibold text-white">Timeline</h4>
          {data.timeline.map((t: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-3 border-l-4 border-orange-500">
              <p className="font-semibold text-orange-300 mb-1">{t.time}</p>
              <p className="text-white text-sm mb-1">{t.event}</p>
              {t.context && <p className="text-gray-400 text-xs mb-1">{t.context}</p>}
              {t.impact && (
                <p className="text-amber-300 text-xs"><span className="font-semibold">Impact:</span> {t.impact}</p>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Key Insights section */}
      {data.keyInsights && (
        <div>
          <h4 className="font-semibold text-white mb-3">{data.keyInsights.title}</h4>
          <div className="space-y-3">
            {data.keyInsights.insights?.map((insight: any, i: number) => (
              <div key={i} className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                <p className="text-blue-300 font-semibold mb-1">{insight.insight}</p>
                <p className="text-gray-300 text-sm">{insight.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {data.problem && (
        <div>
          <p className="font-medium text-orange-300 mb-2">The Problem:</p>
          <ul className="text-gray-300 space-y-1">
            {data.problem.map((p: string, i: number) => <li key={i}>• {p}</li>)}
          </ul>
        </div>
      )}
      
      {data.keyInsight && (
        <div className="bg-orange-500/20 rounded-lg p-4">
          <p className="text-orange-200 font-medium">💡 {data.keyInsight}</p>
        </div>
      )}
      
      {data.lesson && <p className="text-gray-300 italic font-medium">{data.lesson}</p>}
      {data.postCrisis && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
          <p className="text-emerald-200 text-sm"><span className="font-semibold">Post-Crisis:</span> {data.postCrisis}</p>
        </div>
      )}
    </div>
  );
}

function SystemicRiskBlock({ data }: { data: any }) {
  return (
    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
      <h3 className="font-semibold text-white mb-3">{data.title}</h3>
      {data.scenario && <p className="text-gray-300 mb-3">{data.scenario}</p>}
      {data.impact && (
        <ul className="text-red-300 space-y-1 mb-3">
          {data.impact.map((i: string, idx: number) => <li key={idx}>• {i}</li>)}
        </ul>
      )}
      {data.conclusion && <p className="text-gray-400 italic">{data.conclusion}</p>}
    </div>
  );
}

function AsymmetryBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4">{data.title}</h3>
      {data.concept && <p className="text-gray-300 mb-4">{data.concept}</p>}
      
      {data.visualization && (
        <div className="flex justify-center gap-8 mb-4">
          {data.visualization.map((v: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4 text-center">
              <p className="text-gray-400 text-sm mb-2">{v.leg}</p>
              <p className="text-2xl font-bold text-white">{v.time}</p>
              {v.finality && <p className="text-xs text-gray-500 mt-1">{v.finality}</p>}
            </div>
          ))}
        </div>
      )}
      
      {data.problem && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-4">
          <p className="text-amber-300 font-medium">{data.problem}</p>
        </div>
      )}
      
      {data.detailedScenarios && (
        <div className="space-y-3 mb-4">
          <h4 className="font-semibold text-white">{data.detailedScenarios.title}</h4>
          {data.detailedScenarios.scenarios?.map((scenario: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-red-500">
              <p className="text-red-300 font-semibold mb-2">{scenario.scenario}</p>
              <p className="text-gray-300 text-sm mb-2">{scenario.setup}</p>
              <p className="text-amber-300 text-sm mb-2"><span className="font-semibold">Problem:</span> {scenario.problem}</p>
              <p className="text-gray-400 text-sm mb-2"><span className="font-semibold">Consequence:</span> {scenario.consequence}</p>
              <p className="text-red-200 text-xs font-medium">⚠️ {scenario.risk}</p>
            </div>
          ))}
        </div>
      )}
      
      {data.whatCanGoWrong && (
        <div className="bg-red-500/10 rounded-lg p-4">
          <p className="font-medium text-red-300 mb-2">What can go wrong:</p>
          <ul className="text-gray-300 text-sm space-y-1">
            {data.whatCanGoWrong.map((w: string, i: number) => <li key={i}>• {w}</li>)}
          </ul>
        </div>
      )}
      
      {data.theProblem && (
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mt-4">
          <p className="text-purple-200 font-medium">{data.theProblem}</p>
        </div>
      )}
    </div>
  );
}

function FourLedgersBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4">{data.title}</h3>
      {data.concept && <p className="text-gray-300 mb-4">{data.concept}</p>}
      
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {data.ledgers?.map((l: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-blue-500">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{l.icon}</span>
              <p className="text-white font-semibold">{l.name}</p>
            </div>
            {l.what && <p className="text-gray-300 text-sm mb-2">{l.what}</p>}
            {l.timing && <p className="text-blue-300 text-xs mb-1"><span className="font-semibold">Timing:</span> {l.timing}</p>}
            {l.owner && <p className="text-gray-400 text-xs mb-1"><span className="font-semibold">Owner:</span> {l.owner}</p>}
            {l.finality && <p className="text-amber-300 text-xs"><span className="font-semibold">Finality:</span> {l.finality}</p>}
          </div>
        ))}
      </div>
      
      {data.timingDifferences && (
        <div className="mb-4">
          <h4 className="font-semibold text-white mb-3">{data.timingDifferences.title}</h4>
          <p className="text-gray-300 mb-3">{data.timingDifferences.explanation}</p>
          <div className="space-y-2">
            {data.timingDifferences.timeline?.map((event: any, i: number) => (
              <div key={i} className="flex gap-3 items-start bg-slate-700/30 rounded p-2">
                <span className="text-blue-300 text-xs font-mono min-w-[120px]">{event.time}</span>
                <div className="flex-1">
                  <p className="text-gray-300 text-sm">{event.event}</p>
                  <p className="text-gray-500 text-xs">{event.ledger} - {event.status}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mt-3">
            <p className="text-red-200 text-sm font-medium">{data.timingDifferences.gap}</p>
          </div>
        </div>
      )}
      
      {data.requirement && (
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
          <p className="text-purple-200">{data.requirement}</p>
        </div>
      )}
    </div>
  );
}

function CapitalEfficiencyBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4">{data.title}</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {data.comparison?.map((c: any, i: number) => (
          <div key={i} className={`rounded-lg p-4 ${i === 0 ? 'bg-red-500/10 border border-red-500/30' : 'bg-emerald-500/10 border border-emerald-500/30'}`}>
            <p className={`font-semibold ${i === 0 ? 'text-red-300' : 'text-emerald-300'}`}>{c.approach}</p>
            <p className="text-gray-300 text-sm mt-1">{c.description}</p>
            <p className={`text-lg font-bold mt-2 ${i === 0 ? 'text-red-400' : 'text-emerald-400'}`}>{c.impact}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SphereApproachBlock({ data }: { data: any }) {
  return (
    <div className="bg-purple-500/10 border border-purple-500/50 rounded-xl p-6">
      <h3 className="font-semibold text-white mb-3">{data.title}</h3>
      
      {/* Handle introduction */}
      {data.introduction && <p className="text-purple-200 mb-4">{data.introduction}</p>}
      
      {data.principle && <p className="text-purple-300 font-medium mb-2">{data.principle}</p>}
      {data.philosophy && <p className="text-purple-200 italic mb-2">{data.philosophy}</p>}
      {data.statement && <p className="text-purple-300 font-medium mb-2">{data.statement}</p>}
      {data.explanation && <p className="text-gray-300 mb-3">{data.explanation}</p>}
      
      {/* Operational Controls */}
      {data.operationalControls && (
        <div className="mb-4">
          <h4 className="font-semibold text-white mb-3">{data.operationalControls.title}</h4>
          <div className="space-y-3">
            {data.operationalControls.controls?.map((control: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-blue-500">
                <p className="text-blue-300 font-semibold mb-2">{control.control}</p>
                <p className="text-gray-300 text-sm mb-2"><span className="font-semibold">What:</span> {control.what}</p>
                <p className="text-gray-300 text-sm mb-2"><span className="font-semibold">How:</span> {control.how}</p>
                <p className="text-emerald-300 text-xs">✅ Prevents: {control.preventedRisk}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Settlement Windows */}
      {data.settlementsWindows && (
        <div className="mb-4 bg-slate-700/30 rounded-lg p-4">
          <h4 className="font-semibold text-white mb-2">{data.settlementsWindows.title}</h4>
          <p className="text-gray-300 text-sm mb-3">{data.settlementsWindows.explanation}</p>
          <div className="space-y-2">
            {data.settlementsWindows.windows?.map((window: any, i: number) => (
              <div key={i} className="flex justify-between items-start bg-slate-600/50 rounded p-2">
                <div className="flex-1">
                  <p className="text-white text-sm font-semibold">{window.system}</p>
                  <p className="text-gray-400 text-xs">{window.hours}</p>
                </div>
                <p className="text-amber-300 text-xs">{window.cutOff}</p>
              </div>
            ))}
          </div>
          <p className="text-blue-200 text-sm mt-3">{data.settlementsWindows.strategy}</p>
        </div>
      )}
      
      {/* Safety First Examples */}
      {data.safetyFirstExamples && (
        <div className="mb-4">
          <h4 className="font-semibold text-white mb-3">{data.safetyFirstExamples.title}</h4>
          <div className="space-y-3">
            {data.safetyFirstExamples.examples?.map((example: any, i: number) => (
              <div key={i} className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                <p className="text-emerald-300 font-semibold mb-2">{example.situation}</p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-red-500/10 rounded p-2">
                    <p className="text-red-300 text-xs font-semibold mb-1">Naive Approach:</p>
                    <p className="text-gray-300 text-xs">{example.naiveApproach}</p>
                  </div>
                  <div className="bg-emerald-500/10 rounded p-2">
                    <p className="text-emerald-300 text-xs font-semibold mb-1">Sphere Approach:</p>
                    <p className="text-gray-300 text-xs">{example.sphereApproach}</p>
                  </div>
                </div>
                <p className="text-blue-200 text-xs mt-2">💡 {example.whyItMatters}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Handle solutions array (new structure) */}
      {data.solutions && (
        <div className="space-y-4 mb-4">
          {data.solutions.map((solution: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-purple-500">
              <div className="grid md:grid-cols-2 gap-3 mb-3">
                <div className="bg-red-500/10 rounded p-2">
                  <p className="text-red-300 font-semibold text-sm mb-1">❌ Problem:</p>
                  <p className="text-gray-300 text-sm">{solution.problem}</p>
                </div>
                <div className="bg-emerald-500/10 rounded p-2">
                  <p className="text-emerald-300 font-semibold text-sm mb-1">✅ Sphere Solution:</p>
                  <p className="text-gray-300 text-sm">{solution.sphereSolution}</p>
                </div>
              </div>
              {solution.howItWorks && (
                <div className="bg-slate-600/50 rounded p-3">
                  <p className="text-blue-300 font-semibold text-sm mb-1">How It Works:</p>
                  <p className="text-gray-300 text-sm">{solution.howItWorks}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Handle clarifications */}
      {data.clarifications && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-4">
          <h4 className="text-blue-300 font-semibold mb-2">{data.clarifications.title}</h4>
          <ul className="text-gray-300 space-y-1 text-sm">
            {data.clarifications.points?.map((point: string, i: number) => (
              <li key={i}>• {point}</li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Handle real-world example */}
      {data.realWorldExample && (
        <div className="bg-slate-700/50 rounded-lg p-4">
          <h4 className="text-white font-semibold mb-3">{data.realWorldExample.title}</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
              <p className="text-red-300 font-semibold mb-2">Traditional Approach</p>
              <p className="text-gray-300 text-sm mb-2">{data.realWorldExample.traditional.timeline}</p>
              <p className="text-gray-400 text-xs mb-1">Cost: {data.realWorldExample.traditional.cost}</p>
              <p className="text-gray-400 text-xs">Risks:</p>
              <ul className="text-gray-400 text-xs ml-3">
                {data.realWorldExample.traditional.risks?.map((risk: string, i: number) => (
                  <li key={i}>• {risk}</li>
                ))}
              </ul>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded p-3">
              <p className="text-emerald-300 font-semibold mb-2">Sphere Approach</p>
              <p className="text-gray-300 text-sm mb-2">{data.realWorldExample.sphere.timeline}</p>
              <p className="text-gray-400 text-xs mb-1">Cost: {data.realWorldExample.sphere.cost}</p>
              <p className="text-gray-400 text-xs">Risks:</p>
              <ul className="text-gray-400 text-xs ml-3">
                {data.realWorldExample.sphere.risks?.map((risk: string, i: number) => (
                  <li key={i}>• {risk}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      
      {data.process && (
        <ul className="text-gray-300 space-y-1 mb-3">
          {data.process.map((p: string, i: number) => <li key={i}>• {p}</li>)}
        </ul>
      )}
      {data.points && (
        <ul className="text-gray-300 space-y-1 mb-3">
          {data.points.map((p: string, i: number) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-purple-400 mt-1" />
              {p}
            </li>
          ))}
        </ul>
      )}
      {data.conclusion && <p className="text-purple-200 font-medium mt-3">💡 {data.conclusion}</p>}
    </div>
  );
}

function GlobalFrameworksBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4">{data.title}</h3>
      <div className="space-y-2">
        {data.items?.map((item: any, i: number) => (
          <div key={i} className="flex items-center justify-between bg-slate-700/50 rounded-lg p-3">
            <div className="flex items-center gap-3">
              <span className="text-xl">{item.jurisdiction}</span>
              <span className="text-gray-300">{item.framework}</span>
            </div>
            <span className={`text-xs px-2 py-1 rounded ${item.status === 'Enforced' || item.status === 'Enacted' || item.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RegulationBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-3">{data.title || data.description}</h3>
      {data.requirements && (
        <ul className="text-gray-300 space-y-1 mb-3">
          {data.requirements.map((r: string, i: number) => <li key={i}>• {r}</li>)}
        </ul>
      )}
      {data.keyPoints && (
        <ul className="text-gray-300 space-y-1 mb-3">
          {data.keyPoints.map((k: string, i: number) => <li key={i}>• {k}</li>)}
        </ul>
      )}
      {data.regulators && (
        <div className="space-y-2">
          {data.regulators.map((r: any, i: number) => (
            <div key={i} className="flex justify-between bg-slate-700/50 rounded-lg p-3">
              <span className="text-white font-medium">{r.name}</span>
              <span className="text-gray-400">{r.jurisdiction}</span>
            </div>
          ))}
        </div>
      )}
      {data.impact && <p className="text-amber-300 mt-3">{data.impact}</p>}
    </div>
  );
}

function AdoptionCurveBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4">{data.title}</h3>
      <div className="space-y-3">
        {data.stages?.map((s: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-white">{s.stage}</span>
              <span className="text-gray-400 text-sm">{s.period}</span>
            </div>
            <p className="text-gray-300 text-sm">{s.description}</p>
            <div className="w-full bg-slate-600 rounded-full h-2 mt-2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{ width: `${s.progress}%` }} />
            </div>
          </div>
        ))}
      </div>
      {data.current && <p className="text-emerald-300 mt-4 font-medium">📍 {data.current}</p>}
    </div>
  );
}

function UseCasesBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4">{data.title}</h3>
      <div className="space-y-3">
        {data.items?.map((item: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4">
            <p className="font-semibold text-white">{item.useCase}</p>
            {item.pain && <p className="text-red-300 text-sm mt-1">Pain: {item.pain}</p>}
            {item.painPoint && <p className="text-red-300 text-sm mt-1">Pain: {item.painPoint}</p>}
            {item.solution && <p className="text-emerald-300 text-sm">Solution: {item.solution}</p>}
            {item.sphereSolution && <p className="text-emerald-300 text-sm">Sphere: {item.sphereSolution}</p>}
            {item.benefit && <p className="text-blue-300 text-sm">{item.benefit}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

function UnbankedBlock({ data }: { data: any }) {
  return (
    <div className="bg-blue-500/10 border border-blue-500/50 rounded-xl p-6 text-center">
      <h3 className="font-semibold text-white mb-3">{data.title}</h3>
      <p className="text-4xl font-bold text-blue-400 mb-2">{data.stat}</p>
      <p className="text-gray-300">{data.explanation}</p>
      {data.conclusion && <p className="text-blue-300 mt-3 font-medium">{data.conclusion}</p>}
    </div>
  );
}

function WhatSphereBlock({ data, isNot }: { data: any; isNot: boolean }) {
  return (
    <div className={`rounded-xl p-6 ${isNot ? 'bg-red-500/10 border border-red-500/30' : 'bg-emerald-500/10 border border-emerald-500/30'}`}>
      <h3 className="font-semibold text-white mb-4">{data.title}</h3>
      {data.items && (
        <div className="space-y-2">
          {data.items.map((item: any, i: number) => (
            <div key={i} className="flex items-start gap-3">
              <span className={isNot ? 'text-red-400' : 'text-emerald-400'}>{isNot ? '✗' : '✓'}</span>
              <div>
                <p className="text-white font-medium">{item.classification || item.notThis}</p>
                {(item.detail || item.why) && <p className="text-gray-400 text-sm">{item.detail || item.why}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
      {data.stats && (
        <div className="mt-4 pt-4 border-t border-slate-700">
          {data.stats.map((s: string, i: number) => <p key={i} className="text-gray-300 text-sm">• {s}</p>)}
        </div>
      )}
    </div>
  );
}

function ComplianceNativeBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4">{data.title}</h3>
      {data.approaches && (
        <div className="space-y-3 mb-4">
          {data.approaches.map((a: any, i: number) => (
            <div key={i} className={`flex items-center gap-3 p-3 rounded-lg ${a.icon === '✅' ? 'bg-emerald-500/10' : a.icon === '⚠️' ? 'bg-amber-500/10' : 'bg-red-500/10'}`}>
              <span className="text-xl">{a.icon}</span>
              <div>
                <p className="text-white font-medium">{a.approach}</p>
                <p className="text-gray-400 text-sm">{a.result}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {data.whatItMeans && (
        <ul className="text-gray-300 space-y-1">
          {data.whatItMeans.map((w: string, i: number) => <li key={i}>• {w}</li>)}
        </ul>
      )}
    </div>
  );
}

function SampleResponseBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <p className="text-gray-400 text-sm mb-2">Q: {data.question}</p>
      <p className="text-gray-200 mb-4">{data.answer}</p>
      
      {data.doNotSay && (
        <div className="bg-red-500/10 rounded-lg p-3 mb-3">
          <p className="text-red-400 text-sm font-medium mb-1">❌ Don't say:</p>
          <ul className="text-red-300 text-sm space-y-1">
            {data.doNotSay.map((d: string, i: number) => <li key={i}>• {d}</li>)}
          </ul>
        </div>
      )}
      
      {data.doSay && (
        <div className="bg-emerald-500/10 rounded-lg p-3">
          <p className="text-emerald-400 text-sm font-medium mb-1">✅ Do say:</p>
          <ul className="text-emerald-300 text-sm space-y-1">
            {data.doSay.map((d: string, i: number) => <li key={i}>• {d}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

function FlowBlock({ data }: { data: any }) {
  const steps = data.steps || data;
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      {data.title && <h3 className="font-semibold text-white mb-4">{data.title}</h3>}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {(Array.isArray(steps) ? steps : []).map((step: any, i: number) => (
          <React.Fragment key={i}>
            <div className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-lg text-sm font-medium border border-blue-500/30">
              {step.icon && <span className="mr-2">{step.icon}</span>}
              {step.step || step.action || step}
            </div>
            {i < steps.length - 1 && <span className="text-gray-500 text-xl">→</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function ComparisonBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4">{data.title}</h3>
      {data.comparison && <TableBlock data={data.comparison} />}
    </div>
  );
}

function ListBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4">{data.title}</h3>
      <div className="space-y-2">
        {data.items?.map((item: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-3">
            {typeof item === 'string' ? (
              <p className="text-gray-300">{item}</p>
            ) : (
              <>
                <p className="text-white font-medium">{item.regime || item.item}</p>
                {item.scope && <p className="text-gray-400 text-sm">{item.scope}</p>}
                {item.details && <p className="text-gray-400 text-sm">{item.details}</p>}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProcessBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4">{data.title}</h3>
      <div className="space-y-2">
        {data.steps?.map((step: any, i: number) => (
          <div key={i} className="flex items-center gap-3 bg-slate-700/50 rounded-lg p-3">
            <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">{i + 1}</span>
            <div>
              <p className="text-white font-medium">{step.step}</p>
              <p className="text-gray-400 text-sm">{step.action}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HighRiskBlock({ data }: { data: any }) {
  return (
    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
      <h3 className="font-semibold text-white mb-4">{data.title}</h3>
      {data.comprehensive && <p className="text-red-300 mb-2"><strong>Comprehensive:</strong> {data.comprehensive.join(', ')}</p>}
      {data.targeted && <p className="text-amber-300 mb-2"><strong>Targeted:</strong> {data.targeted.join(', ')}</p>}
      {data.situational && <p className="text-gray-300 mb-2"><strong>Situational:</strong> {data.situational}</p>}
      {data.keyPrinciple && <p className="text-white font-medium mt-3">⚠️ {data.keyPrinciple}</p>}
    </div>
  );
}

function WhatIsItBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-3">{data.title}</h3>
      <p className="text-gray-300 mb-4">{data.description}</p>
      {data.dataRequired && (
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(data.dataRequired).map(([key, items]: [string, any]) => (
            <div key={key} className="bg-slate-700/50 rounded-lg p-4">
              <p className="text-white font-medium capitalize mb-2">{key}</p>
              <ul className="text-gray-300 text-sm space-y-1">
                {items.map((item: string, i: number) => <li key={i}>• {item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ThresholdsBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4">{data.title}</h3>
      <div className="space-y-2">
        {data.items?.map((item: any, i: number) => (
          <div key={i} className="flex items-center justify-between bg-slate-700/50 rounded-lg p-3">
            <span className="text-gray-300">{item.jurisdiction}</span>
            <div className="text-right">
              <span className="text-white font-medium">{item.threshold}</span>
              <span className={`ml-2 text-xs px-2 py-1 rounded ${item.status === 'Enforced' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>{item.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WhyMattersBlock({ data }: { data: any }) {
  return (
    <div className="bg-purple-500/10 border border-purple-500/50 rounded-xl p-6">
      <h3 className="font-semibold text-white mb-3">{data.title}</h3>
      {data.statement && <p className="text-purple-300 font-medium mb-2">{data.statement}</p>}
      {data.explanation && <p className="text-gray-300 mb-3">{data.explanation}</p>}
      {data.sphereApproach && (
        <ul className="text-gray-300 space-y-1">
          {data.sphereApproach.map((s: string, i: number) => <li key={i}>• {s}</li>)}
        </ul>
      )}
    </div>
  );
}

function MitigationBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4">{data.title}</h3>
      <div className="space-y-3">
        {data.layers?.map((layer: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4">
            <p className="text-white font-medium">{layer.layer}</p>
            <p className="text-gray-400 text-sm">{layer.description}</p>
            {layer.examples && <p className="text-gray-300 text-xs mt-1">Examples: {layer.examples.join(', ')}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

function CertificationsBlock({ data }: { data: any }) {
  return (
    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6">
      <h3 className="font-semibold text-white mb-4">{data.title}</h3>
      <div className="space-y-3">
        {data.items?.map((item: any, i: number) => (
          <div key={i} className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400 mt-1" />
            <div>
              <p className="text-white font-medium">{item.cert}</p>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CounterpartyBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4">{data.title}</h3>
      <div className="space-y-2">
        {data.items?.map((item: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-3">
            <p className="text-white font-medium">{item.type}</p>
            <p className="text-red-300 text-sm">Risk: {item.risk}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DueDiligenceBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4">{data.title}</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {data.dimensions?.map((dim: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4">
            <p className="text-white font-medium mb-2">{dim.dimension}</p>
            <ul className="text-gray-300 text-sm space-y-1">
              {dim.checks?.map((c: string, j: number) => <li key={j}>• {c}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function LiquidityTypesBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4">{data.title}</h3>
      <div className="space-y-3">
        {data.items?.map((item: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4">
            <p className="text-white font-medium">{item.type}</p>
            <p className="text-gray-300 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function StrategiesBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4">{data.title}</h3>
      <div className="space-y-2">
        {data.items?.map((item: any, i: number) => (
          <div key={i} className="flex items-start gap-3 bg-slate-700/50 rounded-lg p-3">
            <CheckCircle className="w-4 h-4 text-blue-400 mt-1" />
            <div>
              <p className="text-white font-medium">{item.strategy}</p>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function KeyMetricsBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4">{data.title}</h3>
      <div className="space-y-3">
        {data.items?.map((item: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">{item.metric || item.fullName}</span>
              <span className="text-white font-medium">{item.description || item.example}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResilienceBlock({ data }: { data: any }) {
  return (
    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6">
      <h3 className="font-semibold text-white mb-4">{data.title}</h3>
      <ul className="text-gray-300 space-y-2">
        {data.items?.map((item: string, i: number) => (
          <li key={i} className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SeverityBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4">{data.title}</h3>
      <div className="space-y-2">
        {data.items?.map((item: any, i: number) => (
          <div key={i} className={`rounded-lg p-4 ${i === 0 ? 'bg-red-500/20 border border-red-500/30' : i === 1 ? 'bg-orange-500/20 border border-orange-500/30' : i === 2 ? 'bg-amber-500/20 border border-amber-500/30' : 'bg-slate-700/50'}`}>
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium text-white">{item.level}</span>
              <span className="text-gray-400 text-sm">{item.sla}</span>
            </div>
            <p className="text-gray-300 text-sm">{item.description}</p>
            <p className="text-gray-400 text-xs mt-1">{item.response}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PostIncidentBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-3">{data.title}</h3>
      {data.principle && <p className="text-purple-300 mb-3">{data.principle}</p>}
      {data.elements && (
        <ul className="text-gray-300 space-y-1 mb-3">
          {data.elements.map((e: string, i: number) => <li key={i}>• {e}</li>)}
        </ul>
      )}
      {data.culture && <p className="text-emerald-300 font-medium">💡 {data.culture}</p>}
    </div>
  );
}

function FoundingBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4">{data.title}</h3>
      <div className="space-y-3">
        {data.events?.map((event: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4">
            <p className="text-white font-medium">{event.event}</p>
            <p className="text-gray-400 text-sm">{event.impact}</p>
          </div>
        ))}
      </div>
      {data.insight && <p className="text-purple-300 mt-4">{data.insight}</p>}
    </div>
  );
}

function ProductComponentsBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4">{data.title}</h3>
      <div className="space-y-2">
        {data.items?.map((item: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-3">
            <p className="text-white font-medium">{item.component}</p>
            <p className="text-gray-400 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PaymentFlowBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4">{data.title}</h3>
      <div className="space-y-2">
        {data.steps?.map((step: any, i: number) => (
          <div key={i} className="flex items-center gap-3 bg-slate-700/50 rounded-lg p-3">
            <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">{step.step}</span>
            <div>
              <p className="text-white">{step.action}</p>
              <p className="text-gray-400 text-sm">{step.detail}</p>
            </div>
          </div>
        ))}
      </div>
      {data.keyPoint && <p className="text-emerald-300 mt-4 font-medium">💡 {data.keyPoint}</p>}
    </div>
  );
}

function VsComparisonBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4">{data.title}</h3>
      {data.headers && data.rows && <TableBlock data={data} />}
      {data.comparison && <TableBlock data={data.comparison} />}
    </div>
  );
}

function BobAhmedBlock({ data }: { data: any }) {
  return (
    <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6">
      <h3 className="font-semibold text-white mb-3">📋 {data.title}</h3>
      {data.summary && <p className="text-gray-300 mb-3">{data.summary}</p>}
      {data.story && <p className="text-gray-300 mb-3">{data.story}</p>}
      {data.quote && (
        <p className="text-orange-300 italic">"{data.quote}"</p>
      )}
    </div>
  );
}

function TipsBlock({ data }: { data: any }) {
  const tips = Array.isArray(data) ? data : data.items || [];
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4">Key Tips</h3>
      <div className="space-y-3">
        {tips.map((tip: any, i: number) => (
          <div key={i} className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
            <p className="font-medium text-amber-400">{tip.tip}</p>
            <p className="text-gray-300 text-sm mt-1">{tip.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function LanguageGuideBlock({ data }: { data: any }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
        <p className="font-semibold text-red-400 mb-3">❌ Never Say</p>
        <ul className="space-y-2">
          {data.wrong?.map((item: string, i: number) => <li key={i} className="text-gray-300 text-sm">• {item}</li>)}
        </ul>
      </div>
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
        <p className="font-semibold text-emerald-400 mb-3">✅ Always Say</p>
        <ul className="space-y-2">
          {data.correct?.map((item: string, i: number) => <li key={i} className="text-gray-300 text-sm">• {item}</li>)}
        </ul>
      </div>
    </div>
  );
}

function SphereRelevanceBlock({ data }: { data: any }) {
  return (
    <div className="bg-purple-500/10 border border-purple-500/50 rounded-xl p-6">
      <h3 className="font-semibold text-white mb-4">🎯 {data.title}</h3>
      
      {/* Handle simple points array format */}
      {data.points && (
        <ul className="space-y-2 mb-4">
          {data.points.map((point: string, i: number) => (
            <li key={i} className="flex items-start gap-2 text-gray-300">
              <CheckCircle className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
              {point}
            </li>
          ))}
        </ul>
      )}
      
      {/* Handle summary format */}
      {data.summary && (
        <p className="text-gray-300 mb-4">{data.summary}</p>
      )}
      
      {/* Handle context */}
      {data.context && (
        <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
          <p className="text-gray-300">{data.context}</p>
        </div>
      )}
      
      {/* Handle sphereValue */}
      {data.sphereValue && (
        <div className="bg-purple-500/20 rounded-lg p-4 mb-4">
          <p className="text-purple-200 font-medium">{data.sphereValue}</p>
        </div>
      )}
      
      {/* Handle problemExplained */}
      {data.problemExplained && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-4">
          <p className="text-amber-200 text-sm">{data.problemExplained}</p>
        </div>
      )}
      
      {/* Handle howSphereWorks with steps */}
      {data.howSphereWorks?.steps && (
        <div className="mb-4">
          <h4 className="text-white font-semibold mb-3">{data.howSphereWorks.title}</h4>
          <div className="space-y-3">
            {data.howSphereWorks.steps.map((step: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-purple-500">
                <p className="text-purple-300 font-semibold mb-2">{step.step}</p>
                <p className="text-gray-300 text-sm mb-2">{step.process}</p>
                <div className="grid md:grid-cols-2 gap-2 mt-2 text-sm">
                  <div className="bg-red-500/10 rounded p-2">
                    <p className="text-red-300 font-semibold mb-1">Traditional:</p>
                    <p className="text-gray-400">{step.traditional}</p>
                  </div>
                  <div className="bg-emerald-500/10 rounded p-2">
                    <p className="text-emerald-300 font-semibold mb-1">Sphere:</p>
                    <p className="text-gray-400">{step.sphere}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Handle whyStablecoinsWork */}
      {data.howSphereWorks?.whyStablecoinsWork && (
        <div className="mb-4">
          <h4 className="text-white font-semibold mb-3">Why Stablecoins Enable This</h4>
          <div className="grid md:grid-cols-2 gap-3">
            {data.howSphereWorks.whyStablecoinsWork.map((item: any, i: number) => (
              <div key={i} className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
                <p className="text-emerald-300 font-semibold mb-1">{item.reason}</p>
                <p className="text-gray-300 text-sm">{item.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Handle criticalClarification */}
      {data.howSphereWorks?.criticalClarification && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-4">
          <p className="text-blue-200 text-sm font-medium">⚠️ {data.howSphereWorks.criticalClarification}</p>
        </div>
      )}
      
      {/* Handle howSphereComplements */}
      {data.howSphereComplements?.functions && (
        <div className="mb-4">
          <h4 className="text-white font-semibold mb-3">{data.howSphereComplements.title}</h4>
          {data.howSphereComplements.introduction && (
            <p className="text-gray-300 mb-4">{data.howSphereComplements.introduction}</p>
          )}
          <div className="space-y-4">
            {data.howSphereComplements.functions.map((func: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-4">
                <h5 className="text-purple-300 font-semibold mb-2">{func.name}</h5>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-400"><span className="font-semibold text-blue-300">Central Bank:</span> {func.centralBankRole}</p>
                  <p className="text-gray-400"><span className="font-semibold text-emerald-300">Sphere:</span> {func.sphereRole}</p>
                  <p className="text-gray-300"><span className="font-semibold">Complement:</span> {func.complement}</p>
                  {func.example && (
                    <div className="bg-slate-600/50 rounded p-2 mt-2">
                      <p className="text-gray-400 italic">{func.example}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {data.howSphereComplements.keyMessage && (
            <p className="text-purple-200 font-medium mt-4">💡 {data.howSphereComplements.keyMessage}</p>
          )}
          {data.howSphereComplements.regulatorFriendlyFraming && (
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 mt-3">
              <p className="text-blue-200 text-sm">{data.howSphereComplements.regulatorFriendlyFraming}</p>
            </div>
          )}
        </div>
      )}
      
      {/* keyInsight at the end */}
      {data.keyInsight && (
        <div className="bg-purple-500/20 rounded-lg p-4">
          <p className="text-purple-200 font-medium">💡 {data.keyInsight}</p>
        </div>
      )}
    </div>
  );
}

function RegulatorQABlock({ data }: { data: any }) {
  // Handle both array format and object with items format
  const items = Array.isArray(data) ? data : data.items || [];
  const title = Array.isArray(data) ? 'Regulator Q&A' : data.title || 'Regulator Q&A';
  
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4">{title}</h3>
      <div className="space-y-4">
        {items.map((qa: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4">
            <p className="text-blue-300 font-medium mb-2">Q: {qa.q || qa.question}</p>
            <p className="text-gray-300">A: {qa.a || qa.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReserveBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4">{data.title}</h3>
      <div className="space-y-2">
        {data.items?.map((item: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-3">
            <p className="text-white font-medium">{item.issuer}</p>
            <p className="text-gray-400 text-sm">{item.composition}</p>
          </div>
        ))}
      </div>
      {data.keyPoint && <p className="text-emerald-300 mt-4 font-medium">💡 {data.keyPoint}</p>}
    </div>
  );
}

function GenericBlock({ propKey, data }: { propKey: string; data: any }) {
  // Format the key as a title
  const title = propKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4">{data.title || title}</h3>
      {typeof data === 'string' && <p className="text-gray-300">{data}</p>}
      {typeof data === 'object' && (
        <pre className="text-gray-400 text-sm overflow-auto">{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}

// =============================================================================
// NEW PILLAR 1 COMPONENTS
// =============================================================================

function GlossaryBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">📚 {data.title}</h3>
      <div className="space-y-4">
        {data.terms?.map((term: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-blue-500">
            <h4 className="text-blue-300 font-semibold mb-2">{term.term}</h4>
            <p className="text-gray-300 mb-2">{term.definition}</p>
            {term.example && (
              <p className="text-gray-400 text-sm italic">Example: {term.example}</p>
            )}
            {term.whyItMatters && (
              <p className="text-emerald-300 text-sm mt-2">💡 {term.whyItMatters}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function SwiftAckBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4">{data.title}</h3>
      <p className="text-gray-300 mb-4">{data.definition}</p>
      
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
          <p className="text-emerald-300 font-semibold mb-2">✅ What It Means</p>
          <ul className="text-gray-300 space-y-1 text-sm">
            {data.whatItMeans?.map((item: string, i: number) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
        </div>
        
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
          <p className="text-red-300 font-semibold mb-2">❌ What It Does NOT Mean</p>
          <ul className="text-gray-300 space-y-1 text-sm">
            {data.whatItDoesNOTMean?.map((item: string, i: number) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>
      
      {data.analogy && (
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
          <p className="text-purple-300 italic">{data.analogy}</p>
        </div>
      )}
    </div>
  );
}

function DangerZoneBlock({ data }: { data: any }) {
  return (
    <div className="bg-red-500/10 border-2 border-red-500/50 rounded-xl p-6">
      <h3 className="font-semibold text-red-300 mb-4 text-xl">⚠️ {data.title}</h3>
      <div className="bg-red-500/20 rounded-lg p-4 mb-4">
        <p className="text-white font-semibold text-lg">"{data.statement}"</p>
        {data.whyDangerous && <p className="text-red-200 mt-2">{data.whyDangerous}</p>}
      </div>
      
      {data.mythVsReality && (
        <div className="space-y-3 mb-4">
          {data.mythVsReality.map((item: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-3">
              <p className="text-red-300 text-sm">❌ Myth: {item.myth}</p>
              <p className="text-emerald-300 text-sm">✅ Reality: {item.truth}</p>
            </div>
          ))}
        </div>
      )}
      
      {data.whatCanStillGoWrong?.scenarios && (
        <div>
          <h4 className="text-white font-semibold mb-3">{data.whatCanStillGoWrong.title}</h4>
          <div className="space-y-3">
            {data.whatCanStillGoWrong.scenarios.map((scenario: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-4">
                <p className="text-amber-300 font-semibold mb-1">{scenario.issue}</p>
                <p className="text-gray-300 text-sm mb-2">{scenario.explanation}</p>
                <p className="text-gray-400 text-sm italic">Example: {scenario.example}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function VerifySettlementBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4">{data.title}</h3>
      <p className="text-gray-300 mb-4">{data.introduction}</p>
      
      <div className="space-y-4 mb-4">
        {data.steps?.map((step: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-blue-500">
            <h4 className="text-blue-300 font-semibold mb-2">{step.step}</h4>
            <p className="text-gray-300 text-sm mb-2"><span className="font-semibold">What:</span> {step.what}</p>
            <p className="text-gray-300 text-sm mb-2"><span className="font-semibold">How:</span> {step.how}</p>
            <p className="text-gray-400 text-sm"><span className="font-semibold">Evidence:</span> {step.evidence}</p>
          </div>
        ))}
      </div>
      
      {data.bestPractice && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-4">
          <p className="text-amber-300 font-semibold mb-2">💡 Best Practice</p>
          <p className="text-gray-300 text-sm">{data.bestPractice}</p>
        </div>
      )}
      
      {data.sphereAdvantage && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
          <p className="text-emerald-300 font-semibold mb-2">Sphere Advantage</p>
          <p className="text-gray-300 text-sm">{data.sphereAdvantage}</p>
        </div>
      )}
    </div>
  );
}

function SystemDetailsBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4">{data.title}</h3>
      
      <div className="space-y-4">
        {data.systems?.map((system: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-5 border-l-4 border-purple-500">
            <div className="flex items-start justify-between mb-3">
              <h4 className="text-purple-300 font-semibold text-lg">{system.name}</h4>
              <span className="text-sm text-gray-400">{system.strength}</span>
            </div>
            
            <p className="text-gray-300 mb-3">{system.explanation}</p>
            
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-400"><span className="font-semibold">When:</span> {system.when}</p>
                <p className="text-gray-400"><span className="font-semibold">Legal Backing:</span> {system.legalBacking}</p>
              </div>
              <div>
                <p className="text-gray-400"><span className="font-semibold">Use Cases:</span></p>
                <ul className="text-gray-400 ml-4 mt-1">
                  {system.useCases?.map((useCase: string, j: number) => (
                    <li key={j}>• {useCase}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <p className="text-emerald-300 mt-3 text-sm font-medium">💡 {system.keyPoint}</p>
          </div>
        ))}
      </div>
      
      {data.summary && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mt-4">
          <p className="text-blue-200">{data.summary}</p>
        </div>
      )}
    </div>
  );
}

function BitcoinClarificationBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4">{data.title}</h3>
      <p className="text-gray-300 mb-4">{data.explanation}</p>
      
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <h4 className="text-blue-300 font-semibold mb-3">{data.technicalReality.title}</h4>
          <ul className="text-gray-300 space-y-2 text-sm">
            {data.technicalReality.points?.map((point: string, i: number) => (
              <li key={i}>• {point}</li>
            ))}
          </ul>
        </div>
        
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
          <h4 className="text-amber-300 font-semibold mb-3">{data.legalReality.title}</h4>
          <ul className="text-gray-300 space-y-2 text-sm">
            {data.legalReality.points?.map((point: string, i: number) => (
              <li key={i}>• {point}</li>
            ))}
          </ul>
        </div>
      </div>
      
      {data.contrast && (
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
          <p className="text-purple-200 font-medium">{data.contrast}</p>
        </div>
      )}
    </div>
  );
}

function IdentifyingCorrespondentsBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4">{data.title}</h3>
      <p className="text-gray-300 mb-4">{data.introduction}</p>
      
      {/* Factors */}
      {data.factors && (
        <div className="mb-6">
          <h4 className="text-white font-semibold mb-3">Key Factors</h4>
          <div className="space-y-3">
            {data.factors.map((factor: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-4">
                <h5 className="text-blue-300 font-semibold mb-2">{factor.factor}</h5>
                <p className="text-gray-300 text-sm mb-2">{factor.explanation}</p>
                <div className="grid md:grid-cols-2 gap-2 text-sm">
                  {factor.highLiquidity && <p className="text-gray-400">High: {factor.highLiquidity}</p>}
                  {factor.lowLiquidity && <p className="text-gray-400">Low: {factor.lowLiquidity}</p>}
                  {factor.developed && <p className="text-gray-400">Developed: {factor.developed}</p>}
                  {factor.frontier && <p className="text-gray-400">Frontier: {factor.frontier}</p>}
                  {factor.highRisk && <p className="text-gray-400">High Risk: {factor.highRisk}</p>}
                  {factor.mediumRisk && <p className="text-gray-400">Medium Risk: {factor.mediumRisk}</p>}
                  {factor.largeBank && <p className="text-gray-400">Large Bank: {factor.largeBank}</p>}
                  {factor.smallBank && <p className="text-gray-400">Small Bank: {factor.smallBank}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Typical Corridors */}
      {data.typicalCorridors?.examples && (
        <div className="mb-6">
          <h4 className="text-white font-semibold mb-3">{data.typicalCorridors.title}</h4>
          <div className="space-y-3">
            {data.typicalCorridors.examples.map((corridor: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h5 className="text-emerald-300 font-semibold">{corridor.corridor}</h5>
                  <span className="text-xs bg-slate-600 px-2 py-1 rounded">{corridor.hops} hops</span>
                </div>
                <p className="text-gray-300 text-sm mb-1">{corridor.chain}</p>
                <p className="text-gray-400 text-xs">Speed: {corridor.speed} • Reason: {corridor.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* How to Research */}
      {data.howToResearch?.steps && (
        <div>
          <h4 className="text-white font-semibold mb-3">{data.howToResearch.title}</h4>
          <ul className="text-gray-300 space-y-2 text-sm">
            {data.howToResearch.steps.map((step: string, i: number) => (
              <li key={i} className="flex items-start">
                <span className="text-blue-400 mr-2">{i + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// PILLAR 2.1 COMPONENTS
// =============================================================================

function StablecoinSandwichBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>
      <p className="text-gray-300 mb-4">{data.concept}</p>
      
      {/* Three Layers */}
      <h4 className="text-white font-semibold mb-3">{data.threeLayersTitle}</h4>
      <div className="space-y-4 mb-6">
        {data.layers?.map((layer: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-5 border-l-4 border-emerald-500">
            <h5 className="text-emerald-300 font-semibold mb-3">{layer.layer}</h5>
            
            <div className="grid md:grid-cols-2 gap-3 mb-3">
              <div>
                <p className="text-gray-400 text-sm mb-1"><span className="font-semibold">What:</span> {layer.what}</p>
                <p className="text-gray-400 text-sm mb-1"><span className="font-semibold">How:</span> {layer.how}</p>
                <p className="text-gray-400 text-sm"><span className="font-semibold">Time:</span> {layer.time}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1"><span className="font-semibold">Who:</span> {layer.who}</p>
                <p className="text-gray-400 text-sm"><span className="font-semibold">Compliance:</span> {layer.compliance}</p>
              </div>
            </div>
            
            <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
              <p className="text-blue-200 text-sm"><span className="font-semibold">Example:</span> {layer.example}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Why It Works */}
      {data.whyItWorks && (
        <div className="mb-4">
          <h4 className="text-white font-semibold mb-3">{data.whyItWorks.title}</h4>
          <div className="space-y-3">
            {data.whyItWorks.reasons?.map((item: any, i: number) => (
              <div key={i} className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                <p className="text-emerald-300 font-semibold mb-2">{item.reason}</p>
                <p className="text-gray-300 text-sm">{item.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {data.criticalClarification && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
          <p className="text-amber-200 font-medium">⚠️ {data.criticalClarification}</p>
        </div>
      )}
    </div>
  );
}

function HowSphereUtilizesStablecoinsBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>
      <p className="text-gray-300 mb-4">{data.approach}</p>
      
      {/* Multi-Stablecoin Strategy */}
      {data.multiStablecoinStrategy && (
        <div className="mb-6">
          <h4 className="text-white font-semibold mb-3">{data.multiStablecoinStrategy.title}</h4>
          <p className="text-gray-300 mb-3">{data.multiStablecoinStrategy.why}</p>
          <div className="space-y-3">
            {data.multiStablecoinStrategy.examples?.map((ex: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-blue-300 font-semibold">{ex.corridor}</p>
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded">{ex.stablecoinUsed}</span>
                </div>
                <p className="text-gray-400 text-sm">{ex.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Liquidity Management */}
      {data.liquidityManagement && (
        <div className="mb-6">
          <h4 className="text-white font-semibold mb-3">{data.liquidityManagement.title}</h4>
          <p className="text-amber-300 text-sm mb-2"><span className="font-semibold">Challenge:</span> {data.liquidityManagement.challenge}</p>
          <p className="text-emerald-300 text-sm mb-2"><span className="font-semibold">Solution:</span> {data.liquidityManagement.solution}</p>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
            <p className="text-blue-200 text-sm">{data.liquidityManagement.example}</p>
          </div>
        </div>
      )}
      
      {/* Compliance First */}
      {data.complianceFirst && (
        <div className="mb-6">
          <h4 className="text-white font-semibold mb-3">{data.complianceFirst.title}</h4>
          <p className="text-purple-200 font-medium mb-2">{data.complianceFirst.principle}</p>
          <p className="text-gray-300 text-sm mb-3">{data.complianceFirst.why}</p>
          <ul className="text-gray-300 text-sm space-y-1">
            {data.complianceFirst.partners?.map((partner: string, i: number) => (
              <li key={i}>• {partner}</li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Transparency */}
      {data.transparency && (
        <div>
          <h4 className="text-white font-semibold mb-3">{data.transparency.title}</h4>
          <p className="text-gray-300 text-sm mb-2">{data.transparency.benefit}</p>
          <ul className="text-emerald-300 text-sm space-y-1 mb-3">
            {data.transparency.capabilities?.map((cap: string, i: number) => (
              <li key={i}>• {cap}</li>
            ))}
          </ul>
          <p className="text-blue-300 text-sm mb-2"><span className="font-semibold">Regulator Value:</span> {data.transparency.regulatorValue}</p>
          <p className="text-gray-400 text-sm">{data.transparency.auditTrail}</p>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// PILLAR 2.2 COMPONENTS
// =============================================================================

function AntarcticaStoryBlock({ data }: { data: any }) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">🏔️ {data.title}</h3>
      <p className="text-gray-300 mb-4">{data.setup}</p>
      
      {/* The Scenario */}
      {data.theScenario && (
        <div className="mb-4">
          <button 
            onClick={() => setExpandedSection(expandedSection === 'scenario' ? null : 'scenario')}
            className="w-full bg-slate-700/50 rounded-lg p-4 text-left hover:bg-slate-700 transition"
          >
            <h4 className="font-semibold text-blue-300">{data.theScenario.title}</h4>
          </button>
          {expandedSection === 'scenario' && (
            <div className="bg-slate-700/30 rounded-b-lg p-4 space-y-3">
              <p className="text-gray-300 text-sm">{data.theScenario.situation}</p>
              <div>
                <p className="text-amber-300 text-sm font-semibold mb-2">Capital Controls:</p>
                <ul className="text-gray-400 text-sm space-y-1">
                  {data.theScenario.capitalControls?.map((control: string, i: number) => (
                    <li key={i}>• {control}</li>
                  ))}
                </ul>
              </div>
              <p className="text-gray-300 text-sm italic">{data.theScenario.whatThisMeans}</p>
            </div>
          )}
        </div>
      )}
      
      {/* Stablecoins Arrive */}
      {data.stablecoinsArrive && (
        <div className="mb-4">
          <button 
            onClick={() => setExpandedSection(expandedSection === 'arrive' ? null : 'arrive')}
            className="w-full bg-slate-700/50 rounded-lg p-4 text-left hover:bg-slate-700 transition"
          >
            <h4 className="font-semibold text-emerald-300">{data.stablecoinsArrive.title}</h4>
          </button>
          {expandedSection === 'arrive' && (
            <div className="bg-slate-700/30 rounded-b-lg p-4 space-y-3">
              <p className="text-gray-300 text-sm">{data.stablecoinsArrive.howTheyArrive}</p>
              <ul className="text-gray-400 text-sm space-y-1">
                {data.stablecoinsArrive.steps?.map((step: string, i: number) => (
                  <li key={i}>{i + 1}. {step}</li>
                ))}
              </ul>
              <p className="text-gray-300 text-sm">{data.stablecoinsArrive.adoption}</p>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3">
                <p className="text-purple-200 italic">"{data.stablecoinsArrive.quote}"</p>
                <p className="text-gray-400 text-xs mt-2">{data.stablecoinsArrive.fishbonesExplained}</p>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* The Collapse */}
      {data.theCollapse && (
        <div className="mb-4">
          <button 
            onClick={() => setExpandedSection(expandedSection === 'collapse' ? null : 'collapse')}
            className="w-full bg-slate-700/50 rounded-lg p-4 text-left hover:bg-slate-700 transition"
          >
            <h4 className="font-semibold text-red-300">{data.theCollapse.title}</h4>
          </button>
          {expandedSection === 'collapse' && (
            <div className="bg-slate-700/30 rounded-b-lg p-4 space-y-3">
              <p className="text-gray-300 text-sm mb-3">{data.theCollapse.whatHappens}</p>
              <div className="space-y-2">
                {data.theCollapse.consequences?.map((consequence: any, i: number) => (
                  <div key={i} className="bg-red-500/10 border border-red-500/30 rounded p-3">
                    <p className="text-red-300 font-semibold text-sm mb-1">{consequence.problem}</p>
                    <p className="text-gray-300 text-xs">{consequence.explanation}</p>
                  </div>
                ))}
              </div>
              <p className="text-red-200 text-sm font-medium mt-3">{data.theCollapse.theCrisis}</p>
            </div>
          )}
        </div>
      )}
      
      {/* Lessons */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 space-y-3">
        <h4 className="font-semibold text-blue-300">{data.theLessonTitle}</h4>
        {data.lessons?.map((item: any, i: number) => (
          <div key={i}>
            <p className="text-blue-200 font-semibold text-sm">{item.lesson}</p>
            <p className="text-gray-300 text-xs">{item.explanation}</p>
          </div>
        ))}
      </div>
      
      {data.arnoldInsight && (
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mt-4">
          <p className="text-purple-200 italic">💡 {data.arnoldInsight}</p>
        </div>
      )}
      
      {data.spherePosition && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 mt-4">
          <p className="text-emerald-200 text-sm">{data.spherePosition}</p>
        </div>
      )}
    </div>
  );
}

function SphereMitigationDetailedBlock({ data }: { data: any }) {
  return (
    <div className="bg-purple-500/10 border border-purple-500/50 rounded-xl p-6">
      <h3 className="font-semibold text-white mb-4">{data.title}</h3>
      <p className="text-purple-200 mb-4">{data.principle}</p>
      
      <div className="space-y-4">
        {data.strategies?.map((strategy: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-purple-500">
            <h4 className="text-purple-300 font-semibold mb-2">{strategy.risk}</h4>
            <p className="text-emerald-300 text-sm mb-2">✅ {strategy.sphereMitigation}</p>
            <p className="text-gray-300 text-sm mb-3">{strategy.howItWorks}</p>
            
            {strategy.specificActions && (
              <div className="bg-slate-600/50 rounded p-3 mb-2">
                <p className="text-blue-300 text-xs font-semibold mb-1">Specific Actions:</p>
                <ul className="text-gray-400 text-xs space-y-1">
                  {strategy.specificActions.map((action: string, j: number) => (
                    <li key={j}>• {action}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {strategy.whichRisksAddressed && (
              <p className="text-gray-400 text-xs italic">{strategy.whichRisksAddressed}</p>
            )}
          </div>
        ))}
      </div>
      
      {data.keyPoint && (
        <div className="bg-purple-500/20 rounded-lg p-4 mt-4">
          <p className="text-purple-200 font-medium">💡 {data.keyPoint}</p>
        </div>
      )}
      
      {data.honestAssessment && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mt-4">
          <p className="text-amber-200 text-sm">{data.honestAssessment}</p>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// PILLAR 2.3 COMPONENTS
// =============================================================================

function SpeedComparisonDetailedBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}
      
      {/* Main comparison table */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-600">
              {data.headers?.map((h: string, i: number) => (
                <th key={i} className="text-left text-gray-400 p-2">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows?.map((row: string[], i: number) => (
              <tr key={i} className="border-b border-slate-700">
                {row.map((cell, j) => (
                  <td key={j} className="text-gray-300 p-2">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Stablecoin Leg Detail */}
      {data.stablecoinLegDetail && (
        <div className="mb-6 bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
          <h4 className="font-semibold text-emerald-300 mb-3">{data.stablecoinLegDetail.title}</h4>
          <div className="space-y-3">
            {data.stablecoinLegDetail.steps?.map((step: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded p-3">
                <div className="flex justify-between items-start mb-1">
                  <p className="text-white text-sm font-semibold">{step.step}</p>
                  <span className="text-emerald-300 text-xs font-mono">{step.time}</span>
                </div>
                <p className="text-gray-300 text-xs mb-1">{step.what}</p>
                <p className="text-gray-500 text-xs">Dependency: {step.dependency}</p>
              </div>
            ))}
          </div>
          <p className="text-emerald-200 text-sm mt-3"><span className="font-semibold">Total:</span> {data.stablecoinLegDetail.totalTime}</p>
          <p className="text-amber-300 text-xs mt-1">⚠️ {data.stablecoinLegDetail.bottleneck}</p>
        </div>
      )}
      
      {/* Fiat Leg Detail */}
      {data.fiatLegDetail && (
        <div className="mb-4 bg-red-500/10 border border-red-500/30 rounded-lg p-4">
          <h4 className="font-semibold text-red-300 mb-3">{data.fiatLegDetail.title}</h4>
          <div className="space-y-3">
            {data.fiatLegDetail.steps?.map((step: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded p-3">
                <div className="flex justify-between items-start mb-1">
                  <p className="text-white text-sm font-semibold">{step.step}</p>
                  <span className="text-red-300 text-xs font-mono">{step.time}</span>
                </div>
                <p className="text-gray-300 text-xs mb-1">{step.what}</p>
                <p className="text-gray-500 text-xs">Dependency: {step.dependency}</p>
              </div>
            ))}
          </div>
          <p className="text-red-200 text-sm mt-3"><span className="font-semibold">Total:</span> {data.fiatLegDetail.totalTime}</p>
          <p className="text-amber-300 text-xs mt-1">⚠️ {data.fiatLegDetail.bottleneck}</p>
        </div>
      )}
      
      {data.conclusion && (
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
          <p className="text-purple-200 font-medium">{data.conclusion}</p>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// PILLAR 2.4 COMPONENTS
// =============================================================================

function IssuanceVsTransmissionBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>
      <p className="text-gray-300 mb-4">{data.concept}</p>
      
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {/* Issuance */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
          <h4 className="text-red-300 font-semibold mb-3">{data.issuance.title}</h4>
          <p className="text-gray-300 text-sm mb-2">{data.issuance.what}</p>
          <p className="text-amber-300 text-sm mb-3"><span className="font-semibold">Regulatory:</span> {data.issuance.regulatoryFramework}</p>
          
          <div className="mb-3">
            <p className="text-gray-400 text-xs font-semibold mb-2">Requirements:</p>
            <ul className="text-gray-400 text-xs space-y-1">
              {data.issuance.requirements?.map((req: string, i: number) => (
                <li key={i}>• {req}</li>
              ))}
            </ul>
          </div>
          
          <p className="text-gray-400 text-xs mb-2"><span className="font-semibold">Who:</span> {data.issuance.whoDoesThis}</p>
          <div className="bg-red-500/20 rounded p-2 mt-2">
            <p className="text-red-200 text-xs font-semibold">{data.issuance.spherePosition}</p>
          </div>
        </div>
        
        {/* Transmission */}
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
          <h4 className="text-emerald-300 font-semibold mb-3">{data.transmission.title}</h4>
          <p className="text-gray-300 text-sm mb-2">{data.transmission.what}</p>
          <p className="text-blue-300 text-sm mb-3"><span className="font-semibold">Regulatory:</span> {data.transmission.regulatoryFramework}</p>
          
          <div className="mb-3">
            <p className="text-gray-400 text-xs font-semibold mb-2">Requirements:</p>
            <ul className="text-gray-400 text-xs space-y-1">
              {data.transmission.requirements?.map((req: string, i: number) => (
                <li key={i}>• {req}</li>
              ))}
            </ul>
          </div>
          
          <p className="text-gray-400 text-xs mb-2"><span className="font-semibold">Who:</span> {data.transmission.whoDoesThis}</p>
          <div className="bg-emerald-500/20 rounded p-2 mt-2">
            <p className="text-emerald-200 text-xs font-semibold">{data.transmission.spherePosition}</p>
          </div>
        </div>
      </div>
      
      {/* Why It Matters */}
      {data.whyItMatters && (
        <div className="mb-4">
          <h4 className="text-white font-semibold mb-3">{data.whyItMatters.title}</h4>
          <ul className="text-gray-300 text-sm space-y-2">
            {data.whyItMatters.points?.map((point: string, i: number) => (
              <li key={i}>• {point}</li>
            ))}
          </ul>
        </div>
      )}
      
      {data.analogy && (
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
          <p className="text-purple-200 italic">💡 {data.analogy}</p>
        </div>
      )}
    </div>
  );
}

function MarketDeepDiveBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.whyUAE && <p className="text-blue-300 mb-4">{data.whyUAE}</p>}
      {data.whySingapore && <p className="text-blue-300 mb-4">{data.whySingapore}</p>}
      {data.whyUK && <p className="text-blue-300 mb-4">{data.whyUK}</p>}
      {data.whyBrazil && <p className="text-blue-300 mb-4">{data.whyBrazil}</p>}
      
      {/* Regulators */}
      {data.regulators && (
        <div className="mb-4">
          <h4 className="text-white font-semibold mb-3">Regulators</h4>
          <div className="space-y-2">
            {data.regulators.map((reg: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded p-3">
                <p className="text-blue-300 font-semibold text-sm">{reg.name}</p>
                <p className="text-gray-400 text-xs">{reg.jurisdiction}</p>
                {reg.relevance && <p className="text-gray-300 text-xs mt-1">{reg.relevance}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Framework */}
      {data.framework && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3 mb-4">
          <p className="text-blue-200 text-sm"><span className="font-semibold">Framework:</span> {data.framework}</p>
        </div>
      )}
      
      {/* Key Developments */}
      {data.keyDevelopments && (
        <div className="mb-4">
          <h4 className="text-white font-semibold mb-2 text-sm">Key Developments</h4>
          <ul className="text-gray-300 text-sm space-y-1">
            {data.keyDevelopments.map((dev: string, i: number) => (
              <li key={i}>• {dev}</li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Compliance Requirements */}
      {data.complianceRequirements && (
        <div className="mb-4">
          <h4 className="text-white font-semibold mb-2">{data.complianceRequirements.title}</h4>
          <ul className="text-gray-300 text-sm space-y-1">
            {data.complianceRequirements.requirements?.map((req: string, i: number) => (
              <li key={i}>• {req}</li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Friction Points */}
      {data.frictionPoints && (
        <div className="mb-4 bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
          <h4 className="text-amber-300 font-semibold mb-2">Friction Points</h4>
          <ul className="text-gray-300 text-sm space-y-1">
            {data.frictionPoints.map((friction: string, i: number) => (
              <li key={i}>• {friction}</li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Sphere Advantage */}
      {data.sphereAdvantage && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 mb-4">
          <p className="text-emerald-200 text-sm">{data.sphereAdvantage}</p>
        </div>
      )}
      
      {/* Corridors */}
      {data.corridors && (
        <div className="bg-purple-500/10 rounded p-3">
          <p className="text-purple-200 text-sm"><span className="font-semibold">Key Corridors:</span> {data.corridors}</p>
        </div>
      )}
    </div>
  );
}

function FrictionPointsBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4">{data.title}</h3>
      
      <div className="space-y-4">
        {data.frictions?.map((friction: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-amber-500">
            <h4 className="text-amber-300 font-semibold mb-2">{friction.friction}</h4>
            
            <div className="space-y-3">
              <div className="bg-red-500/10 rounded p-3">
                <p className="text-red-300 text-sm font-semibold mb-1">Challenge:</p>
                <p className="text-gray-300 text-sm">{friction.challenge}</p>
              </div>
              
              <div className="bg-emerald-500/10 rounded p-3">
                <p className="text-emerald-300 text-sm font-semibold mb-1">Sphere Approach:</p>
                <p className="text-gray-300 text-sm">{friction.sphereApproach}</p>
              </div>
              
              {friction.example && (
                <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                  <p className="text-blue-200 text-xs"><span className="font-semibold">Example:</span> {friction.example}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SphereAdvantagesBlock({ data }: { data: any }) {
  return (
    <div className="bg-purple-500/10 border border-purple-500/50 rounded-xl p-6">
      <h3 className="font-semibold text-white mb-4">{data.title}</h3>
      
      <div className="space-y-4">
        {data.advantages?.map((adv: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-emerald-500">
            <h4 className="text-emerald-300 font-semibold mb-2">{adv.advantage}</h4>
            <p className="text-gray-300 text-sm mb-3">{adv.explanation}</p>
            
            {adv.example && (
              <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                <p className="text-blue-200 text-xs">{adv.example}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// PILLAR 2.5 COMPONENTS
// =============================================================================

function RealUseCasesBlock({ data }: { data: any }) {
  const [expandedCase, setExpandedCase] = useState<number | null>(null);
  
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4 text-sm">{data.subtitle}</p>}
      
      <div className="space-y-3">
        {data.cases?.map((useCase: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg border border-slate-600 overflow-hidden">
            <button
              onClick={() => setExpandedCase(expandedCase === i ? null : i)}
              className="w-full p-4 text-left hover:bg-slate-700 transition flex items-start justify-between"
            >
              <div className="flex-1">
                <h4 className="text-emerald-300 font-semibold mb-1">{useCase.useCase}</h4>
                <p className="text-gray-400 text-sm">{useCase.customer}</p>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedCase === i ? 'rotate-180' : ''}`} />
            </button>
            
            {expandedCase === i && (
              <div className="px-4 pb-4 space-y-3">
                {/* Problem */}
                <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                  <p className="text-red-300 text-xs font-semibold mb-1">Problem</p>
                  <p className="text-gray-300 text-sm">{useCase.problem}</p>
                </div>
                
                {/* Sphere Solution */}
                <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                  <p className="text-blue-300 text-xs font-semibold mb-1">Sphere Solution</p>
                  <p className="text-gray-300 text-sm">{useCase.sphereSolution}</p>
                </div>
                
                {/* Results */}
                {useCase.results && (
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded p-3">
                    <p className="text-emerald-300 text-xs font-semibold mb-2">Results</p>
                    <div className="space-y-1">
                      {Object.entries(useCase.results).map(([key, value], j) => (
                        <p key={j} className="text-gray-300 text-xs">
                          <span className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span> {value as string}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Why Sphere */}
                {useCase.whySphere && (
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3">
                    <p className="text-purple-300 text-xs font-semibold mb-2">Why Sphere</p>
                    <ul className="text-gray-300 text-xs space-y-1">
                      {useCase.whySphere.map((reason: string, j: number) => (
                        <li key={j}>• {reason}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function WhySpherePartnerBlock({ data }: { data: any }) {
  return (
    <div className="bg-purple-500/10 border border-purple-500/50 rounded-xl p-6">
      <h3 className="font-semibold text-white mb-4">{data.title}</h3>
      <p className="text-purple-200 mb-4">{data.overarching}</p>
      
      <div className="space-y-4">
        {data.reasons?.map((item: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-emerald-500">
            <h4 className="text-emerald-300 font-semibold mb-2">{item.reason}</h4>
            <p className="text-gray-300 text-sm mb-2">{item.why}</p>
            
            {item.example && (
              <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3 mb-2">
                <p className="text-blue-200 text-xs"><span className="font-semibold">Example:</span> {item.example}</p>
              </div>
            )}
            
            {item.competitive && (
              <div className="bg-purple-500/20 rounded p-2">
                <p className="text-purple-200 text-xs"><span className="font-semibold">Competitive Edge:</span> {item.competitive}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
