import { useEffect, useState } from "react"
import { Text, View } from "react-native"
import SearchBar from "../components/UI/SearchBar"
import IconButton from "../components/UI/IconButton"
import MovieList from "../components/MovieList"
import * as omdb from "../utils/apiOMDb"

function SearchScreen({ navigation }) {
    const [searchInputShown, setSearchInputShown] = useState(false)
    const [searchText, setSearchText] = useState("")
    const [searchedMovies, setSearchedMovies] = useState()

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <IconButton icon="search" onPress={() => setSearchInputShown(true)} />
        })
    }, [navigation, setSearchInputShown])

    useEffect(() => {
        async function searchMovies(text) {
            const result = await omdb.search(text)
            setSearchedMovies(result)
        }

        if (searchText) {
            const timer = setTimeout(() => {
                searchMovies(searchText)
            }, 500)

            return () => {
                clearTimeout(timer)
            }
        }
    }, [searchText, setSearchedMovies])

    const searchBar = (
        <SearchBar
            onBlur={() => setSearchInputShown(false)}
            onChangeText={text => {
                setSearchText(text)
            }}
            value={searchText}
        />
    )

    return (
        <View>
            {searchInputShown && searchBar}
            <MovieList movies={searchedMovies} />
        </View>
    )
}

export default SearchScreen
