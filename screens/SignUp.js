import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState } from 'react'

export function SignUpScreen ( props ) {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    return(
        <View style={ styles.page }>
            <Text style={ styles.title }>Sign up for an account</Text>
            <View style={ styles.inputGroup }>
                <Text>Email address</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="you@domain.com"
                    value={ email }
                    onChangeText={ (emailText) => setEmail(emailText) }
                />
            </View>
            <View style={ styles.inputGroup }>
                <Text>Password</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="minimum 8 characters"
                    value={ password }
                    onChangeText={ (pwText) => setPassword(pwText) }
                    secureTextEntry={true}
                />
            </View>
            <TouchableOpacity style={ styles.button }>
                <Text style={ styles.buttonText }>Sign up</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        marginHorizontal: 60,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
    },
    input: {
        backgroundColor: "#ffffff",
        padding: 5,
    },
    inputGroup: {
        marginVertical: 5,
    },
    button: {
        backgroundColor: "#000000",
        padding: 10,
        marginVertical: 10,
    },
    buttonText: {
        color: "#ffffff",
        textAlign: "center"
    }
})