import ManageJobs from '@/components/dashboards/ManageJobs';
import PostJobs from '@/components/dashboards/PostJobs';
import React from 'react';

const RecruiterJobsPage = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/jobs`)
    const jobs = await res.json()
    console.log(jobs)
    return (
        <div>
           <ManageJobs jobs={jobs}></ManageJobs>
      <PostJobs/>
        </div>
    );
};

export default RecruiterJobsPage;