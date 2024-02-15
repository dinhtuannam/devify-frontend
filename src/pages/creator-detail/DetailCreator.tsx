import classNames from 'classnames/bind';
import styles from './DetailCreator.module.scss';
import ContentWrapper from '../../components/Wrapper/ContentWrapper/ContentWrapper';
import { useQueries } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { getCreator, getCreatorCourses } from '../../services/CreatorService';
import CreatorInfo from './CreatorInfo/CreatorInfo';
import ListWrapper from '../../components/Wrapper/ListWrapper/ListWrapper';
import CourseCard from '../../components/Card/CourseCard/CourseCard';

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
                queryKey: ['detail-creator-info'],
                queryFn: () => getCreator(name),
                staleTime: 10 * 60 * 1000,
                cacheTime: 10 * 60 * 1000,
            },
            {
                queryKey: ['coureses-by-creator'],
                queryFn: () => getCreatorCourses(name),
                staleTime: 10 * 60 * 1000,
                cacheTime: 10 * 60 * 1000,
            },
        ],
    });

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
                            coursesData.data.data.datas.map((item, _) => {
                                return (
                                    <CourseCard
                                        to={`/courses/${item.code}`}
                                        itemPerRow={3}
                                        img={item.image}
                                        title={item.title}
                                        price={item.price}
                                        id={item.code}
                                        key={item.code}
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
