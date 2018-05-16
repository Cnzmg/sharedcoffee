// //http 请求获取数据接口地址 正式版服务器
// var httpUpImg = "http://120.79.53.95/";
// var httpUpData = "http://120.79.53.95/";
// var uri = "http://www.cbcoffee.cn/sharedcoffee/";
// // http 微信授权 静态授权/获取用户信息授权
// var wxUri = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx71c7dc4f5208bb07&redirect_uri='+ window.location.href +'&response_type=code&scope=snsapi_userinfo&state=wx';
// var wxUribase = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx71c7dc4f5208bb07&redirect_uri='+ window.location.href +'&response_type=code&scope=snsapi_base&state=wx';
//http 请求获取数据接口地址 测试版
var httpUpImg = "http://39.108.49.246/";
var httpUpData = "http://39.108.49.246/";
var uri = "http://test.cbcoffee.cn:8086/sharedcoffee/";
var transferStation = "http://www.cbcoffee.cn/sharedcoffee/tran/transfer.html";   // 测试服授权微信中转站
var wxUri = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx71c7dc4f5208bb07&redirect_uri='+ transferStation +'&response_type=code&scope=snsapi_userinfo&state=' +  window.location.href;
var jzm = {},geolocation,longitude,latitude,__load = window;
var statusCode = "400|997|999|4444|1005";
var stateCode = new RegExp(statusCode);
jzm.paraMessage = function(msg,data){
  return new jzm[msg](data);
};
jzm.Preservation = function(reg){console.log(reg);localStorage.setItem("token",JSON.stringify({token:reg.user_token,userid:reg.user_id,userStatus:reg.userStatus,type:reg.type}));};
jzm.getQueryString = function(name)
{
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};
jzm.Error = function (err){  //错误信息
  console.log(err);
  alert(err.statusCode.msg);
  localStorage.clear();
  err.statusCode.status == 4444 ? document.write(err.statusCode.msg) : window.location.href = uri + "asset/html/404.html?uri=" + encodeURI(window.location.href.split('?')[0]);
};
jzm.RanNum = function(e){
  e = e || 12;
  var m = "",i = 0,str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for(; i < e; i++){
  m += str.charAt(Math.floor(Math.random() * str.length));
  }
  return m;
};
jzm.getMapAPI = function(e){//获取首次登录坐标
  geolocation = new BMap.Geolocation();
  geolocation.getCurrentPosition(function(r){
      longitude = r.longitude;   //当前位置 经纬度
      latitude = r.latitude;  //当前位置 经纬度
      $.get(httpUpData + 'save_user_location?userId=' + e.user_id + "&userToken=" + e.user_token +"&longitude=" +longitude + "&latitude="+latitude,function(reg) {
          return true;
        });
  });
};
jzm.getUserToken = function(){
  $.ajax({
      url: httpUpData + 'WeChat_login',
      type: 'GET',
      async: false,
      dataType: 'json',
      data: {code: jzm.getQueryString("code")}
    })
    .done(function(reg) {
        if (reg.statusCode.status == 1000)
          {
              jzm.paraMessage('Preservation',reg);
              if(reg.type == 1)
                {
                  jzm.paraMessage('getMapAPI',reg);
                };
          }
          else
          {
               jzm.Error(reg);
          };
    });
};
var utoken = JSON.parse(localStorage.getItem("token"));   //用户权限指令
!utoken ? (!jzm.getQueryString("code") ? window.location.href = wxUri : jzm.paraMessage('getUserToken'))  /*/是否验证微信登陆 /*/  : null;
var ux = JSON.parse(localStorage.getItem("token"));   //用户权限指令

//4-22 实体店限时活动
jzm.free = function(){
  $.get(httpUpData + 'send_red_packets',{userId:ux.userid,userToken:ux.token,type:2},function(r){  //检测当前用户是否已经兑换
      // stateCode.test(r.statusCode.status) ? jzm.Error(r) : null;
      if(r.statusCode.status == 1064){
        //$(".box02").show().find("p").text(r.statusCode.msg);  //当前已经领取过;
        __load.location.href = "./accomplish.html";
      };
  });
  //手势拖动1.1
  var locked,slideBox = $('#slide_box'),slideXbox = $('#slide_xbox'),btn = $('#btn')[0],slideBoxWidth = slideBox.offsetWidth,/*/当前盒子/*/btnWidth = btn.offsetWidth;
  btn.ondragstart = function () { return false; };
  btn.onselectstart = function () { return false; };
  var cont = $("#btn");  //事件二次
  var startX = 0, sX = 0, moveX = 0,leftX = 0;
  cont.on({//绑定事件
      touchstart: function (e) {
          startX = e.originalEvent.targetTouches[0].pageX;//获取点击点的X坐标
          sX = $(this).offset().left;//相对于当前窗口X轴的偏移量
          leftX = startX - sX;//鼠标所能移动的最左端是当前鼠标距div左边距的位置
      },
      touchmove: function (e) {
          e.preventDefault();   //阻止其他事件
          moveX = e.originalEvent.targetTouches[0].pageX;//移动过程中X轴的坐标
          var objX = moveX - leftX + btnWidth;
          if (objX < btnWidth) {
              objX = btnWidth
          }
          if (objX > slideBoxWidth) {  //
              objX = slideBoxWidth
          }
          $('#slide_xbox').width(objX + 'px');
      },
      touchend: function (e) {
          var objX = moveX - leftX + btnWidth;
          if (objX < slideBoxWidth) {
              objX = btnWidth;
          } else {
              objX = slideBoxWidth;
              locked = true;
              $.get(httpUpData + 'send_red_packets',{userId:ux.userid,userToken:ux.token,type:1},function(r){
                stateCode.test(r.statusCode.status) ? jzm.Error(r) : null;
                $('.boxshow').text(r.statusCode.msg).show();
                (r.statusCode.status==600 || r.statusCode.status==1067) ? __load.location.href = "./collect-money.html" : null;
                // localStorage.clear();
                setTimeout(function(){
                    r.statusCode.status != 1066 ? $('.boxshow').hide() : null;
                    r.statusCode.status == 1064 ? __load.location.href = "./accomplish.html" : null;
                    //1067 红包失败，奶茶到账
                    // WeixinJSBridge.call('closeWindow');  //关闭微信浏览器
                },2000);
              });
          }
          $('#slide_xbox').width(objX + 'px');
      }
  });
};
// 解析URL地址
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
//执行检测收件方法
var bin = new RegExp(jzm.parsURL(__load.location.href).path)
bin.test('/sharedcoffee/activity/free-tea.html') ? jzm.free() : null;    //4-22限时活动
