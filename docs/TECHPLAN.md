# PublishFlow Implementation Plan

## Overview

Build a compliance-first LinkedIn content scheduling and publishing tool with Next.js, SQLite, and Anthropic Claude API. The app has received LinkedIn API approval for `w_member_social` permission.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js with LinkedIn OAuth
- **AI**: Anthropic Claude API
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion (parallax & UI transitions)
- **Deployment**: Vercel

## Core Requirements

### Included Features

- LinkedIn OAuth authentication
- Draft post creation and editing
- AI-assisted draft suggestions (optional)
- Post scheduling for future publishing
- Manual publishing with explicit confirmation
- Comprehensive audit logging
- User-friendly UI with mobile support

### Compliance Requirements (Critical)

- **Human-in-the-loop**: No autonomous posting
- **Manual confirmation**: Required before every publish
- **Audit trails**: Log all actions (auth, drafts, publishes, AI usage)
- **Token security**: Encrypt LinkedIn access tokens
- **User control**: Users can revoke access anytime

### Explicitly Excluded

- Engagement automation (likes, comments, follows)
- Direct messaging
- Feed scraping or analytics
- Company page posting (future v2)

## Database Schema

### User Model

- `id`, `email`, `name`, `linkedinId`, `image`
- `accessToken`, `refreshToken`, `tokenExpiry` (encrypted)
- Relations: posts[], auditLogs[]

### Post Model

- `id`, `content`, `status` (DRAFT, SCHEDULED, PUBLISHED, FAILED, CANCELLED)
- `scheduledFor`, `publishedAt`, `linkedinId`, `linkedinUrl`
- `aiAssisted`, `aiPrompt`
- Relations: userId, auditLogs[]

### AuditLog Model

- `id`, `action`, `entityType`, `entityId`
- `metadata` (JSON), `ipAddress`, `userAgent`
- `success`, `errorMessage`
- Relations: userId, postId

## Project Structure

```
PublishFlow/
├── .env.local (create, gitignored)
├── .env.example (create)
├── prisma/
│   └── schema.prisma (create)
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx (landing page)
│   │   ├── globals.css
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/route.ts
│   │   │   ├── posts/route.ts
│   │   │   ├── posts/[id]/route.ts
│   │   │   ├── posts/publish/route.ts
│   │   │   ├── ai/suggestions/route.ts
│   │   │   └── cron/publish-scheduled/route.ts
│   │   ├── dashboard/page.tsx
│   │   ├── posts/
│   │   │   ├── page.tsx (list)
│   │   │   ├── new/page.tsx (create)
│   │   │   └── [id]/
│   │   │       ├── page.tsx (edit)
│   │   │       └── publish/page.tsx (CRITICAL: confirmation)
│   │   └── audit/page.tsx
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── auth.ts (NextAuth config)
│   │   ├── linkedin.ts (LinkedIn API client)
│   │   ├── anthropic.ts (Claude API client)
│   │   └── validation.ts (Zod schemas)
│   ├── components/
│   │   ├── ui/ (button, input, textarea, card, dialog)
│   │   ├── posts/ (post-editor, post-list, post-card, publish-confirmation-dialog, schedule-picker)
│   │   └── audit/ (audit-log-table)
│   ├── types/
│   │   ├── index.ts
│   │   └── linkedin.ts
│   └── middleware.ts (route protection)
├── vercel.json (cron config)
└── next.config.js
```

## Critical Files (Must Implement Correctly)

### 1. `/prisma/schema.prisma`

**Why Critical**: Foundation of data structure, audit compliance

- Define User, Post, AuditLog models with enums
- SQLite datasource, Prisma client generator
- Proper relations and indexes

### 2. `/src/lib/auth.ts`

**Why Critical**: Security, token management, LinkedIn OAuth

- NextAuth.js configuration with LinkedInProvider
- Scope: `openid profile email w_member_social`
- Token storage in database (encrypted)
- Callbacks for JWT and session

### 3. `/src/lib/linkedin.ts`

**Why Critical**: Core functionality - posting to LinkedIn

- `publishToLinkedIn(accessToken, content, linkedinUserId)` function
- LinkedIn Share API v2 endpoint: `/v2/ugcPosts`
- Error handling: 401 (expired token), 429 (rate limit), 400 (validation)
- Returns `{ id, url }` on success

### 4. `/src/app/api/posts/publish/route.ts`

**Why Critical**: Compliance-critical confirmation logic

- **MUST** require `confirmPublish: true` in request body
- Validate post ownership, status, token validity
- Call LinkedIn API via `publishToLinkedIn()`
- Update post status (PUBLISHED or FAILED)
- Create detailed audit log entry
- Return LinkedIn post URL or error

### 5. `/src/app/posts/[id]/publish/page.tsx`

**Why Critical**: Human-in-the-loop UI enforcement

- Display full post preview
- Explicit warning: "This will publish to your LinkedIn profile"
- Checkbox: "I confirm I have reviewed this content"
- "Publish Now" button (disabled until checkbox checked)
- Call `/api/posts/publish` with `confirmPublish: true`

## Implementation Phases

### Phase 1: Foundation (Days 1-2) ✅ COMPLETE

1. Initialize Next.js: `npx create-next-app@latest . --typescript --tailwind --app --src-dir` ✓
2. Install dependencies: `prisma @prisma/client next-auth @auth/prisma-adapter zod @anthropic-ai/sdk framer-motion` ✓
3. Setup Prisma: `npx prisma init --datasource-provider sqlite` ✓
4. Create schema.prisma with User, Post, AuditLog models ✓
5. Run migration: `npx prisma migrate dev --name init` ✓
6. Create `/src/lib/prisma.ts` singleton ✓
7. Create `.env.example` and `.env.local` ✓

### Phase 2: Authentication (Days 3-4) ✅ COMPLETE

1. Create `/src/lib/auth.ts` with NextAuth config ✓
2. Create `/src/app/api/auth/[...nextauth]/route.ts` ✓
3. Configure custom LinkedIn OAuth provider (only `w_member_social` scope) ✓
4. Implement token storage callbacks (JWT + database) ✓
5. Create `/src/middleware.ts` for route protection ✓
6. Build landing page with "Sign in with LinkedIn" ✓
7. Test OAuth flow ✓
8. **Enhancement**: Add Framer Motion parallax effects to landing page ✓
   - Parallax background layer with smooth scroll
   - Floating decorative LinkedIn icon
   - Staggered entrance animations for hero content
   - Scroll-triggered animations for feature cards
   - Respects `prefers-reduced-motion` for accessibility

### Phase 3: Post Management (Days 5-7)

1. Create `/src/lib/validation.ts` with Zod schemas
2. Implement API routes:
   - `/api/posts` (GET list, POST create)
   - `/api/posts/[id]` (GET single, PATCH update, DELETE)
3. Add audit logging to all endpoints
4. Build post editor UI (`/src/components/posts/post-editor.tsx`)
   - Character counter (3000 max)
   - Auto-save every 30 seconds
   - Preview mode
5. Build post list UI (`/src/app/posts/page.tsx`)
6. Build dashboard (`/src/app/dashboard/page.tsx`)

### Phase 4: AI Integration (Days 8-9)

1. Create `/src/lib/anthropic.ts` with Claude client
2. Implement `/src/app/api/ai/suggestions/route.ts`
   - Use Claude 3.5 Sonnet
   - Prompt: "Generate professional LinkedIn post about: {topic}"
   - Rate limit: 10 requests/hour/user
3. Add "Get AI Suggestion" button to post editor
4. Display suggestions in modal, allow selection
5. Mark posts with `aiAssisted: true` badge

### Phase 5: LinkedIn Publishing (Days 10-12)

1. Create `/src/lib/linkedin.ts` with `publishToLinkedIn()` function
   - Endpoint: `https://api.linkedin.com/v2/ugcPosts`
   - Headers: `Authorization: Bearer {token}`, `X-Restli-Protocol-Version: 2.0.0`
   - Body: `{ author, lifecycleState: "PUBLISHED", specificContent, visibility }`
2. Implement `/src/app/api/posts/publish/route.ts`
   - Validate `confirmPublish === true`
   - Check token expiry
   - Call LinkedIn API
   - Update post status
   - Create audit log
3. Build `/src/app/posts/[id]/publish/page.tsx`
   - Post preview
   - Warning banner
   - Confirmation checkbox (required)
   - "Publish Now" button
4. Test end-to-end publishing flow

### Phase 6: Scheduling (Days 13-14)

1. Add schedule picker to post editor (`/src/components/posts/schedule-picker.tsx`)
2. Update `/api/posts/[id]` to handle `scheduledFor` field
3. Create `/src/app/api/cron/publish-scheduled/route.ts`
   - Query posts: `status = SCHEDULED AND scheduledFor <= NOW`
   - For each post, call publish logic
4. Create `vercel.json` with cron config: `*/5 * * * *` (every 5 minutes)
5. Test scheduled publishing locally

### Phase 7: Audit & Compliance (Days 15-16)

1. Build audit log viewer (`/src/app/audit/page.tsx`)
   - Table with: timestamp, action, entity, status, details
   - Pagination (50 per page)
   - Filter by action type
2. Review all API routes for complete audit logging
3. Add IP address and user agent to audit logs
4. Create compliance documentation:
   - Update README.md
   - Create DATA_USAGE.md
   - Create COMPLIANCE.md

### Phase 8: Polish & Testing (Days 17-18)

1. Add error boundaries and toast notifications
2. Add loading states (skeleton loaders)
3. Responsive design audit (mobile, tablet)
4. Test all user flows:
   - Sign in → Create draft → Get AI suggestion → Edit → Publish
   - Sign in → Create draft → Schedule → Wait → Verify published
   - Error scenarios: expired token, rate limit, invalid content
5. Accessibility audit (keyboard navigation, screen readers)

### Phase 9: Deployment (Days 19-20)

1. Setup Vercel project (connect GitHub repo)
2. Configure environment variables in Vercel dashboard
3. Update LinkedIn app redirect URL: `https://[project].vercel.app/api/auth/callback/linkedin`
4. Deploy: `vercel --prod`
5. Run Prisma migration in production
6. Post-deployment testing:
   - OAuth flow
   - Post publishing
   - Scheduled posts (wait 5 min)
   - Audit logs
7. Monitor for errors (Vercel logs, Sentry if configured)

## Environment Variables

### Doppler Secret Management ✅ INTEGRATED

This project uses **Doppler** for secure secret management across all environments.

**Benefits**:
- Work from any machine without managing `.env` files
- Team collaboration with controlled access
- Separate environments (dev/staging/prod)
- Audit trails for secret access

**Setup Guide**: See [setup/DOPPLER_SETUP.md](./setup/DOPPLER_SETUP.md) for complete instructions.

**Quick Start**:
```bash
doppler login && doppler setup  # Select: publishflow > dev
npm run dev  # Uses Doppler automatically
```

#### Required Secrets

```bash
# Database
DATABASE_URL="file:./dev.db"

# NextAuth.js (generate: openssl rand -base64 32)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# LinkedIn OAuth (from LinkedIn Developer Portal)
LINKEDIN_CLIENT_ID="your_client_id"
LINKEDIN_CLIENT_SECRET="your_client_secret"

# Anthropic Claude API
ANTHROPIC_API_KEY="your_anthropic_api_key"

# Token encryption (generate: openssl rand -hex 32)
TOKEN_ENCRYPTION_KEY="your_32_byte_hex_key"
```

**Note**: All secrets are stored in Doppler. The `.env` file is no longer needed for development. See [setup/DOPPLER_SETUP.md](./setup/DOPPLER_SETUP.md) for detailed setup guide.

### Snyk Security Monitoring ✅ INTEGRATED

This project uses **Snyk** for continuous dependency security monitoring.

**Current Status**: No vulnerabilities detected (145 dependencies tested)

**Dashboard**: [View Security Report](https://app.snyk.io/org/pinkish-warrior/project/64db0238-fd04-40d5-83a7-cc999c9333a0)

**Running Scans**:
```bash
npm run security  # Run vulnerability scan
```

**Setup**: See [SECURITY.md](./SECURITY.md) for complete security documentation and setup instructions.

## LinkedIn API Integration Details

### OAuth Scopes

- `openid` - User identification
- `profile` - User profile info
- `email` - User email
- `w_member_social` - **Critical**: Permission to post on behalf of user

### Publishing Endpoint

```typescript
POST https://api.linkedin.com/v2/ugcPosts
Headers:
  Authorization: Bearer {accessToken}
  Content-Type: application/json
  X-Restli-Protocol-Version: 2.0.0

Body:
{
  "author": "urn:li:person:{linkedinUserId}",
  "lifecycleState": "PUBLISHED",
  "specificContent": {
    "com.linkedin.ugc.ShareContent": {
      "shareCommentary": {
        "text": "{postContent}"
      },
      "shareMediaCategory": "NONE"
    }
  },
  "visibility": {
    "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
  }
}
```

### Error Handling

- **401 Unauthorized**: Token expired → Prompt re-authentication
- **429 Too Many Requests**: Rate limit → Parse `Retry-After` header, show user message
- **400 Bad Request**: Validation error → Display specific error to user
- **Network errors**: Retry up to 3 times with exponential backoff

## Verification & Testing

### Local Development Testing

1. **OAuth Flow**:
   - Visit `http://localhost:3000`
   - Click "Sign in with LinkedIn"
   - Verify redirect to LinkedIn
   - Grant permissions
   - Verify redirect back to app
   - Check user created in database: `npx prisma studio`

2. **Post Creation**:
   - Navigate to `/posts/new`
   - Enter post content
   - Click "Save Draft"
   - Verify post in database with status DRAFT
   - Check audit log entry created

3. **AI Suggestions**:
   - In post editor, click "Get AI Suggestion"
   - Enter topic (e.g., "productivity tips")
   - Verify Claude API called
   - Verify suggestions displayed
   - Select suggestion and verify content populated

4. **Publishing**:
   - Edit a draft post
   - Click "Publish"
   - Verify confirmation page loads
   - Check checkbox "I confirm..."
   - Click "Publish Now"
   - Verify success message
   - **Critical**: Verify post appears on your LinkedIn profile
   - Verify post status updated to PUBLISHED
   - Verify `linkedinId` and `linkedinUrl` populated
   - Check audit log entry: action = POST_PUBLISHED, success = true

5. **Scheduling**:
   - Create new draft
   - Click "Schedule"
   - Select date/time 5 minutes in future
   - Save
   - Verify status = SCHEDULED
   - Wait 5 minutes (cron runs)
   - Verify post status = PUBLISHED
   - Verify post on LinkedIn

6. **Audit Logs**:
   - Navigate to `/audit`
   - Verify all actions logged
   - Test filtering by action type
   - Verify pagination works

### Production Testing Checklist

- [ ] LinkedIn OAuth works with production URL
- [ ] Posts publish to LinkedIn successfully
- [ ] Scheduled posts trigger via Vercel Cron
- [ ] Audit logs capture all actions
- [ ] Error messages user-friendly
- [ ] Mobile responsive
- [ ] Token expiry handled gracefully
- [ ] Rate limiting works
- [ ] Database persists data

## Security Considerations

**For complete security documentation, see [SECURITY.md](./SECURITY.md)**

### Key Security Measures

1. **Dependency Security** ✅
   - Snyk monitoring: 0 vulnerabilities detected
   - Automated daily scans
   - Real-time alerts for new vulnerabilities

2. **Secret Management** ✅
   - Doppler for all environment variables
   - No `.env` files in git
   - Encrypted secret storage with audit trails

3. **Token Encryption**:
   - Implement encryption for `accessToken` and `refreshToken` before storing
   - Use `crypto` module with AES-256-GCM
   - Store encryption key in `TOKEN_ENCRYPTION_KEY` env var

4. **Input Validation**:
   - Use Zod schemas for all API inputs
   - Validate content length (1-3000 chars)
   - Sanitize user input (prevent XSS)

5. **Rate Limiting**:
   - AI suggestions: 10 per hour per user
   - Publishing: 20 per day per user (LinkedIn's limit)
   - Implement in-memory rate limit tracker

6. **CORS & Security Headers**:
   - Add security headers in `next.config.js`
   - X-Content-Type-Options: nosniff
   - X-Frame-Options: DENY
   - X-XSS-Protection: 1; mode=block

7. **Route Protection**:
   - Middleware protects all `/dashboard`, `/posts`, `/audit` routes
   - API routes check session before execution

### Security Testing

Run security checks before deployment:
```bash
npm run security        # Snyk vulnerability scan
npm run lint            # Code quality checks
```

## Compliance Checklist

Before launching:

- [ ] Human confirmation required for all publishes
- [ ] No autonomous posting functionality
- [ ] Audit logs capture all actions with timestamps
- [ ] Users can delete their data (account deletion endpoint)
- [ ] Privacy policy linked in footer
- [ ] Clear AI disclosure badges on AI-assisted posts
- [ ] Token storage encrypted
- [ ] Users can revoke access via LinkedIn
- [ ] No engagement automation features
- [ ] No scraping or unauthorized data collection
- [ ] README includes compliance statement

## Success Metrics

- User can sign in with LinkedIn ✓
- User can create and edit drafts ✓
- User can get AI suggestions ✓
- User can publish to LinkedIn with confirmation ✓
- User can schedule posts ✓
- Scheduled posts publish automatically ✓
- All actions appear in audit logs ✓
- No posts published without explicit user confirmation ✓

## Potential Issues & Solutions

1. **Token Expiry**: Store `tokenExpiry`, check before publish, prompt re-auth if expired
2. **Rate Limits**: Parse `Retry-After` header, queue retry, show user message
3. **Cron Reliability**: Use Vercel Cron (requires Pro) or GitHub Actions for free tier
4. **Database Size**: SQLite handles 10k+ users easily; migrate to PostgreSQL if needed (Prisma makes this simple)
5. **AI Costs**: Rate limit to 10/hour/user, use Claude Haiku for simple requests

## Notes

- **Development Time**: Estimated 20 days for full implementation
- **MVP Focus**: Ship core features first, polish later
- **Testing**: Test with personal LinkedIn account throughout development
- **LinkedIn Approval**: Already obtained for `w_member_social` ✓
- **Deployment**: Vercel free tier sufficient for MVP (upgrade for cron jobs)
