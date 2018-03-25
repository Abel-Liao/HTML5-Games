var xxlMain = document.getElementById('xxlMain');//挂载的dom节点
var _html = ""; //动态添加span标签
var _number= []; //检查是否有第一次就出现的三个连续可消灭的数据
var spanTop = 0; //span position的top值
var spanLeft = 0; //span position的left值
var spanChoose = null; //记录被拖拽的span
var spanChooseIn = null; //记录被进入的span
var spanChooseLeft = null; //记录被进入的span 的 left 值
var spanChooseTop = null; //记录被进入的span 的 top 值
// 随机生成一个span
function spanFun(spanLeft,spanTop){
    var random = Math.floor(Math.random()*6+1);
    if( random==1 ){
        _html += '<span name=1 style="left:'+spanLeft+'px;top:'+spanTop+'px" class="xxl-chick"></span>';
    }else if( random==2 ){
        _html += '<span name=2 style="left:'+spanLeft+'px;top:'+spanTop+'px" class="xxl-fox"></span>';
    }else if( random==3 ){
        _html += '<span name=3 style="left:'+spanLeft+'px;top:'+spanTop+'px" class="xxl-frog"></span>';
    }else if( random==4 ){
        _html += '<span name=4 style="left:'+spanLeft+'px;top:'+spanTop+'px" class="xxl-cattle"></span>';
    }else if( random==5 ){
        _html += '<span name=5 style="left:'+spanLeft+'px;top:'+spanTop+'px" class="xxl-owl"></span>';
    }else{
        _html += '<span name=6 style="left:'+spanLeft+'px;top:'+spanTop+'px" class="xxl-bear"></span>';
    }
}
// 生成HTML页面
for(var i=1;i<=72;i++){
    spanFun(spanLeft,spanTop);
    spanLeft += 33;
    if(spanLeft>263){
        spanLeft = 0
        spanTop += 33;
    }
}
xxlMain.innerHTML = _html;//将动态的span标签挂在到dom节点
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
        console.log("GAME OVER");
        clearInterval(timer);
    }
    countdown.innerHTML = (t<10?("0"+t):t) + ":" + (s<10?("0"+s):s);
},1000);
// 拖拽效果
var spanDom = xxlMain.querySelectorAll("span"); //显示的 span 节点 
var spanLength = spanDom.length;//span的length
var spanX = "";//拖拽元素的X坐标
var spanY = "";//拖拽元素的Y坐标
for(var i = 0;i<spanLength; i++){
    spanDom[i].index = i;
    // 拖拽事件开始
    spanDom[i].ondragstart = function(e){
        spanChoose = this;
        spanChooseLeft = this.offsetLeft;
        spanChooseTop = this.offsetTop;
    }
    // 拖拽进入
    spanDom[i].ondragover = function(e){
        spanChooseIn = this;
        spanLeft = this.offsetLeft; 
        spanTop = this.offsetTop;
    }
    // 拖拽结束
    spanDom[i].ondragend = function(e){
        if(spanChoose.offsetLeft == spanLeft && spanChoose.offsetTop != spanTop){
            spanChoose.style.top = spanTop +'px';
            spanChooseIn.style.top = spanChooseTop +'px';
        }
        if(spanChoose.offsetTop == spanTop && spanChoose.offsetLeft != spanLeft){
            spanChoose.style.left = spanLeft +'px';
            spanChooseIn.style.left = spanChooseLeft +'px';
        }
    }
}
// 遇见三个相同的消除
function removeSpan(){ }
// 消除之后添加元素

function addSpan(){ }

// 获取鼠标移动值函数
function getMousePos(event) {
    var e = event || window.event;
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    var x = e.pageX || e.clientX + scrollX;
    var y = e.pageY || e.clientY + scrollY;
    //alert('x: ' + x + '\ny: ' + y);
    console.log (  x, y );
}