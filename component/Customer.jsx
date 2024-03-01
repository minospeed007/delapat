import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';

const AllTrnxHist = () => {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('https://delaserver.onrender.com/api/users/');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredCustomers = customers.filter((item) =>
  (item.FirstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  item.Id?.toLowerCase().includes(searchQuery.toLowerCase())||
    item.LastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.phone?.toLowerCase().includes(searchQuery.toLowerCase()))
);

  return (
    <View style={styles.container}>
    
    

      <Text style={styles.heading}>Delapat Customers</Text>
      <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
        placeholder="Search customer"
      />
      </View>
      {customers.length > 0 && filteredCustomers.length === 0 && (
        <Text style={styles.text}>No user found</Text>
      )}
      <FlatList
        data={filteredCustomers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
           <Text style={styles.transactionInfo}>UserId: {item.Id}</Text>

            <Text style={styles.transactionInfo}>First Name: {item.FirstName}</Text>
            <Text style={styles.transactionInfo}>Last Name: {item.LastName}</Text>
            <Text style={styles.transactionInfo}>Phone Number: {item.phone}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputContainer:{
    marginTop:20,
    marginBottom:20,
  },
  heading: {
    fontSize: 20,
    textAlign:'center',
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
  text:{
    textAlign:'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default AllTrnxHist;
