import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProductDetail = ({ route }: { route: any }) => {
    const { product } = route.params;
  
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>₹{product.price}</Text>
      <Text style={styles.description}>This is a detailed view of the product. More description can go here.</Text>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: { padding: 20 },
  image: { height: 250, borderRadius: 8 },
  title: { fontSize: 22, fontWeight: 'bold', marginTop: 10 },
  price: { fontSize: 18, color: 'gray', marginTop: 6 },
  description: { marginTop: 12, fontSize: 16, lineHeight: 22 },
});
