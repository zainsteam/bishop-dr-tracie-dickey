import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';
import CategoriesSection from '../components/CategoriesSection';
import Featured from '../components/FeaturedSection';
import React from 'react';

const HomeScreen = ({navigation}: any) => {
  const isDarkMode = useColorScheme() === 'light';
  console.log(isDarkMode, 'status');

  return (
    <SafeAreaView>
      <ScrollView>
        <StatusBar barStyle="light-content" backgroundColor="#2a0637" />
        <CategoriesSection navigation={navigation} route={undefined} />
        <Featured navigation={navigation} route={undefined} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
