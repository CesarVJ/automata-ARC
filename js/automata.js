var tablaCSV=[];
let programaArchivo= document.getElementById('programa');

$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "Tabla-ARC.csv",
        dataType: "text",
        success: function(data) {
            leerTabla(data);
        }
    });

     function leerTabla(datos){
        tablaCSV= Papa.parse(datos).data;
        rellenarVacios();
        console.log(tablaCSV); 
     }
});


programaArchivo.addEventListener('change', function() { 
    var archivo=new FileReader(); 
    let contenidoArchivo="";
    archivo.onload=function(){ 
        document.getElementById('salida').textContent=archivo.result; 
        contenidoArchivo= archivo.result;
        validarPrograma(contenidoArchivo);
    }       
    archivo.readAsText(this.files[0]); 
});

function validarPrograma(contenidoArchivo){
    estadoActual = 0; // q0
    let row="";
    let simbolos = tablaCSV[0]; // Cabecera de la tabla
    
    [...contenidoArchivo].forEach(caracter => {
        for(let i=0;i<simbolos.length;i++){
            if(simbolos[i]===caracter){
                estadoActual = parseInt(tablaCSV[estadoActual+1][i].substring(1));
                console.log(`Caracter ${caracter}, Estado actual: q${estadoActual}`);
                document.getElementById("salida").innerText = document.getElementById("salida").innerText + `Caracter ${caracter}, Estado actual: q${estadoActual}`+"\n"
            }
        }
    });
    if(estadoActual==194){
        console.log("Su programa es valido! :D");
        document.getElementById("salida").innerText = document.getElementById("salida").innerText +"Su programa es valido! :D";
    }else{
        console.log("Su programa no es valido! :c");
        document.getElementById("salida").innerText = document.getElementById("salida").innerText +"Su programa no es valido! :c";
    }
}

function rellenarVacios(){
    for(let i=0;i<tablaCSV.length;i++){
        for(let j=0;j<tablaCSV[0].length;j++){
            if(tablaCSV[i][j]==undefined || tablaCSV[i][j] === ""){
                tablaCSV[i][j]="q164";
            }
        }
    }

}