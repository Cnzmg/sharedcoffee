var jzmr = {};
jzmr.phcode = function(type){   //发送验证码
if(!$("#phone").val()){alert("请填写手机号码");return false};
$.ajax({
      url: httpUpData + 'manage_user_phone',
      type: 'GET',
      dataType: 'json',
      data: {userId: us_userid,userToken:us_token,type: 2,mobile:$("#phone").val()}
    })
    .done(function(reg){
        if(reg.statusCode.status == 1056){
            var t;
            var times=120;
            (function s(){
            $(".goto").prop('disabled',true).text(times + "s");
              if (times == 0) {
                   $(".goto").removeAttr('disabled').text("重新获取");
                   times=120;
                   clearTimeout(t);
              }else {
                      times--;
              }
            t=setTimeout(function(){
                s();
            },1000);
            if(times == 0){
                 clearTimeout(t);
                 $(".goto").removeAttr('disabled').text("重新获取");
            }
            }());
        }else{
          jzm.Error(reg);
        };
    })
    .fail(function(err){
      jzm.Error(reg);
    })
};

jzmr.getphcode = function(type){    //提交信息
  if(!$("#codemessage").val()){alert("请填写验证码");return false};
  $.ajax({
      url: httpUpData + 'manage_user_phone',
      type: 'GET',
      dataType: 'json',
      data: {userId: us_userid,userToken:us_token,type: 3,mobile:$("#phone").val(),code:$("#codemessage").val()}
    })
    .done(function(reg){
        if(reg.statusCode.status == 1061){
            alert("提交成功！");
            window.location.href = "../html/my_redeemCode.html";
        }
        else{
          jzm.Error(reg);
        };
    })
    .fail(function(err){
      jzm.Error(reg);
    })
};

jzmr.sysphcode = function(){   //查询当前的手机号码
  $.ajax({
      url: httpUpData + 'manage_user_phone',
      type: 'GET',
      dataType: 'json',
      data: {userId: us_userid,userToken:us_token,type: 1}
    })
    .done(function(reg){
        if(reg.statusCode.status == 6666){
          $("#oldphone").text(reg.mobile);
        }
        else if(reg.statusCode.status == 4444){
          var x = confirm("您当前未绑定手机号码，是否前去去绑定！");
          if(x == true){
            window.location.href = "./verifing.html";
          }else{
            window.location.href = "./my.html";
          };
        }
        else{
          jzm.Error(reg);
        };
    })
    .fail(function(err){
      jzm.Error(reg);
    })
};

jzmr.oldPhcode = function(type){   //发送验证码   校验旧手机
  $.ajax({
      url: httpUpData + 'manage_user_phone',
      type: 'GET',
      dataType: 'json',
      data: {userId: us_userid,userToken:us_token,type: type}
    })
    .done(function(reg){
        if(reg.statusCode.status == 1056){
            var t;
            var times=120;
            (function s(){
            $(".goto").prop('disabled',true).text(times + "s");
              if (times == 0) {

                   $(".goto").removeAttr('disabled').text("重新获取验证码");
                   times=120;
                   clearTimeout(t);

              }else {
                      times--;
              }
            t=setTimeout(function(){
                s();
            },1000);
            if(times == 0){
                 clearTimeout(t);
                 $(".goto").removeAttr('disabled').text("重新获取验证码");
            }
            }());
        }
        else{
          jzm.Error(reg);
        };
    })
    .fail(function(err){
      jzm.Error(reg);
    })
};

jzmr.oldGetphcode = function(type){    //提交信息    验证旧手机
  $.ajax({
      url: httpUpData + 'manage_user_phone',
      type: 'GET',
      dataType: 'json',
      data: {userId: us_userid,userToken:us_token,type: type,code:$("#codemessage").val()}
    })
    .done(function(reg){
        if(reg.statusCode.status == 1063){
          __load.location.href = './verifing.html';
        }
        else{
          jzm.Error(reg);
        };
    })
    .fail(function(err){
      jzm.Error(reg);
    })
};

//4-22 实体店限时活动
jzmr.free = function(){
  $.get(httpUpData + 'send_red_packets',{userId:us_userid,userToken:us_token,type:2},function(r){
      if(r.statusCode.status == 200){
        alert(r.statusCode.msg);
        setTimeout(function(){
          WeixinJSBridge.call('closeWindow');
        },500)
      };
  });
  var d = $(".bggox");
  d.each(function(index){
      $(this).on('touchstart', function(evt) {
          var e = event || evt;
          e.preventDefault();    //阻止其他事件
      }).on('touchmove', function(evt) {    //执行滑块运动
          var e = event || evt;
          e.preventDefault();      //阻止其他事件
          if (e.targetTouches.length == 1) {    // 如果这个元素的位置内只有一个手指的话
              var touch = e.targetTouches[0];    // 把元素放在手指所在的位置
              $(this).css("left",(touch.pageX- parseInt($(this).width())/2 + 'px')).text(touch.pageX- parseInt($(this).width())/2 + 'px');
              if(touch.pageX > (window.innerWidth - 50)){
                $.get(httpUpData + 'send_red_packets',{userId:us_userid,userToken:us_token,type:1},function(r){
                    $('.boxshow').text(r.statusCode.msg).show();
                    // $('.boxshow').show();
                      setTimeout(function(){
                        $('.boxshow').hide();
                        WeixinJSBridge.call('closeWindow');
                    },2000);
                });
              }
          }
      }).on('touchend', function(evt) {
          var e = event || evt;
          e.preventDefault();
      })
  });
};


//执行检测收件方法
var bin = new RegExp(jzm.parsURL(__load.location.href).path)
bin.test('/sharedcoffee/activity/old_phone_verify.html') ? jzmr.sysphcode() : null;   //限时活动手机号码检测
bin.test('/sharedcoffee/activity/free-tea.html') ? jzmr.free() : null;    //4-22限时活动
