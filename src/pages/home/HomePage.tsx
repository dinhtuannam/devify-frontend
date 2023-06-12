import styles from './HomePage.module.scss';
import classNames from 'classnames/bind';
import HomeSlider from '../../components/Slider/HomeSlider/HomeSlider';
import HomeCourse from '../../components/List/HomeCourse/HomeCourse';
const cx = classNames.bind(styles);
function HomePage() {
    return (
        <div className={cx('container')}>
            <HomeSlider />
            <div className={cx('wrapper')}>
                <HomeCourse title="Khóa học Pro" api="sa" itemQuantity={4} />
                <HomeCourse title="Khóa học miễn phí" api="sa" itemQuantity={10} />
            </div>
        </div>
    );
}

export default HomePage;
