import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });
      console.log('Login successful:', response.data);
      await SecureStore.setItemAsync('access_token', response.data.access_token);
      // Handle successful login, e.g., navigate to another screen or save token
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Failed', 'Invalid email or password');
    }
  };

  const handleSignUp = () => {
    console.log('Navigasi ke halaman pendaftaran');
    // Implement navigation to the sign-up screen
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <MaterialCommunityIcons name="book-open-page-variant" size={80} color="#1E8449" />
        <Text style={styles.logoText}>Tasmi'</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <MaterialCommunityIcons 
              name={showPassword ? "eye-off" : "eye"} 
              size={24} 
              color="#1E8449"
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSignUp}>
        <Text style={styles.signUpText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F0F4F8',
      padding: 20,
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: 50,
    },
    logoText: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#2C3E50',
      marginTop: 15,
      letterSpacing: 1,
    },
    inputContainer: {
      width: '100%',
      marginBottom: 25,
    },
    input: {
      backgroundColor: 'white',
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderRadius: 10,
      marginBottom: 15,
      fontSize: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    passwordInput: {
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 15,
      fontSize: 16,
    },
    eyeIcon: {
      padding: 15,
    },
    loginButton: {
      backgroundColor: '#3498DB',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      width: '100%',
      marginBottom: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    loginButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 18,
      letterSpacing: 0.5,
    },
    signUpText: {
      color: '#3498DB',
      marginTop: 15,
      fontSize: 16,
    },
  });

export default LoginScreen;
