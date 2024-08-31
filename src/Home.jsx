import { useEffect, useState } from 'react'
import MovieDisp from './MovieDisp';
import './App.css'
const API = "http://www.omdbapi.com/?i=tt3896198&apikey=6cd4bcc7";
const Home = () => {
    const [searchword, setword] = useState("");
    const [movie, addmovie] = useState([]);
    useEffect(() => {
        searchMovie("Jalsa");
    }, []);
    const searchMovie = async (data) => {
        const response = await fetch(`${API}&s=${data}`);
        const mv = await response.json();
        addmovie(mv.Search);
    };
    return (<>
        <div className='app'>
            <h1>Movie-Hub</h1>
            <div className='search'>
                <input value={searchword} onChange={(e) => setword(e.target.value)}
                    placeholder='lets begin...' />
                <img src="https://raw.githubusercontent.com/gist/adrianhajdin/997a8cdf94234e889fa47be89a4759f1/raw/f13e5a9a0d1e299696aa4a0fe3a0026fa2a387f7/search.svg"
                    alt="search"
                    onClick={(e) => searchMovie(searchword)}
                />
            </div>
            {
                movie.length > 0 ? (
                    <div className='movielayout'>
                        {movie.map((item) => (
                            <MovieDisp movie={item} />
                        ))}
                    </div>
                ) : (<div className='notfound'>
                    <h2>No data found in omdbapi</h2>
                </div>)
            }
        </div>
    </>)
}
export default Home
