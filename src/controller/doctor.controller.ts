import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../Api/api';

export interface Doctor {
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

interface ApiDoctor {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  distance_km: number;
  phone?: string;
  address: string;
  consultation_fee: number;
  [key: string]: any;
}

export const getNearbyDoctors = async (
  lat: number,
  lng: number,
  radius: number = 5000, 
  specialty?: string,
  minRating?: number,
  maxDistance?: number,
  maxFee?: number
): Promise<Doctor[]> => {
  try {
    console.log('🔍 Fetching doctors with params:', {
      lat,
      lng,
      radius,
      specialty,
      minRating,
      maxDistance,
      maxFee
    });

    const token = await AsyncStorage.getItem('token');
    
    const params = new URLSearchParams({
      lat: lat.toString(),
      lng: lng.toString(),
      radius: radius.toString(),
    });

    if (specialty && specialty !== 'All' && specialty.trim() !== '') {
      params.append('specialty', specialty);
    }
    if (minRating && minRating > 0) {
      params.append('min_rating', minRating.toString());
    }
    if (maxDistance && maxDistance > 0) {
      params.append('max_distance', maxDistance.toString());
    }
    if (maxFee && maxFee > 0) {
      params.append('max_fee', maxFee.toString());
    }

    console.log('🌐 Making API call to:', `/doctors/nearby?${params.toString()}`);
    console.log('🔐 Using token:', token ? 'Token available' : 'No token found');

    const response = await api.get(`/doctors/nearby?${params.toString()}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }), 
      },
      timeout: 30000, 
    });

    console.log('✅ Raw API response status:', response.status);
    console.log('✅ Raw API response data:', response.data);
    console.log('📊 Number of doctors received:', Array.isArray(response.data) ? response.data.length : 'Not an array');

    if (!response.data) {
      console.log('⚠️ Empty response from API');
      return [];
    }

    if (!Array.isArray(response.data)) {
      console.error('❌ API response is not an array:', typeof response.data);
      console.log('Response data:', response.data);
      return []; 
    }

    if (response.data.length === 0) {
      console.log('⚠️ No doctors found in the specified area');
      return [];
    }

    const transformedDoctors: Doctor[] = response.data.map((apiDoctor: ApiDoctor, index: number) => {
      console.log(`🔄 Transforming doctor ${index + 1}:`, apiDoctor);
      
      return {
        id: apiDoctor.id || `doctor_${Date.now()}_${index}`,
        name: apiDoctor.name || 'Unknown Doctor',
        specialty: apiDoctor.specialization || 'General Physician',
        experience: Math.floor(Math.random() * 15) + 3, // Random experience between 3-18 years
        rating: typeof apiDoctor.rating === 'number' ? Math.max(0, Math.min(5, apiDoctor.rating)) : 4.0,
        distance: parseFloat((apiDoctor.distance_km || 0).toFixed(1)),
        phone: apiDoctor.phone || '+91-0000000000',
        email: apiDoctor.name ? 
          `${apiDoctor.name.toLowerCase().replace(/[^a-z0-9]/g, '.')}@hospital.com` : 
          'doctor@hospital.com',
        address: apiDoctor.address || 'Address not available',
        consultationFee: apiDoctor.consultation_fee || 500,
        availability: 'Mon-Sat 10AM-6PM',
        languages: ['Hindi', 'English'],
        qualifications: 'MBBS, MD',
        hospital: 'Local Hospital',
        about: `Experienced ${apiDoctor.specialization || 'doctor'} with focus on quality healthcare.`,
        services: ['General Consultation', 'Health Checkup', 'Treatment Planning'],
        awards: (apiDoctor.rating || 0) >= 4.5 ? ['Excellence in Healthcare', 'Patient Choice Award'] : [],
      };
    });

    console.log('🔄 Successfully transformed doctors:', transformedDoctors.length);
    return transformedDoctors;

  } catch (error: any) {
    console.error('❌ Error fetching nearby doctors:', error);
    
    if (error.response) {
      console.error('📤 Response status:', error.response.status);
      console.error('📤 Response data:', error.response.data);
      console.error('📤 Response headers:', error.response.headers);
      
      if (error.response.status === 500) {
        console.error('Server error - check backend logs');
      } else if (error.response.status === 401) {
        console.error('Authentication error - token may be invalid');
      }
    } else if (error.request) {
      console.error('📤 No response received:', error.request);
      console.error('Network error - check internet connection');
    } else {
      console.error('📤 Error message:', error.message);
    }
    
    return [];
  }
};

export const getDoctorDetails = async (doctorId: string) => {
  try {
    console.log('🔍 Fetching doctor details for ID:', doctorId);

    const token = await AsyncStorage.getItem('token');
    
    const response = await api.get(`/doctors/details/${doctorId}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      timeout: 15000,
    });

    console.log('✅ Doctor details response:', response.data);
    return response.data;

  } catch (error: any) {
    console.error('❌ Error fetching doctor details:', error);
    if (error.response) {
      console.error('📤 Response status:', error.response.status);
      console.error('📤 Response data:', error.response.data);
    }
    throw error;
  }
};

export const getSpecialties = async () => {
  try {
    console.log('🔍 Fetching specialties...');

    const token = await AsyncStorage.getItem('token');
    
    const response = await api.get('/doctors/specialties', {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      timeout: 15000,
    });

    console.log('✅ Specialties response:', response.data);
    return response.data.specialties || response.data;

  } catch (error: any) {
    console.error('❌ Error fetching specialties:', error);
    if (error.response) {
      console.error('📤 Response status:', error.response.status);
      console.error('📤 Response data:', error.response.data);
    }
    throw error;
  }
};

export const initiateCall = async (doctorId: string) => {
  try {
    console.log('📞 Initiating call for doctor:', doctorId);

    const token = await AsyncStorage.getItem('token');
    
    const response = await api.post(`/doctors/${doctorId}/call`, {}, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      timeout: 15000,
    });

    console.log('✅ Call initiation response:', response.data);
    return response.data;

  } catch (error: any) {
    console.error('❌ Error initiating call:', error);
    if (error.response) {
      console.error('📤 Response status:', error.response.status);
      console.error('📤 Response data:', error.response.data);
    }
    throw error;
  }
};

// Send email
export const sendEmail = async (doctorId: string) => {
  try {
    console.log('📧 Sending email to doctor:', doctorId);

    const token = await AsyncStorage.getItem('token');
    
    const response = await api.post(`/doctors/${doctorId}/email`, {}, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      timeout: 15000,
    });

    console.log('✅ Email response:', response.data);
    return response.data;

  } catch (error: any) {
    console.error('❌ Error sending email:', error);
    if (error.response) {
      console.error('📤 Response status:', error.response.status);
      console.error('📤 Response data:', error.response.data);
    }
    throw error;
  }
};

// Book appointment
export const bookAppointment = async (doctorId: string) => {
  try {
    console.log('📅 Booking appointment with doctor:', doctorId);

    const token = await AsyncStorage.getItem('token');
    
    const response = await api.post(`/doctors/${doctorId}/appointment`, {}, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      timeout: 15000,
    });

    console.log('✅ Appointment booking response:', response.data);
    return response.data;

  } catch (error: any) {
    console.error('❌ Error booking appointment:', error);
    if (error.response) {
      console.error('📤 Response status:', error.response.status);
      console.error('📤 Response data:', error.response.data);
    }
    throw error;
  }
};