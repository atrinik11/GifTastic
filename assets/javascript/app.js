$(document).ready(function(){
  //Initial array of topics....................................................
  var topics = ["Casper", "Donald Duck", "Daffy Duck", "Smurf", "Popeye", "Tweety"];
  console.log(topics);
  //Generic function for capturing the image from the data attribute
  //function for displaying image data
  function imageDisplay(){
    $("#imageDisplay").empty();
    var cartoon = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + cartoon + "&api_key=dc6zaTOxFJmzC&limit=10&offset=0";

    //Creating an AJAX call for the specific cartoon being clicked.
    $.ajax({
      url : queryURL,
      method : "GET"
    })
    .then(function(response){
      console.log(queryURL);
      console.log(response);
      var result = response.data;
      console.log(result);
      //Creating a div to hold the cartoon images..................
      var cartoonDiv = $("<div class = 'cartoon_image' dataState = 'still'>");
      console.log(cartoonDiv);
      for (var i = 0; i < result.length; i++){
        console.log(i);
        var rating = result[i].rating;
        if (rating !== "r" && rating !== "pg-13") {
          var p = $("<p>").text("Rating: " + rating.toUpperCase());
          console.log(p);
          cartoonDiv.append(p);
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
          //Appending the image to the cartoonDiv in HTML............
          cartoonDiv.append(image);
          //Prepending the cartoonDiv to the previous cartoon image.............
          $("#imageDisplay").append(cartoonDiv);
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

  //Function for the Enter button when clicked will add the name in the textbox in the topics array............
  function addButton() {
      //Deleting the topics prior to adding new cartoon images...................
      $("#buttons-view").empty();

      //Creating a loop for the topics array ......................
      for(var i = 0; i < topics.length; i++){
        //Dynamically generating buttons for each cartoon in the array.............
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

  //This function accepts the cartoon name input from the textbox with the click of the button abd adds to the array..............
  $("#addImage").on("click", function(event) {
      event.preventDefault();
      //Here the input form the textbox is grabbed.............
      var cartoonName = $("#imageInput").val().trim();
      if (cartoonName === "") {
        alert("Please enter a Cartoon Character name and click on enter button!");
      } else {
      //The cartoon name retrieved is pushed to the cartoon array.............
      topics.push(cartoonName);
      imageInput = "";
      }
      //The addButton function is called to handle the processing of the cartoon array...........
      addButton();
  });

  //Adding a click event listner to all elements with the class of image-btn.......
  $(document).on("click", ".image-btn", imageDisplay);
  addButton();
});
