import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors, moderateScale } from '../../../../../styles/admin/theme';
import { fetchProducts, Product } from '../../../../../controller/Product.controller';
import { useFocusEffect } from '@react-navigation/native';

interface ProductScreenProps {
  navigation: any;
}

const ProductScreen: React.FC<ProductScreenProps> = ({ navigation }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      console.log('Loading products from API...');
      const fetchedProducts = await fetchProducts();
      console.log('Fetched products:', fetchedProducts);
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error loading products:', error);
      Alert.alert('Error', 'Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadProducts();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  };

  const navigateToDetail = (product: Product) => {
    navigation.navigate('ProductDetailScreen', { product });
  };

  const navigateToAddProduct = () => {
    navigation.navigate('AddProductScreen');
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <Image 
        source={{ uri: item.image || 'https://via.placeholder.com/150' }} 
        style={styles.productImage} 
        defaultSource={{ uri: 'https://via.placeholder.com/150' }}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productBrand}>{item.brand}</Text>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productCategory}>{item.category}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.productPrice}>₹{item.price}</Text>
          <View style={[styles.stockBadge, { backgroundColor: item.inStock ? colors.success : colors.error }]}>
            <Text style={styles.stockText}>{item.inStock ? 'In Stock' : 'Out of Stock'}</Text>
          </View>
        </View>
        <View style={styles.vendorContainer}>
          <Text style={styles.vendorLabel}>Available on:</Text>
          <View style={styles.vendorList}>
            {item.vendors.map((vendor, index) => (
              <Text key={index} style={styles.vendorName}>{vendor.name}</Text>
            ))}
          </View>
        </View>
        <TouchableOpacity
          style={styles.viewDetailButton}
          onPress={() => navigateToDetail(item)}
        >
          <Text style={styles.viewDetailText}>View Details</Text>
          <Icon name="arrow-right" size={12} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Icon name="box-open" size={60} color={colors.text.secondary} />
      <Text style={styles.emptyStateTitle}>No Products Found</Text>
      <Text style={styles.emptyStateSubtitle}>Add your first product to get started</Text>
      <TouchableOpacity style={styles.emptyStateButton} onPress={navigateToAddProduct}>
        <Icon name="plus" size={16} color={colors.white} />
        <Text style={styles.emptyStateButtonText}>Add Product</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Products Management</Text>
          <TouchableOpacity style={styles.addButton} onPress={navigateToAddProduct}>
            <Icon name="plus" size={16} color={colors.white} />
            <Text style={styles.addButtonText}>Add Product</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading products...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Products Management</Text>
        <TouchableOpacity style={styles.addButton} onPress={navigateToAddProduct}>
          <Icon name="plus" size={16} color={colors.white} />
          <Text style={styles.addButtonText}>Add Product</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{products.length}</Text>
          <Text style={styles.statLabel}>Total Products</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{products.filter(p => p.inStock).length}</Text>
          <Text style={styles.statLabel}>In Stock</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{products.filter(p => !p.inStock).length}</Text>
          <Text style={styles.statLabel}>Out of Stock</Text>
        </View>
      </View>

      {products.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(15),
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerTitle: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(8),
  },
  addButtonText: {
    color: colors.white,
    fontWeight: '600',
    marginLeft: moderateScale(5),
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    marginHorizontal: moderateScale(20),
    marginVertical: moderateScale(15),
    borderRadius: moderateScale(12),
    padding: moderateScale(15),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: colors.primary,
  },
  statLabel: {
    fontSize: moderateScale(12),
    color: colors.text.secondary,
    marginTop: moderateScale(5),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: moderateScale(10),
    fontSize: moderateScale(16),
    color: colors.text.secondary,
  },
  listContainer: {
    paddingHorizontal: moderateScale(20),
    paddingBottom: moderateScale(20),
  },
  productCard: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(12),
    marginBottom: moderateScale(15),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: moderateScale(120),
    backgroundColor: colors.background.primary,
  },
  productInfo: {
    padding: moderateScale(15),
  },
  productBrand: {
    fontSize: moderateScale(12),
    color: colors.primary,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  productName: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: colors.text.primary,
    marginTop: moderateScale(2),
  },
  productCategory: {
    fontSize: moderateScale(12),
    color: colors.text.secondary,
    marginTop: moderateScale(2),
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: moderateScale(10),
  },
  productPrice: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: colors.success,
  },
  stockBadge: {
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(4),
    borderRadius: moderateScale(12),
  },
  stockText: {
    fontSize: moderateScale(10),
    color: colors.white,
    fontWeight: '600',
  },
  vendorContainer: {
    marginTop: moderateScale(10),
  },
  vendorLabel: {
    fontSize: moderateScale(12),
    color: colors.text.secondary,
    marginBottom: moderateScale(5),
  },
  vendorList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  vendorName: {
    fontSize: moderateScale(11),
    color: colors.primary,
    backgroundColor: colors.primary + '20',
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(2),
    borderRadius: moderateScale(10),
    marginRight: moderateScale(5),
    marginBottom: moderateScale(2),
  },
  viewDetailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: moderateScale(12),
    borderRadius: moderateScale(8),
    marginTop: moderateScale(15),
  },
  viewDetailText: {
    color: colors.white,
    fontWeight: '600',
    marginRight: moderateScale(5),
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(40),
  },
  emptyStateTitle: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: colors.text.primary,
    marginTop: moderateScale(20),
    textAlign: 'center',
  },
  emptyStateSubtitle: {
    fontSize: moderateScale(14),
    color: colors.text.secondary,
    marginTop: moderateScale(8),
    textAlign: 'center',
    lineHeight: moderateScale(20),
  },
  emptyStateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(12),
    borderRadius: moderateScale(8),
    marginTop: moderateScale(20),
  },
  emptyStateButtonText: {
    color: colors.white,
    fontWeight: '600',
    marginLeft: moderateScale(8),
  },
});

export default ProductScreen;