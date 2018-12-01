$(function(){
    //功能1：一进入页面就开始渲染
    //由于需要传入参数，所以要从地址栏中获取
    //1.1获取地址并进行转译
    var add = decodeURI(location.search);
    //截取slice
    add=add.slice(1);
    //切割split：将字符串转成数组
    var arrAdd=add.split('&');
    var obj=[];
    arrAdd.forEach(function(v,i){
    var key=v.split('=')[0];
    var value=v.split('=')[1];
    obj[key]=value;
    })
    // console.log(obj);
    var conponId=obj['couponid'];
    render(conponId);
    function render(a){
        $.ajax({
            type:"get",
            url:"http://127.0.0.1:9090/api/getcouponproduct?couponid="+a,
            data:"",
            dataType:"json",
            success:function(info){
                console.log(info);

                //渲染成功，头部的p改变
                //从本地中获取数据
                var productN=localStorage.getItem('productName');
                console.log(productN);
                var title= productN+"优惠卷";
                $('.mm_header p').text(title);

                var htmlStr=template('couponproductTpl',info);
                $('.commodity').html(htmlStr);
              
            }
        
        })
    }

     //2.返回顶部
     $('.goback').click(function(){
        $('html').scrollTop(0);
    })
   
   //3.点击li出现模态框
   $('.commodity').on('click','a',function(){
    $('#myModal').modal('show');
   })
   //4.轮播图
   var mySwiper = new Swiper ('.swiper-container', {
    loop: true, // 循环模式选项
    
    // 如果需要分页器
    // pagination: {
    //   el: '.swiper-pagination',
    // },
    })
})