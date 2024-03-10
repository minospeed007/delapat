import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { View, Image, StyleSheet, TouchableOpacity,Text } from 'react-native';
import Menu from './component/Menu';
import Search from './component/Search';
import ViewMenu from './component/ViewMenu';
import Login from './component/Login';
import RegisterAdmin from './component/RegisterAdmin';

import HomeScreen from './component/HomeScreen';
import WithdrawalScreen from './component/Withdrawal';
import DepositScreen from './component/Deposit';
import Customers from './component/Customer';
import UpdateCustomer from './component/UpdateCustomer';

import AddCustomer from './component/AddCustomer';
import AllTrnxHist from './component/AllTrnxHist';
import CustomerBalance from './component/CustomerBalance'
import Logo from './assets/spring_logo.png';
import { AuthProvider } from './component/AuthContext';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <AuthProvider>
    <View style={styles.appContainer}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={({ navigation }) => ({
              header: ({ navigation }) => (
                <View style={styles.header}>
                  <View style={styles.logoContainer}>
                    <Image source={Logo} style={styles.logo} />
                  </View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('RegisterAdmin')}
                    style={styles.searchContainer}
                  >
                    <View style={styles.registerContainer} >
                    <Text style={styles.registerText}>Register</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                 
              ),
            })}
            
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <View style={styles.menu}>
                  
                  <Menu/>
                </View>
              )
            })}
          />
          <Stack.Screen name="RegisterAdmin" component={RegisterAdmin} />
          <Stack.Screen name="UpdateCustomer" component={UpdateCustomer} />

          <Stack.Screen name="CustomerBalance" component={CustomerBalance} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Withdrawal" component={WithdrawalScreen} />
          <Stack.Screen name="Customers" component={Customers} />
          <Stack.Screen name="AddCustomer" component={AddCustomer} />
          <Stack.Screen name="AllTrnx" component={AllTrnxHist} />
          <Stack.Screen name="Deposit" component={DepositScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 30,
  },
menu: {
  justifyContent:'center',
aligItems:'flex-end',
},
  logo: {
    width: 30,
    height: 30,
  },
  registerText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  registerContainer: {
    width: 90,
    height: 35,
    borderColor: 'grey',  
    borderWidth: 1,      
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});



export default App;
