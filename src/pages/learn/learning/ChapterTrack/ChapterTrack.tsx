import styles from './ChapterTrack.module.scss';
import classNames from 'classnames/bind';
import { Fragment, memo } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useSelectedItem from '../../../../hooks/useSelectedItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../../redux/store';
import { useEffect } from 'react';
import { getLearningCourseThunk } from '../../../../redux/reducers/learning/learningCourse.slice';

const cx = classNames.bind(styles);

interface IChapterTrack {
    lessonId: string | null;
    courseSlug: string | undefined;
}

function ChapterTrack({ lessonId, courseSlug }: IChapterTrack) {
    const courseState = useSelector((state: RootState) => state.learningCourseStore);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { selectItem, handleSelectItem } = useSelectedItem();

    useEffect(() => {
        dispatch(getLearningCourseThunk(courseSlug));
    }, []);

    useEffect(() => {
        if (courseState.data && !lessonId) {
            navigate(`/learning/${courseSlug}?id=${courseState.data.chapters[0].lessons[0].lessonId}`);
        }
    }, [courseState, navigate, courseSlug]);

    console.log(courseState);

    const content = () => {
        return (
            <div className={cx('track')}>
                <div className={cx('track-header')}>
                    <h1 className={cx('track-heading')}>Nội dung khóa học</h1>
                </div>
                <div className={cx('track-body')}>
                    {courseState?.data?.chapters?.map((item, _) => {
                        return (
                            <Fragment key={item.chapterId}>
                                <div className={cx('track-item')} onClick={() => handleSelectItem(item.chapterId)}>
                                    <h4 className={cx('track-title')}>{item.name}</h4>
                                    <h5 className={cx('track-description')}>4 bài học</h5>
                                </div>
                                <div
                                    style={
                                        selectItem.includes(item.chapterId) ? { display: 'block' } : { display: 'none' }
                                    }
                                >
                                    {item.lessons.map((lesson, _) => {
                                        return (
                                            <Link
                                                to={`/learning/${courseSlug}?id=${lesson.lessonId}`}
                                                key={lesson.lessonId}
                                            >
                                                <div className={cx('track-sub-item')}>
                                                    <h3 className={cx('sub-item-title')}>{lesson.name}</h3>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </Fragment>
                        );
                    })}
                </div>
            </div>
        );
    };

    return <>{courseState.isSuccess ? content() : navigate('/')}</>;
}

export default memo(ChapterTrack);
