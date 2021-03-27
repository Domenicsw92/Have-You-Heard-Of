// TICKETMASTER EVENTS //
var searchInput = document.getElementById("search")
var searchButton = document.getElementById("fetch-button")

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



searchButton.addEventListener("click", function (event) {
  event.preventDefault()
  var newSearch = searchInput.value
  console.log(newSearch)
  getEvents(newSearch)
})