import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { FBDbContext } from '../contexts/FBDbContext'
// firebase
import { doc, deleteDoc } from 'firebase/firestore'

export function DetailScreen ( props ) {
  const authStatus = useContext( AuthContext )
  const FBdb = useContext( FBDbContext) 
  const route = useRoute()
  const { id, title, content, date } = route.params

  return (
    <View>
      <Text>{id}</Text>
      <Text>{title}</Text>
      <Text>{content}</Text>
      <Text>{date}</Text>
      <TouchableOpacity>
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  )
}