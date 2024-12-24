import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../pages/HomeScreen';
import Details from '../pages/DetailsScreen';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  drawerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: width * 0.75, // Drawer width (75% of screen width)
    backgroundColor: '#2a0637',
    padding: 20,
    zIndex: 1000,
  },
  menuButton: {
    padding: 10,
    backgroundColor: '#ce6fff',
    borderRadius: 5,
    marginBottom: 20,
  },
  menuButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  menuItem: {
    marginVertical: 10,
  },
  menuItemText: {
    color: '#fff',
    fontSize: 16,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

const Menu = () => {
  const [drawerAnimation] = useState(new Animated.Value(-width * 0.75));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    if (isDrawerOpen) {
      // Close drawer
      Animated.timing(drawerAnimation, {
        toValue: -width * 0.75,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsDrawerOpen(false));
    } else {
      // Open drawer
      setIsDrawerOpen(true);
      Animated.timing(drawerAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <>
      {/* Menu Button */}
      <TouchableOpacity style={styles.menuButton} onPress={toggleDrawer}>
        <Text style={styles.menuButtonText}>
          {isDrawerOpen ? 'Close Menu' : 'Open Menu'}
        </Text>
      </TouchableOpacity>

      {/* Drawer */}
      {isDrawerOpen && (
        <TouchableOpacity style={styles.overlay} onPress={toggleDrawer} />
      )}
      <Animated.View
        style={[
          styles.drawerContainer,
          {transform: [{translateX: drawerAnimation}]},
        ]}>
        <Text style={styles.menuItemText}>Menu</Text>
        <View style={styles.menuItem}>
          <Text style={styles.menuItemText}>Home</Text>
        </View>
        <View style={styles.menuItem}>
          <Text style={styles.menuItemText}>Details</Text>
        </View>
        <View style={styles.menuItem}>
          <Text style={styles.menuItemText}>Settings</Text>
        </View>
        <View style={styles.menuItem}>
          <Text style={styles.menuItemText}>About</Text>
        </View>
      </Animated.View>
    </>
  );
};

export default Menu;
