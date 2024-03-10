import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput,ActivityIndicator } from 'react-native';
import moment from 'moment';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AllTrnxHist = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading]=useState(true)
  const textInputRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Retrieve token from AsyncStorage
      const storedToken = await AsyncStorage.getItem('access_token');
      console.log('Stored token:', storedToken);

      if (!storedToken) {
        // Handle case when token is not found in AsyncStorage
        console.error('Token not found in AsyncStorage');
        return;
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${storedToken}`
        }
      };

      // Fetch transactions from the server
      const response = await axios.get('https://delaserver.onrender.com/api/transactions/', config);
      const sortedData = response?.data?.transactions?.sort((a, b) => new Date(b.date) - new Date(a.date));

     //const transactionsData = response.data.transactions;
      //console.log(response)
      setTransactions(sortedData);
      setIsLoading(false)

    } catch (error) {
      setIsLoading(false)
      
    }
  };

  const filteredTransactions = transactions.filter((item) =>
    (item.FirstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.LastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatDate = (date) => {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
  };

  const handleFocusTextInput = () => {
    textInputRef.current.focus();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Transaction History</Text>
      <TextInput
        ref={textInputRef}
        style={styles.input}
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
        placeholder="Search..."
        onFocus={handleFocusTextInput}
      />
      {transactions.length > 0 && filteredTransactions.length === 0 && (
        <Text style={styles.text}>No transaction found</Text>
      )}
     {isLoading ?(
      <ActivityIndicator/>
     ):(<FlatList
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
    />)} 
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
