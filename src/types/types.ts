import { CheckBoxType } from './storeType';

type LoginFormValues = {
  email: string;
  password: string;
};

type CatalogOptionsType = {
  pageNumber: number;
  pageLimit: number;
  sortColumn: string;
  sortDirection: string;
  tags: CheckBoxType[];
  themes: CheckBoxType[];
  genres: CheckBoxType[];
  minPrice: number;
  maxPrice: number;
};

interface ChangeQuantityItem {
  [key: string]: number;
}

interface IBreadcrumb {
  key: string;
  name: string;
  path?: string;
  filters?: {
    genresFilter?: string[];
    themesFilter?: string[];
  };
}
interface ChangeQuantity {
  itemUpdates: ChangeQuantityItem;
}

export type {
  CatalogOptionsType,
  ChangeQuantity,
  ChangeQuantityItem,
  IBreadcrumb,
};
export default LoginFormValues;
