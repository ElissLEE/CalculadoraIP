const direccionConMascara= document.getElementById("ipConMascara");
var direccionIP;
var mascara;

function llamarFunciones(e) {
    e.preventDefault();
    dividirIPyMascara();
    obtenerMascaraEnDecimal();

}
function dividirIPyMascara() {
    
    var arrayipYmascara= direccionConMascara.value.split("/");
    direccionIP= arrayipYmascara[0];
    mascara= parseInt(arrayipYmascara[1]);
    
}

function obtenerMascaraEnDecimal() {
    
    var mascaraBinario= convertirMascaraABinario();
    var mascaraDecimal= mascaraBinarioADecimal(mascaraBinario);

    const mascara= document.getElementById('mascara');
    mascara.innerHTML = mascaraDecimal;

}

function convertirMascaraABinario() {

    var mascaraBinario= ""
    var bitsRestantes= mascara;

    for (var i = 0; i < 32; i++) {
       if(bitsRestantes>0)
       {
         bitsRestantes= bitsRestantes-1;
         mascaraBinario +="1";
       } 
       else{
         mascaraBinario +="0";
       }
    }
   return mascaraBinario;
}

function mascaraBinarioADecimal(mascaraBinario) {
    var mascaraDecimal="";

    for (var i = 0; i < 4; i++) {
        var bin = mascaraBinario.substring((i * 8) + 0, (i * 8) + 8)
        mascaraDecimal += parseInt(bin, 2);
        if(i<3){
            mascaraDecimal += '.';
        }
    }
    return mascaraDecimal;
}

function obtenerBroadcastRed(params) {
    
}

