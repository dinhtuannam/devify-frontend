import classNames from 'classnames/bind';
import styles from './CreatorInfo.module.scss';
import { AiFillFacebook } from 'react-icons/ai';
import { UserItem } from '../../../types/UserType';

const cx = classNames.bind(styles);

function CreatorInfo(props: UserItem) {
    const { about, social } = props;

    return (
        <div className={cx('wrapper')}>
            <h2>Thông tin nhà sáng tạo :</h2>
            <div className={cx('content')}>
                {about !== '' && (
                    <div className={cx('about-me')}>
                        <p>{about}</p>
                    </div>
                )}
                {social !== '' && (
                    <div className={cx('url')}>
                        <AiFillFacebook className={cx('icon')} />
                        <a href={`//${social}`} target="_blank" rel="noreferrer" className={cx('link')}>
                            {social}
                        </a>
                    </div>
                )}
                {about === '' && social === '' && <div>Hiện nhà sáng tạo chưa cập nhật thông tin !</div>}
            </div>
        </div>
    );
}

export default CreatorInfo;
