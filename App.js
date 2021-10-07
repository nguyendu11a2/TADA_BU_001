import * as React from 'react';
import { useEffect ,useState} from 'react';
import { Button, View, Text ,StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './Components/Register';
import Login from './Components/Login.js'
import Home from './Components/Merchant/Home'
import Profile from './Components/KhachHang/Profile'
import Uudai from './Components/KhachHang/Uudai/Uudai';
import Luachonuudai from './Components/KhachHang/Uudai/Luachonuudai';
import ThanhToan from './Components/KhachHang/ThanhToan/ThanhToan';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import firebase from "firebase/app";
import  firebaseDCLV  from './Components/firebase';
import {onAuthStateChanged,getAuth } from 'firebase/auth';

const App: () => Node = ( ) => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const [isLogIn,setLogIn] = useState(false);

  useEffect(()=>{
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogIn(true);
      } else {
        setLogIn(false);
      }
  },[])
  });
  

  if(isLogIn == true){
      return(
          <NavigationContainer>
              <Tab.Navigator  
                      screenOptions={({ route }) => ({
                   headerShown: false
                })}>
                 <Tab.Screen name="ThanhToan" component={ThanhToan} />
<Tab.Screen name="Luachonuudai" component={Luachonuudai} />
               
                <Tab.Screen name="Profile" component={Profile} />
              </Tab.Navigator>
          </NavigationContainer> 
      )
  }else{
    return (
      <NavigationContainer>
        <Stack.Navigator  screenOptions={{headerShown: false}}>
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="register" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
};

export default App;