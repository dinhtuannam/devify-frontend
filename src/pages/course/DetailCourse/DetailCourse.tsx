import styles from './DetailCourse.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect, Fragment, memo } from 'react';
import { useParams } from 'react-router-dom';
import notfound from '../../../assets/img/notfound.png';
import Spinner from '../../../components/Loading/Spinner/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { getCourseBySlug } from '../../../redux/reducers/course/detailCourse.slice';
import { AppDispatch } from '../../../redux/store';

const cx = classNames.bind(styles);

function DetailCourse() {
    const stateData = useSelector((state: RootState) => state.detailCourseStore);
    const dispatch = useDispatch<AppDispatch>();
    const [show, setShow] = useState<number[]>([]);
    const { name } = useParams();

    useEffect(() => {
        dispatch(getCourseBySlug(name));
    }, [name, dispatch]);

    const handleShow = (index: number) => {
        if (show.includes(index)) {
            const updatedNumbers = show.filter((num) => num !== index);
            setShow(updatedNumbers);
        } else setShow((prevNumbers) => [...prevNumbers, index]);
    };

    console.log('redner');

    const renderContent = () => {
        return (
            <Fragment>
                {stateData.data && stateData.isSuccess ? (
                    <div className={cx('wrapper')}>
                        <div className={cx('content')}>
                            <h1 className={cx('course-title')}>{stateData.data.title}</h1>
                            <p className={cx('course-description')}>{stateData.data.description}</p>
                            <div className={cx('lang-wrapper')}>
                                <span className={cx('course-lang')}>Ngôn ngữ :</span>
                                {stateData.data.courseLanguages.map((value, index) => {
                                    return (
                                        <span className={cx('course-lang-item')} key={index}>
                                            Ngôn ngữ {value.name}
                                        </span>
                                    );
                                })}
                            </div>
                            <div className={cx('cat-wrapper')}>
                                <span className={cx('course-cat')}>Thể loại :</span>
                                {stateData.data.category?.categoryName}
                            </div>
                            <h3 style={{ fontSize: '20px', color: 'var(--text-color)' }}>Nội dung khóa học</h3>
                            <div className={cx('chapter-list-wrapper')}>
                                {stateData.data.chapters.map((value, index) => {
                                    return (
                                        <div className={cx('chapter-container')} key={index}>
                                            <div className={cx('chapter-item')} onClick={() => handleShow(index)}>
                                                <span>{value.name}</span>
                                            </div>
                                            <div
                                                style={
                                                    show.includes(index) ? { display: 'block' } : { display: 'none' }
                                                }
                                            >
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
                                <span>{stateData.data.price}</span>
                            </div>
                            <div className={cx('purchased-box')}>
                                <span style={{ marginRight: '6px' }}>{stateData.data.purchased}</span>
                                <span>thành viên đã tham gia khóa học</span>
                            </div>
                            <button className={cx('buy-btn')}>Mua ngay</button>
                        </div>
                    </div>
                ) : (
                    <div style={{ margin: '0 auto', width: 'fit-content' }}>
                        <img src={notfound} alt="notfound" style={{ width: '500px', height: '500px' }} />
                    </div>
                )}
            </Fragment>
        );
    };

    return <Fragment>{stateData.isLoading ? <Spinner /> : renderContent()}</Fragment>;
}

export default memo(DetailCourse);
