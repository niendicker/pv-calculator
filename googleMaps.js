
function calculate() {
  let address = "";
  if (document.getElementById("cidade").value !== "") {
    address = document.getElementById("cidade").value;
  } else {
    address = document.getElementById("cep").value;
  }
  
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({
    'address': address
  }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var Lat = results[0].geometry.location.lat();
      var Lng = results[0].geometry.location.lng();
      download(Lng, Lat);
    } else {
      alert("Localização inválida - " + status);
    }
  });
}

