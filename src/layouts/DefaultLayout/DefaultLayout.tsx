import React, { ReactNode } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Sidebar from '../../components/Sidebar/Sidebar';
type DefaultLayoutProps = {
    children: ReactNode;
};

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
    return (
        <div>
            <Navbar />
            <Sidebar />
            {children}
            <Footer />
        </div>
    );
};

export default DefaultLayout;
