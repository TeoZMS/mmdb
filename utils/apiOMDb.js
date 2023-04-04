import axios from "axios"
import { OMDB_KEY } from "./apikeys"

const baseUrl = `http://www.omdbapi.com/?apikey=${OMDB_KEY}&`

export async function search(text) {
    const result = await axios.get(`${baseUrl}s=${text}`)
    return result.data.Search
}

export async function getDetails(id) {
    const result = await axios.get(`${baseUrl}i=${id}`)

    const genres = []
    for (let g of result.data.Genre.split(", ")) {
        genres.push(g)
    }

    const actors = result.data.Actors.replaceAll(", ", "  •  ")
    const writers = result.data.Writer.replaceAll(", ", "  •  ")
    const directors = result.data.Director.replaceAll(", ", "  •  ")

    const poster = result.data.Poster.replace("SX300", "SX800")

    return { ...result.data, Poster: poster, Genre: genres, Actors: actors, Writer: writers, Director: directors }
}
