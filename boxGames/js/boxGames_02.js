
    // 绘制画布
    var boxGames = document.getElementById("boxGames");
    var boxGame = boxGames.getContext("2d");
    // 绘制场景位置
    var x = 0,y = 0; //猴哥的起始位置
    var boxPostion = [[35,0],[210,210],[35*7,35*5],[35*9,35*10]];// 箱子起始位置
    var treePostion = [[35*5,35*7],[35*7,35*4]];// 树木位置
    var succrssPostion = [[35*7,35*7],[35*5,35*3],[35*8,35*4]];// 成功圆位置
    // 绘制地图
    // var ab = new Image();
    // var tree = new Image();
    var bgc = {
        ab: new Image(),
        tree: new Image(),
        succrss: new Image(),
        box: new Image(),
        down: new Image(),
        left: new Image(),
        up: new Image(),
        right: new Image(),
    }
    var ac = {
        bg:"images/block.gif",
        tree:"images/wall.png",
        succrss:"images/ball.png",
        box:"images/box.png",
        down:"images/down.png",
        left:"images/left.png",
        up:"images/up.png",
        right:"images/right.png"
    }
    // var addFun = function(id){
        // id.onload = function(){
        //     abcd();
        // }
    // }
    // 绘制图片Fun
    var imgFun = function(id,xPostion,yPostion){
        
        // id.onload = function(){
            if(id==bgc.ab){
                bgc.ab.src = ac.bg;
            }else if(id==bgc.tree){
                bgc.tree.src = ac.tree;
            }
            this.xPostion = xPostion;
            this.yPostion = yPostion;
            boxGame.drawImage(id,this.xPostion,this.yPostion);
            abcd();
        // }
        // addFun(id);
    }
    // 绘制底图背景
    var floorFun = function(){
        for(var i=0,x=0,y=0; i=true; i++){
            imgFun(bgc.ab,x,y);
            bgc.bg.onload = function(){
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
    }
    var drawAny = function (name,postion){
        for(var i=0;i<postion.length;i++){
            imgFun(name,postion[i][0],postion[i][1]);
        } 
    }
    var abcd = function(){
        floorFun();
        drawAny(bgc.tree,treePostion);
    }
    abcd();
    // 绘制整个页面
    // var allPic = function(){// direction 为判断猴哥面向图片
    //     // 绘制底图背景
    //     abcd();
    // }
    // 绘制整个页面
