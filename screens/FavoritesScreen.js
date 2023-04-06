import { useIsFocused } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { Text, View } from "react-native"
import { getFevorites } from "../utils/database"
import MovieList from "../components/MovieList"

function FavoritesScreen() {
    const [favoriteMovies, setFavoriteMovies] = useState()
    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            async function favorites() {
                const movies = await getFevorites()
                setFavoriteMovies(movies)
            }
            favorites()
        }
    }, [isFocused, setFavoriteMovies])

    return (
        <View>
            <MovieList movies={favoriteMovies} />
        </View>
    )
}

export default FavoritesScreen
