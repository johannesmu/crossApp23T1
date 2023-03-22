import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useState, useEffect } from 'react'

export function HomeScreen(props) {
  const navigation = useNavigation()

  useEffect(() => {
    if (!props.authStatus) {
        navigation.reset( { index: 0, routes: [ {name: "Signin"} ] } )
    }
  }, [props.authStatus])

  return (
    <View>
      <Text>Home Screen</Text>
      <TouchableOpacity style={styles.button} onPress={() => props.signOutHandler()}>
        <Text style={styles.buttonText} >Sign out</Text>
      </TouchableOpacity>
      <Text>Add some data</Text>
      <TouchableOpacity style={styles.button} onPress={() => props.add()} >
        <Text style={styles.buttonText} >Click to add data</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#000000",
    padding: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 12,
    textAlign: "center",
  }
})