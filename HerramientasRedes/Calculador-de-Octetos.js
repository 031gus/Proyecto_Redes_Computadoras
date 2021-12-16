function generarOctetos(){
    dir_ip = document.getElementById("area_direccion").value;
    if (dir_ip != ""){
      ex = /^([0-9]+).([0-9]+).([0-9]+).([0-9]+)$/;
      regex = new RegExp(ex);
      groups = regex.exec(dir_ip);
      valida = dir_ip.match(ex);

      if(valida){
        octeto1 = parseInt(groups[1]);
        octeto2 = parseInt(groups[2]);
        octeto3 = parseInt(groups[3]);
        octeto4 = parseInt(groups[4]);
        if(octeto1 >=  0 && octeto1 <=  255 && octeto2 >=  0 && octeto2 <=  255 && octeto3 >=  0 && octeto3 <=  255 && octeto4 >=  0 && octeto4 <=  255){
          octeto1 = completarCeros(octeto1.toString("2"));
          octeto2 = completarCeros(octeto2.toString("2"));
          octeto3 = completarCeros(octeto3.toString("2"));
          octeto4 = completarCeros(octeto4.toString("2"));
          document.getElementById("area_octeto1").innerHTML = octeto1;
          document.getElementById("area_octeto2").innerHTML = octeto2;
          document.getElementById("area_octeto3").innerHTML = octeto3;
          document.getElementById("area_octeto4").innerHTML = octeto4;
          document.getElementById("area_octetos").innerHTML = octeto1 + "." + octeto2 + "." + octeto3 + "." + octeto4;
        } else {
          swal("Error", "Ingrese una dirección IPv4 válida.", "error");
        }
      } else {
        swal("Error", "Ingrese una dirección IPv4 válida.", "error");
      }
    }
  }
    

  function completarCeros(num_binario){
    if(num_binario.length < 8){
      dif = 8 - num_binario.length;
      ceros = "";
      for(i = 0; i < dif; i++){
        ceros = ceros + "0";
      }
      num_binario = ceros + num_binario;
      return num_binario;
    } else {
      return num_binario;
    }
}