import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const RegisterAdmin = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleId = (text) => {
    setId(text);
  };
  const handleFirstName = (text) => {
    setFirstName(text);
  };
  const handleLastName = (text) => {
    setLastName(text);
  };
  const handleUsername = (text) => {
    setUsername(text);
  };

  const handlePassword = (text) => {
    setPassword(text);
  };

  const handleSubmit = async () => {
    try {
      const formData = {
        "Id": id,
        "FirstName": firstName,
        "LastName": lastName,
        "username": username,
        "password": password,
      };
      const response = await axios.post('https://delaserver.onrender.com/api/auth/admin', formData);
      console.log(response?.data)
      navigation.navigate('Login');
    } catch (error) {
      console.error('Sign up failed:', error);
    }
  };

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  return (
    <View>
      <View style={styles.formContainer}>
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      placeholder="Id"
      value={id}
      keyboardType="phone-pad"
      onChangeText={handleId}
    />    
  </View>
  
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      placeholder="First name"
      value={firstName}
      onChan
      
      
      geText={handleFirstName}
    />
    <TextInput
      style={styles.input}
      placeholder="Last name"
      value={lastName}
      onChangeText={handleLastName}
    />
  </View>
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      placeholder="Username"
      value={username}
      onChangeText={handleUsername}
    />    
  
    <TextInput
      style={styles.input}
      placeholder="Password"
      value={password}
      onChangeText={handlePassword}
      secureTextEntry={true}
    />    
  </View>
  <View style={styles.textContainer}>
  <TouchableOpacity onPress={handleLoginPress}>
  <Text style={styles.text}>Have an account? Login</Text>
                </TouchableOpacity>
                </View>
  <Button title="Submit" onPress={handleSubmit} />
</View>

    </View>
  );
};

const styles = StyleSheet.create({
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
    },
    textContainer:{
      marginBottom: 40,
    },
    inputContainer: {
      flexDirection: 'row',
      marginBottom: 30,
      gap:13,
    },
    text: {
        textAlign:"center",
        color: 'gray',
        fontSize: 13,
      },
    formContainer: {
      padding: 20,
      marginTop: 20,
    },
  });
  

export default RegisterAdmin;
