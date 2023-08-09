import classNames from 'classnames/bind';
import styles from './DetailCreator.module.scss';
import banner_creator from '../../../assets/img/banner/banner_creator.png';
import ContentWrapper from '../../../components/Wrapper/ContentWrapper/ContentWrapper';
const cx = classNames.bind(styles);

function DetailCreator() {
    const creatorBanner = {
        backgroundImage: `url(https://fullstack.edu.vn/static/media/cover-profile.3fb9fed576da4b28386a.png)`,
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')} style={creatorBanner}>
                <div className={cx('user')}>
                    <div className={cx('user-avatar')}>
                        <div className={cx('avatar')}>
                            <img
                                className={cx('avatar-img')}
                                src="https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg"
                                alt="N a m"
                            />
                        </div>
                    </div>
                    <div className={cx('user-name')}>
                        <span className={cx('name')}>Nam</span>
                    </div>
                </div>
            </div>
            <ContentWrapper primary borderRadius>
                <div>
                    <h2>Thông tin</h2>
                </div>
            </ContentWrapper>
            <ContentWrapper primary borderRadius>
                <div className={cx('course-list')}>
                    <h2>Khóa học :</h2>
                    <div className={cx('course-wrapper')}>
                        <div className={cx('course-item')}>
                            <div className={cx('course-img-container')}>
                                <img
                                    className={cx('course-img')}
                                    src="https://files.fullstack.edu.vn/f8-prod/courses/21/63e1bcbaed1dd.png"
                                    alt="course"
                                />
                            </div>
                            <div className={cx('course-information')}>
                                <h4 className={cx('course-title')}>Xây Dựng Website với ReactJS</h4>
                                <p className={cx('course-description')}>
                                    Khóa học ReactJS từ cơ bản tới nâng cao, kết quả của khóa học này là bạn có thể làm
                                    hầu hết các dự án thường gặp với ReactJS. Cuối khóa học này bạn sẽ sở hữu một dự án
                                    giống Tiktok.com, bạn có thể tự tin đi xin việc khi nắm chắc các kiến thức được
                                </p>
                            </div>
                        </div>
                        <div className={cx('course-item')}>
                            <div className={cx('course-img-container')}>
                                <img
                                    className={cx('course-img')}
                                    src="https://files.fullstack.edu.vn/f8-prod/courses/21/63e1bcbaed1dd.png"
                                    alt="course"
                                />
                            </div>
                            <div className={cx('course-information')}>
                                <h4 className={cx('course-title')}>Xây Dựng Website với ReactJS</h4>
                                <p className={cx('course-description')}>
                                    Khóa học ReactJS từ cơ bản tới nâng cao, kết quả của khóa học này là bạn có thể làm
                                    hầu hết các dự án thường gặp với ReactJS. Cuối khóa học này bạn sẽ sở hữu một dự án
                                    giống Tiktok.com, bạn có thể tự tin đi xin việc khi nắm chắc các kiến thức được
                                </p>
                            </div>
                        </div>
                        <div className={cx('course-item')}>
                            <div className={cx('course-img-container')}>
                                <img
                                    className={cx('course-img')}
                                    src="https://files.fullstack.edu.vn/f8-prod/courses/21/63e1bcbaed1dd.png"
                                    alt="course"
                                />
                            </div>
                            <div className={cx('course-information')}>
                                <h4 className={cx('course-title')}>Xây Dựng Website với ReactJS</h4>
                                <p className={cx('course-description')}>
                                    Khóa học ReactJS từ cơ bản tới nâng cao, kết quả của khóa học này là bạn có thể làm
                                    hầu hết các dự án thường gặp với ReactJS. Cuối khóa học này bạn sẽ sở hữu một dự án
                                    giống Tiktok.com, bạn có thể tự tin đi xin việc khi nắm chắc các kiến thức được
                                </p>
                            </div>
                        </div>
                        <div className={cx('course-item')}>
                            <div className={cx('course-img-container')}>
                                <img
                                    className={cx('course-img')}
                                    src="https://files.fullstack.edu.vn/f8-prod/courses/21/63e1bcbaed1dd.png"
                                    alt="course"
                                />
                            </div>
                            <div className={cx('course-information')}>
                                <h4 className={cx('course-title')}>Xây Dựng Website với ReactJS</h4>
                                <p className={cx('course-description')}>
                                    Khóa học ReactJS từ cơ bản tới nâng cao, kết quả của khóa học này là bạn có thể làm
                                    hầu hết các dự án thường gặp với ReactJS. Cuối khóa học này bạn sẽ sở hữu một dự án
                                    giống Tiktok.com, bạn có thể tự tin đi xin việc khi nắm chắc các kiến thức được
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    );
}

export default DetailCreator;
