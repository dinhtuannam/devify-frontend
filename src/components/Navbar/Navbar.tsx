import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
import logo from '../../assets/img/logo.png';
import { FaBell, FaUserCircle } from 'react-icons/fa';
const cx = classNames.bind(styles);

function Navbar() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}>
                <img className={cx('logo-img')} src={logo} alt="logo" />
                <h4 className={cx('logo-title')}>Devify Academy</h4>
            </div>
            <div className={cx('body')}>
                <div className={cx('search-wrapper')}>
                    <div className={cx('search-icon')}></div>
                    <input className={cx('search-input')} />
                </div>
            </div>
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
