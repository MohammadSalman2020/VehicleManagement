var map;

function loadmap() {
    var latlng = new google.maps.LatLng(30.3753, 69.3451);
    var options = {
        zoom: 6,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map"), options);
}

function addMarker(lat, lng, vehicle, speed, driver, location, status) {
    var position = { lat: lat, lng: lng };

    // Define the custom marker image
    var icon = {
        url: 'icons8.png', // Replace with the URL of your custom marker image
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

    //infoWindow.open(map, marker);

    marker.addListener('click', function () {
        infoWindow.open(map, marker);
    });
}




function loadGoogleMaps() {
    // Callback function for Google Maps API script
    // Load the map once Google Maps API is loaded
    loadmap();
}
