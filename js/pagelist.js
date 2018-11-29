$(function () {

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
    //获取categoryid


    var cateid = obj['categoryid'];

    render(cateid);
    // console.log(cateid);
    function render(id) {
        $.ajax({
            type: "get",
            url: "http://127.0.0.1:9090/api/getcategorybyid?categoryid=" + id,
            data: "",
            dataType: "json",
            success: function (info) {
                // console.log(info);
                var htmlStr = template('navTpl', info);
                $('.nav .left').html(htmlStr);
            }
        })
    }

    //  默认渲染第一面页面：
    var pageid = 1; //记录当前页
    // var count;  //记录总条数

    productlist(cateid, pageid);

    //功能2：实现商品列表的渲染
    function productlist(a, b) {
        $.ajax({
            type: "get",
            url: "http://127.0.0.1:9090/api/getproductlist?categoryid=" + a + "&pageid=" + b,
            data: "",
            dataType: "json",
            success: function (info) {
                console.log(info);
                console.log(info.totalCount);
                info.pageidz = Math.ceil(info.totalCount / info.pagesize);
                info.pageid = pageid;
                /*上面的两个属性必须在数据和模板连接前添加到数据中：如果在数据和模板连接后
                在添加至info里面就不能在模板中使用了       
                */
                var htmlStr = template('productTpl', info);
                $('.caterory .endocrator').html(htmlStr);
                //下拉菜单要实时更新显示
                $('option[a=' + b + ']').prop('selected', true)

            }
        })

    }

    //3.点击下一页按钮就渲染下一页: 并且下拉菜单要实时更新显示

    $('.endocrator').on('click', '.nextbtn', function () {

        //3.1点击下一页按钮就渲染下一页
        //获取总数据
        var count = $('.product ul').data('count');
        //获取每页条数
        var pagesize = $('.product ul').data('pagesize');
        //计算总页数
        var pageidz = Math.ceil(count / pagesize);
        //判断pageid是否大于总页数：总页数=info.totalCount/pagesize
        console.log(pageidz);
        if (pageid >= pageidz) {
            pageid = pageidz;
        } else {
            pageid++;
        }
        productlist(cateid, pageid);
       
    })
    //4.点击上一页按钮渲染上一页，并且下拉菜单要实时更新显示
    $('.endocrator').on('click', '.previousbtn', function () {
        //4.1点击上一页按钮渲染上一页
        // 判断是否为第一页
        if (pageid <= 1) {
            pageid = 1;
        }
        //如果比一大就每点击一次就渲染一次
        else {
            pageid--;
        }
        productlist(cateid, pageid);
        //4.2下拉菜单要实时更新显示

    })
    //5.点击下拉菜单中的选项，进行商品列表渲染
    $('.endocrator').on('change', '#select', function () {
        //获取该选中的菜单的表示的当前页
        pageid = $(this).find('option:selected').val();

        console.log(pageid);
        // console.log(1);
        productlist(cateid, pageid);
    })

    //6.实现返回顶部
    $('.goback').click(function () {
        $('html').scrollTop(0);
    })
})