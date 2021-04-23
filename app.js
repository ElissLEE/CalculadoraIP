const direccionConMascara= document.getElementsByClassName("campoTexto");
var direccionIP;
var mascara;

function llamarFunciones(e) {
    e.preventDefault();
    dividirIPyMascara(1);

    mascaraDeci=obtenerMascaraEnDecimal();
    const mascara= document.getElementById('mascara');
    mascara.innerHTML = mascaraDeci;

    direccionBroadcast=obtenerBroadcastRed(direccionIP);
      const broadcast= document.getElementById('broadcast');
      broadcast.innerHTML = direccionBroadcast;

    numBitsRed=numBitsParaIdentificarRed();
    const bitsRed= document.getElementById('bitsRed');
    bitsRed.innerHTML = numBitsRed;

    numHosts= numBitsParaIdentificarHosts();
      const bitsHosts= document.getElementById('bitsHosts');
      bitsHosts.innerHTML = numHosts;

    cantiHostsRed=cantidadHostsEnRed();
      const cantHostsRed= document.getElementById('cantHostsRed');
      cantHostsRed.innerHTML = cantiHostsRed;

    rangoDirecciones= calcularRangoDirecciones(direccionIP);
    const rangoDire= document.getElementById('rangoDirecciones');
    rangoDire.innerHTML ="";
    rangoDirecciones.forEach(direccion => {
        rangoDire.innerHTML += direccion+"-";
    });
   
    listaDirecciones=obtenerListadoHosts(direccionIP);
    const direccionesHosts= document.getElementById('lista');
    direccionesHosts.innerHTML ="";
    listaDirecciones.forEach(direccionH => {
        direccionesHosts.innerHTML += direccionH+"-";
    });

}

function dividirIPyMascara(numeroEjercicio) {
    
    var arrayipYmascara= direccionConMascara[numeroEjercicio-1].value.split("/");
    direccionIP= arrayipYmascara[0];
    mascara= parseInt(arrayipYmascara[1]);

}

function obtenerMascaraEnDecimal() {
    
    var mascaraBinario= convertirMascaraABinario();
    var mascaraDecimal= binarioAIpDecimal(mascaraBinario);

    return mascaraDecimal;
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

function obtenerBroadcastRed(ip) {
    
    var broadcastBinario = ""
    var ipEnBinario = pasarIpABinario(ip);

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
    return direccionBroadcast;
}

function pasarIpABinario(dirIP) {
    
    var ipBinario= "";
    var octetos = dirIP.split(".");
    
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
    return numBits;
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

function calcularRangoDirecciones(ip)
{
    cantidadHosts= cantidadHostsEnRed();
 
    if(cantidadHosts>0)
    {
        var direccionRed = obtenerDireccionRed();
        var hostMinimoBinario= pasarIpABinario(direccionRed);
        hostMinimoBinario = hostMinimoBinario.substring(0, hostMinimoBinario.length - 1) + '1';
        hostMinimo = binarioAIpDecimal(hostMinimoBinario);

        var direccionBroadcast = obtenerBroadcastRed(ip);
        var hostMaximoBinario = pasarIpABinario(direccionBroadcast);
        hostMaximoBinario = hostMaximoBinario.substring(0, hostMaximoBinario.length - 1) + '0';
        hostMaximo = binarioAIpDecimal(hostMaximoBinario);
    }
    return Array.of(direccionRed,hostMinimo,hostMaximo,direccionBroadcast);
}

function obtenerDireccionRed() {
    
    var direccionRedBin="";
    var direccionIpBin=pasarIpABinario(direccionIP);

    for (let i = 0; i < direccionIpBin.length; i++) {
        if(i<mascara)
        {
            direccionRedBin += direccionIpBin[i];
        }
        else
        {
            direccionRedBin += "0";
        }
         
     }
 
     return binarioAIpDecimal(direccionRedBin);

}
function obtenerListadoHosts(ip) {
    var cantidadHosts= cantidadHostsEnRed();


    if(cantidadHosts>0)
    {
        var direccionesHosts = [];

       var bitsRed= pasarIpABinario(ip).substring(0,mascara);
        var bitsHosts= numBitsParaIdentificarHosts();
        
        for (let i = 1; i <=cantidadHosts; i++){
            var binario = i.toString(2);
            while (binario.length<bitsHosts) {
                binario = 0+binario;
                
            } 

            direccionHost = binarioAIpDecimal(bitsRed + binario);
            direccionesHosts.push(direccionHost);

        }
       
    }
    return direccionesHosts;
}

function generarIPAleatoria(){

    var ip = (Math.floor(Math.random() * 255) + 1)+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255)); 
    mascaraSimplificada = sacarMascaraAdecuada(ip);
    ip += mascaraSimplificada;
    return ip;
}

function sacarMascaraAdecuada(ip ) {
    
    mascaraSimplificada = "";
    ipArray= ip.split(".");
     
    if(ipArray[0]<100)
    {
        mascaraSimplificada +="/"+(Math.floor(Math.random() * (32 - 20) + 20));
    }
    else{
        if(ipArray[0]<10)
        {
            mascaraSimplificada +="/"+(Math.floor(Math.random() * (29-8) + 8));
        }
        else{
            if(ipArray[0]>100)
            {
                mascaraSimplificada +="/"+(Math.floor(Math.random() * (32 - 20) + 20));
            }
            else{
                mascaraSimplificada +="/"+(Math.floor(Math.random() * (32-8) + 8));
            }
        }
    }

    return mascaraSimplificada;
}

function generarEjercicio(e, numeroEjercicio) {
   e.preventDefault();
   var ip= generarIPAleatoria();
   direccionConMascara[numeroEjercicio-1].value=ip;
}

function llamarFuncionesPunto2(e) {
    e.preventDefault();
    dividirIPyMascara(2);

    var direccionRedHost = obtenerDireccionRed();
    const direccionRedH= document.getElementById('direccionRed');
    direccionRedH.innerHTML = direccionRedHost;

    direccionBroadcastRed=obtenerBroadcastRed(direccionRedHost);
    const broadcastRed= document.getElementById('broadcastRed');
    broadcastRed.innerHTML = direccionBroadcastRed;

    cantiHostsRed=cantidadHostsEnRed();
      const cantidadHostsR= document.getElementById('cantidadHosts');
      cantidadHostsR.innerHTML = cantiHostsRed;

      rangoDireccionesHosts= calcularRangoDirecciones(direccionRedHost);
      const rangoDireHosts= document.getElementById('rangoDireccionesHosts');
      rangoDireHosts.innerHTML ="";
      rangoDireccionesHosts.forEach(direccion => {
        rangoDireHosts.innerHTML += direccion+"-";
      });

      listaDireccionesHosts=obtenerListadoHosts(direccionRedHost);
      const direccionesHostsR= document.getElementById('listaHostsRed');
      direccionesHostsR.innerHTML ="";
      listaDireccionesHosts.forEach(direccionH => {
          direccionesHostsR.innerHTML += direccionH+"-";
      });
    
     
}