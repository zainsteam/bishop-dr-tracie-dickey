import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Tile2 from '../components/Tiles2Snipet';
import Heading from '../components/HeadingSnipet';
import {ScrollView} from 'react-native';

interface CategoryProps {
  navigation: any;
  route: any;
}

const BASE_URL = 'https://bishopdrtraciedickeyadmin.com/';

// Helper function to convert relative URLs to full URLs
const formatImageUrl = (url: any) => {
  if (!url.startsWith('http')) {
    return `${BASE_URL}${url}`;
  }
  return url;
};

const CategoryScreen = ({navigation, route}: CategoryProps) => {
  const {category} = route.params;
  const [categoriesList, setCategoriesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(true); // To track if more pages are available

  const fetchCategories = async (currentPage: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://bishopdrtraciedickeyadmin.com/api/v1/${category.title}-list`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            limit: '10',
            orderby: 'created_at',
            order: 'DESC',
            user_device_id: '',
            page: currentPage,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Transform image URLs to full URLs and include category.title in each item
      let formattedData = [];
      if (category.title === 'testimonial') {
        formattedData = data['data']['data'].map((item: any) => ({
          ...item,
          categoryTitle: category.title, // Add category title
        }));
      } else {
        formattedData = data['data']['data'].map((item: any) => ({
          ...item,
          image: formatImageUrl(item.image),
          categoryTitle: category.title, // Add category title
        }));
      }

      setCategoriesList(formattedData);
      setHasMorePages(data['data']['next_page_url'] !== null); // Check if there is a next page
    } catch (error: any) {
      console.error('Error fetching data:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(page);
  }, [page]);

  const handleNextPage = () => {
    if (hasMorePages) {
      setPage(prevPage => prevPage + 1);
    } else {
      Alert.alert('No more pages');
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    } else {
      Alert.alert('Already on the first page');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#2a0637" />;
  }

  if (error) {
    return (
      <SafeAreaView>
        <Text>Error: {error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Heading heading={category.title} />

        <View>
          <Tile2 route={categoriesList} navigation={navigation} />
        </View>
      </ScrollView>

      {/* Pagination Controls */}
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={[styles.button, page === 1 && styles.disabledButton]}
          onPress={handlePreviousPage}
          disabled={page === 1}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>

        <Text style={styles.pageIndicator}>Page {page}</Text>

        <TouchableOpacity
          style={[styles.button, !hasMorePages && styles.disabledButton]}
          onPress={handleNextPage}
          disabled={!hasMorePages}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'static', // Sticky footer
    bottom: 0,
    backgroundColor: '#fff',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  button: {
    backgroundColor: '#2a0637',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  pageIndicator: {
    fontSize: 16,
    color: '#2a0637',
  },
});

export default CategoryScreen;
