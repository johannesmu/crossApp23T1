import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
// screens
import { HomeScreen } from './screens/HomeScreen';
import { SignUpScreen } from './screens/SignUp';
import { SignInScreen } from './screens/SignIn';
// firebase modules
import { firebaseConfig } from './config/Config';
import { initializeApp } from 'firebase/app'
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword
} from "firebase/auth"

import { 
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
  query,
  where,
  onSnapshot
} from 'firebase/firestore'

const Stack = createNativeStackNavigator();

const FBapp = initializeApp( firebaseConfig )
const FBauth = getAuth( FBapp )
const FBdb = getFirestore( FBapp )

export default function App() {
  const [auth,setAuth] = useState()
  const [ errorMsg, setErrorMsg ] = useState()
  const [ noteData, setNoteData ] = useState([])

  onAuthStateChanged( FBauth, (user) => {
    if( user ) {
      setAuth( user )
      console.log( user.uid )
    }
    else {
      setAuth( null )
    }
  })

  useEffect(() => {
    if( noteData.length === 0 && auth ) {
      GetData()
    }
  })

  const SignUp = ( email, password ) => {
    createUserWithEmailAndPassword( FBauth, email, password )
    .then( (userCredential) => console.log(userCredential) )
    .catch( (error) => console.log(error) )
  }

  const SignIn = ( email, password ) => {
    signInWithEmailAndPassword( FBauth, email, password )
    .then( (userCredential) => console.log(userCredential) )
    .catch( (error) => console.log(error) )
  }

  const SignOut = () => {
    signOut(FBauth)
    .then( () => {
      //now the user is signed out
    })
    .catch((err) => console.log(error) )
  }

  const AddData = async ( note ) => {
    const userId = auth.uid
    const path = `users/${userId}/notes`
    // const data = { id: new Date().getTime(), description: "sample data"}
    const ref = await addDoc( collection( FBdb, path), note )
  }

  const GetData = () => {
    const userId = auth.uid
    const path = `users/${userId}/notes`
    const dataQuery = query( collection( FBdb, path ) )
    const unsubscribe = onSnapshot( dataQuery, ( responseData ) => {
      let notes = []
      responseData.forEach( (note) => {
        notes.push( note.data() )
      })
      console.log( notes )
    })
  }

  return (
    <NavigationContainer>
     <Stack.Navigator>
        <Stack.Screen name="Signup">
          { (props) => <SignUpScreen {...props} handler={SignUp} authStatus={auth} /> }
        </Stack.Screen>
        <Stack.Screen name="Signin">
          { (props) => <SignInScreen {...props} handler={SignIn} authStatus={auth} /> }
        </Stack.Screen>
        <Stack.Screen name="Home">
          { (props) => <HomeScreen {...props} authStatus={auth} signOutHandler={SignOut} add={AddData} /> }
        </Stack.Screen>
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
