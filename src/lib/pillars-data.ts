// ============================================================================
// PILLAR DATA - Content from actual training documents
// ============================================================================

export const pillarsData = [
  // ========== PILLAR 1: PAYMENTS & SETTLEMENT ==========
  {
    id: 'pillar1',
    title: 'Pillar 1: Payments & Settlement Fundamentals',
    shortTitle: 'Payments',
    color: 'blue',
    overview: `**Why This Pillar Matters**

If this pillar is missing, Sphere won't make sense.

Sphere does not "move messages faster." It restructures liquidity, settlement coordination, and compliance. If someone doesn't understand traditional payments infrastructure, they will misclassify Sphere immediately.

This pillar ensures you can explain:

• Why cross-border payments are structurally hard (not just "old technology")

• The difference between messages and money

• What settlement finality actually means (legally, not technically)

• Where Sphere fits in the existing infrastructure`,
    sections: [
      {
        id: 'p1s1',
        title: 'Section 1: The Payment Lifecycle',
        curriculum: {
          objectives: [
            'Precisely explain what happens at each stage of a payment',
            'Identify where risk exists at each stage',
            'Answer: "Has money actually moved?" with confidence'
          ],
          keyConcepts: [
            'Three stages: Initiation → Clearing → Settlement',
            'Risk accumulates until settlement occurs',
            'A payment can be initiated and cleared WITHOUT being settled'
          ]
        },
        learn: `## The Payment Lifecycle

**Core Question: "Has money actually moved?"**

### Three Stages of Every Payment

<table class="w-full border-collapse my-4">
<tr class="bg-slate-700"><th class="border border-slate-600 px-3 py-2 text-left text-white">Stage</th><th class="border border-slate-600 px-3 py-2 text-left text-white">What Happens</th><th class="border border-slate-600 px-3 py-2 text-left text-white">Risk Status</th></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-blue-400 font-semibold">INITIATION</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Customer instructs bank to pay</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Reversible. Customer bears risk.</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-amber-400 font-semibold">CLEARING</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Banks agree on obligations</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Possibly reversible. Sending bank bears risk.</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-emerald-400 font-semibold">SETTLEMENT</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Final transfer on settlement system</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Irrevocable. Risk eliminated.</td></tr>
</table>

### Key Insight

A payment can be initiated and cleared WITHOUT being settled. Risk accumulates until settlement occurs.

### Why This Matters for Sphere

SpherePay's value is in the settlement layer — not faster messaging. When you understand the three stages, you can explain why Sphere reduces trapped capital and settlement risk.`,
        exercise: {
          title: 'Exercise 1.1 — Timeline Mapping',
          prompt: `Draw a payment timeline with three sections (Initiation → Clearing → Settlement). For each section, answer:

1. Who controls the process?
2. Is the payment reversible?
3. Who bears risk?
4. What systems are involved?`,
          criteria: ['Identifies all three stages correctly', 'Correctly assigns risk at each stage', 'Explains reversibility accurately', 'Names relevant systems']
        },
        quiz: [
          { q: "At which stage is risk eliminated?", options: ["Initiation", "Clearing", "Settlement", "All stages carry equal risk"], correct: 2 },
          { q: "Can a payment be cleared but not settled?", options: ["No, they are the same thing", "Yes, risk remains until settlement", "Only for international payments", "Only for amounts over $1M"], correct: 1 },
          { q: "Who bears risk during the clearing stage?", options: ["The customer", "The sending bank", "The receiving bank", "No one — clearing is risk-free"], correct: 1 }
        ]
      },
      {
        id: 'p1s2',
        title: 'Section 2: Messages ≠ Money',
        curriculum: {
          objectives: [
            'Understand why messaging systems do not move value',
            'Explain why confusing them causes operational and regulatory failures',
            'Never say "the payment went through" when you mean "the message was delivered"'
          ],
          keyConcepts: [
            'SWIFT sends messages; Fedwire settles money',
            'Key phrase: "Messages create obligations; settlement discharges them."',
            'A SWIFT ACK only confirms message delivery, NOT settlement'
          ]
        },
        learn: `## Messages ≠ Money

**The most common confusion in payments. Master this.**

### SWIFT vs Fedwire

<table class="w-full border-collapse my-4">
<tr class="bg-slate-700"><th class="border border-slate-600 px-3 py-2 text-left text-white">Aspect</th><th class="border border-slate-600 px-3 py-2 text-left text-white">SWIFT</th><th class="border border-slate-600 px-3 py-2 text-left text-white">Fedwire</th></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium">What it does</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Sends messages</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Settles payments</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium">What moves</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Information</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Money</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium">Finality</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-red-400">None</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-emerald-400">Final and irrevocable</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium">Operator</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Cooperative (banks)</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Federal Reserve</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium">Geographic scope</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Global</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">U.S. dollar only</td></tr>
</table>

### The Dangerous Statement

> ❌ "I got the SWIFT ACK, so we're good."

**What they actually know:** Message was delivered

**What they don't know:** Settlement status

**What could still go wrong:** Compliance holds, funding issues, beneficiary details incorrect

### Key Phrase

> "Messages create obligations; settlement discharges them."

When someone says a payment "went through," always clarify: Do they mean the message was sent, or the money actually settled?`,
        exercise: {
          title: 'Exercise 1.2 — Dangerous Statement Analysis',
          prompt: `Your colleague says: "I got the SWIFT ACK, so we're good."

Write a response explaining:
1. What they actually know (message delivered)
2. What they don't know (settlement status)
3. What could still go wrong (compliance holds, funding, beneficiary details)
4. What they should verify next`,
          criteria: ['Distinguishes messaging from settlement', 'Notes ACK only confirms delivery', 'Lists potential failure points', 'Suggests verification steps']
        },
        quiz: [
          { q: "Does SWIFT move money?", options: ["Yes, instantly", "Yes, within 24 hours", "No, only messages", "Only for MT103 messages"], correct: 2 },
          { q: "What does a SWIFT ACK confirm?", options: ["Money has arrived", "Payment is complete", "Message was accepted by network", "Beneficiary received funds"], correct: 2 },
          { q: "Which system provides settlement finality for USD?", options: ["SWIFT", "CHIPS", "Fedwire", "All of the above"], correct: 2 }
        ]
      },
      {
        id: 'p1s3',
        title: 'Section 3: Settlement Finality',
        curriculum: {
          objectives: [
            'Define settlement finality legally and operationally',
            'Explain why finality is LEGAL, not technical',
            'Articulate why blockchain "confirmations" ≠ legal finality'
          ],
          keyConcepts: [
            'Settlement finality = unconditional, irrevocable, enforceable',
            'Courts don\'t care about hash functions',
            'Fedwire: immediate finality | Crypto: no legal finality'
          ]
        },
        learn: `## Settlement Finality

**Finality is LEGAL, not technical. Courts don't care about hash functions.**

### What Finality Means

Settlement finality = the legal concept that at a defined moment, a transfer becomes:

- **Unconditional**: Not dependent on future events
- **Irrevocable**: Cannot be unwound
- **Enforceable**: Backed by law

### Finality by System

<table class="w-full border-collapse my-4">
<tr class="bg-slate-700"><th class="border border-slate-600 px-3 py-2 text-left text-white">System</th><th class="border border-slate-600 px-3 py-2 text-left text-white">When Finality Occurs</th><th class="border border-slate-600 px-3 py-2 text-left text-white">Strength</th></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium">Fedwire (RTGS)</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Immediately</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-emerald-400 font-semibold">Very Strong</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium">CHIPS</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">When released</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-emerald-400">Strong</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium">ACH</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">After settlement window</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-amber-400">Provisional</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium">Card Networks</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Days later</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-red-400">Weak (chargebacks)</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium">Cryptocurrency</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Probabilistic only</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-red-400">No legal finality</td></tr>
</table>

### Critical Insight

A blockchain confirmation or database entry does NOT create finality — only law does. A Bitcoin transaction with 6 confirmations has NO legal finality comparable to Fedwire.

This is why SphereNet is designed to work WITH existing legal frameworks, not replace them.`,
        exercise: {
          title: 'Exercise 1.3 — Dual Definition',
          prompt: `Write two definitions of settlement finality:
1. For a regulator (focus on legal protection, systemic risk)
2. For an ops analyst (focus on practical implications)

Then explain why a Bitcoin transaction with 6 confirmations doesn't have the same finality as a Fedwire payment.`,
          criteria: ['Provides legal/regulatory definition', 'Provides operational definition', 'Explains Bitcoin lacks legal backing', 'Distinguishes technical vs legal finality']
        },
        quiz: [
          { q: "What makes settlement 'final'?", options: ["Technical confirmation", "Legal framework", "Number of confirmations", "Time elapsed"], correct: 1 },
          { q: "Does a Bitcoin transaction have legal finality?", options: ["Yes, after 6 confirmations", "Yes, after 1 hour", "No, only probabilistic finality", "Yes, same as Fedwire"], correct: 2 },
          { q: "Which has the weakest finality?", options: ["Fedwire", "CHIPS", "ACH", "Card Networks"], correct: 3 }
        ]
      },
      {
        id: 'p1s4',
        title: 'Section 4: Who Settles Money — Central Banks',
        curriculum: {
          objectives: [
            'Explain the role of central banks in payment systems',
            'Understand why CHIPS ultimately settles through Fedwire',
            'Articulate why private systems cannot replace central bank infrastructure'
          ],
          keyConcepts: [
            'Central banks provide: settlement asset, payment systems, liquidity, oversight',
            'All roads lead to the central bank ledger',
            'SphereNet works WITH existing infrastructure, not against it'
          ]
        },
        learn: `## Who Settles Money — Central Banks

**All roads lead to the central bank ledger.**

### What Central Banks Provide

1. **The Settlement Asset**: No credit risk (can't go bankrupt in own currency)
2. **Operating Payment Systems**: Fedwire, TARGET2, CHAPS, etc.
3. **Liquidity Provision**: Intraday credit, lender of last resort
4. **Oversight and Regulation**: Standards, monitoring, enforcement

### Even Private Systems Use Central Banks

CHIPS (Clearing House Interbank Payments System) is a private system, but it settles final positions through Fedwire. The central bank remains the foundation.

### Why This Matters for Sphere

- SphereNet is NOT trying to replace central banks
- SpherePay works WITH existing settlement infrastructure
- Regulators will ask: "How does this interact with our central bank?"

> When a fintech claims to "eliminate the need for central banks," they fundamentally misunderstand payments. Central banks provide the settlement asset and legal framework that private systems cannot replicate.`,
        exercise: {
          title: 'Exercise 1.4 — Fintech Claim Analysis',
          prompt: `A fintech startup claims their new payment system "eliminates the need for central banks."

Write a detailed response explaining why this claim is fundamentally flawed, addressing:
- Settlement asset requirements
- Legal finality
- Crisis scenarios
- Regulatory backing`,
          criteria: ['Addresses settlement asset requirements', 'Explains legal finality needs', 'Mentions lender of last resort/crisis role', 'Notes regulatory backing']
        },
        quiz: [
          { q: "What do central banks provide that private systems cannot?", options: ["Faster processing", "Lower fees", "Risk-free settlement asset", "Better technology"], correct: 2 },
          { q: "Where does CHIPS ultimately settle?", options: ["On its own ledger", "Through Fedwire", "At correspondent banks", "On blockchain"], correct: 1 },
          { q: "Can a central bank go bankrupt in its own currency?", options: ["Yes, like any institution", "Only during hyperinflation", "No, it creates the currency", "Only if reserves run out"], correct: 2 }
        ]
      },
      {
        id: 'p1s5',
        title: 'Section 5: Why Cross-Border Is Hard',
        curriculum: {
          objectives: [
            'Explain BIS/CPMI identified frictions',
            'Understand why technology alone cannot fix cross-border',
            'Articulate FSB targets and G20 roadmap'
          ],
          keyConcepts: [
            'Cross-border is hard because of laws/regulations/institutions — NOT old technology',
            'Technology does not remove jurisdiction',
            'FSB 2027 targets: ≤1% cost, 1-hour wholesale speed'
          ]
        },
        learn: `## Why Cross-Border Is Hard

**Cross-border is hard because of laws, regulations, and institutions — NOT old technology.**

### The Correspondent Banking Model

Banks don't have direct relationships with every other bank globally. Instead, they use correspondent banks — intermediaries that hold nostro/vostro accounts.

- **Nostro**: "Our account at your bank" (asset)
- **Vostro**: "Your account at our bank" (liability)

### BIS/CPMI Identified Frictions

<table class="w-full border-collapse my-4">
<tr class="bg-slate-700"><th class="border border-slate-600 px-3 py-2 text-left text-white">Friction</th><th class="border border-slate-600 px-3 py-2 text-left text-white">Impact</th></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium">Fragmented data standards</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Manual reconciliation, errors, delays</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium">Complex compliance</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Each jurisdiction has different rules</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium">Limited operating hours</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Not 24/7 — timezone mismatches</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium">Funding requirements</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Prefunding nostro accounts ties up capital</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium">Long transaction chains</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Multiple intermediaries = more failure points</td></tr>
</table>

### FSB Cross-Border Targets (by 2027)

- **Cost**: ≤1% for remittances; ≤3% for other payments
- **Speed**: Wholesale: 1 hour; Retail: 1 day
- **Access**: All adults have access to cross-border payments
- **Transparency**: Full visibility on costs and timing upfront

> Technology does not remove jurisdiction. New rails still need to comply with every country's laws.`,
        exercise: {
          title: 'Exercise 1.5 — Corridor Mapping',
          prompt: `Map a USD → SGD payment from Dallas to Singapore. Mark:
1. Where FX conversion happens
2. Where each compliance check occurs
3. Where liquidity must be pre-positioned
4. Potential delay/failure points`,
          criteria: ['Identifies FX conversion point', 'Lists compliance checkpoints', 'Shows prefunding requirements', 'Identifies failure points']
        },
        quiz: [
          { q: "Why is cross-border payment hard?", options: ["Old technology", "Laws, regulations, institutions", "Slow internet", "Bank unwillingness"], correct: 1 },
          { q: "What is a nostro account?", options: ["Your account at our bank", "Our account at your bank", "A clearing account", "A settlement account"], correct: 1 },
          { q: "What is the FSB 2027 target for wholesale payment speed?", options: ["Instant", "1 hour", "Same day", "1 week"], correct: 1 }
        ]
      },
      {
        id: 'p1s6',
        title: 'Section 6: Where Failures Happen',
        curriculum: {
          objectives: [
            'Identify where most payment failures occur',
            'Understand the coordination-settlement gap',
            'Explain Herstatt risk'
          ],
          keyConcepts: [
            'Most failures happen BETWEEN systems, not inside them',
            'Herstatt risk: one party performs while other fails',
            'Sphere\'s value is precisely in this gap'
          ]
        },
        learn: `## Where Failures Happen

**Most failures happen BETWEEN systems, not inside them.**

### Common Failure Points

- Compliance holds at correspondent banks
- Nostro account funding gaps
- FX settlement timing mismatches
- Data truncation between systems
- Beneficiary details incorrect or incomplete

### Herstatt Risk

**Definition**: The risk that one party performs (sends currency A) while the other party fails to perform (doesn't send currency B).

**Named after**: Bankhaus Herstatt's 1974 failure. German bank received DEM payments but failed before sending USD, causing cascading losses.

**Solution**: CLS (Continuous Linked Settlement) — payment vs payment mechanism that eliminates Herstatt risk for major currencies.

### Why This Matters for Sphere

Sphere's value proposition is precisely in this gap:
- SpherePay reduces trapped capital and prefunding requirements
- SphereNet enables atomic, coordinated settlement
- Compliance-native design reduces holds and delays`,
        exercise: {
          title: 'Exercise 1.6 — Failure Point Mapping',
          prompt: `Map a USD → EUR payment. Identify:
1. Every handoff point between systems
2. Where failures are most likely
3. Who bears risk at each point
4. How Sphere would change this`,
          criteria: ['Identifies system handoffs', 'Locates likely failure points', 'Assigns risk correctly', 'Explains Sphere value proposition']
        },
        quiz: [
          { q: "Where do most payment failures occur?", options: ["Inside bank systems", "Between systems", "At central banks", "At SWIFT"], correct: 1 },
          { q: "What is Herstatt risk?", options: ["Bank insolvency risk", "FX settlement timing mismatch", "Interest rate risk", "Compliance risk"], correct: 1 },
          { q: "What solves Herstatt risk for major currencies?", options: ["SWIFT", "Fedwire", "CLS", "CHIPS"], correct: 2 }
        ]
      }
    ],
    masterQuiz: {
      title: 'Pillar 1 Mastery Assessment',
      description: 'Demonstrate your understanding of payment fundamentals through this scenario-based assessment.',
      scenario: `**Scenario: Cross-Border Payment Investigation**

You are a Sphere representative meeting with the UAE Central Bank's payments oversight team. They present you with the following situation:

A UAE-based company sent a $5M payment to a supplier in Singapore on Monday at 9am UAE time. The company received a SWIFT MT103 confirmation within 30 minutes. By Wednesday, the Singapore supplier still hasn't received the funds and is threatening to cancel the contract.

The UAE company is demanding answers and considering legal action against their bank.`,
      questions: [
        {
          type: 'analysis',
          question: 'Explain why receiving a SWIFT MT103 confirmation does NOT mean the payment has settled. What has actually happened vs. what the company assumes?',
          rubric: ['Distinguishes messaging from settlement', 'Explains SWIFT only sends instructions', 'Notes settlement happens on local rails', 'Identifies the company\'s misconception']
        },
        {
          type: 'multiple_choice',
          question: 'At which stage is this payment most likely stuck?',
          options: ['Initiation - the payment was never sent', 'Clearing - banks are still reconciling obligations', 'Settlement - waiting for final transfer on RTGS', 'Complete - the supplier is mistaken'],
          correct: 1,
          explanation: 'The SWIFT confirmation indicates initiation succeeded. The payment is likely in clearing, where correspondent banks are reconciling or compliance holds may exist.'
        },
        {
          type: 'analysis',
          question: 'List at least 4 specific failure points from Pillar 1 that could explain this cross-border payment delay.',
          rubric: ['Compliance holds at correspondent bank', 'Nostro account funding issues', 'Timezone/operating hours mismatch', 'Beneficiary details verification', 'Intermediary bank delays', 'Sanctions screening']
        },
        {
          type: 'multiple_choice',
          question: 'If the payment fails after clearing but before settlement, who bears the risk?',
          options: ['The UAE company (sender)', 'The sending bank', 'The correspondent bank', 'The Singapore supplier'],
          correct: 1,
          explanation: 'During clearing, the sending bank bears the risk. Risk only transfers after final settlement occurs.'
        },
        {
          type: 'application',
          question: 'Explain to the Central Bank team how SpherePay would have prevented this situation. Reference settlement finality, trapped capital, and real-time settlement.',
          rubric: ['Mentions real-time or near-real-time settlement', 'Explains elimination of nostro prefunding', 'References settlement finality timing', 'Contrasts with correspondent banking model', 'Avoids crypto jargon']
        }
      ],
      passingScore: 70
    }
  },

// END PART 1

  // ========== PILLAR 2: STABLECOINS ==========
  {
    id: 'pillar2',
    title: 'Pillar 2: Stablecoins as Financial Infrastructure',
    shortTitle: 'Stablecoins',
    color: 'emerald',
    overview: `**Why This Pillar Matters**

Not crypto ideology. Understand stablecoins as wholesale settlement instruments.

Sphere uses stablecoins as plumbing, not ideology — and regulators judge it accordingly. You must be able to discuss stablecoins without crypto language.

This pillar ensures you can explain:

• What stablecoins actually are (reserve composition, redemption mechanics)

• Risk dynamics (redemption risk, depeg scenarios, rehypothecation)

• Why issuer safety ≠ system safety

• Macro-financial implications at scale`,
    sections: [
      {
        id: 'p2s1',
        title: 'Section 1: What Stablecoins Actually Are',
        curriculum: {
          objectives: [
            'Define stablecoins as wholesale settlement instruments',
            'Understand reserve composition (T-bills, cash, repo)',
            'Explain the difference from retail crypto'
          ],
          keyConcepts: [
            'Stablecoins = cryptocurrency pegged to reference asset (usually USD)',
            'Major issuers: Tether (~$127B), Circle (~$45B), PayPal',
            'Reserve composition: 65% T-bills (Tether), 44% T-bills (Circle)',
            'Market scale: ~$305B today → $1.9-4.0T by 2030 (Citi estimate)'
          ]
        },
        learn: `## What Stablecoins Actually Are

**Not crypto ideology — wholesale settlement instruments.**

### Definition

A **stablecoin** is a type of cryptocurrency designed to maintain stable value by pegging to a reference asset, typically the US dollar.

### Key Characteristics

- **Pegged Value**: Designed to maintain 1:1 exchange rate (e.g., 1 USDC = $1 USD)
- **Reserve-Backed**: Collateralized by real assets held by the issuer
- **Redeemable**: Holders can (theoretically) redeem for underlying assets
- **Programmable**: Can be integrated into smart contracts and automated systems

### Major Stablecoins

<table class="w-full border-collapse my-4">
<tr class="bg-slate-700"><th class="border border-slate-600 px-3 py-2 text-left text-white">Stablecoin</th><th class="border border-slate-600 px-3 py-2 text-left text-white">Issuer</th><th class="border border-slate-600 px-3 py-2 text-left text-white">Market Cap</th><th class="border border-slate-600 px-3 py-2 text-left text-white">Primary Use</th></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium">USDT (Tether)</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Tether Limited</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-emerald-400">~$127B</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Trading, emerging markets</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium">USDC (Circle)</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Circle</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-emerald-400">~$45B</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Institutional, regulated</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium">PYUSD (PayPal)</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">PayPal/Paxos</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-emerald-400">~$1B</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Consumer payments</td></tr>
</table>

### Reserve Composition

- **Tether**: ~65% U.S. Treasury Bills (~$127B in Treasuries)
- **Circle**: ~44% U.S. Treasury Bills, remainder in cash/equivalents

> **Market Scale**: ~$305B today → $1.9-4.0T projected by 2030 (Citi estimate)`,
        exercise: {
          title: 'Exercise 2.1 — Non-Crypto Explanation',
          prompt: `Explain stablecoins to a traditional finance CFO without using:
- "Blockchain"
- "Crypto"
- "DeFi"
- "On-chain"
- "Permissionless"

Focus on: settlement speed, capital efficiency, programmability`,
          criteria: ['Avoids prohibited terms', 'Explains value proposition clearly', 'Focuses on business benefits', 'Appropriate for CFO audience']
        },
        quiz: [
          { q: "What backs major stablecoins?", options: ["Nothing (algorithmic)", "Bitcoin", "U.S. Treasury Bills and cash", "Gold"], correct: 2 },
          { q: "What % of Tether reserves are in T-bills?", options: ["~25%", "~45%", "~65%", "~95%"], correct: 2 },
          { q: "What is the projected 2030 stablecoin market size?", options: ["$500B", "$1-2T", "$2-4T", "$10T+"], correct: 2 }
        ]
      },
      {
        id: 'p2s2',
        title: 'Section 2: Stablecoin Risk Dynamics',
        curriculum: {
          objectives: [
            'Explain redemption risk and run dynamics',
            'Understand T-bill market impact of large redemptions',
            'Analyze the USDC depeg case study'
          ],
          keyConcepts: [
            'Instant claims on potentially illiquid reserves',
            'No circuit breakers on-chain',
            'USDC depeg to $0.87 was confidence shock, not insolvency'
          ]
        },
        learn: `## Stablecoin Risk Dynamics

**Critical Principle: Stablecoins are not risk-free.**

### Redemption Risk

Stablecoins promise instant redemption, but reserves may not be immediately liquid. If many holders redeem simultaneously:

1. Issuer must sell reserve assets (potentially at a loss)
2. Fire sales can depress T-bill prices
3. Contagion spreads to other holders and markets

### BIS Research on Market Impact

- A 2-standard-deviation stablecoin inflow lowers T-bill yields by 2-2.5 bps
- Outflows raise yields by 6-7.5 bps (asymmetric impact)
- A 10% redemption event (~$20B) could force $10-12B in T-bill sales
- Potential yield shock of +20-40 basis points in thin liquidity

### Case Study: USDC Depeg (March 2023)

**Background**: USDC held exposure to Silicon Valley Bank. When SVB entered receivership, uncertainty arose about access to reserves.

**What Happened**:
1. SVB news breaks → uncertainty about USDC reserves
2. Market participants prioritize liquidity certainty
3. Accelerated redemptions and secondary market selling
4. USDC trades at ~$0.87 (13% below peg)
5. ~$4.5 billion value gap created within hours

> ⚠️ **Critical Lesson**: USDC was NOT undercollateralized. The depeg occurred due to confidence shock and liquidity stress, not insolvency.`,
        exercise: {
          title: 'Exercise 2.2 — Stress Scenario Analysis',
          prompt: `A 10% stablecoin redemption event (~$20B) occurs. Walk through:
1. Immediate reserve impact
2. T-bill market implications
3. Contagion pathways
4. Why traditional circuit breakers don't exist on-chain`,
          criteria: ['Explains reserve liquidation mechanics', 'Describes T-bill market impact', 'Identifies contagion pathways', 'Notes absence of circuit breakers']
        },
        quiz: [
          { q: "What caused the March 2023 USDC depeg?", options: ["Undercollateralization", "Confidence shock from SVB exposure", "Fraud", "Regulatory action"], correct: 1 },
          { q: "How low did USDC trade during the depeg?", options: ["$0.99", "$0.95", "$0.87", "$0.50"], correct: 2 },
          { q: "Do on-chain systems have circuit breakers?", options: ["Yes, automatic", "Yes, manual", "No", "Only for large transactions"], correct: 2 }
        ]
      },
      {
        id: 'p2s3',
        title: 'Section 3: Issuer Safety ≠ System Safety',
        curriculum: {
          objectives: [
            'Understand how regulated stablecoins create unregulated leverage',
            'Explain the rehypothecation problem in DeFi',
            'Articulate regulatory blind spots'
          ],
          keyConcepts: [
            'A well-regulated stablecoin can still become systemically risky',
            'DeFi enables infinite rehypothecation outside regulatory perimeter',
            'MakerDAO: ~50-65% USDC exposure at peak'
          ]
        },
        learn: `## Issuer Safety ≠ System Safety

**Core Principle: A well-regulated stablecoin can still become systemically risky if reused in unregulated protocols.**

### The Rehypothecation Problem

In traditional finance, rehypothecation is constrained by Basel III (minimum 3% leverage ratio). In DeFi, these constraints don't exist.

**How It Works**:
1. Regulated stablecoin (USDC) is issued with proper controls
2. User deposits USDC into DeFi protocol (e.g., MakerDAO)
3. Protocol creates NEW stablecoin (DAI) backed by USDC
4. DAI can be deposited elsewhere as collateral
5. Process repeats — "infinite rehypothecation"

### Case Study: MakerDAO and DAI

<table class="w-full border-collapse my-4">
<tr class="bg-slate-700"><th class="border border-slate-600 px-3 py-2 text-left text-white">Metric</th><th class="border border-slate-600 px-3 py-2 text-left text-white">Value</th></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium">USDC as direct DAI collateral (peak)</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-amber-400 font-semibold">~50%</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium">USDC total exposure (including indirect)</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-red-400 font-semibold">~65%</td></tr>
</table>

**Implication**: A regulated stablecoin (USDC) materially supports a protocol-governed stablecoin (DAI), creating leverage outside the original issuer's regulatory framework.

### Regulatory Blind Spots

<table class="w-full border-collapse my-4">
<tr class="bg-slate-700"><th class="border border-slate-600 px-3 py-2 text-left text-white">Traditional Finance</th><th class="border border-slate-600 px-3 py-2 text-left text-white">On-Chain Reality</th></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800">~9 months documentation for new instruments</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-red-400">Wrappers created instantly</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800">Basel III 3% minimum leverage ratio</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-red-400">No structural limits</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800">Regulatory approval for new products</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-red-400">Systemic risk grows without approval</td></tr>
</table>`,
        exercise: {
          title: 'Exercise 2.3 — Regulatory Gap Explanation',
          prompt: `Explain to a UAE regulator how a well-regulated stablecoin (USDC) can create systemic risk through DeFi protocols, even though Circle itself is fully compliant.

Address:
- The rehypothecation mechanism
- Why traditional leverage limits don't apply
- The regulatory visibility gap`,
          criteria: ['Explains rehypothecation clearly', 'Shows leverage accumulation', 'Notes regulatory gap', 'Appropriate for regulator audience']
        },
        quiz: [
          { q: "What % of DAI was backed by USDC at peak?", options: ["~25%", "~50%", "~65%", "~90%"], correct: 2 },
          { q: "What limits leverage in traditional finance?", options: ["Technology", "Basel III requirements", "Bank choice", "No limits exist"], correct: 1 },
          { q: "Can a compliant stablecoin create systemic risk?", options: ["No, compliance prevents this", "Yes, through DeFi rehypothecation", "Only if the issuer fails", "Only in emerging markets"], correct: 1 }
        ]
      },
      {
        id: 'p2s4',
        title: 'Section 4: Speed Asymmetry',
        curriculum: {
          objectives: [
            'Understand the capital vs policy speed mismatch',
            'Explain why analytics-based enforcement is insufficient',
            'Articulate Sphere\'s preventative approach'
          ],
          keyConcepts: [
            'On-chain capital moves in minutes; enforcement takes days/weeks',
            'Chainalysis attribution lag: initial vs revised estimates nearly 2x',
            'SphereNet: preventative controls before execution'
          ]
        },
        learn: `## Speed Asymmetry — Capital vs Policy

**Core Problem: On-chain capital moves faster than regulatory enforcement can respond.**

### The Timing Mismatch

<table class="w-full border-collapse my-4">
<tr class="bg-slate-700"><th class="border border-slate-600 px-3 py-2 text-left text-white">Activity</th><th class="border border-slate-600 px-3 py-2 text-left text-white">Timeline</th></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium">On-chain transaction settlement</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-emerald-400 font-semibold">Minutes</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium">Blockchain analytics detection</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-amber-400">Hours to days</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium">Enforcement action (freeze, investigation)</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-red-400">Days to weeks</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium">Legal resolution</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-red-400">Months to years</td></tr>
</table>

> ⚠️ By the time enforcement can act, assets have already moved through multiple wallets, protocols, and potentially off-ramps.

### Evidence: Chainalysis Attribution Lag

Chainalysis 2023 illicit volume report:
- **Initial estimate**: $24.2 billion
- **Revised estimate (12 months later)**: $46.1 billion
- Nearly 2x increase as delayed attribution caught up

**Implication**: Analytics-based enforcement improves post-event visibility but does not provide real-time control.

### Sphere's Innovation: Preventative Controls

<table class="w-full border-collapse my-4">
<tr class="bg-slate-700"><th class="border border-slate-600 px-3 py-2 text-left text-white">Traditional Blockchain</th><th class="border border-slate-600 px-3 py-2 text-left text-white">SphereNet</th></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800">Transaction → Settlement → Review</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-emerald-400">Privacy proof → Jurisdiction gate → Policy check → Execution</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-red-400">Risk discovered after settlement</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-emerald-400">Risk prevented before settlement</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800">Compliance: reactive</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-emerald-400">Compliance: preventative</td></tr>
</table>`,
        exercise: {
          title: 'Exercise 2.4 — Timeline Comparison',
          prompt: `Create a side-by-side timeline comparing:
1. Traditional blockchain flow: Transaction → Settlement → Review → Enforcement
2. SphereNet flow: Privacy proof → Jurisdiction gate → Policy check → Execution

Explain why the difference matters for regulators and institutional adoption.`,
          criteria: ['Shows both timelines clearly', 'Highlights timing difference', 'Explains preventative vs reactive', 'Notes regulatory implications']
        },
        quiz: [
          { q: "How long does on-chain settlement take?", options: ["Days", "Hours", "Minutes", "Weeks"], correct: 2 },
          { q: "What was the Chainalysis attribution lag?", options: ["10% revision", "50% revision", "Nearly 2x revision", "No revision needed"], correct: 2 },
          { q: "What is Sphere's approach to compliance?", options: ["Reactive monitoring", "Preventative controls", "No compliance needed", "Third-party delegation"], correct: 1 }
        ]
      },
      {
        id: 'p2s5',
        title: 'Section 5: Macro-Financial Implications',
        curriculum: {
          objectives: [
            'Understand stablecoin impact on sovereign debt markets',
            'Explain banking disintermediation risks',
            'Articulate UAE-specific concerns (AED peg, capital flight)'
          ],
          keyConcepts: [
            'Tether holds ~$127B in U.S. Treasuries — one of largest holders',
            'Banking disintermediation: deposits flow to non-bank channels',
            'UAE concerns: AED peg pressure, capital flight risk'
          ]
        },
        learn: `## Macro-Financial Implications

**As stablecoins reach systemic scale, effects extend beyond crypto into sovereign debt, banking, and monetary policy.**

### Impact on Sovereign Debt Markets

- Tether holds ~$127B in U.S. Treasuries
- Makes Tether one of largest non-government holders of short-term U.S. debt
- Stablecoin growth = increased demand for T-bills
- Stablecoin redemptions = forced T-bill sales

**Safe-Asset Absorption**: As issuers absorb large volumes of short-term Treasuries, global supply of safe assets tightens.

### Banking System Disintermediation

**First-Order Effects**:
- Deposit outflows from domestic banks into stablecoins
- Reduced lending capacity to households and businesses
- On-chain channels bypass traditional intermediaries

**Second-Order Effects**:
- Structural contraction of bank-based credit intermediation
- Growth of risk outside prudential regulatory perimeter
- Weakening of monetary transmission mechanisms

### UAE-Specific Concerns

**Currency Peg Pressure**:
- AED peg sensitivity to external capital flows
- Increased drawdown of foreign exchange reserves
- Erosion of confidence in exchange rate regime durability

**Capital Flight Risk**:
- Accelerated cross-border movement through low-friction digital channels
- Sudden domestic liquidity stress as confidence-driven exits synchronize

> This is why UAE regulators are developing the **Digital Dirham** — to provide a sovereign alternative and maintain monetary policy efficacy.`,
        exercise: {
          title: 'Exercise 2.5 — UAE Central Bank Briefing',
          prompt: `Brief UAE Central Bank officials on:
1. How stablecoin growth could affect AED peg stability
2. Banking disintermediation risks
3. Why they need visibility into stablecoin flows
4. How SphereNet addresses these concerns`,
          criteria: ['Addresses peg stability', 'Explains disintermediation', 'Notes visibility needs', 'Positions SphereNet solution']
        },
        quiz: [
          { q: "How much does Tether hold in U.S. Treasuries?", options: ["~$10B", "~$50B", "~$127B", "~$300B"], correct: 2 },
          { q: "What is the Digital Dirham?", options: ["A stablecoin", "UAE's planned CBDC", "A payment app", "A bank account"], correct: 1 },
          { q: "What is banking disintermediation?", options: ["Banks merging", "Deposits flowing to non-banks", "Bank branch closures", "Interest rate changes"], correct: 1 }
        ]
      }
    ],
    masterQuiz: {
      title: 'Pillar 2 Mastery Assessment',
      description: 'Demonstrate your understanding of stablecoins as financial infrastructure through this scenario-based assessment.',
      scenario: `**Scenario: Stablecoin Due Diligence**

You are presenting to the Chief Risk Officer of a major UAE bank considering using stablecoins for treasury operations. The CRO has read negative headlines about crypto and asks pointed questions.

She says: "I've heard stablecoins are just another crypto speculation tool. And didn't USDC lose its peg last year? Why should we trust this technology with our treasury operations?"

She also mentions concerns about the bank's exposure if stablecoin issuers fail, and wants to understand the macro-financial implications.`,
      questions: [
        {
          type: 'analysis',
          question: 'How would you reframe stablecoins for this CRO without using crypto terminology? Explain what they actually are and why they matter for institutional payments.',
          rubric: ['Describes as wholesale settlement instruments', 'Mentions reserve composition (T-bills, cash)', 'Explains programmability benefit', 'Avoids crypto/DeFi jargon', 'Focuses on settlement speed']
        },
        {
          type: 'multiple_choice',
          question: 'What actually caused the USDC depeg in March 2023?',
          options: ['USDC was undercollateralized', 'Circle committed fraud', 'Confidence shock from SVB exposure uncertainty', 'Algorithmic failure'],
          correct: 2,
          explanation: 'USDC was NOT undercollateralized. The depeg to $0.87 was caused by market uncertainty about access to reserves held at Silicon Valley Bank.'
        },
        {
          type: 'analysis',
          question: 'The CRO asks about systemic risk. Explain how a well-regulated stablecoin like USDC can still create systemic risk through DeFi rehypothecation. Use the MakerDAO example.',
          rubric: ['Explains rehypothecation concept', 'Notes USDC exposure in DAI (~50-65%)', 'Describes leverage creation outside regulatory perimeter', 'Distinguishes issuer safety from system safety']
        },
        {
          type: 'multiple_choice',
          question: 'If Tether faced a 10% redemption event (~$12B), what would be the likely market impact?',
          options: ['No impact - reserves are fully liquid', 'T-bill yields could spike 20-40 bps from forced sales', 'Only crypto markets affected', 'Federal Reserve would intervene'],
          correct: 1,
          explanation: 'BIS research shows stablecoin outflows raise T-bill yields by 6-7.5 bps per 2-standard-deviation event. A major redemption could force $10-12B in T-bill sales.'
        },
        {
          type: 'application',
          question: 'Address the CRO\'s concerns about macro-financial implications for UAE specifically. Cover: AED peg pressure, banking disintermediation, and why the Digital Dirham matters.',
          rubric: ['Explains capital flight risk to AED peg', 'Describes deposit outflow risk', 'Mentions Digital Dirham as sovereign alternative', 'Shows understanding of UAE-specific concerns', 'Positions Sphere as providing visibility/control']
        }
      ],
      passingScore: 70
    }
  },

  // ========== PILLAR 3: COMPLIANCE & REGULATION ==========
  {
    id: 'pillar3',
    title: 'Pillar 3: Compliance, Regulation & Institutional Risk',
    shortTitle: 'Compliance',
    color: 'amber',
    overview: `**Why This Pillar Matters**

Regulatory classification matters more than technology.

UAE counterparties will ask hard questions. You must be able to answer each one without hand-waving.

This pillar ensures you can:

• Classify Sphere correctly (what it is, what it is not)

• Navigate UAE regulatory landscape (CBUAE, DFSA, FSRA)

• Answer the 15 compliance questions confidently

• Discuss custody, safeguarding, and insolvency protection`,
    sections: [
      {
        id: 'p3s1',
        title: 'Section 1: Regulatory Classification',
        curriculum: {
          objectives: [
            'Understand different regulatory classifications',
            'Correctly classify Sphere\'s regulatory status',
            'Avoid "category drift" in discussions'
          ],
          keyConcepts: [
            'MT vs EMI vs PSP vs VASP distinctions',
            'Sphere: MSB registered, SOC 2 Type II, ISO 27001',
            'Be precise about what Sphere is and is NOT'
          ]
        },
        learn: `## Regulatory Classification

**Key Principle: Regulatory classification matters more than technology.**

### Classification Types

<table class="w-full border-collapse my-4">
<tr class="bg-slate-700"><th class="border border-slate-600 px-3 py-2 text-left text-white">Classification</th><th class="border border-slate-600 px-3 py-2 text-left text-white">Definition</th><th class="border border-slate-600 px-3 py-2 text-left text-white">Key Requirements</th></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium text-blue-400">Money Transmitter (MT)</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Licensed to transmit money</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">State licenses (US), FinCEN</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium text-emerald-400">E-Money Institution (EMI)</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Issues electronic money</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">EU-regulated, capital requirements</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium text-amber-400">Payment Service Provider (PSP)</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Processes payments</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Varies by jurisdiction</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium text-purple-400">Virtual Asset Service Provider (VASP)</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Virtual asset services</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">FATF guidelines, AML focus</td></tr>
</table>

### Sphere's Current Status

- MSB (Money Services Business) registered with FinCEN
- SOC 2 Type II certified
- ISO 27001 certified
- 27 regulated entities across 18 jurisdictions
- Multiple MTLs across US states
- Expanding: VASP licenses in LatAM and Asia

> ⚠️ **Warning**: Avoid "category drift" — be precise about what Sphere is and is not. Do not conflate with exchanges, custodians, or stablecoin issuers.`,
        exercise: {
          title: 'Exercise 3.1 — Classification Practice',
          prompt: `For each scenario, identify the likely regulatory classification:
1. Company issues digital tokens backed by USD
2. Company provides API for crypto payments
3. Company operates blockchain for institutional settlement
4. Company facilitates fiat-to-fiat transfers using stablecoins`,
          criteria: ['Correctly classifies each scenario', 'Shows understanding of distinctions', 'Notes jurisdictional variation', 'Explains reasoning']
        },
        quiz: [
          { q: "What is Sphere registered as with FinCEN?", options: ["EMI", "VASP", "MSB", "Bank"], correct: 2 },
          { q: "What certification does Sphere hold?", options: ["PCI DSS only", "SOC 2 Type II", "No certifications", "Basel III compliant"], correct: 1 },
          { q: "What is a VASP?", options: ["Virtual Asset Service Provider", "Verified Account System Protocol", "Value Added Service Provider", "Virtual Account Settlement Platform"], correct: 0 }
        ]
      },
      {
        id: 'p3s2',
        title: 'Section 2: UAE Regulatory Framework',
        curriculum: {
          objectives: [
            'Understand UAE\'s three-regulator structure',
            'Know key recent regulatory developments',
            'Navigate onshore vs free zone distinctions'
          ],
          keyConcepts: [
            'CBUAE (onshore), DFSA (DIFC), FSRA (ADGM)',
            'Payment Token Services Regulation (2024)',
            'Digital Dirham as sovereign alternative'
          ]
        },
        learn: `## UAE Regulatory Framework

### Key UAE Regulators

<table class="w-full border-collapse my-4">
<tr class="bg-slate-700"><th class="border border-slate-600 px-3 py-2 text-left text-white">Regulator</th><th class="border border-slate-600 px-3 py-2 text-left text-white">Jurisdiction</th><th class="border border-slate-600 px-3 py-2 text-left text-white">Key Framework</th></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium text-blue-400">CBUAE</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Onshore UAE</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Payment Token Services Regulation (2024)</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium text-emerald-400">DFSA</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">DIFC (Dubai)</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Fiat Crypto Token Recognition Regime</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium text-amber-400">FSRA</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">ADGM (Abu Dhabi)</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Virtual Asset Framework</td></tr>
</table>

### Key UAE Developments

**Circular No. 2/2024 (CBUAE)**:
Establishes licensing and supervision framework for stablecoin issuance, custody, transfer, and conversion.

**Federal Decree-Law No. 6 of 2025**:
Amends UAE monetary law to recognize a national digital currency. Provides legal basis for Digital Dirham as central bank money and legal tender.

**DIFC Amendment Law No. 4 of 2022**:
Requires formal recognition of fiat-referenced crypto tokens with governance, backing, and risk controls.

### Global Regulatory Convergence

<table class="w-full border-collapse my-4">
<tr class="bg-slate-700"><th class="border border-slate-600 px-3 py-2 text-left text-white">Jurisdiction</th><th class="border border-slate-600 px-3 py-2 text-left text-white">Key Framework</th></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium">USA</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">GENIUS Act — first comprehensive stablecoin law</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium">EU</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">MiCA — e-money token treatment, 1:1 reserves</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium">Hong Kong</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">HKMA licensing; algorithmic stablecoins prohibited</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium">Japan</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">PSA — limits issuance to licensed banks/trust companies</td></tr>
</table>

> Global stablecoin regulation is converging toward bank-like oversight due to systemic risk considerations.`,
        exercise: {
          title: 'Exercise 3.2 — UAE Regulatory Navigation',
          prompt: `Create a decision tree for:
1. A company wanting to issue AED-backed stablecoin in UAE
2. A company wanting to use USDC for cross-border payments from UAE
3. A company wanting to operate a SphereNet node in UAE

Identify which regulator(s) apply and key licensing requirements.`,
          criteria: ['Identifies correct regulators', 'Shows licensing paths', 'Notes free zone vs onshore', 'Addresses each scenario']
        },
        quiz: [
          { q: "Which regulator oversees onshore UAE payments?", options: ["DFSA", "FSRA", "CBUAE", "SEC"], correct: 2 },
          { q: "What is the Digital Dirham?", options: ["A stablecoin", "UAE's planned CBDC", "A cryptocurrency", "A payment app"], correct: 1 },
          { q: "What does MiCA require for stablecoins?", options: ["No reserves", "Partial reserves", "1:1 reserves", "2:1 reserves"], correct: 2 }
        ]
      },
      {
        id: 'p3s3',
        title: 'Section 3: Custody, Safeguarding & Insolvency',
        curriculum: {
          objectives: [
            'Explain custody arrangements clearly',
            'Understand safeguarding requirements',
            'Address insolvency protection questions'
          ],
          keyConcepts: [
            'Fiat custody vs stablecoin custody distinctions',
            'Legal receipt vs technical receipt',
            'Client protection mechanisms during insolvency'
          ]
        },
        learn: `## Custody, Safeguarding & Insolvency

**These are decisive factors for institutional adoption.**

### Who Holds Customer Funds?

You must be able to answer:

- **Fiat Custody**: Who holds the actual bank accounts? What banks? What jurisdictions?
- **Stablecoin Custody**: Who controls the private keys? What custody arrangements?
- **Segregation**: Are customer funds segregated from operational funds? How verified?

### When Are Funds "Received"?

<table class="w-full border-collapse my-4">
<tr class="bg-slate-700"><th class="border border-slate-600 px-3 py-2 text-left text-white">Legal Receipt</th><th class="border border-slate-600 px-3 py-2 text-left text-white">Technical Receipt</th></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800">When obligation transfers legally</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">When transaction appears in system</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-emerald-400">Defines when liability shifts</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-amber-400">May NOT match legal status</td></tr>
</table>

**Key Questions**:
- What is the settlement risk allocation?
- Who bears liability during processing delays?
- What happens if a transaction fails mid-process?

### Client Protection During Insolvency

- **Terms of Service**: What do terms say about fund protection?
- **Safeguarding Mechanisms**: How are funds protected from company creditors?
- **Recovery Paths**: If the company fails, what is the process for clients to recover?

> ⚠️ These questions WILL be asked by UAE counterparties. You must answer clearly and precisely.`,
        exercise: {
          title: 'Exercise 3.3 — Banking Partner Failure',
          prompt: `Sphere's banking partner fails (like SVB). Walk through:
1. What happens to client fiat funds
2. What happens to stablecoin holdings
3. Who communicates to clients
4. What are the recovery paths`,
          criteria: ['Addresses fiat funds', 'Addresses stablecoin holdings', 'Outlines communication plan', 'Describes recovery process']
        },
        quiz: [
          { q: "What is safeguarding?", options: ["Insurance", "Segregating customer funds from operational funds", "Encryption", "Backup systems"], correct: 1 },
          { q: "When are funds legally 'received'?", options: ["When transaction appears in system", "When obligation transfers legally", "When confirmation is sent", "When customer is notified"], correct: 1 },
          { q: "Why does custody matter for institutions?", options: ["Tax reasons", "Insolvency protection", "Faster processing", "Lower fees"], correct: 1 }
        ]
      },
      {
        id: 'p3s4',
        title: 'Section 4: AML/CFT Framework',
        curriculum: {
          objectives: [
            'Understand risk-based approach to AML',
            'Distinguish KYC vs KYB requirements',
            'Explain Sphere\'s preventative compliance model'
          ],
          keyConcepts: [
            'Risk-based approach: calibrated controls',
            'KYC (individuals) vs KYB (businesses)',
            'SphereNet: compliance before settlement, not after'
          ]
        },
        learn: `## AML/CFT Framework

**Key Principle: AML/CFT is about risk control, not box-checking.**

### Risk-Based Approach

Modern AML/CFT requires calibrated controls based on assessed risk levels:

- Customer risk assessment (high/medium/low)
- Enhanced due diligence for high-risk customers
- Ongoing monitoring calibrated to risk level
- Periodic review and re-assessment

### KYC vs KYB

<table class="w-full border-collapse my-4">
<tr class="bg-slate-700"><th class="border border-slate-600 px-3 py-2 text-left text-white">KYC (Know Your Customer)</th><th class="border border-slate-600 px-3 py-2 text-left text-white">KYB (Know Your Business)</th></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800">Individual identity verification</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Business entity verification</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800">ID documents, address proof</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Registration, ownership, UBOs</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800">Personal risk assessment</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Business activity assessment</td></tr>
</table>

### Sanctions and Monitoring

- **OFAC**: US sanctions (SDN list)
- **UN Security Council**: International sanctions
- **EU**: European sanctions lists
- Real-time transaction monitoring
- SAR (Suspicious Activity Report) filing procedures

### Sphere's Compliance-Native Approach

<table class="w-full border-collapse my-4">
<tr class="bg-slate-700"><th class="border border-slate-600 px-3 py-2 text-left text-white">Traditional</th><th class="border border-slate-600 px-3 py-2 text-left text-white">SphereNet</th></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-red-400">Compliance happens AFTER transaction</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-emerald-400">Compliance enforced BEFORE settlement</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-red-400">Reactive monitoring</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-emerald-400">Preventative controls</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-red-400">Risk discovered post-facto</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-emerald-400">Risk prevented at execution</td></tr>
</table>

> Policy is enforced at the protocol level, not monitored after the fact.`,
        exercise: {
          title: 'Exercise 3.4 — Sanctions Flag Response',
          prompt: `A transaction is flagged for potential sanctions exposure. Walk through:
1. What happens in traditional system (reactive)
2. What happens on SphereNet (preventative)
3. Who is notified
4. What documentation is required`,
          criteria: ['Contrasts reactive vs preventative', 'Shows notification chain', 'Notes documentation needs', 'Explains SphereNet advantage']
        },
        quiz: [
          { q: "What does KYB stand for?", options: ["Know Your Bank", "Know Your Business", "Keep Your Balance", "Know Your Blockchain"], correct: 1 },
          { q: "What is a risk-based approach?", options: ["Same controls for everyone", "Calibrated controls based on risk", "No controls for low-risk", "Maximum controls for all"], correct: 1 },
          { q: "When does SphereNet enforce compliance?", options: ["After settlement", "During settlement", "Before settlement", "Never"], correct: 2 }
        ]
      }
    ],
    masterQuiz: {
      title: 'Pillar 3 Mastery Assessment',
      description: 'Demonstrate your understanding of compliance, regulation, and institutional risk through this scenario-based assessment.',
      scenario: `**Scenario: Regulatory Deep Dive**

You're in a formal meeting with the DFSA (Dubai Financial Services Authority) licensing team. They are evaluating whether to approve Sphere for operations in DIFC.

The lead regulator opens with: "We've seen many crypto companies claim to be compliant while operating in regulatory grey areas. Walk us through exactly what Sphere is, how you're regulated, and how you handle the compliance questions that matter to us."

She has a checklist of concerns including: regulatory classification, custody arrangements, AML/CFT frameworks, and what happens if something goes wrong.`,
      questions: [
        {
          type: 'analysis',
          question: 'The regulator asks: "What exactly IS Sphere? I\'ve heard you called a crypto company, a payment processor, and a money transmitter." Provide a precise regulatory classification without category drift.',
          rubric: ['States MSB registration with FinCEN', 'Mentions SOC 2 Type II and ISO 27001', 'Clarifies what Sphere is NOT (not exchange, not custodian, not stablecoin issuer)', 'Shows understanding of MT/EMI/PSP/VASP distinctions']
        },
        {
          type: 'multiple_choice',
          question: 'For operations in DIFC, which regulator has primary oversight?',
          options: ['CBUAE', 'DFSA', 'FSRA', 'SEC'],
          correct: 1,
          explanation: 'DFSA regulates DIFC (Dubai International Financial Centre). CBUAE covers onshore UAE, FSRA covers ADGM (Abu Dhabi).'
        },
        {
          type: 'analysis',
          question: 'The regulator asks about custody: "Who holds customer funds, when are they legally received, and what happens in insolvency?" Answer all three parts clearly.',
          rubric: ['Explains fiat custody arrangements', 'Distinguishes legal receipt from technical receipt', 'Describes safeguarding mechanisms', 'Addresses insolvency protection', 'Notes segregation of customer funds']
        },
        {
          type: 'multiple_choice',
          question: 'Under MiCA, what reserve requirement applies to stablecoins?',
          options: ['No reserve requirement', '50% reserves', '1:1 reserves', '2:1 reserves'],
          correct: 2,
          explanation: 'MiCA (EU regulation) requires e-money token issuers to maintain 1:1 reserves, converging toward bank-like oversight.'
        },
        {
          type: 'application',
          question: 'The regulator wants to understand your AML/CFT approach: "How is Sphere different from other crypto companies that claim compliance but actually monitor after the fact?" Explain the preventative vs reactive model.',
          rubric: ['Explains compliance-native approach', 'Contrasts preventative vs reactive controls', 'Notes policy enforcement before settlement', 'Mentions risk-based KYC/KYB approach', 'Describes sanctions screening process']
        }
      ],
      passingScore: 70
    }
  },

  // ========== PILLAR 4: GOVERNANCE & OPERATIONS ==========
  {
    id: 'pillar4',
    title: 'Pillar 4: Governance, Risk & Operations',
    shortTitle: 'Operations',
    color: 'purple',
    overview: `**Why This Pillar Matters**

Operational resilience determines institutional trust.

This pillar ensures you can address concerns about:

• Reconciliation between fiat and on-chain systems

• Liquidity management under stress

• FX guarantees vs best-efforts

• Incident response and reimbursement

• Board and governance credibility`,
    sections: [
      {
        id: 'p4s1',
        title: 'Section 1: Reconciliation Risk',
        curriculum: {
          objectives: [
            'Understand fiat vs on-chain reconciliation',
            'Explain what happens when balances diverge',
            'Describe resolution procedures'
          ],
          keyConcepts: [
            'Four systems must reconcile for each transaction',
            'Temporary divergence is normal; permanent is serious',
            'Clear ownership and escalation paths'
          ]
        },
        learn: `## Reconciliation Risk

**The Challenge: Fiat ledgers must match on-chain state.**

### How Reconciliation Works

Every transaction creates entries in multiple systems:
1. Client's bank account (fiat debit/credit)
2. Sphere's bank ledger (fiat received)
3. Stablecoin blockchain (on-chain state)
4. Destination bank account (fiat delivered)

**All four must reconcile.** Timing differences create temporary divergence. Permanent divergence is a serious failure.

### What Happens When Balances Diverge

<table class="w-full border-collapse my-4">
<tr class="bg-slate-700"><th class="border border-slate-600 px-3 py-2 text-center text-white w-12">Step</th><th class="border border-slate-600 px-3 py-2 text-left text-white">Action</th><th class="border border-slate-600 px-3 py-2 text-left text-white">Owner</th></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center font-bold text-blue-400">1</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Automatic flagging of discrepancy</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">System/Monitoring</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center font-bold text-blue-400">2</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Transaction hold (if in progress)</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Operations</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center font-bold text-blue-400">3</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Root cause investigation</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Operations + Engineering</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center font-bold text-blue-400">4</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Manual reconciliation if needed</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Finance + Operations</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center font-bold text-blue-400">5</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Client communication (if affected)</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Client Success</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center font-bold text-blue-400">6</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Resolution and documentation</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">All + Compliance</td></tr>
</table>

> The ability to reconcile fiat and on-chain state is a core operational competency. Failures here destroy trust.`,
        exercise: {
          title: 'Exercise 4.1 — Reconciliation Failure',
          prompt: `Fiat ledger shows $1M more than on-chain records. Walk through:
1. Immediate actions
2. Investigation steps
3. Communication plan
4. Resolution options
5. Prevention measures`,
          criteria: ['Lists immediate actions', 'Outlines investigation', 'Describes communication', 'Proposes resolution and prevention']
        },
        quiz: [
          { q: "How many systems must reconcile for each transaction?", options: ["2", "3", "4", "5"], correct: 2 },
          { q: "Who owns client communication during reconciliation issues?", options: ["Engineering", "Finance", "Client Success", "CEO"], correct: 2 },
          { q: "Is temporary divergence always a problem?", options: ["Yes, always", "No, timing differences are normal", "Only for large amounts", "Only internationally"], correct: 1 }
        ]
      },
      {
        id: 'p4s2',
        title: 'Section 2: Liquidity Management',
        curriculum: {
          objectives: [
            'Compare traditional vs Sphere liquidity models',
            'Understand stress scenarios',
            'Explain mitigation strategies'
          ],
          keyConcepts: [
            'Correspondent banking: prefunding, 95% opex',
            'SpherePay: dynamic liquidity via MSB network',
            'Multiple stress scenarios and mitigations'
          ]
        },
        learn: `## Liquidity Management Under Stress

### Traditional vs Sphere Model

<table class="w-full border-collapse my-4">
<tr class="bg-slate-700"><th class="border border-slate-600 px-3 py-2 text-left text-white">Correspondent Banking (1.0)</th><th class="border border-slate-600 px-3 py-2 text-left text-white">SpherePay (2.0)</th></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-red-400">Prefund nostro accounts in each currency</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-emerald-400">Real-time settlement, no prefunding</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-red-400">Capital trapped across jurisdictions</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-emerald-400">Dynamic liquidity via MSB network</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-red-400">95% of revenue to opex (e.g., Wise)</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-emerald-400">Significantly lower operational costs</td></tr>
</table>

### Stress Scenarios

**Scenario 1 — Mass Redemption**:
Large portion of clients request same-day settlement simultaneously.
- Impact: Liquidity strain, potential delays
- Mitigation: Diversified liquidity sources, real-time monitoring

**Scenario 2 — Stablecoin Depeg**:
Primary stablecoin trades below peg.
- Impact: Value uncertainty, client concerns
- Mitigation: Multiple stablecoin support, rapid communication

**Scenario 3 — Banking Partner Failure**:
Key banking partner experiences outage or failure.
- Impact: Settlement delays, reconciliation issues
- Mitigation: Multiple banking partners, redundancy

**Scenario 4 — Market Volatility**:
Sudden FX rate movement in key corridor.
- Impact: Pricing uncertainty, potential losses
- Mitigation: Real-time execution, minimal exposure window`,
        exercise: {
          title: 'Exercise 4.2 — Combined Stress Test',
          prompt: `Model a scenario where:
- 20% of daily volume requests same-day settlement
- Primary stablecoin depegs 5%
- Banking partner has 4-hour outage

What happens? What are the fallbacks?`,
          criteria: ['Addresses volume spike', 'Handles depeg scenario', 'Manages banking outage', 'Identifies fallback options']
        },
        quiz: [
          { q: "What % of revenue goes to opex at Wise?", options: ["50%", "75%", "95%", "99%"], correct: 2 },
          { q: "How does SpherePay handle liquidity?", options: ["Prefunding", "Dynamic via MSB network", "Bank loans", "Customer deposits"], correct: 1 },
          { q: "What is the mitigation for banking partner failure?", options: ["Insurance", "Multiple banking partners", "Pause operations", "Customer notification only"], correct: 1 }
        ]
      },
      {
        id: 'p4s3',
        title: 'Section 3: FX Guarantees vs Reality',
        curriculum: {
          objectives: [
            'Distinguish guarantees from best-efforts',
            'Understand risk allocation in FX',
            'Communicate clearly about commitments'
          ],
          keyConcepts: [
            'Guarantee = legally binding commitment',
            'Best-efforts = will attempt, not bound',
            'Ambiguity destroys relationships'
          ]
        },
        learn: `## FX Guarantees vs Reality

### Understanding the Distinction

<table class="w-full border-collapse my-4">
<tr class="bg-slate-700"><th class="border border-slate-600 px-3 py-2 text-left text-white">Guarantee</th><th class="border border-slate-600 px-3 py-2 text-left text-white">Best-Efforts</th></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-emerald-400">Legally binding commitment</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-amber-400">Will attempt but not legally bound</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800">Company bears rate movement risk</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Risk allocation varies by contract</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800">Higher pricing to cover risk</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Lower pricing, client shares risk</td></tr>
</table>

### Sphere's Approach

- Transparent pricing with no hidden fees
- Competitive FX schedules for long-term alignment
- Real-time execution minimizes exposure window
- No FX exposure in emerging markets (money moves in real-time)

### What Happens During Volatility

If client locks rate at 10am but execution happens at 11am with 2% rate movement:
- Who bears the cost?
- What does the contract say?
- What SHOULD it say?

> Always be clear about what is guaranteed vs best-efforts. Ambiguity destroys relationships.`,
        exercise: {
          title: 'Exercise 4.3 — FX Volatility Scenario',
          prompt: `Client locks in USD/MXN rate at 10am. By execution at 11am, rate has moved 2%. Write:
1. What the contract should specify
2. Who bears cost under different scenarios
3. How to communicate to client`,
          criteria: ['Specifies contract terms', 'Allocates risk clearly', 'Outlines communication approach', 'Shows understanding of guarantees']
        },
        quiz: [
          { q: "What is a guarantee in FX context?", options: ["Best attempt", "Legally binding commitment", "Estimate", "Target"], correct: 1 },
          { q: "How does SpherePay minimize FX exposure?", options: ["Hedging", "Real-time execution", "Fixed rates only", "No FX offered"], correct: 1 },
          { q: "Why is ambiguity about guarantees problematic?", options: ["Legal risk", "Relationship damage", "Regulatory issues", "All of the above"], correct: 3 }
        ]
      },
      {
        id: 'p4s4',
        title: 'Section 4: Incident Response',
        curriculum: {
          objectives: [
            'Understand incident response framework',
            'Know reimbursement decision process',
            'Preserve trust through incidents'
          ],
          keyConcepts: [
            'Detection → Containment → Communication → Resolution → Post-Mortem',
            'Client notification within 1 hour',
            'Speed, communication, fairness, prevention'
          ]
        },
        learn: `## Incident Response & Reimbursement

### Incident Response Framework

<table class="w-full border-collapse my-4">
<tr class="bg-slate-700"><th class="border border-slate-600 px-3 py-2 text-left text-white">Phase</th><th class="border border-slate-600 px-3 py-2 text-left text-white">Actions</th><th class="border border-slate-600 px-3 py-2 text-left text-white">Timeline</th></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium text-blue-400">Detection</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Identify and classify incident</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Immediate</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium text-amber-400">Containment</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Limit scope, prevent spread</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Minutes</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium text-purple-400">Communication</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Notify affected clients</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-semibold text-red-400">Within 1 hour</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium text-cyan-400">Investigation</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Root cause analysis</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Hours to days</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium text-emerald-400">Resolution</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Fix issue, restore service</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">ASAP</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium text-rose-400">Post-Mortem</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Document learnings, prevent recurrence</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Within 1 week</td></tr>
</table>

### Reimbursement Framework

**Key Questions to Answer**:
- Under what conditions is reimbursement provided?
- Who has authority to approve reimbursement?
- What is the timeline for reimbursement decisions?
- How is reimbursement documented for audit?

### Preserving Trust

Incidents happen. What matters is:
1. Speed of detection
2. Quality of communication
3. Fairness of resolution
4. Measures to prevent recurrence`,
        exercise: {
          title: 'Exercise 4.4 — False Positive Incident',
          prompt: `A client's $500K payment is delayed 48 hours due to a compliance hold that turns out to be a false positive. Write:
1. Immediate client communication
2. Resolution communication
3. Reimbursement decision framework
4. Prevention measures`,
          criteria: ['Writes immediate communication', 'Writes resolution communication', 'Outlines reimbursement framework', 'Proposes prevention measures']
        },
        quiz: [
          { q: "When should affected clients be notified?", options: ["Within 1 hour", "Within 24 hours", "Within 1 week", "Only if they ask"], correct: 0 },
          { q: "What is the final phase of incident response?", options: ["Resolution", "Communication", "Post-Mortem", "Detection"], correct: 2 },
          { q: "What matters most in incident handling?", options: ["Avoiding blame", "Speed, communication, fairness, prevention", "Legal protection", "Cost minimization"], correct: 1 }
        ]
      },
      {
        id: 'p4s5',
        title: 'Section 5: Board & Governance',
        curriculum: {
          objectives: [
            'Understand what regulators expect from governance',
            'Know Sphere leadership credentials',
            'Explain compliance function independence'
          ],
          keyConcepts: [
            'Independent directors with relevant experience',
            'CCO with 50+ MTL acquisitions',
            'Compliance function must have authority'
          ]
        },
        learn: `## Board Credibility & Regulatory Trust

### What Regulators Expect

- Independent directors with relevant experience
- Banking and payments expertise on board
- Compliance function with independence and authority
- Clear reporting lines and escalation paths
- Audit committee with financial expertise

### Sphere Leadership Highlights

<table class="w-full border-collapse my-4">
<tr class="bg-slate-700"><th class="border border-slate-600 px-3 py-2 text-left text-white">Role</th><th class="border border-slate-600 px-3 py-2 text-left text-white">Person</th><th class="border border-slate-600 px-3 py-2 text-left text-white">Background</th></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium text-blue-400">CEO</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-semibold">Arnold Lee</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Co-founded Sphere, scaled to $1B+ volume, previously Google</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium text-emerald-400">CCO</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-semibold">Scott Butler</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">20+ years banking compliance at Deutsche Bank, Meta, Fiant. Acquired 50+ MTLs</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium text-amber-400">Head of Finance</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-semibold">Richard Nguyen</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Built finance at TRM, sold Looker to Google for $2.6B</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium text-purple-400">VP Engineering</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-semibold">Mike Young</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Led ACH, FedWire, and core banking at Synapse</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium text-rose-400">Advisors</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-semibold">Nick Passarelli, Rebecca Rettig</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">CCO of Brex, GC of Polygon</td></tr>
</table>

### Compliance Function Empowerment

Key Questions:
- Does compliance have direct board access?
- Can compliance veto transactions?
- Is compliance resourced appropriately?
- Are compliance concerns escalated and addressed?`,
        exercise: {
          title: 'Exercise 4.5 — Board Presentation',
          prompt: `You're presenting Sphere to a bank's board. They ask:
1. "Who on your team has dealt with a real regulatory crisis?"
2. "What happens if your CEO is unavailable?"
3. "How independent is your compliance function?"

Write your responses.`,
          criteria: ['Addresses regulatory crisis experience', 'Explains succession/continuity', 'Describes compliance independence', 'Appropriate for board audience']
        },
        quiz: [
          { q: "Who is Sphere's CCO?", options: ["Arnold Lee", "Scott Butler", "Richard Nguyen", "Mike Young"], correct: 1 },
          { q: "How many MTLs has the CCO acquired in his career?", options: ["10", "25", "50+", "100"], correct: 2 },
          { q: "What do regulators expect from compliance function?", options: ["Advisory only", "Independence and authority", "Minimal involvement", "External only"], correct: 1 }
        ]
      }
    ],
    masterQuiz: {
      title: 'Pillar 4 Mastery Assessment',
      description: 'Demonstrate your understanding of governance, risk, and operations through this crisis simulation.',
      scenario: `**Scenario: Crisis Management Simulation**

It's 2:00 AM UAE time. You receive an urgent call: Sphere's primary banking partner has just announced a 12-hour emergency maintenance window. Additionally, a major stablecoin (not USDC) has depegged by 8% in the last hour.

You have $47M in client transactions in various stages of processing:
- $12M initiated but not yet cleared
- $23M cleared but not yet settled  
- $12M pending client pickup

The CEO is unreachable (on a flight). As the senior person on call, you need to manage this situation. The CFO of a major client is already calling, demanding to know if their $5M transfer is safe.`,
      questions: [
        {
          type: 'analysis',
          question: 'Walk through your immediate actions in the first 30 minutes. What do you prioritize and why? Reference the incident response framework.',
          rubric: ['Detection and classification of dual incidents', 'Containment actions for each issue', 'Client communication plan within 1 hour', 'Identifies which transactions are at risk', 'Shows clear ownership assignments']
        },
        {
          type: 'multiple_choice',
          question: 'Of the $47M in processing, which portion faces the highest immediate risk from the banking outage?',
          options: ['$12M initiated but not cleared', '$23M cleared but not settled', '$12M pending client pickup', 'All equally at risk'],
          correct: 1,
          explanation: 'The $23M cleared but not settled faces the highest risk - the obligation exists but final settlement hasn\'t occurred. The banking outage could delay settlement and create reconciliation issues.'
        },
        {
          type: 'analysis',
          question: 'The CFO demands to know: "Is my $5M safe? What happens if your banking partner fails completely?" How do you respond? Address custody, safeguarding, and recovery.',
          rubric: ['Explains current transaction status', 'Describes safeguarding/segregation of funds', 'Addresses insolvency protection', 'Provides realistic timeline', 'Maintains confidence without overpromising']
        },
        {
          type: 'multiple_choice',
          question: 'When should you notify affected clients about the situation?',
          options: ['Only after full resolution', 'Within 1 hour', 'Within 24 hours', 'Only if they ask'],
          correct: 1,
          explanation: 'The incident response framework requires client notification within 1 hour. Proactive communication preserves trust even when news is bad.'
        },
        {
          type: 'application',
          question: 'Post-incident, you need to brief the board on what happened and what changes are needed. Write your key recommendations covering: reconciliation improvements, liquidity management, and banking partner redundancy.',
          rubric: ['Proposes specific reconciliation improvements', 'Addresses liquidity buffer recommendations', 'Recommends banking partner diversification', 'Includes incident response process improvements', 'Shows board-appropriate communication']
        }
      ],
      passingScore: 70
    }
  },

  // ========== PILLAR 5: SPHERE & SPHERENET ==========
  {
    id: 'pillar5',
    title: 'Pillar 5: Sphere & SphereNet Specifics',
    shortTitle: 'Sphere',
    color: 'rose',
    overview: `**Why This Pillar Matters**

Company-specific knowledge for credible representation.

This pillar ensures you can:

• Pitch SpherePay clearly (metrics, products, value prop)

• Explain SphereNet vision (why, what, how)

• Differentiate from competitors

• Deliver the solo pitch confidently`,
    sections: [
      {
        id: 'p5s1',
        title: 'Section 1: SpherePay Today',
        curriculum: {
          objectives: [
            'Know key metrics and milestones',
            'Understand product suite',
            'Articulate value proposition vs correspondent banking'
          ],
          keyConcepts: [
            '$2.5B+ annualized volume, 150+ B2B customers',
            'Three products: Developer Toolkit, Dashboard+RAMP, Private Desk',
            'Money Movement 1.0 vs 2.0 comparison'
          ]
        },
        learn: `## SpherePay: The Product Today

### Overview
B2B cross-border payments API using stablecoins + bank messaging optimization.

### Key Metrics (2025)

<table class="w-full border-collapse my-4">
<tr class="bg-slate-700"><th class="border border-slate-600 px-3 py-2 text-left text-white">Metric</th><th class="border border-slate-600 px-3 py-2 text-left text-white">Value</th></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium">Annualized Volume</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-emerald-400 font-bold">$2.5B+</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium">Cumulative Processed</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">$1B+</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium">B2B Customers</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">150+</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium">Active Accounts</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">1,847</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium">Transactions</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">476k+</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium">Median Settlement</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-emerald-400 font-bold">15-30 minutes</td></tr>
</table>

### Product Suite

<table class="w-full border-collapse my-4">
<tr class="bg-slate-700"><th class="border border-slate-600 px-3 py-2 text-left text-white">Product</th><th class="border border-slate-600 px-3 py-2 text-left text-white">Description</th><th class="border border-slate-600 px-3 py-2 text-left text-white">Use Case</th></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium text-blue-400">Developer Toolkit</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">RESTful APIs, React SDKs</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Embed payments in platform</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium text-emerald-400">Dashboard + RAMP</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">No-code web portals</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Business/end-user on/off-ramp</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium text-purple-400">Private Desk</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">High-touch support</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Large transfers, optimized FX</td></tr>
</table>

### Value Proposition: 1.0 vs 2.0

**Money Movement 1.0** (Correspondent Banking):
- ❌ Capital costs & prefunding requirements
- ❌ Operational complexity (95% of revenue to opex)
- ❌ Counter-party risk to FX in emerging markets

**Money Movement 2.0** (SpherePay):
- ✅ Payment flexibility without prefunding
- ✅ Single API for all money movements
- ✅ No risk & no exposure to FX in emerging markets
- ✅ Settlement in <2 hours`,
        exercise: {
          title: 'Exercise 5.1 — Product Pitch',
          prompt: `Write a 2-minute product pitch for SpherePay to a fintech CEO who currently uses correspondent banking for LATAM payments. Focus on pain points and solutions with specific metrics.`,
          criteria: ['Identifies correspondent banking pain points', 'Presents SpherePay solutions', 'Uses concrete metrics', 'Appropriate for CEO audience']
        },
        quiz: [
          { q: "What is SpherePay's median settlement time?", options: ["1-2 days", "4-6 hours", "15-30 minutes", "Instant"], correct: 2 },
          { q: "How many B2B customers does SpherePay have?", options: ["50+", "150+", "500+", "1000+"], correct: 1 },
          { q: "What is the annualized volume?", options: ["$500M", "$1B", "$2.5B+", "$10B"], correct: 2 }
        ]
      },
      {
        id: 'p5s2',
        title: 'Section 2: SphereNet Vision',
        curriculum: {
          objectives: [
            'Explain why existing blockchains can\'t serve regulated finance',
            'Articulate the three core innovations',
            'Understand the Hyperliquid playbook'
          ],
          keyConcepts: [
            'Compliance-native, privacy-preserving, verified ecosystem',
            'Preventative controls vs reactive monitoring',
            'Build app first → understand needs → build infrastructure'
          ]
        },
        learn: `## SphereNet: The Future Vision

### Overview
Solana-based L1 blockchain optimized for cross-border payments through stablecoins and on-chain FX — low cost, high throughput, private, and compliant for regulated money transmission.

**Target Release**: Q4 2025 / Early 2026

### Why Existing Blockchains Can't Work

<table class="w-full border-collapse my-4">
<tr class="bg-slate-700"><th class="border border-slate-600 px-3 py-2 text-left text-white">Traditional Blockchains</th><th class="border border-slate-600 px-3 py-2 text-left text-white">Regulated Finance Needs</th></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-red-400">Reactive controls (post-settlement)</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-emerald-400">Preventative controls (pre-execution)</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-red-400">Jurisdiction-unaware</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-emerald-400">Jurisdiction-aware enforcement</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-red-400">Privacy vs auditability tradeoff</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-emerald-400">Privacy-preserving verification</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-red-400">External compliance systems</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-emerald-400">Embedded compliance</td></tr>
</table>

### Three Core Innovations

**1. Compliance Native**
- Policy enforced at network level
- Real-time preventative controls
- FATF, OFAC, sanctions compliance built-in

**2. Privacy Preserving**
- Zero-knowledge proofs
- Homomorphic encryption
- Verify without exposing data

**3. Verified Ecosystem**
- Permissioned network
- Participants verified against jurisdictional criteria
- Transactions only between compatible counterparties

### The Hyperliquid Playbook
Build successful application first (SpherePay) → Understand needs → Build purpose-built infrastructure (SphereNet)`,
        exercise: {
          title: 'Exercise 5.2 — Blockchain Limitations',
          prompt: `Explain to a traditional banker why existing blockchains (Bitcoin, Ethereum, Solana) cannot serve regulated institutional payments, and how SphereNet addresses each limitation.`,
          criteria: ['Identifies blockchain limitations', 'Explains compliance gaps', 'Describes SphereNet solutions', 'Appropriate for banker audience']
        },
        quiz: [
          { q: "When is SphereNet targeted for release?", options: ["Already live", "Q4 2025 / Early 2026", "2027", "2030"], correct: 1 },
          { q: "What makes SphereNet 'compliance-native'?", options: ["External monitoring", "Policy enforced at network level", "Manual review", "No compliance needed"], correct: 1 },
          { q: "What is the 'Hyperliquid playbook'?", options: ["Copy competitors", "Build app first, then infrastructure", "Infrastructure first", "Acquire companies"], correct: 1 }
        ]
      },
      {
        id: 'p5s3',
        title: 'Section 3: Technical Architecture',
        curriculum: {
          objectives: [
            'Understand multi-dimensional coloring',
            'Explain control levers across transaction lifecycle',
            'Articulate proof-driven attestations'
          ],
          keyConcepts: [
            'Transactions annotated by jurisdiction, entity type, risk class',
            'Policy evaluation before execution',
            'Verify once, consume many times'
          ]
        },
        learn: `## SphereNet Technical Architecture

### Multi-Dimensional Transaction Coloring

Every account and transaction is annotated across multiple dimensions:
- Jurisdiction
- Entity type
- Risk class
- Policy state
- Asset class

**Why It Matters**:
- Regulators see subnetwork views without data extraction
- Selective extraction only via legal process
- More expressive than monolithic risk scoring

### Control Levers Across Transaction Lifecycle

<table class="w-full border-collapse my-4">
<tr class="bg-slate-700"><th class="border border-slate-600 px-3 py-2 text-left text-white">Stage</th><th class="border border-slate-600 px-3 py-2 text-left text-white">What Happens</th><th class="border border-slate-600 px-3 py-2 text-left text-white">Control Point</th></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium text-blue-400">Ingress</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Client submission, preflight checks</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Initial validation</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium text-amber-400">Policy Evaluation</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Deterministic checks at RPC/validator</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Pre-execution enforcement</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium text-purple-400">Execution</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Parallel execution (SVM)</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Asset/counterparty constraints</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium text-cyan-400">Propagation</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Validator-to-validator</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Jurisdiction-aware visibility</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium text-emerald-400">Settlement</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">State commitment and finalization</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Audit artifacts</td></tr>
</table>

### Proof-Driven Attestations

Attestation trees across:
- Identity and entity status
- Jurisdictional eligibility
- Policy compliance
- Asset provenance
- Transactional constraints

**Economics**:
- Compliance today: slow, expensive, duplicated
- Proof-native: verify once, consume many times
- Turns compliance from cost center → throughput accelerator`,
        exercise: {
          title: 'Exercise 5.3 — Technical Explanation',
          prompt: `Explain 'multi-dimensional coloring' and 'proof-driven attestations' to a compliance officer. Focus on how these enable regulatory visibility while preserving privacy.`,
          criteria: ['Explains multi-dimensional coloring', 'Describes proof-driven attestations', 'Shows privacy/visibility balance', 'Appropriate for compliance audience']
        },
        quiz: [
          { q: "What is multi-dimensional coloring?", options: ["Visual design", "Annotating transactions across multiple dimensions", "Color-coded UI", "Marketing term"], correct: 1 },
          { q: "When does policy evaluation happen on SphereNet?", options: ["After settlement", "During settlement", "Before execution", "Never"], correct: 2 },
          { q: "What do proof-driven attestations enable?", options: ["Faster marketing", "Verify once, consume many times", "Manual review", "No compliance"], correct: 1 }
        ]
      },
      {
        id: 'p5s4',
        title: 'Section 4: Competitive Positioning',
        curriculum: {
          objectives: [
            'Differentiate SphereNet from other networks',
            'Compare SpherePay to competitors',
            'Articulate key differentiators'
          ],
          keyConcepts: [
            'Native compliance + credibly neutral + DeFi compatible',
            'SpherePay: 5-50 bps, same-day, LATAM/APAC focus',
            'Flywheel: SpherePay proves → SphereNet scales'
          ]
        },
        learn: `## Competitive Positioning

### Network Comparison

<table class="w-full border-collapse my-4">
<tr class="bg-slate-700"><th class="border border-slate-600 px-3 py-2 text-left text-white">Feature</th><th class="border border-slate-600 px-3 py-2 text-center text-white">SphereNet</th><th class="border border-slate-600 px-3 py-2 text-center text-white">Ripple</th><th class="border border-slate-600 px-3 py-2 text-center text-white">Stellar</th><th class="border border-slate-600 px-3 py-2 text-center text-white">SWIFT</th><th class="border border-slate-600 px-3 py-2 text-center text-white">Wise</th></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium">Native Compliance</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center text-emerald-400 font-bold">✅</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center text-red-400">❌</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center text-red-400">❌</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center text-emerald-400">✅</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center text-emerald-400">✅</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium">Credibly Neutral</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center text-emerald-400 font-bold">✅</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center text-red-400">❌</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center text-red-400">❌</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center text-red-400">❌</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center text-red-400">❌</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium">Target Clients</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center">Fintechs</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center">Banks</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center">Retail</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center">Banks</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center">Retail</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium">DeFi Compatible</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center text-emerald-400 font-bold">✅</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center text-red-400">❌</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center text-red-400">❌</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center text-red-400">❌</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center text-red-400">❌</td></tr>
</table>

### SpherePay Comparison

<table class="w-full border-collapse my-4">
<tr class="bg-slate-700"><th class="border border-slate-600 px-3 py-2 text-left text-white">Feature</th><th class="border border-slate-600 px-3 py-2 text-center text-white">SpherePay</th><th class="border border-slate-600 px-3 py-2 text-center text-white">Bridge</th><th class="border border-slate-600 px-3 py-2 text-center text-white">Conduit</th><th class="border border-slate-600 px-3 py-2 text-center text-white">BVNK</th><th class="border border-slate-600 px-3 py-2 text-center text-white">Airwallex</th></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium">Customer</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center">B2B</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center">B2B</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center">B2B</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center">B2B</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center">B2B</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium">Transaction Costs</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center text-emerald-400 font-semibold">5-50 bps</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center">10-50 bps</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center">10-20 bps</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center">5-50 bps</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center">12+ bps</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium">Processing Time</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center text-emerald-400 font-semibold">Same Day</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center">0-1 days</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center">0-1 days</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center">0-1 days</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center">1-5 days</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-medium">Target Market</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center text-blue-400 font-semibold">LATAM, APAC</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center">US, Global</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center">US, Global</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center">Europe</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center">Asia</td></tr>
</table>

### Key Differentiators

1. **Compliance-native**: Not bolted on, built in
2. **Credibly neutral**: Will give up payment flows to preserve neutrality
3. **Emerging market focus**: LATAM, APAC where need is greatest
4. **SpherePay → SphereNet flywheel**: Prove then scale`,
        exercise: {
          title: 'Exercise 5.4 — Competitive Differentiation',
          prompt: `A prospect asks: "Why should I use Sphere instead of Bridge or Ripple?" Write a response that differentiates Sphere without disparaging competitors.`,
          criteria: ['Differentiates from Bridge', 'Differentiates from Ripple', 'Avoids disparagement', 'Highlights unique value']
        },
        quiz: [
          { q: "What makes SphereNet 'credibly neutral'?", options: ["Marketing claim", "Will give up flows to preserve neutrality", "Government backing", "Non-profit status"], correct: 1 },
          { q: "What is SpherePay's transaction cost range?", options: ["0 bps", "5-50 bps", "100+ bps", "1%+"], correct: 1 },
          { q: "What is Sphere's target market focus?", options: ["US only", "Europe only", "LATAM, APAC", "Global equally"], correct: 2 }
        ]
      },
      {
        id: 'p5s5',
        title: 'Section 5: The Solo Pitch',
        curriculum: {
          objectives: [
            'Master the 7-step pitch structure',
            'Deliver without crypto jargon',
            'Handle follow-up questions'
          ],
          keyConcepts: [
            'Problem → Stablecoins → SpherePay → Compliance → SphereNet → Why It Matters → Close',
            'Focus on outcomes, not technology',
            '"SpherePay proves the flow. SphereNet scales the system."'
          ]
        },
        learn: `## The Solo Pitch Framework

### Use This 7-Step Structure

**1. Opening (Problem)**
> "Cross-border payments are slow, capital-intensive, and compliance-heavy because they rely on correspondent banking, prefunding, and fragmented enforcement."

**2. Why Stablecoins Matter (Without Hype)**
> "Stablecoins allow value to move faster, but introduce new liquidity and compliance risks that must be managed institutionally."

**3. SpherePay (Solution Today)**
> "SpherePay is a compliant B2B payments API that uses stablecoins and bank rails to reduce prefunding, FX friction, and settlement time."

**4. Why Compliance is Central**
> "Speed without compliance creates systemic risk. Sphere embeds compliance into execution, not after-the-fact monitoring."

**5. SphereNet (Future)**
> "SphereNet is a compliance-native payments network designed for regulated institutions, where policy is enforced at the protocol level."

**6. Why This Matters**
> "This aligns speed, supervision, and settlement finality — enabling global payments without sacrificing regulatory control."

**7. Close**
> "SpherePay proves the flow. SphereNet scales the system."

### Pitch Do's and Don'ts

<table class="w-full border-collapse my-4">
<tr class="bg-slate-700"><th class="border border-slate-600 px-3 py-2 text-left text-white">✅ Do</th><th class="border border-slate-600 px-3 py-2 text-left text-white">❌ Don't</th></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-emerald-400">Focus on outcomes</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-red-400">Lead with technology</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-emerald-400">Use traditional finance language</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-red-400">Use crypto jargon</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-emerald-400">Acknowledge risks</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-red-400">Overpromise</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-emerald-400">Position as infrastructure</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-red-400">Position as disruption</td></tr>
</table>`,
        exercise: {
          title: 'Exercise 5.5 — Full Solo Pitch',
          prompt: `Deliver the full 7-step solo pitch in your own words. Time yourself — it should take 2-3 minutes. Avoid all crypto jargon.`,
          criteria: ['Covers all 7 steps', 'Takes 2-3 minutes', 'Avoids crypto jargon', 'Flows naturally']
        },
        quiz: [
          { q: "What is the closing line of the solo pitch?", options: ["Sphere is the future", "SpherePay proves the flow, SphereNet scales the system", "Invest now", "Questions?"], correct: 1 },
          { q: "Should you lead with technology in the pitch?", options: ["Yes, always", "No, focus on outcomes", "Only for technical audiences", "Only for investors"], correct: 1 },
          { q: "How should you position Sphere?", options: ["As disruption", "As infrastructure", "As a startup", "As a bank"], correct: 1 }
        ]
      }
    ],
    masterQuiz: {
      title: 'Pillar 5 Mastery Assessment',
      description: 'Demonstrate your ability to represent Sphere through this comprehensive pitch simulation.',
      scenario: `**Scenario: The Big Meeting**

You have 30 minutes with the CEO of Emirates NBD, one of the largest banks in the Middle East. She's considering a strategic partnership with Sphere for cross-border payments.

She opens with: "I've taken this meeting because my innovation team is excited, but I'm skeptical. I've seen dozens of fintech pitches. Tell me why Sphere is different, and be specific. I don't want to hear buzzwords."

She has specific concerns about: why banks should care about stablecoins, how this fits with UAE regulations, and why Sphere over competitors like Ripple or traditional SWIFT improvements.`,
      questions: [
        {
          type: 'application',
          question: 'Deliver your opening 2-minute pitch using the 7-step framework. Write it out as you would speak it. No crypto jargon allowed.',
          rubric: ['Covers problem statement', 'Explains stablecoins without hype', 'Describes SpherePay solution', 'Addresses compliance centrality', 'Mentions SphereNet vision', 'Strong closing line', 'Zero crypto jargon']
        },
        {
          type: 'multiple_choice',
          question: 'The CEO asks about metrics. What is SpherePay\'s current annualized volume?',
          options: ['$500M', '$1B', '$2.5B+', '$10B'],
          correct: 2,
          explanation: 'SpherePay has processed $2.5B+ in annualized volume with 150+ B2B customers and median settlement of 15-30 minutes.'
        },
        {
          type: 'analysis',
          question: 'She asks: "Why should I care about stablecoins? We\'re a bank, not a crypto exchange." Respond without using the words: blockchain, crypto, DeFi, on-chain, or permissionless.',
          rubric: ['Focuses on settlement speed', 'Mentions capital efficiency', 'Explains as infrastructure not ideology', 'References traditional finance concepts', 'Avoids all prohibited terms']
        },
        {
          type: 'multiple_choice',
          question: 'She asks about competition: "Why not just use Ripple?" What is Sphere\'s key differentiator?',
          options: ['Lower cost', 'Faster speed', 'Compliance-native and credibly neutral', 'More customers'],
          correct: 2,
          explanation: 'Sphere\'s key differentiators are being compliance-native (built in, not bolted on) and credibly neutral (will give up flows to preserve neutrality).'
        },
        {
          type: 'application',
          question: 'She says: "I need to brief my board. Give me the 3 key reasons Emirates NBD should partner with Sphere, and what the first pilot project would look like." Write your response.',
          rubric: ['Three clear, compelling reasons', 'Specific pilot proposal (corridor, volume, timeline)', 'References UAE regulatory alignment', 'Shows understanding of bank concerns', 'Ends with clear next steps']
        }
      ],
      passingScore: 70
    }
  },

  // ========== PILLAR 6: THE 15 COMPLIANCE QUESTIONS ==========
  {
    id: 'pillar6',
    title: 'Pillar 6: The 15 Compliance Questions',
    shortTitle: '15 Questions',
    color: 'cyan',
    overview: `**Why This Pillar Matters**

This is the ultimate test. UAE counterparties WILL ask these questions.

These 15 questions cover everything sophisticated counterparties and regulators need to know: value proposition, classification, custody, operations, stress scenarios, and governance. You must be able to answer each one without hand-waving.

**The Four Categories:**

• Questions 1-5: Value Proposition & Classification

• Questions 6-9: Custody & Operations

• Questions 10-12: Stress & Incidents

• Questions 13-15: Governance

Hand-waving, deflection, or vague answers will destroy credibility instantly.`,
    sections: [
      {
        id: 'p6s1',
        title: 'Section 1: Value Proposition (Q1)',
        curriculum: {
          objectives: [
            'Frame Sphere\'s value for non-crypto enterprises',
            'Lead with outcomes, not technology',
            'Avoid crypto jargon entirely'
          ],
          keyConcepts: [
            'Three pillars: faster settlement, less trapped capital, stronger compliance',
            'Never lead with blockchain or crypto',
            'Traditional finance professionals need traditional finance language'
          ]
        },
        learn: `## Question 1: Is the value proposition clear for non-crypto enterprises?

**Guidance:** Frame as: faster settlement, less trapped capital, stronger compliance controls

### The Core Value Proposition (No Crypto Language)

**1. Faster Settlement**
- Traditional cross-border: 2-5 days via correspondent banking
- SpherePay: 15-30 minutes median settlement
- Same-day settlement standard for most corridors

**2. Less Trapped Capital**
- Traditional: Prefund nostro accounts in every currency corridor
- Example: USD-EUR-GBP-AED requires capital locked in 4 separate accounts
- SpherePay: No prefunding required — real-time settlement eliminates trapped capital
- Capital efficiency improvement: Up to 95% reduction in working capital needs

**3. Stronger Compliance Controls**
- Traditional: Compliance happens after settlement (reactive)
- SpherePay/SphereNet: Compliance enforced before settlement (preventative)
- Policy enforcement at protocol level, not as an afterthought

### Sample Response

> "Sphere solves three problems that cost your treasury team time and money: First, we cut settlement from days to minutes. Second, we eliminate the capital you currently have trapped in nostro accounts across corridors. Third, we embed compliance into the payment flow itself, so you catch issues before settlement, not after. We do this using stablecoin infrastructure, but you don't need to think about that — it's just the plumbing that makes these outcomes possible."

### ⚠️ Common Mistakes to Avoid
- Never lead with "blockchain" or "crypto"
- Never say "decentralized" or "trustless"
- Never compare to Bitcoin or Ethereum
- The moment you use crypto jargon, you've lost the traditional finance audience`,
        exercise: {
          title: 'Exercise 6.1 — Value Proposition Pitch',
          prompt: `Write a 60-second value proposition pitch for Sphere targeting a traditional bank's treasury team. 

Rules:
- Zero crypto/blockchain jargon
- Must mention all three value pillars
- End with a specific, measurable benefit

Start with: "Let me explain how Sphere can help your treasury operations..."`,
          criteria: ['Zero crypto jargon', 'Mentions faster settlement', 'Mentions capital efficiency', 'Mentions compliance controls', 'Specific measurable benefit']
        },
        quiz: [
          { q: "What are the three pillars of Sphere's value proposition?", options: ["Speed, security, scalability", "Faster settlement, less trapped capital, stronger compliance", "Blockchain, decentralization, transparency", "Cost, speed, convenience"], correct: 1 },
          { q: "What is SpherePay's median settlement time?", options: ["2-5 days", "Same day", "15-30 minutes", "Instant"], correct: 2 },
          { q: "What term should you NEVER use when pitching to traditional finance?", options: ["Settlement", "Compliance", "Blockchain", "Capital efficiency"], correct: 2 }
        ]
      },
      {
        id: 'p6s2',
        title: 'Section 2: Company Classification (Q2-3)',
        curriculum: {
          objectives: [
            'State precisely what Sphere IS and is NOT',
            'Understand why classification matters legally',
            'Know MT vs EMI vs PSP vs VASP distinctions'
          ],
          keyConcepts: [
            'Sphere = MSB/MT, NOT exchange/custodian/issuer',
            'Different classifications trigger different regulations',
            'UAE has three regulatory zones: CBUAE, DFSA, FSRA'
          ]
        },
        learn: `## Question 2: What kind of company is Sphere?

**Guidance:** Know what it is, what it is NOT, why classification matters legally

### What Sphere IS
- Money Services Business (MSB) registered with FinCEN
- Licensed Money Transmitter in multiple US states
- B2B cross-border payments infrastructure provider
- Payment processor using stablecoin and bank rails
- SOC 2 Type II and ISO 27001 certified

### What Sphere is NOT
- NOT a cryptocurrency exchange — we don't facilitate trading or speculation
- NOT a stablecoin issuer — we use third-party stablecoins (USDC, etc.)
- NOT a custodian — we don't hold customer assets long-term
- NOT a bank — we don't take deposits or make loans
- NOT a wallet provider — we're infrastructure, not consumer-facing

### Why Classification Matters Legally

<table class="w-full border-collapse my-4">
<tr class="bg-slate-700"><th class="border border-slate-600 px-3 py-2 text-white">Classification</th><th class="border border-slate-600 px-3 py-2 text-white">Regulatory Focus</th><th class="border border-slate-600 px-3 py-2 text-white">Key Requirements</th></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800">Money Transmitter</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">AML/BSA compliance</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">State licenses, FinCEN registration</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800">Exchange</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Securities laws, market manipulation</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">SEC/CFTC oversight, BitLicense</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800">Custodian</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Asset safeguarding, fiduciary duty</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Trust charter, capital requirements</td></tr>
</table>

---

## Question 3: What licenses apply in each jurisdiction?

**Guidance:** MT vs EMI vs PSP vs VASP — know the distinctions

### License Type Definitions

**Money Transmitter (MT) — United States**
- State-by-state licensing required (each state has different rules)
- Federal registration with FinCEN as MSB
- Focus: Movement of money, AML compliance

**E-Money Institution (EMI) — European Union**
- EU-wide license under Electronic Money Directive
- Capital requirements (€350K minimum)
- Can passport across EU member states

**Payment Service Provider (PSP) — Various**
- Broader category for payment facilitation
- Requirements vary significantly by jurisdiction

**Virtual Asset Service Provider (VASP) — FATF Framework**
- FATF-defined category for crypto-related services
- Exchange, transfer, custody, participation in offerings
- Travel Rule compliance required

### UAE-Specific Framework

<table class="w-full border-collapse my-4">
<tr class="bg-slate-700"><th class="border border-slate-600 px-3 py-2 text-white">Regulator</th><th class="border border-slate-600 px-3 py-2 text-white">Jurisdiction</th><th class="border border-slate-600 px-3 py-2 text-white">Key Framework</th></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800">CBUAE</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Onshore UAE</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Payment Token Services Regulation (2024)</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800">DFSA</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">DIFC (Dubai)</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Fiat Crypto Token Recognition Regime</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800">FSRA</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">ADGM (Abu Dhabi)</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Virtual Asset Framework</td></tr>
</table>

> **Key Point:** UAE has three distinct regulatory zones — understanding which regulator applies to which geography is essential for any UAE engagement.`,
        exercise: {
          title: 'Exercise 6.2 — Classification Challenge',
          prompt: `A DFSA official asks: "I've heard Sphere called a crypto company, a payment processor, and a money transmitter. What exactly are you?"

Write a precise 2-minute response that:
1. States what Sphere IS (with specific regulatory credentials)
2. States what Sphere is NOT (and why each distinction matters)
3. Explains why this classification is relevant to DFSA`,
          criteria: ['States MSB registration', 'Lists what Sphere is NOT', 'Explains regulatory relevance', 'No category drift', 'DFSA-specific context']
        },
        quiz: [
          { q: "What is Sphere registered as with FinCEN?", options: ["Exchange", "Custodian", "MSB (Money Services Business)", "Bank"], correct: 2 },
          { q: "Which UAE regulator oversees DIFC?", options: ["CBUAE", "DFSA", "FSRA", "SEC"], correct: 1 },
          { q: "What is Sphere NOT?", options: ["Payment processor", "MSB", "Stablecoin issuer", "B2B infrastructure"], correct: 2 }
        ]
      },
      {
        id: 'p6s3',
        title: 'Section 3: Licensing & Regulatory View (Q4-5)',
        curriculum: {
          objectives: [
            'Distinguish direct licensing from partner coverage',
            'Never overclaim regulatory status',
            'Understand how different regulators view Sphere'
          ],
          keyConcepts: [
            'Alignment ≠ Approval — never conflate these',
            'Be honest about direct vs partner licensing',
            'Each jurisdiction has different priorities'
          ]
        },
        learn: `## Question 4: Does licensing match market claims?

**Guidance:** Where directly licensed vs partnered vs claims exceed footprint

### Sphere's Current Licensing Status

**Directly Licensed:**
- FinCEN MSB Registration — Federal US
- Multiple state Money Transmitter Licenses — US
- SOC 2 Type II certification
- ISO 27001 certification

**Partner/Network Coverage:**
- 27 regulated entities across 18 jurisdictions via partner network
- MSB network for corridor coverage
- Banking partners for fiat rails

**Expansion Pipeline:**
- VASP licenses in LatAm and Asia (in progress)
- UAE licensing (evaluating CBUAE, DFSA, FSRA options)

### How to Discuss Coverage Honestly

✅ **Correct Framing:**
> "In the US, we hold direct Money Transmitter licenses in [X] states and are registered with FinCEN. For other corridors, we operate through a network of 27 licensed partners across 18 jurisdictions. In UAE specifically, we're in the process of evaluating the appropriate licensing path."

⚠️ **Never Do This:**
- Never claim "global coverage" or "licensed everywhere"
- Never imply direct licensing where you operate through partners
- Never say "fully compliant" — compliance is an ongoing process, not a status

---

## Question 5: How would global regulators view Sphere?

**Guidance:** US, UK, EU, Singapore, UAE expectations — alignment is not approval

### Understanding Regulatory Perspectives

**United States (FinCEN, State Regulators)**
- Primary focus: AML/BSA compliance, consumer protection
- Concern: Money laundering, sanctions evasion
- Sphere alignment: MSB registration, state licenses, SAR filing procedures

**European Union (Under MiCA)**
- Primary focus: Consumer protection, systemic risk, 1:1 reserve requirements
- Concern: Stablecoin stability, market integrity
- Sphere alignment: We use regulated stablecoins (USDC), not issue our own

**United Kingdom (FCA)**
- Primary focus: Consumer protection, financial crime prevention
- Concern: Crypto promotions, custody arrangements
- Sphere alignment: B2B focus (not retail), clear custody arrangements

**Singapore (MAS)**
- Primary focus: Innovation-friendly but strict on consumer risk
- Concern: Retail exposure, leverage, DeFi risks
- Sphere alignment: Institutional focus, no retail exposure

**UAE (CBUAE, DFSA, FSRA)**
- Primary focus: Attracting fintech while managing systemic risk
- Concern: AED stability, banking disintermediation, compliance rigor
- Sphere alignment: Compliance-native approach, preventative controls

> ⚠️ **Critical Distinction:** Alignment is NOT approval. You can say "our approach aligns with regulatory expectations" but never say "regulators approve of us" unless you have explicit written approval.`,
        exercise: {
          title: 'Exercise 6.3 — Licensing Honesty Test',
          prompt: `A potential partner asks: "Are you licensed to operate in Europe, UAE, and Singapore?"

Write a response that is:
1. Completely honest about current licensing status
2. Clear about direct vs partner coverage
3. Specific about expansion plans without overpromising

Do NOT use words like "global coverage" or "fully compliant."`,
          criteria: ['Distinguishes direct vs partner licensing', 'Honest about current status', 'Specific expansion details', 'No overclaiming', 'No "fully compliant" language']
        },
        quiz: [
          { q: "What phrase should you NEVER use about regulatory status?", options: ["Registered with FinCEN", "Licensed in X states", "Fully compliant", "Working toward compliance"], correct: 2 },
          { q: "How many regulated entities does Sphere's partner network include?", options: ["10 across 5 jurisdictions", "27 across 18 jurisdictions", "50 across 30 jurisdictions", "100+ globally"], correct: 1 },
          { q: "What is the difference between alignment and approval?", options: ["They're the same thing", "Alignment means you follow best practices; approval means explicit regulatory endorsement", "Approval is weaker than alignment", "Neither matters"], correct: 1 }
        ]
      },
      {
        id: 'p6s4',
        title: 'Section 4: Custody & Operations (Q6-9)',
        curriculum: {
          objectives: [
            'Explain custody arrangements precisely',
            'Distinguish legal from technical receipt',
            'Address insolvency and reconciliation concerns'
          ],
          keyConcepts: [
            'Custody is the #1 institutional concern',
            'Legal receipt ≠ Technical receipt',
            'Segregation protects but doesn\'t guarantee'
          ]
        },
        learn: `## Question 6: Who holds customer funds?

**Guidance:** Fiat custody, stablecoin custody, segregation

### Fiat Custody
- Customer fiat held at regulated banking partners
- Segregated from Sphere operational accounts
- Banks: US-regulated banks for USD
- Jurisdictions: Matched to currency corridors

### Stablecoin Custody
- During processing: Held in Sphere-controlled wallets
- Private keys: Secured via institutional custody solution
- Not held long-term: Stablecoins are transit instruments, not stored assets
- Typical hold time: Minutes to hours, not days

### Segregation Practices
- Customer funds NEVER commingled with operational funds
- Separate accounts for each purpose
- Regular reconciliation
- Audited via SOC 2 Type II

**Sample Response:**
> "For fiat, customer funds are held at our regulated banking partners in segregated accounts — never commingled with Sphere's operational capital. For stablecoins, during the brief processing window, they're held in institutionally-secured wallets. The key point is that stablecoins are transit instruments for us — typical hold time is minutes, not days. We're not a custodian; we're payment infrastructure."

---

## Question 7: When are funds "received"?

**Guidance:** Legal vs technical receipt, liability allocation

### The Critical Distinction

**Technical Receipt:**
- When: Transaction appears in our system
- What it means: We see the payment instruction
- Liability: Has NOT transferred yet
- Risk: Payment could still fail

**Legal Receipt:**
- When: Funds are irrevocably credited and available
- What it means: We have legal control of funds
- Liability: Has transferred to us
- Risk: Now ours until we complete the payment

### Why the Gap Matters
- Technical receipt ≠ Legal receipt
- Example: ACH payment shows in system (technical) but can be reversed for 60 days
- Example: Wire shows in system but bank hasn't released funds
- Liability allocation depends on LEGAL receipt, not technical

---

## Question 8: Are clients protected during insolvency?

**Guidance:** Safeguarding mechanisms, recovery paths

### Safeguarding Mechanisms

**Fund Segregation:**
- Customer funds held separately from operational funds
- Cannot be used for Sphere operations or investments
- Protected from Sphere's creditors in bankruptcy

**Regulatory Framework:**
- MSB regulations require customer fund protection
- State MT laws include safeguarding requirements
- Surety bonds required in many states

**Honest Limitations:**
> "Our safeguarding measures are designed to protect customer funds, but any insolvency involves legal proceedings and I can't guarantee specific outcomes. What I can tell you is that segregated funds should not be available to general creditors."

---

## Question 9: Can Sphere survive reconciliation failures?

**Guidance:** Fiat vs on-chain reconciliation, escalation paths

### Understanding Reconciliation Risk

Every transaction touches multiple systems that must reconcile:
1. Client's bank account (fiat source)
2. Sphere's bank ledger (fiat received)
3. Blockchain state (stablecoin)
4. Destination bank account (fiat delivered)

All four must match. Temporary divergence is normal; permanent divergence is a failure.

### Escalation Framework

<table class="w-full border-collapse my-4">
<tr class="bg-slate-700"><th class="border border-slate-600 px-3 py-2 text-white">Step</th><th class="border border-slate-600 px-3 py-2 text-white">Action</th><th class="border border-slate-600 px-3 py-2 text-white">Owner</th></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center">1</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Automatic flagging of discrepancy</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">System/Monitoring</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center">2</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Transaction hold (if in progress)</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Operations</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center">3</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Root cause investigation</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Operations + Engineering</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center">4</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Manual reconciliation if needed</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Finance + Operations</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center">5</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Client communication (if affected)</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Client Success</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-center">6</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Resolution and documentation</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">All + Compliance</td></tr>
</table>`,
        exercise: {
          title: 'Exercise 6.4 — Custody Deep Dive',
          prompt: `A UAE Central Bank official asks questions 6, 7, 8, and 9 in sequence. Answer each:

Q6: "Who holds customer funds?"
Q7: "When are funds legally received?"
Q8: "Are clients protected during insolvency?"
Q9: "Can Sphere survive reconciliation failures?"

Be precise, honest, and acknowledge limitations where appropriate.`,
          criteria: ['Explains custody clearly (Q6)', 'Distinguishes legal vs technical receipt (Q7)', 'Honest about insolvency limitations (Q8)', 'Describes escalation process (Q9)']
        },
        quiz: [
          { q: "What is the typical stablecoin hold time for Sphere?", options: ["Days", "Weeks", "Minutes to hours", "Permanent"], correct: 2 },
          { q: "What is the difference between technical and legal receipt?", options: ["They're the same", "Technical = appears in system; Legal = irrevocably credited", "Legal comes before technical", "Only legal receipt matters"], correct: 1 },
          { q: "How many systems must reconcile for each transaction?", options: ["2", "3", "4", "5"], correct: 2 }
        ]
      },
      {
        id: 'p6s5',
        title: 'Section 5: Stress & Incidents (Q10-12)',
        curriculum: {
          objectives: [
            'Explain incident response framework',
            'Clarify guarantees vs best-efforts',
            'Describe liquidity management approach'
          ],
          keyConcepts: [
            'Client communication within 1 hour of incident',
            'Clear reimbursement conditions',
            'No absolute guarantees — be honest'
          ]
        },
        learn: `## Question 10: Incident response & reimbursement?

**Guidance:** Who communicates, who pays, under what conditions

### Incident Response Framework

<table class="w-full border-collapse my-4">
<tr class="bg-slate-700"><th class="border border-slate-600 px-3 py-2 text-white">Phase</th><th class="border border-slate-600 px-3 py-2 text-white">Actions</th><th class="border border-slate-600 px-3 py-2 text-white">Timeline</th></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800">Detection</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Identify and classify incident</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Immediate</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800">Containment</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Limit scope, prevent spread</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Minutes</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-bold text-amber-400">Communication</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-bold text-amber-400">Notify affected clients</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-bold text-amber-400">Within 1 hour</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800">Investigation</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Root cause analysis</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Hours to days</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800">Resolution</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Fix issue, restore service</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">ASAP</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800">Post-Mortem</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Document learnings, prevent recurrence</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Within 1 week</td></tr>
</table>

### Reimbursement Framework

**When Sphere Pays:**
- Sphere system failure causing loss
- Error in Sphere's processing
- Security breach on Sphere's side

**When Sphere Does NOT Pay:**
- Client-side errors (wrong beneficiary details)
- Third-party failures (banking partner issues)
- Market movements (FX changes during processing)
- Force majeure events

---

## Question 11: Uptime, finality, FX guarantees under stress?

**Guidance:** Guarantees vs best-efforts, liquidity sourcing

### Guarantees vs Best-Efforts

<table class="w-full border-collapse my-4">
<tr class="bg-slate-700"><th class="border border-slate-600 px-3 py-2 text-white">Guarantee</th><th class="border border-slate-600 px-3 py-2 text-white">Best-Efforts</th></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Legally binding commitment</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Will attempt but not legally bound</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Sphere bears rate movement risk</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Risk allocation varies by contract</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Higher pricing to cover risk</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Lower pricing, client shares risk</td></tr>
</table>

### What Sphere Offers

**Uptime:** Target 99.9% availability with redundant systems and failover

**Settlement Finality:** Clear definition of when settlement is final, different timelines by payment method

**FX Rates:** Real-time execution minimizes exposure window, rate locks available for specified windows

> ⚠️ **Be Clear About Limits:** "We target 99.9% uptime and have redundant systems, but I won't promise 100% — no one can. Our SLA specifies remedies if we fall below target."

---

## Question 12: Liquidity management across corridors?

**Guidance:** Prefunding vs dynamic, stress scenarios

### Traditional vs Sphere Model

<table class="w-full border-collapse my-4">
<tr class="bg-slate-700"><th class="border border-slate-600 px-3 py-2 text-white">Correspondent Banking (1.0)</th><th class="border border-slate-600 px-3 py-2 text-white">SpherePay (2.0)</th></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Prefund nostro accounts in each currency</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Real-time settlement, no prefunding required</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Capital trapped across jurisdictions</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Dynamic liquidity via MSB network</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">95% of revenue to opex (e.g., Wise)</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Significantly lower operational costs</td></tr>
</table>

### Stress Scenarios We Plan For

- **Mass Redemption:** Large clients request same-day settlement simultaneously
- **Stablecoin Depeg:** Primary stablecoin trades below peg
- **Banking Partner Failure:** Key banking partner experiences outage
- **Market Volatility:** Sudden FX rate movement in key corridor`,
        exercise: {
          title: 'Exercise 6.5 — Stress Test Response',
          prompt: `It's 2 AM and three things happen simultaneously:
1. Your primary banking partner has a system outage
2. USDC briefly trades at $0.97
3. A major client has $47M in-flight

Write your response as if you're the on-call operations lead. Include:
- Immediate actions for each issue
- Client communication approach
- Escalation decisions`,
          criteria: ['Addresses banking outage', 'Addresses depeg scenario', 'Prioritizes in-flight transaction', 'Clear communication plan', 'Appropriate escalation']
        },
        quiz: [
          { q: "How quickly must clients be notified of an incident?", options: ["Immediately", "Within 1 hour", "Within 24 hours", "Within 1 week"], correct: 1 },
          { q: "When does Sphere NOT reimburse?", options: ["System failures", "Client-side errors", "Security breaches", "Processing errors"], correct: 1 },
          { q: "What uptime does Sphere target?", options: ["100%", "99.99%", "99.9%", "99%"], correct: 2 }
        ]
      },
      {
        id: 'p6s6',
        title: 'Section 6: Governance (Q13-15)',
        curriculum: {
          objectives: [
            'Explain compliance team empowerment',
            'Present board credibility',
            'Describe AML/KYC framework'
          ],
          keyConcepts: [
            'Compliance can and does veto transactions',
            'CCO with 50+ MTL acquisitions',
            'Compliance-native = preventative, not reactive'
          ]
        },
        learn: `## Question 13: Risk, compliance, legal team empowerment?

**Guidance:** Reporting lines, independence, veto power

### Key Questions to Answer

**Independence:**
- Does compliance report directly to CEO/Board (not just business units)?
- Can compliance escalate concerns without business interference?
- Is there clear separation between revenue and compliance decisions?

**Authority:**
- Can compliance veto transactions?
- Can compliance halt products/features for review?
- Are compliance concerns documented and addressed?

**Resources:**
- Is compliance team appropriately staffed?
- Does compliance have budget for tools and training?
- Is there investment in compliance technology?

### Sphere's Compliance Structure
- CCO: Scott Butler — 20+ years banking compliance experience
- Direct board access for escalation
- Compliance can and does veto transactions
- Regular compliance committee meetings
- Independent audit and testing

**Sample Response:**
> "Our CCO reports directly to the CEO and has independent board access. Compliance has explicit veto authority over transactions and product launches. We've exercised that authority — we've declined customers and halted features based on compliance concerns. The team is resourced to do their job, not understaffed as a cost center."

---

## Question 14: Board credibility?

**Guidance:** Banking experience, regulatory relationships, independence

### Sphere Leadership Highlights

<table class="w-full border-collapse my-4">
<tr class="bg-slate-700"><th class="border border-slate-600 px-3 py-2 text-white">Role</th><th class="border border-slate-600 px-3 py-2 text-white">Person</th><th class="border border-slate-600 px-3 py-2 text-white">Background</th></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-bold">CEO</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Arnold Lee</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Co-founded Sphere, scaled to $1B+ volume, previously Google</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-bold">CCO</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Scott Butler</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">20+ years banking compliance at Deutsche Bank, Meta, Fiant. Acquired 50+ MTLs</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-bold">Head of Finance</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Richard Nguyen</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Built finance at TRM, sold Looker to Google for $2.6B</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-bold">VP Engineering</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Mike Young</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Led ACH, FedWire, and core banking at Synapse</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 font-bold">Advisors</td><td class="border border-slate-600 px-3 py-2 bg-slate-800">Nick Passarelli, Rebecca Rettig</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">CCO of Brex, GC of Polygon</td></tr>
</table>

### Key Credibility Points
- CCO with 50+ MTL acquisitions — understands licensing deeply
- Engineering leadership from core banking (ACH, FedWire)
- Finance leadership from compliance-focused companies (TRM)
- Advisors with institutional credibility (Brex CCO)

---

## Question 15: AML/KYC framework?

**Guidance:** Risk-based approach, ongoing monitoring, compliance-native enforcement

### Core AML/KYC Principles

**Risk-Based Approach:**
- Not one-size-fits-all — controls calibrated to risk
- Customer risk assessment (high/medium/low)
- Enhanced due diligence for high-risk customers
- Periodic review and re-assessment

**KYC vs KYB:**

<table class="w-full border-collapse my-4">
<tr class="bg-slate-700"><th class="border border-slate-600 px-3 py-2 text-white">KYC (Know Your Customer)</th><th class="border border-slate-600 px-3 py-2 text-white">KYB (Know Your Business)</th></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Individual identity verification</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Business entity verification</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">ID documents, address proof</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Registration, ownership, UBOs</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Personal risk assessment</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Business activity assessment</td></tr>
</table>

### Sphere's Compliance-Native Approach

<table class="w-full border-collapse my-4">
<tr class="bg-slate-700"><th class="border border-slate-600 px-3 py-2 text-red-400">Traditional (Reactive)</th><th class="border border-slate-600 px-3 py-2 text-emerald-400">SphereNet (Preventative)</th></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Compliance happens AFTER transaction</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Compliance enforced BEFORE settlement</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Risk discovered post-facto</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Risk prevented at execution</td></tr>
<tr><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Compliance: bolted on</td><td class="border border-slate-600 px-3 py-2 bg-slate-800 text-gray-300">Compliance: built in</td></tr>
</table>

**Sample Response:**
> "Our AML/KYC framework is risk-based — we don't apply the same controls to every customer. High-risk customers get enhanced due diligence. We screen against OFAC, UN, and EU sanctions lists in real-time. What makes Sphere different is that we're compliance-native: policy enforcement happens before settlement, not after. We catch issues before money moves, not after we have to claw it back."`,
        exercise: {
          title: 'Exercise 6.6 — Governance Presentation',
          prompt: `A skeptical bank CRO says: "Every crypto company claims to be compliant. What's actually different about Sphere's governance and AML approach?"

Write a 3-minute response that covers:
1. Leadership credibility (specific names and backgrounds)
2. Compliance team empowerment (independence and authority)
3. AML/KYC approach (preventative vs reactive)

Include at least one concrete example of compliance exercising veto authority.`,
          criteria: ['Names specific leaders with backgrounds', 'Explains compliance independence', 'Describes veto authority with example', 'Contrasts preventative vs reactive', 'Avoids generic claims']
        },
        quiz: [
          { q: "How many MTLs has CCO Scott Butler acquired in his career?", options: ["10+", "25+", "50+", "100+"], correct: 2 },
          { q: "What is the key difference between Sphere's compliance approach and traditional?", options: ["More staff", "Preventative vs reactive", "Better technology", "Lower cost"], correct: 1 },
          { q: "Can Sphere's compliance team veto transactions?", options: ["No, only flag them", "Yes, and they have exercised it", "Only with CEO approval", "Only for large amounts"], correct: 1 }
        ]
      }
    ],
    masterQuiz: {
      title: 'Pillar 6 Mastery Assessment',
      description: 'The ultimate test: demonstrate you can answer all 15 compliance questions without hand-waving.',
      scenario: `**Scenario: The Board Due Diligence**

You're in day two of a rigorous due diligence process with Emirates NBD's risk and compliance committee. They're evaluating Sphere for a strategic partnership.

The Chief Risk Officer opens: "Yesterday we covered the basics. Today I want to stress-test your answers. I'm going to ask rapid-fire questions covering your value proposition, regulatory status, custody, operations under stress, and governance. I expect precise answers. Vague responses will end this process."

She has 15 questions prepared — one for each area UAE banks care about most.`,
      questions: [
        {
          type: 'application',
          question: 'Question 1: "Your competitors pitch blockchain benefits. Give me your value proposition without using any crypto terminology." Deliver your response.',
          rubric: ['Zero crypto/blockchain jargon', 'Mentions faster settlement', 'Mentions capital efficiency', 'Mentions stronger compliance', 'Specific metrics if possible']
        },
        {
          type: 'multiple_choice',
          question: 'Question 2: What is Sphere\'s primary regulatory classification?',
          options: ['Cryptocurrency Exchange', 'Money Services Business (MSB)', 'Bank', 'Custodian'],
          correct: 1,
          explanation: 'Sphere is an MSB registered with FinCEN and holds multiple state Money Transmitter licenses.'
        },
        {
          type: 'analysis',
          question: 'Questions 6-8 combined: "Walk me through your custody arrangements, when you consider funds legally received, and what happens to my money if Sphere goes bankrupt." Answer all three clearly.',
          rubric: ['Explains fiat and stablecoin custody separately', 'Distinguishes legal from technical receipt', 'Describes safeguarding and segregation', 'Acknowledges limitations honestly', 'Professional tone throughout']
        },
        {
          type: 'multiple_choice',
          question: 'Question 13: Who does Sphere\'s CCO report to?',
          options: ['Head of Business', 'CFO', 'CEO with direct board access', 'External compliance firm'],
          correct: 2,
          explanation: 'The CCO reports directly to the CEO and has independent board access for escalation.'
        },
        {
          type: 'application',
          question: 'Question 15: "Every crypto company claims to be AML compliant. Explain specifically how Sphere\'s approach is different from competitors who monitor after the fact." Be specific and contrast approaches.',
          rubric: ['Explains compliance-native concept', 'Contrasts preventative vs reactive clearly', 'Mentions policy enforcement before settlement', 'Provides specific example or mechanism', 'Avoids generic compliance claims']
        }
      ],
      passingScore: 70
    }
  },

  // ========== FINAL CERTIFICATION EXAM ==========
  {
    id: 'final-exam',
    title: 'Final Certification Exam',
    shortTitle: 'Final Exam',
    color: 'purple',
    overview: `**🎓 Final Certification Exam**

This comprehensive exam tests your mastery across ALL six pillars of the Sphere Training Program.

**What to Expect:**

• 20 questions covering all pillars

• Mix of multiple choice and written responses

• AI-powered evaluation of written answers

• Passing score: 80%

• Time estimate: 45-60 minutes

**Prerequisites:**

• Complete all 6 pillar mastery assessments

• Review any sections where you scored below 80%

• Have the glossary available for reference

**Upon Passing:**

You will be certified as ready for UAE counterparty engagement.`,
    sections: [
      {
        id: 'final-intro',
        title: 'Exam Instructions',
        curriculum: {
          objectives: [
            'Understand exam format and expectations',
            'Review key concepts from all pillars',
            'Prepare for comprehensive evaluation'
          ],
          keyConcepts: [
            '20 questions across all 6 pillars',
            '80% passing score required',
            'Written responses evaluated by AI'
          ]
        },
        learn: `## Final Certification Exam Instructions

### Exam Format

This exam consists of 20 questions that comprehensively test your knowledge across all six pillars:

| Pillar | Questions | Topics |
|--------|-----------|--------|
| Pillar 1: Payments | 3 | Settlement, messaging vs money, finality |
| Pillar 2: Stablecoins | 3 | Reserve composition, risks, macro implications |
| Pillar 3: Compliance | 4 | Classification, UAE regulators, custody |
| Pillar 4: Governance | 3 | Reconciliation, liquidity, incident response |
| Pillar 5: Sphere | 3 | SpherePay, SphereNet, competitive positioning |
| Pillar 6: 15 Questions | 4 | Value prop, operations, governance answers |

### Question Types

**Multiple Choice (12 questions)**
- Select the best answer
- Scored automatically

**Written Response (8 questions)**
- Provide detailed answers
- AI evaluates against rubric criteria
- Scored 0-10 per question

### Scoring

- Multiple Choice: 48 points possible (4 points each)
- Written Responses: 80 points possible (10 points each)
- Total: 128 points
- **Passing: 80% (102+ points)**

### Tips for Success

1. **Read carefully** — Many wrong answers are "almost right"
2. **Use precise language** — Avoid vague terms like "secure" or "fast"
3. **Show your reasoning** — For written questions, explain WHY
4. **Avoid crypto jargon** — Frame everything in traditional finance terms
5. **Be specific** — Use actual metrics, names, and frameworks

### Ready?

When you're prepared, proceed to the exam. You can navigate between questions, but once submitted, your answers are final.

**Good luck!**`,
        exercise: {
          title: 'Pre-Exam Checklist',
          prompt: `Before taking the final exam, confirm you've completed this checklist:

• Have you completed all 6 pillar mastery assessments?

• Did you score 70%+ on each pillar assessment?

• Can you explain settlement finality without using "blockchain"?

• Can you name the 3 UAE regulatory zones and their regulators?

• Can you deliver the 7-step pitch from memory?

• Have you reviewed the glossary and key terminology?

• Are you ready for AI-evaluated written responses?`,
          criteria: []
        },
        quiz: []
      }
    ],
    masterQuiz: {
      title: 'Final Certification Exam',
      description: 'Comprehensive assessment across all 6 pillars. Passing score: 80%.',
      scenario: `**Scenario: UAE Central Bank Partnership Evaluation**

You are the lead Sphere representative in a critical meeting with the UAE Central Bank's Financial Infrastructure Division. They are evaluating Sphere for potential integration into the UAE's cross-border payment infrastructure.

Present are:
- **Dr. Fatima Al-Rashid** — Director of Payment Systems Oversight
- **Ahmed Hassan** — Head of Compliance & Risk Assessment  
- **Sarah Chen** — Technical Infrastructure Specialist
- **James Morrison** — External Advisor (Former SWIFT executive)

They have allocated 90 minutes and have prepared pointed questions across all areas. Your answers will determine whether Sphere advances to the technical evaluation phase.

The stakes are high: This partnership could establish Sphere as a key infrastructure provider for UAE-Asia payment corridors.`,
      questions: [
        // PILLAR 1: PAYMENTS (3 questions)
        {
          type: 'multiple_choice',
          question: 'Dr. Al-Rashid asks: "When we say a payment has settled, what legally distinguishes that from clearing?" What is the correct answer?',
          options: [
            'Settlement is faster than clearing',
            'Settlement is when the message is delivered; clearing is when funds move',
            'Settlement is irrevocable discharge of obligation; clearing is agreement on obligations',
            'They are the same thing in modern payment systems'
          ],
          correct: 2,
          explanation: 'Settlement is the irrevocable discharge of obligation, while clearing is the process of agreeing on what obligations exist. Risk remains until settlement.'
        },
        {
          type: 'analysis',
          question: 'Mr. Morrison states: "I spent 20 years at SWIFT. Explain to me precisely why a SWIFT MT103 confirmation does NOT mean the payment has settled, and what risks remain after that confirmation." Provide a detailed response.',
          rubric: ['Distinguishes messaging from settlement', 'Explains SWIFT only delivers instructions', 'Identifies specific risks (compliance holds, funding, beneficiary verification)', 'Mentions settlement happens on local rails (RTGS)', 'Professional tone appropriate for SWIFT executive']
        },
        {
          type: 'multiple_choice',
          question: 'Ms. Chen asks: "In a correspondent banking payment from UAE to Singapore, at which point does risk transfer from the sending bank?" Select the correct answer.',
          options: [
            'When the SWIFT message is sent',
            'When the correspondent bank acknowledges receipt',
            'When final settlement occurs on the destination RTGS',
            'When the beneficiary bank credits the customer'
          ],
          correct: 2,
          explanation: 'Risk remains with the sending bank until final settlement on the destination country\'s RTGS system. Earlier confirmations are only messages.'
        },

        // PILLAR 2: STABLECOINS (3 questions)
        {
          type: 'analysis',
          question: 'Dr. Al-Rashid says: "Explain stablecoins to me as if I\'ve never heard of cryptocurrency. What are they, how are they backed, and why should a central banker care about reserve composition?" Answer without using crypto jargon.',
          rubric: ['Defines stablecoins as tokenized dollar claims', 'Explains reserve composition (T-bills, cash, repo)', 'Distinguishes major issuers (Tether, Circle)', 'Explains why reserve quality matters for redemption', 'Zero crypto jargon throughout']
        },
        {
          type: 'multiple_choice',
          question: 'Mr. Hassan asks about stablecoin risks: "What is the PRIMARY systemic risk of large-scale stablecoin adoption?" What is the correct answer?',
          options: [
            'Price volatility of the underlying tokens',
            'Cyber attacks on blockchain networks',
            'Mass redemption pressure on short-term Treasury markets',
            'Competition with traditional banks'
          ],
          correct: 2,
          explanation: 'At scale, mass redemption of stablecoins could force rapid liquidation of T-bill holdings, potentially destabilizing short-term funding markets.'
        },
        {
          type: 'multiple_choice',
          question: 'Dr. Al-Rashid asks: "Why doesn\'t issuer safety equal system safety for stablecoins?" Select the best explanation.',
          options: [
            'Issuers can still be hacked even if financially sound',
            'Even a well-reserved stablecoin can cause market disruption through mass redemption dynamics',
            'Regulators don\'t trust any crypto companies',
            'The technology is too new to be considered safe'
          ],
          correct: 1,
          explanation: 'Even a perfectly reserved stablecoin can trigger systemic issues through mass redemption dynamics, fire sales, and contagion effects.'
        },

        // PILLAR 3: COMPLIANCE (4 questions)
        {
          type: 'multiple_choice',
          question: 'Mr. Hassan asks: "What is Sphere\'s regulatory classification, and what licenses does it hold?" Select the accurate answer.',
          options: [
            'Bank holding company with Federal Reserve oversight',
            'Money Services Business (MSB) with FinCEN registration and state MT licenses',
            'Virtual Asset Service Provider (VASP) under EU MiCA',
            'Electronic Money Institution (EMI) under UK FCA'
          ],
          correct: 1,
          explanation: 'Sphere is registered as an MSB with FinCEN and holds multiple state Money Transmitter licenses. It is NOT a bank, EMI, or VASP.'
        },
        {
          type: 'analysis',
          question: 'Mr. Hassan continues: "Walk me through the three UAE regulatory zones and their respective regulators. For each, explain what type of entity would be licensed there and how Sphere would potentially interact." Provide a comprehensive answer.',
          rubric: ['Correctly names all three zones (Onshore, DIFC, ADGM)', 'Identifies correct regulators (CBUAE, DFSA, FSRA)', 'Explains entity types for each zone', 'Describes Sphere\'s potential licensing pathway', 'Demonstrates understanding of zone differences']
        },
        {
          type: 'multiple_choice',
          question: 'Dr. Al-Rashid asks: "At what point does Sphere consider funds legally received versus technically received?" What is the correct distinction?',
          options: [
            'They are the same — funds are received when they arrive',
            'Legal receipt requires both technical receipt AND compliance verification completion',
            'Legal receipt is when the customer sees the balance; technical is when Sphere sees it',
            'Technical receipt is for crypto; legal receipt is for fiat'
          ],
          correct: 1,
          explanation: 'Legal receipt requires both the technical arrival of funds AND completion of compliance verification. Funds may be technically present but not legally available.'
        },
        {
          type: 'multiple_choice',
          question: 'Mr. Hassan asks: "If Sphere becomes insolvent, what happens to customer funds?" Select the most accurate answer.',
          options: [
            'Funds are fully protected by FDIC insurance',
            'Funds are segregated and safeguarded per state MT requirements, but not bankruptcy-remote',
            'Funds would be frozen indefinitely',
            'Funds are automatically transferred to a backup custodian'
          ],
          correct: 1,
          explanation: 'Customer funds are segregated and safeguarded per state requirements, but this is not full bankruptcy remoteness. Customers may face delays in insolvency proceedings.'
        },

        // PILLAR 4: GOVERNANCE (3 questions)
        {
          type: 'analysis',
          question: 'Ms. Chen asks: "Explain your reconciliation process. What happens when fiat records and on-chain records diverge? How quickly is this detected and what is the resolution process?" Provide operational detail.',
          rubric: ['Explains four systems that must reconcile', 'Distinguishes temporary vs permanent divergence', 'Describes detection timeframe', 'Outlines escalation and resolution process', 'Demonstrates operational maturity']
        },
        {
          type: 'multiple_choice',
          question: 'Mr. Hassan asks: "Who does your Chief Compliance Officer report to, and do they have independent board access?" What is the correct answer?',
          options: [
            'Reports to CFO, no direct board access',
            'Reports to General Counsel, board access through legal',
            'Reports to CEO with independent board access for escalation',
            'Reports to external compliance committee'
          ],
          correct: 2,
          explanation: 'The CCO reports directly to the CEO and has independent board access for escalation, ensuring compliance independence.'
        },
        {
          type: 'multiple_choice',
          question: 'Dr. Al-Rashid asks about stress scenarios: "What happens to my payment if your primary stablecoin issuer depegs 5% during transit?" Select the best answer.',
          options: [
            'The payment automatically cancels and funds return',
            'Sphere absorbs the loss entirely',
            'The recipient receives 5% less',
            'Depends on contractual terms — may involve risk sharing, transaction pause, or alternative routing'
          ],
          correct: 3,
          explanation: 'The response depends on contractual arrangements. Honest answer acknowledges this complexity rather than making guarantees.'
        },

        // PILLAR 5: SPHERE (3 questions)
        {
          type: 'analysis',
          question: 'Dr. Al-Rashid says: "Every company claims to be different. Give me SpherePay\'s value proposition in 60 seconds, using only traditional finance language. I want specific metrics." Deliver your pitch.',
          rubric: ['Zero crypto/blockchain jargon', 'Mentions specific metrics ($2.5B volume, 15-30 min settlement)', 'Covers faster settlement, capital efficiency, compliance', 'Contrasts with correspondent banking clearly', 'Confident, professional delivery']
        },
        {
          type: 'multiple_choice',
          question: 'Ms. Chen asks: "What is SphereNet and why can\'t you just use Solana or Ethereum?" Select the best answer.',
          options: [
            'SphereNet is faster than Solana',
            'SphereNet has lower fees than Ethereum',
            'SphereNet embeds compliance at the protocol level — existing chains have reactive, not preventative controls',
            'SphereNet is more decentralized'
          ],
          correct: 2,
          explanation: 'SphereNet\'s key differentiation is compliance-native architecture with preventative controls, not speed or cost.'
        },
        {
          type: 'multiple_choice',
          question: 'Mr. Morrison asks: "How is Sphere different from Ripple, which has been selling to banks for years?" Select the most accurate differentiation.',
          options: [
            'Sphere is faster than Ripple',
            'Sphere is cheaper than Ripple',
            'Sphere targets fintechs with compliance-native infrastructure; Ripple targets banks with a proprietary token model',
            'Sphere has more customers than Ripple'
          ],
          correct: 2,
          explanation: 'Key differentiators are target market (fintechs vs banks) and approach (compliance-native vs token-based).'
        },

        // PILLAR 6: 15 QUESTIONS (4 questions)
        {
          type: 'analysis',
          question: 'Mr. Hassan delivers the ultimate test: "Every crypto company claims to be AML compliant. Explain specifically how Sphere\'s approach differs from competitors who bolt on compliance after the fact. I want technical specifics, not marketing." Provide your answer.',
          rubric: ['Explains compliance-native vs bolt-on difference', 'Describes preventative vs reactive controls', 'Mentions policy enforcement before execution', 'Provides specific technical mechanism', 'Avoids generic compliance claims']
        },
        {
          type: 'analysis',
          question: 'Dr. Al-Rashid asks the final question: "Assume we proceed with a pilot. Walk me through exactly how a $10M payment from a Dubai corporation to a Singapore supplier would flow through your system. Include timing, compliance checkpoints, and settlement finality." Provide end-to-end detail.',
          rubric: ['Describes complete payment flow', 'Identifies all compliance checkpoints', 'Specifies realistic timing', 'Explains when settlement finality occurs', 'Demonstrates operational knowledge']
        },
        {
          type: 'multiple_choice',
          question: 'The panel asks: "What is the single most important thing we should remember about Sphere?" What answer best captures Sphere\'s positioning?',
          options: [
            'We are the fastest payment network',
            'We are the cheapest cross-border solution',
            'We restructure settlement and compliance — speed is the result, not the product',
            'We are a blockchain company that works with banks'
          ],
          correct: 2,
          explanation: 'Sphere\'s core message is infrastructure transformation, not just speed or cost. Speed is an outcome of proper settlement restructuring.'
        },
        {
          type: 'multiple_choice',
          question: 'As the meeting concludes, Mr. Morrison asks: "If I had to summarize Sphere\'s approach in one sentence for my report, what should I write?" Select the best summary.',
          options: [
            '"Sphere is a crypto payments company trying to work with regulators."',
            '"Sphere uses blockchain to make payments faster and cheaper."',
            '"Sphere restructures cross-border settlement through compliance-native infrastructure, using stablecoins as wholesale instruments."',
            '"Sphere is building the next generation of banking technology."'
          ],
          correct: 2,
          explanation: 'This captures the key elements: settlement restructuring, compliance-native approach, and stablecoins as instruments (not ideology).'
        }
      ],
      passingScore: 80
    }
  }
];
