# LinkedIn API Use Case Proposal

**Status**: Approved (2026-01-12)
**Application Name**: PublishFlow
**Application Type**: Content management and productivity application

## Primary Purpose

To assist LinkedIn members in drafting, reviewing, scheduling, and publishing posts in a controlled, user-approved manner.

---

## 1. Overview

This application is designed to help individual professionals and small teams maintain consistent, high-quality LinkedIn posting through structured content planning and scheduling.

The application does not automate engagement, messaging, or interactions. It functions strictly as a content drafting and publishing assistant.

---

## 2. Intended Users

The application is intended for:
- Individual LinkedIn members
- Professionals building a personal brand
- Administrators of LinkedIn Company Pages (future phase)
- Small teams managing official content

The application is not intended for mass automation, growth hacking, or engagement manipulation.

---

## 3. Problem Statement

Many professionals struggle to post consistently on LinkedIn due to:
- Limited time for content planning
- Manual posting workflows
- Lack of structured review and scheduling tools

This often leads to irregular posting and reduced content quality.

---

## 4. Proposed Solution

The application provides a workflow that allows users to:

- Draft LinkedIn posts in advance
- Optionally receive AI-assisted writing suggestions
- Manually edit and review content
- Schedule posts for a chosen date and time
- Publish posts only after explicit user confirmation

The application acts as a content management system, not an automation tool.

---

## 5. LinkedIn API Usage

**Requested Permissions**:
- `w_member_social` ✅ **APPROVED**

**(Optional future phase)**:
- `w_organization_social`

The LinkedIn API will be used only to:
- Publish posts on behalf of authenticated users
- Publish posts on behalf of company pages where the user has admin rights

No other LinkedIn APIs will be accessed.

---

## 6. AI Usage Disclosure

AI is used exclusively for drafting assistance.

Specifically:
- AI generates suggested text drafts based on user input
- Drafts are fully editable by the user
- Users may modify or discard AI suggestions
- AI does not publish content autonomously
- Final publishing always requires explicit user approval

AI does not impersonate users or generate content without user intent.

---

## 7. User Control and Safeguards

The application enforces:
- LinkedIn OAuth authentication
- Manual review and confirmation before publishing
- Clear visibility of post content prior to submission
- User control over scheduling and publishing actions

There is no fully autonomous posting.

---

## 8. Data Handling and Security

The application:
- Stores only minimal post content and scheduling metadata
- Does not collect or store LinkedIn passwords
- Uses OAuth access tokens securely
- Does not resell or share LinkedIn data
- Allows users to revoke access at any time

---

## 9. Optional User-Provided Data

Users may optionally upload a copy of their own LinkedIn data export to personalize drafting assistance.

This data:
- Is uploaded voluntarily by the user
- Is processed only for that user
- Is not shared, aggregated, or resold
- Is used solely to improve drafting quality
- Can be deleted by the user at any time

---

## 10. What the Application Does NOT Do

The application explicitly does not:
- Send direct messages
- Auto-like, auto-comment, or auto-follow
- Scrape LinkedIn profiles or feeds
- Perform behavioral automation
- Harvest or analyze third-party profile data
- Simulate human interaction patterns

---

## 11. Example User Flow

1. User authenticates via LinkedIn OAuth
2. User creates a post draft
3. (Optional) AI suggests draft text
4. User edits and reviews the content
5. User confirms publishing or schedules the post
6. Content is published via the LinkedIn API

---

## 12. Compliance Statement

The application complies with:
- LinkedIn API Terms of Use
- LinkedIn Platform Policies
- Data protection and user consent requirements

The application uses only approved endpoints and allows LinkedIn to revoke access if required.

---

## 13. Initial Rollout

- Initial release will be limited and controlled
- Focus on individual users and personal posting
- Expansion only after approval and compliance validation

---

**Last Updated**: 2026-01-12
**Status**: Historical document - API approval obtained
