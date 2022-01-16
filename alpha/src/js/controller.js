// pega o tamanho do canvas criado e define no css  
function canvasSizing() {
    let gameCanvas = document.getElementById('defaultCanvas0'),
        gameCanvasWidth = gameCanvas.style.width,
        gameCanvasHeight = gameCanvas.style.height

    // printa o tamanho do canvas
    console.log(`Y: ${gameCanvasHeight}` + '\n' + `X: ${gameCanvasWidth}`)
    var domCSS = document.querySelectorAll(':root')[0],
        cssComputed = getComputedStyle(domCSS)
    domCSS.style.setProperty('--game-canvas-width', gameCanvasWidth)
    domCSS.style.setProperty('--game-canvas-height', gameCanvasHeight)
    console.log(cssComputed.getPropertyValue('--game-canvas-width'))
}
setTimeout(canvasSizing, 1500)

let pressDown, pressLeft, pressRight, pressX, pressZ, pressPause = 0;


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
        pressX = 1;
    }
    else if (e.changedTouches[0].pageX-coordenadas.x < coordenadas.width / 2) {
        pressZ = 1;
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


document.getElementById("moveDireita").addEventListener("touchstart", function () { pressRight = 1; });
document.getElementById("moveDireita").addEventListener("touchend", function () { pressRight = 0; });

document.getElementById("moveEsquerda").addEventListener("touchstart", function () { pressLeft = 1; });
document.getElementById("moveEsquerda").addEventListener("touchend", function () { pressLeft = 0; });

document.getElementById("pulo").addEventListener("touchstart", function () { pressZ = 1; });
document.getElementById("pulo").addEventListener("touchend", function () { pressZ = 0; });

document.getElementById("soco").addEventListener("touchstart", function () { pressX = 1; });
document.getElementById("soco").addEventListener("touchend", function () { pressX = 0; });

document.getElementById("pause").addEventListener("touchstart", function () { pressPause = 1; });
document.getElementById("pause").addEventListener("touchend", function () { pressPause = 0; });  
