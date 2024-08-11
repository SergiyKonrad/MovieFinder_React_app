import React from 'react'

const MovieCard = ({ movie, onClick }) => {
  return (
    <div className="movie" onClick={() => onClick(movie.imdbID)}>
      <div>
        <p>{movie.Year}</p>
      </div>

      <div>
        <img
          src={
            movie.Poster !== 'N/A'
              ? movie.Poster
              : 'https://via.placeholder.com/400x600?text=No+Image'
          }
          /*    src={
       movie.Poster !== 'N/A'
         ? movie.Poster
        : 'https://your-image-url.com/placeholder-image.png'
     }*/

          alt={movie.Title}
        />
      </div>

      <div>
        <span>{movie.Type}</span>
        <h3>{movie.Title}</h3>
      </div>
    </div>
  )
}

export default MovieCard
