import { useParams } from 'react-router-dom';
import styles from './LearningPage.module.scss';
import classNames from 'classnames/bind';
import ChapterTrack from './ChapterTrack/ChapterTrack';
import LessonInfo from './LessonInfo/LessonInfo';
import { useLocation } from 'react-router-dom';
const cx = classNames.bind(styles);

function LearningPage() {
    const { courseSlugParam } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const lessonId: string | null = queryParams.get('id');

    return (
        <div className={cx('wrapper')}>
            <>
                {lessonId && courseSlugParam && <LessonInfo courseSlug={courseSlugParam} lessonId={lessonId} />}
                {courseSlugParam && <ChapterTrack courseSlug={courseSlugParam} lessonId={lessonId} />}
            </>
        </div>
    );
}

export default LearningPage;
