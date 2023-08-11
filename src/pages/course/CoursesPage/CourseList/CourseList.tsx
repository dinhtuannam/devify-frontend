import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './CourseList.module.scss';
import classNames from 'classnames/bind';
import CourseCard from '../../../../components/Card/CourseCard/CourseCard';
import ListWrapper from '../../../../components/Wrapper/ListWrapper/ListWrapper';
const cx = classNames.bind(styles);

function CourseList() {
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const categories = searchParams.getAll('cat');
        const languages = searchParams.getAll('lang');
        const levels = searchParams.getAll('lvl');

        // Do something with the extracted parameters
        console.log('Categories:', categories);
        console.log('Languages:', languages);
        console.log('Levels:', levels);

        // You can set these values to your state or perform other actions as needed
    }, [searchParams]);
    return (
        <div className={cx('wrapper')}>
            <ListWrapper row wrap>
                <CourseCard title="HTML CSS PRO" price="1.200.000" id="2" />
                <CourseCard title="HTML CSS PRO" price="1.200.000" id="2" />
                <CourseCard title="HTML CSS PRO" price="1.200.000" id="2" />
                <CourseCard title="HTML CSS PRO" price="1.200.000" id="2" />
                <CourseCard title="HTML CSS PRO" price="1.200.000" id="2" />
                <CourseCard title="HTML CSS PRO" price="1.200.000" id="2" />
                <CourseCard title="HTML CSS PRO" price="1.200.000" id="2" />
                <CourseCard title="HTML CSS PRO" price="1.200.000" id="2" />
                <CourseCard title="HTML CSS PRO" price="1.200.000" id="2" />
                <CourseCard title="HTML CSS PRO" price="1.200.000" id="2" />
                <CourseCard title="HTML CSS PRO" price="1.200.000" id="2" />
                <CourseCard title="HTML CSS PRO" price="1.200.000" id="2" />
            </ListWrapper>
        </div>
    );
}

export default CourseList;
