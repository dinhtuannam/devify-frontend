import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './DefaultButton.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

interface IDefaultButtonProps {
    to?: string;
    href?: string;
    primary?: boolean;
    outline?: boolean;
    small?: boolean;
    medium?: boolean;
    large?: boolean;
    disabled?: boolean;
    children?: ReactNode;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    [passProps: string]: any;
}

function DefaultButton(props: IDefaultButtonProps) {
    const { primary, href, disabled, to, small, medium, large, outline, children, onClick } = props;
    const BtnProps = {
        href,
        to,
    };
    let Comp: any = 'button';
    const classes = cx('wrapper', {
        primary,
        outline,
        disabled,
        small,
        medium,
        large,
    });
    if (props.to) {
        Comp = Link;
    } else if (props.href) {
        Comp = 'a';
    } else Comp = 'button';

    return (
        <Comp className={classes} {...BtnProps} onClick={onClick}>
            <span>{children}</span>
        </Comp>
    );
}

export default DefaultButton;
