import styles from './LearningNavbar.module.scss';
import classNames from 'classnames/bind';
import logo from '../../../assets/img/logo.png';
import { Link } from 'react-router-dom';
import { GiOpenBook } from 'react-icons/gi';
import { AiOutlineDoubleLeft as BackIcon } from 'react-icons/ai';
import useTheme from '../../../hooks/useTheme';
import { BsFillSunFill as LightIcon, BsFillMoonStarsFill as DarkIcon } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
const cx = classNames.bind(styles);

function LearningNavbar() {
    const { theme, switchTheme } = useTheme();
    const courseState = useSelector((state: RootState) => state.learningCourseStore);

    return (
        <div className={cx('wrapper')}>
            <Link to={'/'} className={cx('back-container')}>
                <BackIcon className={cx('back-icon')} />
            </Link>
            <div className={cx('logo-container')}>
                <img src={logo} className={cx('logo')} alt="img" />
            </div>
            <div className={cx('title')}>{courseState.data?.title}</div>
            <div className={cx('action')}>
                <div className={cx('action-item')}>
                    <GiOpenBook className={cx('lesson')} />
                    <span className={cx('action-title')}>{courseState.data?.totalLesson} bài học</span>
                </div>
                <div className={cx('action-item')} onClick={switchTheme}>
                    {theme === 'Light' ? (
                        <LightIcon className={cx('theme-icon')} />
                    ) : (
                        <DarkIcon className={cx('theme-icon')} />
                    )}
                    <span className={cx('action-title')}>{theme}</span>
                </div>
            </div>
        </div>
    );
}

export default LearningNavbar;
