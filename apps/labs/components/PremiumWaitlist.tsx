'use client';

import { useEffect, useState } from 'react';
import { labProduct } from '@/lib/content';
import { trackLabEvent } from '@/lib/analytics';

export function PremiumWaitlist() {
  const [email, setEmail] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(labProduct.waitlistStorageKey);
      if (raw) {
        setEmail(raw);
        setSaved(true);
      }
    } catch {
      setSaved(false);
    }
  }, []);

  const submitInterest = () => {
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes('@')) {
      setSaved(false);
      return;
    }

    window.localStorage.setItem(labProduct.waitlistStorageKey, trimmed);
    setSaved(true);
    trackLabEvent('premium_interest_click', { source: 'waitlist', emailProvided: true });
  };

  return (
    <section className="border border-blue-200 bg-white/90 p-6 shadow-[0_26px_70px_rgba(50,108,229,0.12)]">
      <div className="grid gap-5 lg:grid-cols-[0.7fr_1fr] lg:items-end">
        <div>
          <p className="m-0 font-mono text-xs font-black uppercase tracking-[0.08em] text-[#326ce5]">
            Advanced lab access
          </p>
          <h2 className="mt-3 max-w-xl text-3xl font-black leading-none tracking-tight text-slate-950">
            Get notified when downloadable kits, deeper scenarios, and review worksheets are ready.
          </h2>
        </div>
        <div className="grid gap-3">
          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-700">Email for early access</span>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              placeholder="you@example.com"
              className="min-h-12 border border-blue-100 bg-white px-4 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#326ce5]"
            />
          </label>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={submitInterest}
              className="min-h-11 border border-[#326ce5] bg-[#326ce5] px-5 font-black text-white transition hover:bg-blue-700"
            >
              Save interest
            </button>
            <p className="m-0 max-w-xl text-sm leading-relaxed text-slate-600">
              For now this saves interest on this device. A real signup form will include consent and email delivery before launch.
            </p>
          </div>
          {saved ? (
            <p className="m-0 border border-emerald-200 bg-emerald-50 p-3 text-sm font-bold text-emerald-800">
              Interest saved on this device.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
