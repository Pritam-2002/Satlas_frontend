import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function ComingSoonScreen() {
    return (
        <View style={styles.container}>
            {/* Illustration or logo */}
            {/* <Image
                source={require('../assets/coming-soon.png')} // Add a bright illustration here
                style={styles.image}
            /> */}

            <Text style={styles.heading}>AI Reports are  Coming Soon!</Text>
            <Text style={styles.subText}>
                A analyzed ai report to boost your performance
            </Text>

            <TouchableOpacity style={styles.button} activeOpacity={0.9}>
                <Text style={styles.buttonText}>Notify Me</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>Stay tuned. Big things are coming!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    image: {
        width: 260,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    heading: {
        fontSize: 28,
        fontWeight: '700',
        color: '#111827',
        textAlign: 'center',
        marginBottom: 10,
    },
    subText: {
        fontSize: 16,
        color: '#4B5563',
        textAlign: 'center',
        marginBottom: 28,
        paddingHorizontal: 8,
    },
    button: {
        backgroundColor: '#6366F1',
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 16,
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    footerText: {
        marginTop: 32,
        color: '#9CA3AF',
        fontSize: 14,
        textAlign: 'center',
    },
});
