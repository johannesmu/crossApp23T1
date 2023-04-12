import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'


export function DetailScreen ( props ) {
  const authStatus = useContext( AuthContext )
  const route = useRoute()
  const { id, title, content, date } = route.params

  return (
    <View>
      <Text>{title}</Text>
      <Text>{id}</Text>
      <Text>{content}</Text>
      <Text>{date}</Text>
    </View>
  )
}