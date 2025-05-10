import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartProvider } from './src/Context/CartContext';

import LoginScreen from './src/Login';
import RegisterScreen from './src/Register';
import HomeScreen from './src/screens/Home';
import ShopScreen from './src/screens/tabs/Shop';
import ProductDetail from './src/screens/tabs/shop/ProductDetails';
import CartScreen from './src/screens/tabs/shop/CartScreen';
import ForgotPasswordScreen from './src/screens/Forgot_Password/ForgotPasswordScreen';
import ResetPasswordScreen from './src/screens/Forgot_Password/ResetPasswordScreen';
import EditProfileScreen from './src/screens/EditProfile';
import ChangePasswordScreen from './src/screens/Forgot_Password/ChangePassword';
import TermsOfServiceScreen from './src/screens/settings/termsOfServices';
import PrivacyPolicyScreen from './src/screens/settings/privacyPolicy';
import HelpSupportScreen from './src/screens/settings/helpSupport';
import AdminScreen from './src/AdminScreen';
import { RootStackParamList } from './src/controller/RootStackParamList';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <CartProvider>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen}  options={{ headerShown: false }}  />
          <Stack.Screen name="Shop" component={ShopScreen}  options={{ headerShown: false }} />
          <Stack.Screen name="ProductDetail" component={ProductDetail}  options={{ headerShown: false }}  />
          <Stack.Screen name="Cart" component={CartScreen}  options={{ headerShown: false }}  />
          <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='ResetPassword' component={ResetPasswordScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="TermsOfService" component={TermsOfServiceScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="HelpSupport" component={HelpSupportScreen} options={{ headerShown: false }}/>
          {/* <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen}/> */}
          {/* <Stack.Screen name='ResetPassword' component={ResetPasswordScreen} /> */}
          <Stack.Screen name='AdminScreen' component={AdminScreen}/>
        </Stack.Navigator>
      </CartProvider>
    </NavigationContainer>
  );
}