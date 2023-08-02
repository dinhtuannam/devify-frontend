import { useEffect, useState, memo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './LearningPage.module.scss';
import classNames from 'classnames/bind';
import { ApiResponse } from '../../../types/ApiType';
import { LearningCourseType } from '../../../types/CourseType';
import { getLearningCourseService } from '../../../services/CourseService';
import Spinner from '../../../components/Loading/Spinner/Spinner';
import VideoPlayer from '../../../components/VideoFrame/VideoPlayer/VideoPlayer';
import ChapterTrack from './ChapterTrack/ChapterTrack';
const cx = classNames.bind(styles);

function LearningPage() {
    const [data, setData] = useState<LearningCourseType>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { courseSlugParam } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Fetching Learning Course Api');
        const getLearningCourseApi = async () => {
            const res: ApiResponse<LearningCourseType> = await getLearningCourseService(courseSlugParam);
            if (res?.success === true) {
                setData(res.data);
                navigate(`/learning/${courseSlugParam}?id=${res.data.chapters[0].lessons[0].lessonId}`);
            }
            if (res?.errCode === '404' || res?.success === false || res === null) navigate('/not-found');
            setIsLoading(false);
        };
        getLearningCourseApi();
    }, [courseSlugParam, navigate]);

    const RenderContent = () => {
        return (
            <>
                <div className={cx('content')}>
                    <VideoPlayer
                        source="https://www.youtube.com/embed/0bmMER_zcRI"
                        title="video"
                        isAllowFullScreen={true}
                    />
                    <div className={cx('information')}>
                        <h1 className={cx('title')}>ReactJS là gì? Tại sao nên học ReactJS?</h1>
                        <p className={cx('date')}>Cập nhật tháng 11 năm 2022</p>
                        <p className={cx('description')}>
                            Tham gia các cộng đồng để cùng học hỏi, chia sẻ và "thám thính" xem F8 sắp có gì mới nhé!
                        </p>
                    </div>
                </div>
                <ChapterTrack data={data} />
            </>
        );
    };

    return <div className={cx('wrapper')}>{isLoading ? <Spinner /> : RenderContent()}</div>;
}

export default memo(LearningPage);
