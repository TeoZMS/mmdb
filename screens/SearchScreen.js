import { useEffect, useRef, useState } from "react"
import { Animated, Keyboard, StyleSheet, Text, View } from "react-native"
import SearchBar from "../components/UI/SearchBar"
import IconButton from "../components/UI/IconButton"
import MovieList from "../components/MovieList"
import * as omdb from "../utils/apiOMDb"

function SearchScreen({ navigation }) {
    const [searchInputShown, setSearchInputShown] = useState(false)
    const [searchText, setSearchText] = useState("")
    const [searchedMovies, setSearchedMovies] = useState()

    const searchAnim = useRef(new Animated.Value(-50)).current

    const searchBar = useRef()

    useEffect(() => {
        const keyboardDidHideEvent = Keyboard.addListener("keyboardDidHide", () => {
            searchBar.current.blur()
        })
        return () => {
            keyboardDidHideEvent?.remove()
        }
    }, [searchBar])

    useEffect(() => {
        if (searchInputShown) {
            Animated.timing(searchAnim, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true
            }).start()
            searchBar.current.focus()
        } else {
            Animated.timing(searchAnim, {
                toValue: -50,
                duration: 100,
                useNativeDriver: true
            }).start()
        }
    }, [searchAnim, searchInputShown])

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <IconButton icon="search" onPress={() => setSearchInputShown(true)} />
        })
    }, [navigation, setSearchInputShown])

    useEffect(() => {
        async function searchMovies(text) {
            const result = await omdb.search(text)
            if (result) {
                setSearchedMovies(result)
            }
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

    return (
        <View>
            <Animated.View style={[styles.searchBarContainer, { transform: [{ translateY: searchAnim }] }]}>
                <SearchBar
                    onBlur={() => setSearchInputShown(false)}
                    onChangeText={text => {
                        setSearchText(text)
                    }}
                    value={searchText}
                    inputRef={searchBar}
                />
            </Animated.View>
            <MovieList movies={searchedMovies} />
        </View>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    searchBarContainer: {
        position: "absolute",
        left: 0,
        right: 0,
        zIndex: 2
    }
})
