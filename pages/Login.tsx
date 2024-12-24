import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';

const primaryColor = '#2a0637';

interface LoginInterface {
  navigation: any;
  route: any;
}

const LoginScreen = ({navigation}: LoginInterface) => {
  const [deviceId, setDeviceId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchDeviceId = async () => {
      const user = await AsyncStorage.getItem('userData');
      console.log(user, 'user');
      try {
        // Get the unique device ID
        const type = await DeviceInfo.getDeviceType();
        const id = await DeviceInfo.getUniqueId();
        setDeviceId(id);
        console.log('ANDROID' + id);
      } catch (error) {
        console.error('Error fetching device ID:', error);
      }
    };

    fetchDeviceId();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch(
        'https://bishopdrtraciedickeyadmin.com/api/v1/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
            device_type: 'ANDROID', // Update with actual device type if needed
            device_id: 'ANDROID' + deviceId,
          }),
        },
      );

      const data = await response.json();
      if (data.status) {
        // Save response data to AsyncStorage
        await AsyncStorage.setItem('userData', JSON.stringify(data.data));
        Alert.alert('Success', 'Login successful!');
        navigation.push('Drawer', {navigation});
      } else {
        // Handle error from API
        Alert.alert('Error', data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={primaryColor} />
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          {/* Logo and Title */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/images/logo.png')} // Update path to your logo image
              style={styles.logo}
            />
          </View>

          {/* Login Form */}
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#6c757d"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#6c757d"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Log In</Text>
            </TouchableOpacity>

            {/* Forgot Password Link */}
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotScreen')}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Signup Link */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('RegisterScreen')}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -100,
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Light overlay effect for readability
  },
  innerContainer: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 356,
    height: 175,
    marginBottom: 8,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    height: 42,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 20,
    paddingHorizontal: 16,
    marginBottom: 12,
    fontSize: 14,
    color: '#495057',
    backgroundColor: '#f8f9fa',
  },
  loginButton: {
    backgroundColor: primaryColor,
    width: '90%',
    height: 42,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 13,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  signupText: {
    color: '#6c757d',
    fontSize: 14,
  },
  signupLink: {
    color: primaryColor,
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default LoginScreen;
