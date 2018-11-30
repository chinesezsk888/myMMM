$(function(){

    //记录当前页
    var pageId=1;
    //功能1：一进入页面就开始渲染
    render(pageId);
    function render(b){
        $.ajax({
        type:"get",
        url:"http://127.0.0.1:9090/api/getmoneyctrl?pageid="+b,
        data:"",
        dataType:"json",
        success:function(info){
            //计算出总页数
            console.log(info);
            console.log(info.totalCount);
            var pageidz=Math.ceil(info.totalCount/info.pagesize);
            info.pageidz=pageidz;
            var htmlStr=template('endocratorTpl',info);
            $('.endocrator').html(htmlStr);
           //下拉菜单与当前页数对应
           $('option[a='+b+']').prop('selected',true);
        }
    })
    }
   

    //功能2：实现下拉菜单的页数渲染
       $('.endocrator').on('change','#select',function(){
           pageId=$(this).find('option:selected').val();
           console.log(pageId);
           render(pageId);
       })
  
        //功能3：点击上一页，渲染上一页
      $('.endocrator').on('click','.previousbtn',function(){
          //判断是否为第一页
          if(pageId<=1){
              pageId=1;
              return;
          }
          pageId--;
          render(pageId);
      })

      //功能4：点击下一页，渲染下一页
      $('.endocrator').on('click','.nextbtn',function(){
          //4.1判断是否是最后一页
          //4.1.1获取总条数
          var count=$('.endocrator ul').data('count');
          //4.1.2获取每页的条数
          var pageSize=$('.endocrator ul').data('pagesize');
         var pageidz=Math.ceil(count/pageSize);
          if(pageId>=pageidz){
            pageId=pageidz;
            return;

          }
          pageId++;
          render(pageId);
      })


      //功能5：返回顶部
      $('.goback').click(function(){
          $('html').scrollTop(0);
      })
})