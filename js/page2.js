welocmeCol = document.getElementsByClassName("welocmeUserCol")[0];

startBtnObj = document.querySelector("button");
timerObj = document.getElementsByClassName("timerCol")[0];
scoreObj = document.getElementsByClassName("scoreCol")[0];
lastScoreObj = document.getElementsByClassName("lastScoreCol")[0]; 
var counter=0;
counterObj = document.createElement("h4");
counterObj.innerText = counter;
counterObj.style.display = "inline-block";
timerObj.appendChild(counterObj);

shooterObj = document.querySelector(".shooter");
boxesDiv = document.querySelector(".boxesContainer");
boxesRowObj = document.querySelectorAll(".boxesRow");

rowsHeightsArray = [26,68,110,152,194]; //array to check with it the shot's top (for the main 5 rows once the game is started)
var score = 0;
scoreCounterObj = document.createElement("h4");
scoreCounterObj.innerText = score;
scoreCounterObj.style.display = "inline-block";
scoreObj.appendChild(scoreCounterObj);

var lastScore = localStorage.getItem("lastScore");
lastScoreObj2 = document.createElement("h4");
lastScoreObj2.innerText = lastScore;
lastScoreObj2.style.display = "inline-block";
lastScoreObj.appendChild(lastScoreObj2);

var flag=true;
for(i=0; i<boxesRowObj.length; i++) 
{
    while(flag) //maximum only one Bomb ball per line
    {
        num = Math.floor(Math.random()*30)+1; //generate number between 0 & 30 then limit the number
        if(num<27) flag=false;                //to 27 (as there are 27 columns)
        else flag=true;
        console.log(num);
    }
    boxesRowObj[i].children[num].style.backgroundColor="lightseagreen"; //bomb ball
    flag = true;
}


window.addEventListener("load",function(){

    //---------------User name from 1st page---------------------------------------------------------------------------------------
    newP = document.createElement("p");
    userName2 = localStorage.getItem("userName1");
    newP.innerText = "Welcome, "+userName2;
    welocmeCol.appendChild(newP);
    //-----------------------------------------------------------------------------------------------------------------------------
    
    var counterX = 78;
    var id;
    shooterObj.style.top = "526px";
    shooterObj.style.left = "78px";
    var columnFlag = 0;
    var columnFlag2 = 0;

    var flagToAllowManyShots = 1;

    startBtnObj.onclick = function(){
        startBtnObj.style.display = "none";

        //---------------------Shooting---------------------------------------------------------------------------------------------------
        window.onkeydown = function(event){
            if(event.keyCode == 39 && counterX<1220) //right arrow ---- 1220: right boundary
            {
                counterX = counterX + 44;
                columnFlag++;
                shooterObj.style.left = counterX + "px";
            }
            else if(event.keyCode == 37 && counterX>85) //left arrow ---- 85: left boundary
            {
                counterX = counterX - 44;
                columnFlag--;
                shooterObj.style.left = counterX + "px";
            }
            else if(event.keyCode == 32) //space
            {
                
                if(!flagToAllowManyShots)
                {
                    // setTimeout(function(){
                    //     clearInterval(id);
                    // },100);

                    clearInterval(id);
                    shotsObj.style.display = "none";
                }
                
                flagToAllowManyShots=0;
                shotsObj = document.createElement("div");
                shotsObj.classList.add("shots");
                shotsObj.style.top = (parseInt(shooterObj.style.top))+"px";
                shotsObj.style.left = counterX + 10 + "px";
                boxesDiv.appendChild(shotsObj);
                var counterY = parseInt(shotsObj.style.top);
                columnFlag2 = columnFlag;

                id = setInterval(function() {
                    
                    if (counterY >= 10) {
                        counterY=counterY-2;
                        if(rowsHeightsArray.includes(parseInt(shotsObj.style.top)))
                        {
                            if(boxesRowObj[rowsHeightsArray.indexOf(parseInt(shotsObj.style.top))].children[columnFlag2].style.visibility == "")
                            {
                                if(boxesRowObj[rowsHeightsArray.indexOf(parseInt(shotsObj.style.top))].children[columnFlag2].style.backgroundColor=="lightseagreen")
                                {
                                    boxesRowObj[rowsHeightsArray.indexOf(parseInt(shotsObj.style.top))].children[columnFlag2].style.visibility = "hidden";
                                    if(columnFlag2<27) //lightseagreen ball at 26th column (pre-Last)
                                    boxesRowObj[rowsHeightsArray.indexOf(parseInt(shotsObj.style.top))].children[columnFlag2+1].style.visibility = "hidden";
                                    if(columnFlag2>0) //lightseagreen ball at 2nd column
                                    boxesRowObj[rowsHeightsArray.indexOf(parseInt(shotsObj.style.top))].children[columnFlag2-1].style.visibility = "hidden";

                                    // boxesRowObj[(rowsHeightsArray.indexOf(parseInt(shotsObj.style.top)))+1].children[columnFlag2].style.visibility = "hidden";
                                    // boxesRowObj[rowsHeightsArray.indexOf(parseInt(shotsObj.style.top))-1].children[columnFlag2].style.visibility = "hidden";
                                    shotsObj.style.display = "none";
                                    score = score + 2;
                                }
                                else 
                                {
                                    boxesRowObj[rowsHeightsArray.indexOf(parseInt(shotsObj.style.top))].children[columnFlag2].style.visibility = "hidden";
                                    shotsObj.style.display = "none";
                                    score++;
                                }
                                scoreCounterObj.innerText = score;
                                localStorage.setItem("lastScore",score);
                                if(score>=20) //if score == 20, user wins and game stops
                                {
                                    clearInterval(gameTimerID);
                                        
                                    dndod.popup({
                                        msg: "Congratulations, You win.",
                                        buttons: [
                                            {
                                                text: "Play Again",
                                                type: "warning",
                                                handler: function(e, popup) {
                                                    window.open("page2.html","_self");
                                                }
                                            },
                                            {
                                                text: "Exit",
                                                type: "primary",
                                                handler: function(e, popup) {
                                                    window.open("page1.html","_self");
                                                }
                                            }
                                        ]
                                          
                                    })
                                }
                                clearInterval(id);
                            }
                        }
                    }
                    else {
                        shotsObj.style.display = "none";
                        // clearInterval(id);
                    }
                    shotsObj.style.top = counterY + "px"; //The shot doesn't have to come from the very bottom of the shooter 
                });
                
            }//keycode==32 (space)
        }//onkeydown

        //--------------------The Game-----------------------------------------------------------------------------------------------
        var counter = 0;
        var rowConuter = 250;
        var confirmFlag=true;
        var gameTimerID = setInterval(function(){
            
            counter++;
            counterObj.innerText = counter;

            if(counter%4 == 0) //timer every 4 seconds draw new row of boxes
            {
                // console.log("+10");
                rowDivObj = document.createElement("div");
                for(i=0; i<27; i++)
                {
                    newBoxObj = document.createElement("div");
                    newBoxObj.classList.add("boxes");
                    newBoxObj.style.marginRight = "4.4px";
                    rowDivObj.appendChild(newBoxObj);
                }
                rowDivObj.style.top = "65px";
                rowDivObj.classList.add("boxesRow");
                boxesDiv.prepend(rowDivObj);
                
                allBoxesRows = document.querySelectorAll(".boxesRow");
                allBoxesRows[allBoxesRows.length-1].style.position = "absolute";

                boxesRowObj = document.querySelectorAll(".boxesRow"); //update boxesRowObj with the newly added rows

                for(i=allBoxesRows.length-1; i>=0; i--)
                {
                    rowConuter = rowConuter+46;
                    if(i==allBoxesRows.length-1) lastRow = rowConuter; //to start next time (next timer iteration) from the new position of the last row
                    allBoxesRows[i].style.position = "absolute";
                    allBoxesRows[i].style.top = rowConuter + "px";
                    rowConuter = rowConuter - 46*2;
                    
                    if(i==0) rowConuter = lastRow;

                    if((lastRow+50) >= parseInt(shooterObj.style.top)) //if boxes touches the shooter>> GAME OVER
                    {
                        counter = 30;
                        // localStorage.setItem("lastScore",score);
                    }
                }
                rowsHeightsArray.push(parseInt(allBoxesRows[allBoxesRows.length-1].style.top)-80); //or 70
            }
            if(counter==30) //Time out and stop the game
            {
                clearInterval(gameTimerID);

                dndod.popup({
                    msg: "Game Over.",
                    buttons: [
                      {
                          text: "Play Again",
                          type: "warning",
                          handler: function(e, popup) {
                              window.open("page2.html","_self");
                          }
                      },
                      {
                          text: "Exit",
                          type: "primary",
                          handler: function(e, popup) {
                              window.open("page1.html","_self");
                          }
                      }
                    ]
                  
                  })
            }
        },1000);//game timer...for 30 seconds

    }//start btn onclick

});