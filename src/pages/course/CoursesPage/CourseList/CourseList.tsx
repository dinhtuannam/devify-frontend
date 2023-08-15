import { useSearchParams } from 'react-router-dom';
import styles from './CourseList.module.scss';
import classNames from 'classnames/bind';
import CourseCard from '../../../../components/Card/CourseCard/CourseCard';
import ListWrapper from '../../../../components/Wrapper/ListWrapper/ListWrapper';
import { getfilterCourseService } from '../../../../services/CourseService';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../../../../components/Loading/Spinner/Spinner';
import NotFound from '../../../error/NotFound/NotFound';

const cx = classNames.bind(styles);

function CourseList() {
    const [searchParams] = useSearchParams();
    const categories = searchParams.getAll('cat');
    const languages = searchParams.getAll('lang');
    const levels = searchParams.getAll('lvl');
    const searchQuery = searchParams.get('query');
    const pageString = searchParams.get('page');
    const currentPage = pageString !== null ? parseInt(pageString, 10) : 1;

    const { data, isLoading } = useQuery(
        ['filter-course', categories, languages, levels, searchQuery, currentPage],
        async () => {
            return await getfilterCourseService({
                query: searchQuery,
                page: currentPage,
                lvl: levels,
                cat: categories,
                lang: languages,
            });
        },
        {
            staleTime: 60 * 1000,
            cacheTime: 60 * 1000,
        },
    );

    return (
        <div className={cx('wrapper')}>
            {isLoading && <Spinner />}
            {data?.data.items.length === 0 && <NotFound />}
            <ListWrapper row wrap>
                {data?.data?.items &&
                    data?.data.items.map((item, _) => {
                        return (
                            <CourseCard
                                img={item.image}
                                title={item.title}
                                price={item.price}
                                id={item.courseId}
                                key={item.courseId}
                            />
                        );
                    })}
            </ListWrapper>
            {data?.data?.items?.length !== 0 && (
                <div>
                    <ul></ul>
                </div>
            )}
        </div>
    );
}

export default CourseList;
