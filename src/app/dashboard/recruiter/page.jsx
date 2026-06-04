"use client";

import React from "react";
import { authClient } from "@/lib/auth-client";
import {
  FaBriefcase,
  FaUsers,
  FaBolt,
  FaCheckCircle,
  FaBuilding,
} from "react-icons/fa";
import { FadeLoader } from "react-spinners";

const RecruiterPage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user ?? null;

  const applications = [
    {
      name: "Julianne Moore",
      role: "Senior Product Designer",
      date: "Oct 24, 2023",
      experience: "6 years",
      status: "Interviewing",
      color: "bg-green-500/20 text-green-400",
    },
    {
      name: "Robert Downey",
      role: "Backend Engineer",
      date: "Oct 23, 2023",
      experience: "4 years",
      status: "New",
      color: "bg-gray-500/20 text-gray-300",
    },
    {
      name: "Emma Stone",
      role: "Marketing Lead",
      date: "Oct 22, 2023",
      experience: "8 years",
      status: "Reviewing",
      color: "bg-yellow-500/20 text-yellow-400",
    },
    {
      name: "Chris Pratt",
      role: "Product Manager",
      date: "Oct 21, 2023",
      experience: "5 years",
      status: "Rejected",
      color: "bg-red-500/20 text-red-400",
    },
  ];

  const companies = [
    {
      name: "Google Inc.",
      location: "Technology • Mountain View",
      jobs: 24,
    },
    {
      name: "Meta Platforms",
      location: "Social Media • Menlo Park",
      jobs: 18,
    },
    {
      name: "Stripe",
      location: "Fintech • San Francisco",
      jobs: 12,
    },
    {
      name: "Tesla",
      location: "Automotive • Austin",
      jobs: 31,
    },
  ];

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <FadeLoader color="#6366f1" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Something Went Wrong
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Welcome back, {user.name}
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard
          icon={<FaBriefcase />}
          title="Total Job Posts"
          value="48"
        />

        <StatCard
          icon={<FaUsers />}
          title="Total Applicants"
          value="1,284"
        />

        <StatCard
          icon={<FaBolt />}
          title="Active Jobs"
          value="18"
        />

        <StatCard
          icon={<FaCheckCircle />}
          title="Jobs Closed"
          value="32"
        />
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-5 mt-8">
        {/* Applications */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
          <div className="flex justify-between items-center p-5 border-b border-zinc-800">
            <h2 className="text-xl font-semibold">
              Recent Applications
            </h2>

            <button className="text-sm text-zinc-400 hover:text-white">
              View all
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-zinc-500 text-sm border-b border-zinc-800">
                  <th className="text-left p-4">Candidate Name</th>
                  <th className="text-left p-4">Role</th>
                  <th className="text-left p-4">Date Applied</th>
                  <th className="text-left p-4">Experience</th>
                  <th className="text-left p-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {applications.map((app, index) => (
                  <tr
                    key={index}
                    className="border-b border-zinc-800 last:border-0"
                  >
                    <td className="p-4">{app.name}</td>
                    <td className="p-4 text-zinc-300">
                      {app.role}
                    </td>
                    <td className="p-4 text-zinc-400">
                      {app.date}
                    </td>
                    <td className="p-4 text-zinc-400">
                      {app.experience}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${app.color}`}
                      >
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Companies */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold">
              My Top Companies
            </h2>

            <button className="text-sm text-zinc-400 hover:text-white">
              View all
            </button>
          </div>

          <div className="space-y-4">
            {companies.map((company, index) => (
              <div
                key={index}
                className="flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-lg bg-zinc-800 flex items-center justify-center">
                    <FaBuilding />
                  </div>

                  <div>
                    <h3 className="font-medium text-sm">
                      {company.name}
                    </h3>
                    <p className="text-xs text-zinc-500">
                      {company.location}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <h4 className="font-semibold">
                    {company.jobs}
                  </h4>
                  <p className="text-[10px] text-zinc-500 uppercase">
                    Active Jobs
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 border border-zinc-700 rounded-xl py-3 text-sm hover:bg-zinc-800 transition">
            View All Companies
          </button>
        </div>
      </div>

      {/* Floating Button */}
      <button className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-white text-black text-3xl flex items-center justify-center shadow-lg hover:scale-105 transition">
        +
      </button>
    </div>
  );
};

const StatCard = ({ icon, title, value }) => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
      <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-300">
        {icon}
      </div>

      <p className="text-sm text-zinc-500 mt-4">
        {title}
      </p>

      <h3 className="text-3xl font-bold mt-2">
        {value}
      </h3>
    </div>
  );
};

export default RecruiterPage;