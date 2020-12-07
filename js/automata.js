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
    archivo.onload=function(){ 
        document.getElementById('cotenido-archivo').textContent=archivo.result; 
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
                document.getElementById("salida").innerHTML += `<b>Caracter:</b> ${caracter}, <b>Estado actual:</b> q${estadoActual}`+"\n"
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