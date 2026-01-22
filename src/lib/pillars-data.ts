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
              example: 'You hit "Send" on a wire transfer. Your bank receives the instruction. At this moment, you\'ve initiated — but no money has moved.',
              partiesInvolved: {
                title: 'Who Is Involved at Initiation?',
                parties: [
                  {
                    name: 'The Customer (Payer)',
                    role: 'Initiates the payment instruction',
                    responsibility: 'Provides beneficiary details, authorizes the transaction, ensures sufficient funds'
                  },
                  {
                    name: 'The Originating Bank',
                    role: 'Receives and validates the instruction',
                    responsibility: 'Confirms customer identity, checks account balance, validates beneficiary information format'
                  }
                ]
              },
              riskExplained: {
                title: 'Why Does the Customer Bear Risk at Initiation?',
                explanation: 'At initiation, the customer has provided an instruction but the bank hasn\'t committed to executing it yet. If the instruction contains errors (wrong account number, invalid beneficiary name, insufficient details), the payment will fail — and the customer bears responsibility for providing correct information. The bank is simply receiving an order; they haven\'t acted on it.',
                realWorldScenario: 'You submit a wire with a typo in the beneficiary account number. Your bank hasn\'t sent anything yet — they\'re just processing your request. If they catch the error, they\'ll reject it. If they don\'t, and the payment fails later, you bear the cost of correction and delay.',
                whatCanGoWrong: [
                  'Invalid beneficiary account number',
                  'Incorrect SWIFT/BIC code',
                  'Missing required reference information',
                  'Insufficient funds in account',
                  'Payment instruction doesn\'t meet bank\'s formatting requirements'
                ]
              }
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
              warning: 'A payment can clear successfully and STILL never settle. Clearing is just agreement — not money movement.',
              partiesInvolved: {
                title: 'Who Is Involved at Clearing?',
                parties: [
                  {
                    name: 'Messaging Network (SWIFT, FedACH)',
                    role: 'Transmits and validates the payment message',
                    responsibility: 'Ensures message format is correct, routes to proper destination, confirms delivery'
                  },
                  {
                    name: 'Correspondent Bank(s)',
                    role: 'Intermediaries between originating and beneficiary banks',
                    responsibility: 'Validate compliance (AML/sanctions), confirm beneficiary account exists, prepare for settlement. Correspondent banks exist because not all banks have direct relationships with each other.',
                    whyTheyExist: 'If your bank in Texas doesn\'t have a direct relationship with a bank in Lagos, they need a correspondent bank (often in New York or London) that has relationships with both. Each correspondent adds time, fees, and another compliance checkpoint.'
                  },
                  {
                    name: 'Beneficiary Bank',
                    role: 'Receives the payment message and prepares to credit customer',
                    responsibility: 'Confirms account details match, performs their own compliance screening, notifies customer of incoming payment'
                  }
                ]
              },
              riskExplained: {
                title: 'Why Does the Sending Bank Now Bear Risk?',
                explanation: 'Once clearing begins, the originating bank has committed to the payment. They\'ve debited the customer\'s account and sent the instruction into the payment network. At this point, the customer\'s money is "in flight" — gone from their account but not yet received by the beneficiary. If anything goes wrong during clearing (correspondent bank rejects it, compliance hold, beneficiary account closed), the sending bank must unwind the transaction, return funds, and manage the operational mess.',
                realWorldScenario: 'Your bank sends a $50,000 wire to Nigeria. The message goes through SWIFT to a correspondent in London, then to a correspondent in Lagos, then to the beneficiary bank. At the Lagos correspondent, the payment gets flagged for enhanced due diligence because the reference field mentions "agricultural equipment" and they want documentation. The payment is in limbo. Your money is gone from your account. The receiver hasn\'t gotten it. Your bank can\'t just "cancel" it — they have to negotiate with the correspondent. This is clearing risk.',
                whatCanGoWrong: [
                  'Correspondent bank rejects payment due to risk appetite',
                  'Beneficiary account frozen or closed',
                  'Compliance hold for sanctions or AML review (can take days or weeks)',
                  'Beneficiary name doesn\'t match account (requires manual verification)',
                  'Cut-off time missed — payment delayed to next business day',
                  'FX rate moves against you while payment is clearing',
                  'Nostro account (correspondent account) has insufficient balance'
                ]
              }
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
              example: 'Fedwire debits Bank A\'s reserve account and credits Bank B\'s. Done. Final. Irrevocable.',
              partiesInvolved: {
                title: 'Who Is Involved at Settlement?',
                parties: [
                  {
                    name: 'Central Bank Settlement System',
                    role: 'Moves actual value between banks',
                    responsibility: 'Maintains reserve accounts for commercial banks, executes final settlement by debiting one bank and crediting another on the central bank ledger. Examples: Fedwire (US), TARGET2 (EU), CHAPS (UK).'
                  },
                  {
                    name: 'Originating Bank',
                    role: 'Sends final settlement instruction',
                    responsibility: 'Ensures sufficient reserves at central bank to cover the payment'
                  },
                  {
                    name: 'Beneficiary Bank',
                    role: 'Receives settled funds',
                    responsibility: 'Credits customer account once settlement is confirmed'
                  }
                ]
              },
              riskExplained: {
                title: 'Why Is Risk Eliminated at Settlement?',
                explanation: 'Settlement happens on the central bank ledger — the most trusted ledger in the financial system. When Fedwire debits Bank A and credits Bank B, that transaction is final, irrevocable, and backed by law. There\'s no credit risk (central bank can\'t default), no reversal mechanism, and legal finality. The payment is done.',
                realWorldScenario: 'After all the correspondent approvals and compliance checks, the payment reaches the final step. The sending bank\'s Fedwire account is debited $50,000. The receiving bank\'s Fedwire account is credited $50,000. The Federal Reserve has moved money on its books. This is settlement. The beneficiary bank can now safely credit their customer\'s account because they have the money.',
                keyPoint: 'This is why central banks matter. Only they can provide zero-credit-risk settlement. No private system, no blockchain, and no technology company can replicate this function without sovereign backing.'
              }
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
            keyInsight: 'SpherePay\'s value is in the settlement layer — not faster messaging.',
            deepDive: {
              title: 'How Sphere Achieves Settlement Layer Value Using Stablecoins',
              problem: 'Traditional cross-border payments are slow because settlement requires moving money through correspondent banking chains, across time zones, and through central bank systems that operate on business hours. The MESSAGING is already fast (SWIFT messages arrive in seconds) — the delay is in SETTLEMENT.',
              sphereApproach: [
                {
                  step: '1. Sender Side - Fiat to Stablecoin',
                  explanation: 'Customer deposits local currency (USD, AED, EUR) with a licensed on-ramp partner. That partner converts the fiat to stablecoins (USDC, USDT) and sends them to Sphere\'s system. This happens in minutes, not days, because stablecoins settle on blockchain rails 24/7.',
                  traditional: 'Initiate wire → Wait for correspondent banks → Wait for central bank settlement → 2-5 days',
                  sphere: 'Deposit fiat → On-ramp converts to stablecoin → Stablecoin received in minutes'
                },
                {
                  step: '2. Cross-Border Movement - Stablecoin Transfer',
                  explanation: 'Sphere moves stablecoins across borders instantly via blockchain. No correspondent banks. No SWIFT messages. No waiting for business hours. The stablecoin transfer settles in minutes on-chain.',
                  traditional: 'SWIFT message → Correspondent in Country A → Correspondent in Country B → Beneficiary bank → Days of clearing',
                  sphere: 'Stablecoin transfer on blockchain → Settlement in 15-30 minutes, 24/7'
                },
                {
                  step: '3. Receiver Side - Stablecoin to Fiat',
                  explanation: 'Licensed off-ramp partner receives the stablecoins and converts them to local currency for the beneficiary. The beneficiary receives local fiat in their bank account, settled and final.',
                  traditional: 'Wait for final settlement → Beneficiary bank credits account after settlement confirmation → Days',
                  sphere: 'Off-ramp receives stablecoin → Converts to local fiat → Credits beneficiary → Minutes to hours'
                }
              ],
              whyStablecoins: {
                title: 'Why Stablecoins Enable This',
                reasons: [
                  {
                    reason: '24/7 Settlement',
                    explanation: 'Blockchains don\'t have banking hours. Traditional settlement systems (Fedwire, TARGET2) only operate during business hours. Stablecoins settle continuously.'
                  },
                  {
                    reason: 'Programmable Compliance',
                    explanation: 'Smart contracts can embed KYC/AML checks directly into the transfer. Traditional systems do compliance checks manually at each correspondent bank.'
                  },
                  {
                    reason: 'No Correspondent Chain',
                    explanation: 'With stablecoins, there\'s no need for 4+ correspondent banks. You move value peer-to-peer (or through Sphere\'s network) without intermediaries taking days to process.'
                  },
                  {
                    reason: 'Atomic Settlement',
                    explanation: 'When a stablecoin transaction confirms on-chain, it\'s settled. There\'s no "clearing vs settlement" delay. Traditional payments can clear (message confirmed) but not settle (money not moved) for days.'
                  }
                ]
              },
              criticalClarification: 'Sphere does NOT eliminate fiat settlement — fiat settlement still happens at the endpoints through licensed partners. What Sphere does is compress the CROSS-BORDER leg from days to minutes by using stablecoins as the settlement asset across borders. This is why we say "Sphere\'s value is in the settlement layer" — we\'re not making messages faster, we\'re making settlement faster.'
            }
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
          swiftAckExplained: {
            title: 'What Is a SWIFT ACK?',
            definition: 'ACK stands for "Acknowledgment." A SWIFT ACK (technically called an MT 900 or MT 910 message) is a confirmation message that tells you the receiving bank has received and accepted your payment instruction.',
            whatItMeans: [
              'The SWIFT message was delivered successfully',
              'The receiving bank has acknowledged receipt',
              'The message format was valid and accepted'
            ],
            whatItDoesNOTMean: [
              '❌ Money has moved',
              '❌ Settlement has occurred',
              '❌ The beneficiary has received funds',
              '❌ Compliance checks are complete',
              '❌ The payment cannot be rejected or delayed'
            ],
            analogy: 'Think of SWIFT ACK like a "read receipt" on an email. It tells you the recipient opened your email, but it doesn\'t mean they\'ve acted on it, agreed to it, or completed what you asked.'
          },
          dangerZone: {
            title: 'The Dangerous Statement',
            statement: '"I got the SWIFT ACK, so we\'re good."',
            whyDangerous: 'A SWIFT ACK only confirms message delivery — NOT that money has moved. This is one of the most common and costly mistakes in cross-border payments.',
            mythVsReality: [
              {
                myth: '✅ Payment went through',
                truth: '📨 Message was delivered to the next bank in the chain'
              },
              {
                myth: '✅ Money has moved',
                truth: '📋 An instruction was received and acknowledged'
              },
              {
                myth: '✅ We\'re done, release the goods',
                truth: '⏳ We\'ve barely started — settlement still pending'
              },
              {
                myth: '✅ Beneficiary can access the funds',
                truth: '🚫 Beneficiary won\'t see anything until settlement completes'
              }
            ],
            whatCanStillGoWrong: {
              title: 'What Can Go Wrong AFTER Getting SWIFT ACK',
              scenarios: [
                {
                  issue: 'Compliance Hold',
                  explanation: 'AML or sanctions screening flags the transaction. Payment freezes for days or weeks while under review.',
                  realExample: 'You send $100K for "industrial equipment" to a company in Iran. SWIFT ACK received. But the correspondent bank flags "Iran" and freezes it pending OFAC review. Weeks later, payment is rejected.'
                },
                {
                  issue: 'Beneficiary Mismatch',
                  explanation: 'Account number doesn\'t match the beneficiary name. Banks require manual verification.',
                  realExample: 'SWIFT ACK received. But the account number you provided is for "Ahmed Trading LLC" and you wrote "Ahmed Industrial Co." Payment rejected 3 days later.'
                },
                {
                  issue: 'Insufficient Correspondent Balance',
                  explanation: 'The correspondent bank\'s nostro account (their account at the next bank in the chain) doesn\'t have enough funds to cover your payment.',
                  realExample: 'Your bank sends the payment. SWIFT ACK received from correspondent. But correspondent\'s nostro is low. They wait to batch your payment with others. Adds 2 days.'
                },
                {
                  issue: 'Manual Review Required',
                  explanation: 'Payment amount, destination, or reference triggers a manual operations review.',
                  realExample: '$250K payment with reference "consulting services" to a newly opened account in Lagos. SWIFT ACK received, but kicks to ops team for enhanced due diligence. 5-day delay.'
                },
                {
                  issue: 'Cut-off Time Missed',
                  explanation: 'Payment arrived after the correspondent\'s processing cut-off time. Delayed to next business day.',
                  realExample: 'You send payment at 4:55 PM New York time. SWIFT ACK at 5:01 PM. But London correspondent closed at 5:00 PM. Payment waits until next day.'
                },
                {
                  issue: 'Correspondent Rejection',
                  explanation: 'The correspondent bank decides they don\'t want the business (too risky, wrong jurisdiction, relationship issue).',
                  realExample: 'Payment to Afghanistan for agricultural imports. SWIFT ACK received. 2 days later, correspondent bank says "we no longer service this corridor" and rejects.'
                }
              ]
            }
          },
          howToVerifySettlement: {
            title: 'How to Verify a Payment Is Actually Settled',
            introduction: 'Don\'t rely on SWIFT ACK. Here\'s what you should verify:',
            steps: [
              {
                step: '1. Confirm Settlement System Execution',
                what: 'Check that the payment has been processed through the actual settlement system (Fedwire, CHIPS, TARGET2, etc.)',
                how: 'Request a settlement confirmation from your bank, not just a SWIFT ACK. Ask: "Has this settled on Fedwire?" or "Do you have TARGET2 confirmation?"',
                evidence: 'MT 950 (Account Statement) showing debit from sending bank\'s nostro or settlement account'
              },
              {
                step: '2. Beneficiary Bank Confirmation',
                what: 'Verify the beneficiary\'s bank has received and credited the funds',
                how: 'Ask the beneficiary to check their account statement. Don\'t assume — confirm.',
                evidence: 'Beneficiary sends you a screenshot or statement showing the credit'
              },
              {
                step: '3. Irrevocability Confirmation',
                what: 'Ensure the payment is final and cannot be reversed',
                how: 'For high-value transactions, ask your bank: "Is this payment final and irrevocable?" Settlements through RTGS systems (Fedwire, CHAPS) are immediate and final. Other systems may have delay.',
                evidence: 'Written confirmation from your bank that settlement is complete and final'
              },
              {
                step: '4. Time-Based Reality Check',
                what: 'Understand the realistic timeline for your corridor',
                how: 'If you sent a payment to Nigeria on Monday and got SWIFT ACK on Monday, don\'t expect settlement until Wednesday or Thursday at earliest. Cross-border payments have structural delays.',
                evidence: 'Historical data on your payment corridor (ask your bank for average settlement times)'
              }
            ],
            bestPractice: 'For large or critical payments, require the beneficiary to confirm receipt in their account before releasing goods, services, or obligations. SWIFT ACK is not proof of payment.',
            sphereAdvantage: 'With Sphere, stablecoin transfers settle on-chain in 15-30 minutes. You can verify settlement by checking the blockchain transaction — it\'s transparent, timestamped, and final. No waiting for correspondent confirmations.'
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
          finalityBySystem: {
            title: 'Understanding Finality by Payment System',
            introduction: 'Different payment systems provide different levels of finality. Here\'s what you need to know about each:',
            systems: [
              {
                name: 'Fedwire (RTGS - Real-Time Gross Settlement)',
                when: 'Immediately upon processing',
                strength: '⭐⭐⭐⭐⭐ Strongest possible finality',
                explanation: 'Fedwire is operated by the Federal Reserve. When a Fedwire transaction processes, it is immediate, final, and irrevocable by law (UCC 4A, Regulation J). The Fed debits one bank and credits another on its master ledger. Done. No take-backs. No disputes. This is the gold standard of settlement finality.',
                legalBacking: 'Federal Reserve Act, UCC Article 4A, Regulation J',
                useCases: 'Large-value payments, real estate closings, securities settlement, time-sensitive transactions',
                keyPoint: 'If you need absolute certainty that a payment cannot be reversed, Fedwire is the answer.'
              },
              {
                name: 'CHIPS (Clearing House Interbank Payments System)',
                when: 'Same-day when net positions are released and settled',
                strength: '⭐⭐⭐⭐ Very strong finality',
                explanation: 'CHIPS is a private payment system that processes large-value USD transactions. Unlike Fedwire (which settles each payment individually), CHIPS nets payments throughout the day and settles the net positions via Fedwire at end of day. Once CHIPS releases the payment for settlement, it has finality.',
                legalBacking: 'CHIPS Rules and Regulations, backed by New York law',
                useCases: 'International USD transfers, correspondent banking, FX settlement',
                keyPoint: 'CHIPS provides strong finality once settlement occurs, but there\'s an intraday window where payments are conditional (pending net settlement).'
              },
              {
                name: 'ACH (Automated Clearing House)',
                when: '1-2 business days after initiation (during settlement window)',
                strength: '⭐⭐⭐ Good finality, but delayed',
                explanation: 'ACH batches payments and settles them through the Federal Reserve. Finality occurs when the Fed settles the ACH batch — typically 1-2 days after initiation. However, ACH has return windows (unauthorized debits can be returned for 60 days), so finality is not as absolute as RTGS.',
                legalBacking: 'NACHA Operating Rules, UCC 4A',
                useCases: 'Payroll, bill payments, consumer transactions',
                keyPoint: 'ACH is cheaper and efficient for bulk payments, but don\'t expect same-day finality. Returns are possible for unauthorized transactions.'
              },
              {
                name: 'Card Networks (Visa, Mastercard, Amex)',
                when: 'Only after chargeback window expires (60-120 days depending on card type)',
                strength: '⭐⭐ Weak finality',
                explanation: 'Card payments are authorized instantly but don\'t achieve finality for months. Cardholders have the right to dispute transactions (chargebacks) for 60-120 days. Merchants bear this risk. Even after settlement, funds can be clawed back if a chargeback is filed.',
                legalBacking: 'Card network rules (private contracts), consumer protection laws',
                useCases: 'Consumer purchases, e-commerce, point-of-sale',
                keyPoint: 'Card payments are convenient but risky for merchants. Finality is delayed and conditional. High chargeback risk for certain industries (travel, digital goods).'
              },
              {
                name: 'Cryptocurrency (Bitcoin, Ethereum, etc.)',
                when: 'Never achieves legal finality — only probabilistic certainty',
                strength: '⭐ No legal finality',
                explanation: 'Cryptocurrencies use consensus mechanisms (proof of work, proof of stake) to confirm transactions. After N confirmations, a transaction is "computationally impractical to reverse" — but there\'s no legal framework that defines finality. A 51% attack could theoretically reverse transactions. More importantly, courts don\'t recognize blockchain finality as legally binding.',
                legalBacking: 'None. No statute defines finality. No court precedent.',
                useCases: 'Crypto trading, speculative transfers, experimental payments',
                keyPoint: 'Crypto provides technical security (hard to reverse) but not legal finality (no law protects you if it\'s reversed). Enterprises and regulators care about legal finality.'
              }
            ],
            summary: 'When someone asks about "finality," they\'re asking: "If this payment is reversed, can I take legal action?" For Fedwire, the answer is yes — the law protects you. For crypto, the answer is unclear — you might have a blockchain record, but no legal recourse.'
          },
          comparison: {
            title: 'Legal Finality vs Technical Finality: Fedwire vs Bitcoin',
            headers: ['Aspect', 'Fedwire (Legal Finality)', 'Bitcoin (Technical Finality)'],
            rows: [
              ['Legal framework', 'Federal Reserve Act, UCC 4A, Regulation J - explicitly defines when finality occurs', 'No legal framework. No statute defines "final." Courts have no precedent.'],
              ['Dispute resolution', 'Federal courts with established precedent. Clear legal recourse.', 'No legal dispute mechanism. Code is law, but law doesn\'t recognize code.'],
              ['Reversal mechanism', 'Legally prohibited once processed. Cannot be reversed by Fed or banks.', 'Technically reversible via 51% attack (extremely unlikely but theoretically possible). No legal protection against it.'],
              ['Definition of "final"', 'Precisely defined: moment Fed processes the payment on its ledger', 'Probabilistic: "probably won\'t reverse after N confirmations"'],
              ['Enforceability', 'Backed by US government and court system', 'Self-enforcing via cryptography, but no legal backing']
            ],
            keyPoint: 'Bitcoin\'s finality is PROBABILISTIC and TECHNICAL. Fedwire\'s finality is LEGAL and ABSOLUTE. These are fundamentally different concepts.'
          },
          bitcoinClarification: {
            title: 'Bitcoin Finality: What It Actually Means',
            explanation: 'Bitcoin doesn\'t have "reversible" transactions in the traditional sense (like a chargeback), but it also doesn\'t have legal finality. Here\'s the nuanced truth:',
            technicalReality: {
              title: 'Technical Reality',
              points: [
                'After 6 confirmations (~1 hour), a Bitcoin transaction is "computationally impractical to reverse"',
                'The deeper a transaction is buried in the blockchain, the more secure it becomes',
                'A 51% attack could theoretically reverse transactions, but the cost would be astronomical ($billions) for major cryptocurrencies'
              ]
            },
            legalReality: {
              title: 'Legal Reality',
              points: [
                'No law defines when a Bitcoin transaction is "final"',
                'No court has ruled that Bitcoin transactions have legal finality',
                'If a Bitcoin transaction is reversed (even via 51% attack), there\'s no legal framework to enforce the original transaction',
                'Disputes over Bitcoin transactions have unclear legal status in most jurisdictions'
              ]
            },
            contrast: 'When Fedwire settles a payment, the law says it\'s final. When Bitcoin confirms a transaction, cryptography says it\'s extremely unlikely to be reversed — but the law is silent. That\'s the difference.'
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
            keyInsight: 'Using stablecoins as transport, with fiat settlement at endpoints.',
            howSphereComplements: {
              title: 'How Sphere Complements Central Banks',
              introduction: 'Sphere doesn\'t compete with central banks — we enhance their effectiveness by making cross-border value movement faster while maintaining fiat settlement at endpoints.',
              complementaryFunctions: [
                {
                  function: '1. Cross-Border Speed Without Replacing Settlement Infrastructure',
                  centralBankRole: 'Central banks provide domestic settlement systems (Fedwire, TARGET2, UAEFTS) that settle in their local currency with legal finality.',
                  sphereRole: 'Sphere uses stablecoins to move value BETWEEN jurisdictions rapidly (15-30 minutes), then settles into local fiat through the local central bank system at each endpoint.',
                  complement: 'Central banks remain the final settlement layer for fiat. Sphere simply optimizes the cross-border leg. We\'re like a fast highway between two cities — the cities (central banks) are still the origin and destination.',
                  example: 'UAE company pays US supplier. Traditional: AED → Central Bank of UAE → Correspondent → Correspondent → Fedwire → USD (2-5 days). Sphere: AED → CBUAE settlement → Stablecoin transfer (30 min) → Fedwire settlement → USD. Central banks still settle both endpoints — we just made the middle faster.'
                },
                {
                  function: '2. Reducing Pressure on Correspondent Banking',
                  centralBankRole: 'Central banks don\'t directly connect all banks globally. Correspondent banking fills the gap, but it\'s slow, expensive, and shrinking (de-risking).',
                  sphereRole: 'Sphere provides an alternative pathway that doesn\'t require 4+ correspondent banks. Licensed partners convert fiat to stablecoin (using local central bank settlement), move stablecoins cross-border, and convert back to fiat (using destination central bank settlement).',
                  complement: 'This reduces load on correspondent banking networks while still using central bank infrastructure at endpoints. Central banks benefit because cross-border payments become more efficient without requiring them to build new infrastructure.',
                  example: 'Nigerian bank wants to send money to Japan. Traditional path requires correspondents in London, New York, Tokyo — each with their own nostro accounts, compliance, and delays. Sphere path: Nigerian naira settles through Central Bank of Nigeria → stablecoin transfer → Japanese yen settles through Bank of Japan. No correspondent chain needed. Central banks still provide final settlement.'
                },
                {
                  function: '3. Supporting Financial Inclusion Without Circumventing Regulation',
                  centralBankRole: 'Central banks regulate financial systems to protect consumers, prevent crime, and maintain stability.',
                  sphereRole: 'Sphere embeds compliance (KYC/AML) and works with licensed partners in each jurisdiction. We don\'t bypass regulation — we make regulated cross-border payments accessible to more businesses.',
                  complement: 'Central banks want financial inclusion, but cross-border payments are hard for SMEs (expensive, slow, complex). Sphere makes central bank-settled payments accessible to smaller players while maintaining regulatory compliance.',
                  example: 'Small UAE importer wants to pay Vietnamese supplier. Traditional banks quote $50 fee and 5-day timeline. Importer can\'t afford it. Sphere: $8 fee, 30 minutes, full compliance. Money still settles through Central Bank of UAE and State Bank of Vietnam — just faster and cheaper.'
                },
                {
                  function: '4. Preparing for CBDC Integration',
                  centralBankRole: 'Many central banks are exploring Central Bank Digital Currencies (CBDCs) for domestic and cross-border use.',
                  sphereRole: 'Sphere\'s infrastructure is CBDC-ready. If/when CBDCs launch, we can integrate them as settlement assets alongside or instead of stablecoins.',
                  complement: 'Sphere is building the cross-border payment layer that CBDCs will need. Central banks focus on issuing digital currency; Sphere focuses on moving it across borders compliantly. We\'re complementary infrastructure.',
                  example: 'UAE launches digital dirham. Sphere integrates it into our network. Now cross-border payments can use digital dirham → stablecoin (or other CBDC) → digital dollar. Central banks issue the currency; Sphere moves it.'
                },
                {
                  function: '5. Providing 24/7 Access Without Competing with RTGS',
                  centralBankRole: 'Central bank RTGS systems operate during business hours (e.g., Fedwire 9 PM – 7 PM ET, TARGET2 7 AM – 6 PM CET).',
                  sphereRole: 'Sphere\'s stablecoin transfers operate 24/7/365. When RTGS systems are closed, Sphere can initiate transactions that settle when RTGS reopens.',
                  complement: 'Central banks don\'t need to run 24/7 operations. Sphere provides after-hours initiation with guaranteed settlement when central bank systems reopen. This is complementary, not competitive.',
                  example: 'Friday 7 PM in New York, urgent payment needed to Dubai (Saturday morning there, banks closed). Traditional: wait until Monday. Sphere: initiate stablecoin transfer immediately, settles through CBUAE when it opens Sunday, through Fedwire when it opens Monday. Central banks still provide final settlement — just with faster initiation.'
                }
              ],
              keyMessage: 'Sphere is infrastructure that sits BETWEEN central bank systems, making them more accessible and efficient for cross-border payments. We don\'t replace central banks — we make them work better together.',
              regulatorFriendlyFraming: 'When talking to regulators or central banks, emphasize: (1) Fiat settlement at all endpoints, (2) Full regulatory compliance, (3) Licensed partners in each jurisdiction, (4) CBDC-ready infrastructure, (5) Reduced systemic risk by eliminating long correspondent chains.'
            }
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
          glossary: {
            title: 'Key Terms You Need to Know',
            terms: [
              {
                term: 'Correspondent Bank',
                definition: 'A bank that provides services on behalf of another bank, typically in a foreign country. Used when two banks don\'t have a direct relationship.',
                example: 'Your bank in Texas doesn\'t have an account at a bank in Lagos. So your bank uses a correspondent bank in London that has relationships with both.'
              },
              {
                term: 'Nostro Account',
                definition: 'Latin for "our account with you." A nostro account is an account a bank holds at a foreign bank in foreign currency.',
                example: 'Bank of America has a EUR nostro account at Deutsche Bank in Germany. When BoA needs to send EUR to Europe, it debits this nostro account.',
                whyItMatters: 'Nostro accounts tie up capital. Banks must pre-fund them with millions or billions of dollars sitting idle, waiting to be used for payments.'
              },
              {
                term: 'Vostro Account',
                definition: 'Latin for "your account with us." The opposite of nostro — it\'s the account a foreign bank holds with you.',
                example: 'Deutsche Bank has a USD account at Bank of America. From Deutsche Bank\'s perspective, it\'s a nostro. From BoA\'s perspective, it\'s a vostro.'
              },
              {
                term: 'SWIFT BIC/SWIFT Code',
                definition: 'Bank Identifier Code — a unique 8 or 11-character code that identifies a specific bank for international wire transfers.',
                example: 'CHASUS33 = JPMorgan Chase, New York. The code tells SWIFT where to route payment messages.'
              },
              {
                term: 'Correspondent Banking Chain',
                definition: 'The series of banks involved in moving a payment from originating bank to beneficiary bank when they don\'t have a direct relationship.',
                example: 'Nigeria → Lagos correspondent → London correspondent → New York correspondent → US bank. Each hop adds time, cost, and risk.'
              },
              {
                term: 'Cut-off Time',
                definition: 'The deadline by which a bank must receive a payment to process it same-day. Miss the cut-off, and your payment waits until the next business day.',
                example: 'Fedwire cut-off is 6:30 PM ET. If your payment arrives at 6:35 PM, it waits until tomorrow.'
              },
              {
                term: 'T+N Settlement',
                definition: 'Trade date plus N days. T+2 means settlement occurs 2 business days after the trade/payment is initiated.',
                example: 'ACH is typically T+1 or T+2. Cross-border wires can be T+5 or T+10 depending on the corridor.'
              },
              {
                term: 'Payment Corridor',
                definition: 'The path between two countries/currencies for payments. Some corridors are fast and cheap (US-UK), others slow and expensive (US-Nigeria).',
                example: 'The USD-EUR corridor is highly liquid with many correspondent relationships. The USD-NGN corridor has fewer banks willing to service it (higher risk, lower volume).'
              },
              {
                term: 'De-risking',
                definition: 'When banks exit correspondent relationships with certain countries/regions due to compliance risk, even when the business is legitimate.',
                example: 'After 2008, many Western banks closed correspondent accounts for banks in Africa, Caribbean, Middle East due to AML/sanctions concerns. Result: fewer payment routes, higher costs.'
              }
            ]
          },
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
          identifyingCorrespondents: {
            title: 'How to Identify Correspondent Banks in Different Corridors',
            introduction: 'The number and identity of correspondent banks depends on the payment corridor, currency pair, and bank relationships. Here\'s how to identify them:',
            factors: [
              {
                factor: 'Currency Liquidity',
                explanation: 'Major currencies (USD, EUR, GBP, JPY) have fewer correspondent hops because more banks hold these currencies and have direct relationships.',
                highLiquidity: 'USD-EUR corridor: Often just 1-2 correspondents. Example: US bank → London correspondent → EU bank.',
                lowLiquidity: 'USD-NGN (Nigerian Naira) corridor: Often 3-4 correspondents. Example: US bank → New York correspondent → London correspondent → Lagos correspondent → Nigerian bank.'
              },
              {
                factor: 'Geographic Region',
                explanation: 'Payments to frontier markets require more correspondents because fewer banks are willing to maintain relationships there (due to risk, regulation, or low volume).',
                developedMarkets: 'US → UK → Germany: 1-2 hops, well-established correspondent relationships',
                frontierMarkets: 'US → Nigeria, Myanmar, Afghanistan: 3-5 hops, limited correspondent appetite'
              },
              {
                factor: 'Regulatory Risk',
                explanation: 'Countries under sanctions, with weak AML controls, or flagged by FATF have fewer correspondent banking relationships.',
                highRisk: 'Payments to Iran, North Korea, Venezuela: Very few correspondents willing to facilitate (if any)',
                mediumRisk: 'Payments to Pakistan, Kenya, Philippines: More correspondents than high-risk, but fewer than developed markets'
              },
              {
                factor: 'Bank Size and Relationships',
                explanation: 'Larger banks have more direct correspondent relationships. Smaller banks route through larger banks, adding hops.',
                largeBank: 'JPMorgan Chase has 50+ correspondent relationships globally. Direct paths to most major markets.',
                smallBank: 'Community bank in Texas has 2-3 correspondent relationships. Routes everything through larger US banks first.'
              }
            ],
            typicalCorridors: {
              title: 'Typical Correspondent Chains by Corridor',
              corridors: [
                {
                  corridor: 'US → UK (USD → GBP)',
                  hops: '1-2',
                  typicalChain: 'US bank → London correspondent or direct → UK bank',
                  speed: 'Same day to T+1',
                  reason: 'Highly liquid corridor, many banks have direct GBP accounts'
                },
                {
                  corridor: 'US → Nigeria (USD → NGN)',
                  hops: '3-4',
                  typicalChain: 'US bank → New York correspondent (JPM, BoA) → London correspondent (Standard Chartered, Citi) → Lagos correspondent (Zenith, GTBank) → Nigerian bank',
                  speed: 'T+3 to T+10',
                  reason: 'Few banks willing to hold NGN, heavy compliance requirements, low liquidity'
                },
                {
                  corridor: 'US → Brazil (USD → BRL)',
                  hops: '2-3',
                  typicalChain: 'US bank → New York correspondent → São Paulo correspondent (Itaú, Bradesco) → Brazilian bank',
                  speed: 'T+2 to T+5',
                  reason: 'Brazil has strict capital controls, requires local correspondent'
                },
                {
                  corridor: 'UAE → India (AED → INR)',
                  hops: '2-3',
                  typicalChain: 'UAE bank → Dubai correspondent (Emirates NBD, ADCB) → Mumbai correspondent (HDFC, ICICI) → Indian bank',
                  speed: 'T+1 to T+3',
                  reason: 'High volume corridor (remittances), but still requires local correspondent in India'
                },
                {
                  corridor: 'US → Japan (USD → JPY)',
                  hops: '1-2',
                  typicalChain: 'US bank → Tokyo correspondent (MUFG, Mizuho) or direct → Japanese bank',
                  speed: 'Same day to T+2',
                  reason: 'Major currency pair, strong banking relationships'
                }
              ]
            },
            howToResearch: {
              title: 'How to Research a Specific Corridor',
              steps: [
                'Ask your bank: "What correspondent banks do you use for payments to [country]?" They may or may not disclose the full chain, but it\'s worth asking.',
                'Check SWIFT directory: Use SWIFT\'s BIC directory (swift.com) to identify likely correspondents in the destination country.',
                'Look for regional hubs: Payments often route through financial hubs (London, New York, Singapore, Hong Kong) before reaching final destination.',
                'Industry reports: The BIS, World Bank, and IMF publish reports on payment corridors that identify common correspondent relationships.',
                'Trial and error: Send a small test payment and request detailed routing information from your bank.'
              ]
            }
          },
          table: {
            title: 'BIS/CPMI Identified Frictions',
            subtitle: 'The Bank for International Settlements and Committee on Payments and Market Infrastructures studied why cross-border payments are slow and expensive. Here are their findings with real examples:',
            headers: ['Friction', 'Impact', 'Real-World Example'],
            rows: [
              [
                'Fragmented data standards',
                'Manual reconciliation, errors, delays',
                'US banks use different payment message formats than EU banks. When a payment moves from US → EU, data fields don\'t match perfectly. Correspondent banks must manually reconcile, fix errors, or reject the payment. A single typo in the beneficiary name can cause a 3-day delay while banks exchange messages to clarify.'
              ],
              [
                'Complex compliance',
                '5+ regulatory regimes may apply',
                'Payment from UAE to Brazil touches: UAE Central Bank regulations, FATF standards, US sanctions (if routed through USD correspondent), Brazilian Central Bank rules, and potentially EU regulations if a European correspondent is involved. Each regulator has different KYC requirements, reporting standards, and sanctions lists. One mismatch = payment frozen.'
              ],
              [
                'Limited operating hours',
                '5pm New York = Frankfurt closed',
                'You send a payment from New York at 4:00 PM Friday to Germany. By the time it reaches the German correspondent, it\'s 10:00 PM Frankfurt time — bank is closed. Payment waits until Monday morning. Then Monday is a German holiday. Now it\'s Tuesday. 4 days lost to operating hours.'
              ],
              [
                'Funding requirements (Nostro accounts)',
                '$100M+ trapped in nostro accounts',
                'Bank of America needs to send EUR payments to Europe regularly. They maintain a €500M nostro account at Deutsche Bank — that\'s $500M+ sitting idle, earning minimal interest, just to have liquidity for EUR payments. Multiply this across 50+ currency pairs and hundreds of correspondent relationships = billions in trapped capital.'
              ],
              [
                'Long transaction chains',
                '4+ hops = 4+ failure points',
                'Payment from Philippines to Peru: Philippine bank → Singapore correspondent (hop 1) → New York correspondent (hop 2) → Panamanian correspondent (hop 3) → Peruvian bank (hop 4). Each hop can: reject the payment, hold it for compliance review, miss their cut-off time, have insufficient nostro balance, or charge fees. If hop 3 rejects, the payment bounces back through hop 2 and hop 1 before returning to sender. Timeline: 7-10 days, $80 in fees.'
              ]
            ],
            bisSource: 'Based on BIS/CPMI reports: "Enhancing Cross-border Payments" (2020) and "Targets for Addressing the Four Challenges of Cross-border Payments" (2021)'
          },
          warning: 'Technology does NOT remove jurisdiction. Even instant blockchain transfer still requires AML/KYC, capital controls, licensing, tax reporting, and sanctions screening.',
          sphereSolution: {
            title: 'How Sphere Addresses This',
            introduction: 'Sphere doesn\'t eliminate these frictions — we compress and optimize them. Here\'s how:',
            headers: ['Traditional Problem', 'Sphere Solution', 'How It Works'],
            rows: [
              [
                '4+ correspondent hops',
                'Direct stablecoin settlement',
                'Traditional: Your payment hops through 4 banks, each with own compliance, fees, cut-off times. Sphere: Convert to stablecoin at origin, transfer peer-to-peer on blockchain, convert to local fiat at destination. No correspondent chain. Licensed partners at each endpoint handle fiat conversion. Result: 4 hops become 2 conversions + 1 transfer.'
              ],
              [
                'Banking hours only (cut-off times)',
                '24/7 blockchain operations',
                'Traditional: Miss 5 PM cut-off in New York? Your payment waits until tomorrow. Weekend? Add 2 days. Sphere: Stablecoin transfers operate 24/7/365. Initiate payment Friday 11 PM, settles by Saturday morning. Fiat off-ramp processes when local banking hours resume, but the cross-border movement is done. No waiting for Monday.'
              ],
              [
                'Capital trapped in nostros',
                'No pre-funding needed',
                'Traditional: Banks maintain €500M nostro accounts at foreign banks just to have liquidity for payments. Capital sits idle. Sphere: On-ramps and off-ramps convert fiat to stablecoin on-demand. No need to pre-fund accounts in 50 currencies. Capital deployed only when needed, returned immediately after use. Frees billions in trapped liquidity.'
              ],
              [
                'Compliance at each hop (5+ regimes)',
                'Embedded compliance upfront',
                'Traditional: Each correspondent bank runs own compliance checks. Payment gets flagged at hop 3, frozen for 5 days pending review. Sphere: KYC/AML/sanctions screening happens upfront at on-ramp before payment initiates. Smart contracts enforce compliance rules. If payment doesn\'t pass compliance, it never enters the network. No mid-flight freezes.'
              ],
              [
                '2-5 day settlement (T+2 to T+10)',
                '15-30 minute median settlement',
                'Traditional: Correspondent chain takes days. Each bank processes during business hours, adds delays. Sphere: Stablecoin transfer confirms on-chain in minutes. Fiat conversion at endpoints adds minimal time (15-30 minutes total from fiat in → fiat out). Median settlement: under 30 minutes vs 2-5 days traditional.'
              ]
            ],
            clarifications: {
              title: 'What Sphere Does NOT Do',
              points: [
                '❌ Eliminate regulation - We work with licensed partners in each jurisdiction',
                '❌ Bypass banks entirely - Fiat on/off-ramps are through regulated financial institutions',
                '❌ Remove compliance - We embed it upfront instead of checking at each hop',
                '❌ Replace central banks - Fiat settlement still happens through traditional systems at endpoints',
                '✅ Compress the cross-border leg from days to minutes using stablecoins as transport'
              ]
            },
            realExample: {
              title: 'Real-World Comparison: UAE → Nigeria Payment',
              traditional: {
                timeline: 'Day 0: Initiate payment in Dubai. Day 1: Reaches correspondent in London. Day 2: London correspondent clears compliance, sends to Lagos correspondent. Day 3-5: Lagos correspondent performs enhanced due diligence. Day 5: Approved, settles to Nigerian bank. Day 6: Beneficiary receives funds. Total: 6 days.',
                cost: '$75 in correspondent fees',
                risks: 'Compliance hold at any hop, FX rate movement, correspondent rejection'
              },
              sphere: {
                timeline: 'Minute 0: Initiate payment in Dubai. Minute 5: AED converted to USDC at on-ramp. Minute 10: USDC transfer confirms on-chain. Minute 25: USDC converted to NGN at off-ramp. Minute 30: NGN credited to beneficiary account. Total: 30 minutes.',
                cost: '$8 in network fees',
                risks: 'Minimal - compliance completed upfront, no correspondent rejections, blockchain confirmation is deterministic'
              }
            }
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
  },

  // ============================================================================
  // FINAL EXAM: COMPREHENSIVE ASSESSMENT
  // ============================================================================
  {
    id: 'final-exam',
    title: 'Final Exam: Comprehensive Assessment',
    shortTitle: 'Final Exam',
    description: 'Demonstrate mastery across all pillars with a comprehensive assessment.',
    color: 'amber',
    overview: `**Final Exam Instructions**

This comprehensive assessment tests your knowledge across all six pillars. Complete each section to demonstrate your readiness for UAE counterparty engagement.

**What to expect:**
- Questions from all pillars
- Scenario-based assessments
- Time estimate: 45-60 minutes
- Passing score: 80%

**Before you begin:**
- Review any pillars where you scored below 80%
- Have the 15 Questions reference handy
- Take your time — quality over speed`,
    sections: [
      {
        id: 'exam-payments',
        title: 'Section 1: Payments Fundamentals',
        curriculum: {
          objectives: [
            'Demonstrate understanding of payment lifecycle',
            'Explain settlement finality',
            'Articulate cross-border complexity'
          ],
          keyConcepts: [
            'Initiation → Clearing → Settlement',
            'Messages ≠ Money',
            'Central bank role in settlement'
          ]
        },
        learn: {
          introduction: 'This section tests your understanding of traditional payments infrastructure — the foundation everything else builds on.',
          coreQuestion: 'Can you explain why cross-border payments are structurally hard?',
          sections: [],
          keyTakeaway: 'Review Pillar 1 if you need to refresh on payment fundamentals.'
        },
        exercise: {
          title: 'Payments Assessment Checklist',
          prompt: 'Before proceeding, confirm you can:\n\n☐ Explain the three stages of a payment (initiation, clearing, settlement)\n☐ Distinguish between messages and money movement\n☐ Explain what "settlement finality" means legally\n☐ Describe why correspondent banking creates friction\n☐ Articulate where Sphere fits in the payment chain',
          criteria: ['All items checked']
        },
        quiz: [
          { q: 'At which stage does risk get eliminated?', options: ['Initiation', 'Clearing', 'Settlement', 'All stages'], correct: 2 },
          { q: 'SWIFT primarily handles:', options: ['Settlement', 'Messaging', 'Compliance', 'FX conversion'], correct: 1 },
          { q: 'Settlement finality means:', options: ['Payment is fast', 'Payment is irrevocable', 'Payment is international', 'Payment is digital'], correct: 1 }
        ]
      },
      {
        id: 'exam-stablecoins',
        title: 'Section 2: Stablecoins',
        curriculum: {
          objectives: [
            'Explain stablecoins as settlement infrastructure',
            'Articulate stablecoin risks honestly',
            'Describe regulatory landscape'
          ],
          keyConcepts: [
            'Stablecoin sandwich concept',
            'Five risk categories',
            'USDC depeg case study'
          ]
        },
        learn: {
          introduction: 'This section tests your ability to discuss stablecoins without crypto jargon and with honest risk acknowledgment.',
          coreQuestion: 'Can you explain stablecoins to a traditional banker?',
          sections: [],
          keyTakeaway: 'Review Pillar 2 if you need to refresh on stablecoin fundamentals.'
        },
        exercise: {
          title: 'Stablecoins Assessment Checklist',
          prompt: 'Before proceeding, confirm you can:\n\n☐ Explain the "stablecoin sandwich" without jargon\n☐ Name and explain five stablecoin risk categories\n☐ Describe the USDC depeg incident accurately\n☐ Explain why "stable" doesn\'t mean "risk-free"\n☐ Articulate Sphere\'s risk mitigation approach',
          criteria: ['All items checked']
        },
        quiz: [
          { q: 'What backs USDC?', options: ['Bitcoin', 'Algorithms', 'T-bills and cash', 'Gold'], correct: 2 },
          { q: 'USDC traded at during SVB crisis:', options: ['$1.00', '$0.95', '$0.87', '$0.50'], correct: 2 },
          { q: 'Sphere holds stablecoins for:', options: ['Days', 'Weeks', 'Minutes', 'Permanently'], correct: 2 }
        ]
      },
      {
        id: 'exam-compliance',
        title: 'Section 3: Compliance',
        curriculum: {
          objectives: [
            'Classify Sphere correctly',
            'Explain AML/KYC program',
            'Handle compliance questions'
          ],
          keyConcepts: [
            'MSB classification',
            'Pre-settlement compliance',
            'Travel Rule requirements'
          ]
        },
        learn: {
          introduction: 'This section tests your ability to position Sphere correctly and handle compliance questions from sophisticated counterparties.',
          coreQuestion: 'Can you defend Sphere\'s regulatory classification?',
          sections: [],
          keyTakeaway: 'Review Pillar 3 if you need to refresh on compliance fundamentals.'
        },
        exercise: {
          title: 'Compliance Assessment Checklist',
          prompt: 'Before proceeding, confirm you can:\n\n☐ Explain what Sphere IS and IS NOT\n☐ Articulate "compliance-native" positioning\n☐ Describe the AML/KYC program\n☐ Explain sanctions screening process\n☐ Answer Travel Rule questions',
          criteria: ['All items checked']
        },
        quiz: [
          { q: 'Sphere is classified as:', options: ['Exchange', 'MSB/Money Transmitter', 'Bank', 'Custodian'], correct: 1 },
          { q: 'Compliance screening happens:', options: ['After settlement', 'Before settlement', 'Weekly', 'Never'], correct: 1 },
          { q: 'Travel Rule threshold in US:', options: ['$1,000', '$3,000', '$10,000', 'All amounts'], correct: 1 }
        ]
      },
      {
        id: 'exam-governance',
        title: 'Section 4: Governance',
        curriculum: {
          objectives: [
            'Explain operational risk framework',
            'Articulate business continuity approach',
            'Handle governance questions'
          ],
          keyConcepts: [
            'SOC 2 and ISO 27001',
            'RTO and RPO metrics',
            'Incident management'
          ]
        },
        learn: {
          introduction: 'This section tests your ability to answer governance and operational risk questions from institutional counterparties.',
          coreQuestion: 'Can you explain Sphere\'s risk management to a bank risk officer?',
          sections: [],
          keyTakeaway: 'Review Pillar 4 if you need to refresh on governance fundamentals.'
        },
        exercise: {
          title: 'Governance Assessment Checklist',
          prompt: 'Before proceeding, confirm you can:\n\n☐ Explain operational risk categories\n☐ Describe SOC 2 and ISO 27001 certifications\n☐ Define RTO and RPO\n☐ Explain incident severity levels\n☐ Articulate business continuity approach',
          criteria: ['All items checked']
        },
        quiz: [
          { q: 'SOC 2 Type II certifies:', options: ['Financials', 'Security controls', 'Product quality', 'Market share'], correct: 1 },
          { q: 'RTO stands for:', options: ['Real-Time Operations', 'Recovery Time Objective', 'Risk Tolerance', 'Test'], correct: 1 },
          { q: 'P1 incident means:', options: ['Low priority', 'Critical/outage', 'Scheduled', 'Feature request'], correct: 1 }
        ]
      },
      {
        id: 'exam-sphere',
        title: 'Section 5: Sphere Product',
        curriculum: {
          objectives: [
            'Articulate Sphere\'s value proposition',
            'Know key metrics',
            'Handle competitive positioning'
          ],
          keyConcepts: [
            'Origin story',
            'Performance metrics',
            'Competitive advantages'
          ]
        },
        learn: {
          introduction: 'This section tests your knowledge of Sphere\'s specific products, metrics, and positioning.',
          coreQuestion: 'Can you pitch Sphere to an enterprise prospect?',
          sections: [],
          keyTakeaway: 'Review Pillar 5 if you need to refresh on Sphere product knowledge.'
        },
        exercise: {
          title: 'Sphere Product Assessment Checklist',
          prompt: 'Before proceeding, confirm you can:\n\n☐ Tell Sphere\'s origin story compellingly\n☐ Explain the product architecture\n☐ Cite key performance metrics accurately\n☐ Position against traditional banks\n☐ Position against crypto-native competitors',
          criteria: ['All items checked']
        },
        quiz: [
          { q: 'Sphere median settlement time:', options: ['2-5 days', '24 hours', '15-30 minutes', 'Instant'], correct: 2 },
          { q: 'Sphere was founded during:', options: ['Bull market', 'FTX collapse period', 'Before crypto', '2010'], correct: 1 },
          { q: 'Sphere annualized volume:', options: ['$25M', '$250M', '$2.5B+', '$25B'], correct: 2 }
        ]
      },
      {
        id: 'exam-final',
        title: 'Section 6: Comprehensive Scenario',
        curriculum: {
          objectives: [
            'Handle a complete counterparty conversation',
            'Apply knowledge from all pillars',
            'Demonstrate professional readiness'
          ],
          keyConcepts: [
            'All 15 questions',
            'Objection handling',
            'Closing with next steps'
          ]
        },
        learn: {
          introduction: 'This final section presents a comprehensive scenario that tests your ability to apply all your training in a realistic counterparty conversation.',
          coreQuestion: 'Are you ready for a real UAE bank meeting?',
          sections: [],
          keyTakeaway: 'This is where everything comes together. Good luck!'
        },
        exercise: {
          title: 'Final Scenario',
          prompt: 'SCENARIO: You have 30 minutes with the Chief Risk Officer of a major UAE bank. They are skeptical of "crypto companies" but interested in improving their cross-border payment capabilities.\n\nWrite out your approach:\n\n1. Opening (How do you introduce Sphere?)\n2. Reframe (How do you address "crypto company" concern?)\n3. Value Prop (What specific benefits do you highlight?)\n4. Risk Handling (How do you address stablecoin risk questions?)\n5. Compliance (How do you establish regulatory credibility?)\n6. Metrics (What numbers do you cite?)\n7. Close (How do you propose next steps?)',
          criteria: ['Professional opening', 'Effective reframe', 'Clear value prop', 'Honest risk handling', 'Compliance credibility', 'Accurate metrics', 'Strong close']
        },
        quiz: [
          { q: 'First thing to establish with a skeptical compliance officer:', options: ['Product features', 'Licensing and classification', 'Pricing', 'Technology'], correct: 1 },
          { q: 'When asked about stablecoin risk, you should:', options: ['Deny risks exist', 'Acknowledge and explain mitigation', 'Change the subject', 'Say it\'s not your area'], correct: 1 },
          { q: 'Every counterparty conversation should end with:', options: ['A handshake', 'Clear next steps', 'Pricing discussion', 'Technical demo'], correct: 1 }
        ]
      }
    ],
    masterQuiz: {
      title: 'Final Certification Assessment',
      passingScore: 80,
      scenario: 'You are meeting with the leadership team of a UAE bank considering Sphere as a payment infrastructure partner. The meeting includes the CRO, Head of Compliance, and Head of Treasury.',
      questions: [
        { type: 'multiple_choice', question: 'Settlement finality means:', options: ['Payment is fast', 'Payment is irrevocable', 'Payment is international', 'Payment is compliant'], correct: 1 },
        { type: 'multiple_choice', question: 'Sphere is classified as:', options: ['Cryptocurrency exchange', 'Licensed MSB', 'Bank', 'Stablecoin issuer'], correct: 1 },
        { type: 'multiple_choice', question: 'USDC depeg cause:', options: ['Insufficient reserves', 'SVB failure', 'Hack', 'Algorithm failure'], correct: 1 },
        { type: 'multiple_choice', question: 'Sphere median settlement:', options: ['2-5 days', 'Same day', '15-30 minutes', '5 seconds'], correct: 2 },
        { type: 'analysis', question: 'The CRO asks: "Why should we work with a company that was founded during the crypto crash?" Write your response.', rubric: ['Acknowledges timing', 'Turns to advantage', 'Differentiates from failed companies', 'Builds confidence'] },
        { type: 'analysis', question: 'The Head of Compliance asks: "Walk me through your AML program." Write your response.', rubric: ['KYC process', 'Transaction monitoring', 'Sanctions screening', 'Pre-settlement emphasis'] },
        { type: 'application', question: 'The Head of Treasury asks: "What happens if USDC depegs during one of our transactions?" Write your response.', rubric: ['Acknowledges risk honestly', 'Cites USDC case', 'Explains mitigation', 'Demonstrates sophistication'] }
      ]
    }
  }
];

// Export types
export type Pillar = typeof pillarsData[number];
export type Section = Pillar['sections'][number];

