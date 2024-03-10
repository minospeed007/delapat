import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

import { useNavigation, useFocusEffect } from '@react-navigation/native';

const Menu = () => {
  const navigation = useNavigation();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleViewCustomer = () => {
    navigation.navigate('Customers');
  };

  const handleAddCustomer = () => {
    navigation.navigate('AddCustomer');
  };

  const handleCustBal = () => {
    navigation.navigate('CustomerBalance');
  };

  const handleMenu = () => {
    navigation.navigate('ViewMenu');
  };
  const handleAllTrnx = () => {
    navigation.navigate('AllTrnx');
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('access_token'); 
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }
  useFocusEffect(
    React.useCallback(() => {
      setMenuOpen(false);
    }, [])
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
        <FontAwesome name="bars" size={24} color="grey" />
      </TouchableOpacity>

      <Modal
        visible={isMenuOpen}
        animationType="slide"
        onRequestClose={toggleMenu}
        transparent={true}

        presentationStyle="overFullScreen"
        hardwareAccelerated
        statusBarTranslucent
      >
        <TouchableOpacity style={styles.overlay} onPress={toggleMenu} />
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={toggleMenu} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text style={styles.menuText} onPress={handleViewCustomer}>View Customers</Text>
            <Text style={styles.menuText} onPress={handleAddCustomer}>Add Customer</Text>
            <Text style={styles.menuText} onPress={handleCustBal}>Customer Balance</Text>

          <Text style={styles.menuText} onPress={handleAllTrnx }>Transaction History</Text>
          <TouchableOpacity style={styles.logout} onPress={handleLogout}>
              <FontAwesome name="sign-out" size={24} color="black" />
              <Text style={styles.menuText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  menuButton: {
    padding: 10,
    borderRadius: 5,
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    marginTop:43,
    width: Dimensions.get('window').width * 0.8, // Adjust the width as needed
    height: '90%',
    backgroundColor: '#F9F9F9',
  },
  textContainer: {
    marginTop: 80,
    justifyContent:"center",
    alignItems:'center',
    marginLeft: 5,
  },
  logout: {
    flexDirection: 'row',
    gap:10,
    alignItems: 'center',
    color: 'blue',
  },
  menuText: {
    marginTop: 20,
    fontSize: 20,
    color: 'black',
    marginBottom: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default Menu;
