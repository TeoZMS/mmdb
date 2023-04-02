import { useEffect, useState } from "react"
import { Text, View } from "react-native"
import * as omdb from "../utils/apiOMDb"

function MovieScreen({ route }) {
    const [movie, setMovie] = useState()
    const { id } = route.params

    useEffect(() => {
        async function getMovie(id) {
            const result = await omdb.getDetails(id)
            setMovie(result)
        }

        getMovie(id)
    }, [id, setMovie])

    return (
        <View>
            <Text>{movie && movie.Title} </Text>
        </View>
    )
}

export default MovieScreen
