import classNames from 'classnames/bind';
import styles from './SettingCreator.module.scss';
const cx = classNames.bind(styles);

function SettingCreator() {
    return <div className={cx('wrapper')}>Setting Creator</div>;
}

export default SettingCreator;
