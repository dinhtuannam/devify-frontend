import TrackItem from '../../../../components/Track/TrackItem';
import styles from './FilterTrack.module.scss';
import classNames from 'classnames/bind';
import CheckboxItem from '../../../../components/Checkbox/CheckboxItem';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

interface FilterState {
    category: string[];
    language: string[];
    level: string[];
}

function FilterTrack() {
    const [filter, setFilter] = useState<FilterState>({
        category: [],
        language: [],
        level: [],
    });
    const navigate = useNavigate();
    console.log(filter);

    const handleFilter = () => {
        let path = '/courses';

        if (filter.category.length > 0) {
            const catParams = filter.category.map((cat) => `cat=${cat}`).join('&');
            path += `?${catParams}`;
        }

        if (filter.language.length > 0) {
            const langParams = filter.language.map((lang) => `lang=${lang}`).join('&');
            path += `${filter.category.length > 0 ? '&' : '?'}${langParams}`;
        }

        if (filter.level.length > 0) {
            const levelParams = filter.level.map((level) => `lvl=${level}`).join('&');
            path += `${filter.category.length > 0 || filter.language.length > 0 ? '&' : '?'}${levelParams}`;
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
            <TrackItem>
                <CheckboxItem
                    label="Web"
                    name="Web"
                    opacity
                    primary
                    checked={filter.category.includes('Web')}
                    onChange={(event) => handleCheckboxChange(event, 'category')}
                />
            </TrackItem>
            <TrackItem>
                <CheckboxItem
                    label="Database"
                    name="Database"
                    opacity
                    primary
                    checked={filter.category.includes('Database')}
                    onChange={(event) => handleCheckboxChange(event, 'category')}
                />
            </TrackItem>
            <TrackItem>
                <CheckboxItem
                    label="Mobile"
                    name="Mobile"
                    opacity
                    primary
                    checked={filter.category.includes('Mobile')}
                    onChange={(event) => handleCheckboxChange(event, 'category')}
                />
            </TrackItem>

            <div className={cx('track')}>
                <span className={cx('track-title')}>Language</span>
            </div>
            <TrackItem>
                <CheckboxItem
                    label="ReactJS"
                    name="ReactJS"
                    opacity
                    primary
                    checked={filter.language.includes('ReactJS')}
                    onChange={(event) => handleCheckboxChange(event, 'language')}
                />
            </TrackItem>
            <TrackItem>
                <CheckboxItem
                    label="Java"
                    name="Java"
                    opacity
                    primary
                    checked={filter.language.includes('Java')}
                    onChange={(event) => handleCheckboxChange(event, 'language')}
                />
            </TrackItem>

            <div className={cx('track')}>
                <span className={cx('track-title')}>Level</span>
            </div>
            <TrackItem>
                <CheckboxItem
                    label="Beginner"
                    name="Beginner"
                    opacity
                    primary
                    checked={filter.level.includes('Beginner')}
                    onChange={(event) => handleCheckboxChange(event, 'level')}
                />
            </TrackItem>
            <TrackItem>
                <CheckboxItem
                    label="Expert"
                    name="Expert"
                    opacity
                    primary
                    checked={filter.level.includes('Expert')}
                    onChange={(event) => handleCheckboxChange(event, 'level')}
                />
            </TrackItem>
            <div className={cx('track')} onClick={handleFilter}>
                <span className={cx('track-title')}>Filter</span>
            </div>
        </div>
    );
}

export default FilterTrack;
