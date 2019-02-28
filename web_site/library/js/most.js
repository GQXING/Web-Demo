// 处理登入事件
function login() {
    var t = document.documentElement.scrollTop || document.body.scrollTop;
    document.getElementById('fade').style.top = t + 'px';
    document.getElementById('light').style.top = (t + 300) + 'px';
    document.getElementById('light').style.display = 'block';
    document.getElementById('fade').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeIt() {
    document.getElementById('light').style.display = 'none';
    document.getElementById('fade').style.display = 'none';
    document.body.style.overflow = 'scroll';
}

// 处理中间部分的菜单转换
var oli = $('#blist li');
for (var i = oli.length - 1; i >= 0; i--) {
    oli[i].index = i;
    oli[i].onmouseover = function() {
        console.log('test');
        for (var i = oli.length - 1; i >= 0; i--) {
            var str = 'div' + (i + 1);
            document.getElementById(str).style.display = 'none';
            oli[i].className = '';
        }
        var div = "div" + (this.index + 1);
        document.getElementById(div).style.display = 'inline';
        this.className = 'active';
    }
}



// 对class类选择器的获取
function getClassName(parent, cls) {
    var all = parent.getElementsByTagName("*");
    var arr = [];
    for (var i = 0; i < all.length; i++) {
        if (all[i].className == cls) {
            arr.push(all[i]);
        }
    }
    return arr;
}

$(function() {
    $("#code").change(function() {
        var value = $("#code").val();
        value = $.trim(value);
        if (value != null) {
            var url = "/library/CodeCheck";
            //加上时间，防止缓存，这里就相当于发送一个post请求，和表单请求的格式相近，一个变量名，一个值，成对发送
            var args = { "code": value, "time": new Date() };
            //发送请求，返回的内容封装在data中
            $.post(url, args, function(data) {
                $("#checkcode").html(data);
            });
        }
    })
});

// 处理相应相应的按钮及界面
var btn = document.getElementById('handbtn');
var cbtn = document.getElementById('checkbtn');
btn.onclick = function() {
    document.getElementById('handleID').style.display = "block";
    document.getElementById('result').style.display = "none";
     $("#modifyID").css('display', 'none');
    var d = new Date();
    var str = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    document.getElementById('dateValue').value = str;
    document.getElementById('dateValue').disabled = true;
    console.log('test');
}
cbtn.onclick = function() {
    document.getElementById('handleID').style.display = "none";
    document.getElementById('result').style.display = "inline";
}


$("#modifybtn").click(function() {
    console.log('test');
    $("#modifyID").css('display', 'inline');
    document.getElementById('result').style.display = "none";
});

function changeCode() {
    var imgNode = document.getElementById("vimg");
    //重新加载验证码，达到刷新的目的  
    imgNode.src = "/library/AuthImageServlet?t=" + Math.random(); // 防止浏览器缓存的问题 
}


//处理图片上传的显示功能
//$(function(){})是简写,可以理解为一个闭包 是一个匿名方法的调用 以保证方法内的变量不与外界冲突
$(function() {
    //回调方法 当做参数传入后 会在相应的时间触发后调用
    $("#photobtn").change(function() {
        // $(this)表示当前对象，
        var $file = $(this);
        var fileObj = $file[0];
        /* URL对象是硬盘（ SD卡等） 指向文件的一个路径， 如果我们做文件上传的时候， 想在没有上传服务器端的情况下看到上传图片的效果图的时候就可是以通过var url = window.URL.createObjectURL(obj.files[0]);
         获得一个http格式的url路径， 这个时候就可以设置到 < img > 中显示了。
         window.webkitURL和window.URL是一样的， window.URL标准定义， window.webkitURL是webkit内核的实现（ 一般手机上就是使用这个）， 还有火狐等浏览器的实现。*/
        var windowURL = window.URL || window.webkitURL;
        console.log('windowURL' + windowURL);
        var dataURL;
        var $img = $("#preview");
        if (fileObj && fileObj.files && fileObj.files[0]) {
            dataURL = windowURL.createObjectURL(fileObj.files[0]);
            $img.attr('src', dataURL);
        } else {
            dataURL = $file.val();
            var imgObj = document.getElementById("preview");
            // 两个坑:
            // 1、在设置filter属性时，元素必须已经存在在DOM树中，动态创建的Node，也需要在设置属性前加入到DOM中，先设置属性在加入，无效；
            // 2、src属性需要像下面的方式添加，上面的两种方式添加，无效；
            imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
            imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;
        }
    });
});
