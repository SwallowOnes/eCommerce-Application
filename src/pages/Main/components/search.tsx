import { DependencyList, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Input, Menu } from 'antd';

import { fetchSearchProducts } from '../../../redux/slice/productSlice';

import store, { RootState } from '../../../redux/store';

import styles from './search.module.css';
import PopoverCards from '../../catalog/components/popoverCard';


const { Search } = Input;
const TIME_OUT = 1500;

function SearchMenu() {
  const navigate = useNavigate();
  const onMenuClick = (item: { key: string }) => navigate(`/${item.key}`);
  const [isFocus, setIsFocus] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const [searchText, setSearchText] = useState('');

  const searchedProducts = useSelector(
    (state: RootState) => state.product.searchProducts,
  );

  const searchGame = async (): Promise<void> => {
    await store.dispatch(fetchSearchProducts(searchText));
  };

  const handleChangeText = (text: string) => {
    setSearchText(text);
  };

  function useDebounce(
    effect: () => void,
    dependencies: DependencyList,
    delay: number,
  ) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const callback = useCallback(effect, dependencies);

    useEffect(() => {
      const timeout = setTimeout(callback, delay);
      return () => clearTimeout(timeout);
    }, [callback, delay]);
  }

  useDebounce(
    () => {
      if (searchText === '') return;
      searchGame();
    },
    [searchText],
    TIME_OUT,
  );

  const focusHandler = () => {
    setIsFocus(true);
    setIsBlur(false);
  };

  const blurHandler = () => {
    if (searchText === '') {
      setIsFocus(false);
      return;
    }
    setTimeout(() => {
      setIsFocus(false);
      setIsBlur(true);
    }, 250);
  };

  return (
    <div className={styles.searchMenu}>
      <div className={styles.searchContainer}>
        <div className={styles.searchController}>
          <Search
            placeholder="input game title"
            allowClear
            onSearch={searchGame}
            onChange={(e) => {
              handleChangeText(e.target.value);
            }}
            style={{ width: 200 }}
            onFocus={focusHandler}
            onBlur={blurHandler}
            value={searchText}
          />
          {isFocus && searchText !== '' && (
            <div className={styles.popoverContainer}>
              <PopoverCards products={searchedProducts} />
            </div>
          )}
          {isBlur && <div className={styles.popoverContainer} />}
          <Menu
            className={styles.searchNavMenu}
            onClick={onMenuClick}
            theme="light"
            mode="horizontal"
            items={[
              {
                label: 'STORE',
                key: '',
              },
              {
                label: 'ALL GAMES',
                key: 'catalog',
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchMenu;
