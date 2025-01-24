import { StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000000', 
  },
  itemSeparator: {
    height: 16,
  },
  filtersContainer: {
    marginBottom: 16,
  },
  categoryPicker: {
    backgroundColor: '#1E1E1E', 
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
    borderColor: '#FF1493', 
  },
  picker: {
    height: 55,
    color: '#FFFFFF', 
  },
  sortButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});