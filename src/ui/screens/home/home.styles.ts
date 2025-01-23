import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#121212', // Dark background
  },
  itemSeparator: {
    height: 16,
  },
  filtersContainer: {
    marginBottom: 16,
  },
  categoryPicker: {
    backgroundColor: '#1E1E1E', // Dark background for picker
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#333333', // Subtle border for definition
  },
  picker: {
    height: 50,
    color: '#FFFFFF', // White text for picker
  },
  sortButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
});