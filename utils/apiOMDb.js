import axios from "axios"
import { OMDB_KEY } from "./apikeys"

const baseUrl = `http://www.omdbapi.com/?apikey=${OMDB_KEY}&`

export async function search(text) {
    const result = await axios.get(`${baseUrl}s=${text}`)
    return result.data.Search
}

export async function getDetails(id) {
    const result = await axios.get(`${baseUrl}i=${id}`)

    const actors = result.data.Actors.replaceAll(", ", "  •  ")
    const writers = result.data.Writer.replaceAll(", ", "  •  ")
    const directors = result.data.Director.replaceAll(", ", "  •  ")

    const poster = result.data.Poster.replace("SX300", "SX800")

    return { ...result.data, Poster: poster, Actors: actors, Writer: writers, Director: directors }
}
