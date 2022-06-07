var kmlLayer = null;
var map = null;


var uid = localStorage.getItem("user_id");
var uk = localStorage.getItem("user_key").split(',');
var ck = localStorage.getItem("country_key").split(',');
var lk = localStorage.getItem("labels_key").split(',');


function GetColor(pais){
  var color = "#fee6df";
  for (let m in uk){
      if (pais == ck[m] && uid == uk[m]){
        console.log(color);
        if(lk[m] == 1){
          color = "#17a2b8";
        }else if(lk[m] == 2){
          color = "#3ad29f";
        }else if(lk[m] == 3){
          color = "#eea303";
        }else if(lk[m] == 4){
          color = "#E84A5F";
        }else{
          color = "#fee6df";
        }
      }
  }
  return color;
}

function initMap() {

map = new google.maps.Map(document.getElementById("map-canvas"),{
    center: {lat: -34.397, lng: 150.644},
    zoom: 2,
    mapId: 'd48d37b0acb28461'
      });	

const api_url='https://cors-anywhere.herokuapp.com/https://travelcanvas.herokuapp.com/api/country'
  async function getCountry(){
    const response=await fetch(api_url);
    const country=await response.json();
    console.log(country)
    var data
    var countryinfo= new google.maps.InfoWindow()
    var ttPoly = [];
    var bounds = [];
    var latLngArray = [];

    for (let i = 0; i < country.length; i++) {

      var ParseCountry = JSON.parse(country[i].geojson)
     
      console.log(country[i].country_name)
      
     if(ParseCountry == null){
       console.log(country[i].country_name +"geojson null")
     }else{ 
       console.log(ParseCountry.coordinates)
       bounds[i] = new google.maps.LatLngBounds();

      var shell = ParseCountry.coordinates[0];

      latLngArray[i] = [];

      for (let s = 0; s < shell.length; s++) {
        var pt = new google.maps.LatLng(shell[s][1], shell[s][0]);
        bounds[i].extend(pt);
        latLngArray[i].push(pt);

      }

      // Construção do poligono

      var color = GetColor(country[i].country_id);

      ttPoly[i] = new google.maps.Polygon({
        paths: latLngArray[i],
        strokeColor: color,
        strokeOpacity: 0.4,
        strokeWeight: 2,
        fillColor: color,
        fillOpacity: 0.4
      });
      ttPoly[i].setMap(map);
      console.log(color);


      google.maps.event.addListener(ttPoly[i], 'click', function(event) {
        var contentString = country[i].country_name + "\n";
        console.log(contentString)
        countryinfo.setContent(`<div class="card-body"><p class="lead text-muted" style="text-align: center"><strong>` + contentString + `</strong></p>
        <button type="button" class="btn mb-2 btn-primary btn-md btn-block" data-toggle="modal" data-target="#defaultModal1"><span class="fe fe-info fe-16 mr-2"></span> Ver informações </button>
        <button type="button" class="btn mb-2 btn-secondary btn-md btn-block" data-toggle="modal" data-target="#defaultModal"><span class="fe fe-tag fe-16 mr-2"></span> Etiquetas </button>
        </div>`);
        countryinfo.setPosition(event.latLng)
        countryinfo.open(map);
        map.fitBounds(bounds[i]);
        console.log(country[i].country_id);
        getCountryInfo(country[i].country_id);
      });
     }

    }

    



    




  }

  getCountry()

  

}




  function getCountryInfo(cid) {

      $.ajax({
          url: "https://cors-anywhere.herokuapp.com/https://travelcanvas.herokuapp.com/api/country",
          type: "GET",
          dataType: 'json',
          success: function(result) {
              console.log(result);
              console.log(cid);
              let tabela = document.querySelector("#modal_side_country")
              let html = ``

              for (let i in result){
                  if(cid == result[i].country_id){

                      html += `<div class="modal-header">
                      <h5 class="modal-title" id="defaultModalLabel">${result[i].country_name}</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body text-muted"> 
              <p class="mb-xl-5">${result[i].country_desc}</p>
              <p class="ml-4"><strong>ISO:</strong> ${result[i].country_iso}</p>
              <p class="ml-4"><strong>Capital:</strong> ${result[i].country_capital}</p>
              <p class="ml-4"><strong>Área (km^2):</strong> ${result[i].country_landarea}</p>
                              <p class="ml-4"><strong>Número(s) de Emergência:</strong> ${result[i].country_emergency}</p>
              </div>
                    <div class="modal-footer">
                      <button type="button" class="btn mb-2 btn-secondary" data-dismiss="modal">Fechar</button>
                    </div>`

                  }else{ 
                      
                  }
              }

              tabela.innerHTML = html
          }
      });
  }
  getCountryInfo();


