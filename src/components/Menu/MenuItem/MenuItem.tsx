import classNames from 'classnames/bind';
import styles from './MenuItem.module.scss';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

interface IMenuItemProps {
    to?: string;
    href?: string;
    primary?: boolean;
    children?: ReactNode;
    onClick?: (params: any) => any;
}

function MenuItem(props: IMenuItemProps) {
    const { to, href, primary, children, onClick } = props;
    let Comp: any = 'div';
    const MenuItemAttributes = {
        href,
        to,
        onClick,
    };
    const classes = cx('wrapper', {
        primary,
    });
    if (props.to) {
        Comp = Link;
    } else if (props.href) {
        Comp = 'a';
    }

    return (
        <li className={classes}>
            <Comp className={cx('item')} {...MenuItemAttributes}>
                {children}
            </Comp>
        </li>
    );
}

export default MenuItem;
