import React from 'react';
import {
  View,
  StyleSheet,
  useWindowDimensions,
  Text,
  ScrollView,
} from 'react-native';
import RenderHTML from 'react-native-render-html';

const Page = ({route}: any) => {
  const {page} = route.params; // Extract the page object
  const {width} = useWindowDimensions(); // Get the screen width for responsive rendering

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>{page.title}</Text>
        <RenderHTML
          contentWidth={width}
          source={{html: page.content}}
          tagsStyles={{
            p: styles.paragraph,
            h1: styles.title,
            h2: styles.subtitle,
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: '#555',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
});

export default Page;
