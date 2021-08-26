// Rodrigo Kulb
// Alex Kidd em p5.js
// https://youtube.com/rodrigoKulb
// Direitos autorais da SEGA

const order = 8;
let N;
let total;
let ladoAnterior;
let path = [];
let jump = 0;
let down = 0;
let life = 5;
let spritesheet;
let spritedata;
let pedraImgP;
let spritedataP;
let spritesheetP;
let animation = [];
let inimigos = [];
let counter = 0;
let menu = 0;
let i = 0;
let b = 0;
let flechaMenu = 620;
let pisca = 1;
let backgroundSound;


function preload() {
    spritedata = loadJSON('src/img/alex.json');
    spritesheet = loadImage('src/img/alex.png');
    pedraImgP = loadImage('src/img/pedra.png');
    spritedataP = loadJSON('src/img/fundo.json');
    spritesheetP = loadImage('src/img/fundo-01.png');
    bg = loadImage('src/img/fundo.png');
    menuImg = loadImage('src/img/menu.jpg');
    fontGame = loadFont('src/fonts/PixelGameFont.ttf');
    soundFormats('mp3', 'wav');

    // sounds
    backgroundSound = loadSound('src/sounds/level1.mp3');
    punchSound = createAudio('src/sounds/punch.wav');
    coinSound = loadSound('src/sounds/coins15.mp3');
    jumpingSound = loadSound('src/sounds/jumping.wav');
    diedSound = createAudio('src/sounds/died.wav');
}

function setup() {

    createCanvas(1440, 1080);

    let frames = spritedata.frames;
    for (let i = 0; i < frames.length; i++) {
        let pos = frames[i].position;
        let img = spritesheet.get(pos.x, pos.y, pos.w, pos.h);
        animation.push(img);
    }

    //background(bg);
    personagem = new Personagem(250, 300, animation);
    cenario = new Cenario();
    inimigos[0] = new Inimigos(400, 1600, animation);
    inimigos[1] = new Inimigos(650, 2185, animation);
    inimigos[2] = new Inimigos(275, 2885, animation);
    inimigos[3] = new Inimigos(275, 3180, animation);
    inimigos[4] = new Inimigos(275, 3180, animation);
    inimigos[5] = new Inimigos(400, 3990, animation);
    inimigos[6] = new Inimigos(350, 4350, animation);
    inimigos[7] = new Inimigos(550, 4800, animation);
    inimigos[8] = new Inimigos(550, 5610, animation);
    inimigos[9] = new Inimigos(550, 6510, animation);
    inimigos[10] = new Inimigos(95, 7140, animation);
    inimigos[11] = new Inimigos(95, 8040, animation);
    inimigos[12] = new Inimigos(95, 8310, animation);

    backgroundSound.loop(1, 1, 0.2); // % do volume

}

function draw() {
    background(1, 0, 252);
    //background(bg);
    if (menu == 1) {
        background(menuImg);
        if (pisca <= 5) image(animation[9], flechaMenu, 820);
        fill(255);
        textSize(50);
        textFont(fontGame);
        textAlign(RIGHT);
        text(personagem.money, 420, 930);
        text(personagem.life, 280, 1010);
        //console.log(i+","+b);
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
    } else {
        cenario.pedra();

        if (keyIsDown('x')) {
            personagem.soco(cenario);
        } else if (keyIsDown(LEFT_ARROW)) {
            personagem.andar("left");
        } else if (keyIsDown(RIGHT_ARROW)) {
            personagem.andar("right");
        } else if (keyIsDown(DOWN_ARROW)) {
            personagem.abaixar();
        } else {
            personagem.parado();
        }

        personagem.normaliza(cenario, inimigos);

        for (let inimigo of inimigos) {
            inimigo.aparece(cenario, personagem);
        }



    }


}

function keyPressed() {
    if (key == 'x') {
        personagem.soco(cenario);
        punchSound.volume(0.4);
        punchSound.play();
        if (personagem.superForca == 2) {
            personagem.vaisuperForca();
            personagem.forcaAndando = 0;
        }
        if ((menu == 1) && (flechaMenu <= 690) && (personagem.superForca == 1)) {
            personagem.superForca = 2;
        }
    } else if (key == 'z') {
        personagem.segueRight = 0;
        personagem.segueLeft = 0;
        personagem.pular();
        if ((menu == 1) && (flechaMenu <= 690) && (personagem.superForca == 1)) {
            personagem.superForca = 2;
        }
    } else if (key == 'c') {
        if (menu == 0) menu = 1;
        else menu = 0;
    }
    if (key == 'ArrowRight') {
        i = i + 10;

    }
    if (key == 'ArrowLeft') {
        i = i - 10;
    }
    if (key == 'ArrowDown') {
        b = b + 10;
    }
    if (key == 'ArrowUp') {
        b = b - 10;
    }

}

function keyReleased() {
    if (key == 'ArrowRight') {
        if (personagem.noar) personagem.segueRight = 5;
        personagem.z = 0;
        //personagem.xStopR = 0;
        //personagem.xStopL = 0;
    }
    if (key == 'ArrowLeft') {
        if (personagem.noar) personagem.segueLeft = 5;
        personagem.z = 0;
        //personagem.xStopL = 0;
        //personagem.xStopR = 0;
    }
    if (key == 'z') {
        if (personagem.vy < 0) personagem.vy = 0;
    }
}
