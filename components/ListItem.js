import { View, Text, Pressable, StyleSheet } from 'react-native'
export function ListItem( props ) {
    const data = {
        id: props.id,
        title: props.title,
        content: props.content,
        date: props.date
    }
    return (
        <Pressable onPress={ () => props.handler( data ) }>
            <View style={ styles.item }>
                <Text style={ styles.itemText }>{ props.title }</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    item: {
        padding: 10,
    },
    itemText: {
        fontSize: 18,
    }
})