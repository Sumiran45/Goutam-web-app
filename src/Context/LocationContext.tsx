import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';

const LocationContext = createContext();

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

export const LocationProvider = ({ children }:any) => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setPermissionGranted(true);
        return true;
      } else {
        setPermissionGranted(false);
        Alert.alert(
          'Location Permission Required',
          'This app needs location access to find doctors near you.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Settings', onPress: () => Location.requestForegroundPermissionsAsync() }
          ]
        );
        return false;
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
      return false;
    }
  };

  const getCurrentLocation = async () => {
    setLoading(true);
    try {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        setLoading(false);
        return null;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        timeout: 10000,
        maximumAge: 300000, 
      });

      setLocation(currentLocation.coords);
      
      const addressResponse = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      if (addressResponse.length > 0) {
        const addr = addressResponse[0];
        const formattedAddress = `${addr.street || ''} ${addr.city || ''} ${addr.region || ''} ${addr.postalCode || ''}`.trim();
        setAddress(formattedAddress);
      }

      setLoading(false);
      return currentLocation.coords;
    } catch (error) {
      setLoading(false);
      console.error('Error getting location:', error);
      Alert.alert(
        'Location Error',
        'Unable to get your current location. Please try again or check your location settings.'
      );
      return null;
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return Math.round(distance * 10) / 10; 
  };

  const sortDoctorsByDistance = (doctors, userLocation) => {
    if (!userLocation || !doctors) return doctors;

    return doctors.map(doctor => {
      const doctorCoords = getDoctorCoordinates(doctor.id);
      const distance = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        doctorCoords.latitude,
        doctorCoords.longitude
      );
      return { ...doctor, distance };
    }).sort((a, b) => a.distance - b.distance);
  };

  const getDoctorCoordinates = (doctorId) => {
    const bhopalCoords = {
      latitude: 23.2599,
      longitude: 77.4126
    };

    const offsets = {
      '1': { lat: 0.01, lng: 0.01 },
      '2': { lat: -0.02, lng: 0.015 },
      '3': { lat: 0.025, lng: -0.02 },
      '4': { lat: -0.005, lng: 0.008 },
    };

    const offset = offsets[doctorId] || { lat: 0, lng: 0 };
    
    return {
      latitude: bhopalCoords.latitude + offset.lat,
      longitude: bhopalCoords.longitude + offset.lng
    };
  };

  const getNearbyDoctors = (doctors, radius = 10) => {
    if (!location || !doctors) return doctors;

    return doctors.filter(doctor => {
      const doctorCoords = getDoctorCoordinates(doctor.id);
      const distance = calculateDistance(
        location.latitude,
        location.longitude,
        doctorCoords.latitude,
        doctorCoords.longitude
      );
      return distance <= radius;
    });
  };

  const watchLocation = async () => {
    try {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) return null;

      const locationWatcher = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 10000,
          distanceInterval: 100, 
        },
        (newLocation) => {
          setLocation(newLocation.coords);
        }
      );

      return locationWatcher;
    } catch (error) {
      console.error('Error watching location:', error);
      return null;
    }
  };

  useEffect(() => {
    getCurrentLocation();
    
    Location.getForegroundPermissionsAsync().then(({ status }) => {
      setPermissionGranted(status === 'granted');
    });
  }, []);

const value = {
    location,
    address,
    loading,
    permissionGranted,
    getCurrentLocation,
    calculateDistance,
    sortDoctorsByDistance,
    getNearbyDoctors,
    watchLocation,
    requestLocationPermission,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};