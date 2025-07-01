import React, { useState, useEffect } from 'react';
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
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fetchProductById, Product } from '../../../controller/Product.controller';

const { width } = Dimensions.get('window');

type RootStackParamList = {
  Shop: undefined;
  ProductDetail: { product?: Product; productId?: string };
};

type ProductDetailNavigationProp = StackNavigationProp<RootStackParamList, 'ProductDetail'>;

interface RouteParams {
  product?: Product;
  productId?: string;
}

const ProductDetailScreen = () => {
  const navigation = useNavigation<ProductDetailNavigationProp>();
  const route = useRoute();
  const { product: initialProduct, productId } = route.params as RouteParams;

  const [product, setProduct] = useState<Product | null>(initialProduct || null);
  const [loading, setLoading] = useState<boolean>(!initialProduct && !!productId);

  useEffect(() => {
    if (productId && !initialProduct) {
      loadProduct();
    }
  }, [productId, initialProduct]);

  const loadProduct = async () => {
    if (!productId) return;
    
    try {
      setLoading(true);
      const fetchedProduct = await fetchProductById(productId);
      if (fetchedProduct) {
        setProduct(fetchedProduct);
      } else {
        Alert.alert('Error', 'Product not found');
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error loading product:', error);
      Alert.alert('Error', 'Failed to load product details');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const openVendorLink = (url: string, vendorName: string) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    
    Linking.openURL(url).catch(() =>
      Alert.alert('Error', `Unable to open ${vendorName} link`)
    );
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Date not available';
    }
  };

  const getVendorButtonStyle = (vendorName: string) => {
    const name = vendorName.toLowerCase();
    if (name.includes('amazon')) return styles.amazonButton;
    if (name.includes('flipkart')) return styles.flipkartButton;
    if (name.includes('nykaa')) return styles.nykaaButton;
    return styles.defaultVendorButton;
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#3498db" barStyle="light-content" />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Product Details</Text>
          <View style={styles.spacer} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3498db" />
          <Text style={styles.loadingText}>Loading product details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#3498db" barStyle="light-content" />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Product Details</Text>
          <View style={styles.spacer} />
        </View>
        <View style={styles.errorContainer}>
          <Icon name="error-outline" size={64} color="#ccc" />
          <Text style={styles.errorText}>Product not found</Text>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backToShopButton}>
            <Text style={styles.backToShopButtonText}>Back to Shop</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#3498db" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: product.image || 'https://via.placeholder.com/400x300?text=No+Image' }} 
            style={styles.productImage} 
            resizeMode="cover"
          />
          {!product.inStock && (
            <View style={styles.outOfStockBadge}>
              <Text style={styles.outOfStockBadgeText}>OUT OF STOCK</Text>
            </View>
          )}
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryText}>{product.category}</Text>
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.brandText}>{product.brand}</Text>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.price}>₹{product.price}</Text>
          
          <View style={styles.stockContainer}>
            <Icon 
              name={product.inStock ? "check-circle" : "error"} 
              size={20} 
              color={product.inStock ? "#4CAF50" : "#F44336"} 
            />
            <Text style={[
              styles.stockText,
              { color: product.inStock ? "#4CAF50" : "#F44336" }
            ]}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </Text>
          </View>

          {product.description && (
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>Description</Text>
              <Text style={styles.description}>{product.description}</Text>
            </View>
          )}

          {/* Product Details */}
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>Product Information</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Category:</Text>
              <Text style={styles.detailValue}>{product.category}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Brand:</Text>
              <Text style={styles.detailValue}>{product.brand}</Text>
            </View>
            {product.created_at && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Added on:</Text>
                <Text style={styles.detailValue}>{formatDate(product.created_at)}</Text>
              </View>
            )}
            {product.updated_at && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Last updated:</Text>
                <Text style={styles.detailValue}>{formatDate(product.updated_at)}</Text>
              </View>
            )}
          </View>

          {/* Vendor Links */}
          {product.vendors && product.vendors.length > 0 && (
            <View style={styles.vendorSection}>
              <Text style={styles.vendorTitle}>Available at:</Text>
              <View style={styles.vendorButtons}>
                {product.vendors.map((vendor, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.vendorButton,
                      getVendorButtonStyle(vendor.name),
                      !product.inStock && styles.vendorButtonDisabled
                    ]}
                    onPress={() => openVendorLink(vendor.link, vendor.name)}
                    disabled={!product.inStock}
                  >
                    <Icon name="shopping-cart" size={20} color="#fff" />
                    <Text style={styles.vendorButtonText}>Buy on {vendor.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.backToShopActionButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-back" size={20} color="#3498db" />
              <Text style={styles.backToShopActionButtonText}>Back to Shop</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  spacer: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
    marginBottom: 24,
  },
  imageContainer: {
    width: width,
    height: 300,
    backgroundColor: '#f8f8f8',
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  outOfStockBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#F44336',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  outOfStockBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  categoryContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  productInfo: {
    padding: 20,
    backgroundColor: '#fff',
  },
  brandText: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    lineHeight: 30,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 20,
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  stockText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  detailsContainer: {
    marginBottom: 24,
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  vendorSection: {
    marginBottom: 20,
  },
  vendorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  vendorButtons: {
    gap: 12,
  },
  vendorButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    gap: 8,
  },
  vendorButtonDisabled: {
    opacity: 0.5,
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
  defaultVendorButton: {
    backgroundColor: '#666',
  },
  vendorButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  actionButtons: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  backToShopButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  backToShopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backToShopActionButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#3498db',
    gap: 8,
  },
  backToShopActionButtonText: {
    color: '#3498db',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProductDetailScreen;