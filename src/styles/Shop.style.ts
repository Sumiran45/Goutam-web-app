import { Dimensions, Platform, StatusBar, StyleSheet } from "react-native";

const { width } = Dimensions.get('window');
const cardWidth = (width - 40) / 2;

export const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#f8f8f8',
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
        },
        headerContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#3498DB',
            paddingHorizontal: 16,
            paddingVertical: 12,
            elevation: 4,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
        },
        header: {
            fontSize: 20,
            fontWeight: 'bold',
            color: '#fff'
        },
        cartButton: {
            padding: 8,
            borderRadius: 24,
            position: 'relative',
        },
        badge: {
            position: 'absolute',
            right: 0,
            top: 0,
            backgroundColor: '#ff1744',
            borderRadius: 10,
            width: 20,
            height: 20,
            justifyContent: 'center',
            alignItems: 'center',
        },
        badgeText: {
            color: '#fff',
            fontSize: 12,
            fontWeight: 'bold',
        },
        list: {
            padding: 10,
        },
        row: {
            justifyContent: 'space-between',
        },
        card: {
            backgroundColor: '#fff',
            width: cardWidth,
            marginBottom: 16,
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
            overflow: 'hidden',
        },
        imageContainer: {
            width: '100%',
            height: 140,
            backgroundColor: '#f5f5f5',
        },
        image: {
            width: '100%',
            height: '100%',
        },
        contentContainer: {
            padding: 12,
        },
        title: {
            fontSize: 14,
            fontWeight: '600',
            marginBottom: 4,
            color: '#333',
            height: 40,
        },
        price: {
            fontSize: 16,
            color: '#3498DB',
            marginBottom: 8,
            fontWeight: '700',
        },
        button: {
            backgroundColor: '#3498db',
            padding: 8,
            borderRadius: 6,
            alignItems: 'center'
        },
        buttonText: {
            color: '#fff',
            fontWeight: '600',
            fontSize: 13,
        },
    });