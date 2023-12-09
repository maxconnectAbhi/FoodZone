import React from 'react';
import { View, Text, StyleSheet, Button, FlatList, Alert } from 'react-native';

interface CheckoutScreenProps {
    route: any;
    navigation: any;
}

const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ route, navigation }) => {
    const cart = route.params?.cart;

  const calculateTotalPrice = () => {
    return cart.reduce((total: string, item: any) => total + parseFloat(item.price.replace('₹', '')), 0).toFixed(2);
  };

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Text>{item.name}</Text>
                <Text>{item.price}</Text>
              </View>
            )}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total:</Text>
            <Text style={styles.totalAmount}>₹ {calculateTotalPrice()}</Text>
          </View>
          <Button title="Proceed to Payment" onPress={() => Alert.alert('Payment functionality goes here!')} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 18,
  },
});

export default CheckoutScreen;
