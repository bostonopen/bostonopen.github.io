var map = L.map('map').setView([42.359068001401006, -71.09147396226346], 13);

L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

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