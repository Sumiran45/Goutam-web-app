import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Modal,
  ActivityIndicator,
  Alert,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fetchProducts, Product, ProductFilters } from '../../controller/Product.controller';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 48 = 16 (padding) * 2 + 16 (gap)

type RootStackParamList = {
  Shop: undefined;
  ProductDetail: { product: Product };
};

type ShopScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Shop'>;

interface FilterState {
  category: string;
  priceRange: { min: number; max: number };
  brand: string;
  inStock: boolean | null;
  sortBy: 'price-low' | 'price-high' | 'name';
}

export const ShopScreen = () => {
  const navigation = useNavigation<ShopScreenNavigationProp>();
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  
  const [filters, setFilters] = useState<FilterState>({
    category: 'All',
    priceRange: { min: 0, max: 5000 },
    brand: 'All',
    inStock: null,
    sortBy: 'name'
  });

  // Dynamic categories and brands based on fetched products
  const categories = useMemo(() => {
    const uniqueCategories = ['All', ...new Set(products.map(p => p.category))];
    return uniqueCategories;
  }, [products]);

  const brands = useMemo(() => {
    const uniqueBrands = ['All', ...new Set(products.map(p => p.brand))];
    return uniqueBrands;
  }, [products]);

  const priceRanges = [
    { label: 'Under ₹200', min: 0, max: 200 },
    { label: '₹200 - ₹500', min: 200, max: 500 },
    { label: '₹500 - ₹1000', min: 500, max: 1000 },
    { label: '₹1000 - ₹2000', min: 1000, max: 2000 },
    { label: 'Above ₹2000', min: 2000, max: 10000 },
  ];

  const loadProducts = async (showLoader = true) => {
    try {
      if (showLoader) setLoading(true);
      
      // Build filters for API call only for category
      const apiFilters: ProductFilters = {};
      if (filters.category !== 'All') apiFilters.category = filters.category;

      const fetchedProducts = await fetchProducts(apiFilters);
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error loading products:', error);
      Alert.alert('Error', 'Failed to load products. Please try again.');
    } finally {
      if (showLoader) setLoading(false);
      setRefreshing(false);
    }
  };

  // Load products on component mount and when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadProducts();
    }, [filters.category]) // Only reload when category changes
  );

  const handleRefresh = () => {
    setRefreshing(true);
    loadProducts(false);
  };

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const categoryMatch = filters.category === 'All' || product.category === filters.category;
      const priceMatch = product.price >= filters.priceRange.min && product.price <= filters.priceRange.max;
      const brandMatch = filters.brand === 'All' || product.brand === filters.brand;
      const stockMatch = filters.inStock === null || product.inStock === filters.inStock;
      
      return categoryMatch && priceMatch && brandMatch && stockMatch;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [products, filters]);

  const navigateToProductDetail = (product: Product) => {
    navigation.navigate('ProductDetail', { product });
  };

  const resetFilters = () => {
    setFilters({
      category: 'All',
      priceRange: { min: 0, max: 5000 },
      brand: 'All',
      inStock: null,
      sortBy: 'name'
    });
  };

  const renderFilterModal = () => (
    <Modal
      visible={showFilters}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowFilters(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.filterModal}>
          <View style={styles.filterHeader}>
            <Text style={styles.filterTitle}>Filters</Text>
            <TouchableOpacity onPress={() => setShowFilters(false)}>
              <Icon name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.filterContent}>
            {/* Category Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Category</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterChips}>
                {categories.map(category => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.filterChip,
                      filters.category === category && styles.filterChipActive
                    ]}
                    onPress={() => setFilters(prev => ({ ...prev, category }))}
                  >
                    <Text style={[
                      styles.filterChipText,
                      filters.category === category && styles.filterChipTextActive
                    ]}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Price Range Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Price Range</Text>
              <View style={styles.priceGrid}>
                {priceRanges.map((range, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.priceRangeChip,
                      filters.priceRange.min === range.min && filters.priceRange.max === range.max && styles.filterChipActive
                    ]}
                    onPress={() => setFilters(prev => ({ 
                      ...prev, 
                      priceRange: { min: range.min, max: range.max }
                    }))}
                  >
                    <Text style={[
                      styles.filterChipText,
                      filters.priceRange.min === range.min && filters.priceRange.max === range.max && styles.filterChipTextActive
                    ]}>
                      {range.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Brand Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Brand</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterChips}>
                {brands.map(brand => (
                  <TouchableOpacity
                    key={brand}
                    style={[
                      styles.filterChip,
                      filters.brand === brand && styles.filterChipActive
                    ]}
                    onPress={() => setFilters(prev => ({ ...prev, brand }))}
                  >
                    <Text style={[
                      styles.filterChipText,
                      filters.brand === brand && styles.filterChipTextActive
                    ]}>
                      {brand}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Stock Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Availability</Text>
              <View style={styles.organicFilter}>
                <TouchableOpacity
                  style={[
                    styles.organicChip,
                    filters.inStock === null && styles.filterChipActive
                  ]}
                  onPress={() => setFilters(prev => ({ ...prev, inStock: null }))}
                >
                  <Text style={[
                    styles.filterChipText,
                    filters.inStock === null && styles.filterChipTextActive
                  ]}>
                    All
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.organicChip,
                    filters.inStock === true && styles.filterChipActive
                  ]}
                  onPress={() => setFilters(prev => ({ ...prev, inStock: true }))}
                >
                  <Text style={[
                    styles.filterChipText,
                    filters.inStock === true && styles.filterChipTextActive
                  ]}>
                    In Stock
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.organicChip,
                    filters.inStock === false && styles.filterChipActive
                  ]}
                  onPress={() => setFilters(prev => ({ ...prev, inStock: false }))}
                >
                  <Text style={[
                    styles.filterChipText,
                    filters.inStock === false && styles.filterChipTextActive
                  ]}>
                    Out of Stock
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Sort Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Sort By</Text>
              <View style={styles.sortOptions}>
                {[
                  { key: 'name', label: 'Name A-Z' },
                  { key: 'price-low', label: 'Price: Low to High' },
                  { key: 'price-high', label: 'Price: High to Low' }
                ].map(option => (
                  <TouchableOpacity
                    key={option.key}
                    style={[
                      styles.sortOption,
                      filters.sortBy === option.key && styles.filterChipActive
                    ]}
                    onPress={() => setFilters(prev => ({ ...prev, sortBy: option.key as any }))}
                  >
                    <Text style={[
                      styles.filterChipText,
                      filters.sortBy === option.key && styles.filterChipTextActive
                    ]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          <View style={styles.filterActions}>
            <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.applyButton} 
              onPress={() => setShowFilters(false)}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity 
      style={styles.productCard} 
      onPress={() => navigateToProductDetail(item)}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: item.image || 'https://via.placeholder.com/200x200?text=No+Image' }} 
          style={styles.image} 
          resizeMode="cover"
        />
        {!item.inStock && (
          <View style={styles.outOfStockBadge}>
            <Text style={styles.outOfStockBadgeText}>Out of Stock</Text>
          </View>
        )}
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryBadgeText}>{item.category}</Text>
        </View>
      </View>
      
      <View style={styles.productContent}>
        <Text style={styles.brandText}>{item.brand}</Text>
        <Text style={styles.productTitle} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.productPrice}>₹{item.price}</Text>
        
        <TouchableOpacity
          style={[
            styles.buyNowButton,
            !item.inStock && styles.buyNowButtonDisabled
          ]}
          onPress={() => navigateToProductDetail(item)}
          disabled={!item.inStock}
        >
          <Text style={[
            styles.buttonText,
            !item.inStock && styles.buttonTextDisabled
          ]}>
            {item.inStock ? 'View Details' : 'Out of Stock'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#3498db" barStyle="light-content" />
        <View style={styles.headerContainer}>
          <Text style={styles.header}>PERIOD CARE SHOP</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3498db" />
          <Text style={styles.loadingText}>Loading products...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#3498db" barStyle="light-content" />
      
      <View style={styles.headerContainer}>
        <Text style={styles.header}>PERIOD CARE SHOP</Text>
      </View>

      <View style={styles.filterBar}>
        <TouchableOpacity 
          style={styles.filterButton} 
          onPress={() => setShowFilters(true)}
        >
          <Icon name="filter-list" size={20} color="#3498db" />
          <Text style={styles.filterButtonText}>Filters</Text>
        </TouchableOpacity>
        
        <Text style={styles.resultCount}>
          {filteredProducts.length} products found
        </Text>
      </View>

      {filteredProducts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="shopping-basket" size={64} color="#ccc" />
          <Text style={styles.emptyText}>No products found</Text>
          <Text style={styles.emptySubText}>Try adjusting your filters</Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.productList}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.row}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      )}

      {renderFilterModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerContainer: {
    backgroundColor: '#3498db',
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  refreshButton: {
    padding: 8,
  },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e5e9',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#3498db',
  },
  filterButtonText: {
    marginLeft: 4,
    color: '#3498db',
    fontWeight: '500',
  },
  resultCount: {
    color: '#666',
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#666',
    fontSize: 16,
  },
  productList: {
    padding: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    width: CARD_WIDTH,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 150,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  outOfStockBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  outOfStockBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  categoryBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#3498db',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  categoryBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  productContent: {
    padding: 12,
  },
  brandText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    lineHeight: 18,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 12,
  },
  buyNowButton: {
    backgroundColor: '#3498db',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  buyNowButtonDisabled: {
    backgroundColor: '#bdc3c7',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  buttonTextDisabled: {
    color: '#7f8c8d',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  filterModal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e5e9',
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  filterContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  filterSection: {
    marginVertical: 16,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  filterChips: {
    flexDirection: 'row',
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e1e5e9',
  },
  filterChipActive: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  filterChipText: {
    fontSize: 14,
    color: '#666',
  },
  filterChipTextActive: {
    color: '#fff',
    fontWeight: '500',
  },
  priceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  priceRangeChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    margin: 4,
    borderWidth: 1,
    borderColor: '#e1e5e9',
    minWidth: '45%',
    alignItems: 'center',
  },
  organicFilter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  organicChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e1e5e9',
  },
  sortOptions: {
    flexDirection: 'column',
  },
  sortOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e1e5e9',
  },
  filterActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e1e5e9',
  },
  resetButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e1e5e9',
  },
  resetButtonText: {
    color: '#666',
    fontWeight: '600',
  },
  applyButton: {
    flex: 2,
    paddingVertical: 12,
    backgroundColor: '#3498db',
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 8,
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default ShopScreen;