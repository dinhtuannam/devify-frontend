import styles from './RegisterPage.module.scss';
import classNames from 'classnames/bind';
import logo from '../../assets/img/logo.png';
import { useState, ChangeEvent, FormEvent } from 'react';
import InputFormData from '../../components/Input/InputFormData/InputFormData';
import InputPassword from '../../components/Input/InputPassword/InputPassword';
import { Link, useNavigate } from 'react-router-dom';
import ComboBox, { IListComboBox } from '../../components/ComboBox/ComboBox';
import { CreateUser } from '../../types/UserType';
import { createUserService } from '../../services/UserService';
const cx = classNames.bind(styles);

interface FormData {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
    displayName: string;
    role: string;
}

function RegisterPage() {
    const [formData, setFormData] = useState<FormData>({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        displayName: '',
        role: '',
    });
    const comboBox: IListComboBox[] = [
        { code: 'customer', name: 'Khách hàng', des: 'Khách hàng' },
        { code: 'creator', name: 'Nhà sáng tạo', des: 'Nhà sáng tạo' },
    ];
    const [loading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChangeComboBox = (param: IListComboBox) => {
        console.log(param);
        setFormData((prevAttribute) => ({ ...prevAttribute, role: param.code }));
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            const data: CreateUser = {
                username: formData.username,
                password: formData.password,
                email: formData.email,
                displayName: formData.displayName,
                role: formData.role,
            };
            const res = await createUserService(data);
            setIsLoading(false);
            if (res.result) {
                navigate('/login');
                setError('');
            } else {
                setError(res.message);
            }
        } catch (e) {
            setIsLoading(false);
            setError('Đã có lỗi xảy ra vui lòng thử lại');
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
                        title="Tên hiển thị"
                        name="displayName"
                        value={formData.displayName}
                        type="text"
                        onChange={handleInputChange}
                        placeholder="Nhập tên hiển thị"
                        className="input-form"
                    />
                    <InputFormData
                        title="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Nhập email"
                        className="input-form"
                    />

                    <div className="mt-8">
                        <ComboBox
                            zIndex="z-50"
                            list={comboBox}
                            onSet={handleChangeComboBox}
                            type="role"
                            select={'customer'}
                        />
                    </div>
                    <div className="mt-4 font-semibold text-red-500">
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
