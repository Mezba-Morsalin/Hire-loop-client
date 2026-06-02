import Hero from "@/components/home/hero";
import StatisticsSection from "@/components/Statistics";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero/>
      <StatisticsSection/>
    </div>
  );
}
