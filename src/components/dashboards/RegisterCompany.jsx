import { Button, Input, Label, ListBox, Modal, Surface, TextField, Select, TextArea } from '@heroui/react';
import React from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { FiUpload } from 'react-icons/fi';

const RegisterCompany = () => {
    return (
        <div>
            <Modal>
      <Button variant='ghost' className='px-5 py-2.5 rounded-lg bg-white text-black font-semibold hover:bg-zinc-200'>Register Your Company</Button>
      <Modal.Backdrop variant="blur">
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-3xl">
            <Modal.CloseTrigger />
            <Modal.Header>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#121212] p-6 rounded-xl border border-zinc-800">

      {/* HEADER */}
      <div className="md:col-span-2 border-b border-zinc-800 pb-4">
        <h2 className="text-xl font-semibold text-zinc-100">
          Register Your Company to Start Hiring
        </h2>

        <p className="text-sm text-zinc-400 mt-1">
          As a recruiter, create your company profile to post jobs, manage applicants, and build your hiring pipeline on HireLoop.
        </p>
      </div>

      {/* COMPANY NAME */}
      <TextField>
        <Label className="text-zinc-300">Company Name</Label>
        <Input
          name="companyName"
          placeholder="Enter your company name"
          className="bg-[#1a1a1a] border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:border-zinc-700"
        />
      </TextField>

      {/* INDUSTRY */}
      <div className="flex flex-col gap-2">
        <Label className="text-zinc-300">Industry</Label>

        <Select name="industry">
          <Select.Trigger className="bg-[#1a1a1a] border-zinc-800 text-zinc-100">
            <Select.Value placeholder="Select your industry" />
            <Select.Indicator />
          </Select.Trigger>

          <Select.Popover>
            <ListBox className="bg-[#1a1a1a] border-zinc-800 text-zinc-100">
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
        <Label className="text-zinc-300">Company Website</Label>

        <div className="flex rounded-md overflow-hidden bg-[#1a1a1a] border border-zinc-800 focus-within:border-zinc-700">
          <span className="bg-[#262626] px-4 py-2 text-sm text-zinc-500 border-r border-zinc-800 flex items-center">
            https://
          </span>

          <Input
            name="websiteUrl"
            placeholder="www.yourcompany.com"
            className="bg-transparent border-none focus:ring-0 flex-1 text-zinc-100 placeholder-zinc-600"
          />
        </div>
      </TextField>

      {/* LOCATION */}
      <TextField>
        <Label className="text-zinc-300">Office Location</Label>

        <div className="relative">
          <FaLocationDot className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

          <Input
            name="location"
            placeholder="e.g. Dhaka, Bangladesh"
            className="w-full pl-11 bg-[#1a1a1a] border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:border-zinc-700"
          />
        </div>
      </TextField>

      {/* COMPANY SIZE */}
      <div className="flex flex-col gap-2">
        <Label className="text-zinc-300">Company Size</Label>

        <Select name="employeeCount">
          <Select.Trigger className="bg-[#1a1a1a] border-zinc-800 text-zinc-100">
            <Select.Value placeholder="Select company size" />
            <Select.Indicator />
          </Select.Trigger>

          <Select.Popover>
            <ListBox className="bg-[#1a1a1a] border-zinc-800 text-zinc-100">
              <ListBox.Item id="1-10">1–10 employees</ListBox.Item>
              <ListBox.Item id="11-50">11–50 employees</ListBox.Item>
              <ListBox.Item id="51-200">51–200 employees</ListBox.Item>
              <ListBox.Item id="201+">201+ employees</ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      {/* LOGO */}
      <div className="flex flex-col gap-2">
        <Label className="text-zinc-300">Company Logo</Label>

        <label className="flex items-center gap-4 cursor-pointer">
          <div className="h-14 w-14 flex items-center justify-center border border-dashed border-zinc-700 bg-[#1a1a1a] rounded-xl text-zinc-400 hover:text-zinc-200">
            <FiUpload size={20} />
          </div>

          <div>
            <p className="text-sm font-medium text-zinc-200">
              Upload company logo
            </p>
            <p className="text-xs text-zinc-500 mt-0.5">
              Helps candidates recognize your brand
            </p>
          </div>

          <input type="file" name="companyLogo" hidden />
        </label>
      </div>

      {/* DESCRIPTION */}
      <div className="md:col-span-2">
        <Label className="text-zinc-300">Company Description</Label>

        <TextArea
          name="description"
          rows={5}
          placeholder="Describe your company, what roles you hire for, and your work culture..."
          className="w-full mt-2 bg-[#1a1a1a] border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:border-zinc-700 rounded-lg p-3"
        />
      </div>

      {/* BUTTONS */}
      <div className="md:col-span-2 flex justify-end gap-3 border-t border-zinc-800 pt-5 mt-2">
        <Button
          type="button"
          className="px-5 py-2.5 rounded-lg border border-zinc-800 text-zinc-300 bg-[#141414] hover:bg-[#1c1c1c]"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          className="px-5 py-2.5 rounded-lg bg-white text-black font-semibold hover:bg-zinc-200"
        >
          Register Company
        </Button>
      </div>
    </form>
              </Surface>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
        </div>
    );
};

export default RegisterCompany;