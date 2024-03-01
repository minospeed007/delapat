import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const CustomerBalance = () => {
  const [phone, setPhone] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://delaserver.onrender.com/api/users/');
      setAllUsers(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filterData = () => {
    const filteredData = allUsers.filter(item =>
      item?.phone?.toString()?.includes(phone.toLowerCase())
    );
    setFilteredUsers(filteredData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Customer Balance</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            setPhone(text);
            filterData();
          }}
          value={phone}
          placeholder="Search by phone number..."
          keyboardType="numeric"
        />
      </View>
      {phone.length > 0 && filteredUsers.length === 0 && (
        <Text style={styles.text}>No user found</Text>
      )}
      {phone.length > 0 && filteredUsers.length > 0 && (
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.userDataContainer}>
              <Text style={styles.userDataText}>First Name: {item.FirstName}</Text>
              <Text style={styles.userDataText}>Last Name: {item.LastName}</Text>
              <Text style={styles.userDataText}>Phone: {item.phone}</Text>
              <Text style={styles.userDataText}>Balance: {item.totalContributedAmount}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text:{
    textAlign:'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop:10,
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:20,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  userDataContainer: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  userDataText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default CustomerBalance;
