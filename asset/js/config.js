//http 请求获取数据接口地址 正式版服务器
// var httpUpImg = "http://120.79.53.95/";
// var httpUpData = "http://120.79.53.95/";
// var uri = "http://www.cbcoffee.cn/sharedcoffee/";
//http 微信授权 静态授权/获取用户信息授权
// var wxUri = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx71c7dc4f5208bb07&redirect_uri='+ window.location.href +'&response_type=code&scope=snsapi_userinfo&state=wx';
// var wxUribase = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx71c7dc4f5208bb07&redirect_uri='+ window.location.href +'&response_type=code&scope=snsapi_base&state=wx';
//http 请求获取数据接口地址 测试版
var httpUpImg = "http://test.cbcoffee.cn:8086/";
var httpUpData = "http://test.cbcoffee.cn:8086/";
var uri = "http://test.cbcoffee.cn/sharedcoffee/";
var transferStation = "http://www.cbcoffee.cn/sharedcoffee/tran/transfer.html"; // 测试服授权微信中转站
var wxUri = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx71c7dc4f5208bb07&redirect_uri='+ transferStation +'&response_type=code&scope=snsapi_userinfo&state=' +  window.location.href;
var wxUribase = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx71c7dc4f5208bb07&redirect_uri='+ transferStation +'&response_type=code&scope=snsapi_base&state=' +  window.location.href;
var jzm = {},geolocation,longitude,latitude,__load = window;
var statusCode = "400|997|999|4444|1005|1014";
var stateCode = new RegExp(statusCode);
jzm.getQueryString = function(name)
{
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};
jzm.Preservation = function(reg){console.log(reg);localStorage.setItem("token",JSON.stringify({token:reg.user_token,userid:reg.user_id,userStatus:reg.userStatus,type:reg.type}));};
jzm.Error = function (err){  //错误信息
  console.log(err);
  alert(err.statusCode.msg);
  if(err.statusCode.status == 1005){localStorage.clear();};
  __load.location = "/sharedcoffee/index.html";
//err.statusCode.status == 1014 ? __load.location = "../index.html" : null;
//err.statusCode.status != 1005 ? console.log(err.statusCode.msg) : window.location.href = uri + "asset/html/404.html?uri=" + encodeURI(window.location.href.split('?')[0]);
};
jzm.getMapAPI = function(e){//获取首次登录坐标
  geolocation = new BMap.Geolocation();
  geolocation.getCurrentPosition(function(r){
      longitude = r.longitude;   //当前位置 经纬度
      latitude = r.latitude;  //当前位置 经纬度
      $.get(httpUpData + 'save_user_location?userId=' + e.user_id + "&userToken=" + e.user_token +"&longitude=" +longitude + "&latitude="+latitude,function(reg) {
          $("#tipie").html('<a style="color:#ccc;font-size:1.2rem;" href="'+ uri +'html/my_coupon.html">收到1张优惠券  点击到我的优惠券查看详情→</a>').fadeIn(100);
          return true;
        });
  });
};
jzm.luckdrawer = function(data) {  //机器端抽奖
  $.ajax({
    url: httpUpData + 'raffle_init',
    type: 'get',
    dataType: 'json',
    async:false,
    data: {userId: data.id,userToken:data.token,machineNumber:jzm.getQueryString("machinenumber"),type:1},
  })
  .done(function(reg) {
      stateCode.test(reg.statusCode.status) ? jzm.Error(reg) : (function(){
        setTimeout(function(){
          if(reg.type == 2)
          {
            alert(reg.statusCode.msg);
            window.location.href = './html/my_coupon.html';
          }
        else if(reg.type == 3)
          {
            alert(reg.statusCode.msg);
            window.location.href = './html/my_redeemCode.html';
          }
          else
          {
            alert(reg.statusCode.msg);
          };
        }, 5000);
      })();
  })
};
jzm.paraMessage = function(msg,data){
  return new jzm[msg](data);
};
jzm.RanNum = function(e){
  e = e || 12;
  var m = "",i = 0,str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for(; i < e; i++){
  m += str.charAt(Math.floor(Math.random() * str.length));
  }
  return m;
};
// jzm.aHref = function(){
//   var aGetAttribute = document.getElementsByTagName('a').getAttribute('href');
//   console.log(aGetAttribute);
// };
jzm.getUserToken = function()
{
  $.ajax({
      url: httpUpData + 'WeChat_login',
      type: 'GET',
      async: false,
      dataType: 'json',
      data: {code: jzm.getQueryString("code"),rCouponId: jzm.getQueryString("rCouponId") ? jzm.getQueryString("rCouponId") : 0}
    })
    .done(function(reg) {
        if (reg.statusCode.status == 1000)
          {
              jzm.paraMessage('Preservation',reg);
              if(reg.type == 1)
                {
                  jzm.paraMessage('getMapAPI',reg) ? setTimeout(function(){window.location.href=uri+"activity/myactivity4-5.html?activity_uri=" + window.location.href.split('?')[0]},5000) : null;
                };
                jzm.getQueryString("machinenumber") ? jzm.paraMessage('luckdrawer',{token:reg.user_token,id:reg.user_id}) : null;
          }
          else if (reg.statusCode.status == 1035)
          {
            jzm.paraMessage('Preservation',reg);
            reg.type == 1 ? jzm.paraMessage('getMapAPI',reg) : null;
            alert(reg.statusCode.msg);    //弹窗组件优化
          }
        else if (reg.statusCode.status == 1036)
          {
            jzm.paraMessage('Preservation',reg);
            if(reg.type == 1)
              {
                jzm.paraMessage('getMapAPI',reg);
              };
            setTimeout(function()
              {
                alert(reg.statusCode.msg);    //弹窗组件优化
                window.location.href = uri +'html/my_coupon.html';
              }, 2000);
          }
          else if (reg.statusCode.status == 1037)
          {
            jzm.paraMessage('Preservation',reg);
            if(reg.type == 1)
              {
                jzm.paraMessage('getMapAPI',reg);
              };
            alert(reg.statusCode.msg);    //弹窗组件优化
          }
          else if (reg.statusCode.status == 1038)
          {
            jzm.paraMessage('Preservation',reg);
            if(reg.type == 1)
              {
                jzm.paraMessage('getMapAPI',reg);
              };
            setTimeout(function()
              {
                alert(reg.statusCode.msg);    //弹窗组件优化
                window.location.href = uri +'html/my_coupon.html';
              }, 2000);
          }
          else
          {
               console.log(reg.statusCode.msg);
               jzm.Error(reg);
          };
    })
    .fail(function(err){
    	__load.href='/sharedcoffee/asset/html/404.html';
    })
};

var utoken = JSON.parse(localStorage.getItem("token"));   //用户权限指令
!utoken ? (!jzm.getQueryString("code") ? window.location.href = wxUri : jzm.getUserToken())  /*/是否验证微信登陆 /*/  : (function(){
  jzm.getQueryString("machinenumber") ? jzm.paraMessage('luckdrawer',{token:utoken.token,id:utoken.userid}) : null;  /*/是否机器扫码抽奖/*/
  jzm.getQueryString("rCouponId") ? (!jzm.getQueryString("code") ? window.location.href = wxUribase : jzm.getUserToken()) : null; /*/是否优惠券分享 以及静态登陆/*/
})();
//往页面中添加公共底部
$(function(){
    var Div = '<div id="menu" class="row navbar-fixed-bottom" style="border-top: 1px solid #8c8c8c;color:#fff; text-align: center; padding-left:6.3%; padding-right:6.3%;  background-color: #000; height:8%;">'+
      '<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style=" height:100%; " >'+
         '<div onclick=window.location.href="/sharedcoffee/index.html?v='+ jzm.RanNum() +'" style="color:#fff; height:100%; padding-top:6%;" id="foot_first" >'+
            '<span class="action" style="display: block;"><img style="width:30%;" src="'+ uri +'image/coffee.png" /></span>'+
            '<span style="font-size:1rem;">咖啡菜单</span>'+
          '</div>'+
      '</div>'+
      '<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style=" height:100%; ">'+
          '<div onclick=window.location.href="/sharedcoffee/html/near.html?v='+ jzm.RanNum() +'" style="color:#fff; height:100%; padding-top:6%;" id="foot_second" >'+
           '<span style="display: block;"><img style="width:30%;" src="'+ uri +'image/location.png" /></span>'+
            '<span style="font-size:1rem;">附近寻机</span>'+
          '</div>'+
      '</div>'+
      '<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style=" height:100%; ">'+
          '<div onclick=window.location.href="/sharedcoffee/html/my.html?v='+ jzm.RanNum() +'" style="color:#fff; height:100%; padding-top:6%;" id="foot_third">'+
            '<span style="display: block;"><i class="msg"></i><img style="width:30%;" src="'+ uri +'image/Home.png" /></span>'+
            '<span style="font-size:1rem;">会员中心</span>'+
          '</div>'+
      '</div>'+
'</div>';
$(".container-fluid").append(Div);
JSON.parse(localStorage.getItem("token")).type != 1 ? $(".msg").show() : null;
});
var ustoken = JSON.parse(localStorage.getItem("token"));   //用户权限指令
var us_userid = ustoken.userid,/*/用户id /*/ us_token = ustoken.token;  // 用户令牌
jzm.sharedLoaw = (function(){
//**************微信分享函数****************
  $.get(httpUpData + 'share_coupon_verification?userId='+ us_userid +'&userToken='+ us_token +'&url='+encodeURIComponent(location.href.split('#')[0]),function(data,status){
      wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: 'wx71c7dc4f5208bb07', // 必填，公众号的唯一标识
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.nonceStr, // 必填，生成签名的随机串
          signature: data.signature,// 必填，签名，见附录1
          jsApiList: ['onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
      wx.ready(function (){
          wx.onMenuShareAppMessage({ //微信分享朋友
          title: "咖啡蜗", // 分享标题
          desc: "接纳每一颗热衷共享的种子，一同繁衍它的“城市大共享”", // 分享描述
          link: "http://www.cbcoffee.cn/sharedcoffee/index.html", // 分享链接
          imgUrl: "http://www.cbcoffee.cn/sharedcoffee/coffee.png", // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function (reg) {
              console.log(reg);
          },
          cancel: function (err) {
              console.log(err);
          }
      });

      });

  });
})();

//时间戳转换方法
jzm.getDateTime = function(data){
    var date = new Date(data);   //如果date为10位不需要乘1000
    var Y = date.getFullYear() + '/';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y+M+D+h+m+s;
}
// 日期格式化
Date.prototype.Format = function (time) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(time)) time = time.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(time)) time = time.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return time;
}
// 解析URL地址
// 	jzm.parsURL ( url ).file;     // = 'index.html'
// 	jzm.parsURL ( url ).hash;     // = 'top'
// 	jzm.parsURL ( url ).host;     // = 'www.abc.com'
// 	jzm.parsURL ( url ).query;    // = '?id=255&m=hello'
// 	jzm.parsURL ( url ).queryURL  // = 'id=255&m=hello'
// 	jzm.parsURL ( url ).params;   // = Object = { id: 255, m: hello }
// 	jzm.parsURL ( url ).prefix;   // = 'www'
// 	jzm.parsURL ( url ).path;     // = '/dir/index.html'
// 	jzm.parsURL ( url ).segments; // = Array = ['dir', 'index.html']
// 	jzm.parsURL ( url ).port;     // = '8080'
// 	jzm.parsURL ( url ).protocol; // = 'http'
// 	jzm.parsURL ( url ).source;   // = 'http://www.cbcoffee.com:8080/html/index.html?id=255&m=hello#top'
jzm.parsURL = function ( url ) {
  url = arguments[0] == undefined ? window.location.href : url;
	var a =  document.createElement('a');
	a.href = url;
	return {
		source: url,
		protocol: a.protocol.replace(':',''),
		host: a.hostname,
		port: a.port,
		query: a.search,
		params: (function(){
			var ret = {},seg = a.search.replace(/\?/,'').split('&'),len = seg.length, i = 0, s;
			for (;i<len;i++) {
				if (!seg[i]) { continue; }
				s = seg[i].split('=');
				var isw = /\?/.test(s[0]) ? s[0].split("?")[1] : s[0];
				ret[isw] = s[1];
			}
			return ret;
		})(),
    prefix: a.hostname.split('.')[0],
		file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
		hash: a.hash.replace('#',''),
		path: a.pathname.replace(/^([^\/])/,'/$1'),
		relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
		segments: a.pathname.replace(/^\//,'').split('/'),
		queryURL:a.search.replace(/^\?/,'')
	};
};

//待办事项
jzm.messager = (function(){
  $.ajax({
      url: httpUpData + 'verify_user_warm',
      type: 'GET',
      dataType: 'json',
      data: {userId: us_userid,userToken:us_token,type: 2}
    })
    .done(function(reg){
        reg.warmList == null ? $(".msg").hide() : (function(){
          $(".msg").show();
          var i = 0;
          for(; i < reg.warmList.length; i++){
              reg.warmList[i].type == 1 ? (reg.warmList[i].num != 0 ? $('.phmessage').show() : null ) : (reg.warmList[i].type == 2 ? (reg.warmList[i].num != 0 ? $('.redeem_msg').show().text(reg.warmList[i].num) : null ) : ( reg.warmList[i].type == 3 ? (reg.warmList[i].num != 0 ? $('.coupon_msg').show().text(reg.warmList[i].num) : null ) : (reg.warmList[i].num != 0 ? $('.order_msg').show().text(reg.warmList[i].num) : null ) ));
          };
        })();
    })
})();
//每日抽奖活动
jzm.raffle_init = function(){
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
