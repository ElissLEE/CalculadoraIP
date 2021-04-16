const direccionConMascara= document.getElementById("ipConMascara");
var direccionIP;
var mascara;

function llamarFunciones(e) {
    e.preventDefault();
    dividirIPyMascara();
    obtenerMascaraEnDecimal();
    obtenerBroadcastRed();
    numBitsParaIdentificarRed();
    numHosts= numBitsParaIdentificarHosts();
      const bitsHosts= document.getElementById('bitsHosts');
      bitsHosts.innerHTML = numHosts;
    numHostsRed=cantidadHostsEnRed();
      const cantHostsRed= document.getElementById('cantHostsRed');
      cantHostsRed.innerHTML = numHostsRed;
}

function dividirIPyMascara() {
    
    var arrayipYmascara= direccionConMascara.value.split("/");
    direccionIP= arrayipYmascara[0];
    mascara= parseInt(arrayipYmascara[1]);
    
}

function obtenerMascaraEnDecimal() {
    
    var mascaraBinario= convertirMascaraABinario();
    var mascaraDecimal= binarioAIpDecimal(mascaraBinario);

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

function binarioAIpDecimal(valorBinario) {
    var valorDecimal="";

    for (var i = 0; i < 4; i++) {
        var bin = valorBinario.substring((i * 8) + 0, (i * 8) + 8)
        valorDecimal += parseInt(bin, 2);
        if(i<3){
            valorDecimal += '.';
        }
    }
    return valorDecimal;
}

function obtenerBroadcastRed() {
    
    var broadcastBinario = ""
    var ipEnBinario = pasarIpABinario()

    for (let i = 0; i < ipEnBinario.length; i++) {
       if(i<mascara)
       {
           broadcastBinario += ipEnBinario[i];
       }
       else
       {
        broadcastBinario += "1";
       }
        
    }
   
    direccionBroadcast= binarioAIpDecimal(broadcastBinario);
    const broadcast= document.getElementById('broadcast');
    broadcast.innerHTML = direccionBroadcast;
}

function pasarIpABinario() {
    
    var ipBinario= "";
    var octetos = direccionIP.split(".");
    
    for (const octeto in octetos) {
        if (Object.hasOwnProperty.call(octetos,octeto)) {
            var octetoBin = parseInt(octetos[octeto]).toString(2);
            
            while (octetoBin.length<8) {
                octetoBin = 0+octetoBin;
            }
        }
        ipBinario += octetoBin
    }
    return ipBinario;
}

function numBitsParaIdentificarRed() {

    numBits=mascara;
    const bitsRed= document.getElementById('bitsRed');
    bitsRed.innerHTML = numBits;
} 

function numBitsParaIdentificarHosts() {
    
    numHosts= 32-mascara;
    return numHosts;
}

function cantidadHostsEnRed(){

     bitsHosts= numBitsParaIdentificarHosts();

     if (bitsHosts > 1) {
        cantHosts = Math.pow(2, bitsHosts);
    }
    return cantHosts - 2
}
