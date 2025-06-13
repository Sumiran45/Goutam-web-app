import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors, moderateScale } from '../../../../../styles/admin/theme';

interface Vendor {
  name: string;
  link: string;
}

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  vendors: Vendor[];
  description: string;
  category: string;
  inStock: boolean;
}

interface ProductScreenProps {
  navigation: any;
}

const ProductScreen: React.FC<ProductScreenProps> = ({ navigation }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // Mock data for menstrual products
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Ultra Soft Sanitary Pads',
        brand: 'Whisper',
        price: 250,
        image: 'https://m.media-amazon.com/images/I/51xlH8K9XAL._AC_UL320_.jpg',
        vendors: [
          { name: 'Amazon', link: 'https://amazon.in/whisper-pads' },
          { name: 'Flipkart', link: 'https://flipkart.com/whisper-pads' },
          { name: 'Nykaa', link: 'https://nykaa.com/whisper-pads' }
        ],
        description: 'Ultra-soft sanitary pads with wings for maximum comfort and protection.',
        category: 'Sanitary Pads',
        inStock: true
      },
      {
        id: '2',
        name: 'Menstrual Cup - Size M',
        brand: 'DivaCup',
        price: 1200,
        image: 'https://m.media-amazon.com/images/I/61dWHyPageL._AC_UL320_.jpg',
        vendors: [
          { name: 'Amazon', link: 'https://amazon.in/diva-cup' },
          { name: 'Nykaa', link: 'https://nykaa.com/diva-cup' }
        ],
        description: 'Eco-friendly silicone menstrual cup, reusable for up to 10 years.',
        category: 'Menstrual Cups',
        inStock: true
      },
      {
        id: '3',
        name: 'Organic Cotton Tampons',
        brand: 'Sirona',
        price: 180,
        image: 'https://m.media-amazon.com/images/I/51S-q6tIYFL._AC_UL320_.jpg',
        vendors: [
          { name: 'Amazon', link: 'https://amazon.in/sirona-tampons' },
          { name: 'Flipkart', link: 'https://flipkart.com/sirona-tampons' }
        ],
        description: '100% organic cotton tampons with biodegradable applicator.',
        category: 'Tampons',
        inStock: false
      },
      {
        id: '4',
        name: 'Period Panties - Pack of 3',
        brand: 'Adira',
        price: 899,
        image: 'https://m.media-amazon.com/images/I/712DbJ3eMqL._AC_UL320_.jpg',
        vendors: [
          { name: 'Amazon', link: 'https://amazon.in/adira-panties' },
          { name: 'Nykaa', link: 'https://nykaa.com/adira-panties' }
        ],
        description: 'Leak-proof period underwear with 12-hour protection.',
        category: 'Period Underwear',
        inStock: true
      }
    ];
    setProducts(mockProducts);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      loadProducts();
      setRefreshing(false);
    }, 1000);
  };

  const navigateToDetail = (product: Product) => {
    navigation.navigate('ProductDetailScreen', { product });
  };

  const navigateToAddProduct = () => {
    navigation.navigate('AddProductScreen');
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
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
});

export default ProductScreen;