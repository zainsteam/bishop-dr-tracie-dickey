import React, {useState} from 'react';
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

const primaryColor = '#2a0637';

const ResetPassword = ({navigation, route}: any) => {
  const {OTP} = route.params;
  const {email} = OTP.request_data;
  const [inputOTP, setOtp] = useState('');
  console.log(OTP.otp, 'otp');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!inputOTP || !password || !confirmPassword) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }

    if (inputOTP != OTP.otp) {
      Alert.alert('Validation Error', 'OTP not Matched');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://bishopdrtraciedickeyadmin.com/api/v1/reset-password-app`, // Replace with your API URL
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email: email, password: password, otp: OTP}), // Add required fields here
        },
      );

      const result = await response.json();

      if (result.status) {
        Alert.alert('Success', 'Password reset successfully.');
        navigation.navigate('LoginScreen');
      } else if (!result.status) {
        Alert.alert(
          'Error',
          result?.message || 'Something went wrong. Please try again later.',
        );
      }
    } catch (error) {
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
            <Text style={styles.title}>Reset Password</Text>
          </View>

          {/* Reset Password Form */}
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              placeholderTextColor="#6c757d"
              keyboardType="number-pad"
              value={inputOTP}
              onChangeText={setOtp}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter new password"
              placeholderTextColor="#6c757d"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm new password"
              placeholderTextColor="#6c757d"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleResetPassword}
              disabled={loading}>
              <Text style={styles.submitButtonText}>
                {loading ? 'Submitting...' : 'Reset Password'}
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

export default ResetPassword;
