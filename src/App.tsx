import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PublicRoutes } from './routes/PublicRoute';
import { PrivateRoute } from './routes/PrivateRoute';
import GlobalStyles from './styles/GlobalStyles';
import classNames from 'classnames/bind';
import styles from './App.module.scss';
import useTheme from './hooks/useTheme';
import { useEffect } from 'react';
import Auth from './routes/AuthRoute';

const cx = classNames.bind(styles);
function App() {
    const { theme } = useTheme();

    useEffect(() => {
        if (theme === 'Dark') {
            window.document.body.classList.add('dark');
        } else {
            window.document.body.classList.remove('dark');
        }
    }, [theme]);

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
                                <Route element={<Auth />} key="key">
                                    <Route
                                        path={value.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                        key={value.path}
                                    />
                                </Route>
                            );
                        })}
                    </Routes>
                </div>
            </GlobalStyles>
        </Router>
    );
}

export default App;
