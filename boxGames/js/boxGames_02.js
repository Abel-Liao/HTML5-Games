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
    var imgFun = function(id,xPostion,yPostion){
        this.id = id;
        this.xPostion = xPostion;
        this.yPostion = yPostion;
        boxGame.drawImage(this.id,this.xPostion,this.yPostion);
    }
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
    floorFun();
   
    // 小人的运动
    var x = -7.5,y = -27;
    var treeX1 = 0, treeY1 = -11;
    var box = [[35,-11],[70,-11]];
    var mobile = true;
    var mobileBox = false;
    // 绘制木箱
    imgFun(box,boxX1,boxY1);
    imgFun(box,boxX2,boxY2);
    imgFun(down,x,y);
     // 游戏成功
     var succrssFun = function(){
         // 绘制目的背景
        imgFun(succrss,35*7,35*7);
        // 绘制小树
        treeX1 = treeX1;
        treeY1 = 35*7-11;
        mobile = isMobile().isTree, // 判断人物是否会移动到小树位置
        imgFun(tree,treeX1,treeY1);
        // 绘制木箱
        imgFun(box,boxX1,boxY1);
        imgFun(box,boxX2,boxY2);
        mobileBox = (x+7.5 == boxX1 && y+16==boxY1);
        if(x==237.5 && y==218){
            console.log("恭喜成功了");
        }
    }
    document.onkeydown = function(event){
        var keyNum=window.event ? event.keyCode :event.which;
        if(keyNum == 40){
            floorFun();
            // 绘制成功图案
            if(boxX1 == boxX2 && boxY1+35==boxY1 && x==27.5){
                succrssFun();
                imgFun(down,x,y);
            }else{
                y+=35;
                if(y+16==boxY1 && x+7.5==boxX1 && boxX1!=boxX2 && boxY2 !=boxY1){
                    boxY1 += 35;
                }
                succrssFun();
                if(mobile){
                    imgFun(down,x,y);
                }else{
                    y-=35;
                    imgFun(down,x,y);
                }
            }
        }else if(keyNum == 38){
            floorFun();
            // 绘制成功图案
            if(boxX1 == boxX2 && boxY1+35==boxY1 && x==27.5){
                succrssFun();
                imgFun(up,x,y);
            }else{
                y-=35;
                if(y+16 == boxY1 && x+7.5 == boxX1 && boxX1!=boxX2 && boxY2 !=boxY1){
                    console.log(123);
                    boxY1 -= 35;
                }
                succrssFun();
                if(mobile){
                    imgFun(up,x,y);
                }else{
                    y+=35;
                    imgFun(up,x,y);
                }
            }
        }else if(keyNum == 37){
            floorFun();
            // 绘制成功图案
            if(boxX1+35 == boxX2 && boxY1==boxY1 && y==-27){
                succrssFun();
                imgFun(left,x,y);
            }else{
                x-=35;
                if(x+7.5 == boxX1 && y+16==boxY1 && boxX1!=boxX2 && boxY2 !=boxY1){
                    boxX1 -= 35;
                }
                succrssFun();
                if(mobile){
                    imgFun(left,x,y);
                }else{
                    x+=35;
                    imgFun(left,x,y);
                }
            }
        }else if(keyNum == 39){
            floorFun();
            // 绘制成功图案
            if(boxX1+35 == boxX2 && boxY1==boxY1 && y==-27){
                succrssFun();
                imgFun(right,x,y);
            }else{
                x+=35;
                if(x+7.5 == boxX1 && y+16==boxY1 && boxX1!=boxX2 && boxY2 !=boxY1){
                    boxX1 += 35;
                }
                succrssFun();
                if(mobile){
                    imgFun(right,x,y);
                }else{
                    x-=35;
                    imgFun(right,x,y);
                }
            }
        }
    }
    // 判断小人是否移动
    var isMobile = function(){
        var isTrue = {
            isTree: true,
            isBox:true,
        };
        // 移动的下一个路径不能有树木(x,y不能与之相等)
        if(x!==-7.5 || y!==35*7-27){
            isTrue.isTree = true;
        }else{
            isTrue.isTree = false;
        }
        // 移动的路径上不能有两个木箱或者以上
        if(boxX1==boxX2){

        }
            // 横向移动 (y轴不变，x轴发生改变)
            // 纵向移动 (x轴不变,y轴发生改变)
        // 移动的路径上不能有木箱后面有树木
        return isTrue;
    }
}