var map = L.map('map').setView([42.359068001401006, -71.09147396226346], 13);

var vectorLayer = L.maplibreGL({
    style: 'https://tiles.openfreemap.org/styles/bright',
    attribution: '<a href="https://openfreemap.org">OpenFreeMap</a> '
        + '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

vectorLayer.getMaplibreMap().once('load', function () {
    // Bright splits POI symbols by rank and transit type. The airport layer
    // is separate from the poi source layer, so hide it as well.
    ['poi_r20', 'poi_r7', 'poi_r1', 'poi_transit', 'airport'].forEach(function (layerId) {
        vectorLayer.getMaplibreMap().setLayoutProperty(layerId, 'visibility', 'none');
    });
});

fetch('places.json')
    .then(response => response.json())
    .then(data => {
        places = data;
        places.forEach(place => {
            optionalDescription = "";
            if (place.description) {
                optionalDescription = place.description + '<br>';
            }
            websiteHostOnly = place.website.replace('https://', '')
            L.circleMarker([place.lat, place.lng], {
                radius: place.size,
                fillColor: '#000',
                color: '#000',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.8
            }).addTo(map)
                .bindTooltip(place.name, {
                    permanent: true,
                    opacity: 0.8,
                    direction: 'right',
                    offset: [10, 0]
                })
                .bindPopup('<div style="text-align: center;">'
                    + optionalDescription + '<a href="'
                    + place.pics + '" target="_blank">Pics</a>'
                    + '<br><a href="' + place.website + '" target="_blank">'
                    + websiteHostOnly + '</a></div>');
        });
    });
