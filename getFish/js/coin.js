		function Coin(type){
			this.type=type;
			this.x=0;
			this.y=0;
			this.cur=0;
			this.move();
		}
		Coin.prototype.draw=function(gd){
			gd.save();
			gd.translate(this.x,this.y);
			// gd.rotate(d2a(this.rotate));
			if (this.type>1&&this.type<=3) {
				gd.drawImage(json['coinAni1'],
						0,this.cur*60,60,60,
						-30,-30,60,60
				);
			}
			if (this.type==5) {
				gd.drawImage(json['coinAni2'],
						0,this.cur*60,60,60,
						-30,-30,60,60
				);
			}
			gd.restore();
		};
		Coin.prototype.move=function(){
			var _this=this;
			setInterval(function(){
				_this.x-=_this.x/10;
				_this.y+=(650-_this.y)/10;
				_this.cur++;
				if (_this.cur==10) {
					_this.cur=0;
				}
			},16);
		};
		Coin.prototype.playSong=function(){
			var oA=new Audio();
			oA.src='snd/coin.wav';
			oA.play();
		};