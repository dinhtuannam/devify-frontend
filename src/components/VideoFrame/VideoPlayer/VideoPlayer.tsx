import styles from './VideoPlayer.module.scss';
import classNames from 'classnames/bind';
import { memo } from 'react';
const cx = classNames.bind(styles);

interface IVideoPlayerProps {
    source: string;
    title: string;
    isAllowFullScreen: boolean;
}

function VideoPlayer(props: IVideoPlayerProps) {
    const { source, title, isAllowFullScreen } = props;
    console.log(source);

    return (
        <div className={cx('video-wrapper')}>
            <iframe className={cx('video')} src={source} allowFullScreen={isAllowFullScreen} title={title}></iframe>
        </div>
    );
}

export default memo(VideoPlayer);
