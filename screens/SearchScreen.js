import { useEffect, useState } from "react"
import { Text } from "react-native"
import Search from "../components/Search"
import IconButton from "../components/UI/IconButton"

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

    if (searchInputShown) {
        return (
            <Search
                onBlur={() => setSearchInputShown(false)}
                onChangeText={text => {
                    setSearchText(text)
                }}
                value={searchText}
            />
        )
    }

    return (
        <>
            <Text>Search</Text>
        </>
    )
}

export default SearchScreen
