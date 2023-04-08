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
                    tx.executeSql(
                        `CREATE TABLE IF NOT EXISTS watchlist (
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
                            resolve()
                        },
                        (_, error) => {
                            reject(error)
                        }
                    )
                },
                (_, error) => {
                    reject(error)
                }
            )
        })
    })

    return promise
}

function insert(movie, table) {
    return new Promise((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql(
                `INSERT INTO ${table} (imdbID, Poster, Title, Year, Rated, Runtime, Genre, Plot, Director, Writer, Actors, Type, imdbRating, Metascore)
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
                    resolve(result)
                },
                (_, error) => {
                    reject(error)
                }
            )
        })
    })
}

export function insertToFavorites(movie) {
    return insert(movie, "favorites")
}

export function insertToWatchlist(movie) {
    return insert(movie, "watchlist")
}

function get(table) {
    return new Promise((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql(
                `Select imdbID, Poster, Title, Year, Type FROM ${table} ORDER BY Title`,
                [],
                (_, result) => {
                    resolve(result.rows._array)
                },
                (_, error) => {
                    reject(error)
                }
            )
        })
    })
}

export function getFavorites() {
    return get("favorites")
}

export function getWatchlist() {
    return get("watchlist")
}

function getById(id, table) {
    return new Promise((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM ${table} WHERE imdbID = ?`,
                [id],
                (_, result) => {
                    resolve(result.rows._array[0])
                },
                (_, error) => {
                    reject(error)
                }
            )
        })
    })
}

export function getFavoriteById(id) {
    return getById(id, "favorites")
}

export function getWatchlistedById(id) {
    return getById(id, "watchlist")
}

function removeById(id, table) {
    return new Promise((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql(
                `DELETE FROM ${table} WHERE imdbID = ?`,
                [id],
                (_, result) => {
                    resolve(result)
                },
                (_, error) => {
                    reject(error)
                }
            )
        })
    })
}

export function removeFavoriteById(id) {
    return removeById(id, "favorites")
}

export function removeWatchlistedById(id) {
    return removeById(id, "watchlist")
}
