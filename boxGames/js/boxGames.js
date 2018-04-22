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
        if(id==down || id==up || id==left || id==right){ // 判断是否为绘制猴哥
            this.xPostion = xPostion-7.5;
            this.yPostion = yPostion-27;
        }else if(id==box){ // 判断是否为绘制箱子
            this.xPostion = xPostion;
            this.yPostion = yPostion-11;
        }else{
            this.xPostion = xPostion;
            this.yPostion = yPostion;
        }
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
    var x = 0,y = 0; //猴哥的起始位置
    // var boxPostion = [[35,0],[70,0]];// 箱子起始位置
    var boxPostion = [[35,0]];// 箱子起始位置
    var treePostion = [[35*5,35*7-11]];// 树木位置
    var succrssPostion = [[35*7,35*7],[35*5,35*3],[35*8,35*4]];// 成功圆位置
    // 绘制多个相同目标图片
    var drawAny = function (name,postion){
        for(var i=0;i<postion.length;i++){
            imgFun(name,postion[i][0],postion[i][1]);
        }
    }
    // 绘制整个页面
    var allPic = function(direction){
        // 绘制底图背景
        floorFun();
        // 绘制树木
        drawAny(tree,treePostion);
        // 绘制目的圆
        drawAny(succrss,succrssPostion);
        // 绘制箱子
        drawAny(box,boxPostion);
        // 绘制猴哥
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
    // 键盘监听事件,且控制猴哥移动
    document.onkeydown = function(event){
        var keyNum=window.event ? event.keyCode :event.which;
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
    // 猴哥左右移动
    var lrMobile = function(value,direction){
        x += value*35;
        var isSame = (y==boxPostion[0][1]) && x==boxPostion[0][0];
        if(isSame){
            boxMobile(value,direction);
        }
        if(isMobile().isTree){
            allPic(direction);
        }else{
            x-=value*35;
            allPic(direction);
        }
    }
    // 猴哥上下移动
    var tbMobile = function(value,direction){
        y += value*35;
        var isSame = (y==boxPostion[0][1]) && x==boxPostion[0][0];
        if(isSame){
            boxMobile(value,direction);
        }
        if(isMobile().isTree){
            allPic(direction);
        }else{
            y-=value*35;
            allPic(direction);
        }
    }
    // 猴哥推动箱子移动
    var boxMobile = function(value,direction){
        if(direction==right || direction==left){
            boxPostion[0] = [boxPostion[0][0]+35*value,boxPostion[0][1]];
        }else if(direction==up || direction==down){
            boxPostion[0] = [boxPostion[0][0],boxPostion[0][1]+35*value];
        }
    }
    // 判断猴哥是否移动
    var isMobile = function(){
        var isTrue = {
            isTree: true,
            isBox:true,
        };
        // 移动的下一个路径不能有树木(x,y不能与之相等)
        if(x == 35*5 && y == 35*7){
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