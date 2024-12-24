import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://bishopdrtraciedickeyadmin.com/api/v1';

// Function to fetch pages from the API
export const fetchPages = async () => {
  const url = `${BASE_URL}/pages-content`;

  try {
    const response = await fetch(url, {
      method: 'POST',
    });

    const data = await response.json();

    if (response.ok) {
      return data.data;
    } else {
      throw new Error(data.message || 'Failed to fetch Pages');
    }
  } catch (error) {
    throw error;
  }
};
