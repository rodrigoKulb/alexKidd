// JavaScript Document


class Inimigos
{

	constructor(x,y,animation)
	{
		this.x = x;
		this.y = y;
		this.animation = animation;
		this.count = 0;
		this.soma = +2.5;
		this.inimigoAltura = 0;
		this.morreu = 0;


	}

	aparece(cenario,personagem)
	{
		if(!(this.morreu))
		{
			this.count++;
			if(this.count<=20) this.img = 10;
			else if(this.count<=39) this.img = 11;
			else this.count = 0;
			this.x = this.x+this.soma;
			this.inimigoAltura = this.y-cenario.scrollPer;

			//rect(personagem.x-120,personagem.y+40,50,100);
			//rect(this.x+40,this.y-cenario.scrollPer+60,100,50);
			//rect(personagem.x-120,personagem.y+40,50,100);

			if(personagem.nosoco>=1)
			{
				if(personagem.lado=='left')
				{
					//rect(personagem.x-220, personagem.y+85,30,30);
					//rect(this.x+40,this.y-cenario.scrollPer+60,100,50);
					var matou = collideRectRect(personagem.x-220, personagem.y+85,30,30,this.x+40,this.y-cenario.scrollPer+60,100,50);
					if(matou)
					{
						this.morreu = 1;
					}
				}
				else
				{
					//rect(personagem.x, personagem.y+85,30,30);
					//rect(this.x+40,this.y-cenario.scrollPer+60,100,50);
					var matou = collideRectRect(personagem.x, personagem.y+85,30,30,this.x+40,this.y-cenario.scrollPer+60,100,50);
					if(matou)
					{
						this.morreu = 1;
					}
				}

				if(this.morreu == 1){
					enemyDiedSound.play()
				}
			}

			var morreu = collideRectRect(personagem.x-120,personagem.y+40,50,100,this.x+40,this.y-cenario.scrollPer+60,100,50);
			if(morreu && personagem.morreu==0)
			{
				noLoop();
				personagem.morreu = 1;
				personagem.life = personagem.life-1;
				personagem.y = 	personagem.y+60-100-50;
				setTimeout(function(){ loop(); }, 2000);
			}
			push();

			if(this.soma>0)
			{

				image(this.animation[this.img], this.x,this.y-cenario.scrollPer);

			}
			else
			{
				scale(-1,1);
				image(this.animation[this.img], -this.x-180,this.y-cenario.scrollPer);
			}
			pop();

		}
	}
}
