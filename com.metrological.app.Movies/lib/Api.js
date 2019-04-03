import movies from "./movies.js"

export default class Api {

    static getTopMovies() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(movies);
            }, 500)
        });
    }

    static search() {
        return this.getTopMovies().then((results) => {
            return results.filter(item => (Math.random() > 0.5));
        });
    }
}