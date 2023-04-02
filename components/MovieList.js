import { FlatList, Text, View } from "react-native"
import MovieListItem from "./MovieListItem"

function MovieList({ movies }) {
    return <FlatList data={movies} keyExtractor={item => item.imdbID} renderItem={({ item }) => <MovieListItem movie={item} />} />
}

export default MovieList
