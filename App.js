import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
// contexts
import { AuthContext } from './contexts/AuthContext'
import { NoteContext } from './contexts/NoteContext';
import { FBAuthContext } from './contexts/FBAuthContext';
// screens
import { HomeScreen } from './screens/HomeScreen';
import { SignUpScreen } from './screens/SignUp';
import { SignInScreen } from './screens/SignIn';
import { DetailScreen } from './screens/DetailScreen';
import { TabScreen } from './screens/TabScreen';
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

const FBapp = initializeApp(firebaseConfig)
const FBauth = getAuth(FBapp)
const FBdb = getFirestore(FBapp)

export default function App() {
  const [auth, setAuth] = useState()
  const [errorMsg, setErrorMsg] = useState()
  const [noteData, setNoteData] = useState([])

  onAuthStateChanged(FBauth, (user) => {
    if (user) {
      setAuth(user)
    }
    else {
      setAuth(null)
    }
  })

  useEffect(() => {
    if (noteData.length === 0 && auth) {
      GetData()
    }
  })

  const SignUp = (email, password) => {
    createUserWithEmailAndPassword(FBauth, email, password)
      .then((userCredential) => console.log(userCredential))
      .catch((error) => console.log(error))
  }

  const SignIn = (email, password) => {
    signInWithEmailAndPassword(FBauth, email, password)
      .then((userCredential) => console.log(userCredential))
      .catch((error) => console.log(error))
  }

  const SignOut = () => {
    signOut(FBauth)
      .then(() => {
        //now the user is signed out
      })
      .catch((err) => console.log(error))
  }

  const AddData = async (note) => {
    const userId = auth.uid
    const path = `users/${userId}/notes`
    const ref = await addDoc(collection(FBdb, path), note)
  }

  const GetData = () => {
    const userId = auth.uid
    const path = `users/${userId}/notes`
    const dataQuery = query(collection(FBdb, path))
    const unsubscribe = onSnapshot(dataQuery, (responseData) => {
      let notes = []
      responseData.forEach((note) => {
        let item = note.data()
        item.id = note.id
        notes.push(item)
      })
      setNoteData(notes)
    })
  }


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Signup">
          {(props) =>
            <AuthContext.Provider value={auth}>
              <SignUpScreen {...props} handler={SignUp} />
            </AuthContext.Provider>
          }
        </Stack.Screen>
        <Stack.Screen name="Signin">
          {(props) =>
            <AuthContext.Provider value={auth}>
              <SignInScreen {...props} handler={SignIn} />
            </AuthContext.Provider>
          }
        </Stack.Screen>
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {(props) =>
            <FBAuthContext.Provider value={ FBauth } >
              <AuthContext.Provider value={auth}>
                <NoteContext.Provider value={noteData}>
                  <TabScreen {...props} />
                </NoteContext.Provider>
              </AuthContext.Provider>
            </FBAuthContext.Provider>
          }
        </Stack.Screen>
        <Stack.Screen name="Detail">
          {(props) =>
            <AuthContext.Provider value={auth}>
              <DetailScreen {...props} />
            </AuthContext.Provider>
          }
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
