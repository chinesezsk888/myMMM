$(function(){
    //记录当前页
    var pageId=1;
    render(pageId);
    function render(a){
        $.ajax({
        type:"get",
        url:"http://127.0.0.1:9090/api/getmoneyctrl?pageid="+a,
        data:"",
        dataType:"json",
        success:function(info){
            console.log(info);
            var htmlStr=template('endocratorTpl',info);
            $('.endocrator').html(htmlStr);
        }
    })
    }
   
})