mapboxgl.accessToken = map_token;

const map = new mapboxgl.Map({
  container: 'map', // container ID
  center: listing.geometry.coordinates, // [lng, lat]
  zoom: 9 // starting zoom
});

// Create popup
const popup = new mapboxgl.Popup({ offset: 25 })
  .setHTML(`<h4>${listing.title}</h4><p>you will be assured here </p>`);

// Create marker and attach popup to it
const marker = new mapboxgl.Marker()
  .setLngLat(listing.geometry.coordinates)
  .setPopup(popup) // associate the popup with the marker
  .addTo(map); // add the marker to the map
