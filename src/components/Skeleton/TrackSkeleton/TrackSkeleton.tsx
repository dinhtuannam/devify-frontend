import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styles from './TrackSkeleton.module.scss';
import classNames from 'classnames/bind';
import 'react-loading-skeleton/dist/skeleton.css';
import useTheme from '../../../hooks/useTheme';
const cx = classNames.bind(styles);

function TrackSkeleton({ count }: { count: number }) {
    const { theme } = useTheme();
    const baseColor = theme === 'Light' ? '#d0cdcd' : '#585858';
    const highlightColor = theme === 'Light' ? '#9c9a9a' : '#444';

    return (
        <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
            <div>
                <Skeleton count={count} className={cx('skeleton')} />
            </div>
        </SkeletonTheme>
    );
}

export default TrackSkeleton;
