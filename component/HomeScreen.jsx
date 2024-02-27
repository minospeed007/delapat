import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Menu from './Menu';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {

  const navigation = useNavigation();

  const handleDeposit = () => {
    navigation.navigate('Deposit');
  };

  const handleWithdrawal = () => {
    navigation.navigate('Withdrawal');
  };

  return (
    <View style={styles.container}>
    <View>
      
      </View>
      <View style={styles.card}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={handleDeposit}>
            <Text style={styles.buttonText}>Deposit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleWithdrawal}>
            <Text style={styles.buttonText}>Withdrawal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#A5C882',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F8F2',
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
    height: 300, 
  },
  buttonsContainer: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    gap:10,
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

export default HomeScreen;
