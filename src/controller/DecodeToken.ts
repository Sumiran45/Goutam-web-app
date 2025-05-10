import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

export const DecodeToken= async ()=>{
    const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.log('No token found');
        return null;
      }
    
      try {
        const decoded: any = jwtDecode(token);
        console.log('Decoded Token:', decoded);
        return decoded;
      } catch (error) {
        console.error('Invalid token', error);
        return null;
      }
}