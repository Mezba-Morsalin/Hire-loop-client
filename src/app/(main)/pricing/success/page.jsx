import { redirect } from 'next/navigation'
import { stripe } from '@/lib/stripe'
import Link from 'next/link'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)')
  }

  const {
    status,
    customer_details: { email: customerEmail },
    metadata
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    redirect('/')
  }

  if (status === 'complete') {
    const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/subscriptions`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: customerEmail,
      planId: metadata.planId,
    }),
    cache: "no-store",
  }
);

const data = await result.json();

console.log(data);
    return (
      <section className="min-h-screen flex items-center justify-center bg-base-100 px-4">
        <div className="max-w-lg w-full bg-base-200 border border-base-300 rounded-3xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-green-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="mt-6 text-3xl font-bold text-base-content">
            Payment Successful 🎉
          </h1>

          <p className="mt-3 text-base-content/70 leading-relaxed">
            Thank you for your purchase. Your payment has been processed
            successfully and your subscription is now active.
          </p>

          <div className="mt-6 bg-base-100 border border-base-300 rounded-xl p-4">
            <p className="text-sm text-base-content/60">
              Confirmation Email Sent To
            </p>
            <p className="font-semibold break-all text-primary">
              {customerEmail}
            </p>
          </div>

          <div className="mt-6 text-sm text-base-content/60">
            Need help? Contact us at{' '}
            <a
              href="mailto:orders@example.com"
              className="text-primary font-medium hover:underline"
            >
              contact.hireloop.com
            </a>
          </div>

          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex border border-zinc-500 items-center justify-center rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:opacity-90"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return redirect('/')
}