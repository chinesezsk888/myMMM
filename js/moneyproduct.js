$(function(){
    //功能1：一进入页面就开始渲染
    //由于需要传入参数，所以要从地址栏中获取
    //1.1获取地址并进行转译
    var add = decodeURI(location.search);
    console.log(add);
    //截取slice
    add=add.slice(1);
    console.log(add);
    //切割split：将字符串转成数组
    var arrAdd=add.split('&');
    var obj=[];
    arrAdd.forEach(function(v,i){
    var key=v.split('=')[0];
    var value=v.split('=')[1];
    obj[key]=value;
    })
    console.log(obj);
    //获取地址参数中的productid
    var productId=obj['productid'];
    //调用并渲染
    render(productId);
    function render(m){
    $.ajax({
        type:"get",
        url:"http://127.0.0.1:9090/api/getmoneyctrlproduct?productid="+m,
        data:"",
        dataType:"json",
        success:function(info){
            console.log(info);
            var htmlStr=template('discoundTitleTpl',info);
            $('.discoundTitle').html(htmlStr);

        }
    })
    }
    //功能2:返回顶部
    $('.goback').click(function(){
        $('html').scrollTop(0);
    })


})