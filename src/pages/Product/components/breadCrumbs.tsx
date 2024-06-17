import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setSelectedFilters } from '../../../redux/slice/productSlice';

import IProduct from '../../../types/IProduct';
import { IFilters } from '../../../types/storeType';
import { IBreadcrumb } from '../../../types/types';

import styles from '../product.module.css';

interface IProps {
  productDataStatePath: IProduct;
}

function BreadCrumbs({ productDataStatePath }: IProps) {
  const { gameTheme, gameGenre, gameTitle } = productDataStatePath;
  const dispatch = useDispatch();

  const breadCrumbs: IBreadcrumb[] = [
    {
      key: 'all games',
      name: 'ALL GAMES',
      path: '/catalog',
      filters: {
        genresFilter: [],
        themesFilter: [],
      }
    },
    {
      key: 'genre',
      name: `${gameGenre[0]}`,
      path: '/catalog',
      filters: {
        genresFilter: [`${gameGenre[0]}`],
      },
    },
    {
      key: 'theme',
      name: `${gameTheme[0]}`,
      path: '/catalog',
      filters: {
        genresFilter: [`${gameGenre[0]}`],
        themesFilter: [`${gameTheme[0]}`],
      },
    },
    {
      key: 'title',
      name: `${gameTitle}`,
    },
  ];

  return (
    <div className={styles.pathCont}>
      {breadCrumbs.map(({ name, path, filters, key }: IBreadcrumb) => (
        <span className={styles.pathAllGames} key={key}>
          {path ? (
            <Link
              to={path}
              className={styles.pathLink}
              onClick={() => {
                if (!filters) return;
                const { genresFilter, themesFilter } = filters;
                dispatch(
                  setSelectedFilters({
                    genres: genresFilter,
                    themes: themesFilter,
                  } as IFilters),
                );
              }}
            >
              {name} &gt;
            </Link>
          ) : (
            <span className={styles.pathGameTitle}>{name}</span>
          )}
        </span>
      ))}
    </div>
  );
}

export default BreadCrumbs;
