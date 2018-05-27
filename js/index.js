var print = console.log.bind(console);
var cyclerIconURL = 'https://use.fontawesome.com/releases/v5.0.13/svgs/solid/bicycle.svg';
var walkerIconURL = 'https://use.fontawesome.com/releases/v5.0.13/svgs/solid/walking.svg';
var busIconURL ='https://use.fontawesome.com/releases/v5.0.13/svgs/solid/bus.svg';

document.cookie = "KineticYYC=abymoen; expires=Thu, 18 Dec 2029 12:00:00 UTC";

var map, infoWindow;
var directionsService;
var directionsDisplay;
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {center: {lat: 51.044352, lng: -114.061312},zoom: 16, styles:
    [
      {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
              {
                  "hue": "#7DC45C"
              },
              {
                  "saturation": 37
              },
              {
                  "lightness": -41
              },
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
      },
      {
        "featureType": "poi.business",
        "stylers": [
          {
            visibility: "off" }
        ]
      },
      {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
              {
                  "hue": "#AAAAAA"
              },
              {
                  "saturation": 15
              },
              {
                  "lightness": 15
              },
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
              {
                  "hue": "#71ABC3"
              },
              {
                  "saturation": -10
              },
              {
                  "lightness": -21
              },
              {
                  "visibility": "simplified"
              }
          ]
      }
  ]});

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer({map:map, preserveViewport: true});

  var walkerIcon = {
    url: walkerIconURL, // url
    scaledSize: new google.maps.Size(50, 50) // scaled size
  };

  var bicycleIcon = {
    url: cyclerIconURL, // url
    scaledSize: new google.maps.Size(50, 50) // scaled size
  };

  var busIcon = {
    url: busIconURL,
    scaledSize: new google.maps.Size(50, 50)
  }

  var walkers1 = new google.maps.Marker({
    position: {lat: 51.053132, lng: -114.075835},
    map: map,
    title: "Cool Walkers",
    icon: walkerIcon,
  });

  var walkInfoWindow = new google.maps.InfoWindow({content:'<h6>Group: </h6><p>Mid-day Strollers</p><h6>Meeting Time: </h6><p>3PM</p><h6>Intensity: </h6><p>Low</p><h6>Group Size: </h6><p>17 Members</p><div class="join-container"><p class="join-button">Join Group</p></div>'});
  walkers1.addListener('click', function() {
    walkInfoWindow.open(map, walkers1);
    displayRoute("WALKING",{lat: 51.053132, lng: -114.075835},{lat: 51.045854, lng: -114.058559});
  });

  var cyclers1 = new google.maps.Marker({
    position: {lat: 51.0426471, lng: -114.151061},
    map: map,
    title: "Awesome Cyclers",
    icon: bicycleIcon,
  });

  var bikeInfoWindow = new google.maps.InfoWindow({content:'<h6>Group: </h6><p>Morning Rollers</p><h6>Meeting Time: </h6><p>7AM</p><h6>Intensity: </h6><p>High</p><h6>Group Size: </h6><p>10 Members</p><div class="join-container"><p class="join-button">Join Group</p></div>'});
  cyclers1.addListener('click', function() {
    bikeInfoWindow.open(map, cyclers1);
    displayRoute("BICYCLING",{lat: 51.0426471, lng: -114.151061},{lat: 51.045854, lng: -114.058559});
  });

  var bus1 = new google.maps.Marker({
    position: {lat: 51.0340405, lng: -114.0809093},
    map: map,
    title: "Cool Walkers",
    icon: busIcon,
  });

  var busInfoWindow = new google.maps.InfoWindow({content:'<h6>Group: </h6><p>Connaught School Walking Bus</p><h6>Meeting Time: </h6><p>8AM</p><h6>Intensity: </h6><p>Low</p><h6>Group Size: </h6><p>35 Members</p><div class="join-container"><p class="join-button">Join Group</p></div>'});
  bus1.addListener('click', function() {
    busInfoWindow.open(map, bus1);
    displayRoute("WALKING",{lat: 51.0340405, lng: -114.0809093},{lat: 51.0418444, lng: -114.0880601});
    createBusStops();
  });

  var markerZoomLevel = "close";
  google.maps.event.addListener(map, 'zoom_changed', function() {
    var currentZoom = map.getZoom()

    if (currentZoom > 15 && markerZoomLevel === "close") {
      markerZoomLevel = "far";
      walkers1.setIcon(walkerIcon = {
        url: walkerIconURL,
        scaledSize: new google.maps.Size(50, 50),
      });
      cyclers1.setIcon(bicycleIcon = {
        url: cyclerIconURL,
        scaledSize: new google.maps.Size(50, 50),
      });
    } else if (currentZoom <= 15 && markerZoomLevel === "far") {
      markerZoomLevel = "close";
      walkers1.setIcon(walkerIcon = {
        url: walkerIconURL,
        scaledSize: new google.maps.Size(25, 25)
      });
      cyclers1.setIcon(bicycleIcon = {
        url: cyclerIconURL,
        scaledSize: new google.maps.Size(25, 25)
      });
    }
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

body = document.getElementsByTagName("html");

window.onload = function() {
  document.getElementById('map').style.height = body[0].clientHeight + "px";
  document.getElementById('map').style.width = body[0].clientWidth + "px";
}

window.addEventListener("resize",resizeFunction);
function resizeFunction() {
  document.getElementById('map').style.height = body[0].clientHeight + "px";
  document.getElementById('map').style.width = body[0].clientWidth + "px";
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

function checkCookie() {
    var username = getCookie("KineticYYC");
    if (username == "") {
      return true;
    } else {
      return false;
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

var timeout;
if (checkCookie()) {
  timeout = setTimeout(pushDown, 500);
  document.getElementById("modalLRContent").style.visibility = "hidden";
  $('#modalLRForm').modal('show');
} else {

}

function pushDown(ele) {
  document.getElementById("modalLRContent").style.marginTop = (body[0].clientHeight*0.5 - $('#modalLRContent').height()*0.5) + "px";
  setInterval(move, 10);
  var x = 0;
  document.getElementById("modalLRContent").style.opacity = 0;
  document.getElementById("modalLRContent").style.visibility = "visible"
  function move() {
    if (x >= 1) {
      clearInterval(timeout);
    } else {
      document.getElementById("modalLRContent").style.opacity = x;
      x += 0.06;
    }
  }
}

function displayRoute(method, start, finish) {
  if (directionsDisplay != null) {
    directionsDisplay.setMap(null);
    directionsDisplay = null;
  }
 directionsDisplay = new google.maps.DirectionsRenderer({map:map, preserveViewport: true, suppressMarkers: true});
  var request = {
    origin:start,
    destination: finish,
    travelMode: method
  };
  directionsService.route(request, function(result, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(result);
    }
  });
}

function createBusStops() {
  busStop1 = new google.maps.Marker({
    position: {lat: 51.034503, lng: -114.084380},
    map: map,
  });
  busStopInfoWindowOne = new google.maps.InfoWindow({content:'<h6>Stop Number:</h6><p>One</p>'});
  busStop1.addListener('click', function() {
    busStopInfoWindowOne.open(map, busStop1);
  });

  busStop2 = new google.maps.Marker({
    position: {lat: 51.036129, lng: -114.084380},
    map: map,
  });
  busStopInfoWindowTwo = new google.maps.InfoWindow({content:'<h6>Stop Number:</h6><p>Two</p>'});
  busStop2.addListener('click', function() {
    busStopInfoWindowTwo.open(map, busStop2);
  });

  busStop3 = new google.maps.Marker({
    position: {lat: 51.039221, lng: -114.084090},
    map: map,
  });
  busStopInfoWindowThree = new google.maps.InfoWindow({content:'<h6>Stop Number:</h6><p>Three</p>'});
  busStop3.addListener('click', function() {
    busStopInfoWindowThree.open(map, busStop3);
  });

  busStop4 = new google.maps.Marker({
    position: {lat: 51.041995, lng: -114.083972},
    map: map,
  });
  busStopInfoWindowFour = new google.maps.InfoWindow({content:'<h6>Stop Number:</h6><p>Four</p>'});
  busStop4.addListener('click', function() {
    busStopInfoWindowFour.open(map, busStop4);
  });
}
