// factory function
const MoviesService = function(moviesApi){
    // először lekérjük az összes movie-t
    let moviesPromise = moviesApi.get()
    // ez a GET parancshoz kell
    const getAllMovies = async function () {return await moviesPromise} //

    // ez a FIND parancshoz kell
    const findMovieById = async function(id){const movies = await moviesPromise; return movies.find(e=>e.id==id)}

    // ez a CREATE parancshoz kell, az ID generálásához először
    // [...movies] készítek egy másolatot az adatbázisról, majd sorba rendezem
    const generateMovieId = function(data){
        const sortedMovies = [...data].sort((a,b)=>a.id>b.id)
    // a legnagyobb ID-hoz hozzáadok még egyet
        return sortedMovies[sortedMovies.length-1].id+1}

    const createMovie = async function(producer, title){
        let movies = await moviesPromise 
    // létrehozom az új 'movie' objektumot, az ID helyére behelyettesítem a fenti függvényt
        const movie = {id:generateMovieId(movies), producer, title}
    // majd a 'movies' adatbázist spread-elem és hozzáfűzöm a legújabb elemet
    // technikailag így a teljes 'movies' adatbázist lecserélem
       let movieArray = [...movies, movie]
    // utolsó lépésként elmentjük a változtatásokat
        moviesApi.save(movieArray)
        return movie}

    const editMovie = async function(id, producer, title){
            // létrehozom az új 'movie' objektumot
            const movie = {id, producer, title}
            // .map metódussal rákeresek az ID-ra, 
            // ha egyezik, módosítom (moive), ha nem egyezik, marad az eredeti (e)
            let movies = await moviesPromise 
            movies = movies.map(e=>e.id==id ? movie : e)
            moviesApi.save(movies)
            return movies.find(e=>e.id==id)}

    const removeMovie = async function(id){
        let movies = await moviesPromise 
        movies = movies.filter(e=>e.id!=id)
        moviesApi.save(movies)}   

return {getAllMovies, findMovieById, createMovie, editMovie, removeMovie}}

module.exports = MoviesService