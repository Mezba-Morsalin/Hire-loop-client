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
  FaFilePdf,
} from "react-icons/fa6";

const ApplyJobs = ({ jobs, applicant }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [resume, setResume] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setResume(file);
  };

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
      coverLetter: formData.get("coverLetter"),
      resume,
      jobId: jobs?._id,
      applicantId: applicant?._id,
    };

    console.log("APPLICATION PAYLOAD:", payload);

    // 👉 API call korba ekhane
    // await fetch("/api/apply", { method: "POST", body: ... })

    setMessage("Application submitted successfully!");
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto  space-y-8 border border-zinc-600 rounded-2xl p-12">

      {/* HEADER */}
      <div className="space-y-2 border-b pb-5">
        <h1 className="text-3xl font-bold text-indigo-500">
          Apply for {jobs?.jobTitle}
        </h1>

        <p className="text-gray-400">
          Apply to <span className="text-white font-semibold">
            {jobs?.companyName}
          </span> by filling out the form below
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* PERSONAL INFO */}
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
            <Input placeholder="you@example.com" />
            <FieldError />
          </TextField>

          <TextField name="phone">
            <Label className="flex items-center gap-2">
              <FaPhone /> Phone Number
            </Label>
            <Input placeholder="+8801XXXXXXXXX" />
          </TextField>
        </div>

        {/* LINKS */}
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

        {/* COVER LETTER */}
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

        {/* RESUME */}
        <div className="space-y-3">
  <h2 className="text-lg font-semibold text-white">
    📎 Resume Upload
  </h2>

  <div className="space-y-2">

    {/* 🔥 CUSTOM UPLOAD BUTTON */}
    <label
      htmlFor="resume-upload"
      className="flex flex-col items-center justify-center gap-2 cursor-pointer border-2 border-dashed border-gray-600 rounded-xl p-6 hover:border-indigo-500 transition"
    >
      <FaFilePdf className="text-2xl text-indigo-400" />

      <p className="text-white font-medium">
        Click to upload your resume
      </p>

      <p className="text-sm text-gray-400">
        PDF only (Max 5MB)
      </p>
    </label>

    {/* HIDDEN INPUT */}
    <input
      id="resume-upload"
      type="file"
      accept="application/pdf"
      onChange={handleFileChange}
      className="hidden"
    />

    {/* FILE NAME PREVIEW */}
    {resume && (
      <p className="text-sm text-green-400 flex items-center gap-2">
        <FaFilePdf />
        {resume.name}
      </p>
    )}

  </div>
</div>

        {/* SUBMIT */}
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
            Make sure all information is correct before submitting
          </p>
        </div>

      </form>
    </div>
  );
};

export default ApplyJobs;