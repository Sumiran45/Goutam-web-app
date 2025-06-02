import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Linking,
  Alert,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

type RootStackParamList = {
  Shop: undefined;
  ProductDetail: { product: Product };
};

type ProductDetailNavigationProp = StackNavigationProp<RootStackParamList, 'ProductDetail'>;

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  category: string;
  brand: string;
  vendorLinks: {
    amazon?: string;
    flipkart?: string;
    nykaa?: string;
  };
  rating: number;
  isOrganic?: boolean;
}

interface RouteParams {
  product: Product;
}

const ProductDetailScreen = () => {
  const navigation = useNavigation<ProductDetailNavigationProp>();
  const route = useRoute();
  const { product } = route.params as RouteParams;

  const openVendorLink = (url: string, vendor: string) => {
    Linking.openURL(url).catch(() =>
      Alert.alert('Error', 'Unable to open the link')
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#3498db" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Product Details</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
          {product.isOrganic && (
            <View style={styles.organicBadge}>
              <Text style={styles.organicBadgeText}>ORGANIC</Text>
            </View>
          )}
          <View style={styles.ratingContainer}>
            <Icon name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{product.rating}</Text>
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.brandText}>{product.brand}</Text>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.price}>₹{product.price}</Text>

          {product.description && (
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>Description</Text>
              <Text style={styles.description}>{product.description}</Text>
            </View>
          )}

          {/* Vendor Links */}
          <View style={styles.vendorSection}>
            <Text style={styles.vendorTitle}>Buy from:</Text>
            <View style={styles.vendorButtons}>
              {product.vendorLinks.amazon && (
                <TouchableOpacity
                  style={[styles.vendorButton, styles.amazonButton]}
                  onPress={() => openVendorLink(product.vendorLinks.amazon!, 'Amazon')}
                >
                  <Text style={styles.vendorButtonText}>Buy on Amazon</Text>
                </TouchableOpacity>
              )}
              {product.vendorLinks.flipkart && (
                <TouchableOpacity
                  style={[styles.vendorButton, styles.flipkartButton]}
                  onPress={() => openVendorLink(product.vendorLinks.flipkart!, 'Flipkart')}
                >
                  <Text style={styles.vendorButtonText}>Buy on Flipkart</Text>
                </TouchableOpacity>
              )}
              {product.vendorLinks.nykaa && (
                <TouchableOpacity
                  style={[styles.vendorButton, styles.nykaaButton]}
                  onPress={() => openVendorLink(product.vendorLinks.nykaa!, 'Nykaa')}
                >
                  <Text style={styles.vendorButtonText}>Buy on Nykaa</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[styles.vendorButton, styles.flipkartButton]}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.vendorButtonText}>Return to shop</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  header: {
    // flexDirection: 'row' as const,
    // justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    backgroundColor: '#3498db',
    paddingHorizontal: 16,
    paddingVertical: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: '#fff',
  },
  spacer: {
    width: 32, // Same width as the back button to center the title
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    width: width,
    height: 300,
    backgroundColor: '#f8f8f8',
    position: 'relative' as const,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover' as const,
  },
  organicBadge: {
    position: 'absolute' as const,
    top: 16,
    left: 16,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  organicBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold' as const,
  },
  ratingContainer: {
    position: 'absolute' as const,
    top: 16,
    right: 16,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  ratingText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600' as const,
    marginLeft: 4,
  },
  productInfo: {
    padding: 20,
    backgroundColor: '#fff',
  },
  brandText: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: '600' as const,
    textTransform: 'uppercase' as const,
    marginBottom: 4,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: '#333',
    marginBottom: 8,
    lineHeight: 30,
  },
  category: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    color: '#3498db',
    marginBottom: 20,
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  vendorSection: {
    marginBottom: 20,
  },
  vendorTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#333',
    marginBottom: 12,
  },
  vendorButtons: {
    gap: 8,
  },
  vendorButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center' as const,
  },
  amazonButton: {
    backgroundColor: '#FF9800',
  },
  flipkartButton: {
    backgroundColor: '#2874F0',
  },
  nykaaButton: {
    backgroundColor: '#EC407A',
  },
  vendorButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600' as const,
  },
};

export default ProductDetailScreen;