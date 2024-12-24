import React from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import Animated from 'react-native-reanimated';

// Define the structure of a category item
interface CategoryItem {
  id: string;
  title: string;
  image_url: string;
  counts: string;
  description: string;
  short_description?: string;
  comments?: number;
  likes?: number;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  imageContainer: {
    width: 120,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  tinyImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  defaultImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: `#2a0637`,
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  counts: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});

interface CategoryProps {
  route: any;
  navigation: any;
}

// Function to truncate and clean HTML from the description
const formatDescription = (
  description: string | undefined,
  wordLimit: number,
) => {
  if (!description) return ''; // Return empty string if description is undefined

  // Remove HTML tags
  const plainText = description.replace(/<\/?[^>]+(>|$)/g, '');
  const words = plainText.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return plainText;
};

const Tile2 = ({route, navigation}: CategoryProps) => {
  return (
    <>
      {route.map((item: any) => (
        <TouchableHighlight
          key={item.id}
          activeOpacity={0.9}
          underlayColor="#DDDDDD"
          onPress={() => navigation.navigate('DetailsScreen', {item})}>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              {item.image ? (
                <Animated.Image
                  style={styles.tinyImage}
                  src={item.image}
                  // sharedTransitionTag={item.title + item.id}
                />
              ) : (
                <Animated.Image
                  style={styles.defaultImage}
                  source={require('../assets/images/defaultuser.png')}
                  // sharedTransitionTag={item.title + item.id}
                />
              )}
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>
                {formatDescription(item.title, 10)}
              </Text>
              {item.short_description ? (
                <Text style={styles.description}>
                  {formatDescription(item.short_description, 20)}
                </Text>
              ) : null}
              <Text style={styles.counts}>
                {item.comments ? `Comments: ${item.comments}` : 'No Comments '}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      ))}
    </>
  );
};

export default Tile2;
