$(document).ready(function() {

//https://en.wikipedia.org/w/api.php?action=query&format=json&prop=revisions%7Cimages%7Cextracts%7Cinfo&titles=san+francisco&redirects=1&rvprop=content&rvlimit=1&imlimit=1&exsentences=1&inprop=url
// query::: /w/api.php?action=query&format=json&prop=images%7Cextracts&titles=San+Francisco&redirects=1&imlimit=10&exsentences=1

  var wikiAPI = "https://en.wikipedia.org/w/api.php?";
  var wikiOptions = {
    action: "query",
    titles: "",
    prop: "images|revisions|extracts|info",
    redirects: 1,
    rvprop: "content",
    rvlimit: 1,
    imlimit: 1,
    exsentences: 1,
    inprop: "url",
    origin: "*",
    format: "json"
  }

  // Search box input
  $("#search-input").keypress(function (e) {

    // Enter key press
    if (e.which == 13) {
      wikiOptions.titles = $("#search-input").val();
      $("#search-output").text(wikiOptions.titles); // show search text

      // JSON call
      $.getJSON(wikiAPI, wikiOptions, wikiQuery);
      return false;
    }

  });

  // Search button press
  $("#search-button").on("click", function () {
    wikiOptions.titles = $("#search-input").val();
    $("#search-output").text(wikiOptions.titles); // show search text

    // JSON call
    $.getJSON(wikiAPI, wikiOptions, wikiQuery);

  });

  // Display articles that the search returns
  function wikiQuery(data) {
    var articleHTML = '<ul class=article-list pure-u-1">';

    $.each(data, function(i, article) {
      articleHTML += '<li>';
      articleHTML += '<a target="_blank" href="';
      articleHTML += article.pages;
      articleHTML += '">';
      articleHTML += article[Object.keys];
      articleHTML += '<img src="';
      articleHTML += article.media;
      articleHTML += '">';
    });

    articleHTML += '</ul>';
    $('#search-output').html(articleHTML);
  }


});