# Sphere Training Platform

## Project Overview
A comprehensive enterprise training platform for Sphere's payment technology, specifically focused on UAE market engagement. The platform educates users on payment fundamentals, settlement risk, stablecoins, and how Sphere's technology complements traditional financial infrastructure.

## Core Messaging Principles
**CRITICAL: Sphere COMPLEMENTS traditional finance - it does NOT replace it.**

- Sphere bypasses SWIFT/correspondent banking through stablecoin rails for direct settlement
- Position this as enhancement, not disruption
- Sphere works alongside central banks and existing systems
- Emphasize friction reduction, not system replacement
- The "Antarctica story" parable is effective for explaining settlement concepts

## Reference Documents (in `/docs`)
Always consult these for accuracy:
- `sphere_pitch_deck.pdf` - Core value propositions, product positioning
- `Sphere_UAE_Presentation_1.pdf` - UAE-specific market strategy
- `vara_vs_difc_comparison.pdf` - VARA vs DIFC regulatory frameworks (critical for Pillar 2)
- `uae_territories_spherepay.pdf` - UAE free zones and licensing territories
- `Some_High_Level_Technical_Takeaways_from_the_SphereNet_Central_Bank.pdf` - SphereNet technical architecture
- `Transcripts_and_Links_to_more_Documents.rtf` - Additional source links
- Contents in folder Risk, Compliance, Controls
- Contents in folder Components
- Contents in SphereNet Folder
- Contents in SpherePay Folder
- Contents in Cross Business Folder

## Online Resources
Always reference the official Sphere website for current information:
- **Main site**: https://spherepay.co
- **Documentation**: https://spherepay.co/docs (API docs, integration guides, technical specs)
- **Article**: 

When creating or updating content, cross-reference both the `/docs` folder AND online references to ensure accuracy and alignment with current product positioning.

## Codebase Structure
```
src/
├── pillars-data.ts          # MAIN CONTENT FILE - all training pillars
├── components/
│   ├── LearnContent.tsx     # Renders educational content with interactive features
│   └── FormattedFeedback.tsx # Processes AI-generated feedback display
```

## Content Architecture (pillars-data.ts)

### Seven Pillars:
1. **Payment Fundamentals** - Risk allocation, correspondent banking mechanics, settlement verification, SWIFT/ACH/SEPA comparisons
2. **Stablecoins** - Regulatory convergence in UAE, Singapore, UK, Brazil; VARA vs DIFC frameworks
3. **Sphere Product** - Core technology, SphereNet infrastructure, API capabilities
4. **Risk & Governance** - Compliance frameworks, operational risk, audit procedures
5. **Enterprise Implementation** - Customer segments, qualification criteria, deployment workflows
6. **Regulatory Mastery & Objection Handling** - The 15 critical questions that determine deal success. Covers licensing/classification (MSB/Money Transmitter), AML/compliance programs, stablecoin risk, operational/settlement concerns, and partnership integration. Teaches how to handle the "aren't you just crypto" objection and position Sphere as compliance-native (27 regulated entities across 18 jurisdictions).
7. **Final Assessment** - Comprehensive test covering all pillars

### Content Types in Each Section:
- `overview` - Introduction text
- `content` - Main educational material (supports HTML formatting)
- `quiz` - Assessment questions with model answers
- `glossary` - Key terms and definitions

## Visual Design System
Use color-coded sections for learning comprehension:
- 🔴 **Red backgrounds** (`bg-red-50`, `border-red-200`) - Problems, pain points, risks
- 🟢 **Green backgrounds** (`bg-green-50`, `border-green-200`) - Solutions, benefits, Sphere advantages
- 🔵 **Blue backgrounds** (`bg-blue-50`, `border-blue-200`) - Examples, case studies, neutral info
- 🟣 **Purple backgrounds** (`bg-purple-50`, `border-purple-200`) - Sphere-specific positioning

## Interactive Components
The platform supports:
- Collapsible sections (`<details>` / `<summary>`)
- Expandable use case cards
- Step-by-step procedures with numbered lists
- Comparison tables
- Glossary tooltips

## Technical Writing Guidelines

### For Payment System Explanations:
- Break down by system (SWIFT, ACH, SEPA, Fedwire, CHIPS)
- Specify settlement finality differences
- Explain correspondent chain mechanics with concrete examples
- Include typical timing and fee structures

### For Regulatory Content:
- Distinguish between jurisdictions clearly
- Note effective dates and transition periods
- Link to official sources where possible

### For Sphere Product Content:
- Always reference source documents for accuracy
- Explain technical concepts with business implications
- Include enterprise use cases with specific workflows

## Quiz Question Standards
- Model answers should be comprehensive (3-5 key points)
- Include specific terminology from the training content
- Reference real-world applications
- Realtime Feedback (not "AI Feedback") provides assessment

## Common Edits & Maintenance
- UI terminology: Use "Realtime Feedback" not "AI Feedback"
- Model answer formatting: Ensure proper display in LearnContent.tsx
- New sections: Follow existing pillar structure exactly
- Content updates: Verify against reference docs before committing

## Git Workflow
- Make targeted fixes over complete file rewrites
- Test locally before pushing
- Commit messages should describe the specific change
- Do not deviate from user instructions. This is non negotiable.