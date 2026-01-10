'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export default function Home() {
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  // Parallax effects - respect user's motion preferences
  const backgroundY = shouldReduceMotion ? 0 : useTransform(scrollY, [0, 500], [0, 150]);
  const iconY = shouldReduceMotion ? 0 : useTransform(scrollY, [0, 500], [0, -100]);
  const iconOpacity = shouldReduceMotion ? 0.05 : useTransform(scrollY, [0, 300], [0.1, 0]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      {/* Parallax Background Layer */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 -z-20"
      />

      {/* Floating LinkedIn Icon (decorative) */}
      <motion.div
        style={{ y: iconY, opacity: iconOpacity }}
        className="absolute top-40 right-20 text-[#0A66C2] -z-10 hidden lg:block"
      >
        <svg className="w-64 h-64" viewBox="0 0 310 310">
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
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 sm:px-8">
        <div className="max-w-4xl w-full text-center space-y-8">
          {/* Hero Section with entrance animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-4"
          >
            <h1 className="text-5xl font-bold text-gray-900 tracking-tight sm:text-6xl lg:text-7xl">
              PublishFlow
            </h1>
            <p className="text-2xl text-gray-600 font-light">
              LinkedIn Content Scheduling with Confidence
            </p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Plan, draft, and publish LinkedIn posts with AI assistance and complete manual control.
            </p>
          </motion.div>

          {/* CTA Button with delayed entrance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="pt-4"
          >
            <Link
              href="/auth/signin"
              className="inline-flex items-center justify-center gap-3 rounded-md bg-[#0A66C2] px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-[#004182] focus:outline-none focus:ring-2 focus:ring-linkedin-500 focus:ring-offset-2 transition-all hover:scale-105"
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
            </Link>
          </motion.div>

          {/* Features Grid with scroll-triggered animations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-blue-100 p-3">
                  <svg
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Draft & Edit</h3>
              <p className="text-sm text-gray-600">
                Create and refine your LinkedIn posts with our intuitive editor.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-purple-100 p-3">
                  <svg
                    className="h-6 w-6 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Assistance</h3>
              <p className="text-sm text-gray-600">
                Get draft suggestions powered by Claude AI. Full control to edit or discard.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-green-100 p-3">
                  <svg
                    className="h-6 w-6 text-green-600"
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
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Manual Approval</h3>
              <p className="text-sm text-gray-600">
                Every post requires your explicit confirmation before publishing.
              </p>
            </motion.div>
          </div>

          {/* Compliance Badge with scroll animation */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="pt-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm text-blue-700">
              <svg
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              LinkedIn API Compliant • Privacy-Focused • Human-in-the-Loop
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
