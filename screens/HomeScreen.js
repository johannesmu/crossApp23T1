import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet, FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useState, useEffect, useContext } from 'react'

import { AuthContext } from "../contexts/AuthContext"


export function HomeScreen(props) {
  const navigation = useNavigation()
  const authStatus = useContext(AuthContext)

  const [showModal, setShowModal] = useState(false)
  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')

  const saveNote = () => {
    setShowModal(false)
    const noteObj = { title: title, content: note, date: new Date().getTime() }
    props.add(noteObj)
  }

  useEffect(() => {
    if (!authStatus) {
      navigation.reset({ index: 0, routes: [{ name: "Signin" }] })
    }
  }, [authStatus])

  const ListClickHandler = (data) => {
    navigation.navigate("Detail", data)
  }

  const ListItem = (props) => {
    return (
      <TouchableOpacity onPress={
        () => ListClickHandler({ id: props.id, title: props.title, content: props.content })
      }
      >
        <View style={styles.listItem}>
          <Text>
            {props.title}
          </Text>
          <Text>{props.date}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  const ListItemSeparator = (props) => {
    return (
      <View style={styles.separator} ></View>
    )
  }

  return (
    <View style={styles.screen}>
      {/* modal element */}
      <Modal
        transparent={false}
        animationType="slide"
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modal}>
          <Text style={styles.modalLabel}>Add a note</Text>
          <TextInput
            style={styles.modalInput}
            value={title}
            onChangeText={(val) => setTitle(val)}
          />
          <Text style={styles.modalLabel} >Note</Text>
          <TextInput
            multiline={true}
            style={styles.modalInput2}
            value={note}
            onChangeText={(val) => setNote(val)}
          />
          <View style={styles.buttonsRow}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.buttonText} >Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => saveNote()}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>

        </View>
      </Modal>
      {/* button to open modal */}
      <TouchableOpacity style={styles.button} onPress={() => setShowModal(true)} >
        <Text style={styles.buttonText}>Add Note</Text>
      </TouchableOpacity>
      <FlatList
        data={props.data}
        renderItem={({ item }) => (<ListItem title={item.title} id={item.id} content={item.content} />)}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={ListItemSeparator}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    position: "relative",
    flex: 1,
  },
  modal: {
    padding: 10,
    paddingTop: 50,
    flex: 1,
    justifyContent: "start",
    margin: 20,
    backgroundColor: "lightblue",
  },
  modalInput: {
    fontSize: 18,
    backgroundColor: "#ffffff",
  },
  modalInput2: {
    minHeight: 80,
    fontSize: 18,
    backgroundColor: "#ffffff",
  },
  modalLabel: {
    fontSize: 20,
    marginBottom: 10,
  },
  modalCloseButton: {
    backgroundColor: "#000000",
    padding: 5,
    flex: 1,
  },
  button: {
    backgroundColor: "#000000",
    padding: 5,
    flex: 1,
    position: "absolute",
    bottom: 10,
    right: 10,
    zIndex: 999,
  },
  addButton: {
    padding: 5,
    backgroundColor: "green",
    flex: 1,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 12,
    textAlign: "center",
  },
  buttonsRow: {
    flexDirection: "row",
    marginVertical: 10,
  },
  listItem: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  separator: {
    backgroundColor: '#CCCCCC',
    height: 2,
  }
})

