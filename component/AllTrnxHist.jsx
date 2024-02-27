import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import moment from 'moment';
import axios from 'axios';

const AllTrnxHist = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.43.159:5000/api/transactions/');
      const sortedData = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setTransactions(sortedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredTransactions = transactions.filter((item) =>
    (item.FirstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.LastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||

      item.type.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatDate = (date) => {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Transaction History</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
        placeholder="Search..."
      />
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Text style={styles.transactionInfo}>First Name: {item.FirstName}</Text>
            <Text style={styles.transactionInfo}>Last Name: {item.LastName}</Text>
            <Text style={styles.transactionInfo}>Phone Number: {item.phone}</Text>
            <Text style={styles.transactionInfo}>Amount: {item.amount}</Text>
            <Text style={styles.transactionInfo}>Transaction Type: {item.type}</Text>
            <Text style={styles.transactionInfo}>
              Date and Time: {formatDate(item.date)}</Text>
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
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
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
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default AllTrnxHist;
