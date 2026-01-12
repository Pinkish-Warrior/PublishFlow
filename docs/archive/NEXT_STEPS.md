# PublishFlow – Next Steps Guide

This document outlines the step-by-step process to move from proposal to
LinkedIn API approval and a compliant first build.

Follow these steps in order. Do not skip ahead.

---

## STEP 1 — Lock the Scope (Do This First)

**Objective:** Prevent scope creep and reduce approval risk.

Confirm and document the v1 scope:

### Included

- Drafting LinkedIn posts
- Manual review and editing
- Optional scheduling
- Manual publishing only

### Explicitly Excluded

- Engagement automation (likes, comments, follows)
- Direct messaging
- Feed scraping or analytics
- Company page posting (v1)
- Behavioural automation

**App name:** PublishFlow  
**Primary permission target:** `w_member_social`

Do not deviate from this scope during approval.

---

## STEP 2 — Create a LinkedIn Developer Application

**Objective:** Prepare the app container for permission requests.

1. Go to LinkedIn Developers
2. Sign in with your personal LinkedIn account
3. Create a new application

Use the following:

- **Application name:** PublishFlow
- **Application description:**  
  “A lightweight content management and scheduling service for LinkedIn posts,
  designed with compliance and user control in mind.”
- **Company:** Personal account is acceptable for v1

Do not request permissions yet.

---

## STEP 3 — Complete Basic App Details

**Objective:** Pass automated validation checks.

Fill in:

- Website: GitHub repository URL is acceptable
- App logo: Optional (simple placeholder is fine)
- Privacy policy: Minimal placeholder is acceptable
- Business email: Your own email is sufficient

Keep all descriptions factual and neutral.

---

## STEP 4 — Request API Access (Critical Step)

**Objective:** Submit the proposal cleanly and conservatively.

1. Request **only** the following permission:
   - `w_member_social`

2. Paste the prepared proposal text into:
   - Use case description
   - Data usage explanation
   - AI usage disclosure (if prompted)

### Important Rules

- Do NOT mention future features
- Do NOT mention scaling or growth
- Do NOT mention automation
- Do NOT mention company pages

Submit exactly what is implemented in v1.

---

## STEP 5 — Wait (Do Not Build Posting Yet)

**Objective:** Avoid rework or compliance issues.

While waiting for review (typically 1–4 weeks):

### Do NOT

- Implement LinkedIn posting logic
- Use unofficial automation
- Scrape or simulate LinkedIn behaviour

### You MAY Build

- Content drafting logic
- AI prompt templates
- MCP memory layer
- Scheduling logic (without posting)
- Review and approval UI
- Internal logging and audit structure

---

## STEP 6 — Handle Review Outcomes

**Objective:** Respond correctly to LinkedIn feedback.

Possible outcomes:

- Approved
- Clarification requested
- Rejected with feedback

If clarification is requested:

- Respond within 48 hours
- Be concise
- Re-emphasise:
  - Human-in-the-loop
  - No automation
  - No scraping
  - Explicit user approval

Most applications are approved after one clarification round.

---

## STEP 7 — Build Posting Only After Approval

**Objective:** Implement safely and compliantly.

After approval:

1. Implement LinkedIn OAuth
2. Implement post publishing
3. Enforce manual confirmation
4. Add logging and auditability
5. Release to a small private beta

---

## STEP 8 — Add Compliance Documentation to the Repo

**Objective:** Future-proof the project.

Recommended files:

- README.md
- NON_GOALS.md
- DATA_USAGE.md

These help with:

- LinkedIn trust
- User trust
- Future reviews
- Team clarity

---

## STEP 9 — Expand Only After Traction

**Objective:** Reduce long-term platform risk.

Only after:

- Active users
- Clean operational logs
- No policy issues

Then consider:

- Company page posting
- Team workflows
- Advanced scheduling

Each expansion should be a **separate permission request**.

---

## Final Note

LinkedIn rewards:
> Predictable, controlled, human-approved tools.

Keep PublishFlow boring for approval.
You can innovate after trust is established.

---
