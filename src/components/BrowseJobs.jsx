import {
    Button,
  Card,
} from "@heroui/react";
import Link from "next/link";

import {

  FaLocationDot,
  FaUsers,
  FaBuilding,
  FaDollarSign,
} from "react-icons/fa6";
import { LuSquareArrowOutUpRight } from "react-icons/lu";

const BrowseJobs = ({ job }) => {
  return (
    <div>
        <Card className="w-full h-full max-w-md p-5 space-y-4">
      {/* Header */}
      <div className="space-y-3">
        <h2 className="text-2xl font-bold bg-linear-to-r ">{job.jobTitle}</h2>
        <p className="text-zinc-400 font-extrabold">{job.companyName}</p>
      </div>

      {/* Description */}
      <p className="text-sm text-default-600 leading-7">
        {job.description}
      </p>

      {/* Details */}
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <FaLocationDot color="#615fff"/>
          <span>{job.location}</span>
        </div>

        <div className="flex items-center gap-2">
          <FaBuilding color="#615fff" />
          <span>{job.industryCategory}</span>
        </div>

        <div className="flex items-center gap-2">
          <FaUsers color="#615fff" />
          <span>{job.vacancies} Vacancies</span>
        </div>

        <div className="flex items-center gap-2">
          <FaDollarSign color="#615fff" />
          <span>${job.salary}</span>
        </div>
      </div>
      <div>
        <Link href="/">
        <Button variant="ghost" className={'border border-zinc-400 flex items-center gap-2'}>Apply Now <LuSquareArrowOutUpRight/></Button>
        </Link>
      </div>
    </Card>
    </div>
  );
};
export default BrowseJobs