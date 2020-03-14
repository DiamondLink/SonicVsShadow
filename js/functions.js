//FONCTIONS JS
function toggleDisplay(className, displayState){
    var elementsToToggle = document.getElementsByClassName(className)

    for (var i = 0; i < elementsToToggle.length; i++){
        elementsToToggle[i].style.display = displayState;
    }
}

var pending = false;

function moveBall(className,goTo,increment,direction,startFrom,speed) {

    if(pending) return;
    pending = true;

    var screenWidth = window.screen.width;
    const object = document.querySelector(className) 

    var stopStyle = getComputedStyle(document.querySelector(goTo))
    var stopPercentage = Math.floor((parseInt(stopStyle.getPropertyValue("left")) /screenWidth )*100)
    
    var startObject=document.querySelector(startFrom)
    var startObjectStyle = getComputedStyle(startObject)
    if (direction==="right"){
        object.style.left = Math.floor(((parseInt(startObjectStyle.left) + parseInt(startObjectStyle.width)) / screenWidth) *100) + "%";
        stopPercentage = stopPercentage - Math.floor(((parseInt(stopStyle.width) / screenWidth) *100))
    }else if(direction==="left"){
        object.style.left = Math.floor(((parseInt(startObjectStyle.left) - parseInt(startObjectStyle.width)) / screenWidth) *100) + "%";
        stopPercentage = stopPercentage + Math.floor(((parseInt(stopStyle.width) / screenWidth) *100))
    }
    
    var style = getComputedStyle(object)
    object.style.display="block"

    var leftPercentage = Math.floor((parseInt(style.getPropertyValue("left")) / screenWidth)*100)


    var posX = leftPercentage

    var id = setInterval(frame, speed);
    function frame() {
        if (posX === stopPercentage) {

        clearInterval(id);
        object.style.display="none"
        object.style.left=leftPercentage + "%";
        pending = false;
        if (direction==="right"){
            if (className===".fireball"){
                changeLifePoint("shadow",-20)
            }else if(className===".iceball"){
                changeLifePoint("shadow",(Math.floor(Math.random() * 30) + 5)*(-1))
            }
        }else if (direction==="left"){
            if (className===".fireball"){
                changeLifePoint("sonic",-20)
            }else if(className===".iceball"){
                changeLifePoint("sonic",(Math.floor(Math.random() * 30) + 5)*(-1))
            }
        }


        } else {

        posX+=increment;  
        object.style.left = posX + "%"; 

        }
    }
}
var sonicLP = 200
var shadowLP = 200
function changeLifePoint(id,value){
    var lifePoint = document.getElementById(id)

    if (id==="sonic"){
        if (value==="heal"){
            sonicLP+=(Math.floor(Math.random() * 10) + 15)
        }else{
            sonicLP+=value
        }
        lifePoint.innerHTML = "LP : " + sonicLP
    }else if (id==="shadow"){
        if (value==="heal"){
            shadowLP+=(Math.floor(Math.random() * 10) + 15)
        }else{
            shadowLP+=value
        }
        lifePoint.innerHTML = "LP : " + shadowLP
    }

    if (sonicLP <= 0){
        win("shadow")
    }else if (shadowLP <= 0){
        win("sonic")
    }
}

const capitalize = (s) => {
    return s.charAt(0).toUpperCase() + s.slice(1)
}

function win(winner){
    toggleDisplay('hide','none')

    winnerElement = document.querySelector("." + winner)
    winnerElement.style.left="39%"
    winnerElement.style.top="25%"
    winnerElement.style.display="block"

    winMessage = document.querySelector(".winMessage")
    winMessage.innerHTML = capitalize(winner) + " wins !"
    winMessage.style.display="block"

    playAgainButton = document.querySelector(".playAgain")
    playAgainButton.style.display="block"
}