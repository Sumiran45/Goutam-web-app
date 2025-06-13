import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartProvider } from './src/Context/CartContext';

import LoginScreen from './src/Login';
import RegisterScreen from './src/Register';
import HomeScreen from './src/screens/Home';
import ShopScreen from './src/screens/tabs/shops';
import ProductDetail from './src/screens/tabs/shop/ProductDetails';
import ForgotPasswordScreen from './src/screens/Forgot_Password/ForgotPasswordScreen';
import ResetPasswordScreen from './src/screens/Forgot_Password/ResetPasswordScreen';
import EditProfileScreen from './src/screens/EditProfile';
import ChangePasswordScreen from './src/screens/Forgot_Password/ChangePassword';
import TermsOfServiceScreen from './src/screens/settings/termsOfServices';
import PrivacyPolicyScreen from './src/screens/settings/privacyPolicy';
import HelpSupportScreen from './src/screens/settings/helpSupport';
import AdminScreen from './src/screens/Admin/AdminScreen';
import { RootStackParamList } from './src/controller/RootStackParamList';
import AllActivitiesScreen from './src/screens/Admin/home/AllActivity';
import UserDetailsScreen from './src/screens/Admin/home/tabs/userScreen';
import ArticleDetailScreen from './src/screens/Admin/home/tabs/article/articleScreen';
import DoctorDetailScreen from './src/screens/tabs/DoctorsScreen';
import { LocationProvider } from './src/Context/LocationContext';
import ProductScreen from './src/screens/Admin/home/tabs/products/productScreen';
import ProductDetailScreen from './src/screens/Admin/home/tabs/products/productDetail';
import AddProductScreen from './src/screens/Admin/home/tabs/products/addProductScreen';
import EditProductScreen from './src/screens/Admin/home/tabs/products/editProductScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <LocationProvider>
        <CartProvider>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Shop" component={ShopScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ headerShown: false }} />
            <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} options={{ headerShown: false }}/>
            <Stack.Screen name='ResetPassword' component={ResetPasswordScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="TermsOfService" component={TermsOfServiceScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="HelpSupport" component={HelpSupportScreen} options={{ headerShown: false }}/>
            <Stack.Screen name='AdminScreen' component={AdminScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="AllActivities" component={AllActivitiesScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="UserDetails" component={UserDetailsScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="ArticleDetails" component={ArticleDetailScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="DoctorDetail" component={DoctorDetailScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="ProductScreen" component={ProductScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="AddProductScreen" component={AddProductScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="EditProductScreen" component={EditProductScreen} options={{ headerShown: false }}/>
          
          </Stack.Navigator>
        </CartProvider>
        </LocationProvider>
    </NavigationContainer>
  );
}