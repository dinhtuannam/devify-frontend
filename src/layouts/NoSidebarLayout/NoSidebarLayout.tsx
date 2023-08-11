import React, { ReactNode } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar/DefaultNavbar/Navbar';
import Footer from '../../components/Footer/Footer';
import styles from './NoSidebarLayout.module.scss';
import classNames from 'classnames/bind';
import { memo } from 'react';
const cx = classNames.bind(styles);
type NoSidebarLayoutProps = {
    children: ReactNode;
};
const NoSidebarLayout: React.FC<NoSidebarLayoutProps> = ({ children }) => {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <div>
            <Navbar />
            <div className={cx('container')}>
                <div className={cx('content-wrapper')}>{children}</div>
            </div>
            <Footer />
        </div>
    );
};

export default memo(NoSidebarLayout);
