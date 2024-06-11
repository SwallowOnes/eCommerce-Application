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
      colorBgContainer: '#eae7ea',
      colorText: '#000',
      colorLink: '#000',
      colorLinkActive: '#91caff',
      colorLinkHover: '#003eb3',
    },
    components: {
      Layout: {
        headerBg: '#eae7ea',
        bodyBg: '#fff',
      },
      Timeline: {
        tailColor: 'black',
        dotBg: 'transparent',
      },
      Button: {
        borderColorDisabled: '#52c41a',
      },
    },
  },
  [themes.dark]: {
    token: {
      colorBgContainer: '#171a21',
      colorText: '#fff',
      colorLink: '#fff',
      colorLinkActive: '#0958d9',
      colorLinkHover: '#4096ff',
    },
    components: {
      Layout: {
        headerBg: '#171a21',
        bodyBg: '#417a9b',
      },
      Timeline: {
        tailColor: 'black',
        dotBg: 'transparent',
      },
    },
  },
  [themes.barbie]: {
    token: {
      colorBgContainer: '#ffe6f9',
      colorText: '#000',
      colorPrimary: '#08979c',
    },
    components: {
      Layout: {
        headerBg: '#ffe6f9',
        bodyBg: '#417a9b',
      },
      Timeline: {
        tailColor: 'black',
        dotBg: 'transparent',
      },
    },
  },
};

export { getThemeAlgorithm };
export default antPattern;
