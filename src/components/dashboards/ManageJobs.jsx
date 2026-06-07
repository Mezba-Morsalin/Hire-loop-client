"use client";

import React from "react";
import { Chip, Table } from "@heroui/react";
import { isBefore, parseISO } from "date-fns";

// ✅ status using date-fns
const getStatus = (deadline) => {
  if (!deadline) return "Unknown";

  const today = new Date();
  const end = parseISO(deadline);

  if (isNaN(end)) return "Unknown";

  return isBefore(end, today) ? "Expired" : "Active";
};

// 🎨 chip color
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

export default function ManageJobs({ jobs }) {
  return (
    <Table>
      <Table.ResizableContainer>
        <Table.Content
          aria-label="Jobs Table"
          className="min-w-[900px]"
        >
          {/* HEADER */}
          <Table.Header>
            <Table.Column
              isRowHeader
              id="title"
              defaultWidth="1fr"
              minWidth={200}
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
          </Table.Header>

          {/* BODY */}
          <Table.Body>
            {jobs?.map((job) => {
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
                    {job.deadline}
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