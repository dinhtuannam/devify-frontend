import classNames from 'classnames/bind';
import styles from './ListWrapper.module.scss';
import { ReactNode } from 'react';
const cx = classNames.bind(styles);

interface IContentWrapperProps {
    children: ReactNode;
    column?: boolean;
    row?: boolean;
    wrap?: boolean;
}

function ListWrapper(props: IContentWrapperProps) {
    const { children, column, row, wrap } = props;
    const classes = cx('wrapper', {
        column,
        row,
        wrap,
    });
    return <div className={classes}>{children}</div>;
}

export default ListWrapper;
