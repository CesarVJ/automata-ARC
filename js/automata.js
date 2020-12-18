var tablaCSV=[];
let programaArchivo= document.getElementById('programa');
let resultadoElem= document.getElementById('resultado');
// La siguiente variable es para mostrar una ventana emergente de carga
var sweet_loader = '<div class="sweet_loader"><svg viewBox="0 0 140 140" width="140" height="140"><g class="outline"><path d="m 70 28 a 1 1 0 0 0 0 84 a 1 1 0 0 0 0 -84" stroke="rgba(0,0,0,0.1)" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"></path></g><g class="circle"><path d="m 70 28 a 1 1 0 0 0 0 84 a 1 1 0 0 0 0 -84" stroke="#71BBFF" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-dashoffset="200" stroke-dasharray="300"></path></g></svg></div>';

$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "Tabla-ARC.csv", // Accediendo a la Matriz de trancisiones
        dataType: "text",
        success: function(data) {
            leerTabla(data);
        }
    });
     function leerTabla(datos){
        tablaCSV= Papa.parse(datos).data;
        rellenarVacios(); // Sustituyendo espacios vacios con el estado q164
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
    archivo.readAsText(this.files[0],'ISO-8859-1'); 
});
function formatear(contenidoArchivo){
    contenidoArchivo=contenidoArchivo.replace(/ /g, "~");
    contenidoArchivo = contenidoArchivo.replace(/\n~+/g, '\n');
    contenidoArchivo=contenidoArchivo.replace(/\n/g, "¬");
    return contenidoArchivo;
}

function validarPrograma(contenidoArchivo){
    estadoActual = 0; // q0
    let simbolos = tablaCSV[0]; // Cabecera de la tabla
    let salida = document.getElementById("salida");
    let fueValido=false;
    salida.innerHTML = "";
    console.log(simbolos);
    [...contenidoArchivo].forEach(caracter => {
        if(caracter=='+'){
            console.log("Signo de mas: "+caracter);
        }
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
        fueValido = true;
    }else{
        console.log("Su programa no es valido! :c");
        resultado = "<br><b>Su programa no es valido! :c</b>";
        fueValido = false;
    }
    resultadoElem.innerHTML=resultado;
    mostrarResultado(fueValido);
}

function mostrarResultado(fueValido){
    swal.fire({
        html: '<h4>Verificando...</h4>',
        onRender: function() {
            $('.swal2-content').prepend(sweet_loader);
        }
    });
    swal.showLoading();
    setTimeout(function() {
        swal.fire({
            icon: fueValido?'success':'warning',
            html: fueValido?'<h4>¡Programa valido!</h4>':'<h4>¡Programa no valido!</h4>'
        });
    }, 1000);
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