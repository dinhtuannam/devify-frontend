import styles from './LayoutWrapper.module.scss';
import classNames from 'classnames/bind';
import { ReactNode } from 'react';
const cx = classNames.bind(styles);

interface IContentWrapperProps {
    children: ReactNode;
    center?: boolean;
}

function LayoutWrapper(props: IContentWrapperProps) {
    const { children, center } = props;
    const classes = cx('wrapper', {
        center,
    });
    return <div className={classes}>{children}</div>;
}

export default LayoutWrapper;
