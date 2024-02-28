import styles from './DetailCourse.module.scss';
import classNames from 'classnames/bind';
import { useEffect, Fragment, memo } from 'react';
import { Link, useParams } from 'react-router-dom';
import notfound from '../../assets/img/notfound.png';
import Spinner from '../../components/Loading/Spinner/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { getCourseBySlug } from '../../redux/reducers/course/detailCourse.slice';
import { AppDispatch } from '../../redux/store';
import useSelectedItem from '../../hooks/useSelectedItem';
import DefaultButton from '../../components/Button/DefaultButton/DefaultButton';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import useCheckLogin from '../../hooks/useCheckLogin';
import 'react-toastify/dist/ReactToastify.css';
import { addItemToCart } from '../../services/CartService';

const cx = classNames.bind(styles);

function DetailCourse() {
    const stateData = useSelector((state: RootState) => state.detailCourseStore);
    const dispatch = useDispatch<AppDispatch>();
    const { selectItem, handleSelectItem } = useSelectedItem();
    const { name } = useParams();
    const isLoginCheck = useCheckLogin();

    useEffect(() => {
        dispatch(getCourseBySlug(name));
    }, [name, dispatch]);

    const showToast = (message: string, result: boolean) => {
        if (result) {
            toast.success(message, {
                position: 'bottom-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.error(message, {
                position: 'bottom-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const handleAddCart = async (course: string) => {
        try {
            if (isLoginCheck) {
                const res = await addItemToCart(course);
                showToast(res.message, res.result);
            } else {
                window.location.href = '/login';
            }
        } catch (e) {
            showToast('Đã có lỗi xảy ra vui lòng thử lại', false);
        }
    };

    const renderContent = () => {
        return (
            <Fragment>
                <ToastContainer />
                {stateData.data && stateData.isSuccess ? (
                    <div className={cx('wrapper')}>
                        <div className={cx('content')}>
                            <h1 className={cx('course-title')}>{stateData.data.title}</h1>
                            <Link
                                to={`/creator/${stateData.data.creator.code}`}
                                className="dark:text-white underline text-3xl font-semibold hover:text-blue-600 transition"
                            >
                                {stateData.data.creator.username}
                            </Link>
                            <p className={cx('course-description')}>{stateData.data.des}</p>

                            <div className={cx('cat-wrapper')}>
                                <span className={cx('course-cat')}>Thể loại :</span>
                                {stateData.data.category?.name}
                            </div>
                            <div className={cx('lang-wrapper')}>
                                <span className={cx('course-lang')}>Ngôn ngữ :</span>
                                {stateData.data.languages.map((value, index) => {
                                    return (
                                        <>
                                            <br></br>
                                            <span className={cx('course-lang-item')} key={index}>
                                                - {value.name}
                                            </span>
                                        </>
                                    );
                                })}
                            </div>
                            <div className={cx('lang-wrapper')}>
                                <span className={cx('course-lang')}>Trình độ :</span>
                                {stateData.data.level.map((value, index) => {
                                    return (
                                        <>
                                            <br></br>
                                            <span className={cx('course-lang-item')} key={index}>
                                                - {value.name}
                                            </span>
                                        </>
                                    );
                                })}
                            </div>
                            <h3 style={{ fontSize: '20px', color: 'var(--text-color)' }}>Nội dung khóa học</h3>
                            <div className={cx('chapter-list-wrapper')}>
                                {stateData.data.chapters.map((value, index) => {
                                    return (
                                        <div className={cx('chapter-container')} key={index}>
                                            <div
                                                className={cx('chapter-item')}
                                                onClick={() => handleSelectItem(value.code)}
                                            >
                                                <span>{value.name}</span>
                                            </div>
                                            <div
                                                style={
                                                    selectItem.includes(value.code)
                                                        ? { display: 'block' }
                                                        : { display: 'none' }
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
                            <div style={{ width: '100%' }}>
                                <img src={stateData.data.image} alt="img" className={cx('course-img')} />
                            </div>
                            <div className={cx('price-box')}>
                                <span style={{ marginRight: '6px' }}>Giá tiền : </span>
                                <span>
                                    {stateData.data.issale
                                        ? stateData.data.salePrice.toLocaleString('en-US')
                                        : stateData.data.price.toLocaleString('en-US')}
                                    đ
                                </span>
                            </div>
                            <div className={cx('purchased-box')}>
                                <span style={{ marginRight: '6px' }}>{stateData.data.purchases}</span>
                                <span>thành viên đã tham gia khóa học</span>
                            </div>
                            {stateData.data.owner === false ? (
                                <DefaultButton primary large onClick={() => handleAddCart(stateData.data!.code)}>
                                    Thêm vào giỏ hàng
                                </DefaultButton>
                            ) : (
                                <DefaultButton primary large href={`/learning/${stateData.data.code}`}>
                                    Xem ngay
                                </DefaultButton>
                            )}
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
