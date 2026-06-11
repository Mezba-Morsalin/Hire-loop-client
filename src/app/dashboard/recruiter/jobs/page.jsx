import ManageJobs from '@/components/dashboards/ManageJobs';
import PostJobs from '@/components/dashboards/PostJobs';
import { Button } from '@heroui/react';
import Link from 'next/link';
import React from 'react';

const RecruiterJobsPage = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/jobs`)
    const jobs = await res.json()
    console.log(jobs)
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