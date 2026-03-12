/**
 * Layout C: "Hybrydowy" — DEPRECATED
 * Użytkownik wybrał Layout A (/test/local1).
 * Ten plik pozostaje jako placeholder.
 */

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '[TEST C] Layout C — Hybrydowy',
  robots: 'noindex, nofollow',
};

export default function TestLocal3Page() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-50">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-zinc-900">Layout C — Odrzucony</h1>
        <p className="text-zinc-600">Wybrany design: Layout A</p>
        <Link href="/test/local1" className="inline-block px-6 py-3 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors">
          Zobacz Layout A →
        </Link>
      </div>
    </main>
  );
}
