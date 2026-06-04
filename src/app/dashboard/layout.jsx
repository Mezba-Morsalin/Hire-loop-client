import DashboardSideBar from '@/components/dashboards/DashboardSideBar';
import React from 'react';

const DashBoardLayout = ({children}) => {
    return (
        <div className='flex min-h-screen'>

                <DashboardSideBar/>
            <div className='flex-1'>
                {children}
            </div>
        </div>
    );
};

export default DashBoardLayout;