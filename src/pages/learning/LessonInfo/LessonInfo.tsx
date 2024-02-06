import VideoPlayer from '../../../components/VideoFrame/VideoPlayer/VideoPlayer';
import styles from './LessonInfo.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CourseLearningInfo } from '../../../types/LearningType';
import { DetailLesson } from '../../../types/LessonType';
const cx = classNames.bind(styles);

interface ILessonInfo {
    data: CourseLearningInfo;
}

function LessonInfo({ data }: ILessonInfo) {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id: string | null = queryParams.get('id');
    const [lesson, setLesson] = useState<DetailLesson | null>(null);

    useEffect(() => {
        if (data!.chapters?.length > 0 && data!.chapters[0].lessons.length > 0) {
            if (id === null || id === undefined) {
                setLesson(data!.chapters[0].lessons[0]);
            } else {
                for (const chapter of data.chapters) {
                    const lessons = chapter.lessons || [];
                    const lesson = lessons.find((l) => l.code === id);
                    if (lesson) {
                        setLesson(lesson);
                        break;
                    }
                }
            }
        }
    }, [id, data]);

    return (
        <div className={cx('content')}>
            {lesson ? (
                <>
                    <VideoPlayer source={lesson.video} title="video" isAllowFullScreen={true} />
                    <div className={cx('information')}>
                        <h1 className={cx('title')}>{lesson.name}</h1>
                        <p className={cx('date')}>Cập nhật tháng 11 năm 2022</p>
                        <p className={cx('description')}>{lesson.des}</p>
                    </div>
                </>
            ) : (
                <div>
                    <div className="bg-black">
                        <img src={data.image} alt="data img" className="mx-auto w-[86%]" />
                    </div>
                    <div className={cx('information')}>
                        <h1 className={cx('title')}>{data.title}</h1>
                        <p className={cx('date')}>{data.updateTime}</p>
                        <p className={cx('description')}>{data.des}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LessonInfo;
