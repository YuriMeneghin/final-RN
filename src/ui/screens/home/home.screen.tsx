import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { styles } from './home.styles';
import { ProductCard } from '../../atoms/genericCard/productCard.atom';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainParamList, Screen } from '../../navigation/types';
import { useProducts } from '../hook/useProduct.facade';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../atoms/button/button.atom';
import { Picker } from '@react-native-picker/picker';

interface Props {
  navigation: NativeStackNavigationProp<MainParamList, Screen.Home>;
}

enum SortType {
  initial = 'initial',
  rating_asc = 'rating_asc',
  rating_desc = 'rating_desc',
}

const HomeScreen = ({ navigation }: Props) => {
  const {
    products,
    categories,
    favoriteIds,
    refreshProducts,
    fetchCategories,
    loadFavorites,
    toggleFavorite,
    filterProducts,
  } = useProducts();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortType, setSortType] = useState<SortType>(SortType.initial);

  // ** USE CALLBACK ** //
  const onSortChange = useCallback(
    (type: SortType) => {
      setSortType(type);
      filterProducts(selectedCategory, type === SortType.initial ? null : type);
    },
    [selectedCategory, filterProducts]
  );

  const onCategoryChange = useCallback(
    (category: string | null) => {
      setSelectedCategory(category);
      filterProducts(category, sortType === SortType.initial ? null : sortType);
    },
    [sortType, filterProducts]
  );

  const renderFilters = useCallback(() => {
    return (
      <View style={styles.filtersContainer}>
        <View style={styles.categoryPicker}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(value) => onCategoryChange(value)}
            style={styles.picker}>
            <Picker.Item label="All Categories" value={null} />
            {categories.map((category) => (
              <Picker.Item
                key={category}
                label={category}
                value={category}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.sortButtons}>
          <Button onPress={() => onSortChange(SortType.rating_desc)}>
            <Ionicons
              name={'star'}
              size={24}
              color={sortType === SortType.rating_desc ? 'green' : '#ffffff'}
            />
          </Button>
          <Button onPress={() => onSortChange(SortType.rating_asc)}>
            <Ionicons
              name={'star-outline'}
              size={24}
              color={sortType === SortType.rating_asc ? 'green' : '#ffffff'}
            />
          </Button>
          <Button
            onPress={() => onSortChange(SortType.initial)}
            disabled={sortType === SortType.initial}>
            <Ionicons
              name={'refresh'}
              size={24}
              color={sortType !== SortType.initial ? '#fff' : 'gray'}
            />
          </Button>
        </View>
      </View>
    );
  }, [categories, selectedCategory, sortType, onCategoryChange, onSortChange]);

  const renderItem = useCallback(
    ({ item }) => (
      <ProductCard
        product={item}
        isFavorite={favoriteIds.includes(item.id)}
        onFavoritePress={() => toggleFavorite(item)}
        onPress={() => {
          navigation.navigate(Screen.Detail, {
            product: item,
            productsIds: products.map((p) => p.id),
          });
        }}
      />
    ),
    [favoriteIds, products, navigation, toggleFavorite]
  );

  const ItemSeparatorComponent = useCallback(() => <View style={styles.itemSeparator} />, []);

  // ** USE EFFECT ** //
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refreshProducts();
      fetchCategories();
      loadFavorites();
    });

    return unsubscribe;
  }, [navigation, refreshProducts, fetchCategories, loadFavorites]);

  return (
    <View style={styles.container}>
      {renderFilters()}

      <FlatList
        showsVerticalScrollIndicator={false}
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </View>
  );
};

export default HomeScreen;