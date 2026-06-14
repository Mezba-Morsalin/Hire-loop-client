import React from "react";
import { Card, Button, Chip } from "@heroui/react";
import {
  FaLocationDot,
  FaBuilding,
  FaUsers,
  FaDollarSign,
  FaClock,
  FaBriefcase,
} from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

const JobsDetailsPage = async ({ params }) => {
  const { id } = await params;

  const jobRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/my/jobs/${id}`,
    {
      cache: "no-store",
    }
  );

  const jobResult = await jobRes.json();
  const jobs = jobResult?.data || jobResult;

 let company = null;

 if(jobs?.companyId) {
  const companyRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/companies/${jobs.companyId}`, {
    cache : "no-store"
  })
  const companyResult = await companyRes.json();
  company = companyResult?.data || companyResult
 }

  return (
    <div className="max-w-5xl mx-auto px-5 lg:px-0 my-12 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Image
          src={company?.logo || "/placeholder.png"}
          alt="company-logo"
          width={80}
          height={80}
          className="rounded-lg object-cover"
        />

        <div className="space-y-2">
          <h2 className="text-2xl font-bold">
            {company?.companyName || "Unknown Company"}
          </h2>

          <p className="text-zinc-400">
            {company?.industry || "No Industry"}
          </p>
        </div>
      </div>

      {/* Job Title */}
      <div className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold">
          {jobs?.jobTitle}
        </h1>

        <div className="flex flex-wrap gap-2 items-center">
          <Chip color="primary" variant="flat">
            {jobs?.status}
          </Chip>

          <Chip variant="flat">
            {jobs?.employmentType}
          </Chip>

          <Chip variant="flat">
            {jobs?.workMode}
          </Chip>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left */}
        <div className="md:col-span-2 space-y-6">
          <Card className="p-5 space-y-3">
            <h2 className="text-xl font-semibold">
              Job Description
            </h2>

            <p className="text-zinc-600 leading-7">
              {jobs.description}
            </p>
          </Card>

          <Card className="p-5 space-y-3">
            <h2 className="text-xl font-semibold">
              Skills Required
            </h2>

            <div className="flex flex-wrap gap-2">
              {jobs?.skills?.map((skill, idx) => (
                <Chip key={idx} color="secondary" variant="flat">
                  {skill}
                </Chip>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          <Card className="p-5 space-y-3">
            <h2 className="text-lg font-semibold">Company</h2>

            <div className="flex items-center gap-2">
              <FaBuilding className="text-indigo-500" />
              <span>
                {company?.companyName || jobs?.companyName}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <FaLocationDot className="text-indigo-500" />
              <span>{company?.location || jobs?.location}</span>
            </div>
          </Card>

          <Card className="p-5 space-y-3">
            <h2 className="text-lg font-semibold">Job Info</h2>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <FaBriefcase className="text-indigo-500" />
                <span>{jobs?.industryCategory}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaUsers className="text-indigo-500" />
                <span>{jobs?.vacancies} Vacancies</span>
              </div>

              <div className="flex items-center gap-2">
                <FaDollarSign className="text-indigo-500" />
                <span>{jobs?.salary}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaClock className="text-indigo-500" />
                <span>Deadline: {jobs?.deadline}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaClock className="text-indigo-500" />
                <span>Experience: {jobs?.experience}</span>
              </div>
            </div>
          </Card>

          <Button className="w-full bg-indigo-600 text-white font-semibold">
            <Link href={`/browse-jobs/${jobs?._id}/apply`}>Apply Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobsDetailsPage;