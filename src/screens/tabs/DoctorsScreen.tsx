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

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  distance: number;
  phone: string;
  email: string;
  address: string;
  consultationFee: number;
  availability: string;
  languages: string[];
  qualifications: string;
  hospital: string;
  about: string;
  services: string[];
  awards: string[];
}

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

  const { 
    location, 
    getCurrentLocation, 
    sortDoctorsByDistance, 
    getNearbyDoctors,
    loading: locationLoading 
  } = useLocation();

  const mockDoctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Priya Sharma',
      specialty: 'Gynecologist',
      experience: 12,
      rating: 4.8,
      distance: 1.2,
      phone: '+91-9876543210',
      email: 'dr.priya@healthcenter.com',
      address: 'Apollo Hospital, Sector 26, Bhopal',
      consultationFee: 800,
      availability: 'Mon-Sat 10AM-6PM',
      languages: ['Hindi', 'English'],
      qualifications: 'MBBS, MD (Gynecology)',
      hospital: 'Apollo Hospital',
      about: 'Dr. Priya Sharma is a highly experienced gynecologist with over 12 years of practice in women\'s health. She specializes in reproductive health, pregnancy care, and gynecological surgeries.',
      services: ['Prenatal Care', 'Gynecological Surgery', 'Infertility Treatment', 'Menopause Management'],
      awards: ['Best Gynecologist Award 2023', 'Excellence in Women\'s Health 2022'],
    },
    {
      id: '2',
      name: 'Dr. Anjali Gupta',
      specialty: 'Gynecologist',
      experience: 8,
      rating: 4.6,
      distance: 2.1,
      phone: '+91-9876543211',
      email: 'dr.anjali@fortis.com',
      address: 'Fortis Hospital, New Market, Bhopal',
      consultationFee: 600,
      availability: 'Mon-Fri 9AM-5PM',
      languages: ['Hindi', 'English'],
      qualifications: 'MBBS, MS (Gynecology)',
      hospital: 'Fortis Hospital',
      about: 'Dr. Anjali Gupta is a dedicated gynecologist focusing on minimally invasive procedures and women\'s wellness.',
      services: ['Laparoscopic Surgery', 'Cancer Screening', 'Family Planning', 'Adolescent Health'],
      awards: ['Young Achiever in Medicine 2023'],
    },
    {
      id: '3',
      name: 'Dr. Kavita Patel',
      specialty: 'Endocrinologist',
      experience: 15,
      rating: 4.9,
      distance: 3.5,
      phone: '+91-9876543212',
      email: 'dr.kavita@aiims.edu',
      address: 'AIIMS Bhopal, Saket Nagar',
      consultationFee: 1000,
      availability: 'Tue-Sat 11AM-4PM',
      languages: ['Hindi', 'English'],
      qualifications: 'MBBS, MD (Endocrinology)',
      hospital: 'AIIMS Bhopal',
      about: 'Dr. Kavita Patel is a renowned endocrinologist specializing in diabetes, thyroid disorders, and hormonal imbalances.',
      services: ['Diabetes Management', 'Thyroid Treatment', 'PCOS Treatment', 'Hormone Therapy'],
      awards: ['Excellence in Endocrinology 2023', 'Research Excellence Award 2022'],
    },
    {
      id: '4',
      name: 'Dr. Meera Singh',
      specialty: 'General Physician',
      experience: 6,
      rating: 4.4,
      distance: 0.8,
      phone: '+91-9876543213',
      email: 'dr.meera@maxhealthcare.com',
      address: 'Max Healthcare, MP Nagar, Bhopal',
      consultationFee: 400,
      availability: 'Mon-Sun 8AM-8PM',
      languages: ['Hindi', 'English'],
      qualifications: 'MBBS, MD (Medicine)',
      hospital: 'Max Healthcare',
      about: 'Dr. Meera Singh is a compassionate general physician with expertise in preventive care and chronic disease management.',
      services: ['General Consultation', 'Health Checkups', 'Chronic Disease Management', 'Preventive Care'],
      awards: ['Patient\'s Choice Award 2023'],
    },
  ];

  const specialties: string[] = ['All', 'Gynecologist', 'Endocrinologist', 'General Physician'];

  useEffect(() => {
    loadDoctors();
  }, []);

  useEffect(() => {
    filterDoctors();
  }, [searchQuery, selectedSpecialty, doctors, location]);

  const loadDoctors = async (): Promise<void> => {
    setLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        // Sort doctors by distance if location is available
        const sortedDoctors = location 
          ? sortDoctorsByDistance(mockDoctors, location)
          : mockDoctors;
        
        setDoctors(sortedDoctors);
        setLoading(false);
      }, 1000);
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Failed to load doctors');
    }
  };

  const onRefresh = async (): Promise<void> => {
    setRefreshing(true);
    // Refresh location and doctors
    await getCurrentLocation();
    await loadDoctors();
    setRefreshing(false);
  };

  const filterDoctors = (): void => {
    let filtered = doctors;

    if (selectedSpecialty !== 'All') {
      filtered = filtered.filter(doctor => doctor.specialty === selectedSpecialty);
    }

    if (searchQuery) {
      filtered = filtered.filter(doctor =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort by distance if location is available
    if (location) {
      filtered = sortDoctorsByDistance(filtered, location);
    } else {
      // Fallback sorting by rating if no location
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredDoctors(filtered);
  };

  const handleCall = (phoneNumber: string): void => {
    Linking.openURL(`tel:${phoneNumber}`);
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
          onPress={() => handleCall(item.phone)}
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
      onPress={() => setSelectedSpecialty(item)}
    >
      <Text style={[
        styles.specialtyText,
        selectedSpecialty === item && styles.selectedSpecialtyText
      ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

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
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search doctors or specialties..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
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
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="medical" size={64} color="#E0E0E0" />
            <Text style={styles.emptyText}>No doctors found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your search or filters</Text>
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
    paddingRight: 40, // Extra padding to ensure last item is visible
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
    minWidth: 100, // Ensure minimum width for readability
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
  },
});

export { DoctorsScreen };