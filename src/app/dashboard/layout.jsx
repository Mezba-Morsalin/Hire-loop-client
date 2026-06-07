import DashboardSideBar from '@/components/dashboards/DashboardSideBar';
import React from 'react';

const DashBoardLayout = ({children}) => {
    return (
        <div className='flex flex-col lg:flex-row min-h-screen px-5 lg:px-0'>

                <DashboardSideBar/>
            {/* Main Content */}
            <div className="flex-1 px-1 lg:px-4 py-3">
                {children}
            </div>
        </div>
    );
};

export default DashBoardLayout;