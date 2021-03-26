// TICKETMASTER EVENTS //
var searchInput = document.getElementById("search")
var searchButton = document.getElementById("fetch-button")

function getEvents(search) {
 var query = "https://app.ticketmaster.com/discovery/v2/events.json?keyword="+search+"&countryCode=US&apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0"

    
    $.ajax({
      type:"GET",
      url: query,
      async:true,
      dataType: "json",
      success: function(json) {
            getEvents.json = json;
                  console.log(json);
                  //append here//
               },
      error: function(xhr, status, err) {
                  console.log(err);
               }
    });
  }


  searchButton.addEventListener("click", function(event){
    event.preventDefault()  
    var newSearch = searchInput.value
      console.log(newSearch)
      getEvents(newSearch)
  })