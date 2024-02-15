import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
import logo from '../../../assets/img/logo.png';
import { FaBell, FaUserCircle, FaShoppingCart } from 'react-icons/fa';
import { AiOutlineLeft, AiOutlineMenu } from 'react-icons/ai';
import NavbarSearch from './Search/NavbarSearch';
import { Link, useNavigate } from 'react-router-dom';
import { currentUserType } from '../../../types/UserType';
import Tippy from '@tippyjs/react';
import UseLogout from '../../../hooks/useLogout';
import { useState, Fragment, useEffect } from 'react';
import useCheckLogin from '../../../hooks/useCheckLogin';
import useTheme from '../../../hooks/useTheme';
import DefaultButton from '../../Button/DefaultButton/DefaultButton';
import MenuItem from '../../Menu/MenuItem/MenuItem';
const cx = classNames.bind(styles);

function Navbar() {
    const [showTippy, setShowTippy] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<currentUserType | null>(null);
    const { theme, switchTheme } = useTheme();
    const isLoginCheck = useCheckLogin();
    const path = window.location.pathname;
    const navigate = useNavigate();

    useEffect(() => {
        const userString: string | null = localStorage.getItem('currentUser');
        const user: currentUserType | null = userString ? JSON.parse(userString) : null;
        setCurrentUser(user);
    }, []);

    const handleTippy = () => {
        setShowTippy(!showTippy);
    };

    const handleLogout = () => {
        UseLogout();
    };

    const LoginedComponent = () => {
        return (
            <Fragment>
                <Link to="/inventory">
                    <button className={cx('mylearn')}>Khóa học của tôi</button>
                </Link>
                <Link to="/cart">
                    <FaShoppingCart className={cx('alert')} />
                </Link>
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
                                <MenuItem to="/">
                                    <FaUserCircle className={cx('avatar')} />
                                    <p className={cx('username')}>{currentUser?.username}</p>
                                </MenuItem>
                                <MenuItem to="/profile">Trang cá nhân</MenuItem>
                                <MenuItem href="/setting">Cài đặt</MenuItem>
                                <MenuItem onClick={switchTheme}>
                                    <span style={{ marginRight: 6 }}>Chế độ :</span>
                                    <span>{theme}</span>
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
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
                <DefaultButton href="/register" outline medium>
                    Register
                </DefaultButton>
                <DefaultButton href="/login" primary medium>
                    Login
                </DefaultButton>
            </Fragment>
        );
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
                    <div className={cx('back')} onClick={() => navigate(-1)}>
                        <AiOutlineLeft style={{ marginTop: '1px' }} />
                        <span>QUAY LẠI</span>
                    </div>
                )}
            </div>
            <NavbarSearch />
            <div className={cx('action')}>{isLoginCheck === true ? LoginedComponent() : unLoginedComponent()}</div>
        </div>
    );
}

export default Navbar;
