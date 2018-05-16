function progres(){
        /*拖动事件*/
        var cont= $("#page0");    
        var contW=$("#page0").width();        //拖动跳的宽度
        var startX,sX,sY,moveX,moveY, disX, disY; //初始化
        var winW=$(".progr0").width() + contW;    //加上去拖动条的宽度
        cont.on({//绑定事件
            touchstart:function(e){
                startX = e.originalEvent.targetTouches[0].pageX+ e.originalEvent.targetTouches[0].pageX;    //获取点击点的X坐标
                console.log(startX); 
                sX=$(this).offset().left;//相对于当前窗口X轴的偏移量
                leftX=startX-sX;//鼠标所能移动的最左端是当前鼠标距div左边距的位置
                rightX=winW-contW+leftX;//鼠标所能移动的最右端是当前窗口距离减去鼠标距div最右端位置
                },
            touchmove:function(e){  //拖动事件
                e.preventDefault();
                moveX=e.originalEvent.targetTouches[0].pageX;//移动过程中X轴的坐标
                if(moveX<leftX){moveX=leftX;}
                if(moveX>rightX){moveX=rightX;}
                $(this).css({
                    "left":moveX+sX-startX
                });
                $(".progr0").children('div').css({"width":moveX+sX-startX,background:"gold"});
               // $("#page0").prev().children().css({width:moveX+sX-startX});
                //console.log(moveX);
                //$("#page0").prev().children().text(2 + parseInt(parseInt(moveX) / parseInt(winW) * 100) + "%");

                $("#ANum0").val(parseInt(parseInt(moveX) / parseInt(winW) * 100));
                    
                //console.log("win=" + parseInt(winW / moveX));

            },
            mousedown: function(ev){
                var patch = parseInt($(this).css("height"))/2;
                //console.log(patch);
                $(this).mousemove(function(ev){
                    var oEvent = ev || event;
                    //console.log(oEvent.target);
                    var oX = oEvent.clientX;
                    var t = oY - patch;
                    var l = oX - patch;
                    var w = $(window).width() - $(this).width();
                    if(t<0){t = 0}
                    if(l<0){l=0}
                    if(t>h){t=h}
                    if(l>w){l=w}
                    $(this).css({top:t,left:l})
                });
                $(this).mouseup(function(){
                    $(this).unbind('mousemove');
                });
            }
        });

};
function progres1(){
        /*拖动事件*/
        var cont= $("#page1");    
        var contW=$("#page1").width();        //拖动跳的宽度
        var startX,sX,sY,moveX,moveY, disX, disY; //初始化
        var winW=$(".progr1").width() + contW;    //加上去拖动条的宽度
        cont.on({//绑定事件
            touchstart:function(e){
                startX = e.originalEvent.targetTouches[0].pageX + e.originalEvent.targetTouches[0].pageX;    //获取点击点的X坐标
                console.log(startX); 
                sX=$(this).offset().left;//相对于当前窗口X轴的偏移量
                leftX=startX-sX;//鼠标所能移动的最左端是当前鼠标距div左边距的位置
                rightX=winW-contW+leftX;//鼠标所能移动的最右端是当前窗口距离减去鼠标距div最右端位置
                },
            touchmove:function(e){  //拖动事件
                e.preventDefault();
                moveX=e.originalEvent.targetTouches[0].pageX;//移动过程中X轴的坐标
                if(moveX<leftX){moveX=leftX;}
                if(moveX>rightX){moveX=rightX;}
                $(this).css({
                    "left":moveX+sX-startX          
                });
                $(".progr1").children('div').css({"width":moveX+sX-startX,background:"gold"});
               // $("#page1").prev().children().css({width:moveX+sX-startX});
                //console.log(moveX);
                //$("#page1").prev().children().text(2 + parseInt(parseInt(moveX) / parseInt(winW) * 111) + "%");

                $("#ANum1").val(parseInt(parseInt(moveX) / parseInt(winW) * 100));
                    

                

                //console.log("win=" + parseInt(winW / moveX));

            },
            mousedown: function(ev){
                var patch = parseInt($(this).css("height"))/2;
                //console.log(patch);
                $(this).mousemove(function(ev){
                    var oEvent = ev || event;
                    //console.log(oEvent.target);
                    var oX = oEvent.clientX;
                    var t = oY - patch;
                    var l = oX - patch;
                    var w = $(window).width() - $(this).width();
                    if(t<0){t = 0}
                    if(l<0){l=0}
                    if(t>h){t=h}
                    if(l>w){l=w}
                    $(this).css({top:t,left:l})
                });
                $(this).mouseup(function(){
                    $(this).unbind('mousemove');
                });
            }
        });

};


function progres2(){
        /*拖动事件*/
        var cont= $("#page2");    
        var contW=$("#page2").width();        //拖动跳的宽度
        var startX,sX,sY,moveX,moveY, disX, disY; //初始化
        var winW=$(".progr2").width() + contW;    //加上去拖动条的宽度
        cont.on({//绑定事件
            touchstart:function(e){
                startX = e.originalEvent.targetTouches[0].pageX + e.originalEvent.targetTouches[0].pageX;    //获取点击点的X坐标
                console.log(startX); 
                sX=$(this).offset().left;//相对于当前窗口X轴的偏移量
                leftX=startX-sX;//鼠标所能移动的最左端是当前鼠标距div左边距的位置
                rightX=winW-contW+leftX;//鼠标所能移动的最右端是当前窗口距离减去鼠标距div最右端位置
                },
            touchmove:function(e){  //拖动事件
                e.preventDefault();
                moveX=e.originalEvent.targetTouches[0].pageX;//移动过程中X轴的坐标
                if(moveX<leftX){moveX=leftX;}
                if(moveX>rightX){moveX=rightX;}
                $(this).css({
                    "left":moveX+sX-startX          
                });
                $(".progr2").children('div').css({"width":moveX+sX-startX,background:"gold"});
               // $("#page2").prev().children().css({width:moveX+sX-startX});
                //console.log(moveX);
                //$("#page2").prev().children().text(2 + parseInt(parseInt(moveX) / parseInt(winW) * 122) + "%");

                $("#ANum2").val(parseInt(parseInt(moveX) / parseInt(winW) * 100));
                    

                

                //console.log("win=" + parseInt(winW / moveX));

            },
            mousedown: function(ev){
                var patch = parseInt($(this).css("height"))/2;
                //console.log(patch);
                $(this).mousemove(function(ev){
                    var oEvent = ev || event;
                    //console.log(oEvent.target);
                    var oX = oEvent.clientX;
                    var t = oY - patch;
                    var l = oX - patch;
                    var w = $(window).width() - $(this).width();
                    if(t<0){t = 0}
                    if(l<0){l=0}
                    if(t>h){t=h}
                    if(l>w){l=w}
                    $(this).css({top:t,left:l})
                });
                $(this).mouseup(function(){
                    $(this).unbind('mousemove');
                });
            }
        });

};

function progres3(){
        /*拖动事件*/
        var cont= $("#page3");    
        var contW=$("#page3").width();        //拖动跳的宽度
        var startX,sX,sY,moveX,moveY, disX, disY; //初始化
        var winW=$(".progr3").width() + contW;    //加上去拖动条的宽度
        cont.on({//绑定事件
            touchstart:function(e){
                startX = e.originalEvent.targetTouches[0].pageX + e.originalEvent.targetTouches[0].pageX;    //获取点击点的X坐标
                console.log(startX); 
                sX=$(this).offset().left;//相对于当前窗口X轴的偏移量
                leftX=startX-sX;//鼠标所能移动的最左端是当前鼠标距div左边距的位置
                rightX=winW-contW+leftX;//鼠标所能移动的最右端是当前窗口距离减去鼠标距div最右端位置
                },
            touchmove:function(e){  //拖动事件
                e.preventDefault();
                moveX=e.originalEvent.targetTouches[0].pageX;//移动过程中X轴的坐标
                if(moveX<leftX){moveX=leftX;}
                if(moveX>rightX){moveX=rightX;}
                $(this).css({
                    "left":moveX+sX-startX          
                });
                $(".progr3").children('div').css({"width":moveX+sX-startX,background:"gold"});
               // $("#page3").prev().children().css({width:moveX+sX-startX});
                //console.log(moveX);
                //$("#page3").prev().children().text(2 + parseInt(parseInt(moveX) / parseInt(winW) * 133) + "%");

                $("#ANum3").val(parseInt(parseInt(moveX) / parseInt(winW) * 100));
                    

                

                //console.log("win=" + parseInt(winW / moveX));

            },
            mousedown: function(ev){
                var patch = parseInt($(this).css("height"))/2;
                //console.log(patch);
                $(this).mousemove(function(ev){
                    var oEvent = ev || event;
                    //console.log(oEvent.target);
                    var oX = oEvent.clientX;
                    var t = oY - patch;
                    var l = oX - patch;
                    var w = $(window).width() - $(this).width();
                    if(t<0){t = 0}
                    if(l<0){l=0}
                    if(t>h){t=h}
                    if(l>w){l=w}
                    $(this).css({top:t,left:l})
                });
                $(this).mouseup(function(){
                    $(this).unbind('mousemove');
                });
            }
        });

};



