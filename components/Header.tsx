import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  FlatList,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  header: {
    backgroundColor: `#2a0637`,
    padding: 12,
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  texts: {
    color: `#ffffff`,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  drawerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: height,
    width: width * 0.75,
    backgroundColor: '#2a0637',
    padding: 20,
    zIndex: 1000,
  },
  menuItem: {
    marginVertical: 10,
  },
  menuItemText: {
    color: '#fff',
    fontSize: 16,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1,
  },
});

const Header = () => {
  const [drawerAnimation] = useState(new Animated.Value(-width * 0.75));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    if (isDrawerOpen) {
      Animated.timing(drawerAnimation, {
        toValue: -width * 0.75,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsDrawerOpen(false));
    } else {
      setIsDrawerOpen(true);
      Animated.timing(drawerAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const menuItems = [
    {id: '1', title: 'Home'},
    {id: '2', title: 'Profile'},
    {id: '3', title: 'Settings'},
    {id: '4', title: 'About'},
  ];

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleDrawer}>
          {/* <Icon name="bars" size={24} color="#fff" /> */}
          <Text style={styles.menuItemText}>Menu</Text>
        </TouchableOpacity>
        <Text style={styles.texts}>Header</Text>
        <TouchableOpacity onPress={toggleDrawer}>
          {/* <Icon name="bars" size={24} color="#fff" /> */}
          {/* <Text style={{display: 'none'}}>Menu</Text> */}
        </TouchableOpacity>
      </View>

      {isDrawerOpen && (
        <TouchableOpacity style={styles.overlay} onPress={toggleDrawer} />
      )}
      <Animated.View
        style={[
          styles.drawerContainer,
          {transform: [{translateX: drawerAnimation}]},
        ]}>
        <FlatList
          data={menuItems}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.menuItem}>
              <Text style={styles.menuItemText}>{item.title}</Text>
            </View>
          )}
        />
      </Animated.View>
    </>
  );
};

export default Header;
