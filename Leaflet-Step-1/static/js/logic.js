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

    // Create an array to hold location coordinates
    var locArray = [];

    // Resource for adding color https://leafletjs.com/examples/choropleth/
    function getColor(d) {
        return d > 100 ? '#800026' :
               d > 80  ? '#BD0026' :
               d > 70  ? '#E31A1C' :
               d > 50  ? '#FC4E2A' :
               d > 30  ? '#FD8D3C' :
               d >= 11 ? '#FEB24C' :
               d >= 0  ? '#FED976' :
                         '#FFEDA0';
    }

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
        color: getColor(location.coordinates[2]),
        // fillColor: color,
        // Adjust radius
        radius: location.coordinates[2] * 1500 // grabs the depth
    }).bindPopup("<h1>" + data.features[i].properties.place + "</h1> <hr> <h3>magnitude: " + data.features[i].properties.mag + "</h3>").addTo(myMap);
        
    }
    
    // // Set up the legend
    // var legend = L.control({ position: "bottomleft" });
    // legend.onAdd = function() {
    //   var div = L.DomUtil.create("div", "info legend");
    //   var limits = data.options.limits;
    //   var colors = data.options.colors;
    //   var labels = [];

    //   // Add min & max
    //   var legendInfo = `<h1>Median Income</h1>
    //     <div class="labels">
    //         <div class="min"> ${limits[0].toLocaleString(undefined,{style:'currency',currency:'USD',maximumSignificantDigits: 3})} </div>
    //         <div class="max"> ${limits[limits.length - 1].toLocaleString(undefined,{style:'currency',currency:'USD',maximumSignificantDigits: 4})} </div>
    //     </div>`;

    //   div.innerHTML = legendInfo;

    //   limits.forEach(function(limit, index) {
    //     labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    //   });

    //   div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    //   return div;
    // };

    // // Adding legend to the map
    // legend.addTo(myMap);
    
    
    

}).catch(err => console.log(err))