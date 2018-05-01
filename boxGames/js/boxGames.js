window.onload = function(){
    // 绘制画布
    var boxGames = document.getElementById("boxGames");
    var boxGame = boxGames.getContext("2d");
    var winDiv = document.getElementById("win");//成功弹窗
    var clearance = document.getElementById("clearance");//祝福语
    var sureNext = document.getElementById("sureNext");//弹窗确定按钮
    var previousLevel = document.getElementById("previousLevel");//上一关
    var nextLevel = document.getElementById("nextLevel");//下一关
    var reset = document.getElementById("reset");//重玩当前关
    var bg,tree,succrss,box,down,left,up,right;
    var checkpoint = 1; //记录关数
    var sunwukong,boxPostions,treePostions,succrssPostions;
    //   猴哥位置  所有箱子位置 所有树木位置  所有成功圆位置
    var starPosition = function (){
        // 猴哥位置
        sunwukong = [
            [0,0],
            [35*10,35*4]
        ];
        // 所有箱子起始位置
        boxPostions = [
            [[210,210],[35*7,35*5],[35*9,35*10]],
            [[35*11,35*8],[35*3,35*2],[35*5,35*10]],
        ];
        // 所有树木位置
        treePostions = [
            [[35*5,35*7],[35*7,35*4]],
            [[35*5,35*7],[35*7,35*4]],
        ];
        // 所有成功圆位置
        succrssPostions = [
            [[35*7,35*7],[35*5,35*3],[35*8,35*4]],
            [[35*7,35*7],[35*5,35*3],[35*8,35*4]],
        ];
    }
    starPosition();
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
    // 预加载img标签
    function imgFun(id,name,x,y){
        id=new Image();
        switch (name){
            case "bg":
                id.src = pic.bg;
                break;
            case "tree":
                y -= 11;
                id.src = pic.tree;
                break;
            case "box":
                y -= 11;
                id.src = pic.box;
                break;
            case "succrss":
                x += 3;
                y += 2;
                id.src = pic.succrss;
                break;
            case "down":
                x += -7.5;
                y += -27;
                id.src = pic.down;
                break;
            case "left":
                x += -7.5;
                y += -27;
                id.src = pic.left;
                break;
            case "up":
                x += -7.5;
                y += -27;
                id.src = pic.up;
                break;
            case "right":
                x += -7.5;
                y += -27;
                id.src = pic.right;
                break;
        }
        // console.log(id);
        id.onload = function(){
            boxGame.drawImage(id,x,y);
        }
    }
    // 绘制底图背景
    var floorFun = function(){
        for(var i=0,x=0,y=0; i=true; i++){
            imgFun(bg,"bg",x,y);
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
        drawAny(tree,"tree",treePostions[checkpoint-1]);
        // 绘制目的圆
        drawAny(succrss,"succrss",succrssPostions[checkpoint-1]);
        // 绘制箱子
        drawAny(box,"box",boxPostions[checkpoint-1]);
        // 绘制猴哥
        imgFun("down",direction,sunwukong[checkpoint-1][0],sunwukong[checkpoint-1][1]);
    }
    // 绘制多个相同目标图片
    var drawAny = function (id,name,postion){
        for(var i=0;i<postion.length;i++){
            imgFun(id,name,postion[i][0],postion[i][1]);
        }
    }
    // 绘制整个页面
    allPic("down");
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
                winDiv.setAttribute("class","successful-clearance block");
                if(checkpoint==boxPostions.length){
                    clearance.innerText=  "有点懒,没有下一关了";
                }
            },200);
        }
    }
    // 键盘监听事件,且控制猴哥移动
    document.onkeydown = function(event){
        var keyNum=window.event ? event.keyCode :event.which;
        var walk = true; // 箱子移动判断依据
        if(keyNum == 39 || keyNum == 40 || keyNum == 38 || keyNum == 37){
            if(keyNum == 40){ // 下
                lrtmMobile(1,"down");
            }else if(keyNum == 38){ // 上
                lrtmMobile(-1,"up");
            }else if(keyNum == 37){ // 左
                lrtmMobile(-1,"left");
            }else if(keyNum == 39){ // 右
                lrtmMobile(1,"right");
            }
        }
    }
    // 猴哥移动
    var lrtmMobile = function(value,direction){
        if(direction=="left" || direction=="right"){
            sunwukong[checkpoint-1][0]+=value*35;
        }else{
            sunwukong[checkpoint-1][1]+=value*35;
        }
        walk = true; //让箱子默认为随猴哥移动
        for(var i=0;i<boxPostions[checkpoint-1].length;i++){
            var isSame = (sunwukong[checkpoint-1][1]==boxPostions[checkpoint-1][i][1]) && sunwukong[checkpoint-1][0]==boxPostions[checkpoint-1][i][0];//下次移动路径是否有箱子
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
        if(direction=="left" || direction=="right"){
            sunwukong[checkpoint-1][0]-=value*35;
        }else{
            sunwukong[checkpoint-1][1]-=value*35;
        }
    }
    // 判断是否有障碍物
    var isObstacle = function(value,direction,name,i){// name 为判断障碍物
        var directionChoos = direction=="left" || direction=="right";
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
        if(direction=="right" || direction=="left"){//判断横向或者纵向
            boxPostions[checkpoint-1][num] = [boxPostions[checkpoint-1][num][0]+35*value,boxPostions[checkpoint-1][num][1]];
        }else if(direction=="up" || direction=="down"){
            boxPostions[checkpoint-1][num] = [boxPostions[checkpoint-1][num][0],boxPostions[checkpoint-1][num][1]+35*value];
        }
        succrssFun();
    }
    // 判断猴哥是否移动
    var isMobile = function(){
        var isTrue =  true;
        // 移动的下一个路径不能有树木(x,y不能与之相等)
        for(var i=0;i<treePostions[checkpoint-1].length;i++){
            if((sunwukong[checkpoint-1][0] == treePostions[checkpoint-1][i][0]) && (sunwukong[checkpoint-1][1] == treePostions[checkpoint-1][i][1])){
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
        starPosition();
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
        starPosition();
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
        starPosition();
        allPic(down);
    }
    sureNext.onclick = function(){
        if(checkpoint<boxPostions.length){
            winDiv.setAttribute("class","successful-clearance");
            checkpoint++;
            allPic(down);
            if(checkpoint==boxPostions.length){
                nextLevel.setAttribute("class","over");
                previousLevel.removeAttribute("class");
                clearance.innerText=  "有点懒,没有下一关了";
            }
        }
    }
}