let slova = ["PROGRAM", "SKOLA", "INTERNET", "MATURITA", "ELEKTROTECHNIKA", "JAVASCRIPT", "DATABAZE", "APLIKACE", "POCITAC", "KLAVESNICE", "INTERNET", "SERVER", "SIBENICE", "STUDENT", "UCITEL", "DOKUMENT", "SOUBOR", "PROJEKT", "ZABAVA", "PRAHA", "KRIZIK", "ALGORITMUS"];
let hadaneSlovo = "";
let uhodnutaPismena = [];
let chyby = 0;
let maxChyb = 6;
let napovedaPouzita = false;

function novaHra() {
    let nahodneCislo = Math.floor(Math.random() * slova.length);
    hadaneSlovo = slova[nahodneCislo];
    uhodnutaPismena = [];
    chyby = 0;
    napovedaPouzita = false;
    
    document.getElementById("zprava").innerHTML = "";
    document.getElementById("restart").style.display = "none";
    let tlacitkoN = document.getElementById("napoveda");
    tlacitkoN.disabled = false;
    tlacitkoN.style.backgroundColor = "orange";
    tlacitkoN.innerHTML = "Nápověda (-1 život)";

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
    if (chyby >= maxChyb) return;

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
    if (napovedaPouzita == true || chyby >= maxChyb) {
        return; 
    }
    
    napovedaPouzita = true;
    let tlacitkoN = document.getElementById("napoveda");
    tlacitkoN.disabled = true;
    tlacitkoN.style.backgroundColor = "grey";
    tlacitkoN.innerHTML = "Vyčerpáno";

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