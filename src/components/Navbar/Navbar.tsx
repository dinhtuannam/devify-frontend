import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
import logo from '../../assets/img/logo.png';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { AiOutlineLeft } from 'react-icons/ai';
import NavbarSearch from './Search/NavbarSearch';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function Navbar() {
    const path = window.location.pathname;
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
                <div>
                    <FaUserCircle className={cx('avatar')} />
                </div>
            </div>
        </div>
    );
}

export default Navbar;
