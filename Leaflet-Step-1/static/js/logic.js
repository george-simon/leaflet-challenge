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
d3.json(url).then(data => {
    console.log(data);

    // // // Create an array to hold location coordinates
    var locArray = [];

    // Loop through data
    for (var i = 0; i < data.features.length; i++) {
        var location = data.features[i].geometry;
        console.log(location);

        if (location) {
            locArray = [location.coordinates[1], location.coordinates[0]];
        }
    // Add circles to map
    L.circle(locArray, {
        fillOpacity: 0.75,
        color: "white",
        // fillColor: color,
        // Adjust radius
        radius: location.coordinates[2] * 1500 // grabs the depth
    }).bindPopup("<h1>" + data.features[i].place + "</h1> <hr> <h3>magnitude: " + data.features[i].mag + "</h3>").addTo(myMap);
        
    }
    

    
    

}).catch(err => console.log(err))