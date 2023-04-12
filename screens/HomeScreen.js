import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet, FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from "../contexts/AuthContext"
import { NoteContext } from "../contexts/NoteContext"
import { DBContext } from "../contexts/DBcontext"
import { addDoc, collection } from "firebase/firestore"

export function HomeScreen(props) {
  const navigation = useNavigation()
  const authStatus = useContext(AuthContext)
  const Notes = useContext(NoteContext)
  const DB = useContext( DBContext )

  const [showModal, setShowModal] = useState(false)
  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')

  const saveNote = async () => {
    setShowModal(false)
    const noteObj = { title: title, content: note, date: new Date().getTime() }
    // add note to firebase
    const path = `users/${authStatus.uid}/notes`
    const ref = await addDoc( collection(DB, path), noteObj )
    setTitle('')
    setNote('')
  }

  useEffect(() => {
    if (!authStatus) {
      navigation.reset({ index: 0, routes: [{ name: "Signin" }] })
    }
  }, [authStatus])

  const ListClickHandler = (data) => {
    console.log(data)
    navigation.navigate("Detail", data)
  }

  const ListItem = (props) => {
    return (
      <View style={styles.listItem}>
        <TouchableOpacity onPress={
            () => ListClickHandler(
              { 
                id: props.id, 
                title: props.title, 
                content: props.content, 
                date: props.date
              }
            )
          }
        >
          <Text>
            {props.title}
          </Text>
        </TouchableOpacity>
      </View>
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
          <Text style={styles.modalLabel}>Title</Text>
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
              style={styles.button}
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
        data={Notes}
        renderItem={({ item }) => (
        <ListItem 
          title={item.title} 
          id={item.id} 
          content={item.content} 
          date={item.date}
        />
        )}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={ListItemSeparator}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
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
  button: {
    backgroundColor: "#000000",
    padding: 5,
    flex: 1,
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

