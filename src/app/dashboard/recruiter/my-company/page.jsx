import Image from "next/image";
import React from "react";
import bgImg from "../../../../../public/assets/Background.png";
import iconImg from "../../../../../public/assets/Container.png";
import RegisterCompany from "@/components/dashboards/RegisterCompany";
import { Button } from "@heroui/react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { IoEarthOutline } from "react-icons/io5";
import EditCompany from "@/components/dashboards/EditCompany";
import { redirect } from "next/navigation";

const Page = async () => {

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;


  if (!user) {
    return redirect('/signin')
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/my/companies?recruiterId=${user.id}`,
    { cache: "no-store" }
  );

  const data = await res.json();

  const company = Array.isArray(data) ? data[0] : data;
  console.log("company", company)

  return (
    <div className="text-white">
      {company ? (
        <>
          <div className="bg-[#18181b] p-8 rounded-2xl">
            <div className="flex flex-col md:flex-row justify-between gap-10 items-center">
              <div className="flex flex-col md:flex-row gap-6">
  <Image
    src={company.logo || bgImg}
    alt="company-logo"
    width={120}
    height={120}
    className="rounded-lg border border-zinc-800 object-cover"
  />

  <div className="flex-1">
    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
      <div>
        <h2 className="text-3xl font-bold">
          {company.companyName}
        </h2>

        <p className="flex items-center gap-2 text-gray-400 mt-2">
          <IoEarthOutline />
          <a
            href={company.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            {company.websiteUrl}
          </a>
        </p>
      </div>

      <span
        className={`px-4 py-1 rounded-full text-sm font-medium border
          ${
            company.status === "Approved"
              ? "border-green-700 text-green-500"
              : company.status === "Rejected"
              ? "border-red-700 text-red-500"
              : "border-amber-700 text-amber-500"
          }`}
      >
        {company.status}
      </span>
    </div>
  </div>
</div>

              <div>
                <EditCompany company={company} />
              </div>
            </div>

            <div className="border-b border-gray-700 my-10"></div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              <div className="bg-[#121212] p-5 rounded-2xl text-center">
                <p className="text-gray-300">Industry Category</p>
                <h4 className="text-xl font-bold">{company.industry}</h4>
              </div>

              <div className="bg-[#121212] p-5 rounded-2xl text-center">
                <p className="text-gray-300">Location</p>
                <h4 className="text-xl font-bold">{company.location}</h4>
              </div>

              <div className="bg-[#121212] p-5 rounded-2xl text-center">
                <p className="text-gray-300">Company Scale</p>
                <h4 className="text-xl font-bold">
                  {company.employeeCount}
                </h4>
              </div>
            </div>

            <div className="space-y-3 mt-6">
              <p className="text-xl font-bold">
                About our vision & culture
              </p>

              <p className="text-gray-300 bg-[#121212] p-5 rounded-2xl">
                {company.description}
              </p>
            </div>
          </div>
        </>
      ) : (
       
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
          <div className="relative w-fit">
            <Image src={bgImg} alt="bg-img" width={200} height={200} />

            <div className="absolute -top-3 -right-3">
              <Image
                className="bg-white p-2 rounded-full shadow"
                src={iconImg}
                alt="icon"
                width={40}
                height={40}
              />
            </div>
          </div>

          <h2 className="text-4xl font-bold mt-6">
            Company not registered yet
          </h2>

          <p className="text-gray-500 text-base mt-2 max-w-md">
            Set up your business profile to start posting high-performance
            job listings and manage your talent loop.
          </p>

          <div className="flex gap-3 mt-4">
            <RegisterCompany company = {company} recruiter={user} />

            <Button className="px-5 py-2.5 rounded-lg border border-zinc-800 text-zinc-300 bg-[#141414] hover:bg-[#1c1c1c]">
              View FAQ
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;