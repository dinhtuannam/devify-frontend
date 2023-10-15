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
                <HomeCourse
                    title="Khóa học lập trình web"
                    api="sa"
                    itemQuantity={8}
                    link={'/courses?cat=Web%20Development'}
                />
                <HomeCourse
                    title="Khóa học lập trình android"
                    api="sa"
                    itemQuantity={8}
                    link={'/courses?cat=Mobile%20Development'}
                />
            </div>
        </div>
    );
}

export default HomePage;
