import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const HomeIcon = () => {
  const navigation = useNavigation();

  

  const handleHome = () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.container}>
      

        
          <View >
            <Text>Home</Text>
            </View>
      </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
   card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 16,
    margin: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  button: {
    width: 150,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default HomeIcon;
