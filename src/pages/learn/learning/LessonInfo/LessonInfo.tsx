import VideoPlayer from '../../../../components/VideoFrame/VideoPlayer/VideoPlayer';
import Spinner from '../../../../components/Loading/Spinner/Spinner';
import styles from './LessonInfo.module.scss';
import classNames from 'classnames/bind';
import { useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../../../../redux/store';
import { getLearningLessonThunk } from '../../../../redux/reducers/learning/learningLesson.slice';
const cx = classNames.bind(styles);

interface ILessonInfo {
    lessonId: string | null;
    courseSlug: string | undefined;
}

function LessonInfo({ lessonId, courseSlug }: ILessonInfo) {
    const lessonState = useSelector((state: RootState) => state.learningLessonReducer);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        if (courseSlug && lessonId) {
            dispatch(getLearningLessonThunk({ slug: courseSlug, lessonId: lessonId }));
        }
    }, [courseSlug, lessonId, dispatch]);

    const content = () => {
        return (
            <>
                {lessonState.data ? (
                    <div className={cx('content')}>
                        <VideoPlayer source={lessonState.data.video} title="video" isAllowFullScreen={true} />
                        <div className={cx('information')}>
                            <h1 className={cx('title')}>{lessonState.data.name}</h1>
                            <p className={cx('date')}>Cập nhật tháng 11 năm 2022</p>
                            <p className={cx('description')}>{lessonState.data.description}</p>
                        </div>
                    </div>
                ) : (
                    navigate('/not-found')
                )}
            </>
        );
    };

    return <>{lessonState.isLoading ? <Spinner /> : content()}</>;
}

export default memo(LessonInfo);
