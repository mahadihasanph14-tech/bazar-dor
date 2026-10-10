export default function NotFound() {
  return (
    <div className="container-main flex min-h-[55vh] items-center justify-center py-16">
      <div className="card max-w-lg p-10 text-center">
        <div className="text-6xl">🧺</div>
        <p className="mt-5 text-sm font-bold text-brand-600">৪০৪</p>
        <h1 className="mt-1 text-2xl font-black">পেজটি খুঁজে পাওয়া যায়নি</h1>
        <p className="mt-2 text-sm text-slate-500">
          লিংকটি ভুল হতে পারে অথবা পেজটি সরানো হয়েছে।
        </p>
        <a href="/" className="btn-primary mt-6">
          হোম পেজে ফিরে যান
        </a>
      </div>
    </div>
  );
}
