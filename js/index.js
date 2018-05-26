var print = console.log.bind(console)

document.cookie = "KineticYYC=abymoen; expires=Thu, 18 Dec 2029 12:00:00 UTC";

var map, infoWindow;
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

  var cyclers1 = new google.maps.Marker({
    position: {lat: 51.054008, lng: -114.071459},
    map: map,
    title: "Awesome Cyclers",
    icon: 'https://www.shareicon.net/data/128x128/2016/01/07/699407_sports_512x512.png',
    scale: 0.5
  });

  var walkers1 = new google.maps.Marker({
    position: {lat: 51.053132, lng: -114.075835},
    map: map,
    title: "Cool Walkers",
    icon: 'http://freeflaticons.com/wp-content/uploads/2014/09/silhouette-copy-14117977314g8kn.png',
    scale: 0.5
  })

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
    if (username != "") {
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

if (checkCookie()) {
  console.log("IF TAKEN");
  $('#modalLRForm').modal('show');
} else {
  console.log("IF NOT TAKEN");
}
