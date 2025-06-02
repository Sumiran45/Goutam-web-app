import React, { useState, useMemo } from 'react';
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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../../styles/Shop.style';

type RootStackParamList = {
  Shop: undefined;
  ProductDetail: { product: Product };
};

type ShopScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Shop'>;

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

interface FilterState {
  category: string;
  priceRange: { min: number; max: number };
  brand: string;
  isOrganic: boolean | null;
  sortBy: 'price-low' | 'price-high' | 'rating' | 'name';
}

export const ShopScreen = () => {
  const navigation = useNavigation<ShopScreenNavigationProp>();
  const [showFilters, setShowFilters] = useState<boolean>(false);
  
  const [filters, setFilters] = useState<FilterState>({
    category: 'All',
    priceRange: { min: 0, max: 2000 },
    brand: 'All',
    isOrganic: null,
    sortBy: 'name'
  });

  const categories = ['All', 'Sanitary Pads', 'Menstrual Cups', 'Pain Relief', 'Intimate Care', 'Tampons', 'Supplements'];
  const brands = ['All', 'Whisper', 'Stayfree', 'Sofy', 'Sirona', 'Plum', 'The Honest Company', 'Carmesi', 'Nua'];
  const priceRanges = [
    { label: 'Under ₹200', min: 0, max: 200 },
    { label: '₹200 - ₹500', min: 200, max: 500 },
    { label: '₹500 - ₹1000', min: 500, max: 1000 },
    { label: 'Above ₹1000', min: 1000, max: 5000 },
  ];

  const products: Product[] = [
    {
      id: '1',
      name: 'Ultra Soft Sanitary Pads',
      price: 120,
      image: 'https://evereve.in/cdn/shop/files/1_adbbd681-74cc-4c4b-968e-389030d0c26d.jpg?v=1688713008',
      description: 'Premium quality cotton sanitary pads with wings for maximum comfort and protection.',
      category: 'Sanitary Pads',
      brand: 'Whisper',
      rating: 4.5,
      isOrganic: false,
      vendorLinks: {
        amazon: 'https://amazon.in/dp/B08XYZ123',
        flipkart: 'https://flipkart.com/whisper-ultra-soft',
        nykaa: 'https://nykaa.com/whisper-pads'
      }
    },
    {
      id: '2',
      name: 'Reusable Menstrual Cup',
      price: 499,
      image: 'https://www.peesafe.com/cdn/shop/files/Reusable_Menstrual_cup_Medium_with_product_a1e8aea3-8e65-4b43-bb5b-d5ef1916a49e.jpg?v=1744603322',
      description: 'Medical grade silicone menstrual cup. Eco-friendly and lasts up to 5 years.',
      category: 'Menstrual Cups',
      brand: 'Sirona',
      rating: 4.8,
      isOrganic: true,
      vendorLinks: {
        amazon: 'https://amazon.in/dp/B09ABC456',
        flipkart: 'https://flipkart.com/sirona-menstrual-cup',
        nykaa: 'https://nykaa.com/sirona-cup'
      }
    },
    {
      id: '3',
      name: 'Electric Heating Pad',
      price: 899,
      image: 'https://cdn.moglix.com/p/ySCwKqYQwvRGN-xxlarge.jpg',
      description: 'Electric heating pad with 3 temperature settings for effective menstrual cramp relief.',
      category: 'Pain Relief',
      brand: 'The Honest Company',
      rating: 4.3,
      isOrganic: false,
      vendorLinks: {
        amazon: 'https://amazon.in/dp/B07DEF789',
        flipkart: 'https://flipkart.com/heating-pad-cramps'
      }
    },
    {
      id: '4',
      name: 'Intimate Hygiene Wipes',
      price: 149,
      image: 'https://m.media-amazon.com/images/I/71-mcgWoYQL.jpg',
      description: 'Alcohol-free, pH-balanced intimate wipes. Perfect for on-the-go freshness.',
      category: 'Intimate Care',
      brand: 'Plum',
      rating: 4.2,
      isOrganic: true,
      vendorLinks: {
        amazon: 'https://amazon.in/dp/B08GHI012',
        nykaa: 'https://nykaa.com/plum-intimate-wipes'
      }
    },
    {
      id: '5',
      name: '100% Organic Cotton Tampons',
      price: 320,
      image: 'https://fabpad.in/cdn/shop/files/Whitebg2.jpg?v=1709622413',
      description: '100% organic cotton tampons. Biodegradable and chemical-free.',
      category: 'Tampons',
      brand: 'Carmesi',
      rating: 4.6,
      isOrganic: true,
      vendorLinks: {
        amazon: 'https://amazon.in/dp/B09JKL345',
        flipkart: 'https://flipkart.com/carmesi-organic-tampons',
        nykaa: 'https://nykaa.com/carmesi-tampons'
      }
    },
    {
      id: '6',
      name: 'Period Pain Relief Tablets',
      price: 89,
      image: 'https://5.imimg.com/data5/SELLER/Default/2021/10/YO/WR/JQ/139948063/mefenamic-acid-paracetamol-tablets-500x500.jpg',
      description: 'Natural herbal tablets for menstrual pain and cramp relief.',
      category: 'Pain Relief',
      brand: 'Nua',
      rating: 4.1,
      isOrganic: true,
      vendorLinks: {
        amazon: 'https://amazon.in/dp/B08MNO678',
        flipkart: 'https://flipkart.com/nua-pain-relief'
      }
    },
    {
      id: '7',
      name: 'Overnight Sanitary Pads',
      price: 189,
      image: 'https://images-eu.ssl-images-amazon.com/images/I/71QGvQI%2BVDL._AC_UL165_SR165,165_.jpg',
      description: 'Extra-long pads with maximum absorption for overnight protection.',
      category: 'Sanitary Pads',
      brand: 'Stayfree',
      rating: 4.4,
      isOrganic: false,
      vendorLinks: {
        amazon: 'https://amazon.in/dp/B07PQR901',
        flipkart: 'https://flipkart.com/stayfree-overnight',
        nykaa: 'https://nykaa.com/stayfree-overnight'
      }
    },
    {
      id: '8',
      name: 'Iron & Vitamin B12 Supplements',
      price: 450,
      image: 'https://5.imimg.com/data5/SELLER/Default/2022/12/DN/WM/XE/106293031/iron-folic-acid-tablets-500x500.jpg',
      description: 'Essential supplements to combat iron deficiency during menstruation.',
      category: 'Supplements',
      brand: 'Nua',
      rating: 4.3,
      isOrganic: true,
      vendorLinks: {
        amazon: 'https://amazon.in/dp/B09STU234',
        flipkart: 'https://flipkart.com/nua-iron-supplements'
      }
    }
  ];

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const categoryMatch = filters.category === 'All' || product.category === filters.category;
      const priceMatch = product.price >= filters.priceRange.min && product.price <= filters.priceRange.max;
      const brandMatch = filters.brand === 'All' || product.brand === filters.brand;
      const organicMatch = filters.isOrganic === null || product.isOrganic === filters.isOrganic;
      
      return categoryMatch && priceMatch && brandMatch && organicMatch;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [filters]);

  const navigateToProductDetail = (product: Product) => {
    navigation.navigate('ProductDetail', { product });
  };

  const resetFilters = () => {
    setFilters({
      category: 'All',
      priceRange: { min: 0, max: 2000 },
      brand: 'All',
      isOrganic: null,
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

            {/* Organic Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Product Type</Text>
              <View style={styles.organicFilter}>
                <TouchableOpacity
                  style={[
                    styles.organicChip,
                    filters.isOrganic === null && styles.filterChipActive
                  ]}
                  onPress={() => setFilters(prev => ({ ...prev, isOrganic: null }))}
                >
                  <Text style={[
                    styles.filterChipText,
                    filters.isOrganic === null && styles.filterChipTextActive
                  ]}>
                    All
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.organicChip,
                    filters.isOrganic === true && styles.filterChipActive
                  ]}
                  onPress={() => setFilters(prev => ({ ...prev, isOrganic: true }))}
                >
                  <Text style={[
                    styles.filterChipText,
                    filters.isOrganic === true && styles.filterChipTextActive
                  ]}>
                    Organic
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.organicChip,
                    filters.isOrganic === false && styles.filterChipActive
                  ]}
                  onPress={() => setFilters(prev => ({ ...prev, isOrganic: false }))}
                >
                  <Text style={[
                    styles.filterChipText,
                    filters.isOrganic === false && styles.filterChipTextActive
                  ]}>
                    Regular
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
                  { key: 'price-high', label: 'Price: High to Low' },
                  { key: 'rating', label: 'Highest Rated' }
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
          source={{ uri: item.image }} 
          style={styles.image} 
          resizeMode="cover"
        />
        {item.isOrganic && (
          <View style={styles.organicBadge}>
            <Text style={styles.organicBadgeText}>Organic</Text>
          </View>
        )}
        <View style={styles.ratingBadge}>
          <Icon name="star" size={12} color="#FFD700" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
      
      <View style={styles.productContent}>
        <Text style={styles.brandText}>{item.brand}</Text>
        <Text style={styles.productTitle} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.productPrice}>₹{item.price}</Text>
        
        <TouchableOpacity
          style={styles.buyNowButton}
          onPress={() => navigateToProductDetail(item)}
        >
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#3498db" barStyle="light-content" />
      
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Period Care Shop</Text>
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

      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productList}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
      />

      {renderFilterModal()}
    </SafeAreaView>
  );
};

export default ShopScreen;