jzm.find_product_detail = function()//产品的初始化口味选择
{
    var productId = jzm.getQueryString('productId');
    $.ajax({
        url: httpUpData + 'find_product_detail',
        type: 'GET',
        dataType: 'json',
        async:false,
        data: {productId: productId,userId:us_userid,userToken:us_token}
    })
    .done(function(reg) {
      stateCode.test(reg.statusCode.status) ? jzm.Error(reg) : (function(){
        var num = [] /*料仓id*/,
        sing = []  /*口味名称*/,
        str = ""
        pm /*是否可以调整冷热0可以*/,
        numtatch = []/*初始化口味条数*/,
        flavorId = []/*初始化口味id*/,
        coff = []/*初始化口味的英文*/;
        str += '<div class="row" style="height:36%;width:78%;margin:30px auto 0;">'+
                    '<div class="col-sm-12 col-xs-12 col-md-12 col-lg-12" style="height: 100%;">'+
                        '<img  class="item_img" src="../image/3.jpg" alt="" style="width:100%; height: 100%;border-radius:16px 16px 0 0;">'+
                    '</div>'+
                '</div>'+
                '<div class="ider_box">'+
                    '<p>'+ reg.productDetail.productName.split(',')[0] +'</p>'+
                    '<p>'+ reg.productDetail.productName.split(',')[1] +'</p>'+
                    '<p style="margin:10px;">￥'+ parseFloat((reg.productDetail.productPrice != null ? reg.productDetail.productPrice : 0) / 100).toFixed(2) +'</p>'+
                    '<p style="color:#e0e0e0;margin-top:10px;">Please choose the taste you need</p>'+
                    '<p style="border:1px solid #fff;font-size:1.4rem;margin:5px 25px;padding:6px;border-radius:22px;">定制您的专属口味</p>'+
                '</div>'+
                '<div class="row" style="padding:20px 2.2%; height:auto;overflow:hidden;margin-bottom:8%;">'+
                    '<div class="col-sm-12 col-xs-12 col-md-12 col-lg-12" style="height: 100%;">'+
                        '<div class="sugar" style="margin-bottom:70px;">'+
                            '<div class="sugar_point">'+
                                '<span>冷热切换</span> <span> hot & cold</span>'+
                                '<span class="hot" style=""><img style="width:60%;" src="../image/lb/taste/hot_action.png" alt=""></span>'+
                                '<span class="cold" style=""><img style="width:60%;" src="../image/lb/taste/cold.png" alt=""></span>'+
                            '</div>'+
                       '</div>';
                       for(var i = 0; i < reg.productDetail.flavorTrueList.length; i++){
                          str += '<div  class="sugar" id="sugar">'+
                          '<div  class="sugar_point">';
                            if (i == reg.productDetail.flavorTrueList.length - 1)
                                {
                                    num += reg.productDetail.flavorTrueList[i].bunkerNumber;
                                    sing += reg.productDetail.flavorTrueList[i].flavorName.split(',')[0];
                                    flavorId += reg.productDetail.flavorTrueList[i].flavorId;
                                }
                            else
                                {
                                    num += reg.productDetail.flavorTrueList[i].bunkerNumber +",";
                                    sing += reg.productDetail.flavorTrueList[i].flavorName.split(',')[0] + ",";
                                    flavorId += reg.productDetail.flavorTrueList[i].flavorId + ",";
                                };
                            var flavor = reg.productDetail.flavorTrueList[i].flavorName.split(',');

                            str += '<span>'+ flavor[0] +'</span><span>'+ flavor[1] +'</span></div>'+
                            '<div  class="sugar_num" style="position:relative;top:10px;">'+
                            '<div style="height: 15px;background: #fff;z-index: -1;position: absolute;top: 0;left: 0;width: 100%;"></div><input class="range" min="10" max="100" id="range'+ i +'" type="range" value="75">'+  //拖动条
                                '<p style="margin:0;"><span><img src="../image/lb/taste/0.png"alt="" /></span><span><img src="../image/lb/taste/2.png"alt="" /></span><span  style="text-align:-webkit-center"><img src="../image/lb/taste/5.png"alt="" /></span><span style="text-align:-webkit-right"><img src="../image/lb/taste/75.png"alt="" /></span><span style="text-align:-webkit-right"><img src="../image/lb/taste/100.png"alt="" /></span></p>'+
                            '</div>'+
                            '</div>';
                            numtatch += '<input type="hidden" value="50" id="ANum'+ i +'" />';
                        };
                        str += '<input type="hidden"  class="bunkerNumber_sugar"  value="'+ num +'">';
                        str += '<input type="hidden" class="_sugar" value="'+ sing +'">';
                        str += '<input type="hidden" id="pm" value="'+ reg.productDetail.productTemperature +'">';
                        str += '<input type="hidden" class="_flavorId" value="'+ flavorId +'">';
                        str += '<input type="hidden" value="1" id="ducHcold">';
                        str += '<div id="numtatch">'+ numtatch + '</div>';
                     str += '</div>'+
                    '</div>'+
                   '</div>'+
                    '<div class="row" style="height: 7.3%;background:#000;line-height:53px;position:fixed;bottom:0;left:0;width: 100%;">'+
                        '<div class="col-sm-6 col-xs-6 col-md-6 col-lg-6" style="height: 100%;">'+
                            '<span style="font-size:1.8rem; font-weight: bold;color:#fff;margin-left:4.5%;">合计:</span><span style="font-size: 2rem; color:#9f0802; font-weight: bold;margin-left:3.7%;">￥</span><span class="price">'+ reg.productDetail.productPrice / 100 +'</span>'+
                        '</div>'+
                        '<div class="col-sm-6 col-xs-6 col-md-6 col-lg-6" style="text-align: right; height: 100%; ">'+
                            '<a href="javascript:void(0);" onclick=jzm.paraMessage("oder"); style="border:none; height: 100%; display: inline-block;"><img src="../image/lb/taste/_0019_OK.png" alt="" style="width:60%;margin-right:2.2%;" /></a>'+
                        '</div>'+
                    '</div><input type="hidden" id="formulaName" value="" ><input type="hidden" id="formulaMake" value="" >';
        $("#find_detail").html(str);
        var getIten = JSON.parse(localStorage.getItem("liItem"));
        $(".ider_box").html(getIten.title);
        $(".item_img").attr("src",reg.productDetail.productPicurl)
        if($("#pm").val() == 1)
        {
             $(".cold").children('img').attr({
                    "src":"../image/lb/taste/cold.png"
                });

                $(".hot").children('img').attr({
                    "src":"../image/lb/taste/hot_action.png"
                });
                $("#ducHcold").val(1);
        }
        else if($("#pm").val() == 0)
        {
            $(".cold").children('img').attr({
                    "src":"../image/lb/taste/cold_action.png"
                });

                $(".hot").children('img').attr({
                    "src":"../image/lb/taste/hot.png"
                });
                $("#ducHcold").val(0);
        }
        else
            {
                $("#ducHcold").val(2);
            };
      })();
    })
    .fail(function(err) {
        jzm.Error(err)
    })
}
jzm.oder = function()//提交口味提交的信息
{
    var productId = jzm.getQueryString("productId"),//料仓id
    bunkerNumber_sugar = $(".bunkerNumber_sugar").val().split(','),//口味名称
    _sugar = $("._sugar").val().split(','),//口味id
    _flavorId = $("._flavorId").val().split(','),//口味进度条的数值数量
    obj = "";
    for(var i = 0; i < bunkerNumber_sugar.length; i++)
    {
        var pm = $("#range" + i).val();
        if (i == bunkerNumber_sugar.length - 1)
            {
                obj += JSON.stringify(
                    {
                        flavorName:_sugar[i],
                        flavorValue:pm / 100,
                        flavorId:_flavorId[i],
                        bunkerNumber:parseInt(bunkerNumber_sugar[i])
                    });
            }else
            {
                obj += JSON.stringify(
                    {
                        flavorName:_sugar[i],
                        flavorValue:pm / 100,
                        flavorId:_flavorId[i],
                        bunkerNumber:parseInt(bunkerNumber_sugar[i])
                    }) + ",";
            }

    }
    var DataJson = "{\"flavorTrueList\":["+obj+ "],\"temperature\":"+ $("#ducHcold").val() +"}";
    if (productId) {
        $.ajax({
            url: httpUpData + 'order_true',
            type: 'POST',
            dataType: 'json',
            data: {userId:us_userid,productId:productId,flavorInfo: DataJson,userToken:us_token}
        })
        .done(function(reg) {
          stateCode.test(reg.statusCode.status) ? jzm.Error(reg) : (function(){
            window.location.href = '../html/order_pay.html?orderId=' + reg.orderId;
          })();
        })
        .fail(function(err) {
            jzm.Error(err)
        })
    };
};
jzm.find_unpaid_order = function()//查找未支付订单详情
{
    var orderid = jzm.getQueryString("orderId");
    if (orderid) {
        $.ajax({
            url: httpUpData + 'find_unpaid_order',
            type: 'GET',
            dataType: 'json',
            async:false,
            data: {orderId: orderid,userId:us_userid,userToken:us_token} //使用orderid 获取未支付的订单详情
        })
        .done(function(reg) {
            var regstr = reg;
            regstr.toString().match('status') == null ? alert(1) : alert(regstr.toString().match('status'));    //  ？？？
            var str = "";
            reg.orderInfo.temperature == 1 ? reg.orderInfo.temperature = "热饮" : reg.orderInfo.temperature = "冷饮";//饮品的冷热
            str +='<p style="font-size: 2rem; margin-bottom: 5%; font-weight: bold;">'+ reg.orderInfo.productName.split(',')[0] +'</p>';
            for(var key in reg.flavorShow)
                {
                  str +='<p style="font-size: 1.5rem; margin-bottom: 3%; position:relative;"><span>'+ key.split(',')[0] +'</span><span style="position:absolute;right: 0;">'+ reg.flavorShow[key] +'</span></p>';
                };
            $("#product").html(str);
            $("#balance").text("￥"+ parseFloat((reg.orderInfo.balance != null ? reg.orderInfo.balance : 0) / 100).toFixed(2));            //账户余额
            if (reg.couponInfoList == "")
                {
                    $("#consum").css({"color":"#999"}).text("没有可用的优惠卷");   //优惠金额
                    $("#consumPay").text("￥0");   //已优惠金额
                    $("#totalMoney").text(reg.orderInfo.productPrice / 100);  //实际需支付金额

                }
            else
                {
                    var strs = "";
                    var str1 = '<li><span style="margin-right:10px;">不使用优惠卷</span><span style="float:right;line-height:40px;"><img src="../image/lb/pay/action.png" alt="" /></span><input type="hidden" value="" /></li>';

                    for(var i = 0; i < reg.couponInfoList.length; i++) // 优惠卷的信息
                    {
                        strs += '<li><span style="margin-right:10px;">￥'+ reg.couponInfoList[i].couponMoney / 100 +'</span><span>'+ reg.couponInfoList[i].couponName +'</span><span style="float:right;line-height:40px;"><img src="../image/lb/pay/action.png" alt="" /></span><input type="hidden" value="'+ reg.couponInfoList[i].rCouponId + ','+ reg.couponInfoList[i].couponId +','+ reg.couponInfoList[i].couponMoney +' " /></li>';

                        if (i == reg.couponInfoList.length - 1) {strs += str1};
                    };
                    $(".conmoney ul").html(strs);


                    //初始的时候选择最优惠的优惠券
                    $("#consum").css({"color":"#9f0802"}).html("-￥"+ reg.couponInfoList[0].couponMoney / 100 +'<img style="width:20%;margin-left:14.1%;" src="../image/lb/pay/right.png" alt="" />');   //优惠金额
                    // $("#consumPay").text("-￥"+reg.couponInfoList[0].couponMoney);   //已优惠金额

                    if (reg.orderInfo.productPrice - reg.couponInfoList[0].couponMoney < 0)
                        {
                            reg.couponInfoList[0].couponMoney = 0;
                        }else
                        {
                            reg.couponInfoList[0].couponMoney = reg.orderInfo.productPrice - reg.couponInfoList[0].couponMoney;
                        };

                    $("#totalMoney").text(parseInt(reg.couponInfoList[0].couponMoney) / 100);  //实际需支付金额

                    $("#consumMoney").val(reg.orderInfo.productPrice);  //总金额

                    $("#rCouponId").val(reg.couponInfoList[0].rCouponId);  //优惠卷关联id
                    $("#couponId").val(reg.couponInfoList[0].couponId);  //优惠卷id
                    $("#couponMoney").val(reg.couponInfoList[0].couponMoney);  //优惠卷金额


                }
                $("#payBackgroung").attr({"src":reg.orderInfo.productPicurl});
            console.log("success");
            // $(".mask_layer").remove();
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("compvare");
        });
    }
    else
    {
        alert("Error！");
        window.location.href = "../index.html";
    };
};

//余额支付，微信支付
function PayMoney()
{
    var orderid = jzm.getQueryString("orderId");
    var method = $("#paymethod").val();

    //优惠卷是否存在
    var rCouponIds = null;
    var couponId = null;
    if($("#rCouponId").val() != "")
    {
        if($("#rCouponId").val() == 0)
            {
                rCouponIds = null;
            }
        else
            {
                rCouponIds = $("#rCouponId").val();
            };

        couponId = $("#couponId").val();
    }

    if (method == 0)    //余额支付
        {
            var paymoney = parseInt($("#totalMoney").text());
            var couponMoney = $("#couponMoney").val();
            var paypwd = 123456;

            $.ajax({
                url: httpUpData + 'balance_pay',
                type: 'GET',
                dataType: 'json',
                data: {userId:us_userid,userToken:us_token,paymentPwd:paypwd,orderId:orderid,rCouponId:rCouponIds}
            })
            .done(function(reg) {

                if (reg.status == 1005)
                {
                    localStorage.clear();
                    alert(reg.msg);
                    window.location.href="../index.html";
                };

                $("body").append('<div class="mask_layer"></div>');
                if (reg.statusCode.status == 1012)
                    {
                        alert(reg.statusCode.msg);
                        window.location.href = "../html/my_order.html";
                    }
                else{

                        alert(reg.statusCode.msg);
                    }
                console.log("success");
                $(".mask_layer").remove();
            })


        }else   //微信支付
        {
            var payObj = [];
            $.ajax({
                url: httpUpData + 'WeChat_pay',
                type: 'GET',
                dataType: 'json',
                data: {userId:us_userid,userToken:us_token,orderId:orderid,rCouponId:rCouponIds}
            })
            .done(function(reg) {

                if (reg.status == 1005)
                    {
                        localStorage.clear();
                        alert(reg.msg);
                        window.location.href="../index.html";
                    };

                if (reg.statusCode.status == 1009)
                    {
                        payObj += JSON.stringify({appId:reg.appId,timeStamp:reg.timeStamp,package:reg.package,paySign:reg.paySign,nonceStr:reg.nonceStr, signType:reg.signType});
                        console.log(payObj);
                        pay();
                    };

                console.log("success");
            })

            function pay()   //微信支付 发起
            {
                var pay = JSON.parse(payObj);
                // alert(pay.appId);
                WeixinJSBridge.invoke(
                   'getBrandWCPayRequest', {
                       "appId":pay.appId,         //公众号名称，由商户传入
                       "nonceStr":pay.nonceStr,   //随机串
                       "package":pay.package,     //预付单号
                       "paySign":pay.paySign,     //微信签名
                       "signType":pay.signType,   //微信签名方式：
                       "timeStamp":pay.timeStamp //时间戳，自1970年以来的秒数
                   },
                   function(res){
                       if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                        //alert("支付成功！");
                        window.location.href = "../html/my_order.html";
                       } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                       else
                       {
                        console.log(res.err_msg);
                        console.log(res);
                       }
                   }
               );
            }

        }
};

//我的模块，用户信息
function user_info()
{
    $.ajax({
        url: httpUpData + 'user_info',
        type: 'GET',
        dataType: 'json',
        data: {userId: us_userid,userToken:us_token}
    })
    .done(function(reg) {

        if (reg.status == 1005)
            {
                localStorage.clear();
                alert(reg.msg);
                window.location.href="../index.html";
            };

        $("body").append('<div class="mask_layer"></div>');

        //会员等级信息
        if (reg.userInfo.memberLevel == 1) {$("#userLv").text("LV1 白银会员")}
        else if (reg.userInfo.memberLevel == 2) {$("#userLv").text("LV2 黄金会员")}
        else {$("#userLv").text("LV3 钻石会员")};

        var time = getDateTime(reg.userInfo.loginTime);

        //连续签到信息
        var str = [];
        str += '<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 integrating" style="height: 100%;color:#fff;padding-top:3%;">'+
                '<p>我的积分：'+ reg.userInfo.integral / 100 +'</p>'+
                '<ul style="height:auto;overflow:hidden;margin:0;">';
                for(var i = 1; i <= 7; i++){
                    if(reg.signInfo != null && i <= reg.signInfo.continuityCount)
                        {
                             str += '<li style="background:#fff100;color:#000;position:relative;z-index:2;"><span style="position:absolute;left:16px;width:100%;height:4px;background:#fff100;top:35%;z-index:1;"></span>' + i +'</li>';
                        }
                    else
                        {
                            if (i == 7)
                                {
                                    str += '<li style="background:#fff;color:#fff;position:relative;z-index:2;">' + i +'</li>';
                                }else
                                {
                                    str += '<li style="background:#fff;color:#fff;position:relative;z-index:2;"><span style="position:absolute;left:16px;width:100%;height:4px;background:#fff;top:35%;z-index:1;"></span>' + i +'</li>';
                                };
                        };

                    }

        str += '</ul>'+
            '</div>'+
            '<div class="Registration" style="text-align: right; margin-top: 4%;" >';

            if(reg.signInfo != null){
                var nowDate = new Date().Format("yyyy/MM/dd");
                var oldTime = getDateTime(reg.signInfo.lastDate);

                if(nowDate == oldTime.split(' ')[0])
                    {
                        str +='<button>已连续签到<br >'+ reg.signInfo.continuityCount +'天</button>';
                    }
                else
                    {
                        str +='<button onclick="sign_in();">签到</button>';
                    };


                }
            else
                {
                    str +='<button onclick="sign_in();">签到</button>';
                }
            str += '</div>';

        $("#integral").html(str);   //签到信息

        $("#userName").text(reg.userInfo.nickName);
        $("#userImg").attr("src",reg.userInfo.headImgUrl);

        console.log("success");
        $(".mask_layer").remove();

    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });

}

//我的模块 用户签到信息
function sign_in()
{
    $.ajax({
        url: httpUpData + 'sign_in',
        type: 'GET',
        dataType: 'json',
        data: {userId: us_userid,userToken:us_token}
    })
    .done(function(reg) {

        if (reg.status == 1005)
            {
                localStorage.clear();
                alert(reg.msg);
                window.location.href="../index.html";
            };

        $("body").append('<div class="mask_layer"></div>');

        //连续签到信息
        var str = [];
        str += '<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 integrating" style="height: 100%;color:#fff;padding-top:3%;">'+
                '<p>我的积分：'+ reg.integral / 100 +'</p>'+
                '<ul>';
                for(var i = 1; i <= 7; i++){
                    if(reg.signInfo != null && i <= reg.signInfo.continuityCount)
                        {
                            str += '<li style="background:#fff100;color:#000;position:relative;z-index:2;"><span style="position:absolute;left:16px;width:100%;height:4px;background:#fff100;top:35%;z-index:1;"></span>' + i +'</li>';
                        }
                    else
                        {
                            if (i == 7)
                                {
                                    str += '<li style="background:#fff;color:#fff;position:relative;z-index:2;">' + i +'</li>';
                                }else
                                {
                                    str += '<li style="background:#fff;color:#fff;position:relative;z-index:2;"><span style="position:absolute;left:16px;width:100%;height:4px;background:#fff;top:35%;z-index:1;"></span>' + i +'</li>';
                                };
                        };

                    }

        str += '</ul>'+
            '</div>'+
            '<div class="Registration" style="text-align: right; margin-top: 4%;" >';

            // str += '<span class="oneday">+1</span>';

            if(reg.signInfo != null){
                    str +='<button>已连续签到<br >'+ reg.signInfo.continuityCount +'天</button>';
                }
            else
                {
                    str +='<button onclick="sign_in();">签到</button>';
                }
            str += '</div>';

        $("#integral").html(str);   //签到信息


        console.log("success");
        $(".mask_layer").remove();
    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });

}
//用户订单信息  方法传值""双引号   ????
function find_order(page,url,id)
{
    drpage(page,url,id);
};
//对单个订单进行查询   方法传值""双引号
function find_order_detail(eid)
{
    //alert(eid);
    var orderId = jzm.getQueryString("orderId");
    if(!eid)
        {
            $.ajax({
                url: httpUpData + 'find_order_detail',
                type: 'GET',
                dataType: 'json',
                data: {userId: us_userid,orderId:orderId,userToken:us_token}
            })
            .done(function(reg) {

                if (reg.status == 1005)
                {
                    localStorage.clear();
                    alert(reg.msg);
                    window.location.href="../index.html";
                };

                $("body").append('<div class="mask_layer"></div>');
                var pmshow = [];
                var color = [];
                //支付状态 //兑换状态
                if(reg.orderInfo.paymentStatus == 1)
                    {
                        reg.orderInfo.paymentStatus = "未支付";
                        pmshow = "no_action";
                        color = "#9f0802";
                    }
                else if(reg.orderInfo.paymentStatus == 2)
                    {
                        if(reg.redeemInfo.redeemStatus == 1 || reg.redeemInfo.rCStatus == 1)
                            {
                                reg.orderInfo.paymentStatus = "未兑换";
                                color = "#9f0802";
                                pmshow = "action";
                            }
                        else if(reg.redeemInfo.redeemStatus == 3 || reg.redeemInfo.rCStatus == 3)
                            {
                                reg.orderInfo.paymentStatus = "制作中";
                                color = "#9f0802";
                                pmshow = "no_action";
                            }
                        else if(reg.redeemInfo.redeemStatus == 2 || reg.redeemInfo.rCStatus == 2)
                            {
                                reg.orderInfo.paymentStatus = "已兑换";
                                $("#addhide").hide();
                                color = "#828282";
                                pmshow = "no_action";
                            }
                    }
                else if(reg.orderInfo.paymentStatus == 3)
                    {
                        reg.orderInfo.paymentStatus = "已退款";
                        color = "#9f0802";
                        pmshow = "no_action";
                    }
                else
                    {
                        reg.orderInfo.paymentStatus = "已关闭";
                        pmshow = "no_action";
                        color = "#828282";
                    };


                var obj = reg.flavorShow;

                var str = [];
                str += '<div style="flex: 1; height: 100%;margin-top:5%;text-align:center;"><img src="'+ reg.productInfo.productPicurl +'" alt="" style="width: 90%;"></div>'+
                            '<div  class="message" style="color:#828282;padding-top:3%;">'+
                                '<p class="wait_pay" style="position:absolute;right:8%;top:10px;color:'+ color +';">'+ reg.orderInfo.paymentStatus +'</p>'+
                                '<p style="font-size:1.6rem;color:#fff;margin-bottom: 3%;">'+ reg.productInfo.productName.split(',')[0] +'</p>'+
                                '<p style="display: flex; font-size:1rem; "><span style="flex: 1; text-align: left; margin-right:2%;">时间</span><span style="flex: 2;text-align:right;margin-right:8%;">' + getDateTime(reg.orderInfo.createTime).split(' ')[0] +'</span></p>';
                for(var key in obj){
                    str += '<p style="display: flex; font-size:1rem;"><span style="flex: 1; text-align: left; margin-right:2%;">'+ key.split(',')[0] +'</span><span style="flex: 2;text-align:right;margin-right:8%;">'+ obj[key] +'</span></p>';
                    };

                    if (pmshow == "action")
                        {
                            str += '<p style="display: flex; font-size:1rem;"><span style="flex: 1; text-align: left; margin-right:2%;">兑换码</span><span style="flex: 2;text-align:right;margin-right:8%;font-size:1.6rem;">'+ reg.redeemInfo.redeemCode +'</span></p>';
                        };
                    if (reg.orderInfo.paymentStatus == "未支付") {
                        str += '<a href="order_pay.html?orderId='+ orderId +'" style="float:right;color:#000;font-size:1rem;margin-right:10%;display:inline-block;padding:1% 4%;background:#fff100;border-radius:10px;">立即支付</a>';
                    };

                    str += '</div>';

                $(".num_first").html(str);

                // reg.orderInfo.paymentType != null ? (reg.orderInfo.paymentType == 1 ? "余额支付" : "微信支付") :  "无";
                if(reg.orderInfo.paymentType == null){
                  reg.orderInfo.paymentType = "无";
                }else if(reg.orderInfo.paymentType == 2){
                  reg.orderInfo.paymentType = "微信支付";
                }else if(reg.orderInfo.paymentType == 3){
                  reg.orderInfo.paymentType = "支付宝支付";
                }else if(reg.orderInfo.paymentType == 4){
                  reg.orderInfo.paymentType = "兑换码";
                }else if(reg.orderInfo.paymentType == 1){
                  reg.orderInfo.paymentType = "余额支付";
                }else{reg.orderInfo.paymentType = "其他";};


                if(reg.orderInfo.paymentStatus == "未支付")
                    {
                        reg.orderInfo.paymentType = "未支付";
                    };

                var liststr = [];

                if (!reg.orderInfo.paymentTime)
                    {
                        reg.orderInfo.paymentTime = reg.orderInfo.createTime;
                    };

                liststr += '<li style="padding:3.7%;background:rgba(0,0,0,0.5);border-bottom:1px solid #828282;">'+
                            '<span>订单号</span><span style=" text-align: right;color:#8c8c8c;">'+ reg.orderInfo.orderId +'</span>'+
                        '</li>'+
                        '<li style="padding:3.7%;background:rgba(0,0,0,0.5);border-bottom:1px solid #828282;">'+
                            '<span>支付信息</span><span style=" text-align: right;color:#8c8c8c;">'+ getDateTime(reg.orderInfo.paymentTime).split(' ')[0] +'</span>'+
                        '</li>'+
                        '<li style="padding:3.7%;background:rgba(0,0,0,0.5);border-bottom:1px solid #828282;">'+
                            '<span>付款方式</span><span style="text-align: right;color:#8c8c8c;">'+ reg.orderInfo.paymentType +'</span>'+
                        '</li>'+
                        '<li style="padding:3.7%;background:rgba(0,0,0,0.5);border-bottom:1px solid #828282;">'+
                            '<span>订单总价</span><span style="text-align: right;color:#8c8c8c;">'+ parseFloat((reg.orderInfo.spendingMoney == null ? 0 : reg.orderInfo.spendingMoney) / 100).toFixed(2) +'元</span>'+
                        '</li>'+
                        '<li style="padding:3.7%;background:rgba(0,0,0,0.5);border-bottom:1px solid #828282;">'+
                            '<span>优惠金额</span><span style="text-align: right;color:#8c8c8c;">'+ parseFloat((reg.orderInfo.discountMoney == null ? 0 : reg.orderInfo.discountMoney) / 100).toFixed(2) +'元</span>'+
                        '</li>'+
                        '<li style="padding:3.7%;background:rgba(0,0,0,0.5);">'+
                            '<span>支付金额</span><span style="text-align: right;color:#8c8c8c;">'+ parseFloat((reg.orderInfo.paymentMoney == null ? 0 : reg.orderInfo.paymentMoney) / 100).toFixed(2) +'元</span>'+
                        '</li>';

                $(".list_foot").html(liststr);

                console.log("success");
                $(".mask_layer").remove();
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });
        }
    else
        {
            window.location.href = "../html/order_detail.html?orderId=" + eid;
        };
}
//账户余额
function find_balance()
{
    $.ajax({
        url: httpUpData + 'find_balance',
        type: 'GET',
        dataType: 'json',
        data: {userId: us_userid,userToken:us_token}
    })
    .done(function(reg) {

        if (reg.status == 1005)
        {
            localStorage.clear();
            alert(reg.msg);
            window.location.href="../index.html";
        };

        $("body").append('<div class="mask_layer"></div>');

        $("#balance").text("￥" + parseFloat((reg.balance != null ? reg.balance : 0) / 100).toFixed(2));

        console.log("success");
        $(".mask_layer").remove();
    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });

};
//账户充值
function WeChat_recharge()
{
    if(inMoney.value && inMoney.value >= 100)
        {
        $.ajax({
            url: httpUpData + 'WeChat_recharge',
            type: 'GET',
            dataType: 'json',
            data: {userId: us_userid,userToken:us_token,paymentMoney:$("#paymentMoney").val()}
        })
        .done(function(reg) {

            if (reg.status == 1005)
                {
                    localStorage.clear();
                    alert(reg.msg);
                    window.location.href="../index.html";
                };

            $("body").append('<div class="mask_layer"></div>');
            var rechargePay = [];
            if (reg.statusCode.status == 1009)
                {
                    rechargePay.push(JSON.stringify({appId:reg.appId,timeStamp:reg.timeStamp,package:reg.package,paySign:reg.paySign,nonceStr:reg.nonceStr, signType:reg.signType}));
                    recharge();
                }
            else
                {
                    alert(reg.statusCode.msg);
                };
            function recharge()   //微信支付 发起
                {
                    var pay = JSON.parse(rechargePay);
                    WeixinJSBridge.invoke(
                       'getBrandWCPayRequest', {
                           "appId":pay.appId,         //公众号名称，由商户传入
                           "nonceStr":pay.nonceStr,   //随机串
                           "package":pay.package,     //预付单号
                           "paySign":pay.paySign,     //微信签名
                           "signType":pay.signType,   //微信签名方式：
                           "timeStamp":pay.timeStamp //时间戳，自1970年以来的秒数
                       },
                       function(res){
                           if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                            //alert("支付成功！");
                            window.location.href = "my_wallet.html";
                           } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                           else
                           {
                            console.log(res.err_msg);
                            console.log(res);
                           }
                       }
                   );
                }

            console.log("success");
            $(".mask_layer").remove();
        })
        .fail(function(msg) {
            console.log(msg);
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
    }else
    {
        // alert("money is NULL");
        $("#paymentMoney").parent("div").siblings('p').text("请填写整数,最少充值100,单次满100送50").css({fontSize:"1.4rem",color:"red"});
        console.log("money is NULL");
    };
}
//消费明细
function find_consumption_info()
{
    $.ajax({
        url: httpUpData + 'find_consumption_info',
        type: 'GET',
        dataType: 'json',
        data: {userId: us_userid,userToken:us_token,page:1}
    })
    .done(function(reg) {

        if (reg.status == 1005)
        {
            localStorage.clear();
            alert(reg.msg);
            window.location.href="../index.html";
        };

         $("body").append('<div class="mask_layer"></div>');

        var str = [];
        for(var i = 0; i < reg.list.length; i++)
            {
                if(reg.list[i].paymentType == 2)
                    {
                        reg.list[i].paymentType = "微信支付";
                    }
                else
                    {
                        reg.list[i].paymentType = "钱包支付";
                    };

                str +='<li style="height: 15%; display: flex; margin:1% 2%;background:rgba(0,0,0,0.5);color:#828282;">'+
                    '<div style="flex: 2; padding:2%;">'+
                        '<img src="'+ reg.list[i].productPicurl +'" alt="" style="height: 80%; width: 100%;">'+
                    '</div>'+
                    '<div style="flex: 4; padding:4% 2% 2% 2%; font-size: 1.5rem;">'+
                        '<p style="color:#fff;">'+ reg.list[i].productName.split(',')[0] +'</p>'+
                        '<p>'+ getDateTime(reg.list[i].paymentTime).split(' ')[0] +'</p>'+
                    '</div>'+
                    '<div style="flex: 2; padding:4% 2% 2% 2%; text-align: right;">'+
                        '<p>-'+ reg.list[i].paymentMoney / 100 +'.00</p>'+
                        '<p>'+ reg.list[i].paymentType +'</p>'+
                    '</div>'+
                '</li>';
            };

        $(".list").html(str);

        console.log("success");
        $(".mask_layer").remove();
    })
    .fail(function(msg) {
        alert(msg);
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });

};
//我的优惠卷列表
function find_coupon()
{
    coupon(1,"find_coupon");
    // $.ajax({
    //     url: httpUpData + 'find_coupon',
    //     type: 'GET',
    //     dataType: 'json',
    //     data: {userId: us_userid,userToken:us_token,page:1}
    // })
    // .done(function(reg) {

    //     if (reg.status == 1005)
    //     {
    //         localStorage.clear();
    //         alert(reg.msg);
    //         window.location.href="../index.html";
    //     };

    //     $("body").append('<div class="mask_layer"></div>');
    //     var str = [];
    //     if (!reg.list) {$(".list").append("您当前暂时没有优惠卷~~~");}
    //     else{
    //         for(var i = 0; i < reg.list.length; i++)
    //             {
    //                 str += '<li style="display: flex; margin:1% 2%;color:#828282;background:rgba(0,0,0,0.5);padding:2%;">'+
    //                         '<div style="flex: 3;"><img src="'+ httpUpImg + reg.list[i].couponUrl +'" alt="" style="height: 80%; width: 80%;"></div>'+
    //                         '<div style="flex: 4;">'+
    //                             '<p style="font-size: 1.4rem;  margin-bottom: 4%;color:#fff;">'+ reg.list[i].couponName +'</p>'+
    //                             '<p style="font-size: 1rem;  margin-bottom: 0;">有效期至2018-12-12</p>'+
    //                             '<p style="font-size: 1rem;  margin-bottom: 0;">说明:'+ reg.list[i].couponDesc +'</p>'+
    //                             '<p style="font-size: 1rem;  margin-bottom: 0; ">状态:'+ reg.list[i].rCouponStatus +'</p>'+
    //                         '</div>'+
    //                         '<div style="flex: 2; font-size: 4rem;">￥'+ reg.list[i].couponMoney +'</div>'+
    //                         '</li>';
    //                         // '<p style="height: 5%; margin-bottom: 0; text-align: center; border:1px solid black;" onclick=alert("设计中~~~~");>赠送</p>';
    //             };
    //         $(".list").html(str);
    //     };
    //     console.log("success");
    //     $(".mask_layer").remove();
    // })
    // .fail(function(res) {
    //     console.log(res);
    //     console.log("error");
    // })
    // .always(function() {
    //     console.log("complete");
    // });

};
//输入优惠卷码 领取
function exchange()
{
    var exchangeId = document.getElementById("exchangeId");
    if (exchangeId.value)
        {
            $.ajax({
                url: httpUpData + 'exchange_coupon',
                type: 'GET',
                dataType: 'json',
                data: {userId: us_userid,userToken:us_token,exchangeCode:exchangeId.value}
            })
            .done(function(reg) {

                if (reg.status == 1005)
                {
                    localStorage.clear();
                    alert(reg.msg);
                    window.location.href="../index.html";
                };

                $("body").append('<div class="mask_layer"></div>');

                alert(reg.statusCode.msg);

                console.log("success");
                $(".mask_layer").remove();
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("compvare");
            });

        }
    else
        {
            console.log("is null");
        };
};
//查看积分履历接口
function find_integral()   //pass
{
    $.ajax({
        url: httpUpData + 'find_integral',
        type: 'GET',
        dataType: 'json',
        data: {userId: us_userid,userToken:us_token,page:1,type:0}
    })
    .done(function(reg) {

        if (reg.status == 1005)
        {
            localStorage.clear();
            alert(reg.msg);
            window.location.href="../index.html";
        };

        $("body").append('<div class="mask_layer"></div>');

        var str = [];
        for(var i = 0; i < reg.list.length; i++)
            {
                var time = getDateTime(reg.list[i].integralTime).split(' ');

                if(reg.list[i].integralType == 1)
                    {
                        reg.list[i].integralType = "购买咖啡";
                        reg.list[i].integral = "+" + reg.list[i].integral;
                    }
                else if(reg.list[i].integralType == 2)
                    {
                        reg.list[i].integralType = "充值";
                        reg.list[i].integral = "+" + reg.list[i].integral;
                    }
                else if(reg.list[i].integralType == 3)
                    {
                        reg.list[i].integralType = "签到";
                        reg.list[i].integral = "+" + reg.list[i].integral;
                    }
                else
                    {
                        reg.list[i].integralType = "消费积分";
                        reg.list[i].integral = "-" + reg.list[i].integral;
                    };
                if(reg.list[i].integralLevel == 1){reg.list[i].integralLevel = "初级会员";}else if(reg.list[i].integralLevel == 2){reg.list[i].integralLevel = "中级会员";}else{reg.list[i].integralLevel = "高级会员";};


                str += '<li style="display: flex; height: 20%;margin:1% 2%;background:rgba(0,0,0,0.5);">'+
                        '<div style="flex:2 ;padding:2%;">'+
                            '<img src="'+ reg.list[i].integralPicurl +'" alt="" style="height: 80%; width:80%;">'+
                        '</div>'+
                        '<div style="flex:2.5;padding:2%;">'+
                        '<p><span>'+ reg.list[i].integralProduct +'</span></p>'+
                            '<p>'+ time[0] +'</p>'+
                        '</div>'+
                        '<div style="flex:4;padding:5% 2%; text-align: right;">'+
                        '<span>'+ reg.list[i].integralLevel +'</span><span>'+ reg.list[i].integral +'</span><br ><span>'+ reg.list[i].integralType +'</span>'+
                        '</div>'+
                    '</li>';
            };
            $(".list").append(str);
            $(".nav_list li").first().css({color:"red",borderBottom:"2px solid red"});
        console.log("success");
        $(".mask_layer").remove();
    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("compvare");
    });

};
//积分兑换
function integral_exchange_true(id,change_length)
{
    var chang_true = confirm("是否花费"+ change_length +"积分换取此优惠卷！");
    if (chang_true)
        {
            $.ajax({
                url: httpUpData + 'integral_exchange_true',
                type: 'GET',
                dataType: 'json',
                data: {userId: us_userid,userToken:us_token,shopId:id}
            })
            .done(function(reg) {

                if (reg.status == 1005)
                {
                    localStorage.clear();
                    alert(reg.msg);
                    window.location.href="../index.html";
                };

                $("body").append('<div class="mask_layer"></div>');

                alert(reg.statusCode.msg);

                console.log("success");
                $(".mask_layer").remove();
            })
            .fail(function(res) {
                console.log("error" + res);
            })
            .always(function() {
                console.log("compvare");
            });

        }
    else
        {
            console.log("not fileing");
        };
};
//兑换码
function find_c_redeem()
{
    redeem(1,"find_c_redeem");
};
//故障反馈
function add_fault_feedback()
{
    var machineNumber = document.getElementById("machineNumber");  //机器编号
    var faultContent = document.getElementById("faultContent");  //故障内容
    var faultPhone = document.getElementById("faultPhone");  //联系电话

    if (!machineNumber.value)
        {
            machineNumber.style.borderColor = "red";
            return false;
        };
    if (!faultContent.value)
        {
            faultContent.style.borderColor = "red";
            return false;
        };
    if (!faultPhone.value)
        {
            faultPhone.style.borderColor = "red";
            return false;
        };
        $.ajax({
            url: httpUpData + 'add_fault_feedback',
            type: 'GET',
            dataType: 'json',
            data: {machineNumber: machineNumber.value,faultContent:faultContent.value,faultPhone:faultPhone.value,userId: us_userid,userToken:us_token}
        })
        .done(function(reg) {

            if (reg.status == 1005)
            {
                localStorage.clear();
                alert(reg.msg);
                window.location.href="../index.html";
            };

            $("body").append('<div class="mask_layer"></div>');

            alert(reg.statusCode.msg);
            if (reg.statusCode.status == 1025)
                {
                    window.location.href = "../html/my.html";
                };
            console.log("success");
            $(".mask_layer").remove();
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("compvare");
        });

};
