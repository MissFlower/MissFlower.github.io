	document.addEventListener('DOMContentLoaded',function(){
			var oC=document.getElementById('c1');
			var gd=oC.getContext('2d');
			var out=50;
			var dir=[-out,out];
			var ruller=0.05;
			loadImage(resource,function(){
				var bulletArr=[];
				var fishArr=[];
				var coinArr=[];
				var webArr=[];
				var dieFishArr=[];
				var dieShakeArr=[];
				var shakeArr=[];
				var c=new Cannon(6);
				setInterval(function(){
					gd.clearRect(0,0,oC.width,oC.height);
					// gd.save();
					gd.drawImage(json['bottom'],
						0,0,765,70,
						0,532,765,70
					);
					c.draw(gd);
					// 画炮弹
					for (var i = 0; i < bulletArr.length; i++) {
						bulletArr[i].draw(gd);
					}
					// 炮弹性能优化
					for (var i = 0; i < bulletArr.length; i++) {
						if (bulletArr[i].x<out||bulletArr[i].x>oC.width-out||bulletArr[i].y<out) {
							bulletArr.splice(i,1);
							i--;
						}
					}
					// 生成鱼
					if (Math.random()<ruller) {
						dir.sort(function(){
							return Math.random()-0.5;
						});
						if (dir[0]<0) {
							var f1=new Fish(rnd(1,6));
							f1.x=0-out;
							f1.y=rnd(out,oC.height-out);
							f1.rotate=rnd(-45,46);
							fishArr.push(f1);
							if (Math.random()<ruller) {
								var sk=new Shake(rnd(1,3));
								sk.x=0-2*out;
								sk.y=rnd(out,oC.height-out);
								sk.rotate=rnd(-45,46);
								shakeArr.push(sk);
							}
							
						}else{
							var f1=new Fish(rnd(1,6));
							f1.x=oC.width+out;
							f1.y=rnd(out,oC.height-out);
							f1.rotate=rnd(135,226);
							fishArr.push(f1);
							if (Math.random()<ruller) {
								var sk=new Shake(rnd(1,3));
								sk.x=oC.width+2*out;
								sk.y=rnd(out,oC.height-out);
								sk.rotate=rnd(135,226);
								shakeArr.push(sk);
							}
							
						}
					}
					// 画鲨鱼
					for (var i = 0; i < shakeArr.length; i++) {
						shakeArr[i].draw(gd);
					}
					// 画鱼
					for (var i = 0; i < fishArr.length; i++) {
						fishArr[i].draw(gd);
					}
					// 鱼性能优化
					for (var i = 0; i < fishArr.length; i++) {
						if (fishArr[i].x<-out||fishArr[i].x>oC.width+out||fishArr[i].y<-out) {
							fishArr.splice(i,1);
							i--;
						}
					}
					// 判断所有鱼和所有炮弹
					for (var i = 0; i < fishArr.length; i++) {
						for (var j = 0; j < bulletArr.length; j++) {
							// fishArr[i].isin(bulletArr[i].x,bulletArr[i].y)
							if (fishArr[i].isin(bulletArr[j].x,bulletArr[j].y)) {
								var x = fishArr[i].x;
	                            var y = fishArr[i].y;
	                            var type = fishArr[i].type;
	                            var rotate = fishArr[i].rotate;
								// 鱼死
								fishArr.splice(i,1);
								i--;
								// 子弹灭
								bulletArr.splice(j,1);
								j--;
								// 生成金币
								var coin=new Coin(type);
							    coin.x=x;
							    coin.y=y;
							    coin.playSong();
							    coinArr.push(coin);
							    // 生成死鱼
							    var dieFish=new DieFish(type);
							    dieFish.x=x;
							    dieFish.y=y;
							    dieFish.rotate=rotate;
							    dieFishArr.push(dieFish);
							    setTimeout(function(){
							    	dieFishArr.shift();
							    },500);
							    // 生成死鲨鱼
							    var dieShake=new DieShake(type);
							    dieShake.x=x;
							    dieShake.y=y;
							    dieShake.rotate=rotate;
							    dieShakeArr.push(dieShake);
							    setTimeout(function(){
							    	dieShakeArr.shift();
							    },500);
							    // 创建渔网
							    var web=new Web();
							    web.x=x;
							    web.y=y;
							    webArr.push(web);
							}
						}
					}
					// 画金币
					for (var i = 0; i < coinArr.length; i++) {
						coinArr[i].draw(gd);
					}
					// 画渔网
					for (var i = 0; i < webArr.length; i++) {
						webArr[i].draw(gd);
						webArr[i].scale+=0.01;
						if (webArr[i].scale>1.2) {
							webArr.splice(i,1);
							i--;
						}
					}
					// 画死鱼
					for (var i = 0; i < dieFishArr.length; i++) {
						dieFishArr[i].draw(gd);
					}
				},16);
				oC.onclick=function(ev){
					var oA=new Audio();
					oA.src='snd/cannon.mp3';
					oA.play();
					var x=ev.clientX-oC.offsetLeft-c.x;
					var y=c.y-(ev.clientY-oC.offsetTop);
					var d=90-a2d(Math.atan2(y,x));
					c.rotate=d;
					c.emitChange();
					var bullet=new Bullet(c.type);
					bullet.x=c.x;
					bullet.y=c.y;
					bullet.rotate=c.rotate;
					bulletArr.push(bullet);
				};
			});
		},false);