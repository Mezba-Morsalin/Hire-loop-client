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
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const PostJobs = ({company}) => {
  const { data: session} = authClient.useSession();
    const user = session?.user ?? null;
  const router = useRouter();

  const getJobStatus = (deadline) => {
    if (!deadline) return "Unknown";

    const today = new Date();
    const endDate = new Date(deadline);

    today.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    return endDate >= today ? "Active" : "Expired";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const deadline = formData.get("deadline");
    const status = getJobStatus(deadline);

    const skillsRaw = formData.get("skills");

    const data = {
      jobTitle: formData.get("jobTitle"),
      location: formData.get("location"),
      industryCategory: formData.get("industryCategory"),
      employmentType: formData.get("employmentType"),
      workMode: formData.get("workMode"),
      experience: formData.get("experience"),
      salary: formData.get("salary"),
      vacancies: formData.get("vacancies"),
      deadline,
      status,
      skills: skillsRaw
        ? skillsRaw.split(",").map((skill) => skill.trim())
        : [],
      description: formData.get("description"),
      banner: formData.get("banner"),
      companyId : company?._id,
      companyName : company?.companyName,
      userId : user._id,
    };
    
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/jobs`,
        {
          method: "POST",
          cache: "no-store",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const jobs = await res.json();

      if (jobs) {
        toast.success("Job Added Successfully");

        setTimeout(() => {
          router.push("/dashboard/recruiter");
        }, 1000);
      } else {
        toast.error("Failed to post job");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="border border-gray-500 shadow shadow-gray-500 max-w-2xl mx-auto items-center mt-6 p-10 rounded-2xl">
                   <div className="mb-8">
                  <h2 className="text-[32px] font-semibold">
                    Post a New Job
                  </h2>

                  <p className="mt-2 text-sm text-zinc-400">
                    Fill in details to publish your job.
                  </p>
                </div>
      <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {/* Job Title */}
                  <TextField>
                    <Label>Job Title</Label>
                    <Input name="jobTitle" />
                  </TextField>

                  {/* Company */}
                  <div className="flex flex-col gap-2">
                    <Label>Industry / Category</Label>
<Select name="industryCategory">
  <Select.Trigger>
    <Select.Value placeholder="Select Industry" />
    <Select.Indicator />
  </Select.Trigger>

  <Select.Popover>
    <ListBox>
      <ListBox.Item id="software-development">
        Software Development
      </ListBox.Item>
      <ListBox.Item id="web-development">
        Web Development
      </ListBox.Item>
      <ListBox.Item id="mobile-development">
        Mobile Development
      </ListBox.Item>
      <ListBox.Item id="ui-ux-design">
        UI/UX Design
      </ListBox.Item>
      <ListBox.Item id="graphic-design">
        Graphic Design
      </ListBox.Item>
      <ListBox.Item id="digital-marketing">
        Digital Marketing
      </ListBox.Item>
      <ListBox.Item id="marketing">
        Marketing
      </ListBox.Item>
      <ListBox.Item id="sales">
        Sales
      </ListBox.Item>
      <ListBox.Item id="business-development">
        Business Development
      </ListBox.Item>
      <ListBox.Item id="finance-accounting">
        Finance & Accounting
      </ListBox.Item>
      <ListBox.Item id="human-resources">
        Human Resources (HR)
      </ListBox.Item>
      <ListBox.Item id="customer-support">
        Customer Support
      </ListBox.Item>
      <ListBox.Item id="data-science">
        Data Science
      </ListBox.Item>
      <ListBox.Item id="ai-ml">
        AI & Machine Learning
      </ListBox.Item>
      <ListBox.Item id="cyber-security">
        Cyber Security
      </ListBox.Item>
      <ListBox.Item id="devops-cloud">
        DevOps & Cloud
      </ListBox.Item>
      <ListBox.Item id="healthcare">
        Healthcare
      </ListBox.Item>
    </ListBox>
  </Select.Popover>
</Select>
                  </div>

                  {/* Location */}
                  <TextField>
                    <Label>Location</Label>
                    <div className="relative">
                      <FaLocationDot className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                      <Input name="location" className="pl-10 w-full" />
                    </div>
                  </TextField>

                  {/* Employment Type */}
                  <div className="flex flex-col gap-2">
                    <Label>Employment Type</Label>
                    <Select name="employmentType">
                      <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>

                      <Select.Popover>
                        <ListBox>
                          <ListBox.Item id="full-time">Full Time</ListBox.Item>
                          <ListBox.Item id="part-time">Part Time</ListBox.Item>
                          <ListBox.Item id="contract">Contract</ListBox.Item>
                          <ListBox.Item id="internship">Internship</ListBox.Item>
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>

                  {/* Work Mode */}
                  <div className="flex flex-col gap-2">
                    <Label>Work Mode</Label>
                    <Select name="workMode">
                      <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>

                      <Select.Popover>
                        <ListBox>
                          <ListBox.Item id="remote">Remote</ListBox.Item>
                          <ListBox.Item id="hybrid">Hybrid</ListBox.Item>
                          <ListBox.Item id="onsite">On Site</ListBox.Item>
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>

                  {/* Experience */}
                  <TextField>
                    <Label>Experience</Label>
                    <Input name="experience" />
                  </TextField>

                  {/* Salary */}
                  <TextField>
                    <Label>Salary</Label>
                    <Input name="salary" />
                  </TextField>

                  {/* Vacancies */}
                  <TextField>
                    <Label>Vacancies</Label>
                    <Input type="number" name="vacancies" />
                  </TextField>

                  {/* Deadline */}
                  <TextField>
                    <Label>Deadline</Label>
                    <Input type="date" name="deadline" />
                  </TextField>

                  {/* Skills */}
                  <div className="md:col-span-2">
                    <TextField>
                      <Label>Skills</Label>
                      <Input name="skills" />
                    </TextField>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <Label>Description</Label>
                    <TextArea className="w-full" name="description" rows={6} />
                  </div>

                  {/* Banner */}
                  <div className="md:col-span-2 flex flex-col gap-2">
                    <Label>Banner</Label>

                    <label className="flex items-center gap-4 cursor-pointer">
                      <div className="h-14 w-14 flex items-center justify-center border border-dashed rounded-xl">
                        <FiUpload />
                      </div>

                      <div>
                        <p>Upload Image</p>
                        <p className="text-xs text-zinc-500">
                          PNG, JPG up to 500kb
                        </p>
                      </div>

                      <input type="file" name="banner" hidden />
                    </label>
                  </div>

                  {/* BUTTONS */}
                  <div className="md:col-span-2 flex justify-end gap-3 border-t border-zinc-800 pt-5">
                    <Button className={"border border-gray-500 rounded-xl"} variant="ghost" type="button" slot="close">
                      Cancel
                    </Button>

                    <Button className={'bg-white text-black rounded-xl'} type="submit">Publish Job</Button>
                  </div>
                </form>

      <Toaster />
    </div>
  );
};

export default PostJobs;