// Distances are measured in miles.
// Longitudes and latitudes are measured in degrees.
// Earth is assumed to be perfectly spherical

var earthRadius = 3960.0;
var degreesToRadians = Math.PI/180.0;
var radiansToDegrees = 180.0/Math.PI;
var geocoder;
function changeInLatitude(miles) {
	return (miles/earthRadius) * radiansToDegrees;
}
function changeInLongitude(latitude, miles) {
	var r = earthRadius * Math.cos(latitude * degreesToRadians);
	return (miles/r) * radiansToDegrees;
}
function distance(lat1, lat2, lng1, lng2) {
	var dLat = (lat2-lat1).toRad();
	var dLng = (lng2-lng1).toRad();
	var lat1 = lat1.toRad();
	var lat2 = lat2.toRad();

	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
	        Math.sin(dLng/2) * Math.sin(dLng/2) * Math.cos(lat1) * Math.cos(lat2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c;
	return d;
}

var map;
var geocoder;
var userLat;
var userLng;
var radius;
function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(38.725968, -97.942058);
  var mapOptions = {
    zoom: 4,
    center: latlng
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);
function update() {
	//$.getJSON('http://www.smashlistings.com/map_api?minLat=' + minLat + '&maxLat=' + maxLat + '&minLng=' + minLng + '&maxLng=' + maxLng, function (json) {
	var address = document.getElementById("address").value;
	geocoder.geocode( {'address' : address}, function(results, status) {
		userLat = results[0].geometry.location.latitude;
		userLng = results[0].geometry.location.longitude;
	});
	radius = document.getElementById("radius").value;
	console.log(userLat);
	var minLat = userLat - changeInLatitude(radius);
	var maxLat = userLat + changeInLatitude(radius);
	var minLng = userLng - changeInLongitude(userLat, radius);
	var maxLng = userLng + changeInLongitude(userLat, radius);
	var url = 'http://www.smashlistings.com/map_api?minLat=' + minLat + '&maxLat=' + maxLat + '&minLng=' + minLng + '&maxLng=' + maxLng;
	$.ajax({
        url: url,
        dataType: 'json',
        success: function(json){
            work(json);
        }
    }).fail(function(jqxhr, textStatus, error) {
		alert("Error: " + jqxhr + " - " + error + " - " + textStatus);
	});
}



function work(json) {
	console.log("TEST");
	var events = new Array();
	$.each(json, function (i, event) {
		events.push(event);
	})
	var marker;
	var string;
	var strings = new Array();
	var infoWindow = new google.maps.InfoWindow;

	var lat1 = userLat;
	var lng1 = userLng;
	var lat2;
	var lng2;

	for (var i = 0; i < events.lenth; ++i) {
		lat2 = events[i].latitude;
		lng2 = events[i].longitude;
		if (distance(lat1, lat2, lng1, lng2) > radius) {
			events = events.splice(index, i);
			--i;
		}
	}

	for (var i = 0; i < events.length; ++i) {
		marker = new google.maps.Marker({
			map: map,
			position: new google.maps.LatLng(events[i].latitude, events[i].longitude),
			title: events[i].name
		});
		string = '<div id="content">' +
			//'<div id="siteNotice">' +
			//'</div>' +
			'<h1 id="firstHeading" class="firstHeading">' +
			events[i].name + '</h1>' + 
			'<div id="bodyContent">' +
			'<p>' +
			events[i].time + '</p>' + '<br />'
			'<a href="http://www.smashlistings.com/events/' + 
			events[i].id + '">' +
			'LINK' +
			'</a>' +
			'</div>' + 
			'</div>';
		strings.push(string);
		google.maps.event.addListener(marker, 'click', (function(marker, i) {
			return function() {
				infoWindow.setContent(strings[i]);
				infoWindow.open(map, marker);
			}
		}));
	}
	console.log("TEST");
	//  Make an array of the LatLng's of the markers you want to show
	//  Create a new viewpoint bound
	var bounds = new google.maps.LatLngBounds ();
	bounds.extend (userLat, userLng);
	//  Go through each...
	for (var i = 0; i < events.length; i++) {
	  //  And increase the bounds to take this point
	  bounds.extend (new google.maps.LatLng(events[i].latitude, events[i].longitude));
	}
	//  Fit these bounds to the map
	map.fitBounds (bounds);
}
