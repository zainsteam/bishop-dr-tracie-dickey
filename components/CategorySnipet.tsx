import React from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableHighlight,
  ViewBase,
} from 'react-native';

import Heading from './HeadingSnipet';

// Define the structure of a category item
interface CategoryItem {
  id: string;
  title: string;
  image_url: any;
  counts: number;
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  circularContainer: {
    backgroundColor: `#2a0637`,
    width: 70,
    height: 70,
    borderRadius: 50,
    // backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#2a0637',
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'relative',
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 45,
    resizeMode: 'cover',
    tintColor: `white`,
  },
  title: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'grey',
    textTransform: 'capitalize',
  },
  counts: {
    position: 'absolute',
    top: -5,
    right: -5,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: '#ce6fff',
    borderRadius: 15,
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  lists: {
    alignContent: `flex-end`,
    justifyContent: `space-between`,
    width: `100%`,
  },
});

interface CategoryProps {
  navigation: any;
  route: any;
}

const CategorySnipet = ({navigation, route}: CategoryProps) => {
  return (
    <View
      style={{
        width: '100%',
      }}>
      <Heading heading="All Categories:" />

      <FlatList
        horizontal
        data={route}
        contentContainerStyle={{
          width: '100%',
          justifyContent: 'center',
        }} // Add padding at the start and end
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableHighlight
            activeOpacity={0.9}
            underlayColor="#DDDDDD"
            onPress={() =>
              navigation.navigate('CategoryScreen', {category: item})
            }>
            <View style={styles.container}>
              <View style={styles.circularContainer}>
                <Image style={styles.tinyLogo} source={item.image_url} />
                <Text style={styles.counts}>{item.counts}</Text>
              </View>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </TouchableHighlight>
        )}
      />
    </View>
  );
};

export default CategorySnipet;
