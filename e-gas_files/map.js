function mapLocation() {
  var directionsDisplay;
  var directionsService = new google.maps.DirectionsService();
  var map;
  var infowindow;
  var infoBox = [];
  var markers = [];
  var idInfoBoxAberto;

  function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer({
      suppressMarkers: true
    });
    var Recife = new google.maps.LatLng(-8.053382, -34.927581);
    var mapOptions = {
      zoom: 11,
      center: Recife
    };
    map = new google.maps.Map(document.getElementById('mapa'), mapOptions);
    infowindow = new google.maps.InfoWindow();
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById("trajeto-texto"));
    //google.maps.event.addDomListener(document.getElementById('calcularRota'), 'click', calcRoute);
    calcRoute();
  }

  function abrirInfoBox(id, marker) {
    if (typeof(idInfoBoxAberto) == 'number' && typeof(infoBox[idInfoBoxAberto]) == 'object') {
      infoBox[idInfoBoxAberto].close();
    }

    infoBox[id].open(map, marker);
    idInfoBoxAberto = id;
  }

  function calcRoute() {
    var start = new google.maps.LatLng(-8.039963, -34.894049);
    var end = new google.maps.LatLng(-8.045838, -34.890299);
    

    var request = {
      origin: start,
      destination: end,
      waypoints: [],
      travelMode: google.maps.TravelMode.DRIVING
    };

    $.getJSON('js/points.json', function(pontos) {
      var p=0;
      while(p<pontos.length){
         request.waypoints.push({
                location: new google.maps.LatLng(pontos[p].Latitude, pontos[p].Longitude)
              });
         p++;
       }
    });


    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        directionsDisplay.setMap(map);

        var startLocation = new Object();
        var endLocation = new Object();
        var waypointLocations = [];

        // Display start and end markers for the route.
        var legs = response.routes[0].legs;
        for (i = 0; i < legs.length; i++) {
          if (i == 0) {
            startLocation.latlng = legs[i].start_location;
            startLocation.address = legs[i].start_address;
            // createMarker(legs[i].start_location, "start", legs[i].start_address, "green");
          }
          if (i != 0) {
            var waypoint = {};
            waypoint.latlng = legs[i].start_location;
            waypoint.address = legs[i].start_address;
            waypointLocations.push(waypoint);
          }
          if (i == legs.length - 1) {
            endLocation.latlng = legs[i].end_location;
            endLocation.address = legs[i].end_address;
          }
          var steps = legs[i].steps;
        }
        createMarker(endLocation.latlng, "Fim", "Texto para o fim da rota", "chegou2.png")
        createMarker(startLocation.latlng, "Início", "Texto para o início da rota", "marker.png");
        //for (var i = 0; i < waypointLocations.length; i++) {
          //createMarker(waypointLocations[0].latlng, "waypoint " + 1, "Texto para o marcador" + 1, "student.png");
          //createMarker(waypointLocations[1].latlng, "waypoint " + 2, "Texto para o marcador" + 2, "house.png");
        //}
        $.getJSON('js/points.json', function(pontos) {
          for (var i = 0; i < waypointLocations.length; i++) {
              if (pontos[i].Parada=="Embarque") {
                createMarker(waypointLocations[i].latlng, pontos[i].Aluno, "Embarcou", "studentIn.png");
              }else if(pontos[i].Parada=="Desembarque") {
                createMarker(waypointLocations[i].latlng, pontos[i].Aluno, "Desembarcou", "studentOut.png");
              }else if(pontos[i].Parada=="Colegio") {
                createMarker(waypointLocations[i].latlng, "Colégio Tal", "Os alunos do colegio tal desembarcaram", "colegio.png");
              };
           }
        });

      } else {
        alert("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
      }
    });
  }


  function createMarker(latlng, label, html, url) {
    var contentString = '<b>' + label + '</b><br>' + html;
    var marker = new google.maps.Marker({
      position: latlng,
      map: map,
      icon: url,
      title: label,
      zIndex: Math.round(latlng.lat() * -100000) << 5
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(contentString);
      infowindow.open(map, marker);
    });
  }
  google.maps.event.addDomListener(window, 'load', initialize);
}


// http://www.google.com/mapfiles/markerB.png


mapLocation();