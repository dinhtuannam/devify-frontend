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
                    title="Khóa học lập trình Frontend"
                    api="frontend"
                    itemQuantity={4}
                    link={'/courses?cat=frontend'}
                />
                <HomeCourse
                    title="Khóa học lập trình Mobile"
                    api="mobile"
                    itemQuantity={4}
                    link={'courses?cat=mobile'}
                />
                <HomeCourse title="Khóa học lập trình Data" api="data" itemQuantity={4} link={'courses?cat=data'} />
            </div>
        </div>
    );
}

export default HomePage;
