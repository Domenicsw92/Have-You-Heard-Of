// TICKETMASTER EVENTS //
var searchInput = document.getElementById("search")
var searchButton = document.getElementById("fetch-button")
var youTubeApiKey = "AIzaSyA_aUBZ0ohp4ghjhhCm5VzI4Y2lVpAdAq0"
var musixMatchAPIKey = "bd6f120abfaa3580f25b07958b74ed5c"


function getEvents(search) {
  var query = "https://app.ticketmaster.com/discovery/v2/events.json?size=5&keyword=" + search + "&countryCode=US&apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0"


  $.ajax({
    type: "GET",
    url: query,
    async: true,
    dataType: "json",
    success: function ({ _embedded }) {
      // getEvents.json = json;
      console.log(_embedded);
      //append here//
      var { events } = _embedded
      console.log("these are the events", events[0])
      for (i = 0; i < events.length; i++) {
        events[i];
        console.log(events[i].name)

        var cardBody = $("<div>").addClass("eventBody")
        var cardText = $("<h4>").text(events[i].name).addClass("event-Date")
        var eventDate = $("<p>").text(events[i].dates.initialStartDate.localDate).addClass("event-Date")
        //var eventPlace = $("<p>").text(events[i]._embedded.venues.city.name).addClass("event-Date")
       // var eventLink = events[i].url
        var eventBtn = $("<a></a>").attr("href", events[i].url).text("Get Tickets",)
        //.click(function () {  $(`[href="${eventLink}"]`).click()  } ).text("Get Tickets",).addClass("event-Date")

      
        cardText.append(eventDate, eventBtn)
        cardBody.append(cardText)


        $(".events").append(cardBody)

      }

    },

    error: function (xhr, status, err) {
      console.log(err);

    }
  })
  // .then(function (events) {

}

function loadClient() {
  gapi.client.setApiKey(youTubeApiKey);
  return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
      .then(function() { console.log("GAPI client loaded for API"); },
            function(err) { console.error("Error loading GAPI client for API", err); });
}
// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
  return gapi.client.youtube.search.list({
    "part": [
      "snippet"
    ],
    "q": searchInput.value
  })
      .then(function(response) {
              // Handle the results here (response.result has the parsed body).
              
              console.log("Response", response);
            },
            function(err) { console.error("Execute error", err); });
}
gapi.load("client:auth2", function() {
  gapi.client.init({ 'apiKey': youTubeApiKey,
})
.then(loadClient);
});

function getLyrics(searchInput) {

  $.ajax({
    type: "GET",
    url: "https://api.musixmatch.com/ws/1.1/artist.search?q_artist="+searchInput+"&apikey="+musixMatchAPIKey,
    headers: {"Access-Control-Allow-Origin":"*"},
    dataType: 'jsonp',
    success: function (data) {
      console.log(data);
    },
  //   error: function(xhr, status, err) {
  //     console.log(err);
  //     }  
  });
};

searchButton.addEventListener("click", function (event) {
  event.preventDefault()
  var newSearch = searchInput.value
  console.log(newSearch)
  getEvents(newSearch)
  getLyrics(newSearch)
  execute();
})