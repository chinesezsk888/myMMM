$(function(){
    //1.功能1：一进入页面，就开始渲染面包蟹导航
    //1.1获取该页面中的参数
    var add = decodeURI(location.search);
    //    console.log(add);
    //截取字符串去掉？
    add = add.slice('1');
    // console.log(add);
    //切割字符串成数组
    var arrAdd = add.split('&');
    // console.log(arrAdd);
    //存入对象
    var obj = [];
    arrAdd.forEach(function (v, i) {
        var key = v.split('=')[0];
        var value = v.split('=')[1];
        obj[key] = value;

    })
    // console.log(obj);
    var productId=obj['productid'];
    // console.log(productId);

    //2.渲染面包蟹导航
    render(productId);
    
    function render(a){
        $.ajax({
            type:"get",
            url:"http://127.0.0.1:9090/api/getproduct?productid="+a,
            data:"",
            dataType:"json",
            success:function(info){
                console.log(info);
                var ptName=info.result[0].productName;
                //将字符串转成数组:切割
                var arr= ptName.split(' ');
                //将这个表示数组存入数据中
                info.loadAdd=arr;
                console.log(info); 
                //将本地存储的catetory名给到数据中
                var cateN=localStorage.getItem('cate');
                info.cateName=cateN;
 
                var htmlStr=template('navTpl',info);
                $('.detile').html(htmlStr);
            }
        })
    }


   //3.渲染商品详情
   comment(productId);
    function comment(b){
        $.ajax({
            type:"get",
            url:"http://127.0.0.1:9090/api/getproductcom?productid="+b,
            data:"",
            dataType:"json",
            success:function(info){
              console.log(info);
              var htmlStr=template('detileTpl',info);
              $('.detile .comment').html(htmlStr);
            }
        })

    }

     //4.实现返回顶部
     $('.goback').click(function () {
        $('html').scrollTop(0);
    })



})