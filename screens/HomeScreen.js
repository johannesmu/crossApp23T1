import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useState, useEffect } from 'react'

export function HomeScreen(props) {
  const navigation = useNavigation()

  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (!props.authStatus) {
      navigation.reset({ index: 0, routes: [{ name: "Signin" }] })
    }
  }, [props.authStatus])

  return (
    <View>
      <Text>Home Screen</Text>
      {/* modal element */}
      <Modal
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <Text>Modal</Text>
        <TextInput />
        <TouchableOpacity
          style={ styles.button}
          onPress={() => setShowModal(false)}
        >
          <Text style={ styles.buttonText } >Close</Text>
        </TouchableOpacity>
      </Modal>
      {/* button to open modal */}
      <TouchableOpacity style={styles.button} onPress={() => setShowModal(true)} >
        <Text style={styles.buttonText}>Add Note</Text>
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