$(function () {
    //1.一进入页面就渲染
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getbaicaijiatitle",
        data: "",
        dataType: "json",
        success: function (info) {
            console.log(info);
            var htmlStr = template('bcjTpl', info);
            $('.left ul').html(htmlStr);
            //记录ul的宽
            var ulWidth=0;
    
            $('.left ul li').each(function (index, li) {
                var liWidth = $(li).width();
                // console.log(liWidth);
                ulWidth+=liWidth;
            })
             console.log(ulWidth);
             //1.实现ul宽度的更新
             $('.left ul').width(ulWidth);
             //2.实现区域滚动
            new IScroll('.mm_roll .left', {
                    scrollX: true,
                    scrollY: false,
                });
            //3.给第一个li添加类
            $('.mm_roll li:eq(0)').find('a').addClass('current');

        }
       

    })
     //4.点击任何一个li下边框出现（默认第一个有）
     $('.mm_roll').on('click','li',function(){
        //  $(this).find('a').addClass('current').siblings().find('a').removeClass('current');
        $('.mm_roll li').find('a').removeClass('current');
        $(this).find('a').addClass('current');
     })







    

    


})