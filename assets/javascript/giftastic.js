//jquery - runs when the DOM is ready for the JS
$(document).ready() 
    //the variable for the button topics
    var topics = ["Star Wars", "Transformers", "Puppies", "Kittens", "Disneyland", "Camping"];
     //the variable that holds the api key
     var key = "jY3rzmSSx6knsS1lwF6qpLMzpAktvUQu";
    //function that plays an animation on click
    function animateThis(){
        var state = $(this).attr("data-state");
        //if the state is equal to still
        if(state === "still") {
            //add the src and the attribute data-animate
            $(this).attr("src", $(this).attr("data-animate"));
            //add the data state with animate
            $(this).attr("data-state", "animate");
          } else {
              //add the src and the attribute data-still
              $(this).attr("src", $(this).attr("data-still"));
              //add the data-state as still
              $(this).attr("data-state", "still");
          }
        }
    //function that applies the gifs to the topic searched
    function topicGiphy() {
      //inside topicGifs on the HTML execute the following code
        $("#topicGifs").empty();
        //variable topic adds the attribute data-name
        var topic = $(this).attr("data-name");
        //the variable that holds the url and adds the topic searched plus the api key, and gives us a limit of 10 gifs
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          topic + "&api_key=" + key + "&limit=10";

        //the ajax call with the method GET, calling upon the url variable query URL
        $.ajax({
            url: queryURL,
            method: "GET"
          })
          //function that takes the response information and executes the code below it
          .then(function(response) {
            //variable that holds the response.data information given to use by the api
            var results = response.data;
            //for loop that goes through the results
            for (var i = 0; i < results.length; i++) {
              //variable creating a div tag in the topicGif ID location
              var topicDiv = $("<div>");
               //adding a class to the div
              topicDiv.addClass("gifs card bg-transparent border-light float-left");
              //variable that holds the information for the results rating and adds it
              var p = $('<p class = "blockquote-footer">').text("Rating: " + results[i].rating);
              //adds an image tag to the topicGif ID location
              var topicImage = $("<img>");
              //adds src to the img tag, the src holds the url that comes from the results index, with the image and the image size
              topicImage.attr("src", results[i].images.fixed_height_still.url);
              //adds the data-animate attribute with the animated image
              topicImage.attr("data-animate", results[i].images.fixed_height.url);
             //adds the data-still attribute with the still image
              topicImage.attr("data-still", results[i].images.fixed_height_still.url);
              //adds the attribute data-state and states the image is still
              topicImage.attr("data-state", "still");
              //adds classes to the topicImage
              topicImage.addClass("gif img-responsive img-thumbnail rounded float-left img-fluid");
              //adds alt with the results title from the index for the image in case it doesn't load
              topicImage.attr("alt", results[i].title);
              //putting the topicImage img into the topicDiv div
              topicDiv.append(topicImage);
              //putting the p variable into the topicDiv div
              topicDiv.append(p);
              //add topicDiv to the topicGifs when topicGiphy function is ran
              $("#topicGifs").prepend(topicDiv)
            }
          });
    }
      //the function used to create a button
        function createButton() {
            //inside buttons-view on the HTML execute the following code
            $("#buttons-view").empty();
           //for loop going through the topics variable by its length
            for (var i = 0; i < topics.length; i++){
                //setting a variable j for the button tag
                var j = $("<button>");
                //adding a class to the button tag
                j.addClass("topic-btn btn btn-info");
                //adding the button class
                j.attr("type", "button");
                //adding the topic to the button
                j.attr("data-name", topics[i]);
                j.text(topics[i]);
                $("#buttons-view").append(j);
            }
        }
        //when clicking the add-topic button
        $("#add-topic").on("click", function(event) {
            //do not add the button to the topics
            event.preventDefault();
            //to the topic-input (get the information inputed (val) and remove whitespace (trim))
            var newTopic = $("#topic-input").val().trim();
            //if the newTopic/topic-input is undefined or it has a length of 0
            if (newTopic === undefined || newTopic.length == 0) {
            return;
            //else push the new topic and create a button using the button function
            } else {
            topics.push(newTopic);
            createButton();
        }
    });
    //on click the topic button runs the topicGiphy function
    $(document).on("click", ".topic-btn", topicGiphy);
    //on click the gif animations run the animateThis function
    $(document).on("click", ".gif", animateThis);
    //calling the createButton function 
    createButton();