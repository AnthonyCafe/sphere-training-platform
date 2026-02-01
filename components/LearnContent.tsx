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
  // Handle null/undefined
  if (!learn) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
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
    'uaeDeepDive', 'sphereStatus', 'singaporeDeepDive', 'ukDeepDive', 'brazilDeepDive',
    'potentialFrictionPoints', 'howSphereAddresses',
    'speedComparison', 'asymmetryProblem', 'fourLedgers', 'capitalEfficiency',
    'globalFrameworks', 'micaDetails', 'geniusAct', 'uaeFramework', 'convergencePattern',
    // Section 2.5 flow: adoption curve → categories → detailed examples → why Sphere → metrics (proof) → market opportunity
    'adoptionCurve', 'enterpriseUseCases', 'realEnterpriseUseCases', 'whySphereIsRightPartner', 'sphereMetrics', 'unbankedOpportunity', 'arnoldOnMarkets',
    // Pillar 2 story content (Antarctica moved after risk categories)
    'antarcticaStory',
    // Section 2.6 flow: scale context → three risk categories → case studies → contagion → why blockchains fail → SphereNet solution → regulator perspective
    'systemicScaleContext', 'threeRiskCategories', 'caseStudyMakerDAO', 'caseStudyUSDCDepeg', 'caseStudyChainalysis',
    'contagionRiskToTraditionalFinance', 'whyExistingBlockchainsFail', 'sphereNetSolution', 'regulatorPerspective',
    'whatSphereIs', 'whatSphereIsNot', 'classificationMatters', 'classificationMattersLegally', 'complianceNative', 'sampleResponse', 'sampleResponses',
    'complianceFlow', 'complianceEnablesGrowth',
    'coreDefinitions', 'kycRequirements', 'amlProgram', 'cddRequirements', 'eddRequirements', 'sarRequirements',
    'riskAssessmentFramework', 'sphereComplianceApproach', 'redFlagsToWatch',
    'majorSanctionsRegimes', 'whatGetsScreened', 'highRiskJurisdictions', 'screeningProcessFlow',
    'documentationRequirements', 'flaggedPaymentProcess',
    'travelRuleSummary', 'fatfDefinition', 'requiredDataElements', 'thresholdsByJurisdiction',
    'whyTravelRuleMatters', 'travelRuleProtocols', 'transmissionMethods', 'transactionsApplied', 'edgeCases',
    'sanctionsRegimes', 'screeningProcess',
    'whatIsIt', 'thresholds', 'travelRuleFlow', 'whyItMatters',

    // =========================================================================
    // PILLAR 4: Risk & Governance - All sections
    // =========================================================================
    // 4.1 Operational Risk Framework
    'whyOperationalRiskMatters', 'mitigationFramework', 'caseStudies', 'governanceCertifications',
    // 4.2 Counterparty Risk Management
    'whyCounterpartyRiskMatters', 'counterpartyTypes', 'dueDiligenceFramework',
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
    'threeLines', 'riskAppetite', 'boardOversight', 'regulatoryReadiness',
    // 4.7 Technology & Cybersecurity Risk
    'threatLandscape', 'securityFramework', 'keyControls',
    'cryptoSpecificSecurity', 'securityIncidentResponse',
    'sphereCertifications', 'sphereResilience',

    // =========================================================================
    // PILLAR 5: Sphere Product & Positioning - All sections
    // =========================================================================
    // 5.1-5.2 Sphere Origin & Product Architecture
    'foundingContext', 'arnoldQuotes', 'productComponents', 'paymentFlow',
    'architectureOverview', 'stablecoinSettlementDeepDive', 'complianceArchitecture',
    'bankingIntegrationArchitecture', 'failureModes', 'apiOverview',
    // 5.3 Competitive Positioning
    'positioningFramework', 'competitorCategories', 'spherePayCompetitors', 'sphereNetCompetitors',
    'vsTraditional', 'vsCryptoNative', 'vsTraditionalBanks', 'whenToWalkAway',
    // 5.4 Customer Segments & Use Cases
    'primaryUseCases', 'sphereCustomerProfiles', 'geographicFocus', 'bobAndAhmed',
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
    // Shared/Generic content blocks
    // =========================================================================
    'questions', 'tips', 'closingExample',
    'systemicRisk', 'sphereMitigation', 'sphereApproach', 'sphereRegulatoryApproach',
    'sphereEnterpriseApproach', 'spherePosition',
    'regulatorQA', 'reserveComposition', 'marketGrowth',
    'table', 'comparison', 'languageGuide',
    'sphereRelevance', 'sphereSolution',
    'arnoldInsight',
    'keyTakeaway',
    // Section transitions (always at end, before exercise/quiz)
    'nextSection'
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
    case 'coreMetrics':
    case 'sphereMetrics':
      return <StatsBlock title={value.title} items={value.items} />;

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
    
    case 'whenToWalkAway':
      return <WhenToWalkAwayBlock data={value} />;

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
    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mt-4">
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
        <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3 mb-4">
          <p className="text-amber-200 text-sm">💡 {data.keyDistinction}</p>
        </div>
      )}
      <div className="space-y-3">
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
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded p-3 mt-4">
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
                      <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3">
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
                    
                    {sys.sphereRelevance && (
                      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded p-3">
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
            <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3 mt-4">
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
                  <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
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
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded p-3">
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
            <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3 mt-4">
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
    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-4 mt-6">
      <h4 className="text-blue-300 font-semibold mb-2">→ {data.title}</h4>
      <p className="text-gray-300 text-sm">{data.preview}</p>
    </div>
  );
}

// NEW: Difficulty Note Block (for advanced sections)
function DifficultyNoteBlock({ data }: { data: any }) {
  return (
    <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-4">
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
        <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
          <p className="text-blue-200 text-sm">{data.keyMessage}</p>
        </div>
      )}
    </div>
  );
}

// NEW: Sphere Status Block (for UAE section)
function SphereStatusBlock({ data }: { data: any }) {
  return (
    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mt-3">
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
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded p-2 mt-2">
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
                      <h5 className="text-red-300 font-semibold mb-3">⚠️ {item.whatCanGoWrong.title || 'Risk Scenarios'}</h5>
                      <div className="space-y-3">
                        {item.whatCanGoWrong.scenarios?.map((scenario: any, j: number) => (
                          <div key={j} className="bg-red-500/5 border border-red-500/20 rounded-lg p-3">
                            <h6 className="text-white font-medium mb-2">{scenario.scenario}</h6>
                            <p className="text-gray-400 text-xs mb-3">{scenario.description}</p>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>
                                <span className="text-red-400 font-semibold">Immediate Impact:</span>
                                <p className="text-gray-300">{scenario.immediateImpact}</p>
                              </div>
                              <div>
                                <span className="text-emerald-400 font-semibold">Sphere Response:</span>
                                <p className="text-gray-300">{scenario.sphereResponse}</p>
                              </div>
                              <div>
                                <span className="text-blue-400 font-semibold">Customer Impact:</span>
                                <p className="text-gray-300">{scenario.customerImpact}</p>
                              </div>
                              <div>
                                <span className="text-purple-400 font-semibold">Prevention:</span>
                                <p className="text-gray-300">{scenario.prevention}</p>
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
              <div key={i} className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                <p className="text-blue-300 font-medium mb-1">{item.lesson}</p>
                <p className="text-gray-400 text-sm">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sphere Approach - for AWS style case studies */}
      {data.sphereApproach && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
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
        <div className="bg-purple-500/20 border border-purple-500/40 rounded-lg p-3 mb-4">
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
          <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
            <p className="text-red-300 text-sm font-semibold mb-2">❌ Don't Say:</p>
            <ul className="text-gray-300 text-xs space-y-1">
              {data.languageGuide.wrong?.map((item: string, i: number) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded p-3">
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
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  
  // Handle new expanded format with categories array
  if (data.categories) {
    return (
      <div className={`rounded-xl p-6 ${isNot ? 'bg-red-500/10 border border-red-500/30' : 'bg-emerald-500/10 border border-emerald-500/30'}`}>
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
                <div className="px-4 pb-4 space-y-2">
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
                  {cat.keyObligations && (
                    <div className="flex flex-wrap gap-1">
                      {cat.keyObligations.map((o: string, j: number) => (
                        <span key={j} className="text-xs bg-slate-700 text-gray-300 px-2 py-0.5 rounded">{o}</span>
                      ))}
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
      <h3 className="font-semibold text-white mb-2">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 text-sm mb-2">{data.subtitle}</p>}
      {data.philosophy && (
        <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3 mb-4">
          <p className="text-purple-300 text-sm italic">💡 {data.philosophy}</p>
        </div>
      )}
      <div className="space-y-3">
        {data.layers?.map((layer: any, i: number) => (
          <div key={i} className={`rounded-lg p-4 border-l-4 ${
            i === 0 ? 'bg-blue-500/10 border-blue-500' :
            i === 1 ? 'bg-amber-500/10 border-amber-500' :
            i === 2 ? 'bg-red-500/10 border-red-500' :
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
                        <div key={j} className="bg-red-500/10 border border-red-500/20 rounded p-3">
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
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3">
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

function LiquidityTypesBlock({ data }: { data: any }) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 text-sm mb-4">{data.subtitle}</p>}
      <div className="space-y-4">
        {data.types?.map((item: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              className="w-full p-4 text-left hover:bg-slate-700/70 transition-colors"
            >
              <div className="flex items-center gap-3">
                {item.icon && <span className="text-2xl">{item.icon}</span>}
                <div>
                  <p className="text-white font-medium">{item.type}</p>
                  <p className="text-gray-400 text-sm">{item.definition}</p>
                </div>
              </div>
            </button>

            {expanded === i && (
              <div className="p-4 pt-0 border-t border-slate-600 space-y-4">
                {/* Payment Processor Context */}
                {item.paymentProcessorContext && (
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
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
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded p-3">
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
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3">
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
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3">
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
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3">
                      <p className="text-purple-300 text-sm">💼 {metric.institutionalContext}</p>
                    </div>
                  )}

                  {metric.zeroRPOexplained && (
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
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
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-2">{data.subtitle}</p>}
      {data.philosophy && (
        <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3 mb-4">
          <p className="text-purple-300 text-sm italic">{data.philosophy}</p>
        </div>
      )}

      {/* Format Section */}
      {data.format && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-4">
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
          <h4 className="text-white font-semibold mb-3">Review Agenda</h4>
          <div className="space-y-2">
            {data.agenda.map((item: any, i: number) => (
              <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="w-full p-3 text-left hover:bg-slate-700/70 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">{item.section}</span>
                    <span className="text-gray-500 text-xs">{item.duration}</span>
                  </div>
                </button>
                {expanded === i && (
                  <div className="px-3 pb-3 border-t border-slate-600 pt-2">
                    <p className="text-gray-400 text-sm mb-1"><span className="font-medium">Focus:</span> {item.focus}</p>
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
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded p-3">
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
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}

      {data.consequences && (
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {data.consequences.map((c: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-start gap-3 mb-2">
                <span className="text-blue-400 font-bold">{i + 1}.</span>
                <h4 className="text-white font-medium">{c.determination}</h4>
              </div>
              <p className="text-gray-400 text-sm mb-2">{c.detail}</p>
              {c.sphereImplication && (
                <p className="text-emerald-400 text-sm">
                  <span className="font-medium">Sphere:</span> {c.sphereImplication}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {data.caseStudies && (
        <div className="bg-slate-700/50 rounded-lg p-4">
          <h4 className="text-red-300 font-medium mb-3 flex items-center gap-2">
            ⚠️ {data.caseStudies.title}
          </h4>
          <div className="space-y-2">
            {data.caseStudies.cases?.map((cs: any, i: number) => (
              <div key={i} className="bg-slate-800/70 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedCase(expandedCase === cs.company ? null : cs.company)}
                  className="w-full text-left p-3 flex items-center justify-between hover:bg-slate-600/50 transition-colors"
                >
                  <span className="text-white">{cs.company}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedCase === cs.company ? 'rotate-180' : ''}`} />
                </button>
                {expandedCase === cs.company && (
                  <div className="px-3 pb-3 border-t border-slate-700 pt-3 space-y-2">
                    <div>
                      <p className="text-gray-500 text-xs">Issue</p>
                      <p className="text-gray-300 text-sm">{cs.issue}</p>
                    </div>
                    <div>
                      <p className="text-red-400 text-xs">Consequence</p>
                      <p className="text-gray-300 text-sm">{cs.consequence}</p>
                    </div>
                    <div>
                      <p className="text-amber-400 text-xs">Lesson</p>
                      <p className="text-gray-300 text-sm">{cs.lesson}</p>
                    </div>
                    {cs.sphereRelevance && (
                      <div>
                        <p className="text-emerald-400 text-xs">Sphere Approach</p>
                        <p className="text-gray-300 text-sm">{cs.sphereRelevance}</p>
                      </div>
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
              <div className="bg-red-500/10 rounded p-2 mt-2">
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
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-6 text-xl">{data.title}</h3>

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
                <span className="text-gray-300 text-sm">{p.action}</span>
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
                    <span className="text-red-400 text-sm bg-red-500/10 px-3 py-1 rounded">{r.approval}</span>
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
                <p className="text-white font-semibold mb-2">{t.component}</p>
                <p className="text-gray-400">{t.function}</p>
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
        <div className="bg-slate-700/50 rounded-lg p-4">
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
    </div>
  );
}

// Sanctions Regimes Block (Section 3.3)
function SanctionsRegimesBlock({ data }: { data: any }) {
  const [expandedRegime, setExpandedRegime] = useState<string | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-6 text-xl">{data.title}</h3>

      <div className="space-y-4">
        {data.regimes?.map((r: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedRegime(expandedRegime === r.regime ? null : r.regime)}
              className="w-full p-5 text-left flex items-center justify-between hover:bg-slate-600/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                {r.icon && <span className="text-2xl">{r.icon}</span>}
                <div>
                  <span className="text-white font-semibold">{r.regime}</span>
                  {r.fullName && <p className="text-gray-400 text-sm">{r.fullName}</p>}
                </div>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedRegime === r.regime ? 'rotate-180' : ''}`} />
            </button>
            {expandedRegime === r.regime && (
              <div className="px-5 pb-5 border-t border-slate-600 pt-4 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="text-gray-500 text-sm mb-1">Agency</p>
                    <p className="text-white">{r.agency}</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="text-gray-500 text-sm mb-1">Scope</p>
                    <p className="text-gray-300">{r.scope}</p>
                  </div>
                </div>
                {r.lists && (
                  <div>
                    <p className="text-gray-400 text-sm uppercase mb-3">Sanctions Lists</p>
                    <div className="space-y-2">
                      {r.lists.map((l: any, j: number) => (
                        <div key={j} className="bg-slate-800/50 rounded-lg p-3">
                          <span className="text-blue-300 font-medium">{l.list}</span>
                          <span className="text-gray-400 ml-2">- {l.description}</span>
                          {l.count && <span className="text-gray-500 ml-2">({l.count})</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {r.keyPrinciples && (
                  <div>
                    <p className="text-gray-400 text-sm uppercase mb-2">Key Principles</p>
                    <div className="space-y-2">
                      {r.keyPrinciples.map((p: any, j: number) => (
                        <div key={j} className="bg-slate-800/50 rounded-lg p-3">
                          {typeof p === 'string' ? (
                            <p className="text-gray-300 text-sm">{p}</p>
                          ) : (
                            <p className="text-sm">
                              <span className="text-white font-semibold">{p.principle}:</span>
                              <span className="text-gray-400 ml-1">{p.context}</span>
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {r.realWorldExamples && (
                  <div>
                    <p className="text-gray-400 text-sm uppercase mb-2">Real-World Examples</p>
                    <div className="space-y-2">
                      {r.realWorldExamples.map((ex: any, j: number) => (
                        <div key={j} className="bg-red-500/10 rounded-lg p-3">
                          <p className="text-white font-medium text-sm">{ex.example}</p>
                          <p className="text-gray-400 text-sm">{ex.violation}</p>
                          <p className="text-red-400 text-sm font-medium">{ex.consequence}</p>
                          {ex.lesson && <p className="text-gray-500 text-xs mt-1">{ex.lesson}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {r.sphereImplication && (
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                    <p className="text-emerald-400"><span className="font-semibold">Sphere:</span> {r.sphereImplication}</p>
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

// What Gets Screened Block (Section 3.3)
function WhatGetsScreenedBlock({ data }: { data: any }) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>
      {data.introduction && (
        <p className="text-gray-400 mb-6">{data.introduction}</p>
      )}

      <div className="space-y-3">
        {data.categories?.map((cat: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedCategory(expandedCategory === cat.category ? null : cat.category)}
              className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-600/50 transition-colors"
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
              <div className="px-4 pb-4 border-t border-slate-600 pt-4 space-y-3">
                {cat.whyItMatters && (
                  <p className="text-gray-400 text-sm">{cat.whyItMatters}</p>
                )}
                <div className="space-y-2">
                  {cat.items?.map((item: any, j: number) => (
                    <div key={j} className="bg-slate-800/50 rounded-lg p-3">
                      <p className="text-blue-300 font-medium">{item.item}</p>
                      <p className="text-gray-400 text-sm">{item.detail}</p>
                      {item.challenge && (
                        <p className="text-amber-300 text-sm mt-1">⚠️ {item.challenge}</p>
                      )}
                    </div>
                  ))}
                </div>
                {(cat.howItWorks || cat.example) && (
                  <div className="grid md:grid-cols-2 gap-3 pt-2">
                    {cat.howItWorks && (
                      <div className="bg-slate-800/50 rounded-lg p-3">
                        <p className="text-gray-500 text-xs uppercase mb-1">How it works</p>
                        <p className="text-gray-300 text-sm">{cat.howItWorks}</p>
                      </div>
                    )}
                    {cat.example && (
                      <div className="bg-emerald-500/10 rounded-lg p-3">
                        <p className="text-gray-500 text-xs uppercase mb-1">Example</p>
                        <p className="text-emerald-300 text-sm">{cat.example}</p>
                      </div>
                    )}
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

// High Risk Jurisdictions Block (Section 3.3)
function HighRiskJurisdictionsBlock({ data }: { data: any }) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-6 text-xl">{data.title}</h3>

      <div className="space-y-4 mb-6">
        {data.jurisdictionCategories?.map((cat: any, i: number) => {
          const isProhibited = cat.riskLevel?.includes('PROHIBITED');
          const isHigh = cat.riskLevel?.includes('HIGH');
          const borderColor = isProhibited ? 'border-l-red-500' : isHigh ? 'border-l-amber-500' : 'border-l-yellow-500';

          return (
            <div key={i} className={`bg-slate-700/50 rounded-lg overflow-hidden border-l-4 ${borderColor}`}>
              <button
                onClick={() => setExpandedCategory(expandedCategory === cat.category ? null : cat.category)}
                className="w-full p-5 text-left flex justify-between items-center hover:bg-slate-600/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-white font-semibold">{cat.category}</span>
                  <span className={`text-sm px-2 py-1 rounded ${isProhibited ? 'text-red-400 bg-red-500/10' : isHigh ? 'text-amber-400 bg-amber-500/10' : 'text-yellow-400 bg-yellow-500/10'}`}>
                    {cat.riskLevel}
                  </span>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedCategory === cat.category ? 'rotate-180' : ''}`} />
              </button>
              {expandedCategory === cat.category && (
                <div className="px-5 pb-5 border-t border-slate-600 pt-4 space-y-4">
                  {cat.explanation && (
                    <p className="text-gray-400">{cat.explanation}</p>
                  )}
                  {cat.jurisdictions && (
                    <div className="space-y-3">
                      {cat.jurisdictions.map((j: any, k: number) => (
                        <div key={k} className="bg-slate-800/50 rounded-lg p-4">
                          <p className="text-white font-medium mb-1">{j.icon} {j.country}</p>
                          <p className="text-gray-400">{j.detail}</p>
                          {j.status && (
                            <p className="text-blue-400 text-sm mt-2">Status: {j.status}</p>
                          )}
                          {j.exception && (
                            <p className="text-emerald-400 text-sm mt-2">Exception: {j.exception}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {cat.spherePolicy && (
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                      <p className="text-blue-400"><span className="font-semibold">Sphere Policy:</span> {cat.spherePolicy}</p>
                    </div>
                  )}
                  {cat.customerCommunication && (
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <p className="text-gray-500 text-sm mb-1">Customer Communication</p>
                      <p className="text-gray-300">{cat.customerCommunication}</p>
                    </div>
                  )}
                  {cat.eddRequirements && (
                    <div>
                      <p className="text-gray-500 text-sm mb-2">EDD Requirements</p>
                      <div className="flex flex-wrap gap-2">
                        {cat.eddRequirements.map((req: string, k: number) => (
                          <span key={k} className="text-gray-300 bg-slate-600/50 px-3 py-1 rounded">{req}</span>
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

      {data.nuancedApproach && (
        <div className="bg-slate-700/50 rounded-lg p-5">
          <h4 className="text-white font-semibold mb-2">{data.nuancedApproach.title}</h4>
          <p className="text-gray-400 text-sm mb-4">{data.nuancedApproach.explanation}</p>
          <div className="grid md:grid-cols-2 gap-3">
            {data.nuancedApproach.tiers?.map((t: any, i: number) => {
              const colorClasses = t.tier === 'Prohibited' ? 'border-l-red-500 bg-red-500/5' :
                           t.tier === 'Highly Restricted' ? 'border-l-amber-500 bg-amber-500/5' :
                           t.tier === 'Enhanced Scrutiny' ? 'border-l-yellow-500 bg-yellow-500/5' : 'border-l-emerald-500 bg-emerald-500/5';
              const textColor = t.tier === 'Prohibited' ? 'text-red-400' :
                           t.tier === 'Highly Restricted' ? 'text-amber-400' :
                           t.tier === 'Enhanced Scrutiny' ? 'text-yellow-400' : 'text-emerald-400';
              return (
                <div key={i} className={`rounded-lg p-3 border-l-4 ${colorClasses}`}>
                  <div className="flex justify-between items-center mb-1">
                    <p className={`font-semibold text-sm ${textColor}`}>{t.tier}</p>
                    {t.examples && <span className="text-gray-500 text-xs">{t.examples}</span>}
                  </div>
                  <p className="text-white text-sm">{t.treatment}</p>
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
  const [expandedNode, setExpandedNode] = useState<string | null>(null);

  // Filter to show main flow nodes (not decision branches)
  const mainNodes = data.nodes?.filter((n: any) =>
    ['initiation', 'pre-screen', 'clear-process', 'potential-match', 'confirmed-hit'].includes(n.id)
  ) || [];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-6 text-xl">{data.title}</h3>

      {/* Visual Flow */}
      <div className="space-y-3 mb-6">
        {mainNodes.map((node: any, index: number) => {
          const isExpanded = expandedNode === node.id;
          const colorClass = node.color === 'green' ? 'border-l-emerald-500' :
                            node.color === 'red' ? 'border-l-red-500' :
                            node.color === 'yellow' ? 'border-l-amber-500' : 'border-l-blue-500';
          const bgClass = node.color === 'green' ? 'bg-emerald-500/5' :
                         node.color === 'red' ? 'bg-red-500/5' :
                         node.color === 'yellow' ? 'bg-amber-500/5' : 'bg-slate-700/50';

          return (
            <div key={node.id}>
              <div className={`rounded-lg border-l-4 ${colorClass} ${bgClass} overflow-hidden`}>
                <button
                  onClick={() => setExpandedNode(isExpanded ? null : node.id)}
                  className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-600/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-slate-600 text-white flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-white font-semibold">{node.label}</p>
                      <p className="text-gray-400 text-sm">{node.description}</p>
                    </div>
                  </div>
                  {(node.details || node.outcome) && (
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  )}
                </button>
                {isExpanded && (node.details || node.outcome) && (
                  <div className="px-4 pb-4 pt-2 border-t border-slate-600/50">
                    {node.details && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {node.details.map((d: string, i: number) => (
                          <span key={i} className="text-gray-300 text-sm bg-slate-800/50 px-3 py-1 rounded">• {d}</span>
                        ))}
                      </div>
                    )}
                    {node.outcome && (
                      <p className={`text-sm font-medium ${node.color === 'green' ? 'text-emerald-400' : node.color === 'red' ? 'text-red-400' : 'text-blue-400'}`}>
                        → {node.outcome}
                      </p>
                    )}
                  </div>
                )}
              </div>
              {index < mainNodes.length - 1 && index < 1 && (
                <div className="flex justify-center py-1">
                  <div className="w-0.5 h-4 bg-slate-600"></div>
                </div>
              )}
              {index === 1 && (
                <div className="flex items-center justify-center py-2 gap-2">
                  <div className="flex-1 h-px bg-slate-600"></div>
                  <span className="text-gray-500 text-xs px-2">SCREENING RESULT</span>
                  <div className="flex-1 h-px bg-slate-600"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Key principles - compact grid */}
      {data.keyPrinciples && (
        <div className="bg-slate-700/50 rounded-lg p-4">
          <h4 className="text-white font-semibold mb-3 text-sm">Key Principles</h4>
          <div className="grid md:grid-cols-2 gap-2">
            {data.keyPrinciples.map((p: string, i: number) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <span className="text-emerald-400 flex-shrink-0">✓</span>
                <span className="text-gray-300">{p}</span>
              </div>
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

      <div className="space-y-3">
        {data.byFlagType?.map((f: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedFlag(expandedFlag === f.flagType ? null : f.flagType)}
              className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-600/50 transition-colors"
            >
              <div>
                <p className="text-amber-300 font-semibold">{f.flagType}</p>
                <p className="text-gray-400 text-sm">{f.scenario}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-blue-300 text-sm">{f.timeline}</span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedFlag === f.flagType ? 'rotate-180' : ''}`} />
              </div>
            </button>
            {expandedFlag === f.flagType && (
              <div className="px-4 pb-4 border-t border-slate-600 pt-3 space-y-3">
                {f.whyFlagged && (
                  <div className="bg-amber-500/10 rounded-lg p-3">
                    <p className="text-amber-300 text-sm"><span className="font-medium">Why flagged:</span> {f.whyFlagged}</p>
                  </div>
                )}
                <div>
                  <p className="text-gray-500 text-xs uppercase mb-2">Required Documentation</p>
                  <div className="space-y-1">
                    {f.requiredDocumentation?.map((d: string, j: number) => (
                      <p key={j} className="text-gray-300 text-sm bg-slate-800/50 rounded p-2">• {d}</p>
                    ))}
                  </div>
                </div>
                <div className="bg-emerald-500/10 rounded-lg p-3">
                  <p className="text-emerald-300 text-sm"><span className="font-medium">Purpose:</span> {f.purpose}</p>
                </div>
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
      <div className="space-y-3 mb-6">
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
                <div className="px-4 pb-4 pt-1 border-t border-slate-600/50 space-y-3">
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
                                isPositive ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                                isNegative ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                                'bg-amber-500/20 text-amber-400 border border-amber-500/30'
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
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                      <p className="text-blue-400 font-medium text-sm mb-2">📧 {s.customerCommunication.subject}</p>
                      <pre className="text-gray-400 text-xs whitespace-pre-wrap font-sans bg-slate-800/50 rounded p-3">{s.customerCommunication.template}</pre>
                    </div>
                  )}

                  {/* Approved/Rejected communications (for step 5) */}
                  {s.approvedCommunication && (
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                      <p className="text-green-400 font-medium text-sm mb-2">✓ {s.approvedCommunication.subject}</p>
                      <pre className="text-gray-400 text-xs whitespace-pre-wrap font-sans bg-slate-800/50 rounded p-3">{s.approvedCommunication.template}</pre>
                    </div>
                  )}
                  {s.rejectedCommunication && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
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
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-5 mb-4">
          <p className="text-emerald-400"><span className="font-semibold">Sphere Position:</span> {data.spherePosition}</p>
        </div>
      )}
      {data.whyItMatters && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-5">
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
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
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
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
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
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
            <p className="text-emerald-400"><span className="font-semibold">Sphere Approach:</span> {data.sunriseIssue.sphereApproach}</p>
          </div>
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
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>
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
                <span className={`text-xs ${j.status === 'Enforced' ? 'text-emerald-400' : 'text-amber-400'}`}>{j.status}</span>
              </button>
              {expandedJurisdiction === j.jurisdiction && (
                <div className="px-3 pb-3 border-t border-slate-600 pt-3 text-sm space-y-1">
                  <p className="text-gray-400">Regulator: {j.regulator}</p>
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
          <h4 className="text-amber-400 font-medium mb-3">{data.latinAmerica.title}</h4>
          <div className="space-y-2">
            {data.latinAmerica.jurisdictions?.map((j: any, i: number) => (
              <div key={i} className="text-sm">
                <span className="text-white">{j.flag} {j.jurisdiction}</span>
                <span className="text-gray-400 ml-2">- {j.threshold}</span>
                <span className="text-gray-500 ml-2">({j.regulator})</span>
                {j.sphereImplication && <p className="text-blue-400 text-xs ml-4">{j.sphereImplication}</p>}
              </div>
            ))}
          </div>
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
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="text-gray-500 text-sm mb-1">Impact</p>
              <p className="text-red-300">{b.impact}</p>
            </div>
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
                <span className="text-gray-400 ml-2">({p.type})</span>
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
                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                      <p className="text-emerald-300 font-medium mb-2">Pros</p>
                      <div className="space-y-2">
                        {p.pros.map((pro: string, j: number) => (
                          <p key={j} className="text-gray-300">✓ {pro}</p>
                        ))}
                      </div>
                    </div>
                  )}
                  {p.cons && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
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
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                    <p className="text-emerald-400"><span className="font-semibold">Sphere:</span> {p.sphereSupport}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {data.sphereApproach && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-5">
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
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                <p className="text-emerald-300 font-medium mb-2">Advantages</p>
                <div className="space-y-2">
                  {m.advantages?.map((a: string, j: number) => (
                    <p key={j} className="text-gray-300">✓ {a}</p>
                  ))}
                </div>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <p className="text-red-300 font-medium mb-2">Disadvantages</p>
                <div className="space-y-2">
                  {m.disadvantages?.map((d: string, j: number) => (
                    <p key={j} className="text-gray-300">✗ {d}</p>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <p className="text-amber-300"><span className="font-medium">When to use:</span> {m.whenToUse}</p>
            </div>
          </div>
        ))}
      </div>

      {data.timingRequirements && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-5">
          <h4 className="text-blue-300 font-semibold mb-3">{data.timingRequirements.title}</h4>
          <p className="text-gray-300 mb-4">{data.timingRequirements.guidance}</p>
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
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
              <div key={i} className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-5">
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
                        <div className="bg-red-500/10 rounded-lg p-3">
                          <p className="text-red-300">✗ {sol.cons}</p>
                        </div>
                      </div>
                      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                        <p className="text-amber-300"><span className="font-medium">When to use:</span> {sol.when}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {s.sphereApproach && (
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
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
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-4">
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
            <div key={i} className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
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
        <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3 mt-4">
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
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-4">
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

      {/* Daily Management Tasks (for dailyManagement) */}
      {data.startOfDay && (
        <div className="space-y-4">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
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
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
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
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="text-red-300 font-semibold mb-2">{data.bankingCutoffs.title}</h4>
              <p className="text-gray-400 text-sm mb-3">{data.bankingCutoffs.description}</p>
              <div className="space-y-2">
                {data.bankingCutoffs.examples?.map((ex: any, i: number) => (
                  <div key={i} className="flex justify-between items-center bg-slate-800/50 rounded p-2">
                    <span className="text-white text-sm">{ex.system}</span>
                    <span className="text-red-300 text-sm font-mono">{ex.cutoff}</span>
                  </div>
                ))}
              </div>
              {data.bankingCutoffs.management && (
                <p className="text-emerald-300 text-xs mt-3">✓ {data.bankingCutoffs.management}</p>
              )}
            </div>
          )}

          {data.endOfDay && (
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
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
        <div className="space-y-3 mb-4">
          {data.elements.map((el: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <h4 className="text-white font-medium mb-1">{el.element}</h4>
              <p className="text-gray-400 text-sm mb-2">{el.description}</p>
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
            <div key={i} className="bg-red-500/5 border border-red-500/20 rounded-lg overflow-hidden">
              <div
                className="p-4 cursor-pointer hover:bg-red-500/10"
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
                  <div key={i} className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
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
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
              <h4 className="text-red-300 font-semibold mb-2">Outcome</h4>
              <p className="text-white">{data.outcome}</p>
            </div>
          )}

          {/* Lessons for Sphere */}
          {data.lessonsForSphere && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
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
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
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
        <div className="grid gap-4 md:grid-cols-2">
          {data.metrics.map((m: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                {m.icon && <span className="text-xl">{m.icon}</span>}
                <h4 className="text-blue-300 font-semibold">{m.metric || m.name}</h4>
              </div>
              {m.definition && <p className="text-gray-400 text-sm mb-2">{m.definition}</p>}
              {m.target && <p className="text-emerald-300 text-sm">Target: {m.target}</p>}
              {m.why && <p className="text-purple-300 text-xs mt-1">Why: {m.why}</p>}
            </div>
          ))}
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
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-4">
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

      {/* Liquidity Layers (for liquidityManagementFramework) */}
      {data.layers && (
        <div className="space-y-4">
          {data.layers.map((layer: any, i: number) => (
            <div key={i} className={`rounded-lg overflow-hidden border-l-4 ${
              layer.icon === '🟢' ? 'bg-emerald-500/10 border-emerald-500' :
              layer.icon === '🟡' ? 'bg-amber-500/10 border-amber-500' :
              layer.icon === '🔴' ? 'bg-red-500/10 border-red-500' :
              i === 0 ? 'bg-blue-500/10 border-blue-500' :
              i === 1 ? 'bg-amber-500/10 border-amber-500' :
              'bg-red-500/10 border-red-500'
            }`}>
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="w-full p-4 text-left hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {layer.icon && <span className="text-xl">{layer.icon}</span>}
                  <div>
                    <h4 className="text-white font-semibold">{layer.layer || layer.name}</h4>
                    {layer.purpose && <p className="text-gray-400 text-sm">{layer.purpose}</p>}
                  </div>
                </div>
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
          {data.scenarios.map((s: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === (i + 100) ? null : (i + 100))}
                className="w-full p-4 text-left hover:bg-slate-700/70 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {s.icon && <span className="text-xl">{s.icon}</span>}
                  <div>
                    <h4 className="text-amber-300 font-medium">{s.scenario || s.name}</h4>
                    <p className="text-gray-400 text-sm">{s.description}</p>
                  </div>
                </div>
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
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded p-2">
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
                    <div className={`rounded p-2 ${s.lastResult.includes('Pass') ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
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
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded p-3">
          <p className="text-emerald-300 text-sm">💡 {data.integration}</p>
        </div>
      )}

      {/* Original style comparison (term/definition) */}
      {data.comparison && !isBcpDrStyle && (
        <div className="grid md:grid-cols-2 gap-4">
          {data.comparison.map((item: any, i: number) => (
            <div key={i} className={`rounded-lg p-4 ${i === 0 ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-purple-500/10 border border-purple-500/30'}`}>
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
          {data.principles.map((p: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="w-full p-4 text-left hover:bg-slate-700/70 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {p.icon && <span className="text-2xl">{p.icon}</span>}
                  <div>
                    <h4 className="text-white font-semibold">{p.principle}</h4>
                    {p.benefit && <p className="text-emerald-300 text-sm">{p.benefit}</p>}
                  </div>
                </div>
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
        <div className="space-y-3">
          {data.threats.map((threat: any, i: number) => (
            <div key={i} className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <h4 className="text-red-300 font-semibold mb-2">{threat.threat || threat.name}</h4>
              <p className="text-gray-400 text-sm mb-2">{threat.description}</p>
              {threat.mitigation && <p className="text-emerald-300 text-sm">Mitigation: {threat.mitigation}</p>}
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
        <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3 mb-4">
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
      <h3 className="font-semibold text-white mb-4 text-xl">💬 {data.title}</h3>

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
                <div className="px-4 pb-4 border-t border-slate-600 pt-3">
                  <div className="bg-emerald-500/10 rounded p-3">
                    <p className="text-emerald-300 text-sm">{q.answer}</p>
                  </div>
                  {q.evidence && <p className="text-gray-400 text-xs mt-2">Evidence: {q.evidence}</p>}
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
        <div className="bg-red-500/10 border border-red-500/30 rounded p-3 mb-4">
          <p className="text-red-300 text-xs font-semibold mb-1">Trigger Criteria:</p>
          <p className="text-gray-300 text-sm">{data.triggerCriteria}</p>
        </div>
      )}

      {data.roles && (
        <div className="space-y-3 mb-4">
          <h4 className="text-white font-semibold">Roles</h4>
          {data.roles.map((role: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4">
              <h5 className="text-blue-300 font-medium mb-1">{role.role || role.name}</h5>
              <p className="text-gray-400 text-sm">{role.responsibility || role.description}</p>
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
              <p className="text-gray-400 text-sm mb-2">{ctrl.description}</p>
              {ctrl.implementation && <p className="text-blue-300 text-xs">Implementation: {ctrl.implementation}</p>}
              {ctrl.sphereApproach && <p className="text-emerald-300 text-xs mt-1">Sphere: {ctrl.sphereApproach}</p>}
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
        <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3 mt-4">
          <p className="text-purple-300 text-sm">💡 {data.keyPrinciple}</p>
        </div>
      )}
    </div>
  );
}

function DeepDiveBlock({ data }: { data: any }) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}

      {/* Supported Chains (for stablecoinSettlementDeepDive) */}
      {data.supportedChains && (
        <div className="space-y-4 mb-4">
          <h4 className="text-blue-300 font-medium">{data.supportedChains.title}</h4>
          {data.supportedChains.chains?.map((chain: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="w-full p-4 text-left hover:bg-slate-700/70 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h5 className="text-white font-medium">{chain.chain}</h5>
                  <span className="text-gray-400 text-sm">{chain.stablecoins?.join(', ')}</span>
                </div>
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
        </div>
      )}

      {/* Partners/Components (for bankingIntegrationArchitecture) */}
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

      {/* Components (for complianceArchitecture) */}
      {data.components && !data.layers && (
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

function FailureModesBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}

      <div className="space-y-4">
        {data.scenarios?.map((scenario: any, i: number) => (
          <div key={i} className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
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
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-4">
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
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-xs font-mono">{endpoint.method}</span>
                <code className="text-blue-300 text-sm">{endpoint.endpoint}</code>
              </div>
              <p className="text-gray-400 text-sm">{endpoint.purpose}</p>
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
              <p className="text-gray-400 text-xs mt-1">{webhook.trigger}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SystemIntegrationBlock({ data }: { data: any }) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>

      <div className="space-y-4">
        {data.systems?.map((system: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              className="w-full p-4 text-left hover:bg-slate-700/70 transition-colors"
            >
              <h4 className="text-white font-medium">{system.system}</h4>
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
                  <div className="bg-blue-500/10 rounded p-2">
                    <p className="text-blue-300 text-sm"><span className="font-medium">Approach:</span> {system.integrationApproach}</p>
                  </div>
                )}

                {/* Sphere Capabilities */}
                {system.sphereCapabilities && (
                  <div>
                    <p className="text-emerald-300 text-xs font-medium mb-1">Sphere Capabilities:</p>
                    <div className="flex flex-wrap gap-2">
                      {system.sphereCapabilities.map((cap: string, j: number) => (
                        <span key={j} className="bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded text-xs">{cap}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Considerations */}
                {system.considerations && (
                  <p className="text-amber-300 text-xs">⚠️ {system.considerations}</p>
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
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
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
                <div className="flex flex-wrap gap-1">
                  {req.requiredFields.map((field: string, j: number) => (
                    <span key={j} className="bg-slate-600 text-gray-300 px-2 py-0.5 rounded text-xs">{field}</span>
                  ))}
                </div>
              )}
              {req.keyStatuses && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {req.keyStatuses.map((status: string, j: number) => (
                    <span key={j} className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-xs">{status}</span>
                  ))}
                </div>
              )}
              {req.timing && <p className="text-gray-500 text-xs mt-2">Timing: {req.timing}</p>}
              {req.frequency && <p className="text-gray-500 text-xs mt-2">Frequency: {req.frequency}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Best Practices */}
      {data.reconciliationBestPractices && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
          <h4 className="text-emerald-300 font-medium mb-2">Reconciliation Best Practices</h4>
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
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}

      <div className="space-y-3">
        {data.questions?.map((q: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              className="w-full p-4 text-left hover:bg-slate-700/70 transition-colors"
            >
              <p className="text-white font-medium">{q.question}</p>
            </button>

            {expanded === i && (
              <div className="p-4 pt-0 border-t border-slate-600 space-y-2">
                {q.whyAsk && (
                  <p className="text-blue-300 text-sm"><span className="font-medium">Why ask:</span> {q.whyAsk}</p>
                )}
                {q.goodAnswer && (
                  <p className="text-emerald-300 text-sm"><span className="font-medium">Good answer:</span> {q.goodAnswer}</p>
                )}
                {q.redFlag && (
                  <p className="text-red-300 text-sm"><span className="font-medium">Red flag:</span> {q.redFlag}</p>
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
        <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3 mt-4">
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
      {(data.regulatoryImplication || data.lessonForSphere || data.keyTakeaway) && (
        <p className="text-emerald-400 text-sm">
          Key Insight: {data.regulatoryImplication || data.lessonForSphere || data.keyTakeaway}
        </p>
      )}
    </div>
  );
}

function ContagionRiskBlock({ data }: { data: any }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">{data.title}</h3>
      {data.channels && (
        <div className="grid md:grid-cols-2 gap-3">
          {data.channels.map((ch: any, i: number) => (
            <div key={i} className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-red-500">
              <h4 className="text-white font-medium mb-1">{ch.channel}</h4>
              <p className="text-gray-400 text-sm">{ch.mechanism}</p>
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
          <div className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-red-500">
            <h4 className="text-red-400 font-medium mb-2">{data.traditionalBlockchains.title}</h4>
            <div className="space-y-1">
              {data.traditionalBlockchains.characteristics?.map((c: any, i: number) => (
                <p key={i} className="text-sm text-gray-400">{c.attribute}: {c.value}</p>
              ))}
            </div>
          </div>
        )}
        {data.regulatedFinanceRequirements && (
          <div className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-emerald-500">
            <h4 className="text-emerald-400 font-medium mb-2">{data.regulatedFinanceRequirements.title}</h4>
            <div className="space-y-1">
              {data.regulatedFinanceRequirements.characteristics?.map((c: any, i: number) => (
                <p key={i} className="text-sm text-gray-400">{c.attribute}: {c.value}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SphereNetSolutionBlock({ data }: { data: any }) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  
  return (
    <div className="bg-emerald-500/10 border border-emerald-500/50 rounded-xl p-6">
      <h3 className="font-semibold text-white mb-2 text-xl">✅ {data.title}</h3>
      {data.subtitle && <p className="text-emerald-300 text-sm mb-2">{data.subtitle}</p>}
      {data.introduction && <p className="text-gray-300 mb-4">{data.introduction}</p>}
      
      {/* Why SphereNet Exists */}
      {data.whySphereNetExists && (
        <div className="mb-6">
          <button onClick={() => toggleSection('why')} className="w-full text-left">
            <h4 className="text-white font-semibold mb-2 flex items-center justify-between">
              {data.whySphereNetExists.title}
              <ChevronDown className={`w-5 h-5 transition-transform ${expandedSection === 'why' ? 'rotate-180' : ''}`} />
            </h4>
          </button>
          {data.whySphereNetExists.context && <p className="text-gray-400 text-sm mb-3">{data.whySphereNetExists.context}</p>}
          {expandedSection === 'why' && (
            <div className="space-y-3 mt-3">
              {data.whySphereNetExists.limitations?.map((l: any, i: number) => (
                <div key={i} className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <p className="text-red-300 font-semibold mb-2">❌ {l.limitation}</p>
                  <p className="text-gray-300 text-sm mb-2"><span className="text-gray-500">Problem:</span> {l.problem}</p>
                  <p className="text-amber-300 text-sm mb-2"><span className="text-gray-500">Consequence:</span> {l.consequence}</p>
                  {l.example && <p className="text-gray-400 text-xs bg-slate-700/50 rounded p-2">📋 {l.example}</p>}
                </div>
              ))}
              {data.whySphereNetExists.conclusion && (
                <div className="bg-emerald-500/20 border border-emerald-500/40 rounded p-3">
                  <p className="text-emerald-200">{data.whySphereNetExists.conclusion}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      
      {/* Architecture Shift */}
      {data.architectureShift && (
        <div className="mb-6">
          <button onClick={() => toggleSection('arch')} className="w-full text-left">
            <h4 className="text-white font-semibold mb-2 flex items-center justify-between">
              {data.architectureShift.title}
              <ChevronDown className={`w-5 h-5 transition-transform ${expandedSection === 'arch' ? 'rotate-180' : ''}`} />
            </h4>
          </button>
          {expandedSection === 'arch' && (
            <div className="grid md:grid-cols-2 gap-4 mt-3">
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
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
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
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
          )}
          {data.architectureShift.keyDifference && (
            <p className="text-blue-200 text-sm mt-3 bg-blue-500/10 rounded p-2">{data.architectureShift.keyDifference}</p>
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
                      <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                        <p className="text-red-300 font-semibold text-sm mb-2">❌ {p.withoutThis.scenario}:</p>
                        <ul className="text-gray-400 text-xs space-y-1">
                          {p.withoutThis.consequences?.map((c: string, j: number) => (
                            <li key={j}>• {c}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {p.concreteExample && (
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
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
        <div className="mb-6">
          <button onClick={() => toggleSection('vsAnalytics')} className="w-full text-left">
            <h4 className="text-white font-semibold mb-2 flex items-center justify-between">
              {data.vsAnalyticsApproach.title}
              <ChevronDown className={`w-5 h-5 transition-transform ${expandedSection === 'vsAnalytics' ? 'rotate-180' : ''}`} />
            </h4>
          </button>
          {data.vsAnalyticsApproach.subtitle && <p className="text-gray-400 text-sm">{data.vsAnalyticsApproach.subtitle}</p>}
          {expandedSection === 'vsAnalytics' && (
            <div className="mt-3">
              {data.vsAnalyticsApproach.comparison && (
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-700">
                        {data.vsAnalyticsApproach.comparison.headers?.map((h: string, i: number) => (
                          <th key={i} className="p-2 text-left text-gray-300">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.vsAnalyticsApproach.comparison.rows?.map((row: string[], i: number) => (
                        <tr key={i} className="border-t border-slate-600">
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
                <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
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
        <div className="mb-6">
          <button onClick={() => toggleSection('scenarios')} className="w-full text-left">
            <h4 className="text-white font-semibold mb-2 flex items-center justify-between">
              {data.realWorldScenarios.title}
              <ChevronDown className={`w-5 h-5 transition-transform ${expandedSection === 'scenarios' ? 'rotate-180' : ''}`} />
            </h4>
          </button>
          {expandedSection === 'scenarios' && (
            <div className="space-y-4 mt-3">
              {data.realWorldScenarios.scenarios?.map((s: any, i: number) => (
                <div key={i} className="bg-slate-700/50 rounded-lg p-4">
                  <p className="text-white font-semibold mb-2">🎯 {s.scenario}</p>
                  <p className="text-gray-400 text-sm mb-3">{s.setup}</p>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                      <p className="text-red-300 font-semibold text-sm mb-2">On Traditional Blockchain:</p>
                      <ul className="text-gray-400 text-xs space-y-1">
                        {s.onTraditionalBlockchain?.map((step: string, j: number) => (
                          <li key={j}>{j + 1}. {step}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded p-3">
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
        <div className="mb-6">
          <button onClick={() => toggleSection('systemic')} className="w-full text-left">
            <h4 className="text-white font-semibold mb-2 flex items-center justify-between">
              {data.addressingSystemicRisks.title}
              <ChevronDown className={`w-5 h-5 transition-transform ${expandedSection === 'systemic' ? 'rotate-180' : ''}`} />
            </h4>
          </button>
          {data.addressingSystemicRisks.subtitle && <p className="text-gray-400 text-sm">{data.addressingSystemicRisks.subtitle}</p>}
          {expandedSection === 'systemic' && (
            <div className="space-y-4 mt-3">
              {data.addressingSystemicRisks.risks?.map((r: any, i: number) => (
                <div key={i} className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-purple-500">
                  <p className="text-purple-300 font-semibold mb-2">📊 {r.riskCategory}</p>
                  <p className="text-gray-400 text-sm mb-3">{r.problemRecap}</p>
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded p-3">
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
            </div>
          )}
        </div>
      )}
      
      {/* Protocol Level Enforcement */}
      {data.protocolLevelEnforcement && (
        <div className="mb-6">
          <button onClick={() => toggleSection('protocol')} className="w-full text-left">
            <h4 className="text-white font-semibold mb-2 flex items-center justify-between">
              {data.protocolLevelEnforcement.title}
              <ChevronDown className={`w-5 h-5 transition-transform ${expandedSection === 'protocol' ? 'rotate-180' : ''}`} />
            </h4>
          </button>
          {expandedSection === 'protocol' && (
            <div className="mt-3 space-y-4">
              {data.protocolLevelEnforcement.transactionLifecycle && (
                <div className="bg-slate-700/50 rounded p-3">
                  <p className="text-blue-300 font-semibold text-sm mb-2">{data.protocolLevelEnforcement.transactionLifecycle.title}</p>
                  <div className="space-y-2">
                    {data.protocolLevelEnforcement.transactionLifecycle.steps?.map((step: any, i: number) => (
                      <div key={i} className="flex items-start gap-2 bg-slate-600/50 rounded p-2">
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
                <div className="bg-slate-700/50 rounded p-3">
                  <p className="text-blue-300 font-semibold text-sm mb-2">Pre-Execution Checks</p>
                  <div className="space-y-2">
                    {data.protocolLevelEnforcement.preExecutionChecks.map((check: any, i: number) => (
                      <div key={i} className="bg-slate-600/50 rounded p-2">
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
                      o.status === 'APPROVED' || o.status === 'OK' ? 'bg-emerald-500/20 border border-emerald-500/40' :
                      o.status === 'FLAGGED' || o.status === 'Warning' ? 'bg-amber-500/20 border border-amber-500/40' :
                      o.status === 'QUEUED' ? 'bg-blue-500/20 border border-blue-500/40' :
                      'bg-red-500/20 border border-red-500/40'
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
        <div className="mb-4">
          <button onClick={() => toggleSection('roadmap')} className="w-full text-left">
            <h4 className="text-white font-semibold mb-2 flex items-center justify-between">
              {data.roadmapAndMigration.title}
              <ChevronDown className={`w-5 h-5 transition-transform ${expandedSection === 'roadmap' ? 'rotate-180' : ''}`} />
            </h4>
          </button>
          {expandedSection === 'roadmap' && (
            <div className="mt-3 space-y-4">
              {data.roadmapAndMigration.currentState && (
                <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                  <p className="text-blue-300 font-semibold text-sm mb-2">{data.roadmapAndMigration.currentState.title}</p>
                  <p className="text-white text-sm">{data.roadmapAndMigration.currentState.status}</p>
                  <p className="text-gray-400 text-xs mt-1">{data.roadmapAndMigration.currentState.infrastructure}</p>
                </div>
              )}
              
              {data.roadmapAndMigration.roadmap && (
                <div className="space-y-2">
                  {data.roadmapAndMigration.roadmap.map((phase: any, i: number) => (
                    <div key={i} className={`rounded p-3 ${
                      phase.status === 'In Progress' ? 'bg-emerald-500/10 border border-emerald-500/30' :
                      phase.status === 'Planned' ? 'bg-blue-500/10 border border-blue-500/30' :
                      'bg-slate-700/50 border border-slate-600'
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
                <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3">
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
  const [expandedProvision, setExpandedProvision] = useState<number | null>(null);
  
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-2 text-xl">{data.title}</h3>
      {data.subtitle && <p className="text-gray-400 mb-4">{data.subtitle}</p>}
      
      {/* Overview */}
      {data.overview && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-4">
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
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
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
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
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
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 mb-4">
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
                <p className="text-red-300 text-sm line-through mb-1">❌ {m.wrong}</p>
                <p className="text-emerald-300 text-sm">✓ {m.right}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Legacy support for old format */}
      {data.circular2024 && !data.keyProvisions && (
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
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded p-3">
                  <p className="text-emerald-300 text-xs font-semibold mb-1">✅ What They Want to Hear:</p>
                  <p className="text-gray-300 text-sm">{perspective.whatTheyWantToHear}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {data.keyInsight && (
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mt-4">
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
                        <div key={j} className="bg-red-500/10 border border-red-500/20 rounded p-3">
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
                          <div className="bg-red-500/10 rounded p-2">
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
                  <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                    <p className="text-red-300 text-sm"><span className="font-semibold">Outcome:</span> {caseStudy.outcome}</p>
                  </div>
                )}

                {/* Lesson for Sphere */}
                {caseStudy.lessonForSphere && (
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                    <p className="text-blue-300 text-sm"><span className="font-semibold">Lesson:</span> {caseStudy.lessonForSphere}</p>
                  </div>
                )}

                {/* How to Discuss */}
                {caseStudy.howToDiscuss && (
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3">
                    <p className="text-purple-300 text-sm"><span className="font-semibold">💬 How to Discuss:</span> {caseStudy.howToDiscuss}</p>
                  </div>
                )}

                {/* Sphere Contrast (Binance/BitMEX style) */}
                {caseStudy.sphereContrast && (
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
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
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 mt-4">
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
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mt-4">
          <p className="text-purple-300 text-sm">{data.governance}</p>
        </div>
      )}

      {data.howToDiscuss && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 mt-4">
          <p className="text-emerald-300 text-xs font-semibold mb-1">💬 How to Discuss:</p>
          <p className="text-gray-300 text-sm">{data.howToDiscuss}</p>
        </div>
      )}
    </div>
  );
}

function BoardOversightBlock({ data }: { data: any }) {
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
                <div>
                  <p className="text-blue-300 text-xs font-semibold mb-1">Risk Responsibilities:</p>
                  <ul className="text-gray-300 text-xs space-y-1">
                    {body.riskRole.map((role: string, j: number) => (
                      <li key={j}>• {role}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
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
            <div key={i} className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                {cert.icon && <span className="text-2xl">{cert.icon}</span>}
                <h4 className="text-emerald-300 font-semibold">{cert.cert}</h4>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300"><span className="text-gray-500">What it is:</span> {cert.whatItIs}</p>
                <p className="text-gray-300"><span className="text-gray-500">Why it matters:</span> {cert.whyItMatters}</p>
                <p className="text-emerald-300"><span className="text-gray-500">Sphere status:</span> {cert.sphereStatus}</p>
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

// =============================================================================
// NEW PILLAR 5.8 - TECHNICAL FAQ COMPONENTS
// =============================================================================

function DangerousStatementsBlock({ data }: { data: any }) {
  const [expandedStatement, setExpandedStatement] = useState<number | null>(null);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">⚠️ {data.title}</h3>

      <div className="space-y-3">
        {data.statements?.map((stmt: any, i: number) => (
          <div key={i} className="bg-red-500/5 border border-red-500/20 rounded-lg overflow-hidden">
            <div
              className="p-4 cursor-pointer hover:bg-red-500/10"
              onClick={() => setExpandedStatement(expandedStatement === i ? null : i)}
            >
              <div className="flex items-center justify-between">
                <p className="text-red-300 font-medium">❌ {stmt.dangerous}</p>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedStatement === i ? 'rotate-180' : ''}`} />
              </div>
            </div>

            {expandedStatement === i && (
              <div className="px-4 pb-4 space-y-3 border-t border-red-500/20 pt-3">
                <div className="bg-amber-500/10 rounded p-3">
                  <p className="text-amber-300 text-xs font-semibold mb-1">Why It's Dangerous:</p>
                  <p className="text-gray-300 text-sm">{stmt.whyDangerous}</p>
                </div>

                <div className="bg-blue-500/10 rounded p-3">
                  <p className="text-blue-300 text-xs font-semibold mb-1">Reality:</p>
                  <p className="text-gray-300 text-sm">{stmt.reality}</p>
                </div>

                <div className="bg-emerald-500/10 rounded p-3">
                  <p className="text-emerald-300 text-xs font-semibold mb-1">✅ Say Instead:</p>
                  <p className="text-gray-300 text-sm">{stmt.correction}</p>
                </div>

                {stmt.followUp && (
                  <div className="bg-purple-500/10 rounded p-3">
                    <p className="text-purple-300 text-xs font-semibold mb-1">If They Push:</p>
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
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">🛡️ {data.title}</h3>

      <div className="space-y-4">
        {data.objections?.map((obj: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <p className="text-amber-300 font-medium">"{obj.objection}"</p>
              {obj.context && <span className="text-gray-500 text-xs">{obj.context}</span>}
            </div>

            <div className="bg-emerald-500/10 rounded p-3 mb-2">
              <p className="text-emerald-300 text-xs font-semibold mb-1">Response:</p>
              <p className="text-gray-300 text-sm">{obj.response}</p>
            </div>

            {obj.evidence && (
              <div className="bg-blue-500/10 rounded p-2">
                <p className="text-blue-300 text-xs"><span className="font-semibold">Evidence:</span> {obj.evidence}</p>
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
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-white mb-4 text-xl">🔗 {data.title}</h3>

      <div className="space-y-4">
        {data.patterns?.map((pattern: any, i: number) => (
          <div key={i} className="bg-slate-700/50 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-white font-semibold">{pattern.pattern}</h4>
              {pattern.typicalTimeline && (
                <span className="text-gray-500 text-xs bg-slate-600 px-2 py-0.5 rounded">{pattern.typicalTimeline}</span>
              )}
            </div>
            <p className="text-gray-300 text-sm mb-3">{pattern.description}</p>

            {pattern.useCases && (
              <div className="mb-2">
                <p className="text-blue-300 text-xs font-semibold mb-1">Use Cases:</p>
                <div className="flex flex-wrap gap-1">
                  {pattern.useCases.map((uc: string, j: number) => (
                    <span key={j} className="text-gray-300 text-xs bg-blue-500/20 px-2 py-0.5 rounded">{uc}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 mt-3">
              {pattern.advantages && (
                <div className="bg-emerald-500/10 rounded p-2">
                  <p className="text-emerald-300 text-xs font-semibold mb-1">Advantages:</p>
                  <ul className="text-gray-300 text-xs space-y-1">
                    {pattern.advantages.map((a: string, j: number) => (
                      <li key={j}>• {a}</li>
                    ))}
                  </ul>
                </div>
              )}
              {pattern.requirements && (
                <div className="bg-amber-500/10 rounded p-2">
                  <p className="text-amber-300 text-xs font-semibold mb-1">Requirements:</p>
                  <ul className="text-gray-300 text-xs space-y-1">
                    {pattern.requirements.map((r: string, j: number) => (
                      <li key={j}>• {r}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
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
