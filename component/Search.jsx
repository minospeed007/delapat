import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const Search = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.43.159:5000/api/users/');
      setFilteredData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearchText = (text) => {
    setSearchText(text);
    // Filter the fetched data based on the searchText
    const filtered = filteredData.filter(item =>
      item.FirstName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  }

  const handleCardPress = (item) => {
    setSelectedItem(item);
    setSearchText(item.FirstName);
  }

  const handleIdPress = (id) => {
    setSearchText(id);
  }

  return (
    <View>
      <View style={styles.MenuContainer}>
        <View style={styles.container}>
          <TextInput
            style={{ width: 200 }}
            placeholder="Search..."
            value={searchText}
            onChangeText={handleSearchText}
          />
          <Ionicons name="search-outline" size={24} color="grey" style={styles.icon} />
        </View>
      </View>

      {searchText !== '' && filteredData.map(item => (
        <TouchableOpacity key={item._id} onPress={() => handleCardPress(item)}> 
          <View style={styles.card}>
            <Text>{item.FirstName} {item.LastName}</Text>
            <Text>ID: {item.Id}</Text>
            <Text>Phone: {item.phone}</Text>
            {selectedItem && selectedItem._id === item._id && (
              <TouchableOpacity onPress={() => handleIdPress(item.Id)}>
                <Text>Fill TextInput with ID</Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  MenuContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    width: 300,
    height: 50,
    backgroundColor: '#F2EDE6',
    marginBottom: 20,
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
  icon: {
    marginRight: 10,
  },
});

export default Search;
