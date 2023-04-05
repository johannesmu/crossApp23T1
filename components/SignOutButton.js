import { Text, Pressable, StyleSheet } from "react-native"
export function SignOutButton( props ) {
  return (
    <Pressable onPress={ () => props.handler() } style={styles.button}>
      <Text>{props.text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
  }
})