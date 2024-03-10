// Login.js
import React, { useState, useRef } from 'react';
import { StyleSheet,TouchableOpacity , View, Text, Button, TextInput, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import axios from 'axios';
import { useAuth } from './AuthContext'; // Import the useAuth hook

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const passwordInputRef = useRef(null);
  const { login } = useAuth(); // Use the useAuth hook to access context functions
  const navigation = useNavigation();

  const handleUsername = (text) => {
    setUsername(text);
  };

  const handlePassword = (text) => {
    setPassword(text);
  };

  const handleSubmit = async () => {
    setIsLoading(true); 
    try {
      const formData = {
        "username": username,
        "password": password,
      };
      const response = await axios.post('https://delaserver.onrender.com/api/auth/admin_login', formData);
      
      // Store cookies in AsyncStorage
      const cookies = response.headers['set-cookie'];
      
      if (cookies) {
        await AsyncStorage.setItem('access_token', JSON.stringify(cookies));
      }
      
      // Set the logged in username in the context
      login(response?.data?.details?.username);

      setUsername('');
      setPassword('');
      setIsLoading(false); // Set isLoading to false after successful login
      navigation.navigate('Home');
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        const errorMessage = error.response.data.message;
        console.log(errorMessage);
        setErrorMessage(errorMessage); 
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
     
      {isLoading ? (< ActivityIndicator/>):(
      <TouchableOpacity   onPress={handleSubmit}>
      <Text style={styles.buttonText}>Submit</Text>
    </TouchableOpacity>
    
      )
       }
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
    backgroundColor: 'F1F5F2',
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
    color: '#333333',
    marginBottom: 20,
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
  buttonText: {
    color: 'white',
    textAlign:'center',
    fontWeight: 'bold',
    fontSize:19,
  },
  button: {
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#1E90FF',
    padding: 10,
    marginTop:20,

    borderRadius: 5,
    width: 200,
  },
});

export default Login;
