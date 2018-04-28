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
        }else if(id==box || id==tree){ // 判断是否为绘制箱子 或者 大树
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
    var boxPostion = [[35,0],[210,210],[35*7,35*5],[35*9,35*10]];// 箱子起始位置
    var treePostion = [[35*5,35*7],[35*7,35*4]];// 树木位置
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
    var walk = true;
    var lrtmMobile = function(value,direction){
        if(direction==left || direction==right){
            x+=value*35;
        }else{
            y+=value*35;
        }
        walk = true;
        for(var i=0;i<boxPostion.length;i++){
            var isSame = (y==boxPostion[i][1]) && x==boxPostion[i][0];//下次移动路径是否有箱子
            if(isSame){
                isObstacle(value,direction,boxPostion,i);
                isObstacle(value,direction,treePostion,i);
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
    var isObstacle = function(value,direction,name,i){
        var directionChoos = direction==left || direction==right;
        for(var r=0;r<name.length;r++){
            var varName = directionChoos?(boxPostion[i][1]==name[r][1] && ((boxPostion[i][0]+35*value)==name[r][0])):((boxPostion[i][1]+35*value)==name[r][1] && boxPostion[i][0]==name[r][0]);
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
            boxPostion[num] = [boxPostion[num][0]+35*value,boxPostion[num][1]];
        }else if(direction==up || direction==down){
            boxPostion[num] = [boxPostion[num][0],boxPostion[num][1]+35*value];
        }
    }
    // 判断猴哥是否移动
    var isMobile = function(){
        var isTrue =  true;
        // 移动的下一个路径不能有树木(x,y不能与之相等)
        for(var i=0;i<treePostion.length;i++){
            if((x == treePostion[i][0]) && (y == treePostion[i][1])){
                isTrue = false;
                break;
            }else{
                isTrue = true;
            }
        }
        return isTrue;
    }
}