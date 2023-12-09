import React, { useState } from 'react';
import { Text, View, Button, StyleSheet, Image, Modal } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import MenuScreen from '../MenuScreen';

interface MenuItem {
  id: number;
  name: string;
  price: number;
}

interface RestaurantCardProps {
  name: string;
  rating: number;
  distance: string;
  imageUri: string;
  cuisine: string;
  openingHours: string;
  description: string;
  menuData: { [cuisine: string]: MenuItem[] };
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  name,
  rating,
  distance,
  imageUri,
  cuisine,
  openingHours,
  description,
  menuData,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const renderStars = () => {
    const starImages = [];
    const roundedRating = Math.round(rating);

    for (let i = 1; i <= 5; i++) {
      starImages.push(
        <Image
          key={i}
          source={
            i <= roundedRating
              ? require('../../assets/star_filled.png')
              : require('../../assets/star_corner.png')
          }
          style={styles.starImage}
        />
      );
    }

    return starImages;
  };

  return (
    <View>
      <Card style={styles.card}>
        <Card.Cover source={{ uri: imageUri }} style={styles.image} />
        <Card.Content style={styles.cardContent}>
          <View style={styles.header}>
            <Title style={styles.name}>{name}</Title>
            <Text style={styles.distance}>{distance}</Text>
          </View>
          <Paragraph>{description}</Paragraph>
          <Paragraph style={styles.boldText}>Cuisine: {cuisine}</Paragraph>
          <View style={styles.ratingContainer}>{renderStars()}</View>
          <Paragraph>Opening Hours: {openingHours}</Paragraph>
         
          <Button onPress={() => setModalVisible(true)} title="View Menu" />
        </Card.Content>
      </Card>

      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <MenuScreen menuData={menuData} onClose={() => setModalVisible(false)} />
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
  cardContent: {
    padding: 15,
  },
  image: {
    height: 150,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  distance: {
    color: '#555',
  },
  boldText: {
    fontWeight: 'bold',
  },
  ratingText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  starImage: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});

export default RestaurantCard;
