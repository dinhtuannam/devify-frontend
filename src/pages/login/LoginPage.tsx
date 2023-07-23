import styles from './LoginPage.module.scss';
import classNames from 'classnames/bind';
import logo from '../../assets/img/logo.png';
import InputFormData from '../../components/Input/InputFormData/InputFormData';
import InputPassword from '../../components/Input/InputPassword/InputPassword';
import { loginService } from '../../services/AuthService';
import { getCurrentUserService } from '../../services/AccountService';
import { authLogin, decodeToken, tokenResponse } from '../../types/AuthType';
import { ApiResponse } from '../../types/ApiType';
import { currentUserInformation } from '../../types/AccountType';
import { Link } from 'react-router-dom';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { GetAuthCookies, SetAuthCookies, RemoveAllCookies } from '../../helpers/cookiesHelper';
import { AuthCookies } from '../../types/CookiesType';

const cx = classNames.bind(styles);

interface FormData {
    username: string;
    password: string;
}

function LoginPage() {
    // ============== Login State ========================
    const [formData, setFormData] = useState<FormData>({
        username: '',
        password: '',
    });
    // ============== Get Cookies ========================
    const cookiesData: AuthCookies = GetAuthCookies();
    const accessTokenCookie: string | undefined = cookiesData.accessTokenCookie;
    const refreshTokenCookie: string | undefined = cookiesData.refreshTokenCookie;
    const isLoginCookie: string | undefined = cookiesData.isLoginCookies;

    // ============== Orther Cookies ========================
    const [loading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const handleSetAuthCookies = SetAuthCookies();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoginCookie === 'true' || accessTokenCookie || refreshTokenCookie) navigate('/');
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleLogin = async () => {
        const postData: authLogin = {
            name: formData.username,
            password: formData.password,
        };
        const res = await loginService(postData);
        return res;
    };

    const handleSetStorage = async (res: ApiResponse<tokenResponse>) => {
        // =================== set cookies ======================
        const authData = {
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
            isLogin: true,
        };
        handleSetAuthCookies(authData);

        // =================== set localstorage ======================
        const decodedToken: decodeToken = jwt_decode(res.data.accessToken);
        if (decodedToken) {
            const accountInfo: ApiResponse<currentUserInformation> = await getCurrentUserService(decodedToken.Id);
            console.log(res.data);

            if (accountInfo != null) {
                if (accountInfo.success === true) {
                    localStorage.setItem('currentUser', JSON.stringify(accountInfo.data));
                    window.location.href = '/';
                } else {
                    RemoveAllCookies();
                    setError('Đã có lỗi xảy ra, vui lòng thử lại sau');
                }
            }
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const res: ApiResponse<tokenResponse> = await handleLogin();
        if (res != null) {
            if (res.success === true) {
                setError('');
                await handleSetStorage(res);
            } else {
                setError(res.message);
            }
        }
        setIsLoading(false);
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
