window.onload = (event) => {
    fetchData();
};

const render = (movieObj) => {
    // console.log(movieObj);
    let movieContainer = document.getElementById('container');
    movieContainer.innerHTML += `<div class="card" style="width: 18rem;">
    <img class="card-img-top" src="https://image.tmdb.org/t/p/w500${movieObj.poster_path}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${movieObj.original_title}</h5>
      <p class="card-text">${movieObj.overview}</p>
    </div>
    <div class="card-body">
        <button type="button" onclick='getMoviesDetails(${movieObj.id})' class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">View</button>
    </div>
  </div>`;  
}

const showDetail = (data) => {
    let mode = document.getElementById('showdetail');
    document.getElementById('exampleModalLabel').innerText = data.original_title;
    mode.innerHTML = `<div class="card bg-dark text-white">
<img class="card-img" src="https://image.tmdb.org/t/p/original${data.backdrop_path}" alt="Card image">
<div class="card-img-overlay">
<h5 class="card-title">${data.original_title}</h5>
<p class="card-text">${data.overview}</p>
<p class="card-text">${data.release_date}</p>
</div>
</div>`;
}

const fetchData = () => {
    let arr = [];
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=5e7853fa38844856be15b0d1afefedc3&language=en-US&page=1')
        .then(response => response.json())
        .then(data => {
            arr = data.results;
            // console.log(arr);
            arr.map((element) => {
                render(element);
            })
        })
        .catch(err => console.error(err));
}

const getMoviesDetails = (id) => {
    // console.log(id);
    // https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=5e7853fa38844856be15b0d1afefedc3&language=en-US`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            showDetail(data);
        })
        .catch(err => console.error(err));

}