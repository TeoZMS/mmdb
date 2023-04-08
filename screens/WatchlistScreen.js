import { useIsFocused } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { getWatchlist } from "../utils/database"
import { View } from "react-native"
import MovieList from "../components/MovieList"

function WatchlistScreen() {
    const [watchlist, setWatchlist] = useState()
    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            async function myWatchlist() {
                const movies = await getWatchlist()
                setWatchlist(movies)
            }
            myWatchlist()
        }
    }, [isFocused, setWatchlist])

    return (
        <View>
            <MovieList movies={watchlist} />
        </View>
    )
}

export default WatchlistScreen
