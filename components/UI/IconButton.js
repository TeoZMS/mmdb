import { Pressable, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Colors } from "../../constants/colors"

function IconButton({ icon, onPress, color }) {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Ionicons name={icon} size={24} color={color ? color : Colors.gray900} />
        </Pressable>
    )
}

export default IconButton

const styles = StyleSheet.create({
    container: {
        padding: 6,
        margin: 6,
        justifyContent: "center",
        alignItems: "center"
    }
})
