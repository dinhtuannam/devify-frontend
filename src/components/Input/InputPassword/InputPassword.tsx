import React, { ChangeEvent } from 'react';
import styles from './InputPassword.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
const cx = classNames.bind(styles);
interface InputPasswordProps {
    title: string;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    className?: string;
}

const InputPassword: React.FC<InputPasswordProps> = ({ title, name, value, onChange, placeholder, className }) => {
    const [show, setShow] = useState(false);
    return (
        <div className={cx('input-container')}>
            <p className={cx('input-title')}>{title}</p>
            <div className={cx('input-wrapper')}>
                <input
                    name={name}
                    type={show ? 'text' : 'password'}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={cx(`${className}`)}
                />
                {show ? (
                    <AiFillEye className={cx('icon')} onClick={() => setShow(false)} />
                ) : (
                    <AiFillEyeInvisible className={cx('icon')} onClick={() => setShow(true)} />
                )}
            </div>
        </div>
    );
};

export default InputPassword;
