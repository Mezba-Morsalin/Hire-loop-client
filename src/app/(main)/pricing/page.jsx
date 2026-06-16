"use client";

import { Button } from "@heroui/react";
import { useState } from "react";
import {
  FaCheckCircle,
  FaUserTie,
  FaBriefcase,
  FaBolt,
  FaCrown,
  FaBuilding,
} from "react-icons/fa";

const seekerPlans = [
  {
    name: "Free",
    id : "seeker_free",
    price: "$0",
    period: "/forever",
    icon: <FaBriefcase className="text-3xl text-primary" />,
    features: [
      "Browse & save up to 10 jobs",
      "Apply to up to 3 jobs/month",
      "Basic profile",
      "Email alerts",
    ],
  },
  {
    name: "Pro",
    price: "$19",
    id : "seeker_pro",
    period: "/month",
    icon: <FaBolt className="text-3xl text-primary" />,
    popular: true,
    features: [
      "Apply to 30 jobs/month",
      "Unlimited saved jobs",
      "Application tracking",
      "Salary insights",
    ],
  },
  {
    name: "Premium",
    price: "$39",
    id : "seeker_premium",
    period: "/month",
    icon: <FaCrown className="text-3xl text-yellow-500" />,
    features: [
      "Unlimited applications",
      "Profile boost",
      "Early access to jobs",
      "Priority support",
    ],
  },
];

const recruiterPlans = [
  {
    name: "Free",
    id : "recruiter_free",
    price: "$0",
    period: "/forever",
    icon: <FaBuilding className="text-3xl text-primary" />,
    features: [
      "Up to 3 active jobs",
      "Basic applicant management",
      "Standard visibility",
      "Perfect for startups",
    ],
  },
  {
    name: "Growth",
    price: "$49",
    id : "recruiter_growth",
    period: "/month",
    icon: <FaBolt className="text-3xl text-primary" />,
    popular: true,
    features: [
      "Up to 10 active jobs",
      "Applicant tracking",
      "Basic analytics",
      "Email support",
    ],
  },
  {
    name: "Enterprise",
    price: "$149",
    id : "recruiter_enterprise",
    period: "/month",
    icon: <FaCrown className="text-3xl text-yellow-500" />,
    features: [
      "Up to 50 active jobs",
      "Advanced analytics",
      "Featured listings",
      "Priority support",
    ],
  },
];

export default function PricingPage() {
  const [tab, setTab] = useState("seekers");

  const plans = tab === "seekers" ? seekerPlans : recruiterPlans;

  return (
    <section className="max-w-7xl mx-auto px-5 py-20">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold">
          Simple, Transparent Pricing
        </h1>

        <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
          Choose the perfect plan whether you are searching for your next
          opportunity or hiring top talent.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-12">
        <div className="bg-base-200 border border-zinc-400 rounded-full p-1 flex gap-2">
  <Button
  variant="ghost"
  onPress={() => setTab("seekers")}
  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
    tab === "seekers"
      ? "bg-gray-600 text-white hover:bg-primary"
      : "bg-transparent text-foreground hover:bg-base-300"
  }`}
>
  <FaUserTie className="mr-2" />
  For Job Seekers
</Button>

<Button
  variant="ghost"
  onPress={() => setTab("recruiters")}
  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
    tab === "recruiters"
      ? "bg-gray-600 text-white hover:bg-primary"
      : "bg-transparent text-foreground hover:bg-base-300"
  }`}
>
  <FaBuilding className="mr-2" />
  For Recruiters
</Button>
</div>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-3xl border p-8 bg-base-100 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl ${
              plan.popular
                ? "border-primary ring-2 ring-primary/20"
                : "border-base-300"
            }`}
          >
            {plan.popular && (
              <span className="absolute top-5 right-5 bg-primary text-white text-xs px-3 py-1 rounded-full">
                Most Popular
              </span>
            )}

            <div className="mb-6">{plan.icon}</div>

            <h2 className="text-2xl font-bold">{plan.name}</h2>

            <div className="mt-3">
              <span className="text-5xl font-bold">{plan.price}</span>
              <span className="text-gray-500">{plan.period}</span>
            </div>

            <ul className="space-y-4 mt-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-500 mt-1 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
             <form action="/api/checkout_sessions" method="POST">
             <input type="hidden" name="plan_id" value={plan.id}/>
      <section>
        <button className="bg-linear-to-r py-2 cursor-pointer from-indigo-500 to-indigo-600 text-white rounded-xl w-full mt-3" type="submit" role="link">
          Checkout
        </button>
      </section>
    </form>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="mt-20 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>

        <div className="collapse collapse-arrow bg-base-200 mb-4">
          <input type="radio" name="faq" defaultChecked />
          <div className="collapse-title font-semibold">
            Can I cancel anytime?
          </div>
          <div className="collapse-content">
            Yes. You can cancel your subscription whenever you want.
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-200 mb-4">
          <input type="radio" name="faq" />
          <div className="collapse-title font-semibold">
            Do you offer refunds?
          </div>
          <div className="collapse-content">
            Refunds are handled according to our refund policy.
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-200 mb-4">
          <input type="radio" name="faq" />
          <div className="collapse-title font-semibold">
            Can I switch plans later?
          </div>
          <div className="collapse-content">
            Absolutely. Upgrade or downgrade your plan at any time.
          </div>
        </div>
      </div>
    </section>
  );
}
