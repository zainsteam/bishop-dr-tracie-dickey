import React from 'react';
import { Image, Text, View, StyleSheet, FlatList } from 'react-native';

// Define the structure of a category item
interface CategoryItem {
  id: string;
  title: string;
  image_url: any;
  counts: string;
  des: string;
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  rectangularContainer: {
    width: 220,
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  tinyImage: {
    width: '100%',
    height: 110,
  },
  title: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'grey',
    width: 220,
  },
  description: {
    fontSize: 12,
    color: 'grey',
    width: 220,
  },
  counts: {
    position: 'absolute',
    top: 5,
    right: 5,
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
});

interface CategoryProps {
  categories: CategoryItem[];
}

// Function to truncate the description to a maximum of 12 words
const truncateDescription = (description: string, wordLimit: number) => {
  const words = description.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return description;
};

const Tile: React.FC<CategoryProps> = ({ categories }) => {
  return (
    <FlatList
      horizontal
      data={categories}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={styles.container}>
          <View style={styles.rectangularContainer}>
            <Image style={styles.tinyImage} source={item.image_url} />
            <Text style={styles.counts}>{item.counts}</Text>
          </View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>
            {truncateDescription(item.des, 12)}
          </Text>
        </View>
      )}
    />
  );
};

export default Tile;