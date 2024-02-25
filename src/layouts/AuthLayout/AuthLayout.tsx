import React, { ReactNode } from 'react';
import styles from './AuthLayout.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

type AuthLayoutProps = {
    children: ReactNode;
};
const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    const background =
        'https://previews.123rf.com/images/adiruch/adiruch1607/adiruch160702443/60385584-learning-management-system-lms-businessman-drawing-landing-page-on-blurred-abstract-background.jpg';
    return (
        <div className={cx('wrapper')} style={{ backgroundImage: `url(${background})` }}>
            <div className={cx('container')}>{children}</div>
        </div>
    );
};

export default AuthLayout;
