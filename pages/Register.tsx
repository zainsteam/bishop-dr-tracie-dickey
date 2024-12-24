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
import DeviceInfo from 'react-native-device-info';

const primaryColor = '#2a0637';

const Register = ({navigation}: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [deviceType, setDeviceType] = useState('');

  useEffect(() => {
    const fetchDeviceId = async () => {
      try {
        // Get the unique device ID
        const type = await DeviceInfo.getDeviceType();
        const id = await DeviceInfo.getUniqueId();
        setDeviceId(id + type);
        setDeviceType(type);
        console.log(type + id, 'id');
      } catch (error) {
        console.error('Error fetching device ID:', error);
      }
    };

    fetchDeviceId();
  }, []);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      const response = await fetch(
        'https://bishopdrtraciedickeyadmin.com/api/v1/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            password,
            mobile_no: mobileNo,
            device_type: 'ANDROID', // Update with actual device type if needed
            device_id: 'ANDROID' + deviceId,
          }),
        },
      );

      const data = await response.json();
      if (data.status) {
        Alert.alert('Success', 'Account created successfully!');
        navigation.navigate('LoginScreen');
      } else {
        Alert.alert('Error', data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error', error);
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
              source={require('../assets/images/logo.png')} // Update this path to your logo image
              style={styles.logo}
            />
            <Text style={styles.title}>Create an Account</Text>
          </View>

          {/* Registration Form */}
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#6c757d"
              value={name}
              onChangeText={setName}
            />
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
              placeholder="Mobile Number"
              placeholderTextColor="#6c757d"
              keyboardType="phone-pad"
              value={mobileNo}
              onChangeText={setMobileNo}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#6c757d"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#6c757d"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegister}>
              <Text style={styles.registerButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          {/* Back to Login Link */}
          <View style={styles.backToLoginContainer}>
            <Text style={styles.backToLoginText}>Already have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={styles.loginLink}>Log In</Text>
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
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
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
  title: {
    fontSize: 22,
    color: primaryColor,
    fontWeight: '600',
    textAlign: 'center',
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
  registerButton: {
    backgroundColor: primaryColor,
    width: '90%',
    height: 42,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backToLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  backToLoginText: {
    color: '#6c757d',
    fontSize: 14,
  },
  loginLink: {
    color: primaryColor,
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default Register;
