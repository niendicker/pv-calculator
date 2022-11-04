
//const irradianceParameters = {startDate:"20120101", endDate:"20220101", format:"CSV"};
function download(Lng, Lat) {
  let urlBase = "https://power.larc.nasa.gov/api/temporal/daily/point?";
  let parameters = "parameters=" + "ALLSKY_SFC_SW_DWN" + ",ALLSKY_SFC_SW_DIFF" + ",ALLSKY_SRF_ALB"; //T2M,WS10M,WD10M";
  let community = "community=" + "RE";
  let lon = "longitude=" + Lng;
  let lat = "latitude=" + Lat;
  let startDate = "start=" + (new Date().getFullYear() - 10) + "0101"; //10 years of data
  let endDate = "end=" + new Date().getFullYear() + "0101";
  let format = "format=CSV";

  let request = 
  urlBase + parameters + "&" + community + "&" + lon + "&" + lat + "&" + startDate + "&" + endDate + "&" + format;

  //fetch("https://power.larc.nasa.gov/api/temporal/daily/point?parameters=ALLSKY_SFC_SW_DWN,T2M,WS10M,WD10M&community=RE&longitude=-53.5205&latitude=-26.6006&start=20120101&end=20220101&format=CSV")
  fetch(request)
    .then( response => response.text() )
    .then( text => {
      localStorage.setItem("data", text);
      parseNasaCsv(localStorage.getItem("data"));
      localStorage.removeItem("data");
    })
    .catch( error => {
      alert(error);
    })
}

//Parse CSV file from NASA
function parseNasaCsv(data) {
  //let nasaHeaderBegin = "-BEGIN HEADER-";
  const nasaHeaderEnd = "-END HEADER-";
  const irradianceIndex = 3; //CSV: YEAR, MONTH, DAY, IRRADIANCE
  var totalDays = 0;
  var totalIrradiance = 0;

  const csvFile = data.split(nasaHeaderEnd);
  const rows = csvFile[1].split("\n"); //0 = NASA explanation header; 1 = CSV file content
  const maxIndex = rows.length - 1;
  for (let index = 2/*0 and 1 are garbage */; index < maxIndex ; totalDays++, index++) {
    const fields = rows[index].split(",");
    const element = fields[irradianceIndex];
    totalIrradiance = totalIrradiance + parseFloat(element);
  }

  document.getElementById("results").innerHTML += 
  "<br><br>" 
  + document.getElementById("cidade").value
  + " : "
  + " GHI média dos últimos 10 anos: " + totalIrradiance/totalDays + " kW-hr/m^2/day";
}

 