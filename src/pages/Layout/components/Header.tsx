import { useState, useEffect } from 'react';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Drawer, Menu, Avatar } from 'antd';
import { MenuOutlined, MehOutlined } from '@ant-design/icons';
import store, { RootState } from '../../../redux/store';

import styles from './header.module.css';
import { logoutAsync } from '../../../redux/slice/authSlice';

function MainMenu({
  isInLine = false,
  setOpenMenu,
}: {
  isInLine: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const isAuthState = useSelector((state: RootState) => state.auth.isAuth);
  const userInfo = useSelector((state: RootState) => state.auth.user.email);
  const currentPage = useSelector(
    (state: RootState) => state.theme.currentPage,
  );

  const [currentPageState, setCurrentPageState] = useState('');

  useEffect(() => {
    setCurrentPageState(currentPage);
  }, [currentPage]);

  const onMenuClick = (item: { key: string }) => {
    setOpenMenu(false);
    return navigate(`/${item.key}`);
  };

  const logOut = async () => {
    await store.dispatch(logoutAsync());
  };

  const toUserPage = () => {
    navigate('/user');
  };

  const renderLoginMenu = (currentPageProp: string) => (
    <Menu
      className={isInLine ? styles.menu_items_line : styles.menu_items}
      onClick={onMenuClick}
      theme="light"
      mode={isInLine ? 'inline' : 'horizontal'}
      selectedKeys={[currentPageProp]}
      items={[
        {
          label: 'SIGN IN',
          key: 'login',
        },
        {
          label: 'SIGN UP',
          key: 'signup',
        },
      ]}
    />
  );

  const renderAuthMenu = () => (
    <>
      <Button onClick={logOut}>Logout</Button>
      <Avatar
        style={{ backgroundColor: '#28784D' }}
        className={styles.avatarPointer}
        size="large"
        onClick={toUserPage}
      >
        {userInfo[0]}
      </Avatar>
    </>
  );

  return (
    <>
      <div className={styles.menu_main}>
        <Menu
          className={isInLine ? styles.menu_items_line : styles.menu_items}
          onClick={onMenuClick}
          theme="light"
          disabledOverflow
          mode={isInLine ? 'inline' : 'horizontal'}
          selectedKeys={[currentPageState]}
        >
          <NavLink
            to="/"
            style={({ isActive }) => ({
              color: isActive ? 'var(--bg-color-accent)' : 'var(--text-color)',
            })}
          >
            <Menu.Item key="/">
              <span>STORE</span>
            </Menu.Item>
          </NavLink>
          <NavLink
            to="catalog"
            style={({ isActive }) => ({
              color: isActive ? 'var(--bg-color-accent)' : 'var(--text-color)',
            })}
          >
            <Menu.Item key="catalog">
              <span>ALL GAMES</span>
            </Menu.Item>
          </NavLink>
          <NavLink
            to="info"
            style={({ isActive }) => ({
              color: isActive ? 'var(--bg-color-accent)' : 'var(--text-color)',
            })}
          >
            <Menu.Item key="info">
              <span>INFORMATION</span>
            </Menu.Item>
          </NavLink>
          <NavLink
            to="support"
            style={({ isActive }) => ({
              color: isActive ? 'var(--bg-color-accent)' : 'var(--text-color)',
            })}
          >
            <Menu.Item key="support">
              <span>SUPPORT</span>
            </Menu.Item>
          </NavLink>
        </Menu>
      </div>
      <div className={styles.menu_reg}>
        {isAuthState ? renderAuthMenu() : renderLoginMenu(currentPageState)}
      </div>
    </>
  );
}

function Header() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <div className={styles.burgerMenu}>
        <MenuOutlined
          className={styles.burger_icon}
          onClick={() => {
            setOpenMenu(true);
          }}
        />
        <Link to="/" className={styles.logotip}>
          <MehOutlined className={styles.logotip} />
        </Link>
      </div>
      <div className={styles.headerMenu}>
        <Link to="/" className={styles.logotip}>
          <MehOutlined className={styles.logotip} />
        </Link>
        <MainMenu setOpenMenu={setOpenMenu} isInLine={false} />
      </div>
      <Drawer
        placement="left"
        open={openMenu}
        closable={false}
        onClose={() => {
          setOpenMenu(false);
        }}
      >
        <MainMenu setOpenMenu={setOpenMenu} isInLine />
      </Drawer>
    </>
  );
}
export default Header;
