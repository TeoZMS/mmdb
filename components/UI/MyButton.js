import { Pressable, StyleSheet, Text, View } from "react-native"
import { Colors } from "../../constants/colors"

function MyButton({ onPress, children }) {
    return (
        <View style={styles.container}>
            <Pressable style={({ pressed }) => [styles.pressable, pressed && styles.pressed]} onPress={onPress}>
                <Text style={styles.text}>{children}</Text>
            </Pressable>
        </View>
    )
}

export default MyButton

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 10
    },
    pressed: {
        opacity: 0.7
    },
    pressable: {
        padding: 10,
        borderWidth: 2,
        borderColor: Colors.primary500
    },
    text: {
        color: Colors.primary500,
        fontSize: 18
    }
})
