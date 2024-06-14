import { Card, Image } from 'antd';
import { Link } from 'react-router-dom';
import IProduct from '../../../types/IProduct';

import styles from '../product.module.css';

function RandomCards(props: {
  products: IProduct[];
  randomCards: number;
  currentProd: string;
}) {
  const { products, randomCards, currentProd } = props;
  const getDescription = (
    priceDesc: number,
    discountPriceDesc: number | null,
  ) => {
    if (discountPriceDesc) {
      return (
        <div className={styles.discCardTwoPrice}>
          <div className={styles.discCardRegPrice}>
            {`${Number(priceDesc).toFixed(2)} €`}
          </div>
          <div className={styles.discCardDiscPrice}>
            {`${Number(discountPriceDesc).toFixed(2)} €`}
          </div>
        </div>
      );
    }
    return (
      <div className={styles.discCardOnePrice}>
        <div className={styles.discCardNormalPrice}>
          {`${Number(priceDesc).toFixed(2)} €`}
        </div>
      </div>
    );
  };

  const filtredProducts = products
    .filter((item) => item.gameTitle !== currentProd)
    .slice(0, randomCards);

  return filtredProducts.map((product: IProduct) => {
    const { gameTitle, price, discountPrice, headerImg } = product;
    // const randomIndex = Math.floor(Math.random() * screenshotList.length);
    return (
      <Link
        to={`/product/${gameTitle}`}
        key={gameTitle}
        className={styles.flexGrow1}
        style={{ minWidth: `calc(100%/ ${randomCards}` }}
      >
        <Card
          hoverable
          cover={
            <Image
              alt="example"
              height={90}
              src={headerImg}
              style={{ objectFit: 'cover' }}
              preview={false}
            />
          }
        >
          <Card.Meta
            className={styles.cardBottom}
            title={gameTitle}
            description={getDescription(price, discountPrice)}
          />
        </Card>
      </Link>
    );
  });
}

export default RandomCards;
