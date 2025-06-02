import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DoctorDetailScreen = ({ route, navigation }) => {
  const { doctor } = route.params;

  const handleCall = () => {
    Linking.openURL(`tel:${doctor.phone}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${doctor.email}`);
  };

  const handleBookAppointment = () => {
    alert('Booking functionality will be implemented soon!');
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Ionicons key={i} name="star" size={16} color="#FFD700" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Ionicons key="half" name="star-half" size={16} color="#FFD700" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Ionicons key={`empty-${i}`} name="star-outline" size={16} color="#FFD700" />
      );
    }

    return stars;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#3498db" barStyle="light-content" />
      
      {/* Simplified Header - No Back Button */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Doctor Profile</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Doctor Profile Section - Better Centered */}
        <View style={styles.profileSection}>
          <View style={styles.doctorAvatar}>
            <Text style={styles.avatarText}>{doctor.name.charAt(0)}</Text>
          </View>
          <View style={styles.doctorInfo}>
            <Text style={styles.doctorName}>{doctor.name}</Text>
            <Text style={styles.specialty}>{doctor.specialty}</Text>
            <Text style={styles.hospital}>{doctor.hospital}</Text>
            
            {/* Rating Section */}
            <View style={styles.ratingSection}>
              <View style={styles.starsContainer}>
                {renderStars(doctor.rating)}
              </View>
              <Text style={styles.ratingText}>{doctor.rating} out of 5</Text>
            </View>
          </View>
        </View>

        {/* Quick Info Cards */}
        <View style={styles.quickInfoSection}>
          <View style={styles.infoCard}>
            <Ionicons name="medical-outline" size={24} color="#3498db" />
            <Text style={styles.infoCardNumber}>{doctor.experience}</Text>
            <Text style={styles.infoCardLabel}>Years Experience</Text>
          </View>
          <View style={styles.infoCard}>
            <Ionicons name="location-outline" size={24} color="#3498db" />
            <Text style={styles.infoCardNumber}>{doctor.distance}</Text>
            <Text style={styles.infoCardLabel}>km away</Text>
          </View>
          <View style={styles.infoCard}>
            <Ionicons name="cash-outline" size={24} color="#3498db" />
            <Text style={styles.infoCardNumber}>₹{doctor.consultationFee}</Text>
            <Text style={styles.infoCardLabel}>Consultation</Text>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Doctor</Text>
          <Text style={styles.aboutText}>{doctor.about}</Text>
        </View>

        {/* Qualifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Qualifications</Text>
          <View style={styles.qualificationContainer}>
            <Ionicons name="school-outline" size={20} color="#3498db" />
            <Text style={styles.qualificationText}>{doctor.qualifications}</Text>
          </View>
        </View>

        {/* Services Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Services Offered</Text>
          <View style={styles.servicesContainer}>
            {doctor.services?.map((service, index) => (
              <View key={index} style={styles.serviceItem}>
                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                <Text style={styles.serviceText}>{service}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Awards Section */}
        {doctor.awards && doctor.awards.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Awards & Recognition</Text>
            <View style={styles.awardsContainer}>
              {doctor.awards.map((award, index) => (
                <View key={index} style={styles.awardItem}>
                  <Ionicons name="trophy" size={16} color="#FFD700" />
                  <Text style={styles.awardText}>{award}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          
          <View style={styles.contactItem}>
            <Ionicons name="location" size={20} color="#3498db" />
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Address</Text>
              <Text style={styles.contactText}>{doctor.address}</Text>
            </View>
          </View>

          <View style={styles.contactItem}>
            <Ionicons name="time" size={20} color="#3498db" />
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Availability</Text>
              <Text style={styles.contactText}>{doctor.availability}</Text>
            </View>
          </View>

          <View style={styles.contactItem}>
            <Ionicons name="language" size={20} color="#3498db" />
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Languages</Text>
              <Text style={styles.contactText}>{doctor.languages?.join(', ')}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.callButton} onPress={handleCall}>
            <Ionicons name="call" size={20} color="#FFF" />
            <Text style={styles.actionButtonText}>Call Doctor</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.emailButton} onPress={handleEmail}>
            <Ionicons name="mail" size={20} color="#FFF" />
            <Text style={styles.actionButtonText}>Send Email</Text>
          </TouchableOpacity>
        </View>

        {/* Main Action Buttons Row */}
        <View style={styles.mainActionSection}>
          <TouchableOpacity style={styles.bookButton} onPress={handleBookAppointment}>
            <Ionicons name="calendar" size={20} color="#FFF" />
            <Text style={styles.bookButtonText}>Book Appointment</Text>
          </TouchableOpacity>

          {/* Professional Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color="#666" />
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingTop: 45,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  doctorAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  avatarText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFF',
  },
  doctorInfo: {
    alignItems: 'center',
    width: '100%',
  },
  doctorName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  specialty: {
    fontSize: 18,
    color: '#3498db',
    fontWeight: '600',
    marginBottom: 6,
    textAlign: 'center',
  },
  hospital: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  ratingSection: {
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
  },
  quickInfoSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingVertical: 20,
    marginHorizontal: 4,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  infoCardNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
    marginBottom: 4,
  },
  infoCardLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  qualificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qualificationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
    flex: 1,
  },
  servicesContainer: {
    marginTop: 8,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
  },
  awardsContainer: {
    marginTop: 8,
  },
  awardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  awardText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  contactInfo: {
    marginLeft: 12,
    flex: 1,
  },
  contactLabel: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
    marginBottom: 2,
  },
  contactText: {
    fontSize: 14,
    color: '#333',
  },
  actionSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  callButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  emailButton: {
    flex: 1,
    backgroundColor: '#FF9800',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 8,
  },
  actionButtonText: {
    color: '#FFF',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 14,
  },
  mainActionSection: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  bookButton: {
    backgroundColor: '#3498db',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 12,
  },
  bookButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },
  backButton: {
    backgroundColor: '#F8F9FA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  backButtonText: {
    color: '#666',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 16,
  },
  bottomPadding: {
    height: 20,
  },
});

export default DoctorDetailScreen;