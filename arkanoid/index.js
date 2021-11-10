var canvas=document.querySelector('#my')
// console.log(canvas)
//render 2d context
var ctx=canvas.getContext('2d')

//position for ball
var x=canvas.width/2
var y=canvas.height-30
//for adding to x and y bcz moving
var dx=2//2 bcz diagnol direction
var dy=-2//bcz upward dir
var radius=20;//store here bcz for calculation later
//height and width of paddle
var height=20
var width=95;
var xaxis=(canvas.width-width)/2//starting point from x axis
//user controller buttons
var right=false//false bcz at start buttons are not pressed
var left=false

var color=getRandomColor();
//bricks
var bRow=5
var bCol=6
var bWidth=75
var bHeight=20
var bPadding=6
var bOffsetTop=40//not drwan from right from canvas
var bOffsetLeft=10

var score=0
//live
var lives=3
var paused=false

var bricks=[]
for(var c=0;c<bCol;c++){
    bricks[c]=[]
    for(var r=0;r<bRow;r++){
        bricks[c][r]={
            x:0,
            y:0,
            status:1//that brick or not touch 
        }
    }
}
//event fire
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
//mouse
document.addEventListener("mousemove", mouseMoveHandler, false);

//create ball
function drawBall(){
    ctx.beginPath()
    ctx.arc(x,y,radius, 0, Math.PI*2)//radius=10
    ctx.fillStyle =color
    if(collision()){
        ctx.fillStyle=getRandomColor()
    }
    ctx.fill()
    ctx.closePath()
    x=x+dx
    y=y+dy
}
//for moving ball
function draw(){
    //when circle try to make new frame it will remove previous
    ctx.clearRect(0,0,canvas.width,canvas.height)//clearrect yhaa circle ko delete krta ja raha hai
    drawBricks()
    drawBall()
    drawPaddle()
    cscore()
    collision()
    drawLives()
    if(collision()){
        color=getRandomColor()
    }
    if(x+dx<radius||x+dx>canvas.width-radius){
        dx=-dx
        color=getRandomColor()
    }if (y+dy<radius) {//top bottom bounce
        dy=-dy
        color=getRandomColor()
        
    }else if(y+dy>canvas.height-radius){
        if(x>xaxis&&x<xaxis+width){
            //speed after touch the wall
            dy=-dy*1.3
            ctx.fillStyle=getRandomColor()
        }else{
            lives--
            if(!lives){
            alert('GAME OVER ... TRY BETTER NEXT TIME ..Your Score is : '+score+' !!')
            document.location.reload()
            // clearInterval(interval)
            // document.body.style.backgroundColor="red"
            }else{
                x=canvas.width/2
                y=canvas.height-30
                dx=2
                dy=-2
                xaxis=(canvas.width-width)/2
            }
        }
    }
    if(right){//moving paddle
        xaxis=xaxis+5
        //only for boundaries
        if (xaxis + width > canvas.width){
            xaxis = canvas.width - width;
        }
    }else if(left){
        xaxis=xaxis-5
        if (xaxis < 0){
            xaxis = 0;
        }
    }
    x=x+dx
    y=y+dy
    // requestAnimationFrame(draw)
    if(!paused){
        requestAnimationFrame(draw)
    }
}
//print new circle at every frame
// var interval=setInterval(draw,10)//10 which is time taking to process the ball in ms
draw()
//above (5) 
//getting random color when touch the ball
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
//paddle
function drawPaddle(){
    ctx.beginPath()
    ctx.rect(xaxis,canvas.height-height,width,height)
    ctx.fillStyle=color
    ctx.fill()
    ctx.closePath()
}
function keyDownHandler(e){
    if(e.key=="Right"||e.key=="ArrowRight"){
        right=true
    }else if(e.key=='Left'||e.key=="ArrowLeft"){
        left=true
    }
}
function keyUpHandler(e){
    if(e.key =="Right"||e.key == "ArrowRight") {
        right = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        left = false;
    }
}

//draw bricks
function drawBricks(){
    for(var c=0;c<bCol;c++){
        for(var r=0;r<bRow;r++){
            if(bricks[c][r].status==1){
                var bX = (c*(bWidth+bPadding))+bOffsetLeft;
                var bY = (r*(bHeight+bPadding))+bOffsetTop;
                bricks[c][r].x=bX
                bricks[c][r].y=bY
                ctx.beginPath()
                ctx.rect(bX, bY, bWidth, bHeight)
                
                ctx.fillStyle = color
                
                // ctx.fillStyle=getRandomColor()
                ctx.fill()
                ctx.closePath()
            }
        }
    }
}
function collision(){
    for(var c=0;c<bCol;c++){
        for(var r=0;r<bRow;r++){
            var b=bricks[c][r]//for storing brick obj
            if(b.status==1){
            if(x > b.x && x < b.x+bWidth && y > b.y && y < b.y+bHeight) {
                dy = -dy;
                ctx.fillStyle=getRandomColor()
                b.status=0
                score=score+10
                if(score==((bRow*bCol)*10)){
                    alert("CONGO ... YOU WON .. Your Score is : "+score+" !!")
                    document.location.reload()
                    // clearInterval(interval)
                    document.body.style.backgroundColor="green"
                }
                ctx.fillStyle=getRandomColor()
            }//b.x=>x position of the brick 
        }
        }
    }
}

function cscore(){
    ctx.font="28px Sans Herif"
    ctx.fillStyle="black"
    ctx.fillText("Your Score : "+score,9,30)
}

//for mouse
function mouseMoveHandler(e){
    var rx=e.clientX-canvas.bOffsetLeft;
    if(rx>0&&rx<canvas.width){
        xaxis=rx-width/2;
    }
}
function drawLives(){
    ctx.font="27px Sans Herif"
    ctx.fillStyle="black"
    ctx.fillText("Lives Remaining : "+lives,265,30)
}
//pause ka saman
window.addEventListener('keydown', pauseGameKeyHandler, false);
function pauseGameKeyHandler(e){
    var keyCode=e.keyCode
    switch(keyCode){
        case 80://p
            togglePause()
            break
        case 32://space key
            togglePause()
            break
    }
}
function togglePause(){
    paused=!paused
    draw()
}
