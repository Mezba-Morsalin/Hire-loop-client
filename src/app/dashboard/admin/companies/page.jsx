import CompanyRegistrations from '@/components/dashboards/AdminCompany';
import React from 'react';

const AdminCompanyPage = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/companies`, {
        cache : "no-cache"
    });
    const companiesData = await res.json();
    console.log("companies", companiesData)
    return (
        <div>
            <CompanyRegistrations companies={companiesData}></CompanyRegistrations>
        </div>
    );
};

export default AdminCompanyPage;