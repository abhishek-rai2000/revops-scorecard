"use client";

import { useState } from "react";

export type LeadInfo = {
  name: string;
  email: string;
  role: string;
};

type Props = {
  onSubmit: (lead: LeadInfo) => void;
};

export function EmailGate({ onSubmit }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !role.trim()) {
      setError("Please fill all fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("That doesn't look like a valid email.");
      return;
    }
    setError(null);
    setSubmitting(true);
    onSubmit({ name: name.trim(), email: email.trim(), role: role.trim() });
  };

  return (
    <div className="animate-fade-up max-w-narrow mx-auto">
      <p className="text-eyebrow mb-4">Almost there</p>
      <h2 className="font-display text-display-md text-ink-900 mb-4 leading-tight">
        Where should we send your full report?
      </h2>
      <p className="text-ink-600 mb-10 leading-relaxed">
        You'll see your full results on the next screen — score, pillar breakdown,
        and top three priorities. We use your email to follow up only if you
        request the walkthrough at the end.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Field
          label="Name"
          value={name}
          onChange={setName}
          placeholder="Your name"
          autoComplete="name"
        />
        <Field
          label="Work email"
          value={email}
          onChange={setEmail}
          placeholder="you@company.com"
          type="email"
          autoComplete="email"
        />
        <Field
          label="Role"
          value={role}
          onChange={setRole}
          placeholder="e.g. Head of RevOps"
          autoComplete="organization-title"
        />

        {error && (
          <p className="text-sm text-ember-700 -mt-2">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-wait"
        >
          {submitting ? "Calculating…" : "See my score"}
          {!submitting && <span aria-hidden>→</span>}
        </button>

        <p className="text-caption text-center pt-2">
          Your information stays private. We don't share email addresses.
        </p>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="text-eyebrow block mb-2.5">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full px-4 py-4 bg-parchment-50 border border-ink-900/15 rounded-md text-ink-900 placeholder:text-ink-400 text-[15px] focus:border-ember-600 focus:outline-none focus:ring-2 focus:ring-ember-600/15 transition-all"
      />
    </label>
  );
}


