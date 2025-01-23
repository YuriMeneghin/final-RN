import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { 
  FlatList, 
  ListRenderItem, 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainParamList, Screen } from '../../navigation/types';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useProducts } from '../hook/useProduct.facade';
import { styles } from './detail.styles';

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
  const { product, productsIds } = route.params;
  const { toggleFavorite, favoriteIds } = useProducts();
  
  const currentIndex = useMemo(() => 
    productsIds.indexOf(product.id), 
    [product.id, productsIds]
  );

  const backIconColor = useMemo(
    () => (currentIndex > 0 ? '#616b79' : '#cccccc'),
    [currentIndex]
  );
  const forwardIconColor = useMemo(
    () => (currentIndex < productsIds.length - 1 ? '#616b79' : '#cccccc'),
    [currentIndex, productsIds.length]
  );

  const handleBack = useCallback(() => {
    const prevId = productsIds[currentIndex - 1];
    if (prevId) {
      navigation.setParams({ 
        product: {
          id: prevId,
          title: '',
          price: 0,
          description: '',
          category: '',
          image: '',
          rating: {
            rate: 0,
            count: 0
          }
        }, 
        productsIds 
      });
    }
  }, [currentIndex, productsIds, navigation]);

  const handleNext = useCallback(() => {
    const nextId = productsIds[currentIndex + 1];
    if (nextId) {
      navigation.setParams({ 
        product: {
          id: nextId,
          title: '',
          price: 0,
          description: '',
          category: '',
          image: '',
          rating: {
            rate: 0,
            count: 0
          }
        }, 
        productsIds 
      });
    }
  }, [currentIndex, productsIds, navigation]);

  const handleFavorite = useCallback(() => {
    toggleFavorite(product);
  }, [product, toggleFavorite]);

  return (
    <ScrollView 
      style={[styles.container, { marginTop: top, marginBottom: bottom }]}
      contentContainerStyle={styles.scrollContainer}
    >
      <View style={styles.navigatorContainer}>
        <Ionicons
          name={'chevron-back-circle'}
          size={36}
          onPress={handleBack}
          color={backIconColor}
        />
        <TouchableOpacity onPress={handleFavorite}>
          <Ionicons
            name={favoriteIds.includes(product.id) ? 'heart' : 'heart-outline'}
            size={36}
            color={favoriteIds.includes(product.id) ? 'red' : '#616b79'}
          />
        </TouchableOpacity>
        <Ionicons
          name={'chevron-forward-circle'}
          size={36}
          onPress={handleNext}
          color={forwardIconColor}
        />
      </View>

      <View style={styles.detailItem}>
        <Image 
          source={{ uri: product.image }} 
          style={styles.productImage} 
          resizeMode="contain"
        />
        
        <View style={styles.productDetails}>
          <Text style={styles.titleText}>{product.title}</Text>
          <Text style={styles.priceText}>${product.price.toFixed(2)}</Text>
          
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#ffd700" />
            <Text style={styles.ratingText}>
              {product.rating.rate}/5 ({product.rating.count} reviews)
            </Text>
          </View>
          
          <Text style={styles.categoryText}>
            Category: {product.category}
          </Text>
          
          <Text style={styles.descriptionText}>
            {product.description}
          </Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Back to List</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DetailScreen;