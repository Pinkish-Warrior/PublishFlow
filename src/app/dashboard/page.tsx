'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            PublishFlow Dashboard
          </h1>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Success Message */}
          <div className="rounded-lg bg-green-50 p-6 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-green-800">
                  🎉 Authentication Successful!
                </h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>
                    You're now connected to LinkedIn and ready to start publishing posts.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="rounded-lg bg-white shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Your Account</h2>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">User ID</dt>
                <dd className="text-sm text-gray-900">{session.user.id}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="text-sm text-gray-900">{session.user.name || 'LinkedIn User'}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="text-sm text-gray-900">{session.user.email || 'Not available'}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Access Token</dt>
                <dd className="text-sm text-gray-900 font-mono">
                  {session.accessToken ? '✓ Connected' : '✗ Not available'}
                </dd>
              </div>
            </dl>
          </div>

          {/* Coming Soon */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white shadow p-6">
              <h3 className="text-lg font-semibold mb-2">Create Posts</h3>
              <p className="text-sm text-gray-600 mb-4">
                Draft and schedule LinkedIn posts with AI assistance.
              </p>
              <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                Coming in Phase 3
              </span>
            </div>

            <div className="rounded-lg bg-white shadow p-6">
              <h3 className="text-lg font-semibold mb-2">AI Suggestions</h3>
              <p className="text-sm text-gray-600 mb-4">
                Get content ideas powered by Claude AI.
              </p>
              <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800">
                Coming in Phase 4
              </span>
            </div>

            <div className="rounded-lg bg-white shadow p-6">
              <h3 className="text-lg font-semibold mb-2">Audit Logs</h3>
              <p className="text-sm text-gray-600 mb-4">
                View all your publishing activity and compliance logs.
              </p>
              <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                Coming in Phase 7
              </span>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mt-6 rounded-lg bg-blue-50 p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              ✅ Phase 2 Complete: Authentication
            </h3>
            <p className="text-sm text-blue-800">
              Great job! Your LinkedIn OAuth is working perfectly. Your access token is securely stored
              and ready to use for publishing posts. Next, we'll build the post management system!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
