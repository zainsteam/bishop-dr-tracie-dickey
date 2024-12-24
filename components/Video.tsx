import React, {useState} from 'react';
import {View, Button, Modal, StyleSheet, Dimensions} from 'react-native';
import {WebView} from 'react-native-webview';
const {height, width} = Dimensions.get('window');

const extractVideoId = (url: any) => {
  // Regular expression to match Facebook video ID
  const match = url.match(/videos\/(\d+)/);
  return match ? match[1] : null;
};

const FacebookVideoModal = (video: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const videoUrl =
    'https://www.facebook.com/tracie.dickey.3/videos/512987328851038/';
  const videoId = extractVideoId(videoUrl);

  const facebookEmbedUrl = videoId ? video.url : null;

  console.log(width);

  return (
    <View style={styles.container}>
      {facebookEmbedUrl && (
        <WebView
          source={{
            uri: facebookEmbedUrl,
          }}
          style={styles.webView}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          mixedContentMode="always"
          allowsFullscreenVideo={true}
          onShouldStartLoadWithRequest={() => true}
          originWhitelist={['*']}
          startInLoadingState={true}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    flex: 1,
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  webView: {
    width: width - 40,
    // height: height, // Adjust the height as needed
    marginTop: 20,
  },
});

export default FacebookVideoModal;
