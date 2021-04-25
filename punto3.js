function llamarFuncionesPunto3(e) {
  
    e.preventDefault();
    dividirIPyMascara(3);
   
    const numBits = document.getElementsByClassName("campoTexto")[3].value;

    //Muestra la red principal
    var direccionPrincipal= direccionIP;
    const direccion= document.getElementById('direccionPrincipal');
    direccion.innerHTML = direccionPrincipal;

    //Muestra el broadcast de la red principal
    broadcast=obtenerBroadcastRed(direccionIP);
    const broadcastRed= document.getElementById('direccionBroadcast');
    broadcastRed.innerHTML = broadcast;

    //Muestra la cantidad de subredes que se pueden asignar
    var numeroSubredes = calcularSubredes(numBits);
    const numSubredes= document.getElementById('numSubredes');
    numSubredes.innerHTML = numeroSubredes;

    //Muestra la cantidad de host que se pueden identificar en cada subred
    var mascaraBinaria=convertirMascaraABinario();
    var red= identificarRed(mascaraBinaria);
    var cantBits = 32- red - numBits;
    var host = calcularHostDeSubred(cantBits);
    const numHost= document.getElementById('numHost');
    numHost.innerHTML = host;

 
 

}

    //Funcion que calcula que el numero de subredees que se pueden asignar 
    function calcularSubredes (numeroBits){
    
        var cont=0;
        cont= Math.pow(2,numeroBits)-2;
        return cont;

    }

    //Funcion que calcula la cantidad de host que se pueden identificar en cada subred
    function  calcularHostDeSubred(numeroBits){
         
        var cont=0;
        cont= Math.pow(2,numeroBits)-2;
        return cont;
    }
    // Funcion que identifica la red de la direccion ip 
    function identificarRed(mascaraBinaria) {
        var cont = 0;
        let otro = mascaraBinaria.split("");
        for (var i = 0; i < otro.length; i++) {
            if (otro[i] == "1") {
                cont++;
            }
        }
        return cont;
    }

