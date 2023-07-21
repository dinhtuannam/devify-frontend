import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
import logo from '../../assets/img/logo.png';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { AiOutlineLeft, AiOutlineMenu } from 'react-icons/ai';
import NavbarSearch from './Search/NavbarSearch';
import { Link } from 'react-router-dom';
import { currentUserType } from '../../types/AccountType';
import Tippy from '@tippyjs/react';
import UseLogout from '../../hooks/useLogout';
import useLocalStorage from 'use-local-storage';
import { useState, Fragment, useEffect } from 'react';
import { GetAuthCookies } from '../../helpers/cookiesHelper';
const cx = classNames.bind(styles);

function Navbar() {
    const [showTippy, setShowTippy] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<currentUserType | null>(null);
    const [theme, setTheme] = useLocalStorage<string>('devify theme', 'Light');
    const cookiesData = GetAuthCookies();

    const path = window.location.pathname;

    useEffect(() => {
        const userString: string | null = localStorage.getItem('currentUser');
        const user: currentUserType | null = userString ? JSON.parse(userString) : null;
        setCurrentUser(user);
    }, []);

    const switchTheme = () => {
        const newTheme: string = theme === 'Light' ? 'Dark' : 'Light';
        setTheme(newTheme);
    };

    const handleTippy = () => {
        setShowTippy(!showTippy);
    };

    const handleLogout = () => {
        UseLogout();
        window.location.reload();
    };

    const LoginedComponent = () => {
        return (
            <Fragment>
                <div>
                    <button className={cx('mylearn')}>Khóa học của tôi</button>
                </div>
                <div>
                    <FaBell className={cx('alert')} />
                </div>

                <Tippy
                    onClickOutside={() => setShowTippy(false)}
                    interactive
                    visible={showTippy}
                    render={(attrs) => (
                        <div
                            className={cx('tippy')}
                            tabIndex={-1}
                            {...attrs}
                            style={showTippy ? { display: 'block' } : { display: 'none' }}
                        >
                            <ul className="tippy-wrapper">
                                <li className={cx('user-heading')}>
                                    <FaUserCircle className={cx('avatar')} />
                                    <p className={cx('username')}>{currentUser?.username}</p>
                                </li>
                                <li className={cx('user-item-container')}>
                                    <a className={cx('user-item')} href="/">
                                        Trang cá nhân
                                    </a>
                                </li>
                                <li className={cx('user-item-container')}>
                                    <a className={cx('user-item')} href="/">
                                        Cài đặt
                                    </a>
                                </li>
                                <li className={cx('user-item-container')}>
                                    <div className={cx('user-item')} onClick={switchTheme}>
                                        <span style={{ marginRight: 6 }}>Chế độ :</span>
                                        <span>{theme}</span>
                                    </div>
                                </li>
                                <li className={cx('user-item-container')}>
                                    <div className={cx('user-item')} onClick={handleLogout}>
                                        Đăng xuất
                                    </div>
                                </li>
                            </ul>
                        </div>
                    )}
                >
                    <div onClick={handleTippy}>
                        <FaUserCircle className={cx('avatar')} />
                    </div>
                </Tippy>
            </Fragment>
        );
    };
    const unLoginedComponent = () => {
        return (
            <Fragment>
                <Link to={'/login'} className={cx('login-btn')}>
                    Login
                </Link>
            </Fragment>
        );
    };
    const checkIsLogin = () => {
        if (cookiesData.accessTokenCookie && cookiesData.refreshTokenCookie && cookiesData.isLoginCookies === 'true')
            return true;
        else return false;
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}>
                <Link to="/">
                    <img className={cx('logo-img')} src={logo} alt="logo" />
                </Link>
                <AiOutlineMenu className={cx('menu-icon')} />
                {path === '/' ? (
                    <h4 className={cx('logo-title')}>Devify Academy</h4>
                ) : (
                    <Link to="/" className={cx('back')}>
                        <AiOutlineLeft style={{ marginTop: '1px' }} />
                        <span>QUAY LẠI</span>
                    </Link>
                )}
            </div>
            <NavbarSearch />
            <div className={cx('action')}>{checkIsLogin() === true ? LoginedComponent() : unLoginedComponent()}</div>
        </div>
    );
}

export default Navbar;
