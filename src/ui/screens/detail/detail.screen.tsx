import { FlatList, ListRenderItem, View, Text } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainParamList, Screen } from '../../navigation/types';
import { RouteProp } from '@react-navigation/native';
import { ProductCard } from '../../atoms/genericCard/productCard.atom';
import { styles } from './detail.styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../atoms/button/button.atom';

interface Product {
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

interface Props {
  navigation: NativeStackNavigationProp<MainParamList, Screen.Detail>;
  route: RouteProp<MainParamList, Screen.Detail>;
}

const DetailScreen = ({ navigation, route }: Props) => {
  const { top, bottom } = useSafeAreaInsets();
  const { id, idsArray } = route.params;
  const [product, setProduct] = useState<Product | null>(null);

  const currentIndex = useMemo(() => idsArray.indexOf(id), [id, idsArray]);

  const backIconColor = useMemo(
    () => (currentIndex > 0 ? '#616b79' : '#cccccc'),
    [currentIndex]
  );
  const forwardIconColor = useMemo(
    () => (currentIndex < idsArray.length - 1 ? '#616b79' : '#cccccc'),
    [currentIndex, idsArray.length]
  );

  // ** CALLBACKS ** //
  const handleBack = useCallback(() => {
    const nextId = idsArray[currentIndex - 1];
    if (!nextId) {
      return;
    }
    navigation.setParams({ id: nextId });
  }, [currentIndex, idsArray, navigation]);

  const handleNext = useCallback(() => {
    const nextId = idsArray[currentIndex + 1];
    if (!nextId) {
      return;
    }
    navigation.setParams({ id: nextId });
  }, [currentIndex, idsArray, navigation]);

  // ** USE EFFECTS ** //
  useEffect(() => {
    fetch('https://fakestoreapi.com/products/' + id)
      .then((res) => res.json())
      .then(setProduct);
  }, [id]);

  // ** UI **//
  const renderDetailItem = useCallback<ListRenderItem<Product>>(
    ({ item }) => {
      return (
        <View style={styles.detailItem}>
          <View style={styles.productContainer}>
            <ProductCard
              title={item.title}
              subTitle={`$${item.price}`}
              description={item.description}
              image={{ uri: item.image }}
              backgroundColor={'#2e67bd'}
              bottomContent={
                <View>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color="#ffd700" />
                    <Text style={styles.ratingText}>
                      {item.rating.rate} ({item.rating.count} reviews)
                    </Text>
                  </View>
                  <Text style={styles.categoryText}>
                    Category: {item.category}
                  </Text>
                </View>
              }
              product={item}
              isFavorite={false}
            />
          </View>
        </View>
      );
    },
    []
  );

  const ItemSeparatorComponent = useCallback(
    () => <View style={styles.itemSeparator}></View>,
    []
  );

  return (
    <View style={[styles.container, { marginTop: top, marginBottom: bottom }]}>
      <View style={styles.navigatorContainer}>
        <Ionicons
          name={'chevron-back-circle'}
          size={24}
          onPress={handleBack}
          color={backIconColor}
        />
        <Ionicons
          name={'chevron-forward-circle'}
          size={24}
          onPress={handleNext}
          color={forwardIconColor}
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={product ? [product] : []}
        renderItem={renderDetailItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
      <Button title={'Torna indietro'} onPress={navigation.goBack}>
        <Text>Torna indietro</Text>
      </Button>
    </View>
  );
};

export default DetailScreen;