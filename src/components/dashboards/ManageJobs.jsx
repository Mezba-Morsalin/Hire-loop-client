"use client";

import React from "react";
import { Chip, Table, Button } from "@heroui/react";
import { isBefore, parseISO, isValid } from "date-fns";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaEye } from "react-icons/fa6";

// Get job status
const getStatus = (deadline) => {
  if (!deadline) return "Unknown";

  const end = parseISO(deadline);

  if (!isValid(end)) return "Unknown";

  return isBefore(end, new Date()) ? "Expired" : "Active";
};

// Chip color
const statusColor = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Expired":
      return "danger";
    default:
      return "warning";
  }
};

export default function ManageJobs({ jobs = [] }) {
  return (
    <Table>
      <Table.ResizableContainer>
        <Table.Content
          aria-label="Manage Jobs Table"
          className="min-w-[1000px]"
        >
          {/* Header */}
          <Table.Header>
            <Table.Column
              isRowHeader
              id="jobTitle"
              defaultWidth="1fr"
              minWidth={220}
            >
              Job Title
            </Table.Column>

            <Table.Column id="company" minWidth={180}>
              Company
            </Table.Column>

            <Table.Column id="location" minWidth={180}>
              Location
            </Table.Column>

            <Table.Column id="status" minWidth={120}>
              Status
            </Table.Column>

            <Table.Column id="deadline" minWidth={160}>
              Deadline
            </Table.Column>

            <Table.Column id="actions" minWidth={180}>
              Actions
            </Table.Column>
          </Table.Header>

          {/* Body */}
          <Table.Body>
            {jobs.map((job) => {
              const status = getStatus(job.deadline);

              return (
                <Table.Row key={job._id} id={job._id}>
                  <Table.Cell>{job.jobTitle}</Table.Cell>

                  <Table.Cell>{job.companyName}</Table.Cell>

                  <Table.Cell>{job.location}</Table.Cell>

                  <Table.Cell>
                    <Chip
                      size="sm"
                      variant="soft"
                      color={statusColor(status)}
                    >
                      {status}
                    </Chip>
                  </Table.Cell>

                  <Table.Cell>
                    {job.deadline || "No Deadline"}
                  </Table.Cell>

                  <Table.Cell>
                    <div className="flex gap-2 w-full">
                      <Button className='flex items-center gap-2' size="sm" variant="outline">
                        <FaEye />
                        
                      </Button>

                      <Button className='flex items-center gap-2' size="sm" variant="outline">
                        <CiEdit />
                        
                      </Button>

                      <Button className='flex items-center gap-2' size="sm" variant="danger">
                        <MdOutlineDeleteForever/>
                        
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Content>
      </Table.ResizableContainer>
    </Table>
  );
}