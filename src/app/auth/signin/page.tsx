'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export default function SignIn() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const error = searchParams.get('error');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">PublishFlow</h2>
          <p className="mt-2 text-sm text-gray-600">
            LinkedIn Content Scheduling with Confidence
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-800">
              {error === 'OAuthSignin' && 'Error occurred during sign in. Please try again.'}
              {error === 'OAuthCallback' && 'Error occurred during authentication. Please try again.'}
              {error === 'OAuthCreateAccount' && 'Could not create account. Please try again.'}
              {error === 'EmailCreateAccount' && 'Could not create account. Please try again.'}
              {error === 'Callback' && 'Error occurred. Please try again.'}
              {error === 'Default' && 'An unexpected error occurred. Please try again.'}
            </div>
          </div>
        )}

        <div className="mt-8 space-y-6">
          <button
            onClick={() => signIn('linkedin', { callbackUrl })}
            className="group relative flex w-full items-center justify-center gap-3 rounded-md bg-[#0A66C2] px-4 py-3 text-sm font-semibold text-white hover:bg-[#004182] focus:outline-none focus:ring-2 focus:ring-linkedin-500 focus:ring-offset-2 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 310 310"
              className="h-5 w-5"
            >
              <path
                fill="currentColor"
                d="M72.16,99.73H9.927c-2.762,0-5,2.239-5,5v199.928c0,2.762,2.238,5,5,5H72.16c2.762,0,5-2.238,5-5V104.73 C77.16,101.969,74.922,99.73,72.16,99.73z"
              />
              <path
                fill="currentColor"
                d="M41.066,0.341C18.422,0.341,0,18.743,0,41.362C0,63.991,18.422,82.4,41.066,82.4 c22.626,0,41.033-18.41,41.033-41.038C82.1,18.743,63.692,0.341,41.066,0.341z"
              />
              <path
                fill="currentColor"
                d="M230.454,94.761c-24.995,0-43.472,10.745-54.679,22.954V104.73c0-2.761-2.238-5-5-5h-59.599 c-2.762,0-5,2.239-5,5v199.928c0,2.762,2.238,5,5,5h62.097c2.762,0,5-2.238,5-5v-98.918c0-33.333,9.054-46.319,32.29-46.319 c25.306,0,27.317,20.818,27.317,48.034v97.204c0,2.762,2.238,5,5,5H305c2.762,0,5-2.238,5-5V194.995 C310,145.43,300.549,94.761,230.454,94.761z"
              />
            </svg>
            Sign in with LinkedIn
          </button>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our Privacy Policy and Terms of Service.
            </p>
            <p className="mt-2 text-xs text-gray-500">
              We only request permissions necessary for posting to LinkedIn.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-lg bg-blue-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-blue-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>Human-in-the-loop:</strong> All posts require your manual approval before publishing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
