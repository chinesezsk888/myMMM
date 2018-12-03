$(function(){
  //功能1:一进入就渲染
  $.ajax({
      type:"get",
      url:"http://127.0.0.1:9090/api/getinlanddiscount",
      data:"",
      dataType:"json",
      success:function(info){
        // console.log(info);
        var src="./images/lazyload.gif";
        var loadImg="<img src='./images/lazyload.gif' alt=''>";
        var trueImg;
        info.result.forEach(function(e,i){
            // e.loadImg=loadImg;
            // e.src=src;
            e.trueImgSrc=e.productImg.split(' ')[1].split('src=')[1].slice(1).slice(0,-1);
            e.trueImg="<img src='./images/lazyload.gif' data-src="+e.trueImgSrc+" src=''>";

        });


        //   //2.1.1创建假图并自定义data-src来存放真的地址
        // //   var src="./images/lazyload.gif";
        //   info.result.forEach(function(e,i){
        //      //获取真的地址
        //      var  trueImgSrc=e.productImg.split(' ')[1].split('src=')[1].slice(0,-1);
        //      //创建假图并自定义data-src来存放真的地址
        //     var loadImg='<img src="./images/lazyload.gif" data-src='+trueImgSrc+' alt="">';
        //    //返回到info的result中
        //     e.loadImg=loadImg;
        //   })
           console.log(info);
         
          var htmlStr=template('inloadDiscounTpl',info);
          $('.discoundTitle ul').html(htmlStr);

           $(window).on('scroll',function(){
               $('.photo img').each(function(){
                if(checkShow($(this)) && !isLoaded($(this))){      
                  load($(this));
                }
               })
           })

        //    //功能2：实现图片的懒加载
         
        //   //思路：
        //  // 1.准备工作由于懒加载需要一个假的src和一个用来存放真地址
        //   的src,所以要在渲染前将存有假地址的img标签保存到info中
        //   //2.存到info中后，在浏览器中向下滚动，实现懒加载
          
        //  //2.2实现懒加载
         // 需要写一个checkShow函数来判断当前img是否已经出现在了视野中
         function checkShow($img){
             //获取页面页面向上滚动的距离
             var scrollTop=$(window).scrollTop();
             //获取可视区的高度
             var windowHeight=$(window).height();
             //获取元素到页面顶部的距离
             var offsetTop=$img.offset().top;
            //判断当前img是否已经出现在了视野中
            if(offsetTop-scrollTop<windowHeight && offsetTop >scrollTop){
                return true;
            }
            return false;
           
         }
         //还需要写一个isLoaded函数判断当前img是否已经被加载过了
         function isLoaded($img){
            if($img.attr('src')===$img.attr('data-src')){
                return true;
            }
            return false;
        }
        //加载图片
        function load($img){
            var trueSrc=$img.data('src');
            // console.log(trueSrc);
            $img.attr('src',trueSrc);
        }
        
     
        }

  })

   



  //功能3:返回顶部
  $('.goback').click(function(){
      $('html').scrollTop(0);
  })

   
})