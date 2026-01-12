# Doppler Setup Guide for PublishFlow

This guide walks you through setting up Doppler for secure secret management in PublishFlow, whether you're a new team member or working from a new machine.

## Why Doppler?

Doppler eliminates the hassle of managing `.env` files and provides:

- Work from any machine without copying sensitive `.env` files
- Never accidentally commit secrets to git
- Easy team collaboration with controlled access
- Separate environments (dev/staging/prod)
- Audit trails showing who accessed which secrets
- Automatic secret rotation support

## Prerequisites

- You have access to the PublishFlow Doppler project (ask project admin for invite)
- You're on macOS, Linux, or Windows

## Setup Steps

### 1. Install Doppler CLI

**macOS (Homebrew)**:
```bash
brew install dopplerhq/cli/doppler
```

**Linux**:
```bash
# Debian/Ubuntu
curl -sLf https://cli.doppler.com/install.sh | sh

# Or download directly
wget -q -O - https://cli.doppler.com/install.sh | sh
```

**Windows**:
```powershell
# Using Scoop
scoop install doppler

# Or download from https://cli.doppler.com/download
```

Verify installation:
```bash
doppler --version
```

### 2. Authenticate with Doppler

Run the authentication command:
```bash
doppler login
```

This will:
1. Open your browser
2. Prompt you to log in to your Doppler account
3. Authorize the CLI
4. Return a success message

Verify authentication:
```bash
doppler whoami
```

You should see your name, workplace, and token details.

### 3. Setup the PublishFlow Project

Navigate to your local PublishFlow directory:
```bash
cd /path/to/PublishFlow
```

Run the setup command:
```bash
doppler setup
```

When prompted:
- **Select Project**: Choose `publishflow`
- **Select Config**: Choose `dev` (for local development)

This creates a `.doppler` directory in your project (already gitignored).

Verify configuration:
```bash
doppler configure get project config --plain
```

Should output:
```
publishflow
dev
```

### 4. Verify Secrets are Accessible

Check which secrets are available:
```bash
doppler secrets --only-names
```

You should see:
- `ANTHROPIC_API_KEY`
- `DATABASE_URL`
- `LINKEDIN_CLIENT_ID`
- `LINKEDIN_CLIENT_SECRET`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `TOKEN_ENCRYPTION_KEY`
- Plus Doppler metadata variables

Test environment variable injection:
```bash
doppler run -- printenv | grep NEXTAUTH_URL
```

You should see the NextAuth URL printed.

### 5. Run the Application

You're all set! Run the dev server:
```bash
npm run dev
```

This automatically uses `doppler run -- next dev` (configured in `package.json`).

The application will:
1. Fetch secrets from Doppler
2. Inject them as environment variables
3. Start the Next.js development server

Visit `http://localhost:3000` to verify everything works.

### 6. (Optional) Fallback to Local Mode

If you need to run without Doppler (not recommended), you can:

1. Create a `.env` file with all required secrets
2. Run: `npm run dev:local`

This bypasses Doppler and uses the local `.env` file.

## Available Environments

### `dev` (Local Development)
- Default environment for local development
- Uses SQLite database (`file:./dev.db`)
- NEXTAUTH_URL points to `http://localhost:3000`
- All developers use this config

### `prod` (Production)
- For Vercel deployment
- Uses production database URL
- NEXTAUTH_URL points to production domain
- Requires service token for CI/CD

## Working with Secrets

### View a Secret Value

```bash
doppler secrets get NEXTAUTH_SECRET
```

### Set/Update a Secret

```bash
doppler secrets set NEXTAUTH_SECRET="new-secret-value"
```

**Warning**: This updates the secret for all team members! Only do this if you intend to change the shared value.

### Download Secrets for Backup

```bash
doppler secrets download --no-file --format env > secrets-backup.txt
```

**Important**: Never commit this file! Add to `.gitignore` immediately.

## Team Collaboration

### Adding New Team Members

Project admins can invite team members:

1. Go to https://dashboard.doppler.com
2. Select the `publishflow` project
3. Navigate to Team Settings
4. Click "Invite Member"
5. Send invite email
6. New member follows this guide starting from Step 2

### Access Levels

- **Owner**: Full access, can manage team
- **Admin**: Manage secrets and configs
- **Developer**: Read secrets, no write access
- **Viewer**: View secret names only (values hidden)

## Troubleshooting

### Issue: "Not authenticated"

**Solution**:
```bash
doppler login
```

### Issue: "Project not found"

**Solution**: Ask project admin to invite you to the `publishflow` project.

### Issue: "Config not found"

**Solution**: Make sure you selected `dev` config:
```bash
doppler setup
# Select: publishflow > dev
```

### Issue: "Secrets not loading in app"

**Solution**: Verify Doppler is running:
```bash
doppler run -- printenv | grep DATABASE_URL
```

If this works but app doesn't, restart the dev server:
```bash
npm run dev
```

### Issue: Need to switch environments

To switch from `dev` to `prod`:
```bash
doppler setup
# Select: publishflow > prod
```

Then restart your app.

## Production Deployment (Vercel)

For production deployment, you'll need a **Doppler Service Token**:

1. Go to https://dashboard.doppler.com
2. Select `publishflow` project
3. Select `prod` config
4. Click "Access" → "Service Tokens"
5. Generate new token: `DOPPLER_TOKEN`
6. Copy the token (shown only once!)

In Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add: `DOPPLER_TOKEN` = `<your-service-token>`
3. Redeploy

Vercel will automatically fetch secrets from Doppler on each build.

## Security Best Practices

1. **Never commit `.env` files**: They're gitignored, keep it that way
2. **Don't share service tokens**: Generate separate tokens for different services
3. **Review audit logs**: Check who accessed secrets in Doppler dashboard
4. **Rotate secrets regularly**: Update sensitive keys every 90 days
5. **Use minimal access**: Give team members only the access they need

## Additional Resources

- Doppler Documentation: https://docs.doppler.com/
- Next.js Integration: https://docs.doppler.com/docs/nextjs
- CLI Reference: https://docs.doppler.com/docs/cli
- Doppler Dashboard: https://dashboard.doppler.com

## Support

Questions about Doppler setup? Contact:
- Project admin: [Your email]
- Doppler support: support@doppler.com
- PublishFlow repo: https://github.com/Pinkish-Warrior/PublishFlow/issues

---

**Last Updated**: 2026-01-12
**Status**: Active
