import * as SQLite from "expo-sqlite"

const database = SQLite.openDatabase("mmdb-date.db")

export function init() {
    const promise = new Promise((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS favorites (
                    imdbID TEXT PRIMARY KEY NOT NULL,
                    Poster TEXT NOT NULL,
                    Title TEXT NOT NULL,
                    Year TEXT NOT NULL,
                    Rated TEXT NOT NULL,
                    Runtime TEXT NOT NULL,
                    Genre TEXT NOT NULL,
                    Plot TEXT NOT NULL,
                    Director TEXT NOT NULL,
                    Writer TEXT NOT NULL,
                    Actors TEXT NOT NULL,
                    Type TEXT NOT NULL,
                    imdbRating TEXT NOT NULL,
                    Metascore TEXT NOT NULL 
                )`,
                [],
                () => {
                    console.log("init completed")
                    resolve()
                },
                (_, error) => {
                    reject(error)
                }
            )
        })
    })

    return promise
}

export function insertToFavorites(movie) {
    const promise = new Promise((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql(
                `INSERT INTO favorites (imdbID, Poster, Title, Year, Rated, Runtime, Genre, Plot, Director, Writer, Actors, Type, imdbRating, Metascore)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    movie.imdbID,
                    movie.Poster,
                    movie.Title,
                    movie.Year,
                    movie.Rated,
                    movie.Runtime,
                    movie.Genre,
                    movie.Plot,
                    movie.Director,
                    movie.Writer,
                    movie.Actors,
                    movie.Type,
                    movie.imdbRating,
                    movie.Metascore
                ],
                (_, result) => {
                    console.log(result)
                    resolve(result)
                },
                (_, error) => {
                    reject(error)
                }
            )
        })
    })

    return promise
}
