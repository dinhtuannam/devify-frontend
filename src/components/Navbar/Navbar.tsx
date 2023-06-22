import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
import logo from '../../assets/img/logo.png';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { AiOutlineLeft } from 'react-icons/ai';
import NavbarSearch from './Search/NavbarSearch';
import { Link } from 'react-router-dom';
import PopperWrapper from './PopperWrapper/PopperWrapper';
import Tippy from '@tippyjs/react';
import useLocalStorage from 'use-local-storage';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Navbar() {
    const [showTippy, setShowTippy] = useState(false);
    const [theme, setTheme] = useLocalStorage<string>('devify theme', 'Light');

    const switchTheme = () => {
        const newTheme = theme === 'Light' ? 'Dark' : 'Light';
        setTheme(newTheme);
    };
    const path = window.location.pathname;

    const handleTippy = () => {
        setShowTippy(!showTippy);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}>
                <img className={cx('logo-img')} src={logo} alt="logo" />
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
            <div className={cx('action')}>
                <div>
                    <button className={cx('mylearn')}>Khóa học của tôi</button>
                </div>
                <div>
                    <FaBell className={cx('alert')} />
                </div>

                <Tippy
                    onClickOutside={() => setShowTippy(false)}
                    interactive
                    visible={showTippy} // Sử dụng giá trị của state showTippy trực tiếp ở đây
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
                                    <p className={cx('username')}>Nam</p>
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
                                    <a className={cx('user-item')} href="/">
                                        Đăng xuất
                                    </a>
                                </li>
                            </ul>
                        </div>
                    )}
                >
                    <div onClick={handleTippy}>
                        <FaUserCircle className={cx('avatar')} />
                    </div>
                </Tippy>
            </div>
        </div>
    );
}

export default Navbar;
