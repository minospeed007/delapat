import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Button, Modal, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import axios from 'axios';

const Deposit = () => {
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [balance, setBalance] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [amount, setAmount] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [idSelected, setIdSelected] = useState(false); // State to track if ID is selected

  useEffect(() => {
    fetchData();
  }, []);

  // Function to retrieve the authentication token from AsyncStorage
  const getToken = async () => {
    try {
      return await AsyncStorage.getItem('authToken');
    } catch (error) {
      console.error('Error retrieving authentication token:', error);
      throw error;
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('https://delaserver.onrender.com/api/users/');
      setFilteredData(response.data);
      setOriginalData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleIdPress = (item) => {
    setId(item.Id.toString());
    setFirstName(item.FirstName);
    setLastName(item.LastName);
    setPhoneNumber(item.phone);
    setIdSelected(true);
  };


  const handleInputChange = (value) => {
    setId(value);
    if (value === '') {
      setFirstName('');
      setLastName('');
      setPhoneNumber('');
    }
    setIdSelected(false);
    const newData = value
      ? originalData.filter(item =>
        item.Id.toString().includes(value.toLowerCase())
      )
      : originalData;
    setFilteredData(newData);
  };

  const handleSubmit = async () => {
    try {
      // Get the authentication token
      const token = await getToken();

      // Configure Axios request headers with the token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const formData = {
        "userId": id,
        "amount": amount,
        "FirstName": firstName,
        "LastName": lastName,
        "phone": phoneNumber
      };
      const response = await axios.post('https://delaserver.onrender.com/api/auth/deposit', formData, config);
      console.log(response?.data)
      setBalance(response?.data)
      setModalVisible(true)
      setId('');
      setAmount('')
      setFirstName('');
      setLastName('');
      setPhoneNumber('');

    } catch (error) {
      console.error('Submitting Failed :', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.texts}> Deposit</Text>
      <View style={styles.line}></View>
      <View style={styles.touchContainer}>
        {/* Show filteredData only if ID is not selected */}
        {id.length > 0 && !idSelected && filteredData.map(item => (
          <TouchableOpacity key={item._id} onPress={() => handleIdPress(item)}>
            <View style={styles.card}>
              <Text>{item.FirstName} {item.LastName}</Text>
              <Text>ID: {item.Id}</Text>
              <Text>Phone: {item.phone}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Id"
            value={id}
            onChangeText={handleInputChange}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { width: '45%' }]}
            placeholder="FirstName"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={[styles.input, { width: '45%' }]}
            placeholder="LastName"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { width: '45%' }]}
            placeholder="PhoneNumber"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, { width: '45%' }]}
            placeholder="Amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.buttonContainers}>
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>X</Text>
            </Pressable>
            <Text style={styles.success}>Deposit Successful</Text>

            <Text style={styles.text}>First Name: {balance?.deposit?.FirstName}</Text>
            <Text style={styles.text}>Last Name: {balance?.deposit?.LastName}</Text>
            <Text style={styles.text}>Deposited: {balance?.deposit?.amount}</Text>
            <Text style={styles.text}>Total Balance: {balance?.balance}</Text>
            <Text style={styles.text}>Phone: {balance?.deposit?.phone}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: '95%',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,

    marginTop: 20,
  },
  buttonContainers: {
    marginTop: 20,
  },
  texts: {
    fontWeight: 'bold',
    fontSize: 19,
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
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
  input: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    zIndex: 0,
  },
  touchContainer: {
    position: 'absolute',
    top: 140,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  inputContainer: {
    width: 280,
    flexDirection: 'row',
    marginBottom: 30,
    gap: 10,
  },
  formContainer: {
    padding: 20,
    marginTop: 40,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  success: {
    fontSize: 15,
    marginTop: 10,
    marginBottom: 10,
    color: 'green',
  },
  button: {
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: 'white',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 19,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    backgroundColor: 'red',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export default Deposit;
