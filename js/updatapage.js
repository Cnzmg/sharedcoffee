;function drpage(page,url,type)
{
    //page 请求的页数
    //url 请求的地址
    //type 请求的--选中的状态 1待付款 2未兑换 3已兑换 全部则为0

    $(".centent div").remove();
    $(".list li").remove();

    var actionPage = [];  //定位点击tab
    var paymentStatusId = []; //未支付状态
    var StatePage = [];  //集合发送请求包
    if (!page) 
        {
            page = 1;
            actionPage = 0;
            //动态包
            StatePage += "?userId="+ us_userid + "&userToken="+ us_token;
        }
    else{
            actionPage = page;

            //动态包
            StatePage += "?userId="+ us_userid + "&userToken="+ us_token;
        };

    var itemIndex = page;
    var LoadEnd = false;

    //我的订单  待付款
     

    // dropload
    var dropload = $('.centent').dropload({
        scrollArea : window,
        domUp : {
            domClass   : 'dropload-up',
            domRefresh : '<div class="dropload-refresh">↓下拉刷新</div>',
            domUpdate  : '<div class="dropload-update">↑释放更新</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
        },
        domDown : {
            domClass   : 'dropload-down',
            domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
            domNoData  : '<div class="dropload-noData">暂无更多数据~~~</div>'
        },
        loadUpFn : function(me){
            //延迟1秒加载
            setTimeout(function(){
                // 重置
                me.resetload();
                // 解锁
                me.unlock();
                me.noData(false);
                
            },1000);
        },
        loadDownFn : function(me){
            $.ajax({
                url: httpUpData + url + StatePage + "&page=" + page +"&type=" + type,  //请求域名、请求地址、请求参数、页面单独给
                type: 'GET',
                dataType: 'json',
                success: function(reg){
                    me.lock('up');
                    var result = [];
                    var Li = [];
                    var color = [];
                    var code = [];
                    page++;
                    if(reg.myOrderList.length > 0){
                        for(var i = 0; i < reg.myOrderList.length; i++){

                            $("body").append('<div class="mask_layer"></div>');

                            if (type == 0 || type == 1) 
                                {
                                    if(reg.myOrderList[i].paymentStatus == 1)
                                    {
                                        reg.myOrderList[i].paymentStatus =  '待付款';
                                        color = "#fff100";
                                        code = "no_action";
                                    }
                                    else if(reg.myOrderList[i].paymentStatus == 2)
                                    {
                                        if (reg.myOrderList[i].redeemStatus == 2) 
                                            {
                                                reg.myOrderList[i].paymentStatus =  '已兑换';
                                                color = "#828282";
                                            }
                                        else if(reg.myOrderList[i].redeemStatus == 3)
                                            {
                                                reg.myOrderList[i].paymentStatus =  '制作中';
                                                color = "#9f0802";
                                            }
                                        else if(reg.myOrderList[i].redeemStatus == 4)
                                            {
                                                reg.myOrderList[i].paymentStatus =  '已过期';
                                                color = "#9f0802";
                                            }
                                        else{
                                                reg.myOrderList[i].paymentStatus =  '未兑换';
                                                color = "#9f0802";
                                            };
                                        
                                        code = "action";
                                    }
                                    else if(reg.myOrderList[i].paymentStatus == 3)
                                    {
                                        reg.myOrderList[i].paymentStatus =  '已退款';
                                        color = "#8c8c8c";
                                        code = "no_action";
                                    }
                                    else
                                    {
                                        reg.myOrderList[i].paymentStatus =  '已取消';
                                        color = "#8c8c8c";
                                        code = "no_action";
                                    }
                                }
                            else
                                {
                                    if(reg.myOrderList[i].redeemStatus == 0)
                                    {
                                        reg.myOrderList[i].paymentStatus =  '未激活';
                                        color = "#8c8c8c";
                                        code = "no_action";
                                    }
                                else if(reg.myOrderList[i].redeemStatus == 1)
                                    {
                                        reg.myOrderList[i].paymentStatus =  '未兑换';
                                        color = "#9f0802";
                                        code = "action";
                                    }
                                else if(reg.myOrderList[i].redeemStatus == 2)
                                    {
                                        reg.myOrderList[i].paymentStatus =  '已兑换';
                                        color = "#828282";
                                        code = "no_action";
                                    }
                                else
                                    {
                                        reg.myOrderList[i].paymentStatus =  '已兑换';
                                        color = "#828282";
                                        code = "no_action";
                                    };

                                }
                            

                            var str = reg.myOrderList[i].flavorShow;

                            Li += '<li class="num_first"onclick=find_order_detail("'+ reg.myOrderList[i].orderId +'");return false style="background:rgba(0,0,0,0.5);position:relative;"><div style="flex: 1;max-height:100px;overflow:hidden;"><a href="javascript:void(0);" style="height:100%; display:inline-block;"><img ismap src="'+ reg.myOrderList[i].productPicurl +'" alt="" style="width: 80%;"></a><a></a></div><div class="message" style="margin-left:-20px;color:#8c8c8c;"><p class="wait_pay" style="float:right;color:'+ color +';">'+ reg.myOrderList[i].paymentStatus +'</p><p style="font-size:1.4rem;color:#fff;">'+ reg.myOrderList[i].productName.split(',')[0] +'</p><div style="width:100%;">';
                            for(var key in str)
                                {
                                Li += '<p style="font-size:1rem;"><span style="flex: 1; text-align: left;">'+ key.split(',')[0] +'</span><span style="flex: 2;float:right;">'+ str[key] +'</span></p>';
                                }
                                Li += '<p style="font-size:1rem;"><span style="flex: 1; text-align: right;">金额</span><span style="flex: 2;float:right;">￥'+ reg.myOrderList[i].paymentMoney / 100 +'</span></p>';
                                if(code == "action")
                                    {
                                        Li += '<p style="font-size:1rem;"><span style="flex: 1; text-align: right;">兑换码</span><span style="flex: 2;float:right;font-size:1.6rem;">'+ reg.myOrderList[i].redeemCode +'</span></p>';
                                    };

                                Li += '</div>';

                            if (reg.myOrderList[i].paymentStatus == '待付款') {
                                Li += '</div><a href="order_pay.html?orderId='+ reg.myOrderList[i].orderId +'" style="background-color: #fff100; color: #000; font-size:1rem; padding:1% 2%; position: absolute; right: 2%; bottom: 10%; border-radius:10px;">立即支付</a></li>';
                            };
                        };
                        console.log("success");
                        $(".mask_layer").remove();
                    }else
                    {
                        // 锁定
                        me.lock();
                        // 无数据
                        me.noData();
                    };
                    $(".nav_list li").css({color:"#fff",borderBottom:"0"});
                    $(".nav_list li").eq(type).css({color:"#fff100",borderBottom:"2px solid #fff100"});
                    // 延迟1秒加载
                    setTimeout(function(){
                        // 插入数据到页面
                        $(".list").append(Li);
                        // 每次数据插入，必须重置
                        me.resetload();
                    },1000);

                },
                error: function(xhr, type){
                    console.log('error!' + type + xhr);
                    var time = 0;
                    if(time == 6)
                        {
                            // 锁定
                            me.lock();
                            // 无数据
                            me.noData();
                            clearTimeout(timer());
                        }
                    else
                        {
                            // 延迟6秒加载
                            setTimeout(function timer(){
                               // 即使加载出错，也得重置
                                me.resetload();
                                time = time + 1;

                            },6000);
                        };
                }
            });
        }
    });
};
function find_integral(page,url,type)
{
    //page 请求的页数
    //url 请求的地址
    //type 请求的--选中的状态 1待付款 2未兑换 3已兑换 全部则为0

    $(".centent div").remove();
    $(".list li").remove();

    var actionPage = [];  //定位点击tab

    var itemIndex = page;
    var LoadEnd = false;

    //我的订单  待付款
     

    // dropload
    var dropload = $('.centent').dropload({
        scrollArea : window,
        domUp : {
            domClass   : 'dropload-up',
            domRefresh : '<div class="dropload-refresh">↓下拉刷新</div>',
            domUpdate  : '<div class="dropload-update">↑释放更新</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
        },
        domDown : {
            domClass   : 'dropload-down',
            domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
            domNoData  : '<div class="dropload-noData">暂无更多数据~~~</div>'
        },
        loadUpFn : function(me){
            //延迟1秒加载
            setTimeout(function(){
                // 重置
                me.resetload();
                // 解锁
                me.unlock();
                me.noData(false);
                
            },1000);
        },
        loadDownFn : function(me){
            $.ajax({
                url: httpUpData + url + "?userId="+ us_userid + "&userToken="+ us_token + "&page=" + page +"&type=" + type,  //请求域名、请求地址、请求参数、页面单独给
                type: 'GET',
                dataType: 'json',
                success: function(reg){
                    me.lock('up');
                    var result = [];
                    var str = [];    
                    page++;
                    if(reg.list.length > 0){
                        $("body").append('<div class="mask_layer"></div>');
 
                            for(var i = 0; i < reg.list.length; i++)
                                {
                                    var time = getDateTime(reg.list[i].integralTime).split(' ');

                                    if(reg.list[i].integralType == 1)
                                        {
                                            reg.list[i].integralType = "购买咖啡";
                                            reg.list[i].integral = "+" + reg.list[i].integral / 100;
                                        }
                                    else if(reg.list[i].integralType == 2)
                                        {
                                            reg.list[i].integralType = "充值";
                                            reg.list[i].integral = "+" + reg.list[i].integral / 100;
                                        }
                                    else if(reg.list[i].integralType == 3)
                                        {
                                            reg.list[i].integralType = "签到";
                                            reg.list[i].integral = "+" + reg.list[i].integral / 100;
                                        }
                                    else if(reg.list[i].integralType == 4)
                                        {
                                            reg.list[i].integralType = "兑换码";
                                            reg.list[i].integral = "-" + reg.list[i].integral / 100;
                                        }
                                    else
                                        {
                                            reg.list[i].integralType = "消费积分";
                                            reg.list[i].integral = "-" + reg.list[i].integral / 100;
                                        };
                                    if(reg.list[i].integralLevel == 1){reg.list[i].integralLevel = "初级会员";}else if(reg.list[i].integralLevel == 2){reg.list[i].integralLevel = "中级会员";}else{reg.list[i].integralLevel = "高级会员";};
                                    
                                    str += '<li style="display: flex; max-height:80px;overflow:hidden; margin:1% 2%;background:rgba(0,0,0,0.5);color:#828282;">'+
                                            '<div style="flex:3 ;padding:2%;position:relative; line-height:60px;">';
                                    if (reg.list[i].integralType == "消费积分") 
                                        {
                                            str += '<span style="position:absolute;left:35%;top:17%;color:#fff100;">￥'+ reg.list[i].integralProduct.split('￥')[1] +'</span>';
                                        };
                                    str +=  '<img src="'+ reg.list[i].integralPicurl +'" alt="" style="width:100%;">'+
                                            '</div>'+
                                            '<div style="flex:2;padding:3% 2%;">'+
                                            '<p style="margin:0;"><span style="color:#fff;">'+ reg.list[i].integralProduct.split('￥')[0] +'</span></p>';
                                    if(reg.list[i].integralProduct.split('￥')[1])
                                        {
                                           str += '<p style="margin:0;"><span>￥'+ reg.list[i].integralProduct.split('￥')[1] +'</span></p>';
                                        };

                                    str += '<p style="margin:0;">'+ time[0] +'</p>'+
                                            '</div>'+
                                            '<div style="flex:4;padding:5% 2%; text-align: right;">'+
                                            '<span>'+ reg.list[i].integralLevel +'</span><span style="color:#fff;margin-left:10%;">'+ reg.list[i].integral +'</span>'+
                                            // <br ><span style="margin-top:3px;">'+ reg.list[i].integralType +'</span>
                                            '</div>'+
                                        '</li>';
                                };
                            console.log("success");
                            $(".mask_layer").remove();
                    }else
                    {
                        // 锁定
                        me.lock();
                        // 无数据
                        me.noData();
                    };
                    $(".nav_list li").css({color:"#fff",borderBottom:"0"});
                    $(".nav_list li").eq(type).css({color:"#fff100",borderBottom:"2px solid #fff100"});
                    // 延迟1秒加载
                    setTimeout(function(){
                        // 插入数据到页面
                        $(".list").append(str);
                        // 每次数据插入，必须重置
                        me.resetload();
                    },1000);

                },
                error: function(xhr, type){
                    console.log('error!' + type + xhr);
                    var time = 0;
                    if(time == 6)
                        {
                            // 锁定
                            me.lock();
                            // 无数据
                            me.noData();
                            clearTimeout(timer());
                        }
                    else
                        {
                            // 延迟6秒加载
                            setTimeout(function timer(){
                               // 即使加载出错，也得重置
                                me.resetload();
                                time = time + 1;

                            },6000);
                        };
                }
            });
        }
    });
};
function find_integral_shop(page,url,shopType)
{
    //page 请求的页数
    //url 请求的地址
    //type 请求的--选中的状态 1待付款 2未兑换 3已兑换 全部则为0

    $(".centent div").remove();
    $(".list li").remove();

    var actionPage = [];  //定位点击tab

    var itemIndex = page;
    var LoadEnd = false;

    //我的订单  待付款
    if (!shopType) {shopType = ""};

    // dropload
    var dropload = $('.centent').dropload({
        scrollArea : window,
        domUp : {
            domClass   : 'dropload-up',
            domRefresh : '<div class="dropload-refresh">↓下拉刷新</div>',
            domUpdate  : '<div class="dropload-update">↑释放更新</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
        },
        domDown : {
            domClass   : 'dropload-down',
            domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
            domNoData  : '<div class="dropload-noData">暂无更多数据~~~</div>'
        },
        loadUpFn : function(me){
            //延迟1秒加载
            setTimeout(function(){
                // 重置
                me.resetload();
                // 解锁
                me.unlock();
                me.noData(false);
                
            },1000);
        },
        loadDownFn : function(me){
            $.ajax({
                url: httpUpData + url + "?userId="+ us_userid + "&userToken="+ us_token + "&page=" + page +"&shopType=" + shopType,  //请求域名、请求地址、请求参数、页面单独给
                type: 'GET',
                dataType: 'json',
                success: function(reg){
                    me.lock('up');
                    var result = [];
                    var str = [];
                    var juan = [];
                    page++;
                    if(reg.list.length > 0){
                        $("body").append('<div class="mask_layer"></div>');
 
                            for(var i = 0; i < reg.list.length; i++)
                                {
                                    if(reg.list[i].shopType == 1)
                                        {
                                            reg.list[i].shopType = "免费";
                                        }
                                    else
                                        {
                                            reg.list[i].shopType = "<p style='font-size:2.4rem;margin:0;'>￥"+reg.list[i].couponMoney / 100+"</p><p style='font-size:1.2rem;'>优惠</p>" ;
                                            juan = "￥" + reg.list[i].couponMoney / 100;
                                        };

                                str += '<li style="display: flex; height:15%;margin:1% 2%;background:rgba(0,0,0,0.5);padding:3%;" onclick=integral_exchange_true('+ parseInt(reg.list[i].shopId) +','+ reg.list[i].shopIntegral / 100 +')>'+
                                            '<div style="flex: 3;margin-right:10px; line-height: 84px;position:relative;"><img src="'+ reg.list[i].shopUrl +'" alt="" style="width: 100%;"></div>'+
                                            '<div style="flex: 4;margin-top:10px;">'+
                                                '<p style="font-size: 1rem;  margin-bottom: 4%;">'+ reg.list[i].shopName +'</p>'+
                                                '<p style="font-size: 1rem;  margin-bottom: 4%;">说明:'+ reg.list[i].shopDesc +'</p>'+
                                                '<p style="font-size: 1rem; color:#828282;">'+ reg.list[i].shopIntegral / 100 +'积分即可换取</p>'+
                                            '</div>'+
                                            '<div style="flex: 2;font-size:1.8rem; text-align:center; padding-top:6%;">'+ reg.list[i].shopType +'</div>'+     
                                        '</li>';
                                };
                            console.log("success");
                            $(".mask_layer").remove();
                    }else
                    {
                        // 锁定
                        me.lock();
                        // 无数据
                        me.noData();
                    };
                    $(".nav_list li").css({color:"#fff",borderBottom:"0"});
                    $(".nav_list li").eq(shopType).css({color:"#fff100",borderBottom:"2px solid #fff100"});
                    // 延迟1秒加载
                    setTimeout(function(){
                        // 插入数据到页面
                         $("#integral").text("当前积分余额：" + reg.integral / 100);
                        $(".list").append(str);
                        // 每次数据插入，必须重置
                        me.resetload();
                    },1000);

                },
                error: function(xhr, shopType){
                    console.log('error!' + shopType + xhr);
                    var time = 0;
                    if(time == 6)
                        {
                            // 锁定
                            me.lock();
                            // 无数据
                            me.noData();
                            clearTimeout(timer());
                        }
                    else
                        {
                            // 延迟6秒加载
                            setTimeout(function timer(){
                               // 即使加载出错，也得重置
                                me.resetload();
                                time = time + 1;

                            },6000);
                        };
                }
            });
        }
    });
};
//我的兑换码
function redeem(page,url)
{
    $.ajax({
        url: httpUpData + url + "?userId="+ us_userid + "&userToken="+ us_token + "&page=" + page,  //请求域名、请求地址、请求参数、页面单独给
        type: 'GET',
        dataType: 'json',
        success: function(reg){
            var result = [];
            var str = [];
            if(reg.list.length > 0){
                if (reg.status == 1005) 
                    {
                        localStorage.clear();
                        alert(reg.msg);
                        window.location.href="http://www.cbcoffee.cn/sharedcoffee/index.html";
                    };

                $("body").append('<div class="mask_layer"></div>');

                var str = [];
                for(var i = 0; i < reg.list.length; i++)
                    {
                        var cod = "";
                        for(var key in reg.list[i].cCode)
                            {
                                if(key == 3 || key == 7)
                                    {
                                        cod += reg.list[i].cCode[key] + " ";
                                    }
                                else
                                    {
                                        cod += reg.list[i].cCode[key];
                                    };
                            };
                        str += '<li style="display: flex;margin-top:1%;background:rgba(0,0,0,0.5);padding:2%;"><div style="flex: 3;max-height:80px;overflow:hidden;"><img src="'+ reg.list[i].cUrl +'" alt="" style="width: 80%;"></div><div style="flex: 4;padding-top:6px;color:#bbbbbb;margin-left:-10px;"><p style="font-size: 1.4rem;  margin-bottom: 4%;color:#fff">'+ reg.list[i].cName +'</p><p style="font-size: 1rem;margin-bottom:6px; ">有效期至:'+ getDateTime(reg.list[i].expiryDate).split(' ')[0] +'</p><p style="font-size: 1.6rem;margin-bottom:6px; ">兑换码：'+ cod +'</p></div></li>';
                    };
                $(".list").append(str);
                $(".mask_layer").remove();
            }
           

        },
        
    });
};
//我的优惠卷
function coupon(page,url)
{
    //page 请求的页数
    //url 请求的地址
    //type 请求的--选中的状态 1待付款 2未兑换 3已兑换 全部则为0

    $(".centent div").remove();
    $(".list li").remove();

    var actionPage = [];  //定位点击tab

    var itemIndex = page;
    var LoadEnd = false;

    // dropload
    var dropload = $('.centent').dropload({
        scrollArea : window,
        domUp : {
            domClass   : 'dropload-up',
            domRefresh : '<div class="dropload-refresh">↓下拉刷新</div>',
            domUpdate  : '<div class="dropload-update">↑释放更新</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
        },
        domDown : {
            domClass   : 'dropload-down',
            domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
            domNoData  : '<div class="dropload-noData"></div>'
        },
        loadUpFn : function(me){
            //延迟1秒加载
            setTimeout(function(){
                // 重置
                me.resetload();
                // 解锁
                me.unlock();
                me.noData(false);
                
            },1000);
        },
        loadDownFn : function(me){
            $.ajax({
                url: httpUpData + url + "?userId="+ us_userid + "&userToken="+ us_token + "&page=" + page,  //请求域名、请求地址、请求参数、页面单独给
                type: 'GET',
                dataType: 'json',
                async:false,
                success: function(reg){
                    me.lock('up');
                    var result = [];
                    var str = [];    
                    page++;
                    if(reg.list.length > 0){
                        if (reg.status == 1005) 
                            {
                                localStorage.clear();
                                alert(reg.msg);
                                window.location.href="http://www.cbcoffee.cn/sharedcoffee/index.html";
                            };

                        $("body").append('<div class="mask_layer"></div>');

                        var str = [];
                        for(var i = 0; i < reg.list.length; i++)
                            {
                                if(reg.list[i].rCouponStatus == 1)
                                    {
                                        reg.list[i].rCouponStatus = "未使用";
                                    }
                                else if(reg.list[i].rCouponStatus == 2)
                                    {
                                        reg.list[i].rCouponStatus = "已使用";
                                    }
                                else
                                    {
                                        reg.list[i].rCouponStatus = "已过期";
                                    };
                                str += '<li style="display: flex; margin-top:1%;color:#828282;background:rgba(0,0,0,0.5);padding:2% 2% 4% 2%;position:relative;">'+
                                        '<div style="flex: 3;position:relative;line-height:84px;"><img src="'+ reg.list[i].couponUrl +'" alt="" style="height: auto; width: 100%;"></div>'+
                                        '<div style="flex: 4;margin-left:10px;">'+
                                            '<p style="font-size: 1.4rem;  margin-bottom: 1%;color:#fff;">'+ reg.list[i].couponName +'</p>'+
                                            '<p style="font-size: 1rem;  margin-bottom: 0;">有效期至:'+ getDateTime(reg.list[i].rCouponExpiryDate).split(' ')[0] +'</p>'+
                                            '<p style="font-size: 1rem;  margin-bottom: 0;">使用说明:'+ reg.list[i].couponDesc +'</p>'+
                                            '<p style="font-size: 1rem;  margin-bottom: 0; ">状态:'+ reg.list[i].rCouponStatus +'</p>'+
                                        '</div>'+
                                        '<div style="flex: 2; font-size: 4rem; font-weight: bold; color:#fff; text-align:right;letter-spacing:1px;word-spacing:1px;"><span style="margin-right:-8px;">￥</span><span>'+ reg.list[i].couponMoney / 100 +'</span></div>'+
                                        '<a href="../html/shard.html?rCouponIds='+ reg.list[i].rCouponId +'" style="display:inline-block;position:absolute;bottom:4px;left:35%;height:auto;overflow:hidden;color:#fff100;font-size:1rem;">此优惠券可与好友分享，点击赠送→</a></li>';
                                        
                            };
                        
                        console.log("success");

                        $(".mask_layer").remove();
                    }else
                    {
                        // 锁定
                        me.lock();
                        // 无数据
                        me.noData();
                    };
                    // 延迟1秒加载
                    setTimeout(function(){
                        // 插入数据到页面
                         $(".list").append(str);
                        // 每次数据插入，必须重置
                        me.resetload();
                    },1000);

                },
                error: function(xhr, shopType){
                    console.log('error!' + shopType + xhr);
                    var time = 0;
                    if(time == 6)
                        {
                            // 锁定
                            me.lock();
                            // 无数据
                            me.noData();
                            clearTimeout(timer());
                        }
                    else
                        {
                            // 延迟6秒加载
                            setTimeout(function timer(){
                               // 即使加载出错，也得重置
                                me.resetload();
                                time = time + 1;

                            },6000);
                        };
                }
            });
        }
    });
};