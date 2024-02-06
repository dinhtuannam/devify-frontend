import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PublicRoutes } from './routes/PublicRoute';
import { PrivateRoute } from './routes/PrivateRoute';
import GlobalStyles from './styles/GlobalStyles';
import classNames from 'classnames/bind';
import styles from './App.module.scss';
import useTheme from './hooks/useTheme';

const cx = classNames.bind(styles);
function App() {
    const { theme } = useTheme();

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
