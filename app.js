
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

// Display current animals button
for (let i=0; i< animals.length; i++){
    $('#animal-btn').append(
        `
        <td><button type="button" class="btn btn-info animalbtn" data-value="${animals[i]}">${animals[i]}</button></td>
        `
    )
}


// When on click one of the animal button
$(document).on("click",".animalbtn", function(){
    searchanimal = $(this).attr("data-value")
    console.log($(this).attr("data-value"))

    queryURL = "https://api.giphy.com/v1/gifs/search?q=funny+" + searchanimal + "&api_key=" + apikey + "&limit=" + limit;

    console.log(queryURL)

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(r){
        // console.log(r)
        // console.log(r.data[0].rating);
        // console.log(r.data[0].embed_url);  
        // console.log(r.data.length)

        // Display giphy
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
