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
    onSubmit({ name: name.trim(), email: email.trim(), role: role.trim() });
  };

  return (
    <div className="animate-fade-up max-w-narrow mx-auto">
      <p className="text-eyebrow mb-4">Almost there</p>
      <h2 className="font-display text-display-md text-ink-900 mb-4 leading-tight">
        Where should we send your full report?
      </h2>
      <p className="text-ink-600 mb-10 leading-relaxed">
        You'll see your tier and pillar breakdown immediately. The full PDF
        report — with prioritised fixes — arrives in your inbox within a few
        minutes. We don't share email addresses, ever.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
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

        <button type="submit" className="btn-primary w-full justify-center">
          See my score
          <span aria-hidden>→</span>
        </button>

        <p className="text-caption text-center pt-2">
          By submitting, you agree to receive your report by email.
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
      <span className="text-eyebrow block mb-2">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full px-4 py-3.5 bg-parchment-50 border border-ink-900/15 rounded-md text-ink-900 placeholder:text-ink-400 focus:border-ember-600 focus:outline-none transition-colors"
      />
    </label>
  );
}
