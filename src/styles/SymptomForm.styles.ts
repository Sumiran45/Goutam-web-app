import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 700;

export const symptomFormStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fc',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: isSmallScreen ? 120 : 100,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(248, 250, 252, 0.95)',
    zIndex: 1000,
  },
  
  // Header
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 30,
  },

  // Form Groups
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 12,
    letterSpacing: 0.3,
  },

  // Picker Styles
  pickerContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  picker: {
    height: 56,
    color: '#2d3748',
    fontSize: 16,
  },

  // Toggle Styles
  toggleGroup: {
    marginBottom: 24,
  },
  toggleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  toggleButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleButtonActive: {
    backgroundColor: '#3182ce',
    borderColor: '#3182ce',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4a5568',
  },
  toggleTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },

  // Input Styles
  textInput: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    fontSize: 16,
    color: '#2d3748',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  textInputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
    paddingTop: 16,
  },

  // Button Container - Fixed at bottom
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: isSmallScreen ? 16 : 20,
    paddingBottom: isSmallScreen ? 24 : 32, // Extra bottom padding for safe area
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#f7fafc',
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    justifyContent: 'center',
  },
  submitButton: {
    flex: 2,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#3182ce',
    justifyContent: 'center',
    shadowColor: '#3182ce',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  submitButtonDisabled: {
    backgroundColor: '#a0aec0',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4a5568',
  },

  // Loading Overlay for Submit
  submitLoadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },

  // Mood Options Enhanced
  moodOptionContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
  },
  moodOptionSelected: {
    borderColor: '#3182ce',
    backgroundColor: '#ebf8ff',
  },
  moodOptionText: {
    fontSize: 16,
    color: '#2d3748',
    fontWeight: '500',
  },

  // Enhanced Visual Elements
  sectionDivider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 24,
  },
  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 16,
  },

  // Symptom Indicators
  symptomIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#48bb78',
    marginRight: 8,
  },
  symptomIndicatorInactive: {
    backgroundColor: '#e2e8f0',
  },
});