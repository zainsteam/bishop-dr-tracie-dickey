import React, {useEffect, useState} from 'react';
import {View, Text, Alert, StyleSheet, ActivityIndicator} from 'react-native';
import {DrawerActions, NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from '../pages/HomeScreen';
import CategoryScreen from '../pages/CategoryScreen';
import DetailsScreen from '../pages/DetailsScreen';
import LoginScreen from '../pages/Login';
import Forgot from '../pages/Forgot';
import Register from '../pages/Register';
import Reset from '../pages/Reset';
import Page from '../pages/Page';
import {fetchPages} from '../provider/ApiProvider';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// Logout functionality
const logout = (navigation: any) => {
  Alert.alert('Logout', 'Are you sure you want to logout?', [
    {text: 'Cancel', style: 'cancel'},
    {
      text: 'Yes',
      onPress: async () => {
        try {
          await AsyncStorage.removeItem('userData');
          navigation.navigate('LoginScreen');
        } catch (error) {
          console.error('Error clearing storage:', error);
        }
      },
    },
  ]);
};

// Static categories
const categories = [
  {
    id: '1',
    title: 'podcast',
    counts: 1,
  },
  {
    id: '2',
    title: 'broadcast',
    counts: 2,
  },
  {
    id: '3',
    title: 'testimonial',
    counts: 17,
  },
  {
    id: '4',
    title: 'comingnext',
    counts: 35,
  },
];

// Custom drawer content
const CustomDrawerContent = ({navigation, pages}: any) => (
  <DrawerContentScrollView>
    <View>
      <Text style={styles.drawerHeader}>Menu</Text>
      <DrawerItem
        label="Home"
        onPress={() => {
          DrawerActions.closeDrawer();
          navigation.navigate('Home');
        }}
        labelStyle={styles.drawerLabel}
      />
      <View style={styles.group}>
        {categories.map(item => (
          <DrawerItem
            key={item.id}
            label={item.title}
            onPress={() => {
              DrawerActions.closeDrawer();
              navigation.navigate('CategoryScreen', {category: item});
            }}
            labelStyle={styles.drawerLabel}
          />
        ))}
      </View>

      {/* Dynamic Pages */}
      {pages.length > 0 && (
        <View style={styles.group}>
          {/* <Text style={styles.drawerSectionTitle}>Dynamic Pages</Text> */}
          {pages.map((page: any) => (
            <DrawerItem
              key={page.id}
              label={page.title}
              onPress={() => {
                DrawerActions.closeDrawer();
                navigation.navigate('PageScreen', {page: page});
              }}
              labelStyle={styles.drawerLabel}
            />
          ))}
        </View>
      )}
      <DrawerItem
        label="Logout"
        onPress={() => logout(navigation)}
        labelStyle={styles.drawerLabel}
      />
    </View>
  </DrawerContentScrollView>
);

// Drawer Navigator
const MyDrawer = ({pages}: {pages: any[]}) => (
  <Drawer.Navigator
    drawerContent={props => <CustomDrawerContent {...props} pages={pages} />}
    screenOptions={{
      drawerStyle: {backgroundColor: '#2a0637'},
      drawerLabelStyle: {color: 'white', fontSize: 20, fontFamily: 'Georgia'},
      drawerActiveBackgroundColor: '#ce6fff',
      drawerType: 'slide',
    }}>
    <Drawer.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: 'Home',
        headerStyle: {backgroundColor: '#2a0637'},
        headerTintColor: 'white',
      }}
    />
  </Drawer.Navigator>
);

// Main Stack Navigator
const HomeStack = () => {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);
  const [pages, setPages] = useState<any[]>([]); // Store fetched pages
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch pages and determine initial route
  useEffect(() => {
    const fetchAndSetPages = async () => {
      try {
        const data = await fetchPages();
        setPages(data || []); // Ensure it doesn't break if data is null
      } catch (err) {
        console.error('Error fetching pages:', err);
      } finally {
        setLoading(false);
      }
    };

    const checkUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        setInitialRoute(userData ? 'Drawer' : 'LoginScreen');
      } catch (error) {
        console.error('Error checking user data:', error);
        setInitialRoute('LoginScreen');
      }
    };

    fetchAndSetPages();
    checkUserData();
  }, []);

  if (!initialRoute) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2a0637" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="Drawer" options={{headerShown: false}}>
          {props => <MyDrawer {...props} pages={pages} />}
        </Stack.Screen>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ResetScreen"
          component={Reset}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgotScreen"
          component={Forgot}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CategoryScreen"
          component={CategoryScreen}
          options={{
            title: 'Category',
            headerStyle: {backgroundColor: '#2a0637'},
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="DetailsScreen"
          component={DetailsScreen}
          options={{
            title: 'Details',
            headerStyle: {backgroundColor: '#2a0637'},
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="PageScreen"
          component={Page}
          options={{
            title: '',
            headerStyle: {backgroundColor: '#2a0637'},
            headerTintColor: 'white',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Styles
const styles = StyleSheet.create({
  drawerHeader: {
    fontSize: 24,
    color: 'white',
    padding: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  group: {
    borderBottomColor: '#fff5',
    borderTopColor: '#fff5',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    paddingVertical: 10,
  },
  drawerLabel: {
    fontSize: 18,
    color: 'white',
    textTransform: 'capitalize',
  },
  drawerSectionTitle: {
    fontSize: 16,
    color: '#ce6fff',
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default HomeStack;
