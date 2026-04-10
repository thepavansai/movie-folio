import { useEffect, useState } from 'react'
import MovieDisp from './MovieDisp';
import './Home.css'

const OMDB_API_BASE_URL = 'https://www.omdbapi.com/';
const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY?.trim() ?? '';
const HAS_OMDB_API_KEY = OMDB_API_KEY.length > 0;

const Home = () => {
    const [searchword, setword] = useState("");
    const [movie, addmovie] = useState([]);
    const [er, setError] = useState("");
    useEffect(() => {
        searchMovie("John Wick");
    }, []);
    const searchMovie = async (data) => {
        if (!HAS_OMDB_API_KEY) {
            addmovie([]);
            setError("Missing OMDB API key. Set VITE_OMDB_API_KEY in your deployment environment.");
            return;
        }

        try {
            const response = await fetch(`${OMDB_API_BASE_URL}?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(data)}`);
            const mv = await response.json();
            if (mv.Response === "True") {
                addmovie(mv.Search);
                setError(null);
            }
            else {
                addmovie([]);
                setError(mv.Error);
            }

        } catch {
            setError("Failed to fetch movies. Please try after sometime");
        }
    };
    return (<>
        <div className='app'>
            <div class="header">
                <img src='https://res.cloudinary.com/dvhaej9rj/image/upload/v1726391404/mffzcza1fsjxsvx2s5w7.png' alt="Logo" class="logo"/>
                    <h1 class="title">Movie-Folio</h1>
            </div>
            <div className='search'>
                <input className='ip' value={searchword} onChange={(e) => setword(e.target.value)} onKeyDown={(e) => {
                    if (e.key === "Enter")
                        searchMovie(searchword);
                }} placeholder='lets begin...' />
                <img className='imgi' src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-512.png"
                    alt="search"
                    onClick={() => searchMovie(searchword)}
                />
            </div>
            {
                movie.length > 0 ? (
                    <div className='movielayout'>
                        {movie.map((item) => (
                            <MovieDisp key={item.imdbID} movie={item} />
                        ))}
                    </div>
                ) : (er && (
                    <div className='notfound'>
                        <h2>{er}</h2>
                    </div>))

            }
        </div>


    </>)
}
export default Home
