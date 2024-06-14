import { useEffect, useLayoutEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { message } from 'antd';

import { useSelector, useDispatch } from 'react-redux';
import {
  fetchProductData,
  fetchRandProducts,
} from '../../redux/slice/productSlice';
import store, { RootState } from '../../redux/store';


import SkeletonLoading from './components/skeletonLoading';
import ImgCarousel from './components/imgCarousel';
import HeaderRight from './components/headerRight';
import MainLeft from './components/mainLeft';
import MainRight from './components/mainRight';


import styles from './product.module.css';
import BreadCrumbs from './components/breadCrumbs';

const RANDOM_PRODUCT_REQUEST = 5;

const calculateNewRandomProductsNum = () => {
  const windowInnerWidth = window.innerWidth;
  let cardNumber = 1;
  if (windowInnerWidth > 912) {
    cardNumber = 4;
  } else if (windowInnerWidth > 692) {
    cardNumber = 3;
  } else if (windowInnerWidth > 472) {
    cardNumber = 2;
  }
  return cardNumber;
};

function Product() {
  const { productTitle } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [titleForRequest, setTitleForRequest] = useState('');
  const [randomProductsNum, setRandomProductsNum] = useState(
    calculateNewRandomProductsNum(),
  );

  useEffect(() => {
    const handleResize = () => {
      const newRandomProductsNum = calculateNewRandomProductsNum();
      if (newRandomProductsNum !== randomProductsNum) {
        setRandomProductsNum(newRandomProductsNum);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [randomProductsNum]);

  const productLoading = useSelector(
    (state: RootState) => state.product.isLoading,
  );
  const productRandomLoading = useSelector(
    (state: RootState) => state.product.isLoadingRandom,
  );

  const productDataState = useSelector(
    (state: RootState) => state.product.productData,
  );
  const productsRandomState = useSelector(
    (state: RootState) => state.product.randomProductsData,
  );

  const productErrorState = useSelector(
    (state: RootState) => state.product.errorProduct,
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (titleForRequest !== productTitle) {
      const fetchProduct = async () => {
        await store.dispatch(fetchProductData(productTitle || ''));
      };

      const fetchProducts = async () => {
        await store.dispatch(fetchRandProducts(RANDOM_PRODUCT_REQUEST));
      };

      fetchProduct();
      fetchProducts();
      setTitleForRequest(productTitle || '');
    }
  }, [dispatch, productTitle, titleForRequest]);

  useLayoutEffect(() => {
    if (productErrorState) {
      message.error(productErrorState);
      navigate('/notFound');
    }
  }, [productErrorState, navigate]);

  if (productLoading || productRandomLoading) {
    return <SkeletonLoading />;
  }

  const url = `${productDataState.headerImg}`.split('/');
  const suffix = url.pop();
  const gameId = url.pop();
  const baseURL = url.join('/');
  const bgSuffix = `page_bg_generated_v6b.jpg?=${suffix}`;
  const bgImage = `${baseURL}/${gameId}/${bgSuffix}`;

  return (
    <div
      className={styles.productBackground}
      style={{
        backgroundImage: `
        linear-gradient(90deg, var(--gpStoreDarkGrey) 0%, var(--color-gradient-second) 10%,
        var(--color-gradient-second) 90%, var(--gpStoreDarkGrey) 100%),
        linear-gradient(180deg, var(--gpStoreDarkGrey) 0%, var(--color-gradient-second) 20%,
        var(--color-gradient-second) 90%, var(--gpStoreDarkGrey) 100%),
         url(${bgImage})`,
      }}
    >
      <div className={styles.productCont}>
        <div className={styles.productTitleCont}>
          <div className={styles.productPath}>
            {productDataState.gameTitle &&
              productDataState.gameTheme &&
              productDataState.gameGenre && (
              <BreadCrumbs productDataStatePath={productDataState} />
            )}
          </div>
          <h1 className={styles.productTitle}>{productDataState.gameTitle}</h1>
        </div>
        <div className={styles.headerBlockCont}>
          {productDataState.screenshotList && (
            <ImgCarousel productData={productDataState} />
          )}
          {productDataState.headerImg &&
            productDataState.descriptionShort &&
            productDataState.userReviewRows &&
            productDataState.releaseDate &&
            productDataState.devCompany && (
              <HeaderRight productData={productDataState} />
            )}
        </div>
        <div className={styles.mainCont}>
          {productDataState.price &&
            productDataState.descriptionLong &&
            (productDataState.sysRequirementsMinimum ||
              productDataState.sysRequirementsMinimumFill) && (
              <MainLeft
                productData={productDataState}
                productRandom={productsRandomState}
                randPordNum={randomProductsNum}
                currentProdTitle={productDataState.gameTitle}
              />
            )}
          {productDataState.category &&
            productDataState.gameTitle &&
            productDataState.gameGenre &&
            productDataState.gameTheme &&
            productDataState.devCompany && (
              <MainRight productData={productDataState} />
            )}
        </div>
      </div>
    </div>
  );
}

export default Product;
