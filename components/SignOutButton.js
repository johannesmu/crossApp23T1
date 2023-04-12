import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useContext } from 'react'
import { FBAuthContext } from '../contexts/FBAuthContext'
import { signOut } from 'firebase/auth'

export function SignOutButton( props ) {
  const FBauth = useContext(FBAuthContext)
  
  const SignOutHandler = () => {
    signOut(FBauth).then( 
      () => {
        // signed out
      }
    )
  }

  return (
      <Pressable onPress={ () => SignOutHandler() } style={styles.button}>
        <View>
          <Text style={ styles.buttonText}>{ props.text }</Text>
        </View>
      </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 5,
    backgroundColor: '#000000'
  },
  buttonText: {
    color: "#FFFFFF",
  }
})