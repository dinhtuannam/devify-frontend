import classNames from 'classnames/bind';
import styles from './DetailCreator.module.scss';
//import banner_creator from '../../../assets/img/banner/banner_creator.png';
import ContentWrapper from '../../../components/Wrapper/ContentWrapper/ContentWrapper';
import { useQueries } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { getCreatorBySlug, getCreatorCoursesBySlug } from '../../../services/CreatorService';
import CreatorInfo from './CreatorInfo/CreatorInfo';
import ListWrapper from '../../../components/Wrapper/ListWrapper/ListWrapper';
import CourseCard from '../../../components/Card/CourseCard/CourseCard';

const cx = classNames.bind(styles);

function DetailCreator() {
    const { name } = useParams();
    const navigate = useNavigate();
    console.log(name);

    const creatorBanner = {
        backgroundImage: `url(https://fullstack.edu.vn/static/media/cover-profile.3fb9fed576da4b28386a.png)`,
    };

    const [creatorData, coursesData] = useQueries({
        queries: [
            {
                queryKey: ['detail-creator-slug'],
                queryFn: () => getCreatorBySlug(name),
                staleTime: 10 * 60 * 1000,
                cacheTime: 10 * 60 * 1000,
            },
            {
                queryKey: ['detail-creator-courses-slug'],
                queryFn: () => getCreatorCoursesBySlug(name),
                staleTime: 10 * 60 * 1000,
                cacheTime: 10 * 60 * 1000,
            },
        ],
    });
    console.log(creatorData.data, coursesData.data);
    if (creatorData.isError || coursesData.isError || creatorData.data?.data == null) {
        navigate('/not-found');
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')} style={creatorBanner}>
                <div className={cx('user')}>
                    <div className={cx('user-avatar')}>
                        <div className={cx('avatar')}>
                            <img className={cx('avatar-img')} src={creatorData.data?.data.image} alt="N a m" />
                        </div>
                    </div>
                    <div className={cx('user-name')}>
                        <span className={cx('name')}>{creatorData.data?.data.displayName}</span>
                    </div>
                </div>
            </div>
            <ContentWrapper primary borderRadius>
                {creatorData?.data?.data && <CreatorInfo {...creatorData.data.data} />}
            </ContentWrapper>
            <ContentWrapper primary borderRadius>
                <div className={cx('course-list')}>
                    <h2 style={{ marginBottom: '20px' }}>Khóa học :</h2>
                    <ListWrapper row wrap>
                        {coursesData?.data?.data &&
                            coursesData?.data?.data.map((item, _) => {
                                return (
                                    <CourseCard
                                        to={`/courses/${item.slug}`}
                                        itemPerRow={3}
                                        img={item.image}
                                        title={item.title}
                                        price={item.price}
                                        id={item.courseId}
                                        key={item.courseId}
                                    />
                                );
                            })}
                    </ListWrapper>
                </div>
            </ContentWrapper>
        </div>
    );
}

export default DetailCreator;

{
    /* <div className={cx('course-wrapper')}>
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
                    </div> */
}
