import React, { useRef, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Animated,
    Dimensions,
    ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { height } = Dimensions.get('window');

export const LogoDetailPopup = ({ logo, isVisible, onClose, isLightTheme }) => {
    const slideAnim = useRef(new Animated.Value(height)).current;

    useEffect(() => {
        if (isVisible) {
            Animated.spring(slideAnim, {
                toValue: 0,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: height,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [isVisible, slideAnim]);

    const styles = StyleSheet.create({
        overlay: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'flex-end',
        },
        container: {
            backgroundColor: isLightTheme ? '#ffffff' : '#1a1a1a',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
            maxHeight: height * 0.9,
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            color: isLightTheme ? '#333' : '#fff',
        },
        image: {
            alignSelf: 'center',
            width: 280,
            height : 280,
            borderRadius: 10,
            marginBottom: 20,
        },
        description: {
            fontSize: 16,
            color: isLightTheme ? '#666' : '#ccc',
            marginBottom: 20,
        },
        creator: {
            fontSize: 14,
            color: isLightTheme ? '#999' : '#888',
            marginBottom: 20,
        },
        inputContainer: {
            backgroundColor: isLightTheme ? '#f0f0f0' : '#333',
            borderRadius: 10,
            padding: 10,
            marginBottom: 20,
        },
        input: {
            color: isLightTheme ? '#333' : '#fff',
        },
        footer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        price: {
            fontSize: 24,
            fontWeight: 'bold',
            color: isLightTheme ? '#333' : '#fff',
        },
        buyButton: {
            backgroundColor: '#007AFF',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 20,
        },
        buyButtonText: {
            color: '#fff',
            fontSize: 16,
            fontWeight: 'bold',
        },
    });

    if (!isVisible || !logo) return null;

    return (
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
            <Animated.View
                style={[
                    styles.container,
                    {
                        transform: [{ translateY: slideAnim }],
                    },
                ]}
            >
                <TouchableOpacity activeOpacity={1}>
                    <ScrollView>
                        <View style={styles.header}>
                            <Text style={styles.title}>{logo.name}</Text>
                            <TouchableOpacity onPress={onClose}>
                                <Ionicons name="close" size={24} color={isLightTheme ? '#333' : '#fff'} />
                            </TouchableOpacity>
                        </View>
                        <Image source={ logo.image } style={styles.image} />
                        <Text style={styles.description}>{logo.description}</Text>
                        <Text style={styles.creator}>Created by {logo.creator}</Text>
                        <View style={styles.footer}>
                            <Text style={styles.price}>${logo.price}</Text>
                            <TouchableOpacity style={styles.buyButton}>
                                <Text style={styles.buyButtonText}>Buy Now</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </TouchableOpacity>
            </Animated.View>
        </TouchableOpacity>
    );
};