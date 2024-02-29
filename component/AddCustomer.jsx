import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';

const AddCustomer = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [id, setId] = useState('');
  const [phone, setPhoneNumber] = useState('');
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
      const formData = {
        Id: id,
        FirstName: firstName,
        LastName: lastName,
        phone: phone,
      };
      const response = await axios.post('https://vast-rose-jackrabbit-kit.cyclic.app/api/users/register_customer', formData);
      console.log(response?.data);
      setId('');
      setFirstName('');
      setLastName('');
      setPhoneNumber('');
      setErrorMessage('');
      setSuccessModalVisible(true); // Open success modal
    } catch (error) {
     // console.error('Sign up failed:', error);
      if (error.response) {
        const errorMessage = error.response.data.message;
        setErrorMessage(errorMessage);
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
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
        <Button title="Submit" onPress={handleSubmit} />
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
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 19,
    fontWeight: 'bold',
  },
  button: {
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
