import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  StatusBar,
  Alert,
} from 'react-native';

const primaryColor = '#2a0637';

const Forgot = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Validation Error', 'Please enter your email address.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://bishopdrtraciedickeyadmin.com/api/v1/forgot?email=${email}`,
        {
          method: 'POST', // Replace with POST if required by the API
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const result = await response.json();
      const OTP = result.otp;

      if (response.ok) {
        // Success case
        Alert.alert('Success', 'Password reset link sent to your email.');
        setEmail('');
        navigation.navigate('ResetScreen', {OTP: result});
      } else {
        // Handle API errors
        Alert.alert(
          'Error',
          result?.message || 'Something went wrong. Please try again later.',
        );
      }
    } catch (error) {
      // Handle network or other errors
      Alert.alert('Error', 'Failed to connect to the server.');
    } finally {
      setLoading(false);
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
            <Text style={styles.title}>Forgot Password</Text>
          </View>

          {/* Forgot Password Form */}
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#6c757d"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleForgotPassword}
              disabled={loading}>
              <Text style={styles.submitButtonText}>
                {loading ? 'Submitting...' : 'Submit'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Back to Login Link */}
          <View style={styles.backToLoginContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={styles.backToLoginText}>Back to Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
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
  submitButton: {
    backgroundColor: primaryColor,
    width: '90%',
    height: 42,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backToLoginContainer: {
    marginTop: 10,
  },
  backToLoginText: {
    color: '#6c757d',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default Forgot;
