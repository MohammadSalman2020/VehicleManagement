var map;

function loadmap() {
    // Define the center coordinates and map options
    var latlng = new google.maps.LatLng(30.3753, 69.3451);
    var options = {
        zoom: 6,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
            { elementType: 'labels', stylers: [{ visibility: 'on' }] }
        ]
    };

    // Create a new Google Map instance
    map = new google.maps.Map(document.getElementById("map"), options);

   

    // Uncomment the following lines if you want to add a polygon to the map
    // var polygonCoordinates = [
    //     { lat: 25.774, lng: -80.19 },
    //     { lat: 18.466, lng: -66.118 },
    //     { lat: 32.321, lng: -64.757 },
    //     { lat: 25.774, lng: -80.19 }
    // ];
    // addPolygon(polygonCoordinates);
}

function addMarker(lat, lng, vehicle, speed, driver, location, status) {
    var position = { lat: lat, lng: lng };

    // Define the custom marker image
    var icon = {
        url: 'truck.png', // Replace with the URL of your custom marker image
        scaledSize: new google.maps.Size(50, 50), // Adjust the size of the marker image as needed
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(25, 50) // Adjust the anchor point of the marker image as needed
    };

    var marker = new google.maps.Marker({
        position: position,
        map: map,
        icon: icon // Set the custom marker image
    });

    // Create an info window with the provided content and custom styling
    var infoWindowContent = '';
    if (status == "Driving") {
        infoWindowContent = '<div  style="background-color: #228B22;font-size:12px;font-weight:bold;width:auto; color: white; padding: 10px; margin:0px;">' + vehicle + ' speed: ' + speed + ' <br/><div style="color:orange;"> Driver:' + driver + '</div><div style="color:orange">Location:' + location + ' </div><div style="color:orange">Status:' + status + '</div> </div>'; // Custom styling for the content
    } else {
        infoWindowContent = '<div  style="background-color: red;font-size:12px;font-weight:bold;width:auto; color: white; padding: 10px; margin:0px;">' + vehicle + ' speed: ' + speed + ' <br/><div style="color:blue;"> Driver:' + driver + '</div><div style="color:blue">Location:' + location + ' </div><div style="color:blue">Status:' + status + '</div> </div>'; // Custom styling for the content
    }

    var infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent
    });

    // infoWindow.open(map, marker);

    marker.addListener('click', function () {
        infoWindow.open(map, marker);
        map.setZoom(15);
        map.setCenter(marker.getPosition());
    });
}
function addpoint(lat, lng, description) {
    var position = { lat: lat, lng: lng };

    // Define the custom marker image
    var icon = {
        url: 'truck.png', // Replace with the URL of your custom marker image
        scaledSize: new google.maps.Size(50, 50), // Adjust the size of the marker image as needed
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(25, 50) // Adjust the anchor point of the marker image as needed
    };

    var marker = new google.maps.Marker({
        position: position,
        map: map,
        icon: icon // Set the custom marker image
    });

    // Create an info window with the provided content and custom styling
    var infoWindowContent = description;
    //if (status == "Driving") {
    //    infoWindowContent = '<div  style="background-color: #228B22;font-size:12px;font-weight:bold;width:auto; color: white; padding: 10px; margin:0px;">' + vehicle + ' speed: ' + speed + ' <br/><div style="color:orange;"> Driver:' + driver + '</div><div style="color:orange">Location:' + location + ' </div><div style="color:orange">Status:' + status + '</div> </div>'; // Custom styling for the content
    //} else {
    //    infoWindowContent = '<div  style="background-color: red;font-size:12px;font-weight:bold;width:auto; color: white; padding: 10px; margin:0px;">' + vehicle + ' speed: ' + speed + ' <br/><div style="color:blue;"> Driver:' + driver + '</div><div style="color:blue">Location:' + location + ' </div><div style="color:blue">Status:' + status + '</div> </div>'; // Custom styling for the content
    //}

    var infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent
    });

     infoWindow.open(map, marker);

    marker.addListener('click', function () {
        infoWindow.open(map, marker);
        map.setZoom(15);
        map.setCenter(marker.getPosition());
    });
}
function addPolygon(coordinates) {
    var paths = coordinates.map(coord => new google.maps.LatLng(coord.lat, coord.lng));

    var polygon = new google.maps.Polygon({
        paths: paths,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
    });

    polygon.setMap(map);
}


function searchMarker(lat, lng) {
    var latLng = new google.maps.LatLng(lat, lng);

    map.setCenter(latLng);
    map.setZoom(15); // Adjust zoom level as needed

    //// Create a marker at the searched location
    //var marker = new google.maps.Marker({
    //    position: latLng,
    //    map: map
    //});

    // Optionally, you can add an info window to the marker
    var infoWindow = new google.maps.InfoWindow({
        content: "Marker Position: " + lat + ", " + lng
    });

    // Open the info window at the searched location
    //infoWindow.open(map, marker);
}


// Example of searching for a marker with lat and lng parameters
function searchMarkerWithLatLong(lat, lng) {
    searchMarker(lat, lng);
}

function loadGoogleMaps() {
    // Callback function for Google Maps API script
    // Load the map once Google Maps API is loaded
    loadmap();
}
