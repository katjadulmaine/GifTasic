
$(document).ready(function () {
    var topics = ["Monkey D. Luffy", "Portgas D. Ace", "Shanks", "Roronoa Zoro", "Nico Robin", "Tony Tony Chopper", "Nami", "Sanji", "Trafalgar Law"];
    function charBtn() {
        $("#character-view").empty();
        for (var i = 0; i < topics.length; i++) {
            var linkBtn = $("<button class='btn btn-danger text-lg'>");
            linkBtn.addClass("character");
            linkBtn.attr("data-name", topics[i]);
            linkBtn.text(topics[i]);
            $("#character-view").append(linkBtn);
        }
    }
    $("#findChar").on("click", function (event) {
        event.preventDefault();
        var topic = $("#charInput").val().trim();
        if (topic !== "") {
            topics.push(topic);
            charBtn();
        }
    });
    function callGif() {
        $("#jSonInfo").empty();
        var gifs = $(this).attr('data-name');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifs + "&limit=10&rating=pg&api_key=dc6zaTOxFJmzC";
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (answer) {
            // if (answer[i].rating !== "r" && answer[i].rating !== "pg-13") {
                console.log(answer);
                for (var i = 0; i < 10; i++) {
                    var img = $("<img class='gif' data-state='still'>");
                    img.attr("src", answer.data[i].images.original_still.url);
                    img.attr("data-still", answer.data[i].images.original_still.url);
                    img.attr("data-animate", answer.data[i].images.original.url);
                    // img.attr("data-state", still);
                    $("#jSonInfo").append(img);
                }
            // }
        });
    }
    $(document).on("click", ".character", callGif);

    function gif() {
        var state = $(this).attr("data-state");
        console.log(state)
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    };
    $(document).on("click", ".gif", gif)
    charBtn();
});

