//AJAX call to recipe API
$(document).ready(function () {
    // Call recipe API

    let recipeKey = "1ea52a5202149f9ac4dc33174c85c140";
    let locationKey;
    let recipe;
    let location;
    let apiRecipes;


    function recipeCall(searchTerm) {
        $.ajax({
            url: searchTerm,
            method: "GET",
        }).then(function (response) {

            console.log(response);
            $(".search-form").hide();
            $("#current-dish").empty();

            // let random = Math.floor(Math.random() * 30);
            response = JSON.parse(response);

            apiRecipes = response1.recipes;
            console.log(apiRecipes);

            // response1 = JSON.parse(response1);
            for (i = 0; i < response1.recipes.length; i++) {
                console.log(2);
                console.log("Recipes API List addition")
                let favIcon = $("<i>")
                    .addClass("fav")
                    .attr("value", JSON.stringify(response1.recipes[2]))
                    .attr("data-recipe-index", i)
                    .addClass("fa fa-heart fa_custom");

                // let titleImg = $("<img>")

                //     .attr("src", response1.recipes[2].image_url)
                //     .css("max-width", "500px");

                // let dishTitle = $("<h5>")
                //     .text(response1.recipes[2].title)
                //     .attr("value", JSON.stringify(response1.recipes[i]))
                //     .addClass("fa fa-heart fa_custom");

                let titleImg = $("<img>")
                    .attr("src", response1.recipes[i].image_url)
                    .css("max-width", "500px")
                    .add(favIcon);

                let dishTitle = $("<h5>")
                    .text(response1.recipes[i].title)
                    .addClass("font")
                    .css("text-align", "center")
                    .prepend(favIcon);

                let newListDiv = $("<div>")
                    .addClass("jumbotron justify-content-center click-hook")
                    .css("width", "fit-content")
                    .attr("value", JSON.stringify(response1.recipes[i]))
                    .css("margin", "10px auto")
                    .append(dishTitle)
                    .append(titleImg)

                $("#current-dish").append(newListDiv);
            }
        });
    };

    // Call Location API on load

    var ip = "";
    var api_key = 'at_Hh2TNGBjuJxpNv4hWz9Zug16R7wuL';
    $(function () {
        $.ajax({
            url: "https://geo.ipify.org/api/v1",
            dataType: "json",
            data: {
                apiKey: api_key,
                ipAddress: ip
            },
            success: function (data) {
                $("body").append("<pre>" + JSON.stringify(data, "", 2) + "</pre>");

                let countryCode = data.location.country;
                console.log(countryCode);

                // conversion of country code to nationality

                countryObject.forEach(element => {
                    console.log(element.Country);
                    if (element.Code == countryCode) {
                        console.log("TRUE");
                        apiInput = `https://www.food2fork.com/api/search?key=${recipeKey}&q=${element.Nationality}`;
                        recipeCall(apiInput);
                    }
                });
            }
        });
    });

    //-------------------------------------Front end functionality--------------------------------------

    $(".search-form").hide();
    $("#favorite-btn").on("click", () => {
        window.location.href = "./favorite.html"
    });
    $("#about-btn").on("click", () => {
        window.location.href = "./about.html"
    });

    //-------------------------------------Search function--------------------------------------

    $("#search-btn").on("click", function () {
        $(".search-form").toggle() //showing search form
    });

    $("#search-btn2").on("click", function () {

        let searchTerm = $("#search-input").val();
        let apiInput = `https://www.food2fork.com/api/search?key=${recipeKey}&q=${searchTerm}`;
        recipeCall(apiInput);
    });

    $(document).on("click", ".fav", function (event) {
        event.preventDefault();

        let favoriteList = JSON.parse(localStorage.getItem("favorites"));

        // Checkin if in local Storage
        if (!Array.isArray(favoriteList)) {
            favoriteList = [];
        }

        // Get the recipe details and store them in an object
        let recipeIndex = $(this).attr("data-recipe-index");

        let favoriteItem = apiRecipes[parseInt(recipeIndex)];

        // Adding favorite to local list variable and adding it to local storage
        favoriteList.push(favoriteItem);

        // Save the favorite into localstorage.
        localStorage.setItem("favorites", JSON.stringify(favoriteList));
    });

    // Add to local storage


    $(document).on("click", ".click-hook", function (event) {
        event.preventDefault();
        localStorage.setItem("ingredients", JSON.stringify($(this).attr("value")));

    });


    let favoriteList = [];
    let favoriteObject;



    $(document).on("click", ".fav", function (event) {
        event.preventDefault();




        // console.log(favoriteList);

        // Checkin if in local Storage
        // if (!Array.isArray(favoriteList)) {
        //     favoriteList = [];
        // }

        // Get the recipe details and store them in an object

        favoriteObject = $(this).attr("value");
        console.log(JSON.stringify(favoriteObject))

        // Adding favorite to local list variable and adding it to local storage
        favoriteList.push(JSON.stringify(favoriteObject));
        // Save the favorite into localstorage.
        localStorage.setItem("favorites", favoriteList);
    });


    //---------------------------------Data processing------------------------------------------


    // Add to local storage


    //--------------------------------------On Click event for List on Index---------------------------------------------------------
    $(document).on("click", ".click-hook", function (event) {
        event.preventDefault();
        window.location.href = "./ingredients.html"
        // let ingredients = [];


        function getIngredients(recipe) {

            var recipeObject = localStorage.getItem("ingredients");
            recipeObject = JSON.parse(recipeObject);
            recipeObject = JSON.parse(recipeObject);
            var recipeId = recipeObject.recipe_id;
            console.log(recipeObject);
            console.log(recipeId);
            recipeKey = "1ea52a5202149f9ac4dc33174c85c140";

            // var recipeid =;
            var queryURL = "https://www.food2fork.com/api/get?rId=" + recipeId + "&key=" + recipeKey;

            $("#ingredients").empty();
            console.log("Test")

            $.ajax({
                    url: queryURL,
                    method: "GET"
                })
                // After data comes back from the request
                .then(function (response) {
                    console.log(queryURL);
                    console.log("response" + response);
                    // storing the data from the AJAX request in the results variable ONE OR THE OTHER OR BOTH OF THE TWO BELOW
                    // var results = response.data;
                    // console.log(results);
                    let ingredientsObject = JSON.parse(response);
                    console.log(ingredientsObject);
                    var ingredientsList = $("<ul>");
                    // Loop through the ingredients returned from the call and append each one to ingredientsList
                    for (var i = 0; i < ingredientsObject.recipe.ingredients.length; i++) {
                        console.log("test2");
                        var lI = $("<li>").text(ingredientsObject.recipe.ingredients[i]);
                        ingredientsList.append(lI);
                    }
                    console.log(ingredientsList);
                    //Add ingredientsList unordered list to ingredients div
                    $("#ingredients").append(ingredientsList);

                    // window.location.href = "./ingredients.html"
                    // console.log("test");

                })

        }

        getIngredients();
    });


    //Emily's original reused above
    //Emily's original reused above

    // $(".fav").on("click", function (event) {
    //     event.preventDefault();

    //     let favoriteList = JSON.parse(localStorage.getItem("favorites"));

    //     // Checkin if in local Storage
    //     if (!Array.isArray(favoriteList)) {
    //         favoriteList = [];
    //     }

    //     // Get the recipe details and store them in an object
    //     let favoriteObject = {
    //         favoriteId: response1.recipes[4].recipe_id,
    //         favoriteTitle: response1.recipes[4].title,
    //         favoriteImage: response1.recipes[4].image_url,
    //         favoritePublisher: response1.recipes[4].publisher,
    //         favoriteF2fUrl: response1.recipes[4].f2f_url,
    //         favoriteIngredients: response1.recipes[4].ingredients,
    //         favoriteSourceUrl: response1.recipes[4].source_url,
    //         favoriteSocialRank: response1.recipes[4].social_rank,
    //         favoritePublisherUrl: response1.recipes[4].publisher_url
    //     }

    //     // Adding favorite to local list variable and adding it to local storage
    //     favoriteList.push(favoriteObject);

    //     // Save the favorite into localstorage.
    //     localStorage.setItem("favorites", JSON.stringify(favoriteList));
    // });

    //Clickevent for Button
});