window.onload = function(){
    var boxGames = document.getElementById("boxGames");
    var boxGame = boxGames.getContext("2d");

    var bg = document.getElementById("bg");
    var tree = document.getElementById("tree");
    var succrss = document.getElementById("succrss");
    var box = document.getElementById("box");
    var down = document.getElementById("down");
    var left = document.getElementById("left");
    var up = document.getElementById("up");
    var right = document.getElementById("right");
    // var img = document.createElement('img');
    // img.src="images/block.gif";
    // 绘制图片Fun
    var imgFun = function(id,xPostion,yPostion){
        this.id = id;
        this.xPostion = xPostion;
        this.yPostion = yPostion;
        boxGame.drawImage(this.id,this.xPostion,this.yPostion);
    }
    // 绘制底图背景
    var floorFun = function(){
        for(var i=0,x=0,y=0; i=true; i++){
            imgFun(bg,x,y);
            if(x>560){
                x=0;
                y+=35;
                if(y>560){
                    break;
                }
            }else{
                x+=35;
            }
        }
    }
    // 小人的运动
    var x = -7.5,y = -27; //人物位置
    var boxPostion = [[35,-11],[70,-11]];// 箱子位置
    var treePostion = [[0,35*7-11]];// 树木位置
    var succrssPostion = [[35*7,35*7],[35*5,35*3],[35*8,35*4]];// 成功圆位置
    // 绘制地图
    var drawAny = function (name,postion){
        for(var i=0;i<postion.length;i++){
            imgFun(name,postion[i][0],postion[i][1]);
        }
    }
    // 绘制整个页面
    var allPic = function(direction){
        // 绘制底图背景
        floorFun();
        // 绘制箱子
        drawAny(box,boxPostion);
        // 绘制树木
        drawAny(tree,treePostion);
        // 绘制目的圆
        drawAny(succrss,succrssPostion);
        // 绘制人物
        imgFun(direction,x,y);
    }
    // 绘制整个页面
    allPic(down);
     // 游戏成功
    var succrssFun = function(){
        // if(x==237.5 && y==218){
        //     console.log("恭喜成功了");
        // }
    }
    document.onkeydown = function(event){
        var keyNum=window.event ? event.keyCode :event.which;
        peopleMobile(keyNum);
    }
    // 小人移动
    var peopleMobile = function(keyNum){
        if(keyNum == 39 || keyNum == 40 || keyNum == 38 || keyNum == 37){
            if(keyNum == 40){// 下
                tbMobile(1,down);
            }else if(keyNum == 38){ // 上
                tbMobile(-1,up);
            }else if(keyNum == 37){ // 左
                lrMobile(-1,left);
            }else if(keyNum == 39){ // 右
                lrMobile(1,right);
            }
        }
    }
    // 小人左右移动
    var lrMobile = function(value,direction){
        value *= 35;
        x += value;
        if(isMobile().isTree){
            allPic(direction);
        }else{
            x-=value;
            allPic(direction);
        }
    }
    // 小人上下移动
    var tbMobile = function(value,direction){
        value *= 35;
        y += value;
        if(isMobile().isTree){
            allPic(direction);
        }else{
            y-=value;
            allPic(direction);
        }
    }
    // 判断小人是否移动
    var isMobile = function(){
        var isTrue = {
            isTree: true,
            isBox:true,
        };
        // 移动的下一个路径不能有树木(x,y不能与之相等)
        if(x == -7.5 && y == 35*7-27){
            isTrue.isTree = false;
        }else{
            isTrue.isTree = true;
        }
        // 移动的路径上不能有两个木箱或者以上
        if(true){

        }
            // 横向移动 (y轴不变，x轴发生改变)
            // 纵向移动 (x轴不变,y轴发生改变)
        // 移动的路径上不能有木箱后面有树木
        return isTrue;
    }
}