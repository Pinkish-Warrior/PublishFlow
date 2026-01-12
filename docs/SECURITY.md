# Security Policy

## Overview

PublishFlow takes security seriously. This document outlines our security practices, how to report vulnerabilities, and our commitment to keeping the application secure.

## Supported Versions

Currently, we are in active development. Security updates are applied to the `Main` branch immediately.

| Version | Supported          |
| ------- | ------------------ |
| Main    | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in PublishFlow, please report it responsibly.

### How to Report

**Email**: [your-security-email@example.com]

Please include:
- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact
- Any suggested fixes (if you have them)

### What to Expect

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**:
  - Critical vulnerabilities: 24-48 hours
  - High vulnerabilities: 1 week
  - Medium/Low vulnerabilities: Assessed and scheduled

### Security Disclosure Policy

- We will acknowledge your report within 48 hours
- We will provide regular updates on our progress
- We will notify you when the vulnerability is fixed
- We will credit you in our security acknowledgments (unless you prefer to remain anonymous)

## Security Measures

### 1. Dependency Security

**Snyk Integration** ✅

We use Snyk to continuously monitor dependencies for known vulnerabilities:

- **Current Status**: [![Known Vulnerabilities](https://snyk.io/test/github/Pinkish-Warrior/PublishFlow/badge.svg)](https://snyk.io/test/github/Pinkish-Warrior/PublishFlow)
- **Scans**: Automated daily scans
- **Monitoring**: Real-time alerts for new vulnerabilities
- **Dashboard**: [View Security Report](https://app.snyk.io/org/pinkish-warrior/project/64db0238-fd04-40d5-83a7-cc999c9333a0)

**Latest Scan Results**:
- Date: 2026-01-12
- Dependencies Tested: 145
- Vulnerabilities Found: 0
- Status: ✅ No vulnerable paths found

### 2. Secret Management

**Doppler Integration** ✅

All secrets are managed through Doppler:

- No `.env` files committed to git
- Encrypted secret storage
- Team access control
- Audit logs for secret access
- Automatic secret rotation support

Protected secrets:
- LinkedIn OAuth credentials
- NextAuth.js secrets
- Anthropic API keys
- Database credentials
- Token encryption keys

### 3. Authentication & Authorization

- **OAuth 2.0**: LinkedIn OAuth for user authentication
- **Session Management**: Secure JWT-based sessions via NextAuth.js
- **Token Storage**: Encrypted LinkedIn access tokens in database
- **Route Protection**: Middleware-based authentication checks

### 4. LinkedIn API Security

- **Compliance-First**: Human-in-the-loop for all publishing
- **Manual Confirmation**: Required before every post
- **Audit Trails**: Complete logging of all actions
- **Token Encryption**: AES-256-GCM for access tokens
- **Limited Scope**: Only `w_member_social` permission (approved by LinkedIn)

### 5. Data Protection

- **Encryption at Rest**: Sensitive tokens encrypted in SQLite database
- **Encryption in Transit**: HTTPS only in production
- **Minimal Data Collection**: Only essential user data stored
- **User Control**: Users can delete their data anytime

### 6. Input Validation

- **Zod Schemas**: All API inputs validated
- **Content Length**: Post content limited to 3000 characters
- **XSS Prevention**: Input sanitization on all user content
- **SQL Injection**: Protected via Prisma ORM parameterized queries

### 7. Rate Limiting

- **AI Suggestions**: 10 requests per hour per user
- **Publishing**: 20 posts per day per user (LinkedIn's limit)
- **API Endpoints**: Rate limiting on sensitive operations

### 8. Audit Logging

Complete audit trail for:
- User authentication events
- Post creation and editing
- Publishing actions
- AI-assisted content generation
- Failed operations and errors
- IP addresses and user agents

## Known Security Considerations

### Current Limitations

1. **SQLite Database**:
   - Suitable for development and small deployments
   - For production scale, consider PostgreSQL migration
   - Database file should have restricted permissions (600)

2. **Token Refresh**:
   - LinkedIn access tokens expire
   - Users must re-authenticate when tokens expire
   - No background token refresh implemented

3. **Rate Limiting**:
   - In-memory rate limiting (resets on server restart)
   - For production, use Redis-based rate limiting

### Planned Security Enhancements

- [ ] Redis-based session storage for production
- [ ] Automated token refresh flow
- [ ] Two-factor authentication (2FA)
- [ ] IP-based rate limiting with Redis
- [ ] Content Security Policy (CSP) headers
- [ ] Subresource Integrity (SRI) for CDN resources

## Compliance

### LinkedIn API Compliance

PublishFlow is fully compliant with LinkedIn's API Terms of Service:

- ✅ No autonomous posting
- ✅ Manual confirmation required
- ✅ Comprehensive audit logging
- ✅ User control and transparency
- ✅ No engagement automation
- ✅ No data scraping
- ✅ Approved for `w_member_social` scope

### Data Privacy

- **GDPR Considerations**: Users can export and delete their data
- **Data Retention**: Posts and audit logs retained per user preferences
- **Third-Party APIs**: Anthropic (Claude) and LinkedIn only
- **Data Sharing**: No data sold or shared with third parties

## Security Best Practices for Users

### For End Users

1. **Logout**: Always logout from shared computers
2. **Review Posts**: Carefully review content before publishing
3. **Monitor Activity**: Check audit logs regularly
4. **Revoke Access**: Use LinkedIn settings to revoke access if needed
5. **Strong Passwords**: Use strong LinkedIn passwords

### For Developers

1. **Doppler**: Never commit `.env` files
2. **Secrets**: Rotate secrets every 90 days
3. **Dependencies**: Keep dependencies updated
4. **Code Review**: All changes reviewed before merging
5. **Testing**: Test authentication flows regularly

## Security Testing

### Continuous Monitoring

- **Snyk**: Daily dependency scans
- **npm audit**: Run before each deployment
- **Manual Reviews**: Code reviews for security implications
- **Penetration Testing**: Planned for production release

### Running Security Tests

```bash
# Check for dependency vulnerabilities
npm run security

# Or run Snyk directly
npm run snyk:test

# View full security report
npm run snyk:monitor
```

## Security Updates

### Update Policy

- **Critical**: Immediate patch and deployment
- **High**: Fixed within 7 days
- **Medium**: Fixed in next release cycle
- **Low**: Scheduled for upcoming releases

### Staying Informed

- Watch this repository for security advisories
- Subscribe to Snyk alerts (enabled automatically)
- Check the [CHANGELOG](./CHANGELOG.md) for security updates

## Security Tools Used

| Tool | Purpose | Status |
|------|---------|--------|
| **Snyk** | Dependency vulnerability scanning | ✅ Active |
| **Doppler** | Secret management | ✅ Active |
| **NextAuth.js** | Authentication & session management | ✅ Active |
| **Prisma** | Database ORM (SQL injection prevention) | ✅ Active |
| **Zod** | Input validation | ✅ Active |
| **ESLint** | Code quality and security linting | ✅ Active |

## Contact

For security-related questions or concerns:

- **Security Issues**: [your-security-email@example.com]
- **General Questions**: [GitHub Issues](https://github.com/Pinkish-Warrior/PublishFlow/issues)
- **Snyk Dashboard**: [View Report](https://app.snyk.io/org/pinkish-warrior/project/64db0238-fd04-40d5-83a7-cc999c9333a0)

## Acknowledgments

We appreciate responsible disclosure. Security researchers who report valid vulnerabilities will be credited here (with permission):

- _No reports yet_

## Additional Resources

- [LinkedIn API Security Best Practices](https://docs.microsoft.com/en-us/linkedin/shared/api-guide/best-practices)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Snyk Documentation](https://docs.snyk.io/)
- [Doppler Security](https://docs.doppler.com/docs/security)

---

**Last Updated**: 2026-01-12
**Next Review**: 2026-02-12
**Status**: Active
