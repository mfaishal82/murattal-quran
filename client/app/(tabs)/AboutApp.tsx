import React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Linking } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AboutApp = () => {
    const appVersion = "1.1.0";

    const openLink = (url: string) => {
        Linking.openURL(url).catch((err) => console.error('Terjadi kesalahan', err));
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <MaterialCommunityIcons name="book-open-page-variant" size={80} color="#1E8449" />
                <Text style={styles.title}>Tasmi'</Text>
                <Text style={styles.version}>Version {appVersion}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>About</Text>
                <Text style={styles.description}>
                    Murattal Al-Qur'an is an application designed to provide easy access to Quranic recitations. 
                    Listen to various reciters, download surahs, and enhance your Quranic experience.
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Features</Text>
                <Text style={styles.bulletPoint}>• Listen to Quranic recitations</Text>
                <Text style={styles.bulletPoint}>• Multiple reciters available</Text>
                <Text style={styles.bulletPoint}>• Prayer times information</Text>
                <Text style={[styles.bulletPoint, { textDecorationLine: "line-through" }]}>• Download surahs for offline listening</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Contact</Text>
                <TouchableOpacity 
                    style={styles.link} 
                    onPress={() => openLink('mailto:mf.ihbs@gmail.com')}
                >
                    <MaterialCommunityIcons name="email" size={24} color="#1E8449" />
                    <Text style={styles.linkText}>mf.ihbs@gmail.com</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.link} 
                    onPress={() => openLink('https://wa.me/6283876657601')}
                >
                    <MaterialCommunityIcons name="whatsapp" size={24} color="#1E8449" />
                    <Text style={styles.linkText}>6283876657601</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Follow Us</Text>
                <TouchableOpacity 
                    style={styles.link} 
                    onPress={() => openLink('https://www.linkedin.com/in/mfaishal82/')}
                >
                    <MaterialCommunityIcons name="linkedin" size={24} color="#1E8449" />
                    <Text style={styles.linkText}>LinkedIn</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.link} 
                    onPress={() => openLink('https://facebook.com/mf.ihbs')}
                >
                    <MaterialCommunityIcons name="facebook" size={24} color="#1E8449" />
                    <Text style={styles.linkText}>Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.link} 
                    onPress={() => openLink('https://github.com/mfaishal82')}
                >
                    <MaterialCommunityIcons name="github" size={24} color="#1E8449" />
                    <Text style={styles.linkText}>GitHub</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1E8449',
        marginTop: 10,
    },
    version: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    section: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1E8449',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
    },
    bulletPoint: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    link: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    linkText: {
        fontSize: 16,
        color: '#1E8449',
        textDecorationLine: 'underline',
        marginLeft: 10,
    },
});

export default AboutApp;