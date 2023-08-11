import styles from './CourseCard.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

interface CourseCardProps {
    id: string;
    title: string;
    category?: string;
    price?: string;
    href?: string;
    to?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ title, category, price, href, to, id }) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('img-wrapper')}>
                <img
                    className={cx('img')}
                    src="https://files.fullstack.edu.vn/f8-prod/courses/15/62f13d2424a47.png"
                    alt="img"
                />
            </div>
            <h3 className={cx('course-title')}>{title}</h3>
            {category && (
                <div className={cx('category-wrapper')}>
                    <span className={cx('category')}>{category}</span>
                </div>
            )}
            <div className={cx('price-wrapper')}>
                <span className={cx('price')}>{price}</span>
            </div>
        </div>
    );
};

export default CourseCard;
