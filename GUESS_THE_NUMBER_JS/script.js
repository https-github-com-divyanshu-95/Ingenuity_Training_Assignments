var input=document.getElementById('input');
var result=document.getElementById('result');
var oldresult=document.getElementById('oldresult');

window.onload=function(){
    document.getElementById('submit').addEventListener('click',playGame)
    document.getElementById('restart').addEventListener('click',restartGame)
}
var random=Math.floor(Math.random()*100)+1;
// console.log(random)     
window.onkeypress = function(e){
    if(e.keyCode == 13)
        playGame()
        
}
//check the no
function playGame(){
    // console.log(input.value)
    var createHistory=document.createElement('div');
    createHistory.classList.add('list-group-item');
    createHistory.innerHTML='your guess was '+input.value
    oldresult.append(createHistory)
    if(input.value===''||input.value<1){
        result.innerHTML="<div class='alert alert-warning'>Enter Correct number</div>"
    }else if(input.value>100){
        result.innerHTML="<div class='alert alert-warning'>Enter between 1 and 100</div>"
    }
    else{
        if(input.value>random){
            result.innerHTML="<div class='alert alert-warning'>HIGH GUESS</div>"
        }else if(input.value<random){
            result.innerHTML="<div class='alert alert-warning'>LOW GUESS</div>"
        }else{
            result.innerHTML="<div class='alert alert-success'>WIN!</div>"
        }
    }
    input.value = ''
}
//restart
function restartGame(){
    random=Math.floor(Math.random()*100)+1;
    result.innerHTML=''
    oldresult.innerHTML=''
}
//hint
document.getElementById("hint").onclick = function(){
    if(random>10&&random<90){
        var h1 = random - Math.floor(Math.random()*10);
        var h2 = random + Math.floor(Math.random()*10);
        alert(`Hint: ${h1} - ${h2}`);
    }
    else{
        var h1 = random - Math.floor(Math.random());
        var h2 = random + Math.floor(Math.random());
        alert(`Hint: ${h1} - ${h2}`);
    }
}

