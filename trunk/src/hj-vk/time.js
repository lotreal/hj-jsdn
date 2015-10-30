var SysSecond;   
var InterValObj;  

function SetRemainTime() {   
    if (SysSecond > 0) {   
        SysSecond = SysSecond - 1;   
        var second = Math.floor(SysSecond % 60); 
        var minite = Math.floor((SysSecond / 60) % 60);  
        var hour = Math.floor((SysSecond / 3600) % 24);     
        var day = Math.floor((SysSecond / 3600) / 24);    
        
        $("#remainTime").html(day + "天" + hour + "小时" + minite + "分" + second + "秒");   
    } else {
        window.clearInterval(InterValObj);   
        
    }   
} 

$(document).ready(function() {   
    SysSecond = parseInt($("#remainSeconds").html());
    InterValObj = window.setInterval(SetRemainTime, 1000);

    //$(function() {          $("img").lazyload({placeholder :
    //"loading.gif",effect      : "fadeIn"});});

    var _wrap=$('ul.YlMarquee');
    var _interval=2000;
    var _moving;
    _wrap.hover(function(){
        clearInterval(_moving);
    },function(){
        _moving=setInterval(function(){
            var _field=_wrap.find('li:first');
            var _h=_field.height();
            _field.animate({marginTop:-_h+'px'},600,function(){//通过取负margin值,隐藏第一行
                _field.css('marginTop',0).appendTo(_wrap);//隐藏后,将
                //该行的margin值置零,并插入到最后,实现无缝滚动
            });
        },_interval);
    }).trigger('mouseleave');
});  
