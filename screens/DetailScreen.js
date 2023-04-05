import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'


export function DetailScreen ( props ) {
  const authStatus = useContext( AuthContext )
  const route = useRoute()
  const { id, title, content } = route.params

  return (
    <View>
      <Text>{title}</Text>
      <Text>{content}</Text>
    </View>
  )
}