var map;
var userLat;
var userLng;
var radius;
$(function() {	
	console.log("test");
	//$.getJSON('http://www.smashlistings.com/map_api?minLat=' + minLat + '&maxLat=' + maxLat + '&minLng=' + minLng + '&maxLng=' + maxLng, function (json) {
	$.ajax({
        url: 'http://www.smashlistings.com/map_api.json?minLat=0&maxLat=100&minLng=-200&maxLng=0',
        dataType: 'jsonp',
        success: function(json){
            work(json);
        }
    }).fail(function(jqxhr, textStatus, error) {
		alert("Error: " + jqxhr + " - " + error + " - " + textStatus);
	});
});
function work(json) {
	console.log("test");
	radius = 50;
	userLat=37.635397;
	userLng=-121.890543;
	var mapOptions = {
		center: new google.maps.LatLng(userLat, userLng),
		zoom: 4
	};
	map = new google.maps.Map(document.getElementById("map-canvas"),
		mapOptions);
	var minLat = userLat - changeInLatitude(radius);
	var maxLat = userLat + changeInLatitude(radius);
	var minLng = userLng - changeInLongitude(userLat, radius);
	var maxLng = userLng + changeInLongitude(userLat, radius);
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
			'<div id="siteNotice">' +
			'</div>' +
			'<h1 id="firstHeading" class="firstHeading">' +
			events[i].name + '</h1>' + 
			'<div id="bodyContent">' +
			'<p>' +
			'DESCRIPTION' + '</p>' + '<br />'
			'a href="http://www.smashlistings.com/events/' + 
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
		})(marker, i));
	}
}