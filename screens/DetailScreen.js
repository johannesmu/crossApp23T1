import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { DBContext } from '../contexts/DBcontext'
import { doc, collection, deleteDoc, updateDoc } from 'firebase/firestore'
import IonIcons from '@expo/vector-icons/Ionicons'

export function DetailScreen ( props ) {
  const navigation = useNavigation()
  const authStatus = useContext( AuthContext )
  const DB = useContext( DBContext )
  const route = useRoute()
  const { id, title, content, date } = route.params

  const [ noteTitle, setNoteTitle ] = useState(title)
  const [ noteContent, setNoteContent ] = useState(content)

  const deleteNote =async () => {
    const path = `users/${authStatus.uid}/notes`
    const ref = doc( DB, path, id )
    //await deleteDoc(doc( DB, path, id ) )
    //navigation.goBack()
  }

  const updateNote = () => {}

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
        <TouchableOpacity style={styles.delete} onPress={ () => deleteNote() }>
          <IonIcons name="trash-outline" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.save}>
          <IonIcons name="save-outline" size={28} color="black" />
        </TouchableOpacity>
      </View>

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
  }
})