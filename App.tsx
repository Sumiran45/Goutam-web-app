import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartProvider } from './src/Context/CartContext';

import LoginScreen from './src/Login';
import RegisterScreen from './src/Register';
import HomeScreen from './src/screens/Home';
import ShopScreen from './src/screens/tabs/shop';
import ProductDetail from './src/screens/tabs/shop/ProductDetails';
import CartScreen from './src/screens/tabs/shop/CartScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <CartProvider>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Shop" component={ShopScreen} />
          <Stack.Screen name="ProductDetail" component={ProductDetail} />
          <Stack.Screen name="Cart" component={CartScreen} />
        </Stack.Navigator>
      </CartProvider>
    </NavigationContainer>
  );
}
