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
      return <SampleResponsesBlock data={value} />;

    // ===========================================
    // NEW SECTION 5.4 - COMPETITIVE POSITIONING
    // ===========================================
    case 'competitorCategories':
      return <CompetitorCategoriesBlock data={value} />;
    
    case 'spherePayCompetitors':
    case 'sphereNetCompetitors':
      return <CompetitorLandscapeBlock data={value} />;
    
    case 'vsTraditionalBanks':
    case 'vsCryptoNative':
      return <VsComparisonBlock data={value} />;
    
    case 'positioningFramework':
      return <PositioningFrameworkBlock data={value} />;
    
    case 'whenToWalkAway':
      return <WhenToWalkAwayBlock data={value} />;

    // ===========================================
    // NEW SECTION 5.5 - BOB AND AHMED EXPANDED
    // ===========================================
    case 'bobAndAhmed':
      return <BobAndAhmedBlock data={value} />;
    
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
    
    case 'sampleResponses':
      return <SampleResponsesBlock data={value} />;

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
    
    case 'travelRuleProtocols':
      return <TravelRuleProtocolsBlock data={value} />;
    
    case 'transmissionMethods':
      return <TransmissionMethodsBlock data={value} />;
    
    case 'transactionsApplied':
      return <TransactionsAppliedBlock data={value} />;
    
    case 'edgeCases':
      return <EdgeCasesBlock data={value} />;

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


// =============================================================================
// PILLAR 3 EXPANDED - NEW COMPONENTS
// =============================================================================

// Classification Matters Block (Section 3.1)
function ClassificationMattersBlock({ data }: { data: any }) {
  const [expandedCase, setExpandedCase] = useState<string | null>(null);
  
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}
      
      {data.consequences && (
        <div className="space-y-3 mb-4">
          {data.consequences.map((c: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">{c.determination}</h4>
              <p className="text-gray-400 text-sm mb-2">{c.detail}</p>
              {c.sphereImplication && (
                <p className="text-emerald-300 text-sm"><span className="font-semibold">Sphere:</span> {c.sphereImplication}</p>
              )}
            </div>
          ))}
        </div>
      )}
      
      {data.caseStudies && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
          <h4 className="text-red-300 font-semibold mb-3">{data.caseStudies.title}</h4>
          <div className="space-y-3">
            {data.caseStudies.cases?.map((cs: any, i: number) => (
              <div key={i} className="bg-slate-800/50 rounded p-3">
                <button
                  onClick={() => setExpandedCase(expandedCase === cs.company ? null : cs.company)}
                  className="w-full text-left"
                >
                  <h5 className="text-white font-medium">{cs.company}</h5>
                </button>
                {expandedCase === cs.company && (
                  <div className="mt-2 text-sm">
                    <p className="text-gray-400"><span className="text-gray-500">Issue:</span> {cs.issue}</p>
                    <p className="text-red-300"><span className="text-gray-500">Consequence:</span> {cs.consequence}</p>
                    <p className="text-amber-300"><span className="text-gray-500">Lesson:</span> {cs.lesson}</p>
                    {cs.sphereRelevance && <p className="text-emerald-300"><span className="text-gray-500">Sphere:</span> {cs.sphereRelevance}</p>}
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

// Sample Responses Block (Section 3.1)
function SampleResponsesBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>
      <div className="space-y-4">
        {data.scenarios?.map((s: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4">
            <h4 className="text-blue-300 font-medium mb-2">{s.scenario}</h4>
            <div className="bg-slate-800/50 rounded p-3 mb-3">
              <p className="text-gray-300 text-sm italic">"{s.response}"</p>
            </div>
            {s.keyPoints && (
              <div className="flex flex-wrap gap-2">
                {s.keyPoints.map((p: string, j: number) => (
                  <span key={j} className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded">{p}</span>
                ))}
              </div>
            )}
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
      <div className="grid md:grid-cols-2 gap-3">
        {data.definitions?.map((d: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-blue-400 font-bold">{d.term}</span>
              {d.fullName && <span className="text-gray-500 text-sm">({d.fullName})</span>}
            </div>
            <p className="text-gray-300 text-sm mb-2">{d.definition}</p>
            {d.sphereContext && (
              <p className="text-emerald-300 text-xs"><span className="font-semibold">Sphere:</span> {d.sphereContext}</p>
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
          <h4 className="text-white font-medium">Real Examples:</h4>
          {data.specificExamples.map((ex: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedExample(expandedExample === i ? null : i)}
                className="w-full p-3 text-left flex justify-between items-center hover:bg-slate-700/70"
              >
                <span className="text-white font-medium">{ex.example}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedExample === i ? 'rotate-180' : ''}`} />
              </button>
              {expandedExample === i && (
                <div className="px-3 pb-3 text-sm">
                  <p className="text-gray-300 mb-2">{ex.story}</p>
                  <p className="text-emerald-300"><span className="text-gray-500">Outcome:</span> {ex.outcome}</p>
                  <p className="text-amber-300"><span className="text-gray-500">Lesson:</span> {ex.lesson}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {data.bankingPartnerRequirements && (
        <div className="mt-4 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <h4 className="text-blue-300 font-medium mb-2">Banking Partner Requirements:</h4>
          <div className="grid md:grid-cols-2 gap-2">
            {data.bankingPartnerRequirements.map((r: any, i: number) => (
              <div key={i} className="text-sm">
                <span className="text-white font-medium">{r.requirement}:</span>{' '}
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
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>
      
      {data.individualVerification && (
        <div className="mb-4">
          <h4 className="text-blue-300 font-medium mb-2">{data.individualVerification.title}</h4>
          <div className="space-y-2">
            {data.individualVerification.requirements?.map((r: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded p-3">
                <div className="flex justify-between items-start">
                  <span className="text-white font-medium">{r.category}</span>
                  <span className="text-emerald-300 text-xs">{r.required}</span>
                </div>
                {r.acceptable && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {r.acceptable.map((a: string, j: number) => (
                      <span key={j} className="text-xs bg-slate-600 text-gray-300 px-2 py-0.5 rounded">{a}</span>
                    ))}
                  </div>
                )}
                {r.notes && <p className="text-gray-500 text-xs mt-1">{r.notes}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {data.businessVerification && (
        <div>
          <h4 className="text-purple-300 font-medium mb-2">{data.businessVerification.title}</h4>
          <div className="space-y-2">
            {data.businessVerification.requirements?.map((r: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded p-3">
                <div className="flex justify-between items-start">
                  <span className="text-white font-medium">{r.category}</span>
                  <span className="text-emerald-300 text-xs">{r.required}</span>
                </div>
                {r.acceptable && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {r.acceptable.map((a: string, j: number) => (
                      <span key={j} className="text-xs bg-slate-600 text-gray-300 px-2 py-0.5 rounded">{a}</span>
                    ))}
                  </div>
                )}
                {r.detail && <p className="text-gray-400 text-xs mt-1">{r.detail}</p>}
                {r.notes && <p className="text-gray-500 text-xs mt-1">{r.notes}</p>}
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
              className="w-full p-4 text-left flex justify-between items-center hover:bg-slate-700/70"
            >
              <span className="text-white font-medium">{p.pillar}</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedPillar === i ? 'rotate-180' : ''}`} />
            </button>
            {expandedPillar === i && (
              <div className="px-4 pb-4 space-y-2">
                <p className="text-gray-300 text-sm">{p.requirement}</p>
                {p.includes && (
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Includes:</p>
                    <ul className="text-gray-400 text-xs space-y-0.5">
                      {p.includes.map((item: string, j: number) => (
                        <li key={j}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {p.responsibilities && (
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Responsibilities:</p>
                    <ul className="text-gray-400 text-xs space-y-0.5">
                      {p.responsibilities.map((r: string, j: number) => (
                        <li key={j}>• {r}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {p.elements && (
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Elements:</p>
                    <ul className="text-gray-400 text-xs space-y-0.5">
                      {p.elements.map((e: string, j: number) => (
                        <li key={j}>• {e}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {p.scope && (
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Scope:</p>
                    <ul className="text-gray-400 text-xs space-y-0.5">
                      {p.scope.map((s: string, j: number) => (
                        <li key={j}>• {s}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {p.sphereImplementation && (
                  <p className="text-emerald-300 text-xs mt-2"><span className="font-semibold">Sphere:</span> {p.sphereImplementation}</p>
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
      <div className="space-y-3">
        {data.requirements?.map((r: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4">
            <h4 className="text-blue-300 font-medium mb-2">{r.requirement}</h4>
            <p className="text-gray-300 text-sm mb-2">{r.detail}</p>
            {r.forIndividuals && (
              <div className="mb-2">
                <span className="text-gray-500 text-xs">Individuals:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {r.forIndividuals.map((item: string, j: number) => (
                    <span key={j} className="text-xs bg-slate-600 text-gray-300 px-2 py-0.5 rounded">{item}</span>
                  ))}
                </div>
              </div>
            )}
            {r.forEntities && (
              <div className="mb-2">
                <span className="text-gray-500 text-xs">Entities:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {r.forEntities.map((item: string, j: number) => (
                    <span key={j} className="text-xs bg-slate-600 text-gray-300 px-2 py-0.5 rounded">{item}</span>
                  ))}
                </div>
              </div>
            )}
            {r.toCollect && (
              <div className="mb-2">
                <span className="text-gray-500 text-xs">To Collect:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {r.toCollect.map((item: string, j: number) => (
                    <span key={j} className="text-xs bg-slate-600 text-gray-300 px-2 py-0.5 rounded">{item}</span>
                  ))}
                </div>
              </div>
            )}
            {r.timing && <p className="text-amber-300 text-xs">Timing: {r.timing}</p>}
            {r.purpose && <p className="text-gray-400 text-xs">Purpose: {r.purpose}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

// EDD Requirements Block (Section 3.2)
function EDDRequirementsBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>
      
      {data.triggers && (
        <div className="mb-4">
          <h4 className="text-red-300 font-medium mb-2">EDD Triggers:</h4>
          <div className="space-y-2">
            {data.triggers.map((t: any, i: number) => (
              <div key={i} className="bg-red-500/10 border border-red-500/30 rounded p-3">
                <h5 className="text-white font-medium">{t.trigger}</h5>
                <p className="text-gray-400 text-xs mb-1">Why: {t.why}</p>
                {t.eddRequired && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {t.eddRequired.map((item: string, j: number) => (
                      <span key={j} className="text-xs bg-red-500/20 text-red-300 px-2 py-0.5 rounded">{item}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {data.components && (
        <div>
          <h4 className="text-blue-300 font-medium mb-2">EDD Components:</h4>
          <div className="grid md:grid-cols-2 gap-2">
            {data.components.map((c: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded p-3">
                <span className="text-white font-medium text-sm">{c.component}:</span>
                <span className="text-gray-400 text-xs ml-1">{c.detail}</span>
              </div>
            ))}
          </div>
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
          <h4 className="text-amber-300 font-medium mb-2">Filing Thresholds:</h4>
          <div className="space-y-2">
            {data.thresholds.map((t: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded p-3 flex justify-between items-center">
                <div>
                  <span className="text-white font-medium">{t.category}</span>
                  <p className="text-gray-400 text-xs">{t.detail}</p>
                </div>
                <span className="text-amber-300 font-bold">{t.threshold}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {data.process && (
        <div className="mb-4">
          <h4 className="text-blue-300 font-medium mb-2">SAR Process:</h4>
          <div className="flex flex-wrap gap-2">
            {data.process.map((p: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded px-3 py-2">
                <span className="text-blue-400 font-bold">{p.step}.</span>
                <span className="text-white ml-1">{p.action}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {data.timeline && (
        <p className="text-amber-300 text-sm mb-4">⏱️ {data.timeline}</p>
      )}
      
      {data.confidentiality && (
        <div className="bg-red-500/10 border border-red-500/30 rounded p-4">
          <h4 className="text-red-300 font-medium mb-2">Confidentiality Rules:</h4>
          <ul className="text-gray-300 text-sm space-y-1">
            {data.confidentiality.rules?.map((r: any, i: number) => (
              <li key={i}>• <span className="text-white">{r.rule}:</span> {r.detail}</li>
            ))}
          </ul>
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
        <div className="space-y-4 mb-4">
          {data.categories.map((cat: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                <span>{cat.icon}</span> {cat.category}
              </h4>
              <div className="space-y-2">
                {cat.factors?.map((f: any, j: number) => (
                  <div key={j} className="grid grid-cols-4 gap-2 text-xs">
                    <span className="text-gray-400">{f.factor}</span>
                    <span className="text-red-300 bg-red-500/10 px-2 py-1 rounded">{f.high}</span>
                    <span className="text-amber-300 bg-amber-500/10 px-2 py-1 rounded">{f.medium}</span>
                    <span className="text-emerald-300 bg-emerald-500/10 px-2 py-1 rounded">{f.low}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {data.riskRatings && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-700">
                <th className="p-2 text-left text-white">Rating</th>
                <th className="p-2 text-left text-gray-400">Criteria</th>
                <th className="p-2 text-left text-gray-400">Monitoring</th>
                <th className="p-2 text-left text-gray-400">Refresh</th>
              </tr>
            </thead>
            <tbody>
              {data.riskRatings.map((r: any, i: number) => (
                <tr key={i} className="border-t border-slate-700">
                  <td className={`p-2 font-medium ${r.rating === 'Prohibited' ? 'text-red-400' : r.rating === 'High' ? 'text-amber-400' : r.rating === 'Medium' ? 'text-yellow-400' : 'text-emerald-400'}`}>{r.rating}</td>
                  <td className="p-2 text-gray-300">{r.criteria}</td>
                  <td className="p-2 text-gray-400">{r.monitoring}</td>
                  <td className="p-2 text-gray-400">{r.refresh}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Sphere Compliance Approach Block (Section 3.2)
function SphereComplianceApproachBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>
      
      {data.philosophy && (
        <div className="mb-4">
          <h4 className="text-emerald-300 font-medium mb-2">Philosophy:</h4>
          <div className="space-y-2">
            {data.philosophy.map((p: any, i: number) => (
              <div key={i} className="bg-emerald-500/10 border border-emerald-500/30 rounded p-3">
                <h5 className="text-white font-medium">{p.principle}</h5>
                <p className="text-gray-400 text-xs">{p.explanation}</p>
                <p className="text-emerald-300 text-xs mt-1">→ {p.implementation}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {data.technologyStack && (
        <div className="mb-4">
          <h4 className="text-blue-300 font-medium mb-2">Technology Stack:</h4>
          <div className="grid md:grid-cols-2 gap-2">
            {data.technologyStack.map((t: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded p-3">
                <span className="text-white font-medium text-sm">{t.component}</span>
                <p className="text-gray-400 text-xs">{t.function}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {data.teamStructure && (
        <div>
          <h4 className="text-purple-300 font-medium mb-2">Team Structure:</h4>
          <div className="space-y-2">
            {data.teamStructure.map((t: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded p-2 flex justify-between">
                <span className="text-white text-sm">{t.role}</span>
                <span className="text-gray-400 text-xs">{t.responsibility}</span>
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
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>
      
      {data.categories && (
        <div className="space-y-4 mb-4">
          {data.categories.map((cat: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                <span>{cat.icon}</span> {cat.category}
              </h4>
              <div className="space-y-1">
                {cat.flags?.map((f: any, j: number) => (
                  <div key={j} className="flex justify-between items-center text-sm">
                    <div>
                      <span className="text-white">{f.flag}:</span>
                      <span className="text-gray-400 ml-1">{f.detail}</span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded ${f.severity === 'High' ? 'bg-red-500/20 text-red-300' : 'bg-amber-500/20 text-amber-300'}`}>{f.severity}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {data.responseToRedFlags && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded p-4">
          <h4 className="text-blue-300 font-medium mb-2">Response Process:</h4>
          <div className="flex flex-wrap gap-2">
            {data.responseToRedFlags.map((r: any, i: number) => (
              <div key={i} className="bg-slate-800/50 rounded px-3 py-2">
                <span className="text-blue-400 font-bold">{r.step}.</span>
                <span className="text-white ml-1">{r.detail}</span>
              </div>
            ))}
          </div>
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
              className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-700/70"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{r.icon}</span>
                <div>
                  <span className="text-white font-medium">{r.regime}</span>
                  {r.fullName && <p className="text-gray-400 text-xs">{r.fullName}</p>}
                </div>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedRegime === r.regime ? 'rotate-180' : ''}`} />
            </button>
            {expandedRegime === r.regime && (
              <div className="px-4 pb-4 space-y-3">
                <p className="text-gray-300 text-sm"><span className="text-gray-500">Agency:</span> {r.agency}</p>
                <p className="text-gray-300 text-sm"><span className="text-gray-500">Scope:</span> {r.scope}</p>
                
                {r.lists && (
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Lists:</p>
                    {r.lists.map((l: any, j: number) => (
                      <div key={j} className="bg-slate-800/50 rounded p-2 mb-1">
                        <span className="text-blue-300 text-sm">{l.list}</span>
                        <p className="text-gray-400 text-xs">{l.description}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                {r.keyPrinciples && (
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Key Principles:</p>
                    <ul className="text-gray-300 text-xs space-y-0.5">
                      {r.keyPrinciples.map((p: string, j: number) => (
                        <li key={j}>• {p}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {r.realWorldExamples && (
                  <div className="bg-red-500/10 rounded p-2">
                    {r.realWorldExamples.map((ex: any, j: number) => (
                      <div key={j} className="mb-2">
                        <span className="text-red-300 font-medium text-sm">{ex.example}</span>
                        <p className="text-gray-400 text-xs">{ex.violation}</p>
                        <p className="text-red-300 text-xs">{ex.consequence}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                {r.sphereImplication && (
                  <p className="text-emerald-300 text-sm"><span className="font-semibold">Sphere:</span> {r.sphereImplication}</p>
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
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>
      
      <div className="space-y-4">
        {data.categories?.map((cat: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2 flex items-center gap-2">
              <span>{cat.icon}</span> {cat.category}
            </h4>
            <div className="space-y-2 mb-3">
              {cat.items?.map((item: any, j: number) => (
                <div key={j} className="text-sm">
                  <span className="text-blue-300">{item.item}:</span>
                  <span className="text-gray-400 ml-1">{item.detail}</span>
                  {item.challenge && <span className="text-amber-300 text-xs ml-2">(Challenge: {item.challenge})</span>}
                </div>
              ))}
            </div>
            {cat.howItWorks && <p className="text-gray-300 text-xs mb-2"><span className="text-gray-500">How:</span> {cat.howItWorks}</p>}
            {cat.example && <p className="text-emerald-300 text-xs"><span className="text-gray-500">Example:</span> {cat.example}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

// High Risk Jurisdictions Block (Section 3.3)
function HighRiskJurisdictionsBlock({ data }: { data: any }) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>
      
      <div className="space-y-2 mb-4">
        {data.jurisdictionCategories?.map((cat: any, i: number) => (
          <div key={i} className={`rounded-lg border ${cat.riskLevel.includes('PROHIBITED') ? 'border-red-500 bg-red-500/10' : cat.riskLevel.includes('HIGH') ? 'border-amber-500 bg-amber-500/10' : 'border-yellow-500 bg-yellow-500/10'}`}>
            <button
              onClick={() => setExpandedCategory(expandedCategory === cat.category ? null : cat.category)}
              className="w-full p-4 text-left flex justify-between items-center"
            >
              <div>
                <span className="text-white font-medium">{cat.category}</span>
                <span className={`ml-2 text-xs px-2 py-0.5 rounded ${cat.riskLevel.includes('PROHIBITED') ? 'bg-red-500 text-white' : cat.riskLevel.includes('HIGH') ? 'bg-amber-500 text-black' : 'bg-yellow-500 text-black'}`}>{cat.riskLevel}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedCategory === cat.category ? 'rotate-180' : ''}`} />
            </button>
            {expandedCategory === cat.category && (
              <div className="px-4 pb-4 space-y-2">
                {cat.jurisdictions && (
                  <div className="grid md:grid-cols-2 gap-2">
                    {cat.jurisdictions.map((j: any, k: number) => (
                      <div key={k} className="bg-slate-800/50 rounded p-2">
                        <span>{j.icon} {j.country}</span>
                        <p className="text-gray-400 text-xs">{j.detail}</p>
                        {j.exception && <p className="text-emerald-300 text-xs">Exception: {j.exception}</p>}
                      </div>
                    ))}
                  </div>
                )}
                {cat.spherePolicy && <p className="text-blue-300 text-sm mt-2"><span className="font-semibold">Sphere Policy:</span> {cat.spherePolicy}</p>}
                {cat.eddRequirements && (
                  <div className="flex flex-wrap gap-1">
                    {cat.eddRequirements.map((req: string, k: number) => (
                      <span key={k} className="text-xs bg-slate-700 text-gray-300 px-2 py-1 rounded">{req}</span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {data.nuancedApproach && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <h4 className="text-blue-300 font-medium mb-2">{data.nuancedApproach.title}</h4>
          <p className="text-gray-300 text-sm mb-2">{data.nuancedApproach.explanation}</p>
          <div className="space-y-1">
            {data.nuancedApproach.tiers?.map((t: any, i: number) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span className={`px-2 py-0.5 rounded text-xs ${t.tier === 'Prohibited' ? 'bg-red-500 text-white' : t.tier === 'Highly Restricted' ? 'bg-amber-500 text-black' : t.tier === 'Enhanced Scrutiny' ? 'bg-yellow-500 text-black' : 'bg-emerald-500 text-white'}`}>{t.tier}</span>
                <span className="text-gray-400">{t.treatment}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Screening Flow Diagram Block (Section 3.3)
function ScreeningFlowDiagramBlock({ data }: { data: any }) {
  const [activeNode, setActiveNode] = useState<string>('initiation');
  
  const getNodeColor = (node: any) => {
    if (node.color === 'green') return 'bg-emerald-500/20 border-emerald-500';
    if (node.color === 'yellow') return 'bg-amber-500/20 border-amber-500';
    if (node.color === 'red') return 'bg-red-500/20 border-red-500';
    if (node.type === 'start') return 'bg-blue-500/20 border-blue-500';
    if (node.type === 'decision') return 'bg-purple-500/20 border-purple-500';
    return 'bg-slate-700/50 border-slate-500';
  };
  
  const activeNodeData = data.nodes?.find((n: any) => n.id === activeNode);
  
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>
      
      {/* Flow visualization */}
      <div className="bg-slate-900 rounded-lg p-4 mb-4">
        <div className="flex flex-wrap justify-center gap-2">
          {data.nodes?.map((node: any) => (
            <button
              key={node.id}
              onClick={() => setActiveNode(node.id)}
              className={`px-3 py-2 rounded-lg border-2 transition-all ${getNodeColor(node)} ${activeNode === node.id ? 'ring-2 ring-white' : ''}`}
            >
              <span className="text-white text-xs">{node.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Active node details */}
      {activeNodeData && (
        <div className={`rounded-lg p-4 border-2 mb-4 ${getNodeColor(activeNodeData)}`}>
          <h4 className="text-white font-semibold mb-2">{activeNodeData.label}</h4>
          <p className="text-gray-300 text-sm mb-2">{activeNodeData.description}</p>
          {activeNodeData.details && (
            <ul className="text-gray-400 text-xs space-y-0.5">
              {activeNodeData.details.map((d: string, i: number) => (
                <li key={i}>• {d}</li>
              ))}
            </ul>
          )}
          {activeNodeData.outcome && <p className="text-emerald-300 text-sm mt-2">Outcome: {activeNodeData.outcome}</p>}
        </div>
      )}
      
      {/* Key principles */}
      {data.keyPrinciples && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded p-4">
          <h4 className="text-blue-300 font-medium mb-2">Key Principles:</h4>
          <ul className="text-gray-300 text-sm space-y-1">
            {data.keyPrinciples.map((p: string, i: number) => (
              <li key={i}>✓ {p}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Documentation Requirements Block (Section 3.3)
function DocumentationRequirementsBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>
      
      <div className="space-y-3">
        {data.byFlagType?.map((f: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4">
            <h4 className="text-amber-300 font-medium mb-2">{f.flagType}</h4>
            <p className="text-gray-400 text-xs mb-2">Scenario: {f.scenario}</p>
            <div className="mb-2">
              <span className="text-gray-500 text-xs">Required:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {f.requiredDocumentation?.map((d: string, j: number) => (
                  <span key={j} className="text-xs bg-slate-600 text-gray-300 px-2 py-0.5 rounded">{d}</span>
                ))}
              </div>
            </div>
            <p className="text-gray-300 text-xs"><span className="text-gray-500">Purpose:</span> {f.purpose}</p>
            <p className="text-blue-300 text-xs">⏱️ {f.timeline}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Flagged Payment Process Block (Section 3.3)
function FlaggedPaymentProcessBlock({ data }: { data: any }) {
  const [activeStep, setActiveStep] = useState(1);
  const steps = data.process?.steps || [];
  const activeStepData = steps.find((s: any) => s.step === activeStep);
  
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>
      
      {/* Step navigation */}
      <div className="flex overflow-x-auto gap-2 mb-4">
        {steps.map((s: any) => (
          <button
            key={s.step}
            onClick={() => setActiveStep(s.step)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg ${activeStep === s.step ? 'bg-blue-500 text-white' : 'bg-slate-700 text-gray-300'}`}
          >
            {s.step}. {s.title}
          </button>
        ))}
      </div>
      
      {/* Active step content */}
      {activeStepData && (
        <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">{activeStepData.step}</span>
            <div>
              <h4 className="text-white font-semibold">{activeStepData.title}</h4>
              <p className="text-gray-400 text-sm">{activeStepData.timing}</p>
            </div>
          </div>
          <p className="text-gray-300 mb-3">{activeStepData.whatHappens}</p>
          
          {activeStepData.outcomes && (
            <div className="flex flex-wrap gap-2 mb-3">
              {activeStepData.outcomes.map((o: string, i: number) => (
                <span key={i} className="text-xs bg-slate-600 text-gray-200 px-2 py-1 rounded">{o}</span>
              ))}
            </div>
          )}
          
          {activeStepData.customerCommunication && (
            <div className="bg-slate-800 rounded p-3">
              <p className="text-blue-300 text-sm font-medium mb-1">📧 {activeStepData.customerCommunication.subject}</p>
              <pre className="text-gray-300 text-xs whitespace-pre-wrap font-sans">{activeStepData.customerCommunication.template}</pre>
            </div>
          )}
        </div>
      )}
      
      {/* Timeline expectations */}
      {data.timelineExpectations && (
        <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
          <h4 className="text-white font-medium mb-2">{data.timelineExpectations.title}</h4>
          <div className="space-y-2">
            {data.timelineExpectations.scenarios?.map((s: any, i: number) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-gray-300">{s.scenario}</span>
                <span className="text-blue-300">{s.typical}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Escalation path */}
      {data.escalationPath && (
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
          <h4 className="text-purple-300 font-medium mb-2">{data.escalationPath.title}</h4>
          <div className="space-y-2">
            {data.escalationPath.levels?.map((l: any, i: number) => (
              <div key={i} className="flex items-start gap-2">
                <span className="bg-purple-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">{i + 1}</span>
                <div>
                  <span className="text-white text-sm">{l.level}:</span>
                  <span className="text-gray-400 text-xs ml-1">{l.handles}</span>
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
    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      <p className="text-gray-300 mb-4">{data.definition}</p>
      
      {data.keyTakeaways && (
        <div className="space-y-2 mb-4">
          {data.keyTakeaways.map((t: string, i: number) => (
            <div key={i} className="bg-slate-800/50 rounded px-3 py-2 text-sm text-gray-300">{t}</div>
          ))}
        </div>
      )}
      
      {data.spherePosition && (
        <p className="text-emerald-300"><span className="font-semibold">Sphere:</span> {data.spherePosition}</p>
      )}
      {data.whyItMatters && (
        <p className="text-amber-300 text-sm mt-2">{data.whyItMatters}</p>
      )}
    </div>
  );
}

// FATF Definition Block (Section 3.4)
function FATFDefinitionBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>
      
      {data.whatIsFATF && (
        <div className="bg-slate-700/50 rounded p-4 mb-4">
          <h4 className="text-blue-300 font-medium">{data.whatIsFATF.fullName}</h4>
          <p className="text-gray-300 text-sm">{data.whatIsFATF.description}</p>
          <p className="text-amber-300 text-xs mt-2">Relevant: {data.whatIsFATF.relevantRecommendation}</p>
        </div>
      )}
      
      {data.recommendation16 && (
        <div className="bg-purple-500/10 border border-purple-500/30 rounded p-4 mb-4">
          <h4 className="text-purple-300 font-medium mb-2">{data.recommendation16.title}</h4>
          <p className="text-gray-400 text-sm"><span className="text-gray-500">Original:</span> {data.recommendation16.originalScope}</p>
          <p className="text-gray-400 text-sm"><span className="text-gray-500">Extended:</span> {data.recommendation16.extension}</p>
          {data.recommendation16.keyLanguage && (
            <p className="text-gray-300 text-sm italic mt-2 bg-slate-800/50 p-2 rounded">"{data.recommendation16.keyLanguage}"</p>
          )}
        </div>
      )}
      
      {data.sunriseIssue && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded p-4">
          <h4 className="text-amber-300 font-medium mb-2">{data.sunriseIssue.title}</h4>
          <p className="text-gray-300 text-sm"><span className="text-gray-500">Problem:</span> {data.sunriseIssue.problem}</p>
          <p className="text-emerald-300 text-sm mt-1"><span className="font-semibold">Sphere:</span> {data.sunriseIssue.sphereApproach}</p>
        </div>
      )}
    </div>
  );
}

// Required Data Elements Block (Section 3.4)
function RequiredDataElementsBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>
      
      {data.originatorRequirements && (
        <div className="mb-4">
          <h4 className="text-blue-300 font-medium mb-2">{data.originatorRequirements.title}</h4>
          <div className="space-y-2">
            {data.originatorRequirements.required?.map((r: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded p-3">
                <div className="flex justify-between">
                  <span className="text-white font-medium">{r.element}</span>
                  <span className="text-emerald-300 text-xs">{r.required}</span>
                </div>
                {r.description && <p className="text-gray-400 text-xs">{r.description}</p>}
                {r.options && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {r.options.map((o: string, j: number) => (
                      <span key={j} className="text-xs bg-slate-600 text-gray-300 px-2 py-0.5 rounded">{o}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {data.beneficiaryRequirements && (
        <div className="mb-4">
          <h4 className="text-purple-300 font-medium mb-2">{data.beneficiaryRequirements.title}</h4>
          <div className="space-y-2">
            {data.beneficiaryRequirements.required?.map((r: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded p-3">
                <span className="text-white font-medium">{r.element}</span>
                <span className="text-emerald-300 text-xs ml-2">{r.required}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {data.whyEachMatters && (
        <div className="bg-blue-500/10 rounded p-4">
          <h4 className="text-blue-300 font-medium mb-2">Why Each Matters:</h4>
          <div className="space-y-1">
            {data.whyEachMatters.map((w: any, i: number) => (
              <p key={i} className="text-sm"><span className="text-white">{w.element}:</span> <span className="text-gray-400">{w.purpose}</span></p>
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
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>
      
      {data.majorJurisdictions && (
        <div className="space-y-2 mb-4">
          {data.majorJurisdictions.map((j: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedJurisdiction(expandedJurisdiction === j.jurisdiction ? null : j.jurisdiction)}
                className="w-full p-3 text-left flex items-center justify-between hover:bg-slate-700/70"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{j.flag}</span>
                  <span className="text-white">{j.jurisdiction}</span>
                  <span className={`text-sm ${j.threshold.includes('0') && !j.threshold.includes('$3') ? 'text-red-300' : 'text-emerald-300'}`}>{j.threshold}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded ${j.status === 'Enforced' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>{j.status}</span>
              </button>
              {expandedJurisdiction === j.jurisdiction && (
                <div className="px-3 pb-3 text-sm">
                  <p className="text-gray-400"><span className="text-gray-500">Regulator:</span> {j.regulator}</p>
                  {j.notes && <p className="text-gray-400"><span className="text-gray-500">Notes:</span> {j.notes}</p>}
                  {j.sphereImplication && <p className="text-emerald-300 mt-1"><span className="font-semibold">Sphere:</span> {j.sphereImplication}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {data.latinAmerica && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-4">
          <h4 className="text-amber-300 font-medium mb-2">{data.latinAmerica.title}</h4>
          {data.latinAmerica.jurisdictions?.map((j: any, i: number) => (
            <div key={i} className="bg-slate-800/50 rounded p-3 mb-2">
              <div className="flex items-center gap-2 mb-1">
                <span>{j.flag}</span>
                <span className="text-white">{j.jurisdiction}</span>
                <span className="text-emerald-300 text-sm">{j.threshold}</span>
              </div>
              <p className="text-gray-400 text-xs">Regulator: {j.regulator}</p>
              {j.sphereImplication && <p className="text-blue-300 text-xs mt-1">{j.sphereImplication}</p>}
            </div>
          ))}
        </div>
      )}
      
      {data.thresholdComparisonTable && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-700">
                {data.thresholdComparisonTable.headers?.map((h: string, i: number) => (
                  <th key={i} className="p-2 text-left text-gray-300">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.thresholdComparisonTable.rows?.map((row: string[], i: number) => (
                <tr key={i} className="border-t border-slate-700">
                  {row.map((cell: string, j: number) => (
                    <td key={j} className={`p-2 ${j === 0 ? 'text-white' : j === 1 ? 'text-emerald-300' : 'text-gray-400'}`}>{cell}</td>
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
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>
      
      <div className="space-y-3">
        {data.businessImplications?.map((b: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4">
            <h4 className="text-blue-300 font-medium mb-1">{b.implication}</h4>
            <p className="text-gray-300 text-sm mb-2">{b.detail}</p>
            <p className="text-red-300 text-sm"><span className="text-gray-500">Impact:</span> {b.impact}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Travel Rule Protocols Block (Section 3.4)
function TravelRuleProtocolsBlock({ data }: { data: any }) {
  const [expandedProtocol, setExpandedProtocol] = useState<string | null>(null);
  
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.overview && <p className="text-gray-400 mb-4">{data.overview}</p>}
      
      <div className="space-y-2 mb-4">
        {data.protocols?.map((p: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedProtocol(expandedProtocol === p.protocol ? null : p.protocol)}
              className="w-full p-3 text-left flex justify-between items-center hover:bg-slate-700/70"
            >
              <div>
                <span className="text-white font-medium">{p.protocol}</span>
                <span className="text-gray-400 text-sm ml-2">({p.type})</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedProtocol === p.protocol ? 'rotate-180' : ''}`} />
            </button>
            {expandedProtocol === p.protocol && (
              <div className="px-3 pb-3 space-y-2">
                <p className="text-gray-300 text-sm">{p.description}</p>
                <p className="text-gray-400 text-xs"><span className="text-gray-500">Governance:</span> {p.governance}</p>
                <p className="text-gray-400 text-xs"><span className="text-gray-500">Coverage:</span> {p.coverage}</p>
                <div className="grid grid-cols-2 gap-2">
                  {p.pros && (
                    <div className="bg-emerald-500/10 rounded p-2">
                      <p className="text-emerald-300 text-xs font-medium">Pros:</p>
                      {p.pros.map((pro: string, j: number) => (
                        <p key={j} className="text-gray-300 text-xs">✓ {pro}</p>
                      ))}
                    </div>
                  )}
                  {p.cons && (
                    <div className="bg-red-500/10 rounded p-2">
                      <p className="text-red-300 text-xs font-medium">Cons:</p>
                      {p.cons.map((con: string, j: number) => (
                        <p key={j} className="text-gray-300 text-xs">✗ {con}</p>
                      ))}
                    </div>
                  )}
                </div>
                {p.sphereSupport && <p className="text-emerald-300 text-xs"><span className="font-semibold">Sphere:</span> {p.sphereSupport}</p>}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {data.sphereApproach && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded p-4">
          <h4 className="text-emerald-300 font-medium mb-2">{data.sphereApproach.title}</h4>
          <p className="text-gray-300 text-sm mb-2">{data.sphereApproach.strategy}</p>
          {data.sphereApproach.workflow && (
            <div className="flex flex-wrap gap-2">
              {data.sphereApproach.workflow.map((w: any, i: number) => (
                <div key={i} className="bg-slate-800/50 rounded px-2 py-1 text-xs">
                  <span className="text-emerald-400">{w.step}.</span> <span className="text-gray-300">{w.action}</span>
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
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>
      
      <div className="space-y-3 mb-4">
        {data.methods?.map((m: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4">
            <h4 className="text-blue-300 font-medium mb-1">{m.method}</h4>
            <p className="text-gray-300 text-sm mb-2">{m.description}</p>
            <p className="text-gray-400 text-xs mb-2"><span className="text-gray-500">How:</span> {m.howItWorks}</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-emerald-300">Advantages:</span>
                {m.advantages?.map((a: string, j: number) => (
                  <p key={j} className="text-gray-400">✓ {a}</p>
                ))}
              </div>
              <div>
                <span className="text-red-300">Disadvantages:</span>
                {m.disadvantages?.map((d: string, j: number) => (
                  <p key={j} className="text-gray-400">✗ {d}</p>
                ))}
              </div>
            </div>
            <p className="text-amber-300 text-xs mt-2">When: {m.whenToUse}</p>
          </div>
        ))}
      </div>
      
      {data.timingRequirements && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded p-4">
          <h4 className="text-blue-300 font-medium mb-1">{data.timingRequirements.title}</h4>
          <p className="text-gray-300 text-sm">{data.timingRequirements.guidance}</p>
          <p className="text-emerald-300 text-sm mt-1"><span className="font-semibold">Sphere:</span> {data.timingRequirements.sphereApproach}</p>
        </div>
      )}
    </div>
  );
}

// Transactions Applied Block (Section 3.4)
function TransactionsAppliedBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>
      
      {data.appliesTo && (
        <div className="mb-4">
          <h4 className="text-emerald-300 font-medium mb-2">Travel Rule APPLIES To:</h4>
          <div className="space-y-2">
            {data.appliesTo.map((t: any, i: number) => (
              <div key={i} className="bg-emerald-500/10 border border-emerald-500/30 rounded p-3">
                <h5 className="text-white font-medium">{t.type}</h5>
                <p className="text-gray-400 text-xs">{t.description}</p>
                <p className="text-gray-300 text-xs">Example: {t.example}</p>
                <p className="text-emerald-300 text-xs mt-1">{t.travelRule}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {data.doesNotApply && (
        <div>
          <h4 className="text-gray-400 font-medium mb-2">Travel Rule Does NOT Apply To:</h4>
          <div className="space-y-2">
            {data.doesNotApply.map((t: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded p-3">
                <h5 className="text-white font-medium">{t.type}</h5>
                <p className="text-gray-400 text-xs">{t.description}</p>
                <p className="text-gray-500 text-xs mt-1">{t.travelRule}</p>
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
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>
      
      <div className="space-y-2">
        {data.scenarios?.map((s: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedScenario(expandedScenario === s.scenario ? null : s.scenario)}
              className="w-full p-4 text-left hover:bg-slate-700/70"
            >
              <h4 className="text-white font-medium">{s.scenario}</h4>
              <p className="text-gray-400 text-sm">{s.problem}</p>
            </button>
            {expandedScenario === s.scenario && (
              <div className="px-4 pb-4 space-y-3">
                <div className="space-y-2">
                  {s.solutions?.map((sol: any, j: number) => (
                    <div key={j} className="bg-slate-800/50 rounded p-3 border-l-4 border-blue-500">
                      <h5 className="text-blue-300 font-medium text-sm">{sol.solution}</h5>
                      <p className="text-gray-300 text-xs">{sol.implementation}</p>
                      <div className="flex gap-4 text-xs mt-1">
                        <span className="text-emerald-300">✓ {sol.pros}</span>
                        <span className="text-red-300">✗ {sol.cons}</span>
                      </div>
                      <p className="text-amber-300 text-xs">When: {sol.when}</p>
                    </div>
                  ))}
                </div>
                {s.sphereApproach && (
                  <div className="bg-emerald-500/10 rounded p-3">
                    <p className="text-emerald-300 text-sm"><span className="font-semibold">Sphere:</span> {s.sphereApproach}</p>
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
              <div key={i} className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
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
        <button onClick={() => setExpanded(!expanded)} className="text-blue-400 text-sm hover:text-blue-300">
          {expanded ? 'Show Less' : 'Show Details'}
        </button>
      </div>
      
      {data.background && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-4">
          <h4 className="text-blue-300 font-semibold mb-2">{data.background.title}</h4>
          <ul className="text-gray-300 text-sm space-y-1">
            {data.background.points?.map((p: string, i: number) => (
              <li key={i}>• {p}</li>
            ))}
          </ul>
        </div>
      )}
      
      {expanded && data.keyRequirements && (
        <div className="space-y-2">
          {data.keyRequirements.requirements?.map((r: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-3">
              <p className="text-white font-medium">{r.requirement}</p>
              <p className="text-gray-400 text-sm">{r.detail}</p>
            </div>
          ))}
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
        <button onClick={() => setExpanded(!expanded)} className="text-blue-400 text-sm hover:text-blue-300">
          {expanded ? 'Show Less' : 'Show Details'}
        </button>
      </div>
      
      {data.significance && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-4">
          <h4 className="text-blue-300 font-semibold mb-2">{data.significance.title}</h4>
          <ul className="text-gray-300 text-sm space-y-1">
            {data.significance.points?.map((p: string, i: number) => (
              <li key={i}>• {p}</li>
            ))}
          </ul>
        </div>
      )}
      
      {expanded && data.keyProvisions && (
        <div className="space-y-2">
          {data.keyProvisions.provisions?.map((p: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-3">
              <p className="text-white font-medium">{p.provision}</p>
              <p className="text-gray-400 text-sm">{p.detail}</p>
            </div>
          ))}
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
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Current</p>
            <p className="text-blue-300 font-semibold text-lg">{data.marketSize.current}</p>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Projected</p>
            <p className="text-emerald-300 font-semibold text-lg">{data.marketSize.projected}</p>
          </div>
        </div>
      )}
      {data.keyInsight && (
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
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
          <div key={i} className="bg-slate-700/50 rounded-lg border border-slate-600 overflow-hidden">
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
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded p-3">
                    <p className="text-emerald-300 text-sm font-semibold mb-2">Traditional Controls:</p>
                    <ul className="text-gray-300 text-sm space-y-1">
                      {cat.traditionalControls.map((c: string, j: number) => (<li key={j}>• {c}</li>))}
                    </ul>
                  </div>
                )}
                {cat.onChainRisks && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                    <p className="text-red-300 text-sm font-semibold mb-2">On-Chain Risks:</p>
                    <ul className="text-gray-300 text-sm space-y-1">
                      {cat.onChainRisks.map((r: string, j: number) => (<li key={j}>• {r}</li>))}
                    </ul>
                  </div>
                )}
                {cat.keyTakeaway && (
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3">
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
          <h4 className="text-gray-300 font-semibold mb-2">Background</h4>
          {typeof data.background === 'object' ? (
            <div className="space-y-1 text-sm">
              {Object.entries(data.background).map(([key, value], i) => (
                <p key={i} className="text-gray-300"><span className="text-gray-500">{key}:</span> {value as string}</p>
              ))}
            </div>
          ) : (<p className="text-gray-300 text-sm">{data.background}</p>)}
        </div>
      )}
      
      {data.howItWorks && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-4">
          <h4 className="text-blue-300 font-semibold mb-3">{data.howItWorks.title}</h4>
          <div className="space-y-2">
            {data.howItWorks.steps?.map((s: any, i: number) => (
              <div key={i} className="flex items-start gap-3">
                <span className="bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">{s.step}</span>
                <p className="text-gray-300 text-sm">{s.action}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {(data.regulatoryImplication || data.lessonForSphere || data.keyTakeaway) && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
          <p className="text-emerald-200 text-sm">
            <span className="font-semibold">Key Insight:</span> {data.regulatoryImplication || data.lessonForSphere || data.keyTakeaway}
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
      {data.channels && (
        <div className="grid md:grid-cols-2 gap-4">
          {data.channels.map((ch: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-red-500">
              <h4 className="text-red-300 font-semibold mb-2">{ch.channel}</h4>
              <p className="text-gray-300 text-sm">{ch.mechanism}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function BlockchainFailBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {data.traditionalBlockchains && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <h4 className="text-red-300 font-semibold mb-3">{data.traditionalBlockchains.title}</h4>
            <div className="space-y-2">
              {data.traditionalBlockchains.characteristics?.map((c: any, i: number) => (
                <div key={i} className="text-sm"><span className="text-gray-400">{c.attribute}:</span><span className="text-gray-300 ml-2">{c.value}</span></div>
              ))}
            </div>
          </div>
        )}
        {data.regulatedFinanceRequirements && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
            <h4 className="text-emerald-300 font-semibold mb-3">{data.regulatedFinanceRequirements.title}</h4>
            <div className="space-y-2">
              {data.regulatedFinanceRequirements.characteristics?.map((c: any, i: number) => (
                <div key={i} className="text-sm"><span className="text-gray-400">{c.attribute}:</span><span className="text-gray-300 ml-2">{c.value}</span></div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SphereNetSolutionBlock({ data }: { data: any }) {
  return (
    <div className="bg-emerald-500/10 border border-emerald-500/50 rounded-xl p-6">
      <h3 className="font-semibold text-white mb-2 text-xl">✅ {data.title}</h3>
      {data.introduction && <p className="text-gray-300 mb-4">{data.introduction}</p>}
      {data.threeCorePrinciples?.principles?.map((p: any, i: number) => (
        <div key={i} className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-emerald-500 mb-3">
          <h5 className="text-emerald-300 font-semibold">{p.icon} {p.principle}</h5>
          <p className="text-gray-300 text-sm mt-2">{p.description}</p>
        </div>
      ))}
    </div>
  );
}

function RegulatorPerspectiveBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">🏛️ {data.title}</h3>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {data.doSay && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
            <p className="text-emerald-300 font-semibold mb-2">✅ Do Say:</p>
            <ul className="text-gray-300 text-sm space-y-2">
              {data.doSay.map((s: string, i: number) => (<li key={i} className="italic">"{s}"</li>))}
            </ul>
          </div>
        )}
        {data.doNotSay && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <p className="text-red-300 font-semibold mb-2">❌ Don't Say:</p>
            <ul className="text-gray-300 text-sm space-y-2">
              {data.doNotSay.map((s: string, i: number) => (<li key={i} className="italic">"{s}"</li>))}
            </ul>
          </div>
        )}
      </div>
      {data.sampleResponse && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
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
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">🇦🇪 {data.title}</h3>
      {data.points && (
        <div className="space-y-2 mb-4">
          <ul className="text-gray-300 space-y-2">
            {data.points.map((p: string, i: number) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-emerald-400">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {data.strategicReasons && (
        <div className="space-y-3 mb-4">
          {data.strategicReasons.map((r: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-blue-500">
              <h4 className="text-blue-300 font-semibold">{r.reason}</h4>
              <p className="text-gray-300 text-sm mt-1">{r.detail}</p>
            </div>
          ))}
        </div>
      )}
      {data.arnoldQuote && (
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
          {typeof data.arnoldQuote === 'string' ? (
            <p className="text-purple-200 italic">"{data.arnoldQuote}"</p>
          ) : (
            <>
              <p className="text-purple-200 italic">"{data.arnoldQuote.quote}"</p>
              {data.arnoldQuote.context && (
                <p className="text-gray-400 text-sm mt-2">{data.arnoldQuote.context}</p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

function RegulatoryLandscapeBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}
      
      {data.territories && (
        <div className="space-y-3 mb-4">
          {data.territories.map((t: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-blue-500">
              <div className="flex items-center gap-2 mb-2">
                {t.icon && <span className="text-xl">{t.icon}</span>}
                <h4 className="text-blue-300 font-semibold">{t.name || t.territory}</h4>
              </div>
              {t.regulator && <p className="text-gray-400 text-sm">Regulator: {t.regulator}</p>}
              {t.legalSystem && <p className="text-gray-400 text-sm">Legal System: {t.legalSystem}</p>}
              {t.bestFor && <p className="text-gray-300 text-sm">Best For: {t.bestFor}</p>}
              {t.cryptoScope && <p className="text-gray-300 text-sm">Crypto Scope: {t.cryptoScope}</p>}
              {t.sphereRelevance && <p className="text-emerald-300 text-sm font-semibold mt-2">Sphere: {t.sphereRelevance}</p>}
            </div>
          ))}
        </div>
      )}
      
      {data.keyInsight && (
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
          <p className="text-purple-200 text-sm">💡 {data.keyInsight}</p>
        </div>
      )}
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
                  <div key={i} className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
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
                <div key={i} className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                  <p className="text-blue-300 font-semibold">{lt.type || lt.license}</p>
                  <p className="text-gray-300 text-sm">{lt.description}</p>
                </div>
              ))}
            </div>
          )}
          
          {data.advantages && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 mb-4">
              <h4 className="text-emerald-300 font-semibold mb-2">Advantages</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                {data.advantages.map((a: string, i: number) => (<li key={i}>✅ {a}</li>))}
              </ul>
            </div>
          )}
          
          {data.limitations && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
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
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-blue-300 font-semibold mb-2">Choose VARA When:</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                {data.whenToChooseVARA.map((r: string, i: number) => (<li key={i}>• {r}</li>))}
              </ul>
            </div>
          )}
          {data.whenToChooseDIFC && (
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
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
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <h4 className="text-blue-300 font-semibold mb-2">Choose VARA When:</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              {data.whenToChoose.vara?.map((r: string, i: number) => (<li key={i}>• {r}</li>))}
            </ul>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
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
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
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
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
          <p className="text-emerald-300 text-sm"><span className="font-semibold">Sphere Relevance:</span> {data.sphereRelevance}</p>
        </div>
      )}
    </div>
  );
}

function CBUAERegulationsBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}
      
      {data.circular2024 && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-4">
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
          {data.circular2024.effectiveDate && <p className="text-amber-300 text-sm">Effective: {data.circular2024.effectiveDate}</p>}
          {data.circular2024.spherePosition && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded p-3 mt-3">
              <p className="text-emerald-300 text-sm"><span className="font-semibold">Sphere Position:</span> {data.circular2024.spherePosition}</p>
            </div>
          )}
        </div>
      )}
      
      {data.circular && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-4">
          <h4 className="text-blue-300 font-semibold mb-2">{data.circular.title}</h4>
          {data.circular.keyPoints && (
            <ul className="text-gray-300 text-sm space-y-1">
              {data.circular.keyPoints.map((p: string, i: number) => (<li key={i}>• {p}</li>))}
            </ul>
          )}
        </div>
      )}
      
      {data.digitalDirham && (
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
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
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
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
              <div className="grid md:grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-600/50 rounded p-2"><span className="text-gray-400">When you face them:</span><span className="text-gray-300 ml-1">{cat.whenYouFaceThem}</span></div>
                <div className="bg-emerald-500/10 rounded p-2"><span className="text-emerald-400">Their weakness:</span><span className="text-gray-300 ml-1">{cat.theirWeakness}</span></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CompetitorLandscapeBlock({ data }: { data: any }) {
  const [showHeadToHead, setShowHeadToHead] = React.useState(false);
  
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
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
                    <td key={j} className={`p-2 ${j === 0 ? 'text-white font-medium' : 'text-gray-300'}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {data.keyDifferentiators && (
        <div className="space-y-2 mb-4">
          {data.keyDifferentiators.differentiators?.map((d: any, i: number) => (
            <div key={i} className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
              <h5 className="text-emerald-300 font-semibold">{d.differentiator}</h5>
              <p className="text-gray-300 text-sm">{d.explanation}</p>
            </div>
          ))}
        </div>
      )}
      {data.headToHead && (
        <div>
          <button onClick={() => setShowHeadToHead(!showHeadToHead)} className="text-blue-400 text-sm hover:text-blue-300 mb-3">
            {showHeadToHead ? 'Hide' : 'Show'} Head-to-Head Comparisons
          </button>
          {showHeadToHead && (
            <div className="space-y-3">
              {data.headToHead.comparisons?.map((c: any, i: number) => (
                <div key={i} className="bg-slate-700/50 rounded-lg p-4">
                  <h5 className="text-white font-semibold mb-2">{c.competitor}</h5>
                  <p className="text-gray-400 text-sm mb-2 italic">{c.theirPitch}</p>
                  <div className="grid md:grid-cols-2 gap-2 text-xs">
                    <div className="bg-emerald-500/10 rounded p-2"><span className="text-emerald-400 font-semibold">Sphere advantage:</span><p className="text-gray-300">{c.sphereAdvantage}</p></div>
                    <div className="bg-red-500/10 rounded p-2"><span className="text-red-400 font-semibold">Sphere disadvantage:</span><p className="text-gray-300">{c.sphereDisadvantage}</p></div>
                  </div>
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
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>
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
        <div className="space-y-3">
          {data.objectionHandling.objections?.map((obj: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <p className="text-amber-300 font-semibold mb-2">"{obj.objection}"</p>
              <p className="text-gray-300 text-sm mb-2">{obj.response}</p>
              <p className="text-emerald-300 text-xs">💡 {obj.keyPoint}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PositioningFrameworkBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>
      {data.audiences && (
        <div className="space-y-4">
          {data.audiences.map((aud: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-purple-500">
              <h4 className="text-purple-300 font-semibold mb-2">{aud.audience}</h4>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="bg-emerald-500/10 rounded p-2"><span className="text-emerald-400 font-semibold">Lead with:</span><p className="text-gray-300">{aud.leadWith}</p></div>
                <div className="bg-red-500/10 rounded p-2"><span className="text-red-400 font-semibold">Avoid:</span><p className="text-gray-300">{aud.avoid}</p></div>
              </div>
              <div className="bg-blue-500/10 rounded p-2 mt-2"><span className="text-blue-400 font-semibold">Key message:</span><p className="text-gray-300 italic">"{aud.keyMessage}"</p></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function WhenToWalkAwayBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">🚪 {data.title}</h3>
      {data.scenarios && (
        <div className="space-y-3">
          {data.scenarios.map((s: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-amber-500">
              <h4 className="text-amber-300 font-semibold mb-2">{s.scenario}</h4>
              <p className="text-gray-400 text-sm mb-2">{s.whyNot}</p>
              <div className="bg-blue-500/10 rounded p-2"><p className="text-blue-200 text-sm italic">"{s.whatToSay}"</p></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// =============================================================================
// NEW SECTION 5.5 - BOB AND AHMED EXPANDED COMPONENTS
// =============================================================================

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
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <h5 className="text-blue-300 font-semibold mb-2">🇺🇸 {data.setup.bob.name}</h5>
                  <p className="text-gray-400 text-sm">{data.setup.bob.location}</p>
                  <p className="text-gray-300 text-sm mt-2">{data.setup.bob.business}</p>
                </div>
              )}
              {data.setup.ahmed && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                  <h5 className="text-emerald-300 font-semibold mb-2">🇳🇬 {data.setup.ahmed.name}</h5>
                  <p className="text-gray-400 text-sm">{data.setup.ahmed.location}</p>
                  <p className="text-gray-300 text-sm mt-2">{data.setup.ahmed.business}</p>
                </div>
              )}
            </div>
          )}
          
          {data.theProblem && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
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
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <h5 className="text-blue-300 font-semibold">{data.theApproach.bottomUp.name}</h5>
                  <p className="text-gray-300 text-sm mt-2">{data.theApproach.bottomUp.description}</p>
                </div>
              )}
              {data.theApproach.topDown && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                  <h5 className="text-emerald-300 font-semibold">{data.theApproach.topDown.name}</h5>
                  <p className="text-gray-300 text-sm mt-2">{data.theApproach.topDown.description}</p>
                </div>
              )}
            </div>
          )}
          
          {data.oneThirdStatistic && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
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
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>
      {data.profiles && (
        <div className="space-y-4">
          {data.profiles.map((profile: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-purple-500">
              <h4 className="text-purple-300 font-semibold mb-2">{profile.segment}</h4>
              <p className="text-gray-300 text-sm mb-2">{profile.description}</p>
              <p className="text-emerald-300 text-sm"><span className="font-semibold">Why Sphere:</span> {profile.whySphere}</p>
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
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <h4 className="text-blue-300 font-semibold mb-3">{data.sending.title}</h4>
            <div className="space-y-1">
              {data.sending.countries?.map((c: any, i: number) => (
                <div key={i} className="flex justify-between text-sm"><span className="text-gray-300">{c.country}</span><span className="text-white font-semibold">{c.percentage}</span></div>
              ))}
            </div>
          </div>
        )}
        {data.receiving && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
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
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">🌐 {data.title}</h3>
      {data.definition && <p className="text-gray-300 mb-4">{data.definition}</p>}
      {data.notJustAnotherBlockchain && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-4">
          <h4 className="text-amber-300 font-semibold mb-2">{data.notJustAnotherBlockchain.title}</h4>
          <p className="text-gray-300 text-sm mb-2">{data.notJustAnotherBlockchain.problem}</p>
          {data.notJustAnotherBlockchain.gap && (
            <ul className="text-gray-400 text-sm space-y-1">
              {data.notJustAnotherBlockchain.gap.map((g: string, i: number) => (<li key={i}>• {g}</li>))}
            </ul>
          )}
        </div>
      )}
      {data.positioning && (
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
          <p className="text-purple-300 font-bold text-lg mb-2">{data.positioning.tagline}</p>
          <p className="text-gray-300 text-sm">{data.positioning.explanation}</p>
        </div>
      )}
    </div>
  );
}

function HyperliquidPlaybookBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">📋 {data.title}</h3>
      {data.strategy && (
        <div>
          <p className="text-gray-300 text-sm mb-4">{data.strategy.problem}</p>
          <p className="text-emerald-300 text-sm mb-4">{data.strategy.solution}</p>
          <div className="space-y-2">
            {data.strategy.steps?.map((s: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-3 flex items-start gap-3">
                <span className="bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">{s.step}</span>
                <div><p className="text-white font-medium">{s.action}</p><p className="text-gray-400 text-sm">{s.result}</p></div>
              </div>
            ))}
          </div>
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
                <div><h4 className="text-white font-semibold">{p.name}</h4><p className="text-gray-400 text-sm">{p.concept}</p></div>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedPrinciple === i ? 'rotate-180' : ''}`} />
            </button>
            
            {expandedPrinciple === i && (
              <div className="px-4 pb-4 space-y-3">
                {p.dimensions && (
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                    <p className="text-blue-300 text-sm font-semibold mb-2">Dimensions:</p>
                    <div className="space-y-1">
                      {p.dimensions.map((d: any, j: number) => (<div key={j} className="text-sm"><span className="text-gray-400">{d.dimension}:</span><span className="text-gray-300 ml-2">{d.examples}</span></div>))}
                    </div>
                  </div>
                )}
                {p.levers && (
                  <div className="space-y-2">
                    {p.levers.map((l: any, j: number) => (
                      <div key={j} className="bg-slate-600/50 rounded p-3">
                        <p className="text-emerald-300 font-semibold text-sm">{l.lever}</p>
                        <p className="text-gray-400 text-xs">{l.stage}</p>
                        <p className="text-gray-300 text-sm mt-1">{l.controls}</p>
                      </div>
                    ))}
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
      <h3 className="font-semibold text-white mb-4 text-xl">🏗️ {data.title}</h3>
      {data.layers && (
        <div className="space-y-2 mb-4">
          {data.layers.map((layer: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-3 border-l-4 border-blue-500">
              <h4 className="text-blue-300 font-semibold">{layer.layer}</h4>
              <p className="text-gray-400 text-xs">{layer.components?.join(', ')}</p>
              <p className="text-gray-300 text-sm">{layer.description}</p>
            </div>
          ))}
        </div>
      )}
      {data.performanceTargets && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
          <h4 className="text-emerald-300 font-semibold mb-3">{data.performanceTargets.title}</h4>
          <div className="grid grid-cols-2 gap-2">
            {data.performanceTargets.metrics?.map((m: any, i: number) => (
              <div key={i} className="text-sm"><span className="text-gray-400">{m.metric}:</span><span className="text-white font-semibold ml-2">{m.target}</span></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PrivacyPreservingBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">🔒 {data.title}</h3>
      {data.theProblem && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4">
          <h4 className="text-red-300 font-semibold mb-2">{data.theProblem.title}</h4>
          <p className="text-gray-300 text-sm">{data.theProblem.description}</p>
        </div>
      )}
      {data.sphereNetSolution && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 mb-4">
          <h4 className="text-emerald-300 font-semibold mb-3">{data.sphereNetSolution.title}</h4>
          <div className="space-y-2">
            {data.sphereNetSolution.technologies?.map((t: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded p-3">
                <p className="text-white font-medium">{t.tech}</p>
                <p className="text-gray-400 text-sm">{t.use}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {data.regulatorAccess && (
        <div>
          <h4 className="text-white font-semibold mb-3">{data.regulatorAccess.title}</h4>
          <div className="space-y-2">
            {data.regulatorAccess.levels?.map((l: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-3 flex justify-between items-center">
                <span className="text-purple-300 font-medium">{l.level}</span>
                <span className="text-gray-300 text-sm">{l.access}</span>
              </div>
            ))}
          </div>
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
                    <td key={j} className={`p-3 ${j === 0 ? 'text-gray-400' : j === 1 ? 'text-blue-300' : 'text-emerald-300'}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {data.relationship && (
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
          <h4 className="text-purple-300 font-semibold mb-2">{data.relationship.title}</h4>
          <p className="text-gray-300 text-sm mb-2">{data.relationship.description}</p>
          <p className="text-purple-200 text-sm italic">{data.relationship.strategicValue}</p>
        </div>
      )}
    </div>
  );
}

function ForRegulatorsBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">🏛️ {data.title}</h3>
      {data.valueProposition && (
        <div className="space-y-3 mb-4">
          {data.valueProposition.map((v: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-emerald-500">
              <h4 className="text-emerald-300 font-semibold">{v.benefit}</h4>
              <p className="text-gray-300 text-sm mt-1">{v.explanation}</p>
              {v.contrast && <p className="text-gray-500 text-xs mt-2 italic">vs: {v.contrast}</p>}
            </div>
          ))}
        </div>
      )}
      {data.samplePitch && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <p className="text-blue-300 font-semibold mb-2">Q: {data.samplePitch.question}</p>
          <p className="text-gray-300 text-sm">{data.samplePitch.answer}</p>
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
        <div>
          <h3 className="font-semibold text-white text-xl">{data.title}</h3>
          {data.subtitle && <p className="text-gray-400 text-sm">{data.subtitle}</p>}
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`} />
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
                  <div key={i} className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-white font-medium">{p.pain}</span>
                      <span className={`text-xs px-2 py-1 rounded ${p.intensity === 'HIGH' ? 'bg-red-500 text-white' : 'bg-amber-500 text-white'}`}>{p.intensity}</span>
                    </div>
                    <p className="text-gray-300 text-sm">{p.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {data.valueProposition && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
              <h4 className="text-emerald-300 font-semibold mb-2">{data.valueProposition.title}</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                {data.valueProposition.value?.map((v: string, i: number) => (<li key={i}>• {v}</li>))}
              </ul>
            </div>
          )}
          
          {data.qualificationCriteria && (
            <div>
              <h4 className="text-white font-semibold mb-3">{data.qualificationCriteria.title}</h4>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="bg-emerald-500/10 rounded-lg p-3">
                  <p className="text-emerald-300 font-semibold text-sm mb-2">Must Have</p>
                  <ul className="text-gray-300 text-xs space-y-1">
                    {data.qualificationCriteria.mustHave?.map((m: string, i: number) => (<li key={i}>• {m}</li>))}
                  </ul>
                </div>
                <div className="bg-blue-500/10 rounded-lg p-3">
                  <p className="text-blue-300 font-semibold text-sm mb-2">Nice to Have</p>
                  <ul className="text-gray-300 text-xs space-y-1">
                    {data.qualificationCriteria.niceToHave?.map((n: string, i: number) => (<li key={i}>• {n}</li>))}
                  </ul>
                </div>
                <div className="bg-red-500/10 rounded-lg p-3">
                  <p className="text-red-300 font-semibold text-sm mb-2">Red Flags</p>
                  <ul className="text-gray-300 text-xs space-y-1">
                    {data.qualificationCriteria.redFlags?.map((r: string, i: number) => (<li key={i}>• {r}</li>))}
                  </ul>
                </div>
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
                  <div key={i} className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                    <h5 className="text-amber-300 font-semibold">{ex.type}</h5>
                    <p className="text-gray-300 text-sm">{ex.description}</p>
                    <p className="text-gray-500 text-xs">Corridors: {ex.corridors} | Volume: {ex.volume}</p>
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
      <h3 className="font-semibold text-white mb-4 text-xl">🎯 {data.title}</h3>
      {data.priorityOrder && (
        <div className="space-y-3">
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
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
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
