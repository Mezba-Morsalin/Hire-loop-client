import JobsContainer from '@/components/jobsContainer';
import React from 'react';

const JobsPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/my/jobs`, {
    cache: "no-store",
  });

  const jobs = await res.json();

  return (
    <div className='max-w-7xl mx-auto my-16 px-5 lg:px-0'>
      
      <div className='text-center space-y-4 mb-10'>
        <h2 className='bg-linear-to-r from-indigo-500 to-indigo-600 bg-clip-text text-transparent text-3xl md:text-4xl lg:text-5xl font-bold'>
          Find Your Next Opportunity
        </h2>
        <p className='text-zinc-400 text-base leading-7 lg:w-[750px] mx-auto'>
          Search and filter jobs by role, location, experience level, salary range, and employment type.
        </p>
      </div>

      <JobsContainer jobs={jobs.data} />
      
    </div>
  );
};

export default JobsPage;