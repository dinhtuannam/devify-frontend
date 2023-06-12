import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './HomeSlider.module.scss';
import classNames from 'classnames/bind';
import banner_1 from '../../../assets/img/banner/banner_1.png';
import banner_2 from '../../../assets/img/banner/banner_2.png';
import banner_3 from '../../../assets/img/banner/banner_3.png';

const cx = classNames.bind(styles);
const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};
function HomeSlider() {
    return (
        <div className={cx('slider')}>
            <Slider {...settings}>
                <div className={cx('slider-item')}>
                    <div className={cx('slider-left')}>
                        <h2 className={cx('title')}>F8 trên facebook</h2>
                        <p className={cx('description')}>F8 được nhắc mọi nơi , ở đâu có cơ hội làm việc cho nghề IT</p>
                        <a className={cx('link')} href="/home">
                            Truy cập ngay
                        </a>
                    </div>
                    <img src={banner_1} alt="img" />
                </div>
                <div className={cx('slider-item')}>
                    <div className={cx('slider-left')}>
                        <h2 className={cx('title')}>F8 trên facebook</h2>
                        <p className={cx('description')}>F8 được nhắc mọi nơi , ở đâu có cơ hội làm việc cho nghề IT</p>
                        <a className={cx('link')} href="/home">
                            Truy cập ngay
                        </a>
                    </div>
                    <img src={banner_2} alt="img" />
                </div>
                <div className={cx('slider-item')}>
                    <div className={cx('slider-left')}>
                        <h2 className={cx('title')}>F8 trên facebook</h2>
                        <p className={cx('description')}>F8 được nhắc mọi nơi , ở đâu có cơ hội làm việc cho nghề IT</p>
                        <a className={cx('link')} href="/home">
                            Truy cập ngay
                        </a>
                    </div>
                    <img src={banner_3} alt="img" />
                </div>
            </Slider>
        </div>
    );
}

export default HomeSlider;
