import styles from './CourseCard.module.scss';
import classNames from 'classnames/bind';
import PriceFormatter from '../../../helpers/convertHelper';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

interface CourseCardProps {
    id: string;
    title: string;
    category?: string;
    itemPerRow: number;
    isSale: boolean;
    salePrice: number;
    img?: string;
    price?: number;
    href?: string;
    to?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
    title,
    category,
    price,
    img,
    itemPerRow,
    href,
    to,
    id,
    isSale,
    salePrice,
}) => {
    const priceFormatter = PriceFormatter.getInstance();
    const widthItem = Math.round(100 / itemPerRow) + '%';
    let Comp: any = 'div';
    if (to) {
        Comp = Link;
    } else if (href) {
        Comp = 'a';
    }
    const WrapProps = {
        href,
        to,
    };
    return (
        <Comp className={cx('wrapper')} style={{ width: widthItem }} {...WrapProps}>
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
                {isSale ? (
                    <p>
                        <span className={cx('sale-price')}>{price!.toLocaleString('en-US')}đ</span>
                        <span className={cx('price')}>{salePrice.toLocaleString('en-US')}đ</span>
                    </p>
                ) : (
                    <span className={cx('price')}>{price!.toLocaleString('en-US')}đ</span>
                )}
            </div>
        </Comp>
    );
};

export default CourseCard;
