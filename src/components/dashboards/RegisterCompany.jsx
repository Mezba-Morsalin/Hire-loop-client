
"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Label,
  ListBox,
  Modal,
  Select,
  TextArea,
} from "@heroui/react";

import { FiUpload, FiMapPin } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const RegisterCompany = ({recruiter}) => {
  console.log(recruiter)
  const router = useRouter();

  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
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
      const data = Object.fromEntries(formData.entries());

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
        ...data,
        websiteUrl: data.websiteUrl?.startsWith("https://")
          ? data.websiteUrl
          : `https://${data.websiteUrl}`,
        logo: logoUrl,
        recruiterId : recruiter.id
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/companies`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(CompanyData),
        }
      );

      const result = await res.json();

      if (result) {
        toast.success("Company Registered Successfully");

        setTimeout(() => {
          router.push("/dashboard/recruiter/my-company");
        }, 1000);
      } else {
        toast.error("Failed to register company");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal>
        <Button className="bg-white text-black font-medium rounded-xl px-5">
          Register Company
        </Button>

        <Modal.Backdrop variant="blur">
          <Modal.Container>
            <Modal.Dialog
              className="
                w-[95vw]
    max-w-5xl
    max-h-[90vh]
    overflow-y-auto
    overflow-x-hidden
    rounded-2xl
    border
    border-zinc-800
    bg-[#0d0d0e]
              "
            >
              <Modal.CloseTrigger />

              <form onSubmit={handleSubmit}>
                {/* Header */}

                <div className="border-b border-zinc-800 px-8 py-7">
                  <h2 className="text-3xl font-semibold text-white">
                    Register New Company
                  </h2>

                  <p className="mt-2 text-sm text-zinc-400">
                    Enter your business details to start hiring on HireLoop.
                  </p>
                </div>

                {/* Body */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
                  {/* Company Name */}

                  <div className="flex flex-col gap-1">
                    <Label className="mb-2 text-zinc-300">
                      Company Name
                    </Label>

                    <Input
                      name="companyName"
                      placeholder="e.g. Acme Corp"
                      className='bg-[#171717]
                          px-4
                          py-3
                          text-white
                          outline-none'
                    />
                  </div>

                  {/* Industry */}

                  <div className="flex flex-col gap-1">
                    <Label className="mb-2 text-zinc-300">
                      Industry / Category
                    </Label>

                    <Select  name="industry">
                      <Select.Trigger className="bg-[#171717]">
                        <Select.Value className="bg-[#171717]
                          px-4
                          py-1
                          text-white
                          outline-none"  placeholder="Technology" />
                        <Select.Indicator />
                      </Select.Trigger>

                      <Select.Popover>
                        <ListBox>
                          <ListBox.Item id="Technology">
                            Technology
                          </ListBox.Item>

                          <ListBox.Item id="Software">
                            Software
                          </ListBox.Item>

                          <ListBox.Item id="Finance">
                            Finance
                          </ListBox.Item>

                          <ListBox.Item id="Healthcare">
                            Healthcare
                          </ListBox.Item>

                          <ListBox.Item id="Education">
                            Education
                          </ListBox.Item>

                          <ListBox.Item id="E-commerce">
                            E-Commerce
                          </ListBox.Item>
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>

                  {/* Website */}

                  <div className="flex flex-col gap-1">
                    <Label className="mb-2 text-zinc-300">
                      Website URL
                    </Label>

                    <div className="flex overflow-hidden rounded-xl border border-zinc-800">
                      <div className="bg-[#171717] px-4 flex items-center text-zinc-500 text-sm">
                        https://
                      </div>

                      <input
                        name="websiteUrl"
                        placeholder="www.company.com"
                        className="
                          flex-1
                          bg-[#171717]
                          px-4
                          py-2
                          text-white
                          outline-none
                        "
                      />
                    </div>
                  </div>

                  {/* Location */}

                  <div className="flex flex-col gap-1">
                    <Label className="mb-2 text-zinc-300">
                      Location
                    </Label>

                    <div className="relative">
                      <FiMapPin
                        className="
                          absolute
                          left-4
                          top-1/2
                          -translate-y-1/2
                          text-zinc-500
                        "
                      />

                      <Input
                        name="location"
                        placeholder="City, Country"
                        className="pl-10 w-full bg-[#171717]
                          px-4
                          py-3
                          text-white
                          outline-none"
                      />
                    </div>
                  </div>

                  {/* Employee Count */}

                  <div className="flex flex-col gap-1">
                    <Label className="mb-2 text-zinc-300">
                      Employee Count Range
                    </Label>

                    <Select name="employeeCount">
                      <Select.Trigger className="bg-[#171717]">
                        <Select.Value className="bg-[#171717]
                          px-4
                          py-1
                          text-white
                          outline-none" placeholder="1-10 employees" />
                        <Select.Indicator />
                      </Select.Trigger>

                      <Select.Popover>
                        <ListBox>
                          <ListBox.Item id="1-10">
                            1-10 employees
                          </ListBox.Item>

                          <ListBox.Item id="11-50">
                            11-50 employees
                          </ListBox.Item>

                          <ListBox.Item id="51-200">
                            51-200 employees
                          </ListBox.Item>

                          <ListBox.Item id="201-500">
                            201-500 employees
                          </ListBox.Item>

                          <ListBox.Item id="500+">
                            500+ employees
                          </ListBox.Item>
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>

                  {/* Logo */}

                  <div className="flex flex-col gap-1">
                    <Label className="mb-2 text-zinc-300">
                      Company Logo
                    </Label>

                    <label className="flex items-center gap-4 cursor-pointer">
                      <div
                        className="
                          h-16
                          w-16
                          rounded-lg
                          border
                          border-dashed
                          border-zinc-700
                          bg-[#171717]
                          flex
                          items-center
                          justify-center
                          overflow-hidden
                        "
                      >
                        {logoPreview ? (
                          <img
                            src={logoPreview}
                            alt="logo"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <FiUpload className="text-xl text-zinc-400" />
                        )}
                      </div>

                      <div>
                        <p className="text-white text-sm">
                          Upload image
                        </p>

                        <p className="text-xs text-zinc-500">
                          PNG, JPG up to 5MB
                        </p>
                      </div>

                      <input
                        hidden
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];

                          if (!file) return;

                          setLogo(file);
                          setLogoPreview(
                            URL.createObjectURL(file)
                          );
                        }}
                      />
                    </label>
                  </div>

                  {/* Description */}

                  <div className="md:col-span-2">
                    <div className="flex flex-col gap-1">
                      <Label className="mb-2 text-zinc-300">
                      Brief Description
                    </Label>

                    <TextArea
                      name="description"
                      rows={6}
                      placeholder="Tell us about your company's mission and culture..."
                    />
                    </div>
                  </div>
                </div>

                {/* Footer */}

                <div
                  className="
                    border-t
                    border-zinc-800
                    px-8
                    py-5
                    flex
                    justify-end
                    gap-4
                  "
                >
                  <Button
                    variant="outline"
                    className="
                      border-zinc-700
                      text-white
                      min-w-[120px]
                    "
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    isDisabled={loading}
                    className="
                      bg-white
                      text-black
                      font-semibold
                      min-w-[180px]
                      hover:bg-zinc-200
                    "
                  >
                    {loading
                      ? "Submitting..."
                      : "Register Company"}
                  </Button>
                </div>
              </form>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>

      <Toaster position="top-right" />
    </>
  );
};

export default RegisterCompany;