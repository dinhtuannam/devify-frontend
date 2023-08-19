import { DetailCreatorPublicDTO } from '../../../../types/CreatorType';
import classNames from 'classnames/bind';
import styles from './CreatorInfo.module.scss';
import { AiFillFacebook, AiFillLinkedin } from 'react-icons/ai';

const cx = classNames.bind(styles);

function CreatorInfo(props: Omit<DetailCreatorPublicDTO, 'slug | image'>) {
    const { creatorId, aboutMe, facebookUrl, linkedInUrl, displayName } = props;

    return (
        <div className={cx('wrapper')}>
            <h2>Thông tin nhà sáng tạo :</h2>
            <div className={cx('content')}>
                {aboutMe && (
                    <div className={cx('about-me')}>
                        <p>{aboutMe}</p>
                    </div>
                )}
                {facebookUrl && (
                    <div className={cx('url')}>
                        <AiFillFacebook className={cx('icon')} />
                        <a href={`//${facebookUrl}`} target="_blank" className={cx('link')}>
                            {facebookUrl}
                        </a>
                    </div>
                )}
                {linkedInUrl && (
                    <div className={cx('url')}>
                        <AiFillLinkedin className={cx('icon')} />
                        <a href={`//${linkedInUrl}`} target="_blank" className={cx('link')}>
                            {linkedInUrl}
                        </a>
                    </div>
                )}
                {!aboutMe && !facebookUrl && !linkedInUrl && <div>Hiện nhà sáng tạo chưa cập nhật thông tin !</div>}
            </div>
        </div>
    );
}

export default CreatorInfo;
