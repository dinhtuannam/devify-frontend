import React, { useState, Fragment, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './HomeCourse.module.scss';
import { Link } from 'react-router-dom';
import { FilterCourse, getfilterCourseService } from '../../../services/CourseService';
import { CourseItem } from '../../../types/CourseType';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const cx = classNames.bind(styles);
type HomeCourseProps = {
    title: string;
    api: string;
    itemQuantity: number;
    link?: string | null;
};

const HomeCourse: React.FC<HomeCourseProps> = ({ title, api, itemQuantity, link }) => {
    const [data, setData] = useState<CourseItem[]>([]);
    const array: number[] = Array(4).fill(1);
    const [loading, setLoading] = useState<boolean>(false);
    const param: FilterCourse = {
        query: null,
        page: 1,
        cat: [api],
        lang: [],
        lvl: [],
    };

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            try {
                const res = await getfilterCourseService(param);
                setData(res!.data.datas!);
                setLoading(false);
            } catch (e) {
                setLoading(false);
            }
        };
        fetchApi();
    }, []);

    return (
        <Fragment>
            <div className={cx('vertical')}>
                <div>
                    <div className={cx('heading-wrap')}>
                        <h2 className={cx('heading')}>{title}</h2>
                        {link && (
                            <Link to={link} className={cx('more')}>
                                Xem thêm
                            </Link>
                        )}
                    </div>
                </div>
                <div className={cx('body')}>
                    {data.slice(0, 4).map((value, index) => {
                        return (
                            <Link to={`courses/${value.code}`} className={cx('list-wrap')} key={index}>
                                <div className={cx('list-item')}>
                                    <div className={cx('list-container')}>
                                        <a className={cx('link')} href="/">
                                            <div style={{ position: 'relative' }}>
                                                <img className={cx('img')} src={value.image} alt="img" />
                                                <div className={cx('img-hover')}></div>
                                            </div>
                                        </a>
                                        <h3 className={cx('course-title')}>{value.title}</h3>
                                        <div className={cx('price-wrapper')}>
                                            {value.issale ? (
                                                <p>
                                                    <span className={cx('sale-price')}>
                                                        {value.price!.toLocaleString('en-US')}đ
                                                    </span>
                                                    <span className={cx('price')}>
                                                        {value.salePrice.toLocaleString('en-US')}đ
                                                    </span>
                                                </p>
                                            ) : (
                                                <span className={cx('price')}>
                                                    {value.price!.toLocaleString('en-US')}đ
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                    {loading &&
                        array.map((item, index) => {
                            return (
                                <div className="h-[190px] w-[25%] px-4">
                                    <Skeleton className="w-full h-full " baseColor="#ccc" />
                                </div>
                            );
                        })}
                </div>
            </div>
        </Fragment>
    );
};

export default HomeCourse;
