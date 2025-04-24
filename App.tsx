// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import Login from './src/Login';

// export default function App() {
//   return <Login/> 
//   // return (
//   //   <View style={styles.container}>
//   //     <Text style={styles.text}>Tailwind is working!</Text>
//   //   </View>
//   // );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   text: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#2563eb', // Tailwind's blue-600
//   },
// });

// App.tsx or Navigation.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/Login';
import RegisterScreen from './src/Register';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
