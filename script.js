let slova = ["PROGRAM", "SKOLA", "PRAHA", "INTERNET"];
let hadaneSlovo = "";
let uhodnutaPismena = [];
let chyby = 0;
let maxChyb = 6;

function novaHra() {
    let nahodneCislo = Math.floor(Math.random() * slova.length);
    hadaneSlovo = slova[nahodneCislo];
    uhodnutaPismena = [];
    chyby = 0;
    
    document.getElementById("zprava").innerHTML = "";
    document.getElementById("napoveda").disabled = false;
    document.getElementById("restart").style.display = "none";
    vykresliSlovo();
    vykresliKlavesnici();
    vykresliStav();
}
function vykresliSlovo() {
    let text = "";
    let vyhra = true;

    for (let i = 0; i < hadaneSlovo.length; i++) {
        let pismeno = hadaneSlovo[i];
        if (uhodnutaPismena.includes(pismeno) == true) {
            text = text + pismeno;
        } else {
            text = text + "_";
            vyhra = false;
        }
    }
    document.getElementById("slovo").innerHTML = text;

    if (vyhra == true) {
        konecHry("Vyhrál jsi!", "green");
    }
}
function vykresliKlavesnici() {
    let htmlKlavesnice = "";
    let abeceda = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    for (let i = 0; i < abeceda.length; i++) {
        let pismeno = abeceda[i];
        if (uhodnutaPismena.includes(pismeno) == true) {
            htmlKlavesnice += '<button disabled>' + pismeno + '</button>';
        } else {
            htmlKlavesnice += '<button onclick="hadej(\'' + pismeno + '\')">' + pismeno + '</button>';
        }
    }

    document.getElementById("klavesnice").innerHTML = htmlKlavesnice;
}
function hadej(pismeno) {
    uhodnutaPismena.push(pismeno);
    if (hadaneSlovo.includes(pismeno) == false) {
        chyby = chyby + 1;
        document.getElementById("stav").innerHTML = "Chyby: " + chyby + " / 6";
    }
    
    vykresliSlovo();
    vykresliKlavesnici();
    vykresliStav()
}

function dejNapovedu() {
    for (let i = 0; i < hadaneSlovo.length; i++) {
        let pismeno = hadaneSlovo[i];
        if (uhodnutaPismena.includes(pismeno) == false) {
            uhodnutaPismena.push(pismeno);
            chyby = chyby + 1;

            vykresliSlovo();
            vykresliKlavesnici();
            vykresliStav();
            return;
        }
    }
}

function vykresliStav() {
    document.getElementById("stav").innerHTML = "Chyby: " + chyby + " / " + maxChyb;
    if (chyby >= maxChyb) {
        konecHry("Prohrál jsi! Slovo bylo: " + hadaneSlovo, "red");
    }
}
function konecHry(zprava, barva) {
    let textElement = document.getElementById("zprava");
    textElement.innerHTML = zprava;
    textElement.style.color = barva;


    document.getElementById("napoveda").disabled = true;
    document.getElementById("restart").style.display = "inline";
    document.getElementById("klavesnice").innerHTML = "";
}