import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './productCard.styles';

interface Props {
  title: string;
  subTitle: string; // Add this line
  description: string;
  image: { uri: string };
  backgroundColor: string;
  bottomContent: React.ReactNode;
  product: {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
  };
  isFavorite: boolean;
  onPress?: () => void;
  onFavoritePress?: () => void;
}

export const ProductCard = ({ product, isFavorite, onPress, onFavoritePress }: Props) => {
  const [loading, setLoading] = useState(false);

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}>
      {/* IMAGE */}
      <View style={styles.containerImage}>
        {loading && (
          <ActivityIndicator size="small" color="#000" style={styles.imageLoader} />
        )}
        <Image
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* CONTENT */}
      <View style={styles.containerContent}>
        {/* DESCRIPTION */}
        <View style={styles.containerDescription}>
          <Text style={styles.title} numberOfLines={2}>
            {product.title}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {product.description}
          </Text>
        </View>

        {/* PRICE AND RATING */}
        <View style={styles.containerFooter}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.rating}>
                {product.rating.rate} ({product.rating.count})
              </Text>
            </View>
          </View>

          {/* FAVORITE BUTTON */}
          {onFavoritePress && (
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={onFavoritePress}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={24}
                color={isFavorite ? '#FF4444' : '#666'}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};