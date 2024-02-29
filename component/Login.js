import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const passwordInputRef = useRef(null);

  const navigation = useNavigation();

  const handleUsername = (text) => {
    setUsername(text);
  };

  const handlePassword = (text) => {
    setPassword(text);
  };

  const handleSubmit = async () => {
    try {
      const formData = {
        "username":username,
        "password":password,
        
      };
      const response = await axios.post('https://vast-rose-jackrabbit-kit.cyclic.app/api/auth/admin_login', formData);
      console.log(response?.data)
      console.log("user:"+ response?.data?.details?.username)
      navigation.navigate('Home');
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        const errorMessage = error.response.data.message;
        console.log(errorMessage);
        setErrorMessage(errorMessage); // Store error message in state
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        setErrorMessage('Network error. Please try again.'); // Store generic error message in state
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        setErrorMessage('An error occurred. Please try again later.'); // Store generic error message in state
      }
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.login}>Login</Text>
      {errorMessage ? <Text style={{ color: 'red' }}>{errorMessage}</Text> : null}

      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={handleUsername}
        />

        <TextInput
          ref={passwordInputRef}
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={handlePassword}
          secureTextEntry={true}
        />
        <Text style={styles.text}>Forgot Password?</Text>
        <View style={styles.button}>
          <Button title="Submit" onPress={handleSubmit} color="#4CAF50" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor:'F1F5F2',
  },
  input: {
    width: 250,
    height: 40,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  text: {
    color: '#ccc',
    fontSize: 13,
  },
  login: {
    color:'#333333',
    marginBottom:20,
    fontSize: 19,
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
  button: {
    width: 250,
    marginTop: 30,
    marginBottom: 30,
  },
});

export default Login;
