import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PublicRoutes } from './routes/PublicRoute';
import GlobalStyles from './styles/GlobalStyles';
function App() {
    return (
        <Router>
            <GlobalStyles>
                <div className="App">
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
