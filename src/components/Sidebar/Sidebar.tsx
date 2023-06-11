import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import { AiFillHome } from 'react-icons/ai';
import { FaLightbulb, FaRoad, FaBlogger } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <ul className={cx('list-container')}>
                    <Link to="/" className={cx('link')}>
                        <li className={cx('list-item')}>
                            <AiFillHome />
                            <span className={cx('title')}>Home</span>
                        </li>
                    </Link>
                    <Link to="/course" className={cx('link')}>
                        <li className={cx('list-item')}>
                            <FaLightbulb />
                            <span className={cx('title')}>Course</span>
                        </li>
                    </Link>
                    <Link to="roadmap" className={cx('link')}>
                        <li className={cx('list-item')}>
                            <FaRoad />
                            <span className={cx('title')}>Roadmap</span>
                        </li>
                    </Link>
                    <Link to="blog" className={cx('link')}>
                        <li className={cx('list-item')}>
                            <FaBlogger />
                            <span className={cx('title')}>Blog</span>
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
