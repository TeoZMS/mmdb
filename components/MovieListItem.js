import { Image, StyleSheet, Text, View } from "react-native"
import { Colors } from "../constants/colors"

function MovieListItem({ movie }) {
    return (
        <View style={styles.container}>
            <Image
                alt="Poster"
                style={styles.image}
                source={{
                    uri: movie.Poster
                }}
            />
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{movie.Title}</Text>
                <Text style={styles.year}>{movie.Year}</Text>
                <Text style={styles.type}>Type: Movie</Text>
            </View>
        </View>
    )
}

export default MovieListItem

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginHorizontal: 4,
        marginVertical: 2,
        backgroundColor: "black",
        borderRadius: 8,
        overflow: "hidden"
    },
    image: {
        width: 150,
        height: 222
    },
    detailsContainer: {
        margin: 12,
        alignItems: "flex-start",
        justifyContent: "center",
        flex: 1,
        flexGrow: 1
    },
    title: {
        fontSize: 17,
        margin: 2,
        fontWeight: "bold",
        color: Colors.gray900,
        borderBottomColor: Colors.gray900,
        borderBottomWidth: 1
    },
    year: {
        fontSize: 14,
        color: Colors.gray900
    },
    type: {
        flex: 1,
        fontSize: 14,
        color: Colors.accent500,
        textAlignVertical: "bottom",
        marginBottom: 15
    }
})
