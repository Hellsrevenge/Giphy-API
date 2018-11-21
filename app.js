$(document).ready(function(){
var offset = 0;    
var giphy = '';
var giphies = ["dog", "cat", "elephant", "bird", "hampster", "rabbit", "frog", "salamander", "capybara", "pygmy goat","hedgehog","turtle","skunk","baboon","barn owl","bear","bongo","pug","boxer dog","crub","fox","wolf","crocodile","doge intensifies"];
function displayGiphyInfo(giphy, offset) {        
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphy + "&offset=" + offset + "&api_key=ybcAAk1t2bejLwPQzXdzVEHyLLknK23W&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        if (offset == 0){
            $("#giphy-view").empty();
        }
        for (var i = 0; i < response.data.length; i++) {
            var giphy = response.data[i];
            var defaultAnimatedSrc = giphy.images.fixed_height.url;
            var staticSrc = giphy.images.fixed_height_still.url;
            var showDiv = $("<div>");
            var showImage = $("<img>");
            var rating = giphy.rating;
            var p = $("<p>").text("Rating: " + rating);
            showImage.attr("src", staticSrc);
            showImage.attr("data-state", "still");
            showImage.attr("data-still", staticSrc);
            showImage.attr("data-animate", defaultAnimatedSrc);
            $(showImage).on("click", function () {
                var state = $(this).attr("data-state");
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });
            showDiv.append(p);
            showDiv.append(showImage);
            $("#giphy-view").append(showDiv);
            $("#load-more").show();
        }
    });
}
function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < giphies.length; i++) {
        var a = $("<button>");
        a.addClass("giphy-btn btn btn-info btn-sm");
        a.attr("data-name", giphies[i]);
        a.text(giphies[i]);
        a.click(function() {
            offset = 0;
            giphy = $(this).attr("data-name");
            displayGiphyInfo(giphy, offset);
        });
        $("#buttons-view").append(a);
    }
}
$("#add-giphy").on("click", function (event) {
    event.preventDefault();
    var giphy = $("#giphy-input").val().trim();
    if (giphy===""){
        return;
    }

    giphies.push(giphy);
    renderButtons();
});

$("#load-more").hide();
$("#load-more").click(function() {
    offset += 10;
    displayGiphyInfo(giphy, offset);
});
renderButtons();
});