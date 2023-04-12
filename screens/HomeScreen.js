import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet, FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from "../contexts/AuthContext"
import { NoteContext } from "../contexts/NoteContext"
import { DBContext } from "../contexts/DBcontext"
import { addDoc, collection } from "firebase/firestore"
import { ListItem } from "../components/ListItem"
import { ListItemSeparator} from "../components/ListItemSeparator"
import IonIcons from '@expo/vector-icons/Ionicons'

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
    navigation.navigate("Detail", data)
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
              style={styles.closeButton}
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
        <IonIcons name="add-outline" size={28} color="white" />
      </TouchableOpacity>
      <FlatList
        data={Notes}
        renderItem={({ item }) => (
        <ListItem 
          title={item.title} 
          id={item.id} 
          content={item.content} 
          date={item.date}
          handler={ ListClickHandler }
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
    position: "relative"
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
    padding: 10,
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 999,
  },
  addButton: {
    padding: 10,
    backgroundColor: "green",
    flex: 1,
  },
  closeButton: {
    backgroundColor: "#000000",
    padding: 10,
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
  
})

