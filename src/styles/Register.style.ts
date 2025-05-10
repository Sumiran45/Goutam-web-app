import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa'
  },
  container: { 
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: width * 0.06,
    paddingVertical: height * 0.02,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: height * 0.05,
    marginBottom: height * 0.03,
  },
  logo: {
    width: width * 0.3,
    height: width * 0.3,
  },
  welcomeText: {
    fontSize: 18,
    color: '#555',
    marginTop: 8,
    fontWeight: '500',
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: width * 0.02,
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: height * 0.02, 
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginTop: height * 0.015,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inputIcon: {
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    paddingHorizontal: 12,
  },
  error: {
    color: '#e74c3c',
    fontSize: 13,
    marginTop: 4,
    marginLeft: 2,
  },
  registerButton: {
    backgroundColor: '#3498db',
    borderRadius: 10,
    padding: 15,
    marginTop: height * 0.025,
    alignItems: 'center',
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  registerButtonText: { 
    color: '#fff', 
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.01,
    marginBottom: height * 0.04,
  },
  loginText: {
    fontSize: 15,
    color: '#555',
  },
  loginLink: {
    fontSize: 15,
    color: '#3498db',
    fontWeight: 'bold',
  },
});
