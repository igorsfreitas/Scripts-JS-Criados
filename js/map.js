var map;
var directionsDisplay; // Instanciaremos ele mais tarde, que será o nosso google.maps.DirectionsRenderer
var directionsService = new google.maps.DirectionsService();
 
function initialize() {
   directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true}); // Instanciando...
   var directionsService = new window.google.maps.DirectionsService();
   var latlng = new google.maps.LatLng(-18.8800397, -47.05878999999999);

 
   var options = {
      zoom: 5,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
   };
 
   map = new google.maps.Map(document.getElementById("mapa"), options);
   infowindow = new google.maps.InfoWindow();
   directionsDisplay.setMap(map); // Relacionamos o directionsDisplay com o mapa desejado
}

function abrirInfoBox(id, marker) {
 if (typeof(idInfoBoxAberto) == 'number' && typeof(infoBox[idInfoBoxAberto]) == 'object') {
   infoBox[idInfoBoxAberto].close()
; }

 infoBox[id].open(map, marker);
 idInfoBoxAberto = id;
}
 
initialize();


// CHECAR PALAVRA PALÍNDROMA

// var palavra = document.getElementById("palind").innerHTML;

// var inverse = palavra.split('').reverse().join('').toLowerCase();



// function check(){
//    var palavra = document.getElementById("palavra").value;

//    var inverse = palavra.split('').reverse().join('').toLowerCase();

//    if(inverse === palavra){
//       alert("palímdromo");
//    }else{
//       alert("errou");
//    }
// }


// CHECAR CAMPOS OBRIGATÓRIOS POR ATRIBUTO REQUIRED
// function check(){
//    var requireds = document.querySelectorAll('[required]');
//    var errors = [];
//    for(var i=0;i<requireds.length;i++){
//       if(requireds[i].value==""){
//          errors.push(requireds[i].id);
//          requireds[i].focus();
//       }
//    }
//    if(errors.length>0){
//       alert("Favor preencher os campos: "+errors);
//    }else{
      
//    }
// }

// PERCORRER KML E INVERTER LNGLAT E REVERTER PARA LATLNG

var cidades = document.getElementsByTagName("coordinates");
var coordinates = [];
var coordenadaInversa;
var coordenadaRevertida = [];
var resultadoConvertido = document.getElementById("resultadoConvertido");
var totalLat = 0;
var totalLong = 0;
var mediaLat;
var mediaLong;
var cidade;

 function revertLatLng(){

   for(var i=0; i<cidades.length;i++){ //PERCORRE O DOCUMENTO CONTANDO TODAS AS CIDADES
     resultadoConvertido.innerHTML += "\n//CIDADE "+(i+1)+"\nt[id_da_cidade] = ["; //COLOCA O NÚMERO DA CIDADE DENTRO DO HTML COM A TAG resultadoConvertido
     //console.log(cidades[i].parentNode.parentNode); //AQUI ELE VERIFICA A TAG AVÔ DE COORDINATES POSICAO i
     cidades[i].parentNode.parentNode.style.color = 'blue'; //PINTA DE AZUL AS COORDENADAS QUE VÃO SER CONVERTIDAS
     document.getElementById("resultado").innerHTML += cidades[i].innerHTML.replace(/\s/g, "\n"); //COLOCA O CONTEÚDO QUE TEM DENTRO DA TAG COORDINATES DA POSIÇÃO i DENTRO DA TAG COM ID resultado SUBSTITUINDO OS ESPAÇOS POR QUEBRA DE LINHA.. SENDO ASSIM NA COLUNA DA ESQUERDA FICAM TODAS AS COORDENADAS(LONG,LAT) DE TODAS AS CIDADES QUEBRADAS POR LINHA
     coordinates.push(cidades[i].innerHTML.split(" ")); // COLOCA O QUE TEM DENTRO DA TAG COORDINATES NA POSIÇÃO i DENTRO DO ARRAY COORDINATES(LONG,LAT)
     //console.log(coordinates[i].length); //CHECA QUANTAS COORDENADAS (LONG,LAT) TEM DENTRO DA POSIÇÃO i DO ARRAY COORDINATES
     for(var j=0;j<coordinates[i].length-1;j++){ // PERCORRE O ARRAY COORDINATES
        coordenadaInversa = coordinates[i][j]; //COLOCA NA VARIÁVEL coordenadaInversa O VALOR DE UMA COORDENADA(LONG,LAT) DA POSIÇÃO i,j DO ARRAY COORDINATES
        coordenadaRevertida.push(coordenadaInversa.split(","));
        //console.log(coordenadaRevertida[j][1].length);
        coordenadaRevertida[j] = [coordenadaRevertida[j][1],coordenadaRevertida[j][0]]
        //console.log(coordenadaRevertida[j][0]);
        totalLat += parseFloat(coordenadaRevertida[j][0]);
        //console.log(totalLat);
        //console.log(coordenadaRevertida[j][1]);
        totalLong += parseFloat(coordenadaRevertida[j][1]);
        //console.log(totalLong);
        resultadoConvertido.innerHTML += "\nnew google.maps.LatLng("+coordenadaRevertida[j][0]+","+coordenadaRevertida[j][1]+"),";
     }
     mediaLat = (totalLat/(coordinates[i].length-1));
     mediaLong = (totalLong/(coordinates[i].length-1));
     jQuery.ajaxSetup({async:false});
     $.get( "http://maps.google.com/maps/api/geocode/json?address="+mediaLat+","+mediaLong+"&sensor=false", function( data ) {
        cidade = data.results[0].address_components[1].long_name;
      }); 
     jQuery.ajaxSetup({async:true});
     console.log(cidade);
     resultadoConvertido.innerHTML += "\n//CIDADE: "+cidade;
     console.log("Latitude Média: "+mediaLat);
     console.log("Longitude Média: "+mediaLong); 
     resultadoConvertido.innerHTML += "\n];";   
     mediaLong = 0;
     mediaLat = 0;
     totalLong = 0;
     totalLat = 0;
     coordenadaRevertida = [];
  
     console.log("Próxima cidade -----------------------------------")
   }
 }

  // function revertLatLng(){
  //    //for(var i=0; i<cidades.length;i++){
  //       resultadoConvertido.innerHTML += "\n//CIDADE "+(2+1)+"\nt[id_da_cidade] = [";
  //       //console.log(cidades[0].parentNode.parentNode);
  //       cidades[2].parentNode.parentNode.style.color = 'red';
  //       document.getElementById("resultado").innerHTML += cidades[2].innerHTML.replace(/\s/g, "\n"); 
  //       coordinates.push(cidades[2].innerHTML.split(" "));
  //       for(var j=0;j<coordinates[0].length-1;j++){
  //          coordenadaInversa = coordinates[0][j];
  //          coordenadaRevertida.push(coordenadaInversa.split(","));
  //          coordenadaRevertida[j] = [coordenadaRevertida[j][1],coordenadaRevertida[j][0]];
  //          totalLat += parseFloat(coordenadaRevertida[j][0]);
  //          totalLong += parseFloat(coordenadaRevertida[j][1]);
  //          resultadoConvertido.innerHTML += "\nnew google.maps.LatLng("+coordenadaRevertida[j][0]+","+coordenadaRevertida[j][1]+"),";
  //       }
  //       mediaLat = (totalLat/(coordinates[0].length-1));
  //       mediaLong = (totalLong/(coordinates[0].length-1));
  //       $.get( "http://maps.google.com/maps/api/geocode/json?address="+mediaLat+","+mediaLong+"&sensor=false", function( data ) {
  //          cidade = data.results[0].address_components[1].long_name;
  //          resultadoConvertido.innerHTML += "\n//CIDADE: "+cidade;
  //        }); 
  //       console.log("Latitude Média: "+mediaLat);
  //       console.log("Longitude Média: "+mediaLong);
  //       resultadoConvertido.innerHTML += "\n];";   
  //       mediaLong = 0;
  //       mediaLat = 0;
  //       totalLong = 0;
  //       totalLat = 0;
  //    //}
  // }