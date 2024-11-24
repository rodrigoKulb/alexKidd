// JavaScript Document
/** mapLevel
 * 10 - pedra
 */
class Cenario {
	constructor(x, y, animation) {
		this.x = x;
		this.y = y;
		this.linha = 0;
		this.coluna = 0;
		this.scrollPer = 1;
		this.scrollHorizontal = 0;
		this.bg = [];
		this.frames = 0;
		this.soco = 0;
		this.aguaCor = 0;
		this.somaCor = 0;
		this.limiteHorizontal = 0;
		// 10: pedra, 9: caixote, 19: caixa surpresa
		this.quebraveis = [10, 9, 19, 35];
		this.mapLevel = [];
		this.frames = spritedataP.frames;
		for (let i = 0; i < this.frames.length; i++) {
			let pos = this.frames[i].position;
			let img = spritesheetP.get(pos.x, pos.y, pos.w, pos.h);
			this.bg.push(img);
		}
	}

	verificaSoco(personagem) {
		//rect(personagem.personagemXSoco, personagem.personagemYSoco, personagem.pesonagemTamanhoXSoco, personagem.pesonagemTamanhoYSoco);
		//rect(this.coluna * personagem.bloco - this.scrollHorizontal, (this.linha * personagem.bloco) - this.scrollPer, personagem.bloco, personagem.bloco);
		if (personagem.nosoco == 7) {
			if (collideRectRect(personagem.personagemXSoco, personagem.personagemYSoco, personagem.pesonagemTamanhoXSoco, personagem.pesonagemTamanhoYSoco,
				this.coluna * personagem.bloco - this.scrollHorizontal, (this.linha * personagem.bloco) - this.scrollPer, personagem.bloco, personagem.bloco)) {
				if (this.quebraveis.includes(this.mapLevel[this.linha][this.coluna]) && !crashSound.isPlaying()) {
					
					switch (this.mapLevel[this.linha][this.coluna]) {
						case 10:
							crashSound.play();
							this.mapLevel[this.linha][this.coluna] = 0;
							this.socoN = 1;
							break;
						case 17:
							crashSound.play();
							this.mapLevel[this.linha][this.coluna] = 0;
							this.socoN = 1;
							break;
						case 18:
							crashSound.play();
							this.mapLevel[this.linha][this.coluna] = 19;
							this.socoN = 1;
							break;
						case 19:
							crashglassSound.play();
							this.mapLevel[this.linha][this.coluna] = 20;
							this.socoN = 1;
							break;
						case 9:
							crashglassSound.play();
							if (random(0, 1) >= 0.5) {
								this.mapLevel[this.linha][this.coluna] = 15;
							}
							else {
								this.mapLevel[this.linha][this.coluna] = 16;
							}
							this.socoN = 1;
							break;
						case 35:
							this.mapLevel[this.linha][this.coluna] = 25;
							this.socoN = 1;
							break;
					}
					this.socoY = personagem.personagemYSoco;
					this.socoX = personagem.personagemXSoco;
				}
			}
		}
	}

	blocoQuebrado(personagem) {
		if (this.socoN >= 1) {
			this.socoY += this.vy;
			image(this.bg[13], this.socoX - 10, this.socoY);
			image(this.bg[13], this.socoX + 10, this.socoY);
			image(this.bg[13], this.socoX - 10, this.socoY + 20);
			image(this.bg[13], this.socoX + 10, this.socoY + 20);
			this.vy += personagem.gravity;
			this.socoN = this.soco;
		}
	}


	alteraCorAgua() {
		this.aguaCor++;
		if (this.aguaCor <= 20) {
			this.somaCor = 22;
		}
		else if (this.aguaCor <= 40) {
			this.somaCor = 23;
		}
		else if (this.aguaCor <= 60) {
			this.somaCor = 24;
		}
		else {
			this.somaCor = 22;
			this.aguaCor = 0;
		}
	}

	pedra(personagem) {
		if (personagem.bloco) {
			

			this.alteraCorAgua();
			
			for (this.linha = 0; this.linha < Object.keys(this.mapLevel).length; this.linha++) {
				var mapLavelN = this.mapLevel[this.linha];
				for (this.coluna = 0; this.coluna < mapLavelN.length; this.coluna++) {
					if (mapLavelN[this.coluna]) {
						//agua
						if (this.mapLevel[this.linha][this.coluna] == 22) { this.mapLevel[this.linha][this.coluna] = this.somaCor; }
						if (this.mapLevel[this.linha][this.coluna] == 23) { this.mapLevel[this.linha][this.coluna] = this.somaCor; }
						if (this.mapLevel[this.linha][this.coluna] == 24) { this.mapLevel[this.linha][this.coluna] = this.somaCor; }
						if (this.mapLevel[this.linha][this.coluna] == 25) { this.mapLevel[this.linha][this.coluna] = this.somaCor + 3; }
						if (this.mapLevel[this.linha][this.coluna] == 26) { this.mapLevel[this.linha][this.coluna] = this.somaCor + 3; }
						if (this.mapLevel[this.linha][this.coluna] == 27) { this.mapLevel[this.linha][this.coluna] = this.somaCor + 3; }
						
						if (this.linha>=110) {
							image(this.bg[32], this.coluna * this.bg[mapLavelN[this.coluna] - 1].width - this.scrollHorizontal, this.linha * this.bg[mapLavelN[this.coluna] - 1].height - this.scrollPer);
						 }
						image(this.bg[mapLavelN[this.coluna] - 1], this.coluna * this.bg[mapLavelN[this.coluna] - 1].width - this.scrollHorizontal, this.linha * this.bg[mapLavelN[this.coluna] - 1].height - this.scrollPer);
					
						this.verificaSoco(personagem);
					}
				}
			}
			this.blocoQuebrado(personagem);
		}
	}
}
