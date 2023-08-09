import classNames from 'classnames/bind';
import styles from './ContentWrapper.module.scss';
import { ReactNode } from 'react';
const cx = classNames.bind(styles);

interface IContentWrapperProps {
    children: ReactNode;
    primary?: boolean;
    full?: boolean;
    borderRadius?: boolean;
}

function ContentWrapper(props: IContentWrapperProps) {
    const { primary, children, full, borderRadius } = props;
    const classes = cx('wrapper', {
        primary,
        full,
        borderRadius,
    });
    return <div className={classes}>{children}</div>;
}

export default ContentWrapper;
