import { useEffect, useState } from "react"
import { Text, View } from "react-native"
import SearchBar from "../components/UI/SearchBar"
import IconButton from "../components/UI/IconButton"
import MovieList from "../components/MovieList"

function SearchScreen({ navigation }) {
    const [searchInputShown, setSearchInputShown] = useState(false)
    const [searchText, setSearchText] = useState("")

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <IconButton icon="search" onPress={() => setSearchInputShown(true)} />
        })
    }, [navigation, setSearchInputShown])

    useEffect(() => {
        console.log(searchText)
    }, [searchText])

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
            <MovieList />
        </View>
    )
}

export default SearchScreen
