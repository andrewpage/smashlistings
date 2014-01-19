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