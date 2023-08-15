import styles from './CourseCard.module.scss';
import classNames from 'classnames/bind';
import PriceFormatter from '../../../helpers/convertHelper';
const cx = classNames.bind(styles);

interface CourseCardProps {
    id: string;
    title: string;
    category?: string;
    img?: string;
    price?: number;
    href?: string;
    to?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ title, category, price, img, href, to, id }) => {
    const priceFormatter = PriceFormatter.getInstance();
    let formatPrice;
    if (price) formatPrice = priceFormatter.formatPrice(price);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('img-wrapper')}>
                <img className={cx('img')} src={img} alt="img" />
            </div>
            <h3 className={cx('course-title')}>{title}</h3>
            {category && (
                <div className={cx('category-wrapper')}>
                    <span className={cx('category')}>{category}</span>
                </div>
            )}
            <div className={cx('price-wrapper')}>
                <span className={cx('price')}>{formatPrice}</span>
            </div>
        </div>
    );
};

export default CourseCard;
