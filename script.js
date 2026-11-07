let slova = ["PROGRAM", "SKOLA", "PRAHA", "INTERNET"];
let hadaneSlovo = "";
let uhodnutaPismena = [];
let chyby = 0;

function novaHra() {
    let nahodneCislo = Math.floor(Math.random() * slova.length);
    hadaneSlovo = slova[nahodneCislo];
    uhodnutaPismena = [];
    chyby = 0;
    
    vykresliSlovo();
    vykresliKlavesnici();
}
function vykresliSlovo() {
    let text = "";
    for (let i = 0; i < hadaneSlovo.length; i++) {
        let pismeno = hadaneSlovo[i];
        if (uhodnutaPismena.includes(pismeno) == true) {
            text = text + pismeno;
        } else {
            text = text + "_";
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
}