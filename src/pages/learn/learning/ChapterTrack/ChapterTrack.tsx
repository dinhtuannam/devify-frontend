import styles from './ChapterTrack.module.scss';
import classNames from 'classnames/bind';
import { Fragment } from 'react';
import { LearningCourseType } from '../../../../types/CourseType';
import { Link, useParams } from 'react-router-dom';
import useSelectedItem from '../../../../hooks/useSelectedItem';
const cx = classNames.bind(styles);

interface IChapterTrack {
    data: LearningCourseType | undefined;
}

function ChapterTrack(props: IChapterTrack) {
    const { data } = props;
    const { courseSlugParam } = useParams();
    const { selectItem, handleSelectItem } = useSelectedItem();
    // const location = useLocation();
    // const queryParams = new URLSearchParams(location.search);
    // const lessonId = queryParams.get('id');

    return (
        <div className={cx('track')}>
            <div className={cx('track-header')}>
                <h1 className={cx('track-heading')}>Nội dung khóa học</h1>
            </div>
            <div className={cx('track-body')}>
                {data?.chapters.map((item, _) => {
                    return (
                        <Fragment key={item.chapterId}>
                            <div className={cx('track-item')} onClick={() => handleSelectItem(item.chapterId)}>
                                <h4 className={cx('track-title')}>{item.name}</h4>
                                <h5 className={cx('track-description')}>4 bài học</h5>
                            </div>
                            <div
                                style={selectItem.includes(item.chapterId) ? { display: 'block' } : { display: 'none' }}
                            >
                                {item.lessons.map((lesson, _) => {
                                    return (
                                        <Link
                                            to={`/learning/${courseSlugParam}?id=${lesson.lessonId}`}
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
}

export default ChapterTrack;
