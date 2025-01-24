import { useState, useCallback } from 'react';
import { PREFERRED_CARTS } from '../../../core/storage/types';
import { storage } from '../../../core/storage/storage';

interface Rating {
  rate: number;
  count: number;
}

interface Product {
  id: number;
  title: string;
  price: Rating;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [initialProducts, setInitialProducts] = useState<Product[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const refreshProducts = useCallback(async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setInitialProducts([...data]);
      setProducts([...data]);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []);

  const loadFavorites = useCallback(async () => {
    try {
      const storedFavorites = await storage.getItem(PREFERRED_CARTS);
      const parsedFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];
      setFavoriteIds(parsedFavorites);
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  }, []);

  const toggleFavorite = useCallback(
    async (product: Product) => {
      const updatedFavorites = favoriteIds.includes(product.id)
        ? favoriteIds.filter((id) => id !== product.id)
        : [...favoriteIds, product.id];

      setFavoriteIds(updatedFavorites);
      await storage.setItem(PREFERRED_CARTS, JSON.stringify(updatedFavorites));
    },
    [favoriteIds]
  );

  const filterProducts = useCallback(
    (category: string | null, sortBy: 'rating_asc' | 'rating_desc' | null) => {
      let filteredProducts = [...initialProducts];

      // Apply category filter
      if (category) {
        filteredProducts = filteredProducts.filter(
          product => product.category === category
        );
      }

      // Apply rating sort
      if (sortBy) {
        filteredProducts.sort((a, b) => {
          if (sortBy === 'rating_asc') {
            return a.rating.rate - b.rating.rate;
          }
          return b.rating.rate - a.rating.rate;
        });
      }

      setProducts(filteredProducts);
    },
    [initialProducts]
  );

  return {
    products,
    setProducts,
    initialProducts,
    setInitialProducts,
    favoriteIds,
    categories,
    refreshProducts,
    fetchCategories,
    loadFavorites,
    toggleFavorite,
    filterProducts,
  };
};