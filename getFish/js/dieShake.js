		function DieShake(type){
			this.type=type;
			this.x=0;
			this.y=0;
			this.rotate=0;
			this.cur=0;
			this.move();
		}
		DieShake.prototype.draw = function (gd) {
		    var w = ShakeSize[this.type].w;
		    var h = ShakeSize[this.type].h;
		    gd.save();
		    gd.translate(this.x,this.y);
		    gd.rotate(d2a(this.rotate));
		    //修复阴影
		    if(this.rotate>90&&this.rotate<270){
		        gd.scale(1,-1);
		    }
		    gd.drawImage(json['fish'+this.type],
		        0,h*(this.cur+8),w,h,
		        -w/2,-h/2,w,h
		    );
		    gd.restore();
		};
		DieShake.prototype.move=function(){
			var _this=this;
		    setInterval(function () {
		        _this.cur++;
		        if(_this.cur == 8){
		            _this.cur = 0;
		        }
		    },150);
		};