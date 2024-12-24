import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import CategorySnipet from './CategorySnipet';

interface CategoryItem {
  id: string;
  title: string;
  image_url: any;
  counts: number;
}

interface CategoryPageProps {
  navigation: any;
  route: any;
}
const styles = StyleSheet.create({
  container1: {},
  gridItem: {},
  heading: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    fontWeight: `bold`,
    color: `#2a0637`,
    textAlign: `left`,
  },
});

// Use CategoryNavProps for typing
const CategoriesSection = ({navigation}: CategoryPageProps) => {
  const categories = [
    {
      id: '1',
      title: 'podcast',
      image_url: require('../assets/images/Podcast_icon.webp'),
      counts: 1,
    },
    {
      id: '2',
      title: 'broadcast',
      image_url: require('../assets/images/broadcast.png'),
      counts: 2,
    },
    {
      id: '3',
      title: 'testimonial',
      image_url: require('../assets/images/testimonial.png'),
      counts: 17,
    },
    {
      id: '4',
      title: 'comingnext',
      image_url: require('../assets/images/next2.png'),
      counts: 35,
    },
  ];

  return (
    <SafeAreaView style={{alignItems: 'center'}}>
      <View style={styles.gridItem}>
        <CategorySnipet navigation={navigation} route={categories} />
      </View>
    </SafeAreaView>
  );
};

export default CategoriesSection;
