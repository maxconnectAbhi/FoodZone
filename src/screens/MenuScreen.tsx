// MenuScreen.tsx
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Checkbox, List } from 'react-native-paper';

interface MenuItem {
  id: number;
  name: string;
  price: number;
}

interface MenuScreenProps {
  menuData: { [cuisine: string]: MenuItem[] };
  onClose: () => void;
}

const MenuScreen: React.FC<MenuScreenProps> = ({ menuData, onClose }) => {
  const navigation = useNavigation<any>()
  const [cart, setCart] = useState<MenuItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const toggleItemSelection = (itemId: number) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
      setCart(cart.filter((item) => item.id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
      const selectedItem = Object.values(menuData).flat().find(item => item.id === itemId);
      if (selectedItem) {
        setCart([...cart, selectedItem]);
      }
    }
  };


  const isItemSelected = (itemId: number): boolean => {
    return selectedItems.includes(itemId);
  };

  return (
    <ScrollView style={styles.container}>
       {Object.entries(menuData).map(([cuisine, items]) => (
        <View key={cuisine}>
          <Text style={styles.cuisineHeading}>{cuisine}</Text>
          <List.Section>
            {items.map((item) => (
              <List.Item
                key={item.id}
                title={item.name}
                description={item.price}
                left={() => (
                  <Image 
                    style={styles.checkbox}
                    source={isItemSelected(item.id) ? require('../assets/checkmark.png') : require('../assets/unchecked.png')}
                  />
                )}
                onPress={() => toggleItemSelection(item.id)}
              />
            ))}
          </List.Section>
        </View>
      ))}
      <TouchableOpacity style={styles.checkoutButton} onPress={()=> {onClose(), navigation.navigate("CheckOut",{cart})}}>
        <Text style={styles.checkoutText}>View Cart (₹ {cart.reduce((acc, item) => acc + Number(item.price), 0)})</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>Close Menu</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  cuisineHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  menuItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuItemName: {
    fontSize: 16,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  checkoutText: {
    color: 'white',
    fontSize: 18,
  },
  closeButton: {
    marginVertical: 15,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#555',
  },
  disabledItem: {
    backgroundColor: '#eee', // Change the background color for disabled items
  },
  disabledText: {
    color: '#aaa', // Change the text color for disabled items
  },
  checkbox: {
    height: 20,
    width: 20
  }
});

export default MenuScreen;
