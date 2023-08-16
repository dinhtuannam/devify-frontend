import styles from './Paging.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

interface IPagingProps {
    currentPage: number;
    pageSize: number;
    totalRecords: number;
    pageChange: (params: any) => void;
}

function Paging(props: IPagingProps) {
    const { pageSize, totalRecords, currentPage, pageChange } = props;
    let totalPage = 1;
    if (totalRecords) totalPage = totalRecords / pageSize;

    return (
        <div className={cx('wrapper')}>
            {Array.from({ length: totalPage }, (_, index) => index + 1).map((page) => (
                <button
                    key={page}
                    onClick={() => pageChange(page)}
                    className={cx('button', { active: currentPage === page })}
                >
                    {page}
                </button>
            ))}
        </div>
    );
}

export default Paging;
