import { BeatLoader } from 'react-spinners';
import styles from './Spinner.module.scss';
import classNames from 'classnames/bind';
import useLocalStorage from 'use-local-storage';
const cx = classNames.bind(styles);
function Spinner() {
    const [theme] = useLocalStorage<string>('devify theme', 'Light');
    return (
        <div className={cx('wrapper')}>
            <div>
                <BeatLoader size={50} className={'spinner'} color={theme === 'Light' ? '#000' : '#fff'} />
                <h1 className={cx('heading')}>Loading</h1>
            </div>
        </div>
    );
}

export default Spinner;
