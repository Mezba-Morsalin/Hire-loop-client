import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import ApplyJobs from "./ApplyJobs";

const ApplyPage = async ({ params }) => {
  const { id } = await params;

  // Get current user session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  // Redirect if not logged in
  if (!user) {
    redirect(`/signin?redirect=/browse-jobs/${id}/apply`);
  }

  // Fetch job details
  const jobRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/my/jobs/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!jobRes.ok) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <h2 className="text-xl font-semibold text-red-500">
          Job not found.
        </h2>
      </div>
    );
  }

  const jobResult = await jobRes.json();
  const jobs = jobResult?.data || jobResult;

  // Fetch user applications
  const applicantRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/applicants?applicantsId=${user.id}`,
    {
      cache: "no-store",
    }
  );

  const applicantResult = await applicantRes.json();
  const applications = applicantResult?.data || applicantResult || [];

  // Dummy plan (replace with database plan later)
  const plan = {
    name: "Free",
    maxApplicationPerMonth: 3,
  };

  const remainingApplications =
    plan.maxApplicationPerMonth - applications.length;

  // Restrict recruiters
  if (user.role !== "seeker") {
    return (
      <div className="max-w-2xl mx-auto min-h-[70vh] flex items-center justify-center px-4">
        <div className="w-full rounded-2xl border border-red-500/20 bg-red-500/10 p-8 text-center">
          <h2 className="text-3xl font-bold text-red-500">
            🚫 Application Restricted
          </h2>

          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Recruiter accounts cannot apply for jobs.
          </p>

          <p className="text-sm text-gray-500 mt-2">
            Please sign in with a Job Seeker account to submit applications.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Usage Card */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-sm text-primary font-medium">
              {plan.name} Plan
            </p>

            <h1 className="text-3xl font-bold mt-1">
              Apply for {jobs?.jobTitle}
            </h1>

            <p className="text-gray-500 mt-2">
              Keep track of your monthly application usage before submitting
              your application.
            </p>
          </div>

          <div className="text-center md:text-right">
            <p className="text-sm text-gray-500">Applications Used</p>

            <h2 className="text-4xl font-bold text-primary">
              {applications.length}/{plan.maxApplicationPerMonth}
            </h2>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-8">
          <div className="w-full h-3 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{
                width: `${Math.min(
                  (applications.length / plan.maxApplicationPerMonth) * 100,
                  100
                )}%`,
              }}
            />
          </div>

          <div className="mt-3 flex justify-between text-sm text-gray-500">
            <span>
              {remainingApplications > 0
                ? `${remainingApplications} application${
                    remainingApplications > 1 ? "s" : ""
                  } remaining`
                : "No applications remaining this month"}
            </span>

            <span>
              {applications.length} of {plan.maxApplicationPerMonth} used
            </span>
          </div>
        </div>
      </div>

      {/* Apply Section */}
      <div className="mt-8">
        {applications.length < plan.maxApplicationPerMonth ? (
          <ApplyJobs applicant={user} jobs={jobs} />
        ) : (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-8 text-center">
            <h2 className="text-2xl font-bold text-red-500">
              Monthly Application Limit Reached
            </h2>

            <p className="mt-3 text-gray-600 dark:text-gray-400">
              You have already used all{" "}
              <span className="font-semibold">
                {plan.maxApplicationPerMonth}
              </span>{" "}
              applications included in your current plan.
            </p>

            <p className="mt-2 text-sm text-gray-500">
              You can apply again when your monthly quota resets or after
              upgrading your plan.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplyPage;