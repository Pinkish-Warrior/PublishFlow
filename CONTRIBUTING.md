# Contributing to PublishFlow

Thank you for your interest in contributing to PublishFlow! This document provides guidelines for external contributors who want to help improve the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Contributions](#making-contributions)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Submitting Pull Requests](#submitting-pull-requests)
- [LinkedIn API Limitations](#linkedin-api-limitations)

## Code of Conduct

By participating in this project, you agree to:
- Be respectful and inclusive
- Welcome newcomers and help them get started
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards other contributors

## Getting Started

### Prerequisites

Before you begin, make sure you have:
- Node.js 18 or higher
- npm (comes with Node.js)
- Git
- A code editor (VS Code recommended)
- Basic knowledge of Next.js, React, and TypeScript

### Understanding the Project

Before contributing, familiarize yourself with:
- [README.md](./README.md) - Project overview
- [TECHPLAN.md](./docs/TECHPLAN.md) - Technical architecture and implementation plan
- [SECURITY.md](./docs/SECURITY.md) - Security policies and compliance requirements

## Development Setup

### 1. Fork and Clone

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/PublishFlow.git
cd PublishFlow
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

**Important:** External contributors do NOT use Doppler. Use local `.env` file instead.

```bash
# Copy the example file
cp .env.example .env
```

Edit `.env` and fill in the required values:

```bash
# Generate secrets
openssl rand -base64 32  # Use for NEXTAUTH_SECRET
openssl rand -hex 32     # Use for TOKEN_ENCRYPTION_KEY
```

**LinkedIn Developer App Setup:**
1. Go to [LinkedIn Developer Portal](https://www.linkedin.com/developers/apps)
2. Create a new app (or use existing)
3. Add redirect URL: `http://localhost:3000/api/auth/callback/linkedin`
4. Note: You may not have `w_member_social` scope approved, which is fine for most contributions
5. Copy Client ID and Client Secret to `.env`

**Anthropic API (Optional):**
- Only needed for AI features (Phase 4)
- Get free API key from [Anthropic Console](https://console.anthropic.com/)
- Leave empty if not testing AI features

### 4. Initialize Database

```bash
npx prisma migrate dev
npx prisma generate
```

### 5. Start Development Server

```bash
npm run dev:local
```

Visit [http://localhost:3000](http://localhost:3000)

## Making Contributions

### Types of Contributions

We welcome:
- **Bug fixes** - Fix issues in existing functionality
- **Feature enhancements** - Improve existing features
- **Documentation** - Improve docs, add examples, fix typos
- **UI/UX improvements** - Better design, accessibility, responsiveness
- **Tests** - Add test coverage
- **Performance improvements** - Optimize code, reduce bundle size

### Before Starting

1. **Check existing issues** - Look for open issues or create a new one
2. **Discuss major changes** - For significant features, open an issue first to discuss
3. **One feature per PR** - Keep pull requests focused on a single change
4. **Update documentation** - Document any user-facing changes

### Creating a Branch

```bash
# Create a feature branch from Main
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

Branch naming convention:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Test additions
- `chore/` - Maintenance tasks

## Coding Standards

### General Guidelines

- **TypeScript** - All code must be TypeScript (no JavaScript files)
- **Type Safety** - Avoid `any` type, use proper typing
- **Naming** - Use descriptive, clear variable and function names
- **Comments** - Add comments for complex logic only
- **File Structure** - Follow existing project structure
- **Imports** - Use absolute imports with `@/` prefix

### Code Style

We use ESLint and Prettier for code formatting:

```bash
# Check for linting errors
npm run lint

# Fix markdown formatting
npm run fix:md
```

### React/Next.js Best Practices

- Use React Server Components where possible
- Client components only when needed (use `'use client'`)
- Prefer `async/await` over promises
- Use Next.js App Router conventions
- Follow React hooks rules

### Security Considerations

- **Never commit secrets** - Use environment variables
- **Validate input** - Use Zod schemas for all API inputs
- **Sanitize output** - Prevent XSS attacks
- **SQL injection** - Use Prisma ORM (never raw SQL)
- **Authentication** - Protect all sensitive routes

## Testing

### Running Tests

```bash
# Run all tests (when available)
npm test

# Run security scan
npm run security
```

### What to Test

- UI components (when test framework is added)
- API endpoints
- Authentication flows
- Data validation
- Edge cases and error handling

### Manual Testing Checklist

Before submitting a PR, test:
- [ ] Feature works on desktop browsers (Chrome, Firefox, Safari)
- [ ] Feature works on mobile (responsive design)
- [ ] No console errors or warnings
- [ ] Authentication still works
- [ ] No security vulnerabilities introduced

## Submitting Pull Requests

### Before Submitting

1. **Update your branch**
   ```bash
   git checkout Main
   git pull upstream Main
   git checkout your-branch
   git rebase Main
   ```

2. **Run quality checks**
   ```bash
   npm run lint
   npm run security
   ```

3. **Test thoroughly** - Ensure everything works

4. **Update documentation** - If you changed functionality

### Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): short description

Longer description if needed

- Bullet points for details
- More details
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code formatting (no logic change)
- `refactor:` - Code refactoring
- `test:` - Add tests
- `chore:` - Maintenance tasks

**Examples:**
```
feat(posts): add character counter to post editor

- Display remaining characters
- Show warning when approaching limit
- Block submission over 3000 chars
```

```
fix(auth): handle expired LinkedIn tokens gracefully

Previously, expired tokens caused unhandled errors.
Now users are prompted to re-authenticate.
```

### Creating the Pull Request

1. **Push your branch**
   ```bash
   git push origin your-branch-name
   ```

2. **Open PR on GitHub**
   - Go to the PublishFlow repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill in the PR template

3. **PR Description Should Include:**
   - What changed and why
   - Related issue number (if applicable)
   - Screenshots (for UI changes)
   - Testing steps
   - Any breaking changes

### PR Review Process

- Maintainers will review your PR
- You may be asked to make changes
- Once approved, your PR will be merged
- Your contribution will be credited!

## LinkedIn API Limitations

### For Most Contributors

**You likely don't have `w_member_social` scope approval**, which means:
- ✅ You can test: UI, auth flow, draft management, scheduling
- ❌ You cannot test: Actual posting to LinkedIn

This is fine! Most contributions don't require LinkedIn API approval.

### Testing Without Publishing Scope

You can still contribute by:
- Building UI components
- Improving authentication flow
- Adding validation and error handling
- Writing documentation
- Improving accessibility
- Optimizing performance

### Getting LinkedIn API Approval (Optional)

If you want to test publishing features:
1. Create a LinkedIn Developer App
2. Apply for `w_member_social` scope
3. Explain: "Building a compliance-first content scheduler with human confirmation"
4. Wait for approval (can take several weeks)

## Project Structure

```
PublishFlow/
├── src/
│   ├── app/              # Next.js App Router pages and API routes
│   │   ├── page.tsx      # Landing page
│   │   ├── auth/         # Authentication pages
│   │   ├── dashboard/    # Dashboard page
│   │   └── api/          # API routes
│   ├── components/       # React components
│   │   ├── ui/           # Reusable UI components
│   │   └── providers/    # Context providers
│   ├── lib/              # Utility functions
│   │   ├── auth.ts       # NextAuth configuration
│   │   ├── prisma.ts     # Prisma client
│   │   └── validation.ts # Zod schemas
│   └── types/            # TypeScript types
├── prisma/               # Database schema and migrations
└── docs/                 # Additional documentation
```

## Development Phases

See [TECHPLAN.md](./docs/TECHPLAN.md) for complete details.

**Completed:**
- Phase 1: Foundation (Next.js, Prisma, SQLite)
- Phase 2: Authentication (LinkedIn OAuth)
- Infrastructure: Doppler + Snyk

**Current:**
- Phase 3: Post Management (UI, CRUD operations)

**Upcoming:**
- Phase 4: AI Integration
- Phase 5: LinkedIn Publishing
- Phase 6: Scheduling
- Phase 7: Audit & Compliance
- Phase 8: Polish & Testing
- Phase 9: Deployment

## Getting Help

- **Questions?** Open a [GitHub Discussion](https://github.com/Pinkish-Warrior/PublishFlow/discussions)
- **Bug reports** Open an [issue](https://github.com/Pinkish-Warrior/PublishFlow/issues)
- **Security issues** See [SECURITY.md](./docs/SECURITY.md)

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [LinkedIn API Documentation](https://docs.microsoft.com/en-us/linkedin/)

## License

By contributing to PublishFlow, you agree that your contributions will be licensed under the ISC License.

---

**Thank you for contributing to PublishFlow!** 🎉

We appreciate your time and effort in making this project better for everyone.
