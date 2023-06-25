import React, { ChangeEvent } from 'react';
import styles from './InputFormData.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
interface InputFieldProps {
    title: string;
    name: string;
    value: string;
    type: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    className?: string;
}

const InputFormData: React.FC<InputFieldProps> = ({ title, name, type, value, onChange, placeholder, className }) => {
    return (
        <div className={cx('input-container')}>
            <p className={cx('input-title')}>{title}</p>
            <div className={cx('input-wrapper')}>
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={cx(`${className}`)}
                />
            </div>
        </div>
    );
};

export default InputFormData;
