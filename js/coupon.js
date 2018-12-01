$(function () {
    //1.一进入页面就开始渲染
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getcoupon",
        data: "",
        dataType: "json",
        success: function (info) {
            console.log(info);
            var htmlStr = template('discountTpl', info);
            $('.discount ul').html(htmlStr);
        }
    })
    //2.点击a标签页面实现跳转同时将对应的商品名存入本地文件
    $('.discount ul').on('click', 'a', function () {
        var dataName = $(this).parent().data('name');
        console.log(dataName);
        localStorage.setItem('productName', dataName);
    })
    //3.返回顶部
    $('.goback').click(function(){
        $('html').scrollTop(0);
    })
})