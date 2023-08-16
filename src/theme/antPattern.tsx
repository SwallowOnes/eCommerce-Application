import { theme } from 'antd';
import { themes } from '../redux/slice/themeSlice';

const getThemeAlgorithm = (currentTheme: string) => {
  if ([themes.light, themes.barbie].includes(currentTheme)) {
    return theme.defaultAlgorithm;
  }
  return theme.darkAlgorithm;
};

const antPattern = {
  [themes.light]: {
    token: {
      colorText: '#000',
    },
    components: {
      Layout: {
        colorBgHeader: '#eae7ea',
        colorBgBody: '#fff',
      },
    },
  },
  [themes.dark]: {
    token: {
      colorText: '#fff',
    },
    components: {
      Layout: {
        colorBgHeader: '#171a21',
        colorBgBody: '#417a9b',
      },
    },
  },
  [themes.barbie]: {
    token: {
      colorText: '#fff',
    },
    components: {
      Layout: {
        colorBgHeader: '#eee',
      },
    },
  },
};
export { getThemeAlgorithm };
export default antPattern;
