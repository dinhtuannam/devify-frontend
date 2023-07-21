import classNames from 'classnames/bind';
import styles from './LoginCreator.module.scss';
const cx = classNames.bind(styles);

function LoginCreator() {
    return <div className={cx('wrapper')}>login creator</div>;
}

export default LoginCreator;
