//未启用2.0版本的方法内置
//每日抽奖活动
jzm.raffle_init = function()
{
	var _raff,_init = ustoken;   //用户权限指令
	$.ajax({
		url: httpUpData +'raffle_init',
		type: 'GET',
		dataType: 'json',
    async:false,
		data: {userId: _init.userid,userToken:_init.token,type:2}
	})
	.done(function(reg) {
	   reg.statusCode.status == 6666 ? _raff = reg.content : (function(){
       _raff = -1;
       alert(reg.statusCode.msg);
       $(".hidebg").hide();
     })();
	});
	return _raff;
};
$(function (){
	$('.pointer').click(function(){
		$(".hidebg").show();
			var rotateTimeOut = function (){
				$('#rotate').rotate({
					angle:0,
					animateTo:2160,
					duration:8000,
					callback:function (){
						alert('网络超时，请检查您的网络设置！');
					}
				});
			};
			var bRotate = false;
			var rotateFn = function (awards, angles, txt){
				bRotate = !bRotate;
				$('#rotate').stopRotate();
				$('#rotate').rotate({
					angle:0,
					animateTo:angles+1800,
					duration:8000,
					callback:function (){
						if(txt == "谢谢惠顾"){
							swal({   title: "感谢您的参与",   imageUrl: "images/luckyfive.png" });
							$(".hidebg").hide();
						}else{
							swal({   title: "获得"+txt,   imageUrl: "images/gx.png" });
							$(".hidebg").hide();
						}
						bRotate = !bRotate;
					}
				})
			};
		(function(){
				if(bRotate)return;
				var item = jzm.raffle_init();
        console.log(item);
				switch (item) {
					case 0:
						//var angle = [137, 185, 235, 287];
						rotateFn(0, 240, '免单优惠券');
						break;
					case 1:
						//var angle = [185, 235, 287];
						rotateFn(1, 180, '￥2.00优惠券');
						break;
					case 2:
						//var angle = [26, 88, 137, 185, 235, 287, 337];
						rotateFn(2, 120, 'IPHONE X');
						break;
					case 3:
						//var angle = [137, 185, 235, 287];
						rotateFn(3, 60, '￥5.00优惠券');
						break;
					case 4:
						//var angle = [185, 235, 287];
						rotateFn(4, 360, '谢谢惠顾');
						break;
					case 5:
						//var angle = [88, 137, 185, 235, 287];
						rotateFn(5, 300, 'IPAD PPO');
						break;
				}
				return item;
		})();
	});
});
function rnd(n, m){
	return Math.floor(Math.random()*(m-n+1)+n)
}
