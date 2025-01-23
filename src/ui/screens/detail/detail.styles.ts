import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  navigatorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailItem: {
    backgroundColor: '#1E1E1E', // Dark card background
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
    overflow: 'hidden',
  },
  productImage: {
    width: width - 32,
    height: 300,
    alignSelf: 'center',
    marginBottom: 16,
  },
  productDetails: {
    padding: 16,
  },
  titleText: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    color: '#E0E0E0', // Soft white for titles
  },
  priceText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4CAF50', // Mantained green for contrast
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    marginLeft: 8,
    color: '#A0A0A0',
    fontSize: 14,
  },
  categoryText: {
    color: '#A0A0A0',
    fontSize: 14,
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    color: '#B0B0B0',
    lineHeight: 24,
  },
  backButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});