$(function(){
  //功能1:一进入就渲染
  $.ajax({
      type:"get",
      url:"http://127.0.0.1:9090/api/getinlanddiscount",
      data:"",
      dataType:"json",
      success:function(info){
          console.log(info);
          var htmlStr=template('inloadDiscounTpl',info);
          $('.discoundTitle ul').html(htmlStr);
      }
  })
  //功能2:返回顶部
  $('.goback').click(function(){
      $('html').scrollTop(0);
  })

})