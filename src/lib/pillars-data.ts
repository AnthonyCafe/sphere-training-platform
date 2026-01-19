// Sphere Training Platform - Complete Pillars Data
// Structured learn content for proper React rendering
// Last updated: January 2026

export const pillarsData = [
  // ============================================================================
  // PILLAR 1: PAYMENTS & SETTLEMENT FUNDAMENTALS
  // ============================================================================
  {
    id: 'payments',
    title: 'Pillar 1: Payments & Settlement Fundamentals',
    shortTitle: 'Payments',
    description: 'The non-negotiable foundation. If this pillar is missing, Sphere won\'t make sense.',
    color: 'blue',
    overview: `**Why This Pillar Matters**

If this pillar is missing, Sphere won't make sense.

Sphere does not "move messages faster." It restructures liquidity, settlement coordination, and compliance. If someone doesn't understand traditional payments infrastructure, they will misclassify Sphere immediately.

This pillar ensures you can explain:
- Why cross-border payments are structurally hard (not just "old technology")
- The difference between messages and money
- What settlement finality actually means (legally, not technically)
- Where Sphere fits in the existing infrastructure`,
    sections: [
      {
        id: 'payment-lifecycle',
        title: '1.1 The Payment Lifecycle',
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
        learn: {
          introduction: 'Every payment — whether it\'s $50 on Venmo or $500M between banks — moves through the same three stages. Understanding this lifecycle is non-negotiable for Sphere conversations because we restructure where and how settlement happens.',
          coreQuestion: 'Has money actually moved?',
          sections: [
            {
              title: 'Stage 1: Initiation',
              icon: '📤',
              content: 'A payment instruction is created and sent. Someone says "move money from A to B."',
              details: [
                { label: 'Who controls it', value: 'The sender (payer) and their bank' },
                { label: 'Reversible?', value: 'Yes — easily. Nothing has moved yet.' },
                { label: 'Risk status', value: 'Customer bears the risk' }
              ],
              example: 'You hit "Send" on a wire transfer. Your bank receives the instruction. At this moment, you\'ve initiated — but no money has moved.'
            },
            {
              title: 'Stage 2: Clearing',
              icon: '🔄',
              content: 'The payment instruction is validated, matched, and prepared for settlement. Banks confirm details.',
              details: [
                { label: 'Who controls it', value: 'Payment network (SWIFT, ACH, CHIPS)' },
                { label: 'Reversible?', value: 'Possibly — depends on the system' },
                { label: 'Risk status', value: 'Sending bank now bears risk' }
              ],
              example: 'Your wire goes through SWIFT. SWIFT validates the format, routes to correspondent bank, they confirm the beneficiary.',
              warning: 'A payment can clear successfully and STILL never settle. Clearing is just agreement — not money movement.'
            },
            {
              title: 'Stage 3: Settlement',
              icon: '✅',
              content: 'Actual value moves. Balances change on the ledger that matters — usually the central bank ledger.',
              details: [
                { label: 'Who controls it', value: 'Settlement system (Fedwire, TARGET2)' },
                { label: 'Reversible?', value: 'No. This is finality.' },
                { label: 'Risk status', value: 'Risk is eliminated' }
              ],
              example: 'Fedwire debits Bank A\'s reserve account and credits Bank B\'s. Done. Final. Irrevocable.'
            }
          ],
          table: {
            title: 'The Three Stages at a Glance',
            headers: ['Stage', 'Value Moved?', 'Reversible?', 'Who Bears Risk?'],
            rows: [
              ['Initiation', '❌ No', '✅ Yes, easily', 'Customer'],
              ['Clearing', '❌ No', '⚠️ Possibly', 'Sending bank'],
              ['Settlement', '✅ Yes', '❌ No', 'Risk eliminated']
            ]
          },
          sphereRelevance: {
            title: 'Why This Matters for Sphere',
            points: [
              'Traditional cross-border payments take 2-5 days from initiation to settlement',
              'During that window: sender\'s money is gone, receiver hasn\'t received it, banks carry risk',
              'FX rates can move against you, compliance holds can freeze everything',
              'SpherePay compresses this from days to MINUTES using stablecoins'
            ],
            keyInsight: 'SpherePay\'s value is in the settlement layer — not faster messaging.'
          },
          keyTakeaway: 'A payment can be initiated and cleared WITHOUT being settled. Risk accumulates until settlement occurs.'
        },
        exercise: {
          title: 'Exercise 1.1 — Timeline Mapping',
          prompt: 'Draw a payment timeline with three sections (Initiation → Clearing → Settlement). For each section, answer:\n\n1) Who controls the process?\n2) Is the payment reversible?\n3) Who bears risk?\n4) What systems are involved?\n\nThen explain: Why does understanding this matter for how you position Sphere?',
          criteria: ['Accurate stage descriptions', 'Clear risk attribution', 'Sphere connection']
        },
        quiz: [
          { q: 'At which stage does risk get eliminated in a payment?', options: ['Initiation', 'Clearing', 'Settlement', 'All stages carry equal risk'], correct: 2 },
          { q: 'A payment has cleared but not settled. What is true?', options: ['Money has moved', 'Banks agreed but value hasn\'t transferred', 'Cannot be reversed', 'Customer no longer bears risk'], correct: 1 },
          { q: 'Why is SpherePay\'s value "in the settlement layer"?', options: ['Faster messages than SWIFT', 'Stablecoins compress settlement to minutes', 'Eliminates clearing', 'Bypasses all banks'], correct: 1 }
        ]
      },
      {
        id: 'messages-vs-money',
        title: '1.2 Messages ≠ Money',
        curriculum: {
          objectives: [
            'Distinguish between payment messages and actual money movement',
            'Explain the SWIFT vs Fedwire distinction',
            'Never say "SWIFT moves money" again'
          ],
          keyConcepts: [
            'SWIFT sends messages; Fedwire settles money',
            'Key phrase: "Messages create obligations; settlement discharges them."',
            'A SWIFT ACK only confirms message delivery, NOT settlement'
          ]
        },
        learn: {
          introduction: 'This is where most people — even experienced finance professionals — get it wrong. They confuse the message about a payment with the movement of money. These are completely different things.',
          coreQuestion: 'What actually moves when you send a payment?',
          sections: [
            {
              title: 'SWIFT — The Messaging Network',
              icon: '📨',
              content: 'SWIFT is like a very secure email system for banks. When you send a wire transfer, SWIFT carries the instruction — but doesn\'t move a single dollar.',
              details: [
                { label: 'What it does', value: 'Sends messages' },
                { label: 'What moves', value: 'Information only' },
                { label: 'Finality', value: 'None' },
                { label: 'Operator', value: 'Bank cooperative (global)' }
              ]
            },
            {
              title: 'Fedwire — The Settlement System',
              icon: '🏛️',
              content: 'Fedwire is operated by the Federal Reserve. When Fedwire processes a payment, actual money moves on the Fed\'s master ledger.',
              details: [
                { label: 'What it does', value: 'Settles payments' },
                { label: 'What moves', value: 'Money (real value)' },
                { label: 'Finality', value: 'Final and irrevocable' },
                { label: 'Operator', value: 'Federal Reserve (US only)' }
              ]
            }
          ],
          dangerZone: {
            title: 'The Dangerous Statement',
            statement: '"I got the SWIFT ACK, so we\'re good."',
            reality: [
              { myth: 'Payment went through', truth: 'Message was delivered' },
              { myth: 'Money has moved', truth: 'An instruction was received' },
              { myth: 'We\'re done', truth: 'We\'ve barely started' }
            ],
            whatCanGoWrong: [
              'Compliance holds — AML/sanctions screening flags the transaction',
              'Beneficiary mismatch — Account number doesn\'t match name',
              'Insufficient correspondent balance — Nostro account can\'t cover',
              'Manual review required — Kicks to operations queue',
              'Cut-off time missed — Settlement delayed to next day',
              'Correspondent rejection — They don\'t want the business'
            ]
          },
          keyPhrase: {
            phrase: 'Messages create obligations; settlement discharges them.',
            explanation: 'A SWIFT message creates an obligation between banks. Settlement discharges that obligation by actually moving money.'
          },
          languageGuide: {
            wrong: [
              'SWIFT transfers money',
              'The SWIFT payment arrived'
            ],
            correct: [
              'SWIFT transmits payment instructions',
              'The SWIFT message was delivered; settlement is pending'
            ]
          },
          sphereRelevance: {
            title: 'Why This Matters for Sphere',
            points: [
              'Traditional: SWIFT message → Days of uncertainty → Eventually Fedwire settles',
              'Sphere: Stablecoin transfer → Minutes → Settlement complete',
              'We\'re not making SWIFT faster — we\'re using a different settlement layer entirely'
            ]
          },
          keyTakeaway: 'SWIFT sends messages. Fedwire moves money. Never confuse the two.'
        },
        exercise: {
          title: 'Exercise 1.2 — Message vs Money',
          prompt: 'A colleague says: "The SWIFT payment went through, so we can release the goods."\n\nWrite a response that:\n1) Explains why this assumption is dangerous\n2) Clarifies what SWIFT ACK actually means\n3) Describes what needs to happen for settlement\n4) Recommends what they should verify instead',
          criteria: ['Correct SWIFT understanding', 'Clear settlement explanation', 'Practical recommendation']
        },
        quiz: [
          { q: 'What does SWIFT primarily provide?', options: ['Settlement services', 'Messaging services', 'Currency exchange', 'Liquidity provision'], correct: 1 },
          { q: 'A SWIFT ACK confirms:', options: ['Money has moved', 'Message delivered to next bank', 'Settlement complete', 'Beneficiary received funds'], correct: 1 },
          { q: 'Complete: "Messages create obligations..."', options: ['...messaging confirms them', '...settlement discharges them', '...banks process them', '...compliance approves them'], correct: 1 }
        ]
      },
      {
        id: 'settlement-finality',
        title: '1.3 Settlement Finality',
        curriculum: {
          objectives: [
            'Define settlement finality in legal terms',
            'Explain why blockchain doesn\'t provide legal finality',
            'Contrast technical finality with legal finality'
          ],
          keyConcepts: [
            'Finality = legally irrevocable transfer',
            'Fedwire: immediate finality | Crypto: no legal finality',
            'Finality is defined by LAW, not technology'
          ]
        },
        learn: {
          introduction: 'This is where crypto people get it wrong. Finality is legal, not technical. When we say a payment is "final," we mean the transfer is legally irrevocable.',
          coreQuestion: 'When is a payment truly final?',
          sections: [
            {
              title: 'What Finality Actually Means',
              icon: '⚖️',
              content: 'Finality is a LEGAL property, not a technical one.',
              details: [
                { label: 'Unconditional', value: 'Not dependent on any future event' },
                { label: 'Irrevocable', value: 'Cannot be reversed or unwound' },
                { label: 'Enforceable', value: 'Backed by law and courts' }
              ]
            }
          ],
          table: {
            title: 'Finality by Payment System',
            headers: ['System', 'When Finality Occurs', 'Strength'],
            rows: [
              ['Fedwire (RTGS)', 'Immediately upon processing', '⭐⭐⭐⭐⭐'],
              ['CHIPS', 'Same-day when released', '⭐⭐⭐⭐'],
              ['ACH', '1-2 days (settlement window)', '⭐⭐⭐'],
              ['Card Networks', 'Days later (chargeback window)', '⭐⭐'],
              ['Cryptocurrency', 'Never (probabilistic only)', '⭐']
            ]
          },
          comparison: {
            title: 'Fedwire vs Bitcoin',
            headers: ['Aspect', 'Fedwire', 'Bitcoin'],
            rows: [
              ['Legal framework', 'Federal Reserve Act, UCC 4A', 'None'],
              ['Dispute resolution', 'Courts with precedent', 'Unclear'],
              ['Reversal possible', 'No', '51% attack (theoretical)'],
              ['Definition of "final"', 'Legally defined moment', '"Probably won\'t reverse"']
            ]
          },
          warning: 'When a regulator or bank asks about "finality," they mean LEGAL finality. Saying "it\'s final after 6 blocks" will not satisfy them.',
          sphereRelevance: {
            title: 'Sphere\'s Position',
            points: [
              'We DON\'T claim stablecoins provide legal settlement finality',
              'Stablecoins provide faster ECONOMIC finality (minutes not days)',
              'Fiat legs settle through traditional systems with legal finality',
              'We complement central bank settlement, not replace it'
            ],
            keyInsight: 'This is a compliance-native position that regulators can accept.'
          },
          keyTakeaway: 'Finality is defined by law, not technology. Blockchain provides probabilistic confirmation, not legal finality.'
        },
        exercise: {
          title: 'Exercise 1.3 — Finality Explanation',
          prompt: 'A crypto-native counterparty says: "Bitcoin has finality after 6 confirmations, just like Fedwire."\n\nWrite a response that:\n1) Explains why this comparison is flawed\n2) Defines legal finality properly\n3) Acknowledges what crypto DOES provide\n4) Positions Sphere\'s approach accurately',
          criteria: ['Legal vs technical distinction', 'Accurate crypto understanding', 'Sphere positioning']
        },
        quiz: [
          { q: 'What defines settlement finality?', options: ['Network confirmations', 'Transaction speed', 'Legal framework making transfer irrevocable', 'Consensus algorithm'], correct: 2 },
          { q: 'Why doesn\'t Bitcoin have legal finality?', options: ['Too slow', 'No legal framework defining when final', 'Always reversible', 'Government banned it'], correct: 1 },
          { q: 'Strongest finality?', options: ['ACH', 'CHIPS', 'Fedwire (RTGS)', 'Card networks'], correct: 2 }
        ]
      },
      {
        id: 'central-bank-role',
        title: '1.4 Who Settles Money',
        curriculum: {
          objectives: [
            'Explain why central banks are irreplaceable in settlement',
            'Describe what central banks actually provide',
            'Counter "crypto replaces banks" arguments intelligently'
          ],
          keyConcepts: [
            'Central banks provide: settlement asset, RTGS systems, lender of last resort',
            'Even "private" settlement uses central bank money eventually',
            'Sphere works WITH central bank infrastructure, not against it'
          ]
        },
        learn: {
          introduction: 'There\'s a persistent myth in crypto/fintech that technology can "disintermediate" central banks. This fundamentally misunderstands what central banks do and why they exist.',
          coreQuestion: 'Why can\'t technology replace central banks?',
          sections: [
            {
              title: 'What Central Banks Provide',
              icon: '🏛️',
              content: 'Central banks offer four irreplaceable functions:',
              details: [
                { label: 'Zero Credit Risk Asset', value: 'Only sovereign-backed money has zero credit risk' },
                { label: 'RTGS Systems', value: 'Fedwire, TARGET2, CHAPS, BOJ-NET' },
                { label: 'Lender of Last Resort', value: 'Only they can create money in a crisis' },
                { label: 'Oversight & Regulation', value: 'Rules that protect the system' }
              ]
            }
          ],
          table: {
            title: 'RTGS Systems Worldwide',
            headers: ['Region', 'System', 'Type'],
            rows: [
              ['🇺🇸 United States', 'Fedwire', 'RTGS'],
              ['🇪🇺 Eurozone', 'TARGET2', 'RTGS'],
              ['🇬🇧 United Kingdom', 'CHAPS', 'RTGS'],
              ['🇯🇵 Japan', 'BOJ-NET', 'RTGS'],
              ['🇦🇪 UAE', 'UAEFTS', 'RTGS']
            ]
          },
          keyFact: {
            title: 'Even Private Systems Use Central Banks',
            points: [
              'CHIPS (private) → Net settles through Fedwire',
              'Card networks → Banks settle through central bank systems',
              'Stablecoins → Backed by assets in the banking system'
            ],
            conclusion: 'There is no escaping central bank infrastructure for legitimate large-value settlement.'
          },
          comparison: {
            title: 'Why Tech Can\'t Replace Central Banks',
            headers: ['Function', 'Why Tech Can\'t Replace'],
            rows: [
              ['Zero credit risk asset', 'Requires sovereign backing'],
              ['Lender of last resort', 'Requires money creation power'],
              ['Legal finality', 'Requires legal framework'],
              ['Oversight', 'Requires enforcement authority']
            ]
          },
          regulatorQA: [
            { q: 'Are you trying to replace banks?', a: 'No. We make it easier for money to reach the banking system faster.' },
            { q: 'What about CBDCs?', a: 'We welcome them. They\'d strengthen our model as another compliant rail.' },
            { q: 'How do you affect monetary policy?', a: 'We don\'t. We move existing money faster — we don\'t create new money.' }
          ],
          sphereRelevance: {
            title: 'Sphere\'s Position',
            points: [
              'We are NOT trying to replace central banks',
              'We optimize the path TO settlement (faster, cheaper)',
              'We work WITHIN existing regulatory frameworks',
              'We complement central bank infrastructure'
            ],
            keyInsight: 'Using stablecoins as transport, with fiat settlement at endpoints.'
          },
          keyTakeaway: 'Central banks are irreplaceable. Sphere works with them, not against them.'
        },
        exercise: {
          title: 'Exercise 1.4 — Central Bank Defense',
          prompt: 'A potential partner says: "I thought the whole point of crypto was to eliminate central banks. Why are you working with them?"\n\nWrite a response that:\n1) Acknowledges the crypto narrative\n2) Explains what central banks actually provide\n3) Clarifies why Sphere works WITH the system\n4) Positions this as a strategic advantage',
          criteria: ['Central bank understanding', 'Sphere positioning', 'Strategic framing']
        },
        quiz: [
          { q: 'What makes central bank money unique?', options: ['It\'s digital', 'Zero credit risk (sovereign-backed)', 'It\'s faster', 'Globally accepted'], correct: 1 },
          { q: 'CHIPS settles through:', options: ['Bitcoin', 'SWIFT', 'Fedwire', 'Credit cards'], correct: 2 },
          { q: 'Sphere\'s position on central banks:', options: ['Replace them', 'Complement them', 'Ignore them', 'Wait for CBDCs'], correct: 1 }
        ]
      },
      {
        id: 'cross-border-complexity',
        title: '1.5 Why Cross-Border Is Hard',
        curriculum: {
          objectives: [
            'Explain why cross-border is structurally difficult',
            'Understand correspondent banking mechanics',
            'Articulate how Sphere addresses these frictions'
          ],
          keyConcepts: [
            'Cross-border is hard because of LAWS, not technology',
            'Correspondent banking = nested trust relationships',
            'Sphere compresses the chain, doesn\'t eliminate the needs'
          ]
        },
        learn: {
          introduction: 'Cross-border payments are hard because of laws, regulations, and institutions — NOT old technology. The instinct is to think "new technology will fix it." This is wrong.',
          coreQuestion: 'Why can\'t we just make cross-border payments instant?',
          arnoldQuote: {
            quote: 'No one actually knows how long it will take.',
            context: 'On Swift wire timing for cross-border payments',
            speaker: 'Arnold Lee, Sphere CEO'
          },
          caseStudy: {
            title: 'The Bob and Ahmed Story',
            parties: [
              { name: 'Bob', location: 'Texas, USA', role: 'Ships machinery (tractors, harvesters)', needs: 'Payment in USD' },
              { name: 'Ahmed', location: 'Lagos, Nigeria', role: 'Agricultural business', needs: 'Bob\'s machinery' }
            ],
            problem: [
              'Swift wire takes T+2, T+3, T+5, T+10 days — unpredictable',
              'Shipping takes 25-45 days',
              'Every day waiting = port fees, personnel, storage costs',
              'If order is wrong → restart entire process'
            ],
            whyNotStablecoins: [
              'Ahmed is focused on harvest and employees, not learning crypto',
              'He\'s not hiring a Rust/Solidity developer',
              'He must explain to his bank how transaction is compliant',
              'Onboarding and education are the hardest obstacles'
            ]
          },
          sections: [
            {
              title: 'Correspondent Banking Model',
              icon: '🏦',
              content: 'When your bank doesn\'t have direct relationship with beneficiary\'s bank, it uses correspondent banks as intermediaries.',
              flow: ['US Bank', 'US Correspondent', 'UK Correspondent', 'Nigerian Bank'],
              perHop: [
                'Own compliance requirements',
                'Own time zone',
                'Own cut-off times',
                'Can reject or hold payment',
                'Charges fees'
              ]
            }
          ],
          table: {
            title: 'BIS/CPMI Identified Frictions',
            headers: ['Friction', 'Impact'],
            rows: [
              ['Fragmented data standards', 'Manual reconciliation, errors, delays'],
              ['Complex compliance', '5+ regulatory regimes may apply'],
              ['Limited operating hours', '5pm New York = Frankfurt closed'],
              ['Funding requirements', '$100M+ trapped in nostro accounts'],
              ['Long transaction chains', '4+ hops = 4+ failure points']
            ]
          },
          warning: 'Technology does NOT remove jurisdiction. Even instant blockchain transfer still requires AML/KYC, capital controls, licensing, tax reporting, and sanctions screening.',
          sphereSolution: {
            title: 'How Sphere Addresses This',
            headers: ['Traditional Problem', 'Sphere Solution'],
            rows: [
              ['4+ correspondent hops', 'Direct stablecoin settlement'],
              ['Banking hours only', '24/7 blockchain operations'],
              ['Capital trapped in nostros', 'No pre-funding needed'],
              ['Compliance at each hop', 'Embedded compliance upfront'],
              ['2-5 day settlement', '15-30 minute median']
            ]
          },
          arnoldInsight: {
            quote: 'One-third of all human time is spent waiting for weekends, holidays for things to clear.',
            speaker: 'Arnold Lee'
          },
          keyTakeaway: 'Cross-border is hard because of laws and institutions, not technology. Sphere compresses the chain and embeds compliance.'
        },
        exercise: {
          title: 'Exercise 1.5 — Cross-Border Analysis',
          prompt: 'Map a payment from Brazil to Japan through correspondent banking:\n\n1) Identify likely correspondent banks involved\n2) List compliance checks at each step\n3) Estimate realistic timeline and failure points\n4) Explain how Sphere would handle this differently',
          criteria: ['Correspondent chain understood', 'Compliance points identified', 'Sphere solution clear']
        },
        quiz: [
          { q: 'Why is cross-border slow?', options: ['Old computers', 'Laws & compliance across jurisdictions', 'Banks are lazy', 'Internet is slow'], correct: 1 },
          { q: 'What is a nostro account?', options: ['Crypto wallet', 'Bank\'s account at another bank in foreign currency', 'Central bank reserve', 'Savings account'], correct: 1 },
          { q: 'Sphere\'s approach:', options: ['Eliminate compliance', 'Replace all banks', 'Compress chain, embed compliance', 'One country only'], correct: 2 }
        ]
      }
    ],
    masterQuiz: {
      title: 'Pillar 1 Mastery Assessment',
      passingScore: 70,
      scenario: 'A UAE regulator asks you to explain how Sphere fits into existing payments infrastructure.',
      questions: [
        { type: 'multiple_choice', question: 'Three stages of payment lifecycle?', options: ['Send/Receive/Confirm', 'Initiation/Clearing/Settlement', 'Request/Process/Complete', 'Debit/Transfer/Credit'], correct: 1 },
        { type: 'multiple_choice', question: 'SWIFT provides:', options: ['Settlement', 'Messaging', 'Currency exchange', 'Liquidity'], correct: 1 },
        { type: 'multiple_choice', question: 'Why no legal finality for blockchain?', options: ['Too slow', 'No legal framework', 'Always reversible', 'Banned'], correct: 1 },
        { type: 'analysis', question: 'Counterparty says: "SWIFT is already instant. What does Sphere solve?"', rubric: ['Distinguishes messaging from settlement', 'Explains delay', 'Articulates Sphere value'] },
        { type: 'application', question: 'Explain to a regulator why Sphere is NOT replacing central banks.', rubric: ['Central bank functions', 'Sphere positioning', 'Compliance-native framing'] }
      ]
    }
  },

  // ============================================================================
  // PILLAR 2: STABLECOINS AS FINANCIAL INFRASTRUCTURE
  // ============================================================================
  {
    id: 'stablecoins',
    title: 'Pillar 2: Stablecoins as Financial Infrastructure',
    shortTitle: 'Stablecoins',
    description: 'Not crypto ideology. Understand stablecoins as wholesale settlement instruments.',
    color: 'emerald',
    overview: `**Why This Pillar Matters**

Sphere uses stablecoins as plumbing, not ideology — and regulators judge it accordingly.

You must be able to discuss stablecoins without crypto language, understand their systemic implications, and explain why Sphere's approach differs from typical crypto projects.

**If someone thinks stablecoins are...**
- "Just another cryptocurrency" → They'll see Sphere as speculation platform
- "Risk-free digital dollars" → They'll ignore real liquidity/compliance risks
- "Only for DeFi/retail" → They'll miss institutional relevance`,
    sections: [
      {
        id: 'what-stablecoins-are',
        title: '2.1 What Stablecoins Actually Are',
        curriculum: {
          objectives: [
            'Define stablecoins as settlement instruments',
            'Understand reserve composition',
            'Explain "stablecoin sandwich" concept'
          ],
          keyConcepts: [
            'Stablecoin = cryptocurrency pegged to reference asset (usually USD)',
            'Major issuers: Tether (~$127B), Circle (~$45B)',
            'Market: $232B today → projected $1.9-4.0T by 2030'
          ]
        },
        learn: {
          introduction: 'A stablecoin is a cryptocurrency designed to maintain stable value by pegging to a reference asset, typically USD. Unlike Bitcoin or Ethereum, stablecoins hold a consistent value (~$1.00 USD) through reserve backing.',
          coreQuestion: 'What makes stablecoins useful for payments?',
          stats: {
            title: 'The Scale is Massive',
            items: [
              { label: 'Transfer volume (2024)', value: '$27.6 TRILLION' },
              { label: 'Current market cap', value: '~$232 billion' },
              { label: 'Projected 2030 market', value: '$1.9 - $4.0 trillion' },
              { label: 'Avg remittance cost (traditional)', value: '~6% globally' },
              { label: 'Stablecoin transfer cost', value: '< $0.01' }
            ]
          },
          arnoldQuote: {
            quote: 'By 2030, stablecoins are estimated to be the world\'s default way of moving money.',
            speaker: 'Arnold Lee'
          },
          sections: [
            {
              title: 'The "Stablecoin Sandwich"',
              icon: '🥪',
              content: 'For someone who doesn\'t know crypto, doesn\'t have a wallet, they still get the benefits.',
              flow: ['FIAT IN (USD/LCY)', 'STABLECOIN TRANSFER (minutes)', 'FIAT OUT (USD/LCY)'],
              keyPoint: 'The end user never needs to understand crypto. They send money, recipient gets money — faster and cheaper.'
            }
          ],
          arnoldInsight: {
            quote: 'People don\'t need to do the learning curve. It\'s just faster, cheaper, and everyone needs to send money to do business.',
            speaker: 'Arnold Lee'
          },
          table: {
            title: 'Major Stablecoins',
            headers: ['Stablecoin', 'Market Cap', 'Key Characteristic'],
            rows: [
              ['USDT (Tether)', '~$127B', 'Highest liquidity globally'],
              ['USDC (Circle)', '~$45B', 'US-regulated, transparent'],
              ['PYUSD (PayPal)', '~$1B', 'PayPal ecosystem'],
              ['DAI (Maker)', '~$5B', 'Crypto-collateralized']
            ]
          },
          reserveComposition: {
            title: 'What Backs These Stablecoins?',
            items: [
              { issuer: 'Tether', composition: '65% T-bills, cash, repo agreements' },
              { issuer: 'Circle', composition: '44% T-bills, 56% cash/bank deposits' }
            ],
            keyPoint: 'These are backed by real, short-dated, liquid assets — not crypto speculation.'
          },
          types: {
            title: 'Types of Stablecoins',
            items: [
              { type: 'Fiat-Collateralized', icon: '💵', examples: 'USDT, USDC', description: 'Backed 1:1 by fiat reserves. Most common, most institutional.' },
              { type: 'Crypto-Collateralized', icon: '🔗', examples: 'DAI', description: 'Backed by crypto assets (over-collateralized). More volatile, DeFi-focused.' },
              { type: 'Algorithmic', icon: '📈', examples: 'Terra/Luna (failed)', description: 'Maintained by algorithms, no hard backing. High risk.' },
              { type: 'Commodity-Backed', icon: '🥇', examples: 'PAXG', description: 'Backed by gold or other commodities. Niche use cases.' }
            ]
          },
          sphereRelevance: {
            title: 'Sphere\'s Position',
            points: [
              'We use stablecoins as plumbing, not product',
              'We\'re not a stablecoin issuer',
              'We don\'t promote any single stablecoin',
              'We\'re infrastructure that works with multiple issuers',
              'The stablecoin is invisible to end users'
            ]
          },
          languageGuide: {
            wrong: ['Sphere is a crypto company'],
            correct: ['Sphere uses stablecoin rails for faster B2B settlement']
          },
          keyTakeaway: 'Stablecoins are settlement infrastructure, not speculation. Sphere uses them as invisible plumbing.'
        },
        exercise: {
          title: 'Exercise 2.1 — Stablecoin Explanation',
          prompt: 'A traditional banker asks: "What exactly is a stablecoin and why should I care?"\n\nExplain without using crypto jargon:\n1) What a stablecoin is\n2) What backs it\n3) Why it matters for payments\n4) How Sphere uses them',
          criteria: ['No jargon', 'Clear backing explanation', 'Business relevance', 'Sphere positioning']
        },
        quiz: [
          { q: 'What backs USDT and USDC?', options: ['Bitcoin', 'Algorithms', 'T-bills, cash, bank deposits', 'Gold'], correct: 2 },
          { q: 'Stablecoin transfer volume in 2024?', options: ['$2.7B', '$27.6B', '$276B', '$27.6T'], correct: 3 },
          { q: 'What is the "stablecoin sandwich"?', options: ['A trading strategy', 'Fiat→Stablecoin→Fiat transfer flow', 'A type of stablecoin', 'DeFi protocol'], correct: 1 }
        ]
      },
      {
        id: 'stablecoin-risks',
        title: '2.2 Stablecoin Risk Dynamics',
        curriculum: {
          objectives: [
            'Identify five categories of stablecoin risk',
            'Understand the USDC depeg case study',
            'Explain why "stable" doesn\'t mean "risk-free"'
          ],
          keyConcepts: [
            'Reserve, redemption, operational, regulatory, counterparty risks',
            'USDC depeg (March 2023): $3.3B at SVB, traded at $0.87',
            'Even well-regulated stablecoins can depeg'
          ]
        },
        learn: {
          introduction: 'Stablecoins are NOT risk-free. If you present them as "risk-free digital dollars," you will lose credibility instantly with sophisticated counterparties.',
          coreQuestion: 'What can go wrong with stablecoins?',
          parable: {
            title: 'The Antarctica Story',
            content: 'Arnold tells a parable about "Antarctica" — a fictional emerging market that instituted capital controls after a debt crisis. Then stablecoins arrived — easy dollar access.',
            quote: 'If you have easy access to dollars through stablecoins, why do you need the old fishbones at all?',
            lesson: 'The fishbones became worthless. Teachers, police, military couldn\'t be paid. Stablecoins themselves are not the problem, but VIOLENT TRANSITIONS are.',
            speaker: 'Arnold Lee'
          },
          riskCategories: {
            title: 'Five Categories of Stablecoin Risk',
            items: [
              { category: 'Reserve Risk', icon: '🏦', description: 'Are reserves actually there? Are they liquid? Quality assets?' },
              { category: 'Redemption Risk', icon: '💸', description: 'Can you actually get your $ back? What if everyone redeems at once?' },
              { category: 'Operational Risk', icon: '⚙️', description: 'Smart contract bugs, hacks, key management failures' },
              { category: 'Regulatory Risk', icon: '⚖️', description: 'Issuer gets shut down, banned, or forced to freeze assets' },
              { category: 'Counterparty Risk', icon: '🤝', description: 'Banks holding reserves fail (see USDC/SVB case)' }
            ]
          },
          caseStudy: {
            title: 'USDC Depeg (March 2023)',
            timeline: [
              { time: 'Friday Night', event: 'SVB fails, USDC has $3.3B there' },
              { time: 'Saturday', event: 'USDC trades at $0.87 (13% below peg)' },
              { time: 'Saturday', event: '$4.5B+ value gap in hours' },
              { time: 'Sunday', event: 'Fed announces depositor protection' },
              { time: 'Monday', event: 'USDC recovers to ~$1.00' }
            ],
            keyInsight: 'This was a CONFIDENCE SHOCK, not insolvency. Circle had the reserves — but markets panicked before verification.',
            lesson: 'Well-regulated, fully-backed stablecoins CAN STILL DEPEG due to confidence shocks.'
          },
          systemicRisk: {
            title: 'Mass Redemption Risk (BIS Data)',
            scenario: 'What happens if 10% of stablecoin holders redeem at once?',
            impact: [
              '10% redemption = $10-12B in T-bill sales',
              'Impact: +20-40 basis points yield shock',
              'Potential cascade to money market funds'
            ],
            conclusion: 'This is why regulators care about stablecoin systemic risk.'
          },
          sphereMitigation: {
            title: 'How Sphere Mitigates Risk',
            headers: ['Risk', 'Sphere Mitigation'],
            rows: [
              ['Reserve risk', 'Work with audited issuers'],
              ['Redemption risk', 'Transitory holdings (minutes, not days)'],
              ['Operational risk', 'Multiple issuer support'],
              ['Regulatory risk', 'Compliance-native design'],
              ['Counterparty risk', 'Diversified banking partners']
            ],
            keyPoint: 'We hold stablecoins for MINUTES, not days. This dramatically reduces exposure.'
          },
          keyTakeaway: '"Stable" doesn\'t mean "risk-free." Understand the risks and how Sphere mitigates them.'
        },
        exercise: {
          title: 'Exercise 2.2 — Risk Explanation',
          prompt: 'A risk officer asks: "What are the risks of using stablecoins for settlement?"\n\nExplain:\n1) The five risk categories\n2) The USDC depeg case study\n3) Why "stable" doesn\'t mean "risk-free"\n4) How Sphere mitigates these risks',
          criteria: ['All risk categories', 'USDC case accurate', 'Honest about risks', 'Mitigation clear']
        },
        quiz: [
          { q: 'During the USDC depeg, it traded at:', options: ['$0.97', '$0.87', '$0.77', '$0.50'], correct: 1 },
          { q: 'What caused the USDC depeg?', options: ['Insufficient reserves', 'SVB failure ($3.3B exposure)', 'Smart contract hack', 'Regulatory action'], correct: 1 },
          { q: 'How does Sphere mitigate stablecoin risk?', options: ['Avoid stablecoins', 'Hold for minutes not days', 'Use only one issuer', 'Guarantee the peg'], correct: 1 }
        ]
      },
      {
        id: 'speed-vs-safety',
        title: '2.3 Speed vs Safety Tradeoffs',
        curriculum: {
          objectives: [
            'Understand the speed asymmetry problem',
            'Explain how four ledgers must reconcile',
            'Articulate Sphere\'s safety-first approach'
          ],
          keyConcepts: [
            'Stablecoins settle in minutes, fiat in days',
            'Four ledgers: client bank, Sphere bank, blockchain, destination',
            'Sphere: don\'t release stablecoins until fiat confirmed'
          ]
        },
        learn: {
          introduction: 'Faster isn\'t always better. Understanding the tradeoffs is essential for credibility.',
          coreQuestion: 'How do you balance speed with safety?',
          speedComparison: {
            title: 'Speed Comparison',
            headers: ['System', 'Settlement Time', 'Cost'],
            rows: [
              ['Solana', '400ms', '~$0.00025'],
              ['Ethereum', '12-15 seconds', '~$1-50'],
              ['Fedwire', 'Minutes', '~$25-50'],
              ['SWIFT + Correspondent', '2-5 DAYS', '~6% (avg)']
            ],
            conclusion: 'Stablecoins are 1000x faster and 99% cheaper. But that creates new problems.'
          },
          asymmetryProblem: {
            title: 'The Speed Asymmetry Problem',
            visualization: [
              { leg: 'Stablecoin Leg', time: '15 minutes' },
              { leg: 'Fiat Leg', time: '2-5 days' }
            ],
            problem: 'One side settles instantly, other takes days. This creates reconciliation risk.',
            whatCanGoWrong: [
              'Stablecoin released → Fiat never arrives',
              'Fiat sent → Stablecoin never released',
              'Amounts don\'t match due to FX movement',
              'Compliance flags one side after other completes'
            ]
          },
          fourLedgers: {
            title: 'Four Ledgers Must Match',
            ledgers: [
              { name: 'Client\'s Bank Ledger', icon: '🏦' },
              { name: 'Sphere\'s Bank Ledger', icon: '🏛️' },
              { name: 'Blockchain Ledger', icon: '⛓️' },
              { name: 'Destination Bank Ledger', icon: '🏦' }
            ],
            requirement: 'All four must agree. Timing differences create temporary gaps that must be monitored.'
          },
          capitalEfficiency: {
            title: 'Capital Efficiency Gains',
            comparison: [
              { approach: 'Traditional', description: 'Pre-fund nostro accounts everywhere', impact: '$100M+ trapped capital' },
              { approach: 'Sphere', description: 'Real-time settlement, no pre-funding', impact: '95% reduction in working capital' }
            ]
          },
          sphereApproach: {
            title: 'Sphere\'s Safety-First Approach',
            principle: 'Don\'t release stablecoins until fiat confirmed.',
            explanation: 'We prioritize SAFETY over raw SPEED. 15-30 minutes is fast enough.',
            process: [
              'Fiat received and confirmed → THEN release stablecoin',
              'Stablecoin received → THEN initiate fiat payout',
              'Never expose to both legs simultaneously'
            ],
            conclusion: 'This is slower than raw blockchain speed but ELIMINATES settlement risk.'
          },
          keyTakeaway: 'Speed creates risk. Sphere prioritizes safety with 15-30 minute settlement — fast enough to transform payments, safe enough for institutions.'
        },
        exercise: {
          title: 'Exercise 2.3 — Reconciliation Design',
          prompt: 'Design a reconciliation process for:\n$1M transfer, US company → Brazilian supplier\n\n1) Identify the four ledgers involved\n2) Map timing differences\n3) Identify risk points\n4) Propose controls for each risk',
          criteria: ['Four ledgers identified', 'Timing understood', 'Risks mapped', 'Controls practical']
        },
        quiz: [
          { q: 'How many ledgers must reconcile for a Sphere transaction?', options: ['Two', 'Three', 'Four', 'Five'], correct: 2 },
          { q: 'What is the "speed asymmetry problem"?', options: ['Blockchain is slow', 'Stablecoins settle fast, fiat takes days', 'Banks faster than blockchain', 'All equal speed'], correct: 1 },
          { q: 'Sphere\'s approach to speed vs safety:', options: ['Maximum speed always', 'Safety first — confirm fiat before releasing', 'Ignore reconciliation', 'Only use one ledger'], correct: 1 }
        ]
      },
      {
        id: 'regulatory-convergence',
        title: '2.4 Regulatory Convergence',
        curriculum: {
          objectives: [
            'Understand global regulatory frameworks',
            'Explain MiCA, GENIUS Act, UAE approach',
            'Position Sphere within regulatory convergence'
          ],
          keyConcepts: [
            'Global regulation converging toward bank-like oversight',
            'MiCA (EU), GENIUS Act (US), CBUAE/VARA (UAE)',
            'Sphere built for regulated world, not despite it'
          ]
        },
        learn: {
          introduction: 'Global regulation is converging. Sphere is built for this future, not against it.',
          coreQuestion: 'How are regulators approaching stablecoins?',
          globalFrameworks: {
            title: 'Global Regulatory Frameworks',
            items: [
              { jurisdiction: '🇪🇺 EU', framework: 'MiCA (Markets in Crypto-Assets)', status: 'Enforced' },
              { jurisdiction: '🇺🇸 US', framework: 'GENIUS Act (2025)', status: 'Enacted' },
              { jurisdiction: '🇦🇪 UAE', framework: 'CBUAE + VARA + DFSA', status: 'Active' },
              { jurisdiction: '🇸🇬 Singapore', framework: 'MAS Payment Services Act', status: 'Enforced' },
              { jurisdiction: '🇯🇵 Japan', framework: 'PSA (Payment Services Act)', status: 'Enforced' },
              { jurisdiction: '🇬🇧 UK', framework: 'FCA authorization', status: 'Evolving' }
            ]
          },
          micaDetails: {
            title: 'MiCA (EU) Key Requirements',
            requirements: [
              '1:1 reserve backing required',
              'Reserves in liquid, low-risk assets',
              'Segregation from operational funds',
              'Redemption rights for holders',
              'Minimum €350K capital requirement',
              'Regular independent audits'
            ],
            impact: 'Tether (USDT) delisted from some EU exchanges. Circle (USDC) obtained approval.'
          },
          geniusAct: {
            title: 'GENIUS Act (US)',
            description: 'First comprehensive federal stablecoin legislation',
            keyPoints: [
              'Creates federal framework for "payment stablecoins"',
              'Reserve requirements and consumer protections',
              'State vs federal licensing paths',
              'Focus on issuance (not transmission)'
            ]
          },
          uaeFramework: {
            title: 'UAE Regulatory Landscape',
            regulators: [
              { name: 'CBUAE', jurisdiction: 'Onshore payment services' },
              { name: 'VARA', jurisdiction: 'Dubai virtual assets' },
              { name: 'DFSA', jurisdiction: 'DIFC (Dubai free zone)' },
              { name: 'FSRA', jurisdiction: 'ADGM (Abu Dhabi free zone)' }
            ],
            keyDevelopments: [
              'CBUAE Circular 2/2024 — licensing for stablecoin services',
              'Digital Dirham (CBDC) framework coming'
            ]
          },
          convergencePattern: {
            title: 'Global Convergence Pattern',
            headers: ['Requirement', 'US', 'EU', 'UAE', 'SG'],
            rows: [
              ['Licensing', '✅', '✅', '✅', '✅'],
              ['Reserve backing', '✅', '✅', '✅', '✅'],
              ['AML/KYC', '✅', '✅', '✅', '✅'],
              ['Consumer protection', '✅', '✅', '✅', '✅'],
              ['Audit requirements', '✅', '✅', '✅', '✅']
            ],
            direction: 'Bank-like oversight for stablecoin companies.'
          },
          spherePosition: {
            title: 'Sphere\'s Regulatory Position',
            statement: 'We\'re built FOR the regulated world, not trying to avoid it.',
            points: [
              'Regulatory clarity is GOOD for Sphere',
              'It eliminates cowboys and validates our model',
              'We welcome clear frameworks'
            ]
          },
          keyTakeaway: 'Regulation is converging globally. Sphere is built for compliance, making regulation a competitive advantage.'
        },
        exercise: {
          title: 'Exercise 2.4 — Regulatory Mapping',
          prompt: 'A client wants to use Sphere for payments between UAE, EU, and US.\n\nFor each jurisdiction:\n1) Which regulators apply?\n2) What compliance requirements exist?\n3) Potential friction points?\n4) How does Sphere address each?',
          criteria: ['Jurisdictions correct', 'Requirements accurate', 'Friction identified', 'Sphere positioning clear']
        },
        quiz: [
          { q: 'What did MiCA cause for Tether?', options: ['Approval', 'Delisting from some EU exchanges', 'No impact', 'Increased usage'], correct: 1 },
          { q: 'UAE stablecoin services regulator (onshore)?', options: ['VARA', 'CBUAE', 'DFSA', 'SEC'], correct: 1 },
          { q: 'Why is regulatory convergence good for Sphere?', options: ['Less regulation', 'Eliminates cowboys, validates model', 'Allows avoiding compliance', 'Cheaper operations'], correct: 1 }
        ]
      },
      {
        id: 'institutional-adoption',
        title: '2.5 Institutional Adoption Patterns',
        curriculum: {
          objectives: [
            'Understand the institutional adoption curve',
            'Identify real use cases (not speculation)',
            'Explain the 1.4B unbanked opportunity'
          ],
          keyConcepts: [
            'Adoption curve: speculation → pilots → production → infrastructure',
            'Real uses: treasury, cross-border, payroll, vendor payments',
            '1.4B unbanked people = massive market opportunity'
          ]
        },
        learn: {
          introduction: 'Stablecoins have crossed from speculation to infrastructure. We\'re in the production phase.',
          coreQuestion: 'Where are we in stablecoin adoption?',
          adoptionCurve: {
            title: 'The Adoption Curve',
            stages: [
              { period: '2017-2020', stage: 'Speculation', description: 'Crypto trading, DeFi experiments', progress: 20 },
              { period: '2021-2022', stage: 'Pilots', description: 'Enterprise experiments, proofs of concept', progress: 40 },
              { period: '2023-2024', stage: 'Production', description: 'Real volume, real businesses', progress: 80 },
              { period: '2025+', stage: 'Infrastructure', description: 'Default rails, invisible to users', progress: 100 }
            ],
            current: 'We\'re in the PRODUCTION phase. Stablecoins are no longer experimental.'
          },
          enterpriseUseCases: {
            title: 'Real Enterprise Use Cases',
            items: [
              { useCase: 'Treasury Management', benefit: '24/7 liquidity, yield on idle cash' },
              { useCase: 'Cross-Border Payments', benefit: '15-30 min vs 2-5 days' },
              { useCase: 'Vendor Payments', benefit: 'Pay international suppliers instantly' },
              { useCase: 'International Payroll', benefit: 'Pay remote workers globally' },
              { useCase: 'Trade Finance', benefit: 'Faster settlement, less risk' }
            ]
          },
          sphereMetrics: {
            title: 'SpherePay Metrics',
            items: [
              { metric: 'Annualized Volume', value: '$2.5B+' },
              { metric: 'B2B Customers', value: '150+' },
              { metric: 'Active Accounts', value: '1,847' },
              { metric: 'Median Settlement', value: '15-30 minutes' },
              { metric: '99th percentile (before 3pm)', value: 'Same day' }
            ]
          },
          unbankedOpportunity: {
            title: 'The Unbanked Opportunity',
            stat: '1.4 BILLION PEOPLE remain unbanked globally',
            explanation: 'Many have smartphones but no bank accounts. Stablecoins provide dollar access without banks.',
            conclusion: 'This is the market. Not crypto traders — people who need dollar access.'
          },
          arnoldOnMarkets: {
            title: 'Why Emerging Markets?',
            quotes: [
              'When we first started, people thought it was a really dumb idea to build in stablecoins. Now people think it\'s a really good idea.',
              'But the number of people actually there to help onboard customers... hasn\'t really changed.',
              'These types of operators kind of don\'t want to go and live in Libya.'
            ],
            speaker: 'Arnold Lee',
            insight: 'Sphere\'s edge: Willing to go where others won\'t.'
          },
          spherePosition: {
            title: 'Sphere\'s Position',
            points: [
              'Consumer apps use our APIs',
              'B2B payments flow through our rails',
              'Enterprise treasury connects to our platform',
              'We\'re invisible to end users — that\'s the point'
            ]
          },
          keyTakeaway: 'Stablecoins have moved from speculation to production. 1.4B unbanked people need dollar access — that\'s Sphere\'s market.'
        },
        exercise: {
          title: 'Exercise 2.5 — Use Case Development',
          prompt: 'Identify three enterprise use cases for stablecoins in the UAE market.\n\nFor each:\n1) The specific use case\n2) Current pain point\n3) How stablecoins solve it\n4) Why Sphere is the right partner',
          criteria: ['UAE-relevant', 'Pain points clear', 'Solution specific', 'Sphere differentiation']
        },
        quiz: [
          { q: 'How many people are unbanked globally?', options: ['140 million', '1.4 billion', '14 billion', '14 million'], correct: 1 },
          { q: 'SpherePay median settlement time?', options: ['2-5 days', '24 hours', '15-30 minutes', 'Instant'], correct: 2 },
          { q: 'Current stage of institutional adoption?', options: ['Speculation', 'Pilots', 'Production', 'Not started'], correct: 2 }
        ]
      }
    ],
    masterQuiz: {
      title: 'Pillar 2 Mastery Assessment',
      passingScore: 70,
      scenario: 'A UAE bank risk officer asks about stablecoin risks and regulatory status.',
      questions: [
        { type: 'multiple_choice', question: 'What backs major stablecoins like USDT/USDC?', options: ['Bitcoin', 'Algorithms', 'T-bills, cash, deposits', 'Gold'], correct: 2 },
        { type: 'multiple_choice', question: 'USDC depeg cause?', options: ['Insufficient reserves', 'SVB failure', 'Hack', 'Regulation'], correct: 1 },
        { type: 'multiple_choice', question: 'MiCA impact on Tether?', options: ['Approval', 'Delisting from some exchanges', 'No impact', 'Increased usage'], correct: 1 },
        { type: 'analysis', question: 'Explain "stablecoin sandwich" to a traditional banker with no crypto knowledge.', rubric: ['No jargon', 'Clear flow', 'Business benefit', 'Risk acknowledgment'] },
        { type: 'application', question: 'Risk officer asks: "What if the stablecoin depegs during a transaction?" How do you respond?', rubric: ['Acknowledge risk', 'USDC case', 'Mitigation strategies', 'Sphere approach'] }
      ]
    }
  },

  // ============================================================================
  // PILLAR 3: COMPLIANCE & REGULATORY LANDSCAPE
  // ============================================================================
  {
    id: 'compliance',
    title: 'Pillar 3: Compliance & Regulatory Landscape',
    shortTitle: 'Compliance',
    description: 'Sphere\'s classification determines everything. Get this wrong and nothing else matters.',
    color: 'amber',
    overview: `**Why This Pillar Matters**

Sphere's classification determines everything. Get this wrong and nothing else matters.

Sphere is NOT a crypto exchange. It's a licensed payment infrastructure company. Knowing how to classify it correctly — and defend that classification — is essential for every counterparty conversation.

**Key Principle:** Regulatory classification matters more than technology. A sophisticated counterparty asks about licensing and classification BEFORE features.`,
    sections: [
      {
        id: 'what-sphere-is',
        title: '3.1 What Sphere Is (And Isn\'t)',
        curriculum: {
          objectives: [
            'Classify Sphere correctly under multiple frameworks',
            'Explain what Sphere is NOT',
            'Articulate "compliance-native" positioning'
          ],
          keyConcepts: [
            'Sphere IS: Payment infrastructure, licensed MSB, B2B settlement',
            'Sphere is NOT: Exchange, custodian, issuer, bank, wallet',
            'Compliance-native = built for regulation, not retrofitted'
          ]
        },
        learn: {
          introduction: 'Regulatory classification determines which laws apply and how regulators view you. Getting this right is essential.',
          coreQuestion: 'How should Sphere be classified?',
          whatSphereIs: {
            title: 'What Sphere IS',
            items: [
              { classification: 'Money Services Business', detail: 'Registered with FinCEN' },
              { classification: 'Licensed Money Transmitter', detail: 'State-level licenses' },
              { classification: 'B2B Payment Infrastructure', detail: 'APIs for businesses' },
              { classification: 'Payment Processor', detail: 'Stablecoin + bank rails' },
              { classification: 'SOC 2 Type II Certified', detail: 'Security audit verified' },
              { classification: 'ISO 27001 Certified', detail: 'InfoSec standard' }
            ],
            stats: [
              '27 regulated entities across 18 jurisdictions',
              '$2.5B+ annualized volume',
              '150+ B2B customers'
            ]
          },
          whatSphereIsNot: {
            title: 'What Sphere is NOT',
            items: [
              { notThis: 'Cryptocurrency exchange', why: 'No trading/speculation' },
              { notThis: 'Stablecoin issuer', why: 'We use third-party coins' },
              { notThis: 'Custodian', why: 'No long-term asset holding' },
              { notThis: 'Bank', why: 'No deposits or loans' },
              { notThis: 'Wallet provider', why: 'Infrastructure, not app' },
              { notThis: 'DeFi protocol', why: 'Regulated company' }
            ]
          },
          classificationMatters: {
            title: 'Why Classification Matters Legally',
            headers: ['If You\'re A...', 'Regulatory Focus'],
            rows: [
              ['Money Transmitter (SPHERE)', 'AML/BSA, state licenses'],
              ['Exchange', 'Securities laws, BitLicense'],
              ['Custodian', 'Fiduciary duty, trust charter'],
              ['Bank', 'Bank charter, FDIC, capital requirements']
            ]
          },
          complianceNative: {
            title: '"Compliance-Native" Explained',
            approaches: [
              { approach: 'Compliance as afterthought', result: 'Build product → try to make compliant → fails', icon: '❌' },
              { approach: 'Compliance as bolt-on', result: 'Build product → add compliance layer → gaps', icon: '⚠️' },
              { approach: 'Compliance-native (Sphere)', result: 'Design for compliance from day one → embedded', icon: '✅' }
            ],
            whatItMeans: [
              'Policy enforcement BEFORE settlement, not after',
              'Compliance embedded in protocol, not separate system',
              'Work WITH regulators, not around them'
            ]
          },
          sampleResponse: {
            question: 'What kind of company is Sphere?',
            answer: 'Sphere is a licensed Money Services Business — specifically, a B2B payments infrastructure company. We\'re registered with FinCEN and hold Money Transmitter licenses. We\'re NOT an exchange, NOT a custodian, NOT a stablecoin issuer.',
            doNotSay: ['We\'re a crypto company', 'We\'re like Coinbase but for businesses', 'We\'re decentralized'],
            doSay: ['We\'re a licensed payment infrastructure provider', 'We use stablecoins as settlement rails, like banks use SWIFT', 'We\'re compliance-native — built for regulation from day one']
          },
          keyTakeaway: 'Sphere is a licensed MSB, not a crypto exchange. Classification determines everything.'
        },
        exercise: {
          title: 'Exercise 3.1 — Classification Defense',
          prompt: 'A regulator asks: "Isn\'t Sphere just another crypto company?"\n\nWrite your response:\n1) What Sphere actually does (be specific)\n2) How it differs from crypto exchanges\n3) Why classification matters\n4) What licenses Sphere holds',
          criteria: ['Clear classification', 'Specific differentiators', 'Licenses mentioned', 'Professional tone']
        },
        quiz: [
          { q: 'Sphere\'s primary US classification?', options: ['Crypto exchange', 'MSB/Money Transmitter', 'Bank', 'Broker-dealer'], correct: 1 },
          { q: 'What does "compliance-native" mean?', options: ['Compliance added after', 'Designed for compliance from day one', 'No compliance needed', 'Third-party handles it'], correct: 1 },
          { q: 'Which is Sphere NOT?', options: ['Licensed MSB', 'B2B infrastructure', 'Stablecoin issuer', 'FinCEN registered'], correct: 2 }
        ]
      },
      {
        id: 'aml-kyc-fundamentals',
        title: '3.2 AML/KYC Fundamentals',
        curriculum: {
          objectives: [
            'Understand AML/KYC core concepts',
            'Explain why compliance enables, not restricts',
            'Articulate Sphere\'s compliance approach'
          ],
          keyConcepts: [
            'KYC = Know Your Customer (identity verification)',
            'AML = Anti-Money Laundering (transaction monitoring)',
            'Compliance enables institutional adoption'
          ]
        },
        learn: {
          introduction: 'Compliance is not a burden — it\'s what enables institutional adoption. Without it, banks won\'t work with you.',
          coreQuestion: 'Why is compliance an enabler, not a barrier?',
          definitions: {
            title: 'Core Definitions',
            items: [
              { term: 'KYC', meaning: 'Know Your Customer — verify who you\'re doing business with' },
              { term: 'AML', meaning: 'Anti-Money Laundering — detect and prevent illicit flows' },
              { term: 'CDD', meaning: 'Customer Due Diligence — assess risk level of customers' },
              { term: 'EDD', meaning: 'Enhanced Due Diligence — deeper review for high-risk customers' },
              { term: 'SAR', meaning: 'Suspicious Activity Report — file with authorities when needed' }
            ]
          },
          complianceFlow: {
            title: 'The Compliance Flow',
            steps: [
              { step: 'Customer Applies', icon: '📝' },
              { step: 'KYC/CDD Review', icon: '🔍' },
              { step: 'Onboarded (or rejected)', icon: '✅' },
              { step: 'Ongoing Monitoring (AML/TM)', icon: '👁️' },
              { step: 'SAR Filing (if needed)', icon: '📋' }
            ]
          },
          complianceEnablesGrowth: {
            title: 'Why Compliance Enables Growth',
            comparison: {
              headers: ['Without Compliance', 'With Compliance'],
              rows: [
                ['Banks won\'t work with you', 'Bank partnerships'],
                ['Limited to retail', 'Institutional access'],
                ['Regulatory risk', 'Regulatory clarity'],
                ['Reputation risk', 'Trust and credibility']
              ]
            }
          },
          sphereApproach: {
            title: 'Sphere\'s Compliance Approach',
            items: [
              'Pre-transaction screening',
              'Real-time sanctions checks',
              'Ongoing transaction monitoring',
              'Risk-based customer tiering',
              'Automated SAR workflows',
              'Regular compliance audits'
            ],
            keyDifferentiator: 'Compliance happens BEFORE settlement, not after.'
          },
          keyTakeaway: 'Compliance enables institutional adoption. Sphere\'s pre-settlement compliance is a competitive advantage.'
        },
        exercise: {
          title: 'Exercise 3.2 — Compliance Scenario',
          prompt: 'A new B2B customer wants to onboard for high-value cross-border payments.\n\nDescribe:\n1) KYC requirements you\'d need\n2) Risk assessment factors\n3) Ongoing monitoring approach\n4) Red flags to watch for',
          criteria: ['KYC elements', 'Risk factors identified', 'Monitoring approach', 'Red flags listed']
        },
        quiz: [
          { q: 'What does KYC stand for?', options: ['Keep Your Cash', 'Know Your Customer', 'Key Yield Calculation', 'Know Your Compliance'], correct: 1 },
          { q: 'When does Sphere perform compliance checks?', options: ['After settlement', 'Before settlement', 'Never', 'Only for large amounts'], correct: 1 },
          { q: 'EDD is required for:', options: ['All customers', 'High-risk customers', 'Low-risk only', 'No customers'], correct: 1 }
        ]
      },
      {
        id: 'sanctions-screening',
        title: '3.3 Sanctions & Screening',
        curriculum: {
          objectives: [
            'Understand sanctions regimes (OFAC, UN, EU)',
            'Explain screening processes',
            'Handle sanctions-related questions'
          ],
          keyConcepts: [
            'OFAC (US), UN, EU maintain sanctions lists',
            'Real-time screening before every transaction',
            'Both parties AND jurisdictions must be screened'
          ]
        },
        learn: {
          introduction: 'Sanctions compliance is non-negotiable. One violation can end a business.',
          coreQuestion: 'How does sanctions screening work?',
          sanctionsRegimes: {
            title: 'Major Sanctions Regimes',
            items: [
              { regime: 'OFAC (US)', scope: 'SDN list, country programs (Iran, NK, Russia, etc.)' },
              { regime: 'UN', scope: 'Security Council sanctions' },
              { regime: 'EU', scope: 'Consolidated sanctions list' },
              { regime: 'UK', scope: 'OFSI financial sanctions' },
              { regime: 'UAE', scope: 'Local lists + international' }
            ]
          },
          whatGetsScreened: {
            title: 'What Gets Screened',
            items: [
              { item: 'Individuals', details: 'Names, aliases, DOB' },
              { item: 'Entities', details: 'Company names, ownership' },
              { item: 'Jurisdictions', details: 'Country of origin/destination' },
              { item: 'Vessels/Aircraft', details: 'If applicable' },
              { item: 'Wallet Addresses', details: 'Blockchain analytics' }
            ]
          },
          screeningProcess: {
            title: 'Sphere\'s Screening Process',
            steps: [
              { step: 'Transaction Initiated', action: 'Request received' },
              { step: 'Real-Time Screen', action: 'Check sender, recipient, jurisdiction, wallet' },
              { step: 'Clear', action: 'Proceed with transaction' },
              { step: 'Hit', action: 'Escalate to compliance team' }
            ]
          },
          highRiskJurisdictions: {
            title: 'High-Risk Jurisdictions',
            comprehensive: ['Russia', 'Belarus', 'Iran', 'North Korea'],
            targeted: ['Venezuela', 'Cuba'],
            situational: 'Various African/Asian countries',
            keyPrinciple: 'Jurisdiction alone can block a transaction.'
          },
          keyTakeaway: 'Sanctions screening is real-time and non-negotiable. Jurisdiction alone can block a transaction.'
        },
        exercise: {
          title: 'Exercise 3.3 — Sanctions Scenario',
          prompt: 'A customer wants to send payment to a company in Dubai, but one of the beneficial owners has a Russian passport.\n\nAnalyze:\n1) What screening is required?\n2) What factors determine if allowed?\n3) What documentation would you need?\n4) How would you explain the process?',
          criteria: ['Screening requirements', 'Risk factors', 'Documentation needs', 'Clear communication']
        },
        quiz: [
          { q: 'OFAC is administered by which country?', options: ['UAE', 'UK', 'US', 'UN'], correct: 2 },
          { q: 'When does Sphere screen transactions?', options: ['After settlement', 'Real-time before processing', 'Weekly batch', 'Never'], correct: 1 },
          { q: 'What can block a transaction besides people?', options: ['Nothing else', 'Jurisdiction alone', 'Only large amounts', 'Time of day'], correct: 1 }
        ]
      },
      {
        id: 'travel-rule',
        title: '3.4 Travel Rule & Data Requirements',
        curriculum: {
          objectives: [
            'Understand FATF Travel Rule',
            'Explain originator/beneficiary data requirements',
            'Handle Travel Rule questions from counterparties'
          ],
          keyConcepts: [
            'Travel Rule: Share originator/beneficiary info',
            'Threshold varies by jurisdiction ($3K US, €1K EU)',
            'Critical for institutional adoption'
          ]
        },
        learn: {
          introduction: 'The Travel Rule is becoming mandatory globally. Understanding it is essential for institutional conversations.',
          coreQuestion: 'What is the Travel Rule and why does it matter?',
          whatIsIt: {
            title: 'What is the Travel Rule?',
            description: 'FATF Recommendation 16 requires VASPs (Virtual Asset Service Providers) to share originator and beneficiary information for transfers.',
            dataRequired: {
              originator: ['Full name', 'Account number', 'Address or ID', 'Institution name'],
              beneficiary: ['Full name', 'Account number', 'Institution name (if applicable)']
            }
          },
          thresholds: {
            title: 'Thresholds by Jurisdiction',
            items: [
              { jurisdiction: '🇺🇸 United States', threshold: '$3,000', status: 'Enforced' },
              { jurisdiction: '🇪🇺 European Union', threshold: '€1,000', status: 'MiCA enforced' },
              { jurisdiction: '🇦🇪 UAE', threshold: 'AED 3,500', status: 'Implemented' },
              { jurisdiction: '🇸🇬 Singapore', threshold: 'SGD 1,500', status: 'Enforced' },
              { jurisdiction: '🇯🇵 Japan', threshold: '¥0 (all)', status: 'All transactions' }
            ]
          },
          travelRuleFlow: {
            title: 'Travel Rule Flow',
            steps: [
              'Originator VASP collects data',
              'Data transmitted with/before transaction',
              'Via Travel Rule protocols (TRISA, Notabene, etc.)',
              'Beneficiary VASP receives and stores',
              'Data available for regulatory access'
            ]
          },
          whyItMatters: {
            title: 'Why Travel Rule Matters for Sphere',
            statement: 'Travel Rule compliance is a PREREQUISITE for institutional adoption.',
            explanation: 'Banks and large enterprises will NOT work with providers who can\'t demonstrate Travel Rule compliance.',
            sphereApproach: [
              'Integrated Travel Rule compliance',
              'Support for major protocols',
              'Automated data collection and transmission'
            ]
          },
          keyTakeaway: 'Travel Rule compliance is mandatory for institutional adoption. Sphere has it built in.'
        },
        exercise: {
          title: 'Exercise 3.4 — Travel Rule Scenario',
          prompt: 'A UAE company wants to send $50,000 to a US supplier.\n\nExplain:\n1) Does Travel Rule apply?\n2) What data must be collected?\n3) How is the data transmitted?\n4) What if beneficiary VASP doesn\'t support Travel Rule?',
          criteria: ['Threshold understanding', 'Data requirements', 'Transmission method', 'Edge case handling']
        },
        quiz: [
          { q: 'US Travel Rule threshold?', options: ['$1,000', '$3,000', '$10,000', 'All transactions'], correct: 1 },
          { q: 'Travel Rule requires sharing:', options: ['Only amounts', 'Originator and beneficiary info', 'Only sender info', 'Nothing'], correct: 1 },
          { q: 'Why is Travel Rule critical for Sphere?', options: ['Reduces costs', 'Prerequisite for institutional adoption', 'Optional', 'Only for retail'], correct: 1 }
        ]
      }
    ],
    masterQuiz: {
      title: 'Pillar 3 Mastery Assessment',
      passingScore: 70,
      scenario: 'A UAE compliance officer is evaluating Sphere as a payment partner.',
      questions: [
        { type: 'multiple_choice', question: 'Sphere\'s primary classification?', options: ['Exchange', 'MSB/Money Transmitter', 'Bank', 'Custodian'], correct: 1 },
        { type: 'multiple_choice', question: 'When does Sphere screen transactions?', options: ['After', 'Before', 'Weekly', 'Never'], correct: 1 },
        { type: 'multiple_choice', question: 'Travel Rule threshold in UAE?', options: ['$0', 'AED 3,500', '$10,000', 'No rule'], correct: 1 },
        { type: 'analysis', question: 'Explain "compliance-native" to a skeptical bank compliance officer.', rubric: ['Clear definition', 'Contrast with alternatives', 'Practical examples', 'Sphere specifics'] },
        { type: 'application', question: 'Customer wants to pay Dubai supplier but beneficial owner has Russian passport. How do you handle?', rubric: ['Screening process', 'Risk assessment', 'Documentation', 'Communication'] }
      ]
    }
  },

  // ============================================================================
  // PILLAR 4: RISK & GOVERNANCE
  // ============================================================================
  {
    id: 'governance',
    title: 'Pillar 4: Risk & Governance',
    shortTitle: 'Governance',
    description: 'Institutional counterparties care about governance. Demonstrate you understand operational risk.',
    color: 'red',
    overview: `**Why This Pillar Matters**

Institutional counterparties care about governance. Demonstrate you understand operational risk.

Banks and large enterprises won't partner with companies that can't articulate their risk management framework. This pillar prepares you to answer governance questions with confidence.`,
    sections: [
      {
        id: 'operational-risk',
        title: '4.1 Operational Risk Framework',
        curriculum: {
          objectives: [
            'Identify key operational risks in payment infrastructure',
            'Explain risk mitigation strategies',
            'Articulate Sphere\'s risk management approach'
          ],
          keyConcepts: [
            'Operational risk categories: technology, process, people, external',
            'Risk mitigation: prevention, detection, response, recovery',
            'SOC 2 and ISO 27001 as governance frameworks'
          ]
        },
        learn: {
          introduction: 'Operational risk is the risk of loss from inadequate or failed internal processes, people, systems, or external events.',
          coreQuestion: 'What can go wrong and how do we prevent it?',
          riskCategories: {
            title: 'Operational Risk Categories',
            items: [
              { category: 'Technology Risk', icon: '💻', examples: ['System outages', 'Software bugs', 'Cybersecurity breaches', 'Data loss'] },
              { category: 'Process Risk', icon: '⚙️', examples: ['Manual errors', 'Reconciliation failures', 'Settlement breaks'] },
              { category: 'People Risk', icon: '👥', examples: ['Key person dependency', 'Fraud', 'Training gaps'] },
              { category: 'External Risk', icon: '🌍', examples: ['Vendor failures', 'Regulatory changes', 'Market disruptions'] }
            ]
          },
          mitigationFramework: {
            title: 'Risk Mitigation Framework',
            layers: [
              { layer: 'Prevention', description: 'Stop risks from occurring', examples: ['Access controls', 'Code reviews', 'Training'] },
              { layer: 'Detection', description: 'Identify when risks materialize', examples: ['Monitoring', 'Alerts', 'Reconciliation'] },
              { layer: 'Response', description: 'Act when incidents occur', examples: ['Incident response', 'Escalation'] },
              { layer: 'Recovery', description: 'Return to normal operations', examples: ['Backup systems', 'DR plans'] }
            ]
          },
          sphereCertifications: {
            title: 'Sphere\'s Governance Certifications',
            items: [
              { cert: 'SOC 2 Type II', description: 'Security, availability, processing integrity controls audited' },
              { cert: 'ISO 27001', description: 'Information security management system certified' }
            ]
          },
          keyTakeaway: 'Operational risk management is a competitive advantage. SOC 2 and ISO 27001 prove we take it seriously.'
        },
        exercise: {
          title: 'Exercise 4.1 — Risk Assessment',
          prompt: 'Identify the top 5 operational risks for a stablecoin payment processor.\n\nFor each: describe risk, impact, likelihood, mitigation.',
          criteria: ['Risks identified', 'Impact assessed', 'Mitigations practical']
        },
        quiz: [
          { q: 'SOC 2 Type II certifies:', options: ['Financials', 'Security controls', 'Product quality', 'Training'], correct: 1 },
          { q: 'First layer of risk mitigation?', options: ['Response', 'Recovery', 'Prevention', 'Detection'], correct: 2 }
        ]
      },
      {
        id: 'counterparty-risk',
        title: '4.2 Counterparty Risk Management',
        curriculum: {
          objectives: [
            'Understand counterparty risk in payment chains',
            'Explain due diligence requirements',
            'Articulate Sphere\'s counterparty management'
          ],
          keyConcepts: [
            'Counterparty risk = risk that other party fails to perform',
            'Due diligence: financial, operational, compliance, reputation',
            'Ongoing monitoring, not just onboarding'
          ]
        },
        learn: {
          introduction: 'Counterparty risk is the risk that the other party in a transaction fails to meet their obligations.',
          coreQuestion: 'How do we ensure our partners are reliable?',
          counterpartyTypes: {
            title: 'Counterparty Types',
            items: [
              { type: 'Banking Partners', risk: 'Bank failure, account closure' },
              { type: 'Stablecoin Issuers', risk: 'Depeg, redemption failure' },
              { type: 'Liquidity Providers', risk: 'Inability to fulfill' },
              { type: 'Technology Vendors', risk: 'Outages, security breaches' },
              { type: 'Customers', risk: 'Fraud, compliance violations' }
            ]
          },
          dueDiligenceFramework: {
            title: 'Due Diligence Framework',
            dimensions: [
              { dimension: 'Financial', checks: ['Audited financials', 'Capital adequacy', 'Liquidity'] },
              { dimension: 'Operational', checks: ['Business continuity', 'Technology', 'Key person risk'] },
              { dimension: 'Compliance', checks: ['Licenses', 'AML program', 'Regulatory standing'] },
              { dimension: 'Reputation', checks: ['Market standing', 'References'] }
            ]
          },
          keyTakeaway: 'Counterparty risk requires continuous monitoring, not just initial due diligence.'
        },
        exercise: {
          title: 'Exercise 4.2 — Counterparty Assessment',
          prompt: 'Create a due diligence checklist for a new UAE banking partner.',
          criteria: ['Comprehensive', 'UAE-specific', 'Ongoing monitoring']
        },
        quiz: [
          { q: 'Counterparty risk is:', options: ['Market price', 'Risk other party fails', 'Regulatory changes', 'Tech failure'], correct: 1 },
          { q: 'Due diligence should be:', options: ['One-time', 'Ongoing', 'Optional', 'Annual only'], correct: 1 }
        ]
      },
      {
        id: 'liquidity-risk',
        title: '4.3 Liquidity Risk',
        curriculum: {
          objectives: [
            'Understand liquidity risk in payment operations',
            'Explain funding and settlement liquidity',
            'Articulate Sphere\'s liquidity management'
          ],
          keyConcepts: [
            'Funding liquidity: ability to meet obligations',
            'Settlement liquidity: ability to complete transactions',
            'Liquidity buffers and contingency planning'
          ]
        },
        learn: {
          introduction: 'Liquidity risk is the risk of being unable to meet payment obligations when due.',
          coreQuestion: 'Can we always meet our payment obligations?',
          liquidityTypes: {
            title: 'Types of Liquidity Risk',
            items: [
              { type: 'Funding Liquidity', description: 'Ability to raise cash to meet obligations' },
              { type: 'Settlement Liquidity', description: 'Ability to complete transactions in settlement systems' },
              { type: 'Market Liquidity', description: 'Ability to convert assets without price impact' }
            ]
          },
          managementStrategies: {
            title: 'Liquidity Management Strategies',
            items: [
              { strategy: 'Liquidity Buffers', description: 'Maintain excess liquidity above needs' },
              { strategy: 'Diversified Funding', description: 'Multiple banking partners and sources' },
              { strategy: 'Real-Time Monitoring', description: 'Track positions continuously' },
              { strategy: 'Contingency Plans', description: 'Pre-arranged facilities for stress' }
            ]
          },
          keyTakeaway: 'Liquidity risk management ensures we can always meet obligations.'
        },
        exercise: {
          title: 'Exercise 4.3 — Liquidity Scenario',
          prompt: 'Friday 5pm NYC. Customer needs $5M to Brazil by Monday. Analyze challenges and solutions.',
          criteria: ['Challenges identified', 'Sources mapped', 'Contingency clear']
        },
        quiz: [
          { q: 'Funding liquidity is:', options: ['Market prices', 'Ability to meet obligations', 'Capital', 'Uptime'], correct: 1 },
          { q: 'Liquidity buffer means:', options: ['Minimum balance', 'Excess above needs', 'Credit line', 'Insurance'], correct: 1 }
        ]
      },
      {
        id: 'business-continuity',
        title: '4.4 Business Continuity',
        curriculum: {
          objectives: [
            'Understand business continuity planning',
            'Explain disaster recovery requirements',
            'Articulate Sphere\'s resilience approach'
          ],
          keyConcepts: [
            'BCP = Business Continuity Planning',
            'DR = Disaster Recovery',
            'RTO and RPO metrics'
          ]
        },
        learn: {
          introduction: 'Business continuity ensures operations continue during disruptions.',
          coreQuestion: 'What happens when things go wrong?',
          keyMetrics: {
            title: 'Key Continuity Metrics',
            items: [
              { metric: 'RTO', fullName: 'Recovery Time Objective', description: 'Maximum acceptable downtime' },
              { metric: 'RPO', fullName: 'Recovery Point Objective', description: 'Maximum acceptable data loss' }
            ]
          },
          sphereResilience: {
            title: 'Sphere\'s Resilience',
            items: [
              'Multi-region cloud infrastructure',
              'Automated failover',
              'Regular DR testing',
              '24/7 monitoring'
            ]
          },
          keyTakeaway: 'Business continuity is about preparation. Regular testing validates readiness.'
        },
        exercise: {
          title: 'Exercise 4.4 — BCP Scenario',
          prompt: 'Primary cloud region goes down during peak hours. Describe response.',
          criteria: ['Response clear', 'Communication professional', 'Failover understood']
        },
        quiz: [
          { q: 'RTO stands for:', options: ['Real-Time Ops', 'Recovery Time Objective', 'Risk Tolerance', 'Regulatory Test'], correct: 1 },
          { q: 'BCP should be tested:', options: ['Never', 'Once', 'Regularly', 'Only after incidents'], correct: 2 }
        ]
      },
      {
        id: 'incident-management',
        title: '4.5 Incident Management',
        curriculum: {
          objectives: [
            'Understand incident classification and response',
            'Explain escalation procedures',
            'Articulate post-incident review process'
          ],
          keyConcepts: [
            'Incident severity levels (P1-P4)',
            'Escalation matrix and communication',
            'Post-incident review and improvement'
          ]
        },
        learn: {
          introduction: 'How you handle incidents defines your reliability.',
          coreQuestion: 'How do we respond when something goes wrong?',
          severityLevels: {
            title: 'Incident Severity Levels',
            items: [
              { level: 'P1 - Critical', description: 'Complete outage or major breach', response: 'Immediate escalation', sla: '< 15 min' },
              { level: 'P2 - High', description: 'Significant degradation', response: 'On-call + escalation', sla: '< 30 min' },
              { level: 'P3 - Medium', description: 'Limited impact', response: 'On-call handles', sla: '< 2 hours' },
              { level: 'P4 - Low', description: 'Minor issue', response: 'Normal queue', sla: 'Next business day' }
            ]
          },
          postIncidentReview: {
            title: 'Post-Incident Review',
            elements: ['Timeline', 'Root cause', 'What went well', 'Improvements', 'Action items'],
            culture: 'Blameless — focus on systems, not individuals.'
          },
          keyTakeaway: 'Good incident management = fast response + clear communication + continuous learning.'
        },
        exercise: {
          title: 'Exercise 4.5 — Incident Response',
          prompt: 'Customer\'s $500K payment stuck for 4 hours. Classify and respond.',
          criteria: ['Classification correct', 'Investigation thorough', 'Communication professional']
        },
        quiz: [
          { q: 'P1 incident means:', options: ['Low priority', 'Critical/outage', 'Maintenance', 'Feature request'], correct: 1 },
          { q: 'Post-incident reviews should be:', options: ['Blame-focused', 'Blameless', 'Skipped', 'Confidential'], correct: 1 }
        ]
      }
    ],
    masterQuiz: {
      title: 'Pillar 4 Mastery Assessment',
      passingScore: 70,
      scenario: 'A bank risk committee is evaluating Sphere.',
      questions: [
        { type: 'multiple_choice', question: 'SOC 2 Type II certifies:', options: ['Financials', 'Security controls', 'Quality', 'Market share'], correct: 1 },
        { type: 'multiple_choice', question: 'RTO stands for:', options: ['Real-Time Ops', 'Recovery Time Objective', 'Risk Tolerance', 'Test'], correct: 1 },
        { type: 'analysis', question: 'Explain Sphere\'s operational risk framework to a bank risk officer.', rubric: ['Categories', 'Mitigation', 'Certifications'] }
      ]
    }
  },

  // ============================================================================
  // PILLAR 5: SPHERE PRODUCT & POSITIONING
  // ============================================================================
  {
    id: 'sphere',
    title: 'Pillar 5: Sphere Product & Positioning',
    shortTitle: 'Sphere',
    description: 'Deep knowledge of Sphere\'s products, metrics, and competitive positioning.',
    color: 'purple',
    overview: `**Why This Pillar Matters**

This pillar is where your payments knowledge becomes Sphere-specific. You need to articulate what we do, how we're different, and why we win.`,
    sections: [
      {
        id: 'sphere-origin',
        title: '5.1 Sphere Origin Story',
        curriculum: {
          objectives: [
            'Articulate Sphere\'s founding story',
            'Explain the market opportunity',
            'Connect origin to current mission'
          ],
          keyConcepts: [
            'Founded during FTX collapse and regional banking crisis',
            '"Being small is the advantage"',
            'Enterprise focus from day one'
          ]
        },
        learn: {
          introduction: 'Sphere was founded at a unique moment — when trust in crypto was at its lowest and traditional banking was also failing.',
          coreQuestion: 'Why does Sphere exist?',
          foundingContext: {
            title: 'Founding Context',
            events: [
              { event: 'FTX Collapse (Nov 2022)', impact: 'Crypto trust destroyed, need for regulated infrastructure' },
              { event: 'Regional Banking Crisis (Mar 2023)', impact: 'SVB, Signature — traditional banking also fragile' },
              { event: 'USDC Depeg', impact: 'Even "safe" stablecoins need risk management' }
            ]
          },
          arnoldQuotes: {
            title: 'Arnold on Why Sphere',
            quotes: [
              { quote: 'When we first started, people thought it was a really dumb idea to build in stablecoins. Now people think it\'s a really good idea.', context: 'Market timing' },
              { quote: 'Being small is the advantage. These operators don\'t want to go live in Libya.', context: 'Hard markets' }
            ]
          },
          keyTakeaway: 'Sphere was born in crisis, built for resilience, focused on hard markets.'
        },
        exercise: {
          title: 'Exercise 5.1 — Origin Story',
          prompt: 'Customer asks: "Why trust a company founded during the crypto crash?" Respond.',
          criteria: ['Acknowledge concern', 'Turn to advantage', 'Differentiation']
        },
        quiz: [
          { q: 'Sphere founded during:', options: ['Bull market', 'FTX collapse period', 'Before crypto', '2010'], correct: 1 },
          { q: '"Being small is advantage" because:', options: ['Lower costs', 'Willingness to serve hard markets', 'Faster tech', 'Less regulation'], correct: 1 }
        ]
      },
      {
        id: 'product-architecture',
        title: '5.2 Product Architecture',
        curriculum: {
          objectives: [
            'Explain Sphere\'s product components',
            'Describe the API-first approach',
            'Articulate the stablecoin sandwich flow'
          ],
          keyConcepts: [
            'API-first infrastructure for B2B',
            'Stablecoin sandwich: Fiat → Stablecoin → Fiat',
            'Compliance embedded, not bolted on'
          ]
        },
        learn: {
          introduction: 'Sphere is API-first payment infrastructure. Businesses integrate our APIs to move money globally.',
          coreQuestion: 'How does Sphere actually work?',
          productComponents: {
            title: 'Product Components',
            items: [
              { component: 'Payment API', description: 'Initiate and track payments' },
              { component: 'Compliance Engine', description: 'KYC, AML, sanctions screening' },
              { component: 'Settlement Layer', description: 'Stablecoin-based settlement' },
              { component: 'Treasury Management', description: 'Multi-currency, multi-asset' },
              { component: 'Reporting', description: 'Tracking, reconciliation' }
            ]
          },
          paymentFlow: {
            title: 'The Stablecoin Sandwich',
            steps: [
              { step: 1, action: 'Customer initiates via API', detail: 'Fiat in' },
              { step: 2, action: 'Convert to stablecoin', detail: 'USDC, USDT' },
              { step: 3, action: 'Compliance screening', detail: 'Before settlement' },
              { step: 4, action: 'Stablecoin transfer', detail: 'Minutes' },
              { step: 5, action: 'Local payout', detail: 'Fiat out' }
            ],
            keyPoint: 'End users never touch crypto.'
          },
          keyTakeaway: 'Sphere is API-first. Stablecoins are invisible plumbing. Compliance is embedded.'
        },
        exercise: {
          title: 'Exercise 5.2 — Product Explanation',
          prompt: 'Fintech founder asks how to integrate Sphere. Explain.',
          criteria: ['Integration clear', 'Flow explained', 'Compliance addressed']
        },
        quiz: [
          { q: 'Sphere\'s primary interface:', options: ['Mobile app', 'Web only', 'API-first', 'Phone'], correct: 2 },
          { q: 'End users in stablecoin sandwich:', options: ['Hold crypto', 'Never touch crypto', 'Need wallets', 'Trade'], correct: 1 }
        ]
      },
      {
        id: 'performance-metrics',
        title: '5.3 Performance Metrics',
        curriculum: {
          objectives: [
            'Know Sphere\'s key performance metrics',
            'Explain settlement time statistics',
            'Articulate reliability and uptime'
          ],
          keyConcepts: [
            'Median settlement: 15-30 minutes',
            '99th percentile (before 3pm): same day',
            '$2.5B+ annualized volume'
          ]
        },
        learn: {
          introduction: 'Metrics matter for enterprise sales.',
          coreQuestion: 'How fast and reliable is Sphere?',
          coreMetrics: {
            title: 'Core Metrics',
            items: [
              { metric: 'Annualized Volume', value: '$2.5B+' },
              { metric: 'B2B Customers', value: '150+' },
              { metric: 'Active Accounts', value: '1,847' },
              { metric: 'Median Settlement', value: '15-30 minutes' },
              { metric: '99th Percentile (before 3pm)', value: 'Same day' },
              { metric: 'Regulated Entities', value: '27 across 18 jurisdictions' }
            ]
          },
          arnoldQuote: {
            quote: 'We\'re in the 99th percentile of settlement. If you send before 3pm, same day.',
            speaker: 'Arnold Lee'
          },
          keyTakeaway: '15-30 minute median, same-day 99th percentile.'
        },
        exercise: {
          title: 'Exercise 5.3 — Metrics Presentation',
          prompt: 'Create one-page metrics summary for enterprise prospect.',
          criteria: ['Metrics accurate', 'Comparison clear', 'Professional']
        },
        quiz: [
          { q: 'Median settlement time:', options: ['2-5 days', '24 hours', '15-30 minutes', 'Instant'], correct: 2 },
          { q: 'Annualized volume:', options: ['$25M', '$250M', '$2.5B+', '$25B'], correct: 2 }
        ]
      },
      {
        id: 'competitive-positioning',
        title: '5.4 Competitive Positioning',
        curriculum: {
          objectives: [
            'Articulate Sphere\'s competitive advantages',
            'Handle competitor objections',
            'Position against traditional and crypto alternatives'
          ],
          keyConcepts: [
            'vs Traditional: Speed, cost, transparency',
            'vs Crypto-native: Compliance, institutional focus',
            'Unique: Hard markets + compliance + stablecoin rails'
          ]
        },
        learn: {
          introduction: 'Understanding competition helps you position Sphere effectively.',
          coreQuestion: 'Why Sphere over alternatives?',
          vsTraditional: {
            title: 'vs Traditional Banks',
            headers: ['Dimension', 'Traditional', 'Sphere'],
            rows: [
              ['Settlement', '2-5 days', '15-30 min'],
              ['Cost', '~6%', '< 1%'],
              ['Transparency', 'Black box', 'Real-time'],
              ['Hours', 'Banking hours', '24/7']
            ]
          },
          vsCryptoNative: {
            title: 'vs Crypto-Native',
            headers: ['Dimension', 'Crypto-Native', 'Sphere'],
            rows: [
              ['Target', 'Retail/DeFi', 'Enterprise B2B'],
              ['Compliance', 'Minimal', 'Built-in'],
              ['Fiat Integration', 'Weak', 'Core'],
              ['Licenses', 'Unclear', 'Licensed MSB']
            ]
          },
          keyTakeaway: 'Crypto speed + institutional compliance = where others can\'t compete.'
        },
        exercise: {
          title: 'Exercise 5.4 — Competitive Objection',
          prompt: 'Prospect: "Why not just use [major bank]?" Respond.',
          criteria: ['Acknowledge', 'Pain points', 'Solution', 'Proof']
        },
        quiz: [
          { q: 'vs traditional banks, Sphere wins on:', options: ['History', 'Speed and cost', 'Branches', 'Brand'], correct: 1 },
          { q: 'vs crypto-native, Sphere wins on:', options: ['Less regulation', 'Compliance and fiat', 'More tokens', 'Prices'], correct: 1 }
        ]
      },
      {
        id: 'use-cases',
        title: '5.5 Use Cases',
        curriculum: {
          objectives: [
            'Articulate key use cases',
            'Tell customer stories',
            'Match use cases to needs'
          ],
          keyConcepts: [
            'Cross-border B2B payments',
            'Treasury management',
            'International payroll'
          ]
        },
        learn: {
          introduction: 'Concrete use cases make Sphere real for prospects.',
          coreQuestion: 'What do customers use Sphere for?',
          primaryUseCases: {
            title: 'Primary Use Cases',
            items: [
              { useCase: 'Cross-Border B2B', pain: '2-5 days, high fees', solution: '15-30 min, <1%' },
              { useCase: 'International Payroll', pain: 'Complex, expensive', solution: 'Fast, low-cost' },
              { useCase: 'Treasury Management', pain: 'Trapped capital', solution: 'Real-time settlement' },
              { useCase: 'Marketplace Payouts', pain: 'Slow cross-border', solution: 'Same-day global' }
            ]
          },
          bobAndAhmed: {
            title: 'Bob and Ahmed Story',
            summary: 'Bob (Texas) ships machinery. Ahmed (Nigeria) needs it. Swift takes T+2 to T+10. Sphere: minutes.',
            quote: '"No one actually knows how long a Swift wire will take." — Arnold Lee'
          },
          keyTakeaway: 'Real problems, real solutions — faster, cheaper, transparent.'
        },
        exercise: {
          title: 'Exercise 5.5 — Use Case Development',
          prompt: 'UAE trading company asks what Sphere looks like for them. Develop use case.',
          criteria: ['Pain points', 'Capabilities', 'Benefits', 'Next steps']
        },
        quiz: [
          { q: 'Most common use case:', options: ['Trading', 'Cross-border B2B', 'Retail', 'Investment'], correct: 1 },
          { q: 'Bob and Ahmed illustrates:', options: ['Volatility', 'Cross-border pain', 'Security', 'Returns'], correct: 1 }
        ]
      }
    ],
    masterQuiz: {
      title: 'Pillar 5 Mastery Assessment',
      passingScore: 70,
      scenario: 'Presenting Sphere to enterprise customer.',
      questions: [
        { type: 'multiple_choice', question: 'Median settlement:', options: ['2-5 days', '24 hours', '15-30 min', 'Instant'], correct: 2 },
        { type: 'multiple_choice', question: 'Founded during:', options: ['Bull market', 'FTX collapse', 'Before crypto', '2010'], correct: 1 },
        { type: 'analysis', question: 'Explain stablecoin sandwich to non-technical CFO.', rubric: ['No jargon', 'Clear flow', 'Benefits'] }
      ]
    }
  },

  // ============================================================================
  // PILLAR 6: THE 15 COMPLIANCE QUESTIONS
  // ============================================================================
  {
    id: 'questions',
    title: 'Pillar 6: The 15 Compliance Questions',
    shortTitle: '15 Questions',
    description: 'Master the questions every sophisticated counterparty will ask.',
    color: 'slate',
    overview: `**Why This Pillar Matters**

These are the questions that determine whether a deal moves forward. Every bank, regulator, and enterprise partner will ask some version of these.

Arnold identified these 15 questions as the ones Sphere faces repeatedly. Master them.`,
    sections: [
      {
        id: 'licensing-questions',
        title: '6.1 Licensing & Classification',
        curriculum: {
          objectives: [
            'Answer licensing questions confidently',
            'Explain classification across jurisdictions',
            'Handle "aren\'t you just crypto" objection'
          ],
          keyConcepts: [
            'MSB/Money Transmitter classification',
            '27 regulated entities, 18 jurisdictions',
            'Compliance-native positioning'
          ]
        },
        learn: {
          introduction: 'Licensing questions come first. Be ready.',
          questions: [
            {
              number: 1,
              question: 'What licenses does Sphere hold?',
              shortAnswer: 'FinCEN registered MSB, Money Transmitter licenses, 27 entities across 18 jurisdictions, SOC 2 and ISO 27001 certified.',
              doNotSay: 'We\'re working on licenses / Crypto doesn\'t need licenses'
            },
            {
              number: 2,
              question: 'How is Sphere classified?',
              shortAnswer: 'Licensed Money Services Business — B2B payment infrastructure. NOT an exchange, bank, or custodian.',
              doNotSay: 'We\'re a crypto company / We\'re like Coinbase'
            },
            {
              number: 3,
              question: 'Aren\'t you just another crypto company?',
              shortAnswer: 'No. Licensed payment infrastructure using stablecoins as settlement rails — like banks use SWIFT. Compliance-native, not crypto-native.',
              doNotSay: 'Yes we\'re crypto / Regulation doesn\'t apply'
            }
          ],
          keyTakeaway: 'Lead with licenses. Differentiate from crypto speculation immediately.'
        },
        exercise: {
          title: 'Exercise 6.1 — Licensing Roleplay',
          prompt: 'Bank says: "We don\'t work with crypto companies." Reframe Sphere.',
          criteria: ['Reframes', 'Cites licenses', 'Opens dialogue']
        },
        quiz: [
          { q: 'First thing to establish:', options: ['Features', 'Licensing', 'Pricing', 'Tech'], correct: 1 }
        ]
      },
      {
        id: 'aml-questions',
        title: '6.2 AML & Compliance Program',
        curriculum: {
          objectives: [
            'Answer AML program questions',
            'Explain sanctions screening',
            'Demonstrate compliance depth'
          ],
          keyConcepts: [
            'Pre-settlement compliance',
            'Real-time sanctions screening',
            'Travel Rule compliance'
          ]
        },
        learn: {
          introduction: 'AML questions test whether you\'re serious about compliance.',
          questions: [
            {
              number: 4,
              question: 'What is your AML/KYC program?',
              shortAnswer: 'Comprehensive: KYC at onboarding, real-time transaction monitoring, sanctions screening every transaction, automated SAR workflows. Compliance BEFORE settlement.',
              emphasis: 'Pre-settlement, not post-settlement'
            },
            {
              number: 5,
              question: 'How do you handle sanctions screening?',
              shortAnswer: 'Real-time on every transaction: OFAC, UN, EU, local lists. Screen individuals, entities, jurisdictions, wallet addresses. Never settle without clearance.',
              emphasis: 'Real-time, comprehensive'
            },
            {
              number: 6,
              question: 'Are you Travel Rule compliant?',
              shortAnswer: 'Yes. Collect and transmit originator/beneficiary info above thresholds (US: $3K, UAE: AED 3.5K, EU: €1K). Support TRISA, Notabene protocols.',
              emphasis: 'Mandatory for institutional adoption'
            }
          ],
          keyTakeaway: 'Emphasize pre-settlement compliance. This differentiates from crypto cowboys.'
        },
        exercise: {
          title: 'Exercise 6.2 — AML Deep Dive',
          prompt: 'Walk through what happens when a transaction triggers a sanctions hit.',
          criteria: ['Process clear', 'Escalation defined', 'Resolution explained']
        },
        quiz: [
          { q: 'Sphere screens sanctions:', options: ['Weekly', 'Real-time', 'Monthly', 'Never'], correct: 1 }
        ]
      },
      {
        id: 'stablecoin-questions',
        title: '6.3 Stablecoin Risk',
        curriculum: {
          objectives: [
            'Answer stablecoin risk questions honestly',
            'Explain depeg risk and mitigation',
            'Build credibility through honesty'
          ],
          keyConcepts: [
            'Acknowledge risks honestly',
            'USDC depeg case study',
            'Transitory holdings minimize exposure'
          ]
        },
        learn: {
          introduction: 'Sophisticated counterparties know stablecoins have risks. Don\'t pretend otherwise.',
          questions: [
            {
              number: 7,
              question: 'What if the stablecoin depegs during a transaction?',
              shortAnswer: 'Risk exists — USDC hit $0.87 during SVB. We mitigate: hold for minutes not days, multiple issuers, contingency procedures.',
              honesty: 'Never claim risk-free. Acknowledge, then mitigate.'
            },
            {
              number: 8,
              question: 'Which stablecoins do you use?',
              shortAnswer: 'Primarily USDC (regulated, transparent) and USDT (highest liquidity). We\'re stablecoin-agnostic infrastructure.',
              emphasis: 'Selection based on corridor needs'
            },
            {
              number: 9,
              question: 'What if a stablecoin issuer is shut down?',
              shortAnswer: 'Multi-issuer architecture means no single dependency. Can route through alternatives. Holdings measured in minutes.',
              emphasis: 'Diversification and speed'
            }
          ],
          keyTakeaway: 'Acknowledge risks honestly, then explain mitigation. Credibility through honesty.'
        },
        exercise: {
          title: 'Exercise 6.3 — Stablecoin Risk',
          prompt: 'Risk officer: "USDC depeg scared us. Why trust stablecoins?" Respond.',
          criteria: ['Acknowledge', 'Explain event', 'Describe mitigation']
        },
        quiz: [
          { q: 'USDC traded at during SVB:', options: ['$1.00', '$0.95', '$0.87', '$0.50'], correct: 2 }
        ]
      },
      {
        id: 'operational-questions',
        title: '6.4 Operational & Settlement',
        curriculum: {
          objectives: [
            'Answer operational questions with real metrics',
            'Explain settlement process',
            'Demonstrate reliability'
          ],
          keyConcepts: [
            'Median: 15-30 minutes',
            '99th percentile: same day',
            'Four-ledger reconciliation'
          ]
        },
        learn: {
          introduction: 'Operational questions test whether you can deliver.',
          questions: [
            {
              number: 10,
              question: 'What is your actual settlement time?',
              shortAnswer: 'Median: 15-30 minutes. 99th percentile (before 3pm): same day. Traditional: 2-5 days.',
              arnoldQuote: '"We\'re in the 99th percentile of settlement."'
            },
            {
              number: 11,
              question: 'What happens if a payment fails?',
              shortAnswer: 'Tiered incident management (P1-P4), 24/7 monitoring, defined escalation, customer communication, blameless post-mortems.',
              emphasis: 'Process for when things go wrong'
            },
            {
              number: 12,
              question: 'How do you handle reconciliation?',
              shortAnswer: 'Four-ledger reconciliation: client bank, Sphere bank, blockchain, destination bank. Automated matching with exception handling.',
              emphasis: 'Complexity acknowledged and managed'
            }
          ],
          keyTakeaway: 'Lead with real metrics. Show you have processes for when things go wrong.'
        },
        exercise: {
          title: 'Exercise 6.4 — Operational Scenario',
          prompt: 'Customer\'s $2M shows pending for 6 hours. Walk through response.',
          criteria: ['Investigation', 'Communication', 'Resolution']
        },
        quiz: [
          { q: 'Median settlement:', options: ['2-5 days', '24 hours', '15-30 min', 'Instant'], correct: 2 }
        ]
      },
      {
        id: 'partnership-questions',
        title: '6.5 Partnership & Integration',
        curriculum: {
          objectives: [
            'Answer partnership questions',
            'Set clear expectations',
            'Close with next steps'
          ],
          keyConcepts: [
            '4-8 weeks typical integration',
            'KYC docs and AML policy required',
            'Dedicated support model'
          ]
        },
        learn: {
          introduction: 'Partnership questions determine if you\'re easy to work with.',
          questions: [
            {
              number: 13,
              question: 'How long does integration take?',
              shortAnswer: 'API integration: 2-4 weeks. Full go-live including compliance: 4-8 weeks typical.',
              details: 'Sandbox available, documentation ready'
            },
            {
              number: 14,
              question: 'What do you need from us?',
              shortAnswer: 'KYC docs (corporate, beneficial ownership), AML policy, technical resources for integration, compliance contact.',
              emphasis: 'Clear requirements upfront'
            },
            {
              number: 15,
              question: 'What ongoing support?',
              shortAnswer: 'Dedicated account manager, 24/7 technical support, quarterly reviews, proactive regulatory updates.',
              emphasis: 'We\'re here after the sale'
            }
          ],
          keyTakeaway: 'Make it easy to say yes. Clear timelines, requirements, and support.'
        },
        exercise: {
          title: 'Exercise 6.5 — Partnership Pitch',
          prompt: 'Prospect: "We\'ve been burned by fintechs who disappear." Address.',
          criteria: ['Acknowledge', 'Describe support', 'Offer references']
        },
        quiz: [
          { q: 'Typical integration timeline:', options: ['1 week', '4-8 weeks', '6 months', '1 year'], correct: 1 }
        ]
      },
      {
        id: 'masterclass',
        title: '6.6 Putting It All Together',
        curriculum: {
          objectives: [
            'Handle rapid-fire questions',
            'Maintain composure',
            'Close with confidence'
          ],
          keyConcepts: [
            'Anticipate next question',
            'Bridge to strengths',
            'Always close with next step'
          ]
        },
        learn: {
          introduction: 'Real conversations aren\'t linear. Handle questions in any order and close strong.',
          tips: [
            { tip: 'Anticipate the next question', explanation: 'Licensing → AML → Stablecoin risk. Be ready.' },
            { tip: 'Bridge to strengths', explanation: 'Every answer connects to what makes Sphere different.' },
            { tip: 'Acknowledge honestly', explanation: 'Dismissing concerns loses credibility.' },
            { tip: 'Use specific numbers', explanation: '"15-30 minutes" beats "fast"' },
            { tip: 'Know when to follow up', explanation: 'Better to follow up than guess wrong.' },
            { tip: 'Close with next steps', explanation: 'Every conversation needs a clear next action.' }
          ],
          closingExample: '"We\'ve covered licensing, compliance, and settlement. Sphere offers institutional-grade infrastructure with 15-30 minute settlement. I\'d suggest a technical deep-dive next week. Does Tuesday work?"',
          keyTakeaway: 'Master the 15 questions, anticipate patterns, always close with next step.'
        },
        exercise: {
          title: 'Exercise 6.6 — Full Roleplay',
          prompt: '15 minutes with a UAE bank CRO who\'s skeptical of crypto. Go.',
          criteria: ['Strong opening', 'Handles objections', 'Uses metrics', 'Closes with next steps']
        },
        quiz: [
          { q: 'When you don\'t know:', options: ['Guess', 'Follow up later', 'Change subject', 'End meeting'], correct: 1 },
          { q: 'Every conversation ends with:', options: ['Nothing', 'Clear next step', 'Pricing', 'Contract'], correct: 1 }
        ]
      }
    ],
    masterQuiz: {
      title: 'Pillar 6 Mastery Assessment',
      passingScore: 70,
      scenario: 'Compliance review with major UAE bank.',
      questions: [
        { type: 'multiple_choice', question: 'First question from compliance:', options: ['Pricing', 'Licensing', 'Tech', 'Marketing'], correct: 1 },
        { type: 'multiple_choice', question: 'When asked about depeg:', options: ['Deny', 'Acknowledge and mitigate', 'Change subject', 'Not your problem'], correct: 1 },
        { type: 'roleplay', question: 'Bank: "We don\'t work with crypto." Respond.', rubric: ['Reframes', 'Credentials', 'Opens dialogue'] }
      ]
    }
  }
];

// Export types
export type Pillar = typeof pillarsData[number];
export type Section = Pillar['sections'][number];

