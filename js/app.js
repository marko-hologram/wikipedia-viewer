$(document).ready(function() {

  var wikiAPI = "https://en.wikipedia.org/w/api.php?";
  var wikiOptions = {
    action: "query",
    format: "json",
    origin: "*",
    prop: "info|extracts",
    exsentences: 2,
    exlimit: 1,
    generator: "search",
    inprop: "url",
    gsrsearch: "",
    gsrnamespace: 0,
    gsrlimit: 5,
    exintro: 1,
    exlimit: 5
  }

  // Search box input
  $("#search-input").keypress(function (e) {

    // Enter key press
    if (e.which == 13) {
      wikiOptions.gsrsearch = $("#search-input").val();
      //$("#search-output").text(wikiOptions.gsrsearch); // show search text

      // JSON call
      $.getJSON(wikiAPI, wikiOptions, wikiQuery);
      return false;
    }

  });

  // Search button press
  $("#search-button").on("click", function () {
    wikiOptions.gsrsearch = $("#search-input").val();
    //$("#search-output").text(wikiOptions.gsrsearch); // show search text

    // JSON call
    $.getJSON(wikiAPI, wikiOptions, wikiQuery);

  });

  // Display articles that the search returns
  function wikiQuery(data) {
    var articleHTML = '<ul class=article-list pure-u-1">';

    $.each(data.query.pages, function(i, article) {
      articleHTML += '<li class="clearfix pure-u-1">';
      articleHTML += '<a target="_blank" href="';
      articleHTML += article.fullurl;
      articleHTML += '">';
      articleHTML += '<div class="output-text pure-u-lg-1">';
      articleHTML += '<h2>'
      articleHTML += article.title;
      articleHTML += '</h2>'
      articleHTML += article.extract;
      articleHTML += '</div>';
      articleHTML += '</a>';
    });

    articleHTML += '</ul>';
    $('#search-output').css( "opacity", 1 );
    $('#search-output').html(articleHTML).animate({
      opacity: 1
    }, 1000 );

    $('.output-text p:last-child').append("...");
  }

  // Add the loading animation
  var $container = $('#loading-animation');

  $(document).on({
    ajaxStart: function() {
      $container.addClass('loading')
      $('.modal').animate( {
        opacity: 1,
        height: "+=100px"
      }, 400 ) ;
    },
    ajaxStop: function() {
      // $container.removeClass('loading');
      $('.modal').delay(200).animate( {
        opacity: 0,
        height: 0
      }, 400 );
    }
  });

});