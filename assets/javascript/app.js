$(document).ready(function(){
  //Initial array of topics....................................................
  var topics = ["Alligator", "Baboon", "Cheetah", "Dolphin", "Elephant"];
  console.log(topics);
  //Generic function for capturing the image from the data attribute
  //function for displaying image data
  function imageDisplay(){
    $("#imageDisplay").empty();
    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10&offset=0";

    //Creating an AJAX call for the specific animal being clicked.
    $.ajax({
      url : queryURL,
      method : "GET"
    })
    .then(function(response){
      console.log(queryURL);
      console.log(response);
      var result = response.data;
      console.log(result);
      //Creating a div to hold the animal images..................
      var animalDiv = $("<div class = 'animal_image' dataState = 'still'>");
      console.log(animalDiv);
      for (var i = 0; i < result.length; i++){
        console.log(i);
        var rating = result[i].rating;
        if (rating !== "r" && rating !== "pg-13") {
          var p = $("<p>").text("Rating: " + rating.toUpperCase());
          console.log(p);
          animalDiv.append(p);
          //Retrieving the URL for the image data...............
          var imageStill = result[i].images.fixed_height_still.url;
          console.log(imageStill);
          var imageAnimate = result[i].images.fixed_height.url;
          console.log(imageAnimate);
          //Creating an img element to hold the image..............
          var image = $("<img class = 'picture'>");
          image.attr("src", imageStill);
          //Passing the imageAnimate data to dataAnimate attribute...............
          image.attr({"dataAnimate" : imageAnimate});
          console.log(image);
          image.attr({"dataState": "still"});
          //Passing the imageStill data to dataStill attribute...............
          image.attr({"dataStill" : imageStill});
          console.log(image);
          //Appending the image to the animalDiv in HTML............
          animalDiv.append(image);
          //Prepending the animalDiv to the previous animal image.............
          $("#imageDisplay").append(animalDiv);
        }
      }

      $(".picture").on("click", function(){
        var state = $(this).attr('dataState');
        console.log(state);
        if(state == "still"){
          $(this).attr("src", $(this).attr("dataAnimate"));
          $(this).attr("dataState", "animate");
          //console.log(dataState);
        } else {
          $(this).attr("src", $(this).attr("dataStill"));
          $(this).attr("dataState", "still");
          //console.log(dataState);
        }
      })
    });
  }

  //Function for the button when clicked will display the animal datas............
  function addButton() {
      //Deleting the topics prior to adding new animal images...................
      $("#buttons-view").empty();

      //Creating a loop for the topics array ......................
      for(var i = 0; i < topics.length; i++){
        //Dynamically generating buttons for each animal in the array.............
        var a = $("<button>");
        //Adding a class to the button................
        a.addClass("image-btn");
        //Adding a data attribute...............
        a.attr("data-name", topics[i]);
        //Assigning the topics to the newly created buttons.............
        a.text(topics[i]);
        //Appending the new buttons to the button-view div in HTML..........
        $("#buttons-view").append(a);
      }
  }

  //This function accepts the animal name input from the textbox with the click of the button abd adds to the array..............
  $("#addImage").on("click", function(event) {
      event.preventDefault();
      //Here the input form the textbox is grabbed.............
      var animalName = $("#imageInput").val().trim();
      if (animalName === "") {
        alert("Please enter an Animal name and click on enter button!");
      } else
      //The animal name retrieved is pushed to the animal array.............
      topics.push(animalName);
      //The addButton function is called to handle the processing of the animal array...........
      addButton();
  });

  //Adding a click event listner to all elements with the class of image-btn.......
  $(document).on("click", ".image-btn", imageDisplay);
  addButton();
});
