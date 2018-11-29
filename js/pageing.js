$(function(){
    //功能1：一进入页面就开始渲染
   $.ajax({
       type:"get",
       url:"http://127.0.0.1:9090/api/getcategorytitle",
       data:"",
       dataType:"json",
       success:function(info){
           console.log(info);
           var htmlStr=template('titleTpl',info);
           $('.title').html(htmlStr);
           $('.smallUl').hide();
       }
  
  
    })
   

    //功能2：点击右侧的下拉键，实现二级导航的显示和隐藏
    $('.title').on('click','.icon_down',function(){
       var id=$(this).data('id');
       var $this=$(this);
    //    console.log(id);
       render(id,$this);
       $this.parent().parent().next().toggle();
    
   })
function render(id,v){
    
   $.ajax({
       type:"get",
       url:"http://127.0.0.1:9090/api/getcategory?titleid="+id,
       dataType:"json",
       success:function(info){
        console.log(info);
        var htmlStr=template('smallUlTpl',info);
        v.parent().parent().next().html(htmlStr);
       }
   })
 }


//3.功能3.实现返回顶部
$('.goback').click(function(){
    $('html').scrollTop(0);
})
})