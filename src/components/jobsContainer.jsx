"use client";

import { useMemo, useState } from "react";

import {
  Button,
  Label,
  ListBox,
  SearchField,
  Select,
} from "@heroui/react";
import BrowseJobs from "./BrowseJobs";

export default function JobsContainer({ jobs }) {
  const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState("all");
  const [category, setCategory] = useState("all");

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
        job.companyName.toLowerCase().includes(search.toLowerCase());

      const matchesJobType =
        jobType === "all" || job.employmentType === jobType;

      const matchesCategory =
        category === "all" || job.industryCategory === category;

      return matchesSearch && matchesJobType && matchesCategory;
    });
  }, [jobs, search, jobType, category]);

  const clearFilters = () => {
    setSearch("");
    setJobType("all");
    setCategory("all");
  };

  return (
    <>
      {/* Filters */}

      <div className="mb-10 rounded-2xl border border-default-200 p-6">
        <div className="grid md:grid-cols-3 gap-5">
          {/* Search */}

          <SearchField>
            <Label>Search Jobs</Label>

            <SearchField.Group>
              <SearchField.SearchIcon />

              <SearchField.Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title or company..."
              />

              <SearchField.ClearButton />
            </SearchField.Group>
          </SearchField>

          {/* Job Type */}

          <Select
            selectedKey={jobType}
            onSelectionChange={(key) => setJobType(String(key))}
          >
            <Label>Job Type</Label>

            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>

            <Select.Popover>
              <ListBox>
                <ListBox.Item id="all">
                  All
                  <ListBox.ItemIndicator />
                </ListBox.Item>

                <ListBox.Item id="full-time">
                  Full Time
                  <ListBox.ItemIndicator />
                </ListBox.Item>

                <ListBox.Item id="part-time">
                  Part Time
                  <ListBox.ItemIndicator />
                </ListBox.Item>

                <ListBox.Item id="contract">
                  Contract
                  <ListBox.ItemIndicator />
                </ListBox.Item>

                <ListBox.Item id="internship">
                  Internship
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>

          {/* Category */}

          <Select
            selectedKey={category}
            onSelectionChange={(key) => setCategory(String(key))}
          >
            <Label>Category</Label>

            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>

            <Select.Popover>
              <ListBox>
                <ListBox.Item id="all">
                  All Categories
                  <ListBox.ItemIndicator />
                </ListBox.Item>

                <ListBox.Item id="web-development">
                  Web Development
                  <ListBox.ItemIndicator />
                </ListBox.Item>

                <ListBox.Item id="mobile-development">
                  Mobile Development
                  <ListBox.ItemIndicator />
                </ListBox.Item>

                <ListBox.Item id="ui-ux">
                  UI/UX Design
                  <ListBox.ItemIndicator />
                </ListBox.Item>

                <ListBox.Item id="digital-marketing">
                  Digital Marketing
                  <ListBox.ItemIndicator />
                </ListBox.Item>

                <ListBox.Item id="data-science">
                  Data Science
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        <div className="mt-5 flex justify-end">
          <Button className='border border-zinc-400 rounded-xl' variant="ghost" onPress={clearFilters}>
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Jobs */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <BrowseJobs key={job._id} job={job} />
          ))
        ) : (
          <div className="col-span-full text-center py-16 text-zinc-500">
            No jobs found.
          </div>
        )}
      </div>
    </>
  );
}