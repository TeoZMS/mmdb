import { FlatList, Text, View } from "react-native"
import MovieListItem from "./MovieListItem"

const DUMMY_DATA = [
    {
        Title: "Batman Begins",
        Year: "2005",
        imdbID: "tt0372784",
        Poster: "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
    },
    {
        Title: "Batman Begins1",
        Year: "2005",
        imdbID: "tt037278g",
        Poster: "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
    },
    {
        Title: "Batman Begins2",
        Year: "2005",
        imdbID: "tt037278d",
        Poster: "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
    },
    {
        Title: "Batman Begins3",
        Year: "2005",
        imdbID: "tt037278a",
        Poster: "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
    },
    {
        Title: "Batman Begins4 Batman Begins4 Batman Begins4",
        Year: "2005",
        imdbID: "tt037278q",
        Poster: "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
    }
]

function MovieList() {
    return (
        <FlatList
            data={DUMMY_DATA}
            keyExtractor={item => item.imdbID}
            renderItem={({ item }) => <MovieListItem movie={item} />}
        />
    )
}

export default MovieList
