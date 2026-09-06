import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md">
        <h1 className="text-display text-cobalt mb-6">404</h1>
        <h2 className="text-subhead text-ink mb-4">Page not found</h2>
        <p className="text-lg text-ink/70 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          href="/" 
          className="inline-block bg-ink text-white px-8 py-3 rounded-full font-medium hover:bg-cobalt transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
