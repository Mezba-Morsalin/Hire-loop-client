import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import ApplyJobs from './ApplyJobs';

const ApplyPage = async ({params}) => {
    const {id}= await params
    const session = await auth.api.getSession({
             headers: await headers(),
           });
         
           const user = session?.user;
         
         
           if (!user) {
             redirect(`/signin?redirect=/browse-jobs/${id}/apply`)
           }

           const jobRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/my/jobs/${id}`,
    {
      cache: "no-store",
    }
  );

  const jobResult = await jobRes.json();
  const jobs = jobResult?.data || jobResult;

  console.log("jobs", jobs)
           if (user.role !== "seeker") {
            return (
                <div className='w-6/12 flex justify-center items-center mx-auto min-h-screen'>
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-5">
          🚫 Recruiters are not allowed to apply for jobs.
          This section is only available for job seekers.
        </div>
                </div>
            )
           }
    return (
        <div className='px-5 lg:px-0 my-16'>
            <ApplyJobs applicant = {user} jobs = {jobs}></ApplyJobs>
        </div>
    );
};

export default ApplyPage;