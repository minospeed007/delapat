import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Text, Modal, Pressable, TouchableOpacity, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const Withdrawal = () => {
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [errorModalVisible, setErrorModalVisible] = useState(false)
  const [filteredData, setFilteredData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [idSelected, setIdSelected] = useState(false); // State to track if ID is selected

  useEffect(() => {
    fetchData();
  }, []);

  // Function to retrieve the authentication token from AsyncStorage
  const getAuthToken = async () => {
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
      const authToken = await getAuthToken();

      const formData = {
        "userId": id,
        "amount": amount,
        "FirstName": firstName,
        "LastName": lastName,
        "phone": phoneNumber
      };
      const response = await axios.post('https://delaserver.onrender.com/api/auth/withdrawal', formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log(response?.data)
      setBalance(response?.data)
      setModalVisible(true)
      setId('');
      setAmount('')
      setFirstName('');
      setLastName('');
      setPhoneNumber('');

    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrMsg(error.response.data.error);
      } else {
        setErrMsg('An error occurred while processing your request.');
      }
      setErrorModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.texts}> Withdrawal</Text>
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
            style={[styles.input, { width: '45%' }]} // Set width to 45% of container
            placeholder="FirstName"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={[styles.input, { width: '45%' }]} // Set width to 45% of container
            placeholder="LastName"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { width: '45%' }]} // Set width to 45% of container
            placeholder="PhoneNumber"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, { width: '45%' }]} // Set width to 45% of container
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
            <Text style={styles.success}>Withdrawal Successful</Text>

            <Text style={styles.text}>First Name: {balance?.withdrawal?.FirstName}</Text>
            <Text style={styles.text}>Last Name: {balance?.withdrawal?.LastName}</Text>
            <Text style={styles.text}>withdrawal: {balance?.withdrawal?.amount}</Text>
            <Text style={styles.text}>Total Balance: {balance?.balance}</Text>
            <Text style={styles.text}>Phone: {balance?.withdrawal?.phone}</Text>
          </View>
        </View>
      </Modal>
      {/* Error Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={errorModalVisible}
        onRequestClose={() => {
          setErrorModalVisible(!errorModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setErrorModalVisible(!errorModalVisible)}
            >
              <Text style={styles.textStyle}>X</Text>
            </Pressable>
            <Text style={styles.error}>Transaction Unsuccessful</Text>
            <Text style={styles.textErr}>{errMsg}</Text>
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
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginTop: 20,
  },
  texts: {
    fontWeight: 'bold',
    fontSize: 19,
  },
  buttonContainers: {
    marginTop: 20,
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
    zIndex: 0, // Lower zIndex for TextInput
  },
  touchContainer: {
    position: 'absolute',
    top: 140, // Adjust as needed to create space between TextInput and touchContainer

    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Higher zIndex for touchContainer
  },
  inputContainer: {
    width: 280, // Adjust as needed
    flexDirection: 'row',
    marginBottom: 30,
    gap: 10,
  },
  formContainer: {
    padding: 20,
    marginTop: 40, // Add margin to create space between TextInput and touchContainer
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
  error: {
    fontSize: 15,
    marginTop: 10,
    marginBottom: 10,
    color: 'red',
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
  textErr: {
    fontSize:17,
    color:"red",
    marginTop: 10,
    marginBottom: 10,
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export default Withdrawal;
