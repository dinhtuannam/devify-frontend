import React, { useState, Fragment } from 'react';
import classNames from 'classnames/bind';
import styles from './HomeCourse.module.scss';
const cx = classNames.bind(styles);
type HomeCourseProps = {
    title: string;
    api: string;
    itemQuantity: number;
};

const HomeCourse: React.FC<HomeCourseProps> = ({ title, api, itemQuantity }) => {
    const array: number[] = Array(itemQuantity).fill(1);

    const [data, setData] = useState(array);

    return (
        <Fragment>
            <div className={cx('vertical')}>
                <div>
                    <div className={cx('heading-wrap')}>
                        <h2 className={cx('heading')}>{title}</h2>
                        <h2 className={cx('more')}>Xem thêm</h2>
                    </div>
                </div>
                <div className={cx('body')}>
                    {data.map((value, index) => {
                        return (
                            <div className={cx('list-wrap')} key={index}>
                                <div className={cx('list-item')}>
                                    <div className={cx('list-container')}>
                                        <a className={cx('link')}>
                                            <div style={{ position: 'relative' }}>
                                                <img
                                                    className={cx('img')}
                                                    src="https://files.fullstack.edu.vn/f8-prod/courses/15/62f13d2424a47.png"
                                                    alt="img"
                                                />
                                                <div className={cx('img-hover')}></div>
                                            </div>
                                        </a>
                                        <h3 className={cx('course-title')}>HTML CSS PRO</h3>
                                        <div className={cx('price-wrapper')}>
                                            <span className={cx('price')}>1.299.000đ</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Fragment>
    );
};

export default HomeCourse;
