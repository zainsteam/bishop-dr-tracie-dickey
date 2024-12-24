import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Heading from './HeadingSnipet';
import Tile2 from './Tiles2Snipet';

const styles = StyleSheet.create({
  container1: {
    // flex: 1,
    // alignItems:`center`,
  },

  heading: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    fontWeight: `bold`,
    color: `#2a0637`,
    textAlign: `left`,
  },
});

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

const Featured = ({navigation, route}: CategoryProps) => {
  // const {category} = route?.params;
  const [categoriesList, setCategoriesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories list from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${BASE_URL}api/v1/comingnext-list`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            limit: '7',
            orderby: 'created_at',
            order: 'DESC',
            user_device_id: '',
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // console.log(data, 'data');
        // Transform image URLs to full URLs if needed
        let formattedData = [];

        formattedData = data['data']['data'].map((item: any) => ({
          ...item,
          image: formatImageUrl(item.image),
          categoryTitle: 'comingnext',
        }));

        setCategoriesList(formattedData);
      } catch (error: any) {
        console.error('Error fetching data:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#4482a7" />
      </View>
    );
  }

  return (
    <View>
      <Heading heading="Featured Videos:" />
      <Tile2 navigation={navigation} route={categoriesList} />
    </View>
  );
};

export default Featured;
