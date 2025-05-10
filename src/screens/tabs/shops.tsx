import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCart } from '../../Context/CartContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../../styles/Shop.style';

type RootStackParamList = {
  Shop: undefined;
  Cart: undefined;
  ProductDetail: { product: Product };
};

type ShopScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Shop'>;

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
}

export const ShopScreen=()=> {
  const navigation = useNavigation<ShopScreenNavigationProp>();
  const { cart, addToCart } = useCart();
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleAddToCart = (product: Product) => {
    setLoading(true);
    setTimeout(() => {
      addToCart(product);
      setLoading(false);
    }, 300);
  };

  const navigateToProductDetail = (product: Product) => {
    navigation.navigate('ProductDetail', { product });
  };

  const products: Product[] = [
    {
      id: '1',
      name: 'Sanitary Pads (Pack of 10)',
      price: 120,
      image: 'https://evereve.in/cdn/shop/files/1_adbbd681-74cc-4c4b-968e-389030d0c26d.jpg?v=1688713008',
      description: 'Premium quality cotton sanitary pads for maximum comfort and protection.',
    },
    {
      id: '2',
      name: 'Menstrual Cup (Medium)',
      price: 499,
      image: 'https://www.peesafe.com/cdn/shop/files/Reusable_Menstrual_cup_Medium_with_product_a1e8aea3-8e65-4b43-bb5b-d5ef1916a49e.jpg?v=1744603322',
      description: 'Reusable, eco-friendly silicone menstrual cup. Lasts up to 5 years.',
    },
    {
      id: '3',
      name: 'Heating Pad (Electric)',
      price: 899,
      image: 'https://cdn.moglix.com/p/ySCwKqYQwvRGN-xxlarge.jpg',
      description: 'Electric heating pad with 3 temperature settings for menstrual cramp relief.',
    },
    {
      id: '4',
      name: 'Feminine Wipes (20 pcs)',
      price: 149,
      image: 'https://m.media-amazon.com/images/I/71-mcgWoYQL.jpg',
      description: 'Alcohol-free, fragrance-free intimate wipes. Perfect for on-the-go freshness.',
    },
    {
      id: '5',
      name: 'Organic Tampons (Pack of 16)',
      price: 320,
      image: 'https://fabpad.in/cdn/shop/files/Whitebg2.jpg?v=1709622413',
      description: '100% organic cotton tampons. Free from chemicals and synthetic materials.',
    },
  ];

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigateToProductDetail(item)}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.image} 
          resizeMode="cover"
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.price}>₹{item.price}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAddToCart(item)}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Add to Cart</Text>
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#3498DB" barStyle="light-content" />
      
      <View style={styles.headerContainer}>
        <Text style={styles.header}>SHOP</Text>
        
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <Icon name="shopping-cart" size={24} color="#fff" />
          {cart.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cart.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
      />
    </SafeAreaView>
  );
};


export default ShopScreen;