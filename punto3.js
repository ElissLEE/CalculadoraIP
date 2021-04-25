function llamarFuncionesPunto3(e) {
  
    e.preventDefault();
    dividirIPyMascara(3);
   
    const numBits = document.getElementsByClassName("campoTexto")[3].value;

    //Muestra la red principal
    var direccionPrincipal= calcularRedPrincipal();
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

    //Muestra dirrecion ip, rango de direcciones y direccion de broadcast de las subredes que se pueden usar 
    var direccionBinaria =pasarIpABinario(direccionIP);
    var listado= calcularIpSubredes(direccionBinaria, numBits,numeroSubredes);
    const listadoDirecciones= document.getElementById('listDirecciones');
    listadoDirecciones.innerHTML = listado;
 
}

function llamarFuncionSubred(e){

    e.preventDefault();
    dividirIPyMascara(3);

    const numBits =parseInt( document.getElementsByClassName("campoTexto")[3].value);
    var direccionBinaria =pasarIpABinario(direccionIP);
    const subred = parseInt(document.getElementsByClassName("campoTexto")[4].value);

    /*Muestra listado generado por una subred dada  de dirrecion ip,
     rango de direcciones y direccion de broadcast de las subred */
   
     var lista= calcularSubred(direccionBinaria, numBits, subred);
     const infoSubred= document.getElementById('informacionSubred');
     infoSubred.innerHTML = lista;

 
    //Muestra direccion de una subred especifica 
    var arregloDireccion = generarDireccionArreglo();
    var direcSub = calcularIpSubred(arregloDireccion, numBits, subred);
    var direcCompleta = completarDireccion(direcSub , 0);
    var direc =  binarioAIpDecimal(direcCompleta);
    const direcSubred= document.getElementById('infoSubred');
    direcSubred.innerHTML = direc;

    //Muestra direccion broadcast de una subred especifica
    var arregloDireccion = generarDireccionArreglo();
    var direcBroad = calcularIpSubred(arregloDireccion, numBits, subred);
    var direcCompleta = completarDireccion(direcBroad  , 1);
    var direc =  binarioAIpDecimal(direcCompleta);
    const direcBroadcast= document.getElementById('infoBroadcast');
    direcBroadcast.innerHTML = direc;
  
    // Muestra rango de direcciones que se pueden asignar a un host
    var rango=calcularRango(direccionBinaria, numBits, subred);
    const direcRango= document.getElementById('rangoDireccion');
    direcRango.innerHTML = rango;
}

function llamarFuncionHost(e){

    e.preventDefault();
    dividirIPyMascara(3);

    const numBits =parseInt( document.getElementsByClassName("campoTexto")[3].value);
    const subred = parseInt(document.getElementsByClassName("campoTexto")[4].value);
    const host = parseInt(document.getElementsByClassName("campoTexto")[5].value);
    var arregloDireccion = generarDireccionArreglo();

    //Muestra la direccion de un host especifico en una subred especifica 
    var direcHost=calcularDireccionHostEspecifico(arregloDireccion, numBits, subred,host)
    const direccHost= document.getElementById('infoHost');
    direccHost.innerHTML = direcHost;

}

function llamarFuncionIpEspecifica(e){

    e.preventDefault();
  
    dividirIPyMascara(7);

    const numBits =parseInt( document.getElementsByClassName("campoTexto")[7].value);
   
    //Muestra la subred a la que pertenece la ip ingresada
    var res= determinarSubred(numBits);
    const subredEsp= document.getElementById('subredNueva');
    subredEsp.innerHTML = res;

}

function llamarFuncionIpConexion(e){

    e.preventDefault();
  
    dividirIPyMascara(9);

    var direccion1 = direccionIP
    var mascara1= mascara

    dividirIPyMascara(10);
    var direccion2 = direccionIP
    var mascara2= mascara

    //Muestra si dos direcciones pertenecen a la misma red
    var res= determinarConexion(direccion1,mascara1,direccion2,mascara2);
    var respuesta="las direcciones ingresadas no pertenecen a la misma red"
   
    if (res) {
        respuesta="las direcciones ingresadas pertenecen a la misma red"
    }

    const conexionIp= document.getElementById('conexion');
    conexionIp.innerHTML = respuesta;

}

function llamarFuncionNSubredes(e){

    e.preventDefault();
  
    dividirIPyMascara(11);

    const numBits =parseInt( document.getElementsByClassName("campoTexto")[11].value);
    const numSubred =parseInt( document.getElementsByClassName("campoTexto")[12].value);
    const numDirecciones =parseInt( document.getElementsByClassName("campoTexto")[13].value);
   
    //Muestra n cantidad de direcciones ip
    var listaDirec= listarNDirecciones(numBits,numSubred,numDirecciones);

    const nDirec= document.getElementById('nDirecciones');
    nDirec.innerHTML = listaDirec;

}
    function calcularDireccionHostEspecifico(arregloDireccion, bitSubredes, numeroS,numHost){

        var cadena = calcularIpSubred(arregloDireccion, bitSubredes, numeroS);
        var cantBits = (32 - mascara) - bitSubredes 
        var hostBinario = transformarDecimalBinario(numHost, cantBits).join('');
        var res = binarioAIpDecimal(cadena + hostBinario);
        
        return  res;
    }

    // Funcion que calcula la red principal de una direccion ip 
    function calcularRedPrincipal(){

        var direccionBinario =pasarIpABinario(direccionIP);

        var direccionRecortada= direccionBinario.substring(0,mascara);
    
        var principalBin= completarDireccion(direccionRecortada,0)
        
        return  binarioAIpDecimal (principalBin)
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

    function generarDireccionArreglo(){

        var direccionBinaria =pasarIpABinario(direccionIP);    
        var direccionAux = direccionBinaria.replaceAll('.', '');
        let arregloDireccion = direccionAux.split("");
        return arregloDireccion;
    }

    //Funcion que lista la dirrecion ip, rango de direcciones y direccion de broadcast de las subredes que se pueden usar 
    function calcularIpSubredes(direccionIpBinaria, bitSubredes, numSubredes) {
 
        var direccionAux = direccionIpBinaria.replaceAll('.', '');
        let arregloDireccion = direccionAux.split("");
        var cadena= "";
     
        for (var i = 1; i <= numSubredes; i++) {
            
          cadena += generarInfoSubred(i,arregloDireccion,bitSubredes,numSubredes);
     
        }
     
        return cadena;
    }
    
  //Funcion que dada la subred lista la dirrecion ip, rango de direcciones y direccion de broadcast de las subredes que se pueden usar 
  function calcularSubred(direccionIpBinaria, bitSubredes, subred) {
   
    let arregloDireccion = direccionIpBinaria.split("");
    var cadena= "";
 
    cadena += generarInfoSubred(subred,arregloDireccion,bitSubredes);
 
    return cadena;
}

    // Funcion que brinda la informacion de la subred
    function generarInfoSubred(valor,arregloDireccion,bitSubredes){
    
        var cadena = "";
        cadena +=  "SUBRED  " + valor + ":<br>" + "    ";
         
        var numSubred2 = calcularIpSubred(arregloDireccion, bitSubredes, valor);           
        var direccion = completarDireccion(numSubred2 , 0);
        direccion = direccion.substring(0, direccion.length - 1 ) + 1;
        
        var dirBroadcast = completarDireccion(numSubred2, 1);

        var direccionFinal =  dirBroadcast.substring(0,  dirBroadcast.length - 1 ) + 0;


        cadena += binarioAIpDecimal( completarDireccion(numSubred2 , 0)) + "<br>" + "   ";
        cadena += binarioAIpDecimal(direccion) + "<br>" + "   ";
        cadena += binarioAIpDecimal(direccionFinal) + "<br>" + "   ";
        cadena += binarioAIpDecimal( dirBroadcast) + "<br>" + "<br>";
        
        return cadena;
    }

    function calcularIpSubred(arregloDireccion, bitSubredes, numeroS) {
 
        var contador = 0;
        var tope = mascara + bitSubredes;
       
        let arreglo = arregloDireccion;
        let arregloAuxiliar = transformarDecimalBinario(numeroS, bitSubredes);
      
        for (var i = mascara; i < tope; i++) {
            arreglo[i] = arregloAuxiliar[contador];
            contador++;
        }

        
        return arreglo.join('').substring(0,tope);

    }
    
    function completarDireccion(direccion,numero){

        while(direccion.length < 32){
            direccion += numero;
        }

        return direccion;
    }

    function transformarDecimalBinario(numero, cantBits) {
      
        var auxiliar = transformarDecimalBinario2(numero);
        let arreglo = auxiliar.split("");
        var numeroNuevo = cantBits - arreglo.length;
        var nuevoArreglo = [];
     
        for (var i = 0; i < cantBits; i++) {
            if (i < numeroNuevo) {
                nuevoArreglo[i] = "0";
            } else {
     
                nuevoArreglo[i] = arreglo[i - numeroNuevo];
            }
        }
     
        return nuevoArreglo;
    }

    function transformarDecimalBinario2(numero) {
        
        var auxiliar = numero.toString(2);
        let arreglo = auxiliar.split("");

        var nuevoArreglo = new Array();
        var numNuevo = 8 - arreglo.length;
          
        for (var i = 0; i < 8; i++) {
            if (i < numNuevo) {
                nuevoArreglo[i] = "0";
            } else {
     
                nuevoArreglo[i] = arreglo[i - numNuevo];
            }
        }
     
        return nuevoArreglo.join('');
    }
    
  function calcularRango(direccionIpBinaria, bitSubredes, subred) {
   
    let arregloDireccion = direccionIpBinaria.split("");
    var cadena= "";
 
    cadena += generarRangoSubred(subred,arregloDireccion,bitSubredes);
 
    return cadena;
}
    function generarRangoSubred(valor,arregloDireccion,bitSubredes){
    
        var cadena = "";
        cadena +=  "SUBRED  " + valor + ":<br>" + "    ";
         
        var numSubred2 = calcularIpSubred(arregloDireccion, bitSubredes, valor);           
        
        var direccion = completarDireccion(numSubred2 , 0);
        direccion = direccion.substring(0, direccion.length - 1 ) + 1;
        
        var dirBroadcast = completarDireccion(numSubred2, 1);

        var direccionFinal =  dirBroadcast.substring(0,  dirBroadcast.length - 1 ) + 0;


        
        cadena += binarioAIpDecimal(direccion) + "<br>" + "   ";
        cadena += binarioAIpDecimal(direccionFinal) + "<br>" + "   ";
      
        
        return cadena;
    }

    function determinarSubred(bitSubredes){

        var direccionBinario =pasarIpABinario(direccionIP);

        var direccionRecortada= direccionBinario.substring(0,mascara + bitSubredes);
    
        var direccion= completarDireccion(direccionRecortada,0)
        
        return  binarioAIpDecimal (direccion)
    }

   function determinarConexion(direccion1,mascara1,direccion2,mascara2) {

    var direccionBinario =pasarIpABinario(direccion1);
    var masc1= direccionBinario.substring(0,mascara1);

    var direccionBinario =pasarIpABinario(direccion2);
    var masc2= direccionBinario.substring(0,mascara2);

    masc1 = completarDireccion(masc1,0);
    masc2 = completarDireccion(masc2,0);

    if(masc1 == masc2){
        return true
    }

    return false;

    }

    function listarNDirecciones(numBits,numSubred,cantDirecciones){

        var arregloDireccion=generarDireccionArreglo(direccionIP);

        var cadena= ""
         for (let i = 1; i <= cantDirecciones; i++) {
        
            cadena+= calcularDireccionHostEspecifico(arregloDireccion, numBits, numSubred,i) + "<br>"
        
         }        

         return cadena;
    }