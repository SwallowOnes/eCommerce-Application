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
      name: 'ALL GAMES',
      path: '/catalog',
    },
    {
      name: `${gameGenre[0]}`,
      path: '/catalog',
      filters: {
        genresFilter: [`${gameGenre[0]}`],
        themesFilter: [],
      },
    },
    {
      name: `${gameTheme[0]}`,
      path: '/catalog',
      filters: {
        genresFilter: [`${gameGenre[0]}`],
        themesFilter: [`${gameTheme[0]}`],
      },
    },
    {
      name: `${gameTitle}`,
    },
  ];

  return (
    <div className={styles.pathCont}>
      {breadCrumbs.map(({ name, path, filters }: IBreadcrumb) => (
        <p className={styles.pathAllGames} key={name}>
          {path ? (
            <Link
              to={path}
              className={styles.pathLink}
              onClick={() => {
                if (filters) {
                  const { genresFilter, themesFilter } = filters;
                  dispatch(
                    setSelectedFilters({
                      genres: genresFilter,
                      themes: themesFilter,
                      tags: [],
                      minPrice: 0,
                      maxPrice: 60,
                    } as IFilters),
                  );
                }
              }}
            >
              {name} &gt;
            </Link>
          ) : (
            <p className={styles.pathGameTitle}>{name}</p>
          )}
        </p>
      ))}
    </div>
  );
}

export default BreadCrumbs;
