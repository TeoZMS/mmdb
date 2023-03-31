import { StyleSheet, TextInput, View } from "react-native"
import { Colors } from "../../constants/colors"

function SearchBar({ onBlur, onChangeText, value }) {
    return (
        <View style={styles.container}>
            <TextInput style={styles.textInput} onBlur={onBlur} autoFocus={true} onChangeText={onChangeText} value={value} />
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    container: {
        margin: 6,
        padding: 8,
        backgroundColor: Colors.gray900
    },
    textInput: {
        fontSize: 18
    }
})
