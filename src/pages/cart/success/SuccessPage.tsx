import styles from './SuccessPage.module.scss';
import classNames from 'classnames/bind';
import congrats from '../../../assets/img/congrats.png';
import LayoutWrapper from '../../../components/Wrapper/LayoutWrapper/LayoutWrapper';
const cx = classNames.bind(styles);

function SuccessPage() {
    return (
        <LayoutWrapper center>
            <img src={congrats} alt="congrats" className={cx('img')} />
        </LayoutWrapper>
    );
}

export default SuccessPage;
