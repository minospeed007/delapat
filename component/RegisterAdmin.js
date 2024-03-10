import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const RegisterAdmin = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isErr, setIsErr]= useState('');
  const [errorMessage,setErrorMessage]=useState('')
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // State for loading indicator
  const navigation = useNavigation();

  const handleEmail = (text) => {
    setEmail(text);
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
    setLoading(true); // Set loading state to true when submitting
    try {
      const formData = {
        "Email": email,
        "FirstName": firstName,
        "LastName": lastName,
        "username": username,
        "password": password,
      };
      const response = await axios.post('https://delaserver.onrender.com/api/auth/admin', formData);
      console.log(response?.data)
      setEmail('');
      setPassword('');
      setUsername('');
      setFirstName('');
      setLastName('');
      navigation.navigate('Login');
    } catch (error) {
      setIsErr(true)
      let errorMessage = 'An error occurred while creating the customer';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      setErrorMessage(errorMessage); 
    } finally {
      setLoading(false);
    }
  };

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
      <View style={styles.formContainer}>
      <Text style={styles.signupText}>Sign up</Text>
      {isErr ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

        <View style={styles.inputContainer}>
         
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            
            onChangeText={handleEmail}
          />    
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="First name"
            value={firstName}
            onChangeText={handleFirstName}
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
        {/* Conditionally render the loading indicator */}
        <View style={styles.button}>
        {loading ? (<ActivityIndicator/>):(
           <TouchableOpacity   onPress={handleSubmit}>
           <Text style={styles.buttonText}>Submit</Text>
         </TouchableOpacity>

          )}      
            </View>
      </View>
    </KeyboardAvoidingView>
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
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap:13,
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
  },
  signupText:{
    fontWeight:'bold',
    fontSize:19,
    marginBottom:25,
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
  errorMessage:{
    color:'red',
    textAlign:'center',
    marginBottom:10,
},
});

export default RegisterAdmin;
