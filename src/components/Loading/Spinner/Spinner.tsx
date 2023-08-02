import { BeatLoader } from 'react-spinners';
import styles from './Spinner.module.scss';
import classNames from 'classnames/bind';
import useTheme from '../../../hooks/useTheme';
const cx = classNames.bind(styles);
function Spinner() {
    const { theme } = useTheme();
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
