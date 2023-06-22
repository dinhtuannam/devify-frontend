import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import SidebarItem from './SidebarItem/SidebarItem';
const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <ul className={cx('list-container')}>
                    <SidebarItem title="Home" route="/" />
                    <SidebarItem title="Courses" route="/courses" />
                    <SidebarItem title="Roadmap" route="/roadmap" />
                    <SidebarItem title="Blog" route="/blog" />
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
