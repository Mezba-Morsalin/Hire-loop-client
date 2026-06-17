"use client";

import React, { useState } from "react";
import {
  Button,
  Input,
  Label,
  TextField,
  FieldError,
  TextArea,
} from "@heroui/react";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLink,
  FaPaperPlane,
} from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const ApplyJobs = ({ jobs, applicant }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(e.currentTarget);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      portfolio: formData.get("portfolio"),
      resumeUrl: formData.get("resumeUrl"),
      coverLetter: formData.get("coverLetter"),
      jobId: jobs?._id,
      companyName: jobs?.companyName,
      applicantId: applicant?.id,
      jobTitle : jobs?.jobTitle
    };

    // console.log("APPLICATION PAYLOAD:", payload);
    try {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/applicants`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  const postApplication = await res.json();

  if (res.ok && postApplication.insertedId) {
    setMessage("Application submitted successfully!");
    toast.success("Application submitted successfully!");
    
    setTimeout(() => {
  router.push('/browse-jobs');
}, 2000);
  } else {
    toast.error(postApplication.message || "Application submission failed");
  }
} catch (error) {
  console.error(error);
  toast.error("Something went wrong");
} finally {
  setLoading(false);
}
  };

  return (
    <div className="max-w-3xl mx-auto border border-zinc-600 rounded-2xl p-12 space-y-8">

      {/* Header */}
      <div className="space-y-2 border-b pb-5">
        <h1 className="text-3xl font-bold text-indigo-500">
          Apply for {jobs?.jobTitle}
        </h1>

        <p className="text-gray-400">
          Apply to{" "}
          <span className="text-white font-semibold">
            {jobs?.companyName}
          </span>{" "}
          by filling out the form below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Personal Information */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-white">
            👤 Personal Information
          </h2>

          <TextField isRequired name="name">
            <Label className="flex items-center gap-2">
              <FaUser /> Full Name
            </Label>
            <Input placeholder="Enter your full name" />
            <FieldError />
          </TextField>

          <TextField isRequired name="email">
            <Label className="flex items-center gap-2">
              <FaEnvelope /> Email Address
            </Label>
            <Input
              type="email"
              placeholder="you@example.com"
            />
            <FieldError />
          </TextField>

          <TextField name="phone">
            <Label className="flex items-center gap-2">
              <FaPhone /> Phone Number
            </Label>
            <Input placeholder="+8801XXXXXXXXX" />
          </TextField>
        </div>

        {/* Professional Links */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-white">
            🌐 Professional Links
          </h2>

          <TextField name="portfolio">
            <Label className="flex items-center gap-2">
              <FaLink /> Portfolio / GitHub
            </Label>
            <Input placeholder="https://github.com/username" />
          </TextField>
        </div>

        {/* Resume URL */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-white">
            📎 Resume Link
          </h2>

          <TextField isRequired name="resumeUrl">
            <Label className="flex items-center gap-2">
              <FaLink /> Resume URL
            </Label>

            <Input
              type="url"
              placeholder="https://drive.google.com/file/... or https://..."
            />

            <FieldError />
          </TextField>

          <p className="text-sm text-gray-400">
            Upload your resume to Google Drive, Dropbox, OneDrive,
            Cloudinary, or any cloud storage and paste the public link here.
          </p>
        </div>

        {/* Cover Letter */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-white">
            📄 Cover Letter
          </h2>

          <TextField name="coverLetter">
            <TextArea
              name="coverLetter"
              rows={6}
              placeholder="Write why you're a good fit for this role..."
              className="w-full p-3 rounded-lg bg-transparent border border-gray-600 text-white focus:outline-none focus:border-indigo-500"
            />
          </TextField>
        </div>

        {/* Submit */}
        <div className="pt-5 border-t">

          <Button
            type="submit"
            isDisabled={loading}
            className="w-full bg-linear-to-r from-indigo-500 to-indigo-600 text-white py-6 rounded-xl"
          >
            {loading ? (
              "Submitting..."
            ) : (
              <span className="flex items-center gap-2">
                <FaPaperPlane />
                Submit Application
              </span>
            )}
          </Button>

          <p className="text-center text-sm text-gray-500 mt-2">
            Make sure all information is correct before submitting.
          </p>

          {message && (
            <p className="text-center text-green-500 mt-4">
              {message}
            </p>
          )}
        </div>

      </form>
      <Toaster/>
    </div>
  );
};

export default ApplyJobs;
