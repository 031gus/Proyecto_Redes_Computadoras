function convertirAscii(){
    cadena = document.getElementById("area_entrada").value;
    ascii = "";
    for(i = 0; i < cadena.length; i++){
      if(i == 0){
        ascii = ascii + cadena.charCodeAt(i);
      } else {
        ascii = ascii + " " + cadena.charCodeAt(i);
      }
      
    }

    document.getElementById("area_salida").innerHTML = ascii;
}