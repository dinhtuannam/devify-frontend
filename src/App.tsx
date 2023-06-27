import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PublicRoutes } from './routes/PublicRoute';
import GlobalStyles from './styles/GlobalStyles';
import useLocalStorage from 'use-local-storage';
import classNames from 'classnames/bind';
import styles from './App.module.scss';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import jwt_decode from 'jwt-decode';
import { decodeToken, refreshTokenResponse, tokenResponse } from './types/AuthType';
import { refreshTokenService } from './services/AuthService';
const cx = classNames.bind(styles);
function App() {
    const [theme] = useLocalStorage<string>('devify theme', 'Light');
    const [cookies, setCookies] = useCookies(['devify:AccessToken', 'devify:RefreshToken', 'devify:isLogin']);

    useEffect(() => {
        const handleRefreshToken = async () => {
            const refreshToken = cookies['devify:RefreshToken'];
            const accessToken = cookies['devify:AccessToken'];
            if (accessToken && refreshToken) {
                const decodedToken: decodeToken = jwt_decode(accessToken);
                const currentTimestamp = Math.floor(Date.now() / 1000);
                if (decodedToken.exp - currentTimestamp <= 600) {
                    console.log('handle refresh token');
                    const data: tokenResponse = {
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                    };
                    const res: refreshTokenResponse = await refreshTokenService(data);
                    if (res != null && res.success === true) {
                        const accessTokenExp = new Date(Date.now() + 30 * 60 * 1000);
                        setCookies('devify:AccessToken', res.data.accessToken, { expires: accessTokenExp });
                        const refreshTokenExp = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
                        setCookies('devify:RefreshToken', res.data.refreshToken, { expires: refreshTokenExp });
                        const isLoginExp = new Date(Date.now() + 30 * 60 * 1000);
                        setCookies('devify:isLogin', true, { expires: isLoginExp });
                    }
                }
            }
        };
        handleRefreshToken();
    }, []);
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
                    </Routes>
                </div>
            </GlobalStyles>
        </Router>
    );
}

export default App;
