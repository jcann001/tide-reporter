var x = document.getElementById("lat");
var y = document.getElementById("long");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(addLatitude);
        navigator.geolocation.getCurrentPosition(addLongitude);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function addLatitude(position) {
    x.value += position.coords.latitude;
}

function addLongitude(position) {
    y.value += position.coords.longitude;
}


getLocation();