import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
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

interface ProductDetailScreenProps {
  navigation: any;
  route: {
    params: {
      product: Product;
      isUpdated?: boolean;
    };
  };
}

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ navigation, route }) => {
  const { product: initialProduct, isUpdated } = route.params;
  const [currentProduct, setCurrentProduct] = useState<Product>(initialProduct);

  // Update the product if it was edited
  useEffect(() => {
    if (isUpdated && route.params.product) {
      setCurrentProduct(route.params.product);
    }
  }, [route.params.product, isUpdated]);

  // Listen for navigation focus to update product data
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (route.params.product) {
        setCurrentProduct(route.params.product);
      }
    });

    return unsubscribe;
  }, [navigation, route.params.product]);

  const handleEdit = () => {
    navigation.navigate('EditProductScreen', { product: currentProduct });
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Product',
      `Are you sure you want to delete "${currentProduct.name}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // Here you would typically call an API to delete the product
            Alert.alert('Success', 'Product deleted successfully!', [
              {
                text: 'OK',
                onPress: () => navigation.goBack(),
              },
            ]);
          },
        },
      ]
    );
  };

  const openVendorLink = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Cannot open this link');
      }
    } catch (error) {
      Alert.alert('Error', 'Cannot open this link');
    }
  };

  const getVendorIcon = (vendorName: string) => {
    if (!vendorName) return 'store';
    
    const name = vendorName.toLowerCase();
    switch (name) {
      case 'amazon':
        return 'shopping-cart'; // Changed from 'amazon' to available icon
      case 'flipkart':
        return 'shopping-cart';
      case 'nykaa':
        return 'shopping-bag';
      case 'myntra':
        return 'tshirt';
      case 'shopclues':
        return 'store';
      default:
        return 'store';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={20} color={colors?.text?.primary || '#333'} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
            <Icon name="edit" size={18} color={colors?.primary || '#6200EE'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
            <Icon name="trash" size={18} color={colors?.error || '#FF5252'} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: currentProduct.image }} style={styles.productImage} />
          <View style={[styles.stockBadge, { backgroundColor: currentProduct.inStock ? (colors?.success || '#4CAF50') : (colors?.error || '#FF5252') }]}>
            <Text style={styles.stockText}>{currentProduct.inStock ? 'In Stock' : 'Out of Stock'}</Text>
          </View>
        </View>

        <View style={styles.productInfo}>
          <Text style={styles.brandName}>{currentProduct.brand}</Text>
          <Text style={styles.productName}>{currentProduct.name}</Text>
          <Text style={styles.category}>{currentProduct.category}</Text>
          <Text style={styles.price}>₹{currentProduct.price}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{currentProduct.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Vendors</Text>
          {currentProduct.vendors && currentProduct.vendors.length > 0 ? (
            currentProduct.vendors.map((vendor, index) => (
              <TouchableOpacity
                key={index}
                style={styles.vendorCard}
                onPress={() => openVendorLink(vendor.link)}
              >
                <View style={styles.vendorInfo}>
                  <Icon
                    name={getVendorIcon(vendor.name)}
                    size={24}
                    color={colors?.primary || '#6200EE'}
                    style={styles.vendorIcon}
                  />
                  <View>
                    <Text style={styles.vendorName}>{vendor.name || 'Unknown'}</Text>
                    <Text style={styles.vendorLink} numberOfLines={1}>
                      {vendor.link}
                    </Text>
                  </View>
                </View>
                <Icon name="external-link-alt" size={16} color={colors?.text?.secondary || '#666'} />
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noVendorsText}>No vendors available</Text>
          )}
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.editActionButton} onPress={handleEdit}>
            <Icon name="edit" size={18} color={colors?.white || '#fff'} />
            <Text style={styles.actionButtonText}>Edit Product</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteActionButton} onPress={handleDelete}>
            <Icon name="trash" size={18} color={colors?.white || '#fff'} />
            <Text style={styles.actionButtonText}>Delete Product</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.background?.primary || '#f6f8fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(15),
    backgroundColor: colors?.white || '#fff',
    borderBottomWidth: 1,
    borderBottomColor: colors?.border?.light || '#eee',
    elevation: 2,
  },
  backButton: {
    padding: moderateScale(5),
  },
  headerTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: colors?.text?.primary || '#333',
    flex: 1,
    textAlign: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: moderateScale(15),
  },
  editButton: {
    padding: moderateScale(5),
  },
  deleteButton: {
    padding: moderateScale(5),
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    backgroundColor: colors?.white || '#fff',
    margin: moderateScale(20),
    borderRadius: moderateScale(12),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  productImage: {
    width: '100%',
    height: moderateScale(250),
    borderRadius: moderateScale(12),
    backgroundColor: colors?.background?.primary || '#f6f8fa',
  },
  stockBadge: {
    position: 'absolute',
    top: moderateScale(15),
    right: moderateScale(15),
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(6),
    borderRadius: moderateScale(15),
  },
  stockText: {
    color: colors?.white || '#fff',
    fontSize: moderateScale(12),
    fontWeight: '600',
  },
  productInfo: {
    backgroundColor: colors?.white || '#fff',
    marginHorizontal: moderateScale(20),
    marginBottom: moderateScale(20),
    padding: moderateScale(20),
    borderRadius: moderateScale(12),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  brandName: {
    fontSize: moderateScale(14),
    color: colors?.primary || '#6200EE',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  productName: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    color: colors?.text?.primary || '#333',
    marginTop: moderateScale(5),
  },
  category: {
    fontSize: moderateScale(14),
    color: colors?.text?.secondary || '#666',
    marginTop: moderateScale(5),
  },
  price: {
    fontSize: moderateScale(28),
    fontWeight: 'bold',
    color: colors?.success || '#4CAF50',
    marginTop: moderateScale(10),
  },
  section: {
    backgroundColor: colors?.white || '#fff',
    marginHorizontal: moderateScale(20),
    marginBottom: moderateScale(20),
    padding: moderateScale(20),
    borderRadius: moderateScale(12),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  sectionTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: colors?.text?.primary || '#333',
    marginBottom: moderateScale(15),
  },
  description: {
    fontSize: moderateScale(14),
    color: colors?.text?.secondary || '#666',
    lineHeight: moderateScale(22),
  },
  vendorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: moderateScale(15),
    paddingHorizontal: moderateScale(15),
    backgroundColor: colors?.background?.primary || '#f6f8fa',
    borderRadius: moderateScale(10),
    marginBottom: moderateScale(10),
    borderWidth: 1,
    borderColor: colors?.border?.light || '#eee',
  },
  vendorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  vendorIcon: {
    marginRight: moderateScale(15),
  },
  vendorName: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: colors?.text?.primary || '#333',
  },
  vendorLink: {
    fontSize: moderateScale(12),
    color: colors?.text?.secondary || '#666',
    marginTop: moderateScale(2),
    maxWidth: moderateScale(200),
  },
  noVendorsText: {
    fontSize: moderateScale(14),
    color: colors?.text?.secondary || '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  actionButtons: {
    flexDirection: 'row',
    marginHorizontal: moderateScale(20),
    marginBottom: moderateScale(30),
    gap: moderateScale(15),
  },
  editActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors?.primary || '#6200EE',
    paddingVertical: moderateScale(15),
    borderRadius: moderateScale(10),
  },
  deleteActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors?.error || '#FF5252',
    paddingVertical: moderateScale(15),
    borderRadius: moderateScale(10),
  },
  actionButtonText: {
    color: colors?.white || '#fff',
    fontSize: moderateScale(16),
    fontWeight: '600',
    marginLeft: moderateScale(8),
  },
});

export default ProductDetailScreen;