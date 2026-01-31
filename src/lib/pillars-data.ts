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
    sections: []
  }
];

export type Pillar = typeof pillarsData[number];
export type Section = Pillar['sections'][number];