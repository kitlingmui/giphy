
// Set limit 10 on number of api result
const limit = 10  

var topics = ["animal"]

var aniamlURLimg = [] 
var aniamlURLgif = [] 
var aniamlURL = [] 
var aniamlID = [] 
var aniamlRating = [] 


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

// Clear InputBox value when submit
function reset() {    
    document.getElementById("animal-input").value = "";
}

// Call RenderButtons function to display the updated button
renderButtons()

// Display animal image / gif
function updatedisplay(url, id, rating){
    $('.row-Result').empty()
    for (let i=0; i<url.length; i++){
        $('.row-Result').append(`
        <li>
            <p>Rating: ${rating[i]}</p>
            <img class="animal-image" data-img="${id[i]}" src="${url[i]}" alt="animal-image">
        </li>
        `)
    }
}


// When on click one of the animal button
$(document).on("click",".animalbtn", function(){
    searchanimal = $(this).attr("data-value") 
    queryURL = "https://api.giphy.com/v1/gifs/search?q=funny+" + searchanimal + "&api_key=" + apikey + "&limit=" + limit;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(r){
        console.log(r)
        // Display giphy   
        for (let i=0; i<r.data.length; i++){
            aniamlURLimg[i] = r.data[i].images.original_still.url
            aniamlURLgif[i] = r.data[i].images.preview_gif.url 
            aniamlURL[i]    = r.data[i].images.original_still.url
            aniamlID[i]     = r.data[i].id
            aniamlRating[i] = r.data[i].rating                   
        }  
        updatedisplay(aniamlURL, aniamlID, aniamlRating)  
    })   
})

// When click on animal image, update the current url 
$(document).on("click", ".animal-image", function(){   
    imgid = $(this).attr("data-img");
    console.log('Img ID: ' + imgid )

    var imgIndex = aniamlID.indexOf(imgid);

    if (aniamlURL[imgIndex] === aniamlURLimg[imgIndex]) {
        aniamlURL[imgIndex] = aniamlURLgif[imgIndex]
    }
    else if (aniamlURL[imgIndex] === aniamlURLgif[imgIndex]){
        aniamlURL[imgIndex] = aniamlURLimg[imgIndex]
    }
    updatedisplay(aniamlURL, aniamlID, aniamlRating) 
})


// This function handles events where Add Aninmal "Submit" button is clicked
$('#add-animal').on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var newAnimal = $('#animal-input').val().trim();
    reset();

    // The new animal from the textbox is then added to our array
    var isExist = false;

    if (newAnimal === ""){
        alert('No input found. Please re-enter.')
    }
    else{ 
        for (let i=0; i< animals.length; i++){
            if (animals[i] === newAnimal){
                isExist = true;
            }
        }
        
        if (!isExist){
            animals.push(newAnimal);
        }
        else{
            alert('"' + newAnimal + '"' + ' button is already exist.')
        }
    }
    // calling renderButtons which handles the processing of our movie array
    renderButtons();
});