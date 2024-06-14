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


function normalizeAngle(angle) {
    // If angle is greater than or equal to 360, subtract 360 until it's less than 360
    while (angle >= 360) {
        angle -= 360;
    }

   

    return angle;
}
function convertToThreeDigit(number) {
    if (number < 10) {
        return "00" + number;
    } else if (number < 100) {
        return "0" + number;
    } else {
        return "" + number;
    }
}
window.addMarker = function (data) {
    var markersData = JSON.parse(data);
    var currentOpenInfoWindow = null;
    var markers = [];
    var map = window.map; // Assuming the map variable is globally accessible

    markersData.forEach(function (markerData) {
        var position = { lat: markerData.lat, lng: markerData.lng };

        var icon = {
            url: 'Truck/image_' + convertToThreeDigit(normalizeAngle(markerData.directionAngle)) + '.png',
            scaledSize: new google.maps.Size(30, 30),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(15, 15),
        };

        var marker = new google.maps.Marker({
            position: position,
            map: map,
            icon: icon,
        });

        var infoWindowContent = '';
        if (markerData.status.includes("Driving")) {
            infoWindowContent = '<div style="background-color: #228B22;font-size:12px;font-weight:bold;width:auto; color: white; padding: 10px; margin:0px;">' + markerData.vehicle + ' speed: ' + markerData.speed + ' <br/><div style="color:orange;"> Driver:' + markerData.driver + '</div><div style="color:orange">Location:' + markerData.location + ' </div><div style="color:orange">Status:' + markerData.status + '</div> </div>';
        } else {
            infoWindowContent = '<div style="background-color: red;font-size:12px;font-weight:bold;width:auto; color: white; padding: 10px; margin:0px;">' + markerData.vehicle + ' speed: ' + markerData.speed + ' <br/><div style="color:blue;"> Driver:' + markerData.driver + '</div><div style="color:blue">Location:' + markerData.location + ' </div><div style="color:blue">Status:' + markerData.status + '</div> </div>';
        }

        var infoWindow = new google.maps.InfoWindow({
            content: infoWindowContent
        });

        marker.addListener('click', function () {
            if (currentOpenInfoWindow) {
                currentOpenInfoWindow.close();
            }
            infoWindow.open(map, marker);
            currentOpenInfoWindow = infoWindow;
        });

        markers.push(marker);
    });

    // Initialize MarkerClusterer with adjusted options
    var markerCluster = new MarkerClusterer(map, markers, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
        gridSize: 50, // Adjust the size of the grid for clustering
        minimumClusterSize: 2 // Minimum number of markers to form a cluster
    });
};





function addpoint(points) {
    // Define an array to store all markers
    var markers = [];
    // Variable to keep track of the currently open info window
    var currentOpenInfoWindow = null;

    // Iterate over each point
    points.forEach(function (point) {
        var position = { lat: point.lat, lng: point.lng };

        // Define the custom marker image
        var icon = {
            url: 'pump.png', // Replace with the URL of your custom marker image
            scaledSize: new google.maps.Size(20, 20), // Adjust the size of the marker image as needed
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(25, 50) // Adjust the anchor point of the marker image as needed
        };

        var marker = new google.maps.Marker({
            position: position,
            map: map,
            icon: icon // Set the custom marker image
        });

        // Push the marker to the array
        markers.push(marker);

        // Create an info window with the provided content
        var infoWindow = new google.maps.InfoWindow({
            content: point.description
        });

        marker.addListener('click', function () {
            // Close the currently open InfoWindow if it exists
            if (currentOpenInfoWindow) {
                currentOpenInfoWindow.close();
            }
            // Open the new InfoWindow
            infoWindow.open(map, marker);
            // Update the reference to the currently open InfoWindow
            currentOpenInfoWindow = infoWindow;
        });
    });

    // Optional: fit the map bounds to contain all markers
    var bounds = new google.maps.LatLngBounds();
    markers.forEach(function (marker) {
        bounds.extend(marker.getPosition());
    });
    map.fitBounds(bounds);
}

function addPolygon(coordinates) {
    // Sort coordinates based on longitude
    coordinates.sort((a, b) => a.lng - b.lng);

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


// pushNotifications.js

// Request permission for push notifications
function requestPushNotificationPermission() {
    return new Promise((resolve, reject) => {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                resolve(true);
                console.log(permission)
            } else {
                reject(new Error('Permission for push notifications denied'));
                console.log("Error")
            }
        });
    });
}


function getDeviceToken() {
    console.log("Getting device token...");
    return new Promise((resolve, reject) => {
        navigator.serviceWorker.ready.then(registration => {
            console.log("Service worker ready.");
            registration.pushManager.getSubscription().then(subscription => {
                if (subscription) {
                    const deviceKey = subscription.endpoint;
                    console.log("Device token:", deviceKey);
                    resolve(deviceKey);
                } else {
                    console.log("No subscription found.");
                    reject(new Error('No subscription found'));
                }
            }).catch(error => {
                console.error("Error obtaining subscription:", error);
                reject(error);
            });
        }).catch(error => {
            console.error("Error obtaining service worker registration:", error);
            reject(error);
        });
    });
}


function LoadLocationMap() {
    var latlng = new google.maps.LatLng(30.3753, 69.3451);
    var options = {
        zoom: 6,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
            { elementType: 'labels', stylers: [{ visibility: 'on' }] }
        ]
    };

    map = new google.maps.Map(document.getElementById("mapDiv"), options);

    // Add event listener for double-click on the map
   

    // Add event listener for right-click on the map
    map.addListener('rightclick', async function (event) {
        var latitude = event.latLng.lat();
        var longitude = event.latLng.lng();
        document.getElementById("Lati").value = latitude;
        document.getElementById("Longi").value = longitude;

        const apiKey = 'AIzaSyA0WrdLe-pQk18WGZ4C8y6DqhaHHjUH1og'; // Replace with your Google Maps API Key
        try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`);
            const data = await response.json();

            if (data.status === "OK") {
                const addressComponents = data.results[0].address_components;
                const cityComponent = addressComponents.find(component => component.types.includes("locality"));

                if (cityComponent) {
                    sessionStorage.setItem('CityName', cityComponent.long_name);
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }

        sessionStorage.setItem('lat', latitude);
        sessionStorage.setItem('long', longitude);

        DotNet.invokeMethodAsync('VehicleManagement', 'StateHasChanged');
    });


    // Add event listener for click on the map
    map.addListener('click', function (event) {
        // Handle click event if needed
    });
}

async function getCityNameFromLatLng(latitude, longitude) {
    const apiKey = 'AIzaSyA0WrdLe-pQk18WGZ4C8y6DqhaHHjUH1og'; // Replace with your Google Maps API Key
    try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`);
        const data = await response.json();

        if (data.status === "OK") {
            const addressComponents = data.results[0].address_components;
            const cityComponent = addressComponents.find(component => component.types.includes("locality"));

            if (cityComponent) {
                return cityComponent.long_name;
            } else {
                console.error('City not found in the response');
                return null;
            }
        } else {
            console.error('Geocoding API returned an error:', data.status);
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}
window.getCityNameFromLatLng = getCityNameFromLatLng;
window.createPolygon = function () {
    // Get latitude and longitude from textboxes
    var latitude = parseFloat(document.getElementById("Lati").value);
    var longitude = parseFloat(document.getElementById("Longi").value);

    // Validate latitude and longitude
    if (isNaN(latitude) || isNaN(longitude)) {
        // Show error message or handle invalid input
        return;
    }

    // Convert latitude and longitude to a Google Maps LatLng object
    var center = new google.maps.LatLng(latitude, longitude);

    // Define circle options
    var circleOptions = {
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map: map,
        center: center,
        radius: 250 // Radius in meters
    };

    // Create circle overlay
    var circle = new google.maps.Circle(circleOptions);

    // Convert circle to polygon
    var circleCoords = [];
    var circleBounds = circle.getBounds();
    var northEast = circleBounds.getNorthEast();
    var southWest = circleBounds.getSouthWest();

    // Generate circle coordinates
    for (var i = 0; i < 360; i += 10) {
        var angle = i * Math.PI / 180;
        var x = center.lng() + circleOptions.radius * Math.cos(angle) / (111111 * Math.cos(center.lat() * Math.PI / 180));
        var y = center.lat() + circleOptions.radius * Math.sin(angle) / 111111;
        circleCoords.push({ lat: y, lng: x });
    }

    // Create polygon
    var polygon = new google.maps.Polygon({
        paths: circleCoords,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map: map
    });

    // Focus on the polygon's center
    map.setCenter(center);
    map.setZoom(14); // Adjust the zoom level as needed to fit the polygon within the map viewport

};

window.addGlobalKeydownListener = function (dotNetObject) {
    window.onkeydown = function (event) {
        if (event.key === 'F2') {
            event.preventDefault();
            dotNetObject.invokeMethodAsync('OnF2Press');
        } else if (event.key === 'F1') {
            event.preventDefault();
            dotNetObject.invokeMethodAsync('OnF1Press');
        }
        else if (event.key === 'F3') {
            event.preventDefault();
            dotNetObject.invokeMethodAsync('OnF3Press');
        }
        
    };
};

window.removeGlobalKeydownListener = function (dotNetObject) {
    window.onkeydown = null;
};


window.focusElement = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
        element.focus();
    }
};


