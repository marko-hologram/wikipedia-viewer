$(document).ready(function() {

//https://en.wikipedia.org/w/api.php?action=query&format=json&prop=revisions%7Cimages%7Cextracts%7Cinfo&titles=san+francisco&redirects=1&rvprop=content&rvlimit=1&imlimit=1&exsentences=1&inprop=url
// query::: /w/api.php?action=query&format=json&prop=images%7Cextracts&titles=San+Francisco&redirects=1&imlimit=10&exsentences=1

  var wikiAPI = "https://en.wikipedia.org/w/api.php?";
  var wikiOptions = {
    action: "query",
    format: "json",
    origin: "*",
    prop: "info|extracts",
    generator: "search",
    //redirects: 1,
    inprop: "url",
    exsentences: 1,
    exlimit: 1,
    aplimit: 10,
    gapfrom: "",
    gaplimit: 5,
    gapnamespace: 0,
    gsrsearch: "",
    gsrlimit: 10
  }

  // Search box input
  $("#search-input").keypress(function (e) {

    // Enter key press
    if (e.which == 13) {
      wikiOptions.gsrsearch = $("#search-input").val();
      $("#search-output").text(wikiOptions.gsrsearch); // show search text

      // JSON call
      $.getJSON(wikiAPI, wikiOptions, wikiQuery);
      return false;
    }

  });

  // Search button press
  $("#search-button").on("click", function () {
    wikiOptions.gsrsearch = $("#search-input").val();
    $("#search-output").text(wikiOptions.gsrsearch); // show search text

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
      //articleHTML += '<img class="pure-u-2-5" src="https://cache-graphicslib.viator.com/graphicslib/thumbs674x446/18611/SITours/zagreb-small-group-private-walking-tour-in-zagreb-263763.jpg';
      // articleHTML += article.thumbnail.source;
      //articleHTML += '">';
      articleHTML += '<div class="output-text pure-u-lg-1">';
      articleHTML += '<h2>'
      articleHTML += article.title;
      articleHTML += '</h2>'
      articleHTML += article.extract;
      articleHTML += '</div>';
      articleHTML += '</a>';
    });

    articleHTML += '</ul>';
    $('#search-output').html(articleHTML);
  }


});