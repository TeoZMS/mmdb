import { Text, View } from "react-native"

function MovieScreen({ route }) {
    const { id } = route.params

    return (
        <View>
            <Text>Im a Movie </Text>
        </View>
    )
}

export default MovieScreen
