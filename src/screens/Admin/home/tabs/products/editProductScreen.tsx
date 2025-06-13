import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Alert,
  Switch,
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

interface EditProductScreenProps {
  navigation: any;
  route: {
    params: {
      product: Product;
    };
  };
}

const EditProductScreen: React.FC<EditProductScreenProps> = ({ navigation, route }) => {
  const { product } = route.params;
  
  const [productName, setProductName] = useState(product.name);
  const [brand, setBrand] = useState(product.brand);
  const [price, setPrice] = useState(product.price.toString());
  const [description, setDescription] = useState(product.description);
  const [category, setCategory] = useState(product.category);
  const [imageUrl, setImageUrl] = useState(product.image);
  const [inStock, setInStock] = useState(product.inStock);
  const [vendors, setVendors] = useState<Vendor[]>(product.vendors);
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    'Sanitary Pads',
    'Tampons',
    'Menstrual Cups',
    'Period Underwear',
    'Panty Liners',
    'Pain Relief',
    'Intimate Hygiene',
  ];

  const addVendor = () => {
    setVendors([...vendors, { name: '', link: '' }]);
  };

  const removeVendor = (index: number) => {
    if (vendors.length > 1) {
      const newVendors = vendors.filter((_, i) => i !== index);
      setVendors(newVendors);
    }
  };

  const updateVendor = (index: number, field: 'name' | 'link', value: string) => {
    const newVendors = [...vendors];
    newVendors[index][field] = value;
    setVendors(newVendors);
  };

  const validateForm = () => {
    if (!productName.trim()) {
      Alert.alert('Error', 'Please enter product name');
      return false;
    }
    if (!brand.trim()) {
      Alert.alert('Error', 'Please enter brand name');
      return false;
    }
    if (!price.trim() || isNaN(Number(price))) {
      Alert.alert('Error', 'Please enter a valid price');
      return false;
    }
    if (!category.trim()) {
      Alert.alert('Error', 'Please select a category');
      return false;
    }
    if (!description.trim()) {
      Alert.alert('Error', 'Please enter product description');
      return false;
    }

    const validVendors = vendors.filter(v => v.name.trim() && v.link.trim());
    if (validVendors.length === 0) {
      Alert.alert('Error', 'Please add at least one vendor with name and link');
      return false;
    }

    return true;
  };

  // const navigateBackToProductDetail = (updatedProduct?: Product) => {
  //   navigation.navigate('ProductDetail', {
  //     product: updatedProduct || product,
  //     isUpdated: updatedProduct ? true : false
  //   });
  // };
// Only the navigation functions need to be changed in EditProductScreen.tsx
// Replace these functions in your existing EditProductScreen.tsx:

const navigateBackToProductDetail = (updatedProduct?: Product) => {
  // Use setParams to update the route params instead of navigate
  if (updatedProduct) {
    navigation.setParams({
      product: updatedProduct,
      isUpdated: true
    });
  }
  navigation.goBack();
};

const handleUpdate = async () => {
  if (!validateForm()) return;

  setIsLoading(true);
  
  // Simulate API call
  setTimeout(() => {
    setIsLoading(false);
    
    const updatedProduct: Product = {
      ...product,
      name: productName,
      brand: brand,
      price: Number(price),
      description: description,
      category: category,
      image: imageUrl,
      inStock: inStock,
      vendors: vendors.filter(v => v.name.trim() && v.link.trim())
    };

    Alert.alert('Success', 'Product updated successfully!', [
      {
        text: 'OK',
        onPress: () => {
          // Navigate back with updated product data
          navigation.navigate('ProductDetailScreen', {
            product: updatedProduct,
            isUpdated: true
          });
        },
      },
    ]);
  }, 1500);
};
  // const handleUpdate = async () => {
  //   if (!validateForm()) return;

  //   setIsLoading(true);
    
  //   // Simulate API call
  //   setTimeout(() => {
  //     setIsLoading(false);
      
  //     const updatedProduct: Product = {
  //       ...product,
  //       name: productName,
  //       brand: brand,
  //       price: Number(price),
  //       description: description,
  //       category: category,
  //       image: imageUrl,
  //       inStock: inStock,
  //       vendors: vendors.filter(v => v.name.trim() && v.link.trim())
  //     };

  //     Alert.alert('Success', 'Product updated successfully!', [
  //       {
  //         text: 'OK',
  //         onPress: () => navigateBackToProductDetail(updatedProduct),
  //       },
  //     ]);
  //   }, 1500);
  // };

  const handleCancel = () => {
    Alert.alert(
      'Discard Changes',
      'Are you sure you want to discard your changes?',
      [
        { text: 'Keep Editing', style: 'cancel' },
        { 
          text: 'Discard', 
          style: 'destructive', 
          onPress: () => navigateBackToProductDetail()
        },
      ]
    );
  };

  const handleBackPress = () => {
    // Check if there are any changes made
    const hasChanges = 
      productName !== product.name ||
      brand !== product.brand ||
      price !== product.price.toString() ||
      description !== product.description ||
      category !== product.category ||
      imageUrl !== product.image ||
      inStock !== product.inStock ||
      JSON.stringify(vendors) !== JSON.stringify(product.vendors);

    if (hasChanges) {
      handleCancel();
    } else {
      navigateBackToProductDetail();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Icon name="times" size={20} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Product</Text>
        <TouchableOpacity onPress={handleUpdate} style={styles.saveButton} disabled={isLoading}>
          <Text style={styles.saveButtonText}>Update</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Product Name *</Text>
            <TextInput
              style={styles.input}
              value={productName}
              onChangeText={setProductName}
              placeholder="Enter product name"
              placeholderTextColor={colors.text.secondary}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Brand *</Text>
            <TextInput
              style={styles.input}
              value={brand}
              onChangeText={setBrand}
              placeholder="Enter brand name"
              placeholderTextColor={colors.text.secondary}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Price (₹) *</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={setPrice}
              placeholder="Enter price"
              placeholderTextColor={colors.text.secondary}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Category *</Text>
            <View style={styles.categoryContainer}>
              {categories.map((cat, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.categoryChip,
                    category === cat && styles.categoryChipSelected
                  ]}
                  onPress={() => setCategory(cat)}
                >
                  <Text style={[
                    styles.categoryText,
                    category === cat && styles.categoryTextSelected
                  ]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Image URL</Text>
            <TextInput
              style={styles.input}
              value={imageUrl}
              onChangeText={setImageUrl}
              placeholder="Enter image URL"
              placeholderTextColor={colors.text.secondary}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Enter product description"
              placeholderTextColor={colors.text.secondary}
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.label}>In Stock</Text>
            <Switch
              value={inStock}
              onValueChange={setInStock}
              trackColor={{ false: colors.border.light, true: colors.primary + '40' }}
              thumbColor={inStock ? colors.primary : colors.text.secondary}
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.vendorHeader}>
            <Text style={styles.sectionTitle}>Vendors</Text>
            <TouchableOpacity onPress={addVendor} style={styles.addVendorButton}>
              <Icon name="plus" size={14} color={colors.primary} />
              <Text style={styles.addVendorText}>Add More</Text>
            </TouchableOpacity>
          </View>

          {vendors.map((vendor, index) => (
            <View key={index} style={styles.vendorContainer}>
              <View style={styles.vendorHeader}>
                <Text style={styles.vendorTitle}>Vendor {index + 1}</Text>
                {vendors.length > 1 && (
                  <TouchableOpacity
                    onPress={() => removeVendor(index)}
                    style={styles.removeVendorButton}
                  >
                    <Icon name="times" size={16} color={colors.error} />
                  </TouchableOpacity>
                )}
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Vendor Name *</Text>
                <TextInput
                  style={styles.input}
                  value={vendor.name}
                  onChangeText={(value) => updateVendor(index, 'name', value)}
                  placeholder="e.g., Amazon, Flipkart, Nykaa"
                  placeholderTextColor={colors.text.secondary}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Vendor Link *</Text>
                <TextInput
                  style={styles.input}
                  value={vendor.link}
                  onChangeText={(value) => updateVendor(index, 'link', value)}
                  placeholder="https://example.com/product"
                  placeholderTextColor={colors.text.secondary}
                  autoCapitalize="none"
                />
              </View>
            </View>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Icon name="times" size={16} color={colors.text.secondary} />
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.updateButton, isLoading && styles.disabledButton]}
            onPress={handleUpdate}
            disabled={isLoading}
          >
            {isLoading ? (
              <Text style={styles.updateButtonText}>Updating...</Text>
            ) : (
              <>
                <Icon name="save" size={16} color={colors.white} />
                <Text style={styles.updateButtonText}>Update Product</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(15),
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
    elevation: 2,
  },
  backButton: {
    padding: moderateScale(5),
  },
  headerTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: colors.text.primary,
    flex: 1,
    textAlign: 'center',
  },
  saveButton: {
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(8),
    backgroundColor: colors.primary,
    borderRadius: moderateScale(6),
  },
  saveButtonText: {
    color: colors.white,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: moderateScale(20),
  },
  section: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(12),
    padding: moderateScale(20),
    marginBottom: moderateScale(20),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  sectionTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: moderateScale(20),
  },
  inputGroup: {
    marginBottom: moderateScale(20),
  },
  label: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: moderateScale(8),
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border.light,
    borderRadius: moderateScale(8),
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(12),
    fontSize: moderateScale(16),
    backgroundColor: colors.white,
  },
  textArea: {
    height: moderateScale(100),
    textAlignVertical: 'top',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: moderateScale(10),
  },
  categoryChip: {
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(8),
    borderRadius: moderateScale(20),
    borderWidth: 1,
    borderColor: colors.border.light,
    backgroundColor: colors.background.primary,
  },
  categoryChipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    fontSize: moderateScale(12),
    color: colors.text.secondary,
  },
  categoryTextSelected: {
    color: colors.white,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: moderateScale(10),
  },
  vendorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: moderateScale(20),
  },
  addVendorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(6),
    borderRadius: moderateScale(6),
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  addVendorText: {
    color: colors.primary,
    fontSize: moderateScale(12),
    fontWeight: '600',
    marginLeft: moderateScale(5),
  },
  vendorContainer: {
    borderWidth: 1,
    borderColor: colors.border.light,
    borderRadius: moderateScale(10),
    padding: moderateScale(15),
    marginBottom: moderateScale(15),
    backgroundColor: colors.background.primary,
  },
  vendorTitle: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: colors.text.primary,
  },
  removeVendorButton: {
    padding: moderateScale(5),
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: moderateScale(15),
    paddingBottom: moderateScale(30),
  },
  cancelButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.primary,
    paddingVertical: moderateScale(15),
    borderRadius: moderateScale(10),
    borderWidth: 1,
    borderColor: colors.border.light,
    gap: moderateScale(8),
  },
  cancelButtonText: {
    color: colors.text.secondary,
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  updateButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: moderateScale(15),
    borderRadius: moderateScale(10),
    gap: moderateScale(8),
  },
  disabledButton: {
    backgroundColor: colors.text.secondary,
  },
  updateButtonText: {
    color: colors.white,
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
});

export default EditProductScreen;