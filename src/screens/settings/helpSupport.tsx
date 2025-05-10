import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Alert,
    Linking
} from 'react-native';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';

type HelpSupportScreenProps = {
    navigation: any;
};

const HelpSupportScreen: React.FC<HelpSupportScreenProps> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleGoBack = () => {
        navigation.goBack();
    };

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = () => {
        // Validate form
        if (!email || !subject || !message) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (!validateEmail(email)) {
            Alert.alert('Error', 'Please enter a valid email address');
            return;
        }

        // In a real app, this would send the data to your backend
        // For now, we'll just show a success message
        Alert.alert(
            'Message Sent',
            'Thank you for your message. Our support team will get back to you shortly.',
            [
                {
                    text: 'OK',
                    onPress: () => {
                        // Clear form
                        setEmail('');
                        setSubject('');
                        setMessage('');
                    }
                }
            ]
        );
    };

    const handleCall = () => {
        Linking.openURL('tel:+15551234567');
    };

    const handleEmail = () => {
        Linking.openURL('mailto:support@cycletrack.com');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                    <AntDesign name="arrowleft" size={24} color="#ffffff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Help & Support</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView style={styles.contentContainer}>
                {/* Contact Information Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Contact Us</Text>
                    <Text style={styles.sectionDescription}>
                        Have questions or need assistance? Our support team is here to help!
                    </Text>

                    <View style={styles.contactItem}>
                        <View style={styles.iconContainer}>
                            <Feather name="phone" size={20} color="#3498db" />
                        </View>
                        <View style={styles.contactDetails}>
                            <Text style={styles.contactLabel}>Phone Support</Text>
                            <Text style={styles.contactValue}>+1 (555) 123-4567</Text>
                            <Text style={styles.contactHours}>Monday-Friday, 9AM-5PM EST</Text>
                        </View>
                        <TouchableOpacity onPress={handleCall} style={styles.contactAction}>
                            <Text style={styles.contactActionText}>Call</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.contactItem}>
                        <View style={styles.iconContainer}>
                            <Feather name="mail" size={20} color="#3498db" />
                        </View>
                        <View style={styles.contactDetails}>
                            <Text style={styles.contactLabel}>Email Support</Text>
                            <Text style={styles.contactValue}>support@cycletrack.com</Text>
                            <Text style={styles.contactHours}>Response within 24 hours</Text>
                        </View>
                        <TouchableOpacity onPress={handleEmail} style={styles.contactAction}>
                            <Text style={styles.contactActionText}>Email</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* FAQ Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

                    <View style={styles.faqItem}>
                        <Text style={styles.question}>How accurate is period tracking?</Text>
                        <Text style={styles.answer}>
                            Our app uses advanced algorithms to predict your cycle based on the data you enter.
                            The more consistently you track your period, the more accurate the predictions become.
                        </Text>
                    </View>

                    <View style={styles.faqItem}>
                        <Text style={styles.question}>How do I reset my password?</Text>
                        <Text style={styles.answer}>
                            Go to the login screen and tap "Forgot Password." Follow the instructions sent to your
                            email to reset your password securely.
                        </Text>
                    </View>

                    <View style={styles.faqItem}>
                        <Text style={styles.question}>Is my health data secure?</Text>
                        <Text style={styles.answer}>
                            Yes, we take data security seriously. Your health data is encrypted and stored securely.
                            We never share your personal information with third parties without your explicit consent.
                        </Text>
                    </View>

                    <View style={styles.faqItem}>
                        <Text style={styles.question}>Can I export my data?</Text>
                        <Text style={styles.answer}>
                            Yes, you can export your cycle data from the Profile section. This allows you to keep a
                            backup or share information with your healthcare provider.
                        </Text>
                    </View>
                </View>

                {/* Contact Form Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Send Us a Message</Text>
                    <Text style={styles.sectionDescription}>
                        Fill out the form below and we'll get back to you as soon as possible.
                    </Text>

                    <View style={styles.formGroup}>
                        <Text style={styles.inputLabel}>Your Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your email address"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.inputLabel}>Subject</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="What's this about?"
                            value={subject}
                            onChangeText={setSubject}
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.inputLabel}>Message</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="How can we help you?"
                            value={message}
                            onChangeText={setMessage}
                            multiline
                            numberOfLines={6}
                            textAlignVertical="top"
                        />
                    </View>

                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
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
        marginBottom: 24,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333333',
        marginBottom: 8,
    },
    sectionDescription: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 16,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ebf5ff',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    contactDetails: {
        flex: 1,
    },
    contactLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333333',
    },
    contactValue: {
        fontSize: 14,
        color: '#666666',
        marginTop: 2,
    },
    contactHours: {
        fontSize: 12,
        color: '#888888',
        marginTop: 2,
    },
    contactAction: {
        backgroundColor: '#3498db',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
    },
    contactActionText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '500',
    },
    faqItem: {
        marginBottom: 16,
    },
    question: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333333',
        marginBottom: 6,
    },
    answer: {
        fontSize: 14,
        lineHeight: 20,
        color: '#666666',
    },
    formGroup: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333333',
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: '#dddddd',
        borderRadius: 6,
        padding: 12,
        fontSize: 14,
        color: '#333333',
        backgroundColor: '#f9f9f9',
    },
    textArea: {
        height: 120,
    },
    submitButton: {
        backgroundColor: '#3498db',
        borderRadius: 6,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 8,
    },
    submitButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default HelpSupportScreen;