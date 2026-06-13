import BrowseJobs from '@/components/BrowseJobs';
import React from 'react';

const JobsPage = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/my/jobs`, 
         {
  cache: "no-store",
})
    const jobs = await res.json();
    console.log(jobs.data)
    return (
        <div className='max-w-7xl mx-auto my-16 px-5  lg:px-0'>
            <div className='text-center space-y-4 mb-10'>
                <h2 className='bg-linear-to-r from-indigo-500 to-indigo-600 bg-clip-text text-transparent text-3xl md:text-4xl lg:text-5xl font-bold'>Find Your Next Opportunity</h2>
                <p className='text-zinc-400 text-base leading-7 lg:w-[750px] mx-auto'>Search and filter jobs by role, location, experience level, salary range, and employment type to quickly find opportunities that match your skills, interests, and career goals. Discover the right job faster and take the next step in your professional journey with ease.</p>
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-12'>
                {
                    jobs.data.map(job => <BrowseJobs key={job._id} job = {job}></BrowseJobs>)
                }
            </div>
        </div>
    );
};

export default JobsPage;