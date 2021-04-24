
function llamarFuncionesPunto3(e) {
    e.preventDefault();
    dividirIPyMascara(3);

    //Muestra la red principal
    var direccionPrincipal= direccionIP;
    console.log(direccionPrincipal);
    const direccion= document.getElementById('direccionPrincipal');
    direccion.innerHTML = direccionPrincipal;

    //Muestra el broadcast de la red principal
    broadcast=obtenerBroadcastRed(direccionIP);
    const broadcastRed= document.getElementById('direccionBroadcast');
    broadcastRed.innerHTML = broadcast;

}

