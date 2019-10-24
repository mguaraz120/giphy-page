var animals = ["cats","dogs","horses","sharks"];

function displayGif() {
    var animals = $(this).attr("data-name");
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + animals + "&api_key=dc6zaTOxFJmzC&limit=10";