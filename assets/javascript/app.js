$(function(){
    buttons(bestArray,'searchButton','#buttonsArea');
})

let bestArray = ["Rick Sanchez", "Morty Smith", "Mr.PoopyButtHole"];

function buttons(bestArray, classToAdd, areaToAddTo){
    $('areaToAdd').empty();
    for (let i = 0; i < bestArray.length; i++){
        let a = $('<button>');
        a.addClass(classToAdd);
        a.attr('data-type',bestArray[i]);
        a.text(bestArray[i]);
        $(areaToAddTo).append(a);
    }
}

$(document).on('click', '.searchButton', function(){
    let type = $(this).data('type');
    let queryURL = 'https://api.giphy.com/v1/gifs/search?q='+ type +'&api_key=YNmIYJkV1Au3pBq1Nr2AJdrDJ25zkTGG&limit=10';
    $.ajax({
        url:queryURL,
        method:'GET'
    })
    .done(function(response){
        for(let i = 0;i < response.data.length; i++){
            let searchDiv = $('<div class="search-item">');
            let rating = response.data[i].rating;
            let p = $('<p>').text('Rating: '+rating);
            let animated = response.data[i].images.fixed_height.url;
            let still = response.data[i].images.fixed_height_still.url;
            let image = $('<img>');
            image.attr('src',still);
            image.attr('data-still', still);
            image.attr('data-animated', animated);
            image.attr('data-state', "still");
            image.addClass('searchImage');
            searchDiv.append(p);
            searchDiv.append(image);
            $('#gifs').append(searchDiv);

        }
    })
})

$('#addSearch').on('click', function(){
    let newSearch = $('input').eq(0).val();
    bestArray.push(newSearch);
    buttons(bestArray,'searchButton','#buttonsArea');
    return false;   
})

$(document).on('click', '.searchImage', function(){
    let state = $(this).attr('data-state');
    if (state =='still'){
        $(this).attr('src', $(this).data('animated'));
        $(this).attr('data-state', 'animated');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
})