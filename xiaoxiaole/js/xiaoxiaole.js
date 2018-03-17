var xxlMain = document.getElementById('xxlMain');//挂载的dom节点
var _html = "";//动态添加span标签
var _number= [];//检查是否有第一次就出现的三个连续可消灭的数据
// 随机生成一个span
function spanFun(){
    var random = Math.floor(Math.random()*6+1);
    if( random==1 ){
        _html += '<span name=1 class="xxl-chick"></span>';
    }else if( random==2 ){
        _html += '<span name=2 class="xxl-fox"></span>';
    }else if( random==3 ){
        _html += '<span name=3 class="xxl-frog"></span>';
    }else if( random==4 ){
        _html += '<span name=4 class="xxl-cattle"></span>';
    }else if( random==5 ){
        _html += '<span name=5 class="xxl-owl"></span>';
    }else{
        _html += '<span name=6 class="xxl-bear"></span>';
    }
}
// 生成HTML页面
for(var i=1,r=0;true;i++){
    spanFun();
    r ++ ;
    if( r==72 ){
        break;
    }
}
xxlMain.innerHTML = _html;//将动态的span标签挂在到dom节点
// 添加被消除的span
function addSpan(){
    var xxlSpan = document.querySelectorAll("#xxlMain span");
    if( xxlSpan<72 ){
        spanFun();
        xxlMain.innerHTML = _html;//将动态的span标签挂在到dom节点
    }
}
// 倒计时
var countdown = document.querySelector(".xxl-time");
var s = 59;
var t = 4;
var timer = setInterval(function(){
    s--;
    if( s<0 ){
        s=59;
        t--;
    }
    if( s==0 && t==0){
        clearInterval(timer);
    }
    countdown.innerHTML = (t<10?("0"+t):t) + ":" + (s<10?("0"+s):s);
},1000);