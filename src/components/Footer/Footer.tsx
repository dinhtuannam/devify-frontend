import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import { AiFillFacebook, AiFillInstagram } from 'react-icons/ai';
import { FaTiktok } from 'react-icons/fa';
import logo from '../../assets/img/logo.png';
const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('body')}>
                    <div className={cx('body-item', 'w-40')}>
                        <div className={cx('heading-wrapper')}>
                            <a href="/">
                                <img className={cx('logo')} src={logo} alt="F8" />
                            </a>
                            <span className={cx('slogan')}>Học Lập Trình Để Đi Làm</span>
                        </div>

                        <p className={cx('contact-list')}>
                            Điện thoại: <a href="tel:0246.329.1102">0246.329.1102</a>
                            <br />
                            Email: <a href="mailto:contact@fullstack.edu.vn">contact@fullstack.edu.vn</a>
                            <br />
                            Địa chỉ: Số 26 Dương Đình Nghệ, Phường Yên Hòa, Quận Cầu Giấy, TP. Hà Nội
                        </p>
                    </div>
                    <div className={cx('body-item', 'w-20')}>
                        <h2 className={cx('heading-wrapper')}>Về F8</h2>
                        <ul className={cx('list-wrapper')}>
                            <li>
                                <a href="/about-us">Giới thiệu</a>
                            </li>
                            <li>
                                <a href="/contact-us">Liên hệ</a>
                            </li>
                            <li>
                                <a href="/terms">Điều khoản</a>
                            </li>
                            <li>
                                <a href="/privacy">Bảo mật</a>
                            </li>
                            <li>
                                <a href="/careers">Cơ hội việc làm</a>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('body-item', 'w-20')}>
                        <h2 className={cx('heading-wrapper')}>CÔNG CỤ</h2>
                        <ul className={cx('list-wrapper')}>
                            <li>
                                <a href="/about-us">Tạo CV xin việc</a>
                            </li>
                            <li>
                                <a href="/contact-us">Rút gọn liên kết</a>
                            </li>
                            <li>
                                <a href="/terms">Clip-path maker</a>
                            </li>
                            <li>
                                <a href="/privacy">Snippet generator</a>
                            </li>
                            <li>
                                <a href="/careers">Cảnh báo sờ tay lên mặt</a>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('body-item', 'w-20')}>
                        <h2 className={cx('heading-wrapper')}>SẢN PHẨM</h2>
                        <ul className={cx('list-wrapper')}>
                            <li>
                                <a href="/about-us">Game Nester</a>
                            </li>
                            <li>
                                <a href="/contact-us">Game CSS Diner</a>
                            </li>
                            <li>
                                <a href="/terms">Game CSS Selectors</a>
                            </li>
                            <li>
                                <a href="/privacy">Game Froggy</a>
                            </li>
                            <li>
                                <a href="/careers">Game Froggy Pro</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={cx('description')}>
                    <p className={cx('copyright')}>© 2018 - 2023 F8. Nền tảng học lập trình hàng đầu Việt Nam</p>
                    <div className={cx('social-list')}>
                        <FaTiktok className={cx('icon')} />
                        <AiFillFacebook className={cx('icon')} />
                        <AiFillInstagram className={cx('icon')} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
