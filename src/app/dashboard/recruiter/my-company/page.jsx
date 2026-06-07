import Image from 'next/image';
import React from 'react';
import bgImg from '../../../../../public/assets/Background.png';
import iconImg from '../../../../../public/assets/Container.png';
import RegisterCompany from '@/components/dashboards/RegisterCompany';
import { Button } from '@heroui/react';

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">

      {/* Image Wrapper */}
      <div className="relative w-fit">
        <Image 
          src={bgImg} 
          alt="bg-img" 
          width={200} 
          height={200}
        />

        {/* Icon on top-right of image */}
        <div className="absolute -top-3 -right-3">
          <Image 
            className="bg-white p-2 rounded-full shadow"
            src={iconImg} 
            alt="container-icon" 
            width={40} 
            height={40}
          />
        </div>
      </div>

      {/* Text */}
      <h2 className="text-4xl font-bold mt-6">
        Company not registered yet
      </h2>

      <p className="text-gray-500 text-base mt-2 max-w-md">
        Set up your business profile to start posting high-performance job listings and manage your talent loop.
      </p>
      <div className='flex gap-3 mt-4'>
        <RegisterCompany/>
        <Button className={'px-5 py-2.5 rounded-lg border border-zinc-800 text-zinc-300 bg-[#141414] hover:bg-[#1c1c1c]'}>View FAQ</Button>
      </div>
    </div>
  );
};

export default page;