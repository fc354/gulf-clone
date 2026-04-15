export default function MethodologyPage() {
  return (
    <main className="container-page py-12">
      <div className="card max-w-4xl p-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Methodology</h1>
        <div className="mt-6 space-y-4 text-sm leading-7 text-slate-600">
          <p>1. Collect source articles from feeds and APIs.</p>
          <p>2. Normalize titles, summaries, timestamps, and city mapping.</p>
          <p>3. Use AI to extract structured events, confidence, and operational impact.</p>
          <p>4. Generate city-level snapshots and expose them via API routes.</p>
          <p>5. Refresh the UI on a fixed cadence and show a clear explanation for every score.</p>
        </div>
      </div>
    </main>
  );
}
