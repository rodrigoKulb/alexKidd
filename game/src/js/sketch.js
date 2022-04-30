// Rodrigo Kulb
// Alex Kidd em p5.js
// https://youtube.com/rodrigoKulb
// Direitos autorais da SEGA

const order = 8;
let N;
let total;
let ladoAnterior;
let path = [];

// sprites
let spritesheet,
    spritedata,
    pedraImgP,
    spritedataP,
    spritesheetP,
    animation = [],
    inimigos = []

// personagem e game
let jump = 0,
    down = 0,
    life = 5,
    counter = 0,
    menu = 0,
    i = 0,
    b = 0,
    flechaMenu = 620,
    pisca = 1

// sons
let backgroundSound,
    punchSound,
    coinSound,
    jumpingSound,
    diedSound,
    crashSound,
    enemyDiedSound

function preload() {
    // sprites
    spritedata = loadJSON('src/img/alex.json');
    spritesheet = loadImage('src/img/alex.png');
    pedraImgP = loadImage('src/img/pedra.png');
    spritedataP = loadJSON('src/img/fundo.json');
    spritesheetP = loadImage('src/img/fundo-01.png');
    bg = loadImage('src/img/fundo.png');
    menuImg = loadImage('src/img/menu.jpg');
    fontGame = loadFont('src/fonts/PixelGameFont.ttf');

    // sounds
    soundFormats('mp3', 'wav');
    backgroundSound = loadSound('src/sounds/level1.mp3');
    punchSound = createAudio('src/sounds/punch.wav');
    coinSound = loadSound('src/sounds/coins.wav');
    jumpingSound = loadSound('src/sounds/jumping1.wav');
    diedSound = createAudio('src/sounds/died.wav');
    crashSound = loadSound('src/sounds/crash.wav');
    enemyDiedSound = loadSound('src/sounds/crow.wav');
}

function setup() {

    createCanvas(256, 224);
    let frames = spritedata.frames;
    for (let i = 0; i < frames.length; i++) {
        let pos = frames[i].position;
        let img = spritesheet.get(pos.x, pos.y, pos.w, pos.h);
        animation.push(img);
    }

    //background(bg);
    personagem = new Personagem(44, 53, animation);
    cenario = new Cenario();

    araras = [[personagem.bloco*5,personagem.bloco*18],
    [personagem.bloco*8,personagem.bloco*25],
    [personagem.bloco*4,personagem.bloco*33],
    [personagem.bloco*10,personagem.bloco*36],
    [personagem.bloco*5,personagem.bloco*45],
    [personagem.bloco*5,personagem.bloco*49],
    [personagem.bloco*5,personagem.bloco*54],
    [personagem.bloco*5,personagem.bloco*63],
    [personagem.bloco*5,personagem.bloco*73],
    [personagem.bloco*3,personagem.bloco*80],
    [personagem.bloco*2,personagem.bloco*90],
    [personagem.bloco*2,personagem.bloco*93]];
    for (var linha = 0; linha < araras.length; linha++) {
        inimigos[linha] = new Inimigos(araras[linha][0], araras[linha][1], animation);
    }

    resolucao();
    let valorSom = true
    chamaSom(valorSom)
}

// inicia o som 
let settings = {
    vol: 0.2
}

function chamaSom(valorSom) {
    if (valorSom == true) {
        backgroundSound.loop(1, 1, settings.vol);
    }
    if (valorSom == false) {
        backgroundSound.stop()
    }
}

// introduction 
function intro() {
    // here goes the intro
}

function draw() {
    let gameCanvas = document.getElementById('defaultCanvas0')
    const ctx = gameCanvas.getContext("2d");
    let textPaused = document.getElementById('pausado')
    ctx.imageSmoothingEnabled = false
    background(1, 0, 252);

    // mapa
    if (menu == 1) {
        background(menuImg);
        if (pisca <= 5) image(animation[9], flechaMenu, 820);
        fill(255);
        textSize(50);
        textFont(fontGame);
        textAlign(RIGHT);
        text(personagem.money, 420, 930);
        text(personagem.life, 280, 1010);
        if (keyIsDown(LEFT_ARROW)) {
            if (flechaMenu >= 620) flechaMenu -= 10;
        } else if (keyIsDown(RIGHT_ARROW)) {
            if (flechaMenu <= 1200) flechaMenu += 10;
        }
        if (personagem.superForca == 1) {
            image(cenario.bg[19], 605, 870);
            if (flechaMenu <= 690) {
                pisca++;
                if (pisca >= 10) pisca = 1;
            } else pisca = 1;
        }
    }


    else if (menu == 2) {
        personagem.sairPause();
        let valorSom = false
        chamaSom(valorSom)
        gameCanvas.classList.add('im-paused')
        textPaused.removeAttribute('style')
        cenario.pedra(personagem)
        personagem.parado()
    }


    else {
        gameCanvas.classList.remove('im-paused')
        textPaused.setAttribute('style', 'display:none')
        cenario.pedra(personagem)
        personagem.normaliza(cenario, inimigos);
        for (let inimigo of inimigos) {
            inimigo.aparece(cenario, personagem);
        }

    }

}

function keyPressed() {
    // pausa e despausa
    if (key == 'p' || key == 'P') {
        let valorSom = true
        if (menu == 0) menu = 2
        else menu = 0 & chamaSom(valorSom)
    }

    // teclas não funcionais enquanto há pausa
    if (menu != 2) {
        // soco
        if (key == 'x' || key == 'X') {
            personagem.soco(cenario);
            punchSound.volume(0.4);
            if (personagem.superForca == 2) {
                personagem.vaisuperForca();
                personagem.forcaAndando = 0;
            }
            if ((menu == 1) && (flechaMenu <= 690) && (personagem.superForca == 1)) {
                personagem.superForca = 2;
            }
        }

        // pulo normal
        if (key == 'z' || key == 'Z') {
            personagem.segueRight = 0;
            personagem.segueLeft = 0;
            personagem.pular();
            if ((menu == 1) && (flechaMenu <= 690) && (personagem.superForca == 1)) {
                personagem.superForca = 2;
            }
        }

        // abre o mapa
        if (key == 'c' || key == 'C') {
            if (menu == 0) menu = 1;
            else menu = 0;
        }
    }

    // movimentacao
    if (key == 'ArrowRight') {
        personagem.passo = 0;
        i = i + 2;
    }
    if (key == 'ArrowLeft') {
        personagem.passo = 0;
        i = i - 2;
    }
    if (key == 'ArrowDown') {
        b = b + 2;
    }
    if (key == 'ArrowUp') {
        b = b - 2;
    }

}

function keyReleased() {
    // corrida 
    if (key == 'ArrowRight') {
        //personagem.passo = 0;
        //personagem.inercia(personagem.lado);
    }
    if (key == 'ArrowLeft') {
        //personagem.passo = 0;
        //personagem.inercia(personagem.lado);
    }

    // super soco
    if (key == 'z' || key == 'Z') {
        if (personagem.vy < 0) personagem.vy = 0;
    }
}

function resolucao() {
    let canvas = document.getElementById('defaultCanvas0');
    if (canvas) {
        const rel = 1.142857143;
        const height = window.innerHeight;
        const width = window.innerWidth;
       
        if (height > width) {
            console.log(width / rel);
            canvas.style.width = width + "px";
            canvas.style.height = (width / rel) + "px";
            canvas.style.imageRendering = 'pixelated';
        } else {
            console.log(height * rel);
            canvas.style.width = (height * rel) + "px";
            canvas.style.height = height + "px";
            canvas.style.imageRendering = 'pixelated';
        }
    }
}

// caso usuario saia da aba o jogo pausa
document.addEventListener('visibilitychange', () => { 
    let state = document.visibilityState
    if(state == 'hidden') menu = 2 & backgroundSound.pause()
    if(state == 'visible') menu = 2
})
