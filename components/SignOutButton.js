import { Text, Pressable } from "react-native"
export function SignOutButton( props ) {
  return (
    <Pressable onPress={ () => props.handler() }>
      <Text>{props.text}</Text>
    </Pressable>
  )
}