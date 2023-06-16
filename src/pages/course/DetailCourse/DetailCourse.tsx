import styles from './DetailCourse.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect, Fragment } from 'react';
import { DetailCourseResponse } from '../../../types/CourseType';
import { getDetailCourse } from '../../../services/CourseService';
import { useParams } from 'react-router-dom';
const cx = classNames.bind(styles);

function DetailCourse() {
    const [course, setCourse] = useState<DetailCourseResponse>();
    const [show, setShow] = useState<number[]>([]);
    const { name } = useParams();
    useEffect(() => {
        const fetchAPI = async () => {
            const res = await getDetailCourse(name);
            if (res != null) setCourse(res);
        };
        fetchAPI();
    }, [name]);
    const handleShow = (index: number) => {
        if (show.includes(index)) {
            const updatedNumbers = show.filter((num) => num !== index);
            setShow(updatedNumbers);
        } else setShow((prevNumbers) => [...prevNumbers, index]);
    };
    console.log(show);

    return (
        <Fragment>
            {course ? (
                <div className={cx('wrapper')}>
                    <div className={cx('content')}>
                        <h1 className={cx('course-title')}>{course.data.title}</h1>
                        <p className={cx('course-description')}>{course.data.description}</p>
                        <div className={cx('lang-wrapper')}>
                            <span className={cx('course-lang')}>Ngôn ngữ :</span>
                            {course.data.languages.map((value, index) => {
                                return (
                                    <span className={cx('course-lang-item')} key={index}>
                                        Ngôn ngữ {value.name}
                                    </span>
                                );
                            })}
                        </div>
                        <div className={cx('cat-wrapper')}>
                            <span className={cx('course-cat')}>Thể loại :</span>
                            {course.data.categories.map((value, index) => {
                                return (
                                    <span className={cx('course-cat-item')} key={index}>
                                        {value.categoryName}
                                    </span>
                                );
                            })}
                        </div>
                        <h3 style={{ fontSize: '20px' }}>Nội dung khóa học</h3>
                        <div className={cx('chapter-list-wrapper')}>
                            {course.data.chapters.map((value, index) => {
                                return (
                                    <div className={cx('chapter-container')} key={index}>
                                        <div className={cx('chapter-item')} onClick={() => handleShow(index)}>
                                            <span>{value.name}</span>
                                        </div>
                                        <div style={show.includes(index) ? { display: 'block' } : { display: 'none' }}>
                                            {value.lessons.map((value, index) => {
                                                return (
                                                    <div className={cx('lesson-item')} key={index}>
                                                        <span>{value.name}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className={cx('action')}>
                        <div>
                            <img
                                src="https://files.fullstack.edu.vn/f8-prod/courses/21/63e1bcbaed1dd.png"
                                alt="img"
                                className={cx('course-img')}
                            />
                        </div>
                        <div className={cx('price-box')}>
                            <span style={{ marginRight: '6px' }}>Giá tiền : </span>
                            <span>{course.data.price}</span>
                        </div>
                        <div className={cx('purchased-box')}>
                            <span style={{ marginRight: '6px' }}>{course.data.purchased}</span>
                            <span>thành viên đã tham gia khóa học</span>
                        </div>
                        <button className={cx('buy-btn')}>Mua ngay</button>
                    </div>
                </div>
            ) : (
                <div>not found</div>
            )}
        </Fragment>
    );
}

export default DetailCourse;
