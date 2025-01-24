import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E', // Dark card background
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#FF1493',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  containerImage: {
    height: 200,
    backgroundColor: '#272727', // Slightly lighter for image container
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageLoader: {
    position: 'absolute',
  },
  containerContent: {
    padding: 16,
  },
  containerDescription: {
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E0E0E0', // Soft white for titles
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#A0A0A0', // Light gray for description
    lineHeight: 20,
  },
  containerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flex: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4CAF50', // Maintained green for contrast
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    color: '#A0A0A0',
  },
  favoriteButton: {
    padding: 4,
  },
});