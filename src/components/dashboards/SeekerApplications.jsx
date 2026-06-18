import { Card, Table } from '@heroui/react';
import { format } from 'date-fns';
import React from 'react';

const SeekerApplications = ({applications}) => {
    return (
        <div>
            <Card className="bg-[#111114] border border-zinc-800">
          <div className="p-4">
            <Table>
  <Table.ScrollContainer>
    <Table.Content
      aria-label="Applications Table"
      className="min-w-[900px]"
    >
      <Table.Header>
        <Table.Column isRowHeader>
          Job Title
        </Table.Column>

        <Table.Column>
          Company
        </Table.Column>

        <Table.Column>
          Applied
        </Table.Column>

        <Table.Column>
          Status
        </Table.Column>

        <Table.Column>
          Action
        </Table.Column>
      </Table.Header>

      <Table.Body>
        
          {
            applications.map(item => 
                <Table.Row  key={item._id} 
            
          >
            <Table.Cell>
            {item.jobTitle}
            </Table.Cell>
            <Table.Cell>
            {item.companyName}
            </Table.Cell>
            <Table.Cell>
            {format(new Date(item.createdAt), "dd MMMM yyyy, hh:mm a")}
            </Table.Cell>
            <Table.Cell >
              <p className='text-green-500'>{item.status}</p>
            </Table.Cell>
            <Table.Cell>
              Details
            </Table.Cell>
          </Table.Row>
            )
          }
      </Table.Body>
    </Table.Content>
  </Table.ScrollContainer>
</Table>
          </div>

          {/* Footer */}

          <div className="flex items-center justify-between border-t border-zinc-800 px-5 py-4 text-sm text-zinc-500">
            <span>
              Showing 1-5 of 24 applications
            </span>

            <div className="flex gap-3">
              <button>{"<"}</button>
              <button className="text-white">1</button>
              <button>2</button>
              <button>3</button>
              <button>{">"}</button>
            </div>
          </div>
        </Card>
        </div>
    );
};

export default SeekerApplications;