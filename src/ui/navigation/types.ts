export enum Screen {
  TabNavigator = 'TabNavigator',
  Home = 'Home',
  Detail = 'Detail',
  Settings = 'Settings',
  Favorites = 'Favorites',
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  }
}

export type MainParamList = {
  [Screen.Home]: undefined;
  [Screen.Detail]: { 
    product: Product; 
    productsIds: number[];
  };
  [Screen.Favorites]: undefined;
};

export type TabParams = {

  [Screen.Home]: undefined;

  [Screen.Favorites]: undefined;

}