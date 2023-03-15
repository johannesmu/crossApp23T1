import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState } from 'react'
import { useNavigation } from "@react-navigation/native";

export function SignInScreen ( props ) {
    const [ email, setEmail ] = useState("")
    const [ validEmail, setValidEmail ] = useState(false)
    const [ password, setPassword ] = useState("")
    const [ validPassword, setValidPassword ] = useState(false)
    const [ validForm, setValidForm ] = useState( false )
    const navigation = useNavigation()

    return(
        <View style={ styles.page }>
            <Text style={ styles.title }>Sign in to your account</Text>
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
            <TouchableOpacity 
                style={ (validForm) ? styles.button : styles.buttonDisabled }  
                disabled={ (validForm) ? false : true}
            >
                <Text style={ styles.buttonText }>Sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.signInLink}
                onPress={ () => navigation.navigate("Signup") }
            >
                <Text style={styles.signInLinkText}>Don't have an account? Sign in</Text>
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
        borderWidth: 1,
        borderColor: "#cccccc",
    },
    validInput: {
        borderColor: "green",
        borderWidth: 1,
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
    },
    buttonDisabled: {
        backgroundColor: "#666666",
        padding: 10,
        marginVertical: 10,
    },
    signInLink: {
        marginVertical: 5,
    },
    signInLinkText: {
        textAlign: "center",
    }
})