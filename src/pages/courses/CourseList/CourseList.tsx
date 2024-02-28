import { useSearchParams, useNavigate } from 'react-router-dom';
import styles from './CourseList.module.scss';
import classNames from 'classnames/bind';
import CourseCard from '../../../components/Card/CourseCard/CourseCard';
import ListWrapper from '../../../components/Wrapper/ListWrapper/ListWrapper';
import { getfilterCourseService } from '../../../services/CourseService';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../../../components/Loading/Spinner/Spinner';
import NotFound from '../../status/NotFound/NotFound';
import Paging from '../../../components/Paging/Paging';

const cx = classNames.bind(styles);

function CourseList() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
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

    const handlePageChange = (page: number) => {
        let path = '/courses';
        const queryStringParams: string[] = [];
        if (page) queryStringParams.push(`page=${encodeURIComponent(page)}`);
        if (categories) categories.forEach((cat) => queryStringParams.push(`cat=${encodeURIComponent(cat)}`));
        if (languages) languages.forEach((lang) => queryStringParams.push(`lang=${encodeURIComponent(lang)}`));
        if (levels) levels.forEach((lvl) => queryStringParams.push(`lvl=${encodeURIComponent(lvl)}`));
        if (searchQuery) queryStringParams.push(`query=${encodeURIComponent(searchQuery)}`);
        const queryString = queryStringParams.join('&');
        navigate((path += `?${queryString}`));
    };

    const PagingComponent = () => {
        if (!data?.data?.totalItem) return;
        return (
            <div className={cx('paging-bar')}>
                <Paging
                    currentPage={currentPage}
                    totalRecords={data?.data?.totalItem}
                    pageSize={12}
                    pageChange={handlePageChange}
                />
            </div>
        );
    };

    return (
        <div className={cx('wrapper')}>
            {isLoading && <Spinner />}
            {data?.data.datas.length === 0 && <NotFound />}
            <ListWrapper row wrap>
                {data?.data?.datas &&
                    data?.data.datas.map((item, _) => {
                        return (
                            <CourseCard
                                to={`/courses/${item.code}`}
                                itemPerRow={3}
                                img={item.image}
                                isSale={item.issale}
                                salePrice={item.salePrice}
                                title={item.title}
                                price={item.price}
                                id={item.code}
                                key={item.code}
                            />
                        );
                    })}
            </ListWrapper>
            {data?.data?.totalItem !== 0 && PagingComponent()}
        </div>
    );
}

export default CourseList;
