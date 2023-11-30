const Movie = require("../model/movie"); // Renamed the variable to 'Movie'

const getAllMovies = async (req, resp, next) => {
    let movies; // Renamed variable to 'movies'
    try {
        movies = await Movie.find(); // Used 'Movie' to reference the model
    } catch (err) {
        console.log(err);
        return resp.status(500).json({ message: "Internal Server Error" });
    }
    
    if (!movies || movies.length === 0) {
        return resp.status(404).json({ message: "No movies found" });
    } else {
        return resp.status(200).json({ movies });
    }
}

const getById = async (req, resp, next) => {
    const id = req.params.id;
    try {
        const movie = await Movie.findById(id);
        
        if (!movie) {
            return resp.status(404).json({ message: "No Movie Found" });
        } else {
            return resp.status(200).json({ movie });
        }
    } catch (err) {
        console.log(err);
        return resp.status(500).json({ message: "Internal Server Error" });
    }
}

const updateMovie = async (req, resp, next) => {
    const id = req.params.id;
    const { Title, Description, Genre, ReleaseYear } = req.body;
    try {
        let movie = await Movie.findByIdAndUpdate(id, {
            Title,
            Description,
            Genre,
            ReleaseYear
        }, { new: true }); // Added { new: true } to return the updated movie
        
        if (!movie) {
            return resp.status(404).json({ message: "Unable to update by this id" });
        } else {
            return resp.status(200).json({ movie });
        }
    } catch (err) {
        console.log(err);
        return resp.status(500).json({ message: "Internal Server Error" });
    }
}

const addMovie = async (req, resp, next) => {
    const { Title, Description, Genre, ReleaseYear } = req.body;
    try {
        const newMovie = new Movie({
            Title,
            Description,
            Genre,
            ReleaseYear
        });
        const movie = await newMovie.save();
        
        if (!movie) {
            return resp.status(500).json({ message: "Unable to add" });
        } else {
            return resp.status(201).json({ movie });
        }
    } catch (err) {
        console.log(err);
        return resp.status(500).json({ message: "Internal Server Error" });
    }
}

const deleteMovie = async (req, resp, next) => {
    const id = req.params.id;
    try {
        const movie = await Movie.findByIdAndDelete(id);
        
        if (!movie) {
            return resp.status(404).json({ message: "Unable to delete" });
        } else {
            return resp.status(200).json({ message: "Movie deleted" });
        }
    } catch (err) {
        console.log(err);
        return resp.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    getAllMovies,
    addMovie,
    getById,
    updateMovie,
    deleteMovie
};
