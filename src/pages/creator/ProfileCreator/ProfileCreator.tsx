import classNames from 'classnames/bind';
import styles from './ProfileCreator.module.scss';
const cx = classNames.bind(styles);

function ProfileCreator() {
    return <div className={cx('wrapper')}>Profile creator</div>;
}

export default ProfileCreator;
