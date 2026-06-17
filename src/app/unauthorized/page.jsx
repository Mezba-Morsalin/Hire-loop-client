import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-red-500">403</h1>

      <h2 className="mt-4 text-2xl font-semibold">
        Unauthorized Access
      </h2>

      <p className="mt-2 max-w-md text-gray-500">
        You do not have permission to access this page. Please sign in with
        the correct account or contact an administrator if you believe this
        is a mistake.
      </p>

      <div className="mt-6 flex gap-3">
        <Link
          href="/"
          className="rounded-lg bg-linear-to-r from-indigo-500 to-indigo-600 px-4 py-2 text-white"
        >
          Go Home
        </Link>

        <Link
          href="/sign"
          className="rounded-lg border px-4 py-2"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}