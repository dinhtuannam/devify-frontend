import styles from './LoginPage.module.scss';
import classNames from 'classnames/bind';
import logo from '../../assets/img/logo.png';
import InputFormData from '../../components/Input/InputFormData/InputFormData';
import InputPassword from '../../components/Input/InputPassword/InputPassword';
import { loginService } from '../../services/AuthService';
import { LoginPayload, LoginResponse } from '../../types/AuthType';
import { ApiResponse } from '../../types/ApiType';
import { Link } from 'react-router-dom';
import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useInputChange from '../../hooks/useInputChange';
import { GetAuthCookies } from '../../helpers/cookiesHelper';
const cx = classNames.bind(styles);

function LoginPage() {
    // ===================  State ======================
    const { formData, handleInputChange } = useInputChange({
        username: '',
        password: '',
    });
    const [loading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();
    // =================== Side Effect ======================
    useEffect(() => {
        const cookiesData = GetAuthCookies();
        if (cookiesData.accessTokenCookie && cookiesData.refreshTokenCookie && cookiesData.isLoginCookies === 'true') {
            navigate('/');
        }
    }, [navigate]);

    const handleLogin = async () => {
        const postData: LoginPayload = {
            username: formData.username,
            password: formData.password,
        };
        const res = await loginService(postData);
        return res;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            const res: ApiResponse<LoginResponse> = await handleLogin();
            if (res.result === true) {
                setError('');
                console.log(res.data.info);

                localStorage.setItem('currentUser', JSON.stringify(res.data.info));
                window.location.href = '/';
            } else {
                setError(res.message);
            }

            setIsLoading(false);
        } catch (e) {
            console.log('[Login] -> failed');
            setIsLoading(false);
            setError('Something wrong please try again !');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('heading')}>
                <img className={cx('logo')} src={logo} alt={'devify logo'} />
                <h1 className={cx('title')}>Đăng nhập vào Devify</h1>
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
                            <input value="ĐĂNG NHẬP" type="submit" className={cx('submit-btn')} />
                        </div>
                    )}
                    <div style={{ marginTop: '10px', textAlign: 'center', fontSize: '14px' }}>
                        <span style={{ marginRight: '6px', opacity: '.8' }}>Chưa có tài khoản?</span>
                        <Link to="/register" className={cx('login-text')}>
                            Đăng kí
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
