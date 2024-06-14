import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'antd';

import store, { RootState } from '../../../redux/store';
import {
  addItemToBasket,
  removeItemFromBasket,
  getBasketItems,
} from '../../../redux/slice/basketSlice';
import IProduct from '../../../types/IProduct';

import styles from '../product.module.css';
import GetDiscount from '../../../components/shared/getDiscount';
import RandomCards from './randomCarts';

interface SystemRequirements {
  [key: string]: string;
}

interface ReqTableProps {
  sysRequirementsMinimum?: SystemRequirements;
  sysRequirementsMinimumFill?: SystemRequirements;
  sysRequirementsRecommended?: SystemRequirements;
}

function MainLeft(props: {
  productData: IProduct;
  productRandom: IProduct[];
  randPordNum: number;
  currentProdTitle: string;
}) {
  const { productData, productRandom, randPordNum, currentProdTitle } = props;
  const { gameTitle, price, discountPrice, descriptionLong } = productData;
  const [needToAdd, setNeedToAdd] = useState(false);
  const [needToDelete, setNeedToDelete] = useState(false);

  const isLoadingBasketState = useSelector(
    (state: RootState) => state.basket.isLoading,
  );
  const isAuthLoadingState = useSelector(
    (state: RootState) => state.auth.isLoading,
  );
  const basketIdState = useSelector(
    (state: RootState) => state.basket.basketId,
  );
  const itemsGameNameState = useSelector(
    (state: RootState) => state.basket.itemsGameName,
  );

  useEffect(() => {
    if (basketIdState !== '' && needToDelete) {
      const deleteRequest = async () => {
        await store.dispatch(
          removeItemFromBasket({ basketId: basketIdState, gameTitle }),
        );
        await store.dispatch(getBasketItems(basketIdState));
      };
      deleteRequest();
      setNeedToDelete(false);
    }
  }, [basketIdState, needToDelete, gameTitle]);

  useEffect(() => {
    if (basketIdState !== '' && needToAdd) {
      const addRequest = async () => {
        await store.dispatch(
          addItemToBasket({ basketId: basketIdState, gameTitle }),
        );
        await store.dispatch(getBasketItems(basketIdState));
      };
      addRequest();
      setNeedToAdd(false);
    }
  }, [basketIdState, needToAdd, gameTitle]);

  const cartButton = () => {
    if (itemsGameNameState.includes(gameTitle)) {
      setNeedToDelete(true);
      return;
    }
    setNeedToAdd(true);
  };

  const priceButton = (
    priceForBlock: number,
    discountPriceForBlock: number | null,
  ) => (
    <div className={styles.priceSection}>
      {discountPriceForBlock ? (
        <div className={styles.dicountPriceCont}>
          <div className={styles.discountSize}>
            {`-${((1 - discountPriceForBlock / priceForBlock) * 100).toFixed(
              0,
            )}%`}
          </div>
          <GetDiscount priceDesc={price} discountPriceDesc={discountPrice} />
        </div>
      ) : (
        <div className={styles.regPriceText}>
          {`${Number(priceForBlock).toFixed(2)} €`}
        </div>
      )}
      <Button
        type="primary"
        disabled={isAuthLoadingState || isLoadingBasketState}
        onClick={() => cartButton()}
      >
        {(itemsGameNameState || []).includes(gameTitle)
          ? 'Remove from Cart'
          : 'Add to Cart'}
      </Button>
    </div>
  );

  const paragraphs = descriptionLong.map((paragraph, index) => {
    const paragraphKey = `paragraph_${index}`;
    return (
      <p className={styles.aboutText} key={paragraphKey}>
        {paragraph.trim()}
      </p>
    );
  });

  const reqTable: React.FC<ReqTableProps> = ({
    sysRequirementsMinimum,
    sysRequirementsMinimumFill,
    sysRequirementsRecommended,
  }) => {
    if (sysRequirementsMinimumFill) {
      return (
        <div className={styles.minFull}>
          <p className={styles.reqNameForCont}>MINIMUM:</p>
          {Object.entries(sysRequirementsMinimumFill).map(([key, value]) => (
            <div key={key} className={styles.reqRow}>
              <p className={styles.reqText}>
                <span className={styles.reqName}>
                  {value === 'undefined' ? `${key}` : `${key}:`}
                </span>
                {value === 'undefined' ? '' : value}
              </p>
            </div>
          ))}
        </div>
      );
    }
    if (sysRequirementsMinimum && sysRequirementsRecommended) {
      return (
        <div className={styles.reqMinAndRec}>
          <div className={styles.reqMin}>
            <p className={styles.reqNameForCont}>MINIMUM:</p>
            {Object.entries(sysRequirementsMinimum).map(([key, value]) => (
              <div key={key} className={styles.reqRow}>
                <p className={styles.reqText}>
                  <span className={styles.reqName}>
                    {value === 'undefined' ? `${key}` : `${key}:`}
                  </span>
                  {value === 'undefined' ? '' : value}
                </p>
              </div>
            ))}
          </div>
          <div className={styles.reqRec}>
            <p className={styles.reqNameForCont}> RECOMMENDED:</p>
            {Object.entries(sysRequirementsRecommended).map(([key, value]) => (
              <div key={key} className={styles.reqRow}>
                <p className={styles.reqText}>
                  <span className={styles.reqName}>
                    {value === 'undefined' ? `${key}` : `${key}:`}
                  </span>
                  {value === 'undefined' ? '' : value}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={styles.mainLeft}>
      <div className={styles.priceCont}>
        {`Buy ${gameTitle}`}
        <div className={styles.mainPriceCont}>
          {priceButton(price, discountPrice)}
        </div>
      </div>
      <div className={styles.aboutGame}>
        <p className={styles.aboutGameTitle}>ABOUT THIS GAME</p>
        {paragraphs}
      </div>
      <div className={styles.sysReq}>
        <p className={styles.sysReqTitle}>SYSTEM REQUIREMENTS</p>
        {reqTable(productData)}
      </div>
      <div className={styles.aboutGame}>
        <p className={styles.aboutGameTitle}>YOU MAY ALSO LIKE:</p>
      </div>
      <div className={styles.randProductsCont}>
        {productRandom?.length ? (
          <RandomCards products={productRandom} randomCards={randPordNum} currentProd={currentProdTitle} />
        ) : null}
      </div>
    </div>
  );
}

export default MainLeft;
