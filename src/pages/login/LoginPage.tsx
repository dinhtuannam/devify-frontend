import styles from './LoginPage.module.scss';
import classNames from 'classnames/bind';
import logo from '../../assets/img/logo.png';
import InputFormData from '../../components/Input/InputFormData/InputFormData';
import InputPassword from '../../components/Input/InputPassword/InputPassword';
import { loginService } from '../../services/AuthService';
import { getAccountInfoService } from '../../services/AccountService';
import { authLogin, authLoginResponse, decodeToken } from '../../types/AuthType';
import { accountInformationResponse, accountInformation } from '../../types/AccountType';
import { Link } from 'react-router-dom';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useCookies } from 'react-cookie';
import useLocalStorage from 'use-local-storage';
import jwt_decode from 'jwt-decode';

const cx = classNames.bind(styles);

interface FormData {
    username: string;
    password: string;
}

function LoginPage() {
    const [formData, setFormData] = useState<FormData>({
        username: '',
        password: '',
    });
    const [cookies, setCookies] = useCookies(['devify:AccessToken', 'devify:RefreshToken', 'devify:isLogin']);
    const [currentUser, setCurrentUser] = useLocalStorage('currentUser', '');
    const [loading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

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

    const handleSetStorage = async (res: authLoginResponse) => {
        // =================== set cookies ======================
        const accessTokenExp = new Date(Date.now() + 30 * 60 * 1000);
        setCookies('devify:AccessToken', res.data.accessToken, { expires: accessTokenExp });
        const refreshTokenExp = new Date(Date.now() + 30 * 60 * 1000);
        setCookies('devify:RefreshToken', res.data.refreshToken, { expires: refreshTokenExp });
        const isLoginExp = new Date(Date.now() + 30 * 60 * 1000);
        setCookies('devify:isLogin', true, { expires: isLoginExp });

        // =================== set localstorage ======================
        const decodedToken: decodeToken = jwt_decode(res.data.accessToken);
        if (decodedToken) {
            const accountInfo: accountInformationResponse = await getAccountInfoService(decodedToken.Id);
            setCurrentUser(JSON.stringify(accountInfo.data));
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const res: authLoginResponse = await handleLogin();
        if (res.success === true) {
            setError('');
            await handleSetStorage(res);
            window.location.href = '/';
        } else {
            setError(res.message);
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
