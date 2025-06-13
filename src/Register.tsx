// import React, { useState } from 'react';
// import {
//   View, Text, TextInput, TouchableOpacity, Image,
//   KeyboardAvoidingView, Platform, ScrollView, StatusBar,
//   Dimensions, Modal, Alert, ViewStyle, TextStyle
// } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { useRegister } from './controller/Register.controller';
// import { styles } from './styles/Register.style';

// const { width, height } = Dimensions.get('window');

// interface OnboardingData {
//   firstName: string;
//   lastName: string;
//   age: string;
//   weight: string;
//   height: string;
//   lastPeriodDate: string;
//   cycleLength: string;
//   periodLength: string;
//   symptoms: string[];
//   goals: string[];
// }

// export default function RegisterScreen({ navigation }: any) {
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
//   const [showVerification, setShowVerification] = useState<boolean>(false);
//   const [currentSlide, setCurrentSlide] = useState<number>(0);
//   const [registrationType, setRegistrationType] = useState<'email' | 'phone'>('email');
//   const [verificationCode, setVerificationCode] = useState<string>('');
//   const [isVerifying, setIsVerifying] = useState<boolean>(false);

//   const [onboardingData, setOnboardingData] = useState<OnboardingData>({
//     firstName: '',
//     lastName: '',
//     age: '',
//     weight: '',
//     height: '',
//     lastPeriodDate: '',
//     cycleLength: '28',
//     periodLength: '5',
//     symptoms: [],
//     goals: []
//   });

//   const {
//     username, email, password, confirmPassword, phoneNumber,
//     showPassword, showConfirmPassword,
//     errors,
//     handleUsernameChange, handleEmailChange, handlePhoneNumberChange,
//     handlePasswordChange, handleConfirmPasswordChange,
//     togglePasswordVisibility, toggleConfirmPasswordVisibility,
//     handleRegister,
//   } = useRegister(navigation, setIsLoading);

//   React.useEffect(() => {
//     navigation.setOptions({
//       headerShown: false,
//     });
//   }, [navigation]);

//   const handleSuccessfulRegister = async () => {
//     try {
//       setIsLoading(true);
//       const result = await handleRegister();

//       if (result && result.success) {
//         setIsLoading(false);
//         setShowVerification(true);
//       } else {
//         setIsLoading(false);
//         Alert.alert('Registration Failed', 'Please check your information and try again.');
//       }
//     } catch (error) {
//       setIsLoading(false);
//       Alert.alert('Registration Failed', 'An error occurred during registration.');
//     }
//   };

//   const handleVerificationCodeSubmit = async () => {
//     if (!verificationCode || verificationCode.length !== 6) {
//       Alert.alert('Invalid Code', 'Please enter a valid 6-digit verification code.');
//       return;
//     }

//     try {
//       setIsVerifying(true);
//       // Here you would call your verification API
//       // const verificationResult = await verifyEmailCode(verificationCode);
      
//       // Simulating API call
//       await new Promise(resolve => setTimeout(resolve, 2000));
      
//       setIsVerifying(false);
//       setShowVerification(false);
//       setShowOnboarding(true);
//     } catch (error) {
//       setIsVerifying(false);
//       Alert.alert('Verification Failed', 'Invalid verification code. Please try again.');
//     }
//   };

//   const handleResendCode = async () => {
//     try {
//       // Here you would call your resend verification code API
//       // await resendVerificationCode();
//       Alert.alert('Code Sent', 'A new verification code has been sent to your email.');
//     } catch (error) {
//       Alert.alert('Error', 'Failed to resend verification code. Please try again.');
//     }
//   };

//   const handleSkip = () => {
//     setShowOnboarding(false);
//     navigation.navigate('Home');
//   };

//   const handleNext = () => {
//     if (currentSlide < 3) {
//       setCurrentSlide(currentSlide + 1);
//     } else {
//       handleCompleteOnboarding();
//     }
//   };

//   const handlePrevious = () => {
//     if (currentSlide > 0) {
//       setCurrentSlide(currentSlide - 1);
//     }
//   };

//   const handleCompleteOnboarding = async () => {
//     try {
//       console.log('Onboarding data:', onboardingData);
//       setShowOnboarding(false);
//       navigation.navigate('Home');
//     } catch (error) {
//       Alert.alert('Error', 'Failed to save profile information');
//     }
//   };

//   const updateOnboardingData = (field: keyof OnboardingData, value: any) => {
//     setOnboardingData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const toggleSymptom = (symptom: string) => {
//     setOnboardingData((prev: OnboardingData) => ({
//       ...prev,
//       symptoms: prev.symptoms.includes(symptom)
//         ? prev.symptoms.filter((s: string) => s !== symptom)
//         : [...prev.symptoms, symptom]
//     }));
//   };

//   const toggleGoal = (goal: string) => {
//     setOnboardingData((prev: OnboardingData) => ({
//       ...prev,
//       goals: prev.goals.includes(goal)
//         ? prev.goals.filter((g: string) => g !== goal)
//         : [...prev.goals, goal]
//     }));
//   };

//   const renderProgressBar = () => {
//     const progressWidth = ((currentSlide + 1) / 4) * 100;

//     return (
//       <View style={onboardingStyles.progressBarContainer}>
//         <View style={onboardingStyles.progressBarBackground}>
//           <View style={[onboardingStyles.progressBarFill, { width: `${progressWidth}%` }]} />
//         </View>
//         <Text style={onboardingStyles.progressText}>{currentSlide + 1} of 4</Text>
//       </View>
//     );
//   };

//   const renderSlide = () => {
//     switch (currentSlide) {
//       case 0:
//         return (
//           <View style={onboardingStyles.slideContainer}>
//             <Text style={onboardingStyles.slideTitle}>Personal Information</Text>
//             <Text style={onboardingStyles.slideSubtitle}>Let's get to know you better</Text>

//             <View style={onboardingStyles.inputRow}>
//               <View style={[onboardingStyles.inputContainer, { flex: 1, marginRight: 10 }]}>
//                 <TextInput
//                   placeholder="First Name"
//                   value={onboardingData.firstName}
//                   onChangeText={(text) => updateOnboardingData('firstName', text)}
//                   style={onboardingStyles.input}
//                   placeholderTextColor="#999"
//                 />
//               </View>
//               <View style={[onboardingStyles.inputContainer, { flex: 1, marginLeft: 10 }]}>
//                 <TextInput
//                   placeholder="Last Name"
//                   value={onboardingData.lastName}
//                   onChangeText={(text) => updateOnboardingData('lastName', text)}
//                   style={onboardingStyles.input}
//                   placeholderTextColor="#999"
//                 />
//               </View>
//             </View>

//             <View style={onboardingStyles.inputRow}>
//               <View style={[onboardingStyles.inputContainer, { flex: 1, marginRight: 10 }]}>
//                 <TextInput
//                   placeholder="Age"
//                   value={onboardingData.age}
//                   onChangeText={(text) => updateOnboardingData('age', text)}
//                   style={onboardingStyles.input}
//                   keyboardType="numeric"
//                   placeholderTextColor="#999"
//                 />
//               </View>
//               <View style={[onboardingStyles.inputContainer, { flex: 1, marginLeft: 10 }]}>
//                 <TextInput
//                   placeholder="Weight (kg)"
//                   value={onboardingData.weight}
//                   onChangeText={(text) => updateOnboardingData('weight', text)}
//                   style={onboardingStyles.input}
//                   keyboardType="numeric"
//                   placeholderTextColor="#999"
//                 />
//               </View>
//             </View>

//             <View style={onboardingStyles.inputContainer}>
//               <TextInput
//                 placeholder="Height (cm)"
//                 value={onboardingData.height}
//                 onChangeText={(text) => updateOnboardingData('height', text)}
//                 style={onboardingStyles.input}
//                 keyboardType="numeric"
//                 placeholderTextColor="#999"
//               />
//             </View>
//           </View>
//         );

//       case 1:
//         return (
//           <View style={onboardingStyles.slideContainer}>
//             <Text style={onboardingStyles.slideTitle}>Cycle Information</Text>
//             <Text style={onboardingStyles.slideSubtitle}>Help us track your cycle accurately</Text>

//             <View style={onboardingStyles.inputContainer}>
//               <Text style={onboardingStyles.inputLabel}>Last Period Start Date</Text>
//               <TextInput
//                 placeholder="DD/MM/YYYY"
//                 value={onboardingData.lastPeriodDate}
//                 onChangeText={(text) => updateOnboardingData('lastPeriodDate', text)}
//                 style={onboardingStyles.input}
//                 placeholderTextColor="#999"
//               />
//             </View>

//             <View style={onboardingStyles.inputRow}>
//               <View style={[onboardingStyles.inputContainer, { flex: 1, marginRight: 10 }]}>
//                 <Text style={onboardingStyles.inputLabel}>Cycle Length (days)</Text>
//                 <TextInput
//                   placeholder="28"
//                   value={onboardingData.cycleLength}
//                   onChangeText={(text) => updateOnboardingData('cycleLength', text)}
//                   style={onboardingStyles.input}
//                   keyboardType="numeric"
//                   placeholderTextColor="#999"
//                 />
//               </View>
//               <View style={[onboardingStyles.inputContainer, { flex: 1, marginLeft: 10 }]}>
//                 <Text style={onboardingStyles.inputLabel}>Period Length (days)</Text>
//                 <TextInput
//                   placeholder="5"
//                   value={onboardingData.periodLength}
//                   onChangeText={(text) => updateOnboardingData('periodLength', text)}
//                   style={onboardingStyles.input}
//                   keyboardType="numeric"
//                   placeholderTextColor="#999"
//                 />
//               </View>
//             </View>
//           </View>
//         );

//       case 2:
//         return (
//           <View style={onboardingStyles.slideContainer}>
//             <Text style={onboardingStyles.slideTitle}>Common Symptoms</Text>
//             <Text style={onboardingStyles.slideSubtitle}>Select symptoms you typically experience</Text>

//             <View style={onboardingStyles.optionsContainer}>
//               {['Cramps', 'Headaches', 'Mood Swings', 'Bloating', 'Fatigue', 'Nausea', 'Back Pain', 'Tender Breasts'].map((symptom) => (
//                 <TouchableOpacity
//                   key={symptom}
//                   style={[
//                     onboardingStyles.optionButton,
//                     onboardingData.symptoms.includes(symptom) && onboardingStyles.selectedOption
//                   ]}
//                   onPress={() => toggleSymptom(symptom)}
//                 >
//                   <Text style={[
//                     onboardingStyles.optionText,
//                     onboardingData.symptoms.includes(symptom) && onboardingStyles.selectedOptionText
//                   ]}>
//                     {symptom}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>
//         );

//       case 3:
//         return (
//           <View style={onboardingStyles.slideContainer}>
//             <Text style={onboardingStyles.slideTitle}>Your Goals</Text>
//             <Text style={onboardingStyles.slideSubtitle}>What would you like to achieve?</Text>

//             <View style={onboardingStyles.optionsContainer}>
//               {['Track Period', 'Monitor Symptoms', 'Plan Pregnancy', 'Avoid Pregnancy', 'Improve Health', 'Understand Patterns'].map((goal) => (
//                 <TouchableOpacity
//                   key={goal}
//                   style={[
//                     onboardingStyles.optionButton,
//                     onboardingData.goals.includes(goal) && onboardingStyles.selectedOption
//                   ]}
//                   onPress={() => toggleGoal(goal)}
//                 >
//                   <Text style={[
//                     onboardingStyles.optionText,
//                     onboardingData.goals.includes(goal) && onboardingStyles.selectedOptionText
//                   ]}>
//                     {goal}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
//       <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
//         <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
//           <View style={styles.logoContainer}>
//             <Image source={require('../assets/images/bear.png')} style={styles.logo} resizeMode="contain" />
//             <Text style={styles.welcomeText}>Create Account</Text>
//           </View>

//           <View style={styles.formContainer}>
//             <Text style={styles.title}>Register</Text>

//             {/* Registration Type Toggle */}
//             <View style={verificationStyles.toggleContainer}>
//               <TouchableOpacity
//                 style={[
//                   verificationStyles.toggleButton,
//                   registrationType === 'email' && verificationStyles.activeToggle
//                 ]}
//                 onPress={() => setRegistrationType('email')}
//               >
//                 <Icon name="envelope" size={16} color={registrationType === 'email' ? '#fff' : '#666'} />
//                 <Text style={[
//                   verificationStyles.toggleText,
//                   registrationType === 'email' && verificationStyles.activeToggleText
//                 ]}>Email</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[
//                   verificationStyles.toggleButton,
//                   registrationType === 'phone' && verificationStyles.activeToggle
//                 ]}
//                 onPress={() => setRegistrationType('phone')}
//               >
//                 <Icon name="phone" size={16} color={registrationType === 'phone' ? '#fff' : '#666'} />
//                 <Text style={[
//                   verificationStyles.toggleText,
//                   registrationType === 'phone' && verificationStyles.activeToggleText
//                 ]}>Phone</Text>
//               </TouchableOpacity>
//             </View>

//             {/* Username */}
//             <View style={styles.inputContainer}>
//               <Icon name="user" size={18} color="#666" style={styles.inputIcon} />
//               <TextInput
//                 placeholder="Username"
//                 value={username}
//                 onChangeText={handleUsernameChange}
//                 style={styles.input}
//                 autoCapitalize="none"
//                 placeholderTextColor="#999"
//               />
//             </View>
//             {errors.username && <Text style={styles.error}>{errors.username}</Text>}

//             {/* Email or Phone */}
//             {registrationType === 'email' ? (
//               <>
//                 <View style={styles.inputContainer}>
//                   <Icon name="envelope" size={18} color="#666" style={styles.inputIcon} />
//                   <TextInput
//                     placeholder="Email"
//                     value={email}
//                     onChangeText={handleEmailChange}
//                     style={styles.input}
//                     autoCapitalize="none"
//                     keyboardType="email-address"
//                     placeholderTextColor="#999"
//                   />
//                 </View>
//                 {errors.email && <Text style={styles.error}>{errors.email}</Text>}
//               </>
//             ) : (
//               <>
//                 <View style={styles.inputContainer}>
//                   <Icon name="phone" size={18} color="#666" style={styles.inputIcon} />
//                   <TextInput
//                     placeholder="Phone Number"
//                     value={phoneNumber}
//                     onChangeText={handlePhoneNumberChange}
//                     style={styles.input}
//                     keyboardType="phone-pad"
//                     placeholderTextColor="#999"
//                   />
//                 </View>
//                 {errors.phoneNumber && <Text style={styles.error}>{errors.phoneNumber}</Text>}
                
//                 {/* Email for phone registration */}
//                 <View style={styles.inputContainer}>
//                   <Icon name="envelope" size={18} color="#666" style={styles.inputIcon} />
//                   <TextInput
//                     placeholder="Email (for verification)"
//                     value={email}
//                     onChangeText={handleEmailChange}
//                     style={styles.input}
//                     autoCapitalize="none"
//                     keyboardType="email-address"
//                     placeholderTextColor="#999"
//                   />
//                 </View>
//                 {errors.email && <Text style={styles.error}>{errors.email}</Text>}
//               </>
//             )}

//             {/* Password */}
//             <View style={styles.inputContainer}>
//               <Icon name="lock" size={18} color="#666" style={styles.inputIcon} />
//               <TextInput
//                 placeholder="Password"
//                 value={password}
//                 onChangeText={handlePasswordChange}
//                 secureTextEntry={!showPassword}
//                 style={styles.input}
//                 placeholderTextColor="#999"
//               />
//               <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
//                 <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color="#666" />
//               </TouchableOpacity>
//             </View>
//             {errors.password && <Text style={styles.error}>{errors.password}</Text>}

//             {/* Confirm Password */}
//             <View style={styles.inputContainer}>
//               <Icon name="lock" size={18} color="#666" style={styles.inputIcon} />
//               <TextInput
//                 placeholder="Confirm Password"
//                 value={confirmPassword}
//                 onChangeText={handleConfirmPasswordChange}
//                 secureTextEntry={!showConfirmPassword}
//                 style={styles.input}
//                 placeholderTextColor="#999"
//               />
//               <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={styles.eyeIcon}>
//                 <Icon name={showConfirmPassword ? 'eye-slash' : 'eye'} size={20} color="#666" />
//               </TouchableOpacity>
//             </View>
//             {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}

//             <TouchableOpacity
//               style={[styles.registerButton]}
//               onPress={handleSuccessfulRegister}
//               activeOpacity={0.8}
//               disabled={isLoading}
//             >
//               <Text style={styles.registerButtonText}>
//                 {isLoading ? 'REGISTERING...' : 'REGISTER'}
//               </Text>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.loginContainer}>
//             <Text style={styles.loginText}>Already have an account? </Text>
//             <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//               <Text style={styles.loginLink}>Login</Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>

//       {/* Email Verification Modal */}
//       <Modal
//         visible={showVerification}
//         animationType="slide"
//         transparent={false}
//         onRequestClose={() => {}}
//       >
//         <View style={verificationStyles.container}>
//           <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
          
//           <View style={verificationStyles.content}>
//             <View style={verificationStyles.iconContainer}>
//               <Icon name="envelope-o" size={80} color="#3498db" />
//             </View>
            
//             <Text style={verificationStyles.title}>Verify Your Email</Text>
//             <Text style={verificationStyles.subtitle}>
//               We've sent a 6-digit verification code to {email}
//             </Text>
            
//             <View style={verificationStyles.codeInputContainer}>
//               <TextInput
//                 style={verificationStyles.codeInput}
//                 placeholder="Enter 6-digit code"
//                 value={verificationCode}
//                 onChangeText={setVerificationCode}
//                 keyboardType="numeric"
//                 maxLength={6}
//                 textAlign="center"
//                 placeholderTextColor="#999"
//               />
//             </View>
            
//             <TouchableOpacity
//               style={verificationStyles.verifyButton}
//               onPress={handleVerificationCodeSubmit}
//               disabled={isVerifying}
//             >
//               <Text style={verificationStyles.verifyButtonText}>
//                 {isVerifying ? 'VERIFYING...' : 'VERIFY'}
//               </Text>
//             </TouchableOpacity>
            
//             <View style={verificationStyles.resendContainer}>
//               <Text style={verificationStyles.resendText}>Didn't receive the code? </Text>
//               <TouchableOpacity onPress={handleResendCode}>
//                 <Text style={verificationStyles.resendLink}>Resend</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       {/* Onboarding Modal */}
//       <Modal
//         visible={showOnboarding}
//         animationType="slide"
//         transparent={false}
//         onRequestClose={() => { }}
//       >
//         <View style={onboardingStyles.modalContainer}>
//           <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

//           {/* Header */}
//           <View style={onboardingStyles.header}>
//             {renderProgressBar()}
//             <View style={onboardingStyles.placeholder} />
//           </View>

//           {/* Content */}
//           <ScrollView style={onboardingStyles.content} showsVerticalScrollIndicator={false}>
//             {renderSlide()}
//           </ScrollView>

//           {/* Footer */}
//           <View style={onboardingStyles.footer}>
//             {currentSlide > 0 && (
//               <TouchableOpacity onPress={handlePrevious} style={onboardingStyles.previousButton}>
//                 <Text style={onboardingStyles.previousText}>Previous</Text>
//               </TouchableOpacity>
//             )}
//             <TouchableOpacity onPress={handleNext} style={onboardingStyles.nextButton}>
//               <Text style={onboardingStyles.nextText}>
//                 {currentSlide === 3 ? 'Complete' : 'Next'}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image,
  KeyboardAvoidingView, Platform, ScrollView, StatusBar,
  Dimensions, Modal, Alert, ViewStyle, TextStyle
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRegister } from './controller/Register.controller';
import { styles } from './styles/Register.style';

const { width, height } = Dimensions.get('window');

interface OnboardingData {
  firstName: string;
  lastName: string;
  age: string;
  weight: string;
  height: string;
  lastPeriodDate: string;
  cycleLength: string;
  periodLength: string;
  symptoms: string[];
  goals: string[];
}

export default function RegisterScreen({ navigation }: any) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
  const [showVerification, setShowVerification] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [registrationType, setRegistrationType] = useState<'email' | 'phone'>('email');
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    firstName: '',
    lastName: '',
    age: '',
    weight: '',
    height: '',
    lastPeriodDate: '',
    cycleLength: '28',
    periodLength: '5',
    symptoms: [],
    goals: []
  });

  const {
    username, email, password, confirmPassword, phoneNumber,
    showPassword, showConfirmPassword,
    errors,
    handleUsernameChange, handleEmailChange, handlePhoneNumberChange,
    handlePasswordChange, handleConfirmPasswordChange,
    togglePasswordVisibility, toggleConfirmPasswordVisibility,
    handleRegister,
  } = useRegister(navigation, setIsLoading);

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleSuccessfulRegister = async () => {
    try {
      setIsLoading(true);
      const result = await handleRegister();

      if (result && result.success) {
        setIsLoading(false);
        setShowVerification(true);
      } else {
        setIsLoading(false);
        Alert.alert('Registration Failed', 'Please check your information and try again.');
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Registration Failed', 'An error occurred during registration.');
    }
  };

  const handleVerificationCodeSubmit = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      Alert.alert('Invalid Code', 'Please enter a valid 6-digit verification code.');
      return;
    }

    try {
      setIsVerifying(true);
      // Here you would call your verification API
      // const verificationResult = await verifyEmailCode(verificationCode);
      
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsVerifying(false);
      setShowVerification(false);
      setShowOnboarding(true);
    } catch (error) {
      setIsVerifying(false);
      Alert.alert('Verification Failed', 'Invalid verification code. Please try again.');
    }
  };

  const handleResendCode = async () => {
    try {
      // Here you would call your resend verification code API
      // await resendVerificationCode();
      Alert.alert('Code Sent', 'A new verification code has been sent to your email.');
    } catch (error) {
      Alert.alert('Error', 'Failed to resend verification code. Please try again.');
    }
  };

  const handleSkip = () => {
    setShowOnboarding(false);
    navigation.navigate('Home');
  };

  const handleNext = () => {
    if (currentSlide < 3) {
      setCurrentSlide(currentSlide + 1);
    } else {
      handleCompleteOnboarding();
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleCompleteOnboarding = async () => {
    try {
      console.log('Onboarding data:', onboardingData);
      setShowOnboarding(false);
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile information');
    }
  };

  const updateOnboardingData = (field: keyof OnboardingData, value: any) => {
    setOnboardingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleSymptom = (symptom: string) => {
    setOnboardingData((prev: OnboardingData) => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter((s: string) => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
  };

  const toggleGoal = (goal: string) => {
    setOnboardingData((prev: OnboardingData) => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter((g: string) => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const renderProgressBar = () => {
    const progressWidth = ((currentSlide + 1) / 4) * 100;

    return (
      <View style={onboardingStyles.progressBarContainer}>
        <View style={onboardingStyles.progressBarBackground}>
          <View style={[onboardingStyles.progressBarFill, { width: `${progressWidth}%` }]} />
        </View>
        <Text style={onboardingStyles.progressText}>{currentSlide + 1} of 4</Text>
      </View>
    );
  };

  const renderSlide = () => {
    switch (currentSlide) {
      case 0:
        return (
          <View style={onboardingStyles.slideContainer}>
            <Text style={onboardingStyles.slideTitle}>Personal Information</Text>
            <Text style={onboardingStyles.slideSubtitle}>Let's get to know you better</Text>

            <View style={onboardingStyles.inputRow}>
              <View style={[onboardingStyles.inputContainer, { flex: 1, marginRight: 10 }]}>
                <TextInput
                  placeholder="First Name"
                  value={onboardingData.firstName}
                  onChangeText={(text) => updateOnboardingData('firstName', text)}
                  style={onboardingStyles.input}
                  placeholderTextColor="#999"
                />
              </View>
              <View style={[onboardingStyles.inputContainer, { flex: 1, marginLeft: 10 }]}>
                <TextInput
                  placeholder="Last Name"
                  value={onboardingData.lastName}
                  onChangeText={(text) => updateOnboardingData('lastName', text)}
                  style={onboardingStyles.input}
                  placeholderTextColor="#999"
                />
              </View>
            </View>

            <View style={onboardingStyles.inputRow}>
              <View style={[onboardingStyles.inputContainer, { flex: 1, marginRight: 10 }]}>
                <TextInput
                  placeholder="Age"
                  value={onboardingData.age}
                  onChangeText={(text) => updateOnboardingData('age', text)}
                  style={onboardingStyles.input}
                  keyboardType="numeric"
                  placeholderTextColor="#999"
                />
              </View>
              <View style={[onboardingStyles.inputContainer, { flex: 1, marginLeft: 10 }]}>
                <TextInput
                  placeholder="Weight (kg)"
                  value={onboardingData.weight}
                  onChangeText={(text) => updateOnboardingData('weight', text)}
                  style={onboardingStyles.input}
                  keyboardType="numeric"
                  placeholderTextColor="#999"
                />
              </View>
            </View>

            <View style={onboardingStyles.inputContainer}>
              <TextInput
                placeholder="Height (cm)"
                value={onboardingData.height}
                onChangeText={(text) => updateOnboardingData('height', text)}
                style={onboardingStyles.input}
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
            </View>
          </View>
        );

      case 1:
        return (
          <View style={onboardingStyles.slideContainer}>
            <Text style={onboardingStyles.slideTitle}>Cycle Information</Text>
            <Text style={onboardingStyles.slideSubtitle}>Help us track your cycle accurately</Text>

            <View style={onboardingStyles.inputContainer}>
              <Text style={onboardingStyles.inputLabel}>Last Period Start Date</Text>
              <TextInput
                placeholder="DD/MM/YYYY"
                value={onboardingData.lastPeriodDate}
                onChangeText={(text) => updateOnboardingData('lastPeriodDate', text)}
                style={onboardingStyles.input}
                placeholderTextColor="#999"
              />
            </View>

            <View style={onboardingStyles.inputRow}>
              <View style={[onboardingStyles.inputContainer, { flex: 1, marginRight: 10 }]}>
                <Text style={onboardingStyles.inputLabel}>Cycle Length (days)</Text>
                <TextInput
                  placeholder="28"
                  value={onboardingData.cycleLength}
                  onChangeText={(text) => updateOnboardingData('cycleLength', text)}
                  style={onboardingStyles.input}
                  keyboardType="numeric"
                  placeholderTextColor="#999"
                />
              </View>
              <View style={[onboardingStyles.inputContainer, { flex: 1, marginLeft: 10 }]}>
                <Text style={onboardingStyles.inputLabel}>Period Length (days)</Text>
                <TextInput
                  placeholder="5"
                  value={onboardingData.periodLength}
                  onChangeText={(text) => updateOnboardingData('periodLength', text)}
                  style={onboardingStyles.input}
                  keyboardType="numeric"
                  placeholderTextColor="#999"
                />
              </View>
            </View>
          </View>
        );

      case 2:
        return (
          <View style={onboardingStyles.slideContainer}>
            <Text style={onboardingStyles.slideTitle}>Common Symptoms</Text>
            <Text style={onboardingStyles.slideSubtitle}>Select symptoms you typically experience</Text>

            <View style={onboardingStyles.optionsContainer}>
              {['Cramps', 'Headaches', 'Mood Swings', 'Bloating', 'Fatigue', 'Nausea', 'Back Pain', 'Tender Breasts'].map((symptom) => (
                <TouchableOpacity
                  key={symptom}
                  style={[
                    onboardingStyles.optionButton,
                    onboardingData.symptoms.includes(symptom) && onboardingStyles.selectedOption
                  ]}
                  onPress={() => toggleSymptom(symptom)}
                >
                  <Text style={[
                    onboardingStyles.optionText,
                    onboardingData.symptoms.includes(symptom) && onboardingStyles.selectedOptionText
                  ]}>
                    {symptom}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 3:
        return (
          <View style={onboardingStyles.slideContainer}>
            <Text style={onboardingStyles.slideTitle}>Your Goals</Text>
            <Text style={onboardingStyles.slideSubtitle}>What would you like to achieve?</Text>

            <View style={onboardingStyles.optionsContainer}>
              {['Track Period', 'Monitor Symptoms', 'Plan Pregnancy', 'Avoid Pregnancy', 'Improve Health', 'Understand Patterns'].map((goal) => (
                <TouchableOpacity
                  key={goal}
                  style={[
                    onboardingStyles.optionButton,
                    onboardingData.goals.includes(goal) && onboardingStyles.selectedOption
                  ]}
                  onPress={() => toggleGoal(goal)}
                >
                  <Text style={[
                    onboardingStyles.optionText,
                    onboardingData.goals.includes(goal) && onboardingStyles.selectedOptionText
                  ]}>
                    {goal}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.logoContainer}>
            <Image source={require('../assets/images/bear.png')} style={styles.logo} resizeMode="contain" />
            <Text style={styles.welcomeText}>Create Account</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.title}>Register</Text>

            {/* Registration Type Toggle */}
            <View style={verificationStyles.toggleContainer}>
              <TouchableOpacity
                style={[
                  verificationStyles.toggleButton,
                  registrationType === 'email' && verificationStyles.activeToggle
                ]}
                onPress={() => setRegistrationType('email')}
              >
                <Icon name="envelope" size={16} color={registrationType === 'email' ? '#fff' : '#666'} />
                <Text style={[
                  verificationStyles.toggleText,
                  registrationType === 'email' && verificationStyles.activeToggleText
                ]}>Email</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  verificationStyles.toggleButton,
                  registrationType === 'phone' && verificationStyles.activeToggle
                ]}
                onPress={() => setRegistrationType('phone')}
              >
                <Icon name="phone" size={16} color={registrationType === 'phone' ? '#fff' : '#666'} />
                <Text style={[
                  verificationStyles.toggleText,
                  registrationType === 'phone' && verificationStyles.activeToggleText
                ]}>Phone</Text>
              </TouchableOpacity>
            </View>

            {/* Username */}
            <View style={styles.inputContainer}>
              <Icon name="user" size={18} color="#666" style={styles.inputIcon} />
              <TextInput
                placeholder="Username"
                value={username}
                onChangeText={handleUsernameChange}
                style={styles.input}
                autoCapitalize="none"
                placeholderTextColor="#999"
              />
            </View>
            {errors.username && <Text style={styles.error}>{errors.username}</Text>}

            {/* Email */}
            <View style={styles.inputContainer}>
              <Icon name="envelope" size={18} color="#666" style={styles.inputIcon} />
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={handleEmailChange}
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor="#999"
              />
            </View>
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}

            {/* Phone Number - Show when phone registration is selected */}
            {registrationType === 'phone' && (
              <>
                <View style={styles.inputContainer}>
                  <Icon name="phone" size={18} color="#666" style={styles.inputIcon} />
                  <TextInput
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChangeText={handlePhoneNumberChange}
                    style={styles.input}
                    keyboardType="phone-pad"
                    placeholderTextColor="#999"
                  />
                </View>
                {errors.phoneNumber && <Text style={styles.error}>{errors.phoneNumber}</Text>}
              </>
            )}

            {/* Password */}
            <View style={styles.inputContainer}>
              <Icon name="lock" size={18} color="#666" style={styles.inputIcon} />
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={handlePasswordChange}
                secureTextEntry={!showPassword}
                style={styles.input}
                placeholderTextColor="#999"
              />
              <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color="#666" />
              </TouchableOpacity>
            </View>
            {errors.password && <Text style={styles.error}>{errors.password}</Text>}

            {/* Confirm Password */}
            <View style={styles.inputContainer}>
              <Icon name="lock" size={18} color="#666" style={styles.inputIcon} />
              <TextInput
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={handleConfirmPasswordChange}
                secureTextEntry={!showConfirmPassword}
                style={styles.input}
                placeholderTextColor="#999"
              />
              <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={styles.eyeIcon}>
                <Icon name={showConfirmPassword ? 'eye-slash' : 'eye'} size={20} color="#666" />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}

            <TouchableOpacity
              style={[styles.registerButton]}
              onPress={handleSuccessfulRegister}
              activeOpacity={0.8}
              disabled={isLoading}
            >
              <Text style={styles.registerButtonText}>
                {isLoading ? 'REGISTERING...' : 'REGISTER'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Email Verification Modal */}
      <Modal
        visible={showVerification}
        animationType="slide"
        transparent={false}
        onRequestClose={() => {}}
      >
        <View style={verificationStyles.container}>
          <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
          
          <View style={verificationStyles.content}>
            <View style={verificationStyles.iconContainer}>
              <Icon name="envelope-o" size={80} color="#3498db" />
            </View>
            
            <Text style={verificationStyles.title}>Verify Your {registrationType === 'email' ? 'Email' : 'Phone'}</Text>
            <Text style={verificationStyles.subtitle}>
              We've sent a 6-digit verification code to {registrationType === 'email' ? email : phoneNumber}
            </Text>
            
            <View style={verificationStyles.codeInputContainer}>
              <TextInput
                style={verificationStyles.codeInput}
                placeholder="Enter 6-digit code"
                value={verificationCode}
                onChangeText={setVerificationCode}
                keyboardType="numeric"
                maxLength={6}
                textAlign="center"
                placeholderTextColor="#999"
              />
            </View>
            
            <TouchableOpacity
              style={verificationStyles.verifyButton}
              onPress={handleVerificationCodeSubmit}
              disabled={isVerifying}
            >
              <Text style={verificationStyles.verifyButtonText}>
                {isVerifying ? 'VERIFYING...' : 'VERIFY'}
              </Text>
            </TouchableOpacity>
            
            <View style={verificationStyles.resendContainer}>
              <Text style={verificationStyles.resendText}>Didn't receive the code? </Text>
              <TouchableOpacity onPress={handleResendCode}>
                <Text style={verificationStyles.resendLink}>Resend</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Onboarding Modal */}
      <Modal
        visible={showOnboarding}
        animationType="slide"
        transparent={false}
        onRequestClose={() => { }}
      >
        <View style={onboardingStyles.modalContainer}>
          <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

          {/* Header */}
          <View style={onboardingStyles.header}>
            {renderProgressBar()}
            <View style={onboardingStyles.placeholder} />
          </View>

          {/* Content */}
          <ScrollView style={onboardingStyles.content} showsVerticalScrollIndicator={false}>
            {renderSlide()}
          </ScrollView>

          {/* Footer */}
          <View style={onboardingStyles.footer}>
            {currentSlide > 0 && (
              <TouchableOpacity onPress={handlePrevious} style={onboardingStyles.previousButton}>
                <Text style={onboardingStyles.previousText}>Previous</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={handleNext} style={onboardingStyles.nextButton}>
              <Text style={onboardingStyles.nextText}>
                {currentSlide === 3 ? 'Complete' : 'Next'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const verificationStyles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  } as ViewStyle,

  content: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 30,
  } as ViewStyle,

  iconContainer: {
    marginBottom: 30,
  } as ViewStyle,

  title: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    color: '#333',
    textAlign: 'center' as const,
    marginBottom: 15,
  } as TextStyle,

  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center' as const,
    marginBottom: 40,
    lineHeight: 22,
  } as TextStyle,

  codeInputContainer: {
    width: '100%',
    marginBottom: 30,
  } as ViewStyle,

  codeInput: {
    borderWidth: 2,
    borderColor: '#3498db',
    borderRadius: 10,
    padding: 20,
    fontSize: 24,
    fontWeight: 'bold' as const,
    letterSpacing: 5,
    color: '#333',
  } as ViewStyle,

  verifyButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginBottom: 30,
    width: '100%',
    alignItems: 'center' as const,
  } as ViewStyle,

  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold' as const,
  } as TextStyle,

  resendContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  } as ViewStyle,

  resendText: {
    fontSize: 14,
    color: '#666',
  } as TextStyle,

  resendLink: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: 'bold' as const,
  } as TextStyle,

  toggleContainer: {
    flexDirection: 'row' as const,
    backgroundColor: '#e5e7eb',
    borderRadius: 25,
    padding: 4,
    marginBottom: 20,
  } as ViewStyle,

  toggleButton: {
    flex: 1,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
  } as ViewStyle,

  activeToggle: {
    backgroundColor: '#3498db',
  } as ViewStyle,

  toggleText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
    fontWeight: '500' as const,
  } as TextStyle,

  activeToggleText: {
    color: '#fff',
  } as TextStyle,
};

const onboardingStyles = {
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  } as ViewStyle,

  header: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: Platform.OS === 'ios' ? 50 : 25,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  } as ViewStyle,

  skipButton: {
    padding: 5,
  } as ViewStyle,

  skipText: {
    color: '#666',
    fontSize: 16,
  } as TextStyle,

  progressBarContainer: {
    alignItems: 'center' as const,
    flex: 1,
  } as ViewStyle,

  progressBarBackground: {
    width: 200,
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden' as const,
    marginBottom: 8,
  } as ViewStyle,

  progressBarFill: {
    height: '100%',
    backgroundColor: '#3498db',
    borderRadius: 3,
  } as ViewStyle,

  progressText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500' as const,
  } as TextStyle,

  placeholder: {
    width: 50,
  } as ViewStyle,

  content: {
    flex: 1,
    paddingHorizontal: 20,
  } as ViewStyle,

  slideContainer: {
    paddingVertical: 30,
  } as ViewStyle,

  slideTitle: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    color: '#333',
    textAlign: 'center' as const,
    marginBottom: 10,
  } as TextStyle,

  slideSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center' as const,
    marginBottom: 40,
    lineHeight: 22,
  } as TextStyle,

  inputContainer: {
    marginBottom: 20,
  } as ViewStyle,

  inputRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
  } as ViewStyle,

  inputLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500' as const,
  } as TextStyle,

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    color: '#333',
  } as ViewStyle,

  optionsContainer: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    justifyContent: 'space-between' as const,
  } as ViewStyle,

  optionButton: {
    width: '48%',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    marginBottom: 15,
    alignItems: 'center' as const,
  } as ViewStyle,

  selectedOption: {
    borderColor: '#3498db',
    backgroundColor: '#e3f2fd',
  } as ViewStyle,

  optionText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500' as const,
  } as TextStyle,

  selectedOptionText: {
    color: '#3498db',
  } as TextStyle,

  footer: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  } as ViewStyle,

  previousButton: {
    backgroundColor: '#3498db',
    padding: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    minWidth: 100,
  } as ViewStyle,

  previousText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold' as const,
  } as TextStyle,

  nextButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    minWidth: 100,
    alignItems: 'center' as const,
  } as ViewStyle,

  nextText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold' as const,
  } as TextStyle,
};