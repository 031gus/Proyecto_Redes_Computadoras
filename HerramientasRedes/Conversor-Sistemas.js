function convertirNumero(){
    sistema = document.getElementById("select-6211").value;

    base = 10;
    numero = document.getElementById("name-f18c").value;
    valido = true;

    if(numero != ""){
        switch(sistema){
            case "Binario":
            base = 2;
            for(i = 0; i < numero.length; i++){
                if(numero.charAt(i) != '0' && numero.charAt(i) != '1'){
                valido = false;
                break;
                }
            }
            break;
            case "Octal":
            base = 8;
            for(i = 0; i < numero.length; i++){
                if(numero.charAt(i) != '0' && numero.charAt(i) != '1' && numero.charAt(i) != '2' && numero.charAt(i) != '3' && numero.charAt(i) != '4' && numero.charAt(i) != '5' && numero.charAt(i) != '6' && numero.charAt(i) != '7' && numero.charAt(i) != '8'){
                valido = false;
                break;
                }
            }
            break;
            case "Decimal":
            base = 10;
            valido = !isNaN(numero);
            break;
            case "Hexadecimal":
            base = 16;
            for(i = 0; i < numero.length; i++){
                if(numero.charAt(i) != '0' && numero.charAt(i) != '1' && numero.charAt(i) != '2' && numero.charAt(i) != '3' && numero.charAt(i) != '4' && numero.charAt(i) != '5' && numero.charAt(i) != '6' && numero.charAt(i) != '7' && numero.charAt(i) != '8' && numero.charAt(i) != '9' && numero.charAt(i) != 'A' && numero.charAt(i) != 'B' && numero.charAt(i) != 'C' && numero.charAt(i) != 'D' && numero.charAt(i) != 'E' && numero.charAt(i) != 'F' && numero.charAt(i) != 'a' && numero.charAt(i) != 'b' && numero.charAt(i) != 'c' && numero.charAt(i) != 'd' && numero.charAt(i) != 'e' && numero.charAt(i) != 'f'){
                valido = false;
                break;
                }
            }
            break;
        }
    
        if(numero == ""){
            valido = false;
        }
    
        decimal = parseInt(numero, base);
    
        if(valido == true){
            binario = decimal.toString("2");
            octal = decimal.toString("8");
            hexadecimal = decimal.toString("16");
    
            document.getElementById("textarea-b7df").innerHTML = binario;
            document.getElementById("textarea-7754").innerHTML = octal;
            document.getElementById("phone-cbff").innerHTML = decimal;
            document.getElementById("textarea-924a").innerHTML = hexadecimal;
        } else {
            swal("Error", "Ingrese un número válido en sistema " + sistema + ".","error");
            document.getElementById("textarea-b7df").innerHTML = "";
            document.getElementById("textarea-7754").innerHTML = "";
            document.getElementById("phone-cbff").innerHTML = "";
            document.getElementById("textarea-924a").innerHTML = "";
        }
    }
}