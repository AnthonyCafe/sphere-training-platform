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
                    responsibilities: ['Provides beneficiary details', 'Authorizes the transaction', 'Ensures sufficient funds']
                  },
                  {
                    name: 'The Originating Bank',
                    role: 'Receives and validates the instruction',
                    responsibilities: ['Confirms customer identity', 'Checks account balance', 'Validates beneficiary information format']
                  }
                ]
              },
              riskExplained: {
                title: 'Why Does the Customer Bear Risk?',
                explanation: 'At initiation, the customer has provided an instruction but the bank hasn\'t committed to executing it yet. If the instruction contains errors (wrong account number, invalid beneficiary name, insufficient details), the payment will fail—and the customer bears responsibility for providing correct information.',
                scenario: 'You submit a wire with a typo in the beneficiary account number. Your bank hasn\'t sent anything yet—they\'re just processing your request. If they catch the error, they\'ll reject it. If they don\'t, and the payment fails later, you bear the cost of correction and delay.',
                commonErrors: [
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
                    name: 'Messaging Networks (SWIFT, FedACH)',
                    role: 'Transmits and validates the payment message',
                    responsibilities: ['Ensures message format is correct', 'Routes to proper destination', 'Confirms delivery']
                  },
                  {
                    name: 'Correspondent Bank(s)',
                    role: 'Intermediaries between originating and beneficiary banks',
                    responsibilities: ['Validate compliance (AML/sanctions)', 'Confirm beneficiary account exists', 'Prepare for settlement'],
                    whyTheyExist: 'If your bank in Texas doesn\'t have a direct relationship with a bank in Lagos, they need a correspondent bank (often in New York or London) that has relationships with both. Each correspondent adds time, fees, and another compliance checkpoint.'
                  },
                  {
                    name: 'Beneficiary Bank',
                    role: 'Receives the payment message and prepares to credit customer',
                    responsibilities: ['Confirms account details match', 'Performs own compliance screening', 'Notifies customer of incoming payment']
                  }
                ]
              },
              riskExplained: {
                title: 'Why Does the Sending Bank Now Bear Risk?',
                explanation: 'Once clearing begins, the originating bank has committed to the payment. They\'ve debited the customer\'s account and sent the instruction into the payment network. At this point, the customer\'s money is "in flight"—gone from their account but not yet received by the beneficiary.',
                scenario: 'Your bank sends a $50,000 wire to Nigeria. The message goes through SWIFT to a correspondent in London, then to a correspondent in Lagos, then to the beneficiary bank. At the Lagos correspondent, the payment gets flagged for enhanced due diligence because the reference field mentions "agricultural equipment" and they want documentation. The payment is in limbo. Your money is gone from your account. The receiver hasn\'t gotten it. Your bank can\'t just "cancel" it—they have to negotiate with the correspondent. This is clearing risk.',
                whatCanGoWrong: [
                  'Correspondent bank rejects payment due to risk appetite',
                  'Beneficiary account frozen or closed',
                  'Compliance hold for sanctions or AML review (can take days or weeks)',
                  'Beneficiary name doesn\'t match account (requires manual verification)',
                  'Cut-off time missed—payment delayed to next business day',
                  'FX rate moves against you while payment is clearing',
                  'Nostro account has insufficient balance'
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
                    examples: ['Fedwire (US)', 'TARGET2 (EU)', 'CHAPS (UK)'],
                    responsibilities: ['Maintains reserve accounts for commercial banks', 'Executes final settlement by debiting one bank and crediting another']
                  },
                  {
                    name: 'Originating Bank',
                    role: 'Sends final settlement instruction',
                    responsibilities: ['Ensures sufficient reserves at central bank to cover the payment']
                  },
                  {
                    name: 'Beneficiary Bank',
                    role: 'Receives settled funds',
                    responsibilities: ['Credits customer account once settlement is confirmed']
                  }
                ]
              },
              riskExplained: {
                title: 'Why Is Risk Eliminated at Settlement?',
                explanation: 'Settlement happens on the central bank ledger—the most trusted ledger in the financial system. When Fedwire debits Bank A and credits Bank B, that transaction is final, irrevocable, and backed by law. There\'s no credit risk (central bank can\'t default), no reversal mechanism, and legal finality.',
                scenario: 'After all the correspondent approvals and compliance checks, the payment reaches the final step. The sending bank\'s Fedwire account is debited $50,000. The receiving bank\'s Fedwire account is credited $50,000. The Federal Reserve has moved money on its books. This is settlement. The beneficiary bank can now safely credit their customer\'s account because they have the money.',
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
            context: 'Traditional cross-border payments take 2-5 days from initiation to settlement. During that window: sender\'s money is gone, receiver hasn\'t received it, banks carry risk, FX rates can move against you, and compliance holds can freeze everything.',
            sphereValue: 'SpherePay compresses this from days to MINUTES using stablecoins.',
            keyInsight: 'SpherePay\'s value is in the settlement layer — not faster messaging.',
            problemExplained: 'Traditional cross-border payments are slow because settlement requires moving money through correspondent banking chains, across time zones, and through central bank systems that operate on business hours. The MESSAGING is already fast (SWIFT messages arrive in seconds)—the delay is in SETTLEMENT.',
            howSphereWorks: {
              title: 'How Sphere Achieves Settlement Layer Value Using Stablecoins',
              steps: [
                {
                  step: 'Sender Side: Fiat to Stablecoin',
                  process: 'Customer deposits local currency (USD, AED, EUR) with a licensed on-ramp partner. That partner converts the fiat to stablecoins (USDC, USDT) and sends them to Sphere\'s system. This happens in minutes, not days, because stablecoins settle on blockchain rails 24/7.',
                  traditional: 'Initiate wire → Wait for correspondent banks → Wait for central bank settlement → 2-5 days',
                  sphere: 'Deposit fiat → On-ramp converts to stablecoin → Stablecoin received in minutes'
                },
                {
                  step: 'Cross-Border Movement: Stablecoin Transfer',
                  process: 'Sphere moves stablecoins across borders instantly via blockchain. No correspondent banks. No SWIFT messages. No waiting for business hours. The stablecoin transfer settles in minutes on-chain.',
                  traditional: 'SWIFT message → Correspondent in Country A → Correspondent in Country B → Beneficiary bank → Days of clearing',
                  sphere: 'Stablecoin transfer on blockchain → Settlement in 15-30 minutes, 24/7'
                },
                {
                  step: 'Receiver Side: Stablecoin to Fiat',
                  process: 'Licensed off-ramp partner receives the stablecoins and converts them to local currency for the beneficiary. The beneficiary receives local fiat in their bank account, settled and final.',
                  traditional: 'Wait for final settlement → Beneficiary bank credits account after settlement confirmation → Days',
                  sphere: 'Off-ramp receives stablecoin → Converts to local fiat → Credits beneficiary → Minutes to hours'
                }
              ],
              whyStablecoinsWork: [
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
              ],
              criticalClarification: 'Sphere does NOT eliminate fiat settlement—fiat settlement still happens at the endpoints through licensed partners. What Sphere does is compress the CROSS-BORDER leg from days to minutes by using stablecoins as the settlement asset across borders. This is why we say "Sphere\'s value is in the settlement layer"—we\'re not making messages faster, we\'re making settlement faster.'
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
              'Money has moved',
              'Settlement has occurred',
              'The beneficiary has received funds',
              'Compliance checks are complete',
              'The payment cannot be rejected or delayed'
            ],
            analogy: 'Think of SWIFT ACK like a "read receipt" on an email. It tells you the recipient opened your email, but it doesn\'t mean they\'ve acted on it, agreed to it, or completed what you asked.'
          },
          dangerZone: {
            title: 'The Dangerous Statement',
            statement: '"I got the SWIFT ACK, so we\'re good."',
            whyDangerous: 'A SWIFT ACK only confirms message delivery—NOT that money has moved. This is one of the most common and costly mistakes in cross-border payments.',
            mythVsReality: [
              { myth: 'Payment went through', truth: 'Message was delivered to the next bank in the chain' },
              { myth: 'Money has moved', truth: 'An instruction was received and acknowledged' },
              { myth: 'We\'re done, release the goods', truth: 'We\'ve barely started—settlement still pending' },
              { myth: 'Beneficiary can access the funds', truth: 'Beneficiary won\'t see anything until settlement completes' }
            ],
            whatCanStillGoWrong: {
              title: 'What Can Go Wrong AFTER Getting SWIFT ACK',
              scenarios: [
                {
                  issue: 'Compliance Hold',
                  explanation: 'AML or sanctions screening flags the transaction. Payment freezes for days or weeks while under review.',
                  example: 'You send $100K for "industrial equipment" to Iran. SWIFT ACK received. But correspondent freezes it pending OFAC review. Weeks later, payment rejected.'
                },
                {
                  issue: 'Beneficiary Mismatch',
                  explanation: 'Account number doesn\'t match beneficiary name. Banks require manual verification.',
                  example: 'SWIFT ACK received. But the account is for "Ahmed Trading LLC" and you wrote "Ahmed Industrial Co." Payment rejected 3 days later.'
                },
                {
                  issue: 'Insufficient Correspondent Balance',
                  explanation: 'Correspondent\'s nostro account doesn\'t have enough funds to cover your payment.',
                  example: 'SWIFT ACK received but correspondent\'s nostro is low. They wait to batch your payment with others. Adds 2 days.'
                },
                {
                  issue: 'Manual Review Required',
                  explanation: 'Payment amount, destination, or reference triggers a manual operations review.',
                  example: '$250K with reference "consulting services" to newly opened Lagos account. SWIFT ACK received, kicks to ops for enhanced due diligence. 5-day delay.'
                },
                {
                  issue: 'Cut-off Time Missed',
                  explanation: 'Payment arrived after the correspondent\'s processing cut-off time. Delayed to next business day.',
                  example: 'Payment at 4:55 PM NY time. SWIFT ACK at 5:01 PM. But London correspondent closed at 5:00 PM. Payment waits until next day.'
                },
                {
                  issue: 'Correspondent Rejection',
                  explanation: 'Correspondent bank decides they don\'t want the business (too risky, wrong jurisdiction, relationship issue).',
                  example: 'Payment to Afghanistan for agricultural imports. SWIFT ACK received. 2 days later, correspondent says "we no longer service this corridor" and rejects.'
                }
              ]
            }
          },
          howToVerifySettlement: {
            title: 'How to Verify a Payment Is Actually Settled',
            introduction: 'Don\'t rely on SWIFT ACK. Here\'s what you should verify:',
            steps: [
              {
                step: 'Confirm Settlement System Execution',
                what: 'Check that the payment has been processed through the actual settlement system (Fedwire, CHIPS, TARGET2, etc.)',
                how: 'Request a settlement confirmation from your bank, not just a SWIFT ACK. Ask: "Has this settled on Fedwire?" or "Do you have TARGET2 confirmation?"',
                evidence: 'MT 950 (Account Statement) showing debit from sending bank\'s nostro or settlement account'
              },
              {
                step: 'Beneficiary Bank Confirmation',
                what: 'Verify the beneficiary\'s bank has received and credited the funds',
                how: 'Ask the beneficiary to check their account statement. Don\'t assume—confirm.',
                evidence: 'Beneficiary sends you a screenshot or statement showing the credit'
              },
              {
                step: 'Irrevocability Confirmation',
                what: 'Ensure the payment is final and cannot be reversed',
                how: 'For high-value transactions, ask your bank: "Is this payment final and irrevocable?" Settlements through RTGS systems (Fedwire, CHAPS) are immediate and final. Other systems may have delay.',
                evidence: 'Written confirmation from your bank that settlement is complete and final'
              },
              {
                step: 'Time-Based Reality Check',
                what: 'Understand the realistic timeline for your corridor',
                how: 'If you sent a payment to Nigeria on Monday and got SWIFT ACK on Monday, don\'t expect settlement until Wednesday or Thursday at earliest. Cross-border payments have structural delays.',
                evidence: 'Historical data on your payment corridor (ask your bank for average settlement times)'
              }
            ],
            bestPractice: 'For large or critical payments, require the beneficiary to confirm receipt in their account before releasing goods, services, or obligations. SWIFT ACK is not proof of payment.',
            sphereAdvantage: 'With Sphere, stablecoin transfers settle on-chain in 15-30 minutes. You can verify settlement by checking the blockchain transaction—it\'s transparent, timestamped, and final. No waiting for correspondent confirmations.'
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
          systemDetails: {
            title: 'Understanding Finality by Payment System',
            systems: [
              {
                name: 'Fedwire (RTGS)',
                when: 'Immediately upon processing',
                strength: '⭐⭐⭐⭐⭐ Strongest possible finality',
                explanation: 'Fedwire is operated by the Federal Reserve. When a Fedwire transaction processes, it is immediate, final, and irrevocable by law (UCC 4A, Regulation J). The Fed debits one bank and credits another on its master ledger. Done. No take-backs. No disputes. This is the gold standard of settlement finality.',
                legalBacking: 'Federal Reserve Act, UCC Article 4A, Regulation J',
                useCases: ['Large-value payments', 'Real estate closings', 'Securities settlement', 'Time-sensitive transactions'],
                keyPoint: 'If you need absolute certainty that a payment cannot be reversed, Fedwire is the answer.'
              },
              {
                name: 'CHIPS',
                when: 'Same-day when net positions are released and settled',
                strength: '⭐⭐⭐⭐ Very strong finality',
                explanation: 'CHIPS is a private payment system that processes large-value USD transactions. Unlike Fedwire (which settles each payment individually), CHIPS nets payments throughout the day and settles the net positions via Fedwire at end of day. Once CHIPS releases the payment for settlement, it has finality.',
                legalBacking: 'CHIPS Rules and Regulations, backed by New York law',
                useCases: ['International USD transfers', 'Correspondent banking', 'FX settlement'],
                keyPoint: 'CHIPS provides strong finality once settlement occurs, but there\'s an intraday window where payments are conditional (pending net settlement).'
              },
              {
                name: 'ACH',
                when: '1-2 business days after initiation (during settlement window)',
                strength: '⭐⭐⭐ Good finality, but delayed',
                explanation: 'ACH batches payments and settles them through the Federal Reserve. Finality occurs when the Fed settles the ACH batch—typically 1-2 days after initiation. However, ACH has return windows (unauthorized debits can be returned for 60 days), so finality is not as absolute as RTGS.',
                legalBacking: 'NACHA Operating Rules, UCC 4A',
                useCases: ['Payroll', 'Bill payments', 'Consumer transactions'],
                keyPoint: 'ACH is cheaper and efficient for bulk payments, but don\'t expect same-day finality. Returns are possible for unauthorized transactions.'
              },
              {
                name: 'Card Networks (Visa, Mastercard, Amex)',
                when: 'Only after chargeback window expires (60-120 days depending on card type)',
                strength: '⭐⭐ Weak finality',
                explanation: 'Card payments are authorized instantly but don\'t achieve finality for months. Cardholders have the right to dispute transactions (chargebacks) for 60-120 days. Merchants bear this risk. Even after settlement, funds can be clawed back if a chargeback is filed.',
                legalBacking: 'Card network rules (private contracts), consumer protection laws',
                useCases: ['Consumer purchases', 'E-commerce', 'Point-of-sale'],
                keyPoint: 'Card payments are convenient but risky for merchants. Finality is delayed and conditional. High chargeback risk for certain industries (travel, digital goods).'
              },
              {
                name: 'Cryptocurrency (Bitcoin, Ethereum, etc.)',
                when: 'Never achieves legal finality—only probabilistic certainty',
                strength: '⭐ No legal finality',
                explanation: 'Cryptocurrencies use consensus mechanisms (proof of work, proof of stake) to confirm transactions. After N confirmations, a transaction is "computationally impractical to reverse"—but there\'s no legal framework that defines finality. A 51% attack could theoretically reverse transactions. More importantly, courts don\'t recognize blockchain finality as legally binding.',
                legalBacking: 'None. No statute defines finality. No court precedent.',
                useCases: ['Crypto trading', 'Speculative transfers', 'Experimental payments'],
                keyPoint: 'Crypto provides technical security (hard to reverse) but not legal finality (no law protects you if it\'s reversed). Enterprises and regulators care about legal finality.'
              }
            ],
            summary: 'When someone asks about "finality," they\'re asking: "If this payment is reversed, can I take legal action?" For Fedwire, the answer is yes—the law protects you. For crypto, the answer is unclear—you might have a blockchain record, but no legal recourse.'
          },
          comparison: {
            title: 'Legal Finality vs Technical Finality: Fedwire vs Bitcoin',
            headers: ['Aspect', 'Fedwire (Legal Finality)', 'Bitcoin (Technical Finality)'],
            rows: [
              ['Legal framework', 'Federal Reserve Act, UCC 4A, Regulation J - explicitly defines when finality occurs', 'No legal framework. No statute defines "final." Courts have no precedent.'],
              ['Dispute resolution', 'Federal courts with established precedent. Clear legal recourse.', 'No legal dispute mechanism. Code is law, but law doesn\'t recognize code.'],
              ['Reversal mechanism', 'Legally prohibited once processed. Cannot be reversed by Fed or banks.', 'Technically reversible via 51% attack (extremely unlikely but theoretically possible). No legal protection against it.'],
              ['Definition of "final"', 'Precisely defined: moment Fed processes payment on its ledger', 'Probabilistic: "probably won\'t reverse after N confirmations"'],
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
            contrast: 'When Fedwire settles a payment, the law says it\'s final. When Bitcoin confirms a transaction, cryptography says it\'s extremely unlikely to be reversed—but the law is silent. That\'s the difference.'
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
            summary: 'We are NOT trying to replace central banks • We optimize the path TO settlement (faster, cheaper) • We work WITHIN existing regulatory frameworks • We complement central bank infrastructure',
            keyInsight: 'Using stablecoins as transport, with fiat settlement at endpoints.',
            howSphereComplements: {
              title: 'How Sphere Complements Central Banks',
              introduction: 'Sphere doesn\'t compete with central banks—we enhance their effectiveness by making cross-border value movement faster while maintaining fiat settlement at endpoints.',
              functions: [
                {
                  name: 'Cross-Border Speed Without Replacing Settlement Infrastructure',
                  centralBankRole: 'Central banks provide domestic settlement systems (Fedwire, TARGET2, UAEFTS) that settle in their local currency with legal finality.',
                  sphereRole: 'Sphere uses stablecoins to move value BETWEEN jurisdictions rapidly (15-30 minutes), then settles into local fiat through the local central bank system at each endpoint.',
                  complement: 'Central banks remain the final settlement layer for fiat. Sphere simply optimizes the cross-border leg. We\'re like a fast highway between two cities—the cities (central banks) are still the origin and destination.',
                  example: 'UAE company pays US supplier. Traditional: AED → Central Bank of UAE → Correspondent → Correspondent → Fedwire → USD (2-5 days). Sphere: AED → CBUAE settlement → Stablecoin transfer (30 min) → Fedwire settlement → USD. Central banks still settle both endpoints—we just made the middle faster.'
                },
                {
                  name: 'Reducing Pressure on Correspondent Banking',
                  centralBankRole: 'Central banks don\'t directly connect all banks globally. Correspondent banking fills the gap, but it\'s slow, expensive, and shrinking (de-risking).',
                  sphereRole: 'Sphere provides an alternative pathway that doesn\'t require 4+ correspondent banks. Licensed partners convert fiat to stablecoin (using local central bank settlement), move stablecoins cross-border, and convert back to fiat (using destination central bank settlement).',
                  complement: 'This reduces load on correspondent banking networks while still using central bank infrastructure at endpoints. Central banks benefit because cross-border payments become more efficient without requiring them to build new infrastructure.',
                  example: 'Nigerian bank wants to send money to Japan. Traditional path requires correspondents in London, New York, Tokyo—each with their own nostro accounts, compliance, and delays. Sphere path: Nigerian naira settles through Central Bank of Nigeria → stablecoin transfer → Japanese yen settles through Bank of Japan. No correspondent chain needed. Central banks still provide final settlement.'
                },
                {
                  name: 'Supporting Financial Inclusion Without Circumventing Regulation',
                  centralBankRole: 'Central banks regulate financial systems to protect consumers, prevent crime, and maintain stability.',
                  sphereRole: 'Sphere embeds compliance (KYC/AML) and works with licensed partners in each jurisdiction. We don\'t bypass regulation—we make regulated cross-border payments accessible to more businesses.',
                  complement: 'Central banks want financial inclusion, but cross-border payments are hard for SMEs (expensive, slow, complex). Sphere makes central bank-settled payments accessible to smaller players while maintaining regulatory compliance.',
                  example: 'Small UAE importer wants to pay Vietnamese supplier. Traditional banks quote $50 fee and 5-day timeline. Importer can\'t afford it. Sphere: $8 fee, 30 minutes, full compliance. Money still settles through Central Bank of UAE and State Bank of Vietnam—just faster and cheaper.'
                },
                {
                  name: 'Preparing for CBDC Integration',
                  centralBankRole: 'Many central banks are exploring Central Bank Digital Currencies (CBDCs) for domestic and cross-border use.',
                  sphereRole: 'Sphere\'s infrastructure is CBDC-ready. If/when CBDCs launch, we can integrate them as settlement assets alongside or instead of stablecoins.',
                  complement: 'Sphere is building the cross-border payment layer that CBDCs will need. Central banks focus on issuing digital currency; Sphere focuses on moving it across borders compliantly. We\'re complementary infrastructure.',
                  example: 'UAE launches digital dirham. Sphere integrates it into our network. Now cross-border payments can use digital dirham → stablecoin (or other CBDC) → digital dollar. Central banks issue the currency; Sphere moves it.'
                },
                {
                  name: 'Providing 24/7 Access Without Competing with RTGS',
                  centralBankRole: 'Central bank RTGS systems operate during business hours (e.g., Fedwire 9 PM – 7 PM ET, TARGET2 7 AM – 6 PM CET).',
                  sphereRole: 'Sphere\'s stablecoin transfers operate 24/7/365. When RTGS systems are closed, Sphere can initiate transactions that settle when RTGS reopens.',
                  complement: 'Central banks don\'t need to run 24/7 operations. Sphere provides after-hours initiation with guaranteed settlement when central bank systems reopen. This is complementary, not competitive.',
                  example: 'Friday 7 PM in New York, urgent payment needed to Dubai (Saturday morning there, banks closed). Traditional: wait until Monday. Sphere: initiate stablecoin transfer immediately, settles through CBUAE when it opens Sunday, through Fedwire when it opens Monday. Central banks still provide final settlement—just with faster initiation.'
                }
              ],
              keyMessage: 'Sphere is infrastructure that sits BETWEEN central bank systems, making them more accessible and efficient for cross-border payments. We don\'t replace central banks—we make them work better together.',
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
                definition: 'Latin for "your account with us." The opposite of nostro—it\'s the account a foreign bank holds with you.',
                example: 'Deutsche Bank has a USD account at Bank of America. From Deutsche Bank\'s perspective, it\'s a nostro. From BoA\'s perspective, it\'s a vostro.'
              },
              {
                term: 'SWIFT BIC/SWIFT Code',
                definition: 'Bank Identifier Code—a unique 8 or 11-character code that identifies a specific bank for international wire transfers.',
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
            introduction: 'The number and identity of correspondent banks depends on the payment corridor, currency pair, and bank relationships.',
            factors: [
              {
                factor: 'Currency Liquidity',
                explanation: 'Major currencies (USD, EUR, GBP, JPY) have fewer correspondent hops because more banks hold these currencies and have direct relationships.',
                highLiquidity: 'USD-EUR corridor: Often just 1-2 correspondents. Example: US bank → London correspondent → EU bank.',
                lowLiquidity: 'USD-NGN (Nigerian Naira) corridor: Often 3-4 correspondents. Example: US bank → NY correspondent → London correspondent → Lagos correspondent → Nigerian bank.'
              },
              {
                factor: 'Geographic Region',
                explanation: 'Payments to frontier markets require more correspondents because fewer banks are willing to maintain relationships there (due to risk, regulation, or low volume).',
                developed: 'US → UK → Germany: 1-2 hops, well-established correspondent relationships',
                frontier: 'US → Nigeria, Myanmar, Afghanistan: 3-5 hops, limited correspondent appetite'
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
              examples: [
                {
                  corridor: 'US → UK (USD → GBP)',
                  hops: '1-2',
                  chain: 'US bank → London correspondent or direct → UK bank',
                  speed: 'Same day to T+1',
                  reason: 'Highly liquid corridor, many banks have direct GBP accounts'
                },
                {
                  corridor: 'US → Nigeria (USD → NGN)',
                  hops: '3-4',
                  chain: 'US bank → New York correspondent (JPM, BoA) → London correspondent (Standard Chartered, Citi) → Lagos correspondent (Zenith, GTBank) → Nigerian bank',
                  speed: 'T+3 to T+10',
                  reason: 'Few banks willing to hold NGN, heavy compliance requirements, low liquidity'
                },
                {
                  corridor: 'US → Brazil (USD → BRL)',
                  hops: '2-3',
                  chain: 'US bank → New York correspondent → São Paulo correspondent (Itaú, Bradesco) → Brazilian bank',
                  speed: 'T+2 to T+5',
                  reason: 'Brazil has strict capital controls, requires local correspondent'
                },
                {
                  corridor: 'UAE → India (AED → INR)',
                  hops: '2-3',
                  chain: 'UAE bank → Dubai correspondent (Emirates NBD, ADCB) → Mumbai correspondent (HDFC, ICICI) → Indian bank',
                  speed: 'T+1 to T+3',
                  reason: 'High volume corridor (remittances), but still requires local correspondent in India'
                },
                {
                  corridor: 'US → Japan (USD → JPY)',
                  hops: '1-2',
                  chain: 'US bank → Tokyo correspondent (MUFG, Mizuho) or direct → Japanese bank',
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
            subtitle: 'The Bank for International Settlements and Committee on Payments and Market Infrastructures studied why cross-border payments are slow and expensive.',
            headers: ['Friction', 'Impact', 'Real-World Example'],
            rows: [
              ['Fragmented data standards', 'Manual reconciliation, errors, delays', 'US banks use different payment message formats than EU banks. When a payment moves from US→EU, data fields don\'t match perfectly. Correspondent banks must manually reconcile, fix errors, or reject the payment. A single typo in the beneficiary name can cause a 3-day delay while banks exchange messages to clarify.'],
              ['Complex compliance', '5+ regulatory regimes may apply', 'Payment from UAE to Brazil touches: UAE Central Bank regulations, FATF standards, US sanctions (if routed through USD correspondent), Brazilian Central Bank rules, and potentially EU regulations if a European correspondent is involved. Each regulator has different KYC requirements, reporting standards, and sanctions lists. One mismatch = payment frozen.'],
              ['Limited operating hours', '5pm New York = Frankfurt closed', 'You send a payment from New York at 4:00 PM Friday to Germany. By the time it reaches the German correspondent, it\'s 10:00 PM Frankfurt time—bank is closed. Payment waits until Monday morning. Then Monday is a German holiday. Now it\'s Tuesday. 4 days lost to operating hours.'],
              ['Funding requirements (Nostro accounts)', '$100M+ trapped in nostro accounts', 'Bank of America needs to send EUR payments to Europe regularly. They maintain a €500M nostro account at Deutsche Bank—that\'s $500M+ sitting idle, earning minimal interest, just to have liquidity for EUR payments. Multiply this across 50+ currency pairs and hundreds of correspondent relationships = billions in trapped capital.'],
              ['Long transaction chains', '4+ hops = 4+ failure points', 'Payment from Philippines to Peru: Philippine bank→Singapore correspondent (hop 1)→New York correspondent (hop 2)→Panamanian correspondent (hop 3)→Peruvian bank (hop 4). Each hop can: reject the payment, hold it for compliance review, miss their cut-off time, have insufficient nostro balance, or charge fees. If hop 3 rejects, the payment bounces back through hop 2 and hop 1 before returning to sender. Timeline: 7-10 days, $80 in fees.']
            ],
            source: 'Based on BIS/CPMI reports: "Enhancing Cross-border Payments" (2020) and "Targets for Addressing the Four Challenges of Cross-border Payments" (2021)'
          },
          warning: 'Technology does NOT remove jurisdiction. Even instant blockchain transfer still requires AML/KYC, capital controls, licensing, tax reporting, and sanctions screening.',
          sphereSolution: {
            title: 'How Sphere Addresses This',
            introduction: 'Sphere doesn\'t eliminate these frictions—we compress and optimize them.',
            solutions: [
              {
                problem: '4+ correspondent hops',
                sphereSolution: 'Direct stablecoin settlement',
                howItWorks: 'Traditional payment hops through 4 banks, each with own compliance, fees, cut-off times. Sphere converts to stablecoin at origin, transfers peer-to-peer on blockchain, converts to local fiat at destination. No correspondent chain. Licensed partners at each endpoint handle fiat conversion. Result: 4 hops become 2 conversions + 1 transfer.'
              },
              {
                problem: 'Banking hours only (cut-off times)',
                sphereSolution: '24/7 blockchain operations',
                howItWorks: 'Miss 5 PM cut-off in New York? Traditional: Your payment waits until tomorrow. Weekend? Add 2 days. Sphere: Stablecoin transfers operate 24/7/365. Initiate payment Friday 11 PM, settles by Saturday morning. Fiat off-ramp processes when local banking hours resume, but cross-border movement is done. No waiting for Monday.'
              },
              {
                problem: 'Capital trapped in nostros',
                sphereSolution: 'No pre-funding needed',
                howItWorks: 'Traditional banks maintain €500M nostro accounts at foreign banks just to have liquidity for payments. Capital sits idle. Sphere: On-ramps and off-ramps convert fiat to stablecoin on-demand. No need to pre-fund accounts in 50 currencies. Capital deployed only when needed, returned immediately after use. Frees billions in trapped liquidity.'
              },
              {
                problem: 'Compliance at each hop (5+ regimes)',
                sphereSolution: 'Embedded compliance upfront',
                howItWorks: 'Traditional: Each correspondent bank runs own compliance checks. Payment gets flagged at hop 3, frozen for 5 days pending review. Sphere: KYC/AML/sanctions screening happens upfront at on-ramp before payment initiates. Smart contracts enforce compliance rules. If payment doesn\'t pass compliance, it never enters the network. No mid-flight freezes.'
              },
              {
                problem: '2-5 day settlement (T+2 to T+10)',
                sphereSolution: '15-30 minute median settlement',
                howItWorks: 'Traditional correspondent chain takes days. Each bank processes during business hours, adds delays. Sphere: Stablecoin transfer confirms on-chain in minutes. Fiat conversion at endpoints adds minimal time (15-30 minutes total from fiat in→fiat out). Median settlement: under 30 minutes vs 2-5 days traditional.'
              }
            ],
            clarifications: {
              title: 'What Sphere Does NOT Do',
              points: [
                'Eliminate regulation—we work with licensed partners in each jurisdiction',
                'Bypass banks entirely—fiat on/off-ramps are through regulated financial institutions',
                'Remove compliance—we embed it upfront instead of checking at each hop',
                'Replace central banks—fiat settlement still happens through traditional systems at endpoints',
                'What we DO: Compress the cross-border leg from days to minutes using stablecoins as transport'
              ]
            },
            realWorldExample: {
              title: 'UAE→Nigeria Payment Comparison',
              traditional: {
                timeline: 'Day 0: Initiate payment in Dubai. Day 1: Reaches correspondent in London. Day 2: London correspondent clears compliance, sends to Lagos correspondent. Day 3-5: Lagos correspondent performs enhanced due diligence. Day 5: Approved, settles to Nigerian bank. Day 6: Beneficiary receives funds. Total: 6 days.',
                cost: '$75 in correspondent fees',
                risks: ['Compliance hold at any hop', 'FX rate movement', 'Correspondent rejection']
              },
              sphere: {
                timeline: 'Minute 0: Initiate payment in Dubai. Minute 5: AED converted to USDC at on-ramp. Minute 10: USDC transfer confirms on-chain. Minute 25: USDC converted to NGN at off-ramp. Minute 30: NGN credited to beneficiary account. Total: 30 minutes.',
                cost: '$8 in network fees',
                risks: ['Minimal—compliance completed upfront', 'No correspondent rejections', 'Blockchain confirmation is deterministic']
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
          stablecoinSandwichDeepDive: {
            title: 'The Stablecoin Sandwich Explained in Depth',
            concept: 'The "stablecoin sandwich" is the core innovation that makes Sphere work. It\'s called a sandwich because stable coin sits in the middle—wrapped by fiat on both sides. The end user only ever touches fiat currency.',
            threeLayersTitle: 'The Three Layers of the Sandwich',
            layers: [
              {
                layer: 'Layer 1 (Bottom Bread): Fiat On-Ramp',
                what: 'The sender provides local fiat currency (USD, AED, EUR, etc.) to a licensed partner.',
                how: 'Licensed on-ramp partner (regulated financial institution) receives the fiat, performs KYC/AML compliance, and converts it to stablecoins (USDC, USDT) at a 1:1 rate.',
                time: '5-15 minutes',
                who: 'Licensed on-ramp partner (e.g., regulated money service business, licensed exchange)',
                compliance: 'Full KYC/AML performed here. Customer identity verified, transaction screened for sanctions.',
                example: 'UAE company wants to pay US supplier $50,000. They deposit 50,000 AED with Sphere\'s licensed UAE partner. Partner converts AED to USDC at market rate and credits Sphere network with 50,000 USDC.'
              },
              {
                layer: 'Layer 2 (The Filling): Stablecoin Transfer',
                what: 'Stablecoins move cross-border on blockchain rails.',
                how: 'Once converted to stablecoins, the value moves peer-to-peer on blockchain (Ethereum, Solana, etc.) without intermediaries. No correspondent banks. No SWIFT. No business hours. Transaction confirms in minutes.',
                time: '10-30 minutes (depending on blockchain congestion)',
                who: 'Blockchain network (public, permissionless). Sphere doesn\'t control it—we just use it.',
                compliance: 'None required at this layer. Compliance already done at on-ramp. Blockchain is just transport.',
                example: '50,000 USDC moves from UAE wallet to US wallet on Ethereum blockchain. Transaction fee: ~$2. Confirms in 15 minutes. Transparent, traceable on blockchain explorer.'
              },
              {
                layer: 'Layer 3 (Top Bread): Fiat Off-Ramp',
                what: 'The recipient receives local fiat currency from a licensed partner.',
                how: 'Licensed off-ramp partner receives the stablecoins, converts them to local fiat at 1:1 rate, and deposits into beneficiary\'s bank account.',
                time: '15-60 minutes (depending on local banking)',
                who: 'Licensed off-ramp partner (regulated financial institution in destination country)',
                compliance: 'Beneficiary identity verified. Transaction recorded for regulatory reporting.',
                example: 'US off-ramp partner receives 50,000 USDC, converts to $50,000 USD, and deposits into supplier\'s US bank account via ACH or wire. Supplier sees USD—never touched crypto.'
              }
            ],
            whyItWorks: {
              title: 'Why the Sandwich Works',
              reasons: [
                {
                  reason: 'Regulatory Compliance at Endpoints',
                  explanation: 'All regulatory requirements (KYC, AML, sanctions screening) happen at the fiat on-ramp and off-ramp. The middle layer (stablecoin transfer) is just transport. Regulators are comfortable because licensed partners handle all compliance.'
                },
                {
                  reason: 'User Never Touches Crypto',
                  explanation: 'Sender deposits fiat. Recipient receives fiat. Neither party needs a crypto wallet, doesn\'t need to understand blockchain, never sees a private key. Sphere\'s partners handle all crypto operations invisibly.'
                },
                {
                  reason: 'Speed Without Sacrificing Compliance',
                  explanation: 'Traditional cross-border payments are slow because compliance checks happen at each correspondent bank (3-5 hops). The sandwich does compliance once at each endpoint, then moves value instantly via stablecoins. Total time: 30-90 minutes vs 2-5 days.'
                },
                {
                  reason: '24/7 Operations',
                  explanation: 'Fiat banking has business hours. Blockchains don\'t. The stablecoin layer operates 24/7/365. So even if sender initiates Friday night, the stablecoin transfer completes over the weekend, and fiat off-ramp processes Monday morning. Much faster than waiting until Monday for traditional banks to even start processing.'
                },
                {
                  reason: 'Cost Efficiency',
                  explanation: 'No correspondent banks = no correspondent fees. Blockchain transaction costs $0.50-$5 depending on network. Traditional correspondent chain: $50-$100+ in fees. The savings are dramatic.'
                }
              ]
            },
            criticalClarification: 'The stablecoin is NOT the product. It\'s the invisible middle layer. Sphere is not selling stablecoins to customers. Customers are buying cross-border payment services that HAPPEN to use stablecoins as transport.'
          },
          howSphereUtilizesStablecoins: {
            title: 'How Sphere Utilizes Stablecoins',
            approach: 'Sphere is infrastructure-agnostic. We don\'t issue stablecoins. We don\'t promote any single stablecoin. We use multiple stablecoins as settlement rails depending on the corridor, liquidity, and regulatory environment.',
            multiStablecoinStrategy: {
              title: 'Multi-Stablecoin Strategy',
              why: 'Different regions, different regulatory environments, different liquidity needs. Sphere integrates with multiple stablecoin issuers to optimize for speed, cost, and compliance in each corridor.',
              examples: [
                {
                  corridor: 'UAE → US',
                  stablecoinUsed: 'USDC',
                  reason: 'USDC is US-regulated (Circle is a licensed money transmitter), high liquidity in both UAE and US, transparent reserves. Regulators trust it.'
                },
                {
                  corridor: 'Asia → Europe',
                  stablecoinUsed: 'USDT',
                  reason: 'USDT has deepest liquidity in Asian markets. More trading pairs, more on/off-ramps. Despite regulatory concerns in US, it\'s the dominant stablecoin in Asia.'
                },
                {
                  corridor: 'US → LatAm',
                  stablecoinUsed: 'USDC or USDT',
                  reason: 'Both work. USDC for regulated institutional flows. USDT for retail/SME flows where liquidity is better.'
                }
              ]
            },
            liquidityManagement: {
              title: 'Liquidity Management',
              challenge: 'Stablecoins need to be liquid at both endpoints. If Sphere can\'t convert AED→USDC in UAE, or can\'t convert USDC→USD in US, the payment fails.',
              solution: 'Sphere maintains relationships with multiple licensed on-ramp and off-ramp partners in each geography. If Partner A has low liquidity, we route through Partner B. Redundancy is critical.',
              example: 'Sphere has 3 licensed partners in UAE, 5 in US, 2 in UK. If one is experiencing high demand (low liquidity), we route through another. Customer never knows—payment just works.'
            },
            complianceFirst: {
              title: 'Compliance-First Approach',
              principle: 'Sphere ONLY works with licensed partners. We don\'t work with unregulated exchanges or DeFi protocols for fiat on/off-ramping. This is non-negotiable.',
              why: 'Regulators need to know: (1) Who is moving money, (2) Where it came from, (3) Where it\'s going, (4) Is it clean? Licensed partners provide this. DeFi protocols don\'t. Sphere chooses compliance over speed.',
              partners: [
                'Licensed Money Service Businesses (MSBs)',
                'Licensed payment institutions',
                'Regulated cryptocurrency exchanges with proper licensing',
                'Banks that offer crypto services (rare but emerging)'
              ]
            },
            transparency: {
              title: 'Transparency and Traceability',
              benefit: 'Every stablecoin transaction is recorded on a public blockchain. Sphere can provide:',
              capabilities: [
                'Transaction hash (unique identifier)',
                'Timestamp (exact time of transfer)',
                'Sender/receiver wallet addresses',
                'Amount transferred',
                'Blockchain confirmation (proof of finality)'
              ],
              regulatorValue: 'Regulators LOVE this. Traditional correspondent banking is opaque—you don\'t know which correspondent banks were involved, what fees they charged, when payment was actually processed. Blockchain is transparent. Sphere can show regulators the exact path money took.',
              auditTrail: 'Every Sphere payment has a complete audit trail: (1) Fiat deposited at on-ramp (timestamped, KYC\'d), (2) Stablecoin minted/transferred (blockchain record), (3) Fiat withdrawn at off-ramp (timestamped, KYC\'d). Perfect for compliance audits.'
            }
          },
          arnoldInsight: {
            quote: 'People don\'t need to do the learning curve. It\'s just faster, cheaper, and everyone needs to send money to do business.',
            speaker: 'Arnold Lee'
          },
          table: {
            title: 'Major Stablecoins (January 2026)',
            headers: ['Stablecoin', 'Market Cap', 'Key Characteristic', 'Regulatory Status'],
            rows: [
              ['USDT (Tether)', '~$137B', 'Highest liquidity globally, dominant in Asia', 'Not MiCA compliant (delisted from EU exchanges)'],
              ['USDC (Circle)', '~$52B', 'US-regulated, transparent reserves', 'MiCA compliant, GENIUS Act compliant'],
              ['USDS (Sky/Maker)', '~$6B', 'Decentralized, crypto-collateralized', 'DeFi native, regulatory status evolving'],
              ['PYUSD (PayPal)', '~$800M', 'PayPal ecosystem integration', 'US-regulated (Paxos issued)'],
              ['EURC (Circle)', '~$200M', 'EUR-denominated, MiCA compliant', 'Primary EUR stablecoin for EU'],
              ['USDG (Paxos/Global Dollar Network)', 'Launching', 'Bank-consortium backed', 'Positioned for institutional adoption']
            ],
            note: 'Market caps are approximate and fluctuate. Verify current figures for presentations.'
          },
          marketGrowth: {
            title: 'Stablecoin Market Growth',
            currentState: {
              title: 'Current Market (2025-2026)',
              metrics: [
                { metric: 'Total Market Cap', value: '~$200B+', source: 'CoinGecko/CoinMarketCap' },
                { metric: 'Annual Transfer Volume', value: '$27.6T (2024)', source: 'Chainalysis' },
                { metric: 'Active Addresses', value: '120M+', source: 'Industry estimates' },
                { metric: 'Daily Transactions', value: '1M+', source: 'On-chain data aggregators' }
              ]
            },
            projections: {
              title: 'Growth Projections',
              estimates: [
                { source: 'Citigroup (2024)', projection: '$1.9T - $4.0T by 2030', scenario: 'Base to bull case' },
                { source: 'Standard Chartered (2024)', projection: '$2T+ by 2028', scenario: 'Regulatory clarity drives adoption' },
                { source: 'Bernstein (2024)', projection: '$2.8T by 2028', scenario: 'Stablecoins become dominant payment rail' }
              ],
              driversOfGrowth: [
                'Regulatory clarity (MiCA, GENIUS Act) enabling institutional adoption',
                'Cross-border payment use cases (Sphere\'s market)',
                'Treasury management and yield opportunities',
                'Emerging market demand for dollar access',
                'Central bank digital currency (CBDC) complementarity'
              ]
            },
            comparisonToTraditional: {
              title: 'Stablecoins vs Traditional Payment Volume',
              comparisons: [
                { system: 'Visa', annualVolume: '~$15T', note: 'Consumer payments' },
                { system: 'Mastercard', annualVolume: '~$9T', note: 'Consumer payments' },
                { system: 'SWIFT', annualVolume: '~$150T', note: 'Interbank messaging (not settlement)' },
                { system: 'Stablecoins', annualVolume: '~$27.6T (2024)', note: 'Growing rapidly, mostly B2B/DeFi' }
              ],
              insight: 'Stablecoin volume already exceeds Visa. While not directly comparable (different use cases), this demonstrates stablecoins are not niche — they\'re systemically significant.'
            }
          },
          reserveComposition: {
            title: 'What Backs These Stablecoins?',
            items: [
              { issuer: 'Tether (USDT)', composition: '~80% T-bills and cash equivalents, ~10% secured loans, ~5% Bitcoin, ~5% other', updated: 'Q4 2024 attestation' },
              { issuer: 'Circle (USDC)', composition: '~80% short-dated T-bills (BlackRock managed), ~20% cash at regulated banks', updated: 'Monthly attestations' },
              { issuer: 'PayPal (PYUSD)', composition: '100% cash, T-bills, and money market funds (Paxos managed)', updated: 'Monthly attestations' }
            ],
            keyPoint: 'Major stablecoins are backed by real, short-dated, liquid assets — primarily US Treasury bills. This is why the "stablecoins link to Treasury markets" narrative in the systemic risk section matters.',
            treasuryHoldings: {
              title: 'Stablecoin Issuers as Treasury Holders',
              context: 'Stablecoin issuers have become major holders of US Treasury bills:',
              holdings: [
                { issuer: 'Tether', amount: '~$100B+', ranking: 'Would rank among top 20 sovereign holders' },
                { issuer: 'Circle', amount: '~$40B+', ranking: 'Significant institutional holder' }
              ],
              implication: 'This is the connection to systemic risk — stablecoin redemptions could force Treasury sales, affecting yields and liquidity.'
            }
          },
          types: {
            title: 'Types of Stablecoins',
            items: [
              { type: 'Fiat-Collateralized', icon: '💵', examples: 'USDT, USDC, PYUSD, EURC', description: 'Backed 1:1 by fiat reserves. Most common, most institutional. Subject to MiCA/GENIUS Act.' },
              { type: 'Crypto-Collateralized', icon: '🔗', examples: 'DAI/USDS', description: 'Backed by crypto assets (over-collateralized). More volatile, DeFi-focused. Less regulatory clarity.' },
              { type: 'Algorithmic', icon: '📈', examples: 'Terra/Luna (failed 2022)', description: 'Maintained by algorithms, no hard backing. HIGH RISK. Most jurisdictions now restrict or prohibit.' },
              { type: 'Commodity-Backed', icon: '🥇', examples: 'PAXG (gold)', description: 'Backed by physical commodities. Niche use cases. Subject to commodity regulations.' },
              { type: 'Bank-Consortium', icon: '🏦', examples: 'USDG (launching), JPM Coin', description: 'Issued by or backed by bank consortiums. Emerging category targeting institutional adoption.' }
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
          antarcticaStory: {
            title: 'The Antarctica Story: A Cautionary Tale',
            speaker: 'Arnold Lee',
            setup: 'Arnold tells a parable about "Antarctica" — a fictional emerging market that serves as a perfect case study for understanding the disruptive potential and risks of stablecoins in economies with weak currencies and capital controls.',
            theScenario: {
              title: 'The Setup: Pre-Stablecoin Antarctica',
              situation: 'Antarctica is an emerging market country with chronic inflation and currency instability. The local currency, let\'s call it the "Antarctic Peso," has been depreciating 20-30% annually for years. The government, desperate to prevent capital flight, institutes strict capital controls.',
              capitalControls: [
                'Citizens can only convert $10,000 per year from Antarctic Pesos to USD',
                'Businesses need government approval for any foreign currency transaction',
                'Official exchange rate: 100 Pesos = $1 USD (government-set)',
                'Black market rate: 150 Pesos = $1 USD (market reality)'
              ],
              whatThisMeans: 'If you\'re an Antarctic citizen or business, your savings are trapped in a depreciating currency. The government uses this captive capital to finance its operations—printing money to pay salaries, fund public services, service debt. The population has no escape.'
            },
            stablecoinsArrive: {
              title: 'Act II: Stablecoins Arrive in Antarctica',
              howTheyArrive: 'Savvy Antarcticans discover they can:',
              steps: [
                'Buy USDT on a peer-to-peer exchange using local currency',
                'Hold USDT in a self-custody wallet (government can\'t freeze it)',
                'Transact in USDT with anyone globally (bypassing capital controls)',
                'Convert USDT back to local currency when needed'
              ],
              adoption: 'Within 6 months, 30% of businesses start accepting USDT for payments. Within 12 months, 60% of savings move from Antarctic Peso bank accounts into USDT wallets. Within 18 months, no one trusts the Antarctic Peso anymore.',
              quote: 'If you have easy access to dollars through stablecoins, why do you need the old fishbones at all?',
              fishbonesExplained: 'The "old fishbones" are the Antarctic Peso—the local currency that citizens used because they had no alternative. Stablecoins provided the alternative.'
            },
            theCollapse: {
              title: 'Act III: The System Collapses',
              whatHappens: 'The Antarctic government suddenly realizes:',
              consequences: [
                {
                  problem: 'Tax Revenue Vanishes',
                  explanation: 'Businesses transact in USDT off the government\'s radar. Sales taxes, VAT, corporate taxes—all evaded or underreported. Government revenue drops 40%.'
                },
                {
                  problem: 'Central Bank Loses Control',
                  explanation: 'Monetary policy is useless. The central bank can print Antarctic Pesos, but no one wants them. Interest rate adjustments don\'t matter when citizens save in USDT.'
                },
                {
                  problem: 'Government Can\'t Pay Salaries',
                  explanation: 'Teachers, police, military, civil servants are all paid in Antarctic Pesos. But no one will accept Pesos anymore. Government tries to pay salaries in Pesos—employees refuse to work.'
                },
                {
                  problem: 'Social Services Collapse',
                  explanation: 'Healthcare, education, infrastructure—all funded by the government. With no tax revenue and no one accepting the currency, these services shut down.'
                },
                {
                  problem: 'Civil Unrest',
                  explanation: 'Unpaid police and military. Desperate citizens. No social services. The government tries to ban stablecoins, but it\'s too late—everyone is already using them. Enforcement is impossible.'
                }
              ],
              theCrisis: 'Within 24 months of mass stablecoin adoption, Antarctica\'s government is functionally insolvent. The Antarctic Peso collapses from 150:1 to 10,000:1. Hyperinflation sets in. The economy implodes.'
            },
            theLessonTitle: 'What the Antarctica Story Teaches Us',
            lessons: [
              {
                lesson: 'Stablecoins Are Disruptive, Not Risk-Free',
                explanation: 'Stablecoins aren\'t neutral technology. They fundamentally challenge the sovereignty of any government that relies on currency controls or seigniorage (profit from printing money). Emerging markets with weak currencies are most vulnerable.'
              },
              {
                lesson: 'Violent Transitions Are the Real Risk',
                explanation: 'The problem isn\'t that stablecoins exist. The problem is the SPEED of transition. Antarctica\'s economy had no time to adapt. Gradual dollarization (like Ecuador or El Salvador) can be managed. Rapid, uncontrolled dollarization via stablecoins creates chaos.'
              },
              {
                lesson: 'Regulators Will React',
                explanation: 'When governments see their monetary sovereignty threatened, they WILL crack down. We\'ve already seen this: China banned crypto, Nigeria restricted stablecoin access, India proposed bans. Sphere must work WITH regulators, not around them.'
              },
              {
                lesson: 'Don\'t Present Stablecoins as Harmless',
                explanation: 'If you tell a central banker "stablecoins are just faster payments," they will not take you seriously. They understand the systemic implications. Acknowledge the disruption. Frame Sphere as a compliance-native solution that respects sovereignty.'
              }
            ],
            arnoldInsight: 'Stablecoins themselves are not the problem, but VIOLENT TRANSITIONS are. Countries need time to adapt. Sphere works with regulators to enable gradual, controlled adoption—not chaotic displacement.',
            spherePosition: 'Sphere is NOT trying to replace national currencies. We\'re providing cross-border payment infrastructure for businesses—not facilitating mass dollarization. Our customers are enterprises paying suppliers, not citizens hoarding stablecoins to avoid local currency.'
          },
          riskCategories: {
            title: 'Five Categories of Stablecoin Risk',
            items: [
              {
                category: 'Reserve Risk',
                icon: '🏦',
                description: 'Are reserves actually there? Are they liquid? Quality assets?',
                examples: [
                  'Tether controversy (2017-2021): Claims of full backing questioned. NYAG investigation found Tether was not fully backed for periods. Settled for $18.5M fine.',
                  'TerraUSD (algorithmic): Zero reserves. Relied on arbitrage mechanism. Collapsed in May 2022, $40B+ wiped out.',
                  'Reserve quality risk: If stablecoin holds illiquid assets (commercial paper, corporate bonds), it can\'t honor redemptions quickly.'
                ],
                context: 'Even if reserves exist, they must be LIQUID and HIGH QUALITY. T-bills good. Long-dated bonds bad. Cash good. Commercial paper risky.'
              },
              {
                category: 'Redemption Risk',
                icon: '💸',
                description: 'Can you actually get your $ back? What if everyone redeems at once?',
                examples: [
                  'Bank run scenario: If 10% of USDC holders ($4.5B) redeem simultaneously, Circle must sell $4.5B in T-bills. Large sales move markets, can create temporary liquidity crunch.',
                  'Redemption restrictions: Some stablecoins have minimum redemption amounts ($100K+) or processing delays (T+1 settlement). Retail users stuck.',
                  'Weekend freeze: If depeg happens Friday night, redemptions don\'t process until Monday. Panic selling on secondary markets.'
                ],
                context: 'Redemption risk is highest during confidence shocks. Even well-backed stablecoins can temporarily trade below $1 if redemptions are slow or restricted.'
              },
              {
                category: 'Operational Risk',
                icon: '⚙️',
                description: 'Smart contract bugs, hacks, key management failures',
                examples: [
                  'Ronin Bridge hack (March 2022): $625M stolen from bridge connecting Ethereum to Ronin. Validators\' private keys compromised.',
                  'Wormhole hack (February 2022): $325M exploited due to smart contract vulnerability. Hacker minted USDC without depositing assets.',
                  'Centralized freezing: USDC and USDT have admin keys that can freeze any wallet. Used for law enforcement, but also single point of failure. If key is compromised, attacker could freeze billions.'
                ],
                context: 'Operational risk includes: smart contract bugs, bridge vulnerabilities, oracle manipulation, admin key compromise, and infrastructure failures (RPC nodes, relayers).'
              },
              {
                category: 'Regulatory Risk',
                icon: '⚖️',
                description: 'Issuer gets shut down, banned, or forced to freeze assets',
                examples: [
                  'China ban (2021): All crypto transactions declared illegal. Stablecoin users in China lost access overnight. Exchanges delisted trading pairs.',
                  'BUSD shutdown (Feb 2023): Binance\'s stablecoin issuer (Paxos) ordered by NYDFS to stop minting new BUSD. Market cap dropped from $16B to $3B in 6 months.',
                  'Potential US regulation: If Congress passes stablecoin legislation requiring bank charters, non-compliant issuers would be banned. Users holding non-compliant stablecoins would need to convert or lose access.'
                ],
                context: 'Regulatory risk is JURISDICTION-SPECIFIC. USDC is low-risk in US/EU. USDT is high-risk in US but widely accepted in Asia. Regulatory environment changes fast.'
              },
              {
                category: 'Counterparty Risk',
                icon: '🤝',
                description: 'Banks holding reserves fail (see USDC/SVB case)',
                examples: [
                  'USDC/SVB (March 2023): $3.3B of USDC reserves at Silicon Valley Bank. SVB failed Friday. USDC immediately at risk. This is the case study below.',
                  'Signature Bank (March 2023): Major crypto banking partner. Shut down by regulators same weekend as SVB. Multiple stablecoin issuers had exposure.',
                  'Banking concentration risk: If stablecoin holds ALL reserves at one bank, that bank\'s failure destroys the stablecoin. Even if FDIC insured, $250K limit means losses on large balances.'
                ],
                context: 'Counterparty risk is why DIVERSIFICATION matters. Circle now spreads reserves across 6+ banks. Tether uses multiple jurisdictions. No single point of failure.'
              }
            ]
          },
          caseStudy: {
            title: 'USDC Depeg (March 2023): The Full Story',
            subtitle: 'How a well-regulated, fully-backed stablecoin lost its peg in 48 hours',
            background: {
              title: 'Background: USDC Pre-Crisis',
              status: 'USDC was the gold standard of stablecoins',
              characteristics: [
                'Issued by Circle, a US-licensed money transmitter',
                'Fully reserved with T-bills and cash',
                'Monthly attestations from Grant Thornton (Big 4 accounting)',
                'Market cap: $43 billion',
                'Used by institutions, exchanges, and enterprises globally',
                'Never depegged significantly—always traded $0.9999-$1.0001'
              ],
              circlesBanking: 'Circle held USDC reserves across multiple US banks, including: Silicon Valley Bank ($3.3B), Signature Bank (undisclosed amount), BNY Mellon, Citizens Bank, and others. This diversification was considered conservative.'
            },
            timeline: [
              {
                time: 'Wednesday, March 8, 2023',
                event: 'SVB announces $1.8B loss on bond portfolio sale',
                context: 'Silicon Valley Bank (SVB) discloses it sold $21B of bonds at a loss to raise liquidity. Stock drops 60%. Depositors panic.',
                impact: 'USDC unaffected. No one knows Circle has $3.3B at SVB.'
              },
              {
                time: 'Thursday, March 9, 2023 (Morning)',
                event: 'SVB bank run accelerates',
                context: 'Venture capital firms tell portfolio companies to withdraw from SVB immediately. $42B withdrawn in 24 hours. SVB is insolvent.',
                impact: 'Still no USDC concern. Circle hasn\'t disclosed SVB exposure.'
              },
              {
                time: 'Thursday, March 9, 2023 (Evening)',
                event: 'SVB seized by FDIC',
                context: 'California regulators and FDIC take control of SVB. Second-largest bank failure in US history. Depositors with >$250K balances are NOT guaranteed full recovery.',
                impact: 'Crypto Twitter begins speculating: "Which stablecoin issuers banked at SVB?"'
              },
              {
                time: 'Friday, March 10, 2023 (2:00 AM)',
                event: 'Circle discloses $3.3B at SVB',
                context: 'Circle CEO Jeremy Allaire tweets: "Circle has ~$3.3 billion of its ~$40 billion of USDC reserves with Silicon Valley Bank." This is 8% of reserves.',
                impact: 'IMMEDIATE PANIC. USDC begins trading below $1.00 on exchanges. Within hours, drops to $0.95.'
              },
              {
                time: 'Friday, March 10, 2023 (Markets Open)',
                event: 'USDC redemptions surge',
                context: 'Circle continues honoring redemptions—but only for deposits received BEFORE the SVB failure. New redemption requests delayed. Users panic, sell USDC on secondary markets.',
                impact: 'USDC drops to $0.90, then $0.88. Trading volume explodes to $20B/day (10x normal). Arbitrage bots buy USDC at $0.88, hoping to redeem at $1.00 later.'
              },
              {
                time: 'Saturday, March 11, 2023 (Lowest Point)',
                event: 'USDC bottoms at $0.87',
                context: 'Weekend. No banking hours. No way to redeem USDC for fiat until Monday. Panic selling continues. $5.6 BILLION in value lost in 48 hours (13% depeg).',
                impact: 'DeFi protocols holding USDC reserves face insolvency. Aave, Compound, MakerDAO all at risk. If USDC doesn\'t recover, $10B+ in DeFi could collapse.'
              },
              {
                time: 'Sunday, March 12, 2023 (4:00 PM)',
                event: 'Federal Reserve announces full depositor protection',
                context: 'US Treasury, Fed, and FDIC jointly announce ALL depositors at SVB and Signature Bank will be made whole—no $250K limit. Circle will recover 100% of $3.3B.',
                impact: 'USDC immediately jumps to $0.97 on announcement. Confidence restored.'
              },
              {
                time: 'Monday, March 13, 2023 (Markets Open)',
                event: 'USDC recovers to $0.9999',
                context: 'Circle confirms all reserves intact. Redemptions resume normally. USDC regains peg within 24 hours of Fed announcement.',
                impact: 'Crisis over. Total duration: 72 hours from disclosure to recovery.'
              }
            ],
            keyInsights: {
              title: 'What This Case Study Reveals',
              insights: [
                {
                  insight: 'CONFIDENCE IS EVERYTHING',
                  explanation: 'USDC was ALWAYS fully backed. Circle had the reserves. But for 72 hours, the MARKET didn\'t know if they could access them. Confidence shock caused depeg, not insolvency.'
                },
                {
                  insight: 'COUNTERPARTY RISK IS UNAVOIDABLE',
                  explanation: 'Circle did "everything right"—diversified across banks, held high-quality reserves, monthly attestations. But they STILL had $3.3B at a failed bank. No amount of diversification eliminates counterparty risk entirely.'
                },
                {
                  insight: 'WEEKEND LIQUIDITY GAPS ARE DANGEROUS',
                  explanation: 'SVB failed on a Friday. No redemptions over the weekend. Users panicked and sold on secondary markets, creating the depeg. If failure had been Monday-Thursday, depeg might have been avoided.'
                },
                {
                  insight: 'GOVERNMENT BACKSTOP SAVED USDC',
                  explanation: 'If the Fed hadn\'t guaranteed depositors, Circle would have lost $3.3B (8% of reserves). USDC might have permanently traded at $0.92. The government saved USDC—not Circle\'s risk management.'
                },
                {
                  insight: 'STABLECOINS ARE ONLY AS STABLE AS THEIR WEAKEST LINK',
                  explanation: 'USDC\'s reserves were 92% safe. But the 8% at SVB caused a 13% depeg. The market doesn\'t average risk—it panics at the worst exposure.'
                }
              ]
            },
            lesson: 'Well-regulated, fully-backed stablecoins CAN STILL DEPEG due to confidence shocks. The lesson: Acknowledge risk. Don\'t promise perfection. Explain mitigation.',
            postCrisis: 'After the crisis, Circle: (1) Diversified further—now holds reserves at 6+ banks, (2) Increased cash holdings vs T-bills for faster liquidity, (3) Publishes daily reserve reports instead of monthly. But the risk remains: any bank holding reserves can fail.'
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
            title: 'How Sphere Mitigates Stablecoin Risk',
            principle: 'We can\'t eliminate stablecoin risk—but we can minimize exposure through operational design and partner selection.',
            strategies: [
              {
                risk: 'Reserve Risk',
                sphereMitigation: 'Work only with audited, regulated issuers',
                howItWorks: 'Sphere only uses stablecoins from issuers with: (1) Monthly attestations from reputable auditors, (2) Public reserve disclosures, (3) Regulatory licenses (money transmitter, EMI, MAS license). We exclude: algorithmic stablecoins, unaudited issuers, or anything without transparent reserves.',
                specificActions: [
                  'Approved list: USDC, USDT (select corridors only), EURC',
                  'Review reserve reports monthly—if composition changes (e.g., shift to illiquid assets), flag for review',
                  'Diversify across issuers when possible (e.g., USDC for US, USDT for Asia)'
                ],
                whichRisksAddressed: 'Eliminates algorithmic collapse risk. Reduces reserve quality risk. Doesn\'t eliminate risk entirely—audited issuers can still have problems (see USDC).'
              },
              {
                risk: 'Redemption Risk',
                sphereMitigation: 'Transitory holdings—stablecoins held for MINUTES, not days',
                howItWorks: 'Sphere doesn\'t accumulate stablecoin balances. Every payment is: (1) Fiat received → convert to stablecoin, (2) Transfer stablecoin cross-border, (3) Convert stablecoin → fiat delivered. Total hold time: 15-45 minutes average.',
                specificActions: [
                  'No overnight stablecoin positions—everything converted to fiat by end of day',
                  'Maximum hold time: 2 hours for any single transaction',
                  'If redemption delayed (liquidity issue), we absorb cost and complete payment using backup liquidity'
                ],
                whichRisksAddressed: 'Dramatically reduces redemption risk exposure. If a depeg happens (like USDC), our exposure is MINUTES of transaction volume, not days/weeks. Example: During USDC depeg, a firm holding $10M in USDC lost $1.3M (13% depeg). Sphere\'s average position: ~$500K for 30 minutes. Max loss: $65K even in worst-case scenario.'
              },
              {
                risk: 'Operational Risk',
                sphereMitigation: 'Multi-issuer support + redundant infrastructure',
                howItWorks: 'Sphere integrates with multiple stablecoin issuers. If one experiences operational issues (smart contract bug, bridge hack, freeze), we route through another. We also maintain hot wallet limits—never hold more than $2M in any single wallet.',
                specificActions: [
                  'Primary: USDC. Secondary: USDT. Tertiary: EURC or alternative',
                  'Hot wallet max: $2M. Cold storage for larger reserves.',
                  'Multi-sig wallets (3-of-5) for critical operations—no single point of failure',
                  'If smart contract vulnerability detected, immediately pause affected routes and switch to backup issuer'
                ],
                whichRisksAddressed: 'Reduces single-issuer operational risk. If USDC bridge hacked, switch to USDT. If USDT has smart contract issue, switch to USDC. Doesn\'t eliminate risk—if BOTH fail simultaneously, we have exposure.'
              },
              {
                risk: 'Regulatory Risk',
                sphereMitigation: 'Compliance-native design—only licensed partners, full KYC/AML',
                howItWorks: 'Sphere operates in compliance with local regulations FIRST. We don\'t use stablecoins in jurisdictions where they\'re banned or restricted. We work with licensed on-ramps and off-ramps who handle all regulatory reporting.',
                specificActions: [
                  'Jurisdiction screening: Before offering a corridor, legal team confirms stablecoin usage is permitted',
                  'Partner vetting: All on/off-ramp partners must have: MSB license (US), FCA authorization (UK), MAS license (Singapore), etc.',
                  'If regulatory environment changes (e.g., new stablecoin ban), we have 30-day wind-down plan to migrate customers'
                ],
                whichRisksAddressed: 'Reduces risk of sudden regulatory shutdown. We\'re operating WITH regulators, not around them. If stablecoin regulation tightens, we\'re positioned to comply quickly. Doesn\'t eliminate risk—governments can still ban stablecoins overnight (see China).'
              },
              {
                risk: 'Counterparty Risk',
                sphereMitigation: 'Diversified banking partners + continuous monitoring',
                howItWorks: 'Sphere doesn\'t hold fiat balances at a single bank. We maintain relationships with 10+ licensed banks/payment institutions globally. If one fails, we have backup liquidity sources.',
                specificActions: [
                  'Banking diversification: No more than 20% of reserves at any single bank',
                  'Daily monitoring: Track credit ratings, CDS spreads, news for all partner banks',
                  'If bank shows distress (rating downgrade, deposit flight), reduce exposure within 48 hours',
                  'FDIC/deposit insurance where available, but don\'t rely on it (only covers $250K)'
                ],
                whichRisksAddressed: 'Reduces concentrated bank failure risk. SVB-style failure wouldn\'t affect Sphere severely because we\'d have <10% exposure to any single bank. Doesn\'t eliminate counterparty risk entirely—multiple banks can fail (see 2008).'
              }
            ],
            keyPoint: 'We hold stablecoins for MINUTES, not days. This dramatically reduces exposure to ALL five risk categories. Even in worst-case scenarios (depeg, hack, bank failure), our exposure is limited to minutes of transaction flow.',
            honestAssessment: 'Can Sphere eliminate stablecoin risk? NO. Can we minimize it to acceptable levels for enterprise customers? YES. Transparency about risk is MORE IMPORTANT than promising zero risk.'
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
            title: 'Speed Comparison: The Full Picture',
            subtitle: 'Stablecoins vs Traditional Rails',
            headers: ['System', 'Settlement Time', 'Cost', 'Operating Hours', 'Finality'],
            rows: [
              ['Solana (stablecoin)', '400ms', '~$0.00025', '24/7/365', 'Probabilistic (seconds)'],
              ['Ethereum (stablecoin)', '12-15 seconds', '~$1-50', '24/7/365', 'Probabilistic (minutes)'],
              ['Fedwire (USD)', '5-30 minutes', '~$25-50', 'Business hours only', 'Immediate legal finality'],
              ['SWIFT + Correspondent', '2-5 DAYS', '~6% (avg)', 'Business hours only', 'T+2 to T+5'],
              ['ACH (USD)', '1-2 days', '~$0.25-1', 'Batch windows', 'T+1 to T+2']
            ],
            stablecoinLegDetail: {
              title: 'Stablecoin Leg Breakdown',
              steps: [
                { step: 'Fiat to Stablecoin (On-Ramp)', time: '5-15 minutes', what: 'Customer deposits fiat → Licensed partner converts to stablecoin', dependency: 'Banking system availability' },
                { step: 'Stablecoin Transfer (Blockchain)', time: '15 seconds to 5 minutes', what: 'Stablecoin moves on-chain', dependency: 'Blockchain congestion, gas prices' },
                { step: 'Stablecoin to Fiat (Off-Ramp)', time: '15-45 minutes', what: 'Stablecoin converted → Fiat delivered to beneficiary', dependency: 'Local banking hours, KYC verification' }
              ],
              totalTime: '30 minutes to 1 hour (median)',
              bottleneck: 'NOT the blockchain—the bottleneck is the fiat on/off-ramps, which depend on traditional banking systems.'
            },
            fiatLegDetail: {
              title: 'Fiat Leg Breakdown (Traditional Wire)',
              steps: [
                { step: 'Customer Initiates Wire', time: 'Day 0, varies by cut-off', what: 'Customer submits wire instruction to bank', dependency: 'Bank cut-off times (often 2-5 PM local)' },
                { step: 'Originating Bank Processes', time: 'Day 0 or Day 1', what: 'Bank validates instruction, debits account, sends SWIFT message', dependency: 'Bank processing queue, compliance screening' },
                { step: 'Correspondent Bank 1', time: 'Day 1-2', what: 'First correspondent receives SWIFT message, runs compliance, forwards', dependency: 'Correspondent\'s business hours, compliance review' },
                { step: 'Correspondent Bank 2 (if needed)', time: 'Day 2-3', what: 'Second correspondent (common for frontier markets)', dependency: 'Same as above + liquidity in nostro account' },
                { step: 'Beneficiary Bank', time: 'Day 3-5', what: 'Final bank receives, runs compliance, credits beneficiary account', dependency: 'Final compliance review, account verification' }
              ],
              totalTime: '2-5 business days (median)',
              bottleneck: 'Correspondent banking chain—each hop adds 1-2 days due to compliance, cut-off times, and manual processing.'
            },
            conclusion: 'Stablecoins are 1000x faster and 99% cheaper. But that creates new problems—the speed asymmetry.'
          },
          asymmetryProblem: {
            title: 'The Speed Asymmetry Problem',
            concept: 'When one leg of a transaction settles in minutes and the other takes days, you create a TIMING GAP. During that gap, money is "in flight" and someone bears the risk.',
            visualization: [
              { leg: 'Stablecoin Leg', time: '15-30 minutes', finality: 'On-chain confirmation' },
              { leg: 'Fiat Leg', time: '2-5 business days', finality: 'Bank settlement confirmation' }
            ],
            problem: 'One side settles instantly, the other takes days. This creates reconciliation risk and forces a choice: WHO bears the risk during the gap?',
            detailedScenarios: {
              title: 'What Can Go Wrong: Real Scenarios',
              scenarios: [
                {
                  scenario: 'Scenario 1: Release Stablecoin Before Fiat Confirmed',
                  setup: 'Customer in UAE wants to pay US supplier $100K. Sphere receives AED equivalent, converts to USDC, releases USDC to supplier within 30 minutes (stablecoin speed).',
                  problem: 'But the AED→USD fiat leg takes 2 days to settle through correspondent banks. What if the original AED payment bounces (insufficient funds, compliance issue, customer reversal)?',
                  consequence: 'Supplier already has $100K USDC. Sphere is $100K short. Sphere bears the loss.',
                  risk: 'SPHERE bears settlement risk if we release stablecoin before fiat confirmed'
                },
                {
                  scenario: 'Scenario 2: Wait for Fiat Before Releasing Stablecoin',
                  setup: 'Sphere receives AED from customer, waits 2-5 days for fiat to fully settle through correspondent chain before releasing USDC to supplier.',
                  problem: 'This eliminates Sphere\'s risk—but now the payment takes 2-5 days. We\'ve lost the speed advantage of stablecoins.',
                  consequence: 'Customer asks: "Why am I using Sphere if it takes the same time as a wire?"',
                  risk: 'No risk to Sphere, but value proposition disappears'
                },
                {
                  scenario: 'Scenario 3: FX Movement During Gap',
                  setup: 'Customer sends AED 367,300 (= $100K at 3.673 rate). Sphere converts to USDC immediately. But the fiat settlement takes 3 days.',
                  problem: 'Over those 3 days, AED depreciates to 3.80. When fiat settles, Sphere receives AED 367,300, but it\'s now only worth $96,658.',
                  consequence: 'Sphere promised supplier $100K USDC. Sphere received equivalent of $96,658. Sphere is $3,342 short.',
                  risk: 'FX exposure during the timing gap—someone has to absorb FX movement'
                },
                {
                  scenario: 'Scenario 4: Compliance Flag After Stablecoin Released',
                  setup: 'Sphere releases $100K USDC to supplier after receiving customer\'s fiat. Two days later, customer\'s bank flags the transaction for AML review and freezes the payment.',
                  problem: 'Supplier has $100K USDC. Customer\'s bank has frozen their $100K. Sphere is stuck in the middle.',
                  consequence: 'Sphere either: (1) Claws back USDC from supplier (relationship damage), or (2) Absorbs $100K loss.',
                  risk: 'Compliance timing mismatches—one leg clears compliance, other doesn\'t'
                },
                {
                  scenario: 'Scenario 5: Amount Mismatch Due to Fees',
                  setup: 'Customer sends $100K. Correspondent bank deducts $250 fee. Sphere receives $99,750. But Sphere already released $100K USDC to supplier.',
                  problem: 'Amounts don\'t match. Supplier has $100K, Sphere received $99,750.',
                  consequence: 'Sphere is $250 short on every transaction with unexpected fees.',
                  risk: 'Hidden correspondent fees that weren\'t disclosed upfront'
                }
              ]
            },
            theProblem: 'There is NO perfect solution. Speed creates risk. The question is: HOW do you minimize it?'
          },
          fourLedgers: {
            title: 'Four Ledgers Must Reconcile',
            concept: 'Every Sphere payment touches FOUR separate ledgers. They all must agree—but they operate on different timelines.',
            ledgers: [
              {
                name: 'Client\'s Bank Ledger',
                icon: '🏦',
                what: 'Customer\'s bank account where fiat is debited',
                timing: 'Immediate debit when wire initiated (Day 0)',
                owner: 'Customer\'s bank',
                finality: 'Immediate from customer perspective, but can be reversed if fraud/compliance issue'
              },
              {
                name: 'Sphere\'s Bank Ledger',
                icon: '🏛️',
                what: 'Sphere\'s bank account where fiat is received',
                timing: 'Receives fiat after correspondent settlement (Day 2-5)',
                owner: 'Sphere\'s partner bank',
                finality: 'Final once correspondent chain settles—but timing is unpredictable'
              },
              {
                name: 'Blockchain Ledger',
                icon: '⛓️',
                what: 'Public blockchain where stablecoin transfer occurs',
                timing: 'Confirms in 15 seconds to 5 minutes',
                owner: 'Decentralized network (Ethereum, Solana, etc.)',
                finality: 'Probabilistic—final after N confirmations (minutes), but no legal backing'
              },
              {
                name: 'Destination Bank Ledger',
                icon: '🏦',
                what: 'Beneficiary\'s bank account where fiat is credited',
                timing: 'Credits after off-ramp converts stablecoin (Day 0 + 30-60 minutes)',
                owner: 'Beneficiary\'s bank',
                finality: 'Final once credited, but bank can claw back if compliance issue'
              }
            ],
            timingDifferences: {
              title: 'Timing Differences Create Gaps',
              explanation: 'These four ledgers don\'t update simultaneously. Here\'s a realistic timeline:',
              timeline: [
                { time: 'T+0 (Day 0, 9:00 AM)', event: 'Customer initiates wire at their bank', ledger: 'Client Bank Ledger', status: 'Debited' },
                { time: 'T+0 (Day 0, 9:15 AM)', event: 'Sphere on-ramp receives wire notification', ledger: 'None yet', status: 'Pending confirmation' },
                { time: 'T+0 (Day 0, 9:30 AM)', event: 'On-ramp converts to USDC, sends to Sphere', ledger: 'Blockchain Ledger', status: 'USDC credited' },
                { time: 'T+0 (Day 0, 9:45 AM)', event: 'Sphere releases USDC to beneficiary', ledger: 'Blockchain Ledger', status: 'USDC transferred' },
                { time: 'T+0 (Day 0, 10:00 AM)', event: 'Off-ramp converts USDC to fiat', ledger: 'Destination Bank Ledger', status: 'Fiat credited to beneficiary' },
                { time: 'T+2 (Day 2, 2:00 PM)', event: 'Fiat finally settles into Sphere\'s bank account', ledger: 'Sphere Bank Ledger', status: 'Fiat received' }
              ],
              gap: 'For 2 DAYS, there\'s a gap: Beneficiary has fiat. Customer was debited. But Sphere hasn\'t received fiat yet. Who bears risk during this gap?'
            },
            requirement: 'All four ledgers must eventually reconcile. But timing differences create temporary gaps that must be monitored, controlled, and someone must bear the risk.'
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
            principle: 'Don\'t release stablecoins until fiat confirmed. SAFETY over raw SPEED.',
            philosophy: 'We could settle payments in 60 seconds using pure blockchain speed. We choose 15-30 minutes instead because that gives us time to CONFIRM fiat settlement before releasing stablecoins. This is the tradeoff.',
            explanation: 'We prioritize SAFETY over raw SPEED. 15-30 minutes is fast enough to transform cross-border payments (vs 2-5 days traditional). Adding 15 minutes for safety is worth it.',
            operationalControls: {
              title: 'Specific Reconciliation Procedures',
              controls: [
                {
                  control: 'Pre-Flight Verification',
                  what: 'Before initiating any payment, verify customer has sufficient balance and wire instruction is valid',
                  how: 'Automated API call to customer\'s bank (where available) OR require pre-funding to Sphere account',
                  preventedRisk: 'Prevents releasing stablecoin when customer has insufficient funds'
                },
                {
                  control: 'Fiat Confirmation Gateway',
                  what: 'Do NOT release stablecoins until we receive confirmation fiat has been received by our partner bank',
                  how: 'Wait for bank API confirmation OR partner on-ramp confirms receipt of fiat. Maximum wait: 2 hours. If no confirmation, escalate to manual review.',
                  preventedRisk: 'Eliminates risk of releasing stablecoin before fiat arrives'
                },
                {
                  control: 'Amount Matching',
                  what: 'Verify the amount received matches the amount expected (accounting for disclosed fees)',
                  how: 'Automated reconciliation: Expected = $100K. Received = $99,750. Difference = $250. If difference > $100 OR > 0.5%, flag for review.',
                  preventedRisk: 'Catches hidden correspondent fees or FX slippage'
                },
                {
                  control: 'Automated Exception Handling',
                  what: 'If reconciliation fails (amounts don\'t match, timing exceeds threshold), pause payment and route to operations team',
                  how: 'Rules engine: If fiat not confirmed within 2 hours → escalate. If amount mismatch > $100 → escalate. If compliance flag → freeze and notify customer.',
                  preventedRisk: 'Prevents auto-processing of problematic transactions'
                },
                {
                  control: 'Daily Ledger Reconciliation',
                  what: 'At end of each day, reconcile all four ledgers to ensure they balance',
                  how: 'Export transactions from: (1) Customer bank, (2) Sphere bank, (3) Blockchain explorer, (4) Beneficiary confirmations. Match them. Any unmatched items flagged for next-day resolution.',
                  preventedRisk: 'Detects any transactions that "fell through the cracks"'
                },
                {
                  control: 'Cut-Off Time Management',
                  what: 'Clearly communicate cut-off times to customers to avoid weekend/holiday delays',
                  how: 'If payment initiated Friday 5 PM, system warns: "Fiat settlement won\'t complete until Monday. Stablecoin will be released Monday 9 AM after confirmation." Customer can proceed or delay.',
                  preventedRisk: 'Manages customer expectations on timing, avoids weekend exposure'
                },
                {
                  control: 'Rollback Procedures',
                  what: 'If payment fails at any stage, have clear rollback process',
                  how: 'If fiat received but stablecoin fails to send → return fiat to customer (minus fees) within 24 hours. If stablecoin sent but beneficiary bank rejects → claw back stablecoin, return to sender.',
                  preventedRisk: 'Provides customer protection if something goes wrong'
                }
              ]
            },
            settlementsWindows: {
              title: 'Settlement Windows and Cut-Off Times',
              explanation: 'Different systems have different operating hours. We design around the SLOWEST link.',
              windows: [
                { system: 'Blockchain (USDC on Ethereum)', hours: '24/7/365', cutOff: 'None' },
                { system: 'Fedwire (USD settlement)', hours: 'Mon-Fri 9:00 PM (prev day) to 7:00 PM ET', cutOff: '6:30 PM ET for same-day' },
                { system: 'UAE RTGS (AED settlement)', hours: 'Sun-Thu 8:00 AM to 5:00 PM GST', cutOff: '4:00 PM GST for same-day' },
                { system: 'SWIFT (messaging)', hours: '24/7', cutOff: 'None, but receiving banks have their own cut-offs' },
                { system: 'Correspondent Banks', hours: 'Varies by bank and jurisdiction', cutOff: 'Often 2:00-5:00 PM local time' }
              ],
              strategy: 'Sphere initiates stablecoin transfer 24/7. But we ONLY confirm payment complete once the fiat leg has cleared all cut-off times and settled. If customer initiates Friday 6 PM, we warn: completion Monday 10 AM.'
            },
            safetyFirstExamples: {
              title: 'Safety-First in Action',
              examples: [
                {
                  situation: 'Customer initiates $50K payment Friday 5:30 PM ET',
                  naiveApproach: 'Convert to USDC immediately, release to beneficiary. Payment "complete" in 30 minutes.',
                  sphereApproach: 'System recognizes: Fedwire cut-off passed (6:30 PM). Fiat won\'t settle until Monday. We hold USDC until Monday 10 AM after confirming Fedwire settlement. Total time: 3 days, but SAFE.',
                  whyItMatters: 'If customer\'s wire bounces over the weekend (insufficient funds, compliance issue), we haven\'t released USDC yet. No loss.'
                },
                {
                  situation: 'Customer sends AED 100,000. Sphere expects to receive AED 100,000. Partner confirms only AED 99,500 received.',
                  naiveApproach: 'Close enough. Release $27,000 USDC to beneficiary anyway.',
                  sphereApproach: 'Amount mismatch detected ($500 difference). Payment paused. System contacts customer: "We received AED 99,500, not AED 100,000. Did your bank charge a fee? Please confirm." Customer confirms fee. Sphere releases adjusted USDC amount ($26,863).',
                  whyItMatters: 'Prevents Sphere from absorbing hidden fees. Keeps reconciliation tight.'
                },
                {
                  situation: 'Blockchain congestion—gas fees spike from $5 to $200',
                  naiveApproach: 'Pay $200 gas fee to meet speed SLA. Absorb the cost.',
                  sphereApproach: 'System detects gas spike. Offers customer choice: (1) Pay $200 for immediate transfer, or (2) Wait 2 hours for gas to normalize. Most choose to wait. Saves Sphere from bleeding on gas fees.',
                  whyItMatters: 'Flexibility beats rigid speed targets. Customers care about COST too.'
                }
              ]
            },
            process: [
              'Step 1: Fiat received and confirmed → THEN convert to stablecoin',
              'Step 2: Stablecoin transferred on-chain → confirm N-block finality',
              'Step 3: Beneficiary confirmed fiat receipt → THEN mark payment complete',
              'Step 4: Never expose Sphere to both legs simultaneously—one must settle before the other initiates'
            ],
            conclusion: 'This is slower than raw blockchain speed (60 seconds) but ELIMINATES settlement risk. 15-30 minutes is fast enough for enterprise use cases.'
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
          issuanceVsTransmission: {
            title: 'Critical Distinction: Issuance vs Transmission',
            concept: 'Regulators distinguish between ISSUING stablecoins (minting new tokens) and TRANSMITTING stablecoins (moving them between parties). This distinction determines which regulations apply.',
            issuance: {
              title: 'Issuance (Minting Stablecoins)',
              what: 'Creating new stablecoin tokens backed by fiat reserves. Example: Circle minting new USDC when someone deposits USD.',
              regulatoryFramework: 'Treated like issuing e-money or deposits. Heavy regulation.',
              requirements: [
                'Banking license OR e-money license (EU) OR money transmitter license (US states)',
                '1:1 reserve backing with high-quality liquid assets',
                'Capital requirements (€350K+ in EU, varies by US state)',
                'Regular third-party audits of reserves',
                'Consumer protection obligations',
                'Redemption guarantees'
              ],
              whoDoesThis: 'Circle (USDC), Tether (USDT), Paxos (PYUSD). Very few entities globally—maybe 10-20.',
              spherePosition: 'Sphere does NOT issue stablecoins. We are not a stablecoin issuer. We don\'t want to be. Issuing is heavily regulated, capital-intensive, and not our business model.'
            },
            transmission: {
              title: 'Transmission (Moving Stablecoins)',
              what: 'Facilitating the transfer of existing stablecoins between parties. Example: Sphere receiving USDC from sender, moving it to recipient.',
              regulatoryFramework: 'Treated like payment services or money transmission. Still regulated, but lighter than issuance.',
              requirements: [
                'Money transmitter license (US) OR payment services license (EU/UK/Singapore)',
                'AML/KYC compliance (know your customer, screen for sanctions)',
                'Transaction monitoring and reporting',
                'Consumer protection disclosures',
                'Operational resilience standards',
                'Capital requirements (lower than issuers—typically $100K-500K)'
              ],
              whoDoesThis: 'Coinbase, Kraken, Binance (exchanges), Sphere, Ripple, Wise. Hundreds of entities globally.',
              spherePosition: 'Sphere is a TRANSMITTER. We move stablecoins on behalf of customers. We partner with licensed issuers (Circle, Tether) but don\'t compete with them.'
            },
            whyItMatters: {
              title: 'Why This Distinction Matters',
              points: [
                'Different regulatory burden: Issuance requires banking-level capital and oversight. Transmission requires payment-level licensing.',
                'Market positioning: Sphere saying "we\'re a stablecoin company" confuses people. We\'re a PAYMENT company that uses stablecoins as rails.',
                'Competitive moat: Most companies can become transmitters (get MSB license). Very few can become issuers (need banking license + massive capital).',
                'Customer education: When regulators ask "are you issuing?" the answer is ALWAYS no. We transmit. This puts us in a much less regulated bucket.'
              ]
            },
            analogy: 'Think of stablecoins like USD. Issuing = Federal Reserve printing money. Transmission = PayPal moving money. Very different regulatory treatment.'
          },
          globalFrameworks: {
            title: 'Sphere\'s Target Markets: Regulatory Landscape',
            subtitle: 'Focus on markets where Sphere is aggressively building',
            items: [
              { jurisdiction: '🇦🇪 UAE', framework: 'CBUAE + VARA + DFSA', status: 'Active', sphereFocus: 'PRIMARY MARKET' },
              { jurisdiction: '🇸🇬 Singapore', framework: 'MAS Payment Services Act', status: 'Enforced', sphereFocus: 'PRIMARY MARKET' },
              { jurisdiction: '🇬🇧 UK', framework: 'FCA authorization', status: 'Evolving', sphereFocus: 'PRIMARY MARKET' },
              { jurisdiction: '🇧🇷 Brazil', framework: 'BCB Payment Institutions', status: 'Active', sphereFocus: 'LATAM HUB' },
              { jurisdiction: '🇺🇸 US', framework: 'GENIUS Act (2025) + State MTLs', status: 'Enacted', sphereFocus: 'Key corridor partner' },
              { jurisdiction: '🇪🇺 EU', framework: 'MiCA (Markets in Crypto-Assets)', status: 'Enforced', sphereFocus: 'Key corridor partner' }
            ]
          },
          uaeDeepDive: {
            title: 'UAE: Sphere\'s Home Market',
            whyUAE: 'UAE is Sphere\'s primary market. Dubai is the financial hub for MENA, Asia-Africa trade, and emerging markets. High volume of cross-border payments, progressive regulatory environment.',
            regulators: [
              { name: 'CBUAE (Central Bank of UAE)', jurisdiction: 'Onshore payment services', relevance: 'Sphere operates under CBUAE licensing for fiat on/off-ramping' },
              { name: 'VARA (Virtual Assets Regulatory Authority)', jurisdiction: 'Dubai virtual assets', relevance: 'Governs crypto custody, exchange services in Dubai' },
              { name: 'DFSA (Dubai Financial Services Authority)', jurisdiction: 'DIFC (Dubai International Financial Centre)', relevance: 'Free zone regulator—separate from onshore' },
              { name: 'FSRA (Financial Services Regulatory Authority)', jurisdiction: 'ADGM (Abu Dhabi Global Market)', relevance: 'Abu Dhabi free zone—separate from Dubai' }
            ],
            keyDevelopments: [
              'CBUAE Circular 2/2024 — licensing framework for stablecoin payment services',
              'Digital Dirham (CBDC) pilot underway—Sphere positioned to integrate',
              'UAE-India payment corridor focus (massive remittance volume)',
              'Dubai Multi Commodities Centre (DMCC) crypto hub'
            ],
            complianceRequirements: {
              title: 'Sphere\'s UAE Compliance Obligations',
              requirements: [
                'Payment Services License from CBUAE (Sphere has applied)',
                'AML/KYC: UAE FIU reporting, FATF compliance, sanctions screening',
                'Reserve management: Fiat held at UAE-licensed banks',
                'Consumer protection: Clear disclosures, dispute resolution',
                'Operational resilience: Business continuity, cybersecurity standards'
              ]
            }
          },
          singaporeDeepDive: {
            title: 'Singapore: Asia-Pacific Hub',
            whySingapore: 'Singapore is Asia\'s financial center. Gateway to Southeast Asia, India, China corridors. MAS (Monetary Authority of Singapore) is progressive but strict—high compliance bar.',
            framework: 'Payment Services Act (PSA) 2019',
            complianceRequirements: {
              title: 'MAS Payment Services License',
              requirements: [
                'Major Payment Institution (MPI) license for large volumes',
                'Minimum S$250K capital (higher for cross-border)',
                'Technology risk management (TRMG) standards',
                'AML/CFT: Transaction monitoring, STR filing, STRO reporting',
                'Consumer protection: Safeguarding of customer funds'
              ]
            },
            sphereAdvantage: 'MAS is CRYPTO-FRIENDLY but demands high operational standards. Sphere\'s compliance-first approach aligns perfectly. Singapore is ideal for Southeast Asia, India, Australia corridors.'
          },
          ukDeepDive: {
            title: 'UK: European Gateway Post-Brexit',
            whyUK: 'London remains Europe\'s financial capital. Post-Brexit, UK can set its own crypto policy. FCA is stricter than EU on some areas, more flexible on others.',
            framework: 'FCA Authorization + upcoming stablecoin regulations (2024-2025)',
            complianceRequirements: {
              title: 'FCA Requirements for Payment Firms',
              requirements: [
                'Authorized Payment Institution (API) OR E-Money Institution (EMI) license',
                'Financial Crime Systems: AML/CFT/sanctions compliance',
                'Safeguarding: Customer funds held separately',
                'Operational resilience: Outsourcing, third-party risk management',
                'Consumer Duty: Fair treatment, clear communication'
              ]
            },
            sphereAdvantage: 'UK is eager to be a crypto hub post-Brexit. Sphere can position as compliant UK-licensed provider for UK-Europe, UK-US, UK-MENA corridors.'
          },
          brazilDeepDive: {
            title: 'Brazil: LatAm\'s Largest Market',
            whyBrazil: 'Brazil is LatAm\'s largest economy. Massive cross-border payment volume (imports, remittances). BCB (Central Bank of Brazil) launched PIX (instant payments) and is now eyeing stablecoins.',
            framework: 'Payment Institutions regulated by BCB (Central Bank of Brazil)',
            complianceRequirements: {
              title: 'BCB Payment Institution Requirements',
              requirements: [
                'Payment Institution (IP) license from BCB',
                'Minimum BRL 2M capital (~$400K USD)',
                'COAF reporting: Financial Intelligence Unit for AML',
                'LGPD compliance: Data privacy (similar to GDPR)',
                'FX compliance: Currency exchange controls, documentation'
              ]
            },
            frictionPoints: [
              'Capital controls: Brazil has FX restrictions—need BCB approval for large transfers',
              'Tax documentation: IOF tax (financial transactions tax) applies to FX',
              'Local banking: Need Brazilian bank relationships for BRL on/off-ramping',
              'Political risk: Regulation can change quickly with new administrations'
            ],
            sphereAdvantage: 'Sphere partners with licensed Brazilian payment institutions (IPs) who already have BCB approval. We don\'t need to get our own Brazilian license—we leverage partners. This is FASTER and LOWER RISK than direct licensing.',
            corridors: 'Brazil → US (imports), Brazil → China (trade), Brazil → Europe (finance), US → Brazil (remittances)'
          },
          potentialFrictionPoints: {
            title: 'Regulatory Friction Points Across Jurisdictions',
            frictions: [
              {
                friction: 'Multi-Jurisdiction Licensing',
                challenge: 'Each country requires separate license. UAE license doesn\'t work in Singapore. Singapore license doesn\'t work in Brazil.',
                sphereApproach: 'Sphere obtains licenses in key hubs (UAE, Singapore, UK) and partners with licensed entities in other markets (Brazil, Mexico, Philippines). Hybrid approach: own licenses where strategic, partnerships elsewhere.',
                example: 'Brazil: Partner with licensed IP. Philippines: Partner with licensed remittance provider. Don\'t try to license everywhere—too slow, too expensive.'
              },
              {
                friction: 'Conflicting AML/KYC Standards',
                challenge: 'US requires OFAC screening. EU requires FATF compliance. UAE requires FIU reporting. All slightly different formats, timelines, lists.',
                sphereApproach: 'Sphere builds ONE global AML/KYC system that meets the HIGHEST standard (typically US/EU). Then customize reporting for each jurisdiction. Easier to be overcompliant than undercompliant.',
                example: 'Screen ALL transactions against OFAC, EU sanctions, UN sanctions—even if jurisdiction only requires one. This eliminates risk of missing sanctions hits.'
              },
              {
                friction: 'Capital Controls and FX Restrictions',
                challenge: 'Some countries (Brazil, India, China) restrict currency outflows. You need documentation, limits apply, government approval required for large amounts.',
                sphereApproach: 'Sphere works WITH central banks, not around them. File proper documentation. Use stablecoins for the speed benefit, but still comply with capital controls. Don\'t try to circumvent—that gets you banned.',
                example: 'Brazil: Customer wants to send $500K to US supplier. Sphere files FX documentation with BCB showing commercial purpose (import payment). BCB approves. Payment moves via stablecoins but with full regulatory approval.'
              },
              {
                friction: 'Consumer Protection Requirements',
                challenge: 'EU MiCA requires redemption guarantees. US requires clear fee disclosures. Singapore requires dispute resolution. All add operational complexity.',
                sphereApproach: 'Sphere builds robust consumer protection into product design: (1) Clear fees upfront, (2) Transaction confirmations, (3) Customer support, (4) Dispute resolution process. This is table stakes for institutional customers anyway.',
                example: 'Customer disputes a $10K payment—claims they never received it. Sphere provides blockchain proof + beneficiary confirmation. Case closed in 24 hours.'
              },
              {
                friction: 'Banking Partner Derisking',
                challenge: 'Traditional banks are scared of crypto. Many won\'t bank stablecoin companies. Finding banking partners is the biggest operational challenge.',
                sphereApproach: 'Sphere positions as "cross-border payments company" not "crypto company." Emphasize compliance-first approach. Partner with crypto-friendly banks (Signature was one until it failed, now Silvergate, Western Alliance, others). Diversify banking relationships.',
                example: 'Sphere maintains bank accounts at 5+ banks globally. If one bank derisks, we have backups. Never rely on a single banking partner.'
              }
            ]
          },
          howSphereAddresses: {
            title: 'How Sphere Turns Regulation Into Competitive Advantage',
            advantages: [
              {
                advantage: 'Compliance Moat',
                explanation: 'Getting licenses takes 12-18 months and costs $500K-1M per jurisdiction. Most crypto startups can\'t afford it. Sphere can. This creates a moat—competitors are locked out.',
                example: 'Competitor wants to enter UAE market. They need CBUAE license. 12-month process. Sphere is already licensed. 12-month head start.'
              },
              {
                advantage: 'Institutional Trust',
                explanation: 'Banks, corporations, governments will only work with licensed entities. Being licensed opens doors that unlicensed competitors can\'t access.',
                example: 'UAE government entity wants to pay international suppliers. They ask: "Are you CBUAE licensed?" Sphere says yes. Unlicensed competitor is immediately disqualified.'
              },
              {
                advantage: 'Regulatory Arbitrage (Legal Kind)',
                explanation: 'Sphere can route payments through the most favorable jurisdiction. UAE→Singapore via stablecoins (fast). Singapore→EU via traditional rails (compliant). Optimize for speed AND compliance.',
                example: 'Payment to sanctioned country flagged. Sphere routes through EU-licensed partner who has proper OFAC license for that country. Compliant AND fast.'
              },
              {
                advantage: 'Partnership Leverage',
                explanation: 'Licensed entities attract other licensed entities as partners. Banks want to partner with licensed fintechs. Issuers want licensed transmission partners.',
                example: 'Circle looks for licensed partners to distribute USDC. Sphere is licensed in UAE, Singapore, UK. Circle chooses Sphere over unlicensed competitors.'
              }
            ]
          },
          micaDetails: {
            title: 'MiCA (EU) — Comprehensive Overview',
            fullName: 'Markets in Crypto-Assets Regulation',
            effectiveDate: 'June 2024 (stablecoin provisions), December 2024 (full enforcement)',
            scope: 'All 27 EU member states plus EEA (Norway, Iceland, Liechtenstein)',
            background: {
              title: 'Why MiCA Matters',
              points: [
                'First comprehensive crypto regulatory framework for a major economic bloc',
                'Creates single market for crypto-assets across EU — one license works everywhere',
                'Establishes clear rules that other jurisdictions are using as template',
                'Directly impacts any company serving EU customers or using EUR stablecoins'
              ]
            },
            stablecoinClassification: {
              title: 'MiCA Stablecoin Classifications',
              types: [
                {
                  type: 'E-Money Tokens (EMTs)',
                  definition: 'Stablecoins pegged to a single fiat currency (e.g., USDC, USDT, EURC)',
                  requirements: 'Must be issued by authorized credit institution or e-money institution',
                  example: 'USDC (pegged to USD), EURC (pegged to EUR)'
                },
                {
                  type: 'Asset-Referenced Tokens (ARTs)',
                  definition: 'Stablecoins pegged to multiple currencies, commodities, or basket of assets',
                  requirements: 'Stricter requirements due to complexity — whitepaper, governance, reserve management',
                  example: 'Hypothetical token pegged to USD + EUR + gold'
                }
              ]
            },
            keyRequirements: {
              title: 'MiCA Requirements for Stablecoin Issuers',
              requirements: [
                {
                  requirement: 'Authorization',
                  detail: 'Must be authorized as credit institution or e-money institution in an EU member state',
                  implication: 'High barrier to entry — banking-level licensing required'
                },
                {
                  requirement: '1:1 Reserve Backing',
                  detail: 'Reserves must equal or exceed outstanding token value at all times',
                  implication: 'No fractional reserve stablecoins allowed'
                },
                {
                  requirement: 'Reserve Composition',
                  detail: 'Reserves must be in highly liquid, low-risk assets (cash, government bonds, money market funds)',
                  implication: 'Limits yield-seeking behavior with reserves'
                },
                {
                  requirement: 'Segregation',
                  detail: 'Reserves must be segregated from issuer\'s operational funds and held with regulated custodians',
                  implication: 'Protects holders if issuer fails'
                },
                {
                  requirement: 'Redemption Rights',
                  detail: 'Holders must be able to redeem at par value at any time, with funds delivered within specified timeframe',
                  implication: 'Creates bank-run risk that issuers must manage'
                },
                {
                  requirement: 'Capital Requirements',
                  detail: 'Minimum €350,000 own funds OR 2% of average reserve assets (whichever is higher)',
                  implication: 'Significant capital commitment required'
                },
                {
                  requirement: 'Audit Requirements',
                  detail: 'Regular independent audits of reserves, published publicly',
                  implication: 'Transparency requirement — no more trust-me attestations'
                },
                {
                  requirement: 'Volume Caps for Significant EMTs',
                  detail: 'If daily transactions exceed €200M or outstanding tokens exceed €1B, additional restrictions apply',
                  implication: 'Limits growth of largest stablecoins to manage systemic risk'
                }
              ]
            },
            tetherImpact: {
              title: 'MiCA Impact on Tether (USDT)',
              timeline: [
                { date: 'June 2024', event: 'MiCA stablecoin provisions take effect' },
                { date: 'June-December 2024', event: 'Tether did not obtain EU authorization' },
                { date: 'December 2024', event: 'Major EU exchanges begin delisting USDT' },
                { date: 'January 2025', event: 'Coinbase Europe, Kraken Europe, others delist USDT' }
              ],
              consequences: [
                'USDT no longer available on regulated EU exchanges',
                'EU users must convert to USDC, EURC, or other compliant stablecoins',
                'Tether loses significant EU market share',
                'Creates opportunity for compliant stablecoin issuers (Circle, etc.)'
              ],
              sphereImplication: 'For EU corridors, Sphere routes through USDC or EURC (MiCA-compliant) rather than USDT. This is a competitive advantage — we can serve EU customers that USDT-only providers cannot.'
            },
            circleApproval: {
              title: 'Circle\'s MiCA Compliance',
              status: 'Circle obtained e-money institution authorization in France (July 2024)',
              products: ['USDC (USD-pegged)', 'EURC (EUR-pegged)'],
              implication: 'Circle is the largest MiCA-compliant stablecoin issuer — Sphere\'s primary stablecoin partner for EU corridors'
            },
            sphereStrategy: {
              title: 'Sphere\'s MiCA Strategy',
              approach: [
                'Use MiCA-compliant stablecoins (USDC, EURC) for all EU-touching transactions',
                'Maintain flexibility to add other MiCA-compliant issuers as they emerge',
                'Position MiCA compliance as competitive advantage vs providers using only USDT',
                'Monitor MiCA evolution — additional provisions may require adjustment'
              ]
            }
          },
          geniusAct: {
            title: 'GENIUS Act (US) — Comprehensive Overview',
            fullName: 'Guiding and Establishing National Innovation for U.S. Stablecoins Act',
            status: 'Enacted 2025 — First comprehensive federal stablecoin legislation in US history',
            significance: {
              title: 'Why GENIUS Act Matters',
              points: [
                'Ends years of regulatory uncertainty for stablecoins in the US',
                'Creates clear federal framework — no more state-by-state patchwork alone',
                'Defines "payment stablecoin" as distinct regulatory category',
                'Establishes US as having clear stablecoin rules (competitive with EU MiCA)'
              ]
            },
            keyProvisions: {
              title: 'GENIUS Act Key Provisions',
              provisions: [
                {
                  provision: 'Payment Stablecoin Definition',
                  detail: 'Defines "payment stablecoin" as digital asset pegged to fiat currency, designed for payment/settlement, with redemption rights',
                  implication: 'Clear definition prevents regulatory arbitrage'
                },
                {
                  provision: 'Federal Licensing Path',
                  detail: 'Creates optional federal charter for stablecoin issuers, administered by OCC (Office of Comptroller of Currency)',
                  implication: 'Issuers can choose federal license instead of state-by-state MTLs'
                },
                {
                  provision: 'State Licensing Path Preserved',
                  detail: 'States can continue licensing stablecoin issuers under state law, with federal floor requirements',
                  implication: 'Dual federal-state system (similar to banking)'
                },
                {
                  provision: 'Reserve Requirements',
                  detail: '1:1 backing required in cash, Treasury bills, or other high-quality liquid assets',
                  implication: 'Codifies reserve standards already followed by major issuers'
                },
                {
                  provision: 'Segregation Requirements',
                  detail: 'Reserves must be segregated from issuer operations and held at regulated institutions',
                  implication: 'Bankruptcy remoteness for stablecoin holders'
                },
                {
                  provision: 'Redemption Rights',
                  detail: 'Holders must be able to redeem at par value within specified timeframe',
                  implication: 'Consumer protection guarantee'
                },
                {
                  provision: 'Audit and Disclosure',
                  detail: 'Regular audits by registered CPA firms, public disclosure of reserve composition',
                  implication: 'Transparency requirements similar to MiCA'
                },
                {
                  provision: 'Prohibition on Unauthorized Issuance',
                  detail: 'Makes it unlawful to issue payment stablecoins without proper licensing',
                  implication: 'Clear enforcement authority against unlicensed issuers'
                },
                {
                  provision: 'Algorithmic Stablecoin Restrictions',
                  detail: 'Algorithmic stablecoins (not asset-backed) face additional scrutiny and disclosure',
                  implication: 'Learned from Terra/Luna collapse'
                }
              ]
            },
            whatItDoesNot: {
              title: 'What GENIUS Act Does NOT Cover',
              items: [
                'Stablecoin TRANSMISSION (that remains under state MTL and FinCEN MSB framework)',
                'Other cryptocurrencies (Bitcoin, Ethereum, etc. — separate legislation pending)',
                'DeFi protocols (focus is on centralized issuers)',
                'Securities classification (SEC jurisdiction questions remain open)'
              ]
            },
            sphereImplication: {
              title: 'GENIUS Act Impact on Sphere',
              points: [
                'Sphere is NOT an issuer — we\'re a transmitter. GENIUS Act primarily affects issuers (Circle, Tether, etc.)',
                'Sphere benefits from clearer rules for issuers — more stable, compliant stablecoins to use',
                'Transmission licensing remains state MTL + FinCEN MSB (our current framework)',
                'Regulatory clarity attracts institutional adoption — good for Sphere\'s enterprise customers'
              ],
              positioning: 'When asked about GENIUS Act, clarify that Sphere is a TRANSMITTER (licensed MSB), not an ISSUER. GENIUS Act affects our stablecoin partners, not us directly — but clearer rules benefit the entire ecosystem.'
            },
            comparisonToMiCA: {
              title: 'GENIUS Act vs MiCA Comparison',
              headers: ['Aspect', 'GENIUS Act (US)', 'MiCA (EU)'],
              rows: [
                ['Effective', '2025', '2024'],
                ['Scope', 'Payment stablecoins', 'All crypto-assets'],
                ['Licensing', 'Federal or state choice', 'Single EU authorization'],
                ['Reserve requirement', '1:1 in HQLA', '1:1 in HQLA'],
                ['Redemption rights', 'Yes', 'Yes'],
                ['Volume caps', 'No', 'Yes (for significant EMTs)'],
                ['Algorithmic coins', 'Restricted', 'Restricted']
              ]
            }
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
          { q: 'What did MiCA cause for Tether?', options: ['Approval', 'Delisting from EU exchanges', 'No impact', 'Increased usage'], correct: 1 },
          { q: 'UAE stablecoin services regulator (onshore)?', options: ['VARA', 'CBUAE', 'DFSA', 'SEC'], correct: 1 },
          { q: 'Why is regulatory convergence good for Sphere?', options: ['Less regulation', 'Eliminates cowboys, validates model', 'Allows avoiding compliance', 'Cheaper operations'], correct: 1 },
          { q: 'GENIUS Act primarily regulates:', options: ['Stablecoin transmission', 'Stablecoin issuance', 'All crypto trading', 'DeFi protocols'], correct: 1 },
          { q: 'Which stablecoin is MiCA compliant?', options: ['USDT', 'USDC', 'DAI', 'Terra'], correct: 1 },
          { q: 'Sphere is classified as:', options: ['Stablecoin issuer', 'Stablecoin transmitter', 'Crypto exchange', 'Bank'], correct: 1 },
          { q: 'MiCA requires stablecoin reserves to be:', options: ['In Bitcoin', '1:1 in liquid assets', 'Algorithmic', 'Optional'], correct: 1 }
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
            subtitle: 'Real production numbers from live enterprise customers',
            items: [
              { metric: 'Annualized Volume', value: '$2.5B+', context: 'B2B payments only—not consumer speculation' },
              { metric: 'B2B Customers', value: '150+', context: 'SMEs to large enterprises across UAE, Singapore, UK' },
              { metric: 'Active Accounts', value: '1,847', context: 'Businesses actively using Sphere for vendor/supplier payments' },
              { metric: 'Median Settlement', value: '15-30 minutes', context: 'End-to-end: fiat received → beneficiary fiat delivered' },
              { metric: '99th percentile (before 3pm GST)', value: 'Same day', context: 'GST = Gulf Standard Time (UTC+4). Dubai/Abu Dhabi timezone. Payments initiated before 3pm GST complete same business day.' }
            ],
            clarification: 'The "before 3pm" metric is GST (Gulf Standard Time, UTC+4) because Sphere is UAE-based. If payment initiated after 3pm GST or on weekends, beneficiary banking hours may delay final fiat delivery to next business day—but stablecoin leg still completes in minutes.'
          },
          realEnterpriseUseCases: {
            title: 'Real Enterprise Use Cases: Detailed Examples',
            subtitle: 'These are actual Sphere customer scenarios (anonymized)',
            cases: [
              {
                useCase: 'E-Commerce Platform: Cross-Border Vendor Payments',
                customer: 'UAE-based e-commerce marketplace (think Amazon/Noon model)',
                problem: 'Platform has 2,000+ international sellers (India, China, Turkey, Philippines). Pays sellers weekly for orders fulfilled. Traditional method: Wire transfers taking 5-7 days, costing $25-50 per transfer. Sellers complain about delays. Platform spending $100K+/month on wire fees.',
                sphereSolution: 'Sphere connects to platform API. Every Friday, platform initiates batch payment (2,000 sellers, $3M total). Sphere converts AED to USDC, distributes to sellers globally, local partners convert to INR/CNY/TRY/PHP. Sellers receive funds in 2-4 hours instead of 5-7 days.',
                results: {
                  speed: '5-7 days → 2-4 hours',
                  cost: '$50/transfer → $8/transfer (84% savings)',
                  sellerSatisfaction: 'Churn reduced 40%—sellers happier with faster payments',
                  platformAdvantage: 'Can offer "instant seller payouts" as competitive differentiator'
                },
                whySphere: [
                  'API integration: Platform doesn\'t need to change payment workflow',
                  'Multi-currency support: Sphere handles 15+ destination currencies',
                  'Compliance handled: Sphere manages KYC, AML, sanctions screening',
                  'UAE-licensed: Platform\'s legal team approves because Sphere is CBUAE-compliant'
                ]
              },
              {
                useCase: 'Construction Company: International Supplier Payments',
                customer: 'Dubai-based construction firm building hotels/towers',
                problem: 'Sources materials from China, Italy, Germany, India. Payment terms: Wire transfer on delivery. Traditional wire takes 3-5 days. Suppliers won\'t ship next order until payment confirmed. This delays construction timelines.',
                sphereSolution: 'Sphere enables same-day payment confirmation. Construction firm initiates payment morning of delivery. Supplier confirms receipt same afternoon. Ships next order immediately.',
                results: {
                  cashFlow: 'Suppliers now offer 30-day terms (instead of prepay) because payment is fast/reliable',
                  projectTimeline: '15% faster project completion due to supply chain velocity',
                  relationships: 'Preferred customer status with key suppliers'
                },
                whySphere: [
                  'Speed matters: Construction projects are time-sensitive',
                  'Proof of payment: Blockchain record shows payment sent/received',
                  'Supplier trust: Suppliers prefer Sphere payments because they\'re guaranteed',
                  'Compliance: All suppliers KYC\'d, sanctions-screened by Sphere'
                ]
              },
              {
                useCase: 'Tech Startup: International Contractor Payroll',
                customer: 'UAE-based fintech startup with remote team (30 contractors across 15 countries)',
                problem: 'Pays contractors monthly via Wise/PayPal. Fees: 3-4%. Delays: 2-3 days. Contractors in frontier markets (Nigeria, Philippines, Pakistan) face additional delays due to correspondent banking.',
                sphereSolution: 'Sphere processes monthly payroll. Startup deposits AED once/month. Sphere distributes to contractors in local currency within 24 hours.',
                results: {
                  cost: '$12K/month in fees → $2K/month (83% savings)',
                  speed: '2-3 days → 24 hours',
                  contractorRetention: 'Contractors happier—no more payment delays',
                  globalHiring: 'Can now hire in any country without worrying about payment infrastructure'
                },
                whySphere: [
                  'Frontier market access: Sphere reaches countries Wise/PayPal struggle with',
                  'Compliance for contractors: KYC handled by Sphere, not startup',
                  'Tax documentation: Sphere provides proof-of-payment for contractor tax filings',
                  'Scalability: Can add 100 contractors without new banking setup'
                ]
              },
              {
                useCase: 'Import/Export Trader: Trade Finance Settlement',
                customer: 'Singapore-based commodities trader (coffee, spices, textiles)',
                problem: 'Buys from Brazil/India, sells to Europe/US. Traditional letters of credit take 7-14 days to settle. Ties up working capital. Misses market opportunities due to slow settlement.',
                sphereSolution: 'Sphere enables instant settlement once goods inspected. Buyer deposits USDC to escrow. Seller ships. Inspector confirms quality. Sphere releases USDC to seller. Converted to BRL/INR same day.',
                results: {
                  workingCapital: '10x capital efficiency—money not stuck in transit',
                  deals: 'Can execute 3x more deals/month due to fast settlement',
                  margins: 'Better pricing because suppliers offer discounts for fast payment'
                },
                whySphere: [
                  'Escrow functionality: Sphere holds USDC until conditions met',
                  'Smart contract integration: Automatic release on confirmation',
                  'Multi-leg support: Buy in BRL, convert to USDC, sell to EUR buyer',
                  'Audit trail: Complete blockchain record for compliance/dispute resolution'
                ]
              },
              {
                useCase: 'Remittance Company: White-Label API',
                customer: 'UK-based remittance provider serving South Asian diaspora',
                problem: 'Customers send money UK→India/Pakistan/Bangladesh. Traditional correspondent banking: 3-5 days, 5-7% fees. Losing market share to crypto solutions.',
                sphereSolution: 'Remittance company white-labels Sphere API. Customers send GBP, recipient gets INR/PKR/BDT in 1-2 hours. Remittance company takes 2% margin, Sphere handles rails.',
                results: {
                  customerRetention: 'Churn down 60%—customers love speed',
                  margin: '5% traditional → 2% Sphere = still profitable, just lower margin',
                  volume: '3x volume growth because faster/cheaper service attracts customers'
                },
                whySphere: [
                  'White-label API: Remittance company keeps brand, Sphere is invisible',
                  'Licensing: Remittance company has UK FCA license, Sphere handles crypto side',
                  'Liquidity: Sphere manages stablecoin on/off-ramps',
                  'Compliance: Sphere does sanctions screening, remittance company does customer KYC'
                ]
              }
            ]
          },
          whySphereIsRightPartner: {
            title: 'Why Sphere is the Right Partner for These Use Cases',
            overarching: 'Enterprises don\'t want to become crypto experts. They want payment infrastructure that just works. Sphere provides that.',
            reasons: [
              {
                reason: 'Licensed and Compliant',
                why: 'Enterprises can\'t use unlicensed providers. Audit risk, legal risk, reputational risk. Sphere has licenses in key markets (UAE, Singapore, UK applying).',
                example: 'E-commerce platform\'s CFO asks: "Are you licensed?" Sphere shows CBUAE license. Deal closes.',
                competitive: 'Most crypto payment companies are unlicensed. Sphere is regulated financial infrastructure.'
              },
              {
                reason: 'API-First Integration',
                why: 'Enterprises have existing payment workflows (ERPs, accounting systems). They need API integration, not a new manual process.',
                example: 'Construction company uses Oracle ERP. Sphere API integrates directly. Payments initiated from ERP, status updates automatically.',
                competitive: 'Crypto wallets require manual transfers. Sphere is enterprise-ready infrastructure.'
              },
              {
                reason: 'Multi-Currency, Multi-Corridor',
                why: 'Enterprises operate globally. They need ONE partner for all corridors, not separate providers per country.',
                example: 'Tech startup pays contractors in 15 countries. One Sphere account covers all. No need for 15 banking relationships.',
                competitive: 'Traditional banks cover 5-10 corridors. Crypto exchanges cover crypto-to-crypto. Sphere covers fiat-to-fiat via crypto rails globally.'
              },
              {
                reason: 'White-Label and Co-Branding',
                why: 'Some enterprises want Sphere infrastructure but their own brand. Sphere supports white-label APIs and co-branded solutions.',
                example: 'Remittance company doesn\'t want customers to know Sphere exists. Sphere API runs invisibly. Customer sees remittance company brand.',
                competitive: 'Banks won\'t white-label. Crypto companies want brand visibility. Sphere is flexible.'
              },
              {
                reason: 'Enterprise Support and SLAs',
                why: 'Enterprises need guaranteed uptime, dedicated support, and contractual SLAs. Consumer products don\'t offer this.',
                example: 'E-commerce platform has 99.9% uptime SLA with sellers. Sphere provides 99.95% uptime guarantee. Platform\'s SLA covered.',
                competitive: 'Crypto exchanges have downtime during volatility. Sphere is enterprise infrastructure built for reliability.'
              },
              {
                reason: 'Compliance as a Service',
                why: 'Enterprises don\'t want to manage AML/KYC/sanctions screening. Sphere handles all compliance, provides audit trails.',
                example: 'Construction company audited by CBUAE. Sphere provides complete transaction records, KYC documentation, sanctions screening logs. Audit passes.',
                competitive: 'DIY crypto requires enterprise to manage compliance. Sphere externalizes compliance burden.'
              }
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
      },
      {
        id: 'systemic-risk-at-scale',
        title: '2.6 Systemic Risk at Scale',
        curriculum: {
          objectives: [
            'Understand how stablecoin risks extend beyond the crypto ecosystem',
            'Explain three systemic risk categories: leverage formation, liquidity runs, enforcement gaps',
            'Articulate how on-chain leverage can introduce contagion to traditional finance',
            'Understand why existing blockchains cannot support preventative compliance',
            'Explain SphereNet\'s compliance-native architecture as a solution'
          ],
          keyConcepts: [
            'Stablecoins reaching systemic scale ($305B market, projected $1.9-4T by 2030)',
            'Three risk categories: Leverage Formation, Liquidity Runs, Enforcement Gaps',
            'MakerDAO case: infinite rehypothecation and hidden leverage',
            'USDC depeg: synchronized exits without circuit breakers',
            'Chainalysis case: analytics-based enforcement is reactive, not preventative',
            'SphereNet: compliance-native, privacy-preserving, verified ecosystem'
          ]
        },
        learn: {
          introduction: 'Stablecoins have reached systemic scale. Understanding macro-level risks is essential for conversations with central banks, regulators, and sophisticated institutional counterparties. This section covers the advanced risk framework that goes beyond individual stablecoin risks to address system-wide implications.',
          coreQuestion: 'How do stablecoin risks extend beyond crypto into the broader financial system?',
          systemicScaleContext: {
            title: 'Stablecoins Have Reached Systemic Scale',
            marketSize: {
              current: 'Global stablecoin market estimated at USD $305 billion (IMF)',
              projected: 'Citigroup projects $1.9 trillion to $4.0 trillion by 2030',
              implication: 'At this scale, stablecoin dynamics directly affect traditional financial markets'
            },
            treasuryMarketImpact: {
              title: 'Direct Link to U.S. Treasury Markets',
              points: [
                'Tether holds ~$127 billion in U.S. Treasuries — one of the largest non-government holders of short-term U.S. debt',
                'Circle (USDC) holds 44% of reserves in T-bills',
                'According to BIS, two largest stablecoins hold 65% and 44% of total reserves respectively in T-bills',
                'A 2-standard-deviation stablecoin inflow lowers T-bill yields by 2-2.5 bps',
                'Outflows raise yields by 6-7.5 bps — asymmetric impact'
              ],
              stressScenario: 'A 10% stablecoin redemption (~$20B) could force ~$10-12B of T-bill sales, implying +20-40 bps yield shock if flows hit thin liquidity.'
            },
            keyInsight: 'Stablecoins are no longer isolated crypto instruments. They\'re now directly connected to U.S. sovereign debt markets, money market funds, and global dollar liquidity.'
          },
          threeRiskCategories: {
            title: 'Three Categories of Systemic Risk',
            subtitle: 'A framework for understanding how stablecoin risks can spread to traditional finance',
            introduction: 'The UAE Central Bank and other regulators are increasingly focused on three distinct but interconnected risk categories:',
            categories: [
              {
                category: 'Leverage Formation',
                icon: '📈',
                definition: 'On-chain systems enable repeated reuse and layering of the same assets across protocols ("infinite rehypothecation"), allowing leverage to silently accumulate outside traditional regulatory frameworks.',
                traditionalControls: [
                  'Basel III requires banks to maintain minimum 3% leverage ratio',
                  'CDO underwriting requires ~9 months of documentation and regulatory approval',
                  'Collateral reuse is tracked and limited by prime brokers',
                  'These controls prevent large leverage daisy-chains in traditional finance'
                ],
                onChainRisks: [
                  'Once issued, stablecoin can be transferred to third parties outside the regulatory perimeter of the issuer',
                  'Unregulated developers can create wrappers, vaults, or synthetic assets backed by stablecoin',
                  'This allows indirect access to stablecoin while bypassing controls applied at issuance',
                  'Credit and risk decisions occur in protocols outside issuer\'s direct control and oversight'
                ],
                keyTakeaway: 'Even within regulated systems, multiple forms of leverage can accumulate simultaneously across balance sheets, collateral reuse, and regulatory perimeters — allowing systemic risk to build beyond clear limits or visibility.'
              },
              {
                category: 'Liquidity Runs',
                icon: '🏃',
                definition: 'Interconnected and automated on-chain systems without circuit breakers can turn localized stress into system-wide liquidity events when participants synchronously exit positions.',
                traditionalControls: [
                  'Stock exchanges have circuit breakers (trading halts at 7%, 13%, 20% drops)',
                  'Money market funds have gates and redemption fees',
                  'Banks have deposit insurance and central bank liquidity facilities',
                  'These mechanisms slow down runs and prevent synchronized exits'
                ],
                onChainRisks: [
                  'DeFi protocols allow continuous borrowing and reinvesting without introduction of new capital',
                  'Basket assets can be nested as inputs into additional baskets, increasing aggregate exposure while reducing transparency',
                  'No circuit breakers exist at the protocol level',
                  'During declining confidence, simultaneous attempts to unwind create liquidity stress and price dislocations'
                ],
                keyTakeaway: 'On-chain leverage can build silently through basket assets and looping strategies. Recent stablecoin runs show synchronized exits can evaporate billions within 48-72 hours.'
              },
              {
                category: 'Enforcement Gaps',
                icon: '⚖️',
                definition: 'On-chain activity settles across jurisdictions faster than enforcement processes can act, constraining real-time visibility and effective intervention.',
                traditionalControls: [
                  'Financial enforcement operates through regulated institutions',
                  'Controls at issuance, intermediation, settlement, and custody act as circuit breakers',
                  'Jurisdictional boundaries enable monitoring, approval, and intervention',
                  'Suspicious transactions can be frozen before settlement'
                ],
                onChainRisks: [
                  'On-chain activity is borderless, operating across global network without jurisdictional boundaries',
                  'Assets can move through chains of smart contracts and conversions that reduce transparency',
                  'Blockchain analytics identify patterns but don\'t provide real-time preventative controls',
                  'Activity may only be identified after funds have exited regulated channels'
                ],
                keyTakeaway: 'On-chain transactions settle in minutes; enforcement actions take days to weeks. This creates structural limits on real-time visibility and intervention even within well-regulated frameworks.'
              }
            ]
          },
          caseStudyMakerDAO: {
            title: 'Case Study: MakerDAO — Hidden Leverage Through Rehypothecation',
            icon: '🏦',
            background: {
              what: 'MakerDAO issues the $DAI stablecoin through on-chain smart contracts that accept various forms of collateral, including regulated stablecoins like USDC.',
              scale: 'At peak, USDC accounted for approximately 50% of DAI\'s direct collateral and an estimated 65% of total exposure (Galaxy Research).'
            },
            howItWorks: {
              title: 'The Rehypothecation Chain',
              steps: [
                { step: 1, action: 'User deposits USDC (regulated stablecoin) into MakerDAO vault' },
                { step: 2, action: 'MakerDAO mints DAI against the USDC collateral' },
                { step: 3, action: 'User takes DAI and deposits it into another DeFi protocol' },
                { step: 4, action: 'That protocol issues its own token against the DAI' },
                { step: 5, action: 'Process can repeat indefinitely — no hard limits' }
              ]
            },
            whyThisMatters: {
              title: 'Why This Matters for Systemic Risk',
              points: [
                'Creates new monetary layer on top of USDC where credit creation, leverage, and risk management are determined by decentralized protocol rules — not the original issuer\'s regulatory framework',
                'USDC can be reused to generate additional money-like claims without equivalent regulatory oversight',
                'Even well-regulated underlying assets (USDC) can become foundation for unregulated leverage',
                'Total system exposure can expand well beyond original issuance without regulator visibility'
              ]
            },
            regulatoryImplication: 'This illustrates how "infinite rehypothecation" and hidden leverage can emerge even when the underlying asset is well-regulated. The problem isn\'t USDC — it\'s what happens AFTER USDC enters the on-chain ecosystem.'
          },
          caseStudyUSDCDepeg: {
            title: 'Case Study: USDC Depeg (March 2023) — Synchronized Exits',
            icon: '📉',
            background: {
              event: 'USDC temporarily traded below $1 peg (to ~$0.87) following uncertainty around access to reserves held at Silicon Valley Bank after it entered receivership.',
              exposure: 'Circle held $3.3 billion at SVB — approximately 8% of USDC reserves at the time.',
              timeline: 'Depeg occurred within HOURS of SVB news breaking.'
            },
            whatHappened: {
              title: 'The Mechanics of a Synchronized Exit',
              sequence: [
                { time: 'Hour 0', event: 'SVB receivership announced. Market uncertain about Circle\'s reserve accessibility.' },
                { time: 'Hour 1-2', event: 'Rational market participants prioritize liquidity certainty. Begin selling USDC for other stablecoins or fiat.' },
                { time: 'Hour 3-6', event: 'Accelerated redemptions and secondary-market selling. USDC drops to $0.87.' },
                { time: 'Hour 6-48', event: 'No circuit breakers activate. Selling continues until weekend pause and government intervention announcement.' },
                { time: 'Post-Weekend', event: 'Federal Reserve announces depositor protection. USDC recovers to $1.' }
              ]
            },
            criticalInsight: {
              title: 'Critical Insight: The Depeg Was NOT Due to Insolvency',
              points: [
                'USDC was NOT undercollateralized in aggregate — Circle had sufficient reserves',
                'The depeg occurred due to UNCERTAINTY about accessibility of reserves',
                'Synchronized behavior and liquidity stress caused the depeg, not actual loss',
                'Total value gap estimated at $4.5 billion (Investopedia)',
                'Absence of circuit breakers allowed the run to accelerate unchecked'
              ]
            },
            lessonForSphere: 'This case demonstrates that even fully-backed, regulated stablecoins can experience violent price dislocations when confidence shocks trigger synchronized exits. The solution isn\'t just better reserves — it\'s better system design with appropriate controls.'
          },
          caseStudyChainalysis: {
            title: 'Case Study: Chainalysis — The Limits of Analytics-Based Enforcement',
            icon: '🔍',
            background: {
              what: 'Chainalysis is the leading blockchain analytics firm, providing transaction tracing and risk identification to law enforcement, regulators, and financial institutions.',
              capability: 'Analyzes transaction flows, identifies patterns, traces funds across wallets and protocols.'
            },
            theEnforcementGap: {
              title: 'The Structural Enforcement Gap',
              scenario: {
                description: 'Typical illicit transaction flow:',
                steps: [
                  { step: 1, action: 'Illicit actor initiates large on-chain transfer using stablecoin' },
                  { step: 2, action: 'Transaction settles immediately on-chain' },
                  { step: 3, action: 'Funds routed through sequence of smart contracts, asset swaps, intermediary addresses' },
                  { step: 4, action: 'Chainalysis ingests activity and begins pattern analysis based on historical data' },
                  { step: 5, action: 'By the time transaction path is attributed and flagged as high-risk, assets have already moved beyond initial wallets' },
                  { step: 6, action: 'Enforcement action becomes dependent on downstream cooperation at regulated intermediaries' }
                ]
              }
            },
            theRevision: {
              title: 'The $22 Billion Revision',
              original: '2023 Chainalysis report claimed $24.2 billion in illicit cryptocurrency volume transacted that year',
              revised: 'Only 12 months later, figure was updated to $46.1 billion — nearly DOUBLE',
              implication: 'This reflects the magnitude of delayed attribution. Analytics can identify activity eventually, but not in real-time.'
            },
            keyTakeaway: 'Analytics-based enforcement improves post-event visibility but does NOT provide real-time control over on-chain activity as it occurs. Enforcement becomes predominantly REACTIVE; regulatory responses lag evolving on-chain activity.'
          },
          contagionRiskToTraditionalFinance: {
            title: 'How On-Chain Risk Spreads to Traditional Finance',
            subtitle: 'Four transmission channels for contagion',
            channels: [
              {
                channel: 'Liquidity Mismatch',
                mechanism: 'Stablecoins offer instant redemption on reserve instruments that may not be immediately liquid.',
                risk: 'Mass redemptions may trigger fire-sales and bank runs without typical circuit breakers or liquidity backstops.',
                impact: 'Amplifies treasury market volatility.'
              },
              {
                channel: 'Issuer Concentration',
                mechanism: 'Stablecoin reserves highly concentrated among small number of issuers and custodians.',
                risk: 'Circle and Tether account for nearly 90% of market (ECB). Single-point vulnerabilities as system scales.',
                impact: 'Federal Reserve identifies trillion-dollar market cap concentration risk.'
              },
              {
                channel: 'Safe-Asset Absorption',
                mechanism: 'As issuers absorb large volumes of short-term Treasuries, global supply of "safe assets" tightens.',
                risk: 'Pushes investors toward riskier instruments.',
                impact: 'Increases leverage in shadow-banking sectors.'
              },
              {
                channel: 'Funding Market Contagion',
                mechanism: 'Large redemption events can push stress from stablecoins into core dollar funding markets.',
                risk: 'Stress spreads across borders through dollar liquidity channels.',
                impact: 'Repo market disruption, money market fund stress.'
              }
            ],
            macroConsequences: {
              title: 'Potential Macro Consequences',
              firstOrder: [
                { consequence: 'Currency Devaluation and Peg Stress', detail: 'Increased pressure on foreign exchange reserves and greater sensitivity of currency pegs to external capital flows' },
                { consequence: 'Wide-Spread Capital Flight', detail: 'Capital scaling beyond supervisory capacity of domestic institutions as on-chain channels bypass intermediaries' },
                { consequence: 'Sovereign Debt and Financial System Stress', detail: 'Deposit outflows from domestic banks into stablecoins' },
                { consequence: 'Loss of Monetary Policy Efficacy', detail: 'Central bank tools become less effective when citizens transact in external stablecoins' },
                { consequence: 'Banking System Disintermediation', detail: 'Traditional banks lose deposits and transaction visibility' }
              ],
              secondOrder: [
                'Erosion of confidence in exchange rate regime and reduced macroeconomic policy flexibility',
                'Weakening of monetary transmission and long-term policy credibility',
                'Persistent capital misallocation and heightened stress when inflows reverse',
                'Structural weakening of financial system as risk migrates outside regulatory perimeter'
              ]
            },
            keyInsight: 'When capital can exit digitally in hours but liquidity, supervision, and policy tools respond on multi-day timelines, even small shocks can escalate into systemic events.'
          },
          whyExistingBlockchainsFail: {
            title: 'Why Existing Blockchains Cannot Support Preventative Compliance',
            subtitle: 'The fundamental architecture problem',
            traditionalBlockchains: {
              title: 'Traditional Blockchain Architecture',
              characteristics: [
                { attribute: 'Controls', value: 'Reactive — compliance applied retroactively at application layer, after settlement' },
                { attribute: 'Jurisdiction Awareness', value: 'None — validators cannot natively enforce jurisdictional rules' },
                { attribute: 'Privacy vs Auditability', value: 'Tradeoff — full transparency required for validation clashes with institutional privacy' },
                { attribute: 'Compliance Systems', value: 'External — separate from transaction ordering and settlement' }
              ]
            },
            regulatedFinanceRequirements: {
              title: 'What Regulated Finance Actually Requires',
              characteristics: [
                { attribute: 'Controls', value: 'Preventative — policy rules enforced BEFORE settlement, at protocol level' },
                { attribute: 'Jurisdiction Awareness', value: 'Native — compliance tailored to specific regulatory regimes and participant types' },
                { attribute: 'Privacy vs Auditability', value: 'Both — compliance and auditability WITHOUT exposing sensitive transaction data' },
                { attribute: 'Compliance Systems', value: 'Embedded — protocol-level enforcement prior to transaction execution' }
              ]
            },
            fundamentalGap: 'Today\'s blockchain architectures optimize for openness and composability rather than regulatory enforceability. This is why regulators remain skeptical of public blockchain infrastructure for institutional finance.'
          },
          sphereNetSolution: {
            title: 'SphereNet: Compliance-Native Infrastructure',
            subtitle: 'How Sphere addresses systemic risk at the protocol level',
            introduction: 'SphereNet is Sphere\'s purpose-built blockchain for regulated finance. Unlike traditional blockchains that bolt compliance on after the fact, SphereNet embeds compliance directly into the transaction lifecycle.',
            architectureShift: {
              title: 'The Architecture Shift: Reactive → Preventative',
              traditional: {
                label: 'Traditional Blockchains (After-the-Fact)',
                flow: ['Initiation', 'Execution', 'Settlement', 'Reporting', 'Review/Enforcement'],
                riskPoint: 'Risk discovered AFTER settlement'
              },
              sphereNet: {
                label: 'SphereNet (Preventative, Embedded)',
                flow: ['Initiation', 'Policy Check', 'Privacy Proof', 'Jurisdiction Gate', 'Execution', 'Settlement'],
                riskPoint: 'Controls applied BEFORE execution'
              },
              keyDifference: 'By embedding compliance checks directly into transaction lifecycle, risk is prevented before settlement rather than addressed after it materializes.'
            },
            threeCorePrinciples: {
              title: 'Three Core Principles of SphereNet',
              principles: [
                {
                  principle: 'Compliance-Native',
                  icon: '✅',
                  description: 'Compliance controls enforced directly at network level. Shifts oversight from reactive review to real-time preventative enforcement.',
                  howItWorks: [
                    'Policy engine integrated into network runtime',
                    'Rules-based enforcement across issuance, transfer, settlement, custody, redemption',
                    'Regulatory constraints encoded as deterministic execution rules',
                    'Transaction validity depends on satisfying policies at execution time',
                    'Non-compliant flows prevented BEFORE settlement'
                  ],
                  alignment: 'Maintains alignment with FATF, UN Security Council sanctions, OFAC, European CIS frameworks, and jurisdiction-specific requirements.'
                },
                {
                  principle: 'Privacy-Preserving',
                  icon: '🔒',
                  description: 'Regulators gain verifiable assurance while institutions retain control over sensitive information.',
                  howItWorks: [
                    'Zero-knowledge proofs for compliance verification',
                    'Full and partial homomorphic encryption',
                    'Secure multi-party computation',
                    'Extractable proofs allow regulators to verify specific attributes on demand',
                    'Data remains encrypted during processing and validation'
                  ],
                  keyBenefit: 'Separates auditability from data exposure — enabling compliance without compromising privacy or commercial confidentiality.'
                },
                {
                  principle: 'Verified Ecosystem',
                  icon: '🛡️',
                  description: 'Risk is contained within verified network perimeter, limiting exposure to unknown or unregulated actors.',
                  howItWorks: [
                    'Permissioned environment with all participants verified against jurisdictional, regulatory, and risk criteria',
                    'Classification and segmentation framework assigns participants to regulatory domains, risk tiers, permissible activity sets',
                    'Identity, licensing status, and regulatory standing validated at onboarding and continuously attested',
                    'Transactions only permitted between counterparties with compatible regulatory profiles',
                    'Network-level enforcement prevents unauthorized exposure by design'
                  ],
                  keyBenefit: 'Reduces need for repeated bilateral due diligence and constrains risk propagation within controlled ecosystem.'
                }
              ]
            },
            protocolLevelEnforcement: {
              title: 'Protocol-Level Policy Enforcement',
              preExecutionChecks: [
                { check: 'Jurisdiction', description: 'Is this transaction permitted in both originating and destination jurisdictions?' },
                { check: 'Asset Eligibility', description: 'Is this stablecoin/token approved for this corridor and use case?' },
                { check: 'Counterparty Permissions', description: 'Are both parties verified and authorized to transact?' },
                { check: 'Exposure Limits', description: 'Does this transaction exceed any concentration or volume limits?' }
              ],
              outcomes: [
                { status: 'OK', result: 'Transaction proceeds to execution' },
                { status: 'Warning', result: 'Transaction flagged for enhanced review' },
                { status: 'Rejected', result: 'Transaction does not propagate, settle, or appear on-chain' }
              ],
              keyPoint: 'Rejected transactions never settle. Compliance is enforced as a CONDITION of execution, not a RESPONSE to settlement.'
            }
          },
          regulatorPerspective: {
            title: 'What Regulators Want to Hear',
            subtitle: 'Framing systemic risk for central bank and regulator conversations',
            doSay: [
              '"We understand stablecoins have reached systemic scale and present novel risks to financial stability."',
              '"Traditional blockchains cannot support preventative compliance — that\'s why we built SphereNet."',
              '"Our architecture enforces policy BEFORE settlement, not after."',
              '"We work WITH regulators to provide real-time visibility without compromising institutional privacy."',
              '"We\'re positioned to support Digital Dirham and other CBDCs alongside private stablecoins."'
            ],
            doNotSay: [
              '"Stablecoins are just like digital dollars — no additional risk."',
              '"Regulators don\'t understand crypto."',
              '"Decentralization means no one is responsible."',
              '"On-chain is inherently more transparent so there\'s no enforcement problem."'
            ],
            sampleResponse: {
              question: 'A central banker asks: "How do stablecoins affect financial stability?"',
              answer: 'Stablecoins have reached systemic scale — over $300 billion globally, projected to reach $2-4 trillion by 2030. At this scale, they directly affect Treasury markets, dollar liquidity, and monetary policy transmission. We see three main risk categories: leverage formation through rehypothecation, liquidity runs without circuit breakers, and enforcement gaps due to settlement speed. Traditional blockchains can\'t address these — they\'re designed for openness, not regulatory enforceability. That\'s why we built SphereNet with compliance embedded at the protocol level. We enforce policy BEFORE settlement, not after. We\'re also positioned to integrate Digital Dirham when it launches, giving UAE a compliant bridge between private stablecoins and sovereign digital currency.'
            }
          },
          keyTakeaway: 'Stablecoins have reached systemic scale with direct links to Treasury markets and global dollar liquidity. Three risk categories — leverage formation, liquidity runs, and enforcement gaps — require protocol-level solutions, not just better analytics. SphereNet addresses this with compliance-native, privacy-preserving, verified ecosystem architecture.'
        },
        exercise: {
          title: 'Exercise 2.6 — Systemic Risk Briefing',
          prompt: 'You are briefing a UAE Central Bank official on stablecoin systemic risks. Prepare a 5-minute explanation covering:\n\n1) Why stablecoins are now systemically important (scale, Treasury market links)\n2) The three risk categories (leverage formation, liquidity runs, enforcement gaps)\n3) One case study illustrating each risk\n4) Why traditional blockchains can\'t solve this\n5) How SphereNet\'s architecture addresses these risks\n\nWrite your briefing notes.',
          criteria: ['Systemic scale context', 'All three risk categories', 'Relevant case studies', 'Traditional blockchain limitations', 'SphereNet solution', 'Appropriate for central bank audience']
        },
        quiz: [
          { q: 'Current global stablecoin market size?', options: ['$30 billion', '$305 billion', '$3 trillion', '$30 trillion'], correct: 1 },
          { q: 'What percentage of DAI collateral was USDC at peak?', options: ['5%', '25%', '50%', '90%'], correct: 2 },
          { q: 'USDC traded at what price during the March 2023 depeg?', options: ['$0.97', '$0.87', '$0.50', '$0.10'], correct: 1 },
          { q: 'Chainalysis 2023 illicit volume was revised from $24.2B to:', options: ['$26.1B', '$36.1B', '$46.1B', '$56.1B'], correct: 2 },
          { q: 'SphereNet enforces compliance:', options: ['After settlement', 'Before settlement', 'Weekly', 'Never'], correct: 1 },
          { q: 'Which is NOT a SphereNet core principle?', options: ['Compliance-native', 'Privacy-preserving', 'Fully decentralized', 'Verified ecosystem'], correct: 2 }
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
        { type: 'multiple_choice', question: 'Which is NOT a systemic risk category?', options: ['Leverage formation', 'Liquidity runs', 'Smart contract bugs', 'Enforcement gaps'], correct: 2 },
        { type: 'multiple_choice', question: 'SphereNet enforces compliance:', options: ['After settlement', 'Before settlement', 'Weekly batch', 'Not at all'], correct: 1 },
        { type: 'analysis', question: 'Explain "stablecoin sandwich" to a traditional banker with no crypto knowledge.', rubric: ['No jargon', 'Clear flow', 'Business benefit', 'Risk acknowledgment'] },
        { type: 'analysis', question: 'A central banker asks about stablecoin systemic risks. Explain the three risk categories with one case study each.', rubric: ['Leverage formation + MakerDAO', 'Liquidity runs + USDC depeg', 'Enforcement gaps + Chainalysis', 'Protocol-level solution'] },
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
            'Classify Sphere correctly under US, international, and industry frameworks',
            'Explain in depth what Sphere is NOT and why each distinction matters',
            'Articulate the "compliance-native" positioning with concrete examples',
            'Understand the legal and business implications of misclassification'
          ],
          keyConcepts: [
            'Sphere IS: MSB, Money Transmitter, VASP, PSP, B2B settlement infrastructure',
            'Sphere is NOT: Exchange, custodian, issuer, bank, wallet, broker-dealer, DeFi',
            'Compliance-native = designed for regulation from architecture level',
            'Classification determines: regulators, capital requirements, permitted activities'
          ]
        },
        learn: {
          introduction: 'Regulatory classification determines which laws apply, which regulators supervise you, what activities you can perform, and ultimately whether your business can operate. Getting classification right is existential.',
          coreQuestion: 'How should Sphere be classified, and why does classification matter?',
          whatSphereIs: {
            title: 'What Sphere IS — Detailed Classifications',
            subtitle: 'Understanding each classification and its regulatory implications',
            categories: [
              {
                classification: 'Money Services Business (MSB)',
                jurisdiction: 'United States (Federal)',
                regulator: 'FinCEN',
                icon: '🇺🇸',
                whatItMeans: 'Federal classification under BSA for money transmission, currency exchange, check cashing.',
                sphereStatus: 'Registered with FinCEN as MSB',
                keyObligations: ['BSA/AML compliance program', 'Designated Compliance Officer', 'Independent testing', 'SAR/CTR filing', '5-year recordkeeping', 'Registration renewal every 2 years'],
                whyItMatters: 'MSB registration is federal baseline for operating as money transmitter in US.',
                penalties: 'Unregistered MSB: Up to 5 years imprisonment, $250,000 fine per violation'
              },
              {
                classification: 'Money Transmitter',
                jurisdiction: 'United States (State-level)',
                regulator: 'State banking regulators (NYDFS, CA DFPI, etc.)',
                icon: '🏛️',
                whatItMeans: 'State-level license for money transmission within/from that state.',
                sphereStatus: 'Licensed in multiple states',
                keyObligations: ['Surety bonds ($25K-$2M+)', 'Net worth requirements', 'Annual audited financials', 'State examinations'],
                stateVariations: [
                  { state: 'New York', requirement: 'BitLicense OR MTL', note: 'Most stringent' },
                  { state: 'California', requirement: 'MTL', note: 'Crypto-specific provisions' },
                  { state: 'Montana', requirement: 'None required', note: 'One of few without MTL' }
                ],
                whyItMatters: 'State MTLs required to legally serve customers in each state.',
                penalties: 'Unlicensed transmission: Fines up to $10,000/day, criminal charges possible'
              },
              {
                classification: 'Virtual Asset Service Provider (VASP)',
                jurisdiction: 'International (FATF)',
                regulator: 'Varies by country',
                icon: '🌐',
                whatItMeans: 'FATF classification for virtual asset services: exchange, transfer, safekeeping.',
                sphereStatus: 'VASP in jurisdictions adopting FATF guidance',
                keyObligations: ['Travel Rule compliance', 'CDD requirements', 'Suspicious transaction reporting', '5-year recordkeeping'],
                whyItMatters: 'VASP classification determines international regulatory treatment.',
                penalties: 'Varies by jurisdiction — EU MiCA violations up to €5M or 3% of turnover'
              },
              {
                classification: 'B2B Payment Infrastructure',
                jurisdiction: 'Industry Classification',
                regulator: 'N/A — business model',
                icon: '🏗️',
                whatItMeans: 'APIs and infrastructure for businesses — not consumer-facing.',
                sphereStatus: 'Core business model',
                keyObligations: ['Enterprise security (SOC 2)', 'API reliability', 'Business KYC/KYB'],
                whyItMatters: 'B2B focus affects risk profile, sales cycles, regulatory treatment.',
                businessImplications: ['Higher transaction values, lower volume', 'Longer onboarding', 'Enterprise sales motion']
              },
              {
                classification: 'SOC 2 Type II Certified',
                jurisdiction: 'Industry Standard',
                regulator: 'AICPA / Independent CPAs',
                icon: '🔒',
                whatItMeans: 'Third-party audit of security controls over extended period.',
                sphereStatus: 'SOC 2 Type II certified',
                keyAreas: ['Security', 'Availability', 'Processing Integrity', 'Confidentiality'],
                whyItMatters: 'Gold standard for enterprise security. Often prerequisite for enterprise customers and banks.',
                competitiveAdvantage: 'Many crypto/fintech lack SOC 2. Sphere\'s certification removes security concerns.'
              }
            ],
            currentStats: {
              title: 'Sphere by the Numbers',
              stats: [
                { metric: 'Regulatory Entities', value: '27+', context: 'Licensed entities across jurisdictions' },
                { metric: 'Annualized Volume', value: '$2.5B+', context: 'Transaction volume processed' },
                { metric: 'B2B Customers', value: '150+', context: 'Business customers onboarded' }
              ]
            }
          },
          whatSphereIsNot: {
            title: 'What Sphere is NOT — Critical Distinctions',
            subtitle: 'Understanding what Sphere is NOT is as important as what it IS.',
            categories: [
              {
                notThis: 'Cryptocurrency Exchange',
                icon: '❌',
                whatThatIs: 'Platforms for buying, selling, trading crypto. Examples: Coinbase, Binance.',
                howSphereDiffers: ['No order book', 'No speculative trading', 'No token listings', 'Stablecoins as RAILS, not tradeable assets'],
                whyDistinctionMatters: 'Exchanges face securities scrutiny (SEC), market manipulation rules.',
                wrongFraming: '"Sphere is like Coinbase for businesses"',
                rightFraming: '"Sphere is payment infrastructure using stablecoins as settlement rails"'
              },
              {
                notThis: 'Stablecoin Issuer',
                icon: '❌',
                whatThatIs: 'Companies that create/redeem stablecoins with reserves. Examples: Circle (USDC), Tether.',
                howSphereDiffers: ['Does NOT issue/mint stablecoins', 'Does NOT maintain reserves', 'USES third-party stablecoins', 'CONSUMER of stablecoin infrastructure'],
                whyDistinctionMatters: 'Issuers face reserve requirements, redemption obligations.',
                wrongFraming: '"Sphere has its own stablecoin"',
                rightFraming: '"Sphere uses USDC and other regulated stablecoins from Circle"'
              },
              {
                notThis: 'Custodian',
                icon: '❌',
                whatThatIs: 'Entities holding assets long-term for customers. Examples: Anchorage, BitGo.',
                howSphereDiffers: ['Does NOT hold long-term', 'PASS-THROUGH model', 'Same-day/next-day settlement', 'No custody fees'],
                whyDistinctionMatters: 'Custodians face fiduciary duties, trust charter requirements.',
                wrongFraming: '"Sphere holds your crypto"',
                rightFraming: '"Sphere facilitates payments. Funds flow through for settlement within hours."'
              },
              {
                notThis: 'Bank',
                icon: '❌',
                whatThatIs: 'Depository institutions with deposits, loans, central bank access. Examples: JPMorgan.',
                howSphereDiffers: ['Does NOT accept deposits', 'Does NOT make loans', 'No bank charter', 'No Fed access', 'PARTNERS with banks'],
                whyDistinctionMatters: 'Banks are most heavily regulated with massive capital requirements.',
                wrongFraming: '"Sphere is a crypto bank"',
                rightFraming: '"Sphere is licensed payment infrastructure that partners with regulated banks."'
              },
              {
                notThis: 'Wallet Provider',
                icon: '❌',
                whatThatIs: 'Software/hardware for storing, sending crypto. Examples: MetaMask, Ledger.',
                howSphereDiffers: ['No consumer wallet apps', 'Not retail/individual users', 'INFRASTRUCTURE and APIs for businesses'],
                whyDistinctionMatters: 'Consumer wallets face consumer protection regulations.',
                wrongFraming: '"Sphere is a wallet for businesses"',
                rightFraming: '"Sphere provides payment APIs that businesses integrate."'
              },
              {
                notThis: 'Broker-Dealer',
                icon: '❌',
                whatThatIs: 'Firms buying/selling securities. SEC/FINRA regulated. Examples: Robinhood.',
                howSphereDiffers: ['Does NOT deal in securities', 'No investment advice', 'Not SEC/FINRA registered', 'Stablecoins generally NOT securities'],
                whyDistinctionMatters: 'Broker-dealers face SEC regulation, suitability duties.',
                wrongFraming: '"Sphere helps you invest in crypto"',
                rightFraming: '"Sphere facilitates B2B payments using stablecoins."'
              },
              {
                notThis: 'DeFi Protocol',
                icon: '❌',
                whatThatIs: 'Decentralized applications without centralized control. Examples: Uniswap, Aave.',
                howSphereDiffers: ['IS centralized, regulated company', 'Has identified management', 'Can be regulated, examined', 'Policies, procedures, human oversight'],
                whyDistinctionMatters: 'DeFi faces existential regulatory uncertainty.',
                wrongFraming: '"Sphere is decentralized"',
                rightFraming: '"Sphere is regulated, centralized payment infrastructure with full accountability."'
              }
            ],
            summaryTable: {
              title: 'Classification Comparison',
              headers: ['Entity Type', 'Primary Regulator', 'Burden Sphere Avoids', 'Sphere Status'],
              rows: [
                ['Exchange', 'SEC/CFTC/State', 'Securities laws', 'NOT an exchange'],
                ['Issuer', 'State/OCC', 'Reserve requirements', 'NOT an issuer'],
                ['Custodian', 'State trust', 'Fiduciary duty', 'NOT a custodian'],
                ['Bank', 'OCC/Fed/FDIC', 'Charter, deposits', 'NOT a bank'],
                ['Wallet', 'State MTL', 'Consumer apps', 'NOT a wallet'],
                ['Broker-Dealer', 'SEC/FINRA', 'Securities registration', 'NOT a BD'],
                ['DeFi', 'Uncertain', 'Regulatory uncertainty', 'NOT DeFi']
              ]
            }
          },
          classificationMattersLegally: {
            title: 'Why Classification Matters Legally',
            consequences: [
              { determination: 'Which Regulators Supervise You', detail: 'MSB = FinCEN + state. Exchange = SEC/CFTC. Bank = OCC/Fed/FDIC.', sphereImplication: 'Sphere supervised by FinCEN and state regulators — focused on AML/BSA.' },
              { determination: 'Capital Requirements', detail: 'Banks need billions. Money transmitters need bonds.', sphereImplication: 'Money transmitter requirements significant but manageable.' },
              { determination: 'Permitted Activities', detail: 'Classification defines what you can do.', sphereImplication: 'Licensed for transmission. Cannot take deposits or sell securities.' },
              { determination: 'Examination Frequency', detail: 'Banks: annual+. Money transmitters: 1-3 years.', sphereImplication: 'Periodic state exams focused on AML, customer funds, compliance.' }
            ],
            caseStudies: {
              title: 'Companies That Got Classification Wrong',
              cases: [
                { company: 'Ripple Labs', issue: 'SEC alleges XRP is unregistered security', consequence: '$125M+ settlement, multi-year litigation', lesson: 'Token classification has massive implications.', sphereRelevance: 'Sphere uses established payment stablecoins with clearer status.' },
                { company: 'BitMEX', issue: 'Unregistered futures exchange, inadequate AML', consequence: '$100M penalty, criminal charges for founders', lesson: 'Operating without registration has severe consequences.', sphereRelevance: 'Sphere is registered, licensed, maintains robust AML.' },
                { company: 'Celsius', issue: 'Took deposits, operated like bank without charter', consequence: 'Bankruptcy, frozen funds, executive charges', lesson: 'If you take deposits and lend, you\'re acting like a bank.', sphereRelevance: 'Sphere does NOT take deposits or lend. Pass-through model.' }
              ]
            }
          },
          complianceNative: {
            title: '"Compliance-Native" Explained',
            approaches: [
              { approach: 'Compliance as Afterthought', icon: '❌', description: 'Build product first, worry later', result: 'Enforcement, shutdowns, loss of banking', problems: ['Technical debt', 'Wrong expectations', 'Bad actor view'] },
              { approach: 'Compliance as Bolt-On', icon: '⚠️', description: 'Build product, add compliance layer', result: 'Gaps, workarounds, tension', problems: ['Can be bypassed', 'Conflicts', 'Exam findings'] },
              { approach: 'Compliance-Native (Sphere)', icon: '✅', description: 'Design for compliance from architecture', result: 'Embedded, no gaps, clean audits', advantages: ['Cannot bypass', 'Aligned', 'Bank confidence'] }
            ],
            whatItMeans: [
              { principle: 'Policy Enforcement BEFORE Settlement', explanation: 'Every transaction screened before settlement.', implementation: 'Real-time screening, jurisdiction checks — before funds move.' },
              { principle: 'Compliance Embedded in Protocol', explanation: 'In core flow, not separate system.', implementation: 'Can\'t process without compliance passing. No override.' },
              { principle: 'Immutable Audit Trail', explanation: 'Every decision logged, cannot be altered.', implementation: 'Blockchain-based logs, tamper-evident, exam-ready.' },
              { principle: 'Work WITH Regulators', explanation: 'Proactive engagement, not adversarial.', implementation: 'Regular communication, SAR filing when appropriate.' }
            ],
            arnoldQuote: { quote: 'Compliance isn\'t a cost center — it\'s our moat. Anyone can build rails. Building rails banks trust requires compliance baked in from day one.', context: 'Compliance-native is competitive advantage.' }
          },
          sampleResponses: {
            title: 'How to Explain Classification',
            scenarios: [
              { scenario: 'Regulator asks: "What kind of company?"', response: 'Sphere is a licensed MSB and Money Transmitter. FinCEN registered, state MTLs. B2B payment infrastructure using stablecoin settlement. NOT exchange, NOT custodian, NOT issuer, NOT bank.', keyPoints: ['Lead with licenses', 'State what you ARE', 'State what you\'re NOT'] },
              { scenario: 'Bank asks: "Are you a crypto company?"', response: 'We\'re licensed payment infrastructure using stablecoins as settlement technology. Like asking if a bank using fiber optic is a telecom company. SOC 2 certified, licensed in multiple states.', keyPoints: ['Reframe', 'Emphasize regulation', 'Certifications'] },
              { scenario: 'Customer asks: "Can you hold funds long-term?"', response: 'Sphere is payment infrastructure, not custodian. Same-day/next-day settlement. For long-term, you\'d want a licensed custodian. Pass-through model keeps funds moving.', keyPoints: ['Decline inappropriate', 'Explain why', 'Redirect'] }
            ]
          },
          keyTakeaway: 'Sphere is licensed MSB and Money Transmitter — not exchange, custodian, issuer, or bank. Classification is intentional and enables B2B payments focus with appropriate regulatory relationships.'
        },
        exercise: {
          title: 'Exercise 3.1 — Classification Defense',
          prompt: 'A state banking regulator asks: "Help me understand what Sphere does and how it should be classified. What makes you different from other crypto companies?"\n\nWrite response covering:\n1) What Sphere IS (specific classifications)\n2) What Sphere is NOT and why each matters\n3) Licenses held and significance\n4) Why classification is appropriate for business model',
          criteria: ['Accurate classification', 'Clear NOT distinctions', 'Licenses with context', 'Business model explained', 'Professional tone']
        },
        quiz: [
          { q: 'Sphere\'s primary US federal classification:', options: ['Bank', 'Broker-Dealer', 'Money Services Business (MSB)', 'Investment Adviser'], correct: 2 },
          { q: 'Which is Sphere NOT?', options: ['Licensed Money Transmitter', 'B2B Infrastructure', 'Stablecoin Issuer', 'FinCEN Registered MSB'], correct: 2 },
          { q: '"Compliance-native" means:', options: ['Added after', 'Third party handles', 'Designed into architecture from day one', 'Only when required'], correct: 2 },
          { q: 'Why is Sphere NOT a custodian?', options: ['Not enough capital', 'Pass-through model with same-day settlement', 'Too expensive', 'Only businesses'], correct: 1 },
          { q: 'State MTLs enable Sphere to:', options: ['Take deposits', 'Legally transmit money in those states', 'Issue stablecoins', 'Operate as bank'], correct: 1 }
        ]
      },
      {
        id: 'aml-kyc-fundamentals',
        title: '3.2 AML/KYC Fundamentals',
        curriculum: {
          objectives: [
            'Understand complete AML/KYC regulatory framework',
            'Master requirements for KYC, AML, CDD, EDD, SAR',
            'Apply comprehensive risk assessment frameworks',
            'Explain why compliance enables growth',
            'Articulate Sphere\'s compliance approach',
            'Identify red flags across categories'
          ],
          keyConcepts: [
            'KYC = Know Your Customer — identity verification',
            'AML = Anti-Money Laundering — detection and prevention',
            'CDD = Customer Due Diligence — risk-based assessment',
            'EDD = Enhanced Due Diligence — deeper review for high-risk',
            'SAR = Suspicious Activity Report — regulatory reporting',
            'Risk-Based Approach = intensity matches risk level'
          ]
        },
        learn: {
          introduction: 'Compliance is not a burden — it\'s the foundation enabling institutional adoption, banking partnerships, and sustainable growth. Without robust KYC/AML programs, banks won\'t work with you, enterprises won\'t trust you, regulators will shut you down.',
          coreQuestion: 'Why is compliance an enabler rather than a barrier?',
          coreDefinitions: {
            title: 'Core Compliance Definitions',
            definitions: [
              { term: 'KYC', fullName: 'Know Your Customer', definition: 'Process of identifying and verifying customer identity.', sphereContext: 'Every Sphere customer goes through KYC before onboarding.' },
              { term: 'AML', fullName: 'Anti-Money Laundering', definition: 'Laws, regulations, procedures to prevent disguising illegal funds.', sphereContext: 'Sphere maintains comprehensive AML program.' },
              { term: 'CDD', fullName: 'Customer Due Diligence', definition: 'Evaluating customer information to assess risk.', sphereContext: 'Risk level determines monitoring intensity.' },
              { term: 'EDD', fullName: 'Enhanced Due Diligence', definition: 'Additional rigorous diligence for high-risk customers.', sphereContext: 'High-risk customers undergo EDD with senior approval.' },
              { term: 'SAR', fullName: 'Suspicious Activity Report', definition: 'Report filed with FinCEN when suspicious activity detected.', sphereContext: 'Sphere files SARs when required. Filing is confidential.' },
              { term: 'BSA', fullName: 'Bank Secrecy Act', definition: 'Primary US AML law requiring programs and reports.', sphereContext: 'Sphere is subject to BSA as registered MSB.' },
              { term: 'PEP', fullName: 'Politically Exposed Person', definition: 'Senior government officials, family, close associates.', sphereContext: 'PEP status triggers EDD.' }
            ]
          },
          complianceEnablesGrowth: {
            title: 'Why Compliance Enables Growth',
            overview: 'Compliance enables business with partners, customers, and institutions that matter.',
            comparisonTable: {
              headers: ['Without Robust Compliance', 'With Robust Compliance'],
              rows: [
                ['Banks refuse partnership', 'Banking relationships possible'],
                ['Limited to retail/unbanked', 'Enterprise and institutional access'],
                ['Constant regulatory uncertainty', 'Clear regulatory standing'],
                ['Reputational risk', 'Trust and credibility signal'],
                ['Can\'t serve regulated customers', 'Regulated customers welcome you']
              ]
            },
            specificExamples: [
              { example: 'Banking Partner Onboarding', story: 'Banks conduct extensive due diligence. Sphere\'s SOC 2, AML program, licensing enabled relationships impossible without them.', outcome: 'Multiple banking relationships', lesson: 'Banks want compliance matching their standards.' },
              { example: 'Enterprise Customer Win', story: 'Fortune 500 required SOC 2, compliance docs, licensing. Companies without were eliminated.', outcome: 'Enterprise onboarded', lesson: 'Compliance docs are table stakes.' },
              { example: 'Regulatory Examination', story: 'State examiners conducted exam. Sphere\'s compliance-native approach meant all docs ready.', outcome: 'Clean exam, no material findings', lesson: 'Readiness is ongoing, not a scramble.' }
            ],
            bankingPartnerRequirements: [
              { requirement: 'BSA/AML Program', detail: 'Written policies, BSA officer, testing, training' },
              { requirement: 'SOC 2 Type II', detail: 'Security controls audit' },
              { requirement: 'Licensing', detail: 'State MTLs, FinCEN registration' },
              { requirement: 'Financial Statements', detail: 'Audited financials' },
              { requirement: 'Insurance', detail: 'Cyber, E&O, crime insurance' }
            ]
          },
          kycRequirements: {
            title: 'KYC Requirements',
            individualVerification: {
              title: 'Individual Verification (Beneficial Owners)',
              requirements: [
                { category: 'Government ID', required: 'Yes — all 25%+ owners', acceptable: ['Passport', 'Driver\'s License', 'National ID'], notes: 'Current, legible' },
                { category: 'Proof of Address', required: 'Yes — all 25%+ owners', acceptable: ['Utility bill (90 days)', 'Bank statement', 'Government letter'], notes: 'PO Boxes need extra verification' },
                { category: 'Tax ID', required: 'Yes — SSN for US, Foreign TIN for non-US', notes: 'Tax reporting and verification' },
                { category: 'Date of Birth', required: 'Yes — all owners', notes: 'Match ID, age 18+' }
              ]
            },
            businessVerification: {
              title: 'Business Verification (KYB)',
              requirements: [
                { category: 'Business Registration', required: 'Yes', acceptable: ['Articles of Incorporation', 'Certificate of Formation'], notes: 'Current, good standing' },
                { category: 'EIN', required: 'Yes — US entities', acceptable: ['IRS confirmation', 'Form SS-4'], notes: 'Non-US provide equivalent' },
                { category: 'Beneficial Ownership', required: 'Yes', detail: 'All 25%+ owners and control persons', notes: 'FinCEN CDD Rule' },
                { category: 'Good Standing', required: 'Yes', notes: 'From state of incorporation' }
              ]
            }
          },
          amlProgram: {
            title: 'AML Program — Five Pillars',
            pillars: [
              { pillar: '1. Written Policies', requirement: 'Documented BSA/AML policies', includes: ['Customer ID procedures', 'Monitoring policies', 'SAR procedures', 'Sanctions screening', 'Recordkeeping'], sphereImplementation: 'Comprehensive policies reviewed annually.' },
              { pillar: '2. BSA Officer', requirement: 'Qualified compliance officer', responsibilities: ['Oversee program', 'SAR process', 'Regulator coordination', 'Board reporting'], sphereImplementation: 'Designated officer with board reporting.' },
              { pillar: '3. Training', requirement: 'Training for all personnel', elements: ['BSA/AML overview', 'Company policies', 'Red flags', 'SAR confidentiality'], sphereImplementation: 'Annual training, tracked.' },
              { pillar: '4. Independent Testing', requirement: 'Periodic independent review', scope: ['Policy adequacy', 'Compliance', 'Monitoring effectiveness', 'SAR appropriateness'], sphereImplementation: 'External audit annually.' },
              { pillar: '5. Risk-Based CDD', requirement: 'Identify customers, understand business, assess risk', elements: ['CIP', 'Beneficial ownership', 'Understand relationship', 'Ongoing monitoring'], sphereImplementation: 'Risk ratings, monitoring matched to risk.' }
            ]
          },
          cddRequirements: {
            title: 'CDD — Four Core Requirements',
            requirements: [
              { requirement: '1. Customer Identification (CIP)', detail: 'Collect identifying info, verify identity', forIndividuals: ['Name', 'DOB', 'Address', 'ID number'], forEntities: ['Legal name', 'Address', 'EIN'], timing: 'Before establishing relationship' },
              { requirement: '2. Beneficial Ownership', detail: 'Identify 25%+ owners AND control persons', ownershipProng: '25%+ equity', controlProng: 'Management responsibility', timing: 'At opening, update when changes' },
              { requirement: '3. Nature and Purpose', detail: 'Understand what customer does and why they need services', toCollect: ['Business description', 'Expected transactions', 'Counterparties', 'Source of funds'], purpose: 'Baseline for monitoring' },
              { requirement: '4. Ongoing Monitoring', detail: 'Monitor for suspicious activity, keep info current', transactionMonitoring: 'Review against expected, flag anomalies', informationUpdates: 'Update when triggered' }
            ]
          },
          eddRequirements: {
            title: 'Enhanced Due Diligence (EDD)',
            triggers: [
              { trigger: 'PEPs', why: 'Corruption opportunity', eddRequired: ['Source of wealth', 'Source of funds', 'Senior approval', 'Enhanced monitoring'] },
              { trigger: 'High-Risk Jurisdictions', why: 'Elevated ML/TF risk', eddRequired: ['Purpose info', 'Source of funds', 'Senior approval', 'Enhanced monitoring'] },
              { trigger: 'Complex Ownership', why: 'Can hide true owners', eddRequired: ['Full chain documentation', 'Reason for structure', 'Verification at each layer'] },
              { trigger: 'High-Risk Business', why: 'Higher ML risk', eddRequired: ['Industry docs', 'Licensing verification', 'Enhanced monitoring'] }
            ],
            components: [
              { component: 'Enhanced ID', detail: 'Multiple sources' },
              { component: 'Source of Wealth', detail: 'How accumulated' },
              { component: 'Source of Funds', detail: 'Where funds originate' },
              { component: 'Purpose', detail: 'Why transactions' },
              { component: 'Senior Approval', detail: 'Documented approval' },
              { component: 'Enhanced Monitoring', detail: 'Lower thresholds' }
            ]
          },
          sarRequirements: {
            title: 'Suspicious Activity Reporting',
            thresholds: [
              { category: 'Known Criminal Violation', threshold: '$2,000+', detail: 'Illegal funds or evading reporting' },
              { category: 'Suspicious — Suspect Identified', threshold: '$5,000+', detail: 'Suspicious with identified subject' },
              { category: 'Suspicious — No Suspect', threshold: '$25,000+', detail: 'Suspicious, no subject identified' }
            ],
            process: [
              { step: 1, action: 'Detection', detail: 'Activity flagged' },
              { step: 2, action: 'Alert Review', detail: 'Determine if investigation warranted' },
              { step: 3, action: 'Investigation', detail: 'Gather information' },
              { step: 4, action: 'SAR Decision', detail: 'Filing threshold met?' },
              { step: 5, action: 'SAR Preparation', detail: 'Who, what, when, where, why, how' },
              { step: 6, action: 'Quality Review', detail: 'Senior review' },
              { step: 7, action: 'Filing', detail: 'FinCEN BSA E-Filing' },
              { step: 8, action: 'Recordkeeping', detail: '5 years' }
            ],
            timeline: 'File within 30 days of detection',
            confidentiality: { rules: ['No Tipping Off — federal crime', 'Limited Disclosure — FinCEN, law enforcement, regulators only', 'Safe Harbor — protection for good faith filing'] }
          },
          riskAssessmentFramework: {
            title: 'Risk Assessment Framework',
            categories: [
              { category: 'Geographic Risk', icon: '🌍', factors: [{ factor: 'Customer Location', high: 'FATF grey/black, high-corruption', medium: 'Developing', low: 'Established jurisdictions' }, { factor: 'Transaction Destinations', high: 'Sanctioned, offshore', medium: 'Emerging', low: 'Low-risk' }, { factor: 'Beneficial Owner Location', high: 'High-risk jurisdictions', medium: 'Moderate', low: 'Low-risk with verification' }] },
              { category: 'Business Risk', icon: '🏭', factors: [{ factor: 'Industry', high: 'Gambling, cannabis, crypto exchanges', medium: 'Real estate, import/export', low: 'Regulated financial services' }, { factor: 'Cash Intensity', high: 'Significant cash', medium: 'Some cash', low: 'Entirely electronic' }] },
              { category: 'Transaction Risk', icon: '💹', factors: [{ factor: 'Volume', high: 'High without justification', medium: 'Moderate consistent', low: 'Matches business' }, { factor: 'Patterns', high: 'Structuring, layering', medium: 'Some irregular with explanation', low: 'Consistent' }] },
              { category: 'Customer Profile Risk', icon: '👤', factors: [{ factor: 'PEP Status', high: 'Current senior PEP', medium: 'Former, lower-level', low: 'No connection' }, { factor: 'Ownership', high: 'Opaque, nominees', medium: 'Some complexity', low: 'Clear, simple' }] }
            ],
            riskRatings: [
              { rating: 'Low', criteria: 'No significant factors', monitoring: 'Standard', refresh: '3 years' },
              { rating: 'Medium', criteria: 'Some elevated, mitigated', monitoring: 'Lowered thresholds', refresh: '2 years' },
              { rating: 'High', criteria: 'Significant factors', monitoring: 'Intensive', refresh: 'Annually', approval: 'Senior required' },
              { rating: 'Prohibited', criteria: 'Exceeds appetite', monitoring: 'N/A', approval: 'Declined' }
            ]
          },
          sphereComplianceApproach: {
            title: 'Sphere\'s Compliance Approach',
            philosophy: [
              { principle: 'Compliance is a Feature', explanation: 'Enables enterprise adoption.', implementation: 'Highlighted in sales, docs ready.' },
              { principle: 'Pre-Transaction', explanation: 'Before settlement.', implementation: 'Real-time screening.' },
              { principle: 'Embedded', explanation: 'In architecture.', implementation: 'No override buttons.' },
              { principle: 'Risk-Based', explanation: 'Intensity matches risk.', implementation: 'Automated scoring, tiered monitoring.' }
            ],
            technologyStack: [
              { component: 'Sanctions Screening', function: 'Real-time against OFAC, UN, EU, UK' },
              { component: 'Transaction Monitoring', function: 'Automated pattern detection' },
              { component: 'Case Management', function: 'Alert investigation workflow' },
              { component: 'Risk Rating', function: 'Multi-factor scoring' },
              { component: 'Identity Verification', function: 'Document verification' },
              { component: 'Blockchain Analytics', function: 'Wallet risk scoring' }
            ],
            teamStructure: [
              { role: 'CCO', responsibility: 'Overall program, board' },
              { role: 'BSA Officer', responsibility: 'BSA, SAR, exams' },
              { role: 'Analysts', responsibility: 'Alerts, KYC/EDD, investigations' },
              { role: 'Operations', responsibility: 'Onboarding, documentation' }
            ]
          },
          redFlagsToWatch: {
            title: 'Red Flags to Watch',
            categories: [
              { category: 'Transaction Red Flags', icon: '💸', flags: [{ flag: 'Structuring', detail: 'Below thresholds', severity: 'High' }, { flag: 'Rapid Movement', detail: 'Quick with no purpose', severity: 'High' }, { flag: 'Round-Trip', detail: 'Sent and returned', severity: 'High' }, { flag: 'Layering', detail: 'Complex to obscure', severity: 'High' }] },
              { category: 'Behavior Red Flags', icon: '🚩', flags: [{ flag: 'Reluctant to Provide Info', detail: 'Refuses KYC', severity: 'High' }, { flag: 'Inconsistent Info', detail: 'Contradicts docs', severity: 'High' }, { flag: 'Unusual Questions', detail: 'About thresholds, detection', severity: 'High' }] },
              { category: 'Documentation Red Flags', icon: '📄', flags: [{ flag: 'Forged Docs', detail: 'Tampering', severity: 'High' }, { flag: 'Nominees', detail: 'Without purpose', severity: 'High' }, { flag: 'Shell Company', detail: 'No presence', severity: 'High' }] },
              { category: 'Geographic Red Flags', icon: '🌍', flags: [{ flag: 'Sanctioned Jurisdiction', detail: 'Comprehensively sanctioned', severity: 'High' }, { flag: 'FATF Grey/Black', detail: 'High-risk jurisdiction', severity: 'High' }] },
              { category: 'Crypto Red Flags', icon: '🔗', flags: [{ flag: 'Mixer Usage', detail: 'Through mixing', severity: 'High' }, { flag: 'Sanctioned Wallet', detail: 'OFAC address', severity: 'High' }, { flag: 'Darknet Exposure', detail: 'Darknet markets', severity: 'High' }] }
            ],
            responseToRedFlags: [
              { step: 'Document', detail: 'Record flag and circumstances' },
              { step: 'Investigate', detail: 'Gather information' },
              { step: 'Escalate', detail: 'To compliance team' },
              { step: 'Decide', detail: 'SAR? Continue relationship?' },
              { step: 'Act', detail: 'File SAR, enhance monitoring, or exit' }
            ]
          },
          keyTakeaway: 'Compliance enables institutional adoption, banking, and growth. Sphere\'s compliance-native approach embeds compliance as competitive advantage.'
        },
        exercise: {
          title: 'Exercise 3.2 — Compliance Scenario',
          prompt: 'New B2B customer wants to onboard:\n- Dubai trading company (DMCC)\n- Beneficial owner: UAE national (60%) + Iranian national with UAE residency (40%)\n- Expected: $2M/month to India, Pakistan, Nigeria\n- Industry: Textiles and commodities\n\nProvide:\n1) KYC documents required\n2) Risk factors\n3) Risk rating recommendation\n4) EDD elements\n5) Monitoring approach\n6) Red flags to watch\n7) Onboard decision and rationale',
          criteria: ['Complete KYC list', 'All risk factors', 'Appropriate rating', 'EDD for Iranian BO', 'Monitoring matched to risk', 'Red flags identified']
        },
        quiz: [
          { q: 'KYC stands for:', options: ['Keep Your Cash', 'Know Your Customer', 'Key Yield Calculation', 'Know Your Compliance'], correct: 1 },
          { q: 'Sphere performs compliance checks:', options: ['After settlement', 'Before settlement', 'Weekly batch', 'Only large amounts'], correct: 1 },
          { q: 'EDD is required for:', options: ['All customers', 'High-risk only', 'Low-risk only', 'None'], correct: 1 },
          { q: 'BSA/AML program has how many pillars?', options: ['3', '4', '5', '6'], correct: 2 },
          { q: 'SAR filing deadline:', options: ['7 days', '30 days', '60 days', '90 days'], correct: 1 },
          { q: 'Can you tell customer SAR was filed?', options: ['Yes', 'Only if asked', 'Never — illegal', 'After 90 days'], correct: 2 }
        ]
      },
      {
        id: 'sanctions-screening',
        title: '3.3 Sanctions & Screening',
        curriculum: {
          objectives: [
            'Understand major sanctions regimes (OFAC, UN, EU, UK)',
            'Master what gets screened and how',
            'Navigate high-risk jurisdictions',
            'Apply Sphere\'s screening process',
            'Know documentation requirements',
            'Handle flagged payments professionally'
          ],
          keyConcepts: [
            'OFAC (US), UN, EU, UK maintain sanctions lists',
            'Screening: names, addresses, wallets, jurisdictions',
            'Real-time screening before every transaction',
            'High-risk requires enhanced scrutiny, not automatic rejection',
            'Flagged payments follow structured process'
          ]
        },
        learn: {
          introduction: 'Sanctions compliance is existential — a single violation can mean millions in fines, loss of banking, criminal prosecution. Unlike other compliance, sanctions is binary: comply or face severe consequences.',
          coreQuestion: 'How does sanctions screening work, and what happens when flagged?',
          majorSanctionsRegimes: {
            title: 'Major Sanctions Regimes',
            regimes: [
              {
                regime: 'OFAC (US)',
                fullName: 'Office of Foreign Assets Control',
                agency: 'US Treasury',
                icon: '🇺🇸',
                scope: 'US persons, US-origin goods, USD transactions',
                lists: [{ list: 'SDN List', description: 'Blocked persons', count: '~12,000' }, { list: 'Sectoral Sanctions', description: 'Russian energy, financial' }, { list: 'Country Programs', description: 'Iran, NK, Syria, Cuba, Russia' }],
                keyPrinciples: ['Strict liability — no intent required', 'Secondary sanctions — affects non-US persons', 'Dollar clearing creates US nexus', '50% rule — 50%+ owned = sanctioned'],
                realWorldExamples: [{ example: 'BNP Paribas (2014)', violation: 'Sudan, Cuba, Iran through US', consequence: '$8.9 billion fine', lesson: 'Even non-US banks face massive penalties' }, { example: 'BitGo (2020)', violation: 'Sanctioned jurisdictions used services', consequence: '$98,830 settlement', lesson: 'OFAC applies to crypto' }],
                sphereImplication: 'Full OFAC exposure. Every transaction screened.'
              },
              {
                regime: 'UN Sanctions',
                fullName: 'UN Security Council Sanctions',
                agency: 'UN Security Council',
                icon: '🇺🇳',
                scope: 'All 193 member states',
                lists: [{ list: 'Consolidated List', description: 'UN sanctioned individuals/entities' }],
                keyPrinciples: ['Binding on all members', 'Focus: terrorism, WMD, human rights', 'Adopted by OFAC, EU, UK'],
                sphereImplication: 'UN sanctions incorporated into lists Sphere screens.'
              },
              {
                regime: 'EU Sanctions',
                fullName: 'EU Restrictive Measures',
                agency: 'European External Action Service',
                icon: '🇪🇺',
                scope: 'EU persons, territory, entities',
                lists: [{ list: 'EU Consolidated List', description: 'Asset freeze targets' }],
                keyPrinciples: ['Applies to EU citizens worldwide', 'Member states enforce', 'UK now separate'],
                realWorldExamples: [{ example: 'Russia Sanctions (2022+)', context: 'Most comprehensive ever', measures: 'Freezes, SWIFT disconnection' }],
                sphereImplication: 'EU sanctions apply for EU customers, EUR transactions.'
              },
              {
                regime: 'UK Sanctions',
                fullName: 'UK Financial Sanctions (OFSI)',
                agency: 'OFSI (HM Treasury)',
                icon: '🇬🇧',
                scope: 'UK persons, territory, GBP',
                lists: [{ list: 'UK Sanctions List', description: 'Asset freeze targets' }],
                keyPrinciples: ['Post-Brexit independent', 'Strict liability', 'Criminal penalties possible'],
                sphereImplication: 'UK OFSI applies for UK customers, GBP.'
              }
            ]
          },
          whatGetsScreened: {
            title: 'What Gets Screened',
            categories: [
              { category: 'Name Screening', icon: '👤', items: [{ item: 'Individual Names', detail: 'Legal name, aliases, transliterations', challenge: 'Variations, common names' }, { item: 'Entity Names', detail: 'Legal, trading, former names', challenge: 'Changes, translations' }, { item: 'Beneficial Owners', detail: 'All 25%+ owners', challenge: 'Complex ownership' }], howItWorks: 'Fuzzy matching against sanctions lists.', example: '"Mohammad Al-Rahman" checked against variations.' },
              { category: 'Address Screening', icon: '📍', items: [{ item: 'Country', detail: 'Customer, counterparty, BO country', challenge: 'Comprehensive sanctions' }, { item: 'Region', detail: 'Crimea, Donetsk', challenge: 'Region-specific' }], howItWorks: 'Parsed to identify country/region, checked.', example: 'Sevastopol, Crimea — blocked.' },
              { category: 'Wallet Screening', icon: '🔗', items: [{ item: 'Direct Sanctions', detail: 'OFAC SDN wallet addresses', challenge: 'Growing but not comprehensive' }, { item: 'Exposure Analysis', detail: 'History — sanctioned, mixers, darknet', challenge: 'Indirect exposure' }, { item: 'Risk Scoring', detail: 'Overall based on history', challenge: 'Interpretation' }], howItWorks: 'Blockchain analytics trace history, assign score.', example: '5% Tornado Cash exposure triggers review.' },
              { category: 'Transaction Purpose', icon: '📋', items: [{ item: 'Purpose Codes', detail: 'Description fields', challenge: 'Prohibited purposes' }, { item: 'Trade Descriptions', detail: 'Goods/services', challenge: 'Dual-use' }], howItWorks: 'Text analysis for prohibited items.', example: '"Oil drilling equipment" flagged for Russia sectors.' }
            ]
          },
          highRiskJurisdictions: {
            title: 'High-Risk Jurisdictions',
            jurisdictionCategories: [
              {
                category: 'Comprehensively Sanctioned (OFAC)',
                riskLevel: 'PROHIBITED',
                jurisdictions: [{ country: 'North Korea', icon: '🇰🇵', detail: 'Near-total embargo', exception: 'Humanitarian with license' }, { country: 'Iran', icon: '🇮🇷', detail: 'Comprehensive', exception: 'Very limited' }, { country: 'Syria', icon: '🇸🇾', detail: 'Comprehensive', exception: 'Humanitarian with license' }, { country: 'Cuba', icon: '🇨🇺', detail: 'Comprehensive', exception: 'Licensed travel, limited remittances' }, { country: 'Russia', icon: '🇷🇺', detail: 'Increasingly comprehensive', exception: 'Rapidly changing' }],
                spherePolicy: 'Sphere does NOT process comprehensively sanctioned countries. No exceptions without legal review.',
                customerCommunication: 'Unable to process due to US sanctions regulations.'
              },
              {
                category: 'FATF Grey List',
                riskLevel: 'HIGH RISK — EDD REQUIRED',
                jurisdictions: [{ country: 'South Africa', icon: '🇿🇦', detail: 'Grey listed 2023', status: 'Action plan' }, { country: 'Nigeria', icon: '🇳🇬', detail: 'Grey listed', status: 'Action plan' }, { country: 'Turkey', icon: '🇹🇷', detail: 'Grey listed', status: 'Action plan' }],
                spherePolicy: 'EDD required. Not automatically prohibited.',
                eddRequirements: ['Source of funds', 'Purpose', 'Senior review', 'Enhanced monitoring']
              },
              {
                category: 'High Corruption',
                riskLevel: 'ELEVATED — ENHANCED SCRUTINY',
                assessment: 'Transparency International CPI',
                spherePolicy: 'Enhanced scrutiny even if not on FATF lists.',
                eddRequirements: ['Source of wealth', 'PEP emphasis', 'Enhanced monitoring']
              }
            ],
            nuancedApproach: {
              title: 'Not All High-Risk = Prohibited',
              explanation: 'High-risk means more scrutiny, not automatic rejection.',
              tiers: [
                { tier: 'Prohibited', treatment: 'No transactions', examples: 'North Korea, Iran' },
                { tier: 'Highly Restricted', treatment: 'Only with licenses', examples: 'Cuba (licensed)' },
                { tier: 'Enhanced Scrutiny', treatment: 'Permitted with EDD', examples: 'FATF grey list' },
                { tier: 'Standard', treatment: 'Normal CDD', examples: 'Low-risk developed markets' }
              ]
            }
          },
          screeningProcessFlow: {
            title: 'Sphere\'s Screening Process',
            displayType: 'flow-diagram',
            nodes: [
              { id: 'initiation', type: 'start', label: 'Transaction Initiated', description: 'Customer initiates payment' },
              { id: 'pre-screen', type: 'process', label: 'Pre-Transaction Screening', description: 'Automated screening of all parties, jurisdictions, wallets', details: ['Sender screening', 'Recipient screening', 'BO screening', 'Jurisdiction check', 'Wallet screening', 'Purpose screening'] },
              { id: 'decision', type: 'decision', label: 'Screening Result', branches: [{ condition: 'Clear', target: 'clear-process' }, { condition: 'Potential Match', target: 'potential-match' }, { condition: 'Confirmed Hit', target: 'confirmed-hit' }] },
              { id: 'clear-process', type: 'process', label: 'Clear — Proceed', description: 'No matches. Proceed to settlement.', outcome: 'Processed normally', color: 'green' },
              { id: 'potential-match', type: 'process', label: 'Potential Match — Review', description: 'Fuzzy match requires analyst review', details: ['Transaction held', 'Analyst reviews', 'Compares info', 'True match or false positive'], color: 'yellow' },
              { id: 'analyst-decision', type: 'decision', label: 'Analyst Determination', branches: [{ condition: 'False Positive', target: 'false-positive' }, { condition: 'True Match', target: 'confirmed-hit' }, { condition: 'Need Info', target: 'request-info' }] },
              { id: 'false-positive', type: 'process', label: 'False Positive — Clear', description: 'Not a true match. Document.', outcome: 'Released', color: 'green' },
              { id: 'request-info', type: 'process', label: 'Request Information', description: 'Need additional docs', details: ['Contact customer', 'Set timeline', 'Hold pending'], color: 'yellow' },
              { id: 'confirmed-hit', type: 'process', label: 'Confirmed Hit — Block', description: 'True match to sanctioned party', details: ['Blocked', 'Escalate', 'Document', 'Consider SAR'], outcome: 'Rejected', color: 'red' }
            ],
            keyPrinciples: ['Screening BEFORE funds move', 'Potential matches = human review', 'Confirmed hits blocked, no exceptions', 'All decisions documented']
          },
          documentationRequirements: {
            title: 'Documentation for Compliance',
            byFlagType: [
              { flagType: 'Name Match (Individual)', scenario: 'Customer matches sanctioned individual', requiredDocumentation: ['Government photo ID', 'DOB proof', 'Citizenship proof'], purpose: 'Confirm NOT the sanctioned individual', timeline: '24-48 hours' },
              { flagType: 'Name Match (Entity)', scenario: 'Business matches sanctioned entity', requiredDocumentation: ['Certificate of Incorporation', 'Registration', 'Ownership docs'], purpose: 'Confirm NOT the sanctioned entity', timeline: '48-72 hours' },
              { flagType: 'Jurisdiction Flag', scenario: 'High-risk jurisdiction involved', requiredDocumentation: ['Purpose explanation', 'Evidence not benefiting sanctioned', 'Source of funds'], purpose: 'Confirm transaction permitted', timeline: '48-72 hours' },
              { flagType: 'Wallet Risk', scenario: 'High-risk wallet exposure', requiredDocumentation: ['Ownership explanation', 'Source of flagged funds', 'Business justification'], purpose: 'Understand and mitigate risks', timeline: '24-72 hours' }
            ]
          },
          flaggedPaymentProcess: {
            title: 'Flagged Payment — Customer Journey',
            process: {
              steps: [
                { step: 1, title: 'Hold Notification', timing: 'Immediate', whatHappens: 'Transaction held, customer notified.', customerCommunication: { subject: 'Payment Under Review', template: 'Your payment of [AMOUNT] to [RECIPIENT] is under compliance review.\n\nNext: Our team will review, may contact you.\nTimeline: [TIMEFRAME]\nStatus: Under Review\nRef: [REF]' } },
                { step: 2, title: 'Initial Review', timing: '24-48 hours', whatHappens: 'Analyst reviews, determines if info needed.', outcomes: ['Cleared — proceed', 'Info needed — request docs', 'Blocked — reject'] },
                { step: 3, title: 'Documentation Request', timing: 'Within 48 hours', whatHappens: 'Customer receives specific request.', customerCommunication: { subject: 'Documentation Required: [REF]', template: 'To complete review, we need:\n\n[DOCS LIST]\n\nWhy: [EXPLANATION]\nDeadline: [X] business days\nSubmit: Reply or upload via dashboard' }, documentationTimeline: { standard: '5 business days', extension: 'One 5-day extension', expired: 'Cancelled, funds returned' } },
                { step: 4, title: 'Doc Review', timing: '24-48 hours after receipt', whatHappens: 'Compliance reviews documentation.', outcomes: ['Resolved — approved', 'Insufficient — more docs', 'Unresolved — rejected'] },
                { step: 5, title: 'Resolution', timing: 'Immediately', approvedCommunication: { subject: 'Payment Approved: [REF]', template: 'Your payment of [AMOUNT] to [RECIPIENT] is approved.\n\nExpected: [DATE]\n\nThank you.' }, rejectedCommunication: { subject: 'Payment Cannot Be Completed: [REF]', template: 'We cannot complete payment of [AMOUNT] to [RECIPIENT].\n\nReason: [GENERAL REASON]\nFunds: [RETURNED]\n\nTo request review: compliance@sphere.com with ref.' } }
              ]
            },
            timelineExpectations: {
              title: 'Timeline by Scenario',
              scenarios: [
                { scenario: 'Simple name match (false positive)', typical: '24-48 hours', withDocs: '24 hours after receipt' },
                { scenario: 'Jurisdiction review', typical: '48-72 hours', withDocs: '48 hours after receipt' },
                { scenario: 'Complex ownership', typical: '3-5 business days', withDocs: '2-3 days after receipt' }
              ]
            },
            escalationPath: {
              title: 'Escalation Path',
              levels: [
                { level: 'Level 1: Analyst', handles: 'Standard reviews, false positives, docs' },
                { level: 'Level 2: Senior Compliance', handles: 'Complex, jurisdiction, EDD' },
                { level: 'Level 3: Compliance Officer', handles: 'SAR, termination, regulatory' },
                { level: 'Level 4: Legal/Executive', handles: 'Novel situations, regulator inquiries' }
              ]
            }
          },
          keyTakeaway: 'Sanctions compliance is non-negotiable. Real-time screening against multiple regimes before processing. Clear process for flagged payments with customer communication.'
        },
        exercise: {
          title: 'Exercise 3.3 — Sanctions Scenario',
          prompt: 'UAE customer wants to send $150,000 to Istanbul. During screening:\n1) "Yilmaz Trading Ltd" partially matches SDN "Yilmaz International Trading"\n2) One BO has common Turkish name matching SDN\n3) Turkey is FATF grey list\n\nAs analyst:\n1) Initial assessment?\n2) Documentation to request?\n3) Customer communication?\n4) Criteria to clear?\n5) Criteria to reject?\n6) Draft documentation request email.',
          criteria: ['Correct risk assessment', 'Appropriate documentation', 'Professional communication', 'Clear criteria']
        },
        quiz: [
          { q: 'OFAC is administered by:', options: ['UN', 'EU', 'US', 'UK'], correct: 2 },
          { q: 'FATF grey list means:', options: ['Prohibited', 'EDD required', 'No requirements', 'Auto approval'], correct: 1 },
          { q: 'Sphere screens transactions:', options: ['After settlement', 'Real-time before', 'Daily batch', 'Only large'], correct: 1 },
          { q: 'Potential match requires:', options: ['Auto rejection', 'Auto approval', 'Human review', 'Customer notification only'], correct: 2 },
          { q: 'Customer documentation timeline:', options: ['24 hours', '5 business days', '30 days', 'No deadline'], correct: 1 }
        ]
      },
      {
        id: 'travel-rule',
        title: '3.4 Travel Rule & Data Requirements',
        curriculum: {
          objectives: [
            'Understand FATF Travel Rule origin and purpose',
            'Master required data elements',
            'Navigate threshold variations including Brazil/LatAm',
            'Articulate why Travel Rule matters for Sphere',
            'Understand protocols and transmission methods',
            'Handle edge cases practically'
          ],
          keyConcepts: [
            'FATF Recommendation 16: Share originator/beneficiary info',
            'Thresholds vary: $3K (US), €0 (EU crypto), BRL 10,000 (Brazil)',
            'Required: Name, account/wallet, address OR ID, institution',
            'Protocols: TRISA, Notabene, TRUST, OpenVASP, Sygna',
            'Edge cases need practical solutions'
          ]
        },
        learn: {
          introduction: 'The Travel Rule is becoming global standard for virtual asset transfers. Understanding and implementing compliance is essential for institutional customers, banking, and cross-border operations.',
          coreQuestion: 'What is Travel Rule, what data must be shared, and how does Sphere comply?',
          travelRuleSummary: {
            title: 'Travel Rule — Executive Summary',
            definition: 'VASPs must obtain, hold, and transmit originator and beneficiary information for virtual asset transfers above thresholds.',
            keyTakeaways: ['WHO: VASPs conducting transfers', 'WHAT: Originator/beneficiary identifying info', 'WHEN: Above jurisdiction thresholds', 'WHY: Enable law enforcement tracing', 'HOW: Via protocols or secure communication'],
            spherePosition: 'Sphere is fully Travel Rule compliant. We collect, transmit, and maintain records.',
            whyItMatters: 'Banks, institutions, regulators view Travel Rule as table stakes. Non-compliant VASPs excluded.'
          },
          fatfDefinition: {
            title: 'FATF Definition',
            whatIsFATF: { fullName: 'Financial Action Task Force', description: '39 member jurisdictions setting global AML/CFT standards.', relevantRecommendation: 'Recommendation 16 (Wire Transfers) — extended to crypto 2019' },
            recommendation16: { title: 'Recommendation 16', originalScope: 'Wire transfers since 1996', extension: 'June 2019: Extended to virtual assets', keyLanguage: '"Countries should ensure originating VASPs obtain originator and beneficiary info, submit to beneficiary VASP immediately and securely."' },
            sunriseIssue: { title: 'Sunrise Issue', problem: 'Not all jurisdictions implemented same time/thresholds.', sphereApproach: 'Apply MORE stringent jurisdiction. When in doubt, collect full info.' }
          },
          requiredDataElements: {
            title: 'Required Data Elements',
            originatorRequirements: {
              title: 'Originator (Sender)',
              required: [
                { element: 'Full Legal Name', description: 'As on official ID', required: 'Always above threshold' },
                { element: 'Account/Wallet Address', description: 'Unique identifier', required: 'Always' },
                { element: 'Address OR ID OR Customer ID OR DOB/POB', description: 'At least ONE additional', options: ['Physical address', 'Government ID number', 'Customer ID', 'Date and place of birth'], required: 'At least ONE above threshold' }
              ],
              institutionRequirements: [{ element: 'Originating Institution Name', required: 'Required' }, { element: 'Institution Address or LEI', required: 'Recommended' }]
            },
            beneficiaryRequirements: {
              title: 'Beneficiary (Receiver)',
              required: [
                { element: 'Full Legal Name', required: 'Always above threshold' },
                { element: 'Account/Wallet Address', required: 'Always' }
              ],
              institutionRequirements: [{ element: 'Beneficiary Institution Name', required: 'When at another VASP' }]
            },
            whyEachMatters: [
              { element: 'Name', purpose: 'Sanctions screening, investigation' },
              { element: 'Account/Wallet', purpose: 'Tracing funds' },
              { element: 'Address/ID', purpose: 'Verification, disambiguation' },
              { element: 'Institution', purpose: 'Regulatory targeting' }
            ]
          },
          thresholdsByJurisdiction: {
            title: 'Thresholds by Jurisdiction',
            majorJurisdictions: [
              { jurisdiction: 'United States', flag: '🇺🇸', threshold: '$3,000', regulator: 'FinCEN', status: 'Enforced', notes: 'Traditional wire rule', sphereImplication: 'US transfers ≥$3,000 require compliance' },
              { jurisdiction: 'European Union', flag: '🇪🇺', threshold: '€0 (no threshold crypto)', regulator: 'NCAs', regulation: 'TFR', status: 'Enforced Dec 2024', notes: 'ALL crypto transfers require info', sphereImplication: 'ALL EU transfers require compliance' },
              { jurisdiction: 'United Kingdom', flag: '🇬🇧', threshold: '£0', regulator: 'FCA', status: 'Enforced', notes: 'Aligned with EU', sphereImplication: 'ALL UK transfers require compliance' },
              { jurisdiction: 'Singapore', flag: '🇸🇬', threshold: 'SGD 1,500 (~$1,100)', regulator: 'MAS', status: 'Enforced', notes: 'First for crypto', sphereImplication: 'Singapore ≥SGD 1,500 require compliance' },
              { jurisdiction: 'UAE', flag: '🇦🇪', threshold: 'AED 3,500 (~$950)', regulator: 'CBUAE, VARA', status: 'Enforced', notes: 'Part of FATF exit', sphereImplication: 'UAE ≥AED 3,500 require compliance' },
              { jurisdiction: 'Japan', flag: '🇯🇵', threshold: '¥0', regulator: 'FSA', status: 'Enforced', notes: 'First for crypto (2020)', sphereImplication: 'ALL Japan transfers require compliance' },
              { jurisdiction: 'Switzerland', flag: '🇨🇭', threshold: 'CHF 1,000 (~$1,100)', regulator: 'FINMA', status: 'Enforced', notes: 'Wallet ownership proof for self-hosted', sphereImplication: 'Switzerland ≥CHF 1,000 plus wallet verification' }
            ],
            latinAmerica: {
              title: 'Latin America — Key Markets',
              subtitle: 'Brazil and LatAm jurisdictions Sphere is pursuing',
              jurisdictions: [
                { jurisdiction: 'Brazil', flag: '🇧🇷', threshold: 'BRL 10,000 (~$2,000)', regulator: 'COAF, BCB', status: 'Enforced', details: { keyRequirements: ['≥BRL 10,000 full info', 'BCB registration', 'STRs to COAF', 'Cross-border extra docs'], pixIntegration: 'PIX creates stablecoin opportunities', sphereOpportunity: 'Brazil-US corridor is high volume' }, sphereImplication: 'Brazil ≥BRL 10,000 require compliance; BCB registration needed' },
                { jurisdiction: 'Mexico', flag: '🇲🇽', threshold: 'No threshold (all)', regulator: 'CNBV', status: 'Enforced', details: { keyRequirements: ['CNBV registration', 'All transfers require info', 'Strict beneficial ownership'] }, sphereImplication: 'ALL Mexico require compliance; CNBV registration' },
                { jurisdiction: 'Argentina', flag: '🇦🇷', threshold: 'USD 1,000', regulator: 'CNV, UIF', status: 'Evolving', details: { keyRequirements: ['CNV registration', '≥$1,000 require compliance', 'FX controls add complexity'] }, sphereImplication: 'Argentina ≥$1,000 require compliance; FX complexity' }
              ],
              regionalTrends: ['GAFILAT pushing harmonization', 'High crypto adoption (currency instability)', 'Remittance corridors significant', 'Frameworks rapidly evolving']
            },
            thresholdComparisonTable: {
              title: 'Quick Reference',
              headers: ['Jurisdiction', 'Threshold', 'USD Equivalent', 'Notes'],
              rows: [
                ['🇺🇸 US', '$3,000', '$3,000', 'FinCEN BSA'],
                ['🇪🇺 EU', '€0', '$0', 'No threshold crypto'],
                ['🇬🇧 UK', '£0', '$0', 'No threshold'],
                ['🇯🇵 Japan', '¥0', '$0', 'No threshold'],
                ['🇸🇬 Singapore', 'SGD 1,500', '~$1,100', 'MAS'],
                ['🇨🇭 Switzerland', 'CHF 1,000', '~$1,100', 'Plus wallet ownership'],
                ['🇦🇪 UAE', 'AED 3,500', '~$950', 'VARA/CBUAE'],
                ['🇧🇷 Brazil', 'BRL 10,000', '~$2,000', 'COAF/BCB'],
                ['🇲🇽 Mexico', 'No threshold', '$0', 'CNBV'],
                ['🇦🇷 Argentina', 'USD 1,000', '$1,000', 'CNV/UIF']
              ]
            }
          },
          whyTravelRuleMatters: {
            title: 'Why Travel Rule Matters for Sphere',
            businessImplications: [
              { implication: 'Banking Partners', detail: 'Banks ask about Travel Rule. Without it, relationships at risk.', impact: 'No Travel Rule = no banking' },
              { implication: 'Institutional Customers', detail: 'Enterprise verifies compliance before onboarding.', impact: 'No compliance = excluded from enterprise' },
              { implication: 'Regulatory Exams', detail: 'Examiners focus on Travel Rule.', impact: 'Non-compliance = findings, enforcement' },
              { implication: 'Counterparty VASPs', detail: 'Others may refuse without exchange.', impact: 'Non-compliance = reduced connectivity' },
              { implication: 'Competitive Advantage', detail: 'Differentiates from less compliant competitors.', impact: 'Compliance = differentiation' }
            ]
          },
          travelRuleProtocols: {
            title: 'Travel Rule Protocols',
            overview: 'No single standard. Multiple protocols exist.',
            protocols: [
              { protocol: 'TRISA', fullName: 'Travel Rule Information Sharing Alliance', type: 'Decentralized, open-source', description: 'Peer-to-peer with mTLS certificates.', governance: 'TRISA Working Group', coverage: 'Growing global', pros: ['Open source', 'No central failure', 'Industry-governed'], cons: ['Certificate management', 'Network effects'], sphereSupport: 'Supported' },
              { protocol: 'Notabene', fullName: 'Notabene Network', type: 'Commercial SaaS', description: 'Hosted network via API.', governance: 'Notabene (private)', coverage: '200+ VASPs', pros: ['Easy integration', 'Large network', 'Extra features'], cons: ['Fees', 'Vendor dependency'], sphereSupport: 'Integrated' },
              { protocol: 'TRUST', fullName: 'Travel Rule Universal Solution Technology', type: 'US consortium', description: 'Major US VASPs consortium.', governance: 'Coinbase, Kraken, Gemini', coverage: 'US-focused', pros: ['Major US exchanges', 'US regulatory alignment'], cons: ['US-centric', 'Membership'], sphereSupport: 'Monitoring' },
              { protocol: 'OpenVASP', fullName: 'OpenVASP Protocol', type: 'Open protocol', description: 'Decentralized, open-source.', governance: 'OpenVASP Association (Switzerland)', coverage: 'Europe focus', pros: ['Open source', 'Privacy-preserving'], cons: ['Smaller network'], sphereSupport: 'Available' },
              { protocol: 'Sygna Bridge', fullName: 'Sygna Bridge', type: 'Commercial (APAC)', description: 'Strong APAC coverage.', governance: 'CoolBitX', coverage: 'APAC, expanding', pros: ['APAC coverage', 'Regulatory relationships'], cons: ['Regional'], sphereSupport: 'Integrated' }
            ],
            protocolComparison: {
              headers: ['Protocol', 'Type', 'Coverage', 'Integration', 'Cost', 'Sphere'],
              rows: [
                ['TRISA', 'Open source', 'Global', 'Medium', 'Free', 'Supported'],
                ['Notabene', 'Commercial', '200+ VASPs', 'Low (API)', 'Per-transaction', 'Integrated'],
                ['TRUST', 'Consortium', 'US majors', 'Medium', 'Membership', 'Monitoring'],
                ['OpenVASP', 'Open source', 'Europe', 'Medium', 'Free', 'Available'],
                ['Sygna', 'Commercial', 'APAC', 'Low (API)', 'Per-transaction', 'Integrated']
              ]
            },
            sphereApproach: {
              title: 'Sphere Multi-Protocol Strategy',
              strategy: 'Support multiple protocols for maximum connectivity.',
              workflow: [{ step: 1, action: 'Identify counterparty VASP' }, { step: 2, action: 'Check protocols supported' }, { step: 3, action: 'Transmit via supported protocol' }, { step: 4, action: 'If no shared protocol, secure email or reject' }]
            }
          },
          transmissionMethods: {
            title: 'Transmission Methods',
            methods: [
              { method: 'Protocol-Based', description: 'Automated via TRISA, Notabene, etc.', howItWorks: 'API call → receive → acknowledge', advantages: ['Automated', 'Secure', 'Auditable', 'Fast'], disadvantages: ['Both parties on protocol'], whenToUse: 'Default when supported' },
              { method: 'Direct API', description: 'Bilateral custom integration.', howItWorks: 'Custom for high-volume', advantages: ['Customizable', 'No third-party'], disadvantages: ['Dev per counterparty'], whenToUse: 'High-volume relationships' },
              { method: 'Secure Email', description: 'Fallback encrypted email.', howItWorks: 'Encrypted with Travel Rule data', advantages: ['Works with any'], disadvantages: ['Manual', 'Slower'], whenToUse: 'One-off, non-integrated' }
            ],
            timingRequirements: { title: 'Timing', guidance: 'FATF says "immediately." Most allow before, during, or after.', sphereApproach: 'Sphere transmits immediately upon initiation, before settlement.' }
          },
          transactionsApplied: {
            title: 'What Transactions Apply',
            appliesTo: [
              { type: 'VASP-to-VASP', description: 'Transfers between VASPs', example: 'Sphere customer → Coinbase customer', travelRule: 'YES — full compliance above threshold' },
              { type: 'VASP-to-Unhosted', description: 'To self-hosted wallet', example: 'Sphere → MetaMask', travelRule: 'VARIES — some jurisdictions require, EDD often needed' },
              { type: 'Unhosted-to-VASP', description: 'From self-hosted', example: 'Personal wallet → Sphere', travelRule: 'VASP collects originator info, EDD' }
            ],
            doesNotApply: [
              { type: 'Internal Transfers', description: 'Between accounts at same VASP', travelRule: 'Generally exempt, recordkeeping required' },
              { type: 'Unhosted-to-Unhosted', description: 'Between self-hosted wallets', travelRule: 'Not subject (no regulated entity)' }
            ]
          },
          edgeCases: {
            title: 'Edge Cases & Solutions',
            scenarios: [
              {
                scenario: 'Counterparty Not on Protocol',
                problem: 'VASP without TRISA, Notabene, etc.',
                solutions: [
                  { solution: 'Secure Email', implementation: 'Contact compliance, establish channel, encrypted email', pros: 'Works with any', cons: 'Manual, slow', when: 'One-off' },
                  { solution: 'Correspondent VASP', implementation: 'Route through intermediate with both relationships', pros: 'Maintains compliance', cons: 'Cost, complexity', when: 'Regular with non-integrated' },
                  { solution: 'Rejection', implementation: 'Decline, explain requirements, suggest compliant alternative', pros: 'Maintains standards', cons: 'Customer friction', when: 'Risk exceeds benefit' }
                ],
                sphereApproach: 'Try email first, then correspondent. Rejection is last resort.'
              },
              {
                scenario: 'Unhosted Wallet',
                problem: 'Send to self-hosted (no beneficiary institution)',
                solutions: [
                  { solution: 'Enhanced DD', implementation: 'Verify customer controls destination, document purpose, enhanced monitoring', pros: 'Enables legitimate self-custody', cons: 'Friction, risk', when: 'Legitimate need' },
                  { solution: 'Wallet Ownership Verification', implementation: 'Proof of ownership (sign message, test transaction)', pros: 'Reduces risk', cons: 'Technical friction', when: 'Required by jurisdiction or risk' },
                  { solution: 'Transaction Limits', implementation: 'Lower limits for unhosted', pros: 'Manages risk', cons: 'May not meet needs', when: 'Risk appetite limited' }
                ],
                sphereApproach: 'Allow with EDD, ownership verification for larger amounts, enhanced monitoring.'
              },
              {
                scenario: 'Incomplete Beneficiary Info',
                problem: 'Receiving VASP provides incomplete data',
                solutions: [
                  { solution: 'Request Clarification', implementation: 'Follow up for complete info', pros: 'May resolve', cons: 'Delays', when: 'Time permits' },
                  { solution: 'Document Gap and Proceed', implementation: 'Document incomplete, note attempts, proceed', pros: 'Doesn\'t block legitimate', cons: 'Gap in record', when: 'Reputable counterparty, acceptable risk' },
                  { solution: 'Reject', implementation: 'Decline until complete', pros: 'Standards', cons: 'Friction', when: 'High-risk, questionable counterparty' }
                ],
                sphereApproach: 'Request clarification, document gaps, risk-based decision.'
              },
              {
                scenario: 'Name Matching',
                problem: 'Beneficiary name doesn\'t match (transliteration, legal vs trading)',
                solutions: [
                  { solution: 'Fuzzy with Documentation', implementation: 'Accept reasonable variations if documented', pros: 'Accommodates real-world', cons: 'Judgment required', when: 'Explainable (Mohammed vs Muhammad)' },
                  { solution: 'Exact Match', implementation: 'Insist on exact', pros: 'Clear standard', cons: 'May block legitimate', when: 'High-risk, unexplained' }
                ],
                sphereApproach: 'Accept reasonable variations with documentation, reject significant unexplained.'
              },
              {
                scenario: 'Structuring Concern',
                problem: 'Multiple transactions just below threshold',
                solutions: [
                  { solution: 'Aggregate Monitoring', implementation: 'Monitor cumulative, trigger if aggregate exceeds', pros: 'Catches structuring', cons: 'Complexity', when: 'Pattern suggests avoidance' },
                  { solution: 'Apply Proactively', implementation: 'Collect Travel Rule data even below threshold', pros: 'Proactive', cons: 'Friction', when: 'Structuring indicators' },
                  { solution: 'SAR Consideration', implementation: 'If structuring evident, consider SAR', pros: 'Addresses underlying', cons: 'Significant step', when: 'Clear intent' }
                ],
                sphereApproach: 'Monitor aggregates, may apply proactively or escalate to SAR.'
              }
            ]
          },
          keyTakeaway: 'Travel Rule is global standard for institutional customers, banking, and legal cross-border ops. Collect originator/beneficiary info, transmit via protocols, handle edge cases practically, apply MORE stringent jurisdiction\'s requirements.'
        },
        exercise: {
          title: 'Exercise 3.4 — Travel Rule Scenario',
          prompt: 'Brazilian company (São Paulo) wants to send $75,000 USDC to UK supplier (UK VASP account).\n\nAnalyze:\n1) Does Travel Rule apply? Which threshold?\n2) Originator info to collect?\n3) Beneficiary info required?\n4) How to transmit?\n5) What if UK VASP not on any protocol?\n6) What documentation to maintain?',
          criteria: ['Correct threshold', 'Complete originator data', 'Complete beneficiary data', 'Protocol identified', 'Non-integrated solution', 'Recordkeeping requirements']
        },
        quiz: [
          { q: 'US Travel Rule threshold:', options: ['$1,000', '$3,000', '$10,000', 'No threshold'], correct: 1 },
          { q: 'EU crypto threshold under TFR:', options: ['€1,000', '€3,000', '€0 (no threshold)', '€10,000'], correct: 2 },
          { q: 'NOT required originator info:', options: ['Full name', 'Account number', 'Social media handle', 'Address or ID'], correct: 2 },
          { q: 'TRISA is:', options: ['A stablecoin', 'A sanctions list', 'A Travel Rule protocol', 'A regulator'], correct: 2 },
          { q: 'Brazil threshold approximately:', options: ['$500', '$1,000', '$2,000', '$5,000'], correct: 2 },
          { q: 'If counterparty not on protocol:', options: ['Reject all', 'Ignore Travel Rule', 'Try email, then correspondent', 'Wait for them'], correct: 2 },
          { q: 'Unhosted wallet transfers:', options: ['Always reject', 'Apply enhanced DD', 'Ignore Travel Rule', 'Double threshold'], correct: 1 },
          { q: 'When transmit Travel Rule data:', options: ['Within 30 days', 'Immediately', 'Only if requested', 'End of month'], correct: 1 }
        ]
      },
        id: 'uae-regulatory-framework',
        title: '3.5 UAE Regulatory Framework',
        curriculum: {
          objectives: [
            'Navigate UAE\'s multi-regulator landscape (CBUAE, VARA, DFSA, FSRA)',
            'Understand VARA vs DIFC licensing requirements and tradeoffs',
            'Explain the Payment Token Services Regulation and Digital Dirham',
            'Articulate Sphere\'s recommended UAE entity structure'
          ],
          keyConcepts: [
            'Six regulatory territories with distinct requirements',
            'VARA for retail + B2B crypto, DIFC for institutional',
            'CBUAE Circular 2/2024: Payment Token Services Regulation',
            'Two-entity structure: SpherePay (VARA) + SphereNet (ADGM/DIFC)'
          ]
        },
        learn: {
          introduction: 'UAE is Sphere\'s primary market for the Middle East and a critical hub for Asia-Africa trade. Understanding the regulatory landscape is essential — UAE has SIX distinct regulatory territories, each with different rules, costs, and strategic value.',
          coreQuestion: 'How does UAE regulate stablecoins and payments, and where should Sphere operate?',
          whyUAEMatters: {
            title: 'Why UAE Is Strategic for Sphere',
            points: [
              'Dubai is the financial hub for MENA, connecting $1.5T+ in annual trade flows',
              'Progressive regulatory environment — UAE actively wants to be a global crypto/fintech hub',
              'High volume of cross-border payments: UAE-India corridor alone is $50B+ annually',
              'Gateway to emerging markets: Africa, South Asia, Central Asia all route through UAE',
              'English-speaking business environment with strong rule of law'
            ],
            arnoldQuote: {
              quote: 'Being small is the advantage. These operators don\'t want to go live in Libya. We will.',
              context: 'UAE gives Sphere a compliant base to serve hard-to-reach markets across MENA and beyond.'
            }
          },
          regulatoryLandscape: {
            title: 'UAE Regulatory Landscape: Six Territories',
            subtitle: 'UAE is NOT one regulatory jurisdiction — it\'s six distinct territories with different regulators, legal systems, and crypto scopes.',
            territories: [
              {
                name: 'VARA (Dubai Mainland)',
                regulator: 'Virtual Assets Regulatory Authority',
                legalSystem: 'UAE Civil Law',
                bestFor: 'Retail + B2B crypto, AED on/off-ramp',
                cryptoScope: 'Broadest — built specifically for crypto',
                sphereRelevance: 'PRIMARY — SpherePay UAE entity',
                icon: '🏙️'
              },
              {
                name: 'DIFC (Dubai Free Zone)',
                regulator: 'Dubai Financial Services Authority (DFSA)',
                legalSystem: 'English Common Law',
                bestFor: 'Institutional clients, tokenized securities',
                cryptoScope: 'Narrow — traditional finance + limited crypto',
                sphereRelevance: 'SECONDARY — potential SphereNet tokenization',
                icon: '🏛️'
              },
              {
                name: 'ADGM (Abu Dhabi Free Zone)',
                regulator: 'Financial Services Regulatory Authority (FSRA)',
                legalSystem: 'English Common Law',
                bestFor: 'Institutional, exchanges, custody',
                cryptoScope: 'Comprehensive since 2018 — first mover',
                sphereRelevance: 'SECONDARY — SphereNet institutional infrastructure',
                icon: '🏗️'
              },
              {
                name: 'UAE Mainland (Federal)',
                regulator: 'SCA + CBUAE',
                legalSystem: 'UAE Civil Law',
                bestFor: 'Payment services, AED stablecoins',
                cryptoScope: 'Payment tokens, AED-backed stablecoins only',
                sphereRelevance: 'COMPLIANCE — CBUAE Payment Token rules apply',
                icon: '🇦🇪'
              },
              {
                name: 'DMCC (Dubai Free Zone)',
                regulator: 'DMCC Authority + VARA overlay',
                legalSystem: 'UAE Civil Law',
                bestFor: 'Quick setup, trading companies',
                cryptoScope: 'Limited — needs VARA add-on for crypto',
                sphereRelevance: 'OPERATIONAL — base entity for VARA application',
                icon: '💎'
              },
              {
                name: 'RAK DAO (Ras Al Khaimah)',
                regulator: 'RAKEZ',
                legalSystem: 'UAE Civil Law',
                bestFor: 'Web3, DAOs, unregulated activities',
                cryptoScope: 'Unregulated activities only',
                sphereRelevance: 'NOT SUITABLE — no regulatory framework',
                icon: '🌴'
              }
            ],
            keyInsight: 'For Sphere\'s B2B payment focus, VARA is the primary choice. For institutional tokenization (SphereNet), ADGM or DIFC are better suited.'
          },
          varaDeepDive: {
            title: 'VARA Deep Dive: Primary Recommendation for SpherePay',
            whyVARA: 'VARA (Virtual Assets Regulatory Authority) is purpose-built for crypto businesses. Unlike DIFC/ADGM which adapted traditional finance frameworks, VARA was created from scratch to regulate virtual assets. This makes licensing faster and more predictable.',
            requirements: {
              title: 'VARA Licensing Requirements',
              items: [
                {
                  requirement: 'Physical Office',
                  detail: 'YES — Physical office in Dubai required. Virtual office NOT acceptable.',
                  cost: 'AED 150,000/year (~$41,000) for appropriate office space',
                  note: 'Flexi-desk arrangements not permitted. Need real office with meeting rooms.'
                },
                {
                  requirement: 'Local Staff',
                  detail: '2 UAE-resident "Responsible Individuals" required',
                  roles: ['Money Laundering Reporting Officer (MLRO)', 'Compliance Officer (CO)'],
                  note: 'These individuals must be UAE residents with appropriate experience. Cannot be outsourced.'
                },
                {
                  requirement: 'Minimum Capital — Transfer Services',
                  detail: 'AED 600,000 - 800,000 (~$163,000 - $218,000)',
                  note: 'This capital is locked/restricted — cannot be used for operations.'
                },
                {
                  requirement: 'Minimum Capital — Exchange Services',
                  detail: 'AED 800,000 - 1,500,000 (~$218,000 - $408,000)',
                  note: 'Higher capital for exchange activities due to greater risk.'
                },
                {
                  requirement: 'Minimum Capital — Custody Services',
                  detail: 'AED 750,000 (~$204,000)',
                  note: 'Required if holding customer assets.'
                },
                {
                  requirement: 'Application Fees',
                  detail: 'AED 40,000 - 100,000 per activity (~$11,000 - $27,000)',
                  note: 'Fees vary by license type. Multiple activities = multiple fees.'
                },
                {
                  requirement: 'Annual Supervision Fees',
                  detail: 'AED 80,000 - 200,000 per activity (~$22,000 - $55,000)',
                  note: 'Ongoing annual cost. Budget for multi-year commitment.'
                }
              ]
            },
            timeline: {
              title: 'VARA Licensing Timeline',
              duration: '6-12 months (typically 9 months)',
              phases: [
                { phase: 'Pre-Application', duration: '1-2 months', activities: 'Select legal counsel, draft business plan, identify local staff' },
                { phase: 'Application Submission', duration: '1 month', activities: 'Submit application, pay fees, begin VARA review' },
                { phase: 'VARA Review', duration: '3-6 months', activities: 'Q&A with VARA, document requests, compliance review' },
                { phase: 'Conditional Approval', duration: '1-2 months', activities: 'Address conditions, finalize office/staff, deposit capital' },
                { phase: 'Final License', duration: '1 month', activities: 'License issued, commence operations' }
              ]
            },
            licenseTypes: {
              title: 'VARA License Types Relevant to Sphere',
              types: [
                {
                  license: 'Transfer and Settlement Services',
                  description: 'Moving virtual assets between parties',
                  sphereUse: 'Core SpherePay activity — stablecoin transfers',
                  capital: 'AED 600,000-800,000'
                },
                {
                  license: 'Broker-Dealer Services',
                  description: 'Facilitating VA transactions for clients',
                  sphereUse: 'Needed for fiat-to-stablecoin conversion services',
                  capital: 'AED 800,000-1,500,000'
                },
                {
                  license: 'Custody Services',
                  description: 'Holding VAs on behalf of clients',
                  sphereUse: 'Only if holding client funds (FBO model)',
                  capital: 'AED 750,000'
                }
              ]
            },
            advantages: [
              'AED on/off-ramp: Full support for AED banking relationships',
              'Retail allowed: Can serve SMBs and eventually retail customers',
              'Crypto-native regulator: VARA understands crypto business models',
              'Faster licensing: Purpose-built framework vs adapted traditional finance rules',
              'Broader token support: More stablecoins approved than DIFC'
            ],
            limitations: [
              'UAE Civil Law: Less familiar to international investors than English Common Law',
              'Capital locked: Minimum capital earns ~0% — opportunity cost',
              'Marketing restrictions: All marketing must be pre-approved by VARA (fines up to AED 10M)',
              'Intensive supervision: Regular audits, reporting requirements'
            ]
          },
          difcComparison: {
            title: 'VARA vs DIFC: Head-to-Head Comparison',
            subtitle: 'Understanding when to choose each territory',
            comparisonTable: {
              headers: ['Attribute', 'VARA', 'DIFC (DFSA)'],
              rows: [
                ['Location', 'Mainland Dubai', 'Financial free zone (separate jurisdiction)'],
                ['Legal System', 'UAE Civil Law', 'English Common Law'],
                ['Target Customers', 'Retail + Institutional', 'Institutional / Professional only'],
                ['Crypto Scope', 'Broad (built for crypto)', 'Narrow (crypto bolted onto traditional finance)'],
                ['Token Restrictions', 'Approved list, no privacy coins', 'Very limited approved tokens'],
                ['Capital Requirements', '~AED 600K for Transfer Services', 'Higher, varies by activity (USD 500K-2M+)'],
                ['Banking Access', 'Easier (more UAE banks onboarded)', 'Harder (DIFC banks more conservative)'],
                ['Fiat On/Off-Ramp', 'Yes, AED supported', 'Limited, more USD/EUR focused'],
                ['Licensing Timeline', '6-12 months', '6-12 months (more rigorous)'],
                ['Vibe', '"Crypto-native regulator"', '"Traditional finance tolerating crypto"']
              ]
            },
            whenToChooseVARA: [
              'Serve retail customers in UAE',
              'Offer AED on/off-ramps',
              'Operate broad stablecoin payment rail',
              'Move fast (VARA more familiar with crypto business models)',
              'Access local UAE banking relationships'
            ],
            whenToChooseDIFC: [
              'Only serve institutional / professional clients',
              'Operate more like traditional financial infrastructure',
              'Want English Common Law protections (better for disputes, investor comfort)',
              'Eventually get acquired by or partner with traditional finance',
              'Avoid "crypto company" stigma with certain counterparties'
            ],
            practicalDifference: {
              title: 'The Real Difference',
              vara: 'VARA says: "You\'re a crypto company, here are crypto rules"',
              difc: 'DIFC says: "You\'re a financial services company that happens to touch some approved tokens"'
            },
            sphereExample: {
              title: 'Practical Example: SpherePay Use Case',
              varaScenario: {
                description: 'SpherePay under VARA',
                capabilities: [
                  'Let Ahmad\'s SMB client convert AED → USDC',
                  'Send USDC to supplier anywhere globally',
                  'Supplier converts USDC → their local currency',
                  'Full retail access, AED banking works',
                  'Regulated as VASP (Virtual Asset Service Provider)'
                ]
              },
              difcScenario: {
                description: 'SpherePay under DIFC',
                capabilities: [
                  'Offer USDC settlement for institutional clients',
                  'Probably can\'t serve retail SMBs directly',
                  'More hoops for fiat conversion',
                  'Regulated more like payment processor or MTL'
                ]
              }
            }
          },
          adgmOverview: {
            title: 'ADGM: Institutional Alternative',
            description: 'Abu Dhabi Global Market (ADGM) was the UAE\'s first comprehensive crypto framework (2018). It\'s mature, institutional-focused, and ideal for custody/exchange infrastructure.',
            requirements: {
              title: 'ADGM Key Requirements',
              items: [
                { item: 'Physical Office', detail: 'Required on Al Maryah Island, Abu Dhabi' },
                { item: 'Local Staff', detail: 'SEO, CO, MLRO must be UAE residents. Minimum 2-4 directors.' },
                { item: 'Capital (Advisory)', detail: 'USD 10,000-50,000' },
                { item: 'Capital (Broker)', detail: 'USD 250,000-500,000' },
                { item: 'Capital (Exchange/MTF)', detail: 'USD 2,000,000+ (varies by volume)' },
                { item: 'Registration Fee', detail: '~USD 15,000' },
                { item: 'Annual Fees', detail: 'USD 20,000-60,000 + volume-based levies' },
                { item: 'Timeline', detail: '6-9 months' }
              ]
            },
            sphereRelevance: 'ADGM is better suited for SphereNet\'s institutional infrastructure — custody, exchange, tokenization. Not ideal for SpherePay\'s retail/SMB focus.'
          },
          cbuaeRegulations: {
            title: 'CBUAE: Payment Token Services Regulation',
            subtitle: 'Critical federal-level regulation that applies regardless of free zone status',
            circular2024: {
              title: 'CBUAE Circular No. 2/2024',
              description: 'Central Bank framework establishing licensing and supervision for stablecoin issuance, custody, transfer, and conversion.',
              keyProvisions: [
                {
                  provision: 'Payment Token Definition',
                  detail: 'Stablecoins pegged to fiat currencies (AED, USD, etc.) are classified as "Payment Tokens"'
                },
                {
                  provision: 'AED-Backed Requirement',
                  detail: 'For retail payment services in UAE, ONLY AED-backed stablecoins are permitted. Foreign stablecoins (USDC, USDT) restricted for retail payments.',
                  sphereImplication: 'B2B cross-border payments using USDC/USDT remain permitted. Restriction primarily affects retail point-of-sale.'
                },
                {
                  provision: 'Licensing Categories',
                  detail: 'Separate licenses for: (1) Issuance, (2) Custody, (3) Transfer, (4) Conversion'
                },
                {
                  provision: 'Reserve Requirements',
                  detail: 'Issuers must maintain 1:1 reserves in high-quality liquid assets, held at UAE-licensed banks'
                },
                {
                  provision: 'Consumer Protection',
                  detail: 'Mandatory redemption rights, clear fee disclosure, dispute resolution'
                }
              ],
              effectiveDate: 'August 2025',
              spherePosition: 'Sphere is NOT an issuer — we use third-party stablecoins (USDC, USDT). CBUAE regulations for issuers don\'t apply to us. Transfer/conversion regulations do apply.'
            },
            digitalDirham: {
              title: 'Digital Dirham: UAE\'s CBDC',
              description: 'Federal Decree-Law No. 6 of 2025 amended UAE monetary law to recognize the Digital Dirham as central bank money and legal tender.',
              implications: [
                'Digital Dirham will be issued by CBUAE — government-backed digital currency',
                'Will compete with/complement private stablecoins',
                'Sphere positioned to integrate Digital Dirham alongside USDC/USDT',
                'Timeline: Pilot underway, full launch expected 2026-2027'
              ],
              sphereStrategy: 'Sphere will support Digital Dirham when available — gives UAE customers government-backed alternative to private stablecoins. Regulatory tailwind for compliant providers.'
            }
          },
          recommendedEntityStructure: {
            title: 'Recommended Entity Structure for Sphere',
            subtitle: 'Two-entity approach optimized for SpherePay + SphereNet',
            rationale: 'Based on Sphere\'s priorities: (1) B2B money transmission, (2) Tokenization infrastructure, (3) Future retail/SMB expansion',
            entities: [
              {
                entity: 'SpherePay UAE FZE',
                territory: 'VARA (Dubai)',
                licenses: ['Transfer & Settlement Services', 'Broker-Dealer'],
                purpose: 'B2B payments, AED on/off-ramp, stablecoin transfers, SWIFT alternative',
                priority: 'PRIMARY — Start here',
                yearOneCost: {
                  title: 'Year 1 Budget Estimate',
                  items: [
                    { category: 'VARA Application Fees', aed: 150000, usd: 41000 },
                    { category: 'VARA Annual Supervision', aed: 280000, usd: 76000 },
                    { category: 'Minimum Capital (locked)', aed: 800000, usd: 218000 },
                    { category: 'Entity Setup (DMCC base)', aed: 35000, usd: 9500 },
                    { category: 'Office Space (annual)', aed: 150000, usd: 41000 },
                    { category: 'Staff (Year 1)', aed: 600000, usd: 163000 },
                    { category: 'Legal & Advisory', aed: 200000, usd: 54000 },
                    { category: 'Tech/Compliance Infrastructure', aed: 150000, usd: 41000 },
                    { category: 'Banking Setup/Guarantees', aed: 50000, usd: 14000 }
                  ],
                  total: { aed: 2415000, usd: 658000 }
                }
              },
              {
                entity: 'SphereNet ADGM Ltd',
                territory: 'ADGM (Abu Dhabi) or DIFC',
                licenses: ['MTF', 'Custody'],
                purpose: 'Tokenization, institutional custody, RWA infrastructure',
                priority: 'SECONDARY — Phase 2 (18-30 months)',
                yearOneCost: {
                  title: 'Year 1 Budget Estimate',
                  items: [
                    { category: 'FSRA Application Fee', usd: '15,000-30,000' },
                    { category: 'Annual Fees', usd: '30,000-60,000' },
                    { category: 'Minimum Capital', usd: '500,000-2,000,000' },
                    { category: 'Entity Setup', usd: '15,000-25,000' },
                    { category: 'Office Space (annual)', usd: '25,000-50,000' },
                    { category: 'Staff', usd: '150,000-300,000' },
                    { category: 'Legal & Advisory', usd: '50,000-100,000' }
                  ],
                  total: { usd: '785,000-2,565,000', note: 'Wide range based on scope' }
                }
              }
            ],
            timeline: {
              title: 'Recommended Phased Timeline',
              phases: [
                { phase: 'Phase 0: Prep', months: '1-2', actions: 'Select legal counsel, draft business plan, identify local staff (MLRO, CO)' },
                { phase: 'Phase 1: VARA Setup', months: '3-12', actions: 'Incorporate DMCC entity, submit VARA application, set up office, hire staff, open bank account, obtain VARA license' },
                { phase: 'Phase 2: Operational', months: '12-18', actions: 'Go live with B2B transfers, AED on/off-ramp integration, build banking relationships, scale operations' },
                { phase: 'Phase 3: Tokenization', months: '18-30', actions: 'Apply for ADGM or DIFC license, set up second entity, launch tokenization services' },
                { phase: 'Phase 4: Retail (Future)', months: '36+', actions: 'Apply for VARA Exchange license, build retail product, marketing approvals' }
              ]
            },
            totalInvestment: {
              twoYear: '$1.5M - $3M+',
              lockedCapital: '$1M+',
              note: 'Significant investment required. Plan for multi-year commitment.'
            }
          },
          activityLicenseMapping: {
            title: 'Activity → License Mapping',
            subtitle: 'Which license do you need for each activity?',
            mappings: [
              { activity: 'B2B Stablecoin Transfers (USDC/USDT)', license: 'Transfer & Settlement Services', territory: 'VARA', note: 'Core SpherePay use case' },
              { activity: 'FBO / 3rd Party Money Holding', license: 'Custody + Transfer Services', territory: 'VARA or ADGM', note: 'Custody license if holding client funds' },
              { activity: 'SWIFT Alternative (Fiat rails)', license: 'Broker-Dealer + Transfer', territory: 'VARA', note: 'Need banking partner for fiat leg' },
              { activity: 'AED On/Off-Ramp', license: 'Transfer Services + CBUAE alignment', territory: 'VARA', note: 'Must comply with CBUAE stablecoin rules' },
              { activity: 'Tokenization (RWA, securities)', license: 'VA Issuance or DFSA Crypto Token', territory: 'DIFC or ADGM', note: 'DIFC has Tokenisation Sandbox' },
              { activity: 'Institutional Custody', license: 'Custody Services', territory: 'ADGM', note: 'FSRA framework is most mature' },
              { activity: 'Retail Exchange (future)', license: 'Exchange Services', territory: 'VARA', note: 'Only VARA allows retail easily' }
            ]
          },
          keyRisksAndConsiderations: {
            title: 'Key Risks & Considerations',
            risks: [
              {
                risk: 'Banking Access',
                detail: 'UAE banks still cautious with crypto companies. Plan 3-6 months for bank account opening.',
                mitigation: 'Apply to multiple banks in parallel. Consider Emirates NBD, Mashreq, RAK Bank which have crypto-friendly units.'
              },
              {
                risk: 'Capital Lock-up',
                detail: 'Minimum capital is dead money earning ~0%. Factor opportunity cost into planning.',
                mitigation: 'Budget for this as cost of doing business. Capital requirements unlikely to decrease.'
              },
              {
                risk: 'Stablecoin Restrictions',
                detail: 'CBUAE Payment Token Services Regulation restricts foreign stablecoins for retail payments. AED-backed tokens only for retail.',
                mitigation: 'B2B cross-border remains permitted with USDC/USDT. Focus on B2B initially, monitor retail rules.'
              },
              {
                risk: 'Staff Residency',
                detail: 'Key personnel (MLRO, CO, SEO) must be UAE residents. Factor visa/relocation costs.',
                mitigation: 'Budget AED 50-100K per relocated employee. Consider hiring locally experienced staff.'
              },
              {
                risk: 'Ongoing Compliance',
                detail: 'VARA audits, reporting, supervision are intensive. Budget for ongoing compliance costs.',
                mitigation: 'Build compliance team. Budget AED 500K+/year for ongoing compliance operations.'
              },
              {
                risk: 'Marketing Restrictions',
                detail: 'All marketing must be pre-approved by VARA. Fines up to AED 10M for violations.',
                mitigation: 'Build VARA approval into marketing workflow. 2-4 week lead time for approvals.'
              }
            ]
          },
          sampleResponses: {
            title: 'Sample Responses for UAE Regulatory Questions',
            scenarios: [
              {
                question: 'Which UAE regulator oversees Sphere?',
                answer: 'For our B2B payment services in Dubai, we operate under VARA (Virtual Assets Regulatory Authority) with Transfer & Settlement and Broker-Dealer licenses. For federal payment token compliance, we align with CBUAE Circular 2/2024. We\'re also evaluating ADGM for our SphereNet institutional infrastructure.',
                doNotSay: ['We don\'t need regulation', 'We operate offshore', 'VARA is optional']
              },
              {
                question: 'Why VARA instead of DIFC?',
                answer: 'VARA is purpose-built for crypto businesses and allows us to serve both retail and institutional clients with AED on/off-ramps. DIFC is better suited for traditional finance institutions that want limited crypto exposure. For SpherePay\'s B2B payment focus, VARA gives us broader capability and faster licensing.',
                doNotSay: ['DIFC is too strict', 'We\'re avoiding traditional finance', 'Regulation doesn\'t matter']
              },
              {
                question: 'How do you comply with CBUAE stablecoin rules?',
                answer: 'CBUAE Circular 2/2024 primarily affects stablecoin issuers and retail payment services. Sphere is NOT an issuer — we use licensed third-party stablecoins. For B2B cross-border payments, USDC and USDT remain permitted. We\'re also positioned to integrate Digital Dirham when it launches.',
                doNotSay: ['Those rules don\'t apply to us', 'We ignore CBUAE', 'CBUAE can\'t regulate crypto']
              }
            ]
          },
          keyTakeaway: 'UAE has six distinct regulatory territories. For SpherePay, VARA is the primary choice (retail + B2B, AED access). For SphereNet, ADGM or DIFC for institutional infrastructure. Budget ~$650K Year 1 for VARA entity, plan 9-12 months for licensing.'
        },
        exercise: {
          title: 'Exercise 3.5 — UAE Regulatory Navigation',
          prompt: 'A UAE-based trading company asks: "We want to use Sphere for paying our suppliers in China and India. What licenses do you need and how long will it take?"\n\nWrite your response:\n1) Which territory/regulator applies\n2) What licenses Sphere holds or is obtaining\n3) Timeline expectations\n4) How their use case fits within the regulatory framework',
          criteria: ['Correct territory identification', 'Accurate license requirements', 'Realistic timeline', 'Business-appropriate framing']
        },
        quiz: [
          { q: 'Which UAE territory is best for SpherePay\'s B2B payment services?', options: ['DIFC', 'VARA', 'RAK DAO', 'DMCC'], correct: 1 },
          { q: 'VARA minimum capital for Transfer Services?', options: ['AED 100,000', 'AED 600,000-800,000', 'AED 5,000,000', 'No minimum'], correct: 1 },
          { q: 'CBUAE Circular 2/2024 restricts foreign stablecoins for:', options: ['All transactions', 'Retail payments only', 'B2B cross-border', 'Nothing'], correct: 1 },
          { q: 'Typical VARA licensing timeline?', options: ['2 weeks', '2 months', '6-12 months', '3 years'], correct: 2 },
          { q: 'Why might Sphere choose ADGM over VARA for SphereNet?', options: ['Lower costs', 'Institutional focus, English Common Law', 'No regulation needed', 'Faster licensing'], correct: 1 }
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
        { type: 'multiple_choice', question: 'Which UAE territory is recommended for SpherePay?', options: ['RAK DAO', 'DIFC', 'VARA', 'ADGM'], correct: 2 },
        { type: 'multiple_choice', question: 'CBUAE Circular 2/2024 restricts foreign stablecoins for:', options: ['All uses', 'Retail payments', 'B2B payments', 'Nothing'], correct: 1 },
        { type: 'analysis', question: 'Explain "compliance-native" to a skeptical bank compliance officer.', rubric: ['Clear definition', 'Contrast with alternatives', 'Practical examples', 'Sphere specifics'] },
        { type: 'analysis', question: 'A UAE bank asks why Sphere chose VARA over DIFC. Explain the strategic rationale.', rubric: ['Retail vs institutional focus', 'AED access', 'Crypto-native framework', 'License scope'] },
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
            'Articulate Sphere\'s competitive advantages across different competitor categories',
            'Handle specific competitor objections with confidence',
            'Position SpherePay against payment competitors',
            'Position SphereNet against infrastructure competitors',
            'Know when to acknowledge competitor strengths'
          ],
          keyConcepts: [
            'Three competitor categories: Traditional rails, Crypto-native, Fintech challengers',
            'SpherePay competes on: speed, cost, compliance, emerging market access',
            'SphereNet competes on: native compliance, credible neutrality, regulatory alignment',
            'Unique positioning: "Hard markets + compliance + stablecoin rails"',
            'Never trash competitors — acknowledge strengths, differentiate on fit'
          ]
        },
        learn: {
          introduction: 'Understanding the competitive landscape helps you position Sphere effectively. You\'ll face different competitors depending on the customer: banks compete for large enterprise, crypto-native for tech-forward fintechs, and fintech challengers for SMBs. Know all three.',
          coreQuestion: 'Why Sphere over alternatives?',
          competitorCategories: {
            title: 'Three Competitor Categories',
            categories: [
              {
                category: 'Traditional Rails',
                description: 'Legacy payment infrastructure — banks, SWIFT, correspondent networks',
                examples: ['SWIFT', 'Major banks (JPM, Citi, HSBC)', 'Moneygram', 'Western Union'],
                whenYouFaceThem: 'Enterprise deals, bank partnerships, conservative finance teams',
                theirStrength: 'Trust, regulatory relationships, existing integration',
                theirWeakness: 'Speed, cost, transparency, emerging market coverage'
              },
              {
                category: 'Crypto-Native',
                description: 'Blockchain-first companies — exchanges, DeFi, crypto payment rails',
                examples: ['Ripple', 'Stellar', 'Circle', 'Coinbase Commerce'],
                whenYouFaceThem: 'Tech-forward companies, crypto-curious treasury teams',
                theirStrength: 'Crypto expertise, developer mindshare, token ecosystems',
                theirWeakness: 'Regulatory uncertainty, fiat integration, enterprise compliance'
              },
              {
                category: 'Fintech Challengers',
                description: 'Modern payment companies — stablecoin API providers, B2B payment platforms',
                examples: ['Bridge', 'Conduit', 'BVNK', 'Airwallex', 'Wise'],
                whenYouFaceThem: 'SMB deals, fintech partnerships, developer-focused sales',
                theirStrength: 'Product polish, developer experience, specific corridor strength',
                theirWeakness: 'Geographic coverage, regulatory depth, hard market access'
              }
            ]
          },
          spherePayCompetitors: {
            title: 'SpherePay Competitive Landscape',
            subtitle: 'How SpherePay compares to payment competitors',
            comparisonTable: {
              headers: ['Attribute', 'Sphere', 'Bridge', 'Conduit', 'BVNK', 'Airwallex', 'Wise'],
              rows: [
                ['Customer Focus', 'B2B', 'B2B', 'B2B', 'B2B', 'B2B', 'B2B + Consumer'],
                ['Avg Transaction Cost', '5-50 bps', '10-50 bps', '10-50 bps', '20-75 bps', '40-100 bps', '30-100 bps'],
                ['Avg Processing Time', 'Same Day', 'Same Day', 'Same Day', '1-2 Days', '1-2 Days', '1-3 Days'],
                ['Form Factor', 'API + No-Code', 'API', 'API', 'API + Dashboard', 'API + Dashboard', 'API + Consumer App'],
                ['Target Market', 'LATAM, APAC, MENA', 'Global', 'US/EU Focus', 'EU Focus', 'APAC Focus', 'Global Consumer'],
                ['Stablecoin Native', 'Yes', 'Yes', 'Yes', 'Partial', 'No', 'No'],
                ['Hard Market Access', 'Strong', 'Limited', 'Limited', 'Limited', 'Moderate', 'Moderate']
              ]
            },
            keyDifferentiators: {
              title: 'SpherePay Key Differentiators',
              differentiators: [
                {
                  differentiator: 'Hard Market Access',
                  explanation: 'Sphere operates in corridors others won\'t touch — Nigeria, Pakistan, frontier LATAM. "Being small is the advantage — these operators don\'t want to go live in Libya. We will."',
                  proof: '18 jurisdictions including challenging emerging markets',
                  vsCompetitors: 'Bridge and Conduit focus on US/EU. BVNK is EU-centric. Airwallex is APAC but not frontier.'
                },
                {
                  differentiator: 'Compliance-Native Architecture',
                  explanation: 'Compliance built into product design from day one, not bolted on. Pre-settlement screening, not post-settlement review.',
                  proof: 'SOC 2 Type II, ISO 27001, 27 regulated entities across 18 jurisdictions',
                  vsCompetitors: 'Many stablecoin API providers have unclear or minimal compliance posture. Sphere leads with licenses.'
                },
                {
                  differentiator: 'Multi-Stablecoin Strategy',
                  explanation: 'Not locked into one stablecoin. USDC for regulated corridors, USDT for Asian liquidity, flexibility for future issuers.',
                  proof: 'Integrated with Circle, Tether, positioned for USDG, Digital Dirham',
                  vsCompetitors: 'Bridge is Circle-focused. Others may have single-issuer dependencies.'
                },
                {
                  differentiator: 'SphereNet Future',
                  explanation: 'SpherePay customers get access to SphereNet infrastructure — a path to even lower costs and native compliance.',
                  proof: 'SphereNet mainnet planned 2025',
                  vsCompetitors: 'No other stablecoin API provider is building their own settlement infrastructure.'
                }
              ]
            },
            headToHead: {
              title: 'Head-to-Head Comparisons',
              comparisons: [
                {
                  competitor: 'Bridge (acquired by Stripe for $1.1B)',
                  theirPitch: 'Stablecoin APIs for internet businesses. Strong developer experience.',
                  sphereAdvantage: 'Hard market access (Bridge is US/EU focused), multi-stablecoin flexibility, SphereNet infrastructure path',
                  sphereDisadvantage: 'Bridge has Stripe distribution and brand. Developer docs may be more polished.',
                  whenSphereWins: 'Customer needs emerging market corridors, regulatory sophistication, or SphereNet future',
                  whenBridgeWins: 'Customer is US/EU focused, wants Stripe ecosystem integration'
                },
                {
                  competitor: 'Conduit',
                  theirPitch: 'Stablecoin payment rails for fintechs. Clean API.',
                  sphereAdvantage: 'Broader geographic coverage, deeper compliance infrastructure, institutional focus',
                  sphereDisadvantage: 'Conduit may have simpler integration for basic use cases',
                  whenSphereWins: 'Customer needs multi-region support, compliance depth, hard markets',
                  whenConduitWins: 'Customer has simple US/EU corridor needs, wants fastest integration'
                },
                {
                  competitor: 'BVNK',
                  theirPitch: 'European stablecoin payment infrastructure. Strong in EU corridors.',
                  sphereAdvantage: 'Emerging market strength, non-EU focus, SphereNet infrastructure',
                  sphereDisadvantage: 'BVNK has deeper EU banking relationships',
                  whenSphereWins: 'Customer needs LATAM, MENA, APAC corridors',
                  whenBVNKWins: 'Customer is EU-centric, needs deep EU banking integration'
                },
                {
                  competitor: 'Wise (TransferWise)',
                  theirPitch: 'Transparent international transfers. Strong consumer brand.',
                  sphereAdvantage: 'Same-day vs multi-day, lower cost for B2B, stablecoin native',
                  sphereDisadvantage: 'Wise has massive brand recognition, consumer trust',
                  whenSphereWins: 'Customer is B2B focused, needs speed, wants API integration',
                  whenWiseWins: 'Customer wants consumer-facing product, brand trust matters more than speed'
                },
                {
                  competitor: 'Airwallex',
                  theirPitch: 'Global business accounts and payments. Strong in APAC.',
                  sphereAdvantage: 'Faster settlement, stablecoin-native, hard market access',
                  sphereDisadvantage: 'Airwallex has broader product suite (cards, accounts, FX)',
                  whenSphereWins: 'Customer\'s primary need is cross-border payments speed, emerging markets',
                  whenAirwallexWins: 'Customer wants full-stack treasury solution, not just payments'
                }
              ]
            }
          },
          sphereNetCompetitors: {
            title: 'SphereNet Competitive Landscape',
            subtitle: 'How SphereNet compares to infrastructure competitors',
            comparisonTable: {
              headers: ['Attribute', 'SphereNet', 'Ripple', 'Stellar', 'SWIFT', '1money', 'Codex'],
              rows: [
                ['Native Compliance', 'Yes', 'Partial', 'No', 'No', 'Partial', 'No'],
                ['Credibly Neutral', 'Yes', 'No (XRP token)', 'Partial', 'Yes', 'No', 'No'],
                ['Target Clients', 'Fintechs + Banks', 'Banks', 'NGOs + Remittance', 'Banks', 'Banks', 'Crypto-native'],
                ['DeFi Compatible', 'Yes', 'Limited', 'Yes', 'No', 'No', 'Yes'],
                ['Form Factor', 'API + No-Code', 'API', 'API', 'Messaging', 'API', 'API'],
                ['Avg Transaction Cost', '5-50 bps', '10-50 bps', '1-10 bps', '~6%', 'Unknown', '10-50 bps'],
                ['Avg Processing Time', 'Same Day', 'Same Day', 'Same Day', '2-5 Days', 'Same Day', 'Same Day'],
                ['Target Market', 'LATAM, APAC, MENA', 'Global Banks', 'Developing Markets', 'Global', 'Enterprise', 'Crypto']
              ]
            },
            keyDifferentiators: {
              title: 'SphereNet Key Differentiators',
              differentiators: [
                {
                  differentiator: 'Native Compliance',
                  explanation: 'Compliance embedded at protocol level — not application layer. Policy enforcement BEFORE settlement.',
                  vsCompetitors: 'Ripple and Stellar rely on application-level compliance. SWIFT has no on-chain compliance. SphereNet is the only blockchain built FOR regulators.'
                },
                {
                  differentiator: 'Credibly Neutral',
                  explanation: 'No native token that creates misaligned incentives. SphereNet is infrastructure, not a token ecosystem.',
                  vsCompetitors: 'Ripple pushes XRP adoption (creates conflicts). Stellar has XLM. SphereNet is token-agnostic settlement infrastructure.'
                },
                {
                  differentiator: 'SpherePay Distribution',
                  explanation: 'SphereNet launches with $2.5B+ in existing payment volume from SpherePay customers. No cold-start problem.',
                  vsCompetitors: 'New blockchain infrastructure typically struggles with chicken-and-egg. SphereNet inherits SpherePay\'s customer base.'
                },
                {
                  differentiator: 'Privacy-Preserving Verification',
                  explanation: 'Zero-knowledge proofs enable compliance verification without exposing transaction data.',
                  vsCompetitors: 'Most blockchains are fully transparent (privacy problem) or fully private (compliance problem). SphereNet achieves both.'
                }
              ]
            },
            headToHead: {
              title: 'Head-to-Head: Infrastructure Competitors',
              comparisons: [
                {
                  competitor: 'Ripple (RippleNet/ODL)',
                  theirPitch: 'Blockchain payments for banks. XRP as bridge currency.',
                  sphereAdvantage: 'No token dependency, native compliance, credibly neutral',
                  sphereDisadvantage: 'Ripple has existing bank relationships, longer track record',
                  whenSphereWins: 'Bank wants compliance-native infrastructure without XRP exposure',
                  whenRippleWins: 'Bank already has Ripple relationship, comfortable with XRP'
                },
                {
                  competitor: 'Stellar',
                  theirPitch: 'Open network for financial inclusion. Strong in remittances.',
                  sphereAdvantage: 'Native compliance (Stellar has none), institutional focus, privacy features',
                  sphereDisadvantage: 'Stellar has strong NGO/remittance network, lower fees',
                  whenSphereWins: 'Customer needs regulatory compliance, institutional-grade infrastructure',
                  whenStellarWins: 'Customer is remittance-focused, compliance less critical'
                },
                {
                  competitor: 'SWIFT (gpi, ISO 20022)',
                  theirPitch: 'Trusted messaging network for banks. Modernizing with gpi.',
                  sphereAdvantage: 'Same-day vs multi-day, transparent pricing, 24/7 operation',
                  sphereDisadvantage: 'SWIFT has universal bank adoption, 50+ year trust',
                  whenSphereWins: 'Customer needs speed and transparency that SWIFT can\'t provide',
                  whenSWIFTWins: 'Customer is large bank with existing SWIFT infrastructure, change is costly',
                  note: 'Sphere positions as COMPLEMENT to SWIFT, not replacement. "We handle the corridors SWIFT struggles with."'
                }
              ]
            }
          },
          vsTraditionalBanks: {
            title: 'vs Traditional Banks (Detailed)',
            subtitle: 'When you\'re competing against "just use our bank"',
            comparisonTable: {
              headers: ['Dimension', 'Traditional Bank Wire', 'Sphere'],
              rows: [
                ['Settlement Time', '2-5 business days', '15-30 minutes (median)'],
                ['Cost', '~6% all-in (fees + FX spread)', '<1% typical'],
                ['Transparency', 'Black box — can\'t see correspondent chain', 'Real-time tracking, blockchain proof'],
                ['Operating Hours', 'Banking hours only (cut-off times)', '24/7/365'],
                ['Weekend/Holiday', 'No processing', 'Full operation'],
                ['Correspondent Chain', '3-5 hops typical', 'Direct stablecoin transfer'],
                ['Error Recovery', 'Days to weeks', 'Same day'],
                ['Reporting', 'Monthly statements', 'Real-time API'],
                ['FX Execution', 'Bank sets rate (opaque)', 'Competitive market rates']
              ]
            },
            objectionHandling: {
              title: 'Common Bank Objections',
              objections: [
                {
                  objection: '"We already have international wire capability."',
                  response: 'Absolutely — and for many transactions, bank wires work fine. Sphere is for the transactions where 2-5 days isn\'t acceptable, where 6% cost matters, or where you need payment confirmation before the weekend. We complement your existing banking relationships.',
                  keyPoint: 'Position as complement, not replacement'
                },
                {
                  objection: '"Our bank has relationships our suppliers trust."',
                  response: 'Trust is critical. That\'s why Sphere works WITH your existing bank. You deposit USD with your bank, we handle the cross-border movement, your supplier receives local currency from a licensed local partner. The bank relationship stays intact.',
                  keyPoint: 'Show how banking relationships are preserved'
                },
                {
                  objection: '"We can\'t use crypto — our CFO won\'t approve it."',
                  response: 'I understand. Let me clarify what we actually do: your team sends USD, your supplier receives pesos. The stablecoin is invisible infrastructure — like how you don\'t think about SWIFT message formats. Your finance team sees USD out, pesos in, faster and cheaper than wire.',
                  keyPoint: 'Reframe: stablecoin is plumbing, not product'
                }
              ]
            }
          },
          vsCryptoNative: {
            title: 'vs Crypto-Native (Detailed)',
            subtitle: 'When you\'re competing against exchanges and DeFi',
            comparisonTable: {
              headers: ['Dimension', 'Crypto-Native (Exchange/DeFi)', 'Sphere'],
              rows: [
                ['Target Customer', 'Retail, traders, DeFi users', 'Enterprise B2B'],
                ['Compliance', 'Minimal or unclear', 'SOC 2, ISO 27001, MSB licensed'],
                ['Fiat Integration', 'On-ramp focused', 'Full on/off-ramp, banking integration'],
                ['Customer Support', 'Ticket-based, slow', 'Dedicated account management'],
                ['Regulatory Status', 'Often unclear', '27 entities, 18 jurisdictions'],
                ['API Design', 'Crypto-native (wallets, gas)', 'Finance-native (invoices, reconciliation)'],
                ['Counterparty Risk', 'DeFi smart contract risk', 'Licensed MSB, segregated funds']
              ]
            },
            objectionHandling: {
              title: 'Common Crypto-Native Objections',
              objections: [
                {
                  objection: '"We can just use Coinbase/Kraken for this."',
                  response: 'Exchanges are great for trading and on-ramping. Sphere is built for B2B payment operations — API integration with your ERP, reconciliation support, dedicated compliance, same-day settlement to fiat. Different use case.',
                  keyPoint: 'Differentiate trading infrastructure from payment infrastructure'
                },
                {
                  objection: '"DeFi is cheaper and faster."',
                  response: 'DeFi is incredibly innovative. For enterprise treasury, though, you need audit trails, compliance documentation, counterparty verification, and fiat settlement. Sphere gives you DeFi speed with enterprise compliance.',
                  keyPoint: 'Acknowledge DeFi innovation, differentiate on enterprise needs'
                },
                {
                  objection: '"Why not just hold stablecoins ourselves?"',
                  response: 'You can — and some of our customers do. Sphere adds value when you need licensed fiat on/off-ramps, compliance infrastructure, multi-currency support, and operational tooling. We\'re infrastructure, not a requirement to hold stablecoins.',
                  keyPoint: 'Position as infrastructure provider, not gatekeeper'
                }
              ]
            }
          },
          positioningFramework: {
            title: 'Positioning Framework',
            subtitle: 'How to position Sphere depending on the audience',
            audiences: [
              {
                audience: 'Traditional Finance (Banks, Corporates)',
                leadWith: 'Licensed payment infrastructure, regulatory compliance, risk management',
                avoid: 'Crypto jargon, decentralization talk, token mentions',
                keyMessage: '"We\'re a licensed MSB that uses modern settlement rails to move your payments faster and cheaper."',
                proof: 'SOC 2, ISO 27001, FinCEN registration, state licenses'
              },
              {
                audience: 'Tech-Forward Fintechs',
                leadWith: 'API-first, developer experience, same-day settlement',
                avoid: 'Over-emphasizing compliance (they assume it), slow enterprise sales process',
                keyMessage: '"One API for global payments. Same-day settlement. We handle compliance so you don\'t have to."',
                proof: 'API docs, integration speed, customer logos'
              },
              {
                audience: 'Crypto-Native Companies',
                leadWith: 'Multi-stablecoin support, fiat rails, compliance-as-a-feature',
                avoid: 'Anti-crypto framing, over-emphasizing "we\'re not crypto"',
                keyMessage: '"We bridge stablecoins to fiat rails with proper licensing. Use whatever stablecoin you want — we handle the last mile."',
                proof: 'Stablecoin partnerships, fiat corridor coverage'
              },
              {
                audience: 'Regulators / Central Banks',
                leadWith: 'Compliance-native architecture, transparency, regulatory alignment',
                avoid: 'Speed and cost focus (they don\'t care), dismissing regulatory concerns',
                keyMessage: '"We\'re building payment infrastructure that gives regulators BETTER visibility than traditional systems — through proper channels."',
                proof: 'SphereNet architecture, multi-jurisdictional licensing'
              }
            ]
          },
          whenToWalkAway: {
            title: 'When Sphere Isn\'t the Right Fit',
            subtitle: 'Knowing when to walk away builds credibility',
            scenarios: [
              {
                scenario: 'Customer only needs domestic US payments',
                whyNot: 'ACH and Fedwire are fast, cheap, and reliable for domestic. Sphere\'s value is cross-border.',
                whatToSay: '"For domestic US, your existing bank or a solution like Plaid/Dwolla is probably better suited. Sphere shines when you need to move money across borders."'
              },
              {
                scenario: 'Customer wants full-stack treasury (cards, accounts, FX)',
                whyNot: 'Sphere is focused on cross-border payments, not full treasury management.',
                whatToSay: '"If you need cards, multi-currency accounts, and full treasury — Airwallex or Mercury might be better. We can complement them for your cross-border payment needs."'
              },
              {
                scenario: 'Customer has <$100K monthly cross-border volume',
                whyNot: 'Sphere\'s value proposition scales with volume. Low volume = Wise might be simpler.',
                whatToSay: '"At your current volume, Wise or your bank might be simpler. When you scale up and need API integration, same-day settlement, or emerging market access — come back to us."'
              },
              {
                scenario: 'Customer wants to hold crypto as investment',
                whyNot: 'Sphere is payment infrastructure, not an exchange or custody solution.',
                whatToSay: '"We\'re payment infrastructure, not an exchange. For holding crypto, Coinbase or Anchorage is better suited. If you need to USE stablecoins for payments — that\'s us."'
              }
            ]
          },
          keyTakeaway: 'Position Sphere based on audience: compliance-first for traditional finance, speed-first for fintechs, fiat-rails for crypto-native. Know when competitors win and when to walk away — credibility comes from honesty.'
        },
        exercise: {
          title: 'Exercise 5.4 — Competitive Positioning',
          prompt: 'You\'re in a deal and the prospect says: "We\'re also talking to Bridge and Wise. Why should we choose Sphere?"\n\nWrite your response:\n1) Acknowledge competitor strengths (don\'t trash them)\n2) Differentiate on specific dimensions\n3) Identify what would make Sphere the right vs wrong choice\n4) Ask a qualifying question to understand their needs',
          criteria: ['Acknowledges competitor strengths', 'Clear differentiation', 'Honest about fit', 'Qualifying question included']
        },
        quiz: [
          { q: 'Sphere\'s primary advantage vs Bridge:', options: ['Lower price', 'Hard market access', 'Better branding', 'More tokens'], correct: 1 },
          { q: 'When does Wise win over Sphere?', options: ['Never', 'Consumer-focused, brand trust matters', 'Always faster', 'Lower cost'], correct: 1 },
          { q: 'SphereNet\'s advantage vs Ripple:', options: ['More banks', 'Native compliance, no token dependency', 'Faster settlement', 'Lower cost'], correct: 1 },
          { q: 'For traditional finance audience, lead with:', options: ['Crypto innovation', 'Licensed MSB, compliance', 'DeFi integration', 'Token economics'], correct: 1 },
          { q: 'When should you walk away from a deal?', options: ['Never', 'Customer only needs domestic US payments', 'Customer wants fast payments', 'Customer is a fintech'], correct: 1 }
        ]
      },
      {
        id: 'use-cases',
        title: '5.5 Use Cases',
        curriculum: {
          objectives: [
            'Articulate key use cases with compelling stories',
            'Tell the Bob and Ahmed story effectively',
            'Explain top-down AND bottom-up adoption approach',
            'Match use cases to specific customer needs'
          ],
          keyConcepts: [
            'Cross-border B2B payments',
            'The "one-third of human time" problem',
            'Top-down (regulators) + bottom-up (end users) adoption',
            'Real stories > feature lists'
          ]
        },
        learn: {
          introduction: 'Concrete use cases make Sphere real for prospects. But more importantly, STORIES make Sphere memorable. The Bob and Ahmed story is Sphere\'s signature narrative — learn to tell it well.',
          coreQuestion: 'What do customers use Sphere for, and why does it matter?',
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
            title: 'The Bob and Ahmed Story',
            subtitle: 'Arnold\'s signature narrative — learn to tell it well',
            speaker: 'Arnold Lee, CEO',
            context: 'This story comes from Arnold\'s conference presentations and captures why Sphere exists. It\'s not just a use case — it\'s the human reality behind cross-border payments.',
            setup: {
              title: 'The Setup: Two People, One Problem',
              bob: {
                name: 'Bob',
                age: 35,
                location: 'Texas, USA',
                business: 'Ships machinery — tractors, harvesters, agricultural equipment',
                situation: 'Bob is US-based. He\'s used to taking payments in USD. He has a credit score, a verifiable employment history, and critically — if things go horribly wrong, Bob can use the court system.'
              },
              ahmed: {
                name: 'Ahmed',
                age: 'Mid-40s',
                location: 'A town a couple hours north of Lagos, Nigeria',
                business: 'Agricultural production — employs thousands of people locally to farm wheat and other crops',
                situation: 'Ahmed doesn\'t have machinery natively available in his region. He needs to import tractors and harvesters from the US to support his operations and the thousands of people who depend on him for employment.'
              }
            },
            theProblem: {
              title: 'The Problem: SWIFT Wire Reality',
              description: 'Ahmed needs to send a SWIFT wire to Bob to pay for a shipment of machinery.',
              timeline: {
                stated: 'T+2 to T+5 (what banks tell you)',
                reality: 'T+3 to T+10 (what actually happens)',
                arnoldQuote: '"The beautiful — or terrifying — part depending on your perspective is that no one actually knows how long it will actually take."'
              },
              whyItTakesLong: [
                'Local government needs to consider capital controls',
                'Documentation requirements to prove the transaction is compliant',
                'Multiple correspondent banks each with their own compliance review',
                'Cut-off times that don\'t align across time zones',
                'Weekend and holiday delays'
              ]
            },
            theRealCost: {
              title: 'The Real Cost: It\'s Not Just Time',
              costs: [
                {
                  cost: 'Port Fees',
                  explanation: 'Every single day that Ahmed waits for the ship to clear at the port, clear customs, and unload the machinery — he has to pay additional fees. Port storage fees. Demurrage charges. These add up fast.'
                },
                {
                  cost: 'Personnel Costs',
                  explanation: 'Ahmed has people waiting — workers ready to operate the machinery, logistics staff coordinating delivery. They\'re on the clock while the payment clears.'
                },
                {
                  cost: 'Opportunity Cost',
                  explanation: 'Every day of delay is a day Ahmed\'s farm isn\'t operating at full capacity. Harvest windows are tight. Weather doesn\'t wait for SWIFT wires.'
                },
                {
                  cost: 'Error Recovery',
                  explanation: 'If the order was wrong — wrong number of units, missing components, damaged equipment — they have to restart the ENTIRE payment process. That\'s another T+3 to T+10.'
                }
              ]
            },
            theKicker: {
              title: 'The Kicker: Technology Alone Doesn\'t Solve This',
              arnoldQuote: '"You\'re probably thinking — oh, stablecoins and blockchain solve this. I regret to inform you that they do not entirely."',
              explanation: 'The hard part isn\'t the technology. The hard part is:',
              realObstacles: [
                {
                  obstacle: 'Ahmed Has Other Priorities',
                  detail: 'He\'s worried about making the harvest. He\'s worried about paying his employees. He\'s not going to go out of his way to figure out how to hire a Rust developer or a Solidity developer.'
                },
                {
                  obstacle: 'Banking Relationships',
                  detail: 'Ahmed has to explain to his bank how this transaction is compliant. Is the funds flow legitimate? Banks are cautious with anything that looks like crypto.'
                },
                {
                  obstacle: 'Education and Onboarding',
                  detail: 'The onboarding and education obstacles are some of the hardest parts of getting Ahmed to use technology that will actually improve his life.'
                }
              ]
            },
            theApproach: {
              title: 'Sphere\'s Approach: Top-Down AND Bottom-Up',
              introduction: 'There are two approaches to adoption. You need BOTH.',
              bottomUp: {
                name: 'Bottom-Up Approach',
                description: 'Go to people like Ahmed. Walk them through how the technology works. Help them understand the benefits.',
                challenge: 'This is really hard to scale. One customer at a time.',
                sphereExperience: 'This is what we\'ve spent the last several years doing — living in emerging markets, having conversation after conversation, understanding the mechanics of why stablecoins are useful to someone shipping things overseas.'
              },
              topDown: {
                name: 'Top-Down Approach',
                description: 'Educate the government. Explain to the central bank and local banks how this technology makes auditability of transactions easier. Show how the verifiability of Ahmed as a counterparty improves.',
                challenge: 'This is a very long and often arduous effort. Regulators move slowly.',
                sphereExperience: 'Some of our efforts at the sovereign level have been working with central banks to demonstrate how embedded compliance on-chain actually HELPS regulatory oversight.'
              },
              truth: {
                title: 'The Truth',
                arnoldQuote: '"The beautiful — or terrifying — truth is you kind of have to do both. You kind of have to both go to the local importers of goods in Nigeria as well as go to the local government to make sure everything goes through properly."'
              }
            },
            oneThirdStatistic: {
              title: 'The One-Third Statistic',
              stat: 'One-third of all human time is spent waiting.',
              context: 'Waiting for weekends. Waiting for holidays. Waiting for banking hours. Waiting for cut-off times. Waiting for correspondent banks to process.',
              implication: 'The benefits that could accrue to people like Ahmed are exponential, not linear. Faster payments don\'t just save time — they unlock economic activity that was previously impossible.',
              arnoldQuote: '"One-third of all human time is spent waiting for a weekend, for things to clear, for holidays. And the truth is that these benefits that could accrue to people like Ahmed are exponential and not linear."'
            },
            howToTellThisStory: {
              title: 'How to Tell This Story',
              tips: [
                'Start with the people, not the technology. Bob and Ahmed are real archetypes.',
                'Make the pain tangible — port fees, personnel costs, harvest windows.',
                'Acknowledge that technology alone doesn\'t solve it. This builds credibility.',
                'Explain the dual approach — bottom-up AND top-down.',
                'End with the "one-third" statistic. It\'s memorable and quantifies the opportunity.',
                'Don\'t oversell. "Stablecoins don\'t entirely solve this" is more credible than "blockchain fixes everything."'
              ],
              whenToUse: [
                'Opening a presentation to set emotional context',
                'When prospects ask "who uses this?"',
                'When explaining why Sphere focuses on emerging markets',
                'When differentiating from competitors who only focus on tech'
              ]
            }
          },
          sphereCustomerProfiles: {
            title: 'Sphere Customer Profiles',
            subtitle: 'Based on actual customer segments (from pitch deck)',
            profiles: [
              {
                segment: 'Emerging Market Businesses (Ahmed\'s World)',
                description: 'Businesses in Latin America importing raw materials from Asia, processing in LATAM, exporting to US/Europe.',
                need: 'High-velocity USD payments to avoid intraday FX risk.',
                example: 'Brazilian manufacturer sourcing components from China, selling finished goods to US retailers.',
                whySphere: 'Same-day settlement eliminates FX exposure window. No more trapped capital waiting for SWIFT.'
              },
              {
                segment: 'US Companies Serving Emerging Markets',
                description: 'American businesses that need to engage with emerging market participants who face challenges accessing USD or banking services.',
                need: 'Reliable payment rails to suppliers/partners in challenging jurisdictions.',
                example: 'Texas equipment dealer (Bob) selling to agricultural operations across Africa.',
                whySphere: 'Sphere handles compliance, banking relationships, and local currency conversion.'
              },
              {
                segment: 'Traditional SaaS Companies',
                description: 'Software companies seeking on/off-ramp USD to facilitate treasury management, international payroll, and financial operations.',
                need: 'Global payroll, vendor payments, treasury optimization.',
                example: 'Remote-first startup with contractors in 15 countries.',
                whySphere: 'Single API for global payments. No need to set up banking in each country.'
              }
            ]
          },
          geographicFocus: {
            title: 'Geographic Focus',
            sending: {
              title: 'Where Money Comes From (Sending)',
              countries: [
                { country: 'United States', percentage: '38.6%' },
                { country: 'Panama', percentage: '11.8%' },
                { country: 'Chile', percentage: '14.4%' },
                { country: 'Colombia', percentage: '12.2%' },
                { country: 'Mexico', percentage: '6.7%' },
                { country: 'Others', percentage: 'Costa Rica, Hong Kong, UK' }
              ]
            },
            receiving: {
              title: 'Where Money Goes (Receiving)',
              countries: [
                { country: 'United States', percentage: '20.5%' },
                { country: 'Panama', percentage: '17.1%' },
                { country: 'Mexico', percentage: '14.2%' },
                { country: 'China', percentage: '11.2%' },
                { country: 'Hong Kong', percentage: '9.2%' },
                { country: 'Chile', percentage: '6.8%' },
                { country: 'Others', percentage: 'Brazil, Colombia, Costa Rica' }
              ]
            },
            insight: 'Heavy LATAM concentration reflects Sphere\'s early market focus. UAE engagement expands reach into MENA, Africa, and South Asia corridors.'
          },
          keyTakeaway: 'Stories beat features. Bob and Ahmed illustrates the human reality behind cross-border payments. One-third of human time is spent waiting — that\'s the opportunity Sphere addresses.'
        },
        exercise: {
          title: 'Exercise 5.5 — Tell the Bob and Ahmed Story',
          prompt: 'You have 3 minutes to tell the Bob and Ahmed story to a UAE bank executive. Write out your narrative:\n\n1) Introduce Bob and Ahmed (make them real)\n2) Explain the SWIFT wire problem (be specific about costs)\n3) Acknowledge that technology alone doesn\'t solve it\n4) Explain the top-down AND bottom-up approach\n5) End with the "one-third" statistic\n\nMake it compelling. Make it human. Make it memorable.',
          criteria: ['Characters feel real', 'Pain is tangible', 'Technology humility', 'Dual approach explained', 'One-third statistic included', 'Memorable delivery']
        },
        quiz: [
          { q: 'What does Bob ship?', options: ['Electronics', 'Machinery (tractors, harvesters)', 'Clothing', 'Food'], correct: 1 },
          { q: 'Where is Ahmed located?', options: ['Lagos city center', 'A town north of Lagos', 'Nairobi', 'Cairo'], correct: 1 },
          { q: 'What fraction of human time is spent waiting?', options: ['One-tenth', 'One-quarter', 'One-third', 'One-half'], correct: 2 },
          { q: 'Sphere\'s adoption approach is:', options: ['Top-down only', 'Bottom-up only', 'Top-down AND bottom-up', 'Neither'], correct: 2 },
          { q: 'According to Arnold, stablecoins:', options: ['Solve everything', 'Don\'t entirely solve the problem', 'Make things worse', 'Are irrelevant'], correct: 1 }
        ]
      },
      {
        id: 'spherenet-infrastructure',
        title: '5.6 SphereNet: Infrastructure for Regulated Finance',
        curriculum: {
          objectives: [
            'Explain what SphereNet is and why it exists',
            'Articulate the three core technical principles',
            'Understand multi-dimensional transaction coloring',
            'Explain control levers across the transaction lifecycle',
            'Describe proof-driven attestations and their economic value',
            'Position SphereNet vs SpherePay in the product suite'
          ],
          keyConcepts: [
            'SphereNet = purpose-built L1 blockchain for regulated finance',
            'Three principles: Compliance-native, Privacy-preserving, Verified ecosystem',
            'Multi-dimensional coloring: jurisdiction, entity type, risk class, policy state, asset class',
            'Five control levers: ingress, policy evaluation, execution, propagation, settlement',
            'Proof-driven attestations as reusable economic artifacts',
            '"Modern-day SWIFT" positioning'
          ]
        },
        learn: {
          introduction: 'SpherePay is Sphere\'s live product — processing $3B+ annually. SphereNet is Sphere\'s future operating system for regulated finance. Understanding both is essential because they work together: SpherePay builds distribution, SphereNet provides the infrastructure layer.',
          coreQuestion: 'What is SphereNet and why does regulated finance need a purpose-built blockchain?',
          whatIsSphereNet: {
            title: 'What Is SphereNet?',
            definition: 'SphereNet is a purpose-built Layer 1 blockchain designed specifically for regulated cross-border payments and financial infrastructure.',
            notJustAnotherBlockchain: {
              title: 'Why Not Just Use Solana/Ethereum?',
              problem: 'Traditional blockchains are designed for openness and composability — not regulatory enforceability. They optimize for permissionless access, which is fundamentally at odds with what regulated finance requires.',
              gap: [
                'No native jurisdiction awareness — validators can\'t enforce local rules',
                'Privacy vs. auditability tradeoff — full transparency OR privacy, not both',
                'Reactive compliance — screening happens AFTER settlement, not before',
                'External controls — compliance systems are separate from transaction processing'
              ],
              solution: 'SphereNet is built from the ground up with compliance embedded at the protocol level. It\'s not a compliance layer on top of a blockchain — it\'s a blockchain where compliance IS the architecture.'
            },
            positioning: {
              tagline: '"Modern-day SWIFT"',
              explanation: 'SWIFT is a messaging network that coordinates correspondent banking. SphereNet is a settlement network that unifies liquidity across blockchains, banks, wallets, and markets — with compliance built in.',
              comparison: {
                headers: ['Attribute', 'SWIFT', 'SphereNet'],
                rows: [
                  ['Type', 'Messaging network', 'Settlement network'],
                  ['Settlement', 'T+2 to T+5 (via correspondents)', 'Minutes (direct)'],
                  ['Compliance', 'At each correspondent hop', 'Embedded in protocol'],
                  ['Visibility', 'Opaque (can\'t see correspondent chain)', 'Transparent (blockchain record)'],
                  ['Operating Hours', 'Business hours only', '24/7/365'],
                  ['Liquidity', 'Trapped in nostro accounts', 'Unified across network']
                ]
              }
            },
            timeline: {
              title: 'SphereNet Timeline',
              milestones: [
                { phase: '2024', status: 'Completed', description: 'Find product-market fit with SpherePay, prove distribution (150+ businesses, $1B+ captured)' },
                { phase: '2025 MVP', status: 'In Progress', description: 'Ideate/design/implement SphereNet v0: confidential transfers, transferable zkSNARKs, M^0 stablecoin integration, initial account classification, API/RPC design' },
                { phase: '2025 Mainnet', status: 'Planned', description: 'Deploy SphereNet v1: multi-party extraction proofs, expanded stablecoins (USDG, USDC/T), subclusters for custom AML policies, RFQ/LO auctions & AMM' },
                { phase: '2026+', status: 'Vision', description: 'SphereNet becomes default settlement layer for regulated cross-border finance' }
              ]
            }
          },
          hyperliquidPlaybook: {
            title: 'The "Hyperliquid" Playbook',
            subtitle: 'How SpherePay distribution solves SphereNet\'s cold-start problem',
            strategy: {
              problem: 'New blockchains face a cold-start problem: no users means no liquidity, no liquidity means no users.',
              solution: 'Sphere uses SpherePay distribution to bootstrap SphereNet adoption.',
              steps: [
                { step: 1, action: 'Build SpherePay', result: 'Live product with 150+ businesses, $2.5B+ annualized volume' },
                { step: 2, action: 'Accumulate data', result: 'Year of transaction data, customer behavior, corridor patterns' },
                { step: 3, action: 'Launch SphereNet', result: 'Migrate SpherePay customers to SphereNet without requiring direct integration' },
                { step: 4, action: 'Expand ecosystem', result: 'Other fintechs join SphereNet to access the liquidity and compliance infrastructure' }
              ],
              keyInsight: 'SpherePay is the wedge. SphereNet is the platform. Drive adoption via 10,000x product experience improvement, not token speculation.'
            }
          },
          threeCorePrinciples: {
            title: 'Three Core Technical Principles',
            subtitle: 'What makes SphereNet different from every other blockchain',
            principles: [
              {
                number: 1,
                name: 'Multi-Dimensional Transaction Coloring',
                icon: '🎨',
                concept: 'Every account and transaction is annotated across multiple dimensions, producing a multi-dimensional labeled graph — not a single risk score.',
                dimensions: [
                  { dimension: 'Jurisdiction', examples: 'UAE, US, EU, Singapore, etc.' },
                  { dimension: 'Entity Type', examples: 'Individual, Corporation, MSB, Bank, Government' },
                  { dimension: 'Risk Class', examples: 'Low, Medium, High, Prohibited' },
                  { dimension: 'Policy State', examples: 'KYC\'d, Sanctions-cleared, Travel Rule compliant' },
                  { dimension: 'Asset Class', examples: 'Stablecoin, Security token, Commodity token' }
                ],
                whyItMatters: {
                  title: 'Why This Matters',
                  benefits: [
                    'Regulators can observe subnetwork views, projections, and heatmaps along the dimensions THEY care about',
                    'Enables policy-relevant visibility WITHOUT requiring data extraction',
                    'In escalated cases, selective extraction occurs only via valid legal process (subpoena, FIU signing, jurisdiction-specific authority)',
                    'Strictly more expressive — and safer — than post-hoc analytics or monolithic risk scoring'
                  ]
                },
                example: 'A UAE regulator can see all UAE-jurisdictional transactions involving high-risk entity types — without seeing transaction amounts, counterparty identities, or details of transactions in other jurisdictions. They see what they NEED to see, nothing more.'
              },
              {
                number: 2,
                name: 'Control Levers Across Transaction Lifecycle',
                icon: '🎛️',
                concept: 'Explicit control and observation points at every stage of a transaction — not just at settlement.',
                levers: [
                  {
                    lever: 'Transaction Ingress',
                    stage: 'Before processing',
                    controls: 'Client-side construction, preflight checks, signature validity, initial metadata/attestation attachment',
                    example: 'Transaction rejected at ingress if sender wallet is on sanctions list — never even enters the system'
                  },
                  {
                    lever: 'Policy Evaluation',
                    stage: 'Pre-execution',
                    controls: 'Deterministic checks over transaction context, accounts, and attestations — enforced at RPC, validator ingress, or pre-execution runtime',
                    example: 'Transaction flagged if it exceeds jurisdiction-specific exposure limits — held for review before execution'
                  },
                  {
                    lever: 'Execution / Ordering',
                    stage: 'During processing',
                    controls: 'Parallel execution with ordering constraints derived from account locks and dependencies — enforcement point for asset and counterparty constraints',
                    example: 'Transaction ordering ensures that compliance-dependent transactions settle in correct sequence'
                  },
                  {
                    lever: 'Propagation (Gossip)',
                    stage: 'Network distribution',
                    controls: 'Validator-to-validator dissemination with future-state controls: selective visibility, jurisdiction-aware propagation, policy-informed mempool behavior',
                    example: 'Transaction involving UAE parties only propagates to UAE-authorized validators — geographic containment'
                  },
                  {
                    lever: 'Settlement and Finality',
                    stage: 'Completion',
                    controls: 'State commitment and finalization, producing authoritative artifacts for audit, regulatory reporting, and dispute resolution',
                    example: 'Settlement produces cryptographic proof of compliance that can be provided to regulators on demand'
                  }
                ],
                keyInsight: 'Controls are layered, contextual, and composable — applied where they are cheapest, safest, and most legible. This is the opposite of "spray compliance everywhere" — it\'s surgical, efficient enforcement.'
              },
              {
                number: 3,
                name: 'Proof-Driven Attestations',
                icon: '📜',
                concept: 'A robust proof system enables attestation trees across identity, jurisdiction, policy compliance, and asset provenance. These attestations are REUSABLE ECONOMIC ARTIFACTS, not one-off checks.',
                attestationTypes: [
                  { type: 'Identity & Entity Status', example: 'Proof that wallet owner passed KYC with a licensed provider' },
                  { type: 'Jurisdictional Eligibility', example: 'Proof that entity is authorized to transact in UAE' },
                  { type: 'Policy Compliance', example: 'Proof that transaction satisfies Travel Rule requirements' },
                  { type: 'Asset Provenance', example: 'Proof that stablecoins originated from licensed issuer' },
                  { type: 'Transactional Constraints', example: 'Proof that transaction is within approved exposure limits' }
                ],
                economicsOfProofs: {
                  title: 'Why the Economics Matter',
                  problem: 'Compliance today is slow and expensive because verification is duplicated, manual, and non-reusable. Every counterparty does their own KYC. Every transaction gets screened independently.',
                  solution: 'Proof-native attestations turn verification into a MARKET:',
                  marketDynamics: [
                    { actor: 'Verifiers', role: 'Incur real cost (data acquisition, validation, liability)' },
                    { actor: 'Consumers', role: 'Pay because verification is cheaper, faster, and more defensible than bespoke diligence' },
                    { actor: 'Attestations', role: 'Produced once, consumed many times — collapsing discovery and onboarding costs' }
                  ],
                  result: 'Compliance transforms from a COST CENTER into a THROUGHPUT ACCELERATOR.'
                },
                phasedApproach: {
                  title: 'Phased Decentralization',
                  phases: [
                    { phase: 'Initial', description: 'Centralized verification (Sphere APIs) to move fast, standardize, reduce time-to-approval' },
                    { phase: 'Medium-term', description: 'Verifier roles decentralize via economic incentives (specialized verifier marketplace)' },
                    { phase: 'Long-term', description: 'Jurisdictional designation (licensed or mandated verifiers appointed by regulators)' }
                  ]
                },
                coreInsight: 'The highest-value compliance data is data that is HARD to obtain, EXPENSIVE to reproduce, and IMMEDIATELY actionable. Making it verifiable and transferable turns compliance from friction into fuel.'
              }
            ]
          },
          technicalArchitecture: {
            title: 'Technical Architecture Overview',
            subtitle: 'How the pieces fit together',
            layers: [
              {
                layer: 'Application Layer',
                components: ['SpherePay API', 'Partner integrations', 'Wallet interfaces'],
                description: 'Where businesses and users interact with the network'
              },
              {
                layer: 'Policy Layer',
                components: ['Policy engine', 'Attestation verification', 'Jurisdiction rules'],
                description: 'Where compliance logic is evaluated BEFORE execution'
              },
              {
                layer: 'Execution Layer',
                components: ['SVM (Solana Virtual Machine)', 'Parallel execution', 'Account locks'],
                description: 'Where transactions are processed (Solana-based for performance)'
              },
              {
                layer: 'Consensus Layer',
                components: ['Validator network', 'Proof of stake', 'Finality guarantees'],
                description: 'Where transaction ordering and settlement finality occur'
              },
              {
                layer: 'Data Layer',
                components: ['Encrypted state', 'Attestation storage', 'Audit logs'],
                description: 'Where transaction history and proofs are stored'
              }
            ],
            performanceTargets: {
              title: 'Performance Targets',
              metrics: [
                { metric: 'Transaction throughput', target: '10,000+ TPS', context: 'Leveraging Solana\'s proven architecture' },
                { metric: 'Transaction cost', target: '<$0.01', context: 'Comparable to Solana mainnet' },
                { metric: 'Finality', target: '<1 second', context: 'For most transaction types' },
                { metric: 'Compliance check latency', target: '<100ms', context: 'Policy evaluation before execution' }
              ]
            }
          },
          privacyPreservingCompliance: {
            title: 'Privacy-Preserving Compliance',
            subtitle: 'How SphereNet achieves both privacy AND auditability',
            theProblem: {
              title: 'The Traditional Tradeoff',
              description: 'Traditional blockchains force a choice: full transparency (Bitcoin, Ethereum) OR full privacy (Monero, Zcash). Neither works for regulated finance.',
              transparencyProblem: 'Full transparency exposes competitive information, customer data, and trade secrets',
              privacyProblem: 'Full privacy prevents regulatory oversight, enables money laundering, blocks institutional adoption'
            },
            sphereNetSolution: {
              title: 'SphereNet\'s Approach: Selective Disclosure',
              technologies: [
                {
                  tech: 'Zero-Knowledge Proofs (zkSNARKs)',
                  use: 'Prove compliance without revealing underlying data',
                  example: 'Prove that a transaction satisfies Travel Rule without revealing sender/receiver identities to the network'
                },
                {
                  tech: 'Homomorphic Encryption',
                  use: 'Compute on encrypted data without decrypting',
                  example: 'Aggregate transaction volumes for regulatory reporting without exposing individual transactions'
                },
                {
                  tech: 'Secure Multi-Party Computation (MPC)',
                  use: 'Multiple parties jointly compute without revealing inputs',
                  example: 'Law enforcement access through legally authorized, scoped disclosures tied to specific commitments'
                }
              ],
              principle: 'Observable through a veil by default, extractable only when verifiably required.'
            },
            regulatorAccess: {
              title: 'How Regulators Get Access',
              levels: [
                { level: 'Default', access: 'Aggregate statistics, network health, policy compliance rates', requirement: 'None — publicly observable' },
                { level: 'Supervisory', access: 'Jurisdiction-specific views, entity-type breakdowns, risk concentrations', requirement: 'Regulatory authorization' },
                { level: 'Investigation', access: 'Specific transaction details, counterparty identities, full audit trail', requirement: 'Legal process (subpoena, court order, FIU request)' }
              ],
              keyPoint: 'Regulators get BETTER visibility than on traditional blockchains — but through proper channels, not by default.'
            }
          },
          spherePayVsSphereNet: {
            title: 'SpherePay vs SphereNet: How They Work Together',
            comparison: {
              headers: ['Attribute', 'SpherePay', 'SphereNet'],
              rows: [
                ['What it is', 'Payment API product', 'Blockchain infrastructure'],
                ['Status', 'LIVE ($3B+ processed)', 'In development (2025 mainnet)'],
                ['Target user', 'Businesses (API integration)', 'Fintechs, banks, payment providers'],
                ['Revenue model', 'Transaction fees', 'Network fees + licensing'],
                ['Settlement', 'Uses existing blockchains (Solana)', 'IS the settlement layer'],
                ['Compliance', 'Sphere handles compliance', 'Compliance embedded in protocol'],
                ['Analogy', 'Stripe for cross-border', 'SWIFT replacement']
              ]
            },
            relationship: {
              title: 'The Relationship',
              description: 'SpherePay is the PRODUCT. SphereNet is the PLATFORM.',
              flow: [
                'Today: SpherePay uses Solana and other blockchains for stablecoin settlement',
                'Tomorrow: SpherePay migrates to SphereNet for native compliance and better economics',
                'Future: Other fintechs build on SphereNet, SpherePay becomes one of many applications'
              ],
              strategicValue: 'SpherePay builds the customer base and transaction volume. SphereNet captures the infrastructure value. Together, they create a vertically integrated payments stack.'
            }
          },
          forRegulators: {
            title: 'What This Means for Regulators',
            subtitle: 'Positioning SphereNet in regulatory conversations',
            valueProposition: [
              {
                benefit: 'Preventative, Not Reactive',
                explanation: 'Policy enforcement happens BEFORE settlement, not after. Non-compliant transactions never settle.',
                contrast: 'Traditional approach: Settle first, investigate later. SphereNet: Verify first, settle only if compliant.'
              },
              {
                benefit: 'Jurisdiction-Aware',
                explanation: 'The network understands jurisdictional boundaries. UAE rules apply to UAE transactions, US rules to US transactions.',
                contrast: 'Traditional blockchains are jurisdiction-blind. SphereNet is jurisdiction-native.'
              },
              {
                benefit: 'Auditable Without Surveillance',
                explanation: 'Regulators can verify compliance without continuous access to all data. Proofs replace bulk data extraction.',
                contrast: 'Traditional approach: Either no visibility or total surveillance. SphereNet: Targeted, proportionate access.'
              },
              {
                benefit: 'Interoperable with Existing Systems',
                explanation: 'SphereNet connects to banks, existing blockchains, and legacy payment systems. It\'s additive, not replacement.',
                contrast: 'Not asking regulators to abandon existing infrastructure — enhancing it.'
              }
            ],
            samplePitch: {
              question: 'A central banker asks: "Why should we care about another blockchain?"',
              answer: 'SphereNet isn\'t another blockchain — it\'s the first blockchain built FOR regulators, not despite them. Traditional blockchains force you to choose between innovation and oversight. SphereNet gives you both. Compliance is embedded at the protocol level — policy enforcement happens before settlement, not after. You get better visibility than you have today, through proper legal channels, without bulk surveillance. And it\'s designed to work WITH your existing infrastructure — banks, payment systems, even other blockchains. We\'re not asking you to replace SWIFT. We\'re offering a modern complement that handles the corridors SWIFT struggles with.'
            }
          },
          keyTakeaway: 'SphereNet is Sphere\'s purpose-built blockchain for regulated finance — compliance-native, privacy-preserving, with multi-dimensional transaction coloring and control levers at every stage. SpherePay is the product; SphereNet is the platform. Together, they create the infrastructure layer for global cross-border payments.'
        },
        exercise: {
          title: 'Exercise 5.6 — SphereNet Explanation',
          prompt: 'A UAE Central Bank official asks: "We\'ve seen many blockchain projects. What makes SphereNet different?"\n\nWrite your response covering:\n1) Why traditional blockchains don\'t work for regulated finance\n2) The three core principles (coloring, control levers, proofs)\n3) How it benefits regulators specifically\n4) How it relates to SpherePay\n\nKeep it under 3 minutes speaking time.',
          criteria: ['Traditional blockchain limitations clear', 'Three principles explained simply', 'Regulator benefits specific', 'SpherePay relationship clear', 'No jargon overload']
        },
        quiz: [
          { q: 'SphereNet is best described as:', options: ['A stablecoin', 'A payment API', 'A purpose-built L1 blockchain for regulated finance', 'A wallet app'], correct: 2 },
          { q: 'Multi-dimensional coloring means:', options: ['Token colors on screen', 'Transactions annotated across jurisdiction, entity type, risk class, etc.', 'Branding colors', 'Risk scoring from 1-10'], correct: 1 },
          { q: 'How many control levers does SphereNet have?', options: ['2', '3', '5', '10'], correct: 2 },
          { q: 'Proof-driven attestations are valuable because:', options: ['They look official', 'They\'re reusable economic artifacts that collapse compliance costs', 'They\'re free', 'Regulators require them'], correct: 1 },
          { q: 'SpherePay vs SphereNet:', options: ['Same thing', 'SpherePay is product, SphereNet is platform', 'SphereNet is older', 'They compete with each other'], correct: 1 },
          { q: 'SphereNet\'s privacy approach:', options: ['Full transparency', 'Full privacy', 'Observable through veil, extractable when required', 'No privacy features'], correct: 2 }
        ]
      },
      {
        id: 'customer-segments',
        title: '5.7 Customer Segments & Qualification',
        curriculum: {
          objectives: [
            'Identify and qualify prospects across three core customer segments',
            'Understand segment-specific pain points and value propositions',
            'Know typical deal characteristics and buying patterns',
            'Recognize red flags and disqualification criteria',
            'Tailor pitch and discovery questions by segment'
          ],
          keyConcepts: [
            'Three segments: EM Businesses, US Companies Serving EM, SaaS/Tech Companies',
            'Qualification: Volume, corridors, urgency, compliance readiness',
            'Pain points vary by segment — discovery before pitch',
            'UAE focus: Trading companies, family offices, fintechs'
          ]
        },
        learn: {
          introduction: 'Not all customers are equal. Understanding which segment a prospect belongs to helps you qualify faster, pitch more effectively, and close more deals. This section details Sphere\'s three core customer segments with specific focus on UAE market opportunities.',
          coreQuestion: 'Who are Sphere\'s ideal customers and how do you qualify them?',
          threeSegments: {
            title: 'Three Core Customer Segments',
            overview: 'Sphere\'s customer base clusters into three distinct segments, each with different pain points, buying patterns, and value drivers.',
            segments: [
              {
                segment: 'Segment 1: Emerging Market Businesses',
                nickname: '"Ahmed\'s World"',
                color: 'green',
                description: 'Businesses headquartered in or heavily operating in emerging markets (LATAM, MENA, Africa, South Asia, Southeast Asia) that need to move money across borders for trade, operations, or growth.',
                icon: '🌍'
              },
              {
                segment: 'Segment 2: Developed Market Companies Serving EM',
                nickname: '"Bob\'s World"',
                color: 'blue',
                description: 'US, EU, or UK-headquartered companies that sell to, source from, or operate in emerging markets and struggle with payment friction to those regions.',
                icon: '🇺🇸'
              },
              {
                segment: 'Segment 3: Tech/SaaS Companies',
                nickname: '"Global-First"',
                color: 'purple',
                description: 'Technology companies, often remote-first, that need to pay international contractors, manage global treasury, or offer payment services to their own customers.',
                icon: '💻'
              }
            ]
          },
          segment1Detail: {
            title: 'Segment 1: Emerging Market Businesses',
            subtitle: '"Ahmed\'s World" — Deep Dive',
            profile: {
              title: 'Typical Profile',
              characteristics: [
                'Headquartered in: Brazil, Mexico, Colombia, UAE, Nigeria, Kenya, India, Philippines, Indonesia',
                'Size: $5M - $500M annual revenue (SME to mid-market)',
                'Industry: Trading, manufacturing, agriculture, commodities, import/export',
                'Payment volume: $500K - $50M monthly cross-border',
                'Team: Finance team of 2-10 people, often founder-led decisions'
              ]
            },
            painPoints: {
              title: 'Pain Points (What Keeps Them Up at Night)',
              pains: [
                {
                  pain: 'SWIFT Wire Delays',
                  detail: 'T+3 to T+10 for payments to suppliers. Every day of delay = port fees, storage costs, missed opportunities.',
                  intensity: 'HIGH — operational impact'
                },
                {
                  pain: 'FX Exposure',
                  detail: 'Local currency volatility means payment delays create real losses. ARS, NGN, PKR can move 5-10% in a week.',
                  intensity: 'HIGH — P&L impact'
                },
                {
                  pain: 'Banking Access',
                  detail: 'Local banks are slow, expensive, or unwilling to process certain corridors. USD access is limited.',
                  intensity: 'MEDIUM-HIGH — existential for some'
                },
                {
                  pain: 'Capital Controls',
                  detail: 'Government restrictions on USD access. Documentation requirements. Approval delays.',
                  intensity: 'MEDIUM — depends on country'
                },
                {
                  pain: 'Supplier Relationships',
                  detail: 'Suppliers demand faster payment. Slow payers get worse terms or lose suppliers entirely.',
                  intensity: 'MEDIUM — competitive impact'
                }
              ]
            },
            valueProposition: {
              title: 'Sphere Value Proposition for This Segment',
              value: [
                'Same-day settlement: Eliminate SWIFT delays, pay suppliers faster',
                'FX protection: Shorter payment window = less currency exposure',
                'USD access: Stablecoin bridge provides reliable USD liquidity',
                'Compliance handled: Sphere manages documentation, reporting, AML',
                'Supplier leverage: Faster payments = better terms, priority treatment'
              ]
            },
            qualificationCriteria: {
              title: 'Qualification Criteria',
              mustHave: [
                'Cross-border payment volume > $200K/month',
                'Pain around speed OR cost OR access (ideally 2+)',
                'Decision-maker accessible (founder, CFO, finance director)',
                'Legitimate business with documentation'
              ],
              niceToHave: [
                'Existing frustration with bank (recent bad experience)',
                'Growth trajectory (payment volume increasing)',
                'Tech-forward (comfortable with API or dashboard)',
                'Reference-able (willing to be a case study)'
              ],
              redFlags: [
                'Volume < $100K/month (too small to prioritize)',
                'No clear pain ("our bank is fine")',
                'Compliance concerns (won\'t provide documentation)',
                'Sanctioned country exposure'
              ]
            },
            discoveryQuestions: {
              title: 'Discovery Questions for This Segment',
              questions: [
                '"Walk me through your last international supplier payment. How long did it take from initiation to confirmed receipt?"',
                '"What happens to your business when a payment is delayed by a week?"',
                '"How do you currently manage FX risk on your payables?"',
                '"What\'s your relationship like with your bank for international wires?"',
                '"If you could pay suppliers same-day, how would that change your negotiations?"'
              ]
            },
            typicalDeal: {
              title: 'Typical Deal Characteristics',
              characteristics: [
                { attribute: 'Sales cycle', value: '2-6 weeks' },
                { attribute: 'Decision maker', value: 'Founder or CFO' },
                { attribute: 'Initial volume', value: '$200K-500K/month' },
                { attribute: 'Expansion potential', value: '2-5x within 12 months' },
                { attribute: 'Price sensitivity', value: 'Medium — value speed over cost' },
                { attribute: 'Integration', value: 'Dashboard first, API later' }
              ]
            },
            uaeSpecific: {
              title: 'UAE-Specific Examples',
              examples: [
                {
                  type: 'Trading Company',
                  description: 'Dubai-based commodity trader sourcing from India, selling to Europe',
                  corridors: 'AED → INR, USD → EUR',
                  volume: '$5-20M/month',
                  pain: 'SWIFT delays cost demurrage fees, FX exposure on INR'
                },
                {
                  type: 'Manufacturing Importer',
                  description: 'UAE company importing machinery from China and Germany',
                  corridors: 'AED → CNY, AED → EUR',
                  volume: '$1-5M/month',
                  pain: 'Supplier payment delays affecting delivery schedules'
                },
                {
                  type: 'Re-Export Business',
                  description: 'Dubai free zone company buying from Asia, selling to Africa',
                  corridors: 'USD → CNY, USD → KES/NGN',
                  volume: '$2-10M/month',
                  pain: 'African corridors especially slow and expensive'
                }
              ]
            }
          },
          segment2Detail: {
            title: 'Segment 2: Developed Market Companies Serving EM',
            subtitle: '"Bob\'s World" — Deep Dive',
            profile: {
              title: 'Typical Profile',
              characteristics: [
                'Headquartered in: US, UK, EU, Canada, Australia',
                'Size: $10M - $1B annual revenue (mid-market to enterprise)',
                'Industry: Equipment, machinery, software, professional services, franchises',
                'Payment volume: $1M - $100M monthly to EM destinations',
                'Team: Treasury team, often with dedicated international payments person'
              ]
            },
            painPoints: {
              title: 'Pain Points (What Keeps Them Up at Night)',
              pains: [
                {
                  pain: 'Correspondent Banking Complexity',
                  detail: 'Payments to Nigeria require 4 correspondent hops. Each hop = fees, delays, failure risk.',
                  intensity: 'HIGH — operational nightmare'
                },
                {
                  pain: 'Visibility Gap',
                  detail: 'Payment sent Monday, no confirmation until Thursday. Customer/supplier asking "where\'s my money?"',
                  intensity: 'HIGH — customer service impact'
                },
                {
                  pain: 'Cost Unpredictability',
                  detail: 'Bank quotes 1.5% but actual cost is 4-6% after correspondent fees and FX spread.',
                  intensity: 'MEDIUM-HIGH — budget impact'
                },
                {
                  pain: 'Compliance Burden',
                  detail: 'Each EM country has different documentation requirements. Finance team spends hours on paperwork.',
                  intensity: 'MEDIUM — time/resource cost'
                },
                {
                  pain: 'Banking Relationship Limits',
                  detail: 'Bank won\'t process payments to certain countries. "We don\'t do Pakistan."',
                  intensity: 'MEDIUM — growth blocker'
                }
              ]
            },
            valueProposition: {
              title: 'Sphere Value Proposition for This Segment',
              value: [
                'Simplified operations: One API/dashboard for all EM corridors',
                'Real-time visibility: Track payment status, provide confirmation to customers',
                'Predictable pricing: Know exact cost upfront, no hidden fees',
                'Compliance outsourcing: Sphere handles EM-specific documentation',
                'Coverage expansion: Access corridors your bank won\'t touch'
              ]
            },
            qualificationCriteria: {
              title: 'Qualification Criteria',
              mustHave: [
                'Regular payments to EM destinations (not one-off)',
                'Volume > $500K/month to qualifying corridors',
                'Current pain with bank or existing solution',
                'Technical capability (API integration possible)'
              ],
              niceToHave: [
                'Existing bank frustration (recent escalation)',
                'Growing EM business (payment volume increasing)',
                'Treasury modernization initiative underway',
                'M&A activity (acquiring EM companies)'
              ],
              redFlags: [
                'All payments to developed markets (US, EU, UK)',
                'Single large payment per year (not recurring)',
                'No technical resources for integration',
                'Extremely price-sensitive (wants cheapest, not fastest)'
              ]
            },
            discoveryQuestions: {
              title: 'Discovery Questions for This Segment',
              questions: [
                '"What percentage of your international payments go to emerging markets vs developed markets?"',
                '"When a payment to [Brazil/India/Nigeria] is delayed, what\'s the business impact?"',
                '"How do you currently track international payment status?"',
                '"Has your bank ever declined to process a payment to a specific country?"',
                '"What does your ideal international payment workflow look like?"'
              ]
            },
            typicalDeal: {
              title: 'Typical Deal Characteristics',
              characteristics: [
                { attribute: 'Sales cycle', value: '4-12 weeks' },
                { attribute: 'Decision maker', value: 'Treasury Director, CFO, or VP Finance' },
                { attribute: 'Initial volume', value: '$500K-2M/month' },
                { attribute: 'Expansion potential', value: '2-3x as trust builds' },
                { attribute: 'Price sensitivity', value: 'Low — value reliability over cost' },
                { attribute: 'Integration', value: 'API integration expected' }
              ]
            },
            uaeSpecific: {
              title: 'UAE-Specific Examples',
              examples: [
                {
                  type: 'US Equipment Exporter',
                  description: 'Texas-based machinery company selling to UAE and broader MENA',
                  corridors: 'USD → AED, USD → SAR, USD → EGP',
                  volume: '$2-10M/month',
                  pain: 'MENA bank relationships are complex, documentation heavy'
                },
                {
                  type: 'European SaaS Company',
                  description: 'UK software company with UAE enterprise customers',
                  corridors: 'AED → GBP, AED → EUR',
                  volume: '$500K-2M/month',
                  pain: 'Receiving AED payments is slow and expensive'
                },
                {
                  type: 'US Franchise Business',
                  description: 'American franchise with UAE and Saudi franchisees',
                  corridors: 'AED → USD, SAR → USD (royalty payments)',
                  volume: '$1-5M/month',
                  pain: 'Franchisee payments are inconsistent, hard to reconcile'
                }
              ]
            }
          },
          segment3Detail: {
            title: 'Segment 3: Tech/SaaS Companies',
            subtitle: '"Global-First" — Deep Dive',
            profile: {
              title: 'Typical Profile',
              characteristics: [
                'Headquartered in: US, UK, EU (but often remote-first)',
                'Size: $1M - $100M annual revenue (startup to scale-up)',
                'Industry: Software, fintech, marketplace, gig economy, crypto',
                'Payment volume: $100K - $10M monthly (payroll, contractors, payouts)',
                'Team: Small finance team (1-3), engineering-led decisions'
              ]
            },
            painPoints: {
              title: 'Pain Points (What Keeps Them Up at Night)',
              pains: [
                {
                  pain: 'Global Contractor Payroll',
                  detail: 'Contractors in 15 countries. Each country = different payment method, different timing, different fees.',
                  intensity: 'HIGH — retention impact'
                },
                {
                  pain: 'Payout Complexity',
                  detail: 'Marketplace/gig platform needs to pay sellers/workers globally. Current solution is slow and expensive.',
                  intensity: 'HIGH — competitive disadvantage'
                },
                {
                  pain: 'Treasury Fragmentation',
                  detail: 'Cash trapped in multiple countries/currencies. Can\'t efficiently move money where it\'s needed.',
                  intensity: 'MEDIUM-HIGH — capital efficiency'
                },
                {
                  pain: 'Integration Burden',
                  detail: 'Current payment providers require complex integration. Engineering time is precious.',
                  intensity: 'MEDIUM — resource cost'
                },
                {
                  pain: 'Compliance Uncertainty',
                  detail: 'Unsure if current contractor payments are compliant. Worried about tax/legal risk.',
                  intensity: 'MEDIUM — risk concern'
                }
              ]
            },
            valueProposition: {
              title: 'Sphere Value Proposition for This Segment',
              value: [
                'Single API: One integration for global payments (not 15 different providers)',
                'Same-day payroll: Pay contractors same day, improve retention',
                'Developer-friendly: Clean API, good docs, fast integration',
                'Compliance included: Sphere handles reporting, tax documentation',
                'Treasury optimization: Move money efficiently across entities/currencies'
              ]
            },
            qualificationCriteria: {
              title: 'Qualification Criteria',
              mustHave: [
                'International payment need (contractors, payouts, or treasury)',
                'Volume > $100K/month (or clear path to it)',
                'Engineering resources for API integration',
                'Growth trajectory (scaling team or platform)'
              ],
              niceToHave: [
                'Existing pain with current provider (Wise, PayPal, etc.)',
                'Stablecoin/crypto familiarity',
                'Developer decision-maker (CTO, VP Eng)',
                'Platform business model (marketplace, gig)'
              ],
              redFlags: [
                'Volume < $50K/month with no growth path',
                'No engineering resources',
                'Wants consumer-facing solution (we\'re B2B)',
                'Compliance-averse ("we\'ll figure it out later")'
              ]
            },
            discoveryQuestions: {
              title: 'Discovery Questions for This Segment',
              questions: [
                '"How many countries do you currently pay contractors in?"',
                '"What\'s your current contractor payment workflow end-to-end?"',
                '"Have you ever lost a contractor because of payment delays or fees?"',
                '"How much engineering time did your current payment integration take?"',
                '"If you could pay all contractors same-day for 50% less, what would that mean for your business?"'
              ]
            },
            typicalDeal: {
              title: 'Typical Deal Characteristics',
              characteristics: [
                { attribute: 'Sales cycle', value: '2-4 weeks' },
                { attribute: 'Decision maker', value: 'CTO, VP Eng, or Head of Finance' },
                { attribute: 'Initial volume', value: '$100K-500K/month' },
                { attribute: 'Expansion potential', value: '3-10x as company scales' },
                { attribute: 'Price sensitivity', value: 'Medium — value developer experience' },
                { attribute: 'Integration', value: 'API-first, fast integration critical' }
              ]
            },
            uaeSpecific: {
              title: 'UAE-Specific Examples',
              examples: [
                {
                  type: 'UAE Fintech Startup',
                  description: 'Dubai-based fintech with remote team across MENA and Asia',
                  corridors: 'AED → INR, AED → PKR, AED → EGP',
                  volume: '$200K-1M/month',
                  pain: 'Paying contractors in Pakistan and Egypt is slow and expensive'
                },
                {
                  type: 'Marketplace Platform',
                  description: 'UAE e-commerce marketplace paying sellers across GCC and South Asia',
                  corridors: 'AED → multiple (INR, PKR, BDT, SAR, KWD)',
                  volume: '$1-5M/month',
                  pain: 'Seller payout delays hurt platform reputation'
                },
                {
                  type: 'Crypto/Web3 Company',
                  description: 'Dubai-based crypto company with global contractor team',
                  corridors: 'USDC → local fiat (global)',
                  volume: '$500K-2M/month',
                  pain: 'Already holding stablecoins, need compliant off-ramp to fiat for payroll'
                }
              ]
            }
          },
          segmentPrioritization: {
            title: 'Segment Prioritization for UAE',
            subtitle: 'Where to focus in the UAE market',
            priorityOrder: [
              {
                priority: 1,
                segment: 'Emerging Market Businesses (Trading Companies)',
                rationale: 'Highest volume, clearest pain, shortest sales cycle. UAE is a trading hub — thousands of companies fit this profile.',
                targetSubsegments: ['Commodity traders', 'Import/export businesses', 'Re-export companies', 'Manufacturing importers']
              },
              {
                priority: 2,
                segment: 'Tech/SaaS Companies (UAE Fintechs)',
                rationale: 'Growing segment, stablecoin-native, fast decision-making. Dubai is becoming a fintech hub.',
                targetSubsegments: ['Fintechs', 'Marketplaces', 'Crypto companies', 'Remote-first startups']
              },
              {
                priority: 3,
                segment: 'Developed Market Companies',
                rationale: 'Longer sales cycle but larger deal sizes. Target US/EU companies with UAE operations.',
                targetSubsegments: ['US exporters to MENA', 'EU companies with UAE subsidiaries', 'Franchise businesses']
              }
            ],
            volumeTargets: {
              title: 'Volume Targets by Segment',
              targets: [
                { segment: 'EM Businesses', minMonthly: '$200K', sweetSpot: '$1-5M', enterprise: '$10M+' },
                { segment: 'Developed Market', minMonthly: '$500K', sweetSpot: '$2-10M', enterprise: '$20M+' },
                { segment: 'Tech/SaaS', minMonthly: '$100K', sweetSpot: '$500K-2M', enterprise: '$5M+' }
              ]
            }
          },
          qualificationFramework: {
            title: 'Universal Qualification Framework: BANT+C',
            subtitle: 'Budget, Authority, Need, Timeline + Corridors',
            framework: [
              {
                letter: 'B',
                factor: 'Budget/Volume',
                question: 'What\'s your monthly cross-border payment volume?',
                greenFlag: '> $200K/month',
                yellowFlag: '$50-200K/month',
                redFlag: '< $50K/month'
              },
              {
                letter: 'A',
                factor: 'Authority',
                question: 'Who makes the decision on payment infrastructure?',
                greenFlag: 'Talking to decision-maker (CFO, Founder, Treasury)',
                yellowFlag: 'Talking to influencer who can connect to decision-maker',
                redFlag: 'No path to decision-maker'
              },
              {
                letter: 'N',
                factor: 'Need/Pain',
                question: 'What\'s broken with your current solution?',
                greenFlag: 'Clear, specific pain (speed, cost, access)',
                yellowFlag: 'General interest but no burning pain',
                redFlag: '"Our current solution is fine"'
              },
              {
                letter: 'T',
                factor: 'Timeline',
                question: 'When do you need a solution in place?',
                greenFlag: '< 3 months',
                yellowFlag: '3-6 months',
                redFlag: '> 6 months or "no rush"'
              },
              {
                letter: 'C',
                factor: 'Corridors',
                question: 'What countries are you paying to/from?',
                greenFlag: 'EM corridors we support well (LATAM, MENA, South Asia)',
                yellowFlag: 'Mixed EM/developed',
                redFlag: 'Only developed markets (US-EU-UK)'
              }
            ],
            scoringGuide: {
              title: 'Scoring Guide',
              scores: [
                { score: '5 Green', action: 'High priority — fast-track' },
                { score: '3-4 Green', action: 'Good opportunity — standard process' },
                { score: '2 Green', action: 'Qualify further before investing time' },
                { score: '< 2 Green', action: 'Likely not a fit — be honest, move on' }
              ]
            }
          },
          keyTakeaway: 'Three segments: EM Businesses (trading), Developed Market Companies (exporters), Tech/SaaS (global payroll). Qualify on BANT+C: Budget, Authority, Need, Timeline, Corridors. In UAE, prioritize trading companies and fintechs — highest volume, clearest pain.'
        },
        exercise: {
          title: 'Exercise 5.7 — Segment Qualification',
          prompt: 'You receive three inbound leads. Qualify each using BANT+C:\n\n1) Dubai trading company, $3M/month to India and China, founder reached out, needs solution "ASAP" because bank is too slow\n\n2) UK software company, $50K/month to UAE for one contractor, HR manager inquiring, "exploring options for next year"\n\n3) UAE fintech, $800K/month payroll to 12 countries, CTO on the call, current provider (Wise) taking 3-4 days\n\nFor each: Score BANT+C, identify segment, recommend action.',
          criteria: ['Correct segment identification', 'BANT+C scoring accurate', 'Action recommendation appropriate', 'Justified reasoning']
        },
        quiz: [
          { q: 'Which segment is highest priority in UAE?', options: ['Developed market companies', 'EM businesses (trading)', 'Consumers', 'Government'], correct: 1 },
          { q: 'Minimum monthly volume for EM Business segment?', options: ['$10K', '$50K', '$200K', '$1M'], correct: 2 },
          { q: 'What does the "C" in BANT+C stand for?', options: ['Cost', 'Corridors', 'Compliance', 'Customer'], correct: 1 },
          { q: 'Red flag in qualification:', options: ['$5M monthly volume', 'CFO on call', '"Our bank is fine"', 'LATAM corridors'], correct: 2 },
          { q: 'Segment 3 (Tech/SaaS) primary pain:', options: ['SWIFT delays', 'Global contractor payroll', 'FX exposure', 'Banking access'], correct: 1 }
        ]
      }
    ],
    masterQuiz: {
      title: 'Pillar 5 Mastery Assessment',
      passingScore: 70,
      scenario: 'Presenting Sphere to enterprise customer and UAE regulator, then qualifying a new lead.',
      questions: [
        { type: 'multiple_choice', question: 'SpherePay median settlement:', options: ['2-5 days', '24 hours', '15-30 min', 'Instant'], correct: 2 },
        { type: 'multiple_choice', question: 'Sphere founded during:', options: ['Bull market', 'FTX collapse', 'Before crypto', '2010'], correct: 1 },
        { type: 'multiple_choice', question: 'What fraction of human time is spent waiting?', options: ['One-tenth', 'One-quarter', 'One-third', 'One-half'], correct: 2 },
        { type: 'multiple_choice', question: 'SphereNet is:', options: ['A stablecoin', 'A payment API', 'A purpose-built L1 blockchain', 'A wallet'], correct: 2 },
        { type: 'multiple_choice', question: 'Highest priority segment in UAE:', options: ['Consumers', 'EM trading companies', 'Government', 'Banks'], correct: 1 },
        { type: 'multiple_choice', question: 'What does C in BANT+C stand for?', options: ['Cost', 'Corridors', 'Compliance', 'Customer'], correct: 1 },
        { type: 'analysis', question: 'Explain stablecoin sandwich to non-technical CFO.', rubric: ['No jargon', 'Clear flow', 'Benefits'] },
        { type: 'analysis', question: 'Tell the Bob and Ahmed story in 2 minutes. Make it compelling.', rubric: ['Characters real', 'Pain tangible', 'Technology humility', 'One-third statistic'] },
        { type: 'analysis', question: 'A central banker asks why SphereNet is different from other blockchains. Explain the three core principles.', rubric: ['Multi-dimensional coloring', 'Control levers', 'Proof-driven attestations', 'Regulator benefits'] },
        { type: 'application', question: 'Qualify this lead: Dubai fintech, $1.2M/month contractor payroll to 8 countries, CTO reached out, needs solution in 6 weeks, current Wise setup taking 4 days. Score BANT+C and recommend action.', rubric: ['Correct segment', 'BANT+C scored', 'Action appropriate', 'Reasoning clear'] }
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

