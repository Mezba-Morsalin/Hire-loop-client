"use client";

import React from "react";
import { Table, Button, Chip, Avatar } from "@heroui/react";
import { format } from "date-fns";
import Image from "next/image";

const CompanyRegistrations = ({ companies }) => {
  const getStatusChip = (status) => {
    switch (status) {
      case "Approved":
        return (
          <Chip color="success" variant="flat">
            Approved
          </Chip>
        );

      case "Rejected":
        return (
          <Chip color="danger" variant="flat">
            Rejected
          </Chip>
        );

      default:
        return (
          <Chip color="warning" variant="flat">
            Pending
          </Chip>
        );
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#111114] p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">
          Company Registrations
        </h2>

        <p className="text-zinc-500 text-sm mt-1">
          Review and manage company registration requests.
        </p>
      </div>

      <Table>
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Company registrations"
            className="min-w-[1200px]"
          >
            <Table.Header>
              <Table.Column isRowHeader>
                COMPANY
              </Table.Column>

              <Table.Column>
                INDUSTRY
              </Table.Column>

              <Table.Column>
                LOCATION
              </Table.Column>

              <Table.Column>
                EMPLOYEES
              </Table.Column>

              <Table.Column>
                STATUS
              </Table.Column>

              <Table.Column>
                DATE SUBMITTED
              </Table.Column>

              <Table.Column>
                ACTIONS
              </Table.Column>
            </Table.Header>

            <Table.Body>
              {companies?.map((company) => (
                <Table.Row key={company._id}>
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <Image
                        src={company?.logo}
                        alt="company-logo"
                        width={50}
                        height={50}
                      />

                      <div>
                        <p className="font-medium">
                          {company.companyName}
                        </p>

                        <p className="text-xs text-zinc-500">
                          {company.websiteUrl}
                        </p>
                      </div>
                    </div>
                  </Table.Cell>

                  <Table.Cell>
                    {company.industry}
                  </Table.Cell>

                  <Table.Cell>
                    {company.location}
                  </Table.Cell>

                  <Table.Cell>
                    {company.employeeCount}
                  </Table.Cell>

                  <Table.Cell>
                    {getStatusChip(company.status)}
                  </Table.Cell>

                  <Table.Cell>
                    {format(
                      new Date(company.createdAt),
                      "dd MMMM yyyy"
                    )}
                  </Table.Cell>

                  <Table.Cell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        className="bg-[#1c2c23] border border-green-700 text-green-500"
                      >
                        Approve
                      </Button>

                      <Button
                        className={'border border-red-400'}
                        variant="danger-soft"
                      >
                        Reject
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};

export default CompanyRegistrations;