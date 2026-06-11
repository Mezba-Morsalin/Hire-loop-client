
import PostJobs from '@/components/dashboards/PostJobs';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const NewJobsPage = async() => {
  const session = await auth.api.getSession({
  headers: await headers(),
});

const recruiterId = session?.user?.id;
    
   const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/my/companies?recruiterId=${recruiterId}`,
    { cache: "no-store" }
  );

  const company = await res.json();
  console.log("Company", company)
  return (
    <div>
      <PostJobs company = {company}/>
    </div>
  );
};

export default NewJobsPage;