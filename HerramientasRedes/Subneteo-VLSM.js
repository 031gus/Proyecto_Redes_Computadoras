function continuarNumeroSubredes(){
    let ip_valida = validarIp(document.getElementById("direccion").value);
    let prefijo = document.getElementById("prefijo").value;
    let pref_valido = !isNaN(prefijo);
    if(prefijo == ""){
        pref_valido = false;
    }
    if(ip_valida){
        if(pref_valido){
            document.getElementById("paso2").click();
        } else {
            swal("Error", "Ingrese un prefijo válido.", "error");
        }
    } else {
        swal("Error", "Ingrese una dirección IPv4 válida.", "error");
    }
}

function validarIp(dir_ip){
    let direc = "" + dir_ip;

    if (direc != ""){
        ex = /^([0-9]+).([0-9]+).([0-9]+).([0-9]+)$/;
        regex = new RegExp(ex);
        groups = regex.exec(direc);
        valida = direc.match(ex);

        if(valida){
            return true;
        }
    }
    return false;;
}

function continuarNumeroHosts(){
    generarCamposDeTexto();
    document.getElementById("paso3").click();
}

function generarCamposDeTexto(){
    let n_hosts = parseInt(document.getElementById("num_hosts").value);
    
    for(let i = 1; i <= n_hosts; i++){
        var div = document.createElement("div");
        div.id = "div_subred_" + i;
        var parent = document.getElementById("num_hosts_form");
        parent.appendChild(div);
        var input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Nombre de subred " + i;
        input.id = "nombre_sub_" + i;
        input.className = "u-border-1 u-border-grey-30 u-input u-input-rectangle u-white";
        var parent = document.getElementById("div_subred_" + i);
        parent.appendChild(input);

        var div = document.createElement("div");
        div.id = "div_num_hosts_" + i;
        var parent = document.getElementById("num_hosts_form");
        parent.appendChild(div);
        var input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Número de hosts";
        input.id = "num_hosts_" + i;
        input.className = "u-border-1 u-border-grey-30 u-input u-input-rectangle u-white";
        var parent = document.getElementById("div_num_hosts_" + i);
        parent.appendChild(input);
    }
}

function calcularSubneteo(){
    n_hosts = parseInt(document.getElementById("num_hosts").value);
    arr_nombres = [];
    arr_n_hosts = [];
    arr_bits_hosts = [];
    arr_bits_red = [];
    arr_mascaras = [];
    arr_ids = [];
    arr_primeras_ips = [];
    arr_ultimas_ips = [];
    arr_broadcasts = [];

    for(let i = 1; i <= n_hosts; i++){
        arr_nombres.push(parseInt(document.getElementById("nombre_sub_" + i).value));
        arr_n_hosts.push(parseInt(document.getElementById("num_hosts_" + i).value));
    }

    for(let i = 0; i < n_hosts; i++){
        for(let j = 0; j < n_hosts - 1; j++){
            if(arr_n_hosts[j] < arr_n_hosts[j+1]){
                temp = arr_n_hosts[j];
                arr_n_hosts[j] = arr_n_hosts[j+1];
                arr_n_hosts[j+1] = temp;
                temp = arr_nombres[j];
                arr_nombres[j] = arr_nombres[j+1];
                arr_nombres[j+1] = temp;
            }
        }
    }

    for(let i = 0; i < n_hosts; i++){
    n = 1;
    while(true){
        if ((Math.pow(2, n) - 2) >= arr_n_hosts[i]){
        arr_bits_hosts.push(n);
        arr_bits_red.push(32 - n);
        break;
        }
        n++;
    }
    }

    let ultimo_id_de_red = generarOctetos(document.getElementById("direccion").value).replaceAll('.', '');

    for(let i = 0; i < n_hosts; i++){
    arr_ids.push(ultimo_id_de_red);
    console.log(arr_ids[i]);
    arr_broadcasts.push(generarBroadcast(arr_ids[i], arr_bits_red[i]));
    console.log(arr_broadcasts[i]);
    arr_mascaras.push(generarMascara(arr_bits_red[i]));
    console.log(arr_mascaras[i]);
    arr_primeras_ips.push(generarPrimeraIp(arr_ids[i]));
    arr_ultimas_ips.push(generarUltimaIp(arr_broadcasts[i]));

    ultimo_id_de_red = generarId(arr_ids[i], arr_bits_red[i]);
    }

    for(let i = 0; i < n_hosts; i++){
    var tr = document.createElement("tr");
    tr.id = "fila_" + i;
    var parent = document.getElementById("tabla");
    parent.appendChild(tr);

    var td = document.createElement("td");
    td.className = "u-border-1 u-border-grey-30 u-first-column u-palette-4-light-2 u-table-cell u-table-cell-9";
    td.innerHTML = arr_nombres[i];
    var parent = document.getElementById("fila_" + i);
    parent.appendChild(td);

    var td = document.createElement("td");
    td.className = "u-border-1 u-border-grey-30 u-table-cell";
    td.innerHTML = arr_n_hosts[i];
    var parent = document.getElementById("fila_" + i);
    parent.appendChild(td);

    var td = document.createElement("td");
    td.className = "u-border-1 u-border-grey-30 u-table-cell";
    td.innerHTML = arr_bits_red[i];
    var parent = document.getElementById("fila_" + i);
    parent.appendChild(td);

    var td = document.createElement("td");
    td.className = "u-border-1 u-border-grey-30 u-table-cell";
    td.innerHTML = generarIp(arr_mascaras[i]);
    var parent = document.getElementById("fila_" + i);
    parent.appendChild(td);

    var td = document.createElement("td");
    td.className = "u-border-1 u-border-grey-30 u-table-cell";
    td.innerHTML = generarIp(arr_ids[i]);
    var parent = document.getElementById("fila_" + i);
    parent.appendChild(td);

    var td = document.createElement("td");
    td.className = "u-border-1 u-border-grey-30 u-table-cell";
    td.innerHTML = generarIp(arr_primeras_ips[i]);
    var parent = document.getElementById("fila_" + i);
    parent.appendChild(td);

    var td = document.createElement("td");
    td.className = "u-border-1 u-border-grey-30 u-table-cell";
    td.innerHTML = generarIp(arr_ultimas_ips[i]);
    var parent = document.getElementById("fila_" + i);
    parent.appendChild(td);

    var td = document.createElement("td");
    td.className = "u-border-1 u-border-grey-30 u-table-cell";
    td.innerHTML = generarIp(arr_broadcasts[i]);
    var parent = document.getElementById("fila_" + i);
    parent.appendChild(td);
    }
}

function generarUltimaIp(dir_ip){
    let direc = "" + dir_ip;
    let octeto = "";
    let ultima_ip = "";

    for(let i = direc.length - 1; i >= 24; i--){
    octeto = direc.charAt(i) + octeto;
    }

    let decimal = parseInt(octeto, 2);
    decimal = decimal - 1;
    octeto = decimal.toString("2");

    for(let i = 0; i < 24; i++){
    ultima_ip = ultima_ip + direc.charAt(i);
    }

    ultima_ip = ultima_ip + octeto;
    return ultima_ip;
}

function generarPrimeraIp(dir_ip){
    let direc = "" + dir_ip;
    let octeto = "";
    let primera_ip = "";

    for(let i = direc.length - 1; i >= 24; i--){
    octeto = direc.charAt(i) + octeto;
    }

    let decimal = parseInt(octeto, 2);
    decimal = decimal + 1;
    octeto = decimal.toString("2");

    for(let i = 0; i < 24; i++){
    primera_ip = primera_ip + direc.charAt(i);
    }

    primera_ip = primera_ip + octeto;
    return primera_ip;
}

function generarMascara(bits_red){
    let bits = parseInt(bits_red);
    let masc = "";
    for(let i = 0; i < 32; i++){
    if(i < bits){
        masc = masc + "1";
    } else {
        masc = masc + "0";
    }
    }
    return masc;
}

function generarId(dir_red, bits_red){
    let direc_red = "" + dir_red;
    let bits = parseInt(bits_red);

    let dir = "";
    for(let i = 0; i < direc_red.length; i++){
    if(i == bits - 1){
        dir = dir + "1";
    } else {
        dir = dir + direc_red.charAt(i);
    }
    }
    return dir;
}

function generarBroadcast(dir_red, bits_red){
    let direc = "" + dir_red;
    let bits = parseInt(bits_red);

    let dir = "";
    for(let i = 0; i < 32; i++){
    if(i < bits){
        dir = dir + direc.charAt(i);
    } else {
        dir = dir + "1";
    }
    }
    return dir;
}

function generarOctetos(dir_ip){
    let direc = "" + dir_ip;

    if (direc != ""){
    ex = /^([0-9]+).([0-9]+).([0-9]+).([0-9]+)$/;
    regex = new RegExp(ex);
    groups = regex.exec(direc);
    valida = direc.match(ex);

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
        return octeto1 + "." + octeto2 + "." + octeto3 + "." + octeto4;
        }
    }
    }
    return "";
}
    

function completarCeros(binario){
    let num_binario = "" + binario;
    if(num_binario.length < 8){
    dif = 8 - num_binario.length;
    ceros = "";
    for(let i = 0; i < dif; i++){
        ceros = ceros + "0";
    }
    num_binario = ceros + num_binario;
    return num_binario;
    } else {
    return num_binario;
    }
}

function generarIp(binario){
    let bits = "" + binario;
    let octeto1 = bits.substr(0, 8);
    let octeto2 = bits.substr(8, 8);
    let octeto3 = bits.substr(16, 8);
    let octeto4 = bits.substr(24, 8);
    let dir = parseInt(octeto1, 2) + "." + parseInt(octeto2, 2) + "." + parseInt(octeto3, 2) + "." + parseInt(octeto4, 2);
    return dir;
}