import React from "react";

function toTitleCase(str) {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function MovieDisp({movie:{imdbID, Year, Poster,Title,Type}}){
    return(
       <>
       <div className="dispcard" key={imdbID}>
            <div>
                <h3>{Title}</h3>
            </div>
            <div  className="img-container">
                <img src={Poster !== "N/A"? Poster:"https://critics.io/img/movies/poster-placeholder.png"} alt={Title} />
            </div>
            <p>{"Genre : "+toTitleCase(Type)}</p>
            <p>{"Year : "+Year}</p>
       </div>
       </>
    );
}
export default MovieDisp