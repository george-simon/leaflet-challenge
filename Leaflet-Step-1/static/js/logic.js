// Create a map object
var myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 3
  });
  
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
tileSize: 512,
maxZoom: 18,
zoomOffset: -1,
id: "mapbox/streets-v11",
accessToken: API_KEY
}).addTo(myMap);

// Store API query variables
var baseURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Assemble API query URL
var url = baseURL
 
// Grab the data with d3
d3.json(url).then(response => {
    // console.log(response);

    // // Create an array to hold location coordinates
    var locArray = [];

    // Loop through data
    for (var i = 0; i < response.length; i++) {
        var location = response[i].location;
        console.log(response[i].location);
        // Set the data location property to a variable
        

        // Add circles to map
        L.circle(response[i].location, {
          fillOpacity: 0.75,
          color: "white",
          fillColor: color,
          // Adjust radius
          radius: response[i].points * 1500
        }).bindPopup("<h1>" + response[i].place + "</h1> <hr> <h3>magnitude: " + response[i].mag + "</h3>").addTo(myMap);

    }

});