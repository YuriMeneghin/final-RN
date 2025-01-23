import React, { useCallback, useEffect, useMemo } from 'react';
import { FlatList, View, Text } from 'react-native';
import { styles } from './favorites.styles';
import { ProductCard } from '../../atoms/genericCard/productCard.atom';
import { useProducts } from '../hook/useProduct.facade';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainParamList, Screen, Product } from '../../navigation/types';

interface Props {
  navigation: NativeStackNavigationProp<MainParamList, Screen.Favorites>;
}

const FavoritesScreen = ({ navigation }: Props) => {
  const { 
    products, 
    favoriteIds, 
    refreshProducts, 
    loadFavorites, 
    toggleFavorite 
  } = useProducts();

  // **DATA ** //
  const favorites = useMemo(
    () => products.filter((product) => favoriteIds.includes(product.id)),
    [products, favoriteIds]
  );

  // ** CALLBACKS ** //
  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <ProductCard
        product={item}
        isFavorite={favoriteIds.includes(item.id)}
        onFavoritePress={() => toggleFavorite(item)}
        onPress={() => {
          navigation.navigate(Screen.Detail, {
            product: item,
            productsIds: favorites.map((p) => p.id),
          });
        } } title={''} subTitle={''} description={''} image={{
          uri: ''
        }} backgroundColor={''} bottomContent={undefined}      />
    ),
    [toggleFavorite, favoriteIds, favorites, navigation]
  );

  const ItemSeparatorComponent = useCallback(
    () => <View style={styles.itemSeparator}></View>, 
    []
  );

  // ** USE EFFECT ** //
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refreshProducts();
      loadFavorites();
    });

    return unsubscribe;
  }, [loadFavorites, navigation, refreshProducts]);

  return (
    <View style={styles.container}>
      {favorites.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={ItemSeparatorComponent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favorites yet</Text>
        </View>
      )}
    </View>
  );
};

export default FavoritesScreen;