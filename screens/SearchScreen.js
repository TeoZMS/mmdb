import { useEffect, useRef, useState } from "react"
import { Animated, Keyboard, StyleSheet, Text, View } from "react-native"
import SearchBar from "../components/UI/SearchBar"
import IconButton from "../components/UI/IconButton"
import MovieList from "../components/MovieList"
import * as omdb from "../utils/apiOMDb"
import EmptyMovieList from "../components/EmptyMovieList"
import { Colors } from "../constants/colors"

function SearchScreen({ navigation }) {
    const [searchInputShown, setSearchInputShown] = useState(false)
    const [searchText, setSearchText] = useState("")
    const [searchedMovies, setSearchedMovies] = useState()
    const [searching, setSearching] = useState(false)

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
            setSearchedMovies(result)
            setSearching(false)
        }

        if (searchText) {
            setSearching(true)
            const timer = setTimeout(() => {
                searchMovies(searchText)
            }, 500)

            return () => {
                clearTimeout(timer)
            }
        } else {
            setSearching(false)
        }
    }, [searchText, setSearchedMovies])

    function Message(text) {
        return (
            <View style={styles.textContainer}>
                <Text style={styles.text}>{text}</Text>
            </View>
        )
    }
    const mainView = searching ? (
        <EmptyMovieList />
    ) : searchedMovies ? (
        <MovieList movies={searchedMovies} />
    ) : (
        Message("Movies not Found")
    )

    return (
        <View style={{ flex: 1 }}>
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
            {mainView}
        </View>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    searchBarContainer: {
        flex: 1,
        position: "absolute",
        left: 0,
        right: 0,
        zIndex: 2
    },
    textContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontSize: 24,
        color: Colors.primary500
    }
})
