import styles from './LayoutWrapper.module.scss';
import classNames from 'classnames/bind';
import { ReactNode } from 'react';
const cx = classNames.bind(styles);

interface IContentWrapperProps {
    children: ReactNode;
    medium?: boolean;
    center?: boolean;
}

function LayoutWrapper(props: IContentWrapperProps) {
    const { children, center, medium } = props;
    const classes = cx('wrapper', {
        center,
        medium,
    });
    return <div className={classes}>{children}</div>;
}

export default LayoutWrapper;
