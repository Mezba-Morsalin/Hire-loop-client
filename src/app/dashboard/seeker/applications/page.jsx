import {
 
  Button,
  Card,
  
} from "@heroui/react";
import SeekerApplications from "@/components/dashboards/SeekerApplications";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


export default async function ApplicationsPage() {

    const session = await auth.api.getSession({
        headers: await headers(),
      });
    
      const user = session?.user;
      console.log("user", user)

    const applicantRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/applicants?applicantId=${user.id}`,
    {
      cache: "no-store",
    }
  );

  const applicantResult = await applicantRes.json();
  const applications = applicantResult?.data || applicantResult || [];
  console.log("applications", applications)

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold">
              My Applications
            </h1>

            <p className="text-zinc-400 mt-2">
              Track your job applications and interview
              progress in real-time.
            </p>
          </div>

          <Button
            className="bg-white text-black font-medium"
            radius="md"
          >
            Export PDF
          </Button>
        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
          <StatCard title="Total Applied" value={applications.length} />
          <StatCard title="Shortlisted" value="8" />
          <StatCard title="Interviews" value="3" highlight />
          <StatCard
            title="Success Rate"
            value="12%"
            success
          />
        </div>

        {/* Table */}

        <SeekerApplications applications = {applications}/>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  highlight,
  success,
}) {
  return (
    <Card className="bg-[#111114] border border-zinc-800 p-5">
      <p className="text-sm text-zinc-400">
        {title}
      </p>

      <h2
        className={`text-4xl font-bold mt-2 ${
          highlight
            ? "text-yellow-400"
            : success
            ? "text-green-400"
            : "text-white"
        }`}
      >
        {value}
      </h2>
    </Card>
  );
}