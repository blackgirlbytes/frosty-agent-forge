'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

type Status = 'loading' | 'confirming' | 'success' | 'already_unsubscribed' | 'error';

export default function UnsubscribePage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<Status>('loading');
  const [email, setEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const emailParam = searchParams.get('email');
  const tokenParam = searchParams.get('token');

  useEffect(() => {
    // Verify the unsubscribe link on load
    async function verifyLink() {
      if (!emailParam || !tokenParam) {
        setStatus('error');
        setErrorMessage('Invalid unsubscribe link. Missing required parameters.');
        return;
      }

      try {
        const response = await fetch(
          `/api/unsubscribe?email=${encodeURIComponent(emailParam)}&token=${encodeURIComponent(tokenParam)}`
        );
        const data = await response.json();

        if (data.valid) {
          setEmail(data.email);
          if (data.alreadyUnsubscribed) {
            setStatus('already_unsubscribed');
          } else {
            setStatus('confirming');
          }
        } else {
          setStatus('error');
          setErrorMessage(data.message || 'Invalid unsubscribe link');
        }
      } catch (error) {
        setStatus('error');
        setErrorMessage('Failed to verify unsubscribe link');
      }
    }

    verifyLink();
  }, [emailParam, tokenParam]);

  async function handleUnsubscribe() {
    if (!emailParam || !tokenParam) return;

    setStatus('loading');

    try {
      const response = await fetch(
        `/api/unsubscribe?email=${encodeURIComponent(emailParam)}&token=${encodeURIComponent(tokenParam)}`,
        { method: 'POST' }
      );
      const data = await response.json();

      if (data.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'Failed to unsubscribe');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('An error occurred while unsubscribing');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">❄️</div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Advent of AI
          </h1>
        </div>

        {/* Card */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-xl">
          {status === 'loading' && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
              <p className="text-slate-300">Processing...</p>
            </div>
          )}

          {status === 'confirming' && (
            <div className="text-center">
              <div className="text-5xl mb-4">📧</div>
              <h2 className="text-xl font-semibold text-white mb-2">Unsubscribe from Emails?</h2>
              <p className="text-slate-400 mb-6">
                You&apos;re about to unsubscribe <span className="text-cyan-400 font-medium">{email}</span> from 
                Advent of AI challenge notifications.
              </p>
              <p className="text-slate-500 text-sm mb-6">
                You won&apos;t receive daily challenge emails anymore, but you can still visit the website anytime.
              </p>
              <button
                onClick={handleUnsubscribe}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-cyan-500/25"
              >
                Yes, Unsubscribe Me
              </button>
              <Link
                href="/"
                className="block mt-4 text-slate-400 hover:text-slate-300 text-sm transition-colors"
              >
                Cancel and go back
              </Link>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center">
              <div className="text-5xl mb-4">✅</div>
              <h2 className="text-xl font-semibold text-white mb-2">You&apos;ve Been Unsubscribed</h2>
              <p className="text-slate-400 mb-6">
                <span className="text-cyan-400 font-medium">{email}</span> has been removed from our mailing list.
              </p>
              <p className="text-slate-500 text-sm mb-6">
                We&apos;re sorry to see you go! You can still access all challenges at adventofai.dev anytime.
              </p>
              <Link
                href="/"
                className="inline-block bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
              >
                Return to Home
              </Link>
            </div>
          )}

          {status === 'already_unsubscribed' && (
            <div className="text-center">
              <div className="text-5xl mb-4">📭</div>
              <h2 className="text-xl font-semibold text-white mb-2">Already Unsubscribed</h2>
              <p className="text-slate-400 mb-6">
                <span className="text-cyan-400 font-medium">{email}</span> is already unsubscribed from our mailing list.
              </p>
              <Link
                href="/"
                className="inline-block bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
              >
                Return to Home
              </Link>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center">
              <div className="text-5xl mb-4">❌</div>
              <h2 className="text-xl font-semibold text-white mb-2">Something Went Wrong</h2>
              <p className="text-slate-400 mb-6">{errorMessage}</p>
              <p className="text-slate-500 text-sm mb-6">
                If you need help, please contact us or try again later.
              </p>
              <Link
                href="/"
                className="inline-block bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
              >
                Return to Home
              </Link>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 text-sm mt-6">
          Advent of AI • 17 Days of Mastery
        </p>
      </div>
    </div>
  );
}
