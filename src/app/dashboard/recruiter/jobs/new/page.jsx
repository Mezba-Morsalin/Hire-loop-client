import ManageJobs from '@/components/dashboards/ManageJobs';
import PostJobs from '@/components/dashboards/PostJobs';
import React from 'react';

const page = async() => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/jobs`)
    const jobs = await res.json()
    console.log(jobs)
  
  return (
    <div>
      {
        jobs.map(job => <ManageJobs key={job._id} job = {job}></ManageJobs>)
      }
      <PostJobs/>
    </div>
  );
};

export default page;