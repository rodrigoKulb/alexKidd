let controller = document.getElementById('afterCanvas')

controller.style.zoom = '160%'

// controle para mobile
let divSoco = document.getElementById('soco'),
    divPulo = document.getElementById('pulo'),
    divSobe = document.getElementById('moveCima'),
    divDesce = document.getElementById('moveBaixo'),
    divEsquerda = document.getElementById('moveEsquerda'),
    divDireita = document.getElementById('moveDireita')

function detectaClick(id) {
    if (id == 'soco') {
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

    if (id == 'pulo') {
        personagem.segueRight = 0;
        personagem.segueLeft = 0;
        personagem.pular();
        console.log('PULEEEEEI')
        if ((menu == 1) && (flechaMenu <= 690) && (personagem.superForca == 1)) {
            personagem.superForca = 2;
        }
    }

    // movimentacao
    if (id == 'moveEsquerda') {
        personagem.andar('left')
        i = i - 2;
    }
    if (id == 'moveDireita') {
        personagem.andar('right')
        i = i + 2;
    }
    if (id == 'moveCima') {
        personagem.abaixar()
        b = b - 2;
    } if (id == 'moveBaixo') {
        personagem.abaixar()
        b = b + 2;
    } else {
        personagem.parado()
    }

}
