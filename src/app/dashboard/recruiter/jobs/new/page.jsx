"use client";

import {
  Modal,
  Button,
  Input,
  Label,
  TextField,
  Select,
  ListBox,
  TextArea,
} from "@heroui/react";

import { FiUpload } from "react-icons/fi";
import { FaLocationDot } from "react-icons/fa6";
import { LuGlobe } from "react-icons/lu";
import { format } from "date-fns";

const NewPage = () => {
    const handleSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const skillsRaw = formData.get("skills");

  const data = {
    jobTitle: formData.get("jobTitle"),
    companyName: formData.get("companyName"),
    location: formData.get("location"),
    employmentType: formData.get("employmentType"),
    workMode: formData.get("workMode"),
    experience: formData.get("experience"),
    salary: formData.get("salary"),
    vacancies: formData.get("vacancies"),
    deadline: formData.get("deadline"),
    skills: skillsRaw
      ? skillsRaw.split(",").map((skill) => skill.trim())
      : [],

    description: formData.get("description"),
    banner: formData.get("banner"),
  };

  console.log(data);
};
  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <Modal>
        <Button className='border border-gray-500 rounded-xl' variant="ghost">
          Post a Job
        </Button>

        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="max-w-4xl overflow-hidden border border-zinc-800 bg-[#0b0b0d] text-white">
              <Modal.CloseTrigger />

              {/* Header */}
              <Modal.Header className="border-b border-zinc-800 px-8 py-7">
                <div>
                  <Modal.Heading className="text-[32px] font-semibold">
                    Post a New Job
                  </Modal.Heading>

                  <p className="mt-2 text-sm text-zinc-400">
                    Fill in the details below to publish your job and start receiving applications from qualified candidates.
                  </p>
                </div>
              </Modal.Header>

              {/* Body */}
              <Modal.Body className="p-8">
                <form
  onSubmit={handleSubmit}
  className="grid grid-cols-1 md:grid-cols-2 gap-6"
>
  {/* Job Title */}
  <TextField variant="secondary">
    <Label>Job Title</Label>
    <Input
      name="jobTitle"
      placeholder="Senior Frontend Developer"
    />
  </TextField>

  {/* Company Name */}
  <TextField variant="secondary">
    <Label>Company Name</Label>
    <Input
      name="companyName"
      placeholder="Acme Corp"
    />
  </TextField>

  {/* Location */}
  <TextField variant="secondary">
    <Label className="mb-1">Job Location</Label>

    <div className="relative">
      <FaLocationDot className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-zinc-500" />

      <Input
        name="location"
        className="pl-10 w-full"
        placeholder="Dhaka, Bangladesh"
      />
    </div>
  </TextField>

  {/* Employment Type */}
  <div className="flex flex-col gap-2">
    <Label>Employment Type</Label>

    <Select
      name="employmentType"
      placeholder="Select Employment Type"
    >
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>

      <Select.Popover>
        <ListBox>
          <ListBox.Item id="full-time">
            Full Time
          </ListBox.Item>

          <ListBox.Item id="part-time">
            Part Time
          </ListBox.Item>

          <ListBox.Item id="contract">
            Contract
          </ListBox.Item>

          <ListBox.Item id="internship">
            Internship
          </ListBox.Item>
        </ListBox>
      </Select.Popover>
    </Select>
  </div>

  {/* Work Mode */}
  <div className="flex flex-col gap-2">
    <Label>Work Mode</Label>

    <Select
      name="workMode"
      placeholder="Select Work Mode"
    >
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>

      <Select.Popover>
        <ListBox>
          <ListBox.Item id="remote">
            Remote
          </ListBox.Item>

          <ListBox.Item id="hybrid">
            Hybrid
          </ListBox.Item>

          <ListBox.Item id="onsite">
            On Site
          </ListBox.Item>
        </ListBox>
      </Select.Popover>
    </Select>
  </div>

  {/* Experience */}
  <TextField variant="secondary">
    <Label className="mb-1">Experience Required</Label>
    <Input
      name="experience"
      placeholder="2+ Years"
    />
  </TextField>

  {/* Salary */}
  <TextField variant="secondary">
    <Label>Salary Range</Label>
    <Input
      name="salary"
      placeholder="$1000 - $2000"
    />
  </TextField>

  {/* Vacancies */}
  <TextField variant="secondary">
    <Label>Vacancies</Label>
    <Input
      type="number"
      name="vacancies"
      placeholder="5"
    />
  </TextField>

  {/* Deadline */}
  <TextField variant="secondary">
    <Label>Application Deadline</Label>
    <Input
      type="date"
      name="deadline"
    />
  </TextField>

  {/* Skills */}
  <div className="md:col-span-2">
    <TextField variant="secondary">
      <Label>Required Skills</Label>
      <Input
        name="skills"
        placeholder="React, Next.js, TypeScript, Tailwind CSS"
      />
    </TextField>
  </div>

  {/* Job Description */}
  <div className="md:col-span-2 flex flex-col gap-2">
    <Label>Job Description</Label>

    <TextArea
      name="description"
      rows={8}
      placeholder="Describe the role and responsibilities..."
      className="w-full"
    />
  </div>

  {/* Upload Banner */}
  <div className="md:col-span-2 flex flex-col gap-2">
    <Label>Job Banner</Label>

    <label className="flex items-center gap-4 cursor-pointer">
      <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-dashed border-zinc-700 bg-zinc-900">
        <FiUpload className="text-zinc-400" size={20} />
      </div>

      <div>
        <p className="text-sm font-medium">
          Upload Image
        </p>

        <p className="text-xs text-zinc-500">
          PNG, JPG up to 5MB
        </p>
      </div>

      <input
        type="file"
        name="banner"
        accept="image/*"
        className="hidden"
      />
    </label>
  </div>

  {/* Buttons */}
  <div className="md:col-span-2 border-t border-zinc-800 pt-6 flex justify-end gap-4">
    <Button
      type="button"
      slot="close"
      variant="secondary"
    >
      Cancel
    </Button>

    <Button type="submit">
      Publish Job
    </Button>
  </div>
</form>
              </Modal.Body>

              {/* Footer */}
              <Modal.Footer >
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default NewPage;