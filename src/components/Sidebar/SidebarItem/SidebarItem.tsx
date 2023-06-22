import { AiFillHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './SidebarItem.module.scss';
const cx = classNames.bind(styles);

type SidebarItemProps = {
    title: string;
    route: string;
};

const SidebarItem: React.FC<SidebarItemProps> = ({ title, route }) => {
    return (
        <Link to={route} className={cx('link')}>
            <li className={cx('list-item')}>
                <AiFillHome className={cx('icon')} />
                <span className={cx('title')}>{title}</span>
            </li>
        </Link>
    );
};

export default SidebarItem;
