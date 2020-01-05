function init() {
  gapi.client.setApiKey("AIzaSyD7BZItJ21dmZ3eH0dNGRWmJmeY7tlMz14");
  gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest").then(function() {
    console.log("GAPI client loaded for API"); 
  }, function(err) {
    console.error("Error loading GAPI client for API", err);
  });
}

const form = document.getElementById("query");
form.addEventListener("submit", function(e) {
  e.preventDefault();
  execute(form.search.value);
})

function execute(data) {
  return gapi.client.youtube.search.list({
    "part": "snippet",
    "maxResults": 10,
    "order": "relevance",
    "q": data,
    "type": "video",
    "safeSearch": "none",
    "videoEmbeddable": "true",
  })
    .then(function(response) {
      var results = response.result.items;
      //console.log('SHOWING VIDEO RESULTS');
      document.getElementById('results').innerHTML = "<h3>Select a video to take notes on!</h3>";
      for (result of results) {
        //console.log('Video ID: ' + result.id.videoId);
        //console.log('Video Title: ' + result.snippet.title);
        document.getElementById('results').innerHTML += "<h2><a href=\"videonotes.html\">Title: " + result.snippet.title + "<\a><br>Video ID: " + result.id.videoId + "</h2>";
        document.getElementById('results').innerHTML += "<iframe class=\"video w100\" width=\"640\" height=\"360\" src=\"https://www.youtube.com/embed/" + result.id.videoId + "\" frameborder=\"0\" allowfullscreen></iframe>";
      }
    },
    function(err) {
      console.error("Execute error", err);
    });
}

