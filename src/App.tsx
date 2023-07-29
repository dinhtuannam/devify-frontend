import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PublicRoutes } from './routes/PublicRoute';
import { PrivateRoute } from './routes/PrivateRoute';
import GlobalStyles from './styles/GlobalStyles';
import useLocalStorage from 'use-local-storage';
import classNames from 'classnames/bind';
import styles from './App.module.scss';
import { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { decodeToken, tokenResponse, refreshTokenRequest } from './types/AuthType';
import UseLogout from './hooks/useLogout';
import { ApiResponse } from './types/ApiType';
import { refreshTokenService } from './services/AuthService';
import { GetAuthCookies, SetAuthCookies } from './helpers/cookiesHelper';
import { AuthCookies } from './types/CookiesType';

const cx = classNames.bind(styles);
function App() {
    const [theme] = useLocalStorage<string>('devify theme', 'Light');
    const setAuthCookies = SetAuthCookies();

    useEffect(() => {
        const handleRefreshToken = async () => {
            const cookies: AuthCookies = GetAuthCookies();
            const refreshToken: string | undefined = cookies.refreshTokenCookie;
            const accessToken: string | undefined = cookies.accessTokenCookie;
            const isLogin: string | undefined = cookies.isLoginCookies;

            if (accessToken && refreshToken && isLogin) {
                const decodedToken: decodeToken = jwt_decode(accessToken);
                const currentTimestamp: number = Math.floor(Date.now() / 1000);

                if (decodedToken.exp - currentTimestamp <= 600) {
                    console.log('condition 1');
                    const data: refreshTokenRequest = {
                        refreshToken: refreshToken,
                    };
                    handleCallApi(data);
                }
            } else if (!refreshToken || !isLogin) {
                UseLogout();
            } else if (refreshToken && isLogin && !accessToken) {
                console.log('condition 2');
                const data: refreshTokenRequest = {
                    refreshToken: refreshToken,
                };
                handleCallApi(data);
            }
        };
        const handleCallApi = async (token: refreshTokenRequest) => {
            const res: ApiResponse<tokenResponse> = await refreshTokenService(token);
            if (res != null && res.success === true) {
                const authData = {
                    accessToken: res.data.accessToken,
                    refreshToken: res.data.refreshToken,
                    isLogin: true,
                };
                setAuthCookies(authData);
                window.location.reload();
            }
            if (res != null && res.success === false) {
                UseLogout();
            }
        };
        handleRefreshToken();
    }, [setAuthCookies]);

    return (
        <Router>
            <GlobalStyles>
                <div className={cx('App')} data-theme={theme}>
                    <Routes>
                        {PublicRoutes.map((value, index) => {
                            const Page = value.page;
                            const Layout = value.layout;
                            return (
                                <Route
                                    path={value.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                    key={value.path}
                                />
                            );
                        })}
                        {PrivateRoute.map((value, index) => {
                            const Page = value.page;
                            const Layout = value.layout;
                            return (
                                <Route
                                    path={value.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                    key={value.path}
                                />
                            );
                        })}
                    </Routes>
                </div>
            </GlobalStyles>
        </Router>
    );
}

export default App;
