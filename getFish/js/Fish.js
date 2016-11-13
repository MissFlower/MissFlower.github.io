		var FishSize=[
			null,
			{w: 55, h: 37, collR: 17},
			{w: 78, h: 64, collR: 24},
			{w: 72, h: 56, collR: 20},
			{w: 77, h: 59, collR: 22},
			{w: 107, h: 122, collR: 29}
		];
		function Fish(type,x,y,rotate){
			this.type=type;
			this.x=x;
			this.y=y;
			this.cur=0;
			this.iSpeed=1;
			this.rotate=rotate;
			this.collR=FishSize[this.type].collR;
			// this.draw();
			this.move();
		}
		Fish.prototype.draw=function(gd){
			var w=FishSize[this.type].w;
			var h=FishSize[this.type].h;
			gd.save();
			gd.translate(this.x,this.y);
			gd.rotate(d2a(this.rotate));
			// 修复阴影
			if (this.rotate>90&&this.rotate<270) {
				gd.scale(1,-1);
			}
			gd.drawImage(json['fish'+this.type],
					0,h*this.cur,w,h,
					-w/2,-h/2,w,h
			);
			gd.restore();
		};
		Fish.prototype.move=function(){
			var _this=this;
			// var n=0;
			setInterval(function(){
				// n++;
				_this.x+=Math.cos(d2a(_this.rotate))*_this.iSpeed;
				_this.y+=Math.sin(d2a(_this.rotate))*_this.iSpeed;
			},16);
			setInterval(function(){
				_this.cur++;
				if (_this.cur==4) {
					_this.cur=0;
				}
			},200);
		};
		Fish.prototype.isin=function(x,y){
			var a=this.x-x;
			var b=this.y-y;
			var c=Math.sqrt(a*a+b*b);
			if (c<this.collR) {
				return true;
			}else{
				return false;
			}
		};