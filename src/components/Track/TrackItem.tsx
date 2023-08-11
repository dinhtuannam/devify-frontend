import styles from './TrackItem.module.scss';
import classNames from 'classnames/bind';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

interface ITrackItem {
    to?: string;
    href?: string;
    primary?: boolean;
    small?: boolean;
    medium?: boolean;
    large?: boolean;
    disabled?: boolean;
    children?: ReactNode;
}

function TrackItem(props: ITrackItem) {
    const { primary, href, disabled, to, small, medium, large, children } = props;
    // ========== orther props ============
    const CompProps = {
        href,
        to,
    };
    // ========== comp ============
    let Comp: any = 'div';
    if (props.to) {
        Comp = Link;
    } else if (props.href) {
        Comp = 'a';
    }
    // ========== class ============
    const classes = cx('item', {
        primary,
        disabled,
        small,
        medium,
        large,
    });
    return (
        <Comp className={classes} {...CompProps}>
            {children}
        </Comp>
    );
}

export default TrackItem;
