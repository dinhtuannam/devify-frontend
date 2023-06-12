import React, { ReactNode } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
type DefaultLayoutProps = {
    children: ReactNode;
};
const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <div>
            <Navbar />
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content-wrapper')}>{children}</div>
            </div>
            <Footer />
        </div>
    );
};

export default DefaultLayout;
