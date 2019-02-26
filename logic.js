// Creating map object
var myMap = L.map("map", {
    center: [40.7128, -74.0059],
    zoom: 2
  });
  
  // Adding tile layer
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);
  

// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

function markerSize(mag) {
    return mag * 10000;
  }
  

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
    //console.log(data.features);
  });
  


// d3.json(queryUrl, function(data) {
// // Creating a geoJSON layer with the retrieved data
//     L.geoJson(data, {
//       style: function(feature) {
//         return {
//           color: "white",
//           fillOpacity: 0.5,
//           weight: 1.5
//         };
//       }
//     }).addTo(map);
// });

// Grab the data with d3
d3.json(queryUrl, function(data) {

    var locations = data.features
    console.log(locations)

    for (var i = 0; i < locations.length; i++) {
        var location = locations[i].geometry;
        var property = locations[i].properties;
        //console.log(location)

        var markers = L.circle([location.coordinates[1], location.coordinates[0]], {
            color: "red",
            fillColor: "green",
            fillOpacity: 0.50,
            //radius: 10000  
            radius: markerSize(property.mag)
        })
        .addTo(myMap).bindPopup("<h1>Magnitude: " + property.mag + "</h1> <hr> <h3>Location: " + property.place + "</h3>");
        //console.log(location.coordinates[1])
        
    }
    //myMap.addLayer(markers);  
  });
  
