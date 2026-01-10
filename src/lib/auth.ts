import { NextAuthOptions } from 'next-auth';
import { prisma } from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      type: 'oauth',
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      authorization: {
        url: 'https://www.linkedin.com/oauth/v2/authorization',
        params: {
          scope: 'w_member_social',
          response_type: 'code',
        },
      },
      token: {
        url: 'https://www.linkedin.com/oauth/v2/accessToken',
        async request(context: any) {
          const { provider, params, checks } = context;
          const response = await fetch(provider.token.url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              grant_type: 'authorization_code',
              code: params.code,
              redirect_uri: provider.callbackUrl,
              client_id: provider.clientId,
              client_secret: provider.clientSecret,
            }),
          });
          const tokens = await response.json();
          return { tokens };
        },
      },
      userinfo: {
        url: 'https://api.linkedin.com/v2/userinfo',
        async request({ tokens }: any) {
          // Skip userinfo call since we only have w_member_social scope
          // Return minimal profile from the token
          return {
            id: tokens.access_token?.substring(0, 10) || 'linkedin-user',
            name: 'LinkedIn User',
            email: null,
          };
        },
      },
      profile(profile: any) {
        return {
          id: profile.id || 'linkedin-user',
          name: profile.name || 'LinkedIn User',
          email: profile.email || null,
          image: null,
        };
      },
    } as any,
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // Initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at ? account.expires_at * 1000 : 0,
          userId: user.id,
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // Access token has expired, need to refresh (if LinkedIn provides refresh tokens)
      // For now, we'll just return the token and handle re-auth in the app
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.userId as string;
        session.accessToken = token.accessToken as string;
        session.error = token.error as string | undefined;
      }
      return session;
    },
    async signIn({ account, profile }) {
      if (!account || !profile) return false;

      try {
        // Use access token as unique identifier since we only have posting scope
        const linkedinId = account.providerAccountId || ((profile as any).id as string) || account.access_token?.substring(0, 20) || 'temp-id';
        const email = ((profile as any).email as string | null) || null;
        const name = ((profile as any).name as string) || 'LinkedIn User';
        const image = ((profile as any).image as string | null) || null;

        // Store or update user with LinkedIn data and tokens
        await prisma.user.upsert({
          where: { linkedinId },
          update: {
            email,
            name,
            image,
            accessToken: account.access_token,
            refreshToken: account.refresh_token,
            tokenExpiry: account.expires_at ? new Date(account.expires_at * 1000) : null,
            lastLoginAt: new Date(),
          },
          create: {
            linkedinId,
            email,
            name,
            image,
            accessToken: account.access_token,
            refreshToken: account.refresh_token,
            tokenExpiry: account.expires_at ? new Date(account.expires_at * 1000) : null,
            lastLoginAt: new Date(),
          },
        });

        // Create audit log for login
        await prisma.auditLog.create({
          data: {
            action: 'USER_LOGIN',
            entityType: 'user',
            entityId: linkedinId,
            success: true,
            user: {
              connect: { linkedinId },
            },
          },
        });

        return true;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false;
      }
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
