import { Pressable, StyleSheet, Text, View } from "react-native"
import { Colors } from "../../constants/colors"

function MyButton({ onPress, children }) {
    return (
        <Pressable style={({ pressed }) => [styles.pressable, pressed && styles.pressed]} onPress={onPress}>
            <View style={styles.container}>
                <Text style={styles.text}>{children}</Text>
            </View>
        </Pressable>
    )
}

export default MyButton

const styles = StyleSheet.create({
    pressable: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 10
    },
    pressed: {
        opacity: 0.7
    },
    container: {
        padding: 10,
        borderWidth: 2,
        borderColor: Colors.primary500
    },
    text: {
        color: Colors.primary500,
        fontSize: 18
    }
})
