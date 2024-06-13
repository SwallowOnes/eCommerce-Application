import { Carousel, Image } from 'antd';
import {
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';

import IProduct from '../../../types/IProduct';
import styles from '../product.module.css';

interface ImgCarouselProps {
  productData: IProduct;
}

function ImgCarousel({ productData }: ImgCarouselProps) {
  const { screenshotList } = productData;
  const slicedScreenshotList = screenshotList.slice(0, 7);

  return (
    <div className={styles.headerBlockContLeft}>
      <Image.PreviewGroup
        preview={{
          minScale: 1,
          maxScale: 50,
          movable: false,
          rootClassName: `${styles.tolbarCustom}`,
          // // eslint-disable-next-line react/no-unstable-nested-components
          // countRender:(current: number, total: number) => (
          //     <div className={styles.imgCarouselCounter}>
          //       <span>{current}</span>
          //       <span>/</span>
          //       <span>{total}</span>
          //       <span>screenshots</span>
          //     </div>
          // ),
          // eslint-disable-next-line react/no-unstable-nested-components
          toolbarRender: (_, { transform: { scale }, actions: { onZoomOut, onZoomIn } }) => (
            <div className={styles.tolbarCustom}>
              <div className={styles.zoomOut}>
                <ZoomOutOutlined disabled={scale === 1} className={styles.iconsCont} onClick={onZoomOut} />
              </div>
              <div className={styles.zoomIn}>
                <ZoomInOutlined disabled={scale > 5} className={styles.iconsCont} onClick={onZoomIn} />
              </div>
            </div>
          ),
        }}
      >
        <Carousel
          className={styles.imgCarousel}
          infinite={false}
          dots={{ className: styles.carouselDots }}
          autoplay
        >
          {slicedScreenshotList.map((imageUrl) => (
            <div className={styles.imgCarouselCont} key={imageUrl}>
              <div className={styles.centerVertically}>
                <Image
                  placeholder
                  src={imageUrl}
                  alt=""
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          ))}
        </Carousel>
      </Image.PreviewGroup>
    </div>
  );
}

export default ImgCarousel;
