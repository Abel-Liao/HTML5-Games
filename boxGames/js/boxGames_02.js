
    // 绘制画布
    var boxGames = document.getElementById("boxGames");
    var boxGame = boxGames.getContext("2d");
    // 绘制场景位置
    var x = 0,y = 0; //猴哥的起始位置
    var boxPostion = [[35,0],[210,210],[35*7,35*5],[35*9,35*10]];// 箱子起始位置
    var treePostion = [[35*5,35*7],[35*7,35*4]];// 树木位置
    var succrssPostion = [[35*7,35*7],[35*5,35*3],[35*8,35*4]];// 成功圆位置
    // 绘制地图
    var bg,tree;
    // var bg = new Image();
    // var tree = new Image();
    var ac = {
        bg:"images/block.gif",
        tree:"images/wall.png",
        succrss:"images/ball.png",
        box:"images/box.png",
        down:"images/down.png",
        left:"images/left.png",
        up:"images/up.png",
        right:"images/right.png"
    };
    // var addFun = function(id){
        // id.onload = function(){
        //     abcd();
        // }
    // }
    function imgAdd(id,name,x,y){
        id=new Image();
        switch (name){
            case "bg":
                id.src = ac.bg;
                break;
            case "tree":
                id.src = ac.tree;
                break;
        }
        // console.log(id);
        id.onload = function(){
            boxGame.drawImage(id,x,y);
        }
    }
    // imgAdd(bg,"bg");
    // imgAdd(tree,"tree");
    // 绘制图片Fun
    var imgFun = function(id,xPostion,yPostion){
        console.log(id);
        if(id== bg){
            bg.src = ac.bg;
        }else if(id==tree){
            tree.src = ac.tree;
        }
        this.xPostion = xPostion;
        this.yPostion = yPostion;
        // console.log(id);
        id.onload = function(){
            boxGame.drawImage(id,this.xPostion,this.yPostion);
        }
    }
    // 绘制底图背景
    var floorFun = function(){
        console.log(11);
        for(var i=0,x=0,y=0; i=true; i++){
            // imgFun(bg,x,y);
            imgAdd(bg,"bg",x,y);
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
            // imgFun(name,postion[i][0],postion[i][1]);
            imgAdd(tree,"tree",postion[i][0],postion[i][1]);
        } 
    }
    var abcd = function(){
        floorFun();
        drawAny(tree,treePostion);
    }
    abcd();
