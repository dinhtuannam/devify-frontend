import React, { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LearningNavbar from '../../components/Navbar/LearningNavbar/LearningNavbar';

type LearningLayoutProps = {
    children: ReactNode;
};

const LearningLayout: React.FC<LearningLayoutProps> = ({ children }) => {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <div>
            <LearningNavbar />
            {children}
        </div>
    );
};

export default LearningLayout;
