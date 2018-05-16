
/*---------------------------------------------------------/

                       ☀ 唐明明20151015 ☀

/---------------------------------------------------------*/



$(document).ready(function() {
    var time;

    // 点击redbutton按钮时执行以下全部
    $('.red-a').click(function(){
        // 在带有red样式的div中添加shake-chunk样式
        $('.redbutton').addClass('shake-chunk');
        // 点击按钮2000毫秒后执行以下操作
        time=setTimeout(function(){
            //跳转到free-te.hthml
              window.location.href='./free-tea.html'
        
            // 在带有red样式的div中删除shake-chunk样式
            $('.redbutton').removeClass('shake-chunk');

            clearTimeout(time)

        },2000);
    });
    
});








