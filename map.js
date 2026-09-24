var map = L.map('map').setView([42.359068001401006, -71.09147396226346], 13);

var vectorLayer = L.maplibreGL({
    style: 'https://tiles.openfreemap.org/styles/bright',
    attribution: '<a href="https://openfreemap.org">OpenFreeMap</a> '
        + '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var vectorMap = vectorLayer.getMaplibreMap();
vectorMap.once('load', function () {
    // Add shaded relief at world and regional scales. The vector style's
    // natural landcover takes over as the map zooms into the city.
    vectorMap.addSource('world-relief', {
        type: 'raster',
        tiles: ['https://tiles.openfreemap.org/natural_earth/ne2sr/{z}/{x}/{y}.png'],
        tileSize: 256,
        maxzoom: 6
    });
    vectorMap.addLayer({
        id: 'world-relief',
        type: 'raster',
        source: 'world-relief',
        minzoom: 0,
        maxzoom: 7,
        paint: {
            'raster-opacity': 0.65,
            'raster-fade-duration': 0
        }
    }, 'landcover-glacier');

    // Remove the basemap's POIs, including transit and airport labels.
    ['poi_r20', 'poi_r7', 'poi_r1', 'poi_transit', 'airport'].forEach(function (layerId) {
        vectorMap.setLayoutProperty(layerId, 'visibility', 'none');
    });

    // Remove roads, railways, paths, and other transportation lines so the
    // natural areas become the visual focus.
    vectorMap.getStyle().layers
        .filter(function (layer) {
            return layer['source-layer'] === 'transportation';
        })
        .forEach(function (layer) {
            vectorMap.setLayoutProperty(layer.id, 'visibility', 'none');
        });

    // Make the natural landcover easier to see after the roads are gone.
    vectorMap.setPaintProperty('park', 'fill-opacity', 0.75);
    vectorMap.setPaintProperty('landcover-grass', 'fill-opacity', 0.9);
    vectorMap.setPaintProperty('landcover-grass-park', 'fill-opacity', 0.9);
    vectorMap.setPaintProperty('landcover-wood', 'fill-opacity', 0.3);
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
