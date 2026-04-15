export default function AboutPage() {
  return (
    <main className="container-page py-12">
      <div className="card max-w-4xl p-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">About this starter</h1>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          This repository is a clean-room starter for building a regional monitoring site. Replace the mock feeds with your own sources, tune the scoring logic, and wire up your own AI prompts.
        </p>
      </div>
    </main>
  );
}
