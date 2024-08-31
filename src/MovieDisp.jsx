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
       <div class="dispcard" key={imdbID}>
            <div>
                <h3>{Title}</h3>
            </div>
            <div>
                <img src={Poster !== "N/A"? Poster:"https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"} alt={Title} />
            </div>
            <p>{"Genre : "+toTitleCase(Type)}</p>
            <p>{"Year : "+Year}</p>
       </div>
       </>
    );
}
export default MovieDisp