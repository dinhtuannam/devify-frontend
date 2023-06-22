import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PublicRoutes } from './routes/PublicRoute';
import GlobalStyles from './styles/GlobalStyles';
import useLocalStorage from 'use-local-storage';
import classNames from 'classnames/bind';
import styles from './App.module.scss';
const cx = classNames.bind(styles);
function App() {
    const [theme, setTheme] = useLocalStorage<string>('devify theme', 'Light');

    const switchTheme = () => {
        const newTheme = theme === 'Light' ? 'Dark' : 'Light';
        setTheme(newTheme);
    };

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
