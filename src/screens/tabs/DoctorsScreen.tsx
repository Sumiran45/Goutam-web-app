import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Alert,
  Linking,
  RefreshControl,
  ListRenderItem,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocation } from './../../Context/LocationContext';
import {
  getNearbyDoctors,
  getSpecialties,
  initiateCall,
  Doctor
} from '../../controller/doctor.controller';

interface DoctorsScreenProps {
  navigation: any;
}

const DoctorsScreen: React.FC<DoctorsScreenProps> = ({ navigation }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');
  const [specialties, setSpecialties] = useState<string[]>([
    'All',
    'General Physician',
    'Cardiologist',
    'Dermatologist',
    'Gynecologist',
    'Endocrinologist',
    'Pediatrician',
    'Orthopedic',
    'Psychiatrist',
    'Ophthalmologist'
  ]);

  const {
    location,
    getCurrentLocation,
    sortDoctorsByDistance,
    getNearbyDoctors: locationGetNearbyDoctors,
    loading: locationLoading
  } = useLocation();

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (location) {
      loadDoctors();
    }
  }, [location]);

  useEffect(() => {
    filterDoctors();
  }, [searchQuery, selectedSpecialty, doctors]);

  const loadInitialData = async (): Promise<void> => {
    try {
      await loadSpecialties();

      await loadDoctors();
    } catch (error) {
      console.error('❌ Error loading initial data:', error);
    }
  };

  const loadSpecialties = async (): Promise<void> => {
    try {
      const specialtiesData = await getSpecialties();

      if (specialtiesData && specialtiesData.length > 0) {
        const specialtyNames = specialtiesData.map((spec: any) => spec.name);
        setSpecialties(specialtyNames);
      }
    } catch (error) {
      console.error('❌ Error loading specialties:', error);
    }
  };

  const loadDoctors = async (): Promise<void> => {
    if (!location) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {

      const doctorsData = await getNearbyDoctors(
        location.latitude,
        location.longitude,
        500000, // 500km radius
        selectedSpecialty === 'All' ? undefined : selectedSpecialty
      );

      setDoctors(doctorsData);

    } catch (error) {
      console.error('❌ Error loading doctors:', error);
      Alert.alert(
        'Error',
        'Failed to load doctors. Please check your internet connection and try again.',
        [
          { text: 'OK' },
          { text: 'Retry', onPress: loadDoctors }
        ]
      );
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async (): Promise<void> => {
    setRefreshing(true);
    try {
      await getCurrentLocation();

      await loadSpecialties();
      await loadDoctors();

    } catch (error) {
      console.error('❌ Error refreshing data:', error);
      Alert.alert('Error', 'Failed to refresh data');
    } finally {
      setRefreshing(false);
    }
  };

  const filterDoctors = (): void => {

    let filtered = doctors;

    if (selectedSpecialty !== 'All') {
      filtered = filtered.filter(doctor =>
        doctor.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase())
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(doctor =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (location) {
      filtered.sort((a, b) => a.distance - b.distance);
    } else {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredDoctors(filtered);
  };

  const handleCall = async (doctor: Doctor): Promise<void> => {
    try {

      const callResponse = await initiateCall(doctor.id);

      if (callResponse.phone) {
        Linking.openURL(`tel:${callResponse.phone}`);
      } else {
        Linking.openURL(`tel:${doctor.phone}`);
      }

    } catch (error) {
      console.error('❌ Error initiating call:', error);
      Alert.alert('Error', 'Failed to initiate call');
    }
  };

  const handleEmail = (email: string): void => {
    Linking.openURL(`mailto:${email}`);
  };

  const renderDoctor: ListRenderItem<Doctor> = ({ item }) => (
    <TouchableOpacity
      style={styles.doctorCard}
      onPress={() => navigation.navigate('DoctorDetail', { doctor: item })}
    >
      <View style={styles.doctorHeader}>
        <View style={styles.doctorAvatar}>
          <Text style={styles.avatarText}>{item.name.charAt(3)}</Text>
        </View>
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>{item.name}</Text>
          <Text style={styles.specialty}>{item.specialty}</Text>
          <View style={styles.experienceContainer}>
            <Ionicons name="medical" size={14} color="#666" />
            <Text style={styles.experience}>{item.experience} years experience</Text>
          </View>
        </View>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
      </View>

      <View style={styles.doctorDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="location" size={14} color="#3498db" />
          <Text style={styles.distance}>
            {location ? `${item.distance} km away` : item.address}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="cash" size={14} color="#4CAF50" />
          <Text style={styles.fee}>₹{item.consultationFee} consultation</Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.callButton]}
          onPress={() => handleCall(item)}
        >
          <Ionicons name="call" size={16} color="#FFF" />
          <Text style={styles.buttonText}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.detailButton]}
          onPress={() => navigation.navigate('DoctorDetail', { doctor: item })}
        >
          <Ionicons name="information-circle" size={16} color="#FFF" />
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderSpecialtyFilter: ListRenderItem<string> = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.specialtyChip,
        selectedSpecialty === item && styles.selectedSpecialty
      ]}
      onPress={() => {
        setSelectedSpecialty(item);
      }}
    >
      <Text style={[
        styles.specialtyText,
        selectedSpecialty === item && styles.selectedSpecialtyText
      ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const getEmptyStateMessage = () => {
    if (loading) {
      return {
        title: 'Loading doctors...',
        subtitle: 'Please wait while we find doctors near you'
      };
    }

    if (!location) {
      return {
        title: 'Location required',
        subtitle: 'Please enable location to find nearby doctors'
      };
    }

    if (doctors.length === 0) {
      return {
        title: 'No doctors found',
        subtitle: 'Try expanding your search area or check your connection'
      };
    }

    return {
      title: 'No doctors match your filters',
      subtitle: 'Try adjusting your search or filters'
    };
  };

  const emptyState = getEmptyStateMessage();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#3498db" barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Find Doctors</Text>
        <Text style={styles.headerSubtitle}>
          {location
            ? 'Women\'s Health Specialists Near You'
            : 'Women\'s Health Specialists in Bhopal'
          }
        </Text>
        {locationLoading && (
          <Text style={styles.locationStatus}>Getting your location...</Text>
        )}
        {!location && !locationLoading && (
          <TouchableOpacity onPress={getCurrentLocation}>
            <Text style={[styles.locationStatus, { textDecorationLine: 'underline' }]}>
              Tap to enable location
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search doctors or specialties..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
          underlineColorAndroid="transparent"
          style={[
            styles.searchInput,
            {
              borderWidth: 0,
              borderColor: 'transparent',
              backgroundColor: 'transparent',
              outlineWidth: 0,
            }
          ]}
        />
      </View>

      <View style={styles.filterSection}>
        <Text style={styles.filterTitle}>Specialties</Text>
        <FlatList
          data={specialties}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderSpecialtyFilter}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.specialtyListContent}
          ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
        />
      </View>

      <FlatList
        data={filteredDoctors}
        renderItem={renderDoctor}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.doctorsList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#3498db']}
            tintColor="#3498db"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="medical" size={64} color="#E0E0E0" />
            <Text style={styles.emptyText}>{emptyState.title}</Text>
            <Text style={styles.emptySubtext}>{emptyState.subtitle}</Text>
            {!location && !locationLoading && (
              <TouchableOpacity
                style={styles.enableLocationButton}
                onPress={getCurrentLocation}
              >
                <Text style={styles.enableLocationText}>Enable Location</Text>
              </TouchableOpacity>
            )}
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default DoctorsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#3498db',
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#E3F2FD',
  },
  locationStatus: {
    fontSize: 12,
    color: '#B3E5FC',
    marginTop: 4,
    fontStyle: 'italic',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginTop: -10,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#333',
    borderColor: 'transparent',
  },
  filterSection: {
    marginBottom: 16,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginHorizontal: 20,
    marginBottom: 12,
  },
  specialtyListContent: {
    paddingHorizontal: 20,
    paddingRight: 40,
  },
  specialtyChip: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    minWidth: 100,
    alignItems: 'center',
  },
  selectedSpecialty: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
    elevation: 3,
  },
  specialtyText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
  },
  selectedSpecialtyText: {
    color: '#FFF',
    fontWeight: '600',
  },
  doctorsList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  doctorCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  doctorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  doctorAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: '600',
    marginBottom: 4,
  },
  experienceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  experience: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rating: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF8F00',
    marginLeft: 4,
  },
  doctorDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  distance: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
  fee: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  callButton: {
    backgroundColor: '#4CAF50',
  },
  detailButton: {
    backgroundColor: '#3498db',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 14,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#999',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#BBB',
    marginTop: 4,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  enableLocationButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 16,
  },
  enableLocationText: {
    color: '#FFF',
    fontWeight: '600',
  },
});

export { DoctorsScreen };