$(function(){
  jzm.paraMessage('find_unpaid_order');
  $("#wallet").css({color:"#fff"});
  if ($("#totalMoney").text() - $("#balance").text().split('￥')[1] > 0)
    {
      $("#wallet_img").attr({
        src: "../image/lb/pay/no_action.png"
      });
      $("#wxpay_img").attr({
        src: "../image/lb/pay/action.png"
      });
      $("#paymethod").val(1);
    }
  else
    {
      $("#wallet_img").attr({
        src: "../image/lb/pay/action.png"
      });
      $("#wxpay_img").attr({
        src: "../image/lb/pay/no_action.png"
      });
      $("#paymethod").val(0);
    };
  $("#wallet").click(function(event) {
    $("#paymethod").val(0);
    $(this).css({color:"#fff"});
    $("#wxpay").css({color:"#fff"});
    $("#wxpay_img").attr({
      src: "../image/lb/pay/no_action.png"
    });
    $("#wallet_img").attr({
      src: "../image/lb/pay/action.png"
    });
  });
  $("#wxpay").click(function(event) {
    $("#paymethod").val(1);
    $(this).css({color:"#fff"});
    $("#wallet").css({color:"#fff"});
    $("#wallet_img").attr({
      src: "../image/lb/pay/no_action.png"
    });
    $("#wxpay_img").attr({
      src: "../image/lb/pay/action.png"
    });
  });
  $("#volume").click(function(event) {
    if ($("#rCouponId").val() != "")
      {
        $(".conmoney").show(100);
        $("body").append('<div class="mask_layer"></div>');
      };
  });
  $("body").delegate('.conmoney li','click', function(event) {
      var voval = $(this).children('input').val();
      if(voval != ""){
          var str = voval.split(',');
          $("#rCouponId").val(str[0]);
          $("#couponId").val(str[1]);
          $("#couponMoney").val(str[2]);

          $("#consum").html("-￥"+ str[2] / 100 +'<img style="width:20%;margin-left:10.1%;" src="../image/lb/pay/right.png" alt="" /></span>');   //优惠金额
          $("#consumPay").text("-￥"+ str[2]);   //已优惠金额
          if ($("#consumMoney").val() - str[2] < 0)
            {
              $("#totalMoney").text(0);  //实际需支付金额
            }
          else
            {
              $("#totalMoney").text(($("#consumMoney").val() - str[2]) / 100);  //实际需支付金额
            };
        }else
        {
          $("#rCouponId").val(0);
          $("#couponId").val("");
          $("#couponMoney").val("");
          $("#consum").text("-￥0");   //优惠金额
          $("#consumPay").text("-￥0");   //已优惠金额
          $("#totalMoney").text($("#consumMoney").val() / 100);  //实际需支付金额
        }
      $(".conmoney").hide(100);
      $(".mask_layer").remove();

    });
    $("body").delegate('.mask_layer','click',function(e){
    	$(".conmoney").hide(100);
      $(".mask_layer").remove();
    })
})
