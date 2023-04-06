import { useEffect, useLayoutEffect, useState } from "react"
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from "react-native"
import * as omdb from "../utils/apiOMDb"
import { Colors } from "../constants/colors"
import IconButton from "../components/UI/IconButton"
import { insertToFavorites } from "../utils/database"

const posterAR = 1.48
const screenWidth = Dimensions.get("screen").width

function MovieScreen({ route, navigation }) {
    const [movie, setMovie] = useState()
    const { id } = route.params

    const genres = []
    if (movie) {
        for (let g of movie.Genre.split(", ")) {
            genres.push(g)
        }
    }

    useEffect(() => {
        async function getMovie(id) {
            const result = await omdb.getDetails(id)
            setMovie(result)
        }

        getMovie(id)
    }, [id, setMovie])

    useEffect(() => {
        if (movie) {
            navigation.setOptions({
                title: movie.Title,
                headerRight: () => (
                    <IconButton
                        icon="heart"
                        onPress={() => {
                            insertToFavorites(movie)
                        }}
                    />
                )
            })
        }
    }, [movie])

    if (!movie) {
        return (
            <View>
                <Text>Loading</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: movie.Poster }} />
            <ScrollView>
                <Text style={styles.title}>{movie.Title} </Text>
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsText}>{movie.Year}</Text>
                    <Text style={styles.detailsText}>|</Text>
                    <Text style={styles.detailsText}>{movie.Rated}</Text>
                    <Text style={styles.detailsText}>|</Text>
                    <Text style={styles.detailsText}>{movie.Runtime}</Text>
                </View>
                <View style={styles.genreContainer}>
                    {genres.map(item => (
                        <Text style={styles.genreText} key={item}>
                            {item}
                        </Text>
                    ))}
                </View>
                <Text style={styles.plot}>{movie.Plot}</Text>
                <Text style={styles.namesOuter}>
                    Director: <Text style={styles.namesInner}>{movie.Director}</Text>
                </Text>
                <Text style={styles.namesOuter}>
                    Writers: <Text style={styles.namesInner}>{movie.Writer}</Text>
                </Text>
                <Text style={styles.namesOuter}>
                    Stars: <Text style={styles.namesInner}>{movie.Actors}</Text>
                </Text>
            </ScrollView>
        </View>
    )
}

export default MovieScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        opacity: 0.1
    },
    title: {
        fontSize: 24,
        marginHorizontal: 20,
        paddingVertical: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: Colors.gray900,
        borderBottomColor: Colors.primary500,
        borderBottomWidth: 1
    },
    detailsContainer: {
        marginHorizontal: 20,
        marginVertical: 15,
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    detailsText: {
        fontSize: 16,
        color: Colors.gray900
    },
    genreContainer: {
        flexWrap: "wrap",
        marginHorizontal: 20,
        marginVertical: 15,
        flexDirection: "row",
        justifyContent: "center"
    },
    genreText: {
        fontSize: 16,
        color: Colors.accent500,
        textAlign: "center",
        borderColor: Colors.accent500,
        borderWidth: 1,
        padding: 8,
        marginVertical: 4,
        marginHorizontal: 12
    },
    plot: {
        fontSize: 18,
        color: Colors.gray900,
        marginHorizontal: 20,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: Colors.primary500
    },
    namesOuter: {
        marginHorizontal: 20,
        marginVertical: 10,
        fontSize: 18,
        color: Colors.gray900
    },
    namesInner: {
        fontSize: 18,
        color: Colors.accent500
    }
})
