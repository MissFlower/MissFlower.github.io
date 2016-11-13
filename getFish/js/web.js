		function Web(){
			this.x=0;
			this.y=0;
			this.scale=1;
		}
		Web.prototype.draw=function(gd){
			gd.save();
			gd.translate(this.x,this.y);
			gd.scale(this.scale,this.scale);
			gd.drawImage(json['web'],
				22,22,200,200,
				-100,-100,200,200
			);
			gd.restore();
		};