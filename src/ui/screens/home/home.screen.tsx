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

type SortType = 'initial' | 'rating_asc' | 'rating_desc' | 'price_asc' | 'price_desc';

const SortType = {
  initial: 'initial' as SortType,
  rating_asc: 'rating_asc' as SortType,
  rating_desc: 'rating_desc' as SortType,
  price_asc: 'price_asc' as SortType,
  price_desc: 'price_desc' as SortType,
};

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

  // Callback per gestire il cambio di ordinamento
  const onSortChange = useCallback(
    (type: SortType) => {
      setSortType(type);
      let sortValue: "rating_asc" | "rating_desc" | "price_asc" | "price_desc" | null = null;
      if (type === SortType.rating_asc) sortValue = "rating_asc";
      if (type === SortType.rating_desc) sortValue = "rating_desc";
      if (type === SortType.price_asc) sortValue = "price_asc";
      if (type === SortType.price_desc) sortValue = "price_desc";
      filterProducts(selectedCategory, sortValue);
    },
    [selectedCategory, filterProducts]
  );

  // Callback per gestire il cambio di categoria
  const onCategoryChange = useCallback(
    (category: string | null) => {
      setSelectedCategory(category);
      let sortValue: "rating_asc" | "rating_desc" | "price_asc" | "price_desc" | null = null;
      if (sortType === SortType.rating_asc) sortValue = "rating_asc";
      if (sortType === SortType.rating_desc) sortValue = "rating_desc";
      if (sortType === SortType.price_asc) sortValue = "price_asc";
      if (sortType === SortType.price_desc) sortValue = "price_desc";
      filterProducts(category, sortValue);
    },
    [sortType, filterProducts]
  );

  // Render dei filtri con picker di categoria e bottoni di ordinamento
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
          {/* Bottoni per ordinamento per rating */}
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

          {/* Bottoni per ordinamento per prezzo */}
          <Button onPress={() => onSortChange(SortType.price_desc)}>
            <Ionicons
              name={'arrow-up'}
              size={24}
              color={sortType === SortType.price_desc ? 'green' : '#ffffff'}
            />
          </Button>
          <Button onPress={() => onSortChange(SortType.price_asc)}>
            <Ionicons
              name={'arrow-down'}
              size={24}
              color={sortType === SortType.price_asc ? 'green' : '#ffffff'}
            />
          </Button>

          {/* Bottone per ripristinare l'ordinamento iniziale */}
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

  // Render del singolo item della lista
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
        title={''} 
        subTitle={''} 
        description={''} 
        image={{ uri: '' }} 
        backgroundColor={''} 
        bottomContent={undefined}
      />
    ),
    [favoriteIds, products, navigation, toggleFavorite]
  );

  // Componente separatore tra gli item
  const ItemSeparatorComponent = useCallback(() => <View style={styles.itemSeparator} />, []);

  // Effect per aggiornare i prodotti quando la schermata riceve focus
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