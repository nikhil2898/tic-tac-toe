let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let msg = document.querySelector("#msg");
let msgContainer = document.querySelector(".msg-container");
let newGame = document.querySelector("#new");

let turn = true;
let count = 0    //for storing turns of a players
const winPattern = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
]
boxes.forEach((box) =>{           //for each is a loop which handles all the boxes with parameter as box i.e (i) which we take
    box.addEventListener("click",() => {       //we have to perform some task after clicking a button
        if(turn){
           box.innerText = "O"
           turn = false
        }
        else{
            box.innerText = "X"
            turn = true
        }
        box.disabled = true    //after completing first click we have to disable it we cannot rewrite or change that symbol
        count++
         let isWinner = checkWinner()
         if (count === 9 && !isWinner){   //if count is 9 and iswinner functions returns  false then it means no one has won so its draw situation
            gamedraw()                      
         }
    })
})

const checkWinner = () =>{              //for checking the winner patterns
 for (let pattern of winPattern){
        let post1 =  boxes[pattern[0]].innerText    
        let post2 = boxes[pattern[1]].innerText
        let post3 = boxes[pattern[2]].innerText
        if(post1 != "" && post2 != "" && post3 != ""){     //condition should be all three boxes should fill with some value
            if(post1 === post2 && post2 === post3)
            {
                showWinner(post1)         //function calling for  showing the result
            }
        }
 }
}
const showWinner = (winner) => {                //printing winner details or winning message 
    msg.innerText = 'Congratulations, Winner is '+ winner
    msgContainer.classList.remove("hide")     //disabling hide class to enable to show message 
    disableBoxes()                            // this is a method to block clicking after the game ends
 }
 const disableBoxes = () => {
    for (let box of boxes){            //loop for disabling remaining boxes
        box.disabled = true            
    }
 }
 const enableBoxes = () => {  //enabling boxes for newgame or resetgame button clicked
    for(let box of boxes){
        box.disabled = false;
        box.innerText = ""     //empty the places of boxes
    }
 }
 const resetGame = () => {       //
    turn = true                 //starting with the player 1 after resetting the old game
    count = 0                   //now count is zero for draw situation
    enableBoxes()               //after clicking new game button the disabled boxes should be enabled to play
    msgContainer.classList.add("hide")    //now hide the message  container as the game starts again
 }
reset.addEventListener("click",resetGame)  //when we click resetbutton the action should be done that was inside the eventlistener
newGame.addEventListener("click",resetGame)
const gamedraw = () => {                     //if game was draw  no one wins so displaying draw message and disabling all boxes
    msg.innerText = "game was draw"
    msgContainer.classList.remove("hide")
    disableBoxes()
}