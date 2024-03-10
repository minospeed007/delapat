import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TextInput, Button, TouchableOpacity, Modal } from 'react-native';
import axios from 'axios';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      const response = await axios.get('https://delaserver.onrender.com/api/users/');
      setCustomers(response.data);
      setIsLoading(false);
    } catch (error) {
      let errorMessage = 'An error occurred while creating the customer';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
        setErrorMessage(errorMessage);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredCustomers = customers.filter((item) =>
    item.FirstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.Id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.LastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.phone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`https://delaserver.onrender.com/api/users/${userId}`);
      setDeleteModal(false);
      fetchData();
    } catch (error) {
      let errorMessage = 'An error occurred while creating the customer';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
        setErrorMessage(errorMessage);
      }
    }
  };

  const handleDeleteModal = (userId) => {
    setSelectedUserId(userId);
    setDeleteModal(true);
  };
  
  const handleOpenModal = (userId) => {
    setSelectedUserId(userId); 
    setShowModal(true);
  };

  const handleUpdate = async () => {
    try {
      const updatedData = {};
      if (firstName) updatedData.FirstName = firstName;
      if (lastName) updatedData.LastName = lastName;
      if (phone) updatedData.phone = phone;
  
      const response = await axios.put(`https://delaserver.onrender.com/api/users/${selectedUserId}`, updatedData);
      setShowModal(false);
      setFirstName('');
      setLastName('');
      setPhone('');
      fetchData();
    } catch (error) {
      let errorMessage = 'An error occurred while creating the customer';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
        setErrorMessage(errorMessage);
      }
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Delapat Customers</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.searchInput}
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
          placeholder="Search customer"
        />
      </View>
      {customers.length > 0 && filteredCustomers.length === 0 && (
        <Text style={styles.text}>No user found</Text>
      )}
     
        {isLoading ? (
          <ActivityIndicator style={styles.activityIndicator} />
        ) : (
          <FlatList
            data={filteredCustomers}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.transactionItem}>
                <Text style={styles.transactionInfo}>UserId: <Text>{item.Id}</Text></Text>
                <Text style={styles.transactionInfo}>First Name: <Text>{item.FirstName}</Text></Text>
                <Text style={styles.transactionInfo}>Last Name: <Text>{item.LastName}</Text></Text>
                <Text style={styles.transactionInfo}>Phone Number: <Text>{item.phone}</Text></Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={()=>handleDeleteModal(item._id)} style={styles.deleteButton}>
                    <Text style={styles.delete}>Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleOpenModal(item._id)} style={styles.updateButton}>
                    <Text style={styles.update}>Update</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteModal}
        onRequestClose={() => setDeleteModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.errorText}>Delete this user?</Text>
            {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
            <View style={styles.updateContainer}>
              <Text onPress={() => setDeleteModal(false)} style={styles.cancelText}>Cancel</Text>
              <View style={{ width: 20 }} /> 
              <TouchableOpacity onPress={() => handleDelete(selectedUserId)} style={styles.deleteButton}>
                <Text style={{ color: 'red' }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Update User</Text>
            {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={phone}
              onChangeText={(text) => setPhone(text)}
            />
            <View style={styles.updateContainer}>
              <Button title="Cancel" onPress={() => setShowModal(false)} />
              <View style={{ width: 20 }} /> 
              <Button title="Update" onPress={handleUpdate} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  activityIndicator: {
    marginTop: 10,
  },
  update: {
    color: 'green',
    textAlign: 'center',
  },
  delete: {
    color: 'red',
    textAlign: 'center',
  },
  cancelText: {
    textAlign: 'center',
    borderColor: 'blue',
    color: 'blue',
    borderWidth: 1,
    width: 70,
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  errorText: {
    fontSize: 17,
    color: 'red',
  },
  updateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginHorizontal: 20,
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  heading: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  transactionItem: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  transactionInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
  text: {
    textAlign: 'center',
  },
  searchInput: {
    width: '100%',
    marginTop: 10,
    marginBottom: 30,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  input: {
    width: 150,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  deleteButton: {
    borderColor: 'red',
    borderWidth: 1,
    width: 70,
    textAlign: 'center',
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  updateButton: {
    borderColor: 'green',
    borderWidth: 1,
    padding: 5,
    width: 70,
    textAlign: 'center',
    borderRadius: 5,
    marginLeft: 10,
  },
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
    color: 'green',
    textAlign: 'center',
  },
});

export default Customers;
