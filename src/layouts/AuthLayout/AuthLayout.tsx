import React, { ReactNode } from 'react';
import styles from './AuthLayout.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

type AuthLayoutProps = {
    children: ReactNode;
};
const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    const background = 'https://accounts.fullstack.edu.vn/static/media/f8_bg_auth_1366.cb1a38f30212c78aa891.png';
    return (
        <div className={cx('wrapper')} style={{ backgroundImage: `url(${background})` }}>
            <div className={cx('container')}>{children}</div>
        </div>
    );
};

export default AuthLayout;
