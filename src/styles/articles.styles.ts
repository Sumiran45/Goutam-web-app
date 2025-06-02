import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  
  header: {
    backgroundColor: '#3498db',
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 1.5,
  },

  listContainer: {
    padding: 16,
    paddingBottom: 40,
  },

  articleCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  articleTitle: {
    fontSize: width > 375 ? 22 : 20,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 8,
    lineHeight: width > 375 ? 28 : 26,
  },
  articleAuthor: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 4,
    fontWeight: '600',
  },
  articleDate: {
    fontSize: 14,
    color: '#007bff',
    marginBottom: 16,
    fontWeight: '600',
  },
  
  videoPreviewContainer: {
    marginVertical: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  videoThumbnail: {
    position: 'relative',
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#000',
    marginBottom: 8,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1a1a1a',
  },
  playButtonOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  playButtonText: {
    fontSize: 24,
    color: '#007bff',
    fontWeight: 'bold',
    marginLeft: 3, 
  },
  videoLabel: {
    fontSize: 13,
    color: '#007bff',
    fontWeight: '700',
    textAlign: 'center',
  },
  
  articleSummary: {
    fontSize: width > 375 ? 16 : 15,
    color: '#495057',
    lineHeight: width > 375 ? 24 : 22,
    marginBottom: 16,
    fontWeight: '400',
  },
  
  articleActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  readMore: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: '700',
  },
  watchVideo: {
    fontSize: 14,
    color: '#dc3545',
    fontWeight: '700',
  },
  
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 16,
    color: '#6c757d',
    fontSize: 16,
    fontWeight: '600',
  },
  
  emptyContainer: {
    padding: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: width > 320 ? 18 : 16,
    color: '#6c757d',
    textAlign: 'center',
    fontWeight: '600',
  },
});