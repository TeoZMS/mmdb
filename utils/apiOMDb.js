import axios from "axios"
import { OMDB_KEY } from "./apikeys"

const baseUrl = `http://www.omdbapi.com/?apikey=${OMDB_KEY}&`

export async function search(text) {
    const result = await axios.get(`${baseUrl}s=${text}`)
    return result.data.Search
}

export async function getDetails(id) {
    const result = await axios.get(`${baseUrl}i=${id}`)
    return result.data
}
