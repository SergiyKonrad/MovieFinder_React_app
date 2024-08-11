import { useState, useEffect } from 'react'

import MovieCard from './MovieCard'

import './App.css'
import SearchIcon from './search.svg'

const API_URL = 'https://www.omdbapi.com?apikey=c032e2d7'

const App = () => {
  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const searchMovies = async (title) => {
    try {
      const response = await fetch(`${API_URL}&s=${title}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()

      setMovies(data.Search)
    } catch (error) {
      console.error('Fetch error:', error)
      setMovies([]) // Optionally clear the movie list
      alert('Failed to load data. Please check your internet connection.')
    }
  }

  const fetchMovieDetails = async (id) => {
    try {
      const response = await fetch(`${API_URL}&i=${id}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setSelectedMovie(data)
    } catch (error) {
      console.error('Fetch error:', error)
      alert(
        'Failed to load movie details. Please check your internet connection.',
      )
    }
  }

  useEffect(() => {
    searchMovies('man')
  }, [])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        searchMovies(searchTerm)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [searchTerm])

  return (
    <div className="app">
      <h1>MovieFinder</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onClick={fetchMovieDetails}
            />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}

      {selectedMovie && (
        <div className="modal">
          <h2>{selectedMovie.Title}</h2>
          <p>
            <strong>Year:</strong> {selectedMovie.Year}
          </p>
          <p>
            <strong>Type:</strong> {selectedMovie.Type}
          </p>
          <p>
            <strong>Plot:</strong> {selectedMovie.Plot}
          </p>
          <button onClick={() => setSelectedMovie(null)}>Close</button>
        </div>
      )}
    </div>
  )
}

export default App
