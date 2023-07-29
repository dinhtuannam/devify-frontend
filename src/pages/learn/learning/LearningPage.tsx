import { Fragment, useEffect, useState, memo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styles from './LearningPage.module.scss';
import classNames from 'classnames/bind';
import chapter from './chapter.json';
const cx = classNames.bind(styles);

function LearningPage() {
    const [data, setData] = useState(chapter.chapters);
    const [selectItem, setSelectItem] = useState<string[]>([]);
    const { courseSlugParam } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const lessonId = queryParams.get('id');
    console.log(data);

    useEffect(() => {
        console.log(courseSlugParam, lessonId);
    }, []);

    const handleSelectItem = (index: string) => {
        if (selectItem.includes(index)) {
            const updatedNumbers = selectItem.filter((num) => num !== index);
            setSelectItem(updatedNumbers);
        } else setSelectItem((prevNumbers) => [...prevNumbers, index]);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('video-wrapper')}>
                    <iframe
                        className={cx('video')}
                        src="https://www.youtube.com/embed/0bmMER_zcRI"
                        allowFullScreen
                        title="video"
                    ></iframe>
                </div>
                <div className={cx('information')}>
                    <h1 className={cx('title')}>ReactJS là gì? Tại sao nên học ReactJS?</h1>
                    <p className={cx('date')}>Cập nhật tháng 11 năm 2022</p>
                    <p className={cx('description')}>
                        Tham gia các cộng đồng để cùng học hỏi, chia sẻ và "thám thính" xem F8 sắp có gì mới nhé!
                    </p>
                </div>
            </div>
            <div className={cx('track')}>
                <div className={cx('track-header')}>
                    <h1 className={cx('track-heading')}>Nội dung khóa học</h1>
                </div>
                <div className={cx('track-body')}>
                    {data.map((item, value) => {
                        return (
                            <Fragment>
                                <div className={cx('track-item')} onClick={() => handleSelectItem(item.chapterId)}>
                                    <h4 className={cx('track-title')}>{item.name}</h4>
                                    <h5 className={cx('track-description')}>4 bài học</h5>
                                </div>
                                <div
                                    style={
                                        selectItem.includes(item.chapterId) ? { display: 'block' } : { display: 'none' }
                                    }
                                >
                                    {item.lessons.map((lesson, index) => {
                                        return (
                                            <div className={cx('track-sub-item')}>
                                                <h3 className={cx('sub-item-title')}>{lesson.name}</h3>
                                            </div>
                                        );
                                    })}
                                </div>
                            </Fragment>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default memo(LearningPage);
