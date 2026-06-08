"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Label,
  ListBox,
  Modal,
  Surface,
  TextField,
  Select,
  TextArea,
} from "@heroui/react";

import { FaLocationDot } from "react-icons/fa6";
import { FiUpload } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const RegisterCompany = () => {
  const router = useRouter()
  const [industryOpen, setIndustryOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const [industry, setIndustry] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (logoPreview) URL.revokeObjectURL(logoPreview);
    };
  }, [logoPreview]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const formData = new FormData(e.currentTarget);

    const companyName = formData.get("companyName");
    const websiteUrl = formData.get("websiteUrl");
    const location = formData.get("location");
    const description = formData.get("description");

    let logoUrl = "";

    if (logo && logo.size > 0) {
      const imageData = new FormData();
      imageData.append("image", logo);

      const imageRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: imageData,
        }
      );

      const imageResult = await imageRes.json();

      if (imageResult?.success) {
        logoUrl = imageResult.data.url;
      }
    }

    const CompanyData = {
      companyName,
      industry,
      websiteUrl: websiteUrl?.startsWith("https://")
        ? websiteUrl
        : `https://${websiteUrl}`,
      location,
      employeeCount,
      description,
      logo: logoUrl,
    };

    console.log("FINAL DATA:", CompanyData);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/companies`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(CompanyData),
      }
    );

    const dataCompany = await res.json();
    console.log(dataCompany);
    
      if (dataCompany) {
        toast.success("Job Added Successfully");

        setTimeout(() => {
          router.push("/dashboard/recruiter/my-company");
        }, 1000);
      } else {
        toast.error("Failed to post job");
      }
  } catch (error) {
    toast.error("Something went wrong");
    console.log(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div>
      <Modal>
        <Button className="px-4 sm:px-5 py-2.5 rounded-lg bg-white text-black font-semibold hover:bg-zinc-200 text-sm sm:text-base">
          Register Your Company
        </Button>

        <Modal.Backdrop variant="blur">
          <Modal.Container placement="auto">
            <Modal.Dialog className="w-[95vw] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
              <Modal.CloseTrigger />

              <Modal.Body className="p-3 sm:p-5 md:p-6">
                <Surface>
                  <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 bg-[#121212] p-4 sm:p-5 md:p-6 rounded-xl border border-zinc-800"
                  >
                    {/* HEADER */}
                    <div className="sm:col-span-2 border-b border-zinc-800 pb-3 sm:pb-4">
                      <h2 className="text-lg sm:text-xl font-semibold text-zinc-100">
                        Register Your Company to Start Hiring
                      </h2>
                      <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                        Create your company profile and start hiring easily.
                      </p>
                    </div>

                    {/* COMPANY NAME */}
                    <TextField>
                      <Label className="text-zinc-300 text-sm sm:text-base">
                        Company Name
                      </Label>
                      <Input name="companyName" placeholder="Company name" />
                    </TextField>

                    {/* INDUSTRY */}
                    <div className="flex flex-col gap-2">
                      <Label className="text-zinc-300 text-sm sm:text-base">
                        Industry
                      </Label>

                      <Select
  selectedKeys={industry ? [industry] : []}
  onSelectionChange={(keys) =>
    setIndustry(Array.from(keys)[0])
  }
  onOpenChange={(open) => setIndustryOpen(open)}
>
  <Select.Trigger>
    <div className="flex items-center justify-between w-full">
      <Select.Value placeholder="Select industry" />

      <FaChevronDown
        className={`transition-transform duration-200 ${
          industryOpen ? "rotate-180" : "rotate-0"
        }`}
      />
    </div>
  </Select.Trigger>

  <Select.Popover>
    <ListBox>
      <ListBox.Item id="tech">Technology</ListBox.Item>
      <ListBox.Item id="software">Software</ListBox.Item>
      <ListBox.Item id="finance">Finance</ListBox.Item>
      <ListBox.Item id="health">Healthcare</ListBox.Item>
      <ListBox.Item id="education">Education</ListBox.Item>
      <ListBox.Item id="ecommerce">E-commerce</ListBox.Item>
    </ListBox>
  </Select.Popover>
</Select>
                    </div>

                    {/* WEBSITE */}
                    <TextField>
                      <Label className="text-zinc-300 text-sm sm:text-base">
                        Website
                      </Label>
                      <Input name="websiteUrl" placeholder="yourcompany.com" />
                    </TextField>

                    {/* LOCATION */}
                    <TextField>
                      <Label className="text-zinc-300 text-sm sm:text-base">
                        Location
                      </Label>
                      <div className="relative">
                        <FaLocationDot className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                        <Input
                          name="location"
                          placeholder="Dhaka, Bangladesh"
                          className="pl-11 w-full"
                        />
                      </div>
                    </TextField>

                    {/* COMPANY SIZE */}
                    <div className="flex flex-col gap-2">
                      <Label className="text-zinc-300 text-sm sm:text-base">
                        Employee Count Range
                      </Label>

                      <Select
  selectedKeys={employeeCount ? [employeeCount] : []}
  onSelectionChange={(keys) =>
    setEmployeeCount(Array.from(keys)[0])
  }
  onOpenChange={(open) => setIsOpen(open)}
>
  <Select.Trigger>
    <div className="flex items-center justify-between w-full">
      <Select.Value placeholder="Select size" />

      <FaChevronDown
        className={`transition-transform duration-200 ${
          isOpen ? "rotate-180" : "rotate-0"
        }`}
      />
    </div>
  </Select.Trigger>

  <Select.Popover>
    <ListBox>
      <ListBox.Item id="1-10">1–10 employees</ListBox.Item>
      <ListBox.Item id="11-50">11–50 employees</ListBox.Item>
      <ListBox.Item id="51-200">51–200 employees</ListBox.Item>
      <ListBox.Item id="200+">200+ employees</ListBox.Item>
    </ListBox>
  </Select.Popover>
</Select>
                    </div>

                    {/* LOGO */}
                    <div className="flex flex-col gap-2">
                      <Label className="text-zinc-300 text-sm sm:text-base">
                        Logo
                      </Label>

                      <label className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 cursor-pointer">
                        <div className="h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center border border-dashed border-zinc-700 rounded-xl overflow-hidden">
                          {logoPreview ? (
                            <img
                              src={logoPreview}
                              alt="logo"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <FiUpload />
                          )}
                        </div>

                        <input
                          type="file"
                          name="companyLogo"
                          hidden
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            setLogo(file);

                            if (file) {
                              setLogoPreview(URL.createObjectURL(file));
                            }
                          }}
                        />
                      </label>
                    </div>

                    {/* DESCRIPTION */}
                    <div className="sm:col-span-2">
                      <div className="flex flex-col gap-2">
                        <Label className="text-zinc-300 text-sm sm:text-base">
                          Description
                        </Label>
                        <TextArea
                          name="description"
                          rows={4}
                          className="sm:rows-5"
                          placeholder="About your company..."
                        />
                      </div>
                    </div>

                    {/* BUTTONS */}
                    <div className="sm:col-span-2 flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
                      <Button type="button" className="w-full sm:w-auto">
                        Cancel
                      </Button>

                      <Button
                        type="submit"
                        isDisabled={loading}
                        className="bg-white text-black w-full sm:w-auto"
                      >
                        {loading ? "Submitting..." : "Register Company"}
                      </Button>
                    </div>
                  </form>
                </Surface>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
      <Toaster/>
    </div>
  );
};

export default RegisterCompany;