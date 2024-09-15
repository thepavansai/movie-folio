import { useEffect, useState } from 'react'
import MovieDisp from './MovieDisp';
import './Home.css'
const API_KEY = "https://www.omdbapi.com/?i=tt3896198&apikey=6cd4bcc7";
const Home = () => {
    const [searchword, setword] = useState("");
    const [movie, addmovie] = useState([]);
    const [er, ser] = useState("");
    useEffect(() => {
        searchMovie("John Wick");
    }, []);
    const searchMovie = async (data) => {
        try {
            const response = await fetch(`${API_KEY}&s=${encodeURIComponent(data)}`);
            const mv = await response.json();
            if (mv.Response == "True") {
                addmovie(mv.Search);
                ser(null);
            }
            else {
                addmovie([]);
                ser(mv.Error);
            }

        } catch (err) {
            ser("Failed to fetch movies. Please try after sometime");
        }
    };
    return (<>
        <div className='app'>
            <div class="header">
                <img src='src\image.png' alt="Logo" class="logo"/>
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
