$(document).ready(function () {
  var creatures = [];

  function displayGIFS() {
    var animals = $(this).data("search");

    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      animals +
      "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).done(function (response) {
      var results = response.data;
      $("#gifDiv").empty();
      for (var i = 0; i < results.length; i++) {
        var gifAnimalDiv = $("<div>");

        var animated = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height_still.url;
        var image = $("<img width='20%' height='180px'>");

        image.attr("src", still);
        image.addClass("Giphy");
        image.attr("data-state", "still");
        image.attr("data-still", still);
        image.attr("data-animate", animated);
        gifAnimalDiv.append(image);
        $("#gifDiv").prepend(gifAnimalDiv);
      }
    });
  }

  $("#addAnimal").on("click", function (event) {
    event.preventDefault();
    var newSearch = $("#Input").val().trim();
    creatures.push(newSearch);
    $("#Input").val("");
    displayButtons();
  });

  function displayButtons() {
    for (var i = 0; i < creatures.length; i++) {
      var animal = $('<button class="btn btn-light">');
      animal.attr("id", "creature");
      animal.attr("data-search", creatures[i]);
      animal.text(creatures[i]);
      $("#button").append(animal);
    }
    creatures = []
  }

  displayButtons();

  $(document).on("click", "#creature", displayGIFS);

  $(document).on("click", ".Giphy", pausePlayGifs);

  function pausePlayGifs() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  }
});
