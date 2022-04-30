// JavaScript Document

class Inimigos {

	constructor(x, y, animation) {
		this.x = x;
		this.y = y;
		this.animation = animation;
		this.count = 0;
		this.soma = +0.45;
		this.inimigoAltura = 0;
		this.morreu = 0;
		this.fumaca = 0;
	}

	aparece(cenario, personagem) {
		if (!(this.morreu)) {
			this.count++;
			if (this.count <= 20) this.img = 10;
			else if (this.count <= 39) this.img = 11;
			else this.count = 0;
			if(personagem.morreu == 0) this.x = this.x + this.soma;
			this.inimigoAltura = this.y - cenario.scrollPer;
			//rect(personagem.personagemX, personagem.personagemY, personagem.pesonagemTamanhoX, personagem.pesonagemTamanhoY);
			///rect(this.x-personagem.bloco*0.2, this.y - cenario.scrollPer + personagem.bloco, personagem.bloco*1.3, personagem.bloco);
			if (personagem.nosoco >= 1) {
				//rect(personagem.personagemXSoco, personagem.personagemYSoco, personagem.pesonagemTamanhoXSoco, personagem.pesonagemTamanhoYSoco);
				var matou = collideRectRect(personagem.personagemXSoco, personagem.personagemYSoco, personagem.pesonagemTamanhoXSoco, personagem.pesonagemTamanhoYSoco,
					this.x - personagem.bloco * 0.2, this.y - cenario.scrollPer + personagem.bloco, personagem.bloco * 1.3, personagem.bloco);
				if (matou) {
					this.morreu = 1;
					enemyDiedSound.play();
				}
			}

			var morreu = collideRectRect(personagem.personagemX, personagem.personagemY, personagem.pesonagemTamanhoX, personagem.pesonagemTamanhoY,
				this.x, this.y - cenario.scrollPer + personagem.bloco, personagem.bloco, personagem.bloco);
			if (morreu && personagem.morreu == 0 && personagem.inmortal == 0) {
				noLoop();
				personagem.morreu = 1;
				personagem.life = personagem.life - 1;
				//personagem.y = personagem.y + 6 - 10 - 5;
				setTimeout(function () { loop(); }, 2000);
			}
			push();

			if (this.soma > 0) {
				image(this.animation[this.img], this.x - personagem.bloco * 0.5, this.y - cenario.scrollPer + personagem.bloco * 0.5);
			}
			else {
				scale(-1, 1);
				image(this.animation[this.img], -this.x - personagem.bloco * 1.5, this.y - cenario.scrollPer + personagem.bloco * 0.5);
			}
			pop();

		}
		else {
			if (this.fumaca <= 10) {
				image(this.animation[17], this.x - personagem.bloco * 0.5, this.y - cenario.scrollPer + personagem.bloco * 0.5);
				this.fumaca++;
			}
		}
	}
}
