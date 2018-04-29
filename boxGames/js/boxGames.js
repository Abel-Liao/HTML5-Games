window.onload = function(){
    // 绘制画布
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


    var previousLevel = document.getElementById("previous-level");
    var nextLevel = document.getElementById("next-level");
    var reset = document.getElementById("reset");
    var checkpoint = 1
    // 所有箱子起始位置
    var boxPostions = [
        [[210,210],[35*7,35*5],[35*9,35*10]],
        [[35*11,35*8],[35*3,35*2],[35*5,35*10]],
    ];
    // 所有树木位置
    var treePostions = [
        [[35*5,35*7],[35*7,35*4]],
        [[35*5,35*7],[35*7,35*4]],
    ];
    // 所有成功圆位置
    var succrssPostions = [
        [[35*7,35*7],[35*5,35*3],[35*8,35*4]],
        [[35*7,35*7],[35*5,35*3],[35*8,35*4]],
    ];
    var x = 0,y = 0; //猴哥的起始位置
    // 绘制场景位置
    var pic = {
        bg:"images/block.gif",
        tree:"images/wall.png",
        succrss:"images/ball.png",
        box:"images/box.png",
        down:"images/down.png",
        left:"images/left.png",
        up:"images/up.png",
        right:"images/right.png"
    };
    // 绘制图片Fun
    var imgFun = function(id,xPostion,yPostion){
        if(id==down || id==up || id==left || id==right){ // 判断是否为绘制猴哥
            this.xPostion = xPostion-7.5;
            this.yPostion = yPostion-27;
        }else if(id==box || id==tree){ // 判断是否为绘制箱子 或者 大树
            this.xPostion = xPostion;
            this.yPostion = yPostion-11;
        }else if(id==succrss){// 判断是否为绘制圆
            this.xPostion = xPostion+3;
            this.yPostion = yPostion+2;
        }else{
            this.xPostion = xPostion;
            this.yPostion = yPostion;
        }
        boxGame.drawImage(id,this.xPostion,this.yPostion);
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
    // 绘制整个页面
    var allPic = function(direction){// direction 为判断猴哥面向图片
        // 绘制底图背景
        floorFun();
        // 绘制树木
        drawAny(tree,treePostions[checkpoint-1]);
        // 绘制目的圆
        drawAny(succrss,succrssPostions[checkpoint-1]);
        // 绘制箱子
        drawAny(box,boxPostions[checkpoint-1]);
        // 绘制猴哥
        imgFun(direction,x,y);
    }
    // 绘制多个相同目标图片
    var drawAny = function (name,postion){
        for(var i=0;i<postion.length;i++){
            imgFun(name,postion[i][0],postion[i][1]);
        }
    }
    // 绘制整个页面
    allPic(down);
     // 游戏成功判断
    var succrssFun = function(){
        var abc = [];
        // 逐一判断圆上是否有箱子
        for(var i=0;i<boxPostions[checkpoint-1].length;i++){
            for(var r=0;r<succrssPostions[checkpoint-1].length;r++){
                if(boxPostions[checkpoint-1][i][0]==succrssPostions[checkpoint-1][r][0] && boxPostions[checkpoint-1][i][1]==succrssPostions[checkpoint-1][r][1]){
                    abc.push(1);
                }
            }
        }
        if(abc.length==succrssPostions[checkpoint-1].length){// 成功判断条件
            setTimeout(function(){
                console.log("恭喜过关");
            },300);
        }
    }
    // 键盘监听事件,且控制猴哥移动
    document.onkeydown = function(event){
        var keyNum=window.event ? event.keyCode :event.which;
        var walk = true; // 箱子移动判断依据
        if(keyNum == 39 || keyNum == 40 || keyNum == 38 || keyNum == 37){
            if(keyNum == 40){ // 下
                lrtmMobile(1,down);
            }else if(keyNum == 38){ // 上
                lrtmMobile(-1,up);
            }else if(keyNum == 37){ // 左
                lrtmMobile(-1,left);
            }else if(keyNum == 39){ // 右
                lrtmMobile(1,right);
            }
        }
    }
    // 猴哥移动
    var lrtmMobile = function(value,direction){
        if(direction==left || direction==right){
            x+=value*35;
        }else{
            y+=value*35;
        }
        walk = true; //让箱子默认为随猴哥移动
        for(var i=0;i<boxPostions[checkpoint-1].length;i++){
            var isSame = (y==boxPostions[checkpoint-1][i][1]) && x==boxPostions[checkpoint-1][i][0];//下次移动路径是否有箱子
            if(isSame){
                isObstacle(value,direction,boxPostions[checkpoint-1],i);//判断移动路径上是否有箱子
                isObstacle(value,direction,treePostions[checkpoint-1],i);//判断移动路径上是否有树木
                if(walk){
                    boxMobile(value,direction,i);
                }
            }
        } 
        if(!isMobile()){
            judgmentDirection(value,direction);
        }
        allPic(direction);
    }
    //让猴哥保持原地不动
    var judgmentDirection = function(value,direction){
        if(direction==left || direction==right){
            x-=value*35;
        }else{
            y-=value*35;
        }
    }
    // 判断是否有障碍物
    var isObstacle = function(value,direction,name,i){// name 为判断障碍物
        var directionChoos = direction==left || direction==right;
        for(var r=0;r<name.length;r++){
            var varName = directionChoos?(boxPostions[checkpoint-1][i][1]==name[r][1] && ((boxPostions[checkpoint-1][i][0]+35*value)==name[r][0])):((boxPostions[checkpoint-1][i][1]+35*value)==name[r][1] && boxPostions[checkpoint-1][i][0]==name[r][0]);
            if(varName){
                judgmentDirection(value,direction);
                walk = false;
                break;
            }
        }
    }
    // 猴哥推动箱子移动
    var boxMobile = function(value,direction,num){
        if(direction==right || direction==left){//判断横向或者纵向
            boxPostions[checkpoint-1][num] = [boxPostions[checkpoint-1][num][0]+35*value,boxPostions[checkpoint-1][num][1]];
        }else if(direction==up || direction==down){
            boxPostions[checkpoint-1][num] = [boxPostions[checkpoint-1][num][0],boxPostions[checkpoint-1][num][1]+35*value];
        }
        succrssFun();
    }
    // 判断猴哥是否移动
    var isMobile = function(){
        var isTrue =  true;
        // 移动的下一个路径不能有树木(x,y不能与之相等)
        for(var i=0;i<treePostions[checkpoint-1].length;i++){
            if((x == treePostions[checkpoint-1][i][0]) && (y == treePostions[checkpoint-1][i][1])){
                isTrue = false;
                break;
            }else{
                isTrue = true;
            }
        }
        return isTrue;
    }
    // 上一关 下一关 重置
    previousLevel.onclick = function(){
        x = 0,y = 0;
        boxPostions = [
            [[210,210],[35*7,35*5],[35*9,35*10]],
            [[35*11,35*8],[35*3,35*2],[35*5,35*10]],
        ];
        treePostions = [
            [[35*5,35*7],[35*7,35*4]],
            [[35*5,35*7],[35*7,35*4]],
        ];
        succrssPostions = [
            [[35*7,35*7],[35*5,35*3],[35*8,35*4]],
            [[35*7,35*7],[35*5,35*3],[35*8,35*4]],
        ];
        if(checkpoint>1){
            checkpoint--;
            allPic(down);
            if(checkpoint==1){
                previousLevel.setAttribute("class","over");
                nextLevel.removeAttribute("class");
            }
        }else{
            previousLevel.setAttribute("class","over");
        }
    }
    nextLevel.onclick = function(){
        x = 0,y = 0;
        boxPostions = [
            [[210,210],[35*7,35*5],[35*9,35*10]],
            [[35*11,35*8],[35*3,35*2],[35*5,35*10]],
        ];
        treePostions = [
            [[35*5,35*7],[35*7,35*4]],
            [[35*5,35*7],[35*7,35*4]],
        ];
        succrssPostions = [
            [[35*7,35*7],[35*5,35*3],[35*8,35*4]],
            [[35*7,35*7],[35*5,35*3],[35*8,35*4]],
        ];
        if(checkpoint<boxPostions.length){
            checkpoint++;
            allPic(down);
            if(checkpoint==boxPostions.length){
                nextLevel.setAttribute("class","over");
                previousLevel.removeAttribute("class");
            }
        }else{
            nextLevel.setAttribute("class","over");
        }
    }
    reset.onclick = function(){
        x = 0,y = 0;
        boxPostions = [
            [[210,210],[35*7,35*5],[35*9,35*10]],
            [[35*11,35*8],[35*3,35*2],[35*5,35*10]],
        ];
        treePostions = [
            [[35*5,35*7],[35*7,35*4]],
            [[35*5,35*7],[35*7,35*4]],
        ];
        succrssPostions = [
            [[35*7,35*7],[35*5,35*3],[35*8,35*4]],
            [[35*7,35*7],[35*5,35*3],[35*8,35*4]],
        ];
        allPic(down);
    }
}