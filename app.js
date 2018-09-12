
// Set limit 10 on number of api result
const limit = 10  

var topics = ["animal"]

// Initial array of animals
var animals = [ "dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", 
                "sugar glider", "chinchilla", "hedgehog", "hermit crab", "chinchilla", "hedgehog", 
                "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "serval",
                "salamander", "frog" ]

var searchanimal = ""
const apikey = "KCPUzUtfLCvsgh4tnabeT3hfxkgJwuB3"
var queryURL = ""

//javascript, jQuery

// The below code fills in the first row of the table

for (let i=0; i< animals.length; i++){
    $('#animal-btn').append(
        `
        <td><button type="button" class="btn btn-info animalbtn" data-value="${animals[i]}">${animals[i]}</button></td>
        `
    )
}

$(document).on("click",".animalbtn", function(){
    searchanimal = $(this).attr("data-value")
    console.log($(this).attr("data-value"))

    queryURL = "https://api.giphy.com/v1/gifs/search?q=funny+" + searchanimal + "&api_key=" + apikey + "&limit=" + limit;

    console.log(queryURL)

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(r){
        console.log(r)
        console.log(r.data[0].rating);
        console.log(r.data[0].embed_url);  
        console.log(r.data.length)

        $('.row-Result').empty()
        for (let i=0; i<r.data.length; i++){
            $('.row-Result').append(`
            <td>
                <p>Rating: ${r.data[i].rating}</p>
                <img id="animal-image" src="${r.data[i].images.preview_gif.url}" alt="animal">  
            </td>
            `)
        }  
    })   
})



// function updateResult(, i){   
  
// }
    




// // Function for displaying movie data
// function renderButtons() {
// // Deleting the movie buttons prior to adding new movie buttons
// // (this is necessary otherwise we will have repeat buttons)
// $("#movies-view").empty();

// // Looping through the array of movies
// for (var i = 0; i < movies.length; i++) {
// // Then dynamicaly generating buttons for each movie in the array.
// // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
// var a = $("<button>");
// // Adding a class
// a.addClass("movie");
// // Adding a data-attribute with a value of the movie at index i
// a.attr("data-name", movies[i]);
// // Providing the button's text with a value of the movie at index i
// a.text(movies[i]);
// // Adding the button to the HTML
// $("#movies-view").append(a);
// }
// }

// // This function handles events where one button is clicked
// $("#add-movie").on("click", function(event) {
// // event.preventDefault() prevents the form from trying to submit itself.
// // We're using a form so that the user can hit enter instead of clicking the button if they want
// event.preventDefault();

// // This line will grab the text from the input box
// var movie = $("#movie-input").val().trim();
// // The movie from the textbox is then added to our array
// movies.push(movie);

// // calling renderButtons which handles the processing of our movie array
// renderButtons();
// });

// // Calling the renderButtons function at least once to display the initial list of movies
// renderButtons();

// // The below code fills in the first row of the table
// function getAnimal(movie) {
// $.get(`https://www.omdbapi.com/?t=${movie}&apikey=trilogy`)
//     .then(function (r) {
//     console.log(r)
//     $('.movieTable').append(`
//         <tr id="${r.imdbID}">
//         <td>${r.Title}</td>
//         <td>${r.Year}</td>
//         <td>${r.Actors}</td>
//         <td>${r.Rated}</td>
//         <td><button class="btn btn-danger deleteBtn" data-movie="${r.imdbID}">delete</button></td>
//         </tr>
//     `)
//     })
//     .catch(function (e) {
//     console.error(e)
//     })
// }

// $('.submitMovie').on('click', function () {
// event.preventDefault()
// getMovie($('#movieTitle').val())
// $('#movieTitle').val('')
// })

// $(document).on('click', '.deleteBtn',function () {
// let id = '#' + $(this).attr('data-movie')
// $(id).remove()
// })
