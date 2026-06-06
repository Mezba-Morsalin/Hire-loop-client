import React from "react";
import { Chip } from "@heroui/react";

// status helper
const getStatus = (deadline) => {
  if (!deadline) return "Unknown";

  const today = new Date();
  const end = new Date(deadline);

  today.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  return end >= today ? "Active" : "Expired";
};

// chip color
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

const ManageJobs = ({ job }) => {
  const status = getStatus(job.deadline);

  return (
    <div className="flex items-center justify-between border border-zinc-800 rounded-xl p-4 bg-zinc-900 text-white">
      
      {/* LEFT INFO */}
      <div>
        <h2 className="text-lg font-semibold">{job.jobTitle}</h2>

        <p className="text-sm text-zinc-400">
          {job.companyName} • {job.location}
        </p>

        <p className="text-xs text-zinc-500 mt-1">
          Vacancies: {job.vacancies}
        </p>
      </div>

      {/* RIGHT STATUS */}
      <div className="flex flex-col items-end gap-2">
        <Chip
          size="sm"
          variant="soft"
          color={statusColor(status)}
        >
          {status}
        </Chip>

        <span className="text-xs text-zinc-400">
          Deadline: {new Date(job.deadline).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default ManageJobs;