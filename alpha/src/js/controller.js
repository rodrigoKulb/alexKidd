let controller = document.getElementById('afterCanvas')

controller.style.zoom = '59%'
let moveDireitaDiv = 0;
// controle para mobile
let divSoco = document.getElementById('soco'),
    divPulo = document.getElementById('pulo'),
    divSobe = document.getElementById('moveCima'),
    divDesce = document.getElementById('moveBaixo'),
    divEsquerda = document.getElementById('moveEsquerda'),
    divDireita = document.getElementById('moveDireita')

    document.getElementById("moveDireita").addEventListener("mouseenter", function(  ) { moveDireitaDiv=1;});
    document.getElementById("moveDireita").addEventListener("mouseleave", function(  ) { moveDireitaDiv=0;});

function detectaClick(id) {
    
    if (menu == 0) {
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
            personagem.andarRight = 1;
            i = i + 2;
        }
        if (id == 'moveCima') {
            personagem.abaixar()
            b = b - 2;
        } if (id == 'moveBaixo') {
            personagem.abaixar()
            b = b + 2;
        }
    } if (id == 'pause') {
        let valorSom = true
        if (menu == 0) menu = 2
        else menu = 0 & chamaSom(valorSom)

    } else {
        personagem.parado()
    }

}
