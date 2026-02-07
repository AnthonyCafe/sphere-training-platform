'use client';

import React, { useState, createContext, useContext } from 'react';
import { CheckCircle, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { GlossaryTooltip, linkifyGlossaryTerms } from './GlossaryTooltip';

// =============================================================================
// GLOSSARY CONTEXT - Makes glossary available throughout the component tree
// =============================================================================

interface GlossaryTerm {
  term: string;
  definition: string;
}

const GlossaryContext = createContext<GlossaryTerm[]>([]);

export function useGlossary() {
  return useContext(GlossaryContext);
}

// Helper component to render text with glossary tooltips
function GlossaryText({ children }: { children: string }) {
  const glossary = useGlossary();
  if (!glossary || glossary.length === 0) {
    return <>{children}</>;
  }
  return <>{linkifyGlossaryTerms(children, glossary)}</>;
}

// =============================================================================
// MAIN COMPONENT - Renders any learn content structure
// =============================================================================

interface LearnContentProps {
  learn: any;
  glossary?: GlossaryTerm[];
}

export default function LearnContentRenderer({ learn, glossary = [] }: LearnContentProps) {
  // Handle null/undefined
  if (!learn) {
    return (
      <div className="bg-red-500/20 rounded-xl p-6">
        <p className="text-red-300">No learn content available for this section.</p>
      </div>
    );
  }

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
    // Section difficulty/prerequisites (for advanced sections)
    'difficultyNote', 'summaryFramework',
    'arnoldQuote', 'parable', 'keyFact', 'keyPhrase',
    'stats', 'coreMetrics',
    'riskCategories', 'definitions', 'types',
    'sections',
    // Payment systems content (Pillar 1)
    'systemsPreview', 'beyondSwiftAndFedwire', 'paymentSystemsDeepDive',
    'stablecoinSandwichDeepDive', 'howSphereUtilizesStablecoins',
    'swiftAckExplained', 'dangerZone', 'howToVerifySettlement',
    'systemDetails', 'bitcoinClarification',
    'identifyingCorrespondents',
    'issuanceVsTransmission', 'globalFrameworks',
    'uaeDeepDive', 'sphereStatus', 'latamDeepDive', 'ukDeepDive', 'brazilDeepDive',
    'potentialFrictionPoints', 'howSphereAddresses',
    'speedComparison', 'asymmetryProblem', 'fourLedgers', 'capitalEfficiency', 'sphereApproach',
    'globalFrameworks', 'micaDetails', 'geniusAct', 'uaeFramework', 'convergencePattern',
    // Section 2.5 flow: adoption curve → categories → detailed examples → why Sphere → metrics (proof) → market opportunity
    'adoptionCurve', 'enterpriseUseCases', 'realEnterpriseUseCases', 'whySphereIsRightPartner', 'sphereMetrics', 'unbankedOpportunity', 'arnoldOnMarkets',
    // Pillar 2 story content (Antarctica moved after risk categories)
    'antarcticaStory',
    // Section 2.6 flow: scale context → three risk categories → case studies → contagion → why blockchains fail → SphereNet solution → regulator perspective
    'systemicScaleContext', 'threeRiskCategories', 'caseStudyMakerDAO', 'caseStudyUSDCDepeg', 'caseStudyChainalysis',
    'contagionRiskToTraditionalFinance', 'whyExistingBlockchainsFail', 'sphereNetSolution',
    'sixFoundationalPillars', 'threeComponentModel', // SphereNet architecture additions
    'sphereUSDTechnicalArchitecture', 'regulatorPerspective',
    'whatSphereIs', 'whatSphereIsNot', 'classificationMatters', 'classificationMattersLegally', 'complianceNative', 'sampleResponse', 'sampleResponses',
    'complianceFlow', 'complianceEnablesGrowth',
    'coreDefinitions', 'kycRequirements', 'amlProgram', 'cddRequirements', 'eddRequirements', 'kybOnboardingWorkflow', 'sarRequirements',
    'riskAssessmentFramework', 'sphereComplianceApproach', 'redFlagsToWatch',
    'majorSanctionsRegimes', 'whatGetsScreened', 'highRiskJurisdictions', 'screeningProcessFlow',
    'documentationRequirements', 'flaggedPaymentProcess',
    'travelRuleSummary', 'fatfDefinition', 'requiredDataElements', 'thresholdsByJurisdiction',
    'whyTravelRuleMatters', 'notabeneImplementation', 'travelRuleProtocols', 'transmissionMethods', 'transactionsApplied', 'edgeCases',
    'sanctionsRegimes', 'screeningProcess',
    'whatIsIt', 'thresholds', 'travelRuleFlow', 'whyItMatters',
    // 3.6 Enforcement Case Studies
    'commonEnforcementPatterns', 'whatCanGoWrong',

    // =========================================================================
    // PILLAR 4: Risk & Governance - All sections
    // =========================================================================
    // 4.1 Operational Risk Framework
    'whyOperationalRiskMatters', 'mitigationFramework', 'caseStudies', 'governanceCertifications', 'policyFramework',
    // 4.2 Counterparty Risk Management
    'whyCounterpartyRiskMatters', 'counterpartyTypes', 'dueDiligenceFramework', 'thirdPartyRiskManagement',
    'ongoingMonitoring', 'concentrationManagement', 'counterpartyFailureScenarios', 'counterpartyRiskMetrics',
    // 4.3 Liquidity Risk
    'liquidityTypes', 'whyLiquidityIsCritical', 'liquidityManagementFramework',
    'stressTesting', 'dailyManagement', 'celsiusCaseStudy', 'managementStrategies',
    // 4.4 Business Continuity & Disaster Recovery
    'bcpVsDr', 'keyMetrics', 'resilienceArchitecture', 'testingProgram',
    'incidentCommunication', 'caseStudy', 'institutionalQA',
    // 4.5 Incident Management
    'severityLevels', 'responseProcess', 'warRoomProtocol',
    'customerCommunication', 'postIncidentReview', 'metrics',
    // 4.6 Enterprise Risk Management
    'threeLines', 'riskAppetite', 'boardOversight', 'regulatoryReadiness', 'financialCrimesAssessment',
    // 4.7 Technology & Cybersecurity Risk
    'threatLandscape', 'securityFramework', 'keyControls',
    'cryptoSpecificSecurity', 'securityIncidentResponse',
    'sphereCertifications', 'sphereResilience',

    // =========================================================================
    // PILLAR 5: Sphere Product & Positioning - All sections
    // =========================================================================
    // 5.1 Sphere Origin Story
    'personalOrigin', 'hackathonOrigins', 'foundingContext', 'earlyPivot',
    'founderBackground', 'arnoldQuotes', 'fundingJourney',
    // 5.1b Company Strategy 2026
    'tripleCrownFramework', 'companyOKRs', 'internationalExpansion', 'sphereNetStrategy',
    // 5.2 Product Architecture
    'productComponents', 'paymentFlow',
    'architectureOverview', 'stablecoinSettlementDeepDive', 'bankingCoreIntegration',
    'complianceArchitecture', 'bankingIntegrationArchitecture', 'failureModes', 'apiOverview',
    // 5.3 Performance Metrics
    'whyMetricsMatter', 'metricsInContext', 'usingMetricsBySituation',
    'handlingMetricsPushback', 'metricsToAvoid',
    // 5.4 Competitive Positioning
    'positioningFramework', 'competitorCategories', 'spherePayCompetitors', 'quantifiedBenchmarks', 'sphereNetCompetitors', 'technicalDifferentiation',
    'vsTraditional', 'vsCryptoNative', 'vsTraditionalBanks', 'customerFundArchitecture', 'whenToWalkAway',
    'corridorOrchestrationEngine', 'bankFacingInfrastructure', 'bisImplications',
    // 5.4 Customer Segments & Use Cases
    'primaryUseCases', 'sphereCustomerProfiles', 'geographicFocus', 'fiveVerticals',
    'liquidityRecyclingDeepDive', 'stablecoinSandwich', 'dualGoToMarket', 'bobAndAhmed',
    // 5.5 SphereNet Deep Dive
    'whatIsSphereNet', 'threeCorePrinciples', 'technicalArchitecture',
    'spherePayVsSphereNet', 'privacyPreservingCompliance', 'forRegulators', 'hyperliquidPlaybook',
    // 5.6 Customer Qualification & Segmentation
    'threeSegments', 'segmentPrioritization', 'segment1Detail', 'segment2Detail', 'segment3Detail',
    'qualificationFramework',
    // 5.7-5.8 Objection Handling & Technical FAQ
    'dangerousStatements', 'technicalObjections', 'correctionTechnique',
    // 5.9 Enterprise Integration
    'discoveryQuestions', 'commonIntegrationPatterns', 'systemSpecificIntegration',
    'dataFlowsAndReconciliation', 'securityRequirements',

    // =========================================================================
    // PILLAR 7: PITCH PRACTICE
    // =========================================================================
    // 7.0 Pitch Fundamentals
    'pitchStructure', 'whatChangesVsConstant', 'commonMistakes', 'listeningFirst', 'pitchLengths',
    // 7.1-7.6 Audience-specific pitches
    'audienceProfile', 'whatToPitch', 'investorHooks', 'enterpriseHooks', 'bankHooks',
    'fintechHooks', 'cryptoHooks', 'sovereignHooks', 'proofPoints', 'investorMetricsReference',
    'commonObjections', 'pitchScripts', 'practiceScenarios', 'championBuilding', 'relationshipBuilding',
    'partnershipModels', 'keyMessages',

    // =========================================================================
    // PILLAR 6: THE 16 COMPLIANCE QUESTIONS
    // =========================================================================
    'whyThisMatters', 'questionClusters', 'buyingSignals', 'conversationStrategies', 'closingTechniques',

    // =========================================================================
    // Shared/Generic content blocks
    // =========================================================================
    'questions', 'tips', 'closingExample',
    'systemicRisk', 'sphereMitigation',
    'regulatorQA', 'reserveComposition', 'marketGrowth',
    'table', 'comparison', 'languageGuide',
    'arnoldInsight',
    // Sphere positioning - right before key takeaway
    'sphereRegulatoryApproach', 'sphereEnterpriseApproach',
    'spherePosition', 'sphereRelevance', 'sphereSolution',
    // Visual summaries with color-coded sections
    'visualSummary',
    'keyTakeaway',
    // Section transitions (always at end, before exercise/quiz)
    'nextSection'
  ];

  // Get all keys from learn object
  const learnKeys = Object.keys(learn);

  return (
    <GlossaryContext.Provider value={glossary}>
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
    </GlossaryContext.Provider>
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
          <p className="text-gray-300 text-lg leading-relaxed"><GlossaryText>{value}</GlossaryText></p>
        </div>
      );

    case 'coreQuestion':
      return (
        <div className="bg-blue-500/10 rounded-xl p-6">
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
        <div className="bg-emerald-500/10 rounded-xl p-6">
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
          <div className="bg-blue-500/10 rounded-xl p-6">
            <h3 className="font-semibold text-white mb-3">{value.title}</h3>
            <ul className="text-gray-300 space-y-2 mb-3">
              {value.points.map((p: string, i: number) => <li key={i}>• {p}</li>)}
            </ul>
            {value.conclusion && <p className="text-blue-300 font-medium">{value.conclusion}</p>}
          </div>
        );
      }
      return (
        <div className="bg-blue-500/10 rounded-xl p-6 text-center">
          <p className="text-2xl font-bold text-white">{value.stat || value}</p>
          {value.context && <p className="text-blue-300 text-sm mt-2">{value.context}</p>}
        </div>
      );

    case 'keyPhrase':
      return (
        <div className="bg-purple-500/10 rounded-xl p-6 text-center">
          <p className="text-xl font-semibold text-white mb-2">"{value.phrase}"</p>
          <p className="text-purple-300 text-sm">{value.explanation}</p>
        </div>
      );

    case 'visualSummary':
      return (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="font-semibold text-white text-lg mb-4">{value.title}</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {value.sections?.map((section: any, i: number) => {
              const bgColor = section.type === 'danger' ? 'bg-red-500/10 border-red-500/30' :
                              section.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30' :
                              section.type === 'info' ? 'bg-blue-500/10 border-blue-500/30' :
                              section.type === 'sphere' ? 'bg-purple-500/10 border-purple-500/30' :
                              'bg-slate-700/50 border-slate-600';
              const textColor = section.type === 'danger' ? 'text-red-300' :
                                section.type === 'success' ? 'text-emerald-300' :
                                section.type === 'info' ? 'text-blue-300' :
                                section.type === 'sphere' ? 'text-purple-300' :
                                'text-gray-300';
              return (
                <div key={i} className={`${bgColor} border rounded-lg p-4`}>
                  <h4 className={`font-semibold ${textColor} mb-2`}>{section.title}</h4>
                  <ul className="space-y-1">
                    {section.items?.map((item: string, j: number) => (
                      <li key={j} className="text-gray-300 text-sm">• {item}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
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
          {value.speaker && (
            <p className="text-gray-500 text-sm mt-2">— {value.speaker}</p>
          )}
          {value.insight && (
            <p className="text-purple-300 mt-4 font-medium">💡 {value.insight}</p>
          )}
        </div>
      );

    case 'parable':
      return (
        <div className="bg-amber-500/10 rounded-xl p-6">
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

    // NEW PAYMENT SYSTEMS CONTENT (Pillar 1 enhancements)
    case 'systemsPreview':
      return <SystemsPreviewBlock data={value} />;
    
    case 'beyondSwiftAndFedwire':
      return <BeyondSwiftFedwireBlock data={value} />;
    
    case 'paymentSystemsDeepDive':
      return <PaymentSystemsDeepDiveBlock data={value} />;

    case 'questions':
      return (
        <div className="space-y-4">
          {value.map((q: any, i: number) => <QuestionCard key={i} question={q} />)}
        </div>
      );

    case 'stats':
      return <StatsBlock title={value.title} items={value.items} />;

    case 'sphereMetrics':
      return (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="font-semibold text-white mb-2">{value.title}</h3>
          {value.subtitle && <p className="text-gray-400 mb-4">{value.subtitle}</p>}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {value.items?.map((item: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-4">
                <p className="text-2xl font-bold text-white">{item.value}</p>
                <p className="text-sm text-gray-400">{item.label || item.metric}</p>
                {item.context && <p className="text-xs text-gray-500 mt-1">{item.context}</p>}
              </div>
            ))}
          </div>
          {value.clarification && (
            <div className="bg-blue-500/10 rounded-lg p-3 mt-4">
              <p className="text-blue-200 text-sm">ℹ️ {value.clarification}</p>
            </div>
          )}
        </div>
      );

    case 'coreMetrics':
      // Check if it's the expanded format with detailed context
      if (value.items?.[0]?.whatItMeans) {
        return <ExpandedMetricsBlock data={value} />;
      }
      return <StatsBlock title={value.title} items={value.items} />;

    // Section 5.3 Performance Metrics expanded content
    case 'whyMetricsMatter':
      return <WhyMetricsMatterBlock data={value} />;

    case 'metricsInContext':
      return <MetricsInContextBlock data={value} />;

    case 'usingMetricsBySituation':
      return <MetricsBySituationBlock data={value} />;

    case 'handlingMetricsPushback':
      return <MetricsPushbackBlock data={value} />;

    case 'metricsToAvoid':
      return <MetricsAntiPatternsBlock data={value} />;

    case 'riskCategories':
      return <RiskCategoriesBlock data={value} />;

    // NEW: Pillar 2 flow improvements
    case 'nextSection':
      return <NextSectionBlock data={value} />;
    
    case 'difficultyNote':
      return <DifficultyNoteBlock data={value} />;
    
    case 'summaryFramework':
      return <SummaryFrameworkBlock data={value} />;
    
    case 'sphereStatus':
      return <SphereStatusBlock data={value} />;

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
    case 'sphereRegulatoryApproach':
    case 'sphereEnterpriseApproach':
      return <SphereApproachBlock data={value} />;

    case 'globalFrameworks':
      return <GlobalFrameworksBlock data={value} />;

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

    case 'screeningProcess':
      return <ProcessBlock data={value} />;

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

    case 'thirdPartyRiskManagement':
      return <ThirdPartyRiskManagementBlock data={value} />;

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

    case 'personalOrigin':
      return <PersonalOriginBlock data={value} />;

    case 'hackathonOrigins':
      return <HackathonOriginsBlock data={value} />;

    case 'foundingContext':
      return <FoundingBlock data={value} />;

    case 'earlyPivot':
      return <EarlyPivotBlock data={value} />;

    case 'founderBackground':
      return <FounderBackgroundBlock data={value} />;

    case 'fundingJourney':
      return <FundingJourneyBlock data={value} />;

    case 'productComponents':
      return <ProductComponentsBlock data={value} />;

    case 'paymentFlow':
      return <PaymentFlowBlock data={value} />;

    case 'vsTraditional':
    case 'vsCryptoNative':
      return <VsComparisonBlock data={value} />;

    case 'bobAndAhmed':
      return <BobAndAhmedExpandedBlock data={value} />;

    case 'tips':
      return <TipsBlock data={value} />;

    case 'closingExample':
      return (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="font-semibold text-white mb-3">Example Close</h3>
          <p className="text-gray-300 italic">"{value}"</p>
        </div>
      );

    // PILLAR 6 SPECIFIC RENDERS
    case 'whyThisMatters':
      return (
        <div className="bg-amber-500/10 rounded-xl p-6 border border-amber-500/30">
          <h3 className="font-semibold text-amber-300 mb-3">⚡ Why This Matters</h3>
          <div className="text-gray-300 whitespace-pre-line">{value}</div>
        </div>
      );

    case 'questionClusters':
      return <QuestionClustersBlock data={value} />;

    case 'buyingSignals':
      return <BuyingSignalsBlock data={value} />;

    case 'conversationStrategies':
      return <ConversationStrategiesBlock data={value} />;

    case 'closingTechniques':
      return <ClosingTechniquesBlock data={value} />;

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
    case 'latamDeepDive':
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

    // ===========================================
    // NEW SECTION 2.1 - MARKET DATA
    // ===========================================
    case 'marketGrowth':
      return <MarketGrowthBlock data={value} />;

    // ===========================================
    // NEW SECTION 2.4 - MiCA AND GENIUS ACT
    // ===========================================
    case 'micaDetails':
      return <MiCADetailsBlock data={value} />;
    
    case 'geniusAct':
      return <GeniusActBlock data={value} />;

    // ===========================================
    // NEW SECTION 2.6 - SYSTEMIC RISK
    // ===========================================
    case 'systemicScaleContext':
      return <SystemicScaleBlock data={value} />;
    
    case 'threeRiskCategories':
      return <ThreeRiskCategoriesBlock data={value} />;
    
    case 'caseStudyMakerDAO':
    case 'caseStudyUSDCDepeg':
    case 'caseStudyChainalysis':
      return <DetailedCaseStudyBlock data={value} />;
    
    case 'contagionRiskToTraditionalFinance':
      return <ContagionRiskBlock data={value} />;
    
    case 'whyExistingBlockchainsFail':
      return <BlockchainFailBlock data={value} />;
    
    case 'sphereNetSolution':
      return <SphereNetSolutionBlock data={value} />;

    case 'sphereUSDTechnicalArchitecture':
      return <SphereUSDTechnicalArchitectureBlock data={value} />;

    case 'sixFoundationalPillars':
      return <SixFoundationalPillarsBlock data={value} />;

    case 'threeComponentModel':
      return <ThreeComponentModelBlock data={value} />;

    case 'regulatorPerspective':
      return <RegulatorPerspectiveBlock data={value} />;

    // ===========================================
    // NEW SECTION 3.5 - UAE REGULATORY FRAMEWORK
    // ===========================================
    case 'whyUAEMatters':
      return <WhyUAEMattersBlock data={value} />;
    
    case 'regulatoryLandscape':
      return <RegulatoryLandscapeBlock data={value} />;
    
    case 'varaDeepDive':
      return <VARADeepDiveBlock data={value} />;
    
    case 'difcComparison':
      return <DIFCComparisonBlock data={value} />;
    
    case 'adgmOverview':
      return <ADGMOverviewBlock data={value} />;
    
    case 'cbuaeRegulations':
      return <CBUAERegulationsBlock data={value} />;
    
    case 'recommendedEntityStructure':
      return <EntityStructureBlock data={value} />;
    
    case 'activityLicenseMapping':
      return <ActivityLicenseMappingBlock data={value} />;
    
    case 'keyRisksAndConsiderations':
      return <KeyRisksBlock data={value} />;
    
    case 'sampleResponses':
      return <SampleResponsesBlockNew data={value} />;

    // ===========================================
    // NEW SECTION 5.4 - COMPETITIVE POSITIONING
    // ===========================================
    case 'competitorCategories':
      return <CompetitorCategoriesBlock data={value} />;
    
    case 'spherePayCompetitors':
    case 'sphereNetCompetitors':
      return <CompetitorLandscapeBlock data={value} />;
    
    case 'vsTraditionalBanks':
      return <VsComparisonBlock data={value} />;
    
    case 'positioningFramework':
      return <PositioningFrameworkBlock data={value} />;
    
    case 'customerFundArchitecture':
      return <CustomerFundArchitectureBlock data={value} />;

    case 'whenToWalkAway':
      return <WhenToWalkAwayBlock data={value} />;

    case 'corridorOrchestrationEngine':
      return <CorridorOrchestrationEngineBlock data={value} />;

    case 'bankFacingInfrastructure':
      return <BankFacingInfrastructureBlock data={value} />;

    case 'bisImplications':
      return <BISImplicationsBlock data={value} />;

    // ===========================================
    // 5.1b COMPANY STRATEGY 2026
    // ===========================================
    case 'tripleCrownFramework':
      return <TripleCrownFrameworkBlock data={value} />;

    case 'companyOKRs':
      return <CompanyOKRsBlock data={value} />;

    case 'internationalExpansion':
      return <InternationalExpansionBlock data={value} />;

    case 'sphereNetStrategy':
      return <SphereNetStrategyBlock data={value} />;

    // ===========================================
    // NEW COMPETITIVE POSITIONING BLOCKS
    // ===========================================
    case 'quantifiedBenchmarks':
      return <QuantifiedBenchmarksBlock data={value} />;

    case 'technicalDifferentiation':
      return <TechnicalDifferentiationBlock data={value} />;

    // ===========================================
    // FIVE VERTICALS
    // ===========================================
    case 'fiveVerticals':
      return <FiveVerticalsBlock data={value} />;

    // ===========================================
    // NEW SECTION 5.5 - BOB AND AHMED EXPANDED
    // ===========================================
    case 'sphereCustomerProfiles':
      return <CustomerProfilesBlock data={value} />;
    
    case 'geographicFocus':
      return <GeographicFocusBlock data={value} />;

    // ===========================================
    // NEW SECTION 5.6 - SPHERENET INFRASTRUCTURE
    // ===========================================
    case 'whatIsSphereNet':
      return <WhatIsSphereNetBlock data={value} />;
    
    case 'hyperliquidPlaybook':
      return <HyperliquidPlaybookBlock data={value} />;
    
    case 'threeCorePrinciples':
      return <ThreeCorePrinciplesBlock data={value} />;
    
    case 'technicalArchitecture':
      return <TechnicalArchitectureBlock data={value} />;
    
    case 'privacyPreservingCompliance':
      return <PrivacyPreservingBlock data={value} />;
    
    case 'spherePayVsSphereNet':
      return <SpherePayVsSphereNetBlock data={value} />;
    
    case 'forRegulators':
      return <ForRegulatorsBlock data={value} />;

    // ===========================================
    // NEW SECTION 5.7 - CUSTOMER SEGMENTS
    // ===========================================
    case 'threeSegments':
      return <ThreeSegmentsBlock data={value} />;
    
    case 'segment1Detail':
    case 'segment2Detail':
    case 'segment3Detail':
      return <SegmentDetailBlock data={value} />;
    
    case 'segmentPrioritization':
      return <SegmentPrioritizationBlock data={value} />;
    
    case 'qualificationFramework':
      return <QualificationFrameworkBlock data={value} />;


    // =========================================================================
    // PILLAR 3 EXPANDED COMPONENTS - Section 3.1-3.4
    // =========================================================================
    
    // Section 3.1 - What Sphere Is expanded
    case 'classificationMattersLegally':
      return <ClassificationMattersBlock data={value} />;

    // Section 3.2 - AML/KYC expanded
    case 'coreDefinitions':
      return <CoreDefinitionsBlock data={value} />;
    
    case 'complianceEnablesGrowth':
      return <ComplianceEnablesGrowthBlock data={value} />;
    
    case 'kycRequirements':
      return <KYCRequirementsBlock data={value} />;
    
    case 'amlProgram':
      return <AMLProgramBlock data={value} />;
    
    case 'cddRequirements':
      return <CDDRequirementsBlock data={value} />;
    
    case 'eddRequirements':
      return <EDDRequirementsBlock data={value} />;

    case 'kybOnboardingWorkflow':
      return <KYBOnboardingWorkflowBlock data={value} />;

    case 'sarRequirements':
      return <SARRequirementsBlock data={value} />;
    
    case 'riskAssessmentFramework':
      return <RiskAssessmentFrameworkBlock data={value} />;
    
    case 'sphereComplianceApproach':
      return <SphereComplianceApproachBlock data={value} />;
    
    case 'redFlagsToWatch':
      return <RedFlagsBlock data={value} />;

    // Section 3.3 - Sanctions expanded
    case 'majorSanctionsRegimes':
      return <SanctionsRegimesBlock data={value} />;
    
    case 'whatGetsScreened':
      return <WhatGetsScreenedBlock data={value} />;
    
    case 'highRiskJurisdictions':
      return <HighRiskJurisdictionsBlock data={value} />;
    
    case 'screeningProcessFlow':
      return <ScreeningFlowDiagramBlock data={value} />;

    case 'documentationRequirements':
      return <DocumentationRequirementsBlock data={value} />;
    
    case 'flaggedPaymentProcess':
      return <FlaggedPaymentProcessBlock data={value} />;

    // Section 3.4 - Travel Rule expanded
    case 'travelRuleSummary':
      return <TravelRuleSummaryBlock data={value} />;
    
    case 'fatfDefinition':
      return <FATFDefinitionBlock data={value} />;
    
    case 'requiredDataElements':
      return <RequiredDataElementsBlock data={value} />;
    
    case 'thresholdsByJurisdiction':
      return <ThresholdsByJurisdictionBlock data={value} />;
    
    case 'whyTravelRuleMatters':
      return <WhyTravelRuleMattersBlock data={value} />;

    case 'notabeneImplementation':
      return <NotabeneImplementationBlock data={value} />;

    case 'travelRuleProtocols':
      return <TravelRuleProtocolsBlock data={value} />;
    
    case 'transmissionMethods':
      return <TransmissionMethodsBlock data={value} />;
    
    case 'transactionsApplied':
      return <TransactionsAppliedBlock data={value} />;
    
    case 'edgeCases':
      return <EdgeCasesBlock data={value} />;

    case 'commonEnforcementPatterns':
      return <CommonEnforcementPatternsBlock data={value} />;

    case 'whatCanGoWrong':
      return <WhatCanGoWrongBlock data={value} />;

    // ===========================================
    // NEW PILLAR 4 - ENHANCED GOVERNANCE CONTENT
    // ===========================================
    case 'whyOperationalRiskMatters':
      return <WhyOperationalRiskMattersBlock data={value} />;

    case 'caseStudies':
      return <CaseStudiesBlock data={value} />;

    case 'threeLines':
      return <ThreeLinesDefenseBlock data={value} />;

    case 'riskAppetite':
      return <RiskAppetiteBlock data={value} />;

    case 'boardOversight':
      return <BoardOversightBlock data={value} />;

    case 'governanceCertifications':
      return <GovernanceCertificationsBlock data={value} />;

    case 'policyFramework':
      return <PolicyFrameworkBlock data={value} />;

    // ===========================================
    // NEW PILLAR 5.8 - TECHNICAL FAQ
    // ===========================================
    case 'dangerousStatements':
      return <DangerousStatementsBlock data={value} />;

    case 'technicalObjections':
      return <TechnicalObjectionsBlock data={value} />;

    case 'correctionTechnique':
      return <CorrectionTechniqueBlock data={value} />;

    // ===========================================
    // NEW PILLAR 5.9 - ENTERPRISE INTEGRATION
    // ===========================================
    case 'commonIntegrationPatterns':
      return <IntegrationPatternsBlock data={value} />;

    case 'securityRequirements':
      return <SecurityRequirementsBlock data={value} />;

    // ===========================================
    // PILLAR 4 - ADDITIONAL GOVERNANCE COMPONENTS
    // ===========================================

    // Section 4.2 - Counterparty Risk
    case 'whyCounterpartyRiskMatters':
    case 'whyLiquidityIsCritical':
      return <WhyItMattersBlock data={value} />;

    case 'ongoingMonitoring':
    case 'concentrationManagement':
    case 'dailyManagement':
    case 'testingProgram':
    case 'regulatoryReadiness':
      return <ProcessBlock data={value} />;

    case 'financialCrimesAssessment':
      return <FinancialCrimesAssessmentBlock data={value} />;

    case 'counterpartyFailureScenarios':
    case 'celsiusCaseStudy':
      return <ScenarioBlock data={value} />;

    case 'counterpartyRiskMetrics':
    case 'metrics':
      return <MetricsBlock data={value} />;

    // Section 4.3 - Liquidity Risk
    case 'liquidityManagementFramework':
    case 'stressTesting':
    case 'securityFramework':
      return <FrameworkBlock data={value} />;

    // Section 4.4 - Business Continuity
    case 'bcpVsDr':
      return <ComparisonBlock data={value} />;

    case 'resilienceArchitecture':
    case 'threatLandscape':
      return <ArchitectureBlock data={value} />;

    case 'incidentCommunication':
    case 'customerCommunication':
      return <CommunicationBlock data={value} />;

    case 'institutionalQA':
      return <InstitutionalQABlock data={value} />;

    // Section 4.5 - Incident Management
    case 'responseProcess':
    case 'securityIncidentResponse':
      return <ResponseProcessBlock data={value} />;

    case 'warRoomProtocol':
      return <WarRoomBlock data={value} />;

    // Section 4.7 - Cybersecurity
    case 'keyControls':
    case 'cryptoSpecificSecurity':
      return <SecurityControlsBlock data={value} />;

    // ===========================================
    // PILLAR 5 - PRODUCT & ARCHITECTURE
    // ===========================================

    // Section 5.2 - Product Architecture
    case 'architectureOverview':
      return <ArchitectureOverviewBlock data={value} />;

    case 'stablecoinSettlementDeepDive':
    case 'bankingIntegrationArchitecture':
    case 'complianceArchitecture':
      return <DeepDiveBlock data={value} />;

    case 'bankingCoreIntegration':
      return <BankingCoreIntegrationBlock data={value} />;

    case 'liquidityRecyclingDeepDive':
      return <LiquidityRecyclingDeepDiveBlock data={value} />;

    case 'stablecoinSandwich':
      return <StablecoinSandwichUXBlock data={value} />;

    case 'dualGoToMarket':
      return <DualGoToMarketBlock data={value} />;

    case 'failureModes':
      return <FailureModesBlock data={value} />;

    case 'apiOverview':
      return <ApiOverviewBlock data={value} />;

    // Section 5.9 - Enterprise Integration
    case 'systemSpecificIntegration':
      return <SystemIntegrationBlock data={value} />;

    case 'dataFlowsAndReconciliation':
      return <DataFlowsBlock data={value} />;

    case 'discoveryQuestions':
      return <DiscoveryQuestionsBlock data={value} />;

    // =========================================
    // PILLAR 7 - PITCH PRACTICE
    // =========================================
    case 'pitchStructure':
      return <PitchStructureBlock data={value} />;

    case 'whatChangesVsConstant':
      return <WhatChangesBlock data={value} />;

    case 'commonMistakes':
      return <CommonMistakesBlock data={value} />;

    case 'listeningFirst':
      return <ListeningFirstBlock data={value} />;

    case 'pitchLengths':
      return <PitchLengthsBlock data={value} />;

    case 'audienceProfile':
      return <AudienceProfileBlock data={value} />;

    case 'whatToPitch':
      return <WhatToPitchBlock data={value} />;

    case 'investorHooks':
    case 'enterpriseHooks':
    case 'bankHooks':
    case 'fintechHooks':
    case 'cryptoHooks':
    case 'sovereignHooks':
      return <HooksBlock data={value} />;

    case 'proofPoints':
      return <ProofPointsBlock data={value} />;

    case 'investorMetricsReference':
      return <InvestorMetricsBlock data={value} />;

    case 'commonObjections':
      return <ObjectionsBlock data={value} />;

    case 'pitchScripts':
      return <PitchScriptsBlock data={value} />;

    case 'practiceScenarios':
      return <PracticeScenariosBlock data={value} />;

    case 'championBuilding':
    case 'relationshipBuilding':
      return <RelationshipBlock data={value} />;

    default:
      // Smart generic renderer for any missed properties
      if (typeof value === 'object' && value !== null) {
        return <SmartGenericBlock propKey={propKey} data={value} />;
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

// NEW: Systems Preview Block (Section 1.1 Clearing stage teaser)
function SystemsPreviewBlock({ data }: { data: any }) {
  return (
    <div className="bg-blue-500/10 rounded-xl p-4 mt-4">
      <h4 className="text-blue-300 font-semibold mb-2">{data.title}</h4>
      <p className="text-gray-300 text-sm mb-3">{data.explanation}</p>
      <div className="space-y-2">
        {data.systems?.map((s: any, i: number) => (
          <div key={i} className="flex items-start gap-2">
            <span className="text-blue-400 font-mono text-sm font-bold">{s.name}:</span>
            <span className="text-gray-400 text-sm">{s.role}</span>
          </div>
        ))}
      </div>
      {data.lookAhead && (
        <p className="text-blue-200 text-xs mt-3 italic">→ {data.lookAhead}</p>
      )}
    </div>
  );
}

// NEW: Beyond SWIFT and Fedwire Block (Section 1.2)
function BeyondSwiftFedwireBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      <p className="text-gray-300 text-sm mb-3">{data.introduction}</p>
      {data.keyDistinction && (
        <div className="bg-amber-500/10 rounded p-3 mb-4">
          <p className="text-amber-200 text-sm">💡 {data.keyDistinction}</p>
        </div>
      )}
      <div className="space-y-4">
        {data.otherSystems?.map((sys: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-white font-semibold">{sys.name}</h4>
              <span className="text-xs bg-slate-600 text-gray-300 px-2 py-0.5 rounded">{sys.type}</span>
            </div>
            <p className="text-blue-300 text-sm font-medium mb-1">{sys.oneLiner}</p>
            <p className="text-gray-400 text-xs mb-2">{sys.keyFact}</p>
            <p className="text-emerald-300 text-xs">Sphere context: {sys.whyItMatters}</p>
          </div>
        ))}
      </div>
      {data.sphereContext && (
        <div className="bg-emerald-500/10 rounded p-3 mt-4">
          <p className="text-emerald-200 text-sm">{data.sphereContext}</p>
        </div>
      )}
      {data.deeperDive && (
        <p className="text-gray-500 text-xs mt-3 italic">→ {data.deeperDive}</p>
      )}
    </div>
  );
}

// NEW: Payment Systems Deep Dive Block (Section 1.3 major expansion)
function PaymentSystemsDeepDiveBlock({ data }: { data: any }) {
  const [expandedSystem, setExpandedSystem] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'us' | 'international' | 'swift'>('us');
  
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      <p className="text-gray-300 text-sm mb-4">{data.introduction}</p>
      
      {/* Tab Navigation */}
      <div className="flex gap-2 mb-4 border-b border-slate-700 pb-2">
        <button
          onClick={() => setActiveTab('us')}
          className={`px-3 py-1.5 rounded text-sm font-medium transition ${activeTab === 'us' ? 'bg-blue-500 text-white' : 'bg-slate-700 text-gray-400 hover:text-white'}`}
        >
          🇺🇸 US Systems
        </button>
        <button
          onClick={() => setActiveTab('international')}
          className={`px-3 py-1.5 rounded text-sm font-medium transition ${activeTab === 'international' ? 'bg-blue-500 text-white' : 'bg-slate-700 text-gray-400 hover:text-white'}`}
        >
          🌍 International
        </button>
        <button
          onClick={() => setActiveTab('swift')}
          className={`px-3 py-1.5 rounded text-sm font-medium transition ${activeTab === 'swift' ? 'bg-blue-500 text-white' : 'bg-slate-700 text-gray-400 hover:text-white'}`}
        >
          📨 SWIFT Messages
        </button>
      </div>
      
      {/* US Payment Systems Tab */}
      {activeTab === 'us' && data.usPaymentSystems && (
        <div>
          <h4 className="text-white font-medium mb-1">{data.usPaymentSystems.title}</h4>
          <p className="text-gray-400 text-sm mb-4">{data.usPaymentSystems.subtitle}</p>
          
          <div className="space-y-2">
            {data.usPaymentSystems.systems?.map((sys: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedSystem(expandedSystem === sys.name ? null : sys.name)}
                  className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-700/70"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{sys.icon}</span>
                    <div>
                      <h5 className="text-white font-semibold">{sys.name}</h5>
                      <p className="text-gray-500 text-xs">{sys.tagline}</p>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedSystem === sys.name ? 'rotate-180' : ''}`} />
                </button>
                
                {expandedSystem === sys.name && (
                  <div className="px-4 pb-4 space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-xs"><span className="text-gray-500">Operator:</span> <span className="text-gray-300">{sys.operator}</span></div>
                      <div className="text-xs"><span className="text-gray-500">Type:</span> <span className="text-gray-300">{sys.type}</span></div>
                    </div>
                    
                    <p className="text-gray-300 text-sm">{sys.description}</p>
                    
                    {sys.keyStats && (
                      <div className="grid grid-cols-4 gap-2">
                        {sys.keyStats.map((stat: any, j: number) => (
                          <div key={j} className="bg-slate-800 rounded p-2 text-center">
                            <p className="text-blue-400 font-bold text-sm">{stat.stat}</p>
                            <p className="text-gray-500 text-xs">{stat.label}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {sys.howItWorks && (
                      <div className="bg-slate-800/50 rounded p-3">
                        <h6 className="text-white font-medium text-sm mb-2">{sys.howItWorks.title}</h6>
                        <div className="space-y-2">
                          {sys.howItWorks.steps?.map((step: any, j: number) => (
                            <div key={j} className="flex items-start gap-2">
                              <span className="text-blue-400 font-bold text-xs">{j + 1}.</span>
                              <div>
                                <p className="text-gray-300 text-xs font-medium">{step.step}</p>
                                <p className="text-gray-500 text-xs">{step.detail}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        {sys.howItWorks.keyPoint && (
                          <p className="text-amber-300 text-xs mt-2 italic">💡 {sys.howItWorks.keyPoint}</p>
                        )}
                      </div>
                    )}
                    
                    {sys.howNettingWorks && (
                      <div className="bg-purple-500/10 rounded p-3">
                        <h6 className="text-purple-300 font-medium text-sm mb-2">{sys.howNettingWorks.title}</h6>
                        <p className="text-gray-300 text-xs mb-2">{sys.howNettingWorks.explanation}</p>
                        {sys.howNettingWorks.example && (
                          <div className="bg-slate-800/50 rounded p-2 text-xs">
                            <p className="text-gray-400 mb-1">{sys.howNettingWorks.example.scenario}</p>
                            <p className="text-red-300">Without netting: {sys.howNettingWorks.example.withoutNetting}</p>
                            <p className="text-emerald-300">With netting: {sys.howNettingWorks.example.withNetting}</p>
                            <p className="text-blue-300 mt-1">→ {sys.howNettingWorks.example.benefit}</p>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Fedwire: Operating Hours */}
                    {sys.operatingHours && (
                      <div className="bg-slate-800/50 rounded p-3">
                        <h6 className="text-white font-medium text-sm mb-2">{sys.operatingHours.title}</h6>
                        <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                          <div><span className="text-gray-500">Hours:</span> <span className="text-blue-300">{sys.operatingHours.hours}</span></div>
                          <div><span className="text-gray-500">Closed:</span> <span className="text-red-300">{sys.operatingHours.closed}</span></div>
                        </div>
                        {sys.operatingHours.implication && (
                          <p className="text-amber-300 text-xs italic">💡 {sys.operatingHours.implication}</p>
                        )}
                      </div>
                    )}

                    {/* Fedwire: Cost Structure */}
                    {sys.cost && (
                      <div className="bg-slate-800/50 rounded p-3">
                        <h6 className="text-white font-medium text-sm mb-2">{sys.cost.title}</h6>
                        <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                          <div><span className="text-gray-500">Fed Fee:</span> <span className="text-emerald-300">{sys.cost.fedFee}</span></div>
                          <div><span className="text-gray-500">Bank Fee:</span> <span className="text-amber-300">{sys.cost.bankFee}</span></div>
                        </div>
                        {sys.cost.insight && (
                          <p className="text-gray-400 text-xs italic">{sys.cost.insight}</p>
                        )}
                      </div>
                    )}

                    {/* CHIPS: Settlement Process */}
                    {sys.settlementProcess && (
                      <div className="bg-slate-800/50 rounded p-3">
                        <h6 className="text-white font-medium text-sm mb-2">{sys.settlementProcess.title}</h6>
                        <div className="space-y-2">
                          {sys.settlementProcess.steps?.map((step: any, j: number) => (
                            <div key={j} className="flex items-start gap-2">
                              <span className="text-blue-400 font-bold text-xs">{j + 1}.</span>
                              <div>
                                <p className="text-gray-300 text-xs font-medium">{step.step}</p>
                                <p className="text-gray-500 text-xs">{step.detail}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        {sys.settlementProcess.keyPoint && (
                          <p className="text-amber-300 text-xs mt-2 italic">💡 {sys.settlementProcess.keyPoint}</p>
                        )}
                      </div>
                    )}

                    {/* CHIPS: Participants */}
                    {sys.participants && (
                      <div className="bg-slate-800/50 rounded p-3">
                        <h6 className="text-white font-medium text-sm mb-2">{sys.participants.title}</h6>
                        <p className="text-gray-300 text-xs mb-2">{sys.participants.description}</p>
                        {sys.participants.majorParticipants && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {sys.participants.majorParticipants.map((bank: string, j: number) => (
                              <span key={j} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded">{bank}</span>
                            ))}
                          </div>
                        )}
                        {sys.participants.implication && (
                          <p className="text-amber-300 text-xs italic">⚠️ {sys.participants.implication}</p>
                        )}
                      </div>
                    )}

                    {/* ACH: Credit vs Debit Types */}
                    {sys.achTypes && (
                      <div className="bg-slate-800/50 rounded p-3">
                        <h6 className="text-white font-medium text-sm mb-2">{sys.achTypes.title}</h6>
                        <div className="grid md:grid-cols-2 gap-2 mb-2">
                          {sys.achTypes.types?.map((type: any, j: number) => (
                            <div key={j} className="bg-slate-700/50 rounded p-2">
                              <p className="text-blue-300 text-xs font-medium">{type.type}</p>
                              <p className="text-gray-400 text-xs">{type.description}</p>
                              {type.examples && (
                                <p className="text-gray-500 text-xs mt-1">Ex: {type.examples.join(', ')}</p>
                              )}
                              <p className="text-xs mt-1"><span className="text-gray-500">Risk:</span> <span className="text-amber-300">{type.riskProfile}</span></p>
                            </div>
                          ))}
                        </div>
                        {sys.achTypes.returnRisk && (
                          <p className="text-red-300 text-xs bg-red-500/10 rounded p-2">⚠️ {sys.achTypes.returnRisk}</p>
                        )}
                      </div>
                    )}

                    {/* ACH: Same-Day ACH */}
                    {sys.sameDayACH && (
                      <div className="bg-slate-800/50 rounded p-3">
                        <h6 className="text-white font-medium text-sm mb-1">{sys.sameDayACH.title}</h6>
                        {sys.sameDayACH.launched && (
                          <p className="text-gray-500 text-xs mb-2">Launched: {sys.sameDayACH.launched}</p>
                        )}
                        <p className="text-gray-300 text-xs mb-2">{sys.sameDayACH.description}</p>
                        {sys.sameDayACH.limits && (
                          <div className="grid grid-cols-3 gap-2 mb-2">
                            {sys.sameDayACH.limits.map((lim: any, j: number) => (
                              <div key={j} className="bg-slate-700/50 rounded p-2 text-center">
                                <p className="text-blue-300 text-xs font-bold">{lim.limit}</p>
                                <p className="text-gray-500 text-xs">{lim.description}</p>
                              </div>
                            ))}
                          </div>
                        )}
                        {sys.sameDayACH.limitation && (
                          <p className="text-amber-300 text-xs italic">⚠️ {sys.sameDayACH.limitation}</p>
                        )}
                      </div>
                    )}

                    {/* FedNow: Why It Matters */}
                    {sys.whyItMatters && (
                      <div className="bg-emerald-500/10 rounded p-3">
                        <h6 className="text-emerald-300 font-medium text-sm mb-2">{sys.whyItMatters.title}</h6>
                        <div className="space-y-2 mb-2">
                          {sys.whyItMatters.points?.map((pt: any, j: number) => (
                            <div key={j}>
                              <p className="text-white text-xs font-medium">{pt.point}</p>
                              <p className="text-gray-400 text-xs">{pt.detail}</p>
                            </div>
                          ))}
                        </div>
                        {sys.whyItMatters.customerExpectation && (
                          <p className="text-emerald-200 text-xs bg-emerald-500/10 rounded p-2">💡 {sys.whyItMatters.customerExpectation}</p>
                        )}
                      </div>
                    )}

                    {/* FedNow: Current Status */}
                    {sys.currentStatus && (
                      <div className="bg-blue-500/10 rounded p-3">
                        <h6 className="text-blue-300 font-medium text-sm mb-2">{sys.currentStatus.title}</h6>
                        <ul className="text-gray-300 text-xs space-y-1">
                          {sys.currentStatus.points?.map((pt: string, j: number) => (
                            <li key={j}>• {pt}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* FedNow: Limitations */}
                    {sys.limitations && (
                      <div className="bg-amber-500/10 rounded p-3">
                        <h6 className="text-amber-300 font-medium text-sm mb-2">{sys.limitations.title}</h6>
                        <ul className="text-gray-300 text-xs space-y-1">
                          {sys.limitations.points?.map((pt: string, j: number) => (
                            <li key={j}>⚠️ {pt}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {sys.whenUsed && (
                      <div>
                        <p className="text-gray-500 text-xs mb-1">When used:</p>
                        <div className="flex flex-wrap gap-1">
                          {sys.whenUsed.map((use: string, j: number) => (
                            <span key={j} className="text-xs bg-slate-600 text-gray-300 px-2 py-0.5 rounded">{use}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* ACH: Not Used For */}
                    {sys.notUsedFor && (
                      <div>
                        <p className="text-red-400 text-xs mb-1">Not suitable for:</p>
                        <div className="flex flex-wrap gap-1">
                          {sys.notUsedFor.map((use: string, j: number) => (
                            <span key={j} className="text-xs bg-red-500/20 text-red-300 px-2 py-0.5 rounded">{use}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {sys.sphereRelevance && (
                      <div className="bg-emerald-500/10 rounded p-3">
                        <p className="text-emerald-400 text-xs font-medium mb-1">Sphere Relevance:</p>
                        <p className="text-emerald-200 text-xs">{sys.sphereRelevance}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {data.usPaymentSystems.comparisonTable && (
            <div className="mt-4 overflow-x-auto">
              <h5 className="text-white font-medium mb-2">{data.usPaymentSystems.comparisonTable.title}</h5>
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-700">
                    {data.usPaymentSystems.comparisonTable.headers?.map((h: string, i: number) => (
                      <th key={i} className="p-2 text-left text-gray-300 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.usPaymentSystems.comparisonTable.rows?.map((row: string[], i: number) => (
                    <tr key={i} className="border-t border-slate-700">
                      {row.map((cell: string, j: number) => (
                        <td key={j} className={`p-2 ${j === 0 ? 'text-white font-medium' : 'text-gray-400'}`}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {data.usPaymentSystems.keyInsight && (
            <div className="bg-amber-500/10 rounded p-3 mt-4">
              <p className="text-amber-200 text-sm">💡 {data.usPaymentSystems.keyInsight}</p>
            </div>
          )}
        </div>
      )}
      
      {/* International Systems Tab */}
      {activeTab === 'international' && data.internationalSystems && (
        <div>
          <h4 className="text-white font-medium mb-1">{data.internationalSystems.title}</h4>
          <p className="text-gray-400 text-sm mb-4">{data.internationalSystems.subtitle}</p>
          
          <div className="grid md:grid-cols-2 gap-3 mb-4">
            {data.internationalSystems.systems?.map((sys: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{sys.region}</span>
                  <h5 className="text-white font-semibold">{sys.name}</h5>
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  <span>{sys.type}</span> • <span>{sys.operator}</span>
                </div>
                <p className="text-gray-300 text-sm mb-2">{sys.description}</p>
                {sys.keyFacts && (
                  <ul className="text-gray-400 text-xs space-y-0.5 mb-2">
                    {sys.keyFacts.map((fact: string, j: number) => (
                      <li key={j}>• {fact}</li>
                    ))}
                  </ul>
                )}
                {sys.sphereRelevance && (
                  <p className="text-emerald-300 text-xs bg-emerald-500/10 rounded p-2">{sys.sphereRelevance}</p>
                )}
              </div>
            ))}
          </div>
          
          {data.internationalSystems.crossBorderChallenge && (
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h5 className="text-white font-medium mb-2">{data.internationalSystems.crossBorderChallenge.title}</h5>
              <p className="text-gray-300 text-sm mb-3">{data.internationalSystems.crossBorderChallenge.explanation}</p>
              
              <div className="grid md:grid-cols-2 gap-3">
                {data.internationalSystems.crossBorderChallenge.traditionalSolution && (
                  <div className="bg-red-500/20 rounded p-3">
                    <h6 className="text-red-300 font-medium text-sm mb-1">{data.internationalSystems.crossBorderChallenge.traditionalSolution.title}</h6>
                    <p className="text-gray-300 text-xs mb-2">{data.internationalSystems.crossBorderChallenge.traditionalSolution.description}</p>
                    <p className="text-gray-400 text-xs italic mb-2">{data.internationalSystems.crossBorderChallenge.traditionalSolution.example}</p>
                    <ul className="text-red-300 text-xs space-y-0.5">
                      {data.internationalSystems.crossBorderChallenge.traditionalSolution.problems?.map((p: string, j: number) => (
                        <li key={j}>✗ {p}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {data.internationalSystems.crossBorderChallenge.sphereSolution && (
                  <div className="bg-emerald-500/10 rounded p-3">
                    <h6 className="text-emerald-300 font-medium text-sm mb-1">{data.internationalSystems.crossBorderChallenge.sphereSolution.title}</h6>
                    <p className="text-gray-300 text-xs mb-2">{data.internationalSystems.crossBorderChallenge.sphereSolution.description}</p>
                    <p className="text-gray-400 text-xs italic mb-2">{data.internationalSystems.crossBorderChallenge.sphereSolution.example}</p>
                    <ul className="text-emerald-300 text-xs space-y-0.5">
                      {data.internationalSystems.crossBorderChallenge.sphereSolution.benefits?.map((b: string, j: number) => (
                        <li key={j}>✓ {b}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* SWIFT Message Types Tab */}
      {activeTab === 'swift' && data.swiftMessageTypes && (
        <div>
          <h4 className="text-white font-medium mb-1">{data.swiftMessageTypes.title}</h4>
          <p className="text-gray-400 text-sm mb-4">{data.swiftMessageTypes.introduction}</p>
          
          <div className="space-y-3">
            {data.swiftMessageTypes.commonTypes?.map((mt: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-blue-400 font-mono font-bold text-lg">{mt.code}</span>
                  <span className="text-white font-medium">{mt.name}</span>
                </div>
                <p className="text-gray-300 text-sm mb-2">{mt.purpose}</p>
                {mt.contains && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {mt.contains.map((item: string, j: number) => (
                      <span key={j} className="text-xs bg-slate-600 text-gray-300 px-2 py-0.5 rounded">{item}</span>
                    ))}
                  </div>
                )}
                {mt.youllSee && (
                  <p className="text-amber-300 text-xs">💡 {mt.youllSee}</p>
                )}
              </div>
            ))}
          </div>
          
          {data.swiftMessageTypes.keyPoint && (
            <div className="bg-blue-500/10 rounded p-3 mt-4">
              <p className="text-blue-200 text-sm">{data.swiftMessageTypes.keyPoint}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// NEW: Next Section Block (section transitions)
function NextSectionBlock({ data }: { data: any }) {
  return (
    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10  rounded-xl p-4 mt-6">
      <h4 className="text-blue-300 font-semibold mb-2">→ {data.title}</h4>
      <p className="text-gray-300 text-sm">{data.preview}</p>
    </div>
  );
}

// NEW: Difficulty Note Block (for advanced sections)
function DifficultyNoteBlock({ data }: { data: any }) {
  return (
    <div className="bg-amber-500/10 rounded-xl p-4 mb-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded">{data.level}</span>
        <span className="text-amber-300 font-medium">Section Difficulty</span>
      </div>
      {data.prerequisites && (
        <p className="text-gray-400 text-sm mb-1"><span className="text-gray-500">Prerequisites:</span> {data.prerequisites}</p>
      )}
      {data.audience && (
        <p className="text-gray-400 text-sm mb-1"><span className="text-gray-500">Audience:</span> {data.audience}</p>
      )}
      {data.recommendation && (
        <p className="text-amber-200 text-sm mt-2">💡 {data.recommendation}</p>
      )}
    </div>
  );
}

// NEW: Summary Framework Block (for Section 2.6)
function SummaryFrameworkBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-4">
      <h3 className="text-white font-semibold text-xl mb-1">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 text-sm mb-4">{data.subtitle}</p>}
      
      <div className="grid md:grid-cols-3 gap-3 mb-4">
        {data.categories?.map((cat: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{cat.icon}</span>
              <h4 className="text-white font-medium">{cat.name}</h4>
            </div>
            <p className="text-gray-300 text-sm mb-2">{cat.oneLiner}</p>
            <p className="text-gray-500 text-xs mb-1"><span className="text-gray-400">Case Study:</span> {cat.caseStudy}</p>
            <p className="text-emerald-300 text-xs"><span className="text-emerald-400">Sphere:</span> {cat.sphereResponse}</p>
          </div>
        ))}
      </div>
      
      {data.keyMessage && (
        <div className="bg-blue-500/10 rounded p-3">
          <p className="text-blue-200 text-sm">{data.keyMessage}</p>
        </div>
      )}
    </div>
  );
}

// NEW: Sphere Status Block (for UAE section)
function SphereStatusBlock({ data }: { data: any }) {
  return (
    <div className="bg-amber-500/10 rounded-lg p-4 mt-3">
      <h4 className="text-amber-300 font-semibold mb-1">{data.title}</h4>
      <p className="text-amber-400 font-bold text-lg mb-2">{data.status}</p>
      <p className="text-gray-300 text-sm mb-2">{data.explanation}</p>
      {data.crossReference && (
        <p className="text-blue-300 text-sm bg-blue-500/10 rounded p-2">📚 {data.crossReference}</p>
      )}
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
          <p className="text-gray-300"><GlossaryText>{section.content}</GlossaryText></p>
          
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
                  <div className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-lg text-sm font-medium ">{step}</div>
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
            <div className="bg-amber-500/10 rounded-lg p-4">
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
            <div className="bg-red-500/20 rounded-lg p-4">
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
            <div className="bg-blue-500/10 rounded-lg p-4">
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

          {section.systemsPreview && (
            <div className="bg-blue-500/10 rounded-lg p-4 mt-4">
              <h4 className="text-blue-300 font-semibold mb-2">{section.systemsPreview.title}</h4>
              <p className="text-gray-300 text-sm mb-3">{section.systemsPreview.explanation}</p>
              {section.systemsPreview.systems && (
                <div className="space-y-2 mb-3">
                  {section.systemsPreview.systems.map((sys: any, i: number) => (
                    <div key={i} className="bg-slate-700/50 rounded p-2">
                      <span className="text-blue-200 font-medium text-sm">{sys.name}:</span>
                      <span className="text-gray-400 text-sm ml-2">{sys.role}</span>
                    </div>
                  ))}
                </div>
              )}
              {section.systemsPreview.lookAhead && (
                <p className="text-blue-400 text-xs italic">→ {section.systemsPreview.lookAhead}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Helper function to render markdown-like content
function renderMarkdownContent(content: string) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: { type: 'ul' | 'ol'; items: string[] } | null = null;
  let key = 0;

  const flushList = () => {
    if (currentList) {
      if (currentList.type === 'ul') {
        elements.push(
          <ul key={key++} className="space-y-1 my-3 ml-4">
            {currentList.items.map((item, i) => (
              <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>{renderInlineMarkdown(item)}</span>
              </li>
            ))}
          </ul>
        );
      } else {
        elements.push(
          <ol key={key++} className="space-y-1 my-3 ml-4">
            {currentList.items.map((item, i) => (
              <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                <span className="text-blue-400 font-medium min-w-[20px]">{i + 1}.</span>
                <span>{renderInlineMarkdown(item)}</span>
              </li>
            ))}
          </ol>
        );
      }
      currentList = null;
    }
  };

  const renderInlineMarkdown = (text: string) => {
    // Handle **bold** text
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <span key={i} className="text-white font-semibold">{part.slice(2, -2)}</span>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) {
      flushList();
      continue;
    }

    // Headers (lines starting with **)
    if (line.startsWith('**') && line.endsWith('**')) {
      flushList();
      elements.push(
        <h4 key={key++} className="text-white font-semibold text-base mt-5 mb-2 border-b border-slate-600 pb-1">
          {line.replace(/\*\*/g, '')}
        </h4>
      );
      continue;
    }

    // Headers with content after (e.g., **Title:** content)
    if (line.startsWith('**') && line.includes(':**')) {
      flushList();
      const match = line.match(/^\*\*([^*]+):\*\*\s*(.*)/);
      if (match) {
        elements.push(
          <div key={key++} className="mt-3">
            <span className="text-white font-semibold">{match[1]}:</span>
            {match[2] && <span className="text-gray-300 ml-1">{match[2]}</span>}
          </div>
        );
        continue;
      }
    }

    // Bullet points
    if (line.startsWith('- ') || line.startsWith('• ')) {
      if (!currentList || currentList.type !== 'ul') {
        flushList();
        currentList = { type: 'ul', items: [] };
      }
      currentList.items.push(line.replace(/^[-•]\s*/, ''));
      continue;
    }

    // Numbered lists
    if (/^\d+\.\s/.test(line)) {
      if (!currentList || currentList.type !== 'ol') {
        flushList();
        currentList = { type: 'ol', items: [] };
      }
      currentList.items.push(line.replace(/^\d+\.\s*/, ''));
      continue;
    }

    // Regular paragraph with inline bold
    flushList();
    elements.push(
      <p key={key++} className="text-gray-300 text-sm my-2">
        {renderInlineMarkdown(line)}
      </p>
    );
  }

  flushList();
  return elements;
}

function QuestionCard({ question }: { question: any }) {
  const [expanded, setExpanded] = useState(true);
  const [conceptExpanded, setConceptExpanded] = useState(false);

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

          {/* Why They Ask - Show counterparty perspective first */}
          {question.whyTheyAsk && (
            <div className="bg-amber-500/10 border-l-4 border-amber-500 p-4 rounded-r-lg">
              <p className="text-amber-300 font-medium text-sm mb-1">🎯 Why they ask this:</p>
              <p className="text-amber-100 text-sm">{question.whyTheyAsk}</p>
            </div>
          )}

          {/* Concept Explanation - Collapsible deep dive */}
          {question.conceptExplanation && (
            <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg overflow-hidden border-2 border-blue-500/50 shadow-lg shadow-blue-500/10">
              <button
                onClick={() => setConceptExpanded(!conceptExpanded)}
                className="w-full px-4 py-4 flex items-center justify-between hover:from-blue-500/30 hover:to-cyan-500/30 bg-gradient-to-r transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">LEARN</span>
                  <span className="text-white font-medium">📚 {question.conceptExplanation.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-300 text-xs">{conceptExpanded ? 'Click to collapse' : 'Click to expand'}</span>
                  <span className={`text-white bg-blue-500/50 rounded-full w-6 h-6 flex items-center justify-center transform transition-transform ${conceptExpanded ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
              </button>
              {conceptExpanded && (
                <div className="p-4 border-t border-blue-500/30 bg-slate-800/50 max-h-[500px] overflow-y-auto">
                  {renderMarkdownContent(question.conceptExplanation.content)}
                </div>
              )}
            </div>
          )}

          {/* Sphere's Approach */}
          {question.sphereApproach && (
            <div className="bg-purple-500/10 border-l-4 border-purple-500 p-4 rounded-r-lg">
              <p className="text-purple-300 font-medium text-sm mb-1">🔮 Sphere's Approach:</p>
              <p className="text-purple-100 text-sm">{question.sphereApproach}</p>
            </div>
          )}

          {/* Question Box */}
          <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
            <p className="text-blue-300 font-medium text-xs uppercase tracking-wide mb-2">Question</p>
            <p className="text-white font-medium">"{question.question}"</p>
          </div>

          {/* Answer Box */}
          <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/30">
            <p className="text-emerald-300 font-medium text-xs uppercase tracking-wide mb-2">Answer</p>
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

          {/* Critical Point */}
          {question.criticalPoint && (
            <div className="bg-red-500/10 border-l-4 border-red-500 p-3 rounded-r-lg">
              <p className="text-red-300 text-sm font-medium">⚠️ Critical: {question.criticalPoint}</p>
            </div>
          )}

          {/* Real World Context */}
          {question.realWorldContext && (
            <div className="bg-slate-700/50 rounded-lg p-4">
              <p className="text-gray-400 font-medium text-sm mb-1">🌍 Real-World Context:</p>
              <p className="text-gray-300 text-sm">{question.realWorldContext}</p>
            </div>
          )}

          {/* Sanctions Hit Workflow - Step-by-step process */}
          {question.sanctionsHitWorkflow && (
            <div className="bg-gradient-to-r from-red-500/10 to-amber-500/10 rounded-xl p-5 border border-red-500/30">
              <h4 className="text-red-300 font-semibold text-lg mb-2">⚠️ {question.sanctionsHitWorkflow.title}</h4>
              <p className="text-gray-400 mb-4">{question.sanctionsHitWorkflow.introduction}</p>

              <div className="space-y-3">
                {question.sanctionsHitWorkflow.steps?.map((step: any, i: number) => (
                  <div key={i} className="bg-slate-800/70 rounded-lg p-4 border-l-4 border-red-500/50">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                        {step.step}
                      </span>
                      <span className="text-white font-medium">{step.name}</span>
                    </div>
                    <p className="text-gray-300 text-sm mb-2 ml-11">{step.description}</p>
                    <p className="text-amber-300 text-xs ml-11 bg-amber-500/10 rounded p-2">
                      💡 {step.keyPoint}
                    </p>
                  </div>
                ))}
              </div>

              {question.sanctionsHitWorkflow.criticalDifferentiator && (
                <div className="mt-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                  <p className="text-emerald-300 font-medium text-sm">
                    ✅ {question.sanctionsHitWorkflow.criticalDifferentiator}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Bridging Technique */}
          {question.bridgingTechnique && (
            <div className="bg-cyan-500/10 border-l-4 border-cyan-500 p-3 rounded-r-lg">
              <p className="text-cyan-300 text-sm font-medium">🌉 Bridging Technique:</p>
              <p className="text-cyan-100 text-sm mt-1">{question.bridgingTechnique}</p>
            </div>
          )}
          
          {/* Full Answer with Structure/Layers/KeyProtections */}
          {question.fullAnswer && (
            <div className="bg-slate-700/50 rounded-lg p-4 space-y-3">
              <p className="text-blue-300 font-medium">{question.fullAnswer.structure}</p>

              {question.fullAnswer.layers && (
                <div className="space-y-2">
                  {question.fullAnswer.layers.map((layer: string, i: number) => (
                    <div key={i} className="bg-slate-800/50 rounded p-2 text-gray-300 text-sm flex items-start gap-2">
                      <span className="text-blue-400 font-bold">{i + 1}.</span>
                      <span>{layer}</span>
                    </div>
                  ))}
                </div>
              )}

              {question.fullAnswer.keyProtections && (
                <div className="mt-3">
                  <p className="text-emerald-400 text-sm font-semibold mb-2">Key Protections:</p>
                  <div className="space-y-1">
                    {question.fullAnswer.keyProtections.map((protection: string, i: number) => (
                      <p key={i} className="text-gray-300 text-sm flex items-start gap-2">
                        <span className="text-emerald-400">✓</span>
                        <span>{protection}</span>
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {question.fullAnswer.stablecoinClarification && (
                <div className="bg-amber-500/10 rounded p-3 mt-3">
                  <p className="text-amber-200 text-sm">⚠️ {question.fullAnswer.stablecoinClarification}</p>
                </div>
              )}
            </div>
          )}

          {/* Objection Handling */}
          {question.objectionHandling && (
            <div className="space-y-3">
              <p className="text-purple-300 font-medium">Objection Handling:</p>
              {question.objectionHandling.map((item: any, i: number) => (
                <div key={i} className="bg-purple-500/10 rounded-lg p-4">
                  <p className="text-red-300 text-sm font-medium mb-2">❓ "{item.objection}"</p>
                  <p className="text-emerald-200 text-sm">→ {item.response}</p>
                </div>
              ))}
            </div>
          )}

          {/* Do Not Say - handle both string and array */}
          {question.doNotSay && (
            <div className="bg-red-500/20 rounded-lg p-3">
              <p className="text-red-300 text-sm font-medium mb-2">❌ Don't say:</p>
              {Array.isArray(question.doNotSay) ? (
                <ul className="space-y-1">
                  {question.doNotSay.map((item: string, i: number) => (
                    <li key={i} className="text-red-200 text-sm">• {item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-red-200 text-sm">{question.doNotSay}</p>
              )}
            </div>
          )}

          {question.answer?.doNotSay && !question.doNotSay && (
            <div className="bg-red-500/20 rounded-lg p-3">
              <p className="text-red-300 text-sm">❌ <span className="font-medium">Don't say:</span> {question.answer.doNotSay}</p>
            </div>
          )}

          {/* Supporting Docs */}
          {question.supportingDocs && (
            <div className="bg-blue-500/10 rounded-lg p-3">
              <p className="text-blue-300 text-sm"><span className="font-medium">📄 Supporting docs:</span> {question.supportingDocs}</p>
            </div>
          )}

          {/* Honesty field */}
          {question.honesty && (
            <div className="bg-amber-500/10 border-l-4 border-amber-500 p-3 rounded-r-lg">
              <p className="text-amber-200 text-sm">🤝 {question.honesty}</p>
            </div>
          )}

          {/* Arnold Quote */}
          {question.arnoldQuote && (
            <div className="bg-purple-500/10 rounded-lg p-3">
              <p className="text-purple-200 text-sm italic">"{question.arnoldQuote}" — Arnold Lee</p>
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
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 text-sm mb-4">{data.subtitle}</p>}

      <div className="space-y-4">
        {data.items.map((item: any, i: number) => {
          const hasExpandedContent = item.sphereSpecificRisks || item.whatCanGoWrong;
          const isExpanded = expandedCategory === i;

          return (
            <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
              {/* Header - clickable if has expanded content */}
              <div
                className={`p-4 ${hasExpandedContent ? 'cursor-pointer hover:bg-slate-700/70' : ''}`}
                onClick={() => hasExpandedContent && setExpandedCategory(isExpanded ? null : i)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {item.icon && <span className="text-2xl">{item.icon}</span>}
                    <h4 className="font-semibold text-white">{item.category}</h4>
                  </div>
                  {hasExpandedContent && (
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  )}
                </div>

                {/* Definition (new field) */}
                {item.definition && (
                  <p className="text-gray-300 text-sm mb-2">{item.definition}</p>
                )}

                {/* Legacy description field */}
                {item.description && !item.definition && (
                  <p className="text-gray-300 text-sm mb-2">{item.description}</p>
                )}

                {/* Examples */}
                {item.examples && (
                  <div className="mb-2">
                    <p className="text-amber-300 text-xs font-semibold mb-1">Examples:</p>
                    <ul className="text-sm text-gray-400 space-y-1">
                      {item.examples.map((ex: string, j: number) => <li key={j}>• {ex}</li>)}
                    </ul>
                  </div>
                )}

                {item.context && (
                  <div className="bg-blue-500/10 rounded p-2 mt-2">
                    <p className="text-blue-200 text-xs">{item.context}</p>
                  </div>
                )}
              </div>

              {/* Expanded content */}
              {isExpanded && hasExpandedContent && (
                <div className="px-4 pb-4 space-y-4 border-t border-slate-600 pt-4">
                  {/* Sphere-Specific Risks */}
                  {item.sphereSpecificRisks && (
                    <div>
                      <h5 className="text-purple-300 font-semibold mb-3">🎯 Sphere-Specific Risks & Mitigations</h5>
                      <div className="space-y-3">
                        {item.sphereSpecificRisks.map((risk: any, j: number) => (
                          <div key={j} className="bg-slate-800/50 rounded-lg p-3">
                            <h6 className="text-white font-medium mb-1">{risk.risk}</h6>
                            <p className="text-gray-400 text-xs mb-2">{risk.description}</p>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div className="bg-emerald-500/10 rounded p-2">
                                <span className="text-emerald-400 font-semibold">Sphere Mitigation:</span>
                                <p className="text-gray-300 mt-1">{risk.sphereMitigation}</p>
                              </div>
                              <div className="bg-amber-500/10 rounded p-2">
                                <span className="text-amber-400 font-semibold">Residual Risk:</span>
                                <p className="text-gray-300 mt-1">{risk.residualRisk}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* What Can Go Wrong Scenarios */}
                  {item.whatCanGoWrong && (
                    <div>
                      <h5 className="text-red-300 font-semibold mb-4">⚠️ {item.whatCanGoWrong.title || 'Risk Scenarios'}</h5>
                      <div className="space-y-4">
                        {item.whatCanGoWrong.scenarios?.map((scenario: any, j: number) => (
                          <div key={j} className="bg-red-500/20 rounded-lg p-5">
                            <h6 className="text-white font-medium mb-3">{scenario.scenario}</h6>
                            <p className="text-gray-400 text-sm mb-4 leading-relaxed">{scenario.description}</p>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="bg-slate-700/50 rounded-lg p-3">
                                <span className="text-red-400 font-semibold block mb-1">Immediate Impact:</span>
                                <p className="text-gray-300 leading-relaxed">{scenario.immediateImpact}</p>
                              </div>
                              <div className="bg-slate-700/50 rounded-lg p-3">
                                <span className="text-emerald-400 font-semibold block mb-1">Sphere Response:</span>
                                <p className="text-gray-300 leading-relaxed">{scenario.sphereResponse}</p>
                              </div>
                              <div className="bg-slate-700/50 rounded-lg p-3">
                                <span className="text-blue-400 font-semibold block mb-1">Customer Impact:</span>
                                <p className="text-gray-300 leading-relaxed">{scenario.customerImpact}</p>
                              </div>
                              <div className="bg-slate-700/50 rounded-lg p-3">
                                <span className="text-purple-400 font-semibold block mb-1">Prevention:</span>
                                <p className="text-gray-300 leading-relaxed">{scenario.prevention}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
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
            <p className="text-gray-300 text-sm"><GlossaryText>{item.meaning || item.description}</GlossaryText></p>
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

  // Check if this is a frictions-style table (3 columns with long examples)
  const isFrictionsTable = data.title?.includes('Frictions') ||
    (headers.length === 3 && headers[2]?.toLowerCase().includes('example'));

  // Check if this is a convergence/comparison table with checkmarks
  const isConvergenceTable = data.title?.includes('Convergence') ||
    (headers.length > 3 && rows[0]?.some((cell: string) => cell?.includes('✅')));

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      {data.title && <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>}
      {data.subtitle && <p className="text-gray-400 text-sm mb-4">{data.subtitle}</p>}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-600">
              {headers.map((h: string, i: number) => (
                <th key={i} className={`px-4 py-3 text-left font-semibold bg-slate-700/50 ${
                  isFrictionsTable ? (
                    i === 0 ? 'text-amber-300 w-1/5' :
                    i === 1 ? 'text-red-300 w-1/5' :
                    'text-blue-300 w-3/5'
                  ) : isConvergenceTable ? (
                    i === 0 ? 'text-white' : 'text-center text-blue-300'
                  ) : (
                    i === 0 ? 'text-amber-300' : 'text-gray-300'
                  )
                }`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row: any[], i: number) => (
              <tr key={i} className="border-b border-slate-700/50 align-top">
                {row.map((cell, j) => (
                  <td key={j} className={`px-4 py-4 ${
                    isFrictionsTable ? (
                      j === 0 ? 'text-amber-300 font-semibold' :
                      j === 1 ? 'text-red-300 text-sm' :
                      ''
                    ) : isConvergenceTable ? (
                      j === 0 ? 'text-white font-medium' : 'text-center text-lg'
                    ) : 'text-gray-300'
                  }`}>
                    {isFrictionsTable && j === 2 ? (
                      <div className="bg-slate-700/30 rounded-lg p-3 text-gray-300 text-sm leading-relaxed italic">
                        {cell}
                      </div>
                    ) : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.source && <p className="text-gray-500 text-xs mt-4 italic">{data.source}</p>}
      {data.conclusion && <p className="text-gray-400 text-sm mt-4">{data.conclusion}</p>}
      {data.keyPoint && <p className="text-purple-300 text-sm mt-4 font-medium">{data.keyPoint}</p>}
      {data.direction && (
        <div className="bg-emerald-500/10 rounded-lg p-3 mt-4">
          <p className="text-emerald-300 font-medium">→ {data.direction}</p>
        </div>
      )}
      {data.note && <p className="text-gray-500 text-xs mt-4 italic">Note: {data.note}</p>}
    </div>
  );
}

function CaseStudyBlock({ data }: { data: any }) {
  return (
    <div className="bg-orange-500/10 rounded-xl p-6 space-y-4">
      <h3 className="font-semibold text-white text-xl">📋 {data.title}</h3>
      {data.subtitle && <p className="text-orange-200 text-sm italic">{data.subtitle}</p>}

      {/* Background section - AWS Outage style (event/duration/impact) */}
      {data.background && data.background.event && (
        <div className="bg-slate-700/50 rounded-lg p-4">
          <h4 className="font-semibold text-white mb-2">Background</h4>
          <div className="grid md:grid-cols-3 gap-3 text-sm">
            <div>
              <span className="text-gray-500">Event:</span>
              <p className="text-gray-300">{data.background.event}</p>
            </div>
            <div>
              <span className="text-gray-500">Duration:</span>
              <p className="text-red-300">{data.background.duration}</p>
            </div>
            <div>
              <span className="text-gray-500">Impact:</span>
              <p className="text-amber-300">{data.background.impact}</p>
            </div>
          </div>
        </div>
      )}

      {/* What Happened - for AWS style case studies */}
      {data.whatHappened && (
        <div>
          <h4 className="font-semibold text-white mb-2">What Happened</h4>
          <ul className="space-y-2">
            {data.whatHappened.map((item: string, i: number) => (
              <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                <span className="text-orange-400">•</span> {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Lessons Learned - for AWS style case studies */}
      {data.lessonsLearned && (
        <div>
          <h4 className="font-semibold text-white mb-3">Lessons Learned</h4>
          <div className="space-y-3">
            {data.lessonsLearned.map((item: any, i: number) => (
              <div key={i} className="bg-blue-500/10 rounded-lg p-3">
                <p className="text-blue-300 font-medium mb-1">{item.lesson}</p>
                <p className="text-gray-400 text-sm">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sphere Approach - for AWS style case studies */}
      {data.sphereApproach && (
        <div className="bg-emerald-500/10 rounded-lg p-4">
          <h4 className="text-emerald-300 font-semibold mb-2">{data.sphereApproach.title}</h4>
          {data.sphereApproach.response && (
            <ul className="space-y-1">
              {data.sphereApproach.response.map((item: string, i: number) => (
                <li key={i} className="text-gray-300 text-sm flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Background section - original style with title/status/characteristics */}
      {data.background && data.background.title && (
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
        <div className="mb-6">
          <h4 className="font-semibold text-white mb-4">Timeline</h4>
          <div className="space-y-4">
            {data.timeline.map((t: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-orange-500">
                <p className="font-semibold text-orange-300 mb-2">{t.time}</p>
                <p className="text-white text-sm mb-2">{t.event}</p>
                {t.context && <p className="text-gray-400 text-sm mb-2">{t.context}</p>}
                {t.impact && (
                  <p className="text-amber-300 text-sm"><span className="font-semibold">Impact:</span> {t.impact}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Insights section */}
      {data.keyInsights && (
        <div className="mb-6">
          <h4 className="font-semibold text-white mb-4">{data.keyInsights.title}</h4>
          <div className="space-y-4">
            {data.keyInsights.insights?.map((insight: any, i: number) => (
              <div key={i} className="bg-blue-500/20 rounded-lg p-4">
                <p className="text-blue-300 font-semibold mb-2">{insight.insight}</p>
                <p className="text-gray-300 text-sm leading-relaxed">{insight.explanation}</p>
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
        <div className="bg-emerald-500/10 rounded-lg p-3">
          <p className="text-emerald-200 text-sm"><span className="font-semibold">Post-Crisis:</span> {data.postCrisis}</p>
        </div>
      )}
    </div>
  );
}

function SystemicRiskBlock({ data }: { data: any }) {
  return (
    <div className="bg-red-500/20 rounded-xl p-6">
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
      {data.concept && <p className="text-gray-300 mb-6 leading-relaxed">{data.concept}</p>}

      {data.visualization && (
        <div className="flex justify-center gap-8 mb-6">
          {data.visualization.map((v: any, i: number) => (
            <div key={i} className={`rounded-lg p-5 text-center min-w-[160px] ${
              v.leg?.includes('Stablecoin')
                ? 'bg-emerald-500/20'
                : 'bg-amber-500/20'
            }`}>
              <p className={`text-sm mb-2 font-medium ${
                v.leg?.includes('Stablecoin') ? 'text-emerald-300' : 'text-amber-300'
              }`}>{v.leg}</p>
              <p className="text-2xl font-bold text-white">{v.time}</p>
              {v.finality && <p className="text-xs text-gray-400 mt-2">{v.finality}</p>}
            </div>
          ))}
        </div>
      )}

      {data.problem && (
        <div className="bg-amber-500/20 rounded-lg p-4 mb-6">
          <p className="text-amber-300 font-medium">{data.problem}</p>
        </div>
      )}

      {data.detailedScenarios && (
        <div className="space-y-4 mb-6">
          <h4 className="font-semibold text-white mb-4">{data.detailedScenarios.title}</h4>
          {data.detailedScenarios.scenarios?.map((scenario: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-5 border-l-4 border-red-500">
              <p className="text-red-300 font-semibold mb-3">{scenario.scenario}</p>
              <p className="text-gray-300 text-sm mb-3 leading-relaxed">{scenario.setup}</p>
              <p className="text-amber-300 text-sm mb-3"><span className="font-semibold">Problem:</span> {scenario.problem}</p>
              <p className="text-gray-400 text-sm mb-3"><span className="font-semibold">Consequence:</span> {scenario.consequence}</p>
              <p className="text-red-200 text-sm font-medium mt-4 pt-3 border-t border-red-500/30">⚠️ {scenario.risk}</p>
            </div>
          ))}
        </div>
      )}

      {data.whatCanGoWrong && (
        <div className="bg-red-500/20 rounded-lg p-5">
          <p className="font-medium text-red-300 mb-3">What can go wrong:</p>
          <ul className="text-gray-300 text-sm space-y-2">
            {data.whatCanGoWrong.map((w: string, i: number) => <li key={i} className="leading-relaxed">• {w}</li>)}
          </ul>
        </div>
      )}

      {data.theProblem && (
        <div className="bg-purple-500/10 rounded-lg p-5 mt-6">
          <p className="text-purple-200 font-medium leading-relaxed">{data.theProblem}</p>
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
        <div className="mb-6">
          <h4 className="font-semibold text-white mb-4">{data.timingDifferences.title}</h4>
          <p className="text-gray-300 mb-4 leading-relaxed">{data.timingDifferences.explanation}</p>
          <div className="space-y-3">
            {data.timingDifferences.timeline?.map((event: any, i: number) => (
              <div key={i} className="flex gap-4 items-start bg-slate-700/50 rounded-lg p-4">
                <span className="text-blue-300 text-sm font-mono min-w-[130px] bg-blue-500/20 px-2 py-1 rounded">{event.time}</span>
                <div className="flex-1">
                  <p className="text-gray-300 text-sm leading-relaxed">{event.event}</p>
                  <p className="text-gray-500 text-sm mt-1">{event.ledger} - <span className="text-amber-300">{event.status}</span></p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-red-500/20 rounded-lg p-4 mt-4">
            <p className="text-red-200 text-sm font-medium leading-relaxed">{data.timingDifferences.gap}</p>
          </div>
        </div>
      )}
      
      {data.requirement && (
        <div className="bg-purple-500/10 rounded-lg p-4">
          <p className="text-purple-200">{data.requirement}</p>
        </div>
      )}

      {/* Risk-to-Control Mapping */}
      {data.riskControlMapping && (
        <div className="mt-6 bg-gradient-to-r from-red-500/10 to-emerald-500/10 rounded-xl p-5 border border-slate-600">
          <h4 className="text-white font-semibold text-lg mb-2">{data.riskControlMapping.title}</h4>
          <p className="text-gray-400 text-sm mb-4">{data.riskControlMapping.introduction}</p>

          <div className="space-y-4">
            {data.riskControlMapping.mappings?.map((mapping: any, i: number) => (
              <div key={i} className="bg-slate-800/70 rounded-lg p-4 border-l-4 border-red-500/50">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-red-300 font-medium">⚠️ Risk: {mapping.risk}</p>
                    <p className="text-gray-500 text-xs mt-1">Ledgers affected: {mapping.ledgersAffected?.join(', ')}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    mapping.severity?.includes('Critical') ? 'bg-red-500/30 text-red-300' :
                    mapping.severity?.includes('Medium') ? 'bg-amber-500/30 text-amber-300' :
                    'bg-blue-500/30 text-blue-300'
                  }`}>
                    {mapping.severity}
                  </span>
                </div>

                <div className="bg-emerald-500/10 rounded-lg p-3 mb-2">
                  <p className="text-emerald-400 text-sm font-medium mb-1">✅ Control: {mapping.control}</p>
                  <p className="text-gray-300 text-sm">{mapping.howItWorks}</p>
                </div>

                {mapping.fallback && (
                  <div className="bg-blue-500/10 rounded p-2">
                    <p className="text-blue-300 text-xs">🔄 Fallback: {mapping.fallback}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {data.riskControlMapping.exerciseGuidance && (
            <div className="mt-4 bg-purple-500/10 rounded-lg p-3 border border-purple-500/30">
              <p className="text-purple-200 text-sm">📝 {data.riskControlMapping.exerciseGuidance}</p>
            </div>
          )}
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
          <div key={i} className={`rounded-lg p-4 ${i === 0 ? 'bg-red-500/20' : 'bg-emerald-500/10'}`}>
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
    <div className="bg-purple-500/10 rounded-xl p-6">
      <h3 className="font-semibold text-white mb-3">{data.title}</h3>
      
      {/* Handle introduction */}
      {data.introduction && <p className="text-purple-200 mb-4">{data.introduction}</p>}
      
      {data.principle && <p className="text-purple-300 font-medium mb-2">{data.principle}</p>}
      {data.philosophy && <p className="text-purple-200 italic mb-2">{data.philosophy}</p>}
      {data.statement && <p className="text-purple-300 font-medium mb-2">{data.statement}</p>}
      {data.explanation && <p className="text-gray-300 mb-3">{data.explanation}</p>}
      
      {/* Operational Controls */}
      {data.operationalControls && (
        <div className="mb-6">
          <h4 className="font-semibold text-white mb-4">{data.operationalControls.title}</h4>
          <div className="space-y-4">
            {data.operationalControls.controls?.map((control: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-5 border-l-4 border-blue-500">
                <p className="text-blue-300 font-semibold mb-3">{control.control}</p>
                <p className="text-gray-300 text-sm mb-3"><span className="font-semibold text-white">What:</span> {control.what}</p>
                <p className="text-gray-300 text-sm mb-3"><span className="font-semibold text-white">How:</span> {control.how}</p>
                <div className="bg-emerald-500/20 rounded-lg p-3 mt-3">
                  <p className="text-emerald-300 text-sm">✅ <span className="font-semibold">Prevents:</span> {control.preventedRisk}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Settlement Windows */}
      {data.settlementsWindows && (
        <div className="mb-6 bg-slate-700/30 rounded-lg p-6">
          <h4 className="font-semibold text-white mb-4">{data.settlementsWindows.title}</h4>
          <p className="text-gray-300 text-sm mb-5 leading-relaxed">{data.settlementsWindows.explanation}</p>
          <div className="space-y-4">
            {data.settlementsWindows.windows?.map((window: any, i: number) => (
              <div key={i} className="flex justify-between items-center bg-slate-600/50 rounded-lg p-4 border-l-4 border-blue-500">
                <div className="flex-1">
                  <p className="text-white text-sm font-semibold mb-2">{window.system}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{window.hours}</p>
                </div>
                <span className="text-amber-300 text-sm bg-amber-500/20 px-4 py-2 rounded-lg font-mono">{window.cutOff}</span>
              </div>
            ))}
          </div>
          <div className="bg-blue-500/10 rounded-lg p-4 mt-5">
            <p className="text-blue-200 text-sm font-medium leading-relaxed">{data.settlementsWindows.strategy}</p>
          </div>
        </div>
      )}

      {/* Safety First Examples */}
      {data.safetyFirstExamples && (
        <div className="mb-6">
          <h4 className="font-semibold text-white mb-4">{data.safetyFirstExamples.title}</h4>
          <div className="space-y-4">
            {data.safetyFirstExamples.examples?.map((example: any, i: number) => (
              <div key={i} className="bg-emerald-500/20 rounded-lg p-5">
                <p className="text-emerald-300 font-semibold mb-3">{example.situation}</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-red-500/20 rounded p-2">
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
                <div className="bg-red-500/20 rounded p-2">
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
        <div className="bg-blue-500/10 rounded-lg p-4 mb-4">
          <h4 className="text-blue-300 font-semibold mb-2">{data.clarifications.title}</h4>
          <ul className="text-gray-300 space-y-1 text-sm">
            {data.clarifications.points?.map((point: string, i: number) => (
              <li key={i}>• {point}</li>
            ))}
          </ul>
        </div>
      )}
      
      {/* NEW: Handle strategies array (for detailed Sphere approach sections) */}
      {data.strategies && (
        <div className="space-y-4 mb-4">
          {data.strategies.map((strategy: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-purple-500">
              <h4 className="text-purple-300 font-semibold mb-2">{strategy.strategy || strategy.what}</h4>
              {strategy.what && <p className="text-gray-300 text-sm mb-3">{strategy.what}</p>}
              
              {strategy.howItWorks && Array.isArray(strategy.howItWorks) && (
                <div className="bg-slate-600/50 rounded p-3 mb-3">
                  <p className="text-blue-300 font-semibold text-sm mb-2">How It Works:</p>
                  <ul className="text-gray-300 text-sm space-y-1">
                    {strategy.howItWorks.map((item: string, j: number) => (
                      <li key={j}>• {item}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {strategy.whyItMatters && (
                <p className="text-emerald-300 text-sm mb-2">💡 <span className="font-semibold">Why it matters:</span> {strategy.whyItMatters}</p>
              )}
              
              {strategy.example && (
                <p className="text-blue-200 text-xs bg-blue-500/10 rounded p-2">📋 Example: {strategy.example}</p>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Handle keyPoint */}
      {data.keyPoint && (
        <div className="bg-purple-500/20 rounded-lg p-3 mb-4">
          <p className="text-purple-200 font-medium">{data.keyPoint}</p>
        </div>
      )}
      
      {/* Handle competitiveAdvantage */}
      {data.competitiveAdvantage && (
        <p className="text-emerald-300 text-sm mb-3">🏆 {data.competitiveAdvantage}</p>
      )}
      
      {/* Handle languageGuide within sphereApproach */}
      {data.languageGuide && (
        <div className="grid md:grid-cols-2 gap-3 mb-4">
          <div className="bg-red-500/20 rounded p-3">
            <p className="text-red-300 text-sm font-semibold mb-2">❌ Don't Say:</p>
            <ul className="text-gray-300 text-xs space-y-1">
              {data.languageGuide.wrong?.map((item: string, i: number) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-emerald-500/10 rounded p-3">
            <p className="text-emerald-300 text-sm font-semibold mb-2">✅ Do Say:</p>
            <ul className="text-gray-300 text-xs space-y-1">
              {data.languageGuide.correct?.map((item: string, i: number) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {/* Handle targetCustomers */}
      {data.targetCustomers && (
        <div className="mb-4">
          <h4 className="text-white font-semibold mb-2">Target Customers</h4>
          <div className="grid md:grid-cols-2 gap-2">
            {data.targetCustomers.map((customer: any, i: number) => (
              <div key={i} className="bg-slate-600/50 rounded p-2">
                <p className="text-purple-300 text-sm font-semibold">{customer.segment}</p>
                <p className="text-gray-400 text-xs">{customer.need}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Handle real-world example */}
      {data.realWorldExample && (
        <div className="bg-slate-700/50 rounded-lg p-4">
          <h4 className="text-white font-semibold mb-3">{data.realWorldExample.title}</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-500/20 rounded p-3">
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
            <div className="bg-emerald-500/10 rounded p-3">
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

      {/* Handle Sphere Position (Travel Rule consolidated view) */}
      {data.philosophy && (
        <div className="bg-purple-500/20 rounded-lg p-4 mb-4">
          <p className="text-purple-200 font-medium">🎯 {data.philosophy}</p>
        </div>
      )}

      {data.keyDifferentiators && (
        <div className="space-y-4 mb-4">
          <h4 className="text-white font-semibold">Key Differentiators</h4>
          {data.keyDifferentiators.map((diff: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-emerald-500">
              <p className="text-emerald-300 font-semibold mb-2">{diff.differentiator}</p>
              <p className="text-gray-300 text-sm mb-3">{diff.description}</p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-amber-500/10 rounded p-2">
                  <p className="text-amber-300 text-xs font-semibold mb-1">⚠️ vs Competitors:</p>
                  <p className="text-gray-400 text-xs">{diff.vsCompetitors}</p>
                </div>
                <div className="bg-blue-500/10 rounded p-2">
                  <p className="text-blue-300 text-xs font-semibold mb-1">✅ Customer Benefit:</p>
                  <p className="text-gray-400 text-xs">{diff.customerBenefit}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {data.enterpriseReadiness && (
        <div className="bg-emerald-500/10 rounded-lg p-4 mb-4">
          <h4 className="text-emerald-300 font-semibold mb-3">{data.enterpriseReadiness.title}</h4>
          <ul className="space-y-2">
            {data.enterpriseReadiness.points?.map((point: string, i: number) => (
              <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                <span className="text-emerald-400">✓</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.commonQuestion && (
        <div className="bg-blue-500/10 rounded-lg p-4 mb-4">
          <p className="text-blue-300 font-semibold mb-3">❓ {data.commonQuestion.question}</p>
          {Array.isArray(data.commonQuestion.answer) ? (
            <ol className="space-y-2 mb-3">
              {data.commonQuestion.answer.map((step: string, i: number) => (
                <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                  <span className="text-blue-400 font-semibold min-w-[20px]">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-gray-300 text-sm mb-3">{data.commonQuestion.answer}</p>
          )}
          {data.commonQuestion.footer && (
            <p className="text-blue-200 text-xs italic">📋 {data.commonQuestion.footer}</p>
          )}
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
      <h3 className="font-semibold text-white mb-2">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}
      <div className="space-y-2">
        {data.items?.map((item: any, i: number) => (
          <div key={i} className="flex items-center justify-between bg-slate-700/50 rounded-lg p-3">
            <div className="flex items-center gap-3">
              <span className="text-xl">{item.jurisdiction}</span>
              <span className="text-gray-300">{item.framework}</span>
            </div>
            <div className="flex items-center gap-2">
              {item.sphereFocus && (
                <span className={`text-xs px-2 py-1 rounded font-semibold ${
                  item.sphereFocus.includes('ANCHOR') ? 'bg-emerald-500/30 text-emerald-300' :
                  item.sphereFocus.includes('PRIMARY') ? 'bg-purple-500/30 text-purple-300' :
                  item.sphereFocus.includes('STRATEGIC') ? 'bg-amber-500/30 text-amber-300' :
                  'bg-blue-500/20 text-blue-300'
                }`}>
                  {item.sphereFocus}
                </span>
              )}
              <span className={`text-xs px-2 py-1 rounded ${item.status === 'Enforced' || item.status === 'Enacted' || item.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                {item.status}
              </span>
            </div>
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
      <h3 className="font-semibold text-white mb-2">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-6 leading-relaxed">{data.subtitle}</p>}

      <div className="space-y-4">
        {data.stages?.map((s: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-white">{s.stage}</span>
              <span className="text-gray-400 text-sm">{s.period}</span>
            </div>
            <p className="text-gray-300 text-sm mb-2">{s.description}</p>
            {s.context && <p className="text-gray-400 text-sm leading-relaxed mb-2">{s.context}</p>}
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
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-6 leading-relaxed">{data.subtitle}</p>}

      <div className="space-y-4">
        {data.items?.map((item: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-5">
            <p className="font-semibold text-white mb-3">{item.useCase}</p>
            {item.context && <p className="text-gray-400 text-sm leading-relaxed mb-3">{item.context}</p>}
            {item.pain && (
              <div className="bg-red-500/20 rounded p-3 mb-3">
                <p className="text-red-300 text-sm leading-relaxed"><span className="font-semibold">Pain Point:</span> {item.pain}</p>
              </div>
            )}
            {item.painPoint && (
              <div className="bg-red-500/20 rounded p-3 mb-3">
                <p className="text-red-300 text-sm leading-relaxed"><span className="font-semibold">Pain Point:</span> {item.painPoint}</p>
              </div>
            )}
            {item.solution && (
              <div className="bg-emerald-500/20 rounded p-3 mb-3">
                <p className="text-emerald-300 text-sm leading-relaxed"><span className="font-semibold">Solution:</span> {item.solution}</p>
              </div>
            )}
            {item.sphereSolution && (
              <div className="bg-emerald-500/20 rounded p-3">
                <p className="text-emerald-300 text-sm leading-relaxed"><span className="font-semibold">How Sphere Solves It:</span> {item.sphereSolution}</p>
              </div>
            )}
            {item.benefit && <p className="text-blue-300 text-sm leading-relaxed mt-3">{item.benefit}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

function UnbankedBlock({ data }: { data: any }) {
  return (
    <div className="bg-blue-500/10 rounded-xl p-6 text-center">
      <h3 className="font-semibold text-white mb-3">{data.title}</h3>
      <p className="text-4xl font-bold text-blue-400 mb-2">{data.stat}</p>
      <p className="text-gray-300">{data.explanation}</p>
      {data.conclusion && <p className="text-blue-300 mt-3 font-medium">{data.conclusion}</p>}
    </div>
  );
}

function WhatSphereBlock({ data, isNot }: { data: any; isNot: boolean }) {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  
  // Handle new expanded format with categories array
  if (data.categories) {
    return (
      <div className={`rounded-xl p-6 ${isNot ? 'bg-red-500/20' : 'bg-emerald-500/10'}`}>
        <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
        {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}
        
        <div className="space-y-2">
          {data.categories.map((cat: any, i: number) => (
            <div key={i} className="bg-slate-800/50 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedItem(expandedItem === i ? null : i)}
                className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-700/50"
              >
                <div className="flex items-center gap-3">
                  {cat.icon && <span className="text-2xl">{cat.icon}</span>}
                  <div>
                    <span className={`font-medium ${isNot ? 'text-red-300' : 'text-white'}`}>
                      {cat.classification || cat.notThis}
                    </span>
                    {cat.jurisdiction && <p className="text-gray-500 text-xs">{cat.jurisdiction}</p>}
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedItem === i ? 'rotate-180' : ''}`} />
              </button>
              {expandedItem === i && (
                <div className="px-4 pb-4 space-y-3">
                  {cat.fatfContext && (
                    <p className="text-blue-300 text-sm bg-blue-500/10 rounded p-2">ℹ️ {cat.fatfContext}</p>
                  )}
                  {cat.whatItMeans && <p className="text-gray-300 text-sm">{cat.whatItMeans}</p>}
                  {cat.whatThatIs && <p className="text-gray-300 text-sm">{cat.whatThatIs}</p>}
                  {cat.howSphereDiffers && (
                    <div>
                      <p className="text-gray-500 text-xs mb-1">How Sphere Differs:</p>
                      <ul className="text-emerald-300 text-xs space-y-0.5">
                        {cat.howSphereDiffers.map((d: string, j: number) => <li key={j}>✓ {d}</li>)}
                      </ul>
                    </div>
                  )}
                  {cat.sphereStatus && <p className="text-emerald-300 text-sm"><span className="text-gray-500">Status:</span> {cat.sphereStatus}</p>}

                  {/* VASP Five Activities */}
                  {cat.fiveActivities && (
                    <div className="bg-slate-700/50 rounded-lg p-3 mt-2">
                      <p className="text-gray-400 text-xs font-semibold mb-2">{cat.fiveActivities.title}</p>
                      <div className="space-y-1.5">
                        {cat.fiveActivities.activities?.map((a: any, j: number) => (
                          <div key={j} className="flex items-start gap-2 text-xs">
                            <span className={a.sphereRelevance?.toLowerCase().includes('no') ? 'text-gray-500' : a.sphereRelevance?.toLowerCase().includes('minimal') ? 'text-yellow-400' : 'text-emerald-400'}>
                              {a.sphereRelevance?.toLowerCase().includes('no') ? '○' : a.sphereRelevance?.toLowerCase().includes('minimal') ? '◐' : '●'}
                            </span>
                            <div>
                              <span className="text-gray-300">{a.activity}</span>
                              <span className="text-gray-500 ml-1">({a.example})</span>
                              <span className={`ml-2 ${a.sphereRelevance?.toLowerCase().includes('no') ? 'text-gray-500' : a.sphereRelevance?.toLowerCase().includes('minimal') ? 'text-yellow-400' : 'text-emerald-400'}`}>
                                → {a.sphereRelevance}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {cat.keyObligations && (
                    <div className="flex flex-wrap gap-1">
                      {cat.keyObligations.map((o: string, j: number) => (
                        <span key={j} className="text-xs bg-slate-700 text-gray-300 px-2 py-0.5 rounded">{o}</span>
                      ))}
                    </div>
                  )}

                  {/* State Variations (Money Transmitter) */}
                  {cat.stateVariations && (
                    <div className="bg-slate-700/50 rounded-lg p-3 mt-2">
                      <p className="text-gray-400 text-xs font-semibold mb-2">State Variations</p>
                      <div className="space-y-1">
                        {cat.stateVariations.map((sv: any, j: number) => (
                          <div key={j} className="flex items-center justify-between text-xs bg-slate-600/50 rounded p-2">
                            <span className="text-white font-medium">{sv.state}</span>
                            <span className="text-gray-300">{sv.requirement}</span>
                            {sv.note && <span className="text-gray-500 italic">({sv.note})</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Key Areas (SOC 2) */}
                  {cat.keyAreas && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {cat.keyAreas.map((area: string, j: number) => (
                        <span key={j} className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">{area}</span>
                      ))}
                    </div>
                  )}

                  {/* Business Implications (B2B) */}
                  {cat.businessImplications && (
                    <div className="mt-2">
                      <p className="text-gray-500 text-xs mb-1">Business Implications:</p>
                      <ul className="text-gray-300 text-xs space-y-0.5">
                        {cat.businessImplications.map((bi: string, j: number) => <li key={j}>• {bi}</li>)}
                      </ul>
                    </div>
                  )}

                  {/* Competitive Advantage */}
                  {cat.competitiveAdvantage && (
                    <p className="text-emerald-300 text-xs bg-emerald-500/10 rounded p-2 mt-2">🏆 {cat.competitiveAdvantage}</p>
                  )}

                  {/* VASP Common Misconceptions */}
                  {cat.commonMisconceptions && (
                    <div className="bg-amber-500/10 rounded-lg p-3 mt-2">
                      <p className="text-amber-400 text-xs font-semibold mb-2">Common Misconceptions</p>
                      <div className="space-y-2">
                        {cat.commonMisconceptions.map((m: any, j: number) => (
                          <div key={j} className="text-xs">
                            <p className="text-red-300">❌ {m.wrong}</p>
                            <p className="text-emerald-300">✓ {m.right}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* VASP By Jurisdiction */}
                  {cat.byJurisdiction && (
                    <div className="bg-blue-500/10 rounded-lg p-3 mt-2">
                      <p className="text-blue-400 text-xs font-semibold mb-2">By Jurisdiction</p>
                      <div className="grid grid-cols-1 gap-1">
                        {cat.byJurisdiction.map((j: any, k: number) => (
                          <div key={k} className="text-xs flex">
                            <span className="text-gray-400 w-20 shrink-0">{j.jurisdiction}:</span>
                            <span className="text-gray-300">{j.treatment}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {cat.whyItMatters && <p className="text-blue-300 text-xs"><span className="text-gray-500">Why it matters:</span> {cat.whyItMatters}</p>}
                  {cat.whyDistinctionMatters && <p className="text-amber-300 text-xs"><span className="text-gray-500">Why distinction matters:</span> {cat.whyDistinctionMatters}</p>}
                  {cat.wrongFraming && <p className="text-red-300 text-xs">❌ Wrong: "{cat.wrongFraming}"</p>}
                  {cat.rightFraming && <p className="text-emerald-300 text-xs">✓ Right: "{cat.rightFraming}"</p>}
                  {cat.penalties && <p className="text-red-300 text-xs"><span className="text-gray-500">Penalties:</span> {cat.penalties}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {data.currentStats && (
          <div className="mt-4 pt-4 border-t border-slate-700">
            <h4 className="text-white font-medium mb-2">{data.currentStats.title}</h4>
            <div className="grid grid-cols-3 gap-3">
              {data.currentStats.stats?.map((s: any, i: number) => (
                <div key={i} className="bg-slate-800 rounded p-3 text-center">
                  <p className="text-emerald-400 font-bold text-lg">{s.value}</p>
                  <p className="text-gray-400 text-xs">{s.metric}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {data.summaryTable && (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-700">
                  {data.summaryTable.headers?.map((h: string, i: number) => (
                    <th key={i} className="p-2 text-left text-gray-300">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.summaryTable.rows?.map((row: string[], i: number) => (
                  <tr key={i} className="border-t border-slate-700">
                    {row.map((cell: string, j: number) => (
                      <td key={j} className={`p-2 ${j === 0 ? 'text-white' : 'text-gray-400'}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
  
  // Original simple format with items array
  return (
    <div className={`rounded-xl p-6 ${isNot ? 'bg-red-500/20' : 'bg-emerald-500/10'}`}>
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
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>

      {data.approaches && (
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {data.approaches.map((a: any, i: number) => {
            const isAfterThought = a.icon === '❌';
            const isBoltOn = a.icon === '⚠️';

            return (
              <div
                key={i}
                className={`rounded-lg p-4 border-l-4 ${
                  isAfterThought ? 'bg-slate-700/50 border-red-500' :
                  isBoltOn ? 'bg-slate-700/50 border-amber-500' :
                  'bg-slate-700/50 border-emerald-500'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span>{a.icon}</span>
                  <h4 className="text-white font-medium">{a.approach}</h4>
                </div>
                <p className="text-gray-400 text-sm mb-2">{a.description}</p>
                <p className={`text-sm ${
                  isAfterThought ? 'text-red-400' :
                  isBoltOn ? 'text-amber-400' :
                  'text-emerald-400'
                }`}>{a.result}</p>
                {a.problems && (
                  <ul className="mt-2 space-y-1">
                    {a.problems.map((p: string, j: number) => (
                      <li key={j} className="text-gray-400 text-xs">• {p}</li>
                    ))}
                  </ul>
                )}
                {a.advantages && (
                  <ul className="mt-2 space-y-1">
                    {a.advantages.map((adv: string, j: number) => (
                      <li key={j} className="text-gray-300 text-xs">✓ {adv}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      )}

      {data.whatItMeans && Array.isArray(data.whatItMeans) && (
        <div>
          <h4 className="text-white font-medium mb-3">What Compliance-Native Means in Practice</h4>
          <div className="space-y-2">
            {data.whatItMeans.map((w: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-3">
                {typeof w === 'string' ? (
                  <p className="text-gray-300 text-sm">• {w}</p>
                ) : (
                  <>
                    <p className="text-white text-sm mb-1">{w.principle}</p>
                    <p className="text-gray-400 text-sm">{w.explanation}</p>
                    {w.implementation && (
                      <p className="text-emerald-400 text-sm mt-1">→ {w.implementation}</p>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.arnoldQuote && (
        <div className="mt-4 bg-slate-700/50 rounded-lg p-4">
          <p className="text-gray-200 italic">"{data.arnoldQuote.quote}"</p>
          {data.arnoldQuote.context && <p className="text-gray-500 text-sm mt-2">— {data.arnoldQuote.context}</p>}
        </div>
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
        <div className="bg-red-500/20 rounded-lg p-3 mb-3">
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
            <div className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-lg text-sm font-medium ">
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

function HighRiskBlock({ data }: { data: any }) {
  return (
    <div className="bg-red-500/20 rounded-xl p-6">
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
    <div className="bg-purple-500/10 rounded-xl p-6">
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
      <h3 className="font-semibold text-white mb-2">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 text-sm mb-2">{data.subtitle}</p>}
      {data.philosophy && (
        <div className="bg-purple-500/10 rounded p-3 mb-4">
          <p className="text-purple-300 text-sm italic">💡 {data.philosophy}</p>
        </div>
      )}
      <div className="space-y-3">
        {data.layers?.map((layer: any, i: number) => (
          <div key={i} className={`rounded-lg p-4 border-l-4 ${
            i === 0 ? 'bg-blue-500/10 border-blue-500' :
            i === 1 ? 'bg-amber-500/10 border-amber-500' :
            i === 2 ? 'bg-red-500/20 border-red-500' :
            'bg-emerald-500/10 border-emerald-500'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {layer.icon && <span className="text-xl">{layer.icon}</span>}
              <p className="text-white font-semibold">{layer.layer}</p>
            </div>
            <p className="text-gray-300 text-sm mb-2">{layer.description}</p>
            {layer.examples && (
              <p className="text-gray-400 text-xs mb-2">Examples: {layer.examples.join(', ')}</p>
            )}
            {layer.sphereExample && (
              <div className="bg-slate-800/50 rounded p-2 mt-2">
                <p className="text-emerald-300 text-xs"><span className="font-semibold">Sphere:</span> {layer.sphereExample}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function CertificationsBlock({ data }: { data: any }) {
  return (
    <div className="bg-emerald-500/10 rounded-xl p-6">
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
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4">{data.title}</h3>
      <div className="space-y-4">
        {data.types?.map((item: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              className="w-full p-4 flex items-center justify-between hover:bg-slate-700/70 transition-colors"
            >
              <div className="flex items-center gap-3">
                {item.icon && <span className="text-2xl">{item.icon}</span>}
                <div className="text-left">
                  <p className="text-white font-medium">{item.type}</p>
                  <p className="text-gray-400 text-sm">{item.role}</p>
                </div>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expanded === i ? 'rotate-180' : ''}`} />
            </button>

            {expanded === i && (
              <div className="p-4 pt-0 border-t border-slate-600">
                {/* Specific Risks */}
                {item.specificRisks && (
                  <div className="mb-4">
                    <p className="text-red-300 font-medium text-sm mb-2">Specific Risks:</p>
                    <div className="space-y-2">
                      {item.specificRisks.map((risk: any, j: number) => (
                        <div key={j} className="bg-red-500/20 rounded p-3">
                          <p className="text-white text-sm font-medium">{risk.risk}</p>
                          {risk.example && <p className="text-gray-400 text-xs">Example: {risk.example}</p>}
                          <p className="text-emerald-300 text-xs mt-1">Mitigation: {risk.mitigation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sphere Approach */}
                {item.sphereApproach && (
                  <div className="bg-purple-500/10 rounded p-3">
                    <p className="text-purple-300 font-medium text-sm mb-2">Sphere's Approach:</p>
                    <div className="space-y-1 text-sm">
                      {item.sphereApproach.strategy && <p className="text-gray-300"><span className="text-gray-500">Strategy:</span> {item.sphereApproach.strategy}</p>}
                      {item.sphereApproach.limits && <p className="text-gray-300"><span className="text-gray-500">Limits:</span> {item.sphereApproach.limits}</p>}
                      {item.sphereApproach.monitoring && <p className="text-gray-300"><span className="text-gray-500">Monitoring:</span> {item.sphereApproach.monitoring}</p>}
                      {item.sphereApproach.selection && <p className="text-gray-300"><span className="text-gray-500">Selection:</span> {item.sphereApproach.selection}</p>}
                      {item.sphereApproach.exposure && <p className="text-gray-300"><span className="text-gray-500">Exposure:</span> {item.sphereApproach.exposure}</p>}
                      {item.sphereApproach.requirements && <p className="text-gray-300"><span className="text-gray-500">Requirements:</span> {item.sphereApproach.requirements}</p>}
                      {item.sphereApproach.onboarding && <p className="text-gray-300"><span className="text-gray-500">Onboarding:</span> {item.sphereApproach.onboarding}</p>}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Fallback for old structure */}
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
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2">{data.title}</h3>
      {data.philosophy && (
        <p className="text-purple-300 italic text-sm mb-4">"{data.philosophy}"</p>
      )}
      <div className="grid md:grid-cols-2 gap-4">
        {data.dimensions?.map((dim: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              className="w-full p-4 text-left hover:bg-slate-700/70 transition-colors"
            >
              <div className="flex items-center gap-2 mb-1">
                {dim.icon && <span className="text-xl">{dim.icon}</span>}
                <p className="text-white font-medium">{dim.dimension}</p>
              </div>
              {dim.purpose && <p className="text-gray-400 text-sm">{dim.purpose}</p>}
            </button>

            {expanded === i && (
              <div className="p-4 pt-0 border-t border-slate-600 space-y-3">
                {/* Checks */}
                {dim.checks && (
                  <div>
                    <p className="text-emerald-300 font-medium text-xs mb-1">What to Check:</p>
                    <ul className="text-gray-300 text-sm space-y-1">
                      {dim.checks.map((c: string, j: number) => (
                        <li key={j} className="flex items-center gap-2">
                          <span className="text-emerald-400">✓</span> {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Red Flags */}
                {dim.redFlags && (
                  <div>
                    <p className="text-red-300 font-medium text-xs mb-1">Red Flags:</p>
                    <ul className="text-gray-300 text-sm space-y-1">
                      {dim.redFlags.map((rf: string, j: number) => (
                        <li key={j} className="flex items-center gap-2">
                          <span className="text-red-400">⚠</span> {rf}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Frequency */}
                {dim.frequency && (
                  <p className="text-blue-300 text-xs">📅 {dim.frequency}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Third Party Risk Management Block (Pillar 4.2)
function ThirdPartyRiskManagementBlock({ data }: { data: any }) {
  const [expandedArea, setExpandedArea] = useState<string | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-purple-300 text-sm mb-2">{data.subtitle}</p>}
      {data.philosophy && <p className="text-gray-400 text-sm mb-4 italic">"{data.philosophy}"</p>}

      {/* Objectives */}
      {data.objectives && (
        <div className="mb-6">
          <h4 className="text-emerald-300 font-medium mb-2">Program Objectives</h4>
          <ul className="space-y-1">
            {data.objectives.map((obj: string, i: number) => (
              <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">✓</span> {obj}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Risk Categories */}
      {data.riskCategories && (
        <div className="mb-6">
          <h4 className="text-amber-300 font-medium mb-3">Risk Categories Assessed</h4>
          <div className="grid md:grid-cols-2 gap-2">
            {data.riskCategories.map((cat: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-3">
                <p className="text-white text-sm font-medium">{cat.category}</p>
                <p className="text-gray-400 text-xs">{cat.assessment}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Due Diligence Areas */}
      {data.dueDiligenceAreas && (
        <div className="mb-6">
          <h4 className="text-blue-300 font-medium mb-3">Due Diligence Areas</h4>
          <div className="space-y-2">
            {data.dueDiligenceAreas.map((area: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedArea(expandedArea === area.area ? null : area.area)}
                  className="w-full p-3 text-left flex justify-between items-center hover:bg-slate-700 transition"
                >
                  <span className="text-white text-sm font-medium">{area.area}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedArea === area.area ? 'rotate-180' : ''}`} />
                </button>
                {expandedArea === area.area && (
                  <div className="px-3 pb-3">
                    <p className="text-gray-400 text-xs">{area.questions}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Approval Process */}
      {data.approvalProcess && (
        <div className="mb-6">
          <h4 className="text-purple-300 font-medium mb-3">Approval Process</h4>
          <div className="bg-purple-500/10 rounded-lg p-4">
            <p className="text-gray-400 text-xs font-semibold mb-2">Requirements before vendor engagement:</p>
            <ul className="space-y-1 mb-3">
              {data.approvalProcess.requirements.map((req: string, i: number) => (
                <li key={i} className="text-gray-300 text-sm">• {req}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              <span className="text-gray-400 text-xs">Risk Ratings:</span>
              {data.approvalProcess.residualRiskRatings.map((rating: string, i: number) => (
                <span key={i} className="bg-slate-600/50 text-gray-300 text-xs px-2 py-0.5 rounded">{rating}</span>
              ))}
            </div>
            <p className="text-gray-500 text-xs mt-2">{data.approvalProcess.ratingImpact}</p>
          </div>
        </div>
      )}

      {/* Contract Requirements */}
      {data.contractRequirements && (
        <div className="mb-6">
          <h4 className="text-red-300 font-medium mb-2">Required Contract Terms</h4>
          <div className="flex flex-wrap gap-2">
            {data.contractRequirements.map((req: string, i: number) => (
              <span key={i} className="bg-red-500/10 text-red-300 text-xs px-2 py-1 rounded">{req}</span>
            ))}
          </div>
        </div>
      )}

      {/* Governance */}
      {data.governance && (
        <div className="bg-slate-700/50 rounded-lg p-4">
          <h4 className="text-white font-medium mb-2">Governance</h4>
          <div className="grid md:grid-cols-3 gap-3 text-xs">
            <div><span className="text-gray-400">Policy Owner:</span> <span className="text-white">{data.governance.policyOwner}</span></div>
            <div><span className="text-gray-400">Board Approval:</span> <span className="text-white">{data.governance.boardApproval}</span></div>
            <div><span className="text-gray-400">Reporting:</span> <span className="text-white">{data.governance.reportingFrequency}</span></div>
          </div>
        </div>
      )}
    </div>
  );
}

function LiquidityTypesBlock({ data }: { data: any }) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 text-sm mb-4">{data.subtitle}</p>}
      <p className="text-gray-500 text-xs mb-4">Click to expand details</p>
      <div className="space-y-4">
        {data.types?.map((item: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              className="w-full p-4 text-left hover:bg-slate-700/70 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                {item.icon && <span className="text-2xl">{item.icon}</span>}
                <div>
                  <p className="text-white font-medium">{item.type}</p>
                  <p className="text-gray-400 text-sm">{item.definition}</p>
                </div>
              </div>
              <span className={`text-gray-400 transition-transform duration-200 ${expanded === i ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {expanded === i && (
              <div className="p-4 pt-0 border-t border-slate-600 space-y-4">
                {/* Payment Processor Context */}
                {item.paymentProcessorContext && (
                  <div className="bg-blue-500/10 rounded p-3">
                    <p className="text-blue-300 text-sm font-medium mb-1">For Payment Processors:</p>
                    <p className="text-gray-300 text-sm">{item.paymentProcessorContext}</p>
                  </div>
                )}

                {/* Examples */}
                {item.examples && (
                  <div>
                    <p className="text-amber-300 font-medium text-xs mb-2">Examples:</p>
                    <ul className="space-y-1">
                      {item.examples.map((ex: string, j: number) => (
                        <li key={j} className="text-gray-300 text-sm flex items-start gap-2">
                          <span className="text-amber-400">•</span> {ex}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Management */}
                {item.management && (
                  <div className="bg-emerald-500/10 rounded p-3">
                    <p className="text-emerald-300 font-medium text-sm mb-1">Strategy: {item.management.strategy}</p>
                    {item.management.tactics && (
                      <ul className="space-y-1 mt-2">
                        {item.management.tactics.map((tactic: string, j: number) => (
                          <li key={j} className="text-gray-300 text-sm flex items-center gap-2">
                            <span className="text-emerald-400">✓</span> {tactic}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {/* Metrics */}
                {item.metrics && (
                  <div className="bg-purple-500/10 rounded p-3">
                    <p className="text-purple-300 text-sm"><span className="font-medium">Target:</span> {item.metrics.target}</p>
                    <p className="text-gray-400 text-xs mt-1">Monitoring: {item.metrics.monitoring}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Fallback for old structure */}
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
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}

      {/* RTO/RPO style metrics */}
      {data.metrics && (
        <div className="space-y-4">
          {data.metrics.map((metric: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="w-full p-4 text-left hover:bg-slate-700/70 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-blue-300 font-bold text-lg">{metric.metric}</span>
                    {metric.fullName && <span className="text-gray-400 ml-2">({metric.fullName})</span>}
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expanded === i ? 'rotate-180' : ''}`} />
                </div>
                {metric.definition && <p className="text-gray-300 text-sm mt-1">{metric.definition}</p>}
              </button>

              {expanded === i && (
                <div className="p-4 pt-0 border-t border-slate-600 space-y-4">
                  {metric.whyItMatters && (
                    <div className="bg-amber-500/10 rounded p-3">
                      <p className="text-amber-300 text-sm"><span className="font-medium">Why it matters:</span> {metric.whyItMatters}</p>
                    </div>
                  )}

                  {/* Sphere Targets Table */}
                  {metric.sphereTargets && (
                    <div>
                      <h5 className="text-white font-medium mb-2">Sphere Targets</h5>
                      <div className="space-y-2">
                        {metric.sphereTargets.map((target: any, j: number) => (
                          <div key={j} className="bg-slate-800 rounded p-3">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-gray-300">{target.system}</span>
                              <span className="text-emerald-300 font-mono font-bold">{target.rto || target.rpo}</span>
                            </div>
                            <p className="text-gray-500 text-xs">{target.method}</p>
                            {target.notes && <p className="text-gray-400 text-xs mt-1">{target.notes}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {metric.institutionalContext && (
                    <div className="bg-purple-500/10 rounded p-3">
                      <p className="text-purple-300 text-sm">💼 {metric.institutionalContext}</p>
                    </div>
                  )}

                  {metric.zeroRPOexplained && (
                    <div className="bg-blue-500/10 rounded p-3">
                      <h5 className="text-blue-300 font-medium mb-1">{metric.zeroRPOexplained.title}</h5>
                      <p className="text-gray-300 text-sm mb-2">{metric.zeroRPOexplained.explanation}</p>
                      {metric.zeroRPOexplained.contrast && (
                        <p className="text-gray-400 text-xs">{metric.zeroRPOexplained.contrast}</p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Fallback for simple items structure */}
      {data.items && (
        <div className="space-y-3">
          {data.items.map((item: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">{item.metric || item.fullName}</span>
                <span className="text-white font-medium">{item.description || item.example}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ResilienceBlock({ data }: { data: any }) {
  return (
    <div className="bg-emerald-500/10 rounded-xl p-6">
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
  // Handle both 'levels' (Section 4.5) and 'items' (legacy) formats
  const items = data.levels || data.items || [];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4">{data.title}</h3>
      <div className="space-y-4">
        {items.map((item: any, i: number) => (
          <div key={i} className={`rounded-lg p-4 ${i === 0 ? 'bg-red-500/20' : i === 1 ? 'bg-orange-500/20' : i === 2 ? 'bg-amber-500/20' : 'bg-emerald-500/10'}`}>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                {item.icon && <span className="text-lg">{item.icon}</span>}
                <span className="font-medium text-white">{item.level}</span>
              </div>
              <span className="text-blue-300 text-sm font-mono">{item.responseTime || item.sla}</span>
            </div>
            <p className="text-gray-300 text-sm font-medium mb-1">{item.definition || item.description}</p>
            {item.context && (
              <p className="text-gray-400 text-sm mb-3 leading-relaxed">{item.context}</p>
            )}
            <p className="text-gray-500 text-xs">
              <span className="text-amber-300">Escalation:</span> {item.escalation || item.response}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PostIncidentBlock({ data }: { data: any }) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-2">{data.subtitle}</p>}
      {data.philosophy && (
        <div className="bg-purple-500/10 rounded p-3 mb-4">
          <p className="text-purple-300 text-sm italic">{data.philosophy}</p>
        </div>
      )}

      {/* Format Section */}
      {data.format && (
        <div className="bg-blue-500/10 rounded-lg p-4 mb-4">
          <h4 className="text-blue-300 font-semibold mb-2">Review Format</h4>
          <div className="grid md:grid-cols-2 gap-2 text-sm">
            {data.format.timing && <div><span className="text-gray-500">Timing:</span> <span className="text-gray-300">{data.format.timing}</span></div>}
            {data.format.attendees && <div><span className="text-gray-500">Attendees:</span> <span className="text-gray-300">{data.format.attendees}</span></div>}
            {data.format.duration && <div><span className="text-gray-500">Duration:</span> <span className="text-gray-300">{data.format.duration}</span></div>}
            {data.format.facilitation && <div><span className="text-gray-500">Facilitator:</span> <span className="text-gray-300">{data.format.facilitation}</span></div>}
          </div>
        </div>
      )}

      {/* Agenda Section */}
      {data.agenda && (
        <div className="mb-4">
          <h4 className="text-white font-semibold mb-2">Review Agenda</h4>
          <p className="text-gray-400 text-sm mb-3">Click each section to see details</p>
          <div className="space-y-2">
            {data.agenda.map((item: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="w-full p-3 text-left hover:bg-slate-700/70 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">{item.section}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 text-xs">{item.duration}</span>
                      <span className={`text-gray-400 transition-transform duration-200 ${expanded === i ? 'rotate-180' : ''}`}>▼</span>
                    </div>
                  </div>
                </button>
                {expanded === i && (
                  <div className="px-3 pb-3 border-t border-slate-600 pt-2">
                    {item.context && (
                      <p className="text-gray-400 text-sm mb-3 leading-relaxed">{item.context}</p>
                    )}
                    <p className="text-gray-300 text-sm mb-1"><span className="text-gray-500 font-medium">Focus:</span> {item.focus}</p>
                    <p className="text-emerald-300 text-xs"><span className="font-medium">Output:</span> {item.output}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Documentation Section */}
      {data.documentation && (
        <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
          <h4 className="text-white font-semibold mb-2">{data.documentation.title || 'Documentation'}</h4>
          {data.documentation.sections && (
            <div className="mb-2">
              <p className="text-gray-400 text-xs mb-1">Sections:</p>
              <div className="flex flex-wrap gap-1">
                {data.documentation.sections.map((s: string, i: number) => (
                  <span key={i} className="bg-slate-600 text-gray-300 px-2 py-0.5 rounded text-xs">{s}</span>
                ))}
              </div>
            </div>
          )}
          {data.documentation.distribution && <p className="text-gray-400 text-xs">Distribution: {data.documentation.distribution}</p>}
          {data.documentation.retention && <p className="text-gray-400 text-xs">Retention: {data.documentation.retention}</p>}
        </div>
      )}

      {/* Action Item Tracking */}
      {data.actionItemTracking && (
        <div className="bg-emerald-500/10 rounded p-3">
          <p className="text-emerald-300 text-sm">✓ {data.actionItemTracking}</p>
        </div>
      )}

      {/* Fallback for simple structure */}
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

function PersonalOriginBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}
      {data.story && <p className="text-gray-300 mb-4 leading-relaxed">{data.story}</p>}
      {data.insight && (
        <div className="bg-purple-500/10 rounded-lg p-4 mb-4 border-l-4 border-purple-500">
          <p className="text-purple-300 italic">"{data.insight}"</p>
          <p className="text-purple-400 text-xs mt-1">— Arnold Lee</p>
        </div>
      )}
      {data.whyItMatters && (
        <div className="bg-emerald-500/10 rounded-lg p-3">
          <p className="text-emerald-400 text-xs font-semibold mb-1">Why This Matters</p>
          <p className="text-gray-300 text-sm">{data.whyItMatters}</p>
        </div>
      )}
    </div>
  );
}

function HackathonOriginsBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}
      {data.timeline && (
        <div className="space-y-4">
          {data.timeline.map((item: any, i: number) => (
            <div key={i} className="relative pl-6 border-l-2 border-blue-500">
              <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full"></div>
              <h4 className="text-blue-300 font-semibold mb-1">{item.phase}</h4>
              <p className="text-gray-300 text-sm mb-2">{item.detail}</p>
              {item.context && (
                <p className="text-gray-500 text-xs italic">{item.context}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FoundingBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}
      <div className="space-y-4">
        {data.events?.map((event: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <p className="text-white font-medium">{event.event}</p>
            </div>
            <p className="text-gray-400 text-sm mb-2">{event.impact}</p>
            {event.sphereResponse && (
              <div className="bg-emerald-500/10 rounded p-2">
                <p className="text-emerald-400 text-xs font-semibold mb-1">Sphere Response</p>
                <p className="text-emerald-300 text-sm">{event.sphereResponse}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      {data.keyInsight && (
        <div className="bg-purple-500/10 rounded-lg p-4 mt-4">
          <p className="text-purple-300 text-sm">{data.keyInsight}</p>
        </div>
      )}
      {data.insight && <p className="text-purple-300 mt-4">{data.insight}</p>}
    </div>
  );
}

function EarlyPivotBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}

      {data.original && (
        <div className="bg-red-500/10 rounded-lg p-4 mb-4 border-l-4 border-red-500">
          <h4 className="text-red-300 font-semibold mb-2">Original Plan</h4>
          <p className="text-gray-300 text-sm mb-2">{data.original.idea}</p>
          <p className="text-red-400 text-sm"><span className="font-medium">Problem:</span> {data.original.problem}</p>
        </div>
      )}

      {data.pivot && (
        <div className="bg-emerald-500/10 rounded-lg p-4 border-l-4 border-emerald-500">
          <h4 className="text-emerald-300 font-semibold mb-2">The Pivot</h4>
          <p className="text-gray-300 text-sm mb-2"><span className="font-medium text-emerald-400">Insight:</span> {data.pivot.insight}</p>
          <p className="text-emerald-300 text-sm"><span className="font-medium">Result:</span> {data.pivot.result}</p>
        </div>
      )}

      {data.lesson && (
        <div className="bg-blue-500/10 rounded-lg p-3 mt-4">
          <p className="text-blue-300 text-sm">💡 {data.lesson}</p>
        </div>
      )}
    </div>
  );
}

function FounderBackgroundBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>

      {data.founders && (
        <div className="space-y-4 mb-4">
          {data.founders.map((founder: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {founder.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-semibold">{founder.name}</h4>
                  <p className="text-blue-300 text-sm">{founder.role}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-2">{founder.background}</p>
              {founder.whyItMatters && (
                <p className="text-emerald-300 text-xs">✓ {founder.whyItMatters}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {data.earlyTeam && (
        <p className="text-gray-400 text-sm mb-3">{data.earlyTeam}</p>
      )}

      {data.currentScale && (
        <div className="bg-purple-500/10 rounded-lg p-3">
          <p className="text-purple-300 text-sm font-medium">{data.currentScale}</p>
        </div>
      )}
    </div>
  );
}

function FundingJourneyBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>

      {data.rounds && (
        <div className="space-y-3 mb-4">
          {data.rounds.map((round: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4 flex justify-between items-start">
              <div>
                <h4 className="text-white font-medium">{round.round}</h4>
                <p className="text-gray-500 text-xs">{round.timing}</p>
                <p className="text-gray-400 text-sm mt-1">{round.investors}</p>
              </div>
              <span className="text-emerald-400 font-semibold">{round.amount}</span>
            </div>
          ))}
        </div>
      )}

      {data.note && (
        <p className="text-gray-400 text-sm italic">{data.note}</p>
      )}
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

function BobAhmedBlock({ data }: { data: any }) {
  return (
    <div className="bg-orange-500/10 rounded-xl p-6">
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
          <div key={i} className="bg-amber-500/10 rounded-lg p-4">
            <p className="font-medium text-amber-400">{tip.tip}</p>
            <p className="text-gray-300 text-sm mt-1">{tip.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// PILLAR 6 SPECIFIC BLOCKS
// =============================================================================

function QuestionClustersBlock({ data }: { data: any[] }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4">📊 Question Clusters</h3>
      <p className="text-gray-400 text-sm mb-4">Questions tend to cluster in predictable patterns. Know the flow.</p>
      <div className="space-y-3">
        {data.map((cluster: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4">
            <h4 className="text-blue-300 font-medium mb-2">{cluster.name}</h4>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              {cluster.flow.split(' → ').map((step: string, j: number) => (
                <span key={j} className="flex items-center">
                  <span className="bg-blue-500/20 text-blue-200 px-2 py-1 rounded text-sm">{step}</span>
                  {j < cluster.flow.split(' → ').length - 1 && <span className="text-gray-500 mx-1">→</span>}
                </span>
              ))}
            </div>
            <p className="text-gray-400 text-sm italic">They're deciding: {cluster.whatTheyreDeciding}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function BuyingSignalsBlock({ data }: { data: { good: string[], bad: string[] } }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4">📈 Reading the Room</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/30">
          <h4 className="text-emerald-400 font-medium mb-3">✅ Good Signs (You're Winning)</h4>
          <ul className="space-y-2">
            {data.good.map((sign: string, i: number) => (
              <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                <span className="text-emerald-400">•</span>
                <span>{sign}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/30">
          <h4 className="text-red-400 font-medium mb-3">⚠️ Bad Signs (Losing Them)</h4>
          <ul className="space-y-2">
            {data.bad.map((sign: string, i: number) => (
              <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>{sign}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ConversationStrategiesBlock({ data }: { data: any }) {
  const [expandedStrategy, setExpandedStrategy] = useState<number | null>(null);
  const strategies = data.strategies || [];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2">{data.title || 'Conversation Strategies'}</h3>
      <p className="text-gray-400 text-sm mb-4">Click to expand each strategy</p>
      <div className="space-y-3">
        {strategies.map((strategy: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedStrategy(expandedStrategy === i ? null : i)}
              className="w-full p-4 text-left hover:bg-slate-700 transition-colors flex items-center justify-between"
            >
              <span className="text-cyan-300 font-medium">{strategy.name}</span>
              <span className={`text-gray-400 transform transition-transform ${expandedStrategy === i ? 'rotate-90' : ''}`}>▶</span>
            </button>
            {expandedStrategy === i && (
              <div className="p-4 pt-0 border-t border-slate-600 space-y-3">
                <p className="text-gray-300 text-sm">{strategy.explanation}</p>
                {strategy.example && (
                  <div className="bg-slate-800/50 rounded p-3">
                    <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Example</p>
                    <p className="text-amber-200 text-sm italic">{strategy.example}</p>
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

function ClosingTechniquesBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2">{data.title || 'Closing Techniques'}</h3>
      {data.content && (
        <div className="text-gray-300 text-sm mb-4 whitespace-pre-line">{data.content}</div>
      )}
    </div>
  );
}

function LanguageGuideBlock({ data }: { data: any }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-red-500/20 rounded-xl p-4">
        <p className="font-semibold text-red-400 mb-3">❌ Don't Say</p>
        <ul className="space-y-2">
          {data.wrong?.map((item: string, i: number) => <li key={i} className="text-gray-300 text-sm">• {item}</li>)}
        </ul>
      </div>
      <div className="bg-emerald-500/20 rounded-xl p-4">
        <p className="font-semibold text-emerald-400 mb-3">✅ Do Say</p>
        <ul className="space-y-3">
          {data.correct?.map((item: string, i: number) => <li key={i} className="text-gray-300 text-sm">• {item}</li>)}
        </ul>
      </div>
    </div>
  );
}

function SphereRelevanceBlock({ data }: { data: any }) {
  const [showBlockchainBasics, setShowBlockchainBasics] = useState(false);

  return (
    <div className="bg-purple-500/10 rounded-xl p-6">
      <h3 className="font-semibold text-white mb-4">🎯 {data.title}</h3>

      {/* Key insight first */}
      {data.keyInsight && (
        <div className="bg-purple-500/20 rounded-lg p-4 mb-4">
          <p className="text-purple-200 font-medium">💡 {data.keyInsight}</p>
        </div>
      )}

      {/* SWIFT vs Sphere comparison table */}
      {data.swiftVsSphere && (
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-600">
                <th className="text-left py-3 px-4 text-gray-400 font-medium"></th>
                <th className="text-left py-3 px-4 text-red-400 font-medium">SWIFT</th>
                <th className="text-left py-3 px-4 text-emerald-400 font-medium">Sphere</th>
              </tr>
            </thead>
            <tbody>
              {data.swiftVsSphere.map((row: any, i: number) => (
                <tr key={i} className="border-b border-slate-700">
                  <td className="py-3 px-4 text-white font-medium">{row.aspect}</td>
                  <td className="py-3 px-4 text-gray-400">{row.swift}</td>
                  <td className="py-3 px-4 text-gray-300">{row.sphere}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Handle points array - both string and object formats */}
      {data.points && (
        <ul className="space-y-3">
          {data.points.map((point: any, i: number) => (
            <li key={i} className="flex items-start gap-2 text-gray-300">
              <CheckCircle className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
              {typeof point === 'string' ? point : (
                <span><strong className="text-purple-300">{point.point}:</strong> {point.detail}</span>
              )}
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

      {/* Blockchain Basics Expandable Section */}
      {data.blockchainBasics && (
        <div className="mb-4">
          <button
            onClick={() => setShowBlockchainBasics(!showBlockchainBasics)}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            {data.blockchainBasics.trigger}
            <ChevronDown className={`w-4 h-4 transition-transform ${showBlockchainBasics ? 'rotate-180' : ''}`} />
          </button>

          {showBlockchainBasics && (
            <div className="mt-3 bg-slate-700/50 border border-slate-600 rounded-lg p-5 animate-in fade-in duration-200">
              <h4 className="text-white font-semibold mb-2">{data.blockchainBasics.title}</h4>
              <p className="text-gray-400 text-sm mb-4">{data.blockchainBasics.subtitle}</p>

              <div className="space-y-4">
                {data.blockchainBasics.concepts?.map((concept: any, i: number) => (
                  <div key={i} className="bg-slate-800/50 rounded-lg p-4">
                    <h5 className="text-blue-300 font-semibold mb-2">{concept.term}</h5>
                    <p className="text-white text-sm mb-2">{concept.simple}</p>
                    <p className="text-emerald-300 text-sm mb-2"><span className="font-medium">Why it matters:</span> {concept.whyItMatters}</p>
                    <p className="text-gray-400 text-sm italic">💡 {concept.analogy}</p>
                  </div>
                ))}
              </div>

              {data.blockchainBasics.keyPoint && (
                <div className="mt-4 bg-purple-500/20 rounded-lg p-3">
                  <p className="text-purple-200 text-sm font-medium">{data.blockchainBasics.keyPoint}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Handle problemExplained */}
      {data.problemExplained && (
        <div className="bg-amber-500/10 rounded-lg p-4 mb-4">
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
                  <div className="bg-red-500/20 rounded p-2">
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
              <div key={i} className="bg-emerald-500/10 rounded-lg p-3">
                <p className="text-emerald-300 font-semibold mb-1">{item.reason}</p>
                <p className="text-gray-300 text-sm">{item.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Handle criticalClarification */}
      {data.howSphereWorks?.criticalClarification && (
        <div className="bg-blue-500/10 rounded-lg p-4 mb-4">
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
            <div className="bg-blue-500/10 rounded-lg p-3 mt-3">
              <p className="text-blue-200 text-sm">{data.howSphereComplements.regulatorFriendlyFraming}</p>
            </div>
          )}
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


// =============================================================================
// PILLAR 3 EXPANDED - NEW COMPONENTS
// =============================================================================

// Classification Matters Block (Section 3.1)
function ClassificationMattersBlock({ data }: { data: any }) {
  const [expandedCase, setExpandedCase] = useState<string | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-6">{data.subtitle}</p>}

      {data.consequences && (
        <div className="grid md:grid-cols-2 gap-4">
          {data.consequences.map((c: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-blue-400 font-bold text-lg">{i + 1}.</span>
                <h4 className="text-white font-medium">{c.determination}</h4>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">{c.detail}</p>
              {c.sphereImplication && (
                <p className="text-emerald-400 text-sm leading-relaxed">
                  <span className="font-medium">Sphere:</span> {c.sphereImplication}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {data.caseStudies && (
        <div className="mt-8">
          <h4 className="text-amber-400 font-semibold mb-4">
            ⚠️ {data.caseStudies.title}
          </h4>
          <div className="space-y-2">
            {data.caseStudies.cases?.map((cs: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedCase(expandedCase === cs.company ? null : cs.company)}
                  className="w-full text-left p-4 flex items-center justify-between hover:bg-slate-700 transition"
                >
                  <span className="text-white font-medium">{cs.company}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedCase === cs.company ? 'rotate-180' : ''}`} />
                </button>
                {expandedCase === cs.company && (
                  <div className="px-4 pb-4 pt-1 space-y-4">
                    <p className="text-gray-300 text-sm leading-relaxed">{cs.issue}</p>
                    <p className="text-sm leading-relaxed">
                      <span className="text-red-400 font-medium">Consequence:</span>
                      <span className="text-gray-300 ml-2">{cs.consequence}</span>
                    </p>
                    <p className="text-amber-300 text-sm leading-relaxed">💡 {cs.lesson}</p>
                    {cs.sphereRelevance && (
                      <p className="text-emerald-400 text-sm leading-relaxed">✓ Sphere: {cs.sphereRelevance}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Sample Responses Block - handles scenarios (3.1 style), responses, and UAE Q&A style
function SampleResponsesBlockNew({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}
      <div className="space-y-4">
        {/* New format with categories and detailed goodResponse/keyPoints/doNotSay */}
        {data.scenarios?.map((s: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4">
            {s.category && (
              <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded mb-2 inline-block">{s.category}</span>
            )}
            <h4 className="text-blue-300 font-medium mb-2">{s.scenario || `Q: ${s.question}`}</h4>
            <div className="bg-slate-800/50 rounded p-3 mb-3">
              <p className="text-gray-300 text-sm">{s.response || s.goodResponse || s.answer}</p>
            </div>
            {s.keyPoints && (
              <div className="mb-2">
                <p className="text-gray-500 text-xs mb-1">Key points:</p>
                <div className="flex flex-wrap gap-2">
                  {s.keyPoints.map((p: string, j: number) => (
                    <span key={j} className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded">{p}</span>
                  ))}
                </div>
              </div>
            )}
            {s.doNotSay && (
              <div className="bg-red-500/20 rounded p-2 mt-2">
                <p className="text-red-400 text-xs font-medium mb-1">❌ Don't say:</p>
                <ul className="text-red-300 text-xs space-y-0.5">
                  {s.doNotSay.map((d: string, j: number) => <li key={j}>• {d}</li>)}
                </ul>
              </div>
            )}
          </div>
        ))}
        {/* Old responses format */}
        {data.responses?.map((r: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4">
            <p className="text-blue-300 font-semibold mb-2">Q: {r.question}</p>
            <p className="text-gray-300 text-sm">{r.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Core Definitions Block (Section 3.2)
function CoreDefinitionsBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {data.definitions?.map((d: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4">
            <div className="mb-2">
              <span className="text-blue-300 font-semibold">{d.term}</span>
              {d.fullName && <span className="text-gray-500 text-sm ml-2">({d.fullName})</span>}
            </div>
            <p className="text-gray-300 text-sm mb-2">{d.definition}</p>
            {d.sphereContext && (
              <p className="text-emerald-400 text-sm border-t border-slate-600 pt-2 mt-2">
                <span className="font-medium">Sphere:</span> {d.sphereContext}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Compliance Enables Growth Block (Section 3.2)
function ComplianceEnablesGrowthBlock({ data }: { data: any }) {
  const [expandedExample, setExpandedExample] = useState<number | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.overview && <p className="text-gray-400 mb-4">{data.overview}</p>}

      {data.comparisonTable && (
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-700">
                {data.comparisonTable.headers?.map((h: string, i: number) => (
                  <th key={i} className={`p-3 text-left ${i === 0 ? 'text-red-300' : 'text-emerald-300'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.comparisonTable.rows?.map((row: string[], i: number) => (
                <tr key={i} className="border-t border-slate-700">
                  <td className="p-3 text-red-200">{row[0]}</td>
                  <td className="p-3 text-emerald-200">{row[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {data.specificExamples && (
        <div className="space-y-2">
          <h4 className="text-white font-medium mb-2">Real Examples:</h4>
          {data.specificExamples.map((ex: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedExample(expandedExample === i ? null : i)}
                className="w-full p-3 text-left flex justify-between items-center hover:bg-slate-600/50 transition-colors"
              >
                <span className="text-white font-medium">{ex.example}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedExample === i ? 'rotate-180' : ''}`} />
              </button>
              {expandedExample === i && (
                <div className="px-4 pb-4 border-t border-slate-600 pt-3 space-y-3">
                  <div>
                    <p className="text-gray-400 text-xs uppercase mb-1">Story</p>
                    <p className="text-gray-300 text-sm">{ex.story}</p>
                  </div>
                  <div>
                    <p className="text-emerald-400 text-xs uppercase mb-1">Outcome</p>
                    <p className="text-gray-300 text-sm">{ex.outcome}</p>
                  </div>
                  <div>
                    <p className="text-amber-400 text-xs uppercase mb-1">Lesson</p>
                    <p className="text-gray-300 text-sm">{ex.lesson}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {data.bankingPartnerRequirements && (
        <div className="mt-4 bg-slate-700/50 rounded-lg p-4">
          <h4 className="text-blue-300 font-medium mb-3">Banking Partner Requirements</h4>
          <div className="grid md:grid-cols-2 gap-2">
            {data.bankingPartnerRequirements.map((r: any, i: number) => (
              <div key={i} className="text-sm">
                <span className="text-white">{r.requirement}:</span>{' '}
                <span className="text-gray-400">{r.detail}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// KYC Requirements Block (Section 3.2)
function KYCRequirementsBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-6 text-xl">{data.title}</h3>

      {data.individualVerification && (
        <div className="mb-8">
          <h4 className="text-blue-300 font-medium mb-4 flex items-center gap-2 text-lg">
            👤 {data.individualVerification.title}
          </h4>
          <div className="space-y-4">
            {data.individualVerification.requirements?.map((r: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-5">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-white font-semibold text-base">{r.category}</span>
                  <span className="text-emerald-400 text-sm bg-emerald-500/10 px-2 py-1 rounded">{r.required}</span>
                </div>
                {r.context && <p className="text-gray-400 mb-4">{r.context}</p>}
                {r.acceptable && (
                  <div className="mb-3">
                    <p className="text-gray-500 text-sm mb-2">Acceptable documents:</p>
                    <div className="flex flex-wrap gap-2">
                      {r.acceptable.map((item: string, j: number) => (
                        <span key={j} className="text-gray-300 text-sm bg-slate-600/50 px-3 py-1 rounded">{item}</span>
                      ))}
                    </div>
                  </div>
                )}
                {r.notes && <p className="text-gray-500 text-sm italic">{r.notes}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.businessVerification && (
        <div>
          <h4 className="text-purple-300 font-medium mb-4 flex items-center gap-2 text-lg">
            🏢 {data.businessVerification.title}
          </h4>
          <div className="space-y-4">
            {data.businessVerification.requirements?.map((r: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-5">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-white font-semibold text-base">{r.category}</span>
                  <span className="text-emerald-400 text-sm bg-emerald-500/10 px-2 py-1 rounded">{r.required}</span>
                </div>
                {r.context && <p className="text-gray-400 mb-4">{r.context}</p>}
                {r.acceptable && (
                  <div className="mb-3">
                    <p className="text-gray-500 text-sm mb-2">Acceptable documents:</p>
                    <div className="flex flex-wrap gap-2">
                      {r.acceptable.map((item: string, j: number) => (
                        <span key={j} className="text-gray-300 text-sm bg-slate-600/50 px-3 py-1 rounded">{item}</span>
                      ))}
                    </div>
                  </div>
                )}
                {r.detail && <p className="text-gray-300 text-sm mb-2">{r.detail}</p>}
                {r.notes && <p className="text-gray-500 text-sm italic">{r.notes}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// AML Program Block (Section 3.2)
function AMLProgramBlock({ data }: { data: any }) {
  const [expandedPillar, setExpandedPillar] = useState<number | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}

      <div className="space-y-2">
        {data.pillars?.map((p: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedPillar(expandedPillar === i ? null : i)}
              className="w-full p-4 text-left flex justify-between items-center hover:bg-slate-600/50 transition-colors"
            >
              <span className="text-white font-medium">{p.pillar}</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedPillar === i ? 'rotate-180' : ''}`} />
            </button>
            {expandedPillar === i && (
              <div className="px-4 pb-4 border-t border-slate-600 pt-3 space-y-3">
                <div>
                  <p className="text-gray-400 text-xs uppercase mb-1">Requirement</p>
                  <p className="text-gray-300 text-sm">{p.requirement}</p>
                </div>
                {p.includes && (
                  <div>
                    <p className="text-gray-400 text-xs uppercase mb-2">Includes</p>
                    <div className="space-y-3">
                      {p.includes.map((item: any, j: number) => (
                        <div key={j} className="bg-slate-800/50 rounded-lg p-3">
                          <p className="text-white font-medium text-sm">{typeof item === 'string' ? item : item.item}</p>
                          {typeof item === 'object' && item.context && (
                            <p className="text-gray-400 text-sm mt-1">{item.context}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {p.responsibilities && (
                  <div>
                    <p className="text-gray-400 text-xs uppercase mb-2">Responsibilities</p>
                    <div className="space-y-3">
                      {p.responsibilities.map((r: any, j: number) => (
                        <div key={j} className="bg-slate-800/50 rounded-lg p-3">
                          <p className="text-white font-medium text-sm">{typeof r === 'string' ? r : r.item}</p>
                          {typeof r === 'object' && r.context && (
                            <p className="text-gray-400 text-sm mt-1">{r.context}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {p.elements && (
                  <div>
                    <p className="text-gray-400 text-xs uppercase mb-2">Elements</p>
                    <div className="space-y-3">
                      {p.elements.map((e: any, j: number) => (
                        <div key={j} className="bg-slate-800/50 rounded-lg p-3">
                          <p className="text-white font-medium text-sm">{typeof e === 'string' ? e : e.item}</p>
                          {typeof e === 'object' && e.context && (
                            <p className="text-gray-400 text-sm mt-1">{e.context}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {p.scope && (
                  <div>
                    <p className="text-gray-400 text-xs uppercase mb-2">Scope</p>
                    <div className="space-y-3">
                      {p.scope.map((s: any, j: number) => (
                        <div key={j} className="bg-slate-800/50 rounded-lg p-3">
                          <p className="text-white font-medium text-sm">{typeof s === 'string' ? s : s.item}</p>
                          {typeof s === 'object' && s.context && (
                            <p className="text-gray-400 text-sm mt-1">{s.context}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {p.sphereImplementation && (
                  <div className="border-t border-slate-600 pt-2 mt-2">
                    <p className="text-emerald-400 text-xs uppercase mb-1">Sphere Implementation</p>
                    <p className="text-gray-300 text-sm">{p.sphereImplementation}</p>
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

// CDD Requirements Block (Section 3.2)
function CDDRequirementsBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>
      <div className="space-y-4">
        {data.requirements?.map((r: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4">
            <h4 className="text-blue-300 font-medium mb-2">{r.requirement}</h4>
            <p className="text-gray-300 text-sm mb-3">{r.detail}</p>
            {r.forIndividuals && (
              <div className="mb-2">
                <p className="text-gray-500 text-xs mb-1">For Individuals:</p>
                <p className="text-gray-300 text-sm">{r.forIndividuals.join(', ')}</p>
              </div>
            )}
            {r.forEntities && (
              <div className="mb-2">
                <p className="text-gray-500 text-xs mb-1">For Entities:</p>
                <p className="text-gray-300 text-sm">{r.forEntities.join(', ')}</p>
              </div>
            )}
            {r.toCollect && (
              <div className="mb-2">
                <p className="text-gray-500 text-xs mb-1">To Collect:</p>
                <p className="text-gray-300 text-sm">{r.toCollect.join(', ')}</p>
              </div>
            )}
            {r.ownershipProng && (
              <div className="mb-2">
                <p className="text-gray-500 text-xs mb-1">Ownership Prong:</p>
                <p className="text-gray-300 text-sm">{r.ownershipProng}</p>
              </div>
            )}
            {r.controlProng && (
              <div className="mb-2">
                <p className="text-gray-500 text-xs mb-1">Control Prong:</p>
                <p className="text-gray-300 text-sm">{r.controlProng}</p>
              </div>
            )}
            {r.transactionMonitoring && (
              <div className="mb-2">
                <p className="text-gray-500 text-xs mb-1">Transaction Monitoring:</p>
                <p className="text-gray-300 text-sm">{r.transactionMonitoring}</p>
              </div>
            )}
            {r.informationUpdates && (
              <div className="mb-2">
                <p className="text-gray-500 text-xs mb-1">Information Updates:</p>
                <p className="text-gray-300 text-sm">{r.informationUpdates}</p>
              </div>
            )}
            {r.timing && (
              <div className="mb-2">
                <p className="text-gray-500 text-xs mb-1">Timing:</p>
                <p className="text-gray-300 text-sm">{r.timing}</p>
              </div>
            )}
            {r.purpose && (
              <div>
                <p className="text-gray-500 text-xs mb-1">Purpose:</p>
                <p className="text-gray-400 text-sm">{r.purpose}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// EDD Requirements Block (Section 3.2)
function EDDRequirementsBlock({ data }: { data: any }) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-6 text-xl">{data.title}</h3>

      {data.sphereMethodology && (
        <p className="text-gray-400 mb-6 bg-blue-500/10 rounded-lg p-4 border-l-4 border-blue-500">{data.sphereMethodology}</p>
      )}

      {data.triggers && (
        <div className="mb-8">
          <h4 className="text-red-300 font-medium mb-4 text-lg">EDD Triggers</h4>
          <div className="space-y-4">
            {data.triggers.map((t: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-5">
                <p className="text-white font-semibold mb-2">{t.trigger}</p>
                <p className="text-gray-400 mb-3">{t.why}</p>
                {t.eddRequired && (
                  <div className="flex flex-wrap gap-2">
                    {t.eddRequired.map((req: string, j: number) => (
                      <span key={j} className="text-gray-300 text-sm bg-slate-600/50 px-3 py-1 rounded">{req}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sphere High-Risk Customer Categories */}
      {data.sphereHighRiskCategories && (
        <div className="mb-8">
          <h4 className="text-purple-300 font-medium mb-2 text-lg">{data.sphereHighRiskCategories.title}</h4>
          <p className="text-gray-500 text-sm mb-4">{data.sphereHighRiskCategories.subtitle}</p>
          <div className="space-y-3">
            {data.sphereHighRiskCategories.categories.map((cat: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedCategory(expandedCategory === cat.category ? null : cat.category)}
                  className="w-full p-4 text-left flex justify-between items-center hover:bg-slate-700 transition"
                >
                  <span className="text-white font-medium">{cat.category}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedCategory === cat.category ? 'rotate-180' : ''}`} />
                </button>
                {expandedCategory === cat.category && (
                  <div className="px-4 pb-4 space-y-3">
                    <p className="text-gray-400 text-sm">{cat.definition}</p>
                    <div>
                      <p className="text-purple-400 text-xs font-semibold mb-2">Key Questions Asked:</p>
                      <ul className="space-y-1">
                        {cat.keyQuestions.map((q: string, j: number) => (
                          <li key={j} className="text-gray-300 text-sm">• {q}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-amber-500/10 rounded p-2">
                      <p className="text-amber-400 text-xs font-semibold">AML Requirements:</p>
                      <p className="text-gray-300 text-sm">{cat.amlRequirements}</p>
                    </div>
                    <div className="bg-emerald-500/10 rounded p-2">
                      <p className="text-emerald-400 text-xs font-semibold">Sphere Policy:</p>
                      <p className="text-gray-300 text-sm">{cat.spherePolicy}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.components && (
        <div>
          <h4 className="text-blue-300 font-medium mb-4 text-lg">EDD Components</h4>
          <div className="space-y-4">
            {data.components.map((c: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-5">
                <p className="text-white font-semibold mb-2">{c.component}</p>
                <p className="text-gray-400">{c.detail}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// KYB Onboarding Workflow Block (Section 3.2)
function KYBOnboardingWorkflowBlock({ data }: { data: any }) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-purple-500/10 rounded-xl p-6 border border-purple-500/30">
        <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
        {data.subtitle && <p className="text-purple-300">{data.subtitle}</p>}
      </div>

      {/* UBO vs KCP */}
      {data.uboVsKcp && (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h4 className="text-blue-300 font-semibold mb-4">{data.uboVsKcp.title}</h4>
          <p className="text-gray-400 mb-6">{data.uboVsKcp.explanation}</p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* UBO Definition */}
            {data.uboVsKcp.uboDefinition && (
              <div className="bg-emerald-500/10 rounded-lg p-5 border border-emerald-500/20">
                <h5 className="text-emerald-300 font-semibold mb-2">{data.uboVsKcp.uboDefinition.title}</h5>
                <p className="text-emerald-400 text-sm mb-3">Threshold: {data.uboVsKcp.uboDefinition.threshold}</p>
                <p className="text-gray-300 text-sm mb-3">{data.uboVsKcp.uboDefinition.requirement}</p>
                <p className="text-gray-500 text-xs font-semibold mb-2">Data to Collect:</p>
                <ul className="space-y-1">
                  {data.uboVsKcp.uboDefinition.dataToCollect?.map((item: string, i: number) => (
                    <li key={i} className="text-gray-300 text-xs">• {item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* KCP Definition */}
            {data.uboVsKcp.kcpDefinition && (
              <div className="bg-amber-500/10 rounded-lg p-5 border border-amber-500/20">
                <h5 className="text-amber-300 font-semibold mb-2">{data.uboVsKcp.kcpDefinition.title}</h5>
                <p className="text-amber-400 text-sm mb-3">When: {data.uboVsKcp.kcpDefinition.when}</p>
                <p className="text-gray-500 text-xs font-semibold mb-2">Examples:</p>
                <ul className="space-y-1 mb-3">
                  {data.uboVsKcp.kcpDefinition.examples?.map((item: string, i: number) => (
                    <li key={i} className="text-gray-300 text-xs">• {item}</li>
                  ))}
                </ul>
                <p className="text-gray-500 text-xs font-semibold mb-2">Data to Collect:</p>
                <ul className="space-y-1">
                  {data.uboVsKcp.kcpDefinition.dataToCollect?.map((item: string, i: number) => (
                    <li key={i} className="text-gray-300 text-xs">• {item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Complex Structures */}
          {data.uboVsKcp.complexStructures && (
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h5 className="text-purple-300 font-medium mb-2">{data.uboVsKcp.complexStructures.title}</h5>
              <p className="text-gray-400 text-sm mb-2">{data.uboVsKcp.complexStructures.requirement}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {data.uboVsKcp.complexStructures.documentation?.map((doc: string, i: number) => (
                  <span key={i} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">{doc}</span>
                ))}
              </div>
              <p className="text-gray-500 text-xs italic">{data.uboVsKcp.complexStructures.note}</p>
            </div>
          )}
        </div>
      )}

      {/* Merchant Classification */}
      {data.merchantClassification && (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h4 className="text-blue-300 font-semibold mb-2">{data.merchantClassification.title}</h4>
          <p className="text-gray-400 text-sm mb-4">{data.merchantClassification.purpose}</p>

          {/* Workflow Steps */}
          {data.merchantClassification.workflow && (
            <div className="bg-blue-500/10 rounded-lg p-4 mb-6">
              <p className="text-blue-300 text-xs font-semibold mb-3">Classification Workflow</p>
              <div className="space-y-2">
                {data.merchantClassification.workflow.map((step: any, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="bg-blue-500/30 text-blue-200 w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">{step.step}</span>
                    <div>
                      <span className="text-white text-sm font-medium">{step.action}</span>
                      <span className="text-gray-400 text-sm"> - {step.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Risk Tiers */}
          {data.merchantClassification.riskTiers && (
            <div className="space-y-4">
              {data.merchantClassification.riskTiers.map((tier: any, i: number) => {
                const tierColors = {
                  'Prohibited': 'bg-red-500/10 border-red-500/30 text-red-300',
                  'High-Risk (EDD Required)': 'bg-amber-500/10 border-amber-500/30 text-amber-300',
                  'Standard': 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                };
                const colorClass = tierColors[tier.tier as keyof typeof tierColors] || 'bg-slate-700/50 border-slate-600 text-gray-300';

                return (
                  <div key={i} className={`rounded-lg p-4 border ${colorClass.split(' ').slice(0, 2).join(' ')}`}>
                    <div className="flex justify-between items-start mb-3">
                      <h5 className={`font-semibold ${colorClass.split(' ').slice(2).join(' ')}`}>{tier.tier}</h5>
                      <span className="text-gray-400 text-xs">{tier.action}</span>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {tier.categories?.map((cat: any, j: number) => (
                        <div key={j} className="bg-slate-800/50 rounded p-2">
                          <p className="text-white text-xs font-medium">{cat.category}</p>
                          <p className="text-gray-500 text-xs">{cat.examples}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TOSV Keywords */}
      {data.tosvKeywords && (
        <div className="bg-slate-800 rounded-xl p-6 border border-red-500/30">
          <button
            onClick={() => setExpandedSection(expandedSection === 'tosv' ? null : 'tosv')}
            className="w-full flex justify-between items-center"
          >
            <div>
              <h4 className="text-red-300 font-semibold">{data.tosvKeywords.title}</h4>
              <p className="text-gray-400 text-sm text-left">{data.tosvKeywords.purpose}</p>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'tosv' ? 'rotate-180' : ''}`} />
          </button>
          {expandedSection === 'tosv' && (
            <div className="mt-4 space-y-3">
              {data.tosvKeywords.categories?.map((cat: any, i: number) => (
                <div key={i} className="bg-red-500/5 rounded-lg p-3">
                  <p className="text-red-300 text-sm font-medium mb-2">{cat.category}</p>
                  <div className="flex flex-wrap gap-1">
                    {cat.keywords?.map((keyword: string, j: number) => (
                      <span key={j} className="px-2 py-0.5 bg-red-500/20 text-red-200 rounded text-xs">{keyword}</span>
                    ))}
                  </div>
                </div>
              ))}
              <p className="text-gray-400 text-xs italic mt-3">{data.tosvKeywords.action}</p>
            </div>
          )}
        </div>
      )}

      {/* Source of Funds Questionnaire */}
      {data.sourceOfFundsQuestionnaire && (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h4 className="text-blue-300 font-semibold mb-2">{data.sourceOfFundsQuestionnaire.title}</h4>
          <p className="text-gray-400 text-sm mb-4">{data.sourceOfFundsQuestionnaire.purpose}</p>
          <div className="grid md:grid-cols-2 gap-3">
            {data.sourceOfFundsQuestionnaire.acceptedValues?.map((item: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-3">
                <p className="text-white text-sm font-mono">{item.value}</p>
                <p className="text-gray-400 text-xs">{item.description}</p>
              </div>
            ))}
          </div>
          {data.sourceOfFundsQuestionnaire.riskImplications && (
            <p className="text-amber-300 text-sm mt-4 bg-amber-500/10 rounded p-3">{data.sourceOfFundsQuestionnaire.riskImplications}</p>
          )}
        </div>
      )}

      {/* PEP Questionnaire */}
      {data.pepQuestionnaire && (
        <div className="bg-slate-800 rounded-xl p-6 border border-amber-500/30">
          <h4 className="text-amber-300 font-semibold mb-4">{data.pepQuestionnaire.title}</h4>

          {data.pepQuestionnaire.definition && (
            <div className="bg-amber-500/10 rounded-lg p-4 mb-4">
              <h5 className="text-amber-300 text-sm font-semibold mb-2">{data.pepQuestionnaire.definition.title}</h5>
              <p className="text-gray-300 text-sm mb-3">{data.pepQuestionnaire.definition.description}</p>
              <p className="text-gray-500 text-xs font-semibold mb-2">Examples of PEP Positions:</p>
              <div className="grid md:grid-cols-2 gap-1">
                {data.pepQuestionnaire.definition.examples?.map((ex: string, i: number) => (
                  <span key={i} className="text-gray-300 text-xs">• {ex}</span>
                ))}
              </div>
            </div>
          )}

          {data.pepQuestionnaire.sections && (
            <div className="space-y-3">
              {data.pepQuestionnaire.sections.map((section: any, i: number) => (
                <div key={i} className="bg-slate-700/50 rounded-lg p-4">
                  <h5 className="text-white font-medium mb-2">{section.section}</h5>
                  {section.questions && (
                    <ul className="space-y-1">
                      {section.questions.map((q: string, j: number) => (
                        <li key={j} className="text-gray-300 text-sm">• {q}</li>
                      ))}
                    </ul>
                  )}
                  {section.content && <p className="text-gray-400 text-sm">{section.content}</p>}
                </div>
              ))}
            </div>
          )}

          {data.pepQuestionnaire.consequence && (
            <p className="text-amber-300 text-sm mt-4">{data.pepQuestionnaire.consequence}</p>
          )}
        </div>
      )}

      {/* High-Risk Country EDD */}
      {data.highRiskCountryEDD && (
        <div className="bg-slate-800 rounded-xl p-6 border border-red-500/30">
          <h4 className="text-red-300 font-semibold mb-2">{data.highRiskCountryEDD.title}</h4>
          <p className="text-gray-400 text-sm mb-4">{data.highRiskCountryEDD.regulatoryBasis}</p>

          {data.highRiskCountryEDD.sections && (
            <div className="space-y-3">
              {data.highRiskCountryEDD.sections.map((section: any, i: number) => (
                <div key={i} className="bg-slate-700/50 rounded-lg p-4">
                  <h5 className="text-white font-medium mb-2">{section.section}</h5>
                  <div className="flex flex-wrap gap-2">
                    {section.fields?.map((field: string, j: number) => (
                      <span key={j} className="px-2 py-1 bg-red-500/10 text-red-200 rounded text-xs">{field}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {data.highRiskCountryEDD.purpose && (
            <p className="text-gray-400 text-sm mt-4 italic">{data.highRiskCountryEDD.purpose}</p>
          )}
        </div>
      )}

      {/* Priority Customer Workflow */}
      {data.priorityCustomerWorkflow && (
        <div className="bg-slate-800 rounded-xl p-6 border border-emerald-500/30">
          <h4 className="text-emerald-300 font-semibold mb-2">{data.priorityCustomerWorkflow.title}</h4>
          <p className="text-gray-400 text-sm mb-4">{data.priorityCustomerWorkflow.purpose}</p>

          {data.priorityCustomerWorkflow.workflow && (
            <div className="bg-emerald-500/10 rounded-lg p-4 mb-4">
              <p className="text-emerald-300 text-xs font-semibold mb-3">Fast-Track Workflow</p>
              <div className="space-y-2">
                {data.priorityCustomerWorkflow.workflow.map((step: any, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="bg-emerald-500/30 text-emerald-200 w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">{step.step}</span>
                    <div>
                      <span className="text-white text-sm font-medium">{step.action}</span>
                      <span className="text-gray-400 text-sm"> - {step.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.priorityCustomerWorkflow.riskControls && (
            <div className="bg-slate-700/50 rounded-lg p-4">
              <p className="text-amber-300 text-xs font-semibold mb-2">Risk Controls During Provisional Period:</p>
              <ul className="space-y-1">
                {data.priorityCustomerWorkflow.riskControls.map((control: string, i: number) => (
                  <li key={i} className="text-gray-300 text-sm">• {control}</li>
                ))}
              </ul>
            </div>
          )}

          {data.priorityCustomerWorkflow.note && (
            <p className="text-gray-500 text-xs mt-4 italic">{data.priorityCustomerWorkflow.note}</p>
          )}
        </div>
      )}
    </div>
  );
}

// SAR Requirements Block (Section 3.2)
function SARRequirementsBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>

      {data.thresholds && (
        <div className="mb-4">
          <h4 className="text-amber-300 font-medium mb-3">Filing Thresholds</h4>
          <div className="space-y-2">
            {data.thresholds.map((t: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-3 flex justify-between items-center">
                <div>
                  <span className="text-white">{t.category}</span>
                  <p className="text-gray-500 text-sm">{t.detail}</p>
                </div>
                <span className="text-amber-300 font-semibold">{t.threshold}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.process && (
        <div className="mb-4">
          <h4 className="text-blue-300 font-medium mb-3">SAR Process</h4>
          <div className="space-y-2">
            {data.process.map((p: any, i: number) => (
              <div key={i} className="flex items-start gap-3">
                <span className="bg-blue-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">{p.step}</span>
                <div>
                  <span className="text-gray-300 text-sm font-medium">{p.action}</span>
                  {p.detail && <span className="text-gray-500 text-sm"> - {p.detail}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.timeline && (
        <p className="text-amber-300 text-sm mb-4">⏱️ {data.timeline}</p>
      )}

      {data.confidentiality && (
        <div className="bg-slate-700/50 rounded-lg p-4">
          <h4 className="text-red-300 font-medium mb-3">{data.confidentiality.title || 'Confidentiality Rules'}</h4>
          <div className="space-y-2">
            {data.confidentiality.rules?.map((r: any, i: number) => (
              <div key={i}>
                <p className="text-white text-sm">🔒 {r.rule}</p>
                <p className="text-gray-400 text-sm ml-5">{r.detail}</p>
              </div>
            ))}
          </div>
          {data.confidentiality.warning && (
            <p className="text-red-300 text-sm mt-3">⚠️ {data.confidentiality.warning}</p>
          )}
        </div>
      )}
    </div>
  );
}

// Risk Assessment Framework Block (Section 3.2)
function RiskAssessmentFrameworkBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>

      {data.categories && (
        <div className="space-y-4 mb-6">
          {data.categories.map((cat: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                {cat.icon && <span>{cat.icon}</span>} {cat.category}
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-600">
                      <th className="text-left text-gray-400 py-2 pr-2">Factor</th>
                      <th className="text-center text-red-400 py-2 px-2">High</th>
                      <th className="text-center text-amber-400 py-2 px-2">Medium</th>
                      <th className="text-center text-emerald-400 py-2 px-2">Low</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cat.factors?.map((f: any, j: number) => (
                      <tr key={j} className="border-b border-slate-600/50">
                        <td className="text-white py-2 pr-2">{f.factor}</td>
                        <td className="text-red-300 py-2 px-2 text-center text-xs">{f.high}</td>
                        <td className="text-amber-300 py-2 px-2 text-center text-xs">{f.medium}</td>
                        <td className="text-emerald-300 py-2 px-2 text-center text-xs">{f.low}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      {data.riskRatings && (
        <div className="space-y-4">
          <h4 className="text-white font-medium text-lg mb-4">Risk Rating Outcomes</h4>
          {data.riskRatings.map((r: any, i: number) => {
            const bgColor = r.rating === 'Prohibited' ? 'border-l-red-500' :
                           r.rating === 'High' ? 'border-l-amber-500' :
                           r.rating === 'Medium' ? 'border-l-yellow-500' : 'border-l-emerald-500';
            const textColor = r.rating === 'Prohibited' ? 'text-red-400' :
                              r.rating === 'High' ? 'text-amber-400' :
                              r.rating === 'Medium' ? 'text-yellow-400' : 'text-emerald-400';

            return (
              <div key={i} className={`bg-slate-700/50 rounded-lg p-5 border-l-4 ${bgColor}`}>
                <div className="flex items-center justify-between mb-4">
                  <span className={`${textColor} font-semibold text-lg`}>{r.rating}</span>
                  {r.approval && (
                    <span className="text-red-400 text-sm bg-red-500/20 px-3 py-1 rounded">{r.approval}</span>
                  )}
                </div>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <p className="text-gray-400 text-sm mb-2">Criteria</p>
                    <p className="text-gray-200">{r.criteria}</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <p className="text-gray-400 text-sm mb-2">Monitoring</p>
                    <p className="text-gray-200">{r.monitoring}</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <p className="text-gray-400 text-sm mb-2">Refresh Cycle</p>
                    <p className="text-gray-200">{r.refresh || 'N/A'}</p>
                  </div>
                </div>
                {r.examples && (
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Examples</p>
                    <div className="flex flex-wrap gap-2">
                      {r.examples.map((ex: string, j: number) => (
                        <span key={j} className="text-gray-300 text-sm bg-slate-600/50 px-3 py-1 rounded">{ex}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sphere Prohibited Countries List (for Prohibited rating) */}
                {r.sphereProhibitedCountries && (
                  <div className="mt-4 bg-red-500/10 rounded-lg p-4 border border-red-500/30">
                    <p className="text-red-400 font-semibold mb-3">Sphere Prohibited Countries ({r.sphereProhibitedCountries.count} total)</p>
                    <div className="space-y-3">
                      {r.sphereProhibitedCountries.categories.map((cat: any, k: number) => (
                        <div key={k}>
                          <p className="text-gray-400 text-xs font-semibold mb-1">{cat.category}</p>
                          <div className="flex flex-wrap gap-1">
                            {cat.countries.map((country: string, l: number) => (
                              <span key={l} className="text-red-300 text-xs bg-red-500/20 px-2 py-0.5 rounded">{country}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sphere Prohibited Business Types (for Prohibited rating) */}
                {r.sphereProhibitedBusinessTypes && (
                  <div className="mt-4 bg-red-500/10 rounded-lg p-4 border border-red-500/30">
                    <p className="text-red-400 font-semibold mb-3">Sphere Prohibited Business Types ({r.sphereProhibitedBusinessTypes.count} total)</p>
                    <div className="space-y-3">
                      {r.sphereProhibitedBusinessTypes.categories.map((cat: any, k: number) => (
                        <div key={k}>
                          <p className="text-gray-400 text-xs font-semibold mb-1">{cat.category}</p>
                          <div className="flex flex-wrap gap-1">
                            {cat.types.map((type: string, l: number) => (
                              <span key={l} className="text-red-300 text-xs bg-red-500/20 px-2 py-0.5 rounded">{type}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Sphere Compliance Approach Block (Section 3.2)
function SphereComplianceApproachBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-6 text-xl">{data.title}</h3>

      {data.philosophy && (
        <div className="mb-8">
          <h4 className="text-emerald-300 font-medium mb-4 text-lg">Philosophy</h4>
          <div className="space-y-4">
            {data.philosophy.map((p: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-5 border-l-4 border-emerald-500">
                <h5 className="text-white font-semibold text-base mb-3">{p.principle}</h5>
                <p className="text-gray-300 mb-4">{p.explanation}</p>
                <div className="bg-emerald-500/10 rounded-lg p-3">
                  <p className="text-emerald-400 text-sm">
                    <span className="font-semibold">Implementation:</span> {p.implementation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.technologyStack && (
        <div className="mb-8">
          <h4 className="text-blue-300 font-medium mb-4 text-lg">Technology Stack</h4>
          <div className="space-y-4">
            {data.technologyStack.map((t: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-white font-semibold">{t.component}</p>
                  {t.vendor && (
                    <span className="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded">{t.vendor}</span>
                  )}
                </div>
                <p className="text-gray-400">{t.function}</p>
                {t.vendorDetail && (
                  <p className="text-gray-500 text-sm mt-2 border-l-2 border-blue-500/30 pl-3">{t.vendorDetail}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.teamStructure && (
        <div>
          <h4 className="text-purple-300 font-medium mb-4 text-lg">Team Structure</h4>
          <div className="space-y-4">
            {data.teamStructure.map((t: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-5">
                <p className="text-white font-semibold mb-2">{t.role}</p>
                <p className="text-gray-400">{t.responsibility}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Red Flags Block (Section 3.2)
function RedFlagsBlock({ data }: { data: any }) {
  const [expandedTypology, setExpandedTypology] = useState<string | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>

      {data.categories && (
        <div className="space-y-4 mb-6">
          {data.categories.map((cat: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                {cat.icon && <span>{cat.icon}</span>} {cat.category}
              </h4>
              <div className="space-y-2">
                {cat.flags?.map((f: any, j: number) => (
                  <div key={j} className="flex justify-between items-start py-2 border-b border-slate-600 last:border-0">
                    <div className="flex-1">
                      <span className="text-white text-sm">{f.flag}</span>
                      <p className="text-gray-400 text-sm">{f.detail}</p>
                    </div>
                    <span className={`text-xs ml-3 ${f.severity === 'High' ? 'text-red-400' : 'text-amber-400'}`}>
                      {f.severity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {data.responseToRedFlags && (
        <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
          <h4 className="text-blue-300 font-medium mb-4">Response Process</h4>
          <div className="space-y-3">
            {data.responseToRedFlags.map((r: any, i: number) => (
              <div key={i} className="flex items-start gap-3">
                <span className="bg-blue-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <div>
                  <p className="text-white font-medium">{r.step}</p>
                  <p className="text-gray-400 text-sm">{r.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sphere Financial Crime Typologies */}
      {data.sphereFinancialCrimeTypologies && (
        <div className="border-t border-slate-600 pt-6">
          <h4 className="text-purple-300 font-medium mb-2 text-lg">{data.sphereFinancialCrimeTypologies.title}</h4>
          <p className="text-gray-500 text-sm mb-4">{data.sphereFinancialCrimeTypologies.subtitle}</p>
          <div className="space-y-2 mb-6">
            {data.sphereFinancialCrimeTypologies.typologies?.map((t: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedTypology(expandedTypology === t.typology ? null : t.typology)}
                  className="w-full p-3 text-left flex justify-between items-center hover:bg-slate-700 transition"
                >
                  <span className="text-white text-sm font-medium">{t.typology}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedTypology === t.typology ? 'rotate-180' : ''}`} />
                </button>
                {expandedTypology === t.typology && (
                  <div className="px-3 pb-3 space-y-2">
                    <p className="text-gray-400 text-sm">{t.definition}</p>
                    <div>
                      <p className="text-red-400 text-xs font-semibold mb-1">Red Flags:</p>
                      <ul className="space-y-1">
                        {t.redFlags.map((rf: string, j: number) => (
                          <li key={j} className="text-gray-300 text-xs">• {rf}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Rule Lifecycle */}
          {data.sphereFinancialCrimeTypologies.ruleLifecycle && (
            <div className="bg-blue-500/10 rounded-lg p-4">
              <h5 className="text-blue-300 font-medium mb-3">{data.sphereFinancialCrimeTypologies.ruleLifecycle.title}</h5>
              <div className="space-y-2">
                {data.sphereFinancialCrimeTypologies.ruleLifecycle.stages.map((s: any, i: number) => (
                  <div key={i} className="flex gap-3">
                    <span className="bg-blue-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                    <div>
                      <p className="text-white text-sm font-medium">{s.stage}</p>
                      <p className="text-gray-400 text-xs">{s.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Sanctions Regimes Block (Section 3.3)
function SanctionsRegimesBlock({ data }: { data: any }) {
  const [expandedRegime, setExpandedRegime] = useState<string | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>

      <div className="space-y-2">
        {data.regimes?.map((r: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedRegime(expandedRegime === r.regime ? null : r.regime)}
              className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-700 transition"
            >
              <div className="flex items-center gap-3">
                {r.icon && <span className="text-2xl">{r.icon}</span>}
                <div>
                  <span className="text-white font-medium">{r.regime}</span>
                  {r.fullName && <p className="text-gray-500 text-sm">{r.fullName}</p>}
                </div>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedRegime === r.regime ? 'rotate-180' : ''}`} />
            </button>
            {expandedRegime === r.regime && (
              <div className="px-4 pb-4 space-y-4">
                <div className="text-sm space-y-1">
                  <p><span className="text-gray-500">Agency:</span><span className="text-white ml-2">{r.agency}</span></p>
                  <p><span className="text-gray-500">Scope:</span><span className="text-gray-300 ml-2">{r.scope}</span></p>
                </div>

                {r.lists && (
                  <div className="space-y-2">
                    {r.lists.map((l: any, j: number) => (
                      <div key={j} className="text-sm">
                        <span className="text-blue-400">{l.list}</span>
                        {l.count && <span className="text-gray-600 ml-1">({l.count})</span>}
                        <span className="text-gray-400 ml-2">{l.description}</span>
                      </div>
                    ))}
                  </div>
                )}

                {r.keyPrinciples && (
                  <div className="space-y-2">
                    {r.keyPrinciples.map((p: any, j: number) => (
                      <div key={j} className="text-sm">
                        {typeof p === 'string' ? (
                          <p className="text-gray-300">{p}</p>
                        ) : (
                          <p>
                            <span className="text-amber-400 font-medium">{p.principle}:</span>
                            <span className="text-gray-400 ml-1">{p.context}</span>
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {r.realWorldExamples && (
                  <div className="space-y-2">
                    {r.realWorldExamples.map((ex: any, j: number) => (
                      <div key={j} className="text-sm bg-slate-800/50 rounded p-3">
                        <p className="text-white font-medium">{ex.example}</p>
                        <p className="text-gray-400">{ex.violation || ex.context}</p>
                        {ex.consequence && <p className="text-red-400">{ex.consequence}</p>}
                        {ex.lesson && <p className="text-gray-500 text-xs mt-1">💡 {ex.lesson}</p>}
                      </div>
                    ))}
                  </div>
                )}

                {r.sphereImplication && (
                  <p className="text-emerald-400 text-sm">✓ Sphere: {r.sphereImplication}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// What Gets Screened Block (Section 3.3)
function WhatGetsScreenedBlock({ data }: { data: any }) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>
      {data.introduction && (
        <p className="text-gray-400 mb-6">{data.introduction}</p>
      )}

      <div className="space-y-2">
        {data.categories?.map((cat: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedCategory(expandedCategory === cat.category ? null : cat.category)}
              className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-700 transition"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{cat.icon}</span>
                <div>
                  <p className="text-white font-semibold">{cat.category}</p>
                  {cat.whyItMatters && (
                    <p className="text-gray-400 text-sm line-clamp-1">{cat.whyItMatters}</p>
                  )}
                </div>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${expandedCategory === cat.category ? 'rotate-180' : ''}`} />
            </button>
            {expandedCategory === cat.category && (
              <div className="px-4 pb-4 space-y-4">
                {cat.whyItMatters && (
                  <p className="text-gray-400 text-sm leading-relaxed">{cat.whyItMatters}</p>
                )}

                {cat.items && (
                  <div className="space-y-2">
                    {cat.items.map((item: any, j: number) => (
                      <div key={j} className="text-sm">
                        <span className="text-blue-400 font-medium">{item.item}</span>
                        <span className="text-gray-400 ml-2">{item.detail}</span>
                        {item.challenge && (
                          <p className="text-amber-400 mt-1 ml-4">⚠️ {item.challenge}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {cat.howItWorks && (
                  <p className="text-gray-300 text-sm leading-relaxed">{cat.howItWorks}</p>
                )}

                {cat.example && (
                  <p className="text-emerald-400 text-sm">💡 {cat.example}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// High Risk Jurisdictions Block (Section 3.3)
function HighRiskJurisdictionsBlock({ data }: { data: any }) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const getRiskColor = (riskLevel: string) => {
    if (riskLevel?.includes('PROHIBITED')) return 'text-red-400';
    if (riskLevel?.includes('HIGH')) return 'text-orange-400';
    if (riskLevel?.includes('ELEVATED')) return 'text-yellow-400';
    return 'text-gray-400';
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>

      <div className="space-y-2 mb-6">
        {data.jurisdictionCategories?.map((cat: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedCategory(expandedCategory === cat.category ? null : cat.category)}
              className="w-full p-4 text-left flex justify-between items-center hover:bg-slate-700 transition"
            >
              <div className="flex items-center gap-3">
                <span className="text-white font-medium">{cat.category}</span>
                <span className={`text-sm ${getRiskColor(cat.riskLevel)}`}>{cat.riskLevel}</span>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedCategory === cat.category ? 'rotate-180' : ''}`} />
            </button>
            {expandedCategory === cat.category && (
              <div className="px-4 pb-4 space-y-4">
                {cat.explanation && (
                  <p className="text-gray-400 text-sm leading-relaxed">{cat.explanation}</p>
                )}

                {cat.assessment && (
                  <p className="text-blue-300 text-sm bg-blue-500/10 rounded p-2">
                    📊 {cat.assessment}
                  </p>
                )}

                {cat.jurisdictions && (
                  <div className="space-y-2">
                    {cat.jurisdictions.map((j: any, k: number) => (
                      <div key={k} className="bg-slate-800/50 rounded p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{j.icon}</span>
                          <span className="text-white font-medium">{j.country}</span>
                          {j.status && <span className="text-blue-400 text-xs ml-auto">{j.status}</span>}
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">{j.detail}</p>
                        {j.exception && <p className="text-emerald-400 text-sm mt-2">↳ Exception: {j.exception}</p>}
                      </div>
                    ))}
                  </div>
                )}

                {cat.eddRequirements && (
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wide mb-2">EDD Requirements</p>
                    <ul className="space-y-1">
                      {cat.eddRequirements.map((req: string, k: number) => (
                        <li key={k} className="text-gray-300 text-sm">• {req}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {cat.spherePolicy && (
                  <p className="text-emerald-400 text-sm">✓ Sphere: {cat.spherePolicy}</p>
                )}

                {cat.sphereProhibitedNote && (
                  <p className="text-amber-400 text-sm bg-amber-500/10 rounded p-2 mt-2">
                    ⚠️ {cat.sphereProhibitedNote}
                  </p>
                )}

                {cat.customerCommunication && (
                  <p className="text-gray-400 text-sm">
                    <span className="text-gray-500">Customer Communication:</span> {cat.customerCommunication}
                  </p>
                )}

              </div>
            )}
          </div>
        ))}
      </div>

      {data.nuancedApproach && (
        <div className="bg-slate-700/50 rounded-lg p-4">
          <h4 className="text-white font-medium mb-2">{data.nuancedApproach.title}</h4>
          <p className="text-gray-400 text-sm mb-4">{data.nuancedApproach.explanation}</p>
          <div className="space-y-2">
            {data.nuancedApproach.tiers?.map((t: any, i: number) => {
              const textColor = t.tier === 'Prohibited' ? 'text-red-400' :
                           t.tier === 'Highly Restricted' ? 'text-orange-400' :
                           t.tier === 'Enhanced Scrutiny' ? 'text-yellow-400' : 'text-emerald-400';
              return (
                <div key={i} className="bg-slate-800/50 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <p className={`font-medium text-sm ${textColor}`}>{t.tier}</p>
                    {t.examples && <span className="text-gray-500 text-xs">{t.examples}</span>}
                  </div>
                  <p className="text-gray-300 text-sm">{t.treatment}</p>
                  {t.context && <p className="text-gray-500 text-xs mt-1">{t.context}</p>}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// Screening Flow Diagram Block (Section 3.3)
function ScreeningFlowDiagramBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>

      <div className="space-y-4">
        {/* Step 1: Initiation */}
        <div className="text-sm">
          <span className="text-blue-400 font-medium">1. Transaction Initiated</span>
          <span className="text-gray-400 ml-2">→ Customer initiates payment</span>
        </div>

        {/* Step 2: Pre-screening */}
        <div className="text-sm">
          <span className="text-blue-400 font-medium">2. Pre-Transaction Screening</span>
          <span className="text-gray-400 ml-2">→ Automated screening of all parties, jurisdictions, wallets</span>
          <div className="flex flex-wrap gap-2 mt-2 ml-4">
            {['Sender', 'Recipient', 'Beneficial owners', 'Jurisdiction', 'Wallet history', 'Purpose'].map((item, i) => (
              <span key={i} className="text-gray-500 text-xs bg-slate-700/50 px-2 py-1 rounded">{item}</span>
            ))}
          </div>
        </div>

        {/* Step 3: Results */}
        <div>
          <p className="text-sm text-blue-400 font-medium mb-3">3. Screening Result</p>
          <div className="space-y-2 ml-4">
            <p className="text-sm">
              <span className="text-emerald-400 font-medium">Clear</span>
              <span className="text-gray-400 ml-2">→ Proceed to settlement</span>
            </p>
            <p className="text-sm">
              <span className="text-amber-400 font-medium">Potential Match</span>
              <span className="text-gray-400 ml-2">→ Held for analyst review (see Flagged Payment process)</span>
            </p>
            <p className="text-sm">
              <span className="text-red-400 font-medium">Confirmed Hit</span>
              <span className="text-gray-400 ml-2">→ Blocked, escalated, documented</span>
            </p>
          </div>
        </div>
      </div>

      {/* Key principles */}
      {data.keyPrinciples && (
        <div className="mt-6 pt-4 border-t border-slate-700">
          <div className="space-y-1">
            {data.keyPrinciples.map((p: string, i: number) => (
              <p key={i} className="text-emerald-400 text-sm">✓ {p}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Documentation Requirements Block (Section 3.3)
function DocumentationRequirementsBlock({ data }: { data: any }) {
  const [expandedFlag, setExpandedFlag] = useState<string | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>
      {data.introduction && (
        <p className="text-gray-400 mb-6">{data.introduction}</p>
      )}

      <div className="space-y-2">
        {data.byFlagType?.map((f: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedFlag(expandedFlag === f.flagType ? null : f.flagType)}
              className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-700 transition"
            >
              <div>
                <p className="text-amber-300 font-medium">{f.flagType}</p>
                <p className="text-gray-400 text-sm">{f.scenario}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-blue-400 text-sm">{f.timeline}</span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedFlag === f.flagType ? 'rotate-180' : ''}`} />
              </div>
            </button>
            {expandedFlag === f.flagType && (
              <div className="px-4 pb-4 space-y-4">
                {f.whyFlagged && (
                  <p className="text-sm text-gray-400 leading-relaxed">
                    <span className="text-amber-400 font-medium">Why flagged:</span> {f.whyFlagged}
                  </p>
                )}

                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wide mb-2">Required Documentation</p>
                  <ul className="space-y-1">
                    {f.requiredDocumentation?.map((d: string, j: number) => (
                      <li key={j} className="text-gray-300 text-sm">• {d}</li>
                    ))}
                  </ul>
                </div>

                <p className="text-emerald-400 text-sm leading-relaxed">
                  <span className="font-medium">Purpose:</span> {f.purpose}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Flagged Payment Process Block (Section 3.3)
function FlaggedPaymentProcessBlock({ data }: { data: any }) {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const steps = data.process?.steps || [];

  // Color coding based on step type
  const getStepColors = (step: number) => {
    switch (step) {
      case 1: return { border: 'border-blue-500', bg: 'bg-blue-500', text: 'text-blue-400', label: 'Notification' };
      case 2: return { border: 'border-amber-500', bg: 'bg-amber-500', text: 'text-amber-400', label: 'Review' };
      case 3: return { border: 'border-purple-500', bg: 'bg-purple-500', text: 'text-purple-400', label: 'Documentation' };
      case 4: return { border: 'border-amber-500', bg: 'bg-amber-500', text: 'text-amber-400', label: 'Review' };
      case 5: return { border: 'border-green-500', bg: 'bg-green-500', text: 'text-green-400', label: 'Resolution' };
      default: return { border: 'border-slate-500', bg: 'bg-slate-500', text: 'text-slate-400', label: '' };
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      <p className="text-gray-400 text-sm mb-6">Click any step to see customer communication templates and outcomes.</p>

      {/* Vertical flow of steps */}
      <div className="space-y-2 mb-6">
        {steps.map((s: any, i: number) => {
          const colors = getStepColors(s.step);
          const isExpanded = expandedStep === s.step;

          return (
            <div key={s.step} className={`bg-slate-700/50 rounded-lg overflow-hidden border-l-4 ${colors.border}`}>
              <button
                onClick={() => setExpandedStep(isExpanded ? null : s.step)}
                className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-600/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full ${colors.bg} text-white flex items-center justify-center text-sm font-semibold flex-shrink-0`}>
                    {s.step}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-white font-semibold">{s.title}</p>
                      <span className={`text-xs px-2 py-0.5 rounded ${colors.text} bg-slate-800/50`}>{s.timing}</span>
                    </div>
                    <p className="text-gray-400 text-sm">{s.whatHappens}</p>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-600/50 space-y-2">
                  {/* Outcomes */}
                  {s.outcomes && (
                    <div>
                      <p className="text-gray-500 text-xs mb-2 uppercase tracking-wide">Possible Outcomes</p>
                      <div className="flex flex-wrap gap-2">
                        {s.outcomes.map((outcome: string, j: number) => {
                          const isPositive = outcome.toLowerCase().includes('clear') || outcome.toLowerCase().includes('approved') || outcome.toLowerCase().includes('resolved');
                          const isNegative = outcome.toLowerCase().includes('reject') || outcome.toLowerCase().includes('block');
                          return (
                            <span
                              key={j}
                              className={`px-3 py-1 rounded text-sm ${
                                isPositive ? 'bg-green-500/20 text-green-400 ' :
                                isNegative ? 'bg-red-500/20 text-red-400 ' :
                                'bg-amber-500/20 text-amber-400 '
                              }`}
                            >
                              {outcome}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Documentation timeline (for step 3) */}
                  {s.documentationTimeline && (
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <p className="text-gray-500 text-xs mb-2 uppercase tracking-wide">Documentation Timeline</p>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <p className="text-gray-500">Standard</p>
                          <p className="text-white">{s.documentationTimeline.standard}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Extension</p>
                          <p className="text-white">{s.documentationTimeline.extension}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">If Expired</p>
                          <p className="text-amber-400">{s.documentationTimeline.expired}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Customer communication template */}
                  {s.customerCommunication && (
                    <div className="bg-blue-500/10 rounded-lg p-3">
                      <p className="text-blue-400 font-medium text-sm mb-2">📧 {s.customerCommunication.subject}</p>
                      <pre className="text-gray-400 text-xs whitespace-pre-wrap font-sans bg-slate-800/50 rounded p-3">{s.customerCommunication.template}</pre>
                    </div>
                  )}

                  {/* Approved/Rejected communications (for step 5) */}
                  {s.approvedCommunication && (
                    <div className="bg-green-500/10 rounded-lg p-3">
                      <p className="text-green-400 font-medium text-sm mb-2">✓ {s.approvedCommunication.subject}</p>
                      <pre className="text-gray-400 text-xs whitespace-pre-wrap font-sans bg-slate-800/50 rounded p-3">{s.approvedCommunication.template}</pre>
                    </div>
                  )}
                  {s.rejectedCommunication && (
                    <div className="bg-red-500/20 rounded-lg p-3">
                      <p className="text-red-400 font-medium text-sm mb-2">✗ {s.rejectedCommunication.subject}</p>
                      <pre className="text-gray-400 text-xs whitespace-pre-wrap font-sans bg-slate-800/50 rounded p-3">{s.rejectedCommunication.template}</pre>
                    </div>
                  )}
                </div>
              )}

              {/* Connector line to next step */}
              {i < steps.length - 1 && (
                <div className="flex justify-center -mb-3 relative z-10">
                  <div className="w-0.5 h-3 bg-slate-600" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Timeline expectations - compact grid */}
      {data.timelineExpectations && (
        <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
          <h4 className="text-white font-semibold text-sm mb-3">{data.timelineExpectations.title}</h4>
          <div className="grid md:grid-cols-3 gap-3">
            {data.timelineExpectations.scenarios?.map((s: any, i: number) => (
              <div key={i} className="bg-slate-800/50 rounded-lg p-3">
                <p className="text-gray-400 text-xs mb-1">{s.scenario}</p>
                <p className="text-blue-300 font-medium text-sm">{s.typical}</p>
                {s.withDocs && <p className="text-gray-500 text-xs">+docs: {s.withDocs}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Escalation path */}
      {data.escalationPath && (
        <div className="bg-slate-700/50 rounded-lg p-4">
          <h4 className="text-white font-semibold text-sm mb-2">{data.escalationPath.title}</h4>
          {data.escalationPath.introduction && (
            <p className="text-gray-400 text-xs mb-4">{data.escalationPath.introduction}</p>
          )}
          <div className="space-y-2">
            {data.escalationPath.levels?.map((l: any, i: number, arr: any[]) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-semibold flex-shrink-0">
                    {i + 1}
                  </div>
                  {i < arr.length - 1 && <div className="w-0.5 h-full min-h-[32px] bg-slate-600 mt-1" />}
                </div>
                <div className="flex-1 pb-2">
                  <p className="text-blue-300 font-semibold text-sm">{l.level}</p>
                  <p className="text-white text-xs">{l.handles}</p>
                  {l.context && <p className="text-gray-500 text-xs mt-1">{l.context}</p>}
                  {l.whenToEscalate && (
                    <p className="text-amber-400 text-xs mt-1">↑ {l.whenToEscalate}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Travel Rule Summary Block (Section 3.4)
function TravelRuleSummaryBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>
      <div className="bg-slate-700/50 rounded-lg p-5 mb-6">
        <p className="text-gray-300 text-lg">{data.definition}</p>
      </div>
      {data.keyTakeaways && (
        <div className="mb-6">
          <h4 className="text-gray-400 text-sm uppercase mb-4">Key Takeaways</h4>
          <div className="space-y-3">
            {data.keyTakeaways.map((t: string, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-4 text-gray-300">• {t}</div>
            ))}
          </div>
        </div>
      )}
      {data.spherePosition && (
        <div className="bg-emerald-500/10 rounded-lg p-5 mb-4">
          <p className="text-emerald-400"><span className="font-semibold">Sphere Position:</span> {data.spherePosition}</p>
        </div>
      )}
      {data.whyItMatters && (
        <div className="bg-amber-500/10 rounded-lg p-5">
          <p className="text-amber-400">{data.whyItMatters}</p>
        </div>
      )}
    </div>
  );
}

// FATF Definition Block (Section 3.4)
function FATFDefinitionBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-6 text-xl">{data.title}</h3>
      {data.whatIsFATF && (
        <div className="bg-slate-700/50 rounded-lg p-5 mb-6">
          <h4 className="text-white font-semibold mb-2">{data.whatIsFATF.fullName}</h4>
          <p className="text-gray-400 mb-4">{data.whatIsFATF.description}</p>
          <div className="bg-amber-500/10 rounded-lg p-4">
            <p className="text-amber-400"><span className="font-medium">Relevant:</span> {data.whatIsFATF.relevantRecommendation}</p>
          </div>
        </div>
      )}
      {data.recommendation16 && (
        <div className="bg-slate-700/50 rounded-lg p-5 mb-6">
          <h4 className="text-white font-semibold mb-4">{data.recommendation16.title}</h4>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-slate-800/50 rounded-lg p-4">
              <p className="text-gray-500 text-sm mb-1">Original Scope</p>
              <p className="text-gray-300">{data.recommendation16.originalScope}</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <p className="text-gray-500 text-sm mb-1">Extended To</p>
              <p className="text-gray-300">{data.recommendation16.extension}</p>
            </div>
          </div>
          {data.recommendation16.keyLanguage && (
            <div className="bg-blue-500/10 rounded-lg p-4">
              <p className="text-blue-300 italic">"{data.recommendation16.keyLanguage}"</p>
            </div>
          )}
        </div>
      )}
      {data.sunriseIssue && (
        <div className="bg-slate-700/50 rounded-lg p-5">
          <h4 className="text-amber-400 font-semibold mb-4">{data.sunriseIssue.title}</h4>
          <div className="bg-slate-800/50 rounded-lg p-4 mb-4">
            <p className="text-gray-500 text-sm mb-1">Problem</p>
            <p className="text-gray-300">{data.sunriseIssue.problem}</p>
          </div>
          <div className="bg-emerald-500/10 rounded-lg p-4">
            <p className="text-emerald-400"><span className="font-semibold">Sphere Approach:</span> {data.sunriseIssue.sphereApproach}</p>
          </div>
        </div>
      )}
      {data.vaspReminder && (
        <div className="bg-purple-500/10 rounded-lg p-4 mt-6">
          <p className="text-purple-300 text-sm">📌 {data.vaspReminder}</p>
        </div>
      )}
    </div>
  );
}

// Required Data Elements Block (Section 3.4)
function RequiredDataElementsBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-6 text-xl">{data.title}</h3>
      {data.originatorRequirements && (
        <div className="mb-8">
          <h4 className="text-blue-300 font-medium mb-4 text-lg">{data.originatorRequirements.title}</h4>
          <div className="space-y-4">
            {data.originatorRequirements.required?.map((r: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-5">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-white font-semibold">{r.element}</span>
                  <span className="text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded text-sm">{r.required}</span>
                </div>
                {r.description && <p className="text-gray-400 mb-2">{r.description}</p>}
                {r.options && (
                  <div className="flex flex-wrap gap-2">
                    {r.options.map((opt: string, j: number) => (
                      <span key={j} className="text-gray-300 bg-slate-600/50 px-3 py-1 rounded text-sm">{opt}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {data.originatorRequirements.institutionRequirements && (
              <div className="mt-4 bg-slate-600/30 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-2">Institution Requirements:</p>
                <div className="space-y-2">
                  {data.originatorRequirements.institutionRequirements.map((ir: any, j: number) => (
                    <div key={j} className="flex justify-between items-center text-sm">
                      <span className="text-gray-300">{ir.element}</span>
                      <span className="text-blue-400">{ir.required}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {data.beneficiaryRequirements && (
        <div className="mb-8">
          <h4 className="text-purple-300 font-medium mb-4 text-lg">{data.beneficiaryRequirements.title}</h4>
          <div className="space-y-4">
            {data.beneficiaryRequirements.required?.map((r: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-5 flex justify-between items-center">
                <span className="text-white font-semibold">{r.element}</span>
                <span className="text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded text-sm">{r.required}</span>
              </div>
            ))}
            {data.beneficiaryRequirements.institutionRequirements && (
              <div className="mt-4 bg-slate-600/30 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-2">Institution Requirements:</p>
                <div className="space-y-2">
                  {data.beneficiaryRequirements.institutionRequirements.map((ir: any, j: number) => (
                    <div key={j} className="flex justify-between items-center text-sm">
                      <span className="text-gray-300">{ir.element}</span>
                      <span className="text-blue-400">{ir.required}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {data.whyEachMatters && (
        <div className="bg-slate-700/50 rounded-lg p-5">
          <h4 className="text-white font-semibold mb-4">Why Each Matters</h4>
          <div className="space-y-3">
            {data.whyEachMatters.map((w: any, i: number) => (
              <div key={i} className="bg-slate-800/50 rounded-lg p-4">
                <p className="text-gray-300 font-medium mb-1">{w.element}</p>
                <p className="text-gray-500">{w.purpose}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Thresholds by Jurisdiction Block (Section 3.4)
function ThresholdsByJurisdictionBlock({ data }: { data: any }) {
  const [expandedJurisdiction, setExpandedJurisdiction] = useState<string | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      <p className="text-gray-400 text-sm mb-4">Click any jurisdiction to expand details</p>
      {data.majorJurisdictions && (
        <div className="space-y-2 mb-4">
          {data.majorJurisdictions.map((j: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedJurisdiction(expandedJurisdiction === j.jurisdiction ? null : j.jurisdiction)}
                className="w-full p-3 text-left flex items-center justify-between hover:bg-slate-600/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  {j.flag && <span>{j.flag}</span>}
                  <span className="text-white">{j.jurisdiction}</span>
                  <span className="text-gray-400 text-sm">{j.threshold}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${j.status === 'Enforced' ? 'text-emerald-400' : 'text-amber-400'}`}>{j.status}</span>
                  <span className={`text-gray-400 transition-transform duration-200 ${expandedJurisdiction === j.jurisdiction ? 'rotate-180' : ''}`}>▼</span>
                </div>
              </button>
              {expandedJurisdiction === j.jurisdiction && (
                <div className="px-3 pb-3 border-t border-slate-600 pt-3 text-sm space-y-1">
                  <p className="text-gray-400">Regulator: {j.regulator}</p>
                  {j.regulation && <p className="text-blue-400">Regulation: {j.regulation}</p>}
                  {j.notes && <p className="text-gray-500">{j.notes}</p>}
                  {j.sphereImplication && <p className="text-emerald-400">Sphere: {j.sphereImplication}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {data.latinAmerica && (
        <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
          <h4 className="text-amber-400 font-medium mb-1">{data.latinAmerica.title}</h4>
          {data.latinAmerica.subtitle && (
            <p className="text-gray-500 text-sm mb-3">{data.latinAmerica.subtitle}</p>
          )}
          <div className="space-y-3">
            {data.latinAmerica.jurisdictions?.map((j: any, i: number) => (
              <div key={i} className="bg-slate-800/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white">{j.flag} {j.jurisdiction}</span>
                  <span className="text-gray-400 text-sm">- {j.threshold}</span>
                  <span className="text-gray-500 text-sm">({j.regulator})</span>
                  <span className={`text-xs ml-auto ${j.status === 'Enforced' ? 'text-emerald-400' : 'text-amber-400'}`}>{j.status}</span>
                </div>
                {j.details && (
                  <div className="mt-2 space-y-1 text-xs">
                    {j.details.keyRequirements && (
                      <div>
                        <span className="text-gray-500">Key Requirements: </span>
                        <span className="text-gray-400">{j.details.keyRequirements.join(', ')}</span>
                      </div>
                    )}
                    {j.details.pixIntegration && (
                      <p className="text-purple-400">💡 {j.details.pixIntegration}</p>
                    )}
                    {j.details.sphereOpportunity && (
                      <p className="text-emerald-400">🎯 {j.details.sphereOpportunity}</p>
                    )}
                  </div>
                )}
                {j.sphereImplication && <p className="text-blue-400 text-xs mt-2">Sphere: {j.sphereImplication}</p>}
              </div>
            ))}
          </div>
          {data.latinAmerica.regionalTrends && (
            <div className="mt-4 pt-3 border-t border-slate-600">
              <p className="text-gray-500 text-xs mb-2">Regional Trends:</p>
              <div className="flex flex-wrap gap-2">
                {data.latinAmerica.regionalTrends.map((trend: string, i: number) => (
                  <span key={i} className="text-amber-400 text-xs bg-amber-500/10 px-2 py-1 rounded">{trend}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {data.thresholdComparisonTable && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-600">
                {data.thresholdComparisonTable.headers?.map((h: string, i: number) => (
                  <th key={i} className="p-2 text-left text-gray-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.thresholdComparisonTable.rows?.map((row: string[], i: number) => (
                <tr key={i} className="border-b border-slate-700/50">
                  {row.map((cell: string, j: number) => (
                    <td key={j} className={`p-2 ${j === 0 ? 'text-white' : 'text-gray-400'}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Why Travel Rule Matters Block (Section 3.4)
function WhyTravelRuleMattersBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-6 text-xl">{data.title}</h3>

      <div className="space-y-4">
        {data.businessImplications?.map((b: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-5">
            <h4 className="text-blue-300 font-semibold mb-3">{b.implication}</h4>
            <p className="text-gray-300 mb-4">{b.detail}</p>
            <div className="bg-red-500/20 rounded-lg p-4">
              <p className="text-gray-500 text-sm mb-1">Impact</p>
              <p className="text-red-300">{b.impact}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Notabene Implementation Block (Section 3.4 - Sphere's Travel Rule Implementation)
function NotabeneImplementationBlock({ data }: { data: any }) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-purple-500/10 rounded-xl p-6 border border-purple-500/30">
        <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
        {data.subtitle && <p className="text-purple-300">{data.subtitle}</p>}
      </div>

      {/* Sphere Notabene Profile */}
      {data.sphereNotabeneProfile && (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h4 className="text-purple-300 font-semibold mb-4">{data.sphereNotabeneProfile.title}</h4>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-slate-700/50 rounded-lg p-4">
              <p className="text-gray-500 text-xs mb-1">Notabene DID</p>
              <p className="text-emerald-300 font-mono text-sm break-all">{data.sphereNotabeneProfile.notabeneId}</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <p className="text-gray-500 text-xs mb-1">Compliance Contact</p>
              <p className="text-gray-200">{data.sphereNotabeneProfile.complianceContact}</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <p className="text-gray-500 text-xs mb-1">KYC Vendor</p>
              <p className="text-gray-200">{data.sphereNotabeneProfile.kycVendor}</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <p className="text-gray-500 text-xs mb-1">UBO Threshold</p>
              <p className="text-gray-200">{data.sphereNotabeneProfile.uboThreshold}</p>
            </div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4">
            <p className="text-gray-500 text-xs mb-2">Supported Protocols</p>
            <div className="flex flex-wrap gap-2">
              {data.sphereNotabeneProfile.supportedProtocols?.map((protocol: string, i: number) => (
                <span key={i} className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm">{protocol}</span>
              ))}
            </div>
          </div>
          {data.sphereNotabeneProfile.note && (
            <p className="text-gray-400 text-sm mt-4 italic">{data.sphereNotabeneProfile.note}</p>
          )}
        </div>
      )}

      {/* VASP Detection Methods */}
      {data.vaspDetectionMethods && (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h4 className="text-blue-300 font-semibold mb-2">{data.vaspDetectionMethods.title}</h4>
          <p className="text-gray-400 mb-6">{data.vaspDetectionMethods.explanation}</p>

          <div className="space-y-4 mb-6">
            {data.vaspDetectionMethods.methods?.map((method: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-4">
                <h5 className="text-white font-medium mb-2">{method.method}</h5>
                <p className="text-gray-300 mb-3">{method.description}</p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-emerald-500/10 rounded p-3">
                    <p className="text-gray-500 text-xs mb-1">Accuracy</p>
                    <p className="text-emerald-300 text-sm">{method.accuracy}</p>
                  </div>
                  <div className="bg-amber-500/10 rounded p-3">
                    <p className="text-gray-500 text-xs mb-1">Limitation</p>
                    <p className="text-amber-300 text-sm">{method.limitation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {data.vaspDetectionMethods.decisionFlow && (
            <div className="bg-blue-500/10 rounded-lg p-4">
              <p className="text-blue-300 font-medium mb-3">Decision Flow</p>
              <div className="space-y-2">
                {data.vaspDetectionMethods.decisionFlow.map((step: any, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="bg-blue-500/30 text-blue-200 w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">{step.step}</span>
                    <p className="text-gray-300">{step.action}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Unhosted Wallet Handling */}
      {data.unhostedWalletHandling && (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h4 className="text-amber-300 font-semibold mb-2">{data.unhostedWalletHandling.title}</h4>
          <p className="text-gray-300 mb-2">{data.unhostedWalletHandling.definition}</p>
          <p className="text-gray-400 text-sm mb-6">{data.unhostedWalletHandling.regulatoryContext}</p>

          {data.unhostedWalletHandling.sphereApproach && (
            <div className="bg-purple-500/10 rounded-lg p-5 mb-4">
              <h5 className="text-purple-300 font-medium mb-4">{data.unhostedWalletHandling.sphereApproach.title}</h5>
              <div className="space-y-4">
                {data.unhostedWalletHandling.sphereApproach.methods?.map((method: any, i: number) => (
                  <div key={i} className="bg-slate-800/50 rounded-lg p-4">
                    <h6 className="text-white font-medium mb-2">{method.method}</h6>
                    <p className="text-gray-300 text-sm mb-2">{method.description}</p>
                    <p className="text-gray-400 text-xs mb-2"><span className="text-gray-500">How it works:</span> {method.howItWorks}</p>
                    <p className="text-emerald-300/80 text-xs"><span className="text-gray-500">Customer experience:</span> {method.customerExperience}</p>
                  </div>
                ))}
              </div>

              {data.unhostedWalletHandling.sphereApproach.dataCollected && (
                <div className="mt-4 bg-slate-800/50 rounded-lg p-4">
                  <p className="text-gray-400 text-sm font-medium mb-2">Data Collected for Unhosted Wallets:</p>
                  <div className="flex flex-wrap gap-2">
                    {data.unhostedWalletHandling.sphereApproach.dataCollected.map((item: string, i: number) => (
                      <span key={i} className="px-2 py-1 bg-slate-700 text-gray-300 rounded text-xs">{item}</span>
                    ))}
                  </div>
                </div>
              )}

              {data.unhostedWalletHandling.sphereApproach.riskConsiderations && (
                <p className="mt-4 text-amber-300/80 text-sm bg-amber-500/10 rounded p-3">{data.unhostedWalletHandling.sphereApproach.riskConsiderations}</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Counterparty Due Diligence */}
      {data.counterpartyDueDiligence && (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h4 className="text-blue-300 font-semibold mb-2">{data.counterpartyDueDiligence.title}</h4>
          <p className="text-gray-400 mb-6">{data.counterpartyDueDiligence.explanation}</p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {data.counterpartyDueDiligence.notabeneFeatures?.map((feature: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-4">
                <h5 className="text-white font-medium mb-2">{feature.feature}</h5>
                <p className="text-gray-300 text-sm mb-2">{feature.description}</p>
                <p className="text-emerald-300/80 text-xs">{feature.benefit}</p>
              </div>
            ))}
          </div>

          {data.counterpartyDueDiligence.sphereProcess && (
            <div className="bg-emerald-500/10 rounded-lg p-4">
              <p className="text-emerald-300 font-medium mb-3">Sphere's Due Diligence Process</p>
              <div className="space-y-2">
                {data.counterpartyDueDiligence.sphereProcess.map((step: any, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="bg-emerald-500/30 text-emerald-200 w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">{step.step}</span>
                    <p className="text-gray-300">{step.action}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Current Challenges */}
      {data.currentChallenges && (
        <div className="bg-slate-800 rounded-xl p-6 border border-red-500/30">
          <h4 className="text-red-300 font-semibold mb-2">{data.currentChallenges.title}</h4>
          <p className="text-gray-400 mb-6">{data.currentChallenges.subtitle}</p>

          <div className="space-y-6">
            {/* On-Ramp Challenges */}
            {data.currentChallenges.onRampChallenges && (
              <div>
                <h5 className="text-amber-300 font-medium mb-3">{data.currentChallenges.onRampChallenges.title}</h5>
                <div className="space-y-3">
                  {data.currentChallenges.onRampChallenges.issues?.map((issue: any, i: number) => (
                    <div key={i} className="bg-red-500/10 rounded-lg p-4">
                      <p className="text-red-300 font-medium mb-1">{issue.challenge}</p>
                      <p className="text-gray-400 text-sm mb-2">{issue.description}</p>
                      <p className="text-emerald-300/80 text-sm"><span className="text-gray-500">Mitigation:</span> {issue.currentMitigation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Off-Ramp Challenges */}
            {data.currentChallenges.offRampChallenges && (
              <div>
                <h5 className="text-amber-300 font-medium mb-3">{data.currentChallenges.offRampChallenges.title}</h5>
                <div className="space-y-3">
                  {data.currentChallenges.offRampChallenges.issues?.map((issue: any, i: number) => (
                    <div key={i} className="bg-red-500/10 rounded-lg p-4">
                      <p className="text-red-300 font-medium mb-1">{issue.challenge}</p>
                      <p className="text-gray-400 text-sm mb-2">{issue.description}</p>
                      <p className="text-emerald-300/80 text-sm"><span className="text-gray-500">Mitigation:</span> {issue.currentMitigation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* System Challenges */}
            {data.currentChallenges.systemChallenges && (
              <div>
                <h5 className="text-amber-300 font-medium mb-3">{data.currentChallenges.systemChallenges.title}</h5>
                <div className="space-y-3">
                  {data.currentChallenges.systemChallenges.issues?.map((issue: any, i: number) => (
                    <div key={i} className="bg-amber-500/10 rounded-lg p-4">
                      <p className="text-amber-300 font-medium mb-1">{issue.challenge}</p>
                      <p className="text-gray-400 text-sm mb-2">{issue.description}</p>
                      <p className="text-blue-300/80 text-sm"><span className="text-gray-500">Planned Resolution:</span> {issue.plannedResolution}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.currentChallenges.whyThisMatters && (
              <p className="text-gray-400 text-sm italic bg-slate-700/50 rounded-lg p-4">{data.currentChallenges.whyThisMatters}</p>
            )}
          </div>
        </div>
      )}

      {/* FinCEN Reference */}
      {data.fincenReference && (
        <div className="bg-blue-500/10 rounded-xl p-6 border border-blue-500/30">
          <h4 className="text-blue-300 font-semibold mb-3">{data.fincenReference.title}</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 text-xs mb-1">Regulation</p>
              <p className="text-white font-mono">{data.fincenReference.regulation}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs mb-1">Threshold</p>
              <p className="text-emerald-300 font-semibold">{data.fincenReference.threshold}</p>
            </div>
          </div>
          <p className="text-gray-300 mt-4">{data.fincenReference.description}</p>
          <p className="text-gray-400 text-sm mt-2">{data.fincenReference.keyRequirement}</p>
        </div>
      )}
    </div>
  );
}

// Travel Rule Protocols Block (Section 3.4)
function TravelRuleProtocolsBlock({ data }: { data: any }) {
  const [expandedProtocol, setExpandedProtocol] = useState<string | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>
      {data.overview && <p className="text-gray-400 mb-6">{data.overview}</p>}

      <div className="space-y-4 mb-6">
        {data.protocols?.map((p: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedProtocol(expandedProtocol === p.protocol ? null : p.protocol)}
              className="w-full p-5 text-left flex justify-between items-center hover:bg-slate-600/50 transition-colors"
            >
              <div>
                <span className="text-white font-semibold">{p.protocol}</span>
                {p.fullName && <span className="text-gray-500 text-sm ml-2">({p.fullName})</span>}
                <span className="text-gray-400 ml-2">- {p.type}</span>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedProtocol === p.protocol ? 'rotate-180' : ''}`} />
            </button>
            {expandedProtocol === p.protocol && (
              <div className="px-5 pb-5 border-t border-slate-600 pt-4 space-y-4">
                <p className="text-gray-300">{p.description}</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="text-gray-500 text-sm mb-1">Governance</p>
                    <p className="text-gray-300">{p.governance}</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="text-gray-500 text-sm mb-1">Coverage</p>
                    <p className="text-gray-300">{p.coverage}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {p.pros && (
                    <div className="bg-emerald-500/10 rounded-lg p-4">
                      <p className="text-emerald-300 font-medium mb-2">Pros</p>
                      <div className="space-y-2">
                        {p.pros.map((pro: string, j: number) => (
                          <p key={j} className="text-gray-300">✓ {pro}</p>
                        ))}
                      </div>
                    </div>
                  )}
                  {p.cons && (
                    <div className="bg-red-500/20 rounded-lg p-4">
                      <p className="text-red-300 font-medium mb-2">Cons</p>
                      <div className="space-y-2">
                        {p.cons.map((con: string, j: number) => (
                          <p key={j} className="text-gray-300">✗ {con}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {p.sphereSupport && (
                  <div className="bg-emerald-500/10 rounded-lg p-4">
                    <p className="text-emerald-400"><span className="font-semibold">Sphere:</span> {p.sphereSupport}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {data.protocolComparison && (
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-600">
                {data.protocolComparison.headers?.map((h: string, i: number) => (
                  <th key={i} className="p-2 text-left text-gray-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.protocolComparison.rows?.map((row: string[], i: number) => (
                <tr key={i} className="border-b border-slate-700/50">
                  {row.map((cell: string, j: number) => (
                    <td key={j} className={`p-2 ${j === 0 ? 'text-white' : 'text-gray-400'}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {data.sphereApproach && (
        <div className="bg-emerald-500/10 rounded-lg p-5">
          <h4 className="text-emerald-300 font-semibold mb-3">{data.sphereApproach.title}</h4>
          <p className="text-gray-300 mb-4">{data.sphereApproach.strategy}</p>
          {data.sphereApproach.workflow && (
            <div className="space-y-2">
              {data.sphereApproach.workflow.map((w: any, i: number) => (
                <div key={i} className="bg-slate-800/50 rounded-lg p-3 flex items-center gap-3">
                  <span className="bg-emerald-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium">{w.step}</span>
                  <span className="text-gray-300">{w.action}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Transmission Methods Block (Section 3.4)
function TransmissionMethodsBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-6 text-xl">{data.title}</h3>

      <div className="space-y-4 mb-6">
        {data.methods?.map((m: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-5">
            <h4 className="text-blue-300 font-semibold mb-2">{m.method}</h4>
            <p className="text-gray-300 mb-4">{m.description}</p>
            <div className="bg-slate-800/50 rounded-lg p-4 mb-4">
              <p className="text-gray-500 text-sm mb-1">How it works</p>
              <p className="text-gray-400">{m.howItWorks}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-emerald-500/10 rounded-lg p-4">
                <p className="text-emerald-300 font-medium mb-2">Advantages</p>
                <div className="space-y-2">
                  {m.advantages?.map((a: string, j: number) => (
                    <p key={j} className="text-gray-300">✓ {a}</p>
                  ))}
                </div>
              </div>
              <div className="bg-red-500/20 rounded-lg p-4">
                <p className="text-red-300 font-medium mb-2">Disadvantages</p>
                <div className="space-y-2">
                  {m.disadvantages?.map((d: string, j: number) => (
                    <p key={j} className="text-gray-300">✗ {d}</p>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-amber-500/10 rounded-lg p-4">
              <p className="text-amber-300"><span className="font-medium">When to use:</span> {m.whenToUse}</p>
            </div>
          </div>
        ))}
      </div>

      {data.timingRequirements && (
        <div className="bg-blue-500/10 rounded-lg p-5">
          <h4 className="text-blue-300 font-semibold mb-3">{data.timingRequirements.title}</h4>
          <p className="text-gray-300 mb-4">{data.timingRequirements.guidance}</p>
          <div className="bg-emerald-500/10 rounded-lg p-4">
            <p className="text-emerald-400"><span className="font-semibold">Sphere Approach:</span> {data.timingRequirements.sphereApproach}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Transactions Applied Block (Section 3.4)
function TransactionsAppliedBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-6 text-xl">{data.title}</h3>

      {data.appliesTo && (
        <div className="mb-8">
          <h4 className="text-emerald-300 font-medium mb-4 text-lg">Travel Rule APPLIES To:</h4>
          <div className="space-y-4">
            {data.appliesTo.map((t: any, i: number) => (
              <div key={i} className="bg-emerald-500/10 rounded-lg p-5">
                <h5 className="text-white font-semibold mb-2">{t.type}</h5>
                <p className="text-gray-400 mb-3">{t.description}</p>
                <div className="bg-slate-800/50 rounded-lg p-4 mb-3">
                  <p className="text-gray-500 text-sm mb-1">Example</p>
                  <p className="text-gray-300">{t.example}</p>
                </div>
                <p className="text-emerald-400 font-medium">{t.travelRule}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.doesNotApply && (
        <div>
          <h4 className="text-gray-400 font-medium mb-4 text-lg">Travel Rule Does NOT Apply To:</h4>
          <div className="space-y-4">
            {data.doesNotApply.map((t: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-5">
                <h5 className="text-white font-semibold mb-2">{t.type}</h5>
                <p className="text-gray-400 mb-3">{t.description}</p>
                <p className="text-gray-500">{t.travelRule}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Edge Cases Block (Section 3.4)
function EdgeCasesBlock({ data }: { data: any }) {
  const [expandedScenario, setExpandedScenario] = useState<string | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-6 text-xl">{data.title}</h3>

      <div className="space-y-4">
        {data.scenarios?.map((s: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedScenario(expandedScenario === s.scenario ? null : s.scenario)}
              className="w-full p-5 text-left hover:bg-slate-600/50 transition-colors flex justify-between items-start"
            >
              <div>
                <h4 className="text-white font-semibold mb-2">{s.scenario}</h4>
                <p className="text-gray-400">{s.problem}</p>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ml-4 ${expandedScenario === s.scenario ? 'rotate-180' : ''}`} />
            </button>
            {expandedScenario === s.scenario && (
              <div className="px-5 pb-5 border-t border-slate-600 pt-4 space-y-4">
                <div className="space-y-4">
                  {s.solutions?.map((sol: any, j: number) => (
                    <div key={j} className="bg-slate-800/50 rounded-lg p-5 border-l-4 border-blue-500">
                      <h5 className="text-blue-300 font-semibold mb-2">{sol.solution}</h5>
                      <p className="text-gray-300 mb-4">{sol.implementation}</p>
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-emerald-500/10 rounded-lg p-3">
                          <p className="text-emerald-300">✓ {sol.pros}</p>
                        </div>
                        <div className="bg-red-500/20 rounded-lg p-3">
                          <p className="text-red-300">✗ {sol.cons}</p>
                        </div>
                      </div>
                      <div className="bg-amber-500/10 rounded-lg p-3">
                        <p className="text-amber-300"><span className="font-medium">When to use:</span> {sol.when}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {s.sphereApproach && (
                  <div className="bg-emerald-500/10 rounded-lg p-4">
                    <p className="text-emerald-400"><span className="font-semibold">Sphere Approach:</span> {s.sphereApproach}</p>
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

// Common Enforcement Patterns Block (Section 3.6)
function CommonEnforcementPatternsBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-6 text-xl">{data.title}</h3>

      <div className="space-y-4">
        {data.patterns?.map((p: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-5 border-l-4 border-red-500">
            <h4 className="text-red-300 font-semibold mb-2">{p.pattern}</h4>
            <p className="text-gray-300 mb-3">{p.description}</p>

            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-red-500/10 rounded-lg p-3">
                <p className="text-red-400 text-xs font-semibold mb-1">Example:</p>
                <p className="text-gray-400 text-sm">{p.example}</p>
              </div>
              <div className="bg-emerald-500/10 rounded-lg p-3">
                <p className="text-emerald-400 text-xs font-semibold mb-1">Sphere Prevention:</p>
                <p className="text-gray-400 text-sm">{p.spherePrevention}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// What Can Go Wrong Block (Section 3.6 - Compliance Failure Scenarios)
function WhatCanGoWrongBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-6 text-xl">{data.title}</h3>

      <div className="space-y-4">
        {data.scenarios?.map((s: any, i: number) => (
          <div key={i} className="bg-red-500/10 rounded-lg p-5 border-l-4 border-amber-500">
            <h4 className="text-amber-300 font-semibold mb-2">{s.scenario}</h4>
            <p className="text-gray-300 mb-4">{s.description}</p>
            {s.context && <p className="text-gray-400 text-sm mb-4 italic">{s.context}</p>}

            <div className="grid md:grid-cols-3 gap-3">
              <div className="bg-red-500/20 rounded-lg p-3">
                <p className="text-red-400 text-xs font-semibold mb-1">Impact:</p>
                <p className="text-gray-300 text-sm">{s.impact}</p>
              </div>
              <div className="bg-emerald-500/10 rounded-lg p-3">
                <p className="text-emerald-400 text-xs font-semibold mb-1">Sphere Response:</p>
                <p className="text-gray-300 text-sm">{s.sphereResponse}</p>
              </div>
              <div className="bg-blue-500/10 rounded-lg p-3">
                <p className="text-blue-400 text-xs font-semibold mb-1">Prevention:</p>
                <p className="text-gray-300 text-sm">{s.prevention}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// PILLAR 4 ADDITIONAL COMPONENTS
// =============================================================================

function WhyItMattersBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.context && <p className="text-gray-400 mb-4">{data.context}</p>}
      {data.description && <p className="text-gray-300 mb-4">{data.description}</p>}

      {/* Payment Processor Exposure Table (for counterparty risk) */}
      {data.paymentProcessorExposure && (
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-600">
                <th className="text-left py-2 px-3 text-gray-400">Counterparty</th>
                <th className="text-left py-2 px-3 text-gray-400">If They Fail</th>
                <th className="text-left py-2 px-3 text-gray-400">Time to Impact</th>
              </tr>
            </thead>
            <tbody>
              {data.paymentProcessorExposure.map((item: any, i: number) => (
                <tr key={i} className="border-b border-slate-700">
                  <td className="py-2 px-3 text-white font-medium">{item.counterparty}</td>
                  <td className="py-2 px-3 text-red-300">{item.ifTheyFail}</td>
                  <td className="py-2 px-3 text-amber-300">{item.timeToImpact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Comparison Table (for liquidity risk - payment processor vs bank) */}
      {data.comparison && (
        <div className="mb-4">
          <h4 className="text-blue-300 font-medium mb-3">{data.comparison.title}</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-600">
                  <th className="text-left py-2 px-3 text-gray-400">Aspect</th>
                  <th className="text-left py-2 px-3 text-gray-400">Bank</th>
                  <th className="text-left py-2 px-3 text-gray-400">Payment Processor</th>
                </tr>
              </thead>
              <tbody>
                {data.comparison.differences?.map((diff: any, i: number) => (
                  <tr key={i} className="border-b border-slate-700">
                    <td className="py-2 px-3 text-white font-medium">{diff.aspect}</td>
                    <td className="py-2 px-3 text-gray-400">{diff.bank}</td>
                    <td className="py-2 px-3 text-amber-300">{diff.paymentProcessor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Scenario Block (for liquidity risk - real scenario) */}
      {data.scenario && (
        <div className="bg-amber-500/10 rounded-lg p-4 mb-4">
          <h4 className="text-amber-300 font-medium mb-2">{data.scenario.title}</h4>
          {data.scenario.setup && <p className="text-gray-300 text-sm mb-3">{data.scenario.setup}</p>}

          {data.scenario.demands && (
            <div className="mb-3">
              <p className="text-white text-sm font-medium mb-1">Demands:</p>
              <ul className="space-y-1">
                {data.scenario.demands.map((demand: string, i: number) => (
                  <li key={i} className="text-gray-300 text-sm flex items-center gap-2">
                    <span className="text-blue-400">→</span> {demand}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {data.scenario.whatCouldGoWrong && (
            <div>
              <p className="text-red-300 text-sm font-medium mb-1">What Could Go Wrong:</p>
              <ul className="space-y-1">
                {data.scenario.whatCouldGoWrong.map((issue: string, i: number) => (
                  <li key={i} className="text-gray-300 text-sm flex items-center gap-2">
                    <span className="text-red-400">⚠</span> {issue}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Liquidity Crisis Impacts (for liquidity risk) */}
      {data.impacts && (
        <div className="space-y-3 mb-4">
          {data.impacts.map((impact: any, i: number) => (
            <div key={i} className="bg-red-500/20 rounded-lg p-4">
              <h4 className="text-white font-medium mb-1">{impact.scenario}</h4>
              <p className="text-red-300 text-sm">{impact.consequence}</p>
            </div>
          ))}
        </div>
      )}

      {data.points && (
        <ul className="space-y-2 mb-4">
          {data.points.map((p: any, i: number) => (
            <li key={i} className="text-gray-300 flex items-start gap-2">
              <span className="text-blue-400">•</span>
              {typeof p === 'string' ? p : p.point || p.description}
            </li>
          ))}
        </ul>
      )}

      {data.scenarios && (
        <div className="space-y-3">
          {data.scenarios.map((s: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">{s.scenario || s.title}</h4>
              <p className="text-gray-400 text-sm">{s.description || s.impact}</p>
              {s.sphereRelevance && <p className="text-emerald-300 text-sm mt-2">Sphere: {s.sphereRelevance}</p>}
            </div>
          ))}
        </div>
      )}

      {data.keyInsight && (
        <div className="bg-purple-500/10 rounded p-3 mt-4">
          <p className="text-purple-300 text-sm">💡 {data.keyInsight}</p>
        </div>
      )}
    </div>
  );
}

function ProcessBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}
      {data.description && <p className="text-gray-300 mb-4">{data.description}</p>}
      {data.philosophy && <p className="text-purple-300 italic mb-4">"{data.philosophy}"</p>}

      {/* Ongoing Monitoring Activities */}
      {data.activities && (
        <div className="space-y-4 mb-4">
          {data.activities.map((activity: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <h4 className="text-blue-300 font-semibold mb-2">{activity.frequency}</h4>
              <ul className="space-y-1">
                {activity.items?.map((item: string, j: number) => (
                  <li key={j} className="text-gray-300 text-sm flex items-center gap-2">
                    <span className="text-emerald-400">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Trigger Events */}
      {data.triggerEvents && (
        <div className="bg-amber-500/10 rounded-lg p-4 mb-4">
          <h4 className="text-amber-300 font-semibold mb-2">⚠️ Trigger Events (Require Immediate Review)</h4>
          <div className="flex flex-wrap gap-2">
            {data.triggerEvents.map((event: string, i: number) => (
              <span key={i} className="bg-amber-500/20 text-amber-200 px-2 py-1 rounded text-sm">{event}</span>
            ))}
          </div>
        </div>
      )}

      {/* Concentration Limits */}
      {data.limits && (
        <div className="space-y-3 mb-4">
          {data.limits.map((item: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-white font-medium">{item.category}</h4>
                <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-sm">{item.limit}</span>
              </div>
              <p className="text-gray-400 text-sm">{item.rationale}</p>
            </div>
          ))}
        </div>
      )}

      {/* Concentration Monitoring */}
      {data.monitoring && (
        <div className="bg-blue-500/10 rounded-lg p-4 mb-4">
          <p className="text-blue-300 text-sm">📊 {data.monitoring}</p>
        </div>
      )}

      {/* Testing Program Items (testTypes) */}
      {data.testTypes && (
        <div className="space-y-3 mb-4">
          {data.testTypes.map((test: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <h4 className="text-white font-medium mb-1">{test.type}</h4>
              <p className="text-gray-400 text-sm mb-2">{test.description}</p>
              <p className="text-blue-300 text-xs">Frequency: {test.frequency}</p>
            </div>
          ))}
        </div>
      )}

      {/* BCP/DR Testing Program (tests) */}
      {data.tests && (
        <div className="space-y-4 mb-4">
          {data.tests.map((test: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-white font-medium">{test.type}</h4>
                <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs">{test.frequency}</span>
              </div>
              <p className="text-gray-400 text-sm mb-2">{test.description}</p>
              {test.examples && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {test.examples.map((ex: string, j: number) => (
                    <span key={j} className="bg-slate-600 text-gray-300 px-2 py-0.5 rounded text-xs">{ex}</span>
                  ))}
                </div>
              )}
              {test.success && (
                <p className="text-emerald-300 text-sm"><span className="font-medium">Success criteria:</span> {test.success}</p>
              )}
              {test.lastResult && (
                <p className={`text-sm mt-1 ${test.lastResult.includes('Pass') ? 'text-emerald-300' : 'text-amber-300'}`}>
                  <span className="font-medium">Last result:</span> {test.lastResult}
                </p>
              )}
              {test.governance && (
                <p className="text-gray-500 text-xs mt-1">{test.governance}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Testing Program Governance (for testingProgram) */}
      {data.governance && typeof data.governance === 'object' && data.governance.reporting && (
        <div className="bg-purple-500/10 rounded-lg p-4 mb-4">
          <h4 className="text-purple-300 font-semibold mb-3">🏛️ Governance</h4>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            {data.governance.reporting && <div><span className="text-gray-500">Reporting:</span> <span className="text-gray-300">{data.governance.reporting}</span></div>}
            {data.governance.failures && <div><span className="text-gray-500">Failures:</span> <span className="text-gray-300">{data.governance.failures}</span></div>}
            {data.governance.documentation && <div><span className="text-gray-500">Documentation:</span> <span className="text-gray-300">{data.governance.documentation}</span></div>}
            {data.governance.improvement && <div><span className="text-gray-500">Improvement:</span> <span className="text-gray-300">{data.governance.improvement}</span></div>}
          </div>
        </div>
      )}

      {/* Daily Management Tasks (for dailyManagement) */}
      {data.startOfDay && (
        <div className="space-y-4">
          <div className="bg-blue-500/10 rounded-lg p-4">
            <h4 className="text-blue-300 font-semibold mb-3">🌅 Start of Day</h4>
            <div className="space-y-2">
              {data.startOfDay.map((task: any, i: number) => (
                <div key={i} className="flex justify-between items-start bg-slate-800/50 rounded p-2">
                  <div>
                    <p className="text-white text-sm font-medium">{task.task}</p>
                    <p className="text-gray-400 text-xs">{task.description}</p>
                  </div>
                  <span className="text-blue-300 text-xs">{task.owner}</span>
                </div>
              ))}
            </div>
          </div>

          {data.throughoutDay && (
            <div className="bg-amber-500/10 rounded-lg p-4">
              <h4 className="text-amber-300 font-semibold mb-3">☀️ Throughout Day</h4>
              <div className="space-y-2">
                {data.throughoutDay.map((task: any, i: number) => (
                  <div key={i} className="flex justify-between items-start bg-slate-800/50 rounded p-2">
                    <div>
                      <p className="text-white text-sm font-medium">{task.task}</p>
                      <p className="text-gray-400 text-xs">{task.description}</p>
                    </div>
                    <span className="text-amber-300 text-xs">{task.frequency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.bankingCutoffs && (
            <div className="bg-red-500/20 rounded-lg p-4">
              <h4 className="text-red-300 font-semibold mb-2">{data.bankingCutoffs.title}</h4>
              <p className="text-gray-400 text-sm mb-3">{data.bankingCutoffs.description}</p>
              <div className="space-y-2">
                {data.bankingCutoffs.examples?.map((ex: any, i: number) => (
                  <div key={i} className="bg-slate-800/50 rounded p-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white text-sm">{ex.system}</span>
                      <span className="text-red-300 text-sm font-mono">{ex.cutoff}</span>
                    </div>
                    {ex.implication && <p className="text-gray-400 text-xs mt-1">{ex.implication}</p>}
                  </div>
                ))}
              </div>
              {data.bankingCutoffs.management && (
                <p className="text-emerald-300 text-xs mt-3">✓ {data.bankingCutoffs.management}</p>
              )}
            </div>
          )}

          {data.endOfDay && (
            <div className="bg-purple-500/10 rounded-lg p-4">
              <h4 className="text-purple-300 font-semibold mb-3">🌙 End of Day</h4>
              <div className="space-y-2">
                {data.endOfDay.map((task: any, i: number) => (
                  <div key={i} className="flex justify-between items-start bg-slate-800/50 rounded p-2">
                    <div>
                      <p className="text-white text-sm font-medium">{task.task}</p>
                      <p className="text-gray-400 text-xs">{task.description}</p>
                    </div>
                    <span className="text-purple-300 text-xs">{task.owner}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Regulatory Readiness Elements */}
      {data.elements && (
        <div className="space-y-4 mb-4">
          {data.elements.map((el: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <h4 className="text-white font-medium mb-3">{el.element}</h4>
              {/* Handle description or requirement/readiness/sphereStatus format */}
              {el.description && (
                <p className="text-gray-400 text-sm mb-2">{el.description}</p>
              )}
              {el.requirement && (
                <div className="grid md:grid-cols-3 gap-3 text-sm">
                  <div className="bg-slate-800/50 rounded p-3">
                    <p className="text-gray-500 text-xs font-semibold mb-1">Requirement</p>
                    <p className="text-gray-300">{el.requirement}</p>
                  </div>
                  <div className="bg-slate-800/50 rounded p-3">
                    <p className="text-blue-400 text-xs font-semibold mb-1">Readiness Criteria</p>
                    <p className="text-gray-300">{el.readiness}</p>
                  </div>
                  <div className="bg-emerald-500/10 rounded p-3">
                    <p className="text-emerald-400 text-xs font-semibold mb-1">Sphere Status</p>
                    <p className="text-gray-300">{el.sphereStatus}</p>
                  </div>
                </div>
              )}
              {el.keyComponents && (
                <ul className="space-y-1">
                  {el.keyComponents.map((comp: string, j: number) => (
                    <li key={j} className="text-emerald-300 text-xs flex items-center gap-2">
                      <span>✓</span> {comp}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Examination Process Stages */}
      {data.examinationProcess && data.examinationProcess.stages && (
        <div className="mb-4">
          <h4 className="text-white font-semibold mb-3">Examination Process</h4>
          <div className="space-y-4">
            {data.examinationProcess.stages.map((stage: any, i: number) => (
              <div key={i} className="flex items-start gap-3">
                <span className="bg-blue-500 text-white text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{i + 1}</span>
                <div className="flex-1">
                  <p className="text-white font-medium">{stage.stage}</p>
                  {stage.context && (
                    <p className="text-gray-400 text-sm mt-1 italic">{stage.context}</p>
                  )}
                  {stage.activities && (
                    <ul className="mt-2 space-y-0.5">
                      {stage.activities.map((activity: string, j: number) => (
                        <li key={j} className="text-gray-300 text-sm">• {activity}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.steps && (
        <div className="space-y-3">
          {data.steps.map((step: any, i: number) => (
            <div key={i} className="flex items-start gap-3">
              <span className="bg-blue-500 text-white text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{i + 1}</span>
              <div>
                <p className="text-white font-medium">{step.step || step.title || step}</p>
                {step.description && <p className="text-gray-400 text-sm">{step.description}</p>}
                {step.actions && <p className="text-gray-500 text-xs mt-1">{step.actions.join(', ')}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {data.items && (
        <div className="space-y-3">
          {data.items.map((item: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <h4 className="text-white font-medium mb-1">{item.item || item.title || item.name}</h4>
              <p className="text-gray-400 text-sm">{item.description || item.detail}</p>
              {item.frequency && <p className="text-blue-300 text-xs mt-1">Frequency: {item.frequency}</p>}
            </div>
          ))}
        </div>
      )}

      {data.principles && (
        <div className="space-y-3">
          {data.principles.map((p: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <h4 className="text-blue-300 font-medium mb-1">{p.principle || p.title}</h4>
              <p className="text-gray-400 text-sm">{p.description || p.detail}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ScenarioBlock({ data }: { data: any }) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}

      {data.scenarios && (
        <div className="space-y-3">
          {data.scenarios.map((s: any, i: number) => (
            <div key={i} className="bg-red-500/20 rounded-lg overflow-hidden">
              <div
                className="p-4 cursor-pointer hover:bg-red-500/20"
                onClick={() => setExpanded(expanded === i ? null : i)}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-white font-medium">{s.scenario || s.title}</h4>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expanded === i ? 'rotate-180' : ''}`} />
                </div>
              </div>
              {expanded === i && (
                <div className="px-4 pb-4 space-y-3 border-t border-red-500/20 pt-3">
                  {s.description && <p className="text-gray-300 text-sm">{s.description}</p>}
                  {s.trigger && <p className="text-amber-300 text-sm"><span className="font-semibold">Trigger:</span> {s.trigger}</p>}
                  {s.impact && <p className="text-red-300 text-sm"><span className="font-semibold">Impact:</span> {s.impact}</p>}
                  {s.immediateActions && (
                    <div>
                      <p className="text-blue-300 text-xs font-semibold mb-1">Immediate Actions:</p>
                      <ul className="text-gray-300 text-sm space-y-1">
                        {s.immediateActions.map((a: string, j: number) => <li key={j}>• {a}</li>)}
                      </ul>
                    </div>
                  )}
                  {s.sphereResponse && <p className="text-emerald-300 text-sm"><span className="font-semibold">Sphere Response:</span> {s.sphereResponse}</p>}
                  {s.lesson && <p className="text-purple-300 text-sm"><span className="font-semibold">Lesson:</span> {s.lesson}</p>}

                  {/* Recovery Steps */}
                  {s.recoverySteps && (
                    <div>
                      <p className="text-emerald-300 text-xs font-semibold mb-1">Recovery Steps:</p>
                      <ul className="text-gray-300 text-sm space-y-1">
                        {s.recoverySteps.map((step: string, j: number) => <li key={j}>• {step}</li>)}
                      </ul>
                    </div>
                  )}

                  {/* Target Recovery */}
                  {s.targetRecovery && (
                    <p className="text-blue-300 text-sm"><span className="font-semibold">Target Recovery:</span> {s.targetRecovery}</p>
                  )}

                  {/* Lessons from SVB */}
                  {s.lessonsFromSVB && (
                    <div className="bg-purple-500/10 rounded p-2 mt-2">
                      <p className="text-purple-300 text-xs">💡 <span className="font-semibold">Lesson from SVB:</span> {s.lessonsFromSVB}</p>
                    </div>
                  )}

                  {/* Cross Reference */}
                  {s.crossReference && (
                    <p className="text-gray-400 text-xs mt-2">📚 {s.crossReference}</p>
                  )}

                  {/* Prevention */}
                  {s.prevention && (
                    <p className="text-emerald-400 text-xs mt-2">🛡️ <span className="font-semibold">Prevention:</span> {s.prevention}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Handle Celsius-style case study format */}
      {data.background && typeof data.background === 'object' && data.background.company && (
        <div className="space-y-4">
          {/* Background */}
          <div className="bg-slate-700/50 rounded-lg p-4">
            <h4 className="text-gray-300 font-semibold mb-3">Background</h4>
            <div className="grid md:grid-cols-2 gap-2 text-sm">
              <div><span className="text-gray-500">Company:</span> <span className="text-white">{data.background.company}</span></div>
              <div><span className="text-gray-500">Assets:</span> <span className="text-emerald-300">{data.background.assets}</span></div>
              <div><span className="text-gray-500">Promise:</span> <span className="text-amber-300">{data.background.promise}</span></div>
              <div><span className="text-gray-500">Model:</span> <span className="text-gray-300">{data.background.businessModel}</span></div>
            </div>
          </div>

          {/* What Went Wrong */}
          {data.whatWentWrong && (
            <div>
              <h4 className="text-red-300 font-semibold mb-3">What Went Wrong</h4>
              <div className="space-y-3">
                {data.whatWentWrong.map((item: any, i: number) => (
                  <div key={i} className="bg-red-500/20 rounded-lg p-4">
                    <h5 className="text-white font-medium mb-2">{item.failure}</h5>
                    <p className="text-gray-400 text-sm mb-2">{item.detail}</p>
                    {item.sphereContrast && (
                      <p className="text-emerald-300 text-sm"><span className="font-semibold">Sphere:</span> {item.sphereContrast}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timeline */}
          {data.timeline && (
            <div>
              <h4 className="text-amber-300 font-semibold mb-3">Timeline</h4>
              <div className="border-l-2 border-amber-500/50 pl-4 space-y-3">
                {data.timeline.map((t: any, i: number) => (
                  <div key={i}>
                    <span className="text-amber-300 text-sm font-mono">{t.date}</span>
                    <p className="text-gray-300 text-sm">{t.event}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Outcome */}
          {data.outcome && (
            <div className="bg-red-500/20 rounded-lg p-4">
              <h4 className="text-red-300 font-semibold mb-2">Outcome</h4>
              <p className="text-white">{data.outcome}</p>
            </div>
          )}

          {/* Lessons for Sphere */}
          {data.lessonsForSphere && (
            <div className="bg-emerald-500/10 rounded-lg p-4">
              <h4 className="text-emerald-300 font-semibold mb-2">Lessons for Sphere</h4>
              <ul className="space-y-1">
                {data.lessonsForSphere.map((lesson: string, i: number) => (
                  <li key={i} className="text-gray-300 text-sm flex items-center gap-2">
                    <span className="text-emerald-400">✓</span> {lesson}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* How to Discuss */}
          {data.howToDiscuss && (
            <div className="bg-purple-500/10 rounded-lg p-4">
              <h4 className="text-purple-300 font-semibold mb-2">💬 How to Discuss</h4>
              <p className="text-gray-300 text-sm italic">"{data.howToDiscuss}"</p>
            </div>
          )}
        </div>
      )}

      {/* Handle simple background format */}
      {data.background && (typeof data.background === 'string' || !data.background.company) && (
        <div className="space-y-4">
          <div className="bg-slate-700/50 rounded p-3">
            <h4 className="text-gray-300 font-semibold mb-2">Background</h4>
            <p className="text-gray-400 text-sm">{typeof data.background === 'string' ? data.background : JSON.stringify(data.background)}</p>
          </div>
          {data.whatHappened && Array.isArray(data.whatHappened) && typeof data.whatHappened[0] === 'string' && (
            <div>
              <h4 className="text-red-300 font-semibold mb-2">What Happened</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                {data.whatHappened.map((item: string, i: number) => <li key={i}>• {item}</li>)}
              </ul>
            </div>
          )}
          {data.lessons && (
            <div>
              <h4 className="text-blue-300 font-semibold mb-2">Lessons</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                {data.lessons.map((l: any, i: number) => <li key={i}>• {typeof l === 'string' ? l : l.lesson}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MetricsBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>

      {data.metrics && (
        <div className="grid gap-4 md:grid-cols-2 mb-4">
          {data.metrics.map((m: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                {m.icon && <span className="text-xl">{m.icon}</span>}
                <h4 className="text-blue-300 font-semibold">{m.metric || m.name}</h4>
              </div>
              {m.definition && <p className="text-gray-400 text-sm mb-2">{m.definition}</p>}
              {m.calculation && <p className="text-gray-400 text-sm mb-2"><span className="text-gray-500">Calculation:</span> {m.calculation}</p>}
              {m.target && <p className="text-emerald-300 text-sm">Target: {m.target}</p>}
              {m.frequency && <p className="text-blue-300 text-xs mt-1">📅 {m.frequency}</p>}
              {m.why && <p className="text-purple-300 text-xs mt-1">Why: {m.why}</p>}
              {m.improvement && <p className="text-amber-300 text-xs mt-1">💡 Improvement: {m.improvement}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Reporting Schedule */}
      {data.reporting && typeof data.reporting === 'object' && (
        <div className="bg-purple-500/10 rounded-lg p-4 mb-4">
          <h4 className="text-purple-300 font-semibold mb-3">📊 Reporting Schedule</h4>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            {data.reporting.daily && <div><span className="text-gray-500">Daily:</span> <span className="text-gray-300">{data.reporting.daily}</span></div>}
            {data.reporting.weekly && <div><span className="text-gray-500">Weekly:</span> <span className="text-gray-300">{data.reporting.weekly}</span></div>}
            {data.reporting.monthly && <div><span className="text-gray-500">Monthly:</span> <span className="text-gray-300">{data.reporting.monthly}</span></div>}
            {data.reporting.quarterly && <div><span className="text-gray-500">Quarterly:</span> <span className="text-gray-300">{data.reporting.quarterly}</span></div>}
          </div>
        </div>
      )}

      {/* Reporting as string */}
      {data.reporting && typeof data.reporting === 'string' && (
        <div className="bg-purple-500/10 rounded-lg p-4 mb-4">
          <p className="text-purple-300 text-sm">📊 {data.reporting}</p>
        </div>
      )}

      {data.items && (
        <div className="grid gap-4 md:grid-cols-2">
          {data.items.map((item: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <h4 className="text-white font-medium">{item.metric || item.name || item.title}</h4>
              <p className="text-gray-400 text-sm">{item.description || item.definition}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FrameworkBlock({ data }: { data: any }) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}
      {data.overview && <p className="text-gray-300 mb-4">{data.overview}</p>}
      {data.philosophy && <p className="text-purple-300 italic text-sm mb-4">"{data.philosophy}"</p>}

      {/* Methodology (for stress testing) */}
      {data.methodology && (
        <div className="bg-blue-500/10 rounded-lg p-4 mb-4">
          <h4 className="text-blue-300 font-medium mb-2">Methodology</h4>
          <div className="grid md:grid-cols-3 gap-3 text-sm">
            <div><span className="text-gray-500">Frequency:</span> <span className="text-gray-300">{data.methodology.frequency}</span></div>
            <div><span className="text-gray-500">Approach:</span> <span className="text-gray-300">{data.methodology.approach}</span></div>
            <div><span className="text-gray-500">Governance:</span> <span className="text-gray-300">{data.methodology.governance}</span></div>
          </div>
        </div>
      )}

      {data.components && (
        <div className="space-y-4">
          {data.components.map((c: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-blue-500">
              <h4 className="text-white font-semibold mb-2">{c.component || c.name || c.title}</h4>
              <p className="text-gray-400 text-sm mb-2">{c.description}</p>
              {c.elements && (
                <ul className="text-gray-300 text-xs space-y-1">
                  {c.elements.map((e: string, j: number) => <li key={j}>• {e}</li>)}
                </ul>
              )}
              {c.sphereApproach && <p className="text-emerald-300 text-sm mt-2">Sphere: {c.sphereApproach}</p>}
            </div>
          ))}
        </div>
      )}

      {/* NIST CSF Functions */}
      {data.functions && (
        <div className="space-y-4">
          {data.functions.map((f: any, i: number) => (
            <div key={i} className={`bg-slate-700/50 rounded-lg p-4 border-l-4 ${
              f.function === 'Identify' ? 'border-blue-500' :
              f.function === 'Protect' ? 'border-emerald-500' :
              f.function === 'Detect' ? 'border-amber-500' :
              f.function === 'Respond' ? 'border-red-500' :
              f.function === 'Recover' ? 'border-purple-500' :
              'border-blue-500'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {f.icon && <span className="text-xl">{f.icon}</span>}
                <h4 className="text-white font-semibold">{f.function}</h4>
              </div>
              {f.purpose && <p className="text-gray-300 text-sm mb-3">{f.purpose}</p>}
              {f.activities && (
                <div className="mb-3">
                  <p className="text-gray-500 text-xs font-semibold mb-1">Key Activities:</p>
                  <div className="flex flex-wrap gap-2">
                    {f.activities.map((activity: string, j: number) => (
                      <span key={j} className="bg-slate-600 text-gray-300 px-2 py-1 rounded text-xs">{activity}</span>
                    ))}
                  </div>
                </div>
              )}
              {f.sphereImplementation && (
                <div className="bg-emerald-500/10 rounded p-2">
                  <p className="text-emerald-300 text-sm"><span className="font-medium">Sphere:</span> {f.sphereImplementation}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Liquidity Layers (for liquidityManagementFramework) */}
      {data.layers && (
        <div className="space-y-4">
          <p className="text-gray-500 text-xs">Click to expand details</p>
          {data.layers.map((layer: any, i: number) => (
            <div key={i} className={`rounded-lg overflow-hidden border-l-4 ${
              layer.icon === '🟢' ? 'bg-emerald-500/10 border-emerald-500' :
              layer.icon === '🟡' ? 'bg-amber-500/10 border-amber-500' :
              layer.icon === '🔴' ? 'bg-red-500/20 border-red-500' :
              i === 0 ? 'bg-blue-500/10 border-blue-500' :
              i === 1 ? 'bg-amber-500/10 border-amber-500' :
              'bg-red-500/20 border-red-500'
            }`}>
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="w-full p-4 text-left hover:bg-white/5 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {layer.icon && <span className="text-xl">{layer.icon}</span>}
                  <div>
                    <h4 className="text-white font-semibold">{layer.layer || layer.name}</h4>
                    {layer.purpose && <p className="text-gray-400 text-sm">{layer.purpose}</p>}
                  </div>
                </div>
                <span className={`text-gray-400 transition-transform duration-200 ${expanded === i ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {expanded === i && (
                <div className="p-4 pt-0 border-t border-white/10 space-y-3">
                  {/* Components */}
                  {layer.components && (
                    <div>
                      <p className="text-gray-400 text-xs font-medium mb-1">Components:</p>
                      <ul className="space-y-1">
                        {layer.components.map((comp: string, j: number) => (
                          <li key={j} className="text-gray-300 text-sm flex items-center gap-2">
                            <span className="text-emerald-400">•</span> {comp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Target & Sizing */}
                  {(layer.target || layer.sizing) && (
                    <div className="grid md:grid-cols-2 gap-2 text-sm">
                      {layer.target && <div><span className="text-blue-300 font-medium">Target:</span> <span className="text-gray-300">{layer.target}</span></div>}
                      {layer.sizing && <div><span className="text-purple-300 font-medium">Sizing:</span> <span className="text-gray-300">{layer.sizing}</span></div>}
                    </div>
                  )}

                  {/* Monitoring */}
                  {layer.monitoring && (
                    <div className="bg-slate-800/50 rounded p-2">
                      <p className="text-gray-400 text-xs">📊 Monitoring: {layer.monitoring.frequency}</p>
                      <p className="text-amber-300 text-xs">⚠ Alerts: {layer.monitoring.alerts}</p>
                    </div>
                  )}

                  {/* Activation Trigger */}
                  {layer.activationTrigger && (
                    <p className="text-red-300 text-sm">🚨 Activation: {layer.activationTrigger}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Stress Testing Scenarios */}
      {data.scenarios && (
        <div className="space-y-4 mt-4">
          <p className="text-gray-500 text-xs">Click scenarios to expand details</p>
          {data.scenarios.map((s: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === (i + 100) ? null : (i + 100))}
                className="w-full p-4 text-left hover:bg-slate-700/70 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {s.icon && <span className="text-xl">{s.icon}</span>}
                  <div>
                    <h4 className="text-amber-300 font-medium">{s.scenario || s.name}</h4>
                    <p className="text-gray-400 text-sm">{s.description}</p>
                  </div>
                </div>
                <span className={`text-gray-400 transition-transform duration-200 flex-shrink-0 ml-2 ${expanded === (i + 100) ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {expanded === (i + 100) && (
                <div className="p-4 pt-0 border-t border-slate-600 space-y-3">
                  {/* Assumptions */}
                  {s.assumptions && (
                    <div>
                      <p className="text-gray-400 text-xs font-medium mb-1">Assumptions:</p>
                      <ul className="space-y-1">
                        {s.assumptions.map((a: string, j: number) => (
                          <li key={j} className="text-gray-300 text-sm flex items-center gap-2">
                            <span className="text-blue-400">•</span> {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Test Question */}
                  {s.testQuestion && (
                    <div className="bg-blue-500/10 rounded p-2">
                      <p className="text-blue-300 text-sm"><span className="font-medium">Test:</span> {s.testQuestion}</p>
                    </div>
                  )}

                  {/* Metrics */}
                  {s.metrics && (
                    <div className="flex flex-wrap gap-2">
                      {s.metrics.map((m: string, j: number) => (
                        <span key={j} className="bg-slate-600 text-gray-300 px-2 py-1 rounded text-xs">{m}</span>
                      ))}
                    </div>
                  )}

                  {/* Last Result */}
                  {s.lastResult && (
                    <div className={`rounded p-2 ${s.lastResult.includes('Pass') ? 'bg-emerald-500/10' : 'bg-red-500/20'}`}>
                      <p className={`text-sm ${s.lastResult.includes('Pass') ? 'text-emerald-300' : 'text-red-300'}`}>
                        <span className="font-medium">Result:</span> {s.lastResult}
                      </p>
                    </div>
                  )}

                  {/* Action If Fail */}
                  {s.actionIfFail && (
                    <p className="text-amber-300 text-sm">⚠ If fail: {s.actionIfFail}</p>
                  )}

                  {/* Cross Reference */}
                  {s.crossReference && (
                    <p className="text-purple-300 text-xs">📎 {s.crossReference}</p>
                  )}

                  {s.sphereApproach && <p className="text-emerald-300 text-sm mt-2">Approach: {s.sphereApproach}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Stress Testing Reporting */}
      {data.reporting && data.reporting.to && (
        <div className="bg-purple-500/10 rounded-lg p-4 mt-4">
          <h4 className="text-purple-300 font-semibold mb-3">📊 Reporting</h4>
          <div className="space-y-2 text-sm">
            <div><span className="text-gray-500">Reports To:</span> <span className="text-gray-300">{data.reporting.to}</span></div>
            <div><span className="text-gray-500">Frequency:</span> <span className="text-gray-300">{data.reporting.frequency}</span></div>
            {data.reporting.content && (
              <div>
                <span className="text-gray-500">Content:</span>
                <ul className="mt-1 space-y-1">
                  {data.reporting.content.map((item: string, i: number) => (
                    <li key={i} className="text-gray-300 flex items-center gap-2">
                      <span className="text-purple-400">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ComparisonBlock({ data }: { data: any }) {
  // Check if this is a BCP vs DR style comparison (has aspect/bcp/dr)
  const isBcpDrStyle = data.comparison && data.comparison[0]?.aspect;

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>

      {/* BCP vs DR style comparison table */}
      {isBcpDrStyle && (
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-600">
                <th className="text-left py-2 px-3 text-gray-400">Aspect</th>
                <th className="text-left py-2 px-3 text-blue-300">BCP</th>
                <th className="text-left py-2 px-3 text-purple-300">DR</th>
              </tr>
            </thead>
            <tbody>
              {data.comparison.map((item: any, i: number) => (
                <tr key={i} className="border-b border-slate-700">
                  <td className="py-3 px-3 text-white font-medium">{item.aspect}</td>
                  <td className="py-3 px-3 text-gray-300">{item.bcp}</td>
                  <td className="py-3 px-3 text-gray-300">{item.dr}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Examples row */}
          <div className="mt-3 space-y-2">
            {data.comparison.map((item: any, i: number) => item.example && (
              <p key={i} className="text-gray-500 text-xs"><span className="text-gray-400">{item.aspect}:</span> {item.example}</p>
            ))}
          </div>
        </div>
      )}

      {/* Integration note for BCP/DR */}
      {data.integration && (
        <div className="bg-emerald-500/10 rounded p-3">
          <p className="text-emerald-300 text-sm">💡 {data.integration}</p>
        </div>
      )}

      {/* Original style comparison (term/definition) */}
      {data.comparison && !isBcpDrStyle && (
        <div className="grid md:grid-cols-2 gap-4">
          {data.comparison.map((item: any, i: number) => (
            <div key={i} className={`rounded-lg p-4 ${i === 0 ? 'bg-blue-500/10' : 'bg-purple-500/10'}`}>
              <h4 className={`font-semibold mb-2 ${i === 0 ? 'text-blue-300' : 'text-purple-300'}`}>{item.term || item.name}</h4>
              <p className="text-gray-300 text-sm mb-2">{item.definition || item.description}</p>
              {item.focus && <p className="text-gray-400 text-xs">Focus: {item.focus}</p>}
              {item.example && <p className="text-gray-400 text-xs mt-1">Example: {item.example}</p>}
            </div>
          ))}
        </div>
      )}

      {data.items && (
        <div className="grid md:grid-cols-2 gap-4">
          {data.items.map((item: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">{item.name || item.title}</h4>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ArchitectureBlock({ data }: { data: any }) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}

      {/* Resilience Principles (for resilienceArchitecture) */}
      {data.principles && (
        <div className="space-y-4">
          <p className="text-gray-500 text-xs">Click to expand details</p>
          {data.principles.map((p: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="w-full p-4 text-left hover:bg-slate-700/70 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {p.icon && <span className="text-2xl">{p.icon}</span>}
                  <div>
                    <h4 className="text-white font-semibold">{p.principle}</h4>
                    {p.benefit && <p className="text-emerald-300 text-sm">{p.benefit}</p>}
                  </div>
                </div>
                <span className={`text-gray-400 transition-transform duration-200 ${expanded === i ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {expanded === i && (
                <div className="p-4 pt-0 border-t border-slate-600 space-y-3">
                  {p.implementation && (
                    <div>
                      <p className="text-gray-400 text-xs font-medium mb-1">Implementation:</p>
                      <ul className="space-y-1">
                        {p.implementation.map((item: string, j: number) => (
                          <li key={j} className="text-gray-300 text-sm flex items-center gap-2">
                            <span className="text-blue-400">•</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {p.detail && (
                    <p className="text-gray-400 text-sm">{p.detail}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {data.layers && (
        <div className="space-y-3">
          {data.layers.map((layer: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                {layer.icon && <span className="text-xl">{layer.icon}</span>}
                <h4 className="text-white font-semibold">{layer.layer || layer.name}</h4>
              </div>
              <p className="text-gray-400 text-sm mb-2">{layer.description}</p>
              {layer.components && (
                <div className="flex flex-wrap gap-2">
                  {layer.components.map((c: string, j: number) => (
                    <span key={j} className="bg-slate-600 text-gray-300 text-xs px-2 py-1 rounded">{c}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {data.threats && (
        <div className="space-y-4">
          {data.threats.map((threat: any, i: number) => (
            <div key={i} className="bg-red-500/10 rounded-lg p-4 border-l-4 border-red-500">
              <h4 className="text-red-300 font-semibold mb-2">{threat.threat || threat.name}</h4>
              <p className="text-gray-300 text-sm mb-3">{threat.description}</p>
              {(threat.method || threat.impact) && (
                <div className="grid md:grid-cols-2 gap-3 mb-3">
                  {threat.method && (
                    <div className="bg-slate-800/50 rounded p-2">
                      <p className="text-amber-400 text-xs font-semibold mb-1">Attack Method</p>
                      <p className="text-gray-400 text-sm">{threat.method}</p>
                    </div>
                  )}
                  {threat.impact && (
                    <div className="bg-slate-800/50 rounded p-2">
                      <p className="text-red-400 text-xs font-semibold mb-1">Potential Impact</p>
                      <p className="text-gray-400 text-sm">{threat.impact}</p>
                    </div>
                  )}
                </div>
              )}
              {threat.sphereControls && Array.isArray(threat.sphereControls) && (
                <div className="bg-emerald-500/10 rounded p-3">
                  <p className="text-emerald-400 text-xs font-semibold mb-2">Sphere Controls</p>
                  <div className="flex flex-wrap gap-2">
                    {threat.sphereControls.map((ctrl: string, j: number) => (
                      <span key={j} className="bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded text-xs">{ctrl}</span>
                    ))}
                  </div>
                </div>
              )}
              {threat.mitigation && <p className="text-emerald-300 text-sm mt-2">Mitigation: {threat.mitigation}</p>}
            </div>
          ))}
        </div>
      )}

      {data.categories && (
        <div className="space-y-3">
          {data.categories.map((cat: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <h4 className="text-amber-300 font-semibold mb-2">{cat.category || cat.name}</h4>
              <p className="text-gray-400 text-sm mb-2">{cat.description}</p>
              {cat.examples && (
                <p className="text-gray-500 text-xs">Examples: {cat.examples.join(', ')}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CommunicationBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}
      {data.philosophy && (
        <div className="bg-purple-500/10 rounded p-3 mb-4">
          <p className="text-purple-300 text-sm">💡 {data.philosophy}</p>
        </div>
      )}

      {/* Principles with implementation */}
      {data.principles && (
        <div className="space-y-3 mb-4">
          {data.principles.map((p: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <h4 className="text-white font-medium mb-1">{p.principle || p.name}</h4>
              <p className="text-gray-400 text-sm">{p.description || p.explanation || p.detail}</p>
              {p.implementation && (
                <p className="text-emerald-300 text-xs mt-2">✓ {p.implementation}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Templates - handle as object with nested templates */}
      {data.templates && typeof data.templates === 'object' && !Array.isArray(data.templates) && (
        <div className="space-y-4">
          {data.templates.title && (
            <h4 className="text-blue-300 font-semibold">{data.templates.title}</h4>
          )}

          {/* Handle templates.examples array (incidentCommunication structure) */}
          {data.templates.examples && Array.isArray(data.templates.examples) && (
            <div className="space-y-3">
              {data.templates.examples.map((t: any, i: number) => (
                <div key={i} className="bg-slate-700/50 rounded-lg p-4">
                  <h5 className="text-amber-300 font-medium mb-2">{t.type}</h5>
                  <div className="bg-slate-800 rounded p-3">
                    <p className="text-gray-300 text-sm whitespace-pre-wrap font-mono">{t.template}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Handle templates as object with initial/update/resolution (customerCommunication structure) */}
          {data.templates.initial && (
            <div className="space-y-3">
              {['initial', 'update', 'resolution'].map((key) => {
                const t = data.templates[key];
                if (!t) return null;
                return (
                  <div key={key} className="bg-slate-700/50 rounded-lg p-4">
                    <h5 className="text-amber-300 font-medium mb-2">{t.title}</h5>
                    <div className="bg-slate-800 rounded p-3">
                      <p className="text-gray-300 text-sm whitespace-pre-wrap font-mono">{t.template}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Templates - handle as array (fallback) */}
      {data.templates && Array.isArray(data.templates) && (
        <div className="space-y-4">
          {data.templates.map((t: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <h4 className="text-blue-300 font-semibold mb-2">{t.scenario || t.name}</h4>
              {t.timing && <p className="text-gray-500 text-xs mb-2">Timing: {t.timing}</p>}
              {t.template && (
                <div className="bg-slate-800 rounded p-3 mt-2">
                  <p className="text-gray-300 text-sm whitespace-pre-wrap">{t.template}</p>
                </div>
              )}
              {t.channels && <p className="text-gray-400 text-xs mt-2">Channels: {t.channels.join(', ')}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function InstitutionalQABlock({ data }: { data: any }) {
  const [expandedQ, setExpandedQ] = useState<number | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">💬 {data.title}</h3>
      <p className="text-gray-500 text-xs mb-4">Click questions to see suggested responses</p>

      {/* Questions format (Section 4.4 BCP/DR) */}
      {data.questions && (
        <div className="space-y-3">
          {data.questions.map((q: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
              <div
                className="p-4 cursor-pointer hover:bg-slate-700/70"
                onClick={() => setExpandedQ(expandedQ === i ? null : i)}
              >
                <div className="flex items-center justify-between">
                  <p className="text-amber-300 font-medium">{q.question}</p>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedQ === i ? 'rotate-180' : ''}`} />
                </div>
              </div>
              {expandedQ === i && (
                <div className="px-4 pb-4 border-t border-slate-600 pt-3 space-y-3">
                  {q.guidance && (
                    <div className="bg-blue-500/10 rounded p-3">
                      <p className="text-blue-300 text-xs font-semibold mb-1">Guidance:</p>
                      <p className="text-blue-200 text-sm">{q.guidance}</p>
                    </div>
                  )}
                  {(q.response || q.answer) && (
                    <div className="bg-emerald-500/10 rounded p-3">
                      <p className="text-emerald-300 text-xs font-semibold mb-1">Suggested Response:</p>
                      <p className="text-emerald-200 text-sm">{q.response || q.answer}</p>
                    </div>
                  )}
                  {q.evidence && <p className="text-gray-400 text-xs mt-2">Evidence: {q.evidence}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Scenarios format (Section 4.7 Security) */}
      {data.scenarios && (
        <div className="space-y-3">
          {data.scenarios.map((s: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
              <div
                className="p-4 cursor-pointer hover:bg-slate-700/70"
                onClick={() => setExpandedQ(expandedQ === (i + 100) ? null : (i + 100))}
              >
                <div className="flex items-center justify-between">
                  <p className="text-amber-300 font-medium">{s.question}</p>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedQ === (i + 100) ? 'rotate-180' : ''}`} />
                </div>
              </div>
              {expandedQ === (i + 100) && (
                <div className="px-4 pb-4 border-t border-slate-600 pt-3 space-y-3">
                  {s.guidance && (
                    <div className="bg-blue-500/10 rounded p-3">
                      <p className="text-blue-300 text-xs font-semibold mb-1">Guidance:</p>
                      <p className="text-blue-200 text-sm">{s.guidance}</p>
                    </div>
                  )}
                  {s.example && (
                    <div className="bg-emerald-500/10 rounded p-3">
                      <p className="text-emerald-300 text-xs font-semibold mb-1">Example Response:</p>
                      <p className="text-emerald-200 text-sm">{s.example}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ResponseProcessBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}

      {/* Security Severity Classification (for securityIncidentResponse) */}
      {data.severity && (
        <div className="mb-6">
          <h4 className="text-white font-semibold mb-3">Severity Classification</h4>
          <div className="grid md:grid-cols-2 gap-3">
            {data.severity.critical && (
              <div className="bg-red-500/20 rounded-lg p-3 border-l-4 border-red-500">
                <p className="text-red-300 font-semibold text-sm">Critical</p>
                <p className="text-gray-400 text-xs">{data.severity.critical}</p>
              </div>
            )}
            {data.severity.high && (
              <div className="bg-orange-500/20 rounded-lg p-3 border-l-4 border-orange-500">
                <p className="text-orange-300 font-semibold text-sm">High</p>
                <p className="text-gray-400 text-xs">{data.severity.high}</p>
              </div>
            )}
            {data.severity.medium && (
              <div className="bg-amber-500/20 rounded-lg p-3 border-l-4 border-amber-500">
                <p className="text-amber-300 font-semibold text-sm">Medium</p>
                <p className="text-gray-400 text-xs">{data.severity.medium}</p>
              </div>
            )}
            {data.severity.low && (
              <div className="bg-emerald-500/10 rounded-lg p-3 border-l-4 border-emerald-500">
                <p className="text-emerald-300 font-semibold text-sm">Low</p>
                <p className="text-gray-400 text-xs">{data.severity.low}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Stages format (Incident Response Process) */}
      {data.stages && (
        <div className="space-y-4">
          {data.stages.map((stage: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                {stage.icon && <span>{stage.icon}</span>}
                <h4 className="text-white font-medium">{stage.stage}</h4>
              </div>
              {stage.goal && <p className="text-gray-300 text-sm mb-2">{stage.goal}</p>}
              {(stage.methods || stage.activities) && (
                <ul className="text-gray-400 text-sm space-y-1 mb-2">
                  {(stage.methods || stage.activities).map((item: string, j: number) => (
                    <li key={j}>• {item}</li>
                  ))}
                </ul>
              )}
              {stage.metric && (
                <p className="text-blue-400 text-xs mb-1">📊 {stage.metric}</p>
              )}
              {stage.sphereImplementation && (
                <p className="text-emerald-400 text-xs">Sphere: {stage.sphereImplementation}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Process format (Security Incident Response phases) */}
      {data.process && (
        <div className="space-y-4 mb-6">
          <h4 className="text-white font-semibold">Response Process</h4>
          {data.process.map((phase: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h5 className="text-blue-300 font-medium">{phase.phase}</h5>
                {phase.timing && <span className="text-gray-500 text-xs">{phase.timing}</span>}
              </div>
              {phase.goal && <p className="text-gray-300 text-sm mb-2 italic">Goal: {phase.goal}</p>}
              {phase.activities && (
                <ul className="text-gray-400 text-sm space-y-1">
                  {phase.activities.map((activity: string, j: number) => (
                    <li key={j}>• {activity}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Phases format */}
      {data.phases && (
        <div className="space-y-3">
          {data.phases.map((phase: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">{phase.phase || phase.name}</h4>
              <p className="text-gray-400 text-sm mb-2">{phase.description || phase.objective}</p>
              {phase.actions && (
                <ul className="text-gray-300 text-sm space-y-1">
                  {phase.actions.map((a: string, j: number) => <li key={j}>• {a}</li>)}
                </ul>
              )}
              {phase.timeframe && <p className="text-gray-500 text-xs mt-2">Timeframe: {phase.timeframe}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Notification Requirements (for securityIncidentResponse) */}
      {data.notification && (
        <div className="mt-6">
          <h4 className="text-white font-semibold mb-3">Notification Requirements</h4>
          <div className="bg-amber-500/10 rounded-lg p-4 space-y-2">
            {data.notification.internal && (
              <div>
                <p className="text-amber-400 text-xs font-semibold">Internal Escalation</p>
                <p className="text-gray-300 text-sm">{data.notification.internal}</p>
              </div>
            )}
            {data.notification.external && (
              <div>
                <p className="text-amber-400 text-xs font-semibold">External Notification</p>
                <p className="text-gray-300 text-sm">{data.notification.external}</p>
              </div>
            )}
            {data.notification.timing && (
              <div className="bg-slate-800/50 rounded p-2 mt-2">
                <p className="text-blue-300 text-xs">⏱ {data.notification.timing}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Steps format */}
      {data.steps && (
        <div className="space-y-2">
          {data.steps.map((step: any, i: number) => (
            <div key={i} className="flex items-start gap-3">
              <span className="bg-blue-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">{i + 1}</span>
              <div>
                <p className="text-white text-sm">{step.step || step.name}</p>
                <p className="text-gray-400 text-sm">{step.description || step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function WarRoomBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">🚨 {data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}
      {data.triggerCriteria && (
        <div className="bg-red-500/20 rounded p-3 mb-4">
          <p className="text-red-300 text-xs font-semibold mb-1">Trigger Criteria:</p>
          <p className="text-gray-300 text-sm">{data.triggerCriteria}</p>
        </div>
      )}

      {data.roles && (
        <div className="space-y-4 mb-4">
          <h4 className="text-white font-semibold">Roles</h4>
          {data.roles.map((role: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <h5 className="text-blue-300 font-medium mb-2">{role.role || role.name}</h5>
              {role.context && (
                <p className="text-gray-400 text-sm mb-3 leading-relaxed">{role.context}</p>
              )}
              {role.responsibilities && Array.isArray(role.responsibilities) && (
                <div className="mb-2">
                  <p className="text-gray-500 text-xs font-semibold mb-1">Responsibilities:</p>
                  <ul className="text-gray-300 text-sm space-y-1">
                    {role.responsibilities.map((r: string, j: number) => (
                      <li key={j}>• {r}</li>
                    ))}
                  </ul>
                </div>
              )}
              {role.who && (
                <p className="text-emerald-300 text-xs mt-2">👤 {role.who}</p>
              )}
              {!role.responsibilities && (role.responsibility || role.description) && (
                <p className="text-gray-400 text-sm">{role.responsibility || role.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {data.protocol && (
        <div className="space-y-3">
          <h4 className="text-white font-semibold">Protocol</h4>
          {data.protocol.map((step: any, i: number) => (
            <div key={i} className="flex items-start gap-3">
              <span className="bg-red-500 text-white text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{i + 1}</span>
              <div>
                <p className="text-white font-medium">{step.step || step.action}</p>
                {step.timing && <p className="text-gray-500 text-xs">{step.timing}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {data.rules && (
        <div className="mt-4 bg-amber-500/10 rounded-lg p-4">
          <h4 className="text-amber-300 font-semibold mb-2">⚠️ War Room Rules</h4>
          <ul className="space-y-2">
            {data.rules.map((rule: string, i: number) => (
              <li key={i} className="text-gray-300 text-sm flex items-center gap-2">
                <span className="text-amber-400">•</span> {rule}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function SecurityControlsBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">🔒 {data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}

      {data.controls && (
        <div className="space-y-4">
          {data.controls.map((ctrl: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                {ctrl.icon && <span className="text-xl">{ctrl.icon}</span>}
                <h4 className="text-emerald-300 font-semibold">{ctrl.control || ctrl.name}</h4>
              </div>
              {ctrl.description && <p className="text-gray-300 text-sm mb-3">{ctrl.description}</p>}
              {ctrl.risk && (
                <div className="bg-red-500/10 rounded p-2 mb-3">
                  <p className="text-red-400 text-xs font-semibold mb-1">Risk Addressed</p>
                  <p className="text-gray-400 text-sm">{ctrl.risk}</p>
                </div>
              )}
              {ctrl.implementation && Array.isArray(ctrl.implementation) && (
                <div className="mb-3">
                  <p className="text-blue-400 text-xs font-semibold mb-2">Implementation</p>
                  <ul className="space-y-1">
                    {ctrl.implementation.map((item: string, j: number) => (
                      <li key={j} className="text-gray-400 text-sm flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {ctrl.implementation && typeof ctrl.implementation === 'string' && (
                <p className="text-blue-300 text-sm mb-2">Implementation: {ctrl.implementation}</p>
              )}
              {ctrl.evidence && (
                <div className="bg-purple-500/10 rounded p-2">
                  <p className="text-purple-400 text-xs font-semibold mb-1">Evidence</p>
                  <p className="text-gray-400 text-sm">{ctrl.evidence}</p>
                </div>
              )}
              {ctrl.sphereApproach && <p className="text-emerald-300 text-xs mt-2">Sphere: {ctrl.sphereApproach}</p>}
            </div>
          ))}
        </div>
      )}

      {data.categories && (
        <div className="space-y-4">
          {data.categories.map((cat: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">{cat.category || cat.name}</h4>
              {cat.controls && (
                <ul className="text-gray-300 text-sm space-y-1">
                  {cat.controls.map((c: any, j: number) => (
                    <li key={j}>• {typeof c === 'string' ? c : c.control || c.name}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// =============================================================================
// PILLAR 5 - PRODUCT & ARCHITECTURE COMPONENTS
// =============================================================================

function ArchitectureOverviewBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>

      {data.layers && (
        <div className="space-y-4">
          {data.layers.map((layer: any, i: number) => (
            <div key={i} className={`rounded-lg p-4 border-l-4 ${
              i === 0 ? 'bg-blue-500/10 border-blue-500' :
              i === 1 ? 'bg-purple-500/10 border-purple-500' :
              i === 2 ? 'bg-emerald-500/10 border-emerald-500' :
              'bg-amber-500/10 border-amber-500'
            }`}>
              <h4 className="text-white font-semibold mb-2">{layer.layer}</h4>
              <p className="text-gray-400 text-sm mb-3">{layer.description}</p>
              {layer.components && (
                <div className="flex flex-wrap gap-2">
                  {layer.components.map((comp: string, j: number) => (
                    <span key={j} className="bg-slate-700 text-gray-300 px-2 py-1 rounded text-xs">{comp}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {data.keyPrinciple && (
        <div className="bg-purple-500/10 rounded p-3 mt-4">
          <p className="text-purple-300 text-sm">💡 {data.keyPrinciple}</p>
        </div>
      )}
    </div>
  );
}

function DeepDiveBlock({ data }: { data: any }) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [routingExpanded, setRoutingExpanded] = useState(false);
  const [gasExpanded, setGasExpanded] = useState(false);
  const [finalityExpanded, setFinalityExpanded] = useState(false);
  const [regionsExpanded, setRegionsExpanded] = useState<number | null>(null);
  const [patternsExpanded, setPatternsExpanded] = useState<number | null>(null);
  const [fxExpanded, setFxExpanded] = useState(false);
  const [complianceFlowExpanded, setComplianceFlowExpanded] = useState(false);
  const [componentsExpanded, setComponentsExpanded] = useState<number | null>(null);
  const [noOverrideExpanded, setNoOverrideExpanded] = useState(false);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}

      {/* Supported Chains (for stablecoinSettlementDeepDive) */}
      {data.supportedChains && (
        <div className="space-y-4 mb-6">
          <h4 className="text-blue-300 font-medium">{data.supportedChains.title}</h4>
          {data.supportedChains.chains?.map((chain: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="w-full p-4 text-left hover:bg-slate-700/70 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`transform transition-transform ${expanded === i ? 'rotate-90' : ''}`}>▶</span>
                    <h5 className="text-white font-medium">{chain.chain}</h5>
                  </div>
                  <span className="text-gray-400 text-sm">{chain.stablecoins?.join(', ')}</span>
                </div>
                <p className="text-gray-500 text-xs mt-1 ml-5">Click to expand details</p>
              </button>
              {expanded === i && chain.characteristics && (
                <div className="p-4 pt-0 border-t border-slate-600">
                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div><span className="text-gray-500">Finality:</span> <span className="text-gray-300">{chain.characteristics.finality}</span></div>
                    <div><span className="text-gray-500">Cost:</span> <span className="text-gray-300">{chain.characteristics.costRange}</span></div>
                    <div><span className="text-gray-500">Throughput:</span> <span className="text-gray-300">{chain.characteristics.throughput}</span></div>
                    <div><span className="text-gray-500">Best For:</span> <span className="text-gray-300">{chain.characteristics.bestFor}</span></div>
                  </div>
                  {chain.sphereUsage && <p className="text-emerald-300 text-sm">Sphere: {chain.sphereUsage}</p>}
                </div>
              )}
            </div>
          ))}

          {/* Routing Logic - within supportedChains */}
          {data.supportedChains.routingLogic && (
            <div className="bg-purple-500/10 rounded-lg overflow-hidden border border-purple-500/30">
              <button
                onClick={() => setRoutingExpanded(!routingExpanded)}
                className="w-full p-4 text-left hover:bg-purple-500/20 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`transform transition-transform text-purple-400 ${routingExpanded ? 'rotate-90' : ''}`}>▶</span>
                    <h5 className="text-purple-300 font-medium">{data.supportedChains.routingLogic.title}</h5>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mt-1 ml-5">{data.supportedChains.routingLogic.description}</p>
              </button>
              {routingExpanded && (
                <div className="p-4 pt-0 border-t border-purple-500/30 space-y-3">
                  {data.supportedChains.routingLogic.factors?.map((f: any, i: number) => (
                    <div key={i} className="bg-slate-700/50 rounded-lg p-3">
                      <div className="flex items-start gap-3 text-sm">
                        <span className="text-purple-400 font-medium min-w-[140px]">{f.factor}:</span>
                        <span className="text-gray-300">{f.logic}</span>
                      </div>
                      {f.context && <p className="text-gray-400 text-xs mt-2 italic">{f.context}</p>}
                    </div>
                  ))}
                  {data.supportedChains.routingLogic.customerControl && (
                    <div className="mt-3 p-2 bg-emerald-500/10 rounded">
                      <p className="text-emerald-300 text-sm">💡 {data.supportedChains.routingLogic.customerControl}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Gas Optimization (for stablecoinSettlementDeepDive) */}
      {data.gasOptimization && (
        <div className="mb-6 bg-amber-500/10 rounded-lg overflow-hidden border border-amber-500/30">
          <button
            onClick={() => setGasExpanded(!gasExpanded)}
            className="w-full p-4 text-left hover:bg-amber-500/20 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className={`transform transition-transform text-amber-400 ${gasExpanded ? 'rotate-90' : ''}`}>▶</span>
              <h4 className="text-amber-300 font-medium">{data.gasOptimization.title}</h4>
            </div>
            <p className="text-gray-400 text-sm mt-1 ml-5">{data.gasOptimization.description}</p>
          </button>
          {gasExpanded && (
            <div className="p-4 pt-0 border-t border-amber-500/30 space-y-3">
              {data.gasOptimization.strategies?.map((s: any, i: number) => (
                <div key={i} className="bg-slate-700/50 rounded-lg p-3">
                  <h5 className="text-white font-medium text-sm">{s.strategy}</h5>
                  <p className="text-gray-400 text-xs mt-1">{s.implementation}</p>
                  <p className="text-emerald-300 text-xs mt-1">✓ {s.benefit}</p>
                  {s.context && <p className="text-gray-400 text-xs mt-2 italic border-t border-slate-600 pt-2">{s.context}</p>}
                </div>
              ))}
              {data.gasOptimization.transparency && (
                <div className="p-2 bg-blue-500/10 rounded">
                  <p className="text-blue-300 text-sm">ℹ️ {data.gasOptimization.transparency}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Finality Handling (for stablecoinSettlementDeepDive) */}
      {data.finalityHandling && (
        <div className="mb-6 bg-blue-500/10 rounded-lg overflow-hidden border border-blue-500/30">
          <button
            onClick={() => setFinalityExpanded(!finalityExpanded)}
            className="w-full p-4 text-left hover:bg-blue-500/20 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className={`transform transition-transform text-blue-400 ${finalityExpanded ? 'rotate-90' : ''}`}>▶</span>
              <h4 className="text-blue-300 font-medium">{data.finalityHandling.title}</h4>
            </div>
            {data.finalityHandling.subtitle && <p className="text-gray-400 text-sm mt-1 ml-5">{data.finalityHandling.subtitle}</p>}
          </button>
          {finalityExpanded && (
            <div className="p-4 pt-0 border-t border-blue-500/30 space-y-3">
              {data.finalityHandling.comparison?.map((c: any, i: number) => (
                <div key={i} className="bg-slate-700/50 rounded-lg p-3">
                  <h5 className="text-white font-medium text-sm mb-2">{c.chain}</h5>
                  <div className="grid md:grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="text-gray-500">Finality Type:</span>
                      <p className="text-gray-300">{c.finalityType}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Time to Finality:</span>
                      <p className="text-gray-300">{c.timeToFinality}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Sphere Approach:</span>
                      <p className="text-emerald-300">{c.sphereApproach}</p>
                    </div>
                  </div>
                  {c.context && <p className="text-gray-400 text-xs mt-2 italic border-t border-slate-600 pt-2">{c.context}</p>}
                </div>
              ))}
              {data.finalityHandling.customerImpact && (
                <div className="p-2 bg-emerald-500/10 rounded">
                  <p className="text-emerald-300 text-sm">💡 {data.finalityHandling.customerImpact}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Multi-Regional Approach (for bankingIntegrationArchitecture) */}
      {data.multiRegionalApproach && (
        <div className="mb-6 space-y-4">
          <div>
            <h4 className="text-blue-300 font-medium">{data.multiRegionalApproach.title}</h4>
            <p className="text-gray-400 text-sm mt-1">{data.multiRegionalApproach.description}</p>
          </div>
          {data.multiRegionalApproach.regions?.map((region: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
              <button
                onClick={() => setRegionsExpanded(regionsExpanded === i ? null : i)}
                className="w-full p-4 text-left hover:bg-slate-700/70 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`transform transition-transform ${regionsExpanded === i ? 'rotate-90' : ''}`}>▶</span>
                    <h5 className="text-white font-medium">{region.region}</h5>
                  </div>
                  <span className="text-gray-400 text-sm">{region.currencies?.join(', ')}</span>
                </div>
                <p className="text-gray-500 text-xs mt-1 ml-5">Click to expand capabilities</p>
              </button>
              {regionsExpanded === i && (
                <div className="p-4 pt-0 border-t border-slate-600">
                  <div className="space-y-2">
                    <div>
                      <span className="text-gray-500 text-xs">Capabilities:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {region.capabilities?.map((cap: string, j: number) => (
                          <span key={j} className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs">{cap}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500 text-xs">Typical Settlement:</span>
                      <p className="text-emerald-300 text-sm">{region.typicalSettlement}</p>
                    </div>
                    {region.context && (
                      <div className="border-t border-slate-600 pt-2 mt-2">
                        <p className="text-gray-400 text-xs italic">{region.context}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
          {data.multiRegionalApproach.redundancy && (
            <div className="p-3 bg-emerald-500/10 rounded-lg">
              <p className="text-emerald-300 text-sm">🛡️ Redundancy: {data.multiRegionalApproach.redundancy}</p>
            </div>
          )}
        </div>
      )}

      {/* Integration Patterns (for bankingIntegrationArchitecture) */}
      {data.integrationPatterns && (
        <div className="mb-6 space-y-4">
          <h4 className="text-purple-300 font-medium">{data.integrationPatterns.title}</h4>
          {data.integrationPatterns.patterns?.map((pattern: any, i: number) => (
            <div key={i} className="bg-purple-500/10 rounded-lg overflow-hidden border border-purple-500/30">
              <button
                onClick={() => setPatternsExpanded(patternsExpanded === i ? null : i)}
                className="w-full p-4 text-left hover:bg-purple-500/20 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className={`transform transition-transform text-purple-400 ${patternsExpanded === i ? 'rotate-90' : ''}`}>▶</span>
                  <h5 className="text-white font-medium">{pattern.pattern}</h5>
                </div>
                <p className="text-gray-400 text-sm mt-1 ml-5">{pattern.description}</p>
              </button>
              {patternsExpanded === i && (
                <div className="p-4 pt-0 border-t border-purple-500/30 space-y-2">
                  <div>
                    <span className="text-gray-500 text-xs">Used For:</span>
                    <p className="text-gray-300 text-sm">{pattern.usedFor}</p>
                  </div>
                  {pattern.advantages && (
                    <div>
                      <span className="text-gray-500 text-xs">Advantages:</span>
                      <ul className="mt-1 space-y-1">
                        {pattern.advantages.map((adv: string, j: number) => (
                          <li key={j} className="text-emerald-300 text-xs flex items-center gap-2">
                            <span>✓</span> {adv}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {pattern.examples && (
                    <div>
                      <span className="text-gray-500 text-xs">Examples:</span>
                      <p className="text-blue-300 text-sm">{pattern.examples}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* FX Management (for bankingIntegrationArchitecture) */}
      {data.fxManagement && (
        <div className="mb-6 bg-amber-500/10 rounded-lg overflow-hidden border border-amber-500/30">
          <button
            onClick={() => setFxExpanded(!fxExpanded)}
            className="w-full p-4 text-left hover:bg-amber-500/20 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className={`transform transition-transform text-amber-400 ${fxExpanded ? 'rotate-90' : ''}`}>▶</span>
              <h4 className="text-amber-300 font-medium">{data.fxManagement.title}</h4>
            </div>
            <p className="text-gray-400 text-sm mt-1 ml-5">{data.fxManagement.description}</p>
          </button>
          {fxExpanded && (
            <div className="p-4 pt-0 border-t border-amber-500/30 space-y-3">
              {data.fxManagement.approach?.map((a: any, i: number) => (
                <div key={i} className="bg-slate-700/50 rounded-lg p-3">
                  <h5 className="text-white font-medium text-sm">{a.component}</h5>
                  <p className="text-gray-400 text-xs mt-1">{a.description}</p>
                  <p className="text-emerald-300 text-xs mt-1">→ {a.implementation}</p>
                </div>
              ))}
              {data.fxManagement.transparency && (
                <div className="p-2 bg-blue-500/10 rounded">
                  <p className="text-blue-300 text-sm">ℹ️ {data.fxManagement.transparency}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Pre-Settlement Model (for complianceArchitecture) */}
      {data.preSettlementModel && (
        <div className="mb-6 bg-emerald-500/10 rounded-lg overflow-hidden border border-emerald-500/30">
          <button
            onClick={() => setComplianceFlowExpanded(!complianceFlowExpanded)}
            className="w-full p-4 text-left hover:bg-emerald-500/20 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className={`transform transition-transform text-emerald-400 ${complianceFlowExpanded ? 'rotate-90' : ''}`}>▶</span>
              <h4 className="text-emerald-300 font-medium">{data.preSettlementModel.title}</h4>
            </div>
            <p className="text-gray-400 text-sm mt-1 ml-5">{data.preSettlementModel.description}</p>
          </button>
          {complianceFlowExpanded && (
            <div className="p-4 pt-0 border-t border-emerald-500/30 space-y-3">
              <div className="space-y-3">
                {data.preSettlementModel.flow?.map((step: any, i: number) => (
                  <div key={i} className="bg-slate-700/50 rounded-lg p-3">
                    <div className="flex items-start gap-3 text-sm">
                      <span className="bg-emerald-500/30 text-emerald-300 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">{step.step}</span>
                      <div className="flex-1">
                        <span className="text-white font-medium">{step.action}</span>
                        <p className="text-gray-400 text-xs">{step.compliance}</p>
                        {step.context && <p className="text-gray-400 text-xs mt-2 italic border-t border-slate-600 pt-2">{step.context}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {data.preSettlementModel.keyPoint && (
                <div className="p-2 bg-emerald-500/20 rounded">
                  <p className="text-emerald-300 text-sm font-medium">⚡ {data.preSettlementModel.keyPoint}</p>
                </div>
              )}
              {data.preSettlementModel.contrast && (
                <div className="p-2 bg-red-500/10 rounded">
                  <p className="text-red-300 text-sm">⚠️ Traditional: {data.preSettlementModel.contrast}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Compliance Components (for complianceArchitecture) */}
      {data.complianceComponents && (
        <div className="mb-6 space-y-4">
          <h4 className="text-blue-300 font-medium">{data.complianceComponents.title}</h4>
          {data.complianceComponents.components?.map((comp: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
              <button
                onClick={() => setComponentsExpanded(componentsExpanded === i ? null : i)}
                className="w-full p-4 text-left hover:bg-slate-700/70 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className={`transform transition-transform ${componentsExpanded === i ? 'rotate-90' : ''}`}>▶</span>
                  <h5 className="text-white font-medium">{comp.component}</h5>
                </div>
                <p className="text-gray-400 text-sm mt-1 ml-5">{comp.function}</p>
              </button>
              {componentsExpanded === i && (
                <div className="p-4 pt-0 border-t border-slate-600 space-y-2">
                  {comp.capabilities && (
                    <div>
                      <span className="text-gray-500 text-xs">Capabilities:</span>
                      <ul className="mt-1 space-y-1">
                        {comp.capabilities.map((cap: string, j: number) => (
                          <li key={j} className="text-emerald-300 text-xs flex items-center gap-2">
                            <span>✓</span> {cap}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {comp.integration && (
                    <div className="p-2 bg-blue-500/10 rounded">
                      <p className="text-blue-300 text-xs">🔗 Integration: {comp.integration}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* No Override Architecture (for complianceArchitecture) */}
      {data.noOverride && (
        <div className="mb-6 bg-red-500/10 rounded-lg overflow-hidden border border-red-500/30">
          <button
            onClick={() => setNoOverrideExpanded(!noOverrideExpanded)}
            className="w-full p-4 text-left hover:bg-red-500/20 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className={`transform transition-transform text-red-400 ${noOverrideExpanded ? 'rotate-90' : ''}`}>▶</span>
              <h4 className="text-red-300 font-medium">{data.noOverride.title}</h4>
            </div>
            <p className="text-gray-400 text-sm mt-1 ml-5">{data.noOverride.description}</p>
          </button>
          {noOverrideExpanded && (
            <div className="p-4 pt-0 border-t border-red-500/30 space-y-3">
              <div className="space-y-3">
                {data.noOverride.implementation?.map((item: any, i: number) => (
                  <div key={i} className="bg-slate-700/50 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <span className="text-red-400">🔒</span>
                      <div className="flex-1">
                        <p className="text-gray-300 text-sm">{typeof item === 'string' ? item : item.point}</p>
                        {item.context && <p className="text-gray-400 text-xs mt-2 italic border-t border-slate-600 pt-2">{item.context}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {data.noOverride.whyItMatters && (
                <div className="p-2 bg-emerald-500/10 rounded">
                  <p className="text-emerald-300 text-sm">💡 {data.noOverride.whyItMatters}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Partners/Components (for bankingIntegrationArchitecture - legacy) */}
      {data.partners && (
        <div className="space-y-3">
          {data.partners.map((partner: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">{partner.type || partner.name}</h4>
              <p className="text-gray-400 text-sm">{partner.description || partner.role}</p>
              {partner.requirements && (
                <ul className="mt-2 space-y-1">
                  {partner.requirements.map((req: string, j: number) => (
                    <li key={j} className="text-gray-300 text-xs flex items-center gap-2">
                      <span className="text-blue-400">•</span> {req}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Layers (generic) */}
      {data.layers && (
        <div className="space-y-3">
          {data.layers.map((layer: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">{layer.layer || layer.name}</h4>
              <p className="text-gray-400 text-sm">{layer.description}</p>
              {layer.components && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {layer.components.map((c: string, j: number) => (
                    <span key={j} className="bg-slate-600 text-gray-300 px-2 py-1 rounded text-xs">{c}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Components (for complianceArchitecture - legacy, when not using complianceComponents) */}
      {data.components && !data.layers && !data.complianceComponents && (
        <div className="space-y-3">
          {data.components.map((comp: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">{comp.component || comp.name}</h4>
              <p className="text-gray-400 text-sm">{comp.description}</p>
              {comp.capabilities && (
                <ul className="mt-2 space-y-1">
                  {comp.capabilities.map((cap: string, j: number) => (
                    <li key={j} className="text-emerald-300 text-xs flex items-center gap-2">
                      <span>✓</span> {cap}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Banking Core Integration - The Technical Moat (Comprehensive Section)
function BankingCoreIntegrationBlock({ data }: { data: any }) {
  const [overviewExpanded, setOverviewExpanded] = useState(true);
  const [fileFormatsExpanded, setFileFormatsExpanded] = useState<number | null>(null);
  const [wireRoomExpanded, setWireRoomExpanded] = useState(false);
  const [wireStepsExpanded, setWireStepsExpanded] = useState<number | null>(null);
  const [humanFactorsExpanded, setHumanFactorsExpanded] = useState(false);
  const [stpExpanded, setStpExpanded] = useState(false);
  const [queueExpanded, setQueueExpanded] = useState(false);
  const [paymentPathsExpanded, setPaymentPathsExpanded] = useState<number | null>(null);
  const [routingExpanded, setRoutingExpanded] = useState(false);
  const [cutoffExpanded, setCutoffExpanded] = useState(false);
  const [correspondentExpanded, setCorrespondentExpanded] = useState(false);
  const [baasExpanded, setBaasExpanded] = useState(false);
  const [dualStackExpanded, setDualStackExpanded] = useState(false);
  const [impactExpanded, setImpactExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border-2 border-purple-500/50">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">🏦</span>
        <h3 className="font-bold text-white text-2xl">{data.title}</h3>
      </div>
      <p className="text-purple-300 mb-6 text-lg">{data.subtitle}</p>

      {/* Overview Section */}
      {data.overview && (
        <div className="mb-6 bg-purple-500/10 rounded-xl overflow-hidden border border-purple-500/30">
          <button
            onClick={() => setOverviewExpanded(!overviewExpanded)}
            className="w-full p-5 text-left hover:bg-purple-500/20 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`transform transition-transform text-purple-400 text-lg ${overviewExpanded ? 'rotate-90' : ''}`}>▶</span>
                <h4 className="text-purple-300 font-semibold text-lg">{data.overview.title}</h4>
              </div>
              <span className="bg-purple-500/30 text-purple-200 px-3 py-1 rounded-full text-sm">Start Here</span>
            </div>
          </button>
          {overviewExpanded && (
            <div className="p-5 pt-0 border-t border-purple-500/30 space-y-4">
              <p className="text-gray-300">{data.overview.description}</p>

              {/* Key Insight */}
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 text-xl">💡</span>
                  <div>
                    <span className="text-emerald-400 font-semibold text-sm">KEY INSIGHT</span>
                    <p className="text-emerald-200 mt-1">{data.overview.keyInsight}</p>
                  </div>
                </div>
              </div>

              {/* Why Competitors Can't */}
              {data.overview.whyCompetitorsCant && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <h5 className="text-red-400 font-medium mb-3">Why Competitors Can't Replicate This:</h5>
                  <ul className="space-y-2">
                    {data.overview.whyCompetitorsCant.map((reason: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                        <span className="text-red-400">✗</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* File Optimization Section */}
      {data.fileOptimization && (
        <div className="mb-6 bg-blue-500/10 rounded-xl overflow-hidden border border-blue-500/30">
          <div className="p-5">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">📄</span>
              <h4 className="text-blue-300 font-semibold text-lg">{data.fileOptimization.title}</h4>
            </div>
            <p className="text-gray-400 mb-2">{data.fileOptimization.subtitle}</p>
            <p className="text-gray-300 text-sm mb-4">{data.fileOptimization.whatItMeans}</p>

            {/* File Formats */}
            <div className="space-y-3">
              {data.fileOptimization.fileFormats?.map((format: any, i: number) => (
                <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setFileFormatsExpanded(fileFormatsExpanded === i ? null : i)}
                    className="w-full p-4 text-left hover:bg-slate-700/70 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`transform transition-transform text-blue-400 ${fileFormatsExpanded === i ? 'rotate-90' : ''}`}>▶</span>
                        <h5 className="text-white font-medium">{format.format}</h5>
                      </div>
                      <span className="text-gray-500 text-xs">Click to expand</span>
                    </div>
                    <p className="text-gray-400 text-xs mt-1 ml-5">{format.description}</p>
                  </button>
                  {fileFormatsExpanded === i && (
                    <div className="p-4 pt-0 border-t border-slate-600 space-y-3">
                      <div className="bg-emerald-500/10 rounded-lg p-3">
                        <span className="text-emerald-400 text-xs font-medium">Sphere's Optimization:</span>
                        <p className="text-emerald-200 text-sm mt-1">{format.sphereOptimization}</p>
                      </div>
                      <div>
                        <span className="text-gray-500 text-xs">Technical Detail:</span>
                        <p className="text-gray-300 text-sm mt-1">{format.technicalDetail}</p>
                      </div>
                      {format.commonMistakes && (
                        <div className="bg-red-500/10 rounded-lg p-3">
                          <span className="text-red-400 text-xs font-medium">Common Mistakes That Cause Delays:</span>
                          <ul className="mt-2 space-y-1">
                            {format.commonMistakes.map((mistake: string, j: number) => (
                              <li key={j} className="text-red-200 text-xs flex items-start gap-2">
                                <span className="text-red-400">⚠</span>
                                <span>{mistake}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Sphere Advantage */}
            {data.fileOptimization.sphereAdvantage && (
              <div className="mt-4 bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <h5 className="text-purple-300 font-medium mb-2">{data.fileOptimization.sphereAdvantage.title}</h5>
                <p className="text-gray-300 text-sm mb-2">{data.fileOptimization.sphereAdvantage.impact}</p>
                <div className="bg-slate-700/50 rounded p-3 mt-2">
                  <span className="text-gray-500 text-xs">Real Example:</span>
                  <p className="text-gray-300 text-sm mt-1 italic">{data.fileOptimization.sphereAdvantage.example}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Wire Room Operations Section */}
      {data.wireRoomOperations && (
        <div className="mb-6 bg-amber-500/10 rounded-xl overflow-hidden border border-amber-500/30">
          <button
            onClick={() => setWireRoomExpanded(!wireRoomExpanded)}
            className="w-full p-5 text-left hover:bg-amber-500/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className={`transform transition-transform text-amber-400 text-lg ${wireRoomExpanded ? 'rotate-90' : ''}`}>▶</span>
              <span className="text-2xl">👷</span>
              <h4 className="text-amber-300 font-semibold text-lg">{data.wireRoomOperations.title}</h4>
            </div>
            <p className="text-gray-400 text-sm mt-2 ml-10">{data.wireRoomOperations.subtitle}</p>
          </button>
          {wireRoomExpanded && (
            <div className="p-5 pt-0 border-t border-amber-500/30 space-y-4">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <span className="text-amber-400 text-sm font-medium">What is a Wire Room?</span>
                <p className="text-gray-300 text-sm mt-1">{data.wireRoomOperations.whatIsWireRoom}</p>
              </div>

              {/* Wire Room Workflow */}
              {data.wireRoomOperations.wireRoomWorkflow && (
                <div>
                  <h5 className="text-amber-300 font-medium mb-3">{data.wireRoomOperations.wireRoomWorkflow.title}</h5>
                  <div className="space-y-2">
                    {data.wireRoomOperations.wireRoomWorkflow.steps?.map((step: any, i: number) => (
                      <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
                        <button
                          onClick={() => setWireStepsExpanded(wireStepsExpanded === i ? null : i)}
                          className="w-full p-3 text-left hover:bg-slate-700/70 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="bg-amber-500/30 text-amber-200 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">{step.step}</span>
                            <span className="text-white font-medium text-sm">{step.name}</span>
                            <span className={`ml-auto transform transition-transform text-amber-400 ${wireStepsExpanded === i ? 'rotate-90' : ''}`}>▶</span>
                          </div>
                        </button>
                        {wireStepsExpanded === i && (
                          <div className="p-3 pt-0 border-t border-slate-600 space-y-2 ml-10">
                            <p className="text-gray-300 text-sm">{step.description}</p>
                            <div className="bg-red-500/10 rounded p-2">
                              <span className="text-red-400 text-xs">What Can Go Wrong:</span>
                              <p className="text-red-200 text-xs mt-1">{step.whatCanGoWrong}</p>
                            </div>
                            <div className="bg-emerald-500/10 rounded p-2">
                              <span className="text-emerald-400 text-xs">Sphere's Optimization:</span>
                              <p className="text-emerald-200 text-xs mt-1">{step.sphereOptimization}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Human Factors */}
              {data.wireRoomOperations.humanFactors && (
                <div className="bg-slate-700/30 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setHumanFactorsExpanded(!humanFactorsExpanded)}
                    className="w-full p-3 text-left hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`transform transition-transform text-amber-400 ${humanFactorsExpanded ? 'rotate-90' : ''}`}>▶</span>
                      <h5 className="text-amber-300 font-medium">{data.wireRoomOperations.humanFactors.title}</h5>
                    </div>
                  </button>
                  {humanFactorsExpanded && (
                    <div className="p-3 pt-0 border-t border-slate-600 space-y-2">
                      {data.wireRoomOperations.humanFactors.factors?.map((factor: any, i: number) => (
                        <div key={i} className="bg-slate-700/50 rounded p-3">
                          <span className="text-white font-medium text-sm">{factor.factor}</span>
                          <p className="text-gray-400 text-xs mt-1">{factor.reality}</p>
                          <p className="text-emerald-300 text-xs mt-1">→ Sphere: {factor.sphereApproach}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* STP */}
              {data.wireRoomOperations.straightThroughProcessing && (
                <div className="bg-emerald-500/10 rounded-lg overflow-hidden border border-emerald-500/30">
                  <button
                    onClick={() => setStpExpanded(!stpExpanded)}
                    className="w-full p-3 text-left hover:bg-emerald-500/20 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`transform transition-transform text-emerald-400 ${stpExpanded ? 'rotate-90' : ''}`}>▶</span>
                      <h5 className="text-emerald-300 font-medium">{data.wireRoomOperations.straightThroughProcessing.title}</h5>
                    </div>
                  </button>
                  {stpExpanded && (
                    <div className="p-3 pt-0 border-t border-emerald-500/30 space-y-2">
                      <p className="text-gray-300 text-sm"><strong className="text-emerald-300">Definition:</strong> {data.wireRoomOperations.straightThroughProcessing.definition}</p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-red-500/10 rounded p-2 text-center">
                          <span className="text-red-400 text-xs">Industry Average STP</span>
                          <p className="text-red-200 font-bold mt-1">{data.wireRoomOperations.straightThroughProcessing.industryAverage}</p>
                        </div>
                        <div className="bg-emerald-500/10 rounded p-2 text-center">
                          <span className="text-emerald-400 text-xs">Sphere STP Target</span>
                          <p className="text-emerald-200 font-bold mt-1">{data.wireRoomOperations.straightThroughProcessing.sphereRate}</p>
                        </div>
                      </div>
                      <p className="text-emerald-200 text-sm italic">{data.wireRoomOperations.straightThroughProcessing.whyItMatters}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Queue Prioritization Section */}
      {data.queuePrioritization && (
        <div className="mb-6 bg-cyan-500/10 rounded-xl overflow-hidden border border-cyan-500/30">
          <button
            onClick={() => setQueueExpanded(!queueExpanded)}
            className="w-full p-5 text-left hover:bg-cyan-500/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className={`transform transition-transform text-cyan-400 text-lg ${queueExpanded ? 'rotate-90' : ''}`}>▶</span>
              <span className="text-2xl">⏱️</span>
              <h4 className="text-cyan-300 font-semibold text-lg">{data.queuePrioritization.title}</h4>
            </div>
            <p className="text-gray-400 text-sm mt-2 ml-10">{data.queuePrioritization.subtitle}</p>
          </button>
          {queueExpanded && (
            <div className="p-5 pt-0 border-t border-cyan-500/30 space-y-4">
              {/* Payment Type Paths */}
              {data.queuePrioritization.paymentTypePaths && (
                <div>
                  <h5 className="text-cyan-300 font-medium mb-3">{data.queuePrioritization.paymentTypePaths.title}</h5>
                  <div className="space-y-2">
                    {data.queuePrioritization.paymentTypePaths.paths?.map((path: any, i: number) => (
                      <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
                        <button
                          onClick={() => setPaymentPathsExpanded(paymentPathsExpanded === i ? null : i)}
                          className="w-full p-3 text-left hover:bg-slate-700/70 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className={`transform transition-transform text-cyan-400 ${paymentPathsExpanded === i ? 'rotate-90' : ''}`}>▶</span>
                              <span className="text-white font-medium">{path.type}</span>
                            </div>
                            <span className="text-cyan-300 text-xs bg-cyan-500/20 px-2 py-1 rounded">Cutoff: {path.cutoffTimes}</span>
                          </div>
                        </button>
                        {paymentPathsExpanded === i && (
                          <div className="p-3 pt-0 border-t border-slate-600 space-y-2">
                            <p className="text-gray-400 text-sm">{path.processingPath}</p>
                            <div className="bg-emerald-500/10 rounded p-2">
                              <span className="text-emerald-400 text-xs">Sphere Strategy:</span>
                              <p className="text-emerald-200 text-sm mt-1">{path.sphereStrategy}</p>
                            </div>
                            <p className="text-gray-500 text-xs italic">Trade-off: {path.tradeoff}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Routing Intelligence */}
              {data.queuePrioritization.routingIntelligence && (
                <div className="bg-slate-700/30 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setRoutingExpanded(!routingExpanded)}
                    className="w-full p-3 text-left hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`transform transition-transform text-cyan-400 ${routingExpanded ? 'rotate-90' : ''}`}>▶</span>
                      <h5 className="text-cyan-300 font-medium">{data.queuePrioritization.routingIntelligence.title}</h5>
                    </div>
                    <p className="text-gray-400 text-xs mt-1 ml-5">{data.queuePrioritization.routingIntelligence.description}</p>
                  </button>
                  {routingExpanded && (
                    <div className="p-3 pt-0 border-t border-slate-600 space-y-2">
                      {data.queuePrioritization.routingIntelligence.factors?.map((factor: any, i: number) => (
                        <div key={i} className="bg-slate-700/50 rounded p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-cyan-300 font-medium text-sm">{factor.factor}</span>
                          </div>
                          <p className="text-gray-400 text-xs mt-1">{factor.logic}</p>
                          <p className="text-gray-300 text-xs mt-1 italic">Example: {factor.example}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Cutoff Management */}
              {data.queuePrioritization.cutoffManagement && (
                <div className="bg-purple-500/10 rounded-lg overflow-hidden border border-purple-500/30">
                  <button
                    onClick={() => setCutoffExpanded(!cutoffExpanded)}
                    className="w-full p-3 text-left hover:bg-purple-500/20 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`transform transition-transform text-purple-400 ${cutoffExpanded ? 'rotate-90' : ''}`}>▶</span>
                      <h5 className="text-purple-300 font-medium">{data.queuePrioritization.cutoffManagement.title}</h5>
                    </div>
                    <p className="text-gray-400 text-xs mt-1 ml-5">{data.queuePrioritization.cutoffManagement.description}</p>
                  </button>
                  {cutoffExpanded && (
                    <div className="p-3 pt-0 border-t border-purple-500/30 space-y-2">
                      {data.queuePrioritization.cutoffManagement.strategies?.map((strategy: any, i: number) => (
                        <div key={i} className="bg-slate-700/50 rounded p-3">
                          <span className="text-purple-300 font-medium text-sm">{strategy.strategy}</span>
                          <p className="text-gray-400 text-xs mt-1">{strategy.description}</p>
                          <p className="text-emerald-300 text-xs mt-1">Why: {strategy.why}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Correspondent Routing Section */}
      {data.correspondentRoutingOptimization && (
        <div className="mb-6 bg-orange-500/10 rounded-xl overflow-hidden border border-orange-500/30">
          <button
            onClick={() => setCorrespondentExpanded(!correspondentExpanded)}
            className="w-full p-5 text-left hover:bg-orange-500/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className={`transform transition-transform text-orange-400 text-lg ${correspondentExpanded ? 'rotate-90' : ''}`}>▶</span>
              <span className="text-2xl">🛤️</span>
              <h4 className="text-orange-300 font-semibold text-lg">{data.correspondentRoutingOptimization.title}</h4>
            </div>
            <p className="text-gray-400 text-sm mt-2 ml-10">{data.correspondentRoutingOptimization.subtitle}</p>
          </button>
          {correspondentExpanded && (
            <div className="p-5 pt-0 border-t border-orange-500/30 space-y-4">
              {/* Traditional Problem */}
              {data.correspondentRoutingOptimization.traditionalProblem && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <h5 className="text-red-400 font-medium mb-2">{data.correspondentRoutingOptimization.traditionalProblem.title}</h5>
                  <p className="text-gray-300 text-sm mb-2">{data.correspondentRoutingOptimization.traditionalProblem.description}</p>
                  <p className="text-gray-400 text-xs italic mb-2">Example: {data.correspondentRoutingOptimization.traditionalProblem.example}</p>
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div className="bg-red-500/20 rounded p-2 text-center">
                      <span className="text-red-400 text-xs">Typical Fees</span>
                      <p className="text-red-200 text-sm mt-1">{data.correspondentRoutingOptimization.traditionalProblem.fees}</p>
                    </div>
                    <div className="bg-red-500/20 rounded p-2 text-center">
                      <span className="text-red-400 text-xs">Timing</span>
                      <p className="text-red-200 text-sm mt-1">{data.correspondentRoutingOptimization.traditionalProblem.timing}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Sphere Approach */}
              {data.correspondentRoutingOptimization.sphereApproach && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                  <h5 className="text-emerald-400 font-medium mb-2">{data.correspondentRoutingOptimization.sphereApproach.title}</h5>
                  <p className="text-gray-300 text-sm mb-3">{data.correspondentRoutingOptimization.sphereApproach.description}</p>

                  {data.correspondentRoutingOptimization.sphereApproach.model && (
                    <div className="space-y-2">
                      {data.correspondentRoutingOptimization.sphereApproach.model.map((step: any, i: number) => (
                        <div key={i} className="grid grid-cols-3 gap-2 text-xs">
                          <div className="bg-slate-700/50 rounded p-2 text-center">
                            <span className="text-gray-500">Step</span>
                            <p className="text-white font-medium">{step.step}</p>
                          </div>
                          <div className="bg-red-500/10 rounded p-2">
                            <span className="text-red-400">Traditional</span>
                            <p className="text-gray-300">{step.traditional}</p>
                          </div>
                          <div className="bg-emerald-500/10 rounded p-2">
                            <span className="text-emerald-400">Sphere</span>
                            <p className="text-emerald-200">{step.sphere}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="text-emerald-200 text-sm mt-3 font-medium">{data.correspondentRoutingOptimization.sphereApproach.keyBenefit}</p>
                </div>
              )}

              {/* BaaS Techniques */}
              {data.correspondentRoutingOptimization.baaTechniques && (
                <div className="bg-slate-700/30 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setBaasExpanded(!baasExpanded)}
                    className="w-full p-3 text-left hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`transform transition-transform text-orange-400 ${baasExpanded ? 'rotate-90' : ''}`}>▶</span>
                      <h5 className="text-orange-300 font-medium">{data.correspondentRoutingOptimization.baaTechniques.title}</h5>
                    </div>
                    <p className="text-gray-400 text-xs mt-1 ml-5">{data.correspondentRoutingOptimization.baaTechniques.description}</p>
                  </button>
                  {baasExpanded && (
                    <div className="p-3 pt-0 border-t border-slate-600 space-y-2">
                      {data.correspondentRoutingOptimization.baaTechniques.techniques?.map((tech: any, i: number) => (
                        <div key={i} className="bg-slate-700/50 rounded p-3">
                          <span className="text-orange-300 font-medium text-sm">{tech.technique}</span>
                          <p className="text-gray-400 text-xs mt-1">{tech.description}</p>
                          <p className="text-emerald-300 text-xs mt-1">Benefit: {tech.benefit}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Resulting Advantage */}
              {data.correspondentRoutingOptimization.resultingAdvantage?.comparison && (
                <div>
                  <h5 className="text-orange-300 font-medium mb-3">{data.correspondentRoutingOptimization.resultingAdvantage.title}</h5>
                  <div className="space-y-4">
                    {data.correspondentRoutingOptimization.resultingAdvantage.comparison.map((comp: any, i: number) => (
                      <div key={i} className="bg-slate-700/50 rounded-lg p-4">
                        <h6 className="text-white font-medium mb-3">{comp.scenario}</h6>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div className="bg-red-500/10 rounded p-3">
                            <span className="text-red-400 text-xs font-medium">Traditional</span>
                            <div className="space-y-1 mt-2 text-xs">
                              <p className="text-gray-400">Method: <span className="text-gray-300">{comp.traditional.method}</span></p>
                              <p className="text-gray-400">Timing: <span className="text-red-300">{comp.traditional.timing}</span></p>
                              <p className="text-gray-400">Fees: <span className="text-red-300">{comp.traditional.fees}</span></p>
                              <p className="text-gray-400">Visibility: <span className="text-gray-300">{comp.traditional.visibility}</span></p>
                            </div>
                          </div>
                          <div className="bg-emerald-500/10 rounded p-3">
                            <span className="text-emerald-400 text-xs font-medium">Sphere</span>
                            <div className="space-y-1 mt-2 text-xs">
                              <p className="text-gray-400">Method: <span className="text-gray-300">{comp.sphere.method}</span></p>
                              <p className="text-gray-400">Timing: <span className="text-emerald-300">{comp.sphere.timing}</span></p>
                              <p className="text-gray-400">Fees: <span className="text-emerald-300">{comp.sphere.fees}</span></p>
                              <p className="text-gray-400">Visibility: <span className="text-gray-300">{comp.sphere.visibility}</span></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Dual Stack Position Section */}
      {data.dualStackPosition && (
        <div className="mb-6 bg-indigo-500/10 rounded-xl overflow-hidden border border-indigo-500/30">
          <button
            onClick={() => setDualStackExpanded(!dualStackExpanded)}
            className="w-full p-5 text-left hover:bg-indigo-500/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className={`transform transition-transform text-indigo-400 text-lg ${dualStackExpanded ? 'rotate-90' : ''}`}>▶</span>
              <span className="text-2xl">📊</span>
              <h4 className="text-indigo-300 font-semibold text-lg">{data.dualStackPosition.title}</h4>
            </div>
            <p className="text-gray-400 text-sm mt-2 ml-10">{data.dualStackPosition.subtitle}</p>
          </button>
          {dualStackExpanded && (
            <div className="p-5 pt-0 border-t border-indigo-500/30 space-y-4">
              {/* Concept */}
              {data.dualStackPosition.concept && (
                <div>
                  <h5 className="text-indigo-300 font-medium mb-3">{data.dualStackPosition.concept.title}</h5>
                  <p className="text-gray-300 text-sm mb-3">{data.dualStackPosition.concept.description}</p>
                  <div className="grid md:grid-cols-2 gap-3">
                    {data.dualStackPosition.concept.positions?.map((pos: any, i: number) => (
                      <div key={i} className={`rounded-lg p-4 ${i === 0 ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-purple-500/10 border border-purple-500/30'}`}>
                        <h6 className={`font-medium mb-2 ${i === 0 ? 'text-blue-300' : 'text-purple-300'}`}>{pos.position}</h6>
                        <p className="text-gray-300 text-sm mb-2">{pos.description}</p>
                        <p className="text-gray-400 text-xs mb-2">{pos.whatThisMeans}</p>
                        <p className="text-gray-500 text-xs italic">Competitors here: {pos.competitors}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Why Both Matters */}
              {data.dualStackPosition.whyBothMatters && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                  <h5 className="text-emerald-400 font-medium mb-3">{data.dualStackPosition.whyBothMatters.title}</h5>
                  <div className="space-y-3">
                    {data.dualStackPosition.whyBothMatters.reasons?.map((reason: any, i: number) => (
                      <div key={i} className="bg-slate-700/50 rounded p-3">
                        <span className="text-white font-medium text-sm">{reason.reason}</span>
                        <p className="text-gray-400 text-xs mt-1">{reason.explanation}</p>
                        <p className="text-emerald-300 text-xs mt-1">→ {reason.sphereDifference}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Practical Example */}
              {data.dualStackPosition.practicalExample && (
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h5 className="text-indigo-300 font-medium mb-2">{data.dualStackPosition.practicalExample.title}</h5>
                  <p className="text-gray-400 text-sm mb-3 italic">{data.dualStackPosition.practicalExample.scenario}</p>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-blue-500/10 rounded p-3">
                      <span className="text-blue-400 text-xs font-medium">Aggregator Layer Actions</span>
                      <ul className="mt-2 space-y-1">
                        {data.dualStackPosition.practicalExample.aggregatorActions?.map((action: string, i: number) => (
                          <li key={i} className="text-gray-300 text-xs flex items-start gap-2">
                            <span className="text-blue-400">•</span>
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-purple-500/10 rounded p-3">
                      <span className="text-purple-400 text-xs font-medium">Infrastructure Layer Actions</span>
                      <ul className="mt-2 space-y-1">
                        {data.dualStackPosition.practicalExample.infrastructureActions?.map((action: string, i: number) => (
                          <li key={i} className="text-gray-300 text-xs flex items-start gap-2">
                            <span className="text-purple-400">•</span>
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <p className="text-emerald-300 text-sm mt-3">{data.dualStackPosition.practicalExample.result}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Measurable Impact Section */}
      {data.measureableImpact && (
        <div className="mb-4 bg-emerald-500/10 rounded-xl overflow-hidden border border-emerald-500/30">
          <button
            onClick={() => setImpactExpanded(!impactExpanded)}
            className="w-full p-5 text-left hover:bg-emerald-500/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className={`transform transition-transform text-emerald-400 text-lg ${impactExpanded ? 'rotate-90' : ''}`}>▶</span>
              <span className="text-2xl">📈</span>
              <h4 className="text-emerald-300 font-semibold text-lg">{data.measureableImpact.title}</h4>
            </div>
            <p className="text-gray-400 text-sm mt-2 ml-10">{data.measureableImpact.subtitle}</p>
          </button>
          {impactExpanded && (
            <div className="p-5 pt-0 border-t border-emerald-500/30 space-y-4">
              {/* Settlement Speed */}
              {data.measureableImpact.settlementSpeed && (
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h5 className="text-emerald-300 font-medium mb-2">{data.measureableImpact.settlementSpeed.title}</h5>
                  <div className="bg-emerald-500/20 rounded-lg p-3 mb-3 text-center">
                    <p className="text-emerald-200 font-bold text-lg">{data.measureableImpact.settlementSpeed.claim}</p>
                  </div>
                  <div className="space-y-2 mb-3">
                    {data.measureableImpact.settlementSpeed.breakdown?.map((item: any, i: number) => (
                      <div key={i} className="flex items-center justify-between text-sm bg-slate-700/30 rounded p-2">
                        <span className="text-gray-300">{item.component}</span>
                        <span className="text-emerald-300">{item.contribution}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-400 text-sm"><strong className="text-white">Comparison:</strong> {data.measureableImpact.settlementSpeed.comparison}</p>
                  <p className="text-gray-500 text-xs mt-2 italic">Note: {data.measureableImpact.settlementSpeed.caveat}</p>
                </div>
              )}

              {/* Cost Savings */}
              {data.measureableImpact.costSavings && (
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h5 className="text-emerald-300 font-medium mb-3">{data.measureableImpact.costSavings.title}</h5>
                  <div className="space-y-2">
                    {data.measureableImpact.costSavings.benefits?.map((benefit: any, i: number) => (
                      <div key={i} className="grid grid-cols-3 gap-2 text-xs">
                        <div className="bg-slate-700/30 rounded p-2">
                          <span className="text-white font-medium">{benefit.benefit}</span>
                        </div>
                        <div className="bg-red-500/10 rounded p-2">
                          <span className="text-red-400">Traditional:</span>
                          <p className="text-gray-300">{benefit.traditional}</p>
                        </div>
                        <div className="bg-emerald-500/10 rounded p-2">
                          <span className="text-emerald-400">Sphere:</span>
                          <p className="text-emerald-200">{benefit.sphere}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Operational Efficiency */}
              {data.measureableImpact.operationalEfficiency && (
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h5 className="text-emerald-300 font-medium mb-3">{data.measureableImpact.operationalEfficiency.title}</h5>
                  <div className="space-y-2">
                    {data.measureableImpact.operationalEfficiency.gains?.map((gain: any, i: number) => (
                      <div key={i} className="bg-slate-700/30 rounded p-3">
                        <span className="text-white font-medium text-sm">{gain.gain}</span>
                        <p className="text-gray-400 text-xs mt-1">{gain.description}</p>
                        <p className="text-emerald-300 text-xs mt-1">Quantified: {gain.quantified}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Key Takeaway */}
      {data.measureableImpact?.keyTakeaway && (
        <div className="bg-gradient-to-r from-purple-500/20 to-emerald-500/20 border border-purple-500/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔑</span>
            <div>
              <span className="text-purple-300 font-semibold text-sm">KEY TAKEAWAY</span>
              <p className="text-white mt-1">{data.measureableImpact.keyTakeaway}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Liquidity Recycling Deep Dive Block
function LiquidityRecyclingDeepDiveBlock({ data }: { data: any }) {
  const [overviewExpanded, setOverviewExpanded] = useState(true);
  const [traditionalExpanded, setTraditionalExpanded] = useState(false);
  const [wiseExpanded, setWiseExpanded] = useState(false);
  const [mathExpanded, setMathExpanded] = useState(false);
  const [howSphereExpanded, setHowSphereExpanded] = useState(false);
  const [storiesExpanded, setStoriesExpanded] = useState(false);
  const [storyIndex, setStoryIndex] = useState<number | null>(null);
  const [objectionsExpanded, setObjectionsExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border-2 border-emerald-500/50">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">💰</span>
        <h3 className="font-bold text-white text-2xl">{data.title}</h3>
      </div>
      <p className="text-emerald-300 mb-6 text-lg">{data.subtitle}</p>

      {/* Overview */}
      {data.overview && (
        <div className="mb-6 bg-emerald-500/10 rounded-xl overflow-hidden border border-emerald-500/30">
          <button
            onClick={() => setOverviewExpanded(!overviewExpanded)}
            className="w-full p-5 text-left hover:bg-emerald-500/20 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`transform transition-transform text-emerald-400 text-lg ${overviewExpanded ? 'rotate-90' : ''}`}>▶</span>
                <h4 className="text-emerald-300 font-semibold text-lg">{data.overview.title}</h4>
              </div>
              <span className="bg-emerald-500/30 text-emerald-200 px-3 py-1 rounded-full text-sm">Start Here</span>
            </div>
          </button>
          {overviewExpanded && (
            <div className="p-5 pt-0 border-t border-emerald-500/30 space-y-4">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <span className="text-emerald-400 font-medium">Definition:</span>
                <p className="text-gray-300 mt-1">{data.overview.definition}</p>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <span className="text-red-400 font-medium">Why It Matters:</span>
                <p className="text-gray-300 mt-1">{data.overview.whyItMatters}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Traditional Problem */}
      {data.traditionalProblem && (
        <div className="mb-6 bg-red-500/10 rounded-xl overflow-hidden border border-red-500/30">
          <button
            onClick={() => setTraditionalExpanded(!traditionalExpanded)}
            className="w-full p-5 text-left hover:bg-red-500/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className={`transform transition-transform text-red-400 text-lg ${traditionalExpanded ? 'rotate-90' : ''}`}>▶</span>
              <span className="text-2xl">⚠️</span>
              <h4 className="text-red-300 font-semibold text-lg">{data.traditionalProblem.title}</h4>
            </div>
            <p className="text-gray-400 text-sm mt-2 ml-10">{data.traditionalProblem.subtitle}</p>
          </button>
          {traditionalExpanded && (
            <div className="p-5 pt-0 border-t border-red-500/30 space-y-4">
              {/* How Pre-Funding Works */}
              {data.traditionalProblem.howItWorks && (
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h5 className="text-white font-medium mb-3">{data.traditionalProblem.howItWorks.title}</h5>
                  <p className="text-gray-400 text-sm mb-3">{data.traditionalProblem.howItWorks.explanation}</p>
                  <div className="space-y-2">
                    {data.traditionalProblem.howItWorks.steps?.map((step: any, i: number) => (
                      <div key={i} className="flex items-start gap-3 bg-slate-700/30 rounded p-2">
                        <span className="bg-red-500/30 text-red-200 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">{step.step}</span>
                        <div>
                          <p className="text-gray-300 text-sm">{step.description}</p>
                          <p className="text-red-300 text-xs mt-1">{step.issue}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Wise Example */}
              {data.traditionalProblem.wiseExample && (
                <div className="bg-amber-500/10 rounded-lg overflow-hidden border border-amber-500/30">
                  <button
                    onClick={() => setWiseExpanded(!wiseExpanded)}
                    className="w-full p-3 text-left hover:bg-amber-500/20 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`transform transition-transform text-amber-400 ${wiseExpanded ? 'rotate-90' : ''}`}>▶</span>
                      <h5 className="text-amber-300 font-medium">{data.traditionalProblem.wiseExample.title}</h5>
                    </div>
                    <p className="text-gray-400 text-xs mt-1 ml-5">{data.traditionalProblem.wiseExample.context}</p>
                  </button>
                  {wiseExpanded && (
                    <div className="p-3 pt-0 border-t border-amber-500/30 space-y-2">
                      <div className="grid md:grid-cols-3 gap-3">
                        {data.traditionalProblem.wiseExample.stats?.map((stat: any, i: number) => (
                          <div key={i} className="bg-slate-700/50 rounded p-3 text-center">
                            <span className="text-amber-300 font-bold text-2xl">{stat.stat}</span>
                            <p className="text-white text-sm mt-1">{stat.label}</p>
                            <p className="text-gray-400 text-xs mt-1">{stat.detail}</p>
                          </div>
                        ))}
                      </div>
                      <div className="bg-amber-500/10 rounded p-2">
                        <p className="text-amber-200 text-sm">{data.traditionalProblem.wiseExample.insight}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Capital Math */}
              {data.traditionalProblem.capitalMathExample && (
                <div className="bg-slate-700/30 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setMathExpanded(!mathExpanded)}
                    className="w-full p-3 text-left hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`transform transition-transform text-blue-400 ${mathExpanded ? 'rotate-90' : ''}`}>▶</span>
                      <h5 className="text-blue-300 font-medium">{data.traditionalProblem.capitalMathExample.title}</h5>
                    </div>
                    <p className="text-gray-400 text-xs mt-1 ml-5">{data.traditionalProblem.capitalMathExample.scenario}</p>
                  </button>
                  {mathExpanded && (
                    <div className="p-3 pt-0 border-t border-slate-600 space-y-3">
                      <div className="grid md:grid-cols-2 gap-4">
                        {/* Traditional */}
                        <div className="bg-red-500/10 rounded-lg p-3">
                          <h6 className="text-red-400 font-medium mb-2">{data.traditionalProblem.capitalMathExample.traditional.title}</h6>
                          <div className="space-y-1">
                            {data.traditionalProblem.capitalMathExample.traditional.calculations?.map((calc: any, i: number) => (
                              <div key={i} className="flex justify-between text-xs">
                                <span className="text-gray-400">{calc.item}:</span>
                                <span className="text-red-300">{calc.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* Sphere */}
                        <div className="bg-emerald-500/10 rounded-lg p-3">
                          <h6 className="text-emerald-400 font-medium mb-2">{data.traditionalProblem.capitalMathExample.sphere.title}</h6>
                          <div className="space-y-1">
                            {data.traditionalProblem.capitalMathExample.sphere.calculations?.map((calc: any, i: number) => (
                              <div key={i} className="flex justify-between text-xs">
                                <span className="text-gray-400">{calc.item}:</span>
                                <span className="text-emerald-300">{calc.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="bg-emerald-500/20 rounded p-2 text-center">
                        <p className="text-emerald-200 text-sm font-medium">{data.traditionalProblem.capitalMathExample.impact}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* How Sphere Enables */}
      {data.howSphereEnables && (
        <div className="mb-6 bg-emerald-500/10 rounded-xl overflow-hidden border border-emerald-500/30">
          <button
            onClick={() => setHowSphereExpanded(!howSphereExpanded)}
            className="w-full p-5 text-left hover:bg-emerald-500/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className={`transform transition-transform text-emerald-400 text-lg ${howSphereExpanded ? 'rotate-90' : ''}`}>▶</span>
              <span className="text-2xl">✨</span>
              <h4 className="text-emerald-300 font-semibold text-lg">{data.howSphereEnables.title}</h4>
            </div>
            <p className="text-gray-400 text-sm mt-2 ml-10">{data.howSphereEnables.subtitle}</p>
          </button>
          {howSphereExpanded && (
            <div className="p-5 pt-0 border-t border-emerald-500/30 space-y-4">
              {/* Mechanism */}
              {data.howSphereEnables.mechanism && (
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h5 className="text-emerald-300 font-medium mb-3">{data.howSphereEnables.mechanism.title}</h5>
                  <div className="space-y-3">
                    {data.howSphereEnables.mechanism.steps?.map((step: any, i: number) => (
                      <div key={i} className="bg-slate-700/30 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-emerald-500/30 text-emerald-200 px-2 py-1 rounded text-xs font-medium">{step.step}</span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-3 text-xs">
                          <div className="bg-red-500/10 rounded p-2">
                            <span className="text-red-400">Traditional:</span>
                            <p className="text-gray-300 mt-1">{step.traditional}</p>
                            <p className="text-red-300 mt-1">⏱ {step.timeTraditional}</p>
                          </div>
                          <div className="bg-emerald-500/10 rounded p-2">
                            <span className="text-emerald-400">Sphere:</span>
                            <p className="text-gray-300 mt-1">{step.sphere}</p>
                            <p className="text-emerald-300 mt-1">⏱ {step.timeSphere}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Multiplier Effect */}
              {data.howSphereEnables.multiplierEffect && (
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                  <h5 className="text-purple-300 font-medium mb-2">{data.howSphereEnables.multiplierEffect.title}</h5>
                  <p className="text-gray-300 text-sm mb-3">{data.howSphereEnables.multiplierEffect.explanation}</p>
                  {data.howSphereEnables.multiplierEffect.example && (
                    <div className="bg-slate-700/50 rounded p-3">
                      <p className="text-gray-400 text-sm"><strong className="text-white">Scenario:</strong> {data.howSphereEnables.multiplierEffect.example.scenario}</p>
                      <div className="grid md:grid-cols-3 gap-2 mt-2">
                        <div className="bg-red-500/10 rounded p-2 text-center">
                          <span className="text-red-400 text-xs">Traditional</span>
                          <p className="text-red-300 text-sm mt-1">{data.howSphereEnables.multiplierEffect.example.traditional}</p>
                        </div>
                        <div className="bg-emerald-500/10 rounded p-2 text-center">
                          <span className="text-emerald-400 text-xs">Sphere</span>
                          <p className="text-emerald-300 text-sm mt-1">{data.howSphereEnables.multiplierEffect.example.sphere}</p>
                        </div>
                        <div className="bg-purple-500/10 rounded p-2 text-center">
                          <span className="text-purple-400 text-xs">Multiplier</span>
                          <p className="text-purple-300 text-sm font-bold mt-1">{data.howSphereEnables.multiplierEffect.example.multiplier}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  <p className="text-emerald-200 text-sm mt-3">{data.howSphereEnables.multiplierEffect.customerValue}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Customer Impact Stories */}
      {data.customerImpactStories && (
        <div className="mb-6 bg-blue-500/10 rounded-xl overflow-hidden border border-blue-500/30">
          <button
            onClick={() => setStoriesExpanded(!storiesExpanded)}
            className="w-full p-5 text-left hover:bg-blue-500/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className={`transform transition-transform text-blue-400 text-lg ${storiesExpanded ? 'rotate-90' : ''}`}>▶</span>
              <span className="text-2xl">📖</span>
              <h4 className="text-blue-300 font-semibold text-lg">{data.customerImpactStories.title}</h4>
            </div>
            <p className="text-gray-400 text-sm mt-2 ml-10">{data.customerImpactStories.subtitle}</p>
          </button>
          {storiesExpanded && (
            <div className="p-5 pt-0 border-t border-blue-500/30 space-y-3">
              {data.customerImpactStories.examples?.map((example: any, i: number) => (
                <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setStoryIndex(storyIndex === i ? null : i)}
                    className="w-full p-3 text-left hover:bg-slate-700/70 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`transform transition-transform text-blue-400 ${storyIndex === i ? 'rotate-90' : ''}`}>▶</span>
                        <span className="text-white font-medium">{example.type}</span>
                      </div>
                    </div>
                  </button>
                  {storyIndex === i && (
                    <div className="p-3 pt-0 border-t border-slate-600 space-y-3">
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="bg-red-500/10 rounded p-3">
                          <span className="text-red-400 text-xs font-medium">BEFORE</span>
                          <div className="space-y-1 mt-2 text-xs">
                            <p className="text-gray-300"><strong>Situation:</strong> {example.before.situation}</p>
                            <p className="text-gray-300"><strong>Constraint:</strong> {example.before.constraint}</p>
                            <p className="text-gray-300"><strong>Operations:</strong> {example.before.operations}</p>
                          </div>
                        </div>
                        <div className="bg-emerald-500/10 rounded p-3">
                          <span className="text-emerald-400 text-xs font-medium">AFTER</span>
                          <div className="space-y-1 mt-2 text-xs">
                            <p className="text-gray-300"><strong>Situation:</strong> {example.after.situation}</p>
                            <p className="text-emerald-300"><strong>Benefit:</strong> {example.after.benefit}</p>
                            <p className="text-gray-300"><strong>Operations:</strong> {example.after.operations}</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-blue-500/10 rounded p-2 italic">
                        <p className="text-blue-200 text-sm">"{example.quote}"</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Objection Handling */}
      {data.objectionHandling && (
        <div className="mb-4 bg-amber-500/10 rounded-xl overflow-hidden border border-amber-500/30">
          <button
            onClick={() => setObjectionsExpanded(!objectionsExpanded)}
            className="w-full p-5 text-left hover:bg-amber-500/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className={`transform transition-transform text-amber-400 text-lg ${objectionsExpanded ? 'rotate-90' : ''}`}>▶</span>
              <span className="text-2xl">💬</span>
              <h4 className="text-amber-300 font-semibold text-lg">{data.objectionHandling.title}</h4>
            </div>
          </button>
          {objectionsExpanded && (
            <div className="p-5 pt-0 border-t border-amber-500/30 space-y-3">
              {data.objectionHandling.questions?.map((q: any, i: number) => (
                <div key={i} className="bg-slate-700/50 rounded-lg p-4">
                  <p className="text-amber-300 font-medium text-sm mb-2">{q.question}</p>
                  <p className="text-gray-300 text-sm">{q.answer}</p>
                  <p className="text-emerald-300 text-xs mt-2 bg-emerald-500/10 rounded px-2 py-1 inline-block">Key: {q.key}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Key Takeaway */}
      {data.keyTakeaway && (
        <div className="bg-gradient-to-r from-emerald-500/20 to-purple-500/20 border border-emerald-500/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔑</span>
            <div>
              <span className="text-emerald-300 font-semibold text-sm">KEY TAKEAWAY</span>
              <p className="text-white mt-1">{data.keyTakeaway}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Stablecoin Sandwich UX Block (Pillar 5 - comprehensive UX abstraction section)
function StablecoinSandwichUXBlock({ data }: { data: any }) {
  const [overviewExpanded, setOverviewExpanded] = useState(true);
  const [howItWorksExpanded, setHowItWorksExpanded] = useState(false);
  const [neverSeeExpanded, setNeverSeeExpanded] = useState(false);
  const [principlesExpanded, setPrinciplesExpanded] = useState(false);
  const [comparisonExpanded, setComparisonExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border-2 border-cyan-500/50">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">🥪</span>
        <h3 className="font-bold text-white text-2xl">{data.title}</h3>
      </div>
      <p className="text-cyan-300 mb-6 text-lg">{data.subtitle}</p>

      {/* Overview */}
      {data.overview && (
        <div className="mb-6 bg-cyan-500/10 rounded-xl overflow-hidden border border-cyan-500/30">
          <button
            onClick={() => setOverviewExpanded(!overviewExpanded)}
            className="w-full p-5 text-left hover:bg-cyan-500/20 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`transform transition-transform text-cyan-400 text-lg ${overviewExpanded ? 'rotate-90' : ''}`}>▶</span>
                <h4 className="text-cyan-300 font-semibold text-lg">{data.overview.title}</h4>
              </div>
            </div>
          </button>
          {overviewExpanded && (
            <div className="p-5 pt-0 border-t border-cyan-500/30 space-y-4">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <span className="text-cyan-400 font-medium">Definition:</span>
                <p className="text-gray-300 mt-1">{data.overview.definition}</p>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                <span className="text-emerald-400 font-medium">Why It Matters:</span>
                <p className="text-gray-300 mt-1">{data.overview.whyItMatters}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* How It Works */}
      {data.howItWorks && (
        <div className="mb-6 bg-purple-500/10 rounded-xl overflow-hidden border border-purple-500/30">
          <button
            onClick={() => setHowItWorksExpanded(!howItWorksExpanded)}
            className="w-full p-5 text-left hover:bg-purple-500/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className={`transform transition-transform text-purple-400 text-lg ${howItWorksExpanded ? 'rotate-90' : ''}`}>▶</span>
              <span className="text-2xl">📊</span>
              <h4 className="text-purple-300 font-semibold text-lg">{data.howItWorks.title}</h4>
            </div>
          </button>
          {howItWorksExpanded && (
            <div className="p-5 pt-0 border-t border-purple-500/30 space-y-4">
              {data.howItWorks.layers?.map((layer: any, i: number) => (
                <div key={i} className={`rounded-lg p-4 ${i === 0 ? 'bg-amber-500/10 border border-amber-500/30' : i === 1 ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-amber-500/10 border border-amber-500/30'}`}>
                  <h5 className={`font-medium mb-2 ${i === 0 ? 'text-amber-300' : i === 1 ? 'text-blue-300' : 'text-amber-300'}`}>{layer.layer}</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-gray-500 min-w-[100px]">User sees:</span>
                      <span className="text-white">{layer.userExperience}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-gray-500 min-w-[100px]">Behind scenes:</span>
                      <span className="text-gray-300">{layer.behindScenes}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-gray-500 min-w-[100px]">User knows:</span>
                      <span className="text-emerald-300">{layer.userKnowledge}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
                <p className="text-emerald-200 text-sm font-medium">{data.howItWorks.keyInsight}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* What Users Never See */}
      {data.whatUsersNeverSee && (
        <div className="mb-6 bg-red-500/10 rounded-xl overflow-hidden border border-red-500/30">
          <button
            onClick={() => setNeverSeeExpanded(!neverSeeExpanded)}
            className="w-full p-5 text-left hover:bg-red-500/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className={`transform transition-transform text-red-400 text-lg ${neverSeeExpanded ? 'rotate-90' : ''}`}>▶</span>
              <span className="text-2xl">🚫</span>
              <h4 className="text-red-300 font-semibold text-lg">{data.whatUsersNeverSee.title}</h4>
            </div>
          </button>
          {neverSeeExpanded && (
            <div className="p-5 pt-0 border-t border-red-500/30 space-y-3">
              {data.whatUsersNeverSee.items?.map((item: any, i: number) => (
                <div key={i} className="bg-slate-700/50 rounded-lg p-4">
                  <h5 className="text-white font-medium mb-2">{item.cryptoComplexity}</h5>
                  <div className="grid md:grid-cols-3 gap-3 text-xs">
                    <div className="bg-red-500/10 rounded p-2">
                      <span className="text-red-400">Traditional Crypto:</span>
                      <p className="text-gray-300 mt-1">{item.traditionalCrypto}</p>
                    </div>
                    <div className="bg-emerald-500/10 rounded p-2">
                      <span className="text-emerald-400">Sphere Experience:</span>
                      <p className="text-emerald-200 mt-1">{item.sphereExperience}</p>
                    </div>
                    <div className="bg-blue-500/10 rounded p-2">
                      <span className="text-blue-400">Business Benefit:</span>
                      <p className="text-gray-300 mt-1">{item.businessBenefit}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Design Principles */}
      {data.designPrinciples && (
        <div className="mb-6 bg-blue-500/10 rounded-xl overflow-hidden border border-blue-500/30">
          <button
            onClick={() => setPrinciplesExpanded(!principlesExpanded)}
            className="w-full p-5 text-left hover:bg-blue-500/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className={`transform transition-transform text-blue-400 text-lg ${principlesExpanded ? 'rotate-90' : ''}`}>▶</span>
              <span className="text-2xl">🎨</span>
              <h4 className="text-blue-300 font-semibold text-lg">{data.designPrinciples.title}</h4>
            </div>
            <p className="text-gray-400 text-sm mt-2 ml-10">{data.designPrinciples.subtitle}</p>
          </button>
          {principlesExpanded && (
            <div className="p-5 pt-0 border-t border-blue-500/30 space-y-3">
              {data.designPrinciples.principles?.map((p: any, i: number) => (
                <div key={i} className="bg-slate-700/50 rounded-lg p-4">
                  <h5 className="text-blue-300 font-medium mb-2">{p.principle}</h5>
                  <p className="text-gray-300 text-sm mb-2">{p.description}</p>
                  <div className="bg-slate-700/30 rounded p-2">
                    <span className="text-gray-500 text-xs">Example:</span>
                    <p className="text-gray-300 text-xs mt-1">{p.example}</p>
                  </div>
                  <p className="text-emerald-300 text-xs mt-2">Why: {p.why}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Competitor Comparison */}
      {data.competitorComparison && (
        <div className="mb-4 bg-amber-500/10 rounded-xl overflow-hidden border border-amber-500/30">
          <button
            onClick={() => setComparisonExpanded(!comparisonExpanded)}
            className="w-full p-5 text-left hover:bg-amber-500/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className={`transform transition-transform text-amber-400 text-lg ${comparisonExpanded ? 'rotate-90' : ''}`}>▶</span>
              <span className="text-2xl">⚔️</span>
              <h4 className="text-amber-300 font-semibold text-lg">{data.competitorComparison.title}</h4>
            </div>
          </button>
          {comparisonExpanded && (
            <div className="p-5 pt-0 border-t border-amber-500/30 space-y-2">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-600">
                      <th className="text-left text-gray-400 p-2">Aspect</th>
                      <th className="text-left text-red-400 p-2">Crypto-First</th>
                      <th className="text-left text-emerald-400 p-2">Sphere</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.competitorComparison.comparison?.map((row: any, i: number) => (
                      <tr key={i} className="border-b border-slate-700">
                        <td className="text-gray-300 p-2">{row.aspect}</td>
                        <td className="text-red-300 p-2">{row.cryptoFirst}</td>
                        <td className="text-emerald-300 p-2">{row.sphere}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-purple-500/10 rounded p-2 mt-3">
                <p className="text-purple-200 text-sm">{data.competitorComparison.insight}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Key Takeaway */}
      {data.keyTakeaway && (
        <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔑</span>
            <div>
              <span className="text-cyan-300 font-semibold text-sm">KEY TAKEAWAY</span>
              <p className="text-white mt-1">{data.keyTakeaway}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Dual Go-to-Market Block
function DualGoToMarketBlock({ data }: { data: any }) {
  const [overviewExpanded, setOverviewExpanded] = useState(true);
  const [bottomUpExpanded, setBottomUpExpanded] = useState(false);
  const [topDownExpanded, setTopDownExpanded] = useState(false);
  const [reinforcementExpanded, setReinforcementExpanded] = useState(false);
  const [practicalExpanded, setPracticalExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border-2 border-indigo-500/50">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">🎯</span>
        <h3 className="font-bold text-white text-2xl">{data.title}</h3>
      </div>
      <p className="text-indigo-300 mb-6 text-lg">{data.subtitle}</p>

      {/* Overview */}
      {data.overview && (
        <div className="mb-6 bg-indigo-500/10 rounded-xl overflow-hidden border border-indigo-500/30">
          <button
            onClick={() => setOverviewExpanded(!overviewExpanded)}
            className="w-full p-5 text-left hover:bg-indigo-500/20 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`transform transition-transform text-indigo-400 text-lg ${overviewExpanded ? 'rotate-90' : ''}`}>▶</span>
                <h4 className="text-indigo-300 font-semibold text-lg">{data.overview.title}</h4>
              </div>
            </div>
          </button>
          {overviewExpanded && (
            <div className="p-5 pt-0 border-t border-indigo-500/30 space-y-4">
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <span className="text-purple-400 font-medium">Core Thesis:</span>
                <p className="text-white mt-1 font-medium">{data.overview.thesis}</p>
              </div>
              <div className="space-y-2">
                {data.overview.whyBothRequired?.map((reason: string, i: number) => (
                  <div key={i} className={`rounded-lg p-3 ${i === 2 ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
                    <p className={i === 2 ? 'text-emerald-200 text-sm' : 'text-red-200 text-sm'}>{reason}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bottom-Up Strategy */}
      {data.bottomUpStrategy && (
        <div className="mb-6 bg-blue-500/10 rounded-xl overflow-hidden border border-blue-500/30">
          <button
            onClick={() => setBottomUpExpanded(!bottomUpExpanded)}
            className="w-full p-5 text-left hover:bg-blue-500/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className={`transform transition-transform text-blue-400 text-lg ${bottomUpExpanded ? 'rotate-90' : ''}`}>▶</span>
              <span className="text-2xl">⬆️</span>
              <h4 className="text-blue-300 font-semibold text-lg">{data.bottomUpStrategy.title}</h4>
            </div>
            <p className="text-gray-400 text-sm mt-2 ml-10">Target: {data.bottomUpStrategy.target}</p>
          </button>
          {bottomUpExpanded && (
            <div className="p-5 pt-0 border-t border-blue-500/30 space-y-4">
              {/* Tactics */}
              {data.bottomUpStrategy.approach && (
                <div>
                  <h5 className="text-blue-300 font-medium mb-3">{data.bottomUpStrategy.approach.title}</h5>
                  <div className="space-y-3">
                    {data.bottomUpStrategy.approach.tactics?.map((tactic: any, i: number) => (
                      <div key={i} className="bg-slate-700/50 rounded-lg p-3">
                        <h6 className="text-white font-medium text-sm mb-1">{tactic.tactic}</h6>
                        <p className="text-gray-400 text-xs">{tactic.description}</p>
                        <p className="text-blue-300 text-xs mt-1">Example: {tactic.example}</p>
                        <p className="text-gray-500 text-xs mt-1 italic">→ {tactic.expansion}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Metrics */}
              {data.bottomUpStrategy.metrics && (
                <div className="bg-emerald-500/10 rounded-lg p-3">
                  <h5 className="text-emerald-300 font-medium mb-2">{data.bottomUpStrategy.metrics.title}</h5>
                  <div className="grid md:grid-cols-2 gap-2">
                    {data.bottomUpStrategy.metrics.kpis?.map((kpi: any, i: number) => (
                      <div key={i} className="bg-slate-700/50 rounded p-2">
                        <span className="text-white text-xs font-medium">{kpi.metric}</span>
                        <p className="text-emerald-300 text-sm font-bold">{kpi.target}</p>
                        <p className="text-gray-500 text-xs">{kpi.why}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Limitations */}
              {data.bottomUpStrategy.limitations && (
                <div className="bg-red-500/10 rounded-lg p-3">
                  <h5 className="text-red-400 font-medium mb-2">{data.bottomUpStrategy.limitations.title}</h5>
                  <div className="space-y-1">
                    {data.bottomUpStrategy.limitations.issues?.map((issue: any, i: number) => (
                      <div key={i} className="flex items-start gap-2 text-xs">
                        <span className="text-red-400">✗</span>
                        <span className="text-gray-300">{issue.limitation}: <span className="text-red-300">{issue.impact}</span></span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Top-Down Strategy */}
      {data.topDownStrategy && (
        <div className="mb-6 bg-purple-500/10 rounded-xl overflow-hidden border border-purple-500/30">
          <button
            onClick={() => setTopDownExpanded(!topDownExpanded)}
            className="w-full p-5 text-left hover:bg-purple-500/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className={`transform transition-transform text-purple-400 text-lg ${topDownExpanded ? 'rotate-90' : ''}`}>▶</span>
              <span className="text-2xl">⬇️</span>
              <h4 className="text-purple-300 font-semibold text-lg">{data.topDownStrategy.title}</h4>
            </div>
            <p className="text-gray-400 text-sm mt-2 ml-10">Target: {data.topDownStrategy.target}</p>
          </button>
          {topDownExpanded && (
            <div className="p-5 pt-0 border-t border-purple-500/30 space-y-4">
              {/* Tactics */}
              {data.topDownStrategy.approach && (
                <div>
                  <h5 className="text-purple-300 font-medium mb-3">{data.topDownStrategy.approach.title}</h5>
                  <div className="space-y-3">
                    {data.topDownStrategy.approach.tactics?.map((tactic: any, i: number) => (
                      <div key={i} className="bg-slate-700/50 rounded-lg p-3">
                        <h6 className="text-white font-medium text-sm mb-1">{tactic.tactic}</h6>
                        <p className="text-gray-400 text-xs">{tactic.description}</p>
                        <p className="text-purple-300 text-xs mt-1">Example: {tactic.example}</p>
                        <p className="text-emerald-300 text-xs mt-1">→ {tactic.outcome}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Metrics */}
              {data.topDownStrategy.metrics && (
                <div className="bg-emerald-500/10 rounded-lg p-3">
                  <h5 className="text-emerald-300 font-medium mb-2">{data.topDownStrategy.metrics.title}</h5>
                  <div className="grid md:grid-cols-2 gap-2">
                    {data.topDownStrategy.metrics.kpis?.map((kpi: any, i: number) => (
                      <div key={i} className="bg-slate-700/50 rounded p-2">
                        <span className="text-white text-xs font-medium">{kpi.metric}</span>
                        <p className="text-emerald-300 text-sm font-bold">{kpi.target}</p>
                        <p className="text-gray-500 text-xs">{kpi.why}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Limitations */}
              {data.topDownStrategy.limitations && (
                <div className="bg-red-500/10 rounded-lg p-3">
                  <h5 className="text-red-400 font-medium mb-2">{data.topDownStrategy.limitations.title}</h5>
                  <div className="space-y-1">
                    {data.topDownStrategy.limitations.issues?.map((issue: any, i: number) => (
                      <div key={i} className="flex items-start gap-2 text-xs">
                        <span className="text-red-400">✗</span>
                        <span className="text-gray-300">{issue.limitation}: <span className="text-red-300">{issue.impact}</span></span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Reinforcement Loop */}
      {data.reinforcementLoop && (
        <div className="mb-6 bg-emerald-500/10 rounded-xl overflow-hidden border border-emerald-500/30">
          <button
            onClick={() => setReinforcementExpanded(!reinforcementExpanded)}
            className="w-full p-5 text-left hover:bg-emerald-500/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className={`transform transition-transform text-emerald-400 text-lg ${reinforcementExpanded ? 'rotate-90' : ''}`}>▶</span>
              <span className="text-2xl">🔄</span>
              <h4 className="text-emerald-300 font-semibold text-lg">{data.reinforcementLoop.title}</h4>
            </div>
            <p className="text-gray-400 text-sm mt-2 ml-10">{data.reinforcementLoop.subtitle}</p>
          </button>
          {reinforcementExpanded && (
            <div className="p-5 pt-0 border-t border-emerald-500/30 space-y-4">
              {/* Mechanisms */}
              <div className="space-y-3">
                {data.reinforcementLoop.mechanisms?.map((mech: any, i: number) => (
                  <div key={i} className="bg-slate-700/50 rounded-lg p-3">
                    <h5 className="text-emerald-300 font-medium text-sm mb-1">{mech.mechanism}</h5>
                    <p className="text-gray-400 text-xs">{mech.description}</p>
                    <p className="text-blue-300 text-xs mt-1 italic">"{mech.example}"</p>
                    <p className="text-emerald-200 text-xs mt-1">→ {mech.effect}</p>
                  </div>
                ))}
              </div>

              {/* Flywheel */}
              {data.reinforcementLoop.flywheel && (
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                  <h5 className="text-purple-300 font-medium mb-3">{data.reinforcementLoop.flywheel.title}</h5>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {data.reinforcementLoop.flywheel.stages?.map((stage: any, i: number) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="bg-slate-700/50 rounded-lg p-3 text-center min-w-[120px]">
                          <span className="bg-purple-500/30 text-purple-200 w-6 h-6 rounded-full inline-flex items-center justify-center text-sm font-bold mb-1">{stage.stage}</span>
                          <p className="text-white text-xs font-medium">{stage.action}</p>
                          <p className="text-gray-400 text-xs mt-1">→ {stage.outcome}</p>
                        </div>
                        {i < (data.reinforcementLoop.flywheel.stages?.length || 0) - 1 && (
                          <span className="text-purple-400 text-xl">→</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Practical Application */}
      {data.practicalApplication && (
        <div className="mb-4 bg-amber-500/10 rounded-xl overflow-hidden border border-amber-500/30">
          <button
            onClick={() => setPracticalExpanded(!practicalExpanded)}
            className="w-full p-5 text-left hover:bg-amber-500/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className={`transform transition-transform text-amber-400 text-lg ${practicalExpanded ? 'rotate-90' : ''}`}>▶</span>
              <span className="text-2xl">💼</span>
              <h4 className="text-amber-300 font-semibold text-lg">{data.practicalApplication.title}</h4>
            </div>
          </button>
          {practicalExpanded && (
            <div className="p-5 pt-0 border-t border-amber-500/30 space-y-3">
              {data.practicalApplication.guidance?.map((guide: any, i: number) => (
                <div key={i} className="bg-slate-700/50 rounded-lg p-3">
                  <span className="bg-amber-500/30 text-amber-200 px-2 py-1 rounded text-xs font-medium">{guide.role}</span>
                  <p className="text-gray-300 text-sm mt-2">{guide.relevance}</p>
                  <p className="text-amber-200 text-xs mt-1 italic">Example: "{guide.example}"</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Key Takeaway */}
      {data.keyTakeaway && (
        <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔑</span>
            <div>
              <span className="text-indigo-300 font-semibold text-sm">KEY TAKEAWAY</span>
              <p className="text-white mt-1">{data.keyTakeaway}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// PILLAR 7 - PITCH PRACTICE COMPONENTS
// =============================================================================

// HSDPA Framework Block
function PitchStructureBlock({ data }: { data: any }) {
  const [expandedElement, setExpandedElement] = useState<number | null>(null);

  const letterColors: Record<string, string> = {
    'H': 'bg-red-500',
    'S': 'bg-blue-500',
    'D': 'bg-purple-500',
    'P': 'bg-emerald-500',
    'A': 'bg-amber-500'
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border-2 border-orange-500/50">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">🎯</span>
        <h3 className="font-bold text-white text-2xl">{data.title}</h3>
      </div>
      <p className="text-orange-300 mb-6">{data.subtitle}</p>

      {/* HSDPA Visual */}
      <div className="flex justify-center gap-2 mb-6">
        {data.elements?.map((el: any, i: number) => (
          <div
            key={i}
            className={`${letterColors[el.letter]} w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-2xl cursor-pointer transform hover:scale-110 transition-transform`}
            onClick={() => setExpandedElement(expandedElement === i ? null : i)}
          >
            {el.letter}
          </div>
        ))}
      </div>

      {/* Elements Detail */}
      <div className="space-y-3">
        {data.elements?.map((el: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedElement(expandedElement === i ? null : i)}
              className="w-full p-4 text-left hover:bg-slate-700/70 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className={`${letterColors[el.letter]} w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold`}>
                  {el.letter}
                </span>
                <div className="flex-1">
                  <span className="text-white font-medium">{el.element}</span>
                  <span className="text-gray-400 text-sm ml-2">({el.duration})</span>
                </div>
                <span className={`transform transition-transform ${expandedElement === i ? 'rotate-90' : ''}`}>▶</span>
              </div>
              <p className="text-gray-400 text-sm mt-1 ml-11">{el.purpose}</p>
            </button>
            {expandedElement === i && (
              <div className="p-4 pt-0 border-t border-slate-600 ml-11 space-y-3">
                <div className="bg-emerald-500/10 rounded-lg p-3">
                  <span className="text-emerald-400 text-xs font-medium">EXAMPLE:</span>
                  <p className="text-emerald-200 text-sm mt-1 italic">"{el.example}"</p>
                </div>
                <div className="bg-red-500/10 rounded-lg p-3">
                  <span className="text-red-400 text-xs font-medium">COMMON MISTAKE:</span>
                  <p className="text-red-200 text-sm mt-1">{el.commonMistake}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {data.totalDuration && (
        <div className="mt-4 bg-orange-500/10 rounded-lg p-3 text-center">
          <p className="text-orange-300 text-sm">{data.totalDuration}</p>
        </div>
      )}
    </div>
  );
}

// What Changes vs Constant Block
function WhatChangesBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Constant */}
        {data.constant && (
          <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
            <h4 className="text-blue-300 font-medium mb-3 flex items-center gap-2">
              <span>🔒</span> {data.constant.title}
            </h4>
            <ul className="space-y-2">
              {data.constant.items?.map((item: string, i: number) => (
                <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Changes */}
        {data.changes && (
          <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/30">
            <h4 className="text-purple-300 font-medium mb-3 flex items-center gap-2">
              <span>🔄</span> {data.changes.title}
            </h4>
            <div className="space-y-2">
              {data.changes.items?.map((item: any, i: number) => (
                <div key={i} className="bg-slate-700/50 rounded p-2">
                  <span className="text-purple-300 font-medium text-sm">{item.element}:</span>
                  <p className="text-gray-400 text-xs mt-1">{item.adaptation}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Common Mistakes Block (Seven Deadly Sins)
function CommonMistakesBlock({ data }: { data: any }) {
  const [expandedSin, setExpandedSin] = useState<number | null>(null);

  return (
    <div className="bg-gradient-to-br from-red-900/20 to-slate-900 rounded-xl p-6 border border-red-500/30">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">⚠️</span>
        <h3 className="font-bold text-white text-xl">{data.title}</h3>
      </div>

      <div className="space-y-2">
        {data.mistakes?.map((mistake: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedSin(expandedSin === i ? null : i)}
              className="w-full p-3 text-left hover:bg-slate-700/70 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="bg-red-500/30 text-red-300 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                  <span className="text-red-300 font-medium">{mistake.sin}</span>
                </div>
                <span className={`transform transition-transform text-gray-400 ${expandedSin === i ? 'rotate-90' : ''}`}>▶</span>
              </div>
            </button>
            {expandedSin === i && (
              <div className="p-3 pt-0 border-t border-slate-600 space-y-2">
                <div className="bg-red-500/10 rounded p-2">
                  <span className="text-red-400 text-xs">THE PROBLEM:</span>
                  <p className="text-gray-300 text-sm mt-1">{mistake.description}</p>
                </div>
                <div className="bg-emerald-500/10 rounded p-2">
                  <span className="text-emerald-400 text-xs">THE FIX:</span>
                  <p className="text-emerald-200 text-sm mt-1">{mistake.fix}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Listening First Block (70/30 Rule)
function ListeningFirstBlock({ data }: { data: any }) {
  const [questionsExpanded, setQuestionsExpanded] = useState(false);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">👂</span>
        <h3 className="font-bold text-white text-xl">{data.title}</h3>
      </div>

      {/* 70/30 Visual */}
      <div className="flex gap-2 h-8 rounded-lg overflow-hidden mb-4">
        <div className="bg-blue-500 w-[70%] flex items-center justify-center text-white text-sm font-medium">
          70% Listen
        </div>
        <div className="bg-orange-500 w-[30%] flex items-center justify-center text-white text-sm font-medium">
          30% Talk
        </div>
      </div>

      <p className="text-gray-300 mb-4">{data.principle}</p>

      {/* Discovery Questions */}
      {data.discoveryQuestions && (
        <div className="bg-blue-500/10 rounded-lg overflow-hidden border border-blue-500/30">
          <button
            onClick={() => setQuestionsExpanded(!questionsExpanded)}
            className="w-full p-4 text-left hover:bg-blue-500/20 transition-colors"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-blue-300 font-medium">{data.discoveryQuestions.title}</h4>
              <span className={`transform transition-transform text-blue-400 ${questionsExpanded ? 'rotate-90' : ''}`}>▶</span>
            </div>
          </button>
          {questionsExpanded && (
            <div className="p-4 pt-0 border-t border-blue-500/30 space-y-2">
              {data.discoveryQuestions.questions?.map((q: any, i: number) => (
                <div key={i} className="bg-slate-700/50 rounded p-3">
                  <p className="text-white text-sm font-medium">"{q.question}"</p>
                  <p className="text-blue-300 text-xs mt-1">→ Reveals: {q.reveals}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {data.adaptation && (
        <div className="mt-4 bg-emerald-500/10 rounded-lg p-3">
          <p className="text-emerald-200 text-sm">{data.adaptation}</p>
        </div>
      )}
    </div>
  );
}

// Pitch Lengths Block
function PitchLengthsBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>

      <div className="grid md:grid-cols-2 gap-4">
        {data.lengths?.map((length: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-orange-500">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-white font-medium">{length.name}</h4>
              <span className="bg-orange-500/30 text-orange-300 px-2 py-1 rounded text-sm font-bold">{length.duration}</span>
            </div>
            <p className="text-gray-400 text-sm mb-2"><strong className="text-gray-300">When:</strong> {length.when}</p>
            <p className="text-gray-400 text-sm mb-2"><strong className="text-gray-300">Structure:</strong> {length.structure}</p>
            <p className="text-emerald-300 text-sm"><strong className="text-emerald-400">Goal:</strong> {length.goal}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Audience Profile Block
function AudienceProfileBlock({ data }: { data: any }) {
  const [expandedSegment, setExpandedSegment] = useState<number | null>(0);

  // Handle both 'segments' and 'investorTypes' data structures
  const segments = data.segments || data.investorTypes || [];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}

      <div className="space-y-3">
        {segments.map((seg: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedSegment(expandedSegment === i ? null : i)}
              className="w-full p-4 text-left hover:bg-slate-700/70 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">{seg.segment || seg.type}</span>
                <span className={`transform transition-transform ${expandedSegment === i ? 'rotate-90' : ''}`}>▶</span>
              </div>
            </button>
            {expandedSegment === i && (
              <div className="p-4 pt-0 border-t border-slate-600 space-y-3">
                {/* Characteristics */}
                {seg.characteristics && (
                  <div>
                    <span className="text-gray-500 text-xs">CHARACTERISTICS:</span>
                    <ul className="mt-1 space-y-1">
                      {seg.characteristics.map((c: string, j: number) => (
                        <li key={j} className="text-gray-300 text-sm flex items-start gap-2">
                          <span className="text-blue-400">•</span>{c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Pain Points */}
                {seg.painPoints && (
                  <div className="bg-red-500/10 rounded p-3">
                    <span className="text-red-400 text-xs">PAIN POINTS:</span>
                    <ul className="mt-1 space-y-1">
                      {seg.painPoints.map((p: string, j: number) => (
                        <li key={j} className="text-red-200 text-sm flex items-start gap-2">
                          <span className="text-red-400">⚠</span>{p}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* What they care about / Decision Factors */}
                {(seg.cares || seg.decisionFactors) && (
                  <div className="bg-emerald-500/10 rounded p-3">
                    <span className="text-emerald-400 text-xs">{seg.cares ? 'THEY CARE ABOUT:' : 'DECISION FACTORS:'}</span>
                    <ul className="mt-1 space-y-1">
                      {(seg.cares || seg.decisionFactors).map((c: string, j: number) => (
                        <li key={j} className="text-emerald-200 text-sm flex items-start gap-2">
                          <span className="text-emerald-400">✓</span>{c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Buying Process */}
                {seg.buyingProcess && (
                  <div className="bg-blue-500/10 rounded p-3">
                    <span className="text-blue-400 text-xs">BUYING PROCESS:</span>
                    <p className="text-blue-200 text-sm mt-1">{seg.buyingProcess}</p>
                  </div>
                )}

                {/* Evaluates (for investors) */}
                {seg.evaluates && (
                  <div className="bg-purple-500/10 rounded p-3">
                    <span className="text-purple-400 text-xs">THEY EVALUATE:</span>
                    <p className="text-purple-200 text-sm mt-1">{seg.evaluates}</p>
                  </div>
                )}

                {/* Sphere Relevance */}
                {seg.sphereRelevance && (
                  <div className="bg-orange-500/10 rounded p-3">
                    <span className="text-orange-400 text-xs">SPHERE RELEVANCE:</span>
                    <p className="text-orange-200 text-sm mt-1">{seg.sphereRelevance}</p>
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

// What to Pitch Block
function WhatToPitchBlock({ data }: { data: any }) {
  const [frameworkExpanded, setFrameworkExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-br from-purple-900/20 to-slate-900 rounded-xl p-6 border border-purple-500/30">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-purple-300 mb-4">{data.subtitle}</p>}

      {data.focus && (
        <div className="bg-purple-500/10 rounded-lg p-3 mb-4">
          <span className="text-purple-400 text-xs font-medium">FOCUS:</span>
          <p className="text-gray-300 text-sm mt-1">{data.focus}</p>
        </div>
      )}

      {data.positioning && (
        <div className="bg-slate-700/50 rounded-lg p-3 mb-4">
          <span className="text-gray-400 text-xs font-medium">POSITIONING:</span>
          <p className="text-gray-300 text-sm mt-1">{data.positioning}</p>
        </div>
      )}

      {/* Value Props */}
      {data.valueProps && (
        <div className="space-y-3 mb-4">
          <h4 className="text-white font-medium">Value Propositions:</h4>
          {data.valueProps.map((prop: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-3 border-l-4 border-emerald-500">
              <div className="flex items-center justify-between mb-2">
                <span className="text-emerald-300 font-medium">{prop.prop}</span>
                {prop.quantified && <span className="text-emerald-400 text-xs bg-emerald-500/20 px-2 py-1 rounded">{prop.quantified}</span>}
              </div>
              <p className="text-gray-300 text-sm">{prop.message}</p>
              <p className="text-gray-500 text-xs mt-1">Proof: {prop.proof}</p>
            </div>
          ))}
        </div>
      )}

      {/* Framework (for investors - dual product) */}
      {data.framework && (
        <div className="bg-slate-700/30 rounded-lg overflow-hidden">
          <button
            onClick={() => setFrameworkExpanded(!frameworkExpanded)}
            className="w-full p-4 text-left hover:bg-slate-700/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-white font-medium">The Dual Product Framework</span>
              <span className={`transform transition-transform ${frameworkExpanded ? 'rotate-90' : ''}`}>▶</span>
            </div>
          </button>
          {frameworkExpanded && (
            <div className="p-4 pt-0 border-t border-slate-600 space-y-3">
              {/* Today - SpherePay */}
              <div className="bg-blue-500/10 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold">TODAY</span>
                  <span className="text-blue-300 font-medium">{data.framework.today.product}</span>
                </div>
                <p className="text-gray-400 text-xs mb-2">{data.framework.today.status}</p>
                <p className="text-gray-300 text-sm mb-2">{data.framework.today.narrative}</p>
                <div className="flex flex-wrap gap-2">
                  {data.framework.today.metrics?.map((m: string, i: number) => (
                    <span key={i} className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs">{m}</span>
                  ))}
                </div>
              </div>

              {/* Tomorrow - SphereNet */}
              <div className="bg-purple-500/10 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-purple-500 text-white px-2 py-1 rounded text-xs font-bold">TOMORROW</span>
                  <span className="text-purple-300 font-medium">{data.framework.tomorrow.product}</span>
                </div>
                <p className="text-gray-400 text-xs mb-2">{data.framework.tomorrow.status}</p>
                <p className="text-gray-300 text-sm mb-2">{data.framework.tomorrow.narrative}</p>
                <div className="flex flex-wrap gap-2">
                  {data.framework.tomorrow.metrics?.map((m: string, i: number) => (
                    <span key={i} className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-xs">{m}</span>
                  ))}
                </div>
              </div>

              {/* Combined */}
              <div className="bg-emerald-500/10 rounded-lg p-3">
                <span className="text-emerald-400 text-xs font-medium">COMBINED NARRATIVE:</span>
                <p className="text-gray-300 text-sm mt-1">{data.framework.combined.narrative}</p>
                <p className="text-emerald-300 text-sm mt-2">{data.framework.combined.whyCompelling}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Partnership Models (for banks) */}
      {data.partnershipModels && (
        <div className="space-y-3">
          <h4 className="text-white font-medium">Partnership Models:</h4>
          {data.partnershipModels.map((model: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-3">
              <h5 className="text-purple-300 font-medium mb-2">{model.model}</h5>
              <p className="text-gray-300 text-sm mb-2">{model.description}</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-blue-500/10 rounded p-2">
                  <span className="text-blue-400">Bank Benefit:</span>
                  <p className="text-gray-300 mt-1">{model.bankBenefit}</p>
                </div>
                <div className="bg-emerald-500/10 rounded p-2">
                  <span className="text-emerald-400">Sphere Benefit:</span>
                  <p className="text-gray-300 mt-1">{model.sphereBenefit}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Key Messages (for crypto/sovereign) */}
      {data.keyMessages && (
        <div className="space-y-3">
          <h4 className="text-white font-medium">Key Messages:</h4>
          {data.keyMessages.map((msg: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-3 border-l-4 border-purple-500">
              <h5 className="text-purple-300 font-medium mb-1">{msg.message}</h5>
              <p className="text-gray-300 text-sm mb-2">{msg.detail}</p>
              <p className="text-gray-500 text-xs">Proof: {msg.proof}</p>
              {msg.sovereignBenefit && (
                <p className="text-emerald-300 text-xs mt-2">→ Sovereign Benefit: {msg.sovereignBenefit}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Hooks Block
function HooksBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">🎣</span>
        <h3 className="font-semibold text-white text-xl">{data.title}</h3>
      </div>

      <div className="space-y-4">
        {data.hooks?.map((hook: any, i: number) => (
          <div key={i} className="bg-gradient-to-r from-orange-500/10 to-slate-700/50 rounded-lg p-4 border-l-4 border-orange-500">
            <h4 className="text-orange-300 font-medium mb-2">{hook.hook}</h4>
            <div className="bg-slate-700/50 rounded p-3 mb-2">
              <p className="text-white text-sm italic">"{hook.script}"</p>
            </div>
            <p className="text-gray-400 text-xs"><strong className="text-gray-300">When to use:</strong> {hook.when}</p>
            {hook.why && <p className="text-emerald-300 text-xs mt-1">→ {hook.why}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

// Proof Points Block
function ProofPointsBlock({ data }: { data: any }) {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(0);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>

      <div className="space-y-3">
        {data.categories?.map((cat: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedCategory(expandedCategory === i ? null : i)}
              className="w-full p-4 text-left hover:bg-slate-700/70 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-emerald-300 font-medium">{cat.category}</span>
                <span className={`transform transition-transform ${expandedCategory === i ? 'rotate-90' : ''}`}>▶</span>
              </div>
            </button>
            {expandedCategory === i && (
              <div className="p-4 pt-0 border-t border-slate-600 space-y-2">
                <div className="flex flex-wrap gap-2 mb-2">
                  {cat.points?.map((point: string, j: number) => (
                    <span key={j} className="bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded text-sm">{point}</span>
                  ))}
                </div>
                <div className="bg-blue-500/10 rounded p-2">
                  <span className="text-blue-400 text-xs">HOW TO PRESENT:</span>
                  <p className="text-blue-200 text-sm mt-1">{cat.howToPresent}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Investor Metrics Block
function InvestorMetricsBlock({ data }: { data: any }) {
  const [expandedMetric, setExpandedMetric] = useState<number | null>(null);

  return (
    <div className="bg-gradient-to-br from-blue-900/20 to-slate-900 rounded-xl p-6 border border-blue-500/30">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">📊</span>
        <h3 className="font-semibold text-white text-xl">{data.title}</h3>
      </div>
      <p className="text-gray-400 text-sm mb-4">{data.introduction}</p>

      {/* Core Metrics */}
      <div className="space-y-3 mb-6">
        {data.coreMetrics?.map((metric: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedMetric(expandedMetric === i ? null : i)}
              className="w-full p-4 text-left hover:bg-slate-700/70 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-blue-300 font-medium">{metric.metric}</span>
                  <span className="bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded text-sm font-mono">{metric.sphereNumber}</span>
                </div>
                <span className={`transform transition-transform ${expandedMetric === i ? 'rotate-90' : ''}`}>▶</span>
              </div>
            </button>
            {expandedMetric === i && (
              <div className="p-4 pt-0 border-t border-slate-600 space-y-3">
                <div className="bg-slate-800/50 rounded p-3">
                  <p className="text-gray-400 text-xs font-medium mb-1">What it means:</p>
                  <p className="text-gray-300 text-sm">{metric.whatItMeans}</p>
                </div>
                <div className="bg-emerald-500/10 rounded p-3">
                  <p className="text-emerald-400 text-xs font-medium mb-1">How to present:</p>
                  <p className="text-emerald-200 text-sm">{metric.howToPresent}</p>
                </div>
                {metric.caveat && (
                  <div className="bg-amber-500/10 rounded p-2">
                    <p className="text-amber-300 text-xs">⚠️ {metric.caveat}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Metrics NOT to Lead With */}
      {data.metricsNotToLead && (
        <div className="bg-red-500/10 rounded-lg p-4 mb-4 border border-red-500/30">
          <p className="text-red-300 font-medium mb-2">❌ Metrics NOT to Lead With:</p>
          <div className="space-y-2">
            {data.metricsNotToLead.map((item: any, i: number) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-red-400 text-sm">•</span>
                <div>
                  <span className="text-red-200 text-sm font-medium">{item.metric}:</span>
                  <span className="text-gray-400 text-sm ml-1">{item.why}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Presentation Order */}
      {data.presentationOrder && (
        <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
          <p className="text-blue-300 font-medium mb-2">📋 Recommended Presentation Order:</p>
          <p className="text-blue-200 text-sm">{data.presentationOrder}</p>
        </div>
      )}
    </div>
  );
}

// Objections Block
function ObjectionsBlock({ data }: { data: any }) {
  const [expandedObjection, setExpandedObjection] = useState<number | null>(null);
  const [cbdcExpanded, setCbdcExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-br from-amber-900/20 to-slate-900 rounded-xl p-6 border border-amber-500/30">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">💬</span>
        <h3 className="font-semibold text-white text-xl">{data.title}</h3>
      </div>

      <div className="space-y-3">
        {data.objections?.map((obj: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedObjection(expandedObjection === i ? null : i)}
              className="w-full p-4 text-left hover:bg-slate-700/70 transition-colors"
            >
              <div className="flex items-start gap-3">
                <span className="text-amber-400 text-lg">❓</span>
                <div className="flex-1">
                  <p className="text-amber-200 font-medium">"{obj.objection}"</p>
                </div>
                <span className={`transform transition-transform ${expandedObjection === i ? 'rotate-90' : ''}`}>▶</span>
              </div>
            </button>
            {expandedObjection === i && (
              <div className="p-4 pt-0 border-t border-slate-600 space-y-3">
                <div className="bg-emerald-500/10 rounded-lg p-3">
                  <span className="text-emerald-400 text-xs font-medium">RESPONSE:</span>
                  <p className="text-gray-300 text-sm mt-2">{typeof obj.response === 'string' ? obj.response : JSON.stringify(obj.response)}</p>
                </div>
                {obj.key && (
                  <div className="bg-purple-500/10 rounded p-2">
                    <span className="text-purple-400 text-xs font-medium">KEY PRINCIPLE:</span>
                    <p className="text-purple-200 text-sm mt-1">{obj.key}</p>
                  </div>
                )}
                {obj.followUp && (
                  <div className="bg-blue-500/10 rounded p-2">
                    <span className="text-blue-400 text-xs font-medium">FOLLOW UP:</span>
                    <p className="text-blue-200 text-sm mt-1">{obj.followUp}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CBDC Complementarity Deep Dive - for Sovereign pitch section */}
      {data.cbdcComplementarity && (
        <div className="mt-6 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl overflow-hidden border-2 border-blue-500/40">
          <button
            onClick={() => setCbdcExpanded(!cbdcExpanded)}
            className="w-full px-5 py-4 flex items-center justify-between hover:bg-blue-500/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">DEEP DIVE</span>
              <span className="text-white font-medium">🏛️ {data.cbdcComplementarity.title}</span>
            </div>
            <span className={`text-white transform transition-transform ${cbdcExpanded ? 'rotate-180' : ''}`}>▼</span>
          </button>

          {cbdcExpanded && (
            <div className="p-5 border-t border-blue-500/30 space-y-5">
              <p className="text-gray-300">{data.cbdcComplementarity.introduction}</p>

              {/* Core Framework */}
              {data.cbdcComplementarity.coreFramework && (
                <div className="bg-slate-800/70 rounded-lg p-4 space-y-3">
                  <h5 className="text-blue-300 font-semibold">The Core Framework</h5>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-blue-500/10 rounded-lg p-3">
                      <p className="text-blue-400 text-xs font-medium mb-1">Central Bank Role:</p>
                      <p className="text-gray-300 text-sm">{data.cbdcComplementarity.coreFramework.centralBankRole}</p>
                    </div>
                    <div className="bg-purple-500/10 rounded-lg p-3">
                      <p className="text-purple-400 text-xs font-medium mb-1">SphereNet Role:</p>
                      <p className="text-gray-300 text-sm">{data.cbdcComplementarity.coreFramework.sphereNetRole}</p>
                    </div>
                  </div>
                  <div className="bg-emerald-500/10 rounded-lg p-3">
                    <p className="text-emerald-400 text-xs font-medium mb-1">💡 Analogy:</p>
                    <p className="text-emerald-200 text-sm">{data.cbdcComplementarity.coreFramework.analogy}</p>
                  </div>
                </div>
              )}

              {/* Complementary Layers */}
              {data.cbdcComplementarity.complementaryLayers && (
                <div className="space-y-3">
                  <h5 className="text-blue-300 font-semibold">Complementary Layers</h5>
                  {data.cbdcComplementarity.complementaryLayers.map((layer: any, i: number) => (
                    <div key={i} className="bg-slate-800/50 rounded-lg p-4 border-l-4 border-blue-500/50">
                      <p className="text-white font-medium mb-2">{layer.layer}</p>
                      <div className="grid md:grid-cols-2 gap-2 mb-2">
                        <div className="bg-slate-700/50 rounded p-2">
                          <p className="text-blue-300 text-xs font-medium">CBDC Handles:</p>
                          <p className="text-gray-400 text-sm">{layer.cbdcHandles}</p>
                        </div>
                        <div className="bg-purple-500/10 rounded p-2">
                          <p className="text-purple-300 text-xs font-medium">SphereNet Handles:</p>
                          <p className="text-gray-300 text-sm">{layer.sphereNetHandles}</p>
                        </div>
                      </div>
                      <p className="text-cyan-300 text-xs bg-cyan-500/10 rounded p-2">📌 Example: {layer.example}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* What To Say */}
              {data.cbdcComplementarity.whatToSay && (
                <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/30">
                  <h5 className="text-emerald-300 font-semibold mb-3">📝 What to Say in the Meeting</h5>
                  <div className="space-y-3">
                    <div className="bg-slate-800/50 rounded p-3">
                      <p className="text-emerald-400 text-xs font-medium mb-1">Opening:</p>
                      <p className="text-gray-300 text-sm italic">"{data.cbdcComplementarity.whatToSay.opening}"</p>
                    </div>
                    <div className="bg-slate-800/50 rounded p-3">
                      <p className="text-emerald-400 text-xs font-medium mb-1">Positioning:</p>
                      <p className="text-gray-300 text-sm italic">"{data.cbdcComplementarity.whatToSay.positioning}"</p>
                    </div>
                    <div className="bg-slate-800/50 rounded p-3">
                      <p className="text-emerald-400 text-xs font-medium mb-1">Concrete Example:</p>
                      <p className="text-gray-300 text-sm italic">"{data.cbdcComplementarity.whatToSay.concrete}"</p>
                    </div>
                    <div className="bg-slate-800/50 rounded p-3">
                      <p className="text-emerald-400 text-xs font-medium mb-1">Close with Offer:</p>
                      <p className="text-gray-300 text-sm italic">"{data.cbdcComplementarity.whatToSay.offer}"</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Key Insight */}
              {data.cbdcComplementarity.keyInsight && (
                <div className="bg-amber-500/10 rounded-lg p-3 border border-amber-500/30">
                  <p className="text-amber-200 text-sm">💡 <strong>Key Insight:</strong> {data.cbdcComplementarity.keyInsight}</p>
                </div>
              )}

              {/* Protocol-Level Access */}
              {data.cbdcComplementarity.protocolLevelAccess && (
                <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg p-4 border border-purple-500/30">
                  <h5 className="text-purple-300 font-semibold mb-2">{data.cbdcComplementarity.protocolLevelAccess.title}</h5>
                  <p className="text-gray-400 text-sm mb-4">{data.cbdcComplementarity.protocolLevelAccess.explanation}</p>

                  <div className="space-y-3">
                    {data.cbdcComplementarity.protocolLevelAccess.capabilities?.map((cap: any, i: number) => (
                      <div key={i} className="bg-slate-800/50 rounded-lg p-3">
                        <p className="text-white font-medium text-sm mb-2">{cap.capability}</p>
                        <div className="grid md:grid-cols-2 gap-2 text-xs">
                          <div className="bg-red-500/10 rounded p-2">
                            <p className="text-red-300 font-medium mb-1">Traditional:</p>
                            <p className="text-gray-400">{cap.traditional}</p>
                          </div>
                          <div className="bg-emerald-500/10 rounded p-2">
                            <p className="text-emerald-300 font-medium mb-1">SphereNet:</p>
                            <p className="text-gray-300">{cap.sphereNet}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {data.cbdcComplementarity.protocolLevelAccess.sovereignBenefit && (
                    <p className="text-purple-200 text-sm mt-3 bg-purple-500/20 rounded p-2">
                      🏛️ {data.cbdcComplementarity.protocolLevelAccess.sovereignBenefit}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Pitch Scripts Block
function PitchScriptsBlock({ data }: { data: any }) {
  const [activeTab, setActiveTab] = useState<'elevator' | 'twoMinute' | 'full'>('elevator');

  return (
    <div className="bg-gradient-to-br from-emerald-900/20 to-slate-900 rounded-xl p-6 border border-emerald-500/30">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">📝</span>
        <h3 className="font-semibold text-white text-xl">{data.title}</h3>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {data.elevator && (
          <button
            onClick={() => setActiveTab('elevator')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'elevator' ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-gray-300 hover:bg-slate-600'}`}
          >
            30-Second
          </button>
        )}
        {data.twoMinute && (
          <button
            onClick={() => setActiveTab('twoMinute')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'twoMinute' ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-gray-300 hover:bg-slate-600'}`}
          >
            2-Minute
          </button>
        )}
        {data.fullOutline && (
          <button
            onClick={() => setActiveTab('full')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'full' ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-gray-300 hover:bg-slate-600'}`}
          >
            Full Outline
          </button>
        )}
      </div>

      {/* Content */}
      {activeTab === 'elevator' && data.elevator && (
        <div className="bg-slate-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-emerald-300 font-medium">{data.elevator.name}</h4>
            <span className="bg-emerald-500/30 text-emerald-200 px-2 py-1 rounded text-xs">30 seconds</span>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 mb-3">
            <p className="text-white text-sm leading-relaxed whitespace-pre-line">{data.elevator.script}</p>
          </div>
          {data.elevator.notes && (
            <p className="text-gray-400 text-xs italic">💡 {data.elevator.notes}</p>
          )}
        </div>
      )}

      {activeTab === 'twoMinute' && data.twoMinute && (
        <div className="bg-slate-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-emerald-300 font-medium">{data.twoMinute.name}</h4>
            <span className="bg-emerald-500/30 text-emerald-200 px-2 py-1 rounded text-xs">2 minutes</span>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 mb-3">
            <p className="text-white text-sm leading-relaxed whitespace-pre-line">{data.twoMinute.script}</p>
          </div>
          {data.twoMinute.notes && (
            <p className="text-gray-400 text-xs italic">💡 {data.twoMinute.notes}</p>
          )}
        </div>
      )}

      {activeTab === 'full' && data.fullOutline && (
        <div className="bg-slate-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-emerald-300 font-medium">{data.fullOutline.name}</h4>
            <span className="bg-emerald-500/30 text-emerald-200 px-2 py-1 rounded text-xs">15 minutes</span>
          </div>
          <div className="space-y-2">
            {data.fullOutline.sections?.map((section: any, i: number) => (
              <div key={i} className="flex items-center gap-3 bg-slate-800 rounded p-3">
                <span className="bg-emerald-500/30 text-emerald-200 px-2 py-1 rounded text-xs min-w-[60px] text-center">{section.duration}</span>
                <span className="text-white font-medium text-sm">{section.section}</span>
                <span className="text-gray-400 text-xs flex-1">{section.content}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Discovery Questions (if present) */}
      {data.discoveryQuestions && (
        <div className="mt-4 bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
          <h4 className="text-blue-300 font-medium mb-3">{data.discoveryQuestions.title}</h4>
          <ul className="space-y-2">
            {data.discoveryQuestions.questions?.map((q: string, i: number) => (
              <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                <span className="text-blue-400">{i + 1}.</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Practice Scenarios Block
function PracticeScenariosBlock({ data }: { data: any }) {
  const [expandedScenario, setExpandedScenario] = useState<number | null>(0);

  return (
    <div className="bg-gradient-to-br from-blue-900/20 to-slate-900 rounded-xl p-6 border border-blue-500/30">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">🎭</span>
        <h3 className="font-semibold text-white text-xl">{data.title}</h3>
      </div>

      <div className="space-y-3">
        {data.scenarios?.map((scenario: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedScenario(expandedScenario === i ? null : i)}
              className="w-full p-4 text-left hover:bg-slate-700/70 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-blue-300 font-medium">{scenario.scenario}</span>
                <span className={`transform transition-transform ${expandedScenario === i ? 'rotate-90' : ''}`}>▶</span>
              </div>
            </button>
            {expandedScenario === i && (
              <div className="p-4 pt-0 border-t border-slate-600 space-y-3">
                <div className="bg-slate-800 rounded-lg p-3">
                  <span className="text-gray-400 text-xs">SETUP:</span>
                  <p className="text-gray-300 text-sm mt-1">{scenario.setup}</p>
                </div>
                <div className="bg-amber-500/10 rounded-lg p-3">
                  <span className="text-amber-400 text-xs">CHALLENGE:</span>
                  <p className="text-amber-200 text-sm mt-1">{scenario.challenge}</p>
                </div>
                <div className="bg-emerald-500/10 rounded-lg p-3">
                  <span className="text-emerald-400 text-xs">SUCCESS CRITERIA:</span>
                  <ul className="mt-2 space-y-1">
                    {scenario.successCriteria?.map((criteria: string, j: number) => (
                      <li key={j} className="text-emerald-200 text-sm flex items-start gap-2">
                        <span className="text-emerald-400">✓</span>{criteria}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Relationship Building Block (for champion building / sovereign relationships)
function RelationshipBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.principle && <p className="text-gray-300 mb-4">{data.principle}</p>}

      <div className="space-y-3">
        {(data.tactics || data.principles)?.map((item: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-purple-500">
            <h4 className="text-purple-300 font-medium mb-2">{item.tactic || item.principle}</h4>
            <p className="text-gray-300 text-sm mb-2">{item.description}</p>
            <div className="bg-emerald-500/10 rounded p-2">
              <span className="text-emerald-400 text-xs">HOW TO:</span>
              <p className="text-emerald-200 text-sm mt-1">{item.howTo || item.tactic}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Section 5.3 Performance Metrics Components
function ExpandedMetricsBlock({ data }: { data: any }) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}

      <div className="space-y-3">
        {data.items?.map((item: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              className="w-full p-4 text-left hover:bg-slate-700/70 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`transform transition-transform ${expanded === i ? 'rotate-90' : ''}`}>▶</span>
                  <span className="text-white font-medium">{item.metric}</span>
                </div>
                <span className="text-emerald-400 font-bold text-lg">{item.value}</span>
              </div>
              <p className="text-gray-500 text-xs mt-1 ml-6">Click to see how to use this metric</p>
            </button>
            {expanded === i && (
              <div className="p-4 pt-0 border-t border-slate-600 space-y-3">
                <div>
                  <span className="text-gray-500 text-xs">What it means:</span>
                  <p className="text-gray-300 text-sm">{item.whatItMeans}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-xs">Why it matters:</span>
                  <p className="text-blue-300 text-sm">{item.whyItMatters}</p>
                </div>
                <div className="bg-purple-500/10 rounded p-3">
                  <span className="text-purple-400 text-xs font-medium">How to use it:</span>
                  <p className="text-purple-300 text-sm mt-1">{item.howToUseIt}</p>
                </div>
                {item.context && (
                  <p className="text-gray-400 text-xs italic border-t border-slate-600 pt-2">{item.context}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function WhyMetricsMatterBlock({ data }: { data: any }) {
  return (
    <div className="bg-blue-500/10 rounded-xl p-6 border border-blue-500/30">
      <h3 className="font-semibold text-blue-300 mb-4">{data.title}</h3>
      <div className="space-y-4">
        {data.points?.map((point: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">{point.point}</h4>
            <p className="text-gray-400 text-sm">{point.context}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MetricsInContextBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}

      <div className="space-y-4">
        {data.comparisons?.map((comp: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4">
            <h4 className="text-white font-medium mb-3">{comp.comparison}</h4>
            <div className="grid md:grid-cols-3 gap-3 text-sm mb-3">
              <div className="bg-emerald-500/10 rounded p-2">
                <span className="text-gray-500 text-xs">Sphere:</span>
                <p className="text-emerald-300 font-medium">{comp.sphere}</p>
              </div>
              <div className="bg-red-500/10 rounded p-2">
                <span className="text-gray-500 text-xs">Traditional:</span>
                <p className="text-red-300">{comp.traditional}</p>
              </div>
              <div className="bg-purple-500/10 rounded p-2">
                <span className="text-gray-500 text-xs">Improvement:</span>
                <p className="text-purple-300 font-medium">{comp.improvement}</p>
              </div>
            </div>
            <div className="bg-blue-500/10 rounded p-2">
              <span className="text-blue-400 text-xs">💬 Talking point:</span>
              <p className="text-blue-300 text-sm italic">"{comp.talkingPoint}"</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MetricsBySituationBlock({ data }: { data: any }) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}

      <div className="space-y-3">
        {data.situations?.map((sit: any, i: number) => (
          <div key={i} className="bg-purple-500/10 rounded-lg overflow-hidden border border-purple-500/30">
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              className="w-full p-4 text-left hover:bg-purple-500/20 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className={`transform transition-transform text-purple-400 ${expanded === i ? 'rotate-90' : ''}`}>▶</span>
                <h4 className="text-purple-300 font-medium">{sit.situation}</h4>
              </div>
              <p className="text-gray-500 text-xs mt-1 ml-5">Click to see recommended approach</p>
            </button>
            {expanded === i && (
              <div className="p-4 pt-0 border-t border-purple-500/30 space-y-3">
                <div>
                  <span className="text-gray-500 text-xs">Lead with:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {sit.leadWith?.map((metric: string, j: number) => (
                      <span key={j} className="bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded text-xs">{metric}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-gray-500 text-xs">Why:</span>
                  <p className="text-gray-300 text-sm">{sit.why}</p>
                </div>
                {sit.example && (
                  <div className="bg-blue-500/10 rounded p-2">
                    <span className="text-blue-400 text-xs">Example:</span>
                    <p className="text-blue-300 text-sm italic">"{sit.example}"</p>
                  </div>
                )}
                {sit.avoid && (
                  <div className="bg-red-500/10 rounded p-2">
                    <span className="text-red-400 text-xs">Avoid:</span>
                    <p className="text-red-300 text-sm">{sit.avoid}</p>
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

function MetricsPushbackBlock({ data }: { data: any }) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}

      <div className="space-y-3">
        {data.objections?.map((obj: any, i: number) => (
          <div key={i} className="bg-amber-500/10 rounded-lg overflow-hidden border border-amber-500/30">
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              className="w-full p-4 text-left hover:bg-amber-500/20 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className={`transform transition-transform text-amber-400 ${expanded === i ? 'rotate-90' : ''}`}>▶</span>
                <h4 className="text-amber-300 font-medium">"{obj.objection}"</h4>
              </div>
              <p className="text-gray-500 text-xs mt-1 ml-5">Click to see response</p>
            </button>
            {expanded === i && (
              <div className="p-4 pt-0 border-t border-amber-500/30 space-y-3">
                <div>
                  <span className="text-gray-500 text-xs">Response:</span>
                  <p className="text-gray-300 text-sm">{obj.response}</p>
                </div>
                <div className="bg-emerald-500/10 rounded p-2">
                  <span className="text-emerald-400 text-xs">💡 Principle:</span>
                  <p className="text-emerald-300 text-sm">{obj.principle}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function MetricsAntiPatternsBlock({ data }: { data: any }) {
  return (
    <div className="bg-red-500/10 rounded-xl p-6 border border-red-500/30">
      <h3 className="font-semibold text-red-300 mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}

      <div className="space-y-4">
        {data.antiPatterns?.map((ap: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-red-400">❌</span>
              <h4 className="text-white font-medium">{ap.antiPattern}</h4>
            </div>
            <p className="text-gray-400 text-sm mb-2">{ap.description}</p>
            <div className="grid md:grid-cols-2 gap-2 text-sm">
              <div className="bg-red-500/10 rounded p-2">
                <span className="text-red-400 text-xs">Why it fails:</span>
                <p className="text-red-300 text-xs">{ap.whyItFails}</p>
              </div>
              <div className="bg-emerald-500/10 rounded p-2">
                <span className="text-emerald-400 text-xs">Instead:</span>
                <p className="text-emerald-300 text-xs">{ap.instead}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FailureModesBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}

      <div className="space-y-4">
        {data.scenarios?.map((scenario: any, i: number) => (
          <div key={i} className="bg-red-500/20 rounded-lg p-4">
            <h4 className="text-red-300 font-medium mb-3">{scenario.failure}</h4>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-500 text-xs mb-1">Detection:</p>
                <p className="text-gray-300">{scenario.detection}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">Response:</p>
                <p className="text-emerald-300">{scenario.response}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">Customer Impact:</p>
                <p className="text-amber-300">{scenario.customerImpact}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">Prevention:</p>
                <p className="text-blue-300">{scenario.prevention}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ApiOverviewBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}

      {/* Design section */}
      {data.design && (
        <div className="bg-blue-500/10 rounded-lg p-4 mb-4">
          <h4 className="text-blue-300 font-medium mb-2">API Design</h4>
          <div className="grid md:grid-cols-2 gap-2 text-sm">
            {Object.entries(data.design).map(([key, value]: [string, any]) => (
              <div key={key}>
                <span className="text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>{' '}
                <span className="text-gray-300">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Endpoints */}
      {data.coreEndpoints && (
        <div className="space-y-3">
          <h4 className="text-white font-medium">Core Endpoints</h4>
          {data.coreEndpoints.map((endpoint: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <code className="text-blue-300 text-sm font-mono">{endpoint.endpoint}</code>
              <p className="text-gray-400 text-sm mt-2">{endpoint.function}</p>
              {endpoint.returns && (
                <p className="text-emerald-300 text-xs mt-1">→ Returns: {endpoint.returns}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Webhooks */}
      {data.webhooks && (
        <div className="mt-4 space-y-3">
          <h4 className="text-white font-medium">Webhooks</h4>
          {data.webhooks.map((webhook: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-3">
              <code className="text-amber-300 text-sm">{webhook.event}</code>
              <p className="text-gray-400 text-xs mt-1">{webhook.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Best Practices */}
      {data.bestPractices && (
        <div className="mt-4 bg-emerald-500/10 rounded-lg p-4">
          <h4 className="text-emerald-300 font-medium mb-2">Best Practices</h4>
          <ul className="space-y-1">
            {data.bestPractices.map((practice: string, i: number) => (
              <li key={i} className="text-gray-300 text-sm flex items-center gap-2">
                <span className="text-emerald-400">✓</span> {practice}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function SystemIntegrationBlock({ data }: { data: any }) {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">🔌 {data.title}</h3>
      <p className="text-gray-500 text-sm mb-4">Click any system to see integration details</p>

      <div className="space-y-3">
        {data.systems?.map((system: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden border border-slate-600">
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              className="w-full p-4 text-left hover:bg-slate-700 transition-colors flex items-center justify-between"
            >
              <h4 className="text-white font-medium">{system.system}</h4>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-xs hidden sm:block">{expanded === i ? 'Collapse' : 'Expand'}</span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expanded === i ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {expanded === i && (
              <div className="p-4 pt-0 border-t border-slate-600 space-y-3">
                {/* Common Requirements */}
                {system.commonRequirements && (
                  <div>
                    <p className="text-gray-400 text-xs font-medium mb-1">Common Requirements:</p>
                    <ul className="space-y-1">
                      {system.commonRequirements.map((req: string, j: number) => (
                        <li key={j} className="text-gray-300 text-sm flex items-center gap-2">
                          <span className="text-blue-400">•</span> {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Integration Approach */}
                {system.integrationApproach && (
                  <div className="bg-blue-500/10 rounded p-3 border-l-4 border-blue-500">
                    <p className="text-blue-300 text-sm"><span className="font-medium">Approach:</span> {system.integrationApproach}</p>
                  </div>
                )}

                {/* Sphere Capabilities */}
                {system.sphereCapabilities && (
                  <div>
                    <p className="text-emerald-300 text-xs font-medium mb-1">✅ Sphere Capabilities:</p>
                    <div className="flex flex-wrap gap-2">
                      {system.sphereCapabilities.map((cap: string, j: number) => (
                        <span key={j} className="bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded text-xs">{cap}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Considerations */}
                {system.considerations && (
                  <div className="bg-amber-500/10 rounded p-2">
                    <p className="text-amber-300 text-xs">⚠️ {system.considerations}</p>
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

function DataFlowsBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">📊 {data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}

      {/* Data Requirements */}
      {data.dataRequirements && (
        <div className="space-y-4 mb-4">
          {data.dataRequirements.map((req: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-medium">{req.data}</h4>
                <span className={`px-2 py-1 rounded text-xs ${
                  req.direction.includes('→ Sphere') ? 'bg-blue-500/20 text-blue-300' : 'bg-emerald-500/20 text-emerald-300'
                }`}>{req.direction}</span>
              </div>
              <p className="text-gray-400 text-sm mb-2">Format: {req.format}</p>
              {req.requiredFields && (
                <div className="mb-2">
                  <p className="text-gray-500 text-xs mb-1">Required Fields:</p>
                  <div className="flex flex-wrap gap-1">
                    {req.requiredFields.map((field: string, j: number) => (
                      <span key={j} className="bg-slate-600 text-gray-300 px-2 py-0.5 rounded text-xs">{field}</span>
                    ))}
                  </div>
                </div>
              )}
              {req.content && (
                <div className="mb-2">
                  <p className="text-gray-500 text-xs mb-1">Content:</p>
                  <div className="flex flex-wrap gap-1">
                    {req.content.map((item: string, j: number) => (
                      <span key={j} className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded text-xs">{item}</span>
                    ))}
                  </div>
                </div>
              )}
              {req.keyStatuses && (
                <div className="mb-2">
                  <p className="text-gray-500 text-xs mb-1">Key Statuses:</p>
                  <div className="flex flex-wrap gap-1">
                    {req.keyStatuses.map((status: string, j: number) => (
                      <span key={j} className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-xs">{status}</span>
                    ))}
                  </div>
                </div>
              )}
              {req.validation && <p className="text-blue-300 text-xs mt-2">Validation: {req.validation}</p>}
              {req.timing && <p className="text-gray-500 text-xs mt-1">Timing: {req.timing}</p>}
              {req.frequency && <p className="text-gray-500 text-xs mt-1">Frequency: {req.frequency}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Best Practices */}
      {data.reconciliationBestPractices && (
        <div className="bg-emerald-500/10 rounded-lg p-4">
          <h4 className="text-emerald-300 font-medium mb-2">✅ Reconciliation Best Practices</h4>
          <ul className="space-y-1">
            {data.reconciliationBestPractices.map((practice: string, i: number) => (
              <li key={i} className="text-gray-300 text-sm flex items-center gap-2">
                <span className="text-emerald-400">✓</span> {practice}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function DiscoveryQuestionsBlock({ data }: { data: any }) {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">💬 {data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}

      <div className="space-y-3">
        {data.questions?.map((q: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden border border-slate-600">
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              className="w-full p-4 text-left hover:bg-slate-700 transition-colors flex items-center justify-between"
            >
              <p className="text-white font-medium">"{q.question}"</p>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-gray-500 text-xs hidden sm:block">{expanded === i ? 'Collapse' : 'Expand'}</span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expanded === i ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {expanded === i && (
              <div className="p-4 pt-0 border-t border-slate-600 space-y-2">
                {q.whyAsk && (
                  <div className="bg-blue-500/10 rounded p-2">
                    <p className="text-blue-300 text-sm"><span className="font-medium">Why ask:</span> {q.whyAsk}</p>
                  </div>
                )}
                {q.goodAnswer && (
                  <div className="bg-emerald-500/10 rounded p-2">
                    <p className="text-emerald-300 text-sm"><span className="font-medium">✅ Good answer:</span> {q.goodAnswer}</p>
                  </div>
                )}
                {q.redFlag && (
                  <div className="bg-red-500/10 rounded p-2">
                    <p className="text-red-300 text-sm"><span className="font-medium">🚩 Red flag:</span> {q.redFlag}</p>
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

function SmartGenericBlock({ propKey, data }: { propKey: string; data: any }) {
  // Format the key as a title
  const title = propKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

  // Try to intelligently render based on data structure
  const hasItems = data.items && Array.isArray(data.items);
  const hasPoints = data.points && Array.isArray(data.points);
  const hasSteps = data.steps && Array.isArray(data.steps);
  const hasScenarios = data.scenarios && Array.isArray(data.scenarios);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4">{data.title || title}</h3>

      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}
      {data.description && <p className="text-gray-300 mb-4">{data.description}</p>}
      {data.overview && <p className="text-gray-300 mb-4">{data.overview}</p>}

      {hasItems && (
        <div className="space-y-3">
          {data.items.map((item: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              {typeof item === 'string' ? (
                <p className="text-gray-300">• {item}</p>
              ) : (
                <>
                  <h4 className="text-white font-medium mb-1">{item.name || item.title || item.item || item.term}</h4>
                  <p className="text-gray-400 text-sm">{item.description || item.definition || item.detail}</p>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {hasPoints && (
        <ul className="space-y-2">
          {data.points.map((p: any, i: number) => (
            <li key={i} className="text-gray-300 flex items-start gap-2">
              <span className="text-blue-400">•</span>
              {typeof p === 'string' ? p : p.point || p.description}
            </li>
          ))}
        </ul>
      )}

      {hasSteps && (
        <div className="space-y-3">
          {data.steps.map((step: any, i: number) => (
            <div key={i} className="flex items-start gap-3">
              <span className="bg-blue-500 text-white text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{i + 1}</span>
              <div>
                <p className="text-white font-medium">{typeof step === 'string' ? step : step.step || step.name}</p>
                {step.description && <p className="text-gray-400 text-sm">{step.description}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {hasScenarios && (
        <div className="space-y-3">
          {data.scenarios.map((s: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <h4 className="text-amber-300 font-medium mb-2">{s.scenario || s.name || s.title}</h4>
              <p className="text-gray-400 text-sm">{s.description || s.detail}</p>
            </div>
          ))}
        </div>
      )}

      {data.keyInsight && (
        <div className="bg-purple-500/10 rounded p-3 mt-4">
          <p className="text-purple-300 text-sm">💡 {data.keyInsight}</p>
        </div>
      )}

      {/* Fallback for completely unknown structures */}
      {!hasItems && !hasPoints && !hasSteps && !hasScenarios && !data.subtitle && !data.description && !data.overview && (
        <div className="text-gray-400 text-sm">
          {Object.entries(data).filter(([k]) => k !== 'title').map(([key, val]) => (
            <div key={key} className="mb-2">
              <span className="text-gray-500">{key}: </span>
              <span>{typeof val === 'string' ? val : JSON.stringify(val)}</span>
            </div>
          ))}
        </div>
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
            {term.keyProtections && (
              <div className="mt-3 bg-emerald-500/10 rounded-lg p-3">
                <p className="text-emerald-400 text-xs font-semibold uppercase mb-2">Key Protections</p>
                <ul className="space-y-1">
                  {term.keyProtections.map((protection: string, j: number) => (
                    <li key={j} className="text-gray-300 text-sm flex items-start gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span>{protection}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {term.requirements && (
              <div className="mt-3 bg-blue-500/10 rounded-lg p-3">
                <p className="text-blue-400 text-xs font-semibold uppercase mb-2">Requirements</p>
                <ul className="space-y-1">
                  {term.requirements.map((req: string, j: number) => (
                    <li key={j} className="text-gray-300 text-sm flex items-start gap-2">
                      <span className="text-blue-400">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {term.sphereContext && (
              <div className="mt-3 bg-purple-500/10 rounded-lg p-3">
                <p className="text-purple-400 text-xs font-semibold uppercase mb-1">Sphere Context</p>
                <p className="text-gray-300 text-sm">{term.sphereContext}</p>
              </div>
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
        <div className="bg-emerald-500/10 rounded-lg p-4">
          <p className="text-emerald-300 font-semibold mb-2">✅ What It Means</p>
          <ul className="text-gray-300 space-y-1 text-sm">
            {data.whatItMeans?.map((item: string, i: number) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
        </div>
        
        <div className="bg-red-500/20 rounded-lg p-4">
          <p className="text-red-300 font-semibold mb-2">❌ What It Does NOT Mean</p>
          <ul className="text-gray-300 space-y-1 text-sm">
            {data.whatItDoesNOTMean?.map((item: string, i: number) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>
      
      {data.analogy && (
        <div className="bg-purple-500/10 rounded-lg p-4">
          <p className="text-purple-300 italic">{data.analogy}</p>
        </div>
      )}
    </div>
  );
}

function DangerZoneBlock({ data }: { data: any }) {
  return (
    <div className="bg-red-500/20 rounded-xl p-6">
      <h3 className="font-semibold text-red-300 mb-4 text-xl">⚠️ {data.title}</h3>
      <div className="bg-red-500/20 rounded-lg p-4 mb-4">
        <p className="text-white font-semibold text-lg">"{data.statement}"</p>
        {data.whyDangerous && <p className="text-red-200 mt-2">{data.whyDangerous}</p>}
      </div>
      
      {data.mythVsReality && (
        <div className="space-y-4 mb-4">
          {data.mythVsReality.map((item: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <p className="text-red-300 text-sm">❌ Myth: {item.myth}</p>
              <p className="text-emerald-300 text-sm">✅ Reality: {item.truth}</p>
            </div>
          ))}
        </div>
      )}
      
      {data.whatCanStillGoWrong?.scenarios && (
        <div className="mt-6">
          <h4 className="text-white font-semibold mb-3">{data.whatCanStillGoWrong.title}</h4>
          <div className="space-y-4">
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
        <div className="bg-amber-500/10 rounded-lg p-4 mb-4">
          <p className="text-amber-300 font-semibold mb-2">💡 Best Practice</p>
          <p className="text-gray-300 text-sm">{data.bestPractice}</p>
        </div>
      )}
      
      {data.sphereAdvantage && (
        <div className="bg-emerald-500/10 rounded-lg p-4">
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
        <div className="bg-blue-500/10 rounded-lg p-4 mt-4">
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
        <div className="bg-blue-500/10 rounded-lg p-4">
          <h4 className="text-blue-300 font-semibold mb-3">{data.technicalReality.title}</h4>
          <ul className="text-gray-300 space-y-2 text-sm">
            {data.technicalReality.points?.map((point: string, i: number) => (
              <li key={i}>• {point}</li>
            ))}
          </ul>
        </div>
        
        <div className="bg-amber-500/10 rounded-lg p-4">
          <h4 className="text-amber-300 font-semibold mb-3">{data.legalReality.title}</h4>
          <ul className="text-gray-300 space-y-2 text-sm">
            {data.legalReality.points?.map((point: string, i: number) => (
              <li key={i}>• {point}</li>
            ))}
          </ul>
        </div>
      </div>
      
      {data.contrast && (
        <div className="bg-purple-500/10 rounded-lg p-4">
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
        <div className="mb-8">
          <h4 className="text-white font-semibold mb-4">Key Factors</h4>
          <div className="space-y-4">
            {data.factors.map((factor: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-4">
                <h5 className="text-blue-300 font-semibold mb-2">{factor.factor}</h5>
                <p className="text-gray-300 text-sm mb-3">{factor.explanation}</p>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
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
        <div className="mb-8">
          <h4 className="text-white font-semibold mb-4">{data.typicalCorridors.title}</h4>
          <div className="space-y-4">
            {data.typicalCorridors.examples.map((corridor: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h5 className="text-emerald-300 font-semibold">{corridor.corridor}</h5>
                  <span className="text-xs bg-slate-600 px-2 py-1 rounded">{corridor.hops} hops</span>
                </div>
                <p className="text-gray-300 text-sm mb-2">{corridor.chain}</p>
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
            
            <div className="bg-blue-500/10 rounded p-3">
              <p className="text-blue-200 text-sm"><span className="font-semibold">Example:</span> {layer.example}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Why It Works */}
      {data.whyItWorks && (
        <div className="mb-6">
          <h4 className="text-white font-semibold mb-4">{data.whyItWorks.title}</h4>
          <div className="space-y-4">
            {data.whyItWorks.reasons?.map((item: any, i: number) => (
              <div key={i} className="bg-emerald-500/20 rounded-lg p-4">
                <p className="text-emerald-300 font-semibold mb-2">{item.reason}</p>
                <p className="text-gray-300 text-sm leading-relaxed">{item.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {data.criticalClarification && (
        <div className="bg-amber-500/10 rounded-lg p-4">
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
          <h4 className="text-white font-semibold mb-4">{data.multiStablecoinStrategy.title}</h4>
          <p className="text-gray-300 mb-4">{data.multiStablecoinStrategy.why}</p>
          <div className="space-y-4">
            {data.multiStablecoinStrategy.examples?.map((ex: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-blue-300 font-semibold">{ex.corridor}</p>
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded">{ex.stablecoinUsed}</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{ex.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Liquidity Management */}
      {data.liquidityManagement && (
        <div className="mb-6">
          <h4 className="text-white font-semibold mb-4">{data.liquidityManagement.title}</h4>
          <p className="text-amber-300 text-sm mb-3"><span className="font-semibold">Challenge:</span> {data.liquidityManagement.challenge}</p>
          <p className="text-emerald-300 text-sm mb-3"><span className="font-semibold">Solution:</span> {data.liquidityManagement.solution}</p>
          <div className="bg-blue-500/20 rounded-lg p-4">
            <p className="text-blue-300 text-xs font-semibold mb-2">Example:</p>
            <p className="text-gray-300 text-sm leading-relaxed">{data.liquidityManagement.example}</p>
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
      <p className="text-gray-300 mb-6">{data.setup}</p>

      <div className="space-y-4">
        {/* The Scenario */}
        {data.theScenario && (
          <div className="rounded-lg overflow-hidden ">
            <button
              onClick={() => setExpandedSection(expandedSection === 'scenario' ? null : 'scenario')}
              className="w-full bg-blue-500/10 p-4 text-left hover:bg-blue-500/20 transition flex items-center justify-between"
            >
              <h4 className="font-semibold text-blue-300">{data.theScenario.title}</h4>
              <ChevronDown className={`w-5 h-5 text-blue-400 transition-transform ${expandedSection === 'scenario' ? 'rotate-180' : ''}`} />
            </button>
            {expandedSection === 'scenario' && (
              <div className="bg-slate-700/30 p-5 space-y-4 border-t border-blue-500/30">
                <p className="text-gray-300 text-sm leading-relaxed">{data.theScenario.situation}</p>
                <div>
                  <p className="text-amber-300 text-sm font-semibold mb-2">Capital Controls:</p>
                  <ul className="text-gray-400 text-sm space-y-2">
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
          <div className="rounded-lg overflow-hidden ">
            <button
              onClick={() => setExpandedSection(expandedSection === 'arrive' ? null : 'arrive')}
              className="w-full bg-emerald-500/10 p-4 text-left hover:bg-emerald-500/20 transition flex items-center justify-between"
            >
              <h4 className="font-semibold text-emerald-300">{data.stablecoinsArrive.title}</h4>
              <ChevronDown className={`w-5 h-5 text-emerald-400 transition-transform ${expandedSection === 'arrive' ? 'rotate-180' : ''}`} />
            </button>
            {expandedSection === 'arrive' && (
              <div className="bg-slate-700/30 p-5 space-y-4 border-t border-emerald-500/30">
                <p className="text-gray-300 text-sm leading-relaxed">{data.stablecoinsArrive.howTheyArrive}</p>
                <ul className="text-gray-400 text-sm space-y-2">
                  {data.stablecoinsArrive.steps?.map((step: string, i: number) => (
                    <li key={i}>{i + 1}. {step}</li>
                  ))}
                </ul>
                <p className="text-gray-300 text-sm leading-relaxed">{data.stablecoinsArrive.adoption}</p>
                <div className="bg-purple-500/20 rounded-lg p-4">
                  <p className="text-purple-200 italic">"{data.stablecoinsArrive.quote}"</p>
                  <p className="text-gray-400 text-xs mt-3">{data.stablecoinsArrive.fishbonesExplained}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* The Collapse - Act III */}
        {data.theCollapse && (
          <div className="rounded-lg overflow-hidden ">
            <button
              onClick={() => setExpandedSection(expandedSection === 'collapse' ? null : 'collapse')}
              className="w-full bg-red-500/20 p-4 text-left hover:bg-red-500/30 transition flex items-center justify-between"
            >
              <h4 className="font-semibold text-red-300">{data.theCollapse.title}</h4>
              <ChevronDown className={`w-5 h-5 text-red-400 transition-transform ${expandedSection === 'collapse' ? 'rotate-180' : ''}`} />
            </button>
            {expandedSection === 'collapse' && (
              <div className="bg-slate-700/30 p-5 space-y-4 border-t border-red-500/30">
                <div>
                  <p className="text-red-300 text-sm font-semibold mb-2">What Happens:</p>
                  <ul className="text-gray-400 text-sm space-y-2">
                    {data.theCollapse.consequences?.map((consequence: any, i: number) => (
                      <li key={i}>• <span className="text-red-300 font-medium">{consequence.problem}:</span> {consequence.explanation}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-red-200 text-sm italic">{data.theCollapse.theCrisis}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Lessons */}
      <div className="bg-blue-500/20 rounded-lg p-5 mt-6">
        <h4 className="font-semibold text-blue-300 mb-4">{data.theLessonTitle}</h4>
        <div className="space-y-4">
          {data.lessons?.map((item: any, i: number) => (
            <div key={i}>
              <p className="text-blue-200 font-semibold text-sm mb-1">{item.lesson}</p>
              <p className="text-gray-300 text-sm">{item.explanation}</p>
            </div>
          ))}
        </div>
      </div>

      {data.arnoldInsight && (
        <div className="bg-purple-500/20 rounded-lg p-4 mt-4">
          <p className="text-purple-200 italic">💡 {data.arnoldInsight}</p>
        </div>
      )}

      {data.spherePosition && (
        <div className="bg-emerald-500/20 rounded-lg p-4 mt-4">
          <p className="text-emerald-200 text-sm">{data.spherePosition}</p>
        </div>
      )}
    </div>
  );
}

function SphereMitigationDetailedBlock({ data }: { data: any }) {
  return (
    <div className="bg-purple-500/10 rounded-xl p-6">
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
        <div className="bg-amber-500/10 rounded-lg p-3 mt-4">
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
        <div className="mb-6 bg-emerald-500/20 rounded-lg p-5">
          <h4 className="font-semibold text-emerald-300 mb-4">{data.stablecoinLegDetail.title}</h4>
          <div className="space-y-4">
            {data.stablecoinLegDetail.steps?.map((step: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-white text-sm font-semibold">{step.step}</p>
                  <span className="text-emerald-300 text-xs font-mono bg-emerald-500/20 px-2 py-1 rounded">{step.time}</span>
                </div>
                <p className="text-gray-300 text-sm mb-2">{step.what}</p>
                <p className="text-gray-500 text-sm">Dependency: {step.dependency}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-emerald-500/30">
            <p className="text-emerald-200 text-sm"><span className="font-semibold">Total:</span> {data.stablecoinLegDetail.totalTime}</p>
            <p className="text-amber-300 text-sm mt-2">⚠️ {data.stablecoinLegDetail.bottleneck}</p>
          </div>
        </div>
      )}

      {/* Fiat Leg Detail */}
      {data.fiatLegDetail && (
        <div className="mb-6 bg-red-500/20 rounded-lg p-5">
          <h4 className="font-semibold text-red-300 mb-4">{data.fiatLegDetail.title}</h4>
          <div className="space-y-4">
            {data.fiatLegDetail.steps?.map((step: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-white text-sm font-semibold">{step.step}</p>
                  <span className="text-red-300 text-xs font-mono bg-red-500/20 px-2 py-1 rounded">{step.time}</span>
                </div>
                <p className="text-gray-300 text-sm mb-2">{step.what}</p>
                <p className="text-gray-500 text-sm">Dependency: {step.dependency}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-red-500/30">
            <p className="text-red-200 text-sm"><span className="font-semibold">Total:</span> {data.fiatLegDetail.totalTime}</p>
            <p className="text-amber-300 text-sm mt-2">⚠️ {data.fiatLegDetail.bottleneck}</p>
          </div>
        </div>
      )}
      
      {data.conclusion && (
        <div className="bg-purple-500/10 rounded-lg p-4">
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
        <div className="bg-red-500/20 rounded-lg p-4">
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
        <div className="bg-emerald-500/10 rounded-lg p-4">
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
        <div className="bg-purple-500/10 rounded-lg p-4">
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
      {data.whyLatam && <p className="text-blue-300 mb-4">{data.whyLatam}</p>}
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

      {/* Key Markets (for LATAM deep dive) */}
      {data.keyMarkets && (
        <div className="mb-4">
          <h4 className="text-white font-semibold mb-3">Key Markets</h4>
          <div className="grid gap-2">
            {data.keyMarkets.map((market: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded p-3 flex items-center justify-between">
                <div>
                  <p className="text-blue-300 font-semibold text-sm">{market.country}</p>
                  <p className="text-gray-400 text-xs">{market.framework}</p>
                </div>
                <div className="text-right">
                  <p className="text-emerald-300 text-xs">{market.volume}</p>
                  <p className="text-gray-400 text-xs">{market.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Framework */}
      {data.framework && (
        <div className="bg-blue-500/10 rounded p-3 mb-4">
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
        <div className="mb-4 bg-amber-500/10 rounded-lg p-4">
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
        <div className="bg-emerald-500/10 rounded-lg p-4 mb-4">
          <p className="text-emerald-200 text-sm">{data.sphereAdvantage}</p>
        </div>
      )}
      
      {/* Corridors */}
      {data.corridors && (
        <div className="bg-purple-500/10 rounded p-3 mb-4">
          <p className="text-purple-200 text-sm"><span className="font-semibold">Key Corridors:</span> {data.corridors}</p>
        </div>
      )}

      {/* Sphere Status (nested in uaeDeepDive) */}
      {data.sphereStatus && (
        <div className="bg-amber-500/20 rounded-lg p-4 border-l-4 border-amber-500">
          <h4 className="text-amber-300 font-semibold mb-2">{data.sphereStatus.title}</h4>
          <p className="text-white font-bold text-lg mb-2">{data.sphereStatus.status}</p>
          {data.sphereStatus.explanation && (
            <p className="text-gray-300 text-sm mb-3">{data.sphereStatus.explanation}</p>
          )}
          {data.sphereStatus.crossReference && (
            <p className="text-blue-300 text-sm bg-blue-500/10 rounded p-2">📚 {data.sphereStatus.crossReference}</p>
          )}
        </div>
      )}
    </div>
  );
}

function FrictionPointsBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-5">{data.title}</h3>

      <div className="space-y-5">
        {data.frictions?.map((friction: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-5 border-l-4 border-amber-500">
            <h4 className="text-amber-300 font-semibold mb-4">{friction.friction}</h4>

            <div className="space-y-4">
              <div className="bg-red-500/20 rounded-lg p-4">
                <p className="text-red-300 text-sm font-semibold mb-2">Challenge:</p>
                <p className="text-gray-300 text-sm leading-relaxed">{friction.challenge}</p>
              </div>

              <div className="bg-emerald-500/20 rounded-lg p-4">
                <p className="text-emerald-300 text-sm font-semibold mb-2">Sphere Approach:</p>
                <p className="text-gray-300 text-sm leading-relaxed">{friction.sphereApproach}</p>
              </div>

              {friction.example && (
                <div className="bg-blue-500/10 rounded-lg p-4">
                  <p className="text-blue-200 text-sm leading-relaxed"><span className="font-semibold">Example:</span> {friction.example}</p>
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
    <div className="bg-purple-500/10 rounded-xl p-6">
      <h3 className="font-semibold text-white mb-4">{data.title}</h3>
      
      <div className="space-y-4">
        {data.advantages?.map((adv: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-emerald-500">
            <h4 className="text-emerald-300 font-semibold mb-2">{adv.advantage}</h4>
            <p className="text-gray-300 text-sm mb-3">{adv.explanation}</p>
            
            {adv.example && (
              <div className="bg-blue-500/10 rounded p-3">
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
      {data.subtitle && <p className="text-gray-400 mb-5 leading-relaxed">{data.subtitle}</p>}

      <div className="space-y-4">
        {data.cases?.map((useCase: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedCase(expandedCase === i ? null : i)}
              className="w-full p-5 text-left hover:bg-slate-700 transition flex items-start justify-between"
            >
              <div className="flex-1">
                <h4 className="text-emerald-300 font-semibold mb-2">{useCase.useCase}</h4>
                <p className="text-gray-400 text-sm">{useCase.customer}</p>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedCase === i ? 'rotate-180' : ''}`} />
            </button>

            {expandedCase === i && (
              <div className="px-5 pb-5 space-y-3">
                {/* Problem */}
                <div className="bg-red-500/20 rounded p-3">
                  <p className="text-red-300 text-sm leading-relaxed"><span className="font-semibold">Problem:</span> {useCase.problem}</p>
                </div>

                {/* Sphere Solution */}
                <div className="bg-emerald-500/20 rounded p-3">
                  <p className="text-emerald-300 text-sm leading-relaxed"><span className="font-semibold">Sphere Solution:</span> {useCase.sphereSolution}</p>
                </div>

                {/* Results */}
                {useCase.results && (
                  <div className="bg-blue-500/10 rounded p-3">
                    <p className="text-blue-300 text-sm font-semibold mb-2">Results</p>
                    <div className="space-y-1">
                      {Object.entries(useCase.results).map(([key, value], j) => (
                        <p key={j} className="text-gray-300 text-sm">
                          <span className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span> {value as string}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Why Sphere */}
                {useCase.whySphere && (
                  <div className="bg-purple-500/10 rounded p-3">
                    <p className="text-purple-300 text-sm font-semibold mb-2">Why Sphere</p>
                    <ul className="text-gray-300 text-sm space-y-1">
                      {useCase.whySphere.map((reason: string, j: number) => (
                        <li key={j} className="leading-relaxed">• {reason}</li>
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
    <div className="bg-purple-500/10 rounded-xl p-6">
      <h3 className="font-semibold text-white mb-4">{data.title}</h3>
      <p className="text-purple-200 mb-4">{data.overarching}</p>
      
      <div className="space-y-4">
        {data.reasons?.map((item: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-emerald-500">
            <h4 className="text-emerald-300 font-semibold mb-2">{item.reason}</h4>
            <p className="text-gray-300 text-sm mb-2">{item.why}</p>
            
            {item.example && (
              <div className="bg-blue-500/10 rounded p-3 mb-2">
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

// =============================================================================
// NEW SECTION 2.1 - MARKET DATA COMPONENTS
// =============================================================================

function MarketGrowthBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">📈 {data.title}</h3>
      
      {data.currentState && (
        <div className="mb-6">
          <h4 className="text-blue-300 font-semibold mb-3">{data.currentState.title}</h4>
          <div className="grid md:grid-cols-2 gap-3">
            {data.currentState.metrics?.map((m: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-3">
                <p className="text-gray-400 text-sm">{m.metric}</p>
                <p className="text-white font-semibold text-lg">{m.value}</p>
                <p className="text-gray-500 text-xs">{m.source}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {data.projections && (
        <div className="mb-6">
          <h4 className="text-emerald-300 font-semibold mb-3">{data.projections.title}</h4>
          <div className="space-y-2">
            {data.projections.estimates?.map((e: any, i: number) => (
              <div key={i} className="bg-emerald-500/10 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">{e.source}</span>
                  <span className="text-emerald-300 font-semibold">{e.projection}</span>
                </div>
                <p className="text-gray-500 text-xs mt-1">{e.scenario}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// NEW SECTION 2.4 - MiCA AND GENIUS ACT COMPONENTS
// =============================================================================

function MiCADetailsBlock({ data }: { data: any }) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-white text-xl">🇪🇺 {data.title}</h3>
          {data.fullName && <p className="text-gray-400 text-sm">{data.fullName}</p>}
        </div>
        <button onClick={() => setExpanded(!expanded)} className="text-blue-400 text-sm hover:text-blue-300 flex items-center gap-1">
          {expanded ? 'Show Less' : 'Show Details'}
          <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Key metadata */}
      <div className="flex flex-wrap gap-3 mb-4 text-xs">
        {data.effectiveDate && <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded">Effective: {data.effectiveDate}</span>}
        {data.scope && <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded">Scope: {data.scope}</span>}
      </div>

      {data.background && (
        <div className="bg-blue-500/10 rounded-lg p-4 mb-4">
          <h4 className="text-blue-300 font-semibold mb-2">{data.background.title}</h4>
          <ul className="text-gray-300 text-sm space-y-1">
            {data.background.points?.map((p: string, i: number) => (
              <li key={i}>• {p}</li>
            ))}
          </ul>
        </div>
      )}

      {expanded && (
        <div className="space-y-4">
          {/* EU Regulators */}
          {data.euRegulators && (
            <div className="bg-blue-500/10 rounded-lg p-4">
              <h4 className="text-blue-300 font-semibold mb-3">{data.euRegulators.title}</h4>
              <div className="space-y-3">
                {data.euRegulators.regulators?.map((reg: any, i: number) => (
                  <div key={i} className="bg-slate-700/50 rounded-lg p-3">
                    <p className="text-white font-medium">{reg.name}</p>
                    <p className="text-blue-300 text-sm">{reg.role}</p>
                    <p className="text-gray-400 text-xs mt-1">{reg.responsibilities}</p>
                  </div>
                ))}
              </div>
              {data.euRegulators.keyPoint && (
                <p className="text-blue-200 text-sm mt-3 bg-blue-500/10 rounded p-2">💡 {data.euRegulators.keyPoint}</p>
              )}
            </div>
          )}

          {/* Stablecoin Classification */}
          {data.stablecoinClassification && (
            <div>
              <h4 className="text-white font-semibold mb-3">{data.stablecoinClassification.title}</h4>
              <div className="grid md:grid-cols-2 gap-3">
                {data.stablecoinClassification.types?.map((type: any, i: number) => (
                  <div key={i} className="bg-slate-700/50 rounded-lg p-4">
                    <p className="text-blue-300 font-semibold mb-1">{type.type}</p>
                    <p className="text-gray-300 text-sm mb-2">{type.definition}</p>
                    <p className="text-gray-400 text-xs mb-1"><span className="font-semibold">Requirements:</span> {type.requirements}</p>
                    <p className="text-gray-500 text-xs italic">Example: {type.example}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Requirements */}
          {data.keyRequirements && (
            <div>
              <h4 className="text-white font-semibold mb-3">{data.keyRequirements.title}</h4>
              <div className="space-y-2">
                {data.keyRequirements.requirements?.map((r: any, i: number) => (
                  <div key={i} className="bg-slate-700/50 rounded-lg p-3">
                    <p className="text-white font-medium">{r.requirement}</p>
                    <p className="text-gray-400 text-sm">{r.detail}</p>
                    {r.implication && <p className="text-amber-300 text-xs mt-1">→ {r.implication}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tether Impact */}
          {data.tetherImpact && (
            <div className="bg-red-500/10 rounded-lg p-4">
              <h4 className="text-red-300 font-semibold mb-3">{data.tetherImpact.title}</h4>
              {data.tetherImpact.timeline && (
                <div className="space-y-2 mb-3">
                  {data.tetherImpact.timeline.map((t: any, i: number) => (
                    <div key={i} className="flex gap-3 text-sm">
                      <span className="text-gray-500 font-mono">{t.date}</span>
                      <span className="text-gray-300">{t.event}</span>
                    </div>
                  ))}
                </div>
              )}
              {data.tetherImpact.consequences && (
                <ul className="text-gray-300 text-sm space-y-1 mb-3">
                  {data.tetherImpact.consequences.map((c: string, i: number) => (
                    <li key={i}>• {c}</li>
                  ))}
                </ul>
              )}
              {data.tetherImpact.sphereImplication && (
                <p className="text-emerald-300 text-sm bg-emerald-500/10 rounded p-2">💡 {data.tetherImpact.sphereImplication}</p>
              )}
            </div>
          )}

          {/* Circle Approval */}
          {data.circleApproval && (
            <div className="bg-emerald-500/10 rounded-lg p-4">
              <h4 className="text-emerald-300 font-semibold mb-2">{data.circleApproval.title}</h4>
              <p className="text-gray-300 text-sm mb-2"><span className="font-semibold">Status:</span> {data.circleApproval.status}</p>
              {data.circleApproval.products && (
                <p className="text-gray-400 text-sm mb-2"><span className="font-semibold">Products:</span> {data.circleApproval.products.join(', ')}</p>
              )}
              <p className="text-emerald-200 text-sm">{data.circleApproval.implication}</p>
            </div>
          )}

          {/* Sphere Strategy */}
          {data.sphereStrategy && (
            <div className="bg-purple-500/10 rounded-lg p-4">
              <h4 className="text-purple-300 font-semibold mb-3">{data.sphereStrategy.title}</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                {data.sphereStrategy.approach?.map((a: string, i: number) => (
                  <li key={i}>• {a}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function GeniusActBlock({ data }: { data: any }) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-white text-xl">🇺🇸 {data.title}</h3>
          {data.fullName && <p className="text-gray-400 text-sm">{data.fullName}</p>}
        </div>
        <button onClick={() => setExpanded(!expanded)} className="text-blue-400 text-sm hover:text-blue-300 flex items-center gap-1">
          {expanded ? 'Show Less' : 'Show Details'}
          <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Status badge */}
      {data.status && (
        <div className="mb-4">
          <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded text-sm">{data.status}</span>
        </div>
      )}

      {data.significance && (
        <div className="bg-blue-500/10 rounded-lg p-4 mb-4">
          <h4 className="text-blue-300 font-semibold mb-2">{data.significance.title}</h4>
          <ul className="text-gray-300 text-sm space-y-1">
            {data.significance.points?.map((p: string, i: number) => (
              <li key={i}>• {p}</li>
            ))}
          </ul>
        </div>
      )}

      {expanded && (
        <div className="space-y-4">
          {/* US Regulators */}
          {data.usRegulators && (
            <div className="bg-blue-500/10 rounded-lg p-4">
              <h4 className="text-blue-300 font-semibold mb-3">{data.usRegulators.title}</h4>
              <div className="space-y-3">
                {data.usRegulators.regulators?.map((reg: any, i: number) => (
                  <div key={i} className="bg-slate-700/50 rounded-lg p-3">
                    <p className="text-white font-medium">{reg.name}</p>
                    <p className="text-blue-300 text-sm">{reg.role}</p>
                    <p className="text-gray-400 text-xs mt-1">{reg.responsibilities}</p>
                  </div>
                ))}
              </div>
              {data.usRegulators.keyPoint && (
                <p className="text-blue-200 text-sm mt-3 bg-blue-500/10 rounded p-2">💡 {data.usRegulators.keyPoint}</p>
              )}
            </div>
          )}

          {/* Key Provisions */}
          {data.keyProvisions && (
            <div>
              <h4 className="text-white font-semibold mb-3">{data.keyProvisions.title}</h4>
              <div className="space-y-2">
                {data.keyProvisions.provisions?.map((p: any, i: number) => (
                  <div key={i} className="bg-slate-700/50 rounded-lg p-3">
                    <p className="text-white font-medium">{p.provision}</p>
                    <p className="text-gray-400 text-sm">{p.detail}</p>
                    {p.implication && <p className="text-amber-300 text-xs mt-1">→ {p.implication}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* What It Does NOT Cover */}
          {data.whatItDoesNot && (
            <div className="bg-amber-500/10 rounded-lg p-4">
              <h4 className="text-amber-300 font-semibold mb-3">{data.whatItDoesNot.title}</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                {data.whatItDoesNot.items?.map((item: string, i: number) => (
                  <li key={i}>⚠️ {item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Sphere Implication */}
          {data.sphereImplication && (
            <div className="bg-purple-500/10 rounded-lg p-4">
              <h4 className="text-purple-300 font-semibold mb-3">{data.sphereImplication.title}</h4>
              <ul className="text-gray-300 text-sm space-y-1 mb-3">
                {data.sphereImplication.points?.map((p: string, i: number) => (
                  <li key={i}>• {p}</li>
                ))}
              </ul>
              {data.sphereImplication.positioning && (
                <p className="text-purple-200 text-sm bg-purple-500/10 rounded p-2">💡 {data.sphereImplication.positioning}</p>
              )}
            </div>
          )}

          {/* Comparison to MiCA */}
          {data.comparisonToMiCA && (
            <div>
              <h4 className="text-white font-semibold mb-3">{data.comparisonToMiCA.title}</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-600">
                      {data.comparisonToMiCA.headers?.map((h: string, i: number) => (
                        <th key={i} className="text-left text-gray-400 p-2 font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.comparisonToMiCA.rows?.map((row: string[], i: number) => (
                      <tr key={i} className="border-b border-slate-700">
                        {row.map((cell, j) => (
                          <td key={j} className={`p-2 ${j === 0 ? 'text-white font-medium' : 'text-gray-300'}`}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// =============================================================================
// NEW SECTION 2.6 - SYSTEMIC RISK COMPONENTS
// =============================================================================

function SystemicScaleBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">📊 {data.title}</h3>
      {data.marketSize && (
        <div className="mb-4">
          <div className="grid md:grid-cols-2 gap-4 mb-3">
            <div className="bg-blue-500/10 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Current</p>
              <p className="text-blue-300 font-semibold text-lg">{data.marketSize.current}</p>
            </div>
            <div className="bg-emerald-500/10 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Projected</p>
              <p className="text-emerald-300 font-semibold text-lg">{data.marketSize.projected}</p>
            </div>
          </div>
          {data.marketSize.implication && (
            <p className="text-amber-300 text-sm bg-amber-500/10 rounded p-3">⚠️ {data.marketSize.implication}</p>
          )}
        </div>
      )}
      {data.treasuryMarketImpact && (
        <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
          <h4 className="text-white font-medium mb-3">{data.treasuryMarketImpact.title}</h4>
          <ul className="text-gray-300 text-sm space-y-2 mb-3">
            {data.treasuryMarketImpact.points?.map((p: string, i: number) => (
              <li key={i}>• {p}</li>
            ))}
          </ul>
          {data.treasuryMarketImpact.stressScenario && (
            <div className="bg-red-500/20 rounded p-3">
              <p className="text-red-300 text-sm">⚠️ Stress Scenario: {data.treasuryMarketImpact.stressScenario}</p>
            </div>
          )}
        </div>
      )}
      {data.keyInsight && (
        <div className="bg-purple-500/10 rounded-lg p-4">
          <p className="text-purple-200 text-sm italic">💡 {data.keyInsight}</p>
        </div>
      )}
    </div>
  );
}

function ThreeRiskCategoriesBlock({ data }: { data: any }) {
  const [expandedCategory, setExpandedCategory] = React.useState<number | null>(0);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}

      <div className="space-y-3">
        {data.categories?.map((cat: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedCategory(expandedCategory === i ? null : i)}
              className="w-full p-4 text-left hover:bg-slate-700 transition flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{cat.icon}</span>
                <div>
                  <h4 className="text-white font-semibold">{cat.category}</h4>
                  <p className="text-gray-400 text-sm">{cat.definition}</p>
                </div>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedCategory === i ? 'rotate-180' : ''}`} />
            </button>

            {expandedCategory === i && (
              <div className="px-4 pb-4 space-y-3">
                {cat.traditionalControls && (
                  <div className="bg-emerald-500/10 rounded p-3">
                    <p className="text-emerald-300 text-sm font-semibold mb-2">Traditional Controls:</p>
                    <ul className="text-gray-300 text-sm space-y-1">
                      {cat.traditionalControls.map((c: string, j: number) => (<li key={j}>• {c}</li>))}
                    </ul>
                  </div>
                )}
                {cat.onChainRisks && (
                  <div className="bg-red-500/20 rounded p-3">
                    <p className="text-red-300 text-sm font-semibold mb-2">On-Chain Risks:</p>
                    <ul className="text-gray-300 text-sm space-y-1">
                      {cat.onChainRisks.map((r: string, j: number) => (<li key={j}>• {r}</li>))}
                    </ul>
                  </div>
                )}
                {cat.keyTakeaway && (
                  <div className="bg-purple-500/10 rounded p-3">
                    <p className="text-purple-200 text-sm">{cat.keyTakeaway}</p>
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

function DetailedCaseStudyBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white text-xl flex items-center gap-2 mb-4">
        {data.icon && <span>{data.icon}</span>}
        {data.title}
      </h3>
      {data.background && (
        <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
          <h4 className="text-white font-medium mb-2">Background</h4>
          {typeof data.background === 'object' ? (
            <div className="space-y-1 text-sm">
              {Object.entries(data.background).map(([key, value], i) => (
                <p key={i} className="text-gray-400"><span className="text-gray-500">{key}:</span> {value as string}</p>
              ))}
            </div>
          ) : (<p className="text-gray-400 text-sm">{data.background}</p>)}
        </div>
      )}
      {data.howItWorks && (
        <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
          <h4 className="text-white font-medium mb-3">{data.howItWorks.title}</h4>
          <div className="space-y-2">
            {data.howItWorks.steps?.map((s: any, i: number) => (
              <div key={i} className="flex items-start gap-3">
                <span className="bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">{s.step}</span>
                <p className="text-gray-400 text-sm">{s.action}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Why This Matters (MakerDAO case) */}
      {data.whyThisMatters && (
        <div className="bg-amber-500/10 rounded-lg p-4 mb-4">
          <h4 className="text-amber-300 font-medium mb-2">{data.whyThisMatters.title}</h4>
          <ul className="text-gray-300 text-sm space-y-2">
            {data.whyThisMatters.points?.map((p: string, i: number) => (
              <li key={i}>• {p}</li>
            ))}
          </ul>
        </div>
      )}
      {/* What Happened (USDC Depeg case) */}
      {data.whatHappened && (
        <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
          <h4 className="text-white font-medium mb-3">{data.whatHappened.title}</h4>
          <div className="space-y-2">
            {data.whatHappened.sequence?.map((s: any, i: number) => (
              <div key={i} className="flex items-start gap-3 bg-slate-600/50 rounded p-2">
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded flex-shrink-0">{s.time}</span>
                <p className="text-gray-400 text-sm">{s.event}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Critical Insight (USDC Depeg case) */}
      {data.criticalInsight && (
        <div className="bg-blue-500/10 rounded-lg p-4 mb-4">
          <h4 className="text-blue-300 font-medium mb-2">{data.criticalInsight.title}</h4>
          <ul className="text-gray-300 text-sm space-y-2">
            {data.criticalInsight.points?.map((p: string, i: number) => (
              <li key={i}>• {p}</li>
            ))}
          </ul>
        </div>
      )}
      {/* Enforcement Gap (Chainalysis case) */}
      {data.theEnforcementGap && (
        <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
          <h4 className="text-white font-medium mb-3">{data.theEnforcementGap.title}</h4>
          {data.theEnforcementGap.scenario?.description && (
            <p className="text-gray-400 text-sm mb-3">{data.theEnforcementGap.scenario.description}</p>
          )}
          <div className="space-y-2">
            {data.theEnforcementGap.scenario?.steps?.map((s: any, i: number) => (
              <div key={i} className="flex items-start gap-3">
                <span className="bg-amber-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">{s.step}</span>
                <p className="text-gray-400 text-sm">{s.action}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* The Revision (Chainalysis case) */}
      {data.theRevision && (
        <div className="bg-red-500/20 rounded-lg p-4 mb-4">
          <h4 className="text-red-300 font-medium mb-2">{data.theRevision.title}</h4>
          <p className="text-gray-300 text-sm mb-1">Original: {data.theRevision.original}</p>
          <p className="text-gray-300 text-sm mb-2">Revised: {data.theRevision.revised}</p>
          {data.theRevision.implication && (
            <p className="text-amber-300 text-sm">⚠️ {data.theRevision.implication}</p>
          )}
        </div>
      )}
      {(data.regulatoryImplication || data.lessonForSphere || data.keyTakeaway) && (
        <div className="bg-emerald-500/10 rounded-lg p-4">
          <p className="text-emerald-300 text-sm">
            💡 Key Insight: {data.regulatoryImplication || data.lessonForSphere || data.keyTakeaway}
          </p>
        </div>
      )}
    </div>
  );
}

function ContagionRiskBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}
      {data.channels && (
        <div className="grid md:grid-cols-2 gap-3 mb-4">
          {data.channels.map((ch: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-red-500">
              <h4 className="text-white font-medium mb-1">{ch.channel}</h4>
              <p className="text-gray-400 text-sm mb-2">{ch.mechanism}</p>
              {ch.risk && <p className="text-red-300 text-xs">Risk: {ch.risk}</p>}
              {ch.impact && <p className="text-amber-300 text-xs">Impact: {ch.impact}</p>}
            </div>
          ))}
        </div>
      )}
      {data.macroConsequences && (
        <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
          <h4 className="text-white font-medium mb-3">{data.macroConsequences.title}</h4>
          {data.macroConsequences.firstOrder && (
            <div className="mb-3">
              <p className="text-red-300 text-sm font-semibold mb-2">First-Order Effects:</p>
              <div className="space-y-2">
                {data.macroConsequences.firstOrder.map((c: any, i: number) => (
                  <div key={i} className="bg-red-500/10 rounded p-2">
                    <p className="text-white text-sm font-medium">{c.consequence}</p>
                    <p className="text-gray-400 text-xs">{c.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {data.macroConsequences.secondOrder && (
            <div>
              <p className="text-amber-300 text-sm font-semibold mb-2">Second-Order Effects:</p>
              <ul className="text-gray-400 text-xs space-y-1">
                {data.macroConsequences.secondOrder.map((c: string, i: number) => (
                  <li key={i}>• {c}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      {data.keyInsight && (
        <div className="bg-purple-500/10 rounded-lg p-4">
          <p className="text-purple-200 text-sm">💡 {data.keyInsight}</p>
        </div>
      )}
    </div>
  );
}

function BlockchainFailBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {data.traditionalBlockchains && (
          <div className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-red-500">
            <h4 className="text-red-400 font-medium mb-2">{data.traditionalBlockchains.title}</h4>
            <div className="space-y-1">
              {data.traditionalBlockchains.characteristics?.map((c: any, i: number) => (
                <p key={i} className="text-sm text-gray-400"><span className="text-gray-500">{c.attribute}:</span> {c.value}</p>
              ))}
            </div>
          </div>
        )}
        {data.regulatedFinanceRequirements && (
          <div className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-emerald-500">
            <h4 className="text-emerald-400 font-medium mb-2">{data.regulatedFinanceRequirements.title}</h4>
            <div className="space-y-1">
              {data.regulatedFinanceRequirements.characteristics?.map((c: any, i: number) => (
                <p key={i} className="text-sm text-gray-400"><span className="text-gray-500">{c.attribute}:</span> {c.value}</p>
              ))}
            </div>
          </div>
        )}
      </div>
      {data.fundamentalGap && (
        <div className="bg-amber-500/10 rounded-lg p-4">
          <p className="text-amber-200 text-sm">⚠️ {data.fundamentalGap}</p>
        </div>
      )}
    </div>
  );
}

function SphereNetSolutionBlock({ data }: { data: any }) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  
  return (
    <div className="bg-emerald-500/10 rounded-xl p-6">
      <h3 className="font-semibold text-white mb-2 text-xl">✅ {data.title}</h3>
      {data.subtitle && <p className="text-emerald-300 text-sm mb-2">{data.subtitle}</p>}
      {data.introduction && <p className="text-gray-300 mb-4">{data.introduction}</p>}
      
      {/* Why SphereNet Exists */}
      {data.whySphereNetExists && (
        <div className="mb-6 bg-slate-700/50 rounded-lg overflow-hidden">
          <button onClick={() => toggleSection('why')} className="w-full p-4 text-left hover:bg-slate-700 transition flex items-center justify-between">
            <h4 className="text-white font-semibold">{data.whySphereNetExists.title}</h4>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'why' ? 'rotate-180' : ''}`} />
          </button>
          {expandedSection === 'why' && (
            <div className="px-4 pb-4 space-y-4">
              {data.whySphereNetExists.context && <p className="text-gray-400 text-sm leading-relaxed mb-4">{data.whySphereNetExists.context}</p>}
              {data.whySphereNetExists.limitations?.map((l: any, i: number) => (
                <div key={i} className="bg-red-500/20 rounded p-4">
                  <p className="text-red-300 font-semibold mb-3">❌ {l.limitation}</p>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3"><span className="text-gray-500 font-medium">Problem:</span> {l.problem}</p>
                  <p className="text-amber-300 text-sm leading-relaxed mb-3"><span className="text-gray-500 font-medium">Consequence:</span> {l.consequence}</p>
                  {l.example && <p className="text-gray-400 text-sm leading-relaxed bg-slate-700/50 rounded p-3">📋 {l.example}</p>}
                </div>
              ))}
              {data.whySphereNetExists.conclusion && (
                <div className="bg-emerald-500/20 rounded p-4">
                  <p className="text-emerald-200 leading-relaxed">{data.whySphereNetExists.conclusion}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Architecture Shift */}
      {data.architectureShift && (
        <div className="mb-6 bg-slate-700/50 rounded-lg overflow-hidden">
          <button onClick={() => toggleSection('arch')} className="w-full p-4 text-left hover:bg-slate-700 transition flex items-center justify-between">
            <h4 className="text-white font-semibold">{data.architectureShift.title}</h4>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'arch' ? 'rotate-180' : ''}`} />
          </button>
          {expandedSection === 'arch' && (
            <div className="px-4 pb-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-500/20 rounded p-3">
                  <p className="text-red-300 font-semibold mb-2">{data.architectureShift.traditional?.label}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {data.architectureShift.traditional?.flow?.map((step: string, i: number) => (
                      <span key={i} className="bg-slate-700 text-gray-300 text-xs px-2 py-1 rounded">
                        {step} {i < data.architectureShift.traditional.flow.length - 1 ? '→' : ''}
                      </span>
                    ))}
                  </div>
                  <p className="text-red-400 text-sm">⚠️ {data.architectureShift.traditional?.riskPoint}</p>
                  {data.architectureShift.traditional?.problem && (
                    <p className="text-gray-400 text-xs mt-2">{data.architectureShift.traditional.problem}</p>
                  )}
                </div>
                <div className="bg-emerald-500/20 rounded p-3">
                  <p className="text-emerald-300 font-semibold mb-2">{data.architectureShift.sphereNet?.label}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {data.architectureShift.sphereNet?.flow?.map((step: string, i: number) => (
                      <span key={i} className="bg-slate-700 text-gray-300 text-xs px-2 py-1 rounded">
                        {step} {i < data.architectureShift.sphereNet.flow.length - 1 ? '→' : ''}
                      </span>
                    ))}
                  </div>
                  <p className="text-emerald-400 text-sm">✅ {data.architectureShift.sphereNet?.riskPoint}</p>
                  {data.architectureShift.sphereNet?.advantage && (
                    <p className="text-gray-400 text-xs mt-2">{data.architectureShift.sphereNet.advantage}</p>
                  )}
                </div>
              </div>
              {data.architectureShift.keyDifference && (
                <p className="text-blue-200 text-sm mt-3 bg-blue-500/10 rounded p-2">{data.architectureShift.keyDifference}</p>
              )}
            </div>
          )}
        </div>
      )}
      
      {/* Three Core Principles */}
      {data.threeCorePrinciples && (
        <div className="mb-6">
          <h4 className="text-white font-semibold mb-3">{data.threeCorePrinciples.title}</h4>
          <div className="space-y-4">
            {data.threeCorePrinciples.principles?.map((p: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-emerald-500">
                <button onClick={() => toggleSection(`principle-${i}`)} className="w-full text-left">
                  <h5 className="text-emerald-300 font-semibold flex items-center justify-between">
                    <span>{p.icon} {p.principle}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${expandedSection === `principle-${i}` ? 'rotate-180' : ''}`} />
                  </h5>
                </button>
                {p.tagline && <p className="text-gray-400 text-sm italic mt-1">{p.tagline}</p>}
                <p className="text-gray-300 text-sm mt-2">{p.description}</p>
                
                {expandedSection === `principle-${i}` && (
                  <div className="mt-3 space-y-3">
                    {p.howItWorks && (
                      <div className="bg-slate-600/50 rounded p-3">
                        <p className="text-blue-300 font-semibold text-sm mb-2">How It Works:</p>
                        <ul className="text-gray-300 text-sm space-y-1">
                          {p.howItWorks.map((item: string, j: number) => (
                            <li key={j}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {p.withoutThis && (
                      <div className="bg-red-500/20 rounded p-3">
                        <p className="text-red-300 font-semibold text-sm mb-2">❌ {p.withoutThis.scenario}:</p>
                        <ul className="text-gray-400 text-xs space-y-1">
                          {p.withoutThis.consequences?.map((c: string, j: number) => (
                            <li key={j}>• {c}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {p.concreteExample && (
                      <div className="bg-blue-500/10 rounded p-3">
                        <p className="text-blue-300 font-semibold text-sm mb-2">📋 Example: {p.concreteExample.title}</p>
                        {p.concreteExample.traditional && (
                          <p className="text-gray-400 text-xs mb-1"><span className="text-red-300">Traditional:</span> {p.concreteExample.traditional}</p>
                        )}
                        {p.concreteExample.sphereNet && (
                          <p className="text-gray-400 text-xs mb-1"><span className="text-emerald-300">SphereNet:</span> {p.concreteExample.sphereNet}</p>
                        )}
                        {p.concreteExample.result && (
                          <p className="text-emerald-200 text-xs mt-2">✅ {p.concreteExample.result}</p>
                        )}
                      </div>
                    )}
                    
                    {p.regulatoryAlignment && (
                      <div className="bg-slate-600/50 rounded p-3">
                        <p className="text-purple-300 font-semibold text-sm mb-2">{p.regulatoryAlignment.title}</p>
                        <div className="space-y-1">
                          {p.regulatoryAlignment.frameworks?.map((f: any, j: number) => (
                            <div key={j} className="flex items-start gap-2 text-xs">
                              <span className="text-purple-400 font-mono">{f.framework}:</span>
                              <span className="text-gray-400">{f.alignment}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {p.privacyLevels && (
                      <div className="bg-slate-600/50 rounded p-3">
                        <p className="text-purple-300 font-semibold text-sm mb-2">{p.privacyLevels.title}</p>
                        <div className="space-y-2">
                          {p.privacyLevels.levels?.map((level: any, j: number) => (
                            <div key={j} className="bg-slate-700/50 rounded p-2">
                              <p className="text-white text-sm font-medium">{level.level}</p>
                              <p className="text-gray-400 text-xs">Visibility: {level.visibility}</p>
                              <p className="text-gray-500 text-xs">Who sees: {level.whoSees}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {p.participantTiers && (
                      <div className="bg-slate-600/50 rounded p-3">
                        <p className="text-purple-300 font-semibold text-sm mb-2">{p.participantTiers.title}</p>
                        <div className="space-y-2">
                          {p.participantTiers.tiers?.map((tier: any, j: number) => (
                            <div key={j} className="bg-slate-700/50 rounded p-2">
                              <p className="text-white text-sm font-medium">{tier.tier}</p>
                              <p className="text-gray-400 text-xs">Examples: {tier.examples}</p>
                              <p className="text-emerald-400 text-xs">Permissions: {tier.permissions}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* VS Analytics Approach */}
      {data.vsAnalyticsApproach && (
        <div className="mb-6 bg-slate-700/50 rounded-lg overflow-hidden">
          <button onClick={() => toggleSection('vsAnalytics')} className="w-full p-4 text-left hover:bg-slate-700 transition flex items-center justify-between">
            <div>
              <h4 className="text-white font-semibold">{data.vsAnalyticsApproach.title}</h4>
              {data.vsAnalyticsApproach.subtitle && <p className="text-gray-400 text-sm">{data.vsAnalyticsApproach.subtitle}</p>}
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'vsAnalytics' ? 'rotate-180' : ''}`} />
          </button>
          {expandedSection === 'vsAnalytics' && (
            <div className="px-4 pb-4">
              {data.vsAnalyticsApproach.comparison && (
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-600/50">
                        {data.vsAnalyticsApproach.comparison.headers?.map((h: string, i: number) => (
                          <th key={i} className="p-2 text-left text-gray-300">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.vsAnalyticsApproach.comparison.rows?.map((row: string[], i: number) => (
                        <tr key={i} className="border-t border-slate-600/50">
                          {row.map((cell: string, j: number) => (
                            <td key={j} className={`p-2 ${j === 0 ? 'text-gray-300 font-medium' : j === 1 ? 'text-red-300' : 'text-emerald-300'}`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {data.vsAnalyticsApproach.notReplacement && (
                <div className="bg-blue-500/10 rounded p-3">
                  <p className="text-blue-300 font-semibold text-sm mb-1">{data.vsAnalyticsApproach.notReplacement.title}</p>
                  <p className="text-gray-300 text-sm">{data.vsAnalyticsApproach.notReplacement.explanation}</p>
                  {data.vsAnalyticsApproach.notReplacement.analogy && (
                    <p className="text-gray-400 text-xs mt-2 italic">💡 {data.vsAnalyticsApproach.notReplacement.analogy}</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Real World Scenarios */}
      {data.realWorldScenarios && (
        <div className="mb-6 bg-slate-700/50 rounded-lg overflow-hidden">
          <button onClick={() => toggleSection('scenarios')} className="w-full p-4 text-left hover:bg-slate-700 transition flex items-center justify-between">
            <h4 className="text-white font-semibold">{data.realWorldScenarios.title}</h4>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'scenarios' ? 'rotate-180' : ''}`} />
          </button>
          {expandedSection === 'scenarios' && (
            <div className="px-4 pb-4 space-y-4">
              {data.realWorldScenarios.scenarios?.map((s: any, i: number) => (
                <div key={i} className="bg-slate-600/50 rounded-lg p-4">
                  <p className="text-white font-semibold mb-2">🎯 {s.scenario}</p>
                  <p className="text-gray-400 text-sm mb-3">{s.setup}</p>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-red-500/20 rounded p-3">
                      <p className="text-red-300 font-semibold text-sm mb-2">On Traditional Blockchain:</p>
                      <ul className="text-gray-400 text-xs space-y-1">
                        {s.onTraditionalBlockchain?.map((step: string, j: number) => (
                          <li key={j}>{j + 1}. {step}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-emerald-500/20 rounded p-3">
                      <p className="text-emerald-300 font-semibold text-sm mb-2">On SphereNet:</p>
                      <ul className="text-gray-400 text-xs space-y-1">
                        {s.onSphereNet?.map((step: string, j: number) => (
                          <li key={j}>{j + 1}. {step}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {s.keyDifference && (
                    <p className="text-blue-200 text-sm mt-3 bg-blue-500/10 rounded p-2">💡 {s.keyDifference}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Addressing Systemic Risks */}
      {data.addressingSystemicRisks && (
        <div className="mb-6 bg-slate-700/50 rounded-lg overflow-hidden">
          <button onClick={() => toggleSection('systemic')} className="w-full p-4 text-left hover:bg-slate-700 transition flex items-center justify-between">
            <div>
              <h4 className="text-white font-semibold">{data.addressingSystemicRisks.title}</h4>
              {data.addressingSystemicRisks.subtitle && <p className="text-gray-400 text-sm">{data.addressingSystemicRisks.subtitle}</p>}
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'systemic' ? 'rotate-180' : ''}`} />
          </button>
          {expandedSection === 'systemic' && (
            <div className="px-4 pb-4 space-y-4">
              {data.addressingSystemicRisks.risks?.map((r: any, i: number) => (
                <div key={i} className="bg-slate-600/50 rounded-lg p-4">
                  <p className="text-purple-300 font-semibold mb-2">📊 {r.riskCategory}</p>
                  <p className="text-gray-400 text-sm mb-3">{r.problemRecap}</p>
                  <div className="bg-emerald-500/20 rounded p-3">
                    <p className="text-emerald-300 font-semibold text-sm mb-2">SphereNet: {r.sphereNetResponse?.approach}</p>
                    <ul className="text-gray-300 text-xs space-y-1">
                      {r.sphereNetResponse?.mechanisms?.map((m: string, j: number) => (
                        <li key={j}>• {m}</li>
                      ))}
                    </ul>
                    {r.sphereNetResponse?.result && (
                      <p className="text-emerald-200 text-xs mt-2">✅ {r.sphereNetResponse.result}</p>
                    )}
                  </div>
                  {r.limitation && (
                    <p className="text-amber-300 text-xs mt-2">⚠️ Limitation: {r.limitation}</p>
                  )}
                </div>
              ))}

              {/* Summary Table */}
              {data.addressingSystemicRisks.summaryTable && (
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-700">
                        {data.addressingSystemicRisks.summaryTable.headers?.map((h: string, i: number) => (
                          <th key={i} className={`p-2 text-left ${i === 0 ? 'text-white' : i === 1 ? 'text-red-300' : 'text-emerald-300'}`}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.addressingSystemicRisks.summaryTable.rows?.map((row: string[], i: number) => (
                        <tr key={i} className="border-t border-slate-700">
                          {row.map((cell: string, j: number) => (
                            <td key={j} className={`p-2 ${j === 0 ? 'text-white font-medium' : j === 1 ? 'text-red-300' : 'text-emerald-300'}`}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Protocol Level Enforcement */}
      {data.protocolLevelEnforcement && (
        <div className="mb-6 bg-slate-700/50 rounded-lg overflow-hidden">
          <button onClick={() => toggleSection('protocol')} className="w-full p-4 text-left hover:bg-slate-700 transition flex items-center justify-between">
            <h4 className="text-white font-semibold">{data.protocolLevelEnforcement.title}</h4>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'protocol' ? 'rotate-180' : ''}`} />
          </button>
          {expandedSection === 'protocol' && (
            <div className="px-4 pb-4 space-y-4">
              {data.protocolLevelEnforcement.transactionLifecycle && (
                <div className="bg-slate-600/50 rounded p-3">
                  <p className="text-blue-300 font-semibold text-sm mb-2">{data.protocolLevelEnforcement.transactionLifecycle.title}</p>
                  <div className="space-y-2">
                    {data.protocolLevelEnforcement.transactionLifecycle.steps?.map((step: any, i: number) => (
                      <div key={i} className="flex items-start gap-2 bg-slate-700/50 rounded p-2">
                        <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded">{step.step}</span>
                        <div>
                          <p className="text-white text-sm font-medium">{step.name}</p>
                          <p className="text-gray-400 text-xs">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {data.protocolLevelEnforcement.preExecutionChecks && (
                <div className="bg-slate-600/50 rounded p-3">
                  <p className="text-blue-300 font-semibold text-sm mb-2">Pre-Execution Checks</p>
                  <div className="space-y-2">
                    {data.protocolLevelEnforcement.preExecutionChecks.map((check: any, i: number) => (
                      <div key={i} className="bg-slate-700/50 rounded p-2">
                        <p className="text-white text-sm font-medium">{check.check}</p>
                        <p className="text-gray-400 text-xs">{check.description}</p>
                        {check.failureResult && <p className="text-red-300 text-xs">If fails: {check.failureResult}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {data.protocolLevelEnforcement.outcomes && (
                <div className="grid md:grid-cols-4 gap-2">
                  {data.protocolLevelEnforcement.outcomes.map((o: any, i: number) => (
                    <div key={i} className={`rounded p-2 text-center ${
                      o.status === 'APPROVED' || o.status === 'OK' ? 'bg-emerald-500/20' :
                      o.status === 'FLAGGED' || o.status === 'Warning' ? 'bg-amber-500/20' :
                      o.status === 'QUEUED' ? 'bg-blue-500/20' :
                      'bg-red-500/20'
                    }`}>
                      <p className="font-bold text-sm">{o.status}</p>
                      <p className="text-gray-400 text-xs">{o.result}</p>
                    </div>
                  ))}
                </div>
              )}

              {data.protocolLevelEnforcement.keyPoint && (
                <p className="text-emerald-200 text-sm bg-emerald-500/10 rounded p-2">{data.protocolLevelEnforcement.keyPoint}</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Roadmap and Migration */}
      {data.roadmapAndMigration && (
        <div className="mb-4 bg-slate-700/50 rounded-lg overflow-hidden">
          <button onClick={() => toggleSection('roadmap')} className="w-full p-4 text-left hover:bg-slate-700 transition flex items-center justify-between">
            <h4 className="text-white font-semibold">{data.roadmapAndMigration.title}</h4>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'roadmap' ? 'rotate-180' : ''}`} />
          </button>
          {expandedSection === 'roadmap' && (
            <div className="px-4 pb-4 space-y-4">
              {data.roadmapAndMigration.currentState && (
                <div className="bg-blue-500/10 rounded p-3">
                  <p className="text-blue-300 font-semibold text-sm mb-2">{data.roadmapAndMigration.currentState.title}</p>
                  <p className="text-white text-sm">{data.roadmapAndMigration.currentState.status}</p>
                  <p className="text-gray-400 text-xs mt-1">{data.roadmapAndMigration.currentState.infrastructure}</p>
                </div>
              )}

              {data.roadmapAndMigration.roadmap && (
                <div className="space-y-2">
                  {data.roadmapAndMigration.roadmap.map((phase: any, i: number) => (
                    <div key={i} className={`rounded p-3 ${
                      phase.status === 'In Progress' ? 'bg-emerald-500/10' :
                      phase.status === 'Planned' ? 'bg-blue-500/10' :
                      'bg-slate-600/50'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-white font-semibold text-sm">{phase.phase}</p>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          phase.status === 'In Progress' ? 'bg-emerald-500 text-white' :
                          phase.status === 'Planned' ? 'bg-blue-500 text-white' :
                          'bg-slate-600 text-gray-300'
                        }`}>{phase.status}</span>
                      </div>
                      <ul className="text-gray-400 text-xs space-y-1">
                        {phase.milestones?.map((m: string, j: number) => (
                          <li key={j}>• {m}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {data.roadmapAndMigration.strategicRationale?.arnoldQuote && (
                <div className="bg-purple-500/10 rounded p-3">
                  <p className="text-purple-200 italic">"{data.roadmapAndMigration.strategicRationale.arnoldQuote.quote}"</p>
                  <p className="text-purple-400 text-sm mt-1">— {data.roadmapAndMigration.strategicRationale.arnoldQuote.speaker}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SphereUSDTechnicalArchitectureBlock({ data }: { data: any }) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="bg-purple-500/10 rounded-xl p-6 border border-purple-500/30">
      <h3 className="font-semibold text-white mb-2 text-xl">🔧 {data.title}</h3>
      {data.subtitle && <p className="text-purple-300 text-sm mb-4">{data.subtitle}</p>}

      {/* M Token Backing */}
      {data.mTokenBacking && (
        <div className="mb-4 bg-slate-700/50 rounded-lg overflow-hidden">
          <button onClick={() => toggleSection('mToken')} className="w-full p-4 text-left hover:bg-slate-700 transition flex items-center justify-between">
            <h4 className="text-white font-semibold">💰 {data.mTokenBacking.title}</h4>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'mToken' ? 'rotate-180' : ''}`} />
          </button>
          {expandedSection === 'mToken' && (
            <div className="px-4 pb-4 space-y-4">
              {data.mTokenBacking.overview && (
                <p className="text-gray-300 text-sm leading-relaxed">{data.mTokenBacking.overview}</p>
              )}

              {/* M Token Stack Layers */}
              {data.mTokenBacking.mTokenStack?.components && (
                <div className="space-y-2">
                  <p className="text-white font-medium text-sm">{data.mTokenBacking.mTokenStack.title}</p>
                  {data.mTokenBacking.mTokenStack.components.map((c: any, i: number) => (
                    <div key={i} className={`rounded-lg p-3 ${
                      i === 0 ? 'bg-amber-500/10 border-l-4 border-amber-500' :
                      i === 1 ? 'bg-blue-500/10 border-l-4 border-blue-500' :
                      i === 2 ? 'bg-purple-500/10 border-l-4 border-purple-500' :
                      'bg-emerald-500/10 border-l-4 border-emerald-500'
                    }`}>
                      <p className="text-white font-semibold text-sm">{c.layer}</p>
                      <p className="text-gray-300 text-sm">{c.description}</p>
                      {c.backing && <p className="text-amber-400 text-xs mt-1">Backing: {c.backing}</p>}
                      {c.yield && <p className="text-green-400 text-xs">Yield: {c.yield}</p>}
                      {c.verification && <p className="text-blue-400 text-xs mt-1">{c.verification}</p>}
                      {c.mechanism && <p className="text-purple-400 text-xs mt-1">{c.mechanism}</p>}
                      {c.latency && <p className="text-gray-500 text-xs">Latency: {c.latency}</p>}
                      {c.issuance && <p className="text-emerald-400 text-xs mt-1">{c.issuance}</p>}
                      {c.redemption && <p className="text-gray-400 text-xs">{c.redemption}</p>}
                    </div>
                  ))}
                  {data.mTokenBacking.mTokenStack.keyPoint && (
                    <p className="text-amber-200 text-sm bg-amber-500/10 rounded p-2 mt-2">⚠️ {data.mTokenBacking.mTokenStack.keyPoint}</p>
                  )}
                </div>
              )}

              {/* Issuance Flow */}
              {data.mTokenBacking.issuanceFlow?.steps && (
                <div className="mt-4">
                  <p className="text-white font-medium text-sm mb-2">{data.mTokenBacking.issuanceFlow.title}</p>
                  <div className="space-y-1">
                    {data.mTokenBacking.issuanceFlow.steps.map((s: any, i: number) => (
                      <div key={i} className="flex items-start gap-2 bg-slate-600/30 rounded p-2">
                        <span className="bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">{s.step}</span>
                        <div className="flex-1">
                          <p className="text-white text-sm">{s.action}</p>
                          <p className="text-gray-500 text-xs">{s.timing} {s.note && `• ${s.note}`}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {data.mTokenBacking.issuanceFlow.totalTime && (
                    <p className="text-blue-300 text-sm mt-2">⏱️ Total: {data.mTokenBacking.issuanceFlow.totalTime}</p>
                  )}
                </div>
              )}

              {/* What Sphere Controls */}
              {data.mTokenBacking.whatSphereControls && (
                <div className="grid md:grid-cols-2 gap-3 mt-4">
                  <div className="bg-emerald-500/10 rounded-lg p-3">
                    <p className="text-emerald-400 font-semibold text-sm mb-2">✅ Sphere Controls:</p>
                    <ul className="text-gray-300 text-xs space-y-1">
                      {data.mTokenBacking.whatSphereControls.sphereControls?.map((c: string, i: number) => (
                        <li key={i}>• {c}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-red-500/10 rounded-lg p-3">
                    <p className="text-red-400 font-semibold text-sm mb-2">❌ Sphere Does NOT Control:</p>
                    <ul className="text-gray-300 text-xs space-y-1">
                      {data.mTokenBacking.whatSphereControls.sphereDoesNotControl?.map((c: string, i: number) => (
                        <li key={i}>• {c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              {data.mTokenBacking.whatSphereControls?.licensingImplication && (
                <p className="text-purple-200 text-sm bg-purple-500/10 rounded p-2 mt-2">📋 {data.mTokenBacking.whatSphereControls.licensingImplication}</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Yield Distribution */}
      {data.yieldDistribution && (
        <div className="mb-4 bg-slate-700/50 rounded-lg overflow-hidden">
          <button onClick={() => toggleSection('yield')} className="w-full p-4 text-left hover:bg-slate-700 transition flex items-center justify-between">
            <h4 className="text-white font-semibold">📈 {data.yieldDistribution.title}</h4>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'yield' ? 'rotate-180' : ''}`} />
          </button>
          {expandedSection === 'yield' && (
            <div className="px-4 pb-4 space-y-4">
              {/* Yield Origin Flow */}
              {data.yieldDistribution.yieldOrigin?.flow && (
                <div>
                  <p className="text-white font-medium text-sm mb-2">{data.yieldDistribution.yieldOrigin.title}</p>
                  <div className="flex flex-wrap items-center gap-1">
                    {data.yieldDistribution.yieldOrigin.flow.map((f: any, i: number) => (
                      <div key={i} className="flex items-center">
                        <div className="bg-slate-600 rounded px-2 py-1">
                          <p className="text-white text-xs font-semibold">{f.stage}</p>
                          <p className="text-gray-400 text-xs">{f.description}</p>
                        </div>
                        {i < data.yieldDistribution.yieldOrigin.flow.length - 1 && (
                          <span className="text-gray-500 mx-1">→</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Time Weighted Balance */}
              {data.yieldDistribution.timeWeightedBalance && (
                <div className="bg-blue-500/10 rounded-lg p-4">
                  <p className="text-blue-300 font-semibold text-sm mb-2">{data.yieldDistribution.timeWeightedBalance.title}</p>
                  {data.yieldDistribution.timeWeightedBalance.overview && (
                    <p className="text-gray-300 text-sm mb-3">{data.yieldDistribution.timeWeightedBalance.overview}</p>
                  )}

                  {data.yieldDistribution.timeWeightedBalance.definitions && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                      {data.yieldDistribution.timeWeightedBalance.definitions.map((d: any, i: number) => (
                        <div key={i} className="bg-slate-700/50 rounded p-2">
                          <p className="text-blue-400 font-mono text-xs">{d.term}</p>
                          <p className="text-gray-400 text-xs">{d.definition}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {data.yieldDistribution.timeWeightedBalance.formula && (
                    <div className="bg-slate-700 rounded p-3">
                      <p className="text-white text-sm font-semibold mb-1">{data.yieldDistribution.timeWeightedBalance.formula.title}</p>
                      <p className="text-emerald-400 font-mono text-sm mb-1">{data.yieldDistribution.timeWeightedBalance.formula.calculation}</p>
                      <p className="text-gray-500 text-xs">Example: {data.yieldDistribution.timeWeightedBalance.formula.example}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Claim Mechanism */}
              {data.yieldDistribution.claimMechanism && (
                <div className="bg-emerald-500/10 rounded-lg p-4">
                  <p className="text-emerald-300 font-semibold text-sm mb-2">{data.yieldDistribution.claimMechanism.title}</p>
                  {data.yieldDistribution.claimMechanism.overview && (
                    <p className="text-gray-300 text-sm mb-3">{data.yieldDistribution.claimMechanism.overview}</p>
                  )}

                  {data.yieldDistribution.claimMechanism.claimFlow && (
                    <div className="space-y-1 mb-3">
                      {data.yieldDistribution.claimMechanism.claimFlow.map((s: any, i: number) => (
                        <div key={i} className="flex items-center gap-2 bg-slate-700/50 rounded p-2">
                          <span className="bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">{s.step}</span>
                          <div>
                            <span className="text-white text-sm">{s.action}</span>
                            <span className="text-gray-500 text-xs ml-2">→ {s.effect}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {data.yieldDistribution.claimMechanism.taxImplication && (
                    <div className="bg-amber-500/10 rounded p-3">
                      <p className="text-amber-400 font-semibold text-xs mb-1">💰 {data.yieldDistribution.claimMechanism.taxImplication.title}</p>
                      <p className="text-gray-300 text-xs">{data.yieldDistribution.claimMechanism.taxImplication.concept}</p>
                      <p className="text-emerald-400 text-xs mt-1">Benefit: {data.yieldDistribution.claimMechanism.taxImplication.benefit}</p>
                      <p className="text-amber-300 text-xs">⚠️ {data.yieldDistribution.claimMechanism.taxImplication.caveat}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* SPHR Tokenomics */}
      {data.sphrTokenomics && (
        <div className="mb-4 bg-slate-700/50 rounded-lg overflow-hidden">
          <button onClick={() => toggleSection('tokenomics')} className="w-full p-4 text-left hover:bg-slate-700 transition flex items-center justify-between">
            <h4 className="text-white font-semibold">🪙 {data.sphrTokenomics.title}</h4>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'tokenomics' ? 'rotate-180' : ''}`} />
          </button>
          {expandedSection === 'tokenomics' && (
            <div className="px-4 pb-4 space-y-4">
              {/* Overview */}
              {data.sphrTokenomics.overview && (
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-purple-500/20 rounded p-3 text-center">
                    <p className="text-purple-300 text-xs">Total Supply</p>
                    <p className="text-white font-bold">{data.sphrTokenomics.overview.totalSupply}</p>
                  </div>
                  <div className="bg-blue-500/20 rounded p-3 text-center col-span-2">
                    <p className="text-blue-300 text-xs">Purpose</p>
                    <p className="text-white text-sm">{data.sphrTokenomics.overview.purpose}</p>
                  </div>
                </div>
              )}

              {/* Allocations */}
              {data.sphrTokenomics.allocations?.breakdown && (
                <div>
                  <p className="text-white font-medium text-sm mb-2">{data.sphrTokenomics.allocations.title}</p>
                  <div className="space-y-2">
                    {data.sphrTokenomics.allocations.breakdown.map((a: any, i: number) => (
                      <div key={i} className="bg-slate-600/50 rounded p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white font-semibold">{a.category}</span>
                          <span className={`font-bold ${
                            a.category === 'Community Reserve' ? 'text-emerald-400' :
                            a.category === 'Team' ? 'text-blue-400' :
                            a.category === 'Investors' ? 'text-amber-400' :
                            'text-purple-400'
                          }`}>{a.percentage}</span>
                        </div>
                        <p className="text-gray-400 text-xs">{a.vesting}</p>
                        <p className="text-gray-500 text-xs">{a.purpose}</p>
                      </div>
                    ))}
                  </div>
                  {data.sphrTokenomics.allocations.designRationale && (
                    <p className="text-amber-200 text-xs mt-2 bg-amber-500/10 rounded p-2">💡 {data.sphrTokenomics.allocations.designRationale}</p>
                  )}
                </div>
              )}

              {/* Release Schedule */}
              {data.sphrTokenomics.releaseSchedule?.phases && (
                <div>
                  <p className="text-white font-medium text-sm mb-2">{data.sphrTokenomics.releaseSchedule.title}</p>
                  <div className="space-y-2">
                    {data.sphrTokenomics.releaseSchedule.phases.map((p: any, i: number) => (
                      <div key={i} className={`rounded p-3 ${
                        i === 0 ? 'bg-slate-600/50' :
                        i === 1 ? 'bg-emerald-500/10' :
                        i === 2 ? 'bg-blue-500/10' :
                        'bg-purple-500/10'
                      }`}>
                        <div className="flex items-center justify-between">
                          <span className="text-white font-semibold text-sm">{p.era}</span>
                          <span className="text-gray-400 text-xs">{p.duration}</span>
                        </div>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-emerald-400 text-xs">Circulating: {p.circulating}</span>
                          <span className="text-blue-400 text-xs">Inflation: {p.inflation}</span>
                        </div>
                        <p className="text-gray-500 text-xs mt-1">{p.purpose}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Cross-Chain Architecture */}
      {data.crossChainArchitecture && (
        <div className="mb-4 bg-slate-700/50 rounded-lg overflow-hidden">
          <button onClick={() => toggleSection('crosschain')} className="w-full p-4 text-left hover:bg-slate-700 transition flex items-center justify-between">
            <h4 className="text-white font-semibold">🔗 {data.crossChainArchitecture.title}</h4>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'crosschain' ? 'rotate-180' : ''}`} />
          </button>
          {expandedSection === 'crosschain' && (
            <div className="px-4 pb-4 space-y-4">
              {/* Why Ethereum */}
              {data.crossChainArchitecture.whyEthereum && (
                <div className="bg-blue-500/10 rounded-lg p-3">
                  <p className="text-blue-300 font-semibold text-sm mb-2">{data.crossChainArchitecture.whyEthereum.title}</p>
                  <ul className="text-gray-300 text-xs space-y-1">
                    {data.crossChainArchitecture.whyEthereum.reasons?.map((r: string, i: number) => (
                      <li key={i}>• {r}</li>
                    ))}
                  </ul>
                  {data.crossChainArchitecture.whyEthereum.implication && (
                    <p className="text-blue-200 text-xs mt-2 bg-blue-500/10 rounded p-2">{data.crossChainArchitecture.whyEthereum.implication}</p>
                  )}
                </div>
              )}

              {/* Wormhole Integration */}
              {data.crossChainArchitecture.wormholeIntegration?.components && (
                <div>
                  <p className="text-white font-medium text-sm mb-2">{data.crossChainArchitecture.wormholeIntegration.title}</p>
                  <div className="grid md:grid-cols-2 gap-2">
                    {data.crossChainArchitecture.wormholeIntegration.components.map((c: any, i: number) => (
                      <div key={i} className="bg-slate-600/50 rounded p-2">
                        <p className="text-purple-400 font-semibold text-sm">{c.component}</p>
                        <p className="text-gray-300 text-xs">{c.function}</p>
                        <p className="text-gray-500 text-xs">Controller: {c.controller}</p>
                      </div>
                    ))}
                  </div>
                  {data.crossChainArchitecture.wormholeIntegration.latency && (
                    <div className="mt-2 bg-slate-600/30 rounded p-2">
                      <p className="text-gray-400 text-xs">
                        <span className="text-white">Latency:</span> Ethereum→SphereNet: {data.crossChainArchitecture.wormholeIntegration.latency.ethereumToSphereNet} |
                        Internal: {data.crossChainArchitecture.wormholeIntegration.latency.sphereNetInternal}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Future Bridges */}
              {data.crossChainArchitecture.futureBridges && (
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-emerald-500/10 rounded p-3">
                    <p className="text-emerald-400 font-semibold text-xs mb-2">✅ Planned:</p>
                    <ul className="text-gray-300 text-xs space-y-1">
                      {data.crossChainArchitecture.futureBridges.planned?.map((p: string, i: number) => (
                        <li key={i}>• {p}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-red-500/10 rounded p-3">
                    <p className="text-red-400 font-semibold text-xs mb-2">❌ Not Planned:</p>
                    <ul className="text-gray-300 text-xs space-y-1">
                      {data.crossChainArchitecture.futureBridges.notPlanned?.map((p: string, i: number) => (
                        <li key={i}>• {p}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function RegulatorPerspectiveBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">🏛️ {data.title}</h3>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {data.doSay && (
          <div className="bg-emerald-500/20 rounded-lg p-4">
            <p className="text-emerald-300 font-semibold mb-3">✅ Do Say:</p>
            <ul className="text-gray-300 text-sm space-y-3">
              {data.doSay.map((s: string, i: number) => (<li key={i} className="italic">{s}</li>))}
            </ul>
          </div>
        )}
        {data.doNotSay && (
          <div className="bg-red-500/20 rounded-lg p-4">
            <p className="text-red-300 font-semibold mb-2">❌ Don't Say:</p>
            <ul className="text-gray-300 text-sm space-y-2">
              {data.doNotSay.map((s: string, i: number) => (<li key={i} className="italic">{s}</li>))}
            </ul>
          </div>
        )}
      </div>
      {data.sampleResponse && (
        <div className="bg-blue-500/10 rounded-lg p-4">
          <p className="text-blue-300 font-semibold mb-2">Sample Response:</p>
          <p className="text-gray-400 text-sm mb-2 italic">Q: {data.sampleResponse.question}</p>
          <p className="text-gray-300 text-sm">{data.sampleResponse.answer}</p>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// NEW SECTION 3.5 - UAE REGULATORY FRAMEWORK COMPONENTS
// =============================================================================

function WhyUAEMattersBlock({ data }: { data: any }) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">🇦🇪 {data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}

      {data.points && !data.marketContext && (
        <ul className="text-gray-300 text-sm space-y-1 mb-4">
          {data.points.map((p: string, i: number) => <li key={i}>• {p}</li>)}
        </ul>
      )}

      {data.marketContext && (
        <div className="mb-4">
          <h4 className="text-white font-medium mb-3">{data.marketContext.title}</h4>
          <div className="grid md:grid-cols-2 gap-3">
            {data.marketContext.stats?.map((s: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-4">
                <p className="text-emerald-400 font-bold text-lg">{s.metric}</p>
                <p className="text-white">{s.description}</p>
                <p className="text-gray-500 text-sm">{s.context}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.tradeCorridors && (
        <div className="mb-4">
          <h4 className="text-white font-medium mb-2">{data.tradeCorridors.title}</h4>
          <div className="space-y-2">
            {data.tradeCorridors.corridors?.map((c: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-3">
                <span className="text-blue-400 text-sm">{c.route}</span>
                <span className="text-gray-500 text-sm ml-2">({c.volume})</span>
                <p className="text-gray-400 text-sm">{c.description}</p>
                <p className="text-amber-400 text-xs">Pain point: {c.painPoint}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.whyUAEWantsCrypto && (
        <div className="mb-4">
          <button
            onClick={() => setExpandedSection(expandedSection === 'whyCrypto' ? null : 'whyCrypto')}
            className="w-full text-left bg-slate-700/50 rounded-lg p-3 flex items-center justify-between hover:bg-slate-600/50 transition-colors"
          >
            <span className="text-white font-medium">{data.whyUAEWantsCrypto.title}</span>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedSection === 'whyCrypto' ? 'rotate-180' : ''}`} />
          </button>
          {expandedSection === 'whyCrypto' && (
            <div className="mt-2 space-y-2">
              {data.whyUAEWantsCrypto.points?.map((p: any, i: number) => (
                <div key={i} className="bg-slate-700/30 rounded-lg p-3">
                  <p className="text-white text-sm">{p.point}</p>
                  <p className="text-gray-500 text-sm">{p.explanation}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {data.sphereOpportunity && (
        <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
          <h4 className="text-emerald-400 font-medium mb-2">{data.sphereOpportunity.title}</h4>
          <ul className="text-gray-300 text-sm space-y-1">
            {data.sphereOpportunity.points?.map((p: string, i: number) => <li key={i}>✓ {p}</li>)}
          </ul>
        </div>
      )}

      {data.sphereStatus && (
        <div className="bg-slate-700/50 rounded-lg p-4">
          <h4 className="text-amber-400 font-medium mb-2">{data.sphereStatus.title}</h4>
          <p className="text-white text-sm mb-2">{data.sphereStatus.status}</p>
          <ul className="text-gray-400 text-sm space-y-1">
            {data.sphereStatus.whatThisMeans?.map((w: string, i: number) => <li key={i}>• {w}</li>)}
          </ul>
        </div>
      )}

      {data.arnoldQuote && (
        <div className="bg-slate-700/50 rounded-lg p-4 mt-4">
          <p className="text-gray-300 italic">
            "{typeof data.arnoldQuote === 'string' ? data.arnoldQuote : data.arnoldQuote.quote}"
          </p>
          {typeof data.arnoldQuote !== 'string' && data.arnoldQuote.context && (
            <p className="text-gray-500 text-sm mt-2">{data.arnoldQuote.context}</p>
          )}
        </div>
      )}
    </div>
  );
}

function RegulatoryLandscapeBlock({ data }: { data: any }) {
  const [expandedTerritory, setExpandedTerritory] = useState<number | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}

      {data.whyMultipleTerritories && (
        <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
          <h4 className="text-white font-medium mb-2">{data.whyMultipleTerritories.title}</h4>
          <p className="text-gray-400 text-sm">{data.whyMultipleTerritories.explanation}</p>
          {data.whyMultipleTerritories.keyInsight && (
            <p className="text-blue-400 text-sm mt-2">💡 {data.whyMultipleTerritories.keyInsight}</p>
          )}
        </div>
      )}

      {data.territories && (
        <div className="space-y-2 mb-4">
          {data.territories.map((t: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedTerritory(expandedTerritory === i ? null : i)}
                className="w-full p-3 text-left flex items-center justify-between hover:bg-slate-600/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  {t.icon && <span>{t.icon}</span>}
                  <span className="text-white">{t.name}</span>
                  {t.fullName && <span className="text-gray-500 text-sm">({t.fullName})</span>}
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedTerritory === i ? 'rotate-180' : ''}`} />
              </button>
              {expandedTerritory === i && (
                <div className="px-3 pb-3 border-t border-slate-600 pt-3 space-y-2 text-sm">
                  {t.location && <p className="text-gray-400">Location: {t.location}</p>}
                  {t.legalSystem && <p className="text-gray-400">Legal System: {t.legalSystem}</p>}
                  {t.established && <p className="text-gray-400">Established: {t.established}</p>}
                  {t.whatItIs && <p className="text-gray-300">{t.whatItIs}</p>}
                  {t.targetClients && <p className="text-gray-400">Target: {t.targetClients}</p>}
                  {t.cryptoScope && <p className="text-gray-400">Crypto Scope: {t.cryptoScope}</p>}
                  {t.licenseTypes && <p className="text-gray-400">Licenses: {t.licenseTypes.join(', ')}</p>}
                  {t.strengths && (
                    <div>
                      <p className="text-emerald-400 text-xs">Strengths:</p>
                      <ul className="text-gray-400 text-xs">{t.strengths.map((s: string, j: number) => <li key={j}>✓ {s}</li>)}</ul>
                    </div>
                  )}
                  {t.limitations && (
                    <div>
                      <p className="text-amber-400 text-xs">Limitations:</p>
                      <ul className="text-gray-400 text-xs">{t.limitations.map((l: string, j: number) => <li key={j}>• {l}</li>)}</ul>
                    </div>
                  )}
                  {t.sphereRelevance && <p className="text-emerald-400">Sphere: {t.sphereRelevance}</p>}
                  {t.vibeCheck && <p className="text-gray-500 italic text-xs">"{t.vibeCheck}"</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {data.simpleRule && <p className="text-blue-400 text-sm mb-4">📌 {data.simpleRule}</p>}

      {data.comparisonTable && (
        <div className="mb-4 overflow-x-auto">
          <h4 className="text-white font-medium mb-2">{data.comparisonTable.title}</h4>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-600">
                {data.comparisonTable.headers?.map((h: string, i: number) => (
                  <th key={i} className="p-2 text-left text-gray-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.comparisonTable.rows?.map((row: string[], i: number) => (
                <tr key={i} className="border-b border-slate-700/50">
                  {row.map((cell: string, j: number) => (
                    <td key={j} className={`p-2 ${j === 0 ? 'text-white' : 'text-gray-400'}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {data.decisionFramework && (
        <div className="mb-4">
          <h4 className="text-white font-medium mb-2">{data.decisionFramework.title}</h4>
          <div className="space-y-2">
            {data.decisionFramework.scenarios?.map((s: any, i: number) => (
              <div key={i} className="text-sm">
                <span className="text-blue-400 font-medium">{s.recommendation}:</span>
                <span className="text-gray-300 ml-1">{s.scenario}</span>
                <span className="text-gray-500 ml-1">({s.reason})</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.keyInsight && <p className="text-blue-400 text-sm">💡 {data.keyInsight}</p>}
    </div>
  );
}

function VARADeepDiveBlock({ data }: { data: any }) {
  const [expanded, setExpanded] = React.useState(true);
  
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <button onClick={() => setExpanded(!expanded)} className="w-full flex items-center justify-between mb-4">
        <h3 className="font-semibold text-white text-xl">{data.title}</h3>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>
      
      {data.whyVARA && <p className="text-gray-300 mb-4">{data.whyVARA}</p>}
      {data.overview && <p className="text-gray-300 mb-4">{data.overview}</p>}
      
      {expanded && (
        <>
          {data.requirements?.items && (
            <div className="mb-4">
              <h4 className="text-white font-semibold mb-3">{data.requirements.title}</h4>
              <div className="space-y-3">
                {data.requirements.items.map((req: any, i: number) => (
                  <div key={i} className="bg-slate-700/50 rounded-lg p-4">
                    <p className="text-blue-300 font-semibold">{req.requirement}</p>
                    <p className="text-white text-sm mt-1">{req.detail}</p>
                    {req.cost && <p className="text-amber-300 text-xs mt-1">Cost: {req.cost}</p>}
                    {req.note && <p className="text-gray-400 text-xs mt-1">{req.note}</p>}
                    {req.roles && <p className="text-gray-400 text-xs mt-1">Roles: {req.roles.join(', ')}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {data.requirements && Array.isArray(data.requirements) && (
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              {data.requirements.map((req: any, i: number) => (
                <div key={i} className="bg-slate-700/50 rounded-lg p-4">
                  <p className="text-gray-400 text-sm">{req.requirement}</p>
                  <p className="text-white font-semibold">{req.detail}</p>
                </div>
              ))}
            </div>
          )}
          
          {data.timeline && (
            <div className="mb-4">
              <h4 className="text-white font-semibold mb-3">{data.timeline.title}</h4>
              <p className="text-emerald-300 mb-2">Duration: {data.timeline.duration}</p>
              <div className="space-y-2">
                {data.timeline.phases?.map((p: any, i: number) => (
                  <div key={i} className="bg-slate-700/50 rounded-lg p-3 flex items-start gap-3">
                    <span className="bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">{i+1}</span>
                    <div>
                      <p className="text-white font-medium">{p.phase} <span className="text-gray-400 text-sm">({p.duration})</span></p>
                      <p className="text-gray-400 text-sm">{p.activities}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {data.licenseTypes?.types && (
            <div className="mb-4">
              <h4 className="text-white font-semibold mb-3">{data.licenseTypes.title}</h4>
              <div className="space-y-2">
                {data.licenseTypes.types.map((lt: any, i: number) => (
                  <div key={i} className="bg-blue-500/10 rounded-lg p-3">
                    <p className="text-blue-300 font-semibold">{lt.license}</p>
                    <p className="text-gray-300 text-sm">{lt.description}</p>
                    <p className="text-emerald-300 text-xs mt-1">Sphere Use: {lt.sphereUse}</p>
                    <p className="text-amber-300 text-xs">Capital: {lt.capital}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {data.licenseTypes && Array.isArray(data.licenseTypes) && (
            <div className="mt-4 space-y-2">
              {data.licenseTypes.map((lt: any, i: number) => (
                <div key={i} className="bg-blue-500/10 rounded-lg p-3">
                  <p className="text-blue-300 font-semibold">{lt.type || lt.license}</p>
                  <p className="text-gray-300 text-sm">{lt.description}</p>
                </div>
              ))}
            </div>
          )}
          
          {data.advantages && (
            <div className="bg-emerald-500/10 rounded-lg p-4 mb-4">
              <h4 className="text-emerald-300 font-semibold mb-2">Advantages</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                {data.advantages.map((a: string, i: number) => (<li key={i}>✅ {a}</li>))}
              </ul>
            </div>
          )}
          
          {data.limitations && (
            <div className="bg-amber-500/10 rounded-lg p-4">
              <h4 className="text-amber-300 font-semibold mb-2">Limitations</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                {data.limitations.map((l: string, i: number) => (<li key={i}>⚠️ {l}</li>))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function DIFCComparisonBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}
      
      {data.comparisonTable && (
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm">
            <thead><tr className="bg-slate-700">
              {data.comparisonTable.headers?.map((h: string, i: number) => (
                <th key={i} className="text-left p-3 text-gray-300">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {data.comparisonTable.rows?.map((row: any, i: number) => (
                <tr key={i} className="border-t border-slate-700">
                  {Array.isArray(row) ? (
                    row.map((cell: string, j: number) => (
                      <td key={j} className={`p-3 ${j === 0 ? 'text-gray-400' : j === 1 ? 'text-blue-300' : 'text-purple-300'}`}>{cell}</td>
                    ))
                  ) : (
                    <>
                      <td className="p-3 text-gray-400">{row.attribute}</td>
                      <td className="p-3 text-blue-300">{row.vara}</td>
                      <td className="p-3 text-purple-300">{row.difc}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {(data.whenToChooseVARA || data.whenToChooseDIFC) && (
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {data.whenToChooseVARA && (
            <div className="bg-blue-500/10 rounded-lg p-4">
              <h4 className="text-blue-300 font-semibold mb-2">Choose VARA When:</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                {data.whenToChooseVARA.map((r: string, i: number) => (<li key={i}>• {r}</li>))}
              </ul>
            </div>
          )}
          {data.whenToChooseDIFC && (
            <div className="bg-purple-500/10 rounded-lg p-4">
              <h4 className="text-purple-300 font-semibold mb-2">Choose DIFC When:</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                {data.whenToChooseDIFC.map((r: string, i: number) => (<li key={i}>• {r}</li>))}
              </ul>
            </div>
          )}
        </div>
      )}
      
      {data.whenToChoose && (
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="bg-blue-500/10 rounded-lg p-4">
            <h4 className="text-blue-300 font-semibold mb-2">Choose VARA When:</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              {data.whenToChoose.vara?.map((r: string, i: number) => (<li key={i}>• {r}</li>))}
            </ul>
          </div>
          <div className="bg-purple-500/10 rounded-lg p-4">
            <h4 className="text-purple-300 font-semibold mb-2">Choose DIFC When:</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              {data.whenToChoose.difc?.map((r: string, i: number) => (<li key={i}>• {r}</li>))}
            </ul>
          </div>
        </div>
      )}
      
      {data.practicalDifference && (
        <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
          <h4 className="text-white font-semibold mb-3">{data.practicalDifference.title}</h4>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-blue-500/10 rounded p-3">
              <p className="text-blue-300 text-sm italic">"{data.practicalDifference.vara}"</p>
            </div>
            <div className="bg-purple-500/10 rounded p-3">
              <p className="text-purple-300 text-sm italic">"{data.practicalDifference.difc}"</p>
            </div>
          </div>
        </div>
      )}
      
      {data.sphereExample && (
        <div className="bg-emerald-500/10 rounded-lg p-4">
          <h4 className="text-emerald-300 font-semibold mb-3">{data.sphereExample.title}</h4>
          <div className="grid md:grid-cols-2 gap-4">
            {data.sphereExample.varaScenario && (
              <div className="bg-slate-700/50 rounded p-3">
                <p className="text-blue-300 font-semibold mb-2">{data.sphereExample.varaScenario.description}</p>
                <ul className="text-gray-300 text-xs space-y-1">
                  {data.sphereExample.varaScenario.capabilities?.map((c: string, i: number) => (<li key={i}>• {c}</li>))}
                </ul>
              </div>
            )}
            {data.sphereExample.difcScenario && (
              <div className="bg-slate-700/50 rounded p-3">
                <p className="text-purple-300 font-semibold mb-2">{data.sphereExample.difcScenario.description}</p>
                <ul className="text-gray-300 text-xs space-y-1">
                  {data.sphereExample.difcScenario.capabilities?.map((c: string, i: number) => (<li key={i}>• {c}</li>))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ADGMOverviewBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>
      {data.description && <p className="text-gray-300 mb-4">{data.description}</p>}
      {data.overview && <p className="text-gray-300 mb-4">{data.overview}</p>}
      
      {data.requirements?.items && (
        <div className="mb-4">
          <h4 className="text-white font-semibold mb-3">{data.requirements.title}</h4>
          <div className="space-y-2">
            {data.requirements.items.map((req: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-3 flex justify-between items-center">
                <span className="text-gray-300">{req.item || req.requirement}</span>
                <span className="text-white font-semibold">{req.detail}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {data.requirements && Array.isArray(data.requirements) && (
        <div className="space-y-2 mb-4">
          {data.requirements.map((req: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-3 flex justify-between items-center">
              <span className="text-gray-300">{req.requirement || req.item}</span>
              <span className="text-white font-semibold">{req.detail}</span>
            </div>
          ))}
        </div>
      )}
      
      {data.sphereRelevance && (
        <div className="bg-emerald-500/10 rounded-lg p-4">
          <p className="text-emerald-300 text-sm"><span className="font-semibold">Sphere Relevance:</span> {data.sphereRelevance}</p>
        </div>
      )}
    </div>
  );
}

function CBUAERegulationsBlock({ data }: { data: any }) {
  const [expandedProvision, setExpandedProvision] = useState<number | null>(null);
  
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}
      
      {/* Overview */}
      {data.overview && (
        <div className="bg-blue-500/10 rounded-lg p-4 mb-4">
          <h4 className="text-blue-300 font-semibold mb-2">{data.overview.title}</h4>
          <p className="text-gray-300 text-sm mb-2">{data.overview.description}</p>
          {data.overview.whyItMatters && (
            <p className="text-blue-200 text-sm italic">💡 {data.overview.whyItMatters}</p>
          )}
        </div>
      )}
      
      {/* Key Provisions - Expandable */}
      {data.keyProvisions?.provisions && (
        <div className="mb-4">
          <h4 className="text-white font-medium mb-3">{data.keyProvisions.title}</h4>
          <div className="space-y-2">
            {data.keyProvisions.provisions.map((p: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedProvision(expandedProvision === i ? null : i)}
                  className="w-full p-3 text-left flex items-center justify-between hover:bg-slate-700/70"
                >
                  <div className="flex items-center gap-2">
                    {p.icon && <span className="text-lg">{p.icon}</span>}
                    <span className="text-white font-medium">{p.provision}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedProvision === i ? 'rotate-180' : ''}`} />
                </button>
                
                {expandedProvision === i && (
                  <div className="px-3 pb-3 space-y-2">
                    <div className="bg-slate-800/50 rounded p-2">
                      <p className="text-gray-500 text-xs mb-1">What it says:</p>
                      <p className="text-gray-300 text-sm">{p.whatItSays}</p>
                    </div>
                    <div className="bg-slate-800/50 rounded p-2">
                      <p className="text-gray-500 text-xs mb-1">What it means:</p>
                      <p className="text-gray-300 text-sm">{p.whatItMeans}</p>
                    </div>
                    {p.sphereImplication && (
                      <div className="bg-emerald-500/10 rounded p-2">
                        <p className="text-emerald-400 text-xs mb-1">Sphere implication:</p>
                        <p className="text-emerald-300 text-sm">{p.sphereImplication}</p>
                      </div>
                    )}
                    {p.criticalDistinction && (
                      <div className="bg-amber-500/10 rounded p-2">
                        <p className="text-amber-300 text-sm font-medium">⚠️ {p.criticalDistinction}</p>
                      </div>
                    )}
                    {p.currentState && (
                      <p className="text-gray-400 text-xs italic">{p.currentState}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Practical Implications */}
      {data.practicalImplications && (
        <div className="grid md:grid-cols-2 gap-3 mb-4">
          {data.practicalImplications.permitted && (
            <div className="bg-emerald-500/10 rounded-lg p-4">
              <h4 className="text-emerald-300 font-medium mb-2">{data.practicalImplications.permitted.title}</h4>
              <ul className="space-y-1">
                {data.practicalImplications.permitted.items?.map((item: string, i: number) => (
                  <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {data.practicalImplications.restricted && (
            <div className="bg-red-500/20 rounded-lg p-4">
              <h4 className="text-red-300 font-medium mb-2">{data.practicalImplications.restricted.title}</h4>
              <ul className="space-y-1">
                {data.practicalImplications.restricted.items?.map((item: string, i: number) => (
                  <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                    <span className="text-red-400">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      
      {data.practicalImplications?.keyMessage && (
        <div className="bg-blue-500/10 rounded-lg p-3 mb-4">
          <p className="text-blue-200 text-sm">📌 {data.practicalImplications.keyMessage}</p>
        </div>
      )}
      
      {/* Common Misconceptions */}
      {data.commonMisconceptions && (
        <div className="mb-4">
          <h4 className="text-white font-medium mb-2">{data.commonMisconceptions.title}</h4>
          <div className="space-y-2">
            {data.commonMisconceptions.misconceptions?.map((m: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded p-3">
                <p className="text-red-300 text-sm mb-1">❌ {m.wrong}</p>
                <p className="text-emerald-300 text-sm">✓ {m.right}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Legacy support for old format */}
      {data.circular2024 && !data.keyProvisions && (
        <div className="bg-blue-500/10 rounded-lg p-4 mb-4">
          <h4 className="text-blue-300 font-semibold mb-2">{data.circular2024.title}</h4>
          {data.circular2024.description && <p className="text-gray-300 text-sm mb-3">{data.circular2024.description}</p>}
          {data.circular2024.keyProvisions && (
            <div className="space-y-2 mb-3">
              {data.circular2024.keyProvisions.map((p: any, i: number) => (
                <div key={i} className="bg-slate-700/50 rounded p-2">
                  <p className="text-white font-medium text-sm">{p.provision}</p>
                  <p className="text-gray-400 text-xs">{p.detail}</p>
                  {p.sphereImplication && <p className="text-emerald-300 text-xs mt-1">Sphere: {p.sphereImplication}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {data.digitalDirham && (
        <div className="bg-purple-500/10 rounded-lg p-4">
          <h4 className="text-purple-300 font-semibold mb-2">{data.digitalDirham.title}</h4>
          {data.digitalDirham.description && <p className="text-gray-300 text-sm mb-3">{data.digitalDirham.description}</p>}
          {data.digitalDirham.status && <p className="text-gray-300 text-sm mb-3">{data.digitalDirham.status}</p>}
          {data.digitalDirham.implications && (
            <ul className="text-gray-300 text-sm space-y-1 mb-3">
              {data.digitalDirham.implications.map((imp: string, i: number) => (<li key={i}>• {imp}</li>))}
            </ul>
          )}
          {data.digitalDirham.sphereStrategy && (
            <div className="bg-emerald-500/10 rounded p-3">
              <p className="text-emerald-300 text-sm"><span className="font-semibold">Sphere Strategy:</span> {data.digitalDirham.sphereStrategy}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function EntityStructureBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">🏢 {data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-2">{data.subtitle}</p>}
      {data.rationale && <p className="text-gray-300 mb-4">{data.rationale}</p>}
      {data.recommendation && <p className="text-gray-300 mb-4">{data.recommendation}</p>}
      
      {data.entities && (
        <div className="space-y-4 mb-4">
          {data.entities.map((entity: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-blue-500">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-blue-300 font-semibold">{entity.entity || entity.name}</h4>
                {entity.priority && <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded">{entity.priority}</span>}
              </div>
              {entity.territory && <p className="text-gray-400 text-sm">Territory: {entity.territory}</p>}
              {entity.licenses && <p className="text-gray-400 text-sm">Licenses: {entity.licenses.join(', ')}</p>}
              <p className="text-gray-300 text-sm mt-2">{entity.purpose}</p>
              
              {entity.yearOneCost && (
                <div className="bg-slate-600/50 rounded p-3 mt-3">
                  <p className="text-amber-300 text-sm font-semibold mb-2">{entity.yearOneCost.title}</p>
                  <div className="space-y-1 text-xs">
                    {entity.yearOneCost.items?.map((item: any, j: number) => (
                      <div key={j} className="flex justify-between">
                        <span className="text-gray-400">{item.category}</span>
                        <span className="text-white">
                          {item.aed ? `AED ${item.aed.toLocaleString()} (~$${item.usd.toLocaleString()})` : `$${item.usd}`}
                        </span>
                      </div>
                    ))}
                  </div>
                  {entity.yearOneCost.total && (
                    <div className="border-t border-slate-500 mt-2 pt-2 flex justify-between font-semibold">
                      <span className="text-gray-300">Total</span>
                      <span className="text-emerald-300">
                        {entity.yearOneCost.total.aed ? 
                          `AED ${entity.yearOneCost.total.aed.toLocaleString()} (~$${entity.yearOneCost.total.usd.toLocaleString()})` : 
                          `$${entity.yearOneCost.total.usd}`}
                      </span>
                    </div>
                  )}
                </div>
              )}
              
              {entity.costs && (
                <div className="bg-slate-600/50 rounded p-3 mt-3">
                  <p className="text-gray-400 text-sm font-semibold mb-2">Estimated Costs:</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {Object.entries(entity.costs).map(([key, value], j) => (
                      <div key={j}><span className="text-gray-500">{key}:</span><span className="text-white ml-2">{value as string}</span></div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {data.timeline && (
        <div className="mb-4">
          <h4 className="text-white font-semibold mb-3">{data.timeline.title}</h4>
          <div className="space-y-2">
            {data.timeline.phases?.map((p: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-3 flex items-start gap-3">
                <span className="bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">{i+1}</span>
                <div>
                  <p className="text-white font-medium">{p.phase} <span className="text-gray-400 text-sm">({p.months})</span></p>
                  <p className="text-gray-400 text-sm">{p.actions}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {data.totalInvestment && (
        <div className="bg-emerald-500/10 rounded-lg p-4">
          <h4 className="text-emerald-300 font-semibold mb-2">Total Investment</h4>
          <p className="text-white">2-Year: {data.totalInvestment.twoYear}</p>
          <p className="text-gray-400 text-sm">Locked Capital: {data.totalInvestment.lockedCapital}</p>
          {data.totalInvestment.note && <p className="text-gray-500 text-xs mt-2">{data.totalInvestment.note}</p>}
        </div>
      )}
    </div>
  );
}

function ActivityLicenseMappingBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}
      
      {(data.mappings || data.activities) && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="bg-slate-700">
              <th className="text-left p-3 text-gray-300">Activity</th>
              <th className="text-left p-3 text-gray-300">Required License</th>
              <th className="text-left p-3 text-gray-300">Territory</th>
              <th className="text-left p-3 text-gray-300">Notes</th>
            </tr></thead>
            <tbody>
              {(data.mappings || data.activities)?.map((a: any, i: number) => (
                <tr key={i} className="border-t border-slate-700">
                  <td className="p-3 text-white">{a.activity}</td>
                  <td className="p-3 text-blue-300">{a.license}</td>
                  <td className="p-3 text-purple-300">{a.territory}</td>
                  <td className="p-3 text-gray-400">{a.note || a.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function KeyRisksBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">⚠️ {data.title}</h3>
      {data.risks && (
        <div className="space-y-3">
          {data.risks.map((risk: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-amber-500">
              <h4 className="text-amber-300 font-semibold mb-2">{risk.risk}</h4>
              <p className="text-gray-300 text-sm mb-2">{risk.detail}</p>
              {risk.mitigation && (
                <div className="bg-emerald-500/10 rounded p-2">
                  <p className="text-emerald-300 text-sm"><span className="font-semibold">Mitigation:</span> {risk.mitigation}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SampleResponsesBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">💬 {data.title}</h3>
      {data.responses && (
        <div className="space-y-4">
          {data.responses.map((r: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <p className="text-blue-300 font-semibold mb-2">Q: {r.question}</p>
              <p className="text-gray-300 text-sm">{r.answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// =============================================================================
// NEW SECTION 5.4 - COMPETITIVE POSITIONING COMPONENTS
// =============================================================================

function CompetitorCategoriesBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>
      {data.categories && (
        <div className="space-y-4">
          {data.categories.map((cat: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-blue-500">
              <h4 className="text-blue-300 font-semibold mb-2">{cat.category}</h4>
              <p className="text-gray-300 text-sm mb-2">{cat.description}</p>
              <p className="text-gray-500 text-xs mb-2">Examples: {cat.examples?.join(', ')}</p>
              <p className="text-gray-500 text-xs mb-2">When you face them: {cat.whenYouFaceThem}</p>
              <div className="grid md:grid-cols-2 gap-2 text-xs">
                <div className="bg-emerald-500/10 rounded p-2"><span className="text-emerald-400">Their strength:</span><span className="text-gray-300 ml-1">{cat.theirStrength}</span></div>
                <div className="bg-red-500/10 rounded p-2"><span className="text-red-400">Their weakness:</span><span className="text-gray-300 ml-1">{cat.theirWeakness}</span></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CompetitorLandscapeBlock({ data }: { data: any }) {
  const [showHeadToHead, setShowHeadToHead] = useState(false);
  const [expandedComparison, setExpandedComparison] = useState<number | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}

      {data.comparisonTable && (
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-xs">
            <thead><tr className="bg-slate-700">
              {data.comparisonTable.headers?.map((h: string, i: number) => (
                <th key={i} className="text-left p-2 text-gray-300">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {data.comparisonTable.rows?.map((row: string[], i: number) => (
                <tr key={i} className="border-t border-slate-700">
                  {row.map((cell: string, j: number) => (
                    <td key={j} className={`p-2 ${j === 0 ? 'text-white font-medium' : j === 1 ? 'text-emerald-300' : 'text-gray-300'}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {data.keyDifferentiators && (
        <div className="mb-4">
          <h4 className="text-purple-300 font-medium mb-3">{data.keyDifferentiators.title}</h4>
          <div className="space-y-3">
            {data.keyDifferentiators.differentiators?.map((d: any, i: number) => (
              <div key={i} className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/30">
                <h5 className="text-emerald-300 font-semibold mb-2">{d.differentiator}</h5>
                <p className="text-gray-300 text-sm mb-2">{d.explanation}</p>
                {d.proof && (
                  <p className="text-blue-300 text-xs mb-1">📊 Proof: {d.proof}</p>
                )}
                {d.vsCompetitors && (
                  <p className="text-amber-300 text-xs">⚔️ vs Competitors: {d.vsCompetitors}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.headToHead && (
        <div className="border-t border-slate-600 pt-4">
          <button
            onClick={() => setShowHeadToHead(!showHeadToHead)}
            className="w-full flex items-center justify-between p-3 bg-blue-500/10 rounded-lg hover:bg-blue-500/20 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className={`transform transition-transform text-blue-400 ${showHeadToHead ? 'rotate-90' : ''}`}>▶</span>
              <span className="text-blue-300 font-medium">{data.headToHead.title || 'Head-to-Head Comparisons'}</span>
            </div>
            <span className="text-gray-500 text-xs">Click to {showHeadToHead ? 'hide' : 'expand'}</span>
          </button>

          {showHeadToHead && (
            <div className="space-y-3 mt-3">
              {data.headToHead.comparisons?.map((c: any, i: number) => (
                <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedComparison(expandedComparison === i ? null : i)}
                    className="w-full p-4 text-left hover:bg-slate-700/70 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`transform transition-transform ${expandedComparison === i ? 'rotate-90' : ''}`}>▶</span>
                      <h5 className="text-white font-semibold">{c.competitor}</h5>
                    </div>
                    <p className="text-gray-400 text-sm mt-1 ml-5 italic">"{c.theirPitch}"</p>
                  </button>

                  {expandedComparison === i && (
                    <div className="p-4 pt-0 border-t border-slate-600 space-y-3">
                      <div className="grid md:grid-cols-2 gap-2 text-xs">
                        <div className="bg-emerald-500/10 rounded p-3">
                          <span className="text-emerald-400 font-semibold">✅ Sphere advantage:</span>
                          <p className="text-gray-300 mt-1">{c.sphereAdvantage}</p>
                        </div>
                        <div className="bg-red-500/10 rounded p-3">
                          <span className="text-red-400 font-semibold">⚠️ Sphere disadvantage:</span>
                          <p className="text-gray-300 mt-1">{c.sphereDisadvantage}</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-2 text-xs">
                        {c.whenSphereWins && (
                          <div className="bg-purple-500/10 rounded p-3">
                            <span className="text-purple-400 font-semibold">🏆 When Sphere wins:</span>
                            <p className="text-gray-300 mt-1">{c.whenSphereWins}</p>
                          </div>
                        )}
                        {(c.whenBridgeWins || c.whenConduitWins || c.whenBVNKWins || c.whenWiseWins || c.whenAirwallexWins || c.whenRippleWins || c.whenStellarWins || c.whenSWIFTWins) && (
                          <div className="bg-amber-500/10 rounded p-3">
                            <span className="text-amber-400 font-semibold">🤝 When they win:</span>
                            <p className="text-gray-300 mt-1">{c.whenBridgeWins || c.whenConduitWins || c.whenBVNKWins || c.whenWiseWins || c.whenAirwallexWins || c.whenRippleWins || c.whenStellarWins || c.whenSWIFTWins}</p>
                          </div>
                        )}
                      </div>

                      {c.note && (
                        <div className="bg-blue-500/10 rounded p-2">
                          <p className="text-blue-300 text-xs">💡 {c.note}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function VsComparisonBlock({ data }: { data: any }) {
  const [expandedObjection, setExpandedObjection] = useState<number | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}

      {data.comparisonTable && (
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm">
            <thead><tr className="bg-slate-700">
              {data.comparisonTable.headers?.map((h: string, i: number) => (
                <th key={i} className="text-left p-3 text-gray-300">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {data.comparisonTable.rows?.map((row: string[], i: number) => (
                <tr key={i} className="border-t border-slate-700">
                  {row.map((cell: string, j: number) => (
                    <td key={j} className={`p-3 ${j === 0 ? 'text-gray-400' : j === 2 ? 'text-emerald-300' : 'text-gray-300'}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {data.objectionHandling && (
        <div className="border-t border-slate-600 pt-4">
          <h4 className="text-amber-300 font-medium mb-3">{data.objectionHandling.title || 'Objection Handling'}</h4>
          <div className="space-y-3">
            {data.objectionHandling.objections?.map((obj: any, i: number) => (
              <div key={i} className="bg-amber-500/10 rounded-lg overflow-hidden border border-amber-500/30">
                <button
                  onClick={() => setExpandedObjection(expandedObjection === i ? null : i)}
                  className="w-full p-4 text-left hover:bg-amber-500/20 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className={`transform transition-transform text-amber-400 ${expandedObjection === i ? 'rotate-90' : ''}`}>▶</span>
                    <p className="text-amber-300 font-medium">"{obj.objection}"</p>
                  </div>
                  <p className="text-gray-500 text-xs mt-1 ml-5">Click to see response</p>
                </button>
                {expandedObjection === i && (
                  <div className="p-4 pt-0 border-t border-amber-500/30 space-y-2">
                    <p className="text-gray-300 text-sm">{obj.response}</p>
                    <div className="bg-emerald-500/10 rounded p-2">
                      <p className="text-emerald-300 text-xs">💡 Key principle: {obj.keyPoint}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PositioningFrameworkBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}
      {data.audiences && (
        <div className="space-y-4">
          {data.audiences.map((aud: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-purple-500">
              <h4 className="text-purple-300 font-semibold mb-2">{aud.audience}</h4>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="bg-emerald-500/10 rounded p-2"><span className="text-emerald-400 font-semibold">Lead with:</span><p className="text-gray-300">{aud.leadWith}</p></div>
                <div className="bg-red-500/20 rounded p-2"><span className="text-red-400 font-semibold">Avoid:</span><p className="text-gray-300">{aud.avoid}</p></div>
              </div>
              <div className="bg-blue-500/10 rounded p-2 mt-2"><span className="text-blue-400 font-semibold">Key message:</span><p className="text-gray-300 italic">"{aud.keyMessage}"</p></div>
              {aud.proof && (
                <div className="bg-purple-500/10 rounded p-2 mt-2"><span className="text-purple-400 font-semibold">📊 Proof:</span><p className="text-gray-300 text-xs">{aud.proof}</p></div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CustomerFundArchitectureBlock({ data }: { data: any }) {
  const [layersExpanded, setLayersExpanded] = useState(false);
  const [protectionsExpanded, setProtectionsExpanded] = useState(false);
  const [ftxExpanded, setFtxExpanded] = useState(false);
  const [stablecoinExpanded, setStablecoinExpanded] = useState(false);

  return (
    <div className="bg-emerald-500/10 rounded-xl p-6 border border-emerald-500/30">
      <h3 className="font-semibold text-emerald-300 mb-2 text-xl">🏦 {data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}

      {/* Overview */}
      {data.overview && (
        <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
          <p className="text-gray-300 text-sm">{data.overview}</p>
        </div>
      )}

      {/* Why This Matters */}
      {data.whyThisMatters && (
        <div className="bg-amber-500/10 rounded-lg p-4 mb-4 border border-amber-500/30">
          <p className="text-amber-300 text-sm">⚠️ {data.whyThisMatters}</p>
        </div>
      )}

      {/* Three Layer Structure */}
      {data.threeLayerStructure && (
        <div className="mb-4 bg-slate-700/30 rounded-lg overflow-hidden">
          <button
            onClick={() => setLayersExpanded(!layersExpanded)}
            className="w-full p-4 text-left hover:bg-slate-700/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className={`transform transition-transform text-blue-400 ${layersExpanded ? 'rotate-90' : ''}`}>▶</span>
              <h4 className="text-blue-300 font-medium">{data.threeLayerStructure.title}</h4>
            </div>
            <p className="text-gray-500 text-xs mt-1 ml-5">Click to see custody structure</p>
          </button>
          {layersExpanded && (
            <div className="p-4 pt-0 border-t border-slate-600 space-y-3">
              {data.threeLayerStructure.layers?.map((layer: any, i: number) => (
                <div key={i} className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-blue-500">
                  <h5 className="text-white font-medium mb-2">{layer.layer}</h5>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-500">What:</span> <span className="text-gray-300">{layer.what}</span></div>
                    <div><span className="text-gray-500">Holds:</span> <span className="text-gray-300">{layer.holds}</span></div>
                    <div className="bg-blue-500/10 rounded p-2">
                      <span className="text-blue-400 text-xs">Example:</span>
                      <p className="text-blue-300 text-xs">{layer.example}</p>
                    </div>
                    <div className="bg-emerald-500/10 rounded p-2">
                      <span className="text-emerald-400 text-xs">Protection:</span>
                      <p className="text-emerald-300 text-xs">{layer.protection}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Key Protections */}
      {data.keyProtections && (
        <div className="mb-4 bg-emerald-500/10 rounded-lg overflow-hidden border border-emerald-500/30">
          <button
            onClick={() => setProtectionsExpanded(!protectionsExpanded)}
            className="w-full p-4 text-left hover:bg-emerald-500/20 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className={`transform transition-transform text-emerald-400 ${protectionsExpanded ? 'rotate-90' : ''}`}>▶</span>
              <h4 className="text-emerald-300 font-medium">{data.keyProtections.title}</h4>
            </div>
            <p className="text-gray-500 text-xs mt-1 ml-5">Click to see 5 key protections</p>
          </button>
          {protectionsExpanded && (
            <div className="p-4 pt-0 border-t border-emerald-500/30 space-y-3">
              {data.keyProtections.protections?.map((p: any, i: number) => (
                <div key={i} className="bg-slate-700/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-emerald-400">🛡️</span>
                    <h5 className="text-white font-medium">{p.protection}</h5>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{p.detail}</p>
                  <p className="text-emerald-300 text-xs">💡 {p.whyItMatters}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* What Sphere Does NOT Do */}
      {data.whatSphereDoesNOT && (
        <div className="mb-4 bg-red-500/10 rounded-lg p-4 border border-red-500/30">
          <h4 className="text-red-300 font-medium mb-3">{data.whatSphereDoesNOT.title}</h4>
          <ul className="space-y-2">
            {data.whatSphereDoesNOT.items?.map((item: string, i: number) => (
              <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                <span className="text-red-400">❌</span> {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* vs FTX Comparison */}
      {data.vsFTX && (
        <div className="mb-4 bg-slate-700/30 rounded-lg overflow-hidden">
          <button
            onClick={() => setFtxExpanded(!ftxExpanded)}
            className="w-full p-4 text-left hover:bg-slate-700/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className={`transform transition-transform text-amber-400 ${ftxExpanded ? 'rotate-90' : ''}`}>▶</span>
              <h4 className="text-amber-300 font-medium">{data.vsFTX.title}</h4>
            </div>
            <p className="text-gray-500 text-xs mt-1 ml-5">Click to see why Sphere is different</p>
          </button>
          {ftxExpanded && (
            <div className="p-4 pt-0 border-t border-slate-600">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-slate-700">
                      <th className="text-left p-2 text-gray-300">Dimension</th>
                      <th className="text-left p-2 text-red-300">FTX</th>
                      <th className="text-left p-2 text-emerald-300">Sphere</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.vsFTX.comparison?.map((row: any, i: number) => (
                      <tr key={i} className="border-t border-slate-600">
                        <td className="p-2 text-gray-400">{row.dimension}</td>
                        <td className="p-2 text-red-300">{row.ftx}</td>
                        <td className="p-2 text-emerald-300">{row.sphere}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Stablecoin Holdings */}
      {data.stablecoinHoldings && (
        <div className="bg-blue-500/10 rounded-lg overflow-hidden border border-blue-500/30">
          <button
            onClick={() => setStablecoinExpanded(!stablecoinExpanded)}
            className="w-full p-4 text-left hover:bg-blue-500/20 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className={`transform transition-transform text-blue-400 ${stablecoinExpanded ? 'rotate-90' : ''}`}>▶</span>
              <h4 className="text-blue-300 font-medium">{data.stablecoinHoldings.title}</h4>
            </div>
            <p className="text-gray-400 text-sm mt-1 ml-5">{data.stablecoinHoldings.clarification}</p>
          </button>
          {stablecoinExpanded && (
            <div className="p-4 pt-0 border-t border-blue-500/30 space-y-3">
              {data.stablecoinHoldings.points?.map((p: any, i: number) => (
                <div key={i} className="bg-slate-700/50 rounded-lg p-3">
                  <h5 className="text-white font-medium text-sm mb-1">{p.point}</h5>
                  <p className="text-gray-400 text-xs">{p.detail}</p>
                </div>
              ))}
              {data.stablecoinHoldings.keyPoint && (
                <div className="bg-emerald-500/10 rounded p-3">
                  <p className="text-emerald-300 text-sm">💡 {data.stablecoinHoldings.keyPoint}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function WhenToWalkAwayBlock({ data }: { data: any }) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">🚪 {data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}

      {data.scenarios && (
        <div className="space-y-3">
          {data.scenarios.map((s: any, i: number) => (
            <div key={i} className="bg-amber-500/10 rounded-lg overflow-hidden border border-amber-500/30">
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="w-full p-4 text-left hover:bg-amber-500/20 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className={`transform transition-transform text-amber-400 ${expanded === i ? 'rotate-90' : ''}`}>▶</span>
                  <h4 className="text-amber-300 font-medium">{s.scenario}</h4>
                </div>
                <p className="text-gray-500 text-xs mt-1 ml-5">Click to see when to walk away</p>
              </button>
              {expanded === i && (
                <div className="p-4 pt-0 border-t border-amber-500/30 space-y-3">
                  <div>
                    <span className="text-gray-500 text-xs">Why not Sphere:</span>
                    <p className="text-gray-300 text-sm">{s.whyNot}</p>
                  </div>
                  <div className="bg-blue-500/10 rounded p-3">
                    <span className="text-blue-400 text-xs">What to say:</span>
                    <p className="text-blue-300 text-sm italic mt-1">"{s.whatToSay}"</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// =============================================================================
// CORRIDOR ORCHESTRATION & BANK INFRASTRUCTURE COMPONENTS
// =============================================================================

function CorridorOrchestrationEngineBlock({ data }: { data: any }) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="bg-purple-500/10 rounded-xl p-6 border border-purple-500/30">
      <h3 className="font-semibold text-white mb-2 text-xl">🔧 {data.title}</h3>
      {data.subtitle && <p className="text-purple-300 text-sm mb-2">{data.subtitle}</p>}
      {data.overview && <p className="text-gray-300 mb-4">{data.overview}</p>}

      {/* Stablecoin Sandwich */}
      {data.stablecoinSandwich && (
        <div className="mb-4 bg-slate-700/50 rounded-lg overflow-hidden">
          <button onClick={() => toggleSection('sandwich')} className="w-full p-4 text-left hover:bg-slate-700 transition flex items-center justify-between">
            <h4 className="text-white font-semibold">🥪 {data.stablecoinSandwich.title}</h4>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'sandwich' ? 'rotate-180' : ''}`} />
          </button>
          {expandedSection === 'sandwich' && (
            <div className="px-4 pb-4 space-y-3">
              {data.stablecoinSandwich.flow && (
                <div className="bg-emerald-500/10 rounded-lg p-4 text-center">
                  <p className="text-emerald-400 font-mono text-lg">{data.stablecoinSandwich.flow}</p>
                </div>
              )}
              {data.stablecoinSandwich.description && <p className="text-gray-300 text-sm">{data.stablecoinSandwich.description}</p>}
              {data.stablecoinSandwich.capabilities && (
                <div className="grid md:grid-cols-2 gap-2">
                  {data.stablecoinSandwich.capabilities.map((c: string, i: number) => (
                    <div key={i} className="bg-slate-600/50 rounded p-2 text-sm text-gray-300">✓ {c}</div>
                  ))}
                </div>
              )}
              {data.stablecoinSandwich.keyInsight && (
                <p className="text-purple-200 text-sm bg-purple-500/10 rounded p-2">💡 {data.stablecoinSandwich.keyInsight}</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Differentiation Matrix */}
      {data.differentVsCommoditized && (
        <div className="mb-4 bg-slate-700/50 rounded-lg overflow-hidden">
          <button onClick={() => toggleSection('matrix')} className="w-full p-4 text-left hover:bg-slate-700 transition flex items-center justify-between">
            <h4 className="text-white font-semibold">📊 {data.differentVsCommoditized.title}</h4>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'matrix' ? 'rotate-180' : ''}`} />
          </button>
          {expandedSection === 'matrix' && (
            <div className="px-4 pb-4 space-y-3">
              {data.differentVsCommoditized.spherePosition && (
                <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/30">
                  <p className="text-emerald-400 font-bold mb-2">{data.differentVsCommoditized.spherePosition.quadrant}</p>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <p className="text-white text-xs font-semibold mb-1">Why Differentiated:</p>
                      <ul className="text-gray-300 text-xs space-y-1">
                        {data.differentVsCommoditized.spherePosition.whyDifferentiated?.map((d: string, i: number) => (
                          <li key={i}>• {d}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-white text-xs font-semibold mb-1">Why Volume:</p>
                      <ul className="text-gray-300 text-xs space-y-1">
                        {data.differentVsCommoditized.spherePosition.whyVolume?.map((v: string, i: number) => (
                          <li key={i}>• {v}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              {data.differentVsCommoditized.competitors && (
                <div className="grid md:grid-cols-2 gap-2">
                  {data.differentVsCommoditized.competitors.map((c: any, i: number) => (
                    <div key={i} className="bg-slate-600/50 rounded p-2">
                      <p className="text-white text-sm font-semibold">{c.name}</p>
                      <p className="text-gray-400 text-xs">{c.quadrant}: {c.position}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Bundled Capabilities */}
      {data.bundledCapabilities && (
        <div className="mb-4 bg-slate-700/50 rounded-lg overflow-hidden">
          <button onClick={() => toggleSection('bundled')} className="w-full p-4 text-left hover:bg-slate-700 transition flex items-center justify-between">
            <h4 className="text-white font-semibold">📦 {data.bundledCapabilities.title}</h4>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'bundled' ? 'rotate-180' : ''}`} />
          </button>
          {expandedSection === 'bundled' && (
            <div className="px-4 pb-4 space-y-3">
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <p className="text-emerald-400 font-semibold text-sm mb-2">✅ Sphere Features:</p>
                  <div className="space-y-1">
                    {data.bundledCapabilities.sphereFeatures?.map((f: any, i: number) => (
                      <div key={i} className="bg-emerald-500/10 rounded p-2">
                        <p className="text-white text-xs font-semibold">{f.feature}</p>
                        <p className="text-gray-400 text-xs">{f.differentiation}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-red-400 font-semibold text-sm mb-2">❌ Commoditized Offer:</p>
                  <div className="space-y-1">
                    {data.bundledCapabilities.commoditizedOffer?.map((c: string, i: number) => (
                      <div key={i} className="bg-red-500/10 rounded p-2 text-gray-300 text-xs">{c}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Data Flywheel */}
      {data.dataFlywheel && (
        <div className="bg-blue-500/10 rounded-lg p-4">
          <p className="text-blue-400 font-semibold text-sm mb-2">🔄 {data.dataFlywheel.title}</p>
          <p className="text-gray-300 text-sm mb-2">{data.dataFlywheel.concept}</p>
          <div className="flex flex-wrap gap-1">
            {data.dataFlywheel.benefits?.map((b: string, i: number) => (
              <span key={i} className="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded">+ {b}</span>
            ))}
          </div>
          {data.dataFlywheel.analogy && <p className="text-gray-400 text-xs mt-2 italic">{data.dataFlywheel.analogy}</p>}
        </div>
      )}
    </div>
  );
}

function BankFacingInfrastructureBlock({ data }: { data: any }) {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);

  return (
    <div className="bg-blue-500/10 rounded-xl p-6 border border-blue-500/30">
      <h3 className="font-semibold text-white mb-2 text-xl">🏦 {data.title}</h3>
      {data.subtitle && <p className="text-blue-300 text-sm mb-2">{data.subtitle}</p>}
      {data.overview && <p className="text-gray-300 mb-4">{data.overview}</p>}

      {data.muscleCategories && (
        <div className="space-y-2">
          {data.muscleCategories.map((m: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedCategory(expandedCategory === i ? null : i)}
                className="w-full p-3 text-left hover:bg-slate-700 transition flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="bg-blue-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">{i + 1}</span>
                  <span className="text-white font-medium text-sm">{m.category}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedCategory === i ? 'rotate-180' : ''}`} />
              </button>
              {expandedCategory === i && (
                <div className="px-4 pb-3 space-y-2">
                  <div className="bg-emerald-500/10 rounded p-2">
                    <span className="text-emerald-400 text-xs font-semibold">Output: </span>
                    <span className="text-gray-300 text-xs">{m.output}</span>
                  </div>
                  <div className="bg-slate-600/50 rounded p-2">
                    <span className="text-gray-400 text-xs font-semibold">Includes: </span>
                    <span className="text-gray-300 text-xs">{m.includes}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {data.whyThisMatters && (
        <p className="text-blue-200 text-sm bg-blue-500/10 rounded p-3 mt-4">💡 {data.whyThisMatters}</p>
      )}
    </div>
  );
}

function BISImplicationsBlock({ data }: { data: any }) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="bg-amber-500/10 rounded-xl p-6 border border-amber-500/30">
      <h3 className="font-semibold text-white mb-2 text-xl">🏛️ {data.title}</h3>
      {data.subtitle && <p className="text-amber-300 text-sm mb-2">{data.subtitle}</p>}
      {data.overview && <p className="text-gray-300 mb-4">{data.overview}</p>}

      {/* BIS Critique */}
      {data.bisCritique && (
        <div className="mb-4 bg-slate-700/50 rounded-lg overflow-hidden">
          <button onClick={() => toggleSection('critique')} className="w-full p-4 text-left hover:bg-slate-700 transition flex items-center justify-between">
            <h4 className="text-white font-semibold">⚠️ {data.bisCritique.title}</h4>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'critique' ? 'rotate-180' : ''}`} />
          </button>
          {expandedSection === 'critique' && (
            <div className="px-4 pb-4 space-y-2">
              {data.bisCritique.threeTests?.map((t: any, i: number) => (
                <div key={i} className="bg-red-500/10 rounded p-3">
                  <p className="text-red-400 font-semibold text-sm">{t.test}</p>
                  <p className="text-gray-300 text-xs">Failure: {t.failure}</p>
                  <p className="text-amber-400 text-xs">→ {t.implication}</p>
                </div>
              ))}
              {data.bisCritique.sphereImplication && (
                <p className="text-emerald-200 text-sm bg-emerald-500/10 rounded p-2">✅ {data.bisCritique.sphereImplication}</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Regulatory Trajectory */}
      {data.regulatoryTrajectory && (
        <div className="mb-4 bg-slate-700/50 rounded-lg p-4">
          <p className="text-white font-semibold text-sm mb-2">📈 Regulatory Trajectory:</p>
          <ul className="space-y-1">
            {data.regulatoryTrajectory.map((r: string, i: number) => (
              <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                <span className="text-amber-400">→</span> {r}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* SphereNet Alignment */}
      {data.sphereNetAlignment && (
        <div className="mb-4 bg-slate-700/50 rounded-lg overflow-hidden">
          <button onClick={() => toggleSection('alignment')} className="w-full p-4 text-left hover:bg-slate-700 transition flex items-center justify-between">
            <h4 className="text-white font-semibold">✅ {data.sphereNetAlignment.title}</h4>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'alignment' ? 'rotate-180' : ''}`} />
          </button>
          {expandedSection === 'alignment' && (
            <div className="px-4 pb-4 space-y-2">
              {data.sphereNetAlignment.alignments?.map((a: any, i: number) => (
                <div key={i} className="grid grid-cols-2 gap-2 bg-slate-600/50 rounded p-2">
                  <div className="text-amber-300 text-xs">{a.bisRequirement}</div>
                  <div className="text-emerald-300 text-xs">→ {a.sphereNetResponse}</div>
                </div>
              ))}
              {data.sphereNetAlignment.strategicPosition && (
                <p className="text-purple-200 text-sm bg-purple-500/10 rounded p-2 mt-2">🎯 {data.sphereNetAlignment.strategicPosition}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// =============================================================================
// NEW SECTION 5.5 - BOB AND AHMED EXPANDED COMPONENTS
// =============================================================================

function BobAndAhmedExpandedBlock({ data }: { data: any }) {
  const [setupExpanded, setSetupExpanded] = useState(true);
  const [problemExpanded, setProblemExpanded] = useState(false);
  const [costExpanded, setCostExpanded] = useState(false);
  const [kickerExpanded, setKickerExpanded] = useState(false);
  const [approachExpanded, setApproachExpanded] = useState(false);
  const [statisticExpanded, setStatisticExpanded] = useState(false);
  const [tipsExpanded, setTipsExpanded] = useState(false);

  return (
    <div className="bg-orange-500/10 rounded-xl p-6 border border-orange-500/30">
      <div className="mb-4">
        <h3 className="font-semibold text-white text-xl">📖 {data.title}</h3>
        {data.subtitle && <p className="text-orange-300 text-sm mt-1">{data.subtitle}</p>}
        {data.speaker && <p className="text-gray-500 text-xs mt-1">— {data.speaker}</p>}
      </div>

      {data.context && (
        <div className="bg-slate-700/50 rounded-lg p-3 mb-4">
          <p className="text-gray-400 text-sm italic">{data.context}</p>
        </div>
      )}

      <div className="space-y-3">
        {/* Setup: Bob and Ahmed */}
        {data.setup && (
          <div className="bg-slate-700/30 rounded-lg overflow-hidden">
            <button
              onClick={() => setSetupExpanded(!setupExpanded)}
              className="w-full p-4 text-left hover:bg-slate-700/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className={`transform transition-transform text-blue-400 ${setupExpanded ? 'rotate-90' : ''}`}>▶</span>
                <h4 className="text-blue-300 font-medium">{data.setup.title}</h4>
              </div>
              <p className="text-gray-500 text-xs mt-1 ml-5">Meet the two characters in this story</p>
            </button>
            {setupExpanded && (
              <div className="p-4 pt-0 border-t border-slate-600">
                <div className="grid md:grid-cols-2 gap-4">
                  {data.setup.bob && (
                    <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">🇺🇸</span>
                        <div>
                          <h5 className="text-blue-300 font-semibold">{data.setup.bob.name}, {data.setup.bob.age}</h5>
                          <p className="text-gray-500 text-xs">{data.setup.bob.location}</p>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{data.setup.bob.business}</p>
                      {data.setup.bob.situation && (
                        <p className="text-gray-400 text-xs italic border-t border-blue-500/30 pt-2 mt-2">{data.setup.bob.situation}</p>
                      )}
                    </div>
                  )}
                  {data.setup.ahmed && (
                    <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">🇳🇬</span>
                        <div>
                          <h5 className="text-emerald-300 font-semibold">{data.setup.ahmed.name}, {data.setup.ahmed.age}</h5>
                          <p className="text-gray-500 text-xs">{data.setup.ahmed.location}</p>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{data.setup.ahmed.business}</p>
                      {data.setup.ahmed.situation && (
                        <p className="text-gray-400 text-xs italic border-t border-emerald-500/30 pt-2 mt-2">{data.setup.ahmed.situation}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* The Problem */}
        {data.theProblem && (
          <div className="bg-red-500/10 rounded-lg overflow-hidden border border-red-500/30">
            <button
              onClick={() => setProblemExpanded(!problemExpanded)}
              className="w-full p-4 text-left hover:bg-red-500/20 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className={`transform transition-transform text-red-400 ${problemExpanded ? 'rotate-90' : ''}`}>▶</span>
                <h4 className="text-red-300 font-medium">{data.theProblem.title}</h4>
              </div>
              <p className="text-gray-400 text-sm mt-1 ml-5">{data.theProblem.description}</p>
            </button>
            {problemExpanded && (
              <div className="p-4 pt-0 border-t border-red-500/30 space-y-3">
                {data.theProblem.timeline && (
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-slate-700/50 rounded p-3">
                      <span className="text-gray-500 text-xs">What banks tell you:</span>
                      <p className="text-gray-300 font-medium">{data.theProblem.timeline.stated}</p>
                    </div>
                    <div className="bg-red-500/20 rounded p-3">
                      <span className="text-red-400 text-xs">What actually happens:</span>
                      <p className="text-red-300 font-medium">{data.theProblem.timeline.reality}</p>
                    </div>
                  </div>
                )}
                {data.theProblem.timeline?.arnoldQuote && (
                  <div className="bg-purple-500/10 rounded p-3">
                    <p className="text-purple-300 italic text-sm">"{data.theProblem.timeline.arnoldQuote}"</p>
                  </div>
                )}
                {data.theProblem.whyItTakesLong && (
                  <div>
                    <span className="text-gray-500 text-xs">Why it takes so long:</span>
                    <ul className="mt-2 space-y-1">
                      {data.theProblem.whyItTakesLong.map((reason: string, i: number) => (
                        <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                          <span className="text-red-400">•</span> {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* The Real Cost */}
        {data.theRealCost && (
          <div className="bg-amber-500/10 rounded-lg overflow-hidden border border-amber-500/30">
            <button
              onClick={() => setCostExpanded(!costExpanded)}
              className="w-full p-4 text-left hover:bg-amber-500/20 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className={`transform transition-transform text-amber-400 ${costExpanded ? 'rotate-90' : ''}`}>▶</span>
                <h4 className="text-amber-300 font-medium">{data.theRealCost.title}</h4>
              </div>
              <p className="text-gray-500 text-xs mt-1 ml-5">Click to see the hidden costs of delay</p>
            </button>
            {costExpanded && (
              <div className="p-4 pt-0 border-t border-amber-500/30 space-y-3">
                {data.theRealCost.costs?.map((cost: any, i: number) => (
                  <div key={i} className="bg-slate-700/50 rounded-lg p-3">
                    <h5 className="text-amber-300 font-medium mb-1">💰 {cost.cost}</h5>
                    <p className="text-gray-300 text-sm">{cost.explanation}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* The Kicker */}
        {data.theKicker && (
          <div className="bg-purple-500/10 rounded-lg overflow-hidden border border-purple-500/30">
            <button
              onClick={() => setKickerExpanded(!kickerExpanded)}
              className="w-full p-4 text-left hover:bg-purple-500/20 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className={`transform transition-transform text-purple-400 ${kickerExpanded ? 'rotate-90' : ''}`}>▶</span>
                <h4 className="text-purple-300 font-medium">{data.theKicker.title}</h4>
              </div>
              {data.theKicker.arnoldQuote && (
                <p className="text-gray-400 text-sm mt-1 ml-5 italic">"{data.theKicker.arnoldQuote}"</p>
              )}
            </button>
            {kickerExpanded && (
              <div className="p-4 pt-0 border-t border-purple-500/30 space-y-3">
                {data.theKicker.explanation && (
                  <p className="text-gray-300 text-sm">{data.theKicker.explanation}</p>
                )}
                {data.theKicker.realObstacles?.map((obs: any, i: number) => (
                  <div key={i} className="bg-slate-700/50 rounded-lg p-3">
                    <h5 className="text-purple-300 font-medium mb-1">🚧 {obs.obstacle}</h5>
                    <p className="text-gray-400 text-sm">{obs.detail}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* The Approach */}
        {data.theApproach && (
          <div className="bg-emerald-500/10 rounded-lg overflow-hidden border border-emerald-500/30">
            <button
              onClick={() => setApproachExpanded(!approachExpanded)}
              className="w-full p-4 text-left hover:bg-emerald-500/20 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className={`transform transition-transform text-emerald-400 ${approachExpanded ? 'rotate-90' : ''}`}>▶</span>
                <h4 className="text-emerald-300 font-medium">{data.theApproach.title}</h4>
              </div>
              {data.theApproach.introduction && (
                <p className="text-gray-400 text-sm mt-1 ml-5">{data.theApproach.introduction}</p>
              )}
            </button>
            {approachExpanded && (
              <div className="p-4 pt-0 border-t border-emerald-500/30 space-y-3">
                <div className="grid md:grid-cols-2 gap-4">
                  {data.theApproach.bottomUp && (
                    <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
                      <h5 className="text-blue-300 font-semibold mb-2">⬆️ {data.theApproach.bottomUp.name}</h5>
                      <p className="text-gray-300 text-sm mb-2">{data.theApproach.bottomUp.description}</p>
                      {data.theApproach.bottomUp.challenge && (
                        <p className="text-amber-300 text-xs mb-2">⚠️ Challenge: {data.theApproach.bottomUp.challenge}</p>
                      )}
                      {data.theApproach.bottomUp.sphereExperience && (
                        <p className="text-purple-300 text-xs italic border-t border-blue-500/30 pt-2">{data.theApproach.bottomUp.sphereExperience}</p>
                      )}
                    </div>
                  )}
                  {data.theApproach.topDown && (
                    <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/30">
                      <h5 className="text-emerald-300 font-semibold mb-2">⬇️ {data.theApproach.topDown.name}</h5>
                      <p className="text-gray-300 text-sm mb-2">{data.theApproach.topDown.description}</p>
                      {data.theApproach.topDown.challenge && (
                        <p className="text-amber-300 text-xs mb-2">⚠️ Challenge: {data.theApproach.topDown.challenge}</p>
                      )}
                      {data.theApproach.topDown.sphereExperience && (
                        <p className="text-purple-300 text-xs italic border-t border-emerald-500/30 pt-2">{data.theApproach.topDown.sphereExperience}</p>
                      )}
                    </div>
                  )}
                </div>
                {data.theApproach.truth && (
                  <div className="bg-purple-500/20 rounded-lg p-3">
                    <h5 className="text-purple-300 font-medium mb-2">{data.theApproach.truth.title}</h5>
                    <p className="text-purple-200 italic text-sm">"{data.theApproach.truth.arnoldQuote}"</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* One-Third Statistic */}
        {data.oneThirdStatistic && (
          <div className="bg-amber-500/10 rounded-lg overflow-hidden border border-amber-500/30">
            <button
              onClick={() => setStatisticExpanded(!statisticExpanded)}
              className="w-full p-4 text-left hover:bg-amber-500/20 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className={`transform transition-transform text-amber-400 ${statisticExpanded ? 'rotate-90' : ''}`}>▶</span>
                <h4 className="text-amber-300 font-medium">{data.oneThirdStatistic.title}</h4>
              </div>
              <p className="text-white text-2xl font-bold mt-2 ml-5">{data.oneThirdStatistic.stat}</p>
            </button>
            {statisticExpanded && (
              <div className="p-4 pt-0 border-t border-amber-500/30 space-y-3">
                <p className="text-gray-300 text-sm">{data.oneThirdStatistic.context}</p>
                {data.oneThirdStatistic.implication && (
                  <p className="text-emerald-300 text-sm">💡 {data.oneThirdStatistic.implication}</p>
                )}
                {data.oneThirdStatistic.arnoldQuote && (
                  <div className="bg-purple-500/10 rounded p-3">
                    <p className="text-purple-300 italic text-sm">"{data.oneThirdStatistic.arnoldQuote}"</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* How to Tell This Story */}
        {data.howToTellThisStory && (
          <div className="bg-blue-500/10 rounded-lg overflow-hidden border border-blue-500/30">
            <button
              onClick={() => setTipsExpanded(!tipsExpanded)}
              className="w-full p-4 text-left hover:bg-blue-500/20 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className={`transform transition-transform text-blue-400 ${tipsExpanded ? 'rotate-90' : ''}`}>▶</span>
                <h4 className="text-blue-300 font-medium">{data.howToTellThisStory.title}</h4>
              </div>
              <p className="text-gray-500 text-xs mt-1 ml-5">Practical tips for delivering this story</p>
            </button>
            {tipsExpanded && (
              <div className="p-4 pt-0 border-t border-blue-500/30 space-y-3">
                {data.howToTellThisStory.tips && (
                  <div>
                    <span className="text-gray-500 text-xs">Story Tips:</span>
                    <ul className="mt-2 space-y-2">
                      {data.howToTellThisStory.tips.map((tip: string, i: number) => (
                        <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                          <span className="text-emerald-400">✓</span> {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {data.howToTellThisStory.whenToUse && (
                  <div className="border-t border-blue-500/30 pt-3">
                    <span className="text-gray-500 text-xs">When to use this story:</span>
                    <ul className="mt-2 space-y-1">
                      {data.howToTellThisStory.whenToUse.map((when: string, i: number) => (
                        <li key={i} className="text-blue-300 text-sm flex items-start gap-2">
                          <span className="text-blue-400">→</span> {when}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function BobAndAhmedBlock({ data }: { data: any }) {
  const [expanded, setExpanded] = React.useState(true);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <button onClick={() => setExpanded(!expanded)} className="w-full flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-white text-xl">📖 {data.title}</h3>
          {data.subtitle && <p className="text-gray-400 text-sm">{data.subtitle}</p>}
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>

      {expanded && (
        <div className="space-y-4">
          {data.setup && (
            <div className="grid md:grid-cols-2 gap-4">
              {data.setup.bob && (
                <div className="bg-blue-500/10 rounded-lg p-4">
                  <h5 className="text-blue-300 font-semibold mb-2">🇺🇸 {data.setup.bob.name}</h5>
                  <p className="text-gray-400 text-sm">{data.setup.bob.location}</p>
                  <p className="text-gray-300 text-sm mt-2">{data.setup.bob.business}</p>
                </div>
              )}
              {data.setup.ahmed && (
                <div className="bg-emerald-500/10 rounded-lg p-4">
                  <h5 className="text-emerald-300 font-semibold mb-2">🇳🇬 {data.setup.ahmed.name}</h5>
                  <p className="text-gray-400 text-sm">{data.setup.ahmed.location}</p>
                  <p className="text-gray-300 text-sm mt-2">{data.setup.ahmed.business}</p>
                </div>
              )}
            </div>
          )}

          {data.theProblem && (
            <div className="bg-red-500/20 rounded-lg p-4">
              <h4 className="text-red-300 font-semibold mb-2">{data.theProblem.title}</h4>
              <p className="text-gray-300 text-sm mb-2">{data.theProblem.description}</p>
              {data.theProblem.arnoldQuote && (
                <p className="text-purple-300 italic text-sm">"{data.theProblem.arnoldQuote}"</p>
              )}
            </div>
          )}

          {data.theApproach && (
            <div className="grid md:grid-cols-2 gap-4">
              {data.theApproach.bottomUp && (
                <div className="bg-blue-500/10 rounded-lg p-4">
                  <h5 className="text-blue-300 font-semibold">{data.theApproach.bottomUp.name}</h5>
                  <p className="text-gray-300 text-sm mt-2">{data.theApproach.bottomUp.description}</p>
                </div>
              )}
              {data.theApproach.topDown && (
                <div className="bg-emerald-500/10 rounded-lg p-4">
                  <h5 className="text-emerald-300 font-semibold">{data.theApproach.topDown.name}</h5>
                  <p className="text-gray-300 text-sm mt-2">{data.theApproach.topDown.description}</p>
                </div>
              )}
            </div>
          )}

          {data.oneThirdStatistic && (
            <div className="bg-amber-500/10 rounded-lg p-4">
              <h4 className="text-amber-300 font-semibold mb-2">{data.oneThirdStatistic.title}</h4>
              <p className="text-white text-xl font-bold mb-2">{data.oneThirdStatistic.stat}</p>
              <p className="text-gray-300 text-sm">{data.oneThirdStatistic.context}</p>
            </div>
          )}

          {data.howToTellThisStory && (
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">{data.howToTellThisStory.title}</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                {data.howToTellThisStory.tips?.map((tip: string, i: number) => (<li key={i}>• {tip}</li>))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CustomerProfilesBlock({ data }: { data: any }) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}

      {data.profiles && (
        <div className="space-y-3">
          {data.profiles.map((profile: any, i: number) => (
            <div key={i} className="bg-purple-500/10 rounded-lg overflow-hidden border border-purple-500/30">
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="w-full p-4 text-left hover:bg-purple-500/20 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className={`transform transition-transform text-purple-400 ${expanded === i ? 'rotate-90' : ''}`}>▶</span>
                  <h4 className="text-purple-300 font-semibold">{profile.segment}</h4>
                </div>
                <p className="text-gray-400 text-sm mt-1 ml-5">{profile.description}</p>
              </button>
              {expanded === i && (
                <div className="p-4 pt-0 border-t border-purple-500/30 space-y-3">
                  {profile.need && (
                    <div>
                      <span className="text-gray-500 text-xs">What they need:</span>
                      <p className="text-amber-300 text-sm">{profile.need}</p>
                    </div>
                  )}
                  {profile.example && (
                    <div className="bg-blue-500/10 rounded p-3">
                      <span className="text-blue-400 text-xs">Example:</span>
                      <p className="text-blue-300 text-sm">{profile.example}</p>
                    </div>
                  )}
                  {profile.whySphere && (
                    <div className="bg-emerald-500/10 rounded p-3">
                      <span className="text-emerald-400 text-xs">Why Sphere:</span>
                      <p className="text-emerald-300 text-sm">{profile.whySphere}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function GeographicFocusBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {data.sending && (
          <div className="bg-blue-500/10 rounded-lg p-4">
            <h4 className="text-blue-300 font-semibold mb-3">{data.sending.title}</h4>
            <div className="space-y-1">
              {data.sending.countries?.map((c: any, i: number) => (
                <div key={i} className="flex justify-between text-sm"><span className="text-gray-300">{c.country}</span><span className="text-white font-semibold">{c.percentage}</span></div>
              ))}
            </div>
          </div>
        )}
        {data.receiving && (
          <div className="bg-emerald-500/10 rounded-lg p-4">
            <h4 className="text-emerald-300 font-semibold mb-3">{data.receiving.title}</h4>
            <div className="space-y-1">
              {data.receiving.countries?.map((c: any, i: number) => (
                <div key={i} className="flex justify-between text-sm"><span className="text-gray-300">{c.country}</span><span className="text-white font-semibold">{c.percentage}</span></div>
              ))}
            </div>
          </div>
        )}
      </div>
      {data.insight && <p className="text-purple-200 text-sm mt-4 italic">{data.insight}</p>}
    </div>
  );
}

// =============================================================================
// NEW SECTION 5.6 - SPHERENET INFRASTRUCTURE COMPONENTS
// =============================================================================

function WhatIsSphereNetBlock({ data }: { data: any }) {
  const [timelineExpanded, setTimelineExpanded] = React.useState(false);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">🌐 {data.title}</h3>
      {data.definition && <p className="text-gray-300 mb-4">{data.definition}</p>}

      {data.notJustAnotherBlockchain && (
        <div className="bg-amber-500/10 rounded-lg p-4 mb-4">
          <h4 className="text-amber-300 font-semibold mb-2">{data.notJustAnotherBlockchain.title}</h4>
          <p className="text-gray-300 text-sm mb-3">{data.notJustAnotherBlockchain.problem}</p>
          {data.notJustAnotherBlockchain.gap && (
            <div className="mb-3">
              <p className="text-amber-200 text-xs font-semibold mb-2">The Gap:</p>
              <ul className="text-gray-400 text-sm space-y-1">
                {data.notJustAnotherBlockchain.gap.map((g: string, i: number) => (<li key={i}>• {g}</li>))}
              </ul>
            </div>
          )}
          {data.notJustAnotherBlockchain.solution && (
            <div className="bg-emerald-500/20 rounded p-3 mt-3">
              <p className="text-emerald-300 text-sm font-medium">Solution:</p>
              <p className="text-emerald-200 text-sm">{data.notJustAnotherBlockchain.solution}</p>
            </div>
          )}
        </div>
      )}

      {data.positioning && (
        <div className="bg-purple-500/10 rounded-lg p-4 mb-4">
          <p className="text-purple-300 font-bold text-lg mb-2">{data.positioning.tagline}</p>
          <p className="text-gray-300 text-sm mb-4">{data.positioning.explanation}</p>
          {data.positioning.comparison && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="bg-purple-500/20">
                  {data.positioning.comparison.headers?.map((h: string, i: number) => (
                    <th key={i} className="text-left p-2 text-purple-200 text-xs">{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {data.positioning.comparison.rows?.map((row: string[], i: number) => (
                    <tr key={i} className="border-t border-purple-500/20">
                      {row.map((cell: string, j: number) => (
                        <td key={j} className={`p-2 text-xs ${j === 0 ? 'text-gray-400 font-medium' : j === 1 ? 'text-gray-400' : 'text-emerald-300'}`}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {data.timeline && (
        <div className="bg-blue-500/10 rounded-lg overflow-hidden">
          <button
            onClick={() => setTimelineExpanded(!timelineExpanded)}
            className="w-full p-4 flex items-center justify-between hover:bg-blue-500/20 transition"
          >
            <h4 className="text-blue-300 font-semibold">{data.timeline.title}</h4>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-xs">Click to {timelineExpanded ? 'collapse' : 'expand'}</span>
              <ChevronDown className={`w-5 h-5 text-blue-400 transition-transform ${timelineExpanded ? 'rotate-180' : ''}`} />
            </div>
          </button>
          {timelineExpanded && (
            <div className="px-4 pb-4 space-y-2">
              {data.timeline.milestones?.map((m: any, i: number) => (
                <div key={i} className={`rounded-lg p-3 border-l-4 ${m.status === 'Completed' ? 'bg-emerald-500/10 border-emerald-500' : m.status === 'In Progress' ? 'bg-blue-500/10 border-blue-500' : m.status === 'Planned' ? 'bg-amber-500/10 border-amber-500' : 'bg-purple-500/10 border-purple-500'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-semibold text-sm">{m.phase}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${m.status === 'Completed' ? 'bg-emerald-500/30 text-emerald-300' : m.status === 'In Progress' ? 'bg-blue-500/30 text-blue-300' : m.status === 'Planned' ? 'bg-amber-500/30 text-amber-300' : 'bg-purple-500/30 text-purple-300'}`}>{m.status}</span>
                  </div>
                  <p className="text-gray-300 text-sm">{m.description}</p>
                  {m.context && <p className="text-gray-500 text-xs mt-1 italic">{m.context}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function HyperliquidPlaybookBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">📋 {data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}
      {data.strategy && (
        <div>
          <div className="bg-red-500/10 rounded-lg p-3 mb-3">
            <p className="text-red-300 text-xs font-semibold mb-1">The Problem:</p>
            <p className="text-gray-300 text-sm">{data.strategy.problem}</p>
          </div>
          <div className="bg-emerald-500/10 rounded-lg p-3 mb-4">
            <p className="text-emerald-300 text-xs font-semibold mb-1">The Solution:</p>
            <p className="text-emerald-200 text-sm">{data.strategy.solution}</p>
          </div>
          <div className="space-y-2 mb-4">
            {data.strategy.steps?.map((s: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-3 flex items-start gap-3">
                <span className="bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">{s.step}</span>
                <div>
                  <p className="text-white font-medium">{s.action}</p>
                  <p className="text-gray-400 text-sm">{s.result}</p>
                  {s.context && <p className="text-blue-300 text-xs mt-1 italic">{s.context}</p>}
                </div>
              </div>
            ))}
          </div>
          {data.strategy.keyInsight && (
            <div className="bg-purple-500/10 rounded-lg p-4 border-l-4 border-purple-500">
              <p className="text-purple-300 text-xs font-semibold mb-1">Key Insight:</p>
              <p className="text-purple-200 text-sm">{data.strategy.keyInsight}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ThreeCorePrinciplesBlock({ data }: { data: any }) {
  const [expandedPrinciple, setExpandedPrinciple] = React.useState<number | null>(0);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}

      <div className="space-y-3">
        {data.principles?.map((p: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg border border-slate-600 overflow-hidden">
            <button onClick={() => setExpandedPrinciple(expandedPrinciple === i ? null : i)} className="w-full p-4 text-left hover:bg-slate-700 transition flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{p.icon}</span>
                <div>
                  <h4 className="text-white font-semibold">{p.number ? `${p.number}. ` : ''}{p.name}</h4>
                  <p className="text-gray-400 text-sm">{p.concept}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-xs hidden sm:block">Click to {expandedPrinciple === i ? 'collapse' : 'expand'}</span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedPrinciple === i ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {expandedPrinciple === i && (
              <div className="px-4 pb-4 space-y-3">
                {/* Principle 1: Multi-Dimensional Coloring */}
                {p.dimensions && (
                  <div className="bg-blue-500/10 rounded p-3">
                    <p className="text-blue-300 text-sm font-semibold mb-2">Five Dimensions:</p>
                    <div className="space-y-1">
                      {p.dimensions.map((d: any, j: number) => (<div key={j} className="text-sm"><span className="text-blue-200 font-medium">{d.dimension}:</span><span className="text-gray-300 ml-2">{d.examples}</span></div>))}
                    </div>
                  </div>
                )}
                {p.whyItMatters && (
                  <div className="bg-emerald-500/10 rounded p-3">
                    <p className="text-emerald-300 text-sm font-semibold mb-2">{p.whyItMatters.title}</p>
                    <ul className="text-gray-300 text-sm space-y-1">
                      {p.whyItMatters.benefits?.map((b: string, j: number) => (<li key={j}>• {b}</li>))}
                    </ul>
                  </div>
                )}
                {p.example && (
                  <div className="bg-purple-500/10 rounded p-3 border-l-4 border-purple-500">
                    <p className="text-purple-300 text-xs font-semibold mb-1">Example:</p>
                    <p className="text-purple-200 text-sm">{p.example}</p>
                  </div>
                )}

                {/* Principle 2: Control Levers */}
                {p.levers && (
                  <div className="space-y-2">
                    <p className="text-emerald-300 text-sm font-semibold">Five Control Levers:</p>
                    {p.levers.map((l: any, j: number) => (
                      <div key={j} className="bg-slate-600/50 rounded p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-emerald-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{j + 1}</span>
                          <p className="text-emerald-300 font-semibold text-sm">{l.lever}</p>
                        </div>
                        <p className="text-gray-500 text-xs italic mb-1">Stage: {l.stage}</p>
                        <p className="text-gray-300 text-sm">{l.controls}</p>
                        {l.example && (
                          <div className="bg-blue-500/10 rounded p-2 mt-2">
                            <p className="text-blue-300 text-xs"><span className="font-semibold">Example:</span> {l.example}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {p.keyInsight && (
                  <div className="bg-amber-500/10 rounded p-3 border-l-4 border-amber-500">
                    <p className="text-amber-300 text-xs font-semibold mb-1">Key Insight:</p>
                    <p className="text-amber-200 text-sm">{p.keyInsight}</p>
                  </div>
                )}

                {/* Principle 3: Proof-Driven Attestations */}
                {p.attestationTypes && (
                  <div className="bg-blue-500/10 rounded p-3">
                    <p className="text-blue-300 text-sm font-semibold mb-2">Attestation Types:</p>
                    <div className="space-y-2">
                      {p.attestationTypes.map((a: any, j: number) => (
                        <div key={j} className="flex items-start gap-2">
                          <span className="text-blue-400 mt-1">•</span>
                          <div>
                            <span className="text-blue-200 font-medium text-sm">{a.type}:</span>
                            <span className="text-gray-300 text-sm ml-1">{a.example}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {p.economicsOfProofs && (
                  <div className="bg-emerald-500/10 rounded p-3">
                    <p className="text-emerald-300 text-sm font-semibold mb-2">{p.economicsOfProofs.title}</p>
                    <div className="bg-red-500/10 rounded p-2 mb-2">
                      <p className="text-red-300 text-xs font-semibold mb-1">The Problem:</p>
                      <p className="text-red-200 text-sm">{p.economicsOfProofs.problem}</p>
                    </div>
                    <p className="text-emerald-200 text-sm mb-2">{p.economicsOfProofs.solution}</p>
                    {p.economicsOfProofs.marketDynamics && (
                      <div className="space-y-1 mb-2">
                        {p.economicsOfProofs.marketDynamics.map((m: any, j: number) => (
                          <div key={j} className="text-sm">
                            <span className="text-emerald-300 font-medium">{m.actor}:</span>
                            <span className="text-gray-300 ml-2">{m.role}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <p className="text-emerald-300 font-semibold text-sm">{p.economicsOfProofs.result}</p>
                  </div>
                )}
                {p.phasedApproach && (
                  <div className="bg-purple-500/10 rounded p-3">
                    <p className="text-purple-300 text-sm font-semibold mb-2">{p.phasedApproach.title}</p>
                    <div className="space-y-2">
                      {p.phasedApproach.phases?.map((phase: any, j: number) => (
                        <div key={j} className="flex items-start gap-2">
                          <span className={`text-xs px-2 py-0.5 rounded font-medium ${j === 0 ? 'bg-blue-500/30 text-blue-300' : j === 1 ? 'bg-amber-500/30 text-amber-300' : 'bg-emerald-500/30 text-emerald-300'}`}>{phase.phase}</span>
                          <p className="text-gray-300 text-sm">{phase.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {p.coreInsight && (
                  <div className="bg-amber-500/10 rounded p-3 border-l-4 border-amber-500">
                    <p className="text-amber-300 text-xs font-semibold mb-1">Core Insight:</p>
                    <p className="text-amber-200 text-sm">{p.coreInsight}</p>
                  </div>
                )}

                {p.howItWorks && (
                  <ul className="text-gray-300 text-sm space-y-1">
                    {p.howItWorks.map((h: string, j: number) => (<li key={j}>• {h}</li>))}
                  </ul>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function TechnicalArchitectureBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">🏗️ {data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}
      {data.layers && (
        <div className="space-y-2 mb-4">
          {data.layers.map((layer: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-3 border-l-4 border-blue-500">
              <h4 className="text-blue-300 font-semibold">{layer.layer}</h4>
              <p className="text-gray-500 text-xs mb-1">{layer.components?.join(' • ')}</p>
              <p className="text-gray-300 text-sm">{layer.description}</p>
              {layer.context && <p className="text-blue-200 text-xs mt-1 italic">{layer.context}</p>}
            </div>
          ))}
        </div>
      )}
      {data.performanceTargets && (
        <div className="bg-emerald-500/10 rounded-lg p-4">
          <h4 className="text-emerald-300 font-semibold mb-3">{data.performanceTargets.title}</h4>
          <div className="grid md:grid-cols-2 gap-3">
            {data.performanceTargets.metrics?.map((m: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded p-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-400 text-sm">{m.metric}</span>
                  <span className="text-emerald-300 font-bold">{m.target}</span>
                </div>
                {m.context && <p className="text-gray-500 text-xs">{m.context}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PrivacyPreservingBlock({ data }: { data: any }) {
  const [techExpanded, setTechExpanded] = React.useState(false);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">🔒 {data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}

      {data.theProblem && (
        <div className="bg-red-500/20 rounded-lg p-4 mb-4">
          <h4 className="text-red-300 font-semibold mb-2">{data.theProblem.title}</h4>
          <p className="text-gray-300 text-sm mb-3">{data.theProblem.description}</p>
          <div className="grid md:grid-cols-2 gap-2">
            {data.theProblem.transparencyProblem && (
              <div className="bg-red-500/10 rounded p-2">
                <p className="text-red-300 text-xs font-semibold mb-1">Full Transparency:</p>
                <p className="text-red-200 text-sm">{data.theProblem.transparencyProblem}</p>
              </div>
            )}
            {data.theProblem.privacyProblem && (
              <div className="bg-red-500/10 rounded p-2">
                <p className="text-red-300 text-xs font-semibold mb-1">Full Privacy:</p>
                <p className="text-red-200 text-sm">{data.theProblem.privacyProblem}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {data.sphereNetSolution && (
        <div className="bg-emerald-500/10 rounded-lg p-4 mb-4">
          <button
            onClick={() => setTechExpanded(!techExpanded)}
            className="w-full flex items-center justify-between mb-3"
          >
            <h4 className="text-emerald-300 font-semibold">{data.sphereNetSolution.title}</h4>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-xs">Click to {techExpanded ? 'collapse' : 'expand'} technologies</span>
              <ChevronDown className={`w-4 h-4 text-emerald-400 transition-transform ${techExpanded ? 'rotate-180' : ''}`} />
            </div>
          </button>
          {techExpanded && (
            <div className="space-y-2 mb-3">
              {data.sphereNetSolution.technologies?.map((t: any, i: number) => (
                <div key={i} className="bg-slate-700/50 rounded p-3">
                  <p className="text-emerald-200 font-medium">{t.tech}</p>
                  <p className="text-gray-400 text-sm mb-1">{t.use}</p>
                  {t.example && (
                    <div className="bg-blue-500/10 rounded p-2 mt-2">
                      <p className="text-blue-300 text-xs"><span className="font-semibold">Example:</span> {t.example}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {data.sphereNetSolution.principle && (
            <div className="bg-purple-500/10 rounded p-3 border-l-4 border-purple-500">
              <p className="text-purple-300 text-xs font-semibold mb-1">Principle:</p>
              <p className="text-purple-200 text-sm italic">{data.sphereNetSolution.principle}</p>
            </div>
          )}
        </div>
      )}

      {data.regulatorAccess && (
        <div className="mb-4">
          <h4 className="text-white font-semibold mb-3">{data.regulatorAccess.title}</h4>
          <div className="space-y-2">
            {data.regulatorAccess.levels?.map((l: any, i: number) => (
              <div key={i} className={`rounded-lg p-3 ${i === 0 ? 'bg-emerald-500/10 border-l-4 border-emerald-500' : i === 1 ? 'bg-amber-500/10 border-l-4 border-amber-500' : 'bg-red-500/10 border-l-4 border-red-500'}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-medium ${i === 0 ? 'text-emerald-300' : i === 1 ? 'text-amber-300' : 'text-red-300'}`}>{l.level}</span>
                  {l.requirement && <span className="text-gray-500 text-xs">{l.requirement}</span>}
                </div>
                <p className="text-gray-300 text-sm">{l.access}</p>
                {l.context && <p className="text-gray-500 text-xs mt-1 italic">{l.context}</p>}
              </div>
            ))}
          </div>
          {data.regulatorAccess.keyPoint && (
            <div className="bg-blue-500/10 rounded p-3 mt-3 border-l-4 border-blue-500">
              <p className="text-blue-300 text-sm">{data.regulatorAccess.keyPoint}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SpherePayVsSphereNetBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>
      {data.comparison && (
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm">
            <thead><tr className="bg-slate-700">
              {data.comparison.headers?.map((h: string, i: number) => (
                <th key={i} className="text-left p-3 text-gray-300">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {data.comparison.rows?.map((row: string[], i: number) => (
                <tr key={i} className="border-t border-slate-700">
                  {row.map((cell: string, j: number) => (
                    <td key={j} className={`p-3 ${j === 0 ? 'text-gray-400 font-medium' : j === 1 ? 'text-blue-300' : 'text-emerald-300'}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {data.relationship && (
        <div className="bg-purple-500/10 rounded-lg p-4">
          <h4 className="text-purple-300 font-semibold mb-2">{data.relationship.title}</h4>
          <p className="text-white text-sm font-medium mb-3">{data.relationship.description}</p>
          {data.relationship.flow && (
            <div className="space-y-2 mb-3">
              {data.relationship.flow.map((step: string, i: number) => (
                <div key={i} className="flex items-start gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded font-medium flex-shrink-0 ${i === 0 ? 'bg-blue-500/30 text-blue-300' : i === 1 ? 'bg-amber-500/30 text-amber-300' : 'bg-emerald-500/30 text-emerald-300'}`}>
                    {i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : 'Future'}
                  </span>
                  <p className="text-gray-300 text-sm">{step}</p>
                </div>
              ))}
            </div>
          )}
          <div className="bg-purple-500/20 rounded p-3">
            <p className="text-purple-300 text-xs font-semibold mb-1">Strategic Value:</p>
            <p className="text-purple-200 text-sm">{data.relationship.strategicValue}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function ForRegulatorsBlock({ data }: { data: any }) {
  const [pitchExpanded, setPitchExpanded] = React.useState(false);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">🏛️ {data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}
      {data.valueProposition && (
        <div className="space-y-3 mb-4">
          {data.valueProposition.map((v: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-emerald-500">
              <h4 className="text-emerald-300 font-semibold">{v.benefit}</h4>
              <p className="text-gray-300 text-sm mt-1">{v.explanation}</p>
              {v.contrast && (
                <div className="bg-gray-500/10 rounded p-2 mt-2">
                  <p className="text-gray-500 text-xs italic">{v.contrast}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {data.samplePitch && (
        <div className="bg-blue-500/10 rounded-lg overflow-hidden">
          <button
            onClick={() => setPitchExpanded(!pitchExpanded)}
            className="w-full p-4 flex items-center justify-between hover:bg-blue-500/20 transition"
          >
            <p className="text-blue-300 font-semibold">Sample Pitch: Central Banker Question</p>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-xs">Click to {pitchExpanded ? 'collapse' : 'expand'}</span>
              <ChevronDown className={`w-4 h-4 text-blue-400 transition-transform ${pitchExpanded ? 'rotate-180' : ''}`} />
            </div>
          </button>
          {pitchExpanded && (
            <div className="px-4 pb-4">
              <div className="bg-amber-500/10 rounded p-3 mb-3">
                <p className="text-amber-300 text-sm font-semibold">Q: {data.samplePitch.question}</p>
              </div>
              <div className="bg-emerald-500/10 rounded p-3">
                <p className="text-emerald-300 text-xs font-semibold mb-2">Recommended Response:</p>
                <p className="text-gray-300 text-sm leading-relaxed">{data.samplePitch.answer}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// =============================================================================
// NEW SECTION 5.7 - CUSTOMER SEGMENTS COMPONENTS
// =============================================================================

function ThreeSegmentsBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>
      {data.overview && <p className="text-gray-300 mb-4">{data.overview}</p>}
      {data.segments && (
        <div className="grid md:grid-cols-3 gap-4">
          {data.segments.map((seg: any, i: number) => (
            <div key={i} className={`rounded-lg p-4 border-2 ${seg.color === 'green' ? 'bg-emerald-500/10 border-emerald-500/50' : seg.color === 'blue' ? 'bg-blue-500/10 border-blue-500/50' : 'bg-purple-500/10 border-purple-500/50'}`}>
              <span className="text-2xl">{seg.icon}</span>
              <h4 className={`font-semibold mt-2 ${seg.color === 'green' ? 'text-emerald-300' : seg.color === 'blue' ? 'text-blue-300' : 'text-purple-300'}`}>{seg.segment}</h4>
              <p className="text-gray-500 text-xs italic">{seg.nickname}</p>
              <p className="text-gray-300 text-sm mt-2">{seg.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SegmentDetailBlock({ data }: { data: any }) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <button onClick={() => setExpanded(!expanded)} className="w-full flex items-center justify-between mb-4">
        <div className="text-left">
          <h3 className="font-semibold text-white text-xl">{data.title}</h3>
          {data.subtitle && <p className="text-gray-400 text-sm">{data.subtitle}</p>}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-gray-500 text-xs hidden sm:block">Click to {expanded ? 'collapse' : 'expand'} details</span>
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {data.profile && (
        <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
          <h4 className="text-white font-semibold mb-2">{data.profile.title}</h4>
          <ul className="text-gray-300 text-sm space-y-1">
            {data.profile.characteristics?.map((c: string, i: number) => (<li key={i}>• {c}</li>))}
          </ul>
        </div>
      )}

      {expanded && (
        <div className="space-y-4">
          {data.painPoints && (
            <div>
              <h4 className="text-red-300 font-semibold mb-3">{data.painPoints.title}</h4>
              <div className="space-y-2">
                {data.painPoints.pains?.map((p: any, i: number) => (
                  <div key={i} className="bg-red-500/20 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-white font-medium">{p.pain}</span>
                      <span className={`text-xs px-2 py-1 rounded ${p.intensity?.includes('HIGH') ? 'bg-red-500 text-white' : 'bg-amber-500 text-white'}`}>{p.intensity}</span>
                    </div>
                    <p className="text-gray-300 text-sm">{p.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.valueProposition && (
            <div className="bg-emerald-500/10 rounded-lg p-4">
              <h4 className="text-emerald-300 font-semibold mb-2">{data.valueProposition.title}</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                {data.valueProposition.value?.map((v: string, i: number) => (<li key={i}>✅ {v}</li>))}
              </ul>
            </div>
          )}

          {data.qualificationCriteria && (
            <div>
              <h4 className="text-white font-semibold mb-3">{data.qualificationCriteria.title}</h4>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="bg-emerald-500/10 rounded-lg p-3">
                  <p className="text-emerald-300 font-semibold text-sm mb-2">✅ Must Have</p>
                  <ul className="text-gray-300 text-xs space-y-1">
                    {data.qualificationCriteria.mustHave?.map((m: string, i: number) => (<li key={i}>• {m}</li>))}
                  </ul>
                </div>
                <div className="bg-blue-500/10 rounded-lg p-3">
                  <p className="text-blue-300 font-semibold text-sm mb-2">💡 Nice to Have</p>
                  <ul className="text-gray-300 text-xs space-y-1">
                    {data.qualificationCriteria.niceToHave?.map((n: string, i: number) => (<li key={i}>• {n}</li>))}
                  </ul>
                </div>
                <div className="bg-red-500/20 rounded-lg p-3">
                  <p className="text-red-300 font-semibold text-sm mb-2">🚩 Red Flags</p>
                  <ul className="text-gray-300 text-xs space-y-1">
                    {data.qualificationCriteria.redFlags?.map((r: string, i: number) => (<li key={i}>• {r}</li>))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {data.discoveryQuestions && (
            <div className="bg-blue-500/10 rounded-lg p-4">
              <h4 className="text-blue-300 font-semibold mb-3">💬 {data.discoveryQuestions.title}</h4>
              <div className="space-y-2">
                {data.discoveryQuestions.questions?.map((q: string, i: number) => (
                  <div key={i} className="bg-slate-700/50 rounded p-2">
                    <p className="text-gray-300 text-sm italic">{q}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.typicalDeal && (
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-3">{data.typicalDeal.title}</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {data.typicalDeal.characteristics?.map((c: any, i: number) => (
                  <div key={i}><span className="text-gray-400">{c.attribute}:</span><span className="text-white ml-2">{c.value}</span></div>
                ))}
              </div>
            </div>
          )}

          {data.uaeSpecific && (
            <div>
              <h4 className="text-amber-300 font-semibold mb-3">🇦🇪 {data.uaeSpecific.title}</h4>
              <div className="space-y-2">
                {data.uaeSpecific.examples?.map((ex: any, i: number) => (
                  <div key={i} className="bg-amber-500/10 rounded-lg p-3">
                    <h5 className="text-amber-300 font-semibold">{ex.type}</h5>
                    <p className="text-gray-300 text-sm">{ex.description}</p>
                    <p className="text-gray-500 text-xs">Corridors: {ex.corridors} | Volume: {ex.volume}</p>
                    {ex.pain && <p className="text-red-300 text-xs mt-1">Pain: {ex.pain}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SegmentPrioritizationBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">🎯 {data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}
      {data.priorityOrder && (
        <div className="space-y-3 mb-4">
          {data.priorityOrder.map((p: any, i: number) => (
            <div key={i} className={`rounded-lg p-4 border-l-4 ${p.priority === 1 ? 'bg-emerald-500/10 border-emerald-500' : p.priority === 2 ? 'bg-blue-500/10 border-blue-500' : 'bg-purple-500/10 border-purple-500'}`}>
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-xs font-bold px-2 py-1 rounded ${p.priority === 1 ? 'bg-emerald-500 text-white' : p.priority === 2 ? 'bg-blue-500 text-white' : 'bg-purple-500 text-white'}`}>Priority {p.priority}</span>
                <span className={`font-semibold ${p.priority === 1 ? 'text-emerald-300' : p.priority === 2 ? 'text-blue-300' : 'text-purple-300'}`}>{p.segment}</span>
              </div>
              <p className="text-gray-300 text-sm">{p.rationale}</p>
              <p className="text-gray-500 text-xs mt-2">Target: {p.targetSubsegments?.join(', ')}</p>
            </div>
          ))}
        </div>
      )}
      {data.volumeTargets && (
        <div className="bg-amber-500/10 rounded-lg p-4">
          <h4 className="text-amber-300 font-semibold mb-3">💰 {data.volumeTargets.title}</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-amber-500/20">
                  <th className="text-left p-2 text-amber-200">Segment</th>
                  <th className="text-left p-2 text-amber-200">Min Monthly</th>
                  <th className="text-left p-2 text-amber-200">Sweet Spot</th>
                  <th className="text-left p-2 text-amber-200">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {data.volumeTargets.targets?.map((t: any, i: number) => (
                  <tr key={i} className="border-t border-amber-500/20">
                    <td className="p-2 text-gray-300 font-medium">{t.segment}</td>
                    <td className="p-2 text-gray-400">{t.minMonthly}</td>
                    <td className="p-2 text-emerald-300">{t.sweetSpot}</td>
                    <td className="p-2 text-purple-300">{t.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function QualificationFrameworkBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">📋 {data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}
      
      {data.framework && (
        <div className="space-y-3 mb-4">
          {data.framework.map((f: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-blue-500 text-white font-bold text-lg w-8 h-8 rounded-full flex items-center justify-center">{f.letter}</span>
                <span className="text-white font-semibold">{f.factor}</span>
              </div>
              <p className="text-gray-400 text-sm mb-2 italic">"{f.question}"</p>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="bg-emerald-500/20 rounded p-2"><span className="text-emerald-400 font-semibold">🟢 Green:</span><p className="text-gray-300">{f.greenFlag}</p></div>
                <div className="bg-amber-500/20 rounded p-2"><span className="text-amber-400 font-semibold">🟡 Yellow:</span><p className="text-gray-300">{f.yellowFlag}</p></div>
                <div className="bg-red-500/20 rounded p-2"><span className="text-red-400 font-semibold">🔴 Red:</span><p className="text-gray-300">{f.redFlag}</p></div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {data.scoringGuide && (
        <div className="bg-purple-500/10 rounded-lg p-4">
          <h4 className="text-purple-300 font-semibold mb-2">{data.scoringGuide.title}</h4>
          <div className="space-y-1">
            {data.scoringGuide.scores?.map((s: any, i: number) => (
              <div key={i} className="flex justify-between text-sm"><span className="text-gray-400">{s.score}</span><span className="text-gray-300">{s.action}</span></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// NEW PILLAR 4 - ENHANCED GOVERNANCE COMPONENTS
// =============================================================================

function WhyOperationalRiskMattersBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.context && <p className="text-gray-400 mb-4">{data.context}</p>}

      {data.institutionalPerspective && (
        <div className="space-y-4">
          {data.institutionalPerspective.map((perspective: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <h4 className="text-blue-300 font-semibold mb-2">{perspective.stakeholder}</h4>
              <p className="text-amber-300 text-sm mb-3 italic">"{perspective.theirConcern}"</p>

              {perspective.whatTheyEvaluate && (
                <div className="mb-3">
                  <p className="text-gray-400 text-xs font-semibold mb-1">What They Evaluate:</p>
                  <div className="flex flex-wrap gap-2">
                    {perspective.whatTheyEvaluate.map((item: string, j: number) => (
                      <span key={j} className="bg-slate-600 text-gray-300 text-xs px-2 py-1 rounded">{item}</span>
                    ))}
                  </div>
                </div>
              )}

              {perspective.whatTheyWantToHear && (
                <div className="bg-emerald-500/10 rounded p-3">
                  <p className="text-emerald-300 text-xs font-semibold mb-1">✅ What They Want to Hear:</p>
                  <p className="text-gray-300 text-sm">{perspective.whatTheyWantToHear}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {data.keyInsight && (
        <div className="bg-purple-500/10 rounded-lg p-4 mt-4">
          <p className="text-purple-300 font-medium">💡 {data.keyInsight}</p>
        </div>
      )}
    </div>
  );
}

function CaseStudiesBlock({ data }: { data: any }) {
  const [expandedCase, setExpandedCase] = useState<number | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}

      <div className="space-y-4">
        {data.cases?.map((caseStudy: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
            {/* Case Header */}
            <div
              className="p-4 cursor-pointer hover:bg-slate-700/70"
              onClick={() => setExpandedCase(expandedCase === i ? null : i)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-semibold">{caseStudy.title}</h4>
                  {caseStudy.subtitle && <p className="text-gray-400 text-sm">{caseStudy.subtitle}</p>}
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedCase === i ? 'rotate-180' : ''}`} />
              </div>
              {caseStudy.regulators && (
                <div className="flex gap-2 mt-2">
                  {caseStudy.regulators.map((r: string, j: number) => (
                    <span key={j} className="bg-red-500/20 text-red-300 text-xs px-2 py-0.5 rounded">{r}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Expanded Content */}
            {expandedCase === i && (
              <div className="px-4 pb-4 space-y-4 border-t border-slate-600 pt-4">
                {/* Background */}
                {caseStudy.background && (
                  <div className="bg-slate-800/50 rounded p-3">
                    <h5 className="text-gray-300 font-semibold mb-2">Background</h5>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                      {caseStudy.background.company && <div><span className="text-gray-500">Company:</span> <span className="text-gray-300">{caseStudy.background.company}</span></div>}
                      {caseStudy.background.volume && <div><span className="text-gray-500">Volume:</span> <span className="text-gray-300">{caseStudy.background.volume}</span></div>}
                      {caseStudy.background.timeframe && <div><span className="text-gray-500">Period:</span> <span className="text-gray-300">{caseStudy.background.timeframe}</span></div>}
                      {caseStudy.background.valuation && <div><span className="text-gray-500">Valuation:</span> <span className="text-gray-300">{caseStudy.background.valuation}</span></div>}
                      {caseStudy.background.customers && <div><span className="text-gray-500">Customers:</span> <span className="text-gray-300">{caseStudy.background.customers}</span></div>}
                      {caseStudy.background.assets && <div><span className="text-gray-500">Assets:</span> <span className="text-gray-300">{caseStudy.background.assets}</span></div>}
                      {caseStudy.background.promise && <div className="col-span-2 md:col-span-3"><span className="text-gray-500">Promise:</span> <span className="text-gray-300">{caseStudy.background.promise}</span></div>}
                    </div>
                  </div>
                )}

                {/* What Happened */}
                {caseStudy.whatHappened && (
                  <div>
                    <h5 className="text-red-300 font-semibold mb-2">What Happened</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      {caseStudy.whatHappened.map((item: string, j: number) => (
                        <li key={j}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Specific Violations */}
                {caseStudy.specificViolations && (
                  <div>
                    <h5 className="text-amber-300 font-semibold mb-2">Specific Violations</h5>
                    <div className="space-y-2">
                      {caseStudy.specificViolations.map((v: any, j: number) => (
                        <div key={j} className="bg-red-500/20 rounded p-3">
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-white font-medium">{v.violation}</span>
                            {v.penalty && <span className="text-red-400 font-bold">{v.penalty}</span>}
                          </div>
                          <p className="text-gray-400 text-xs">{v.details}</p>
                          {v.regulator && <span className="text-gray-500 text-xs">Regulator: {v.regulator}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Consequences */}
                {caseStudy.consequences && (
                  <div>
                    <h5 className="text-red-300 font-semibold mb-2">Consequences</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      {caseStudy.consequences.map((c: string, j: number) => (
                        <li key={j}>• {c}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Root Causes with Sphere Contrast (FTX/Celsius style) */}
                {caseStudy.rootCauses && (
                  <div>
                    <h5 className="text-amber-300 font-semibold mb-2">Root Causes & Sphere Contrast</h5>
                    <div className="space-y-2">
                      {caseStudy.rootCauses.map((rc: any, j: number) => (
                        <div key={j} className="bg-slate-800/50 rounded p-3 grid grid-cols-2 gap-3">
                          <div className="bg-red-500/20 rounded p-2">
                            <p className="text-red-300 text-xs font-semibold mb-1">❌ Failure:</p>
                            <p className="text-gray-300 text-sm">{rc.failure}</p>
                          </div>
                          <div className="bg-emerald-500/10 rounded p-2">
                            <p className="text-emerald-300 text-xs font-semibold mb-1">✅ Sphere:</p>
                            <p className="text-gray-300 text-sm">{rc.sphereContrast}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Outcome */}
                {caseStudy.outcome && (
                  <div className="bg-red-500/20 rounded p-3">
                    <p className="text-red-300 text-sm"><span className="font-semibold">Outcome:</span> {caseStudy.outcome}</p>
                  </div>
                )}

                {/* Lesson for Sphere */}
                {caseStudy.lessonForSphere && (
                  <div className="bg-blue-500/10 rounded p-3">
                    <p className="text-blue-300 text-sm"><span className="font-semibold">Lesson:</span> {caseStudy.lessonForSphere}</p>
                  </div>
                )}

                {/* How to Discuss */}
                {caseStudy.howToDiscuss && (
                  <div className="bg-purple-500/10 rounded p-3">
                    <p className="text-purple-300 text-sm"><span className="font-semibold">💬 How to Discuss:</span> {caseStudy.howToDiscuss}</p>
                  </div>
                )}

                {/* Sphere Contrast (Binance/BitMEX style) */}
                {caseStudy.sphereContrast && (
                  <div className="bg-emerald-500/10 rounded-lg p-4">
                    <h5 className="text-emerald-300 font-semibold mb-2">✅ {caseStudy.sphereContrast.title}</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      {caseStudy.sphereContrast.points?.map((p: string, j: number) => (
                        <li key={j}>• {p}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Key Lessons */}
                {caseStudy.keyLessons && (
                  <div>
                    <h5 className="text-blue-300 font-semibold mb-2">Key Lessons</h5>
                    <div className="space-y-2">
                      {caseStudy.keyLessons.map((lesson: any, j: number) => (
                        <div key={j} className="bg-blue-500/10 rounded p-2">
                          <p className="text-blue-300 font-medium text-sm">{lesson.lesson}</p>
                          <p className="text-gray-400 text-xs">{lesson.detail}</p>
                        </div>
                      ))}
                    </div>
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

function ThreeLinesDefenseBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-2">{data.subtitle}</p>}
      {data.overview && <p className="text-gray-300 text-sm mb-4">{data.overview}</p>}

      <div className="space-y-4">
        {data.lines?.map((line: any, i: number) => (
          <div key={i} className={`rounded-lg p-4 border-l-4 ${i === 0 ? 'bg-blue-500/10 border-blue-500' : i === 1 ? 'bg-purple-500/10 border-purple-500' : 'bg-amber-500/10 border-amber-500'}`}>
            <div className="flex items-center gap-3 mb-2">
              {line.icon && <span className="text-2xl">{line.icon}</span>}
              <h4 className={`font-semibold ${i === 0 ? 'text-blue-300' : i === 1 ? 'text-purple-300' : 'text-amber-300'}`}>{line.line}</h4>
            </div>
            <p className="text-gray-300 text-sm mb-2">{line.role}</p>
            {line.who && <p className="text-gray-500 text-xs mb-2">Who: {line.who}</p>}

            {line.responsibilities && (
              <div className="mb-2">
                <p className="text-gray-400 text-xs font-semibold mb-1">Responsibilities:</p>
                <ul className="text-gray-300 text-xs space-y-1">
                  {line.responsibilities.map((r: string, j: number) => (
                    <li key={j}>• {r}</li>
                  ))}
                </ul>
              </div>
            )}

            {line.accountability && <p className="text-gray-400 text-xs italic">{line.accountability}</p>}

            {line.example && (
              <div className="bg-slate-800/50 rounded p-2 mt-2">
                <p className="text-gray-400 text-xs"><span className="font-semibold">Example:</span> {line.example}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {data.whyItMatters && (
        <div className="bg-emerald-500/10 rounded-lg p-4 mt-4">
          <p className="text-emerald-300 text-sm">💡 {data.whyItMatters}</p>
        </div>
      )}
    </div>
  );
}

function RiskAppetiteBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-2">{data.subtitle}</p>}
      {data.definition && <p className="text-gray-300 text-sm mb-4">{data.definition}</p>}

      {data.components && (
        <div className="space-y-4">
          {data.components.map((comp: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <h4 className="text-blue-300 font-semibold mb-2">{comp.component}</h4>
              <p className="text-gray-300 text-sm mb-2">{comp.description}</p>

              {comp.example && (
                <div className="bg-blue-500/10 rounded p-2">
                  <p className="text-blue-200 text-xs">{comp.example}</p>
                </div>
              )}

              {comp.examples && (
                <ul className="text-gray-400 text-xs space-y-1">
                  {comp.examples.map((ex: string, j: number) => (
                    <li key={j}>• {ex}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {data.governance && (
        <div className="bg-purple-500/10 rounded-lg p-4 mt-4">
          <p className="text-purple-300 text-sm">{data.governance}</p>
        </div>
      )}

      {data.howToDiscuss && (
        <div className="bg-emerald-500/10 rounded-lg p-4 mt-4">
          <p className="text-emerald-300 text-xs font-semibold mb-1">💬 How to Discuss:</p>
          <p className="text-gray-300 text-sm">{data.howToDiscuss}</p>
        </div>
      )}
    </div>
  );
}

function BoardOversightBlock({ data }: { data: any }) {
  const [expandedBody, setExpandedBody] = useState<string | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}

      {data.structure && (
        <div className="space-y-4">
          {data.structure.map((body: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-white font-semibold">{body.body}</h4>
                {body.frequency && <span className="text-gray-500 text-xs">{body.frequency}</span>}
              </div>
              {body.composition && <p className="text-gray-400 text-xs mb-2">Composition: {body.composition}</p>}

              {body.riskRole && (
                <div className="mb-3">
                  <p className="text-blue-300 text-xs font-semibold mb-1">Risk Responsibilities:</p>
                  <ul className="text-gray-300 text-xs space-y-1">
                    {body.riskRole.map((role: string, j: number) => (
                      <li key={j}>• {role}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Sphere-specific details for Risk Committee */}
              {body.sphereDetails && (
                <div className="mt-3 border-t border-slate-600 pt-3">
                  <button
                    onClick={() => setExpandedBody(expandedBody === body.body ? null : body.body)}
                    className="text-purple-400 text-xs font-semibold flex items-center gap-1 hover:text-purple-300"
                  >
                    Sphere Details
                    <ChevronDown className={`w-3 h-3 transition-transform ${expandedBody === body.body ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedBody === body.body && (
                    <div className="mt-2 space-y-2 text-xs">
                      <p className="text-gray-400"><span className="text-purple-400">Chair:</span> {body.sphereDetails.chairperson}</p>
                      <p className="text-gray-400"><span className="text-purple-400">Quorum:</span> {body.sphereDetails.quorum}</p>
                      <p className="text-gray-400"><span className="text-purple-400">Decisions:</span> {body.sphereDetails.decisions}</p>
                      <p className="text-gray-400"><span className="text-purple-400">Reports to:</span> {body.sphereDetails.reportingTo}</p>
                      {body.sphereDetails.policyAreas && (
                        <div>
                          <p className="text-purple-400 font-semibold">Policy Areas:</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {body.sphereDetails.policyAreas.map((area: string, k: number) => (
                              <span key={k} className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded text-xs">{area}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      {body.sphereDetails.escalationTopics && (
                        <div>
                          <p className="text-purple-400 font-semibold">Escalation Topics:</p>
                          <ul className="text-gray-300 space-y-0.5 mt-1">
                            {body.sphereDetails.escalationTopics.map((topic: string, k: number) => (
                              <li key={k}>• {topic}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Risk Reporting Section */}
      {data.reporting && (
        <div className="bg-purple-500/10 rounded-lg p-4 mt-4">
          {data.reporting.title && <h4 className="text-purple-300 font-semibold mb-2">{data.reporting.title}</h4>}
          {data.reporting.content && (
            <div className="mb-2">
              <p className="text-gray-400 text-xs font-semibold mb-1">Content:</p>
              <ul className="text-gray-300 text-xs space-y-1">
                {data.reporting.content.map((item: string, i: number) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
          )}
          {data.reporting.format && <p className="text-gray-400 text-xs"><span className="font-semibold">Format:</span> {data.reporting.format}</p>}
        </div>
      )}
    </div>
  );
}

// Financial Crimes Compliance Regulatory Readiness Assessment Block (Section 4.6)
function FinancialCrimesAssessmentBlock({ data }: { data: any }) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const getRiskColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'very high': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'moderate': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-slate-500/20 text-gray-300 border-slate-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-purple-500/10 rounded-xl p-6 border border-purple-500/30">
        <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
        {data.subtitle && <p className="text-purple-300 mb-2">{data.subtitle}</p>}
        {data.owner && <p className="text-gray-400 text-sm">Owner: {data.owner}</p>}
      </div>

      {/* Executive Summary */}
      {data.executiveSummary && (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h4 className="text-blue-300 font-semibold mb-4">Executive Summary</h4>
          <p className="text-gray-300 mb-4">{data.executiveSummary.purpose}</p>
          {data.executiveSummary.keyAreas && (
            <div className="mb-4">
              <p className="text-gray-500 text-xs mb-2">Key Focus Areas:</p>
              <div className="flex flex-wrap gap-2">
                {data.executiveSummary.keyAreas.map((area: string, i: number) => (
                  <span key={i} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">{area}</span>
                ))}
              </div>
            </div>
          )}
          {data.executiveSummary.consequence && (
            <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/20">
              <p className="text-red-300 text-sm">{data.executiveSummary.consequence}</p>
            </div>
          )}
        </div>
      )}

      {/* Inherent Risk Matrix */}
      {data.inherentRiskMatrix && (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <button
            onClick={() => setExpandedSection(expandedSection === 'riskMatrix' ? null : 'riskMatrix')}
            className="w-full flex justify-between items-center"
          >
            <h4 className="text-amber-300 font-semibold">{data.inherentRiskMatrix.title}</h4>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'riskMatrix' ? 'rotate-180' : ''}`} />
          </button>
          {expandedSection === 'riskMatrix' && (
            <div className="mt-4 space-y-4">
              <p className="text-gray-400 text-sm">{data.inherentRiskMatrix.explanation}</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <p className="text-gray-400 text-xs font-semibold mb-2">Likelihood Scale</p>
                  <div className="space-y-1">
                    {data.inherentRiskMatrix.likelihoodScale?.map((item: any, i: number) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <span className="w-4 text-center text-white font-mono">{item.score}</span>
                        <span className="text-gray-300">{item.label}: {item.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <p className="text-gray-400 text-xs font-semibold mb-2">Impact Scale</p>
                  <div className="space-y-1">
                    {data.inherentRiskMatrix.impactScale?.map((item: any, i: number) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <span className="w-4 text-center text-white font-mono">{item.score}</span>
                        <span className="text-gray-300">{item.label}: {item.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.inherentRiskMatrix.riskLevels?.map((level: any, i: number) => (
                  <span key={i} className={`px-3 py-1 rounded text-xs border ${getRiskColor(level.level)}`}>
                    {level.range}: {level.level}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Top Residual Risks */}
      {data.topResidualRisks && (
        <div className="bg-slate-800 rounded-xl p-6 border border-red-500/30">
          <h4 className="text-red-300 font-semibold mb-2">{data.topResidualRisks.title}</h4>
          <p className="text-gray-400 text-sm mb-4">{data.topResidualRisks.subtitle}</p>
          <div className="space-y-3">
            {data.topResidualRisks.risks?.map((risk: any, i: number) => (
              <div key={i} className={`rounded-lg p-4 border ${getRiskColor(risk.level)}`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-gray-500 text-xs">{risk.category}</span>
                    <h5 className="text-white font-medium">{risk.riskArea}</h5>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold">{risk.score}</span>
                    <p className="text-xs uppercase">{risk.level}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">{risk.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Control Assessment Results */}
      {data.controlAssessmentResults && (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h4 className="text-orange-300 font-semibold mb-2">{data.controlAssessmentResults.title}</h4>
          <p className="text-gray-400 text-sm mb-4">{data.controlAssessmentResults.subtitle}</p>
          <div className="space-y-2">
            {data.controlAssessmentResults.weaknesses?.map((item: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-4 flex justify-between items-center">
                <div className="flex-1">
                  <p className="text-white font-medium">{item.area}</p>
                  <p className="text-gray-400 text-sm">{item.weakness}</p>
                </div>
                <div className="text-right ml-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(item.level)}`}>
                    {item.score} - {item.level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Control Effectiveness Scores */}
      {data.controlEffectivenessScores && (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h4 className="text-blue-300 font-semibold mb-4">{data.controlEffectivenessScores.title}</h4>
          <p className="text-gray-400 text-xs mb-4">{data.controlEffectivenessScores.interpretation}</p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* BSA/AML Scores */}
            {data.controlEffectivenessScores.bsaAml && (
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h5 className="text-emerald-300 font-medium mb-3">{data.controlEffectivenessScores.bsaAml.title}</h5>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-slate-600">
                        <th className="text-left p-1 text-gray-400">Category</th>
                        <th className="text-center p-1 text-gray-400">2024</th>
                        <th className="text-center p-1 text-gray-400">Target</th>
                        <th className="text-center p-1 text-gray-400">Δ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.controlEffectivenessScores.bsaAml.categories?.map((cat: any, i: number) => (
                        <tr key={i} className="border-b border-slate-700/50">
                          <td className="p-1 text-gray-300">{cat.category}</td>
                          <td className="p-1 text-center text-gray-300">{cat.current}</td>
                          <td className="p-1 text-center text-emerald-300">{cat.target}</td>
                          <td className={`p-1 text-center ${cat.delta < 0 ? 'text-emerald-300' : 'text-amber-300'}`}>{cat.delta > 0 ? '+' : ''}{cat.delta}</td>
                        </tr>
                      ))}
                    </tbody>
                    {data.controlEffectivenessScores.bsaAml.average && (
                      <tfoot>
                        <tr className="border-t border-slate-500">
                          <td className="p-1 text-white font-semibold">Average</td>
                          <td className="p-1 text-center text-white">{data.controlEffectivenessScores.bsaAml.average.current}</td>
                          <td className="p-1 text-center text-emerald-300 font-semibold">{data.controlEffectivenessScores.bsaAml.average.target}</td>
                          <td className={`p-1 text-center font-semibold ${data.controlEffectivenessScores.bsaAml.average.delta < 0 ? 'text-emerald-300' : 'text-amber-300'}`}>
                            {data.controlEffectivenessScores.bsaAml.average.delta > 0 ? '+' : ''}{data.controlEffectivenessScores.bsaAml.average.delta}
                          </td>
                        </tr>
                      </tfoot>
                    )}
                  </table>
                </div>
              </div>
            )}

            {/* Sanctions Scores */}
            {data.controlEffectivenessScores.sanctions && (
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h5 className="text-amber-300 font-medium mb-3">{data.controlEffectivenessScores.sanctions.title}</h5>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-slate-600">
                        <th className="text-left p-1 text-gray-400">Category</th>
                        <th className="text-center p-1 text-gray-400">2024</th>
                        <th className="text-center p-1 text-gray-400">Target</th>
                        <th className="text-center p-1 text-gray-400">Δ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.controlEffectivenessScores.sanctions.categories?.map((cat: any, i: number) => (
                        <tr key={i} className="border-b border-slate-700/50">
                          <td className="p-1 text-gray-300">{cat.category}</td>
                          <td className="p-1 text-center text-gray-300">{cat.current}</td>
                          <td className="p-1 text-center text-emerald-300">{cat.target}</td>
                          <td className={`p-1 text-center ${cat.delta < 0 ? 'text-emerald-300' : 'text-amber-300'}`}>{cat.delta > 0 ? '+' : ''}{cat.delta}</td>
                        </tr>
                      ))}
                    </tbody>
                    {data.controlEffectivenessScores.sanctions.average && (
                      <tfoot>
                        <tr className="border-t border-slate-500">
                          <td className="p-1 text-white font-semibold">Average</td>
                          <td className="p-1 text-center text-white">{data.controlEffectivenessScores.sanctions.average.current}</td>
                          <td className="p-1 text-center text-emerald-300 font-semibold">{data.controlEffectivenessScores.sanctions.average.target}</td>
                          <td className={`p-1 text-center font-semibold ${data.controlEffectivenessScores.sanctions.average.delta < 0 ? 'text-emerald-300' : 'text-amber-300'}`}>
                            {data.controlEffectivenessScores.sanctions.average.delta > 0 ? '+' : ''}{data.controlEffectivenessScores.sanctions.average.delta}
                          </td>
                        </tr>
                      </tfoot>
                    )}
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MSB Compliance Roadmap */}
      {data.msbComplianceRoadmap && (
        <div className="bg-slate-800 rounded-xl p-6 border border-emerald-500/30">
          <h4 className="text-emerald-300 font-semibold mb-4">{data.msbComplianceRoadmap.title}</h4>

          {/* Priority Actions */}
          {data.msbComplianceRoadmap.priorities && (
            <div className="space-y-4 mb-6">
              {data.msbComplianceRoadmap.priorities.map((priority: any, i: number) => (
                <div key={i} className="bg-slate-700/50 rounded-lg p-4">
                  <h5 className="text-white font-medium mb-2">{priority.priority}</h5>
                  <ul className="space-y-1">
                    {priority.actions?.map((action: string, j: number) => (
                      <li key={j} className="text-gray-300 text-sm flex items-start gap-2">
                        <span className="text-emerald-400 mt-1">•</span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Action Plan Timeline */}
          {data.msbComplianceRoadmap.actionPlan && (
            <div className="border-t border-slate-600 pt-4">
              <h5 className="text-purple-300 font-medium mb-3">Action Plan Timeline</h5>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-600">
                      <th className="text-left p-2 text-gray-400">Action</th>
                      <th className="text-left p-2 text-gray-400">Owner</th>
                      <th className="text-left p-2 text-gray-400">Deadline</th>
                      <th className="text-left p-2 text-gray-400">Expected Outcome</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.msbComplianceRoadmap.actionPlan.map((item: any, i: number) => (
                      <tr key={i} className="border-b border-slate-700/50">
                        <td className="p-2 text-gray-300">{item.action}</td>
                        <td className="p-2 text-gray-400">{item.owner}</td>
                        <td className="p-2 text-blue-300">{item.deadline}</td>
                        <td className="p-2 text-emerald-300">{item.outcome}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Why This Matters */}
      {data.whyThisMatters && (
        <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
          <p className="text-purple-300 text-sm">{data.whyThisMatters}</p>
        </div>
      )}
    </div>
  );
}

function GovernanceCertificationsBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">🏛️ {data.title}</h3>

      {/* Certifications */}
      {data.certifications && (
        <div className="space-y-4 mb-6">
          {data.certifications.map((cert: any, i: number) => (
            <div key={i} className="bg-emerald-500/10 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                {cert.icon && <span className="text-2xl">{cert.icon}</span>}
                <h4 className="text-emerald-300 font-semibold">{cert.cert}</h4>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300"><span className="text-gray-500">What it is:</span> {cert.whatItIs}</p>
                <p className="text-gray-300"><span className="text-gray-500">Why it matters:</span> {cert.whyItMatters}</p>
                <p className="text-emerald-300"><span className="text-gray-500">Sphere status:</span> {cert.sphereStatus}</p>
                {cert.sphereDetails && (
                  <p className="text-gray-400 text-xs mt-2 border-l-2 border-emerald-500/30 pl-3">{cert.sphereDetails}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Additional Controls */}
      {data.additionalControls && (
        <div>
          <h4 className="text-white font-semibold mb-3">Additional Controls</h4>
          <div className="grid gap-3 md:grid-cols-2">
            {data.additionalControls.map((ctrl: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-3">
                <p className="text-blue-300 font-medium text-sm">{ctrl.control}</p>
                <p className="text-gray-400 text-xs">{ctrl.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Policy Framework Block (Section 4.1)
function PolicyFrameworkBlock({ data }: { data: any }) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-purple-500/10 rounded-xl p-6 border border-purple-500/30">
        <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
        {data.subtitle && <p className="text-purple-300">{data.subtitle}</p>}
      </div>

      {/* Vanta Integration */}
      {data.vantaIntegration && (
        <div className="bg-slate-800 rounded-xl p-6 border border-emerald-500/30">
          <h4 className="text-emerald-300 font-semibold mb-2">{data.vantaIntegration.title}</h4>
          <p className="text-gray-400 text-sm mb-4">{data.vantaIntegration.description}</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
            {data.vantaIntegration.capabilities?.map((cap: any, i: number) => (
              <div key={i} className="bg-emerald-500/10 rounded-lg p-3">
                <p className="text-emerald-300 text-sm font-medium">{cap.capability}</p>
                <p className="text-gray-400 text-xs">{cap.detail}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            <span className="text-gray-500 text-xs">Certifications Covered:</span>
            {data.vantaIntegration.certificationsCovered?.map((cert: string, i: number) => (
              <span key={i} className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded text-xs">{cert}</span>
            ))}
          </div>

          <p className="text-emerald-300/80 text-sm">{data.vantaIntegration.benefit}</p>
        </div>
      )}

      {/* Employee Compliance Tasks */}
      {data.employeeComplianceTasks && (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h4 className="text-blue-300 font-semibold mb-2">{data.employeeComplianceTasks.title}</h4>
          <p className="text-amber-300 text-sm mb-4">SLA: {data.employeeComplianceTasks.sla}</p>

          <div className="space-y-2 mb-4">
            {data.employeeComplianceTasks.requiredTasks?.map((task: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-3 flex justify-between items-start">
                <div>
                  <p className="text-white text-sm font-medium">{task.task}</p>
                  <p className="text-gray-400 text-xs">{task.description}</p>
                </div>
                <span className="text-gray-500 text-xs flex-shrink-0 ml-2">{task.tracking}</span>
              </div>
            ))}
          </div>

          {data.employeeComplianceTasks.escalationProcess && (
            <div className="bg-amber-500/10 rounded-lg p-4">
              <p className="text-amber-300 text-xs font-semibold mb-2">Escalation Timeline</p>
              <div className="space-y-1">
                {data.employeeComplianceTasks.escalationProcess.map((esc: any, i: number) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <span className="text-amber-400 font-mono w-12">Day {esc.day}</span>
                    <span className="text-gray-300">{esc.action}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.employeeComplianceTasks.nonComplianceConsequence && (
            <p className="text-red-300 text-xs mt-3">{data.employeeComplianceTasks.nonComplianceConsequence}</p>
          )}
        </div>
      )}

      {/* Core Policies */}
      {data.corePolicies && (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="text-blue-300 font-semibold">{data.corePolicies.title}</h4>
              <p className="text-gray-500 text-xs">Owner: {data.corePolicies.owner}</p>
            </div>
            <span className="text-purple-300 text-xs bg-purple-500/20 px-2 py-1 rounded">{data.corePolicies.reviewCycle}</span>
          </div>

          <div className="space-y-3">
            {data.corePolicies.policies?.map((policy: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-4">
                <h5 className="text-white font-medium mb-1">{policy.policy}</h5>
                <p className="text-gray-400 text-sm mb-2">{policy.scope}</p>
                <div className="flex flex-wrap gap-1">
                  {policy.keyElements?.map((element: string, j: number) => (
                    <span key={j} className="px-2 py-0.5 bg-blue-500/10 text-blue-300 rounded text-xs">{element}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Policy Structure */}
      {data.policyStructure && (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <button
            onClick={() => setExpandedSection(expandedSection === 'policyStructure' ? null : 'policyStructure')}
            className="w-full flex justify-between items-center"
          >
            <h4 className="text-purple-300 font-semibold">{data.policyStructure.title}</h4>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'policyStructure' ? 'rotate-180' : ''}`} />
          </button>

          {expandedSection === 'policyStructure' && (
            <div className="mt-4 space-y-4">
              <div className="grid md:grid-cols-2 gap-2">
                {data.policyStructure.sections?.map((section: any, i: number) => (
                  <div key={i} className="bg-slate-700/50 rounded-lg p-3">
                    <p className="text-white text-sm font-medium">{section.section}</p>
                    <p className="text-gray-400 text-xs">{section.description}</p>
                  </div>
                ))}
              </div>

              {data.policyStructure.approvalProcess && (
                <div className="bg-purple-500/10 rounded-lg p-4">
                  <p className="text-purple-300 text-xs font-semibold mb-2">{data.policyStructure.approvalProcess.title}</p>
                  <div className="space-y-1">
                    {data.policyStructure.approvalProcess.steps?.map((step: any, i: number) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <span className="bg-purple-500/30 text-purple-200 w-5 h-5 rounded-full flex items-center justify-center font-medium">{step.step}</span>
                        <span className="text-gray-300">{step.action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* EDD Scoring Framework */}
      {data.eddScoringFramework && (
        <div className="bg-slate-800 rounded-xl p-6 border border-amber-500/30">
          <h4 className="text-amber-300 font-semibold mb-2">{data.eddScoringFramework.title}</h4>
          <p className="text-gray-400 text-sm mb-4">{data.eddScoringFramework.purpose}</p>

          {/* Scoring Tiers */}
          {data.eddScoringFramework.scoringTiers && (
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-600">
                    <th className="p-2 text-left text-gray-400">Tier</th>
                    <th className="p-2 text-left text-gray-400">Score Range</th>
                    <th className="p-2 text-left text-gray-400">Reviewer</th>
                    <th className="p-2 text-left text-gray-400">Review Frequency</th>
                  </tr>
                </thead>
                <tbody>
                  {data.eddScoringFramework.scoringTiers.map((tier: any, i: number) => {
                    const tierColors = { 'Low': 'text-emerald-300', 'Medium': 'text-amber-300', 'High': 'text-red-300' };
                    return (
                      <tr key={i} className="border-b border-slate-700/50">
                        <td className={`p-2 font-medium ${tierColors[tier.tier as keyof typeof tierColors] || 'text-gray-300'}`}>{tier.tier}</td>
                        <td className="p-2 text-gray-300 font-mono">{tier.scoreRange}</td>
                        <td className="p-2 text-gray-300">{tier.reviewer}</td>
                        <td className="p-2 text-gray-400">{tier.reviewFrequency}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* EDD Questionnaires */}
          {data.eddScoringFramework.eddQuestionnaires && (
            <div className="bg-slate-700/50 rounded-lg p-4">
              <p className="text-gray-400 text-xs font-semibold mb-2">EDD Questionnaire Verticals</p>
              <div className="grid md:grid-cols-2 gap-2">
                {data.eddScoringFramework.eddQuestionnaires.map((q: any, i: number) => (
                  <div key={i} className="bg-slate-800/50 rounded p-2">
                    <p className="text-white text-xs font-medium">{q.vertical}</p>
                    <p className="text-gray-500 text-xs">{q.focus}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Risk Profile Monitoring */}
      {data.riskProfileMonitoring && (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h4 className="text-blue-300 font-semibold mb-4">{data.riskProfileMonitoring.title}</h4>
          <div className="space-y-2">
            {data.riskProfileMonitoring.profiles?.map((profile: any, i: number) => {
              const profileColors = {
                'Low Risk': 'bg-emerald-500/10 border-emerald-500/30',
                'Medium Risk': 'bg-amber-500/10 border-amber-500/30',
                'High Risk': 'bg-red-500/10 border-red-500/30',
                'Unscheduled': 'bg-purple-500/10 border-purple-500/30'
              };
              return (
                <div key={i} className={`rounded-lg p-3 border ${profileColors[profile.profile as keyof typeof profileColors] || 'bg-slate-700/50 border-slate-600'}`}>
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-white text-sm font-medium">{profile.profile}</p>
                    <span className="text-gray-400 text-xs">{profile.reviewFrequency}</span>
                  </div>
                  <p className="text-gray-400 text-xs">{profile.actions}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Merchant Red Flags */}
      {data.merchantRedFlags && (
        <div className="bg-slate-800 rounded-xl p-6 border border-red-500/30">
          <button
            onClick={() => setExpandedSection(expandedSection === 'redFlags' ? null : 'redFlags')}
            className="w-full flex justify-between items-center"
          >
            <div>
              <h4 className="text-red-300 font-semibold">{data.merchantRedFlags.title}</h4>
              <p className="text-gray-400 text-sm text-left">{data.merchantRedFlags.subtitle}</p>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'redFlags' ? 'rotate-180' : ''}`} />
          </button>

          {expandedSection === 'redFlags' && (
            <div className="mt-4 space-y-3">
              {data.merchantRedFlags.categories?.map((cat: any, i: number) => (
                <div key={i} className="bg-red-500/5 rounded-lg p-3">
                  <p className="text-red-300 text-sm font-medium mb-2">{cat.category}</p>
                  <ul className="space-y-1">
                    {cat.flags?.map((flag: string, j: number) => (
                      <li key={j} className="text-gray-300 text-xs">• {flag}</li>
                    ))}
                  </ul>
                </div>
              ))}
              {data.merchantRedFlags.note && (
                <p className="text-gray-400 text-xs italic">{data.merchantRedFlags.note}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// =============================================================================
// NEW PILLAR 5.8 - TECHNICAL FAQ COMPONENTS
// =============================================================================

function DangerousStatementsBlock({ data }: { data: any }) {
  const [expandedStatement, setExpandedStatement] = useState<number | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">⚠️ {data.title}</h3>
      <p className="text-gray-500 text-sm mb-4">Click any statement to see why it's dangerous and how to correct it</p>

      <div className="space-y-3">
        {data.statements?.map((stmt: any, i: number) => (
          <div key={i} className="bg-red-500/20 rounded-lg overflow-hidden border border-red-500/30">
            <button
              className="w-full p-4 text-left hover:bg-red-500/30 transition flex items-center justify-between"
              onClick={() => setExpandedStatement(expandedStatement === i ? null : i)}
            >
              <p className="text-red-300 font-medium">❌ {stmt.dangerous}</p>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-gray-500 text-xs hidden sm:block">{expandedStatement === i ? 'Collapse' : 'Expand'}</span>
                <ChevronDown className={`w-5 h-5 text-red-400 transition-transform ${expandedStatement === i ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {expandedStatement === i && (
              <div className="px-4 pb-4 space-y-3">
                <div className="bg-amber-500/10 rounded p-3">
                  <p className="text-amber-300 text-xs font-semibold mb-1">⚠️ Why It's Dangerous:</p>
                  <p className="text-gray-300 text-sm">{stmt.whyDangerous}</p>
                </div>

                <div className="bg-blue-500/10 rounded p-3">
                  <p className="text-blue-300 text-xs font-semibold mb-1">📋 Reality:</p>
                  <p className="text-gray-300 text-sm">{stmt.reality}</p>
                </div>

                <div className="bg-emerald-500/10 rounded p-3 border-l-4 border-emerald-500">
                  <p className="text-emerald-300 text-xs font-semibold mb-1">✅ Say Instead:</p>
                  <p className="text-emerald-200 text-sm">{stmt.correction}</p>
                </div>

                {stmt.followUp && (
                  <div className="bg-purple-500/10 rounded p-3">
                    <p className="text-purple-300 text-xs font-semibold mb-1">🔄 If They Push:</p>
                    <p className="text-gray-300 text-sm">{stmt.followUp}</p>
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

function TechnicalObjectionsBlock({ data }: { data: any }) {
  const [expandedObjection, setExpandedObjection] = useState<number | null>(0);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">🛡️ {data.title}</h3>
      <p className="text-gray-500 text-sm mb-4">Click any objection to see the recommended response</p>

      <div className="space-y-3">
        {data.objections?.map((obj: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden border border-slate-600">
            <button
              className="w-full p-4 text-left hover:bg-slate-700 transition flex items-center justify-between"
              onClick={() => setExpandedObjection(expandedObjection === i ? null : i)}
            >
              <div className="flex-1">
                <p className="text-amber-300 font-medium">"{obj.objection}"</p>
                {obj.context && <span className="text-gray-500 text-xs">{obj.context}</span>}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-gray-500 text-xs hidden sm:block">{expandedObjection === i ? 'Collapse' : 'Expand'}</span>
                <ChevronDown className={`w-5 h-5 text-amber-400 transition-transform ${expandedObjection === i ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {expandedObjection === i && (
              <div className="px-4 pb-4 space-y-3">
                <div className="bg-emerald-500/10 rounded p-3 border-l-4 border-emerald-500">
                  <p className="text-emerald-300 text-xs font-semibold mb-1">✅ Response:</p>
                  <p className="text-emerald-200 text-sm">{obj.response}</p>
                </div>

                {obj.evidence && (
                  <div className="bg-blue-500/10 rounded p-3">
                    <p className="text-blue-300 text-xs font-semibold mb-1">📊 Evidence:</p>
                    <p className="text-gray-300 text-sm">{obj.evidence}</p>
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

function CorrectionTechniqueBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">💡 {data.title}</h3>

      <div className="grid gap-4 md:grid-cols-2">
        {data.principles?.map((principle: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4">
            <h4 className="text-blue-300 font-semibold mb-2">{principle.principle}</h4>
            <p className="text-gray-400 text-sm mb-2">{principle.technique}</p>
            {principle.example && (
              <div className="bg-blue-500/10 rounded p-2">
                <p className="text-gray-300 text-xs italic">"{principle.example}"</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// NEW PILLAR 5.9 - ENTERPRISE INTEGRATION COMPONENTS
// =============================================================================

function IntegrationPatternsBlock({ data }: { data: any }) {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">🔗 {data.title}</h3>
      <p className="text-gray-500 text-sm mb-4">Click any pattern to see details</p>

      <div className="space-y-3">
        {data.patterns?.map((pattern: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden border border-slate-600">
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              className="w-full p-4 text-left hover:bg-slate-700 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="text-white font-semibold">{pattern.pattern}</h4>
                  <p className="text-gray-400 text-sm mt-1">{pattern.description}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                  {pattern.typicalTimeline && (
                    <span className="text-emerald-400 text-xs bg-emerald-500/20 px-2 py-0.5 rounded hidden sm:block">{pattern.typicalTimeline}</span>
                  )}
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expanded === i ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </button>

            {expanded === i && (
              <div className="px-4 pb-4 space-y-3 border-t border-slate-600 pt-3">
                {pattern.typicalTimeline && (
                  <p className="text-emerald-300 text-sm sm:hidden">⏱️ Timeline: {pattern.typicalTimeline}</p>
                )}

                {pattern.useCases && (
                  <div>
                    <p className="text-blue-300 text-xs font-semibold mb-1">Best For:</p>
                    <div className="flex flex-wrap gap-1">
                      {pattern.useCases.map((uc: string, j: number) => (
                        <span key={j} className="text-gray-300 text-xs bg-blue-500/20 px-2 py-0.5 rounded">{uc}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  {pattern.advantages && (
                    <div className="bg-emerald-500/10 rounded p-3">
                      <p className="text-emerald-300 text-xs font-semibold mb-2">✅ Advantages:</p>
                      <ul className="text-gray-300 text-xs space-y-1">
                        {pattern.advantages.map((a: string, j: number) => (
                          <li key={j}>• {a}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {pattern.requirements && (
                    <div className="bg-amber-500/10 rounded p-3">
                      <p className="text-amber-300 text-xs font-semibold mb-2">⚙️ Requirements:</p>
                      <ul className="text-gray-300 text-xs space-y-1">
                        {pattern.requirements.map((r: string, j: number) => (
                          <li key={j}>• {r}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function SecurityRequirementsBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">🔒 {data.title}</h3>

      {/* Handle commonRequirements structure (from section 5.9) */}
      {data.commonRequirements && (
        <div className="space-y-3">
          {data.commonRequirements.map((req: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">{req.requirement}</h4>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-emerald-500/10 rounded p-3">
                  <p className="text-emerald-300 text-xs font-semibold mb-1">Sphere Approach:</p>
                  <p className="text-gray-300 text-sm">{req.sphereApproach}</p>
                </div>
                <div className="bg-amber-500/10 rounded p-3">
                  <p className="text-amber-300 text-xs font-semibold mb-1">Enterprise Consideration:</p>
                  <p className="text-gray-300 text-sm">{req.enterpriseConsideration}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Handle legacy requirements structure */}
      {data.requirements && (
        <div className="space-y-4">
          {data.requirements.map((req: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <h4 className="text-red-300 font-semibold mb-2">{req.category}</h4>
              {req.items && (
                <ul className="text-gray-300 text-sm space-y-1">
                  {req.items.map((item: string, j: number) => (
                    <li key={j}>• {item}</li>
                  ))}
                </ul>
              )}
              {req.description && <p className="text-gray-400 text-sm">{req.description}</p>}
            </div>
          ))}
        </div>
      )}

      {data.certifications && (
        <div className="mt-4">
          <h4 className="text-white font-semibold mb-2">Required Certifications</h4>
          <div className="flex flex-wrap gap-2">
            {data.certifications.map((cert: string, i: number) => (
              <span key={i} className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-sm">{cert}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// SIX FOUNDATIONAL PILLARS BLOCK - SphereNet Architecture
// =============================================================================
function SixFoundationalPillarsBlock({ data }: { data: any }) {
  const [expandedPillar, setExpandedPillar] = useState<number | null>(null);

  const pillarColors: Record<string, string> = {
    'Liquidity': 'bg-blue-500/20 border-blue-500/50',
    'Privacy': 'bg-purple-500/20 border-purple-500/50',
    'Credible Neutrality': 'bg-emerald-500/20 border-emerald-500/50',
    'Compliance': 'bg-green-500/20 border-green-500/50',
    'Security': 'bg-red-500/20 border-red-500/50',
    'Governance': 'bg-amber-500/20 border-amber-500/50',
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">🏛️ {data.title}</h3>
      {data.subtitle && <p className="text-blue-300 text-sm mb-2">{data.subtitle}</p>}
      {data.overview && <p className="text-gray-300 mb-6">{data.overview}</p>}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.pillars?.map((pillar: any, i: number) => (
          <div
            key={i}
            className={`rounded-lg border p-4 cursor-pointer transition-all hover:scale-[1.02] ${pillarColors[pillar.pillar] || 'bg-slate-700/50 border-slate-600'}`}
            onClick={() => setExpandedPillar(expandedPillar === i ? null : i)}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{pillar.icon}</span>
              <h4 className="text-white font-semibold">{pillar.pillar}</h4>
            </div>
            <p className="text-gray-300 text-sm mb-3">{pillar.description}</p>

            {expandedPillar === i && (
              <div className="mt-3 pt-3 border-t border-slate-600 space-y-3">
                <div className="bg-slate-700/50 rounded p-3">
                  <p className="text-blue-300 text-xs font-semibold mb-1">Implementation:</p>
                  <p className="text-gray-400 text-sm">{pillar.implementation}</p>
                </div>
                <div className="bg-emerald-500/10 rounded p-3">
                  <p className="text-emerald-300 text-xs font-semibold mb-1">Why It Matters:</p>
                  <p className="text-gray-400 text-sm">{pillar.whyItMatters}</p>
                </div>
              </div>
            )}

            <p className="text-gray-500 text-xs mt-2">{expandedPillar === i ? '▲ Click to collapse' : '▼ Click to expand'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// THREE COMPONENT MODEL BLOCK - SphereNet Architecture
// =============================================================================
function ThreeComponentModelBlock({ data }: { data: any }) {
  const [expandedComponent, setExpandedComponent] = useState<number | null>(null);

  const componentColors = [
    'border-l-blue-500 bg-blue-500/10',
    'border-l-purple-500 bg-purple-500/10',
    'border-l-emerald-500 bg-emerald-500/10',
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">🔧 {data.title}</h3>
      {data.subtitle && <p className="text-purple-300 text-sm mb-4">{data.subtitle}</p>}

      <div className="space-y-4">
        {data.components?.map((comp: any, i: number) => (
          <div
            key={i}
            className={`rounded-lg border-l-4 p-4 cursor-pointer transition-all ${componentColors[i] || 'border-l-slate-500 bg-slate-700/50'}`}
            onClick={() => setExpandedComponent(expandedComponent === i ? null : i)}
          >
            <div className="flex items-center justify-between">
              <h4 className="text-white font-semibold">{comp.component}</h4>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedComponent === i ? 'rotate-180' : ''}`} />
            </div>
            <p className="text-gray-300 text-sm mt-1">{comp.description}</p>
            <p className="text-gray-400 text-xs mt-2"><span className="text-blue-300">Responsibility:</span> {comp.responsibility}</p>

            {expandedComponent === i && (
              <div className="mt-4 space-y-3">
                {comp.features && (
                  <div className="bg-slate-700/50 rounded p-3">
                    <p className="text-blue-300 text-xs font-semibold mb-2">Key Features:</p>
                    <ul className="text-gray-300 text-sm space-y-1">
                      {comp.features.map((f: string, j: number) => (
                        <li key={j}>• {f}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {comp.applications && (
                  <div className="bg-slate-700/50 rounded p-3">
                    <p className="text-purple-300 text-xs font-semibold mb-2">Applications:</p>
                    <ul className="text-gray-300 text-sm space-y-1">
                      {comp.applications.map((a: string, j: number) => (
                        <li key={j}>• {a}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {comp.examples && (
                  <div className="bg-slate-700/50 rounded p-3">
                    <p className="text-emerald-300 text-xs font-semibold mb-2">Examples:</p>
                    <ul className="text-gray-300 text-sm space-y-1">
                      {comp.examples.map((e: string, j: number) => (
                        <li key={j}>• {e}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {comp.governance && (
                  <p className="text-amber-300 text-xs bg-amber-500/10 rounded p-2">
                    <span className="font-semibold">Governance:</span> {comp.governance}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {data.keyInsight && (
        <div className="mt-4 bg-blue-500/10 rounded p-4">
          <p className="text-blue-200 text-sm">💡 {data.keyInsight}</p>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// TRIPLE CROWN FRAMEWORK BLOCK - 2026 Strategy
// =============================================================================
function TripleCrownFrameworkBlock({ data }: { data: any }) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl p-6 border border-purple-500/30">
      <h3 className="font-semibold text-white mb-2 text-xl">👑 {data.title}</h3>
      {data.subtitle && <p className="text-purple-300 text-sm mb-2">{data.subtitle}</p>}

      {/* Theme Banner */}
      {data.theme && (
        <div className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-lg p-4 mb-6 text-center">
          <p className="text-2xl font-bold text-white">{data.theme}</p>
          {data.themeExplanation && <p className="text-gray-300 text-sm mt-2">{data.themeExplanation}</p>}
        </div>
      )}

      {/* Vision */}
      {data.vision && (
        <div className="bg-blue-500/20 rounded-lg p-4 mb-4">
          <h4 className="text-blue-300 font-semibold mb-2">{data.vision.title}</h4>
          <p className="text-white leading-relaxed">{data.vision.statement}</p>
        </div>
      )}

      {/* Values */}
      {data.values && (
        <div className="mb-4">
          <button
            onClick={() => setExpandedSection(expandedSection === 'values' ? null : 'values')}
            className="w-full bg-emerald-500/20 rounded-lg p-4 text-left hover:bg-emerald-500/30 transition"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-emerald-300 font-semibold">{data.values.title}</h4>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'values' ? 'rotate-180' : ''}`} />
            </div>
            {data.values.subtitle && <p className="text-gray-400 text-sm">{data.values.subtitle}</p>}
          </button>
          {expandedSection === 'values' && (
            <div className="mt-2 space-y-2 p-4 bg-slate-800/50 rounded-lg">
              {data.values.principles?.map((p: any, i: number) => (
                <div key={i} className="flex items-start gap-3 p-2 bg-slate-700/50 rounded">
                  <span className="text-emerald-400 font-bold">{i + 1}.</span>
                  <div>
                    <p className="text-white font-semibold">{p.value}</p>
                    <p className="text-gray-400 text-sm">{p.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Methods */}
      {data.methods && (
        <div className="mb-4">
          <button
            onClick={() => setExpandedSection(expandedSection === 'methods' ? null : 'methods')}
            className="w-full bg-purple-500/20 rounded-lg p-4 text-left hover:bg-purple-500/30 transition"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-purple-300 font-semibold">{data.methods.title}</h4>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'methods' ? 'rotate-180' : ''}`} />
            </div>
          </button>
          {expandedSection === 'methods' && (
            <div className="mt-2 space-y-2 p-4 bg-slate-800/50 rounded-lg">
              {data.methods.approaches?.map((m: any, i: number) => (
                <div key={i} className="p-3 bg-slate-700/50 rounded">
                  <p className="text-purple-300 font-semibold">{m.method}</p>
                  <p className="text-gray-400 text-sm">{m.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Obstacles */}
      {data.obstacles && (
        <div className="mb-4">
          <button
            onClick={() => setExpandedSection(expandedSection === 'obstacles' ? null : 'obstacles')}
            className="w-full bg-amber-500/20 rounded-lg p-4 text-left hover:bg-amber-500/30 transition"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-amber-300 font-semibold">{data.obstacles.title}</h4>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'obstacles' ? 'rotate-180' : ''}`} />
            </div>
          </button>
          {expandedSection === 'obstacles' && (
            <div className="mt-2 p-4 bg-slate-800/50 rounded-lg">
              <ul className="space-y-2">
                {data.obstacles.challenges?.map((c: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300">
                    <span className="text-amber-400">⚠️</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Measures */}
      {data.measures && (
        <div>
          <button
            onClick={() => setExpandedSection(expandedSection === 'measures' ? null : 'measures')}
            className="w-full bg-blue-500/20 rounded-lg p-4 text-left hover:bg-blue-500/30 transition"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-blue-300 font-semibold">{data.measures.title}</h4>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'measures' ? 'rotate-180' : ''}`} />
            </div>
          </button>
          {expandedSection === 'measures' && (
            <div className="mt-2 p-4 bg-slate-800/50 rounded-lg">
              <div className="grid md:grid-cols-2 gap-3">
                {data.measures.targets?.map((t: any, i: number) => (
                  <div key={i} className="bg-slate-700/50 rounded p-3">
                    <p className="text-blue-300 font-semibold">{t.metric}</p>
                    <p className="text-2xl font-bold text-white my-1">{t.target}</p>
                    <p className="text-gray-400 text-xs">{t.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// =============================================================================
// COMPANY OKRS BLOCK - 2026 Strategy
// =============================================================================
function CompanyOKRsBlock({ data }: { data: any }) {
  const [expandedOKR, setExpandedOKR] = useState<number | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">🎯 {data.title}</h3>
      {data.subtitle && <p className="text-blue-300 text-sm mb-4">{data.subtitle}</p>}

      <div className="space-y-4">
        {data.objectives?.map((obj: any, i: number) => (
          <div
            key={i}
            className="bg-slate-700/50 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setExpandedOKR(expandedOKR === i ? null : i)}
              className="w-full p-4 text-left hover:bg-slate-700 transition flex items-center justify-between"
            >
              <div>
                <h4 className="text-white font-semibold">{obj.objective}</h4>
                {obj.timing && <p className="text-purple-300 text-xs mt-1">{obj.timing}</p>}
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedOKR === i ? 'rotate-180' : ''}`} />
            </button>

            {expandedOKR === i && (
              <div className="px-4 pb-4 space-y-3">
                {/* Key Results */}
                <div>
                  <p className="text-blue-300 text-sm font-semibold mb-2">Key Results:</p>
                  <ul className="space-y-2">
                    {obj.keyResults?.map((kr: string, j: number) => (
                      <li key={j} className="flex items-start gap-2 text-gray-300 text-sm bg-blue-500/10 rounded p-2">
                        <span className="text-blue-400 font-bold">KR{j + 1}</span>
                        <span>{kr}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Why It Matters */}
                {obj.whyItMatters && (
                  <div className="bg-emerald-500/10 rounded p-3">
                    <p className="text-emerald-300 text-xs font-semibold mb-1">Why It Matters:</p>
                    <p className="text-gray-300 text-sm">{obj.whyItMatters}</p>
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

// =============================================================================
// INTERNATIONAL EXPANSION BLOCK - 2026 Strategy
// =============================================================================
function InternationalExpansionBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">🌍 {data.title}</h3>
      {data.subtitle && <p className="text-blue-300 text-sm mb-4">{data.subtitle}</p>}

      {/* Tranches */}
      <div className="space-y-4 mb-6">
        {data.tranches?.map((tranche: any, i: number) => {
          const trancheColors = [
            'border-emerald-500 bg-emerald-500/10',
            'border-blue-500 bg-blue-500/10',
            'border-purple-500 bg-purple-500/10',
          ];
          return (
            <div key={i} className={`border-l-4 rounded-lg p-4 ${trancheColors[i] || 'border-gray-500 bg-slate-700/50'}`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold">{tranche.tranche}</h4>
                <span className={`px-2 py-0.5 rounded text-xs ${
                  tranche.status === 'Active/Launching' ? 'bg-emerald-500/30 text-emerald-300' :
                  tranche.status === 'Planned' ? 'bg-blue-500/30 text-blue-300' :
                  'bg-purple-500/30 text-purple-300'
                }`}>{tranche.status}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {tranche.countries?.map((country: string, j: number) => (
                  <span key={j} className="bg-slate-700 text-gray-300 px-2 py-1 rounded text-sm">{country}</span>
                ))}
              </div>
              <p className="text-gray-400 text-sm">{tranche.rationale}</p>
            </div>
          );
        })}
      </div>

      {/* Expansion Requirements */}
      {data.expansionRequirements && (
        <div className="bg-amber-500/10 rounded-lg p-4">
          <h4 className="text-amber-300 font-semibold mb-3">📋 Expansion Requirements</h4>
          <ul className="space-y-1">
            {data.expansionRequirements.map((req: string, i: number) => (
              <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                <span className="text-amber-400">✓</span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// SPHERENET STRATEGY BLOCK - 2026 Strategy
// =============================================================================
function SphereNetStrategyBlock({ data }: { data: any }) {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);

  return (
    <div className="bg-purple-500/10 rounded-xl p-6 border border-purple-500/30">
      <h3 className="font-semibold text-white mb-2 text-xl">🔮 {data.title}</h3>
      {data.goal && <p className="text-purple-300 mb-4">{data.goal}</p>}

      {/* Product Roadmap */}
      {data.productRoadmap && (
        <div className="mb-6">
          <h4 className="text-white font-semibold mb-3">Product Roadmap</h4>
          <div className="space-y-3">
            {data.productRoadmap.map((phase: any, i: number) => (
              <div key={i} className="bg-slate-800/50 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedPhase(expandedPhase === i ? null : i)}
                  className="w-full p-3 text-left hover:bg-slate-700/50 transition flex items-center justify-between"
                >
                  <span className="text-purple-300 font-semibold">{phase.phase}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedPhase === i ? 'rotate-180' : ''}`} />
                </button>
                {expandedPhase === i && (
                  <div className="px-3 pb-3">
                    <ul className="space-y-1">
                      {phase.milestones?.map((m: string, j: number) => (
                        <li key={j} className="text-gray-300 text-sm flex items-start gap-2">
                          <span className="text-purple-400">→</span>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FDE Model */}
      {data.fdeModel && (
        <div className="bg-blue-500/10 rounded-lg p-4">
          <h4 className="text-blue-300 font-semibold mb-2">{data.fdeModel.title}</h4>
          <p className="text-gray-300 text-sm mb-3">{data.fdeModel.description}</p>

          {data.fdeModel.squadComposition && (
            <div className="space-y-2">
              <p className="text-blue-300 text-xs font-semibold">Squad Composition:</p>
              {data.fdeModel.squadComposition.map((member: any, i: number) => (
                <div key={i} className="flex items-center gap-3 bg-slate-700/50 rounded p-2">
                  <span className="text-blue-400 font-bold text-sm">{member.role}</span>
                  <span className="text-gray-400 text-xs">{member.expertise}</span>
                </div>
              ))}
            </div>
          )}

          {data.fdeModel.engagement && (
            <p className="text-gray-400 text-xs mt-3 italic">{data.fdeModel.engagement}</p>
          )}
        </div>
      )}
    </div>
  );
}

// =============================================================================
// QUANTIFIED BENCHMARKS BLOCK - Competitive Positioning
// =============================================================================
function QuantifiedBenchmarksBlock({ data }: { data: any }) {
  return (
    <div className="bg-emerald-500/10 rounded-xl p-6 border border-emerald-500/30">
      <h3 className="font-semibold text-white mb-2 text-xl">📊 {data.title}</h3>
      {data.subtitle && <p className="text-emerald-300 text-sm mb-4">{data.subtitle}</p>}

      <div className="space-y-4">
        {data.metrics?.map((metric: any, i: number) => (
          <div key={i} className="bg-slate-800/50 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <h4 className="text-white font-semibold">{metric.metric}</h4>
            </div>
            <div className="grid md:grid-cols-2 gap-3 mb-2">
              <div className="bg-emerald-500/20 rounded p-3">
                <p className="text-emerald-300 text-xs font-semibold">Sphere</p>
                <p className="text-white font-bold text-lg">{metric.sphere}</p>
              </div>
              <div className="bg-red-500/20 rounded p-3">
                <p className="text-red-300 text-xs font-semibold">Industry Average</p>
                <p className="text-white font-bold text-lg">{metric.industryAverage}</p>
              </div>
            </div>
            {metric.note && (
              <p className="text-gray-400 text-xs bg-slate-700/50 rounded p-2">💡 {metric.note}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// TECHNICAL DIFFERENTIATION BLOCK - Competitive Positioning
// =============================================================================
function TechnicalDifferentiationBlock({ data }: { data: any }) {
  const [expandedComp, setExpandedComp] = useState<string | null>(null);

  const competitors = ['vsSolana', 'vsCanton', 'vsEthereum', 'vsArcTempo'];
  const competitorNames: Record<string, string> = {
    vsSolana: 'Solana',
    vsCanton: 'Canton',
    vsEthereum: 'Ethereum/EVM',
    vsArcTempo: 'Arc/Tempo/GCUL',
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">⚔️ {data.title}</h3>
      {data.subtitle && <p className="text-blue-300 text-sm mb-4">{data.subtitle}</p>}

      <div className="space-y-3">
        {competitors.map((compKey) => {
          const comp = data[compKey];
          if (!comp) return null;

          return (
            <div key={compKey} className="bg-slate-700/50 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedComp(expandedComp === compKey ? null : compKey)}
                className="w-full p-4 text-left hover:bg-slate-700 transition flex items-center justify-between"
              >
                <div>
                  <h4 className="text-white font-semibold">vs {comp.competitor}</h4>
                  <p className="text-gray-400 text-xs mt-1">Strength: {comp.theirStrength}</p>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedComp === compKey ? 'rotate-180' : ''}`} />
              </button>

              {expandedComp === compKey && (
                <div className="px-4 pb-4 space-y-3">
                  {/* Differences */}
                  {comp.sphereNetDifferences && (
                    <div>
                      <p className="text-emerald-300 text-sm font-semibold mb-2">SphereNet Advantages:</p>
                      <div className="space-y-2">
                        {comp.sphereNetDifferences.map((diff: any, i: number) => (
                          <div key={i} className="bg-emerald-500/10 rounded p-3">
                            <p className="text-emerald-300 font-semibold text-sm">{diff.feature}</p>
                            <p className="text-gray-300 text-sm">{diff.difference}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* When to Use */}
                  {comp.whenToUse && (
                    <div className="bg-blue-500/10 rounded p-3">
                      <p className="text-blue-300 text-xs font-semibold mb-1">Positioning:</p>
                      <p className="text-gray-300 text-sm">{comp.whenToUse}</p>
                    </div>
                  )}

                  {/* Key Insight */}
                  {comp.keyInsight && (
                    <div className="bg-amber-500/10 rounded p-3">
                      <p className="text-amber-300 text-sm">💡 {comp.keyInsight}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// =============================================================================
// FIVE VERTICALS BLOCK - Use Cases
// =============================================================================
function FiveVerticalsBlock({ data }: { data: any }) {
  const [expandedVertical, setExpandedVertical] = useState<string | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">🎯 {data.title}</h3>
      {data.subtitle && <p className="text-blue-300 text-sm mb-2">{data.subtitle}</p>}
      {data.overview && <p className="text-gray-300 mb-6">{data.overview}</p>}

      {/* SpherePay Verticals */}
      {data.spherePayVerticals && (
        <div className="mb-6">
          <h4 className="text-emerald-300 font-semibold mb-3 flex items-center gap-2">
            <span className="bg-emerald-500/30 px-2 py-0.5 rounded text-xs">LIVE</span>
            {data.spherePayVerticals.title}
          </h4>
          <div className="space-y-3">
            {data.spherePayVerticals.verticals?.map((v: any, i: number) => (
              <div key={i} className="bg-emerald-500/10 rounded-lg overflow-hidden border border-emerald-500/30">
                <button
                  onClick={() => setExpandedVertical(expandedVertical === `pay-${i}` ? null : `pay-${i}`)}
                  className="w-full p-4 text-left hover:bg-emerald-500/20 transition flex items-center justify-between"
                >
                  <div>
                    <h5 className="text-white font-semibold">{v.vertical}</h5>
                    <p className="text-emerald-300 text-xs">{v.status}</p>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedVertical === `pay-${i}` ? 'rotate-180' : ''}`} />
                </button>

                {expandedVertical === `pay-${i}` && (
                  <div className="px-4 pb-4 space-y-3">
                    <p className="text-gray-300">{v.description}</p>

                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="bg-slate-700/50 rounded p-3">
                        <p className="text-blue-300 text-xs font-semibold mb-1">Customer Profile:</p>
                        <p className="text-gray-400 text-sm">{v.customerProfile}</p>
                      </div>
                      <div className="bg-slate-700/50 rounded p-3">
                        <p className="text-purple-300 text-xs font-semibold mb-1">Differentiator:</p>
                        <p className="text-gray-400 text-sm">{v.differentiator}</p>
                      </div>
                    </div>

                    {v.example && (
                      <p className="text-gray-400 text-sm bg-slate-700/50 rounded p-2">
                        <span className="text-emerald-300">Example:</span> {v.example}
                      </p>
                    )}

                    {v.businessCase && (
                      <div className="bg-amber-500/10 rounded p-3">
                        <p className="text-amber-300 text-xs font-semibold mb-2">{v.businessCase.title}</p>
                        <p className="text-gray-400 text-xs mb-1"><span className="text-red-300">Traditional:</span> {v.businessCase.traditional}</p>
                        <p className="text-gray-400 text-xs mb-1"><span className="text-emerald-300">Sphere:</span> {v.businessCase.sphere}</p>
                        <p className="text-white text-sm mt-2">💡 {v.businessCase.impact}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SphereNet Verticals */}
      {data.sphereNetVerticals && (
        <div className="mb-6">
          <h4 className="text-purple-300 font-semibold mb-3 flex items-center gap-2">
            <span className="bg-purple-500/30 px-2 py-0.5 rounded text-xs">COMING SOON</span>
            {data.sphereNetVerticals.title}
          </h4>
          <div className="space-y-3">
            {data.sphereNetVerticals.verticals?.map((v: any, i: number) => (
              <div key={i} className="bg-purple-500/10 rounded-lg overflow-hidden border border-purple-500/30">
                <button
                  onClick={() => setExpandedVertical(expandedVertical === `net-${i}` ? null : `net-${i}`)}
                  className="w-full p-4 text-left hover:bg-purple-500/20 transition flex items-center justify-between"
                >
                  <div>
                    <h5 className="text-white font-semibold">{v.vertical}</h5>
                    <p className="text-purple-300 text-xs">{v.status}</p>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedVertical === `net-${i}` ? 'rotate-180' : ''}`} />
                </button>

                {expandedVertical === `net-${i}` && (
                  <div className="px-4 pb-4 space-y-3">
                    <p className="text-gray-300">{v.description}</p>

                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="bg-slate-700/50 rounded p-3">
                        <p className="text-blue-300 text-xs font-semibold mb-1">Customer Profile:</p>
                        <p className="text-gray-400 text-sm">{v.customerProfile}</p>
                      </div>
                      <div className="bg-slate-700/50 rounded p-3">
                        <p className="text-purple-300 text-xs font-semibold mb-1">Differentiator:</p>
                        <p className="text-gray-400 text-sm">{v.differentiator}</p>
                      </div>
                    </div>

                    {v.positioning && (
                      <p className="text-purple-200 text-sm bg-purple-500/20 rounded p-2">{v.positioning}</p>
                    )}

                    {v.relationship && (
                      <p className="text-gray-400 text-sm bg-slate-700/50 rounded p-2">
                        <span className="text-emerald-300">SpherePay Integration:</span> {v.relationship}
                      </p>
                    )}

                    {v.regulatoryPath && (
                      <p className="text-amber-300 text-xs bg-amber-500/10 rounded p-2">
                        ⚠️ {v.regulatoryPath}
                      </p>
                    )}

                    {v.note && (
                      <p className="text-gray-500 text-xs italic">{v.note}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dual Product Story */}
      {data.dualProductStory && (
        <div className="bg-gradient-to-r from-emerald-500/10 to-purple-500/10 rounded-lg p-4 border border-slate-600">
          <h4 className="text-white font-semibold mb-4">{data.dualProductStory.title}</h4>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {/* SpherePay */}
            {data.dualProductStory.spacePayRole && (
              <div className="bg-emerald-500/20 rounded p-3">
                <h5 className="text-emerald-300 font-semibold">{data.dualProductStory.spacePayRole.title}</h5>
                <p className="text-emerald-200 text-xs mt-1">{data.dualProductStory.spacePayRole.status}</p>
                <p className="text-gray-300 text-sm mt-2">{data.dualProductStory.spacePayRole.value}</p>
                <p className="text-gray-400 text-xs mt-2">{data.dualProductStory.spacePayRole.contribution}</p>
              </div>
            )}

            {/* SphereNet */}
            {data.dualProductStory.sphereNetRole && (
              <div className="bg-purple-500/20 rounded p-3">
                <h5 className="text-purple-300 font-semibold">{data.dualProductStory.sphereNetRole.title}</h5>
                <p className="text-purple-200 text-xs mt-1">{data.dualProductStory.sphereNetRole.status}</p>
                <p className="text-gray-300 text-sm mt-2">{data.dualProductStory.sphereNetRole.value}</p>
                <p className="text-gray-400 text-xs mt-2">{data.dualProductStory.sphereNetRole.contribution}</p>
              </div>
            )}
          </div>

          {/* Hyperliquid Playbook */}
          {data.dualProductStory.hyperliquidPlaybook && (
            <div className="bg-blue-500/10 rounded p-3">
              <h5 className="text-blue-300 font-semibold">{data.dualProductStory.hyperliquidPlaybook.title}</h5>
              <p className="text-gray-300 text-sm mt-2">{data.dualProductStory.hyperliquidPlaybook.concept}</p>
              <p className="text-gray-400 text-xs mt-2">{data.dualProductStory.hyperliquidPlaybook.execution}</p>
              {data.dualProductStory.hyperliquidPlaybook.precedent && (
                <p className="text-blue-200 text-xs mt-2 italic">{data.dualProductStory.hyperliquidPlaybook.precedent}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
