import { StyleSheet, TextInput, View } from "react-native"
import { Colors } from "../../constants/colors"

function SearchBar({ onBlur, onChangeText, value, inputRef }) {
    return (
        <View style={styles.container}>
            <TextInput style={styles.textInput} onBlur={onBlur} onChangeText={onChangeText} value={value} ref={inputRef} />
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    container: {
        margin: 6,
        padding: 8,
        backgroundColor: Colors.gray900,
        borderRadius: 4
    },
    textInput: {
        fontSize: 18
    }
})
