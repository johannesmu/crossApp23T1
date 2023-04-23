import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Pressable } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { DBContext } from '../contexts/DBcontext'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'
import IonIcons from '@expo/vector-icons/Ionicons'

export function DetailScreen ( props ) {
  const navigation = useNavigation()
  const authStatus = useContext( AuthContext )
  const DB = useContext( DBContext )
  const route = useRoute()
  const { id, title, content, date } = route.params

  const [ noteTitle, setNoteTitle ] = useState(title)
  const [ noteContent, setNoteContent ] = useState(content)
  const [ showModal, setShowModal ] = useState(false)

  const deleteNote = async () => {
    const path = `users/${authStatus.uid}/notes`
    await deleteDoc(doc( DB, path, id ) )
    navigation.goBack()
  }

  const updateNote = async () => {
    const path = `users/${authStatus.uid}/notes`
    await updateDoc( doc( DB, path, id), { title: noteTitle, content: noteContent } )
    navigation.goBack()
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.label}>Note Title</Text>
      <TextInput 
        style={ styles.input }
        value={noteTitle} 
        onChangeText={ (val) => setNoteTitle(val) } 
      />
      <Text style={styles.label}>Note content</Text>
      <TextInput 
        style={styles.input2}
        value={noteContent} 
        onChangeText={ (val) => setNoteContent(val) } 
        multiline={true}
      />
      <View style={styles.row}>
        <TouchableOpacity style={styles.delete} onPress={ () => setShowModal(true) }>
          <IonIcons name="trash-outline" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.save} onPress={ () => updateNote() }>
          <IonIcons name="save-outline" size={28} color="black" />
        </TouchableOpacity>
      </View>
      {/* Modal */}
      <Modal visible={showModal} style={styles.modal}>
        <View style={styles.row}>
          <Pressable style={styles.deleteNote} onPress={ () => deleteNote() }>
            <Text>Delete Note?</Text>
          </Pressable>
          <Pressable style={styles.cancelDelete} onPress={ () => setShowModal(false) }>
            <Text>Cancel</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  )
}
const styles = StyleSheet.create({
  screen: {
    marginHorizontal: 10,
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    padding: 5,
    borderStyle:"solid",
    borderWidth: 1,
  },
  input2: {
    padding: 5,
    borderStyle:"solid",
    borderWidth: 1,
    minHeight: 80,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  delete: {
    flex: 1,
    padding: 10,
  },
  save: {
    flex: 1,
    padding: 10,
  },
  deleteNote: {
    padding: 10,
    backgroundColor: "#f9db81"
  },
  cancelDelete: {
    padding: 10,
    backgroundColor: "#dbf981"
  },
  modal: {
    padding: 20,
    paddingTop: 100,
  },
})