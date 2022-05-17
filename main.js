let cards = ["A","B","C","D","E","F","G","H","I"];
let players=[];
let pointSum=0;
let corentPlayer=-1
let first, second;

startGame()

function startGame(){
    numOfCards()
    shuf(cards)
    openBoard()
    createPlayer()
    scoreBoard()
    nextPlayer()
    yourTurn()
    board.addEventListener("click",openFirst)
}

function numOfCards(){
    let num= Number(prompt("Enter number of cards between 4 and 18",12));
    if (num <4 || num >18){
        return numOfCards();
    }
        if(num%2==1){num++}
        gridSize(num)
        let halfCards= cards.slice(0,num/2)  
        return cards= halfCards.concat(halfCards);
}

function gridSize(num){
    if(num<=12){num=4}
    else if(num>12 && num<16){num=5}
    else{num=6}
    let board = document.getElementById("board")
    board.style.cssText=`grid-template-columns: repeat(${num}, 102px);`
}

function shuf(cardArr){
    let i=cardArr.length ,randomI;
    while (i>0){
        randomI= Math.floor(Math.random()*i);
        i--;
        [cardArr[i], cardArr[randomI]]=[cardArr[randomI], cardArr[i]];
    }
    return cardArr=cardArr;
}
function createCard(idx){
    let cardElmt= document.createElement("div");
    cardElmt.innerHTML=cards[idx];
    cardElmt.id=idx
    cardElmt.className="card"
    return cardElmt;
}

function openBoard(){
    let board = document.getElementById("board")
    for(i in cards){
        let divElement= createCard(i)
        board.appendChild(divElement)
    }
}

function createPlayer(){
    let playerNums= Number(prompt("Enter number of players",1))
    for(i=0; i<playerNums; i++){
        players[i]= {name: prompt(`Name of player ${i+1}`,"Player"), points: 0}
    }
    players[-1]={points:0}
}
function scoreBoard(){
    players[corentPlayer]['points']++;
    let score= document.getElementById("score")
    score.innerHTML=`score board <br/>`
    for(i=0; i<players.length; i++){
        score.innerHTML+=`<div> ${players[i]['name']}: ${players[i]['points']}  <div />`
    }
}

function nextPlayer(){
    if(corentPlayer < players.length-1){
        corentPlayer++
    } 
    else{
        corentPlayer=0;
    }
}
 
function yourTurn(){
    let turn= document.getElementById("turn");
    turn.innerHTML= `Player: ${players[corentPlayer]['name']}`
}

function openFirst (e){
    first= e.target;
    if(first.id != "board" && ! first.classList.contains("hideCard")){
        first.classList.add("openCard");
        board.removeEventListener("click",openFirst)
        board.addEventListener("click",openSecond)
    }}
    
    function openSecond (e){
        second= e.target;
        if(second.id != "board" && second.id != first.id && ! second.classList.contains("hideCard")){
            second.classList.add("openCard");
            identical()
            board.removeEventListener("click",openSecond)
        }}
        
        function identical(){
            if(first.innerHTML==second.innerHTML){
                first.classList.add("hideCard")
                second.classList.add("hideCard")
                scoreBoard()
                win()
                board.addEventListener("click",openFirst)  
            } 
            else{
                board.addEventListener("click",dismisCard)
            }
        }
        
        function dismisCard(){
            first.classList.remove("openCard")
            second.classList.remove("openCard")
            board.removeEventListener("click",dismisCard)
            board.addEventListener("click",openFirst)
            nextPlayer()
            yourTurn()
        }
        
        function win(){
            pointSum++
            if(pointSum==cards.length/2){
                let max=0,winner;
                for(i=0; i<players.length; i++){
                    if (players[i]['points']>max){    //fix
                        max=players[i]['points']
                        winner=i;
                    }
                }
                alert(players[winner]['name']+" is the winner!!!")
            }
        }
     