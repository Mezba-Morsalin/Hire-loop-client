import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react';

const AuthLayout = ({children}) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default AuthLayout;