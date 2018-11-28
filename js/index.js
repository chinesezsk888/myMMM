$(function () {
    //一进入页面就开始渲染:导航
    $.ajax({
        type: "get",
        //  127.0.0.1表示本地的IP地址
        url: "http://127.0.0.1:9090/api/getindexmenu",
        data: "",
        dataType: "json",
        success: function (info) {
            console.log(info);
            var htmlStr = template('navTpl', info);
            $('.mm_nav ul').html(htmlStr);
            // 实现最后四个导航的隐藏
            //nextAll()表示该元素的下面的所有的兄弟元素
            $('.more').nextAll().hide();
        }

    })
    //折扣商品渲染
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getmoneyctrl",
        data: "",
        dataType: "json",
        success: function (info) {
            console.log(info);
            var htmlStr = template('discountTpl', info);
            $('.mm_discount ul').html(htmlStr);
        }
    })
   
   
    //1.点击导航的更多，出现下面的导航
    $('.mm_nav').on('click','.more',function(){
        $('.more').nextAll().toggle();
    })
    //2.点击底部的返回按钮
    $('.goback').click(function(){
    $('html').scrollTop(0);
    
    })
})