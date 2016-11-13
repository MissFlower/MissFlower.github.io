function rnd(m,n){
	return Math.floor(Math.random()*(n-m)+m);
}
function d2a(n){
	return n*Math.PI/180;
}
function a2d(n){
	return n*180/Math.PI;
}
var json={};
function loadImage(arr,success){
	var count=0;
	for (var i = 0; i < arr.length; i++) {
		var oImg=new Image();
		(function(index){
			oImg.onload=function(){
				json[arr[index]]=this;
				count++;
				if (count==arr.length) {
					success&&success();
				}
			};
		})(i);
		oImg.src='img/'+arr[i]+'.png';
	}
}