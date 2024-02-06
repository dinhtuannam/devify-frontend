import TrackItem from '../../../components/Track/TrackItem';
import styles from './FilterTrack.module.scss';
import classNames from 'classnames/bind';
import CheckboxItem from '../../../components/Checkbox/CheckboxItem';
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CategoryItem } from '../../../types/CategoryType';
import { LanguageItem } from '../../../types/LanguageType';
import { LevelItem } from '../../../types/LevelType';
import { useQueries } from '@tanstack/react-query';
import { getAllCategoryService } from '../../../services/CategoryService';
import { getAllLanguageService } from '../../../services/LanguageService';
import TrackSkeleton from '../../../components/Skeleton/TrackSkeleton/TrackSkeleton';
import { getAllLevelService } from '../../../services/LevelService';

const cx = classNames.bind(styles);

interface FilterState {
    category: string[];
    language: string[];
    level: string[];
}

function FilterTrack() {
    const [searchParams] = useSearchParams();
    const [filter, setFilter] = useState<FilterState>({
        category: [],
        language: [],
        level: [],
    });
    const navigate = useNavigate();

    useEffect(() => {
        const categories = searchParams.getAll('cat');
        const languages = searchParams.getAll('lang');
        const levels = searchParams.getAll('lvl');

        if (categories?.length > 0) {
            setFilter((prevFilter) => ({
                ...prevFilter,
                category: categories,
            }));
        }
        if (languages?.length > 0) {
            setFilter((prevFilter) => ({
                ...prevFilter,
                language: languages,
            }));
        }
        if (levels?.length > 0) {
            setFilter((prevFilter) => ({
                ...prevFilter,
                level: levels,
            }));
        }
    }, []);

    const [categoryData, languageData, levelData] = useQueries({
        queries: [
            {
                queryKey: ['all-category'],
                queryFn: getAllCategoryService,
                staleTime: 24 * 60 * 60 * 1000,
                cacheTime: 24 * 60 * 60 * 1000,
            },
            {
                queryKey: ['all-language'],
                queryFn: getAllLanguageService,
                staleTime: 24 * 60 * 60 * 1000,
                cacheTime: 24 * 60 * 60 * 1000,
            },
            {
                queryKey: ['all-level'],
                queryFn: getAllLevelService,
                staleTime: 24 * 60 * 60 * 1000,
                cacheTime: 24 * 60 * 60 * 1000,
            },
        ],
    });

    const handleFilter = () => {
        let path = '/courses';
        const params = [];

        if (filter.category.length > 0) {
            const catParams = filter.category.map((cat) => `cat=${encodeURIComponent(cat)}`).join('&');
            params.push(catParams);
        }

        if (filter.language.length > 0) {
            const langParams = filter.language.map((lang) => `lang=${encodeURIComponent(lang)}`).join('&');
            params.push(langParams);
        }

        if (filter.level.length > 0) {
            const levelParams = filter.level.map((level) => `lvl=${encodeURIComponent(level)}`).join('&');
            params.push(levelParams);
        }

        if (params.length > 0) {
            path += `?${params.join('&')}`;
        }

        navigate(path);
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, type: keyof FilterState) => {
        const { name } = event.target;
        if (filter[type].includes(name)) {
            setFilter((prevFilter) => ({
                ...prevFilter,
                [type]: prevFilter[type].filter((item) => item !== name),
            }));
        } else {
            setFilter((prevFilter) => ({
                ...prevFilter,
                [type]: [...prevFilter[type], name],
            }));
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('track')}>
                <span className={cx('track-title')}>Category</span>
            </div>
            {categoryData.isLoading && <TrackSkeleton count={6} />}
            {categoryData.data != null &&
                categoryData.data.data?.map((item: CategoryItem, index: any) => {
                    return (
                        <TrackItem key={item.code + index}>
                            <CheckboxItem
                                label={item.name}
                                name={item.code}
                                opacity
                                primary
                                checked={filter.category.includes(item.code)}
                                onChange={(event) => handleCheckboxChange(event, 'category')}
                            />
                        </TrackItem>
                    );
                })}

            <div className={cx('track')}>
                <span className={cx('track-title')}>Language</span>
            </div>
            {languageData.isLoading && <TrackSkeleton count={6} />}
            {languageData.data != null &&
                languageData.data.data?.map((item: LanguageItem, index: any) => {
                    return (
                        <TrackItem key={item.name + index}>
                            <CheckboxItem
                                label={item.name}
                                name={item.code}
                                opacity
                                primary
                                checked={filter.language.includes(item.code)}
                                onChange={(event) => handleCheckboxChange(event, 'language')}
                            />
                        </TrackItem>
                    );
                })}

            <div className={cx('track')}>
                <span className={cx('track-title')}>Level</span>
            </div>
            {levelData.isLoading && <TrackSkeleton count={6} />}
            {levelData.data != null &&
                levelData.data.data?.map((item: LevelItem, index: any) => {
                    return (
                        <TrackItem key={item.name + index}>
                            <CheckboxItem
                                label={item.name}
                                name={item.code}
                                opacity
                                primary
                                checked={filter.level.includes(item.code)}
                                onChange={(event) => handleCheckboxChange(event, 'level')}
                            />
                        </TrackItem>
                    );
                })}
            <div className={cx('track')} onClick={handleFilter}>
                <span className={cx('track-title')}>Filter</span>
            </div>
        </div>
    );
}

export default FilterTrack;
