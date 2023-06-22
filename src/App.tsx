import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PublicRoutes } from './routes/PublicRoute';
import GlobalStyles from './styles/GlobalStyles';
import classNames from 'classnames/bind';
import styles from './App.module.scss';
const cx = classNames.bind(styles);
function App() {
    return (
        <Router>
            <GlobalStyles>
                <div className={cx('App')} data-theme={'dark'}>
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
