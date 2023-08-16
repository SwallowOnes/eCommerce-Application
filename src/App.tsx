import { HashRouter, Route, Routes } from 'react-router-dom';
import { ConfigProvider, Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import NotFound from './pages/404/notFound';
import LoginPage from './pages/Login/login';
import SignUp from './pages/SignUp/signup';
import Support from './pages/Support/support';
import LayoutPage from './pages/Layout/layout';
import { setTheme } from './redux/slice/themeSlice';
import antPattern, { getThemeAlgorithm } from './theme/antPattern';

import './pages/Layout/layout.module.css';

function App() {
  const dispatch = useDispatch();
  const themeState = useSelector((state: RootState) => state.theme.theme);
  const themesState = useSelector((state: RootState) => state.theme.themes);

  return (
    <ConfigProvider
      theme={{
        token: antPattern[themeState].token,
        components: antPattern[themeState].components,
        algorithm: getThemeAlgorithm(themeState),
      }}
    >
      <div className="App">
        <Radio.Group
          value={themeState}
          onChange={(e) => {
            dispatch(setTheme(e.target.value));
          }}
        >
          {Object.values(themesState).map((themeMap) => <Radio value={themeMap}>{themeMap}</Radio>)}
        </Radio.Group>
        <HashRouter>
          <Routes>
            <Route path="/" element={<LayoutPage />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/support" element={<Support />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </HashRouter>
      </div>
    </ConfigProvider>
  );
}

export default App;
