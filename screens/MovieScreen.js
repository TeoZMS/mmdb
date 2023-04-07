import { useEffect, useState } from "react"
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from "react-native"
import * as omdb from "../utils/apiOMDb"
import { Colors } from "../constants/colors"
import IconButton from "../components/UI/IconButton"
import { getFavoriteById, insertToFavorites, removeFavoriteById } from "../utils/database"

function MovieScreen({ route, navigation }) {
    const [movie, setMovie] = useState()
    const [isFavorite, setIsFavorite] = useState(false)
    const { id } = route.params

    const genres = []
    if (movie) {
        for (let g of movie.Genre.split(", ")) {
            genres.push(g)
        }
    }

    useEffect(() => {
        async function getMovie(id) {
            const dbResult = await getFavoriteById(id)
            if (dbResult) {
                setMovie(dbResult)
                setIsFavorite(true)
            } else {
                const omdbResult = await omdb.getDetails(id)
                setMovie(omdbResult)
            }
        }

        getMovie(id)
    }, [id, setMovie, setIsFavorite])

    useEffect(() => {
        if (movie) {
            navigation.setOptions({
                title: movie.Title
            })
        }
    }, [movie])

    useEffect(() => {
        if (movie) {
            navigation.setOptions({
                headerRight: () => (
                    <IconButton
                        icon="heart"
                        onPress={async () => {
                            if (isFavorite) {
                                await removeFavoriteById(movie.imdbID)
                                setIsFavorite(false)
                            } else {
                                await insertToFavorites(movie)
                                setIsFavorite(true)
                            }
                        }}
                        color={isFavorite && "red"}
                    />
                )
            })
        }
    }, [movie, isFavorite, setIsFavorite])

    if (!movie) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={Colors.primary500} />
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
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        opacity: 0.2
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
