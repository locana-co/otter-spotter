$(function () {

    //initialize the map
    mapboxgl.accessToken = config.mapboxgl.accessToken;
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9'
    });

    //on clicking button get all markers
    $('#getAll').click(function() {
        //hit api route that gets all of the points
        $.get('/api/points', function (data) {

            var features = [];

            //for each of the returned rows, create a new feature
            data.forEach(function(f) {
                var feature = {};
                feature.type = "Feature";
                //set up geometry to display data
                feature.geometry = {
                    "type": "Point",
                    "coordinates": [f.lng, f.lat]
                };
                feature.properties = {
                    //create feature properties to add to popup
                    'id' : f.id
                };
                features.push(feature);
            });

            map.addSource("points", {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features" : features
                }
            });

            //create a new layer from all of the source data
            map.addLayer({
                "id": "points",
                "type": "circle",
                "source": "points",
                //stylize the point data
                "paint": {
                    "circle-radius": 8,
                    "circle-color": 'red'
                }
            });

        }).fail(function() {

        });
    });


    // When a click event occurs near a polygon, open a popup at the location of
// the feature, with description HTML from its properties.
    map.on('click', function (e) {
        var features = map.queryRenderedFeatures(e.point, { layers: ['points'] });
        if (!features.length) {
            return;
        }

        var feature = features[0];

        var popup = new mapboxgl.Popup()
            .setLngLat(map.unproject(e.point))
            .setHTML(feature.properties.id)
            .addTo(map);
    });

});


