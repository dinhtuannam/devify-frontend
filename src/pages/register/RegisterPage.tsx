import styles from './RegisterPage.module.scss';
import classNames from 'classnames/bind';
import logo from '../../assets/img/logo.png';
import { useState, ChangeEvent, FormEvent } from 'react';
import InputFormData from '../../components/Input/InputFormData/InputFormData';
import InputPassword from '../../components/Input/InputPassword/InputPassword';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

interface FormData {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
    phone: string;
}

function RegisterPage() {
    const [formData, setFormData] = useState<FormData>({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: '',
    });
    const [loading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
            setIsLoading(false);
        } catch (e) {
            console.log('[Register] -> failed');
            setIsLoading(false);
            setError('Something wrong please try again !');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('heading')}>
                <img className={cx('logo')} src={logo} alt={'devify logo'} />
                <h1 className={cx('title')}>Đăng kí tài khoản Devify</h1>
            </div>
            <div>
                <form className={cx('form')} onSubmit={handleSubmit}>
                    <InputFormData
                        title="Tên đăng nhập"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Nhập tên tài khoản"
                        className="input-form"
                    />
                    <InputPassword
                        title="Mật khẩu"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Nhập mật khẩu"
                        className="input-form"
                    />
                    <InputPassword
                        title="Xác nhận mật khẩu"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Xác nhận mật khẩu"
                        className="input-form"
                    />
                    <InputFormData
                        title="Email"
                        type="password"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Nhập email"
                        className="input-form"
                    />
                    <InputFormData
                        title="Số điện thoại"
                        name="phone"
                        value={formData.phone}
                        type="password"
                        onChange={handleInputChange}
                        placeholder="Nhập số điện thoại"
                        className="input-form"
                    />
                    <div>
                        <span>{error}</span>
                    </div>
                    {loading ? (
                        <div className={cx('submit-wrapper')}>
                            <p className={cx('submit-btn')} style={{ textAlign: 'center' }}>
                                Vui lòng đợi...
                            </p>
                        </div>
                    ) : (
                        <div className={cx('submit-wrapper')}>
                            <input value="ĐĂNG KÍ" type="submit" className={cx('submit-btn')} />
                        </div>
                    )}
                    <div style={{ marginTop: '10px', textAlign: 'center', fontSize: '14px' }}>
                        <span style={{ marginRight: '6px', opacity: '.8' }}>Đã có tài khoản?</span>
                        <Link to="/login" className={cx('login-text')}>
                            Đăng nhập
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
