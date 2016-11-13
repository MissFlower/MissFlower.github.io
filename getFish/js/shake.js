		var ShakeSize=[
			null,
			{w: 508, h: 270, collR: 40},
			{w: 516, h: 273, collR: 40}
		];
		function Shake(type){
			this.type=type;
			this.x=0;
			this.y=0;
			this.cur=0;
			this.iSpeed=1;
			this.rotate=0;
			this.collR=ShakeSize[this.type].collR;
			// this.draw();
			this.move();
		}
		Shake.prototype.draw=function(gd){
			var w=ShakeSize[this.type].w;
			var h=ShakeSize[this.type].h;
			gd.save();
			gd.translate(this.x,this.y);
			gd.scale(0.3,0.3);
			gd.rotate(d2a(this.rotate));
			// 修复阴影
			if (this.rotate>90&&this.rotate<270) {
				gd.scale(1,-1);
			}
			gd.drawImage(json['shark'+this.type],
					0,h*this.cur,w,h,
					-w/2,-h/2,w,h
			);
			gd.restore();
		};
		Shake.prototype.move=function(){
			var _this=this;
			// var n=0;
			setInterval(function(){
				// n++;
				_this.x+=Math.cos(d2a(_this.rotate))*_this.iSpeed;
				_this.y+=Math.sin(d2a(_this.rotate))*_this.iSpeed;
			},16);
			setInterval(function(){
				_this.cur++;
				if (_this.cur==8) {
					_this.cur=0;
				}
			},100);
		};
		Shake.prototype.isin=function(x,y){
			var a=this.x-x;
			var b=this.y-y;
			var c=Math.sqrt(a*a+b*b);
			if (c<this.collR) {
				return true;
			}else{
				return false;
			}
		};