var tablaCSV=[];
let programaArchivo= document.getElementById('programa');
let resultadoElem= document.getElementById('resultado');

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
    let contenidoAMostrar="";
    archivo.onload=function(){ 
        contenidoAMostrar=archivo.result;
        contenidoAMostrar=contenidoAMostrar.replace(/\n/g, "<br>");
        document.getElementById('cotenido-archivo').innerHTML=contenidoAMostrar; 
        contenidoArchivo= archivo.result;
        contenidoArchivo= formatear(contenidoArchivo);
        validarPrograma(contenidoArchivo);
    }       
    archivo.readAsText(this.files[0]); 
});
function formatear(contenidoArchivo){
    contenidoArchivo=contenidoArchivo.replace(/ /g, "~");
    contenidoArchivo = contenidoArchivo.replace(/\n~+/g, '\n');
    //contenidoArchivo = contenidoArchivo.replace(/\n/g, "\r\n");
    contenidoArchivo=contenidoArchivo.replace(/\n/g, "¬");
    //contenidoArchivo=contenidoArchivo.replace(/([^\r])\n/g, "$1\r\n");
    //console.log("Archivo: "+contenidoArchivo);
    return contenidoArchivo;
}

function validarPrograma(contenidoArchivo){
    estadoActual = 0; // q0
    let simbolos = tablaCSV[0]; // Cabecera de la tabla
    let salida = document.getElementById("salida");
    salida.innerHTML = "";
    
    [...contenidoArchivo].forEach(caracter => {
        for(let i=0;i<simbolos.length;i++){
            if(simbolos[i]===caracter){
                estadoActual = parseInt(tablaCSV[estadoActual+1][i].substring(1));
                console.log(`Caracter ${caracter}, Estado actual: q${estadoActual}`);
                salida.innerHTML += `<b>Caracter:</b> ${caracter}, <b>Estado actual:</b> q${estadoActual}`+"\n"
            }
        }
    });
    if(estadoActual==194){
        console.log("Su programa es valido! :D");
        resultado = "<br><b>Su programa es valido! :D</b>";
    }else{
        console.log("Su programa no es valido! :c");
        resultado = "<br><b>Su programa no es valido! :c</b>";
    }
    resultadoElem.innerHTML=resultado;
    //document.getElementById("salida").innerHTML +=resultado;
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