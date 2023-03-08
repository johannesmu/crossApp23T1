import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
// screens
import { HomeScreen } from './screens/HomeScreen';
import { SignUpScreen } from './screens/SignUp';
import { SignInScreen } from './screens/SignIn';
// firebase
import { firebaseConfig } from './config/Config';
import { initializeApp } from 'firebase/app'
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth"

const Stack = createNativeStackNavigator();

const FBapp = initializeApp( firebaseConfig )
const FBauth = getAuth( FBapp )

export default function App() {
  const [auth,setAuth] = useState()

  onAuthStateChanged( FBauth, (user) => {
    if( user ) {
      setAuth( user )
    }
    else {
      setAuth( null )
    }
  })

  const SignUp = ( email, password ) => {
    createUserWithEmailAndPassword( FBauth, email, password )
    .then( (userCredential) => console.log(userCredential) )
    .catch( (error) => console.log(error) )
  }

  return (
    <NavigationContainer>
     <Stack.Navigator>
        <Stack.Screen name="Signup">
          { (props) => <SignUpScreen {...props} handler={SignUp} authStatus={auth} /> }
        </Stack.Screen>
        <Stack.Screen name="Signin" component={SignInScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
