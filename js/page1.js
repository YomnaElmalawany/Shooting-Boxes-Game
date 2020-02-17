btnObj = document.querySelector("button");
userNameTxtBox = document.querySelector("input");

window.addEventListener("load",function(){
    btnObj.onclick = function(){

        dndod.popup({
            msg: "Instructions\n** left and right arrows for horizontal movement**\n** space for shooting**\n**Shooting Red Balls gives 2 points**",
            buttons: [
              {
                  text: "Continue to the Game",
                  type: "warning",
                  handler: function(e, popup) {
                      window.open("page2.html","_self"); //go to 2nd page, in same window, same url
                  }
              }
            ]
          })

        var username1 = userNameTxtBox.value;
        localStorage.setItem("userName1",username1);
    }//Let's Go btn onclick
    
    userNameTxtBox.onkeydown = function(event){
        // console.log(event);
        if(event.keyCode == 13) //Enter
        {
            dndod.popup({
                msg: "Instructions\n** left and right arrows for horizontal movement**\n** space for shooting**\n**Shooting Red Balls gives 2 points**",
                buttons: [
                  {
                      text: "Continue to the Game",
                      type: "warning",
                      handler: function(e, popup) {
                          window.open("page2.html","_self");
                      }
                  }
                ]
              })
            var username1 = userNameTxtBox.value;
            localStorage.setItem("userName1",username1);
        }
    }
})