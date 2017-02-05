$(document).ready(function() {

//https://en.wikipedia.org/w/api.php?action=query&format=json&prop=revisions%7Cimages%7Cextracts%7Cinfo&titles=san+francisco&redirects=1&rvprop=content&rvlimit=1&imlimit=1&exsentences=1&inprop=url
// query::: /w/api.php?action=query&format=json&prop=images%7Cextracts&titles=San+Francisco&redirects=1&imlimit=10&exsentences=1

  var wikiAPI = "https://en.wikipedia.org/w/api.php?";
  var wikiOptions = {
    action: "query",
    generator: "allpages",
    aplimit: 5,
    format: "json",
    origin: "*",
    prop: "images|revisions|extracts|info",
    titles: "",
    redirects: 1,
    rvprop: "content",
    rvlimit: 5,
    exsentences: 1,
    imlimit: 1,
    inprop: "url"
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

    $.each(data.query.pages, function(i, article) {
      articleHTML += '<li class="clearfix">';
      articleHTML += '<a target="_blank" href="';
      articleHTML += article.fullurl;
      articleHTML += '">';
      articleHTML += '<h2>'
      articleHTML += article.title + " " + article.pageid;
      articleHTML += '</h2>'
      articleHTML += '<img src="';
      articleHTML += article.media;
      articleHTML += '">';
      articleHTML += article.extract;
      articleHTML += '</a>';
    });

    articleHTML += '</ul>';
    $('#search-output').html(articleHTML);
  }


});