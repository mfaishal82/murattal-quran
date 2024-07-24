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
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Register = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    try {
      const response = await fetch('https://1f7d-114-10-76-20.ngrok-free.app/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, userName, email, password }),
      });

      const data = await response.json();

      if (response.status === 201) {
        Alert.alert('Success', 'Registration successful');
      } else {
        Alert.alert('Error', data.error || 'Registration failed');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  const handleLogin = () => {
    router.push('/LoginScreen');
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
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={userName}
          onChangeText={setUserName}
        />
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

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogin}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E8449',
    marginTop: 10,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  eyeIcon: {
    padding: 10,
  },
  registerButton: {
    backgroundColor: '#1E8449',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  registerButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginText: {
    color: '#1E8449',
    marginTop: 10,
  },
});

export default Register;