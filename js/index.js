var print = console.log.bind(console)
var cyclerIconURL = 'https://use.fontawesome.com/releases/v5.0.13/svgs/solid/bicycle.svg'
var walkerIconURL = 'https://use.fontawesome.com/releases/v5.0.13/svgs/solid/walking.svg'

document.cookie = "KineticYYC=abymoen; expires=Thu, 18 Dec 2029 12:00:00 UTC";

var map, infoWindow;
var directionsService;
var directionsDisplay;
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {center: {lat: 51.044352, lng: -114.061312},zoom: 15, styles:
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
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
              {
                  "hue": "#FFFFFF"
              },
              {
                  "saturation": -100
              },
              {
                  "lightness": 100
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

  var walkerIcon = {
    url: walkerIconURL, // url
    scaledSize: new google.maps.Size(50, 50) // scaled size
  };

  var bicycleIcon = {
    url: cyclerIconURL, // url
    scaledSize: new google.maps.Size(50, 50) // scaled size
  };

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer({map:map});
  displayRoute();

  var walkers1 = new google.maps.Marker({
    position: {lat: 51.053132, lng: -114.075835},
    map: map,
    title: "Cool Walkers",
    icon: walkerIcon,
  });

  var walkInfoWindow = new google.maps.InfoWindow({content:"Walking Group"});
  walkers1.addListener('click', function() {
    walkInfoWindow.open(map, walkers1);
  });

  var cyclers1 = new google.maps.Marker({
    position: {lat: 51.053840, lng: -114.074253},
    map: map,
    title: "Awesome Cyclers",
    icon: bicycleIcon,
  });

  var bikeInfoWindow = new google.maps.InfoWindow({content:"Biking Group"});
  cyclers1.addListener('click', function() {
    bikeInfoWindow.open(map, cyclers1);
  });

  var markerZoomLevel = "close";
  google.maps.event.addListener(map, 'zoom_changed', function() {
    var currentZoom = map.getZoom()

    if (currentZoom > 15 && markerZoomLevel === "close") {
      markerZoomLevel = "far";
      walkers1.setIcon(bicycleIcon = {
        url: cyclerIconURL,
        scaledSize: new google.maps.Size(50, 50),
      });
      cyclers1.setIcon(bicycleIcon = {
        url: cyclerIconURL,
        scaledSize: new google.maps.Size(50, 50),
      });
    } else if (currentZoom <= 15 && markerZoomLevel === "far") {
      markerZoomLevel = "close";
      walkers1.setIcon(bicycleIcon = {
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

} else {
  timeout = setTimeout(pushDown, 500);
  document.getElementById("modalLRContent").style.visibility = "hidden";
  $('#modalLRForm').modal('show');
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

function displayRoute() {
  var request = {
    origin:{lat: 51.053132, lng: -114.075835},
    destination: {lat: 51.053840, lng: -114.074253},
    travelMode: 'WALKING'
  };
  directionsService.route(request, function(result, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(result);
    }
  });
}
