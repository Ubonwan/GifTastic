$(document).ready(function() {
	var movies = ['Kuroko no Basuke', 'Iron Man', 'Durarara!!', 'Yuri on Ice', 'Owari no Seraph'];

	function displayMovieInfo(){
		var movie = $(this).attr('data-name');
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + movie + "&limit=25&api_key=dc6zaTOxFJmzC";
		
		// Creates AJAX call for the specific movie being 
		$.ajax({url: queryURL, method: 'GET'}).done(function(response) {
			// Creates a generic div to hold the movie
			var movieDiv = $('<div class="movie">');
			// Retrieves the Rating Data
			var rating = response.rating;
			// Creates an element to have the rating displayed
			var pOne = $('<p>').text( "Rating: " + rating);
			// Displays the rrating
			movieDiv.append(pOne);
			// Creates an element to hold the image 
			var image = $('<img>').attr("src", response.Poster);
			// Appends the image
			movieDiv.append(image);
			// Puts the entire Movie above the previous movies.
			$('#gifResult').prepend(movieDiv);
		});
	}
	// ========================================================
	// Generic function for displaying movie data 
	function renderButtons(){ 
		// Deletes the movies prior to adding new movies (this is necessary otherwise you will have repeat buttons)
		$('#animeTags').empty();
		// Loops through the array of movies
		for (var i = 0; i < movies.length; i++){
			// Then dynamicaly generates buttons for each movie in the array
			// Note the jQUery syntax here... 
		    var a = $('<button>') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
		    a.addClass('movie'); // Added a class 
		    a.attr('data-name', movies[i]); // Added a data-attribute
		    a.text(movies[i]); // Provided the initial button text
		    $('#animeTags').append(a); // Added the button to the HTML
		}
	}
	// ========================================================
	// This function handles events where one button is clicked
	$('#addAnime').on('click', function(){
		// This line of code will grab the input from the textbox
		var movie = $('#animeInput').val().trim();
		// The movie from the textbox is then added to our array
		movies.push(movie);
		
		// Our array then runs which handles the processing of our movie array
		renderButtons();
		// We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
		return false;
	})
	// ========================================================
	// Generic function for displaying the movieInfo
	$(document).on('click', '.movie', displayMovieInfo);
	// ========================================================
	// This calls the renderButtons() function
	renderButtons();


});



