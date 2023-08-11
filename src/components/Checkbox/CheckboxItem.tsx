import React from 'react';
import styles from './CheckboxItem.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

interface CheckboxItemProps {
    label: string;
    checked: boolean;
    primary?: boolean;
    opacity?: boolean;
    medium?: boolean;
    large?: boolean;
    name: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxItem: React.FC<CheckboxItemProps> = ({
    label,
    primary,
    opacity,
    medium,
    large,
    checked,
    name,
    onChange,
}) => {
    const classes = cx('wrapper', {
        primary,
        medium,
        large,
        opacity,
    });
    return (
        <label className={classes}>
            <input className={cx('checkbox')} type="checkbox" checked={checked} onChange={onChange} name={name} />
            <span className={cx('text')}>{label}</span>
        </label>
    );
};

export default CheckboxItem;
