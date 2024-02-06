import FilterTrack from './FilterTrack/FilterTrack';
import CourseList from './CourseList/CourseList';
import styles from './CoursesPage.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
function CoursesPage() {
    return (
        <div className={cx('wrapper')}>
            <FilterTrack />
            <CourseList />
        </div>
    );
}

export default CoursesPage;
