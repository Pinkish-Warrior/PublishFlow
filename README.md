# PublishFlow

**Compliance-first LinkedIn content scheduling and publishing tool**

[![Security Status](https://snyk.io/test/github/Pinkish-Warrior/PublishFlow/badge.svg)](https://snyk.io/test/github/Pinkish-Warrior/PublishFlow)

PublishFlow is a Next.js application designed to help professionals schedule and publish LinkedIn content while maintaining strict compliance with LinkedIn's API terms. Every publish action requires explicit human confirmation, with comprehensive audit logging for transparency.

## Features

- **LinkedIn OAuth Authentication** - Secure sign-in with LinkedIn
- **Draft Management** - Create, edit, and organize post drafts
- **AI-Assisted Content** - Optional content suggestions powered by Anthropic API
- **Post Scheduling** - Schedule posts for future publishing
- **Manual Confirmation** - Human-in-the-loop for every publish action
- **Comprehensive Audit Logs** - Track all actions with full transparency
- **Mobile Responsive** - Works seamlessly on all devices

## Project Status

### ✅ Completed Phases

- **Phase 1**: Foundation (Next.js, Prisma, SQLite)
- **Phase 2**: Authentication (LinkedIn OAuth, NextAuth.js)
- **Infrastructure**: Doppler (secret management) & Snyk (security monitoring)

### 🚧 Current Phase

- **Phase 3**: Post Management (CRUD operations, UI components)

### 📋 Upcoming Phases

- **Phase 4**: AI Integration (Anthropic API)
- **Phase 5**: LinkedIn Publishing (API integration)
- **Phase 6**: Scheduling (Cron jobs)
- **Phase 7**: Audit & Compliance
- **Phase 8**: Polish & Testing
- **Phase 9**: Deployment

See [TECHPLAN.md](./docs/TECHPLAN.md) for detailed implementation roadmap.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js with LinkedIn OAuth
- **AI**: Anthropic API
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Secrets Management**: Doppler
- **Security Monitoring**: Snyk
- **Deployment**: Vercel

## Quick Start

**Choose your setup path:**
- **Team Members** → Use Doppler (shared secrets)
- **External Contributors** → Use local .env file

---

### 🔵 For Team Members (With Doppler Access)

**Prerequisites:**
- Node.js 18+ and npm
- Doppler CLI
- Access to PublishFlow Doppler project

**Setup Steps:**

1. **Clone and install**
   ```bash
   git clone https://github.com/Pinkish-Warrior/PublishFlow.git
   cd PublishFlow
   npm install
   ```

2. **Setup Doppler**
   ```bash
   # Install Doppler CLI
   brew install dopplerhq/cli/doppler

   # Authenticate
   doppler login

   # Setup project
   doppler setup
   # Select: publishflow > dev
   ```

   See [DOPPLER_SETUP.md](./docs/setup/DOPPLER_SETUP.md) for detailed instructions.

3. **Initialize database**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

   Visit [http://localhost:3000](http://localhost:3000)

---

### 🟢 For External Contributors (Without Doppler)

**Prerequisites:**
- Node.js 18+ and npm
- LinkedIn Developer App (create at [developers.linkedin.com](https://www.linkedin.com/developers/apps))
- Anthropic API key (optional, for AI features)

**Setup Steps:**

1. **Clone and install**
   ```bash
   git clone https://github.com/Pinkish-Warrior/PublishFlow.git
   cd PublishFlow
   npm install
   ```

2. **Configure environment variables**
   ```bash
   # Copy the example file
   cp .env.example .env

   # Generate required secrets
   openssl rand -base64 32  # Copy this for NEXTAUTH_SECRET
   openssl rand -hex 32     # Copy this for TOKEN_ENCRYPTION_KEY

   # Edit .env and fill in all values
   nano .env  # or use your preferred editor
   ```

   **Required setup in `.env`:**
   - `NEXTAUTH_SECRET` - Generated secret from above
   - `TOKEN_ENCRYPTION_KEY` - Generated key from above
   - `LINKEDIN_CLIENT_ID` - From your LinkedIn app
   - `LINKEDIN_CLIENT_SECRET` - From your LinkedIn app
   - `ANTHROPIC_API_KEY` - (Optional) For AI features

   See [.env.example](./.env.example) for detailed instructions.

3. **Initialize database**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

4. **Run development server**
   ```bash
   npm run dev:local
   ```

   Visit [http://localhost:3000](http://localhost:3000)

**Note:** You'll need to create your own LinkedIn Developer App and get approval for the `w_member_social` scope to test publishing features. See [CONTRIBUTING.md](./CONTRIBUTING.md) for more details.

## Documentation

Our documentation is organized to guide you through different aspects of the project:

### Getting Started
- **[TECHPLAN.md](./docs/TECHPLAN.md)** - Complete implementation plan and technical architecture
- **[DOPPLER_SETUP.md](./docs/setup/DOPPLER_SETUP.md)** - Secret management setup guide
- **[ASIDE.md](./docs/PROJECT_STATUS.md)** - Project status and completed integrations

### Development Workflow
1. Read [TECHPLAN.md](./docs/TECHPLAN.md) to understand the architecture
2. Follow [DOPPLER_SETUP.md](./docs/setup/DOPPLER_SETUP.md) to configure secrets
3. Check [PROJECT_STATUS.md](./docs/PROJECT_STATUS.md) for current project status
4. Review [SECURITY.md](./docs/SECURITY.md) for security best practices

### Reference Documentation
- **[SECURITY.md](./docs/SECURITY.md)** - Security policy, vulnerability reporting, and compliance
- **[PRIVACY.md](./PRIVACY.md)** - Privacy policy and data handling
- **[USECASE.md](./docs/USECASE.md)** - Use cases and user scenarios

### Guides
- **[JOBSEEKER_GUIDE.md](./docs/guides/JOBSEEKER_GUIDE.md)** - Guide for job seekers using PublishFlow

## Development

### Available Scripts

```bash
# Development
npm run dev          # Start dev server with Doppler
npm run dev:local    # Start dev server without Doppler (requires .env)

# Build
npm run build        # Build for production with Doppler
npm run build:local  # Build without Doppler

# Production
npm run start        # Start production server with Doppler
npm run start:local  # Start without Doppler

# Quality & Security
npm run lint         # Run ESLint
npm run lint:md      # Lint markdown files
npm run fix:md       # Fix markdown issues
npm run security     # Run Snyk security scan
npm run snyk:test    # Test for vulnerabilities
npm run snyk:monitor # Update Snyk monitoring
```

### Environment Variables

All secrets are managed through **Doppler**. Required secrets:

- `DATABASE_URL` - SQLite database path
- `NEXTAUTH_URL` - Application URL
- `NEXTAUTH_SECRET` - NextAuth.js secret key
- `LINKEDIN_CLIENT_ID` - LinkedIn OAuth client ID
- `LINKEDIN_CLIENT_SECRET` - LinkedIn OAuth client secret
- `ANTHROPIC_API_KEY` - Anthropic API key
- `TOKEN_ENCRYPTION_KEY` - Token encryption key

See [DOPPLER_SETUP.md](./docs/setup/DOPPLER_SETUP.md) for setup instructions.

## Security

### Security Monitoring

We use **Snyk** for continuous security monitoring:
- **Status**: 0 vulnerabilities (145 dependencies tested)
- **Monitoring**: Automated daily scans
- **Dashboard**: [View Report](https://app.snyk.io/org/pinkish-warrior/project/64db0238-fd04-40d5-83a7-cc999c9333a0)

### Reporting Vulnerabilities

If you discover a security vulnerability, please email [your-security-email@example.com]. See [SECURITY.md](./docs/SECURITY.md) for detailed reporting procedures.

### Security Features

- **Encrypted Token Storage** - LinkedIn tokens encrypted at rest
- **Human-in-the-Loop** - Manual confirmation required for all publishes
- **Comprehensive Audit Logs** - All actions logged with IP and user agent
- **Input Validation** - Zod schemas for all API inputs
- **Rate Limiting** - Protection against abuse
- **Secure Secret Management** - Doppler for all sensitive data

## Compliance

PublishFlow is fully compliant with LinkedIn's API Terms of Service:

- ✅ No autonomous posting
- ✅ Manual confirmation required for all publishes
- ✅ Comprehensive audit logging
- ✅ User control and transparency
- ✅ No engagement automation
- ✅ No data scraping
- ✅ Approved for `w_member_social` scope

See [SECURITY.md](./docs/SECURITY.md) for complete compliance documentation.

## Contributing

We welcome contributions! Here's how to get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and security scans (`npm run lint && npm run security`)
5. Commit your changes (follow conventional commits)
6. Push to your branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: fix a bug
docs: documentation changes
style: formatting, missing semicolons, etc
refactor: code restructuring
test: add tests
chore: maintenance tasks
```

## Project Structure

```
PublishFlow/
├── prisma/              # Database schema and migrations
├── src/
│   ├── app/             # Next.js App Router pages and API routes
│   ├── components/      # React components
│   ├── lib/             # Utility functions and configurations
│   └── types/           # TypeScript type definitions
├── docs/                # Additional documentation
├── TECHPLAN.md          # Technical implementation plan
├── DOPPLER_SETUP.md     # Secret management guide
├── SECURITY.md          # Security policy
└── README.md            # This file
```

## LinkedIn API Integration

PublishFlow has received LinkedIn API approval for the `w_member_social` permission, allowing it to publish posts on behalf of authenticated users.

### Approved Scopes

- `openid` - User identification
- `profile` - User profile information
- `email` - User email address
- `w_member_social` - Post publishing permission

### Compliance Requirements

Every publish action requires:
1. Explicit user review of content
2. Manual confirmation checkbox
3. Click on "Publish Now" button
4. Audit log entry with timestamp and details

## License

ISC

## Support

- **Documentation**: Check our comprehensive docs in this repo
- **Issues**: [GitHub Issues](https://github.com/Pinkish-Warrior/PublishFlow/issues)
- **Security**: [Security Policy](./docs/SECURITY.md)

## Acknowledgments

- LinkedIn API for social posting capabilities
- Anthropic for AI-powered content suggestions
- Doppler for secure secret management
- Snyk for security monitoring

---

**Status**: In Development (Phase 3)
**Last Updated**: 2026-01-12
**Repository**: [github.com/Pinkish-Warrior/PublishFlow](https://github.com/Pinkish-Warrior/PublishFlow)
