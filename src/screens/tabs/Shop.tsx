import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../../Context/CartContext'; // Import the useCart hook
import CartScreen from '../Shop/CartScreen';

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

const ShopScreen = () => {
    const navigation = useNavigation<any>();

  const { cart, addToCart } = useCart();

  const products: Product[] = [
    {
      id: '1',
      name: 'Sanitary Pads (Pack of 10)',
      price: 120,
      image: 'https://example.com/sanitary-pads.jpg',
    },
    {
      id: '2',
      name: 'Menstrual Cup (Medium)',
      price: 499,
      image: 'https://example.com/menstrual-cup.jpg',
    },
    {
      id: '3',
      name: 'Heating Pad (Electric)',
      price: 899,
      image: 'https://example.com/heating-pad.jpg',
    },
    {
      id: '4',
      name: 'Feminine Wipes (20 pcs)',
      price: 149,
      image: 'https://example.com/wipes.jpg',
    },
    {
      id: '5',
      name: 'Organic Tampons (Pack of 16)',
      price: 320,
      image: 'https://example.com/tampons.jpg',
    },
  ];

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.price}>₹{item.price}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => addToCart(item)}
      >
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Menstrual Care Products</Text>

      {/* Navigate to CartScreen */}
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => navigation.navigate('Cart')}
      >
       
        <Text style={styles.cartText}>Cart ({cart.length})</Text>
      </TouchableOpacity>

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', padding: 16, backgroundColor: '#f06292', color: '#fff' },
  cartButton: {
    padding: 10,
    backgroundColor: '#ec407a',
    borderRadius: 6,
    alignItems: 'center',
    margin: 10,
  }, list: {  // Add the list style here
    padding: 10,
  },
  cartText: { color: '#fff', fontSize: 16 },
  card: { backgroundColor: '#fdfdfd', padding: 16, marginBottom: 12, borderRadius: 10, shadowOpacity: 0.1, elevation: 3 },
  image: { height: 160, borderRadius: 8, marginBottom: 10 },
  title: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  price: { fontSize: 14, color: '#666', marginBottom: 8 },
  button: { backgroundColor: '#ec407a', padding: 10, borderRadius: 6, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600' },
});

export default ShopScreen;
