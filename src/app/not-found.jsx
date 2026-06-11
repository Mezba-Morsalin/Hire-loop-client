import Link from 'next/link';
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import { MdErrorOutline } from 'react-icons/md';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0B0B0D] px-6">
      <div className="text-center max-w-lg">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-indigo-600/10 flex items-center justify-center">
            <MdErrorOutline className="text-6xl text-indigo-500" />
          </div>
        </div>

        <h1 className="text-7xl font-bold text-white">404</h1>

        <h2 className="mt-4 text-3xl font-semibold text-white">
          Page Not Found
        </h2>

        <p className="mt-3 text-gray-400 leading-relaxed">
          Sorry, the page you are looking for does not exist or may have been
          moved to another location.
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition-all px-6 py-3 text-white font-medium"
          >
            <FaArrowLeft />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
    );
};

export default NotFoundPage;