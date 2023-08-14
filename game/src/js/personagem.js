// JavaScript Document

class Personagem {

  constructor(x, y, animation) {
    this.x = x;
    this.y = y;
    this.bloco = 16;
    this.pixel = 1;
    this.animaPassos = 0;
    this.animation = animation;
    this.gravity = 0.14;
    this.vy = 1;
    this.noar = 0;
    this.img = 0;
    this.inmortal = 0;
    this.nosoco = 0;
    this.lado = 'right';
    this.nobaixo = 0;
    this.segueRight = 0;
    this.segueLeft = 0;
    this.xMenorL = 0;
    this.money = 0;
    this.life = 3;
    this.forcaAndando = 0;
    this.morreu = 0;
    this.morSoma = 0;
    this.morSomaY = 0;
    this.taAgua = 0;
    this.menu = 0;
    this.passo = 0;
    this.yPara = 0;
  }

  sairPause() {
    if (pressPause && menu == 2) {
      let valorSom = true;
      menu = 0 & chamaSom(valorSom);
    }
  }

  adicionarControle(cenario) {
    if (pressZ && this.noar == 0) {
      this.segueRight = 0;
      this.segueLeft = 0;
      this.pular();
    } else if (pressZ == 0) {
      if (this.vy < 0) this.vy = 0;
    }
    if (pressPause && menu == 0) {
      menu = 2;
    }
    if (keyIsDown('x') || (pressX && this.nosoco == 0)) {
      this.soco(cenario);
    } else if (keyIsDown(LEFT_ARROW) || pressLeft) {
      this.andar("left");
    } else if (keyIsDown(RIGHT_ARROW) || pressRight) {
      this.andar("right");
    } else if (keyIsDown(DOWN_ARROW) || pressDown) {
      this.abaixar();
    } else if (keyIsDown(UP_ARROW) || pressUp) {
      this.subir();
    } else {
      this.parado();
    }
  }

  limitarTela() {
    if (cenario.scrollPer <= cenario.mapLevel.length * this.bloco - 16 * this.bloco) {
      if (this.y >= this.bloco * 5) {
        cenario.scrollPer = cenario.scrollPer + 2;
        this.y = this.bloco * 5;
      }
    } else if (cenario.scrollHorizontal <= cenario.mapLevel[cenario.mapLevel.length - 1].length * this.bloco - 15 * this.bloco) {
      if (this.x >= this.bloco * 10) {
        if (this.xMenorR > this.personagemX + this.pesonagemTamanhoX + this.pixel * 2 + this.passo) {
          cenario.scrollHorizontal = cenario.scrollHorizontal + this.passo;
          this.x = this.bloco * 10;
        }
      }
    }
  }

  pegarAreaSoco() {
    if (this.lado == 'left') {
      this.personagemXSoco = this.x - this.bloco * 1.5 - this.pixel * 6;
      this.personagemYSoco = this.y + this.bloco * 0.8;
      this.pesonagemTamanhoXSoco = this.bloco - this.pixel * 4;
      this.pesonagemTamanhoYSoco = this.bloco * 0.8;
      //rect(this.personagemXSoco, this.personagemYSoco, this.pesonagemTamanhoXSoco, this.pesonagemTamanhoYSoco);
    } else {
      this.personagemXSoco = this.x - this.bloco * 1.5 + this.pixel * 10;
      this.personagemYSoco = this.y + this.bloco * 0.8;
      this.pesonagemTamanhoXSoco = this.bloco - this.pixel * 4;
      this.pesonagemTamanhoYSoco = this.bloco * 0.8;
      //rect(this.personagemXSoco, this.personagemYSoco, this.pesonagemTamanhoXSoco, this.pesonagemTamanhoYSoco);
    }
  }

  pegarAreaPersonagem() {
    if (this.taAgua) {
      //rect(this.personagemX, this.personagemY, this.pesonagemTamanhoX, this.pesonagemTamanhoY);
      this.personagemX = this.x - this.bloco * 1.4;
      this.personagemY = this.y + this.bloco * 0.5;
      this.pesonagemTamanhoX = this.bloco * 1.2;
      this.pesonagemTamanhoY = this.bloco - this.pixel * 2;
      this.diferencaRotacao = this.bloco * 1.55;
    } else {
      this.personagemX = this.x - this.bloco * 1.5 + this.pixel * 2;
      this.personagemY = this.y + this.bloco * 0.3;
      this.pesonagemTamanhoX = this.bloco - this.pixel * 4;
      this.pesonagemTamanhoY = this.bloco * 1.4;
      this.diferencaRotacao = this.bloco * 2;
    }
  }

  pegarColisaoPiso(cenario, coluna, linha) {
    if (
      ((coluna * this.bloco + this.bloco - cenario.scrollHorizontal > this.personagemX &&
          coluna * this.bloco - cenario.scrollHorizontal < this.personagemX) ||
        (coluna * this.bloco + this.bloco - cenario.scrollHorizontal > this.personagemX + this.pesonagemTamanhoX &&
          coluna * this.bloco - cenario.scrollHorizontal < this.personagemX + this.pesonagemTamanhoX)) &&
      linha * this.bloco - cenario.scrollPer > this.personagemY && (this.loopPegaPiso == 0)) {
      this.yMenorPiso = (linha * this.bloco - cenario.scrollPer);
      this.loopPegaPiso = 1;
      //rect((coluna * this.bloco - cenario.scrollHorizontal), (linha * this.bloco) - cenario.scrollPer, this.bloco, this.bloco);
    }
  }

  pegarColisaoTopo(cenario, coluna, linha) {
    if (
      ((coluna * this.bloco + this.bloco - cenario.scrollHorizontal > this.personagemX &&
          coluna * this.bloco - cenario.scrollHorizontal < this.personagemX) ||
        (coluna * this.bloco + this.bloco - cenario.scrollHorizontal > this.personagemX + this.pesonagemTamanhoX &&
          coluna * this.bloco - cenario.scrollHorizontal < this.personagemX + this.pesonagemTamanhoX)) &&
      linha * this.bloco - cenario.scrollPer < this.personagemY) {
      this.yMaiorTopo = (linha * this.bloco - cenario.scrollPer);
      //rect((coluna * this.bloco - cenario.scrollHorizontal), (linha * this.bloco) - cenario.scrollPer, this.bloco, this.bloco);
    }
  }

  pegarColisaoDasLaterais(linha, coluna, cenario, mapa) {
    this.x = Math.round(this.x);
    if (((linha * this.bloco + this.pixel * 10) - cenario.scrollPer) > this.personagemY &&
      ((linha * this.bloco) - cenario.scrollPer) < this.personagemY + this.pesonagemTamanhoY) {
      if ((this.personagemX) < ((coluna * this.bloco) - cenario.scrollHorizontal)) {
        if (this.xMenorR >= ((coluna * this.bloco) - cenario.scrollHorizontal) || this.xMenorR == 0) {
          this.xMenorR = ((coluna * this.bloco) - cenario.scrollHorizontal);
          this.xMenorR = Math.trunc(this.xMenorR);
          //rect((coluna * this.bloco) - cenario.scrollHorizontal, (linha * this.bloco) - cenario.scrollPer, this.bloco, this.bloco);
          //rect(this.personagemX, this.personagemY, this.pesonagemTamanhoX, this.pesonagemTamanhoY)

        }
      } else {
        if (this.xMenorL <= ((coluna * this.bloco) + this.bloco - cenario.scrollHorizontal) || this.xMenorR == 0) {
          this.xMenorL = ((coluna * this.bloco) + this.bloco - cenario.scrollHorizontal);
          //rect((coluna * this.bloco)  - cenario.scrollHorizontal, (linha * this.bloco) - cenario.scrollPer, this.bloco, this.bloco);
          //
        }
      }
    }
  }

  colisaoInimigoParede(inimigos, linha, coluna) {
    for (let inimigo of inimigos) {
      if (((linha * this.bloco) - cenario.scrollPer) <= inimigo.inimigoAltura + this.bloco && ((linha * this.bloco) - cenario.scrollPer) + this.bloco >= inimigo.inimigoAltura + this.bloco) {
        var hitInimigo = collideRectRect(inimigo.x - personagem.bloco * 0.2, inimigo.inimigoAltura + this.bloco, this.bloco * 1.3, this.bloco - 5, (coluna * this.bloco), (linha * this.bloco) - cenario.scrollPer, this.bloco, this.bloco - 5);
        if (hitInimigo) {
          //rect(inimigo.x, inimigo.inimigoAltura + this.bloco, this.bloco, this.bloco);
          if (inimigo.soma > 0) {
            inimigo.x = inimigo.x - 1;
            inimigo.soma = inimigo.soma * -1;
          } else {
            inimigo.x = inimigo.x + 1;
            inimigo.soma = inimigo.soma * -1;
          }
        }
      }
    }
  }

  colisao(cenario, inimigos) {
    this.pegarAreaPersonagem();
    this.pegarAreaSoco();
    this.xMenorR = 0;
    this.xMenorL = 0;
    this.yMaiorTopo = 0;
    for (var linha = 0; linha < cenario.mapLevel.length; linha++) {
      let mapa = cenario.mapLevel[linha];
      for (var coluna = 0; coluna < mapa.length; coluna++) {
        //stroke('rgba(0,0,0,1)');
        //fill('rgba(100%,0%,100%,0)');
        //rect((coluna * this.bloco), (linha * this.bloco) - cenario.scrollPer, this.bloco, this.bloco);


        let naoColidir = [5, 6, 16, 15, 12, 13, 20, 22, 23, 24, 24, 25, 26, 27];
        let objetos = [15, 16, 20];
        if (mapa[coluna] && (naoColidir.indexOf(mapa[coluna]) == -1)) {
          var superBloco = this.quebraSuperForca(mapa, coluna, linha);
          this.pegarColisaoTopo(cenario, coluna, linha);
          this.pegarColisaoPiso(cenario, coluna, linha);
          this.pegarColisaoDasLaterais(linha, coluna, cenario, mapa);
          this.colisaoInimigoParede(inimigos, linha, coluna);
        } else if (objetos.indexOf(mapa[coluna]) >= 0) {
          let colisaoObjeto = collideRectRect(this.personagemX, this.personagemY, this.pesonagemTamanhoX - this.pixel * 2, this.pesonagemTamanhoY - this.pixel * 2, (coluna * this.bloco), (linha * this.bloco) - cenario.scrollPer, this.bloco, this.bloco);
          if (colisaoObjeto) {
            switch (mapa[coluna]) {
              case 15:
                this.money = this.money + 20;
                coinSound.play();
                break;
              case 16:
                this.money = this.money + 10;
                coinSound.play();
                break;
              case 20:
                this.superForca = 1;
                superforcaSound.play();
                break;
            }
            cenario.mapLevel[linha][coluna] = 0;
          }
        } else if (mapa[coluna] >= 25 && mapa[coluna] <= 27) {
          var hit = collideRectRect(this.personagemX, this.personagemY, this.pesonagemTamanhoX, this.pesonagemTamanhoY, (coluna * this.bloco), (linha * this.bloco) - cenario.scrollPer, this.bloco, this.bloco);
          if (hit) {
            this.taAgua = 1;
            // se não tiver tocando o som iniciar
            if (!level2.isPlaying()) {
              let valorSom = true
              chamaSom(valorSom,'2')
            }
           
            naoColidir = naoColidir.splice(naoColidir.indexOf('22'), 1);
          }
        }
        if (superBloco) {
          if (superBloco == 'zero') superBloco = 0;
          mapa[coluna] = superBloco;
        }
      }
    }
  }

  animarMorte() {
    this.morSoma++;
    this.morSomaY = this.morSomaY - 0.8;
    if (this.morSoma <= 8) this.ImgMorte = 12;
    else if (this.morSoma <= 16) {
      this.ImgMorte = 13;
    } else {
      this.morSoma = 0;
    }
    image(this.animation[this.ImgMorte], this.x - this.bloco * 2, this.y + this.morSomaY);
    diedSound.volume(0.5)
    diedSound.play()
    if (this.y + this.morSomaY < (-40)) {
      this.inmortal = 100;
      this.morreu = 0;
      this.morSoma = 0;
      this.morSomaY = 0;
      this.x = this.xMenorL + this.bloco;
      this.y = this.y + 38;
    }
  }

  fisicaDoPulo() {
    if ((this.noar) && (this.morreu == 0)) {
      if (keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW)) {
        if (this.ultimoLado != this.lado) {
          this.passo = 0;
          //console.log('passo: '+this.passo)
        }
        if (this.passo <= 1.5) {
          this.passo + 0.01;
        }
      } else {
        if (this.passo >= 0) {
          this.passo - 0.02;
        }
      }
      if ((this.xMenorL < this.personagemX - this.pixel * 2) && (this.lado == 'left')) {
        this.x = this.x - this.passo;
      }
      if ((this.xMenorR > this.personagemX + this.pesonagemTamanhoX + this.passo) && (this.lado == 'right')) {
        this.x = this.x + this.passo;
        //if(this.inercia>=1.5) this.inercia = 1.5;
        //else this.inercia+= 0.1;
      }
    }
  }

  terminaInmortalidade() {
    if (this.inmortal) {
      this.inmortal = this.inmortal - 0.5;
    }
  }

  tempoDoSoco() {
    if (this.nosoco) {
      this.nosoco++;
    }
    if (this.nosoco >= 15) {
      this.nosoco = 0;
    }
  }

  bloqueioTopoBase() {
    if (this.taAgua) {
      //     this.gravity = 0;
           //this.vy -= 0.1;
           //this.y += this.vy;

    } else {
      //rect(this.personagemX,this.personagemY, this.pesonagemTamanhoX, this.pesonagemTamanhoY);
      if (this.personagemY + this.pesonagemTamanhoY >= this.yMenorPiso && this.vy >= -3.3) {
        this.y = this.yMenorPiso - this.pesonagemTamanhoY - this.personagemY + this.y
          //rect(this.x,this.y, this.bloco, this.bloco);
        this.vy = 0;
        this.noar = 0;
        if (this.vy > 10) this.vy = 1;
      } else {
        this.y += this.vy;
        this.vy += this.gravity;
        this.noar = 1;
      }
      if (this.personagemY <= this.yMaiorTopo + this.bloco) {
        this.y = this.yMaiorTopo + this.bloco - this.personagemY + this.y;
        this.vy += 0.8;
      }
    }
  }
  zerarLoop() {
    this.loopPega = 0;
    this.loopPegaPiso = 0;
  }

  normaliza(cenario, inimigos) {

    if (this.morreu == 1) {
      this.animarMorte();
    } else {
      this.adicionarControle(cenario);
      this.limitarTela();
      this.zerarLoop();
      this.colisao(cenario, inimigos);
      this.fisicaDoPulo();
      this.tempoDoSoco();
      this.bloqueioTopoBase();
      this.terminaInmortalidade();
    }
    if (this.passo <= 0) { this.passo = 0; }
  }


  parado() {
    const data = new Date(); // momento atual 
    const milisegundos = data.getMilliseconds();
    if (this.passo >= 1 && this.noar == 0) this.passo -= 0.15;
    else if (this.noar == 0) this.passo = 0;

    if (this.morreu == 0) {
      this.impulso = 0;
      push();
      if (this.taAgua) {
        if (this.nosoco) this.img = 16;
        else if (milisegundos <= 500) this.img = 14;
        else if (milisegundos <= 1000) this.img = 15;
      } else {
        if (this.nosoco) this.img = 6;
        else if (this.noar) {
          this.img = 5;
          this.passo -= 0.05;
        } else this.img = 4;
      }
      //console.log(this.img);
      if (this.lado == 'left') {
        scale(-1, 1);

        //rect(-this.x, this.y, this.bloco * 2, this.bloco * 2);
        image(this.animation[this.img], -this.x, this.y);
        if ((this.nosoco == 0 && this.noar == 0)) {
          if (this.xMenorL < this.personagemX - this.pixel * 2) {
            this.x = this.x - this.passo;
          }
        }

      } else {

        //rect(this.x - this.bloco * 2, this.y, this.bloco * 2, this.bloco * 2);
        image(this.animation[this.img], this.x - this.diferencaRotacao, this.y);
        if ((this.nosoco == 0 && this.noar == 0)) {
          if (this.xMenorR > this.personagemX + this.pesonagemTamanhoX + this.pixel * 2 + this.passo) {
            this.x = this.x + this.passo;
          }
        }
      }
      pop();
    }
  }

  andar(lado) {
    //console.log("xMenor: "+ this.xMenorR);
    //console.log("this.x: "+(this.personagemX + this.pesonagemTamanhoX + this.pixel * 2));
    const data = new Date(); // momento atual 
    const milisegundos = data.getMilliseconds();

    if (this.x != this.xOld) this.impulso = 1;
    this.lado = lado;
    this.ultimoLado = this.lado;

    if (this.taAgua) {
      this.passo += 0.05;
      if (this.passo >= 0.8) this.passo = 0.8;
      if (this.nosoco) this.b = 16;
      else if (milisegundos <= 500) this.b = 14;
      else if (milisegundos <= 1000) this.b = 15;
    } else {
      this.passo += 0.12;
      if (this.passo >= 2) this.passo = 2;
      if (this.nosoco) this.b = 6;
      else if (this.noar) this.b = 5;
      else if (this.animaPassos <= 4) this.b = 0;
      else if (this.animaPassos <= 8) this.b = 1;
      else if (this.animaPassos <= 12) this.b = 2;
      else if (this.animaPassos <= 16) { this.b = 3; } else if (this.animaPassos <= 19) { this.animaPassos = 0; } else { this.animaPassos = 0; }
    }
    push();
    if (lado == 'left') {
      scale(-1, 1);
      //rect(-this.x, this.y, this.bloco * 2, this.bloco * 2);
      image(this.animation[this.b], -this.x, this.y);
      if ((this.nosoco == 0 && this.noar == 0)) {
        if (this.xMenorL < this.personagemX - this.pixel * 2) {
          this.x = this.x - this.passo;
        }
      }
    } else {
      scale(1, 1);
      //rect(this.x - this.bloco * 2, this.y, this.bloco * 2, this.bloco * 2);
      image(this.animation[this.b], this.x - this.diferencaRotacao, this.y);
      if ((this.nosoco == 0 && this.noar == 0)) {
        if (this.xMenorR > this.personagemX + this.pesonagemTamanhoX + this.pixel * 2 + this.passo) {
          this.x = this.x + this.passo;
        }
      }
    }
    this.animaPassos++;
    pop();
    this.xOld = this.x;
  }

  pular(tipo) {
    if ((this.noar == 0) && (this.morreu == 0)) {
      jumpingSound.play();
      if (tipo == "image") {
        push();
        if (this.lado == 'left') {
          scale(-1, 1);
          image(this.animation[5], -this.x, this.y);
          if (keyIsDown(LEFT_ARROW) && (this.segueLeft == 0)) {
            //this.x = this.x - 1;
          }
          //console.log(5*this.inverte);
        } else {
          image(this.animation[5], this.x - this.bloco * 2, this.y);
          if (keyIsDown(RIGHT_ARROW) && (this.segueRight == 0)) {
            //this.x = this.x + 1;
          }
        }
        pop();

      } else {
        if (this.impulso) this.vy = -4;
        else this.vy = -3.6;
      }
      this.noar = 1;
    }
  }

  soco(cenario) {
    if (this.nosoco == 0) {
      punchSound.play();
      this.nosoco = 1;
      cenario.soco = 1;
      cenario.x = this.x;
      cenario.y = this.y;
      cenario.vy = 2;
      push();
      if (this.lado == 'left') {
        scale(-1, 1);
        image(this.animation[6], -this.x, this.y);
        //zx('soco');
        //cenario.x = cenario.x - 220;
      } else {
        scale(1, 1);
        image(this.animation[6], this.x - this.bloco * 2, this.y);

      }
      pop();
    }
  }

  abaixar() {
    if (this.passo >= 0) this.passo -= 0.15;
    if (this.taAgua) {
      this.y = this.y + 0.7;

    } else if (this.nosoco) this.img = 6;
    else if (this.noar) this.img = 5;
    else this.img = 7;
    this.nobaixo = 1;
    push();
    if (this.lado == 'left') {

      scale(-1, 1);
      image(this.animation[this.img], -this.x, this.y);
      if ((this.nosoco == 0 && this.noar == 0)) {
        if (this.xMenorL < this.personagemX - this.pixel * 2) {
          this.x = this.x - this.passo;
        }
      }
      //console.log('soco');
    } else {

      scale(1, 1);
      image(this.animation[this.img], this.x - this.diferencaRotacao, this.y);
      if ((this.nosoco == 0 && this.noar == 0)) {
        if (this.xMenorR > this.personagemX + this.pesonagemTamanhoX + this.pixel * 2) {
          this.x = this.x + this.passo;
        }
      }
    }
    pop();
  }

  subir(){
    if (this.taAgua) {
      this.y = this.y - 0.7;
    }
    push();
    if (this.lado == 'left') {

      scale(-1, 1);
      image(this.animation[this.img], -this.x, this.y);
      if ((this.nosoco == 0 && this.noar == 0)) {
        if (this.xMenorL < this.personagemX - this.pixel * 2) {
          this.x = this.x - this.passo;
        }
      }
      //console.log('soco');
    } else {

      scale(1, 1);
      image(this.animation[this.img], this.x - this.diferencaRotacao, this.y);
      if ((this.nosoco == 0 && this.noar == 0)) {
        if (this.xMenorR > this.personagemX + this.pesonagemTamanhoX + this.pixel * 2) {
          this.x = this.x + this.passo;
        }
      }
    }
    pop();
  }

  vaisuperForca() {
    if (this.forcaAndando == 0) {
      this.yForca = this.y + 65;
      this.xForca = this.x;
      this.forcaAndando = 1;
      this.cenarioIni = cenario.scrollPer;
      this.forcaxMenorR = this.xMenorRForca;
      this.forcaxMenorL = this.xMenorLForca;
      this.forcaLado = this.lado;
    } else if (this.forcaAndando == 1) {
      push();
      if (this.forcaLado == 'left') {
        scale(-1, 1);
        this.xForca = this.xForca - 25;
        image(this.animation[8], -this.xForca + 180, this.yForca + this.cenarioIni - cenario.scrollPer);
        //console.log('soco');
        if (this.xForca <= this.forcaxMenorL + 190) {
          this.forcaAndando = 3;
        }
      } else {
        scale(1, 1);
        this.xForca = this.xForca + 25;
        image(this.animation[8], this.xForca - 190 + 180, this.yForca + this.cenarioIni - cenario.scrollPer);
        if (this.xForca >= this.forcaxMenorR) {
          this.forcaAndando = 3;
        }
      }
      pop();
    }
  }

  quebraSuperForca(mapa, coluna, linha) {
    if (this.forcaLado == 'left') this.redusX = this.xForca - 280;
    else this.redusX = this.xForca - 10
      //rect(this.redusX, this.yForca+this.cenarioIni-cenario.scrollPer+20,this.bloco,45);

    var hitSoco = collideRectRect(this.redusX, this.yForca + this.cenarioIni - cenario.scrollPer + 20, this.bloco, 45, (coluna * this.bloco), (linha * this.bloco) - cenario.scrollPer, this.bloco, this.bloco);
    if ((mapa[coluna] == 9 || mapa[coluna] == 10 || mapa[coluna] == 19 || mapa[coluna] == 18) && (hitSoco)) {
      //rect((c*this.bloco),(b*this.bloco)-cenario.scrollPer,this.bloco,this.bloco);
      if (mapa[coluna] == 9) {
        if (random(0, 1) >= 0.5) {
          return 15;
        } else {
          return 16;
        }
      }
      if (mapa[coluna] == 10 || mapa[coluna] == 18) return 'zero';
      if (mapa[coluna] == 19) return 20;
    } else {
      return false;
    }
  }
}