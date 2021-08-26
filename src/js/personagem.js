// JavaScript Document


class Personagem
{

	constructor(x,y,animation)
	{
		this.x = x;
		this.y = y;
		this.z = 0;
		strokeWeight(4);
		this.lado;
		this.stopJump = 0;
		this.i = 0;
		this.fundo = width;
		this.animation = animation;
		this.w = this.animation[0].width;
		this.len = this.animation.length;
		this.gravity = 0.75;
		this.vy = 6;
		this.noar = 0;
		this.img = 0;
		this.nosoco = 0;
		this.nobaixo = 0;
		this.segueRight = 0;
		this.segueLeft = 0;
		this.yStop = 0;
		this.b;
		this.c;
		this.xStopL = 0;
		this.xStopR = 0;
		this.xMenorL = 0;
		this.money = 0;
		this.life = 3;
		this.forcaAndando = 0;
		this.morreu = 0;
		this.morSoma = 0;
		this.morSomaY = 0;
		this.taAgua = 0;
		this.margemAgua = 0;
	}

	normaliza(cenario,inimigos)
	{


			this.yStop = 0;
			this.hitY = false;
			if(this.x>=width+50) this.x = width+50;
			//if(this.x<=150) this.x = 150;
			if(this.y>=450)
			{
				// console.log(cenario.scrollPer+"<="+(cenario.limiteAltura-1080));
				if(cenario.scrollPer<=cenario.limiteAltura-1080)
				{
					cenario.scrollPer = cenario.scrollPer+12;
					this.y = 450;
					//cenario.scrollPer = 9630;
				}
			}
			 this.loopPega = 0;
			 this.loopPegaForca = 0;
			// this.taAgua = 0;
			//this.xMenorL = 0;
			for (var b=0; b < cenario.mapLevel.length; b++)
			 {

				 var mapLavelN = cenario.mapLevel[b];
				for (var c = 0; c < mapLavelN.length; c++)
				{
					if(mapLavelN[c] && mapLavelN[c]!=7 && mapLavelN[c]!=8 && mapLavelN[c]!=5 && mapLavelN[c]!=6 && mapLavelN[c]!=16 && mapLavelN[c]!=15 && mapLavelN[c]!=12 && mapLavelN[c]!=13 && mapLavelN[c]!=20 && mapLavelN[c]!=22 && mapLavelN[c]!=23 && mapLavelN[c]!=24 && mapLavelN[c]!=25 && mapLavelN[c]!=26 && mapLavelN[c]!=27)
					{
						var hit = collideRectRect(this.x-125,this.y+40,60,116,(c*90),(b*90)-cenario.scrollPer,90,90);

						var superBloco = this.quebraSuperForca(mapLavelN,c,b);

						for (let inimigo of inimigos)
						{
							if(((b*90)-cenario.scrollPer)<inimigo.inimigoAltura+90 && ((b*90)-cenario.scrollPer)+90>inimigo.inimigoAltura+90)
							{

								var hitInimigo = collideRectRect(inimigo.x,inimigo.inimigoAltura+90,150,20,(c*90),(b*90)-cenario.scrollPer,90,90);
								if(hitInimigo)
								{
									if(inimigo.soma>0) inimigo.soma = inimigo.soma*-1;
									else inimigo.soma = inimigo.soma*-1;
								}
							}
						}

						if(superBloco)
						{
							if(superBloco=='zero') superBloco = 0;
							mapLavelN[c] = superBloco;
						}

						//	rect((c*90),(b*90)-cenario.scrollPer,90,90);
						if(((b*90)-cenario.scrollPer)>this.y+45 && ((b*90)-cenario.scrollPer)+40<this.y+45+116)
						{

							// PEGAR LADO DIREITO
							if((this.x-125+60)<(c*90))
							{
								if(this.loopPega==0)
								{
									this.xMenorR = (c*90);
									//rect((c*90),(b*90)-cenario.scrollPer,90,90);
									this.loopPega = 1;
								}
								if(mapLavelN[c]!=9 && mapLavelN[c]!=10 && mapLavelN[c]!=19)
								{
									if(this.loopPegaForca==0)
									{
										this.xMenorRForca = (c*90);
										//rect((c*90),(b*90)-cenario.scrollPer,90,90);
										this.loopPegaForca = 1;
									}
								}
							}
							else
							{
								this.xMenorL = (c*90)+90;
								//rect((c*90),(b*90)-cenario.scrollPer,90,90);
								if(mapLavelN[c]!=9 && mapLavelN[c]!=10 && mapLavelN[c]!=19)
								{
									this.xMenorLForca = (c*90)+90;
									//rect((c*90),(b*90)-cenario.scrollPer,90,90);
								}
							}
						}

						//rect(this.x-130,this.y+40,60,116);
						//rect((c*90),(b*90)-cenario.scrollPer,90,90);
						 if(hit==true && ((this.y+40+116)<=((b*90)-cenario.scrollPer+90)) && this.vy>= 6 )
						 {
							//console.log("colidiu"+this.y+155+" => "+(b*90));

							this.hitY = true;
							this.maxAltura = (b*90-cenario.scrollPer)-155;
						 }

						else if((hit==true && ((this.y+40)<=((b*90)+90-cenario.scrollPer))) && ((this.y+40+116)>=((b*90)+90-cenario.scrollPer)))
						{
							this.yStop = 1;
						}


					}
					else if(mapLavelN[c]==15 || mapLavelN[c]==16 || mapLavelN[c]==20)
					{

						var hit = collideRectRect(this.x-125,this.y+40,60,116,(c*90),(b*90)-cenario.scrollPer,90,90);
						if(hit)
						{
							if(mapLavelN[c]==15) this.money= this.money+20;
							if(mapLavelN[c]==16) this.money= this.money+10;
							if(mapLavelN[c]==20)
							{
								// Quando pega o super força
								this.superForca = 1;
							}
							cenario.mapLevel[b][c] = 0;
							// console.log(this.money);
						}
					}
					else if(mapLavelN[c]>=25 && mapLavelN[c]<=27)
					{
						var hit = collideRectRect(this.x-125,this.y,60,116,(c*90),(b*90)-cenario.scrollPer,90,90);
						if(hit)
						{

							this.taAgua = 1;
						}
					}
				}
			}
			// console.log(this.taAgua);

			if(this.morreu==1)
			{
				this.morSoma++;
				this.morSomaY = this.morSomaY-5;
				if(this.morSoma<=8) this.ImgMorte = 12;
				else if(this.morSoma<=16)
				{
					this.ImgMorte = 13;
				}
				else
				{
					this.morSoma = 0;
				}
				// console.log(this.y+50+this.morSomaY);
				image(this.animation[this.ImgMorte ], this.x-190,this.y+50+this.morSomaY);

				diedSound.volume(0.5)
				diedSound.play()

				if(this.y+50+this.morSomaY<(-200))
				{
					this.morreu = 0;
					this.morSoma = 0;
					this.morSomaY = 0;
					this.x = this.xMenorL+90;
					this.y = this.y+190;
				}
			}
			else
			{

			if(this.hitY!=true)
			{
				this.maxAltura = height-155;

			}
			if(this.noar)
			{
					if(this.xMenorL<=this.x-80-55-10 && (this.lado=='left') && (this.segueLeft>=0))
					{
						this.x = this.x-this.segueLeft+this.segueRight
						this.segueLeft = this.segueLeft-0.1;
						this.segueRight = this.segueRight-0.1;
					}
					if((this.xMenorR>=this.x-55+10) && (this.lado=='right') && (this.segueRight>=0))
					{
						this.x = this.x-this.segueLeft+this.segueRight
						this.segueLeft = this.segueLeft-0.1;
						this.segueRight = this.segueRight-0.1;
					}
			}
			if(this.nosoco)
			{
				this.nosoco++;
			}
			if(this.nosoco>=12)
			{
				this.nosoco = 0;
			}

			if(cenario.soco>=1)
			{
				cenario.soco++;
			}
			if(cenario.soco>=50)
			{
				cenario.soco = 0;
			}

			if(this.taAgua)
			{
				this.gravity = 0;
				this.vy = 0;
			}

			if(this.yStop==1)  this.vy = 6;
			if(this.stopJump==1)
			{
				this.vy = 0;
				this.stopJump = 0;
			}
			this.y += this.vy;
			if(this.y>=this.maxAltura)
			{
				// console.log(this.maxAltura);
				this.y = this.maxAltura;
				this.noar = 0;
				if(this.vy >10) this.vy = 6;
			}
			else if((this.vy <=20 && this.noar!=0) || (this.yOld != this.y))
			{
				this.vy += this.gravity;
				this.noar = 1;
			}
			this.yOld = this.y;

			if((this.superForca==2) || this.forcaAndando) this.vaisuperForca();
			}
			if(this.taAgua && (!keyIsDown(DOWN_ARROW))  && this.y>90) this.y = this.y-5;
	}

	parado()
	{
		if(this.morreu!=1)
		{
			push();
			if(this.taAgua) this.img = 14;
			else if(this.nosoco) this.img = 6;
			else if(this.noar) this.img = 5;
			else this.img = 4;
			//console.log(this.img);
			if(this.lado=='left')
			{
				scale(-1,1);
				image(this.animation[this.img], -this.x, this.y);

			}
			else
			{
				image(this.animation[this.img], this.x-190, this.y);
			}
			pop();
		}
	}

	andar(lado)
	{
		this.lado = lado;
		if(this.nosoco) this.b = 6;
		else if(this.noar) this.b = 5;
		else if(this.i<=4) this.b = 0;
		else if(this.i<=8) this.b = 1;
		else if(this.i<=12) this.b = 2;
		else if(this.i<=16){ this.b = 3;}
		else if(this.i<=19)  {this.i=0;}
		else {this.i=0;}
		push();
		//rect( this.x-245, this.y,190,190);


		if(lado=='left')
		{
			scale(-1,1);
			image(this.animation[this.b], -this.x, this.y);

			if((this.nosoco==0 || this.noar!=0))
			{
				if(this.xMenorL<=this.x-80-55-10)
				{
					if(this.z>=4) this.x = this.x+-10;
				}
			}
		}
		else
		{
			scale(1,1);
			image(this.animation[this.b], this.x-190, this.y);
			if((this.nosoco==0 || this.noar!=0))
			{
				if(this.xMenorR>=this.x-55+10)
				{
					if(this.z>=4) this.x = this.x+10;
				}
			}
		}
		this.i++;
		this.z++;
		pop();
	}

	pular(tipo)
	{
		if(this.noar==0)
		{
			jumpingSound.play();
			if(tipo=="image")
			{
				push();
				if(this.lado=='left')
				{
					scale(-1,1);
					image(this.animation[5], -this.x, this.y);
					if (keyIsDown(LEFT_ARROW) && (this.segueLeft==0) && (this.xStopL==0))
					{
						this.x = this.x-4;
					}
					//console.log(5*this.inverte);
				}
				else
				{
					image(this.animation[5], this.x-190, this.y);
					if (keyIsDown(RIGHT_ARROW) && (this.segueRight==0)  && (this.xStopR==0))
					{
						this.x = this.x+4;
					}
				}
				pop();

			}
			else
			{
				if (keyIsDown(RIGHT_ARROW) || keyIsDown(LEFT_ARROW))
				{
					this.vy = -23;
				}
				else
				{
					this.vy = -20;
				}
			}
			this.noar = 1;
		}
	}

	soco(cenario)
	{
		if(this.nosoco==0)
		{
			this.nosoco = 1;
			cenario.soco = 1;
			cenario.x = this.x;
			cenario.y = this.y;
			cenario.vy = 10;
			push();
			if(this.lado=='left')
			{
				scale(-1,1);
				image(this.animation[6], -this.x, this.y);
				//zx('soco');
				cenario.x = cenario.x-220;
			}
			else
			{
				scale(1,1);
				image(this.animation[6], this.x-190, this.y);
			}
			pop();
		}
	}

	abaixar()
	{
		if(this.taAgua)
		{
			this.img = 14;
			this.y = this.y+5;
		}
		else if(this.nosoco) this.img = 6;
		else if(this.noar) this.img = 5;
		else this.img = 7;
			this.nobaixo = 1;
			push();
			if(this.lado=='left')
			{
				scale(-1,1);
				image(this.animation[this.img], -this.x, this.y);
				//console.log('soco');
			}
			else
			{
				scale(1,1);
				image(this.animation[this.img], this.x-190, this.y);
			}
			pop();

	}

	vaisuperForca()
	{

		if(this.forcaAndando==0)
		{
			this.yForca = this.y+65;
			this.xForca = this.x;
			this.forcaAndando = 1;
			this.cenarioIni = cenario.scrollPer;
			this.forcaxMenorR = this.xMenorRForca;
			this.forcaxMenorL = this.xMenorLForca;
			this.forcaLado = this.lado;
		}
		else if(this.forcaAndando==1)
		{

			push();
			if(this.forcaLado=='left')
			{
				scale(-1,1);
				this.xForca = this.xForca-25;
				image(this.animation[8], -this.xForca+180, this.yForca+this.cenarioIni-cenario.scrollPer);
				//console.log('soco');
				if(this.xForca<=this.forcaxMenorL+190)
				{
					this.forcaAndando = 3;
				}
			}
			else
			{
				scale(1,1);
				this.xForca = this.xForca+25;
				image(this.animation[8], this.xForca-190+180, this.yForca+this.cenarioIni-cenario.scrollPer);
				if(this.xForca>=this.forcaxMenorR)
				{
					this.forcaAndando = 3;
				}
			}
			pop();
		}
	}

	quebraSuperForca(mapLavelN,c,b)
	{
		if(this.forcaLado=='left') this.redusX = this.xForca-280;
		else this.redusX = this.xForca-10
		//rect(this.redusX, this.yForca+this.cenarioIni-cenario.scrollPer+20,90,45);

		var hitSoco = collideRectRect(this.redusX, this.yForca+this.cenarioIni-cenario.scrollPer+20,90,45,(c*90),(b*90)-cenario.scrollPer,90,90);
		if((mapLavelN[c]==9 || mapLavelN[c]==10 || mapLavelN[c]==19 || mapLavelN[c]==18) && (hitSoco))
		{
			//rect((c*90),(b*90)-cenario.scrollPer,90,90);
			if(mapLavelN[c]==9)
			{
				if(random(0, 1)>=0.5)
				{
					return 15;
				}
				else
				{
					return 16;
				}
			}
			if(mapLavelN[c]==10 || mapLavelN[c]==18) return 'zero';
			if(mapLavelN[c]==19) return 20;
		}
		else
		{
			return false;
		}
	}
}
