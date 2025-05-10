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

type PrivacyPolicyScreenProps = {
  navigation: any;
};

const PrivacyPolicyScreen: React.FC<PrivacyPolicyScreenProps> = ({ navigation }) => {
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.contentContainer}>
        <View style={styles.section}>
          <Text style={styles.lastUpdated}>Last Updated: May 10, 2025</Text>
          
          <Text style={styles.paragraph}>
            We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application.
          </Text>
          
          <Text style={styles.sectionTitle}>1. Information We Collect</Text>
          <Text style={styles.paragraph}>
            <Text style={styles.boldText}>Personal Data:</Text> We may collect personally identifiable information, such as your name, email address, and date of birth when you register for an account.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.boldText}>Health Data:</Text> To provide period and fertility tracking services, we collect information about your menstrual cycle, symptoms, mood, and related health data that you choose to input.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.boldText}>Usage Data:</Text> We may collect information on how you access and use the application, including your device information, IP address, and app usage statistics.
          </Text>
          
          <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
          <Text style={styles.paragraph}>
            We use the collected data for various purposes:
          </Text>
          <Text style={styles.bulletPoint}>• To provide and maintain our service</Text>
          <Text style={styles.bulletPoint}>• To personalize your experience</Text>
          <Text style={styles.bulletPoint}>• To improve our application</Text>
          <Text style={styles.bulletPoint}>• To communicate with you</Text>
          <Text style={styles.bulletPoint}>• To provide support</Text>
          <Text style={styles.bulletPoint}>• To monitor usage and detect technical issues</Text>
          
          <Text style={styles.sectionTitle}>3. Data Security</Text>
          <Text style={styles.paragraph}>
            We implement appropriate technical and organizational measures to protect the security of your personal data. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure.
          </Text>
          
          <Text style={styles.sectionTitle}>4. Data Sharing and Disclosure</Text>
          <Text style={styles.paragraph}>
            We do not sell or rent your personal information to third parties. We may share your data with:
          </Text>
          <Text style={styles.bulletPoint}>• Service providers who perform services on our behalf</Text>
          <Text style={styles.bulletPoint}>• Law enforcement or other governmental authority when required by law</Text>
          <Text style={styles.bulletPoint}>• Business partners with your consent</Text>
          
          <Text style={styles.sectionTitle}>5. Your Data Rights</Text>
          <Text style={styles.paragraph}>
            Depending on your location, you may have rights regarding your personal data, including:
          </Text>
          <Text style={styles.bulletPoint}>• Right to access your data</Text>
          <Text style={styles.bulletPoint}>• Right to rectification of inaccurate data</Text>
          <Text style={styles.bulletPoint}>• Right to erasure ("right to be forgotten")</Text>
          <Text style={styles.bulletPoint}>• Right to restrict processing</Text>
          <Text style={styles.bulletPoint}>• Right to data portability</Text>
          
          <Text style={styles.sectionTitle}>6. Children's Privacy</Text>
          <Text style={styles.paragraph}>
            Our service is not directed to anyone under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal data, please contact us.
          </Text>
          
          <Text style={styles.sectionTitle}>7. Changes to This Privacy Policy</Text>
          <Text style={styles.paragraph}>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </Text>
          
          <Text style={styles.sectionTitle}>8. Contact Us</Text>
          <Text style={styles.paragraph}>
            If you have any questions about this Privacy Policy, please contact us at:
          </Text>
          <Text style={styles.contactInfo}>Email: privacy@cycletrack.com</Text>
          <Text style={styles.contactInfo}>Phone: +1 (555) 123-4567</Text>
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
  bulletPoint: {
    fontSize: 14,
    lineHeight: 22,
    color: '#555555',
    marginLeft: 16,
    marginBottom: 4,
  },
  boldText: {
    fontWeight: '600',
  },
  contactInfo: {
    fontSize: 14,
    lineHeight: 22,
    color: '#3498db',
    marginLeft: 16,
  },
});

export default PrivacyPolicyScreen;