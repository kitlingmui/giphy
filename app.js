
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

// Function for displaying aniaml button
function renderButtons() {
    // Deletes the animal prior to adding new animal
    $('#animal-btn').empty();
    
    // Display current animals button
    for (let i=0; i< animals.length; i++){
        $('#animal-btn').append(
            `
            <td><button type="button" class="btn btn-info animalbtn" data-value="${animals[i]}">${animals[i]}</button></td>
            `
        )
    }   
}

renderButtons()

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
        console.log(r)
        // console.log(r.data[0].rating);
        // console.log(r.data[0].embed_url);  
        // console.log(r.data.length)

        // Display giphy
        $('.row-Result').empty()
        for (let i=0; i<r.data.length; i++){
            
            $('.row-Result').append(`
            <li>
                <p>Rating: ${r.data[i].rating}</p>
                <img id="animal-image" src="${r.data[i].images.original_still.url}" alt="animal">
            </li>
            `)
        }  
    })   
})


// This function handles events where Add Aninmal "Submit" button is clicked
$('#add-animal').on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var newAnimal = $('#animal-input').val().trim();

    console.log(newAnimal);
    animals.push(newAnimal);

    // The new animal from the textbox is then added to our array
    // var isExist = false;

    // for (let i=0; i< animals.length; i++){
    //     if (animals[i] === newAnimal){
    //         isExist = true;
    //     }
    // }
    
    // if (!isExist){
        
    // }

    // calling renderButtons which handles the processing of our movie array
    renderButtons();
  });