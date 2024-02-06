import styles from './ChapterTrack.module.scss';
import classNames from 'classnames/bind';
import { Fragment, memo } from 'react';
import { Link } from 'react-router-dom';
import useSelectedItem from '../../../hooks/useSelectedItem';
import { CourseLearningInfo } from '../../../types/LearningType';

const cx = classNames.bind(styles);

interface IChapterTrack {
    data: CourseLearningInfo;
}

function ChapterTrack({ data }: IChapterTrack) {
    const { selectItem, handleSelectItem } = useSelectedItem();

    return (
        <div className={cx('track')}>
            <div className={cx('track-header')}>
                <h1 className={cx('track-heading')}>Nội dung khóa học</h1>
            </div>
            <div className={cx('track-body')}>
                {data.chapters.length > 0 &&
                    data.chapters.map((item, _) => {
                        return (
                            <Fragment key={item.code}>
                                <div className={cx('track-item')} onClick={() => handleSelectItem(item.code)}>
                                    <h4 className={cx('track-title')}>{item.name}</h4>
                                    <h5 className={cx('track-description')}>4 bài học</h5>
                                </div>
                                <div
                                    style={selectItem.includes(item.code) ? { display: 'block' } : { display: 'none' }}
                                >
                                    {item.lessons.map((lesson, _) => {
                                        return (
                                            <Link to={`/learning/${data.code}?id=${lesson.code}`} key={lesson.code}>
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

export default memo(ChapterTrack);
