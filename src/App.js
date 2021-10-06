
import './App.css';
import React from "react"
import {useState,useEffect} from "react";
import Square from "./Square";
import { Patterns } from './Patterns';
import Winner from './winner';
import Restart from './Restart';


function App() {


const X=<div className="x" />
const O=<div className="o" />


const [restart,setRestart]=useState("")
const [board,setBoard]=useState(["","","","","","","","",""])
const [player,setPlayer]=useState("X");
const [Draw,setDraw]=useState(["","","","","","","","",""])
const [playerDraw,setPlayerDraw]=useState(X)
const [result,setResult]=useState({winner:"",state:"none"})


useEffect(()=>{
    
    Patterns.forEach((currPattern)=>
    {
        const firstPlayer=board[currPattern[0]];
        if(firstPlayer==="") {return};
        let foundWinningPattern=true;
        currPattern.forEach((index)=>
        {
          
            
            if(board[index]!==firstPlayer){
                foundWinningPattern=false;
               
            }
        })

        if(foundWinningPattern)
        {
            setResult({winner:firstPlayer+" won",state:"won"})
            
            
        }
    })

    let filled=true;
    board.forEach((square)=>
    {
        if(square==="")
        {
            filled=false;
        }
    })
    
    if(filled)
    {
        setResult({winner:"Tie",state:"Tie"})
    }

},[board])


useEffect(()=>
{    if(result.state!=="none")
    {      
        setRestart(<div className="restart"/>)
       
      }
},[result])

const choose=(square)=>{
    
    setBoard(
        
        board.map((val,index)=>{
            
            if(index===square && val===""){
                
                if(player==="X" )
                {
                    setPlayerDraw(O)
                    setPlayer("O")
                }
             else{
                    setPlayerDraw(X)
                    setPlayer("X")
                }
                return player;

                
            }
            return val;
        }
        )
) 

        
       
    
      
}


const chooseDraw=(square)=>{
    choose(square)
    setDraw(
        board.map((val,index)=>{
            
            if(index===square && val===""){
                
               
                return playerDraw;

                
            }
            val=Draw[index]
            return val;
        }
        )
    )
}

const restartGame=()=>{
    setBoard(["","","","","","","","",""])
    setPlayer("X");
    setDraw(["","","","","","","","",""])
    setPlayerDraw(X)
    setResult({winner:"",state:"none"})
    setRestart("")
}


return(


<div className="body">


<div className="game">
<div className="name1">Tic</div>
<div className="name2">Tac</div>
<div className="name3">Toe</div>
    <div className="board">
        <div className="square top left" tabIndex="0" >
            <Square val={Draw[0]} chooseSquare={()=>{ chooseDraw(0)   }}/>
        </div>
         <div className="square top" tabIndex="0" >
         <Square  val={Draw[1]} chooseSquare={()=>{ chooseDraw(1)   }}/>
         </div>
         <div className="square top right" tabIndex="0" >
         <Square  val={Draw[2]} chooseSquare={()=>{ chooseDraw(2)   }}/>
         </div>
         <div className="square left" tabIndex="0" >
         <Square  val={Draw[3]} chooseSquare={()=>{ chooseDraw(3)   }}/>
         </div>
         <div className="square" tabIndex="0" >
         <Square  val={Draw[4]} chooseSquare={()=>{ chooseDraw(4)   }}/>
         </div>
         <div className="square right" tabIndex="0" >
         <Square  val={Draw[5]} chooseSquare={()=>{ chooseDraw(5)   }}/>
         </div>
         <div className="square bottom left" tabIndex="0" >
         <Square  val={Draw[6]} chooseSquare={()=>{ chooseDraw(6)   }}/>
         </div> 
         <div className="square bottom" tabIndex="0" >
         <Square  val={Draw[7]} chooseSquare={()=>{ chooseDraw(7)   }}/>
         </div>
         <div className="square bottom right" tabIndex="0"  >
         <Square  val={Draw[8]} chooseSquare={()=>{ chooseDraw(8)   }}/>
         </div>
         <div>
        <Restart val={restart} restartFunction={restartGame}/>
        </div>
    </div>

<Winner val={result.winner}/>

</div>
</div>

)
}

export default App;
