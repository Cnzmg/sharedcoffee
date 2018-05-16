$(function(){
  jzm.paraMessage('find_product_detail');
  $.fn.RangeSlider = function(cfg){
  this.sliderCfg = {
      min: cfg && !isNaN(parseFloat(cfg.min)) ? Number(cfg.min) : null,
      max: cfg && !isNaN(parseFloat(cfg.max)) ? Number(cfg.max) : null,
      step: cfg && Number(cfg.step) ? cfg.step : 1,
      callback: cfg && cfg.callback ? cfg.callback : null
  };
  var $input = $(this);
  var min = this.sliderCfg.min;
  var max = this.sliderCfg.max;
  var step = this.sliderCfg.step;
  var callback = this.sliderCfg.callback;
  $input.attr('min', min)
      .attr('max', max)
      .attr('step', step);

  $input.bind("input", function(e){
      $input.attr('value', this.value);
      $input.css( 'background-size', this.value + '% 100%' );

      if ($.isFunction(callback)) {
          callback(this);
      }
  });
};
var change = function($input) {}
var inp = $(".range");
for(var i = 0; i < inp.length; i++)
  {
      var _sur = $("._sugar").val().split(',');
      if (_sur[0] == "咖啡浓度" || _sur[0] == "茶浓度")
          {
              $(inp[i]).RangeSlider({ min: 10,   max: 100,  step: 0.1,  callback: change});
          }
      else
          {
              $(inp[i]).RangeSlider({ min: 0,   max: 100,  step: 0.1,  callback: change});
          };
  };
$("body").delegate(".hot","click", function() {
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
            $(".cold").children('img').attr({
                "src":"../image/lb/taste/cold.png"
            });

            $(".hot").children('img').attr({
                "src":"../image/lb/taste/hot_action.png"
            });
            $("#ducHcold").val(2);
        };

});
$("body").delegate(".cold","click", function() {
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
            $(".cold").children('img').attr({
                "src":"../image/lb/taste/cold.png"
            });

            $(".hot").children('img').attr({
                "src":"../image/lb/taste/hot_action.png"
            });
            $("#ducHcold").val(2);
        };
});
});
