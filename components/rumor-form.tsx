"use client";

import { FormEvent, useState } from "react";

export function RumorForm() {
  const [claim, setClaim] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/rumor-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ claim })
      });
      const data = await response.json();
      setResult(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold text-slate-900">Check a rumor</h2>
      <p className="mt-2 text-sm text-slate-600">Paste a claim and the backend will return a structured verdict.</p>
      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <textarea
          required
          value={claim}
          onChange={(e) => setClaim(e.target.value)}
          placeholder="Example: Dubai airport is closed today."
          className="min-h-32 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-cyan-600"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-2xl bg-cyan-700 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-800 disabled:opacity-60"
        >
          {loading ? "Checking..." : "Run check"}
        </button>
      </form>
      {result ? (
        <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
          <p><span className="font-semibold">Verdict:</span> {result.verdict}</p>
          <p><span className="font-semibold">Confidence:</span> {result.confidence}</p>
          <p className="mt-2 leading-6">{result.explanation}</p>
        </div>
      ) : null}
    </div>
  );
}
