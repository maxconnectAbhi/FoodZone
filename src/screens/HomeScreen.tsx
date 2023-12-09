// HomeScreen.tsx
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import RestaurantCard from './components/RestaurantCard';
import { restaurants } from './components/RestaurantData';

const HomeScreen: React.FC = () => {
    return (
        <ScrollView style={styles.container}>
            {restaurants.map((restaurant: any) => (
                <RestaurantCard key={restaurant.id} {...restaurant} />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
});

export default HomeScreen;
