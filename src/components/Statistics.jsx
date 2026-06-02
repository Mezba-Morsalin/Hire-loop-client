import {
  HiOutlineBriefcase,
  HiOutlineOfficeBuilding,
  HiOutlineSearch,
  HiOutlineStar,
} from "react-icons/hi";

export default function StatisticsSection() {
  const stats = [
    {
      id: 1,
      icon: <HiOutlineBriefcase className="w-6 h-6 text-indigo-400" />,
      value: "50K",
      label: "Active Jobs",
    },
    {
      id: 2,
      icon: <HiOutlineOfficeBuilding className="w-6 h-6 text-indigo-400" />,
      value: "12K",
      label: "Companies",
    },
    {
      id: 3,
      icon: <HiOutlineSearch className="w-6 h-6 text-indigo-400" />,
      value: "2M",
      label: "Job Seekers",
    },
    {
      id: 4,
      icon: <HiOutlineStar className="w-6 h-6 text-indigo-400" />,
      value: "97%",
      label: "Satisfaction Rate",
    },
  ];

  return (
   <section
  className="overflow-hidden  py-24 px-6 md:px-12 text-white bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/images/globe.png')",
  }}
>
  <div className="max-w-7xl mx-auto">
    {/* Heading */}
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight">
        Assisting over{" "}
        <span className="font-semibold text-white">
          15,000 job seekers
        </span>
        <br />
        find their dream positions.
      </h2>
    </div>

    {/* Statistics Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="group p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300"
        >
          <div className="mb-6">{stat.icon}</div>

          <h3 className="text-4xl font-bold mb-2 text-white">
            {stat.value}
          </h3>

          <p className="text-gray-300 text-sm tracking-wide">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
  );
}