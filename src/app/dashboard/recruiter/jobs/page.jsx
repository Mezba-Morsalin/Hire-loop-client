import ManageJobs from '@/components/dashboards/ManageJobs';
import { auth } from '@/lib/auth';

import { Button } from '@heroui/react';
import { headers } from 'next/headers';
import Link from 'next/link';
import React from 'react';

const RecruiterJobsPage = async () => {
     const session = await auth.api.getSession({
         headers: await headers(),
       });
     
       const user = session?.user;
     
     
       if (!user) {
         return <div className="text-white p-10">Unauthorized</div>;
       }
     
       const res1 = await fetch(
         `${process.env.NEXT_PUBLIC_SERVER_URL}/api/my/companies?recruiterId=${user.id}`,
         { cache: "no-store" }
       );
     
       const data1 = await res1.json();
     
       const company = Array.isArray(data1) ? data1[0] : data1; 
      //  console.log("company", company)

const res = await fetch(
  `${process.env.NEXT_PUBLIC_SERVER_URL}/api/my/jobs?companyId=${company._id}`,
  { cache: "no-store" }
);

const data = await res.json();
const jobs = data?.data || [];

console.log("jobs", jobs);
    return (
        <div>
           <ManageJobs jobs={jobs}></ManageJobs>
           <div className="flex flex-col gap-8 md:flex-row  items-center justify-between mb-6 bg-[#232325] rounded-2xl p-6 mt-8">
  <div className='space-y-3'>
    <h1 className="text-2xl font-semibold text-white">
      Job Opportunities
    </h1>
    <p className="text-sm text-zinc-400 mt-1">
      Explore all available job openings or post a new job for your company.
    </p>
  </div>

  <Link  href={`/dashboard/recruiter/jobs/new`}><Button className='border border-gray-300 rounded-xl' variant='ghost'>Post a Job</Button></Link>
</div>
        </div>
    );
};

export default RecruiterJobsPage;