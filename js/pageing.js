$(function(){
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
   
    $('.title').on('click','.icon_down',function(){
       var id=$(this).data('id');

       console.log(id);
       render(id);
       $(this).parent().parent().next().show();
   })
function render(id){

   
   $.ajax({
       type:"get",
       url:"http://127.0.0.1:9090/api/getcategory?titleid="+id,
       dataType:"json",
       success:function(info){
        console.log(info);
        var htmlStr=template('smallUlTpl',info);
        $('.smallUl').html(htmlStr);
       }

   })

 }
})