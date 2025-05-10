import React from 'react';
import { 
  SafeAreaView, 
  ScrollView, 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

type TermsOfServiceScreenProps = {
  navigation: any;
};

const TermsOfServiceScreen: React.FC<TermsOfServiceScreenProps> = ({ navigation }) => {
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms of Service</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.contentContainer}>
        <View style={styles.section}>
          <Text style={styles.lastUpdated}>Last Updated: May 10, 2025</Text>
          
          <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
          <Text style={styles.paragraph}>
            By accessing or using our application, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
          </Text>
          
          <Text style={styles.sectionTitle}>2. Use of the Service</Text>
          <Text style={styles.paragraph}>
            Our app provides period and fertility tracking services. You must be at least 18 years old or have parental consent to use this service. You agree to provide accurate and complete information when using our app.
          </Text>
          
          <Text style={styles.sectionTitle}>3. User Accounts</Text>
          <Text style={styles.paragraph}>
            You are responsible for safeguarding your account password and for any activities or actions under your account. We cannot and will not be liable for any loss or damage arising from your failure to comply with this security obligation.
          </Text>
          
          <Text style={styles.sectionTitle}>4. Privacy Policy</Text>
          <Text style={styles.paragraph}>
            Your use of our service is also governed by our Privacy Policy, which is incorporated into these Terms by reference. By using our service, you consent to the practices described in the Privacy Policy.
          </Text>
          
          <Text style={styles.sectionTitle}>5. Content and Conduct</Text>
          <Text style={styles.paragraph}>
            Our service allows you to store and share certain information. You retain ownership of any intellectual property rights that you hold in that content. By submitting content to our service, you grant us a worldwide license to use, host, store, and display such content.
          </Text>
          
          <Text style={styles.sectionTitle}>6. Medical Disclaimer</Text>
          <Text style={styles.paragraph}>
            Our app provides general information for tracking purposes only and is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
          </Text>
          
          <Text style={styles.sectionTitle}>7. Changes to Terms</Text>
          <Text style={styles.paragraph}>
            We reserve the right to modify these terms at any time. We will provide notice of any material changes by posting the new Terms on the app or by sending you an email. Your continued use of the service after such modifications will constitute your acknowledgment of the modified Terms.
          </Text>
          
          <Text style={styles.sectionTitle}>8. Termination</Text>
          <Text style={styles.paragraph}>
            We may terminate or suspend your account and access to our service immediately, without prior notice or liability, for any reason, including without limitation if you breach the Terms. Upon termination, your right to use the service will cease immediately.
          </Text>
          
          <Text style={styles.sectionTitle}>9. Limitation of Liability</Text>
          <Text style={styles.paragraph}>
            To the maximum extent permitted by law, in no event shall we be liable for any direct, indirect, punitive, incidental, special, consequential damages or any damages whatsoever arising out of or connected with the use or inability to use our services.
          </Text>
          
          <Text style={styles.sectionTitle}>10. Governing Law</Text>
          <Text style={styles.paragraph}>
            These Terms shall be governed by the laws of the jurisdiction in which we operate, without regard to its conflict of law provisions. You agree to submit to the personal and exclusive jurisdiction of the courts located within that jurisdiction.
          </Text>
          
          <Text style={styles.sectionTitle}>11. Contact Us</Text>
          <Text style={styles.paragraph}>
            If you have any questions about these Terms, please contact us at terms@cycletrack.com.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#3498db',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  backButton: {
    padding: 8,
  },
  placeholder: {
    width: 40,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
  lastUpdated: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
    marginTop: 16,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 22,
    color: '#555555',
    marginBottom: 12,
  },
});

export default TermsOfServiceScreen;