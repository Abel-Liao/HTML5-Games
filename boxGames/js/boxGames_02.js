window.onload = function(){
    // 绘制画布
    var boxGames = document.getElementById("boxGames");
    var boxGame = boxGames.getContext("2d");
    // 绘制场景位置
    var x = 0,y = 0; //猴哥的起始位置
    var boxPostion = [[35,0],[210,210],[35*7,35*5],[35*9,35*10]];// 箱子起始位置
    var treePostion = [[35*5,35*7],[35*7,35*4]];// 树木位置
    var succrssPostion = [[35*7,35*7],[35*5,35*3],[35*8,35*4]];// 成功圆位置

    // var bg = document.getElementById("bg");
    // var tree = document.getElementById("tree");
    // var succrss = document.getElementById("succrss");
    // var box = document.getElementById("box");
    // var down = document.getElementById("down");
    // var left = document.getElementById("left");
    // var up = document.getElementById("up");
    // var right = document.getElementById("right");




    var ab,tree;
    var ac = {
        bg:"images/block.gif",
        tree:"images/wall.png",
    }
    // var img = document.createElement('img');
    // img.src="images/block.gif";
    // 绘制图片Fun
    var imgFun = function(id,xPostion,yPostion){
        if(id==ab){
            ab.src = ac.bg;
        }else if(id==tree){
            tree.src = ac.tree;
        }
        this.xPostion = xPostion;
        this.yPostion = yPostion;
        boxGame.drawImage(id,this.xPostion,this.yPostion);
    }
    // 绘制底图背景
    var floorFun = function(){
        for(var i=0,x=0,y=0; i=true; i++){
            imgFun(ab,x,y);
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
    var drawAny = function (name,postion){
        for(var i=0;i<postion.length;i++){
            imgFun(name,postion[i][0],postion[i][1]);
        } 
    }
    var abcd = function(){
        
    }
    abcd();
    // floorFun();
    drawAny(tree,treePostion);
    // 绘制整个页面
    var allPic = function(){// direction 为判断猴哥面向图片
        // 绘制底图背景
        // floorFun();
        // drawAny(tree,treePostion);
    }
    // 绘制整个页面
    tree.onload = function(){
        allPic();
    }
}