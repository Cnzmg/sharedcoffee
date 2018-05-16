
//给地图添加云麻点图层
function addCustomLayer(map,keyword,customLayer) {
    if (customLayer) {
        map.removeTileLayer(customLayer);
    }
    customLayer=new BMap.CustomLayer({
        geotableId: 182569,
        q: keyword, //检索关键字
        tags: "coffee", //空格分隔的多字符串
        filter: '' //过滤条件,参考http://developer.baidu.com/map/lbs-geosearch.htm#.search.nearby
    });
    map.addTileLayer(customLayer);
}

//百度地图的路线规划
function get_position(e){
    var address = 1;
    console.log(e);
    var lng = e.currentTarget.point.lng;
    var lat = e.currentTarget.point.lat;
    var obj = {lng1:lng, lat1:lat,add:address};
    localStorage.setItem("weizhi", JSON.stringify(obj));
    
    window.location.href = "http://www.cbcoffee.cn/sharedcoffee/html/quipment_address.html";
}
//根据检索范围设置缩放
function setZoom(points,map){
      var points = JSON.stringify(points);
        var points = JSON.parse(points);
      if(points.length>0){
        var maxLng = points[0].lng;
        var minLng = points[0].lng;
        var maxLat = points[0].lat;
        var minLat = points[0].lat;
        var res;
        for (var i = points.length - 1; i >= 0; i--) {
          res = points[i];
          if(res.lng > maxLng) maxLng = res.lng;
          if(res.lng < minLng) minLng = res.lng;
          if(res.lat > maxLat) maxLat = res.lat;
          if(res.lat < minLat) minLat = res.lat;
        };
        var cenLng =(parseFloat(maxLng)+parseFloat(minLng))/2;
        var cenLat = (parseFloat(maxLat)+parseFloat(minLat))/2;
        var zoom = getZoom(maxLng, minLng, maxLat, minLat,map);
        map.centerAndZoom(new BMap.Point(cenLng,cenLat), zoom);  
     } 
}

//获取缩放
function getZoom (maxLng, minLng, maxLat, minLat,map) {
      var zoom = ["50","100","200","500","1000","2000","5000","10000","20000","25000","50000","100000","200000","500000","1000000","2000000"]//级别18到3。
      var pointA = new BMap.Point(maxLng,maxLat);  // 创建点坐标A
      var pointB = new BMap.Point(minLng,minLat);  // 创建点坐标B
      var distance = map.getDistance(pointA,pointB).toFixed(1);  //获取两点距离,保留小数点后两位
      for (var i = 0,zoomLen = zoom.length; i < zoomLen; i++) {
        if(zoom[i] - distance > 0){
          return 18-i+3;//
        }
    }
}



