import React, { useState } from 'react';
import { View, TextInput, Text, ActivityIndicator,
   Button, StyleSheet, Modal, KeyboardAvoidingView, TouchableOpacity,
   Platform } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const AddCustomer = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [id, setId] = useState('');
  const [phone, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const handleId = (text) => {
    setId(text);
  };
  const handleFirstName = (text) => {
    setFirstName(text);
  };
  const handleLastName = (text) => {
    setLastName(text);
  };
  const handlePhone = (text) => {
    setPhoneNumber(text);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      // Get the authentication token
      const token = await AsyncStorage.getItem('access_token');
  
      // Configure Axios request headers with the token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const formData = {
        Id: id,
        FirstName: firstName,
        LastName: lastName,
        phone: phone,
      };
  
      const response = await axios.post('https://delaserver.onrender.com/api/users/register_customer', formData, config);
      setSuccessModalVisible(true);
      console.log(response?.data);
  
      setId('');
      setFirstName('');
      setLastName('');
      setPhoneNumber('');
      setErrorMessage(''); 
      setIsLoading(false);
    } catch (error) {
      let errorMessage = 'An error occurred while creating the customer';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      setErrorMessage(errorMessage); 
      setIsLoading(false);
      
    }
  };
  

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.text}>Add New Customer</Text>
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={handleFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={handleLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Telephone Number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={handlePhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Id"
        keyboardType="numeric"
        value={id}
        onChangeText={handleId}
      />
      <View style={styles.button}>
      
     
      {isLoading ? (< ActivityIndicator/>):(
      <TouchableOpacity   onPress={handleSubmit}>
      <Text style={styles.buttonText}>Submit</Text>
    </TouchableOpacity>
    
      )
       }
      
      </View>
      {/* Success Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={successModalVisible}
        onRequestClose={() => {
          setSuccessModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Customer successfully created</Text>
            <Button title="Close" onPress={() => setSuccessModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  
  button: {
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#1E90FF',
    padding: 10,
    marginTop:20,

    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    textAlign:'center',
    fontWeight: 'bold',
    fontSize:19,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  text: {
    marginBottom: 40,
    textAlign: 'center',
    fontSize: 19,
    fontWeight: 'bold',
  },
  submitText: {
    width: 250,
    marginTop: 30,
    marginBottom: 30,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 20,
    fontSize: 18,
    color:'green',
    textAlign: 'center',
  },
});

export default AddCustomer;
