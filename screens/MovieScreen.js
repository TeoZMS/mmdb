import { useEffect, useState } from "react"
import { Image, ScrollView, StyleSheet, Text, View } from "react-native"
import * as omdb from "../utils/apiOMDb"

function MovieScreen({ route, navigation }) {
    const [movie, setMovie] = useState()
    const { id } = route.params

    useEffect(() => {
        async function getMovie(id) {
            const result = await omdb.getDetails(id)
            setMovie(result)
        }

        getMovie(id)
    }, [id, setMovie])

    useEffect(() => {
        if (movie) {
            navigation.setOptions({ title: movie.Title })
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
        <ScrollView style={styles.container}>
            <Image style={styles.image} source={{ uri: movie.Poster }} />
            <Text>{movie.Title} </Text>
        </ScrollView>
    )
}

export default MovieScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        height: 600
    }
})
