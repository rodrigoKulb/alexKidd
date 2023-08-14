let pressDown, pressUp, pressLeft, pressRight, pressX, pressZ, pressPause = 0;

document.getElementById("controleEsquerdo").addEventListener("touchstart", function (e) {
    let coordenadas = this.getBoundingClientRect();
    if (e.changedTouches[0].pageX >= coordenadas.width / 2) {
        pressRight = 1
    }
    else if (e.changedTouches[0].pageX < coordenadas.width / 2) {
        pressLeft = 1
    }
});
document.oncontextmenu = document.body.oncontextmenu = function() {return false;}

document.getElementById("controleDireito").addEventListener("touchstart", function (e) {
    let coordenadas = this.getBoundingClientRect();
    if (e.changedTouches[0].pageX-coordenadas.x >= coordenadas.width / 2) {
        pressZ = 1;
    }
    else if (e.changedTouches[0].pageX-coordenadas.x < coordenadas.width / 2) {
        pressX = 1;
    }
});

document.getElementById("controleEsquerdo").addEventListener("touchend", function () {
    pressRight = 0;
    pressLeft = 0;
});

document.getElementById("controleDireito").addEventListener("touchend", function () {
    pressZ = 0;
    pressX = 0;
});
