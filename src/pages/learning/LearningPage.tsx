import { useParams } from 'react-router-dom';
import styles from './LearningPage.module.scss';
import classNames from 'classnames/bind';
import ChapterTrack from './ChapterTrack/ChapterTrack';
import LessonInfo from './LessonInfo/LessonInfo';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { useEffect } from 'react';
import { getLearningCourseThunk } from '../../redux/reducers/learning/learningCourse.slice';
import Spinner from '../../components/Loading/Spinner/Spinner';
const cx = classNames.bind(styles);

function LearningPage() {
    const { course } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const state = useSelector((state: RootState) => state.learningCourseStore);

    useEffect(() => {
        dispatch(getLearningCourseThunk(course));
    }, [course, dispatch]);

    useEffect(() => {
        if (state.result === false && state.code === 404) {
            window.location.href = '/not-found';
        }
        if (state.result === false && state.code === 403) {
            window.location.href = '/forbidden';
        }
    }, [state]);

    return (
        <div className={cx('wrapper')}>
            {state.result === true && state.data && (
                <>
                    {state.data && <LessonInfo data={state.data} />}
                    {state.data && <ChapterTrack data={state.data} />}
                </>
            )}
            {state.isLoading && <Spinner />}
        </div>
    );
}

export default LearningPage;
