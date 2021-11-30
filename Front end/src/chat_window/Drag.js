import React,{useState,useEffect} from 'react'
import Draggable from 'react-draggable';
import style from './Drag.module.css'
import style1 from './UserProfile.module.css'
import { useSelector } from 'react-redux'

const Drag = (props) => {
  const user = useSelector((state) => state.user.details)
  const socket = useSelector((state) => state.socket.socket)
  const [data,setData] = useState(null)
  const [flag,setFlag] = useState(false)
  const [text,setText] = useState({dis:"d-none",text1:""})
  const [turn,setTurn] = useState("")
  const [winner,setWinner] = useState(null)
  const [game,setGame] = useState([
    ["f","f","f"],
    ["f","f","f"],
    ["f","f","f"]
  ])
    
  useEffect(()=>{
    const mnq = props.getxo==="X"?"Your turn...":"Oponent Turn..."
    setTurn(mnq)
    const tf = props.getxo==="X"?true:false
    setFlag(tf)
  },[props.getxo])

  const checkRow = (row) =>{
    const a = game
      if(row===0){
          if((a[0][0] === a[0][1]) && (a[0][1] === a[0][2])){
            return props.getxo;
          }
      }
      if(row===1){
        if((a[1][0] === a[1][1]) && (a[1][1] === a[1][2])){
          return props.getxo;
        }
      }
      if(row===2){
        if((a[2][0] === a[2][1]) && (a[2][1] === a[2][2])){
          return props.getxo;
        }
      }
      return "f"
  }
  const checkCol = (col) =>{
    const a = game
    if(col===0){
      if((a[0][0] === a[1][0]) && (a[1][0]=== a[2][0])){
        return props.getxo
      }
    }
    if(col===1){
      if((a[0][1] === a[1][1]) && (a[1][1] === a[2][1])){
        return props.getxo
      }
    }
    if(col===2){
      if((a[0][2] === a[1][2]) && (a[1][2] === a[2][2])){
        return props.getxo
      }
    }
   return "f"
  }
  const checkDiagonal = (row,col)=>{
    const a = game
    if((row===0 && col===0 )|| (row===2 && col===2) ){
      if(a[0][0] === a[1][1] && a[1][1] === a[2][2]){
        return props.getxo
      }
    }
    
    if((row===0 && col===2) || (row===2 && col===0)){
      if(a[0][2] === a[1][1] && a[1][1] === a[2][0]){
        return props.getxo
      }
    }
    if(row===1 && col===1)
    {
      if(a[0][2] === a[1][1] && a[1][1] === a[2][0]){
        return props.getxo
      }
      if(a[0][0] === a[1][1] && a[1][1] === a[2][2]){
        return props.getxo
      }
    }
    return "f"
  }
  const checkGame = (row,col)=>{
      if(checkRow(row)!=="f" || checkCol(col)!=="f" || checkDiagonal(row,col)!=="f" ){
        return props.getxo
      }   
      return false
  }

  const checkDrwo = (g)=>{
    const a = g
    for(let i=0;i<=2;i++){
      for(let j=0;j<=2;j++){
       if(a[i][j]==="f")
       return false
      }
    }
    return true
  }
  
  useEffect(()=>{
    if(user!=null & data!=null){
      const el = document.getElementById(data.value[0]+""+data.value[1])
      el.innerText = data.xo
      if(flag){
          setTurn("Oponent Turn...")
      }else{
          setTurn("Your turn...")
      }
      setFlag(!flag)
      const arr = game;
      arr[data.value[0]][data.value[1]] = data.xo
      setGame(arr)
      const check = checkGame(data.value[0],data.value[1]);
      if(check!==false){
        socket.payload.emit("send winner",{id:{id:user.payload.id,my_id:user.payload.my_id},text:data.xo})
        return 0
      }
      if(checkDrwo(game)){
        socket.payload.emit("send winner",{id:{id:user.payload.id,my_id:user.payload.my_id},text:"Match Is Drow"})
      }

    }
  },[data,user])
  

  useEffect(()=>{
    if(socket!=null){
      socket.payload.on("get_X",(data)=>{
        setData(data)
      })
    socket.payload.on("winner",(data)=>{
      setWinner(data)
      })
    }
  },[socket])

  useEffect(()=>{
    if(winner!=null && props.getxo!=null){
      resetMatrix()
      // "You loss match"----
      let win_or_loss =""
      let win = "You Win"
      let loss = "You Loss"
      if(winner.text!=="Match Is Drow"){
        if(props.getxo==="X"){
          if(winner.text==="X"){
            win_or_loss = win
          }else{
            win_or_loss = loss
          }
        }else{
          // let win_or_loss =""
          if(winner.text==="O"){
            win_or_loss = win
          }else{
            win_or_loss = loss
          }
        }
      }else{
        win_or_loss ="Match Is Drow"
      }
      setText({dis:"d-block",text1:win_or_loss})
      props.reset()
      for(let i=0;i<=2;i++){
        for(let j=0;j<=2;j++){
          const el = document.getElementById(i+""+j)
            el.innerText = "."
        }
      }
    }
  },[winner,props.getxo,text])

const resetMatrix =()=>{
  const a = game
  a[0][0] = a[0][1] = a[0][2] = "f"
  a[1][0] = a[1][1] = a[1][2] = "f"
  a[2][0] = a[2][1] = a[2][2] = "f"
  setGame(a)
}

  const handleButton = (value)=>{
    socket.payload.emit("button click",{id:{id:user.payload.id,my_id:user.payload.my_id},value:value,xo:props.getxo})
  }
  const success =()=>{
    setWinner(null)
    setText({dis:"d-none",text1:""})
  }

    return (
      <Draggable>
            
        <div className={style.drag_wrapper +" "}>
          <div className={text.dis+" "+style1.my_winnner+" mt-3 p-3 position-fixed start-50 top-25 "}>
                           
            <div className={style1.my_winner_text+" text-success"}>
              {text.text1}
            </div>

            <div className="text-center">
              <button onClick={success} className=" mt-2 fw-bold btn  btn-outline-primary">CLOSE</button>
            </div>
    
          </div>

          <div className={props.gameDisplay+" "+style.my_div+" "}> 
            <div className={style.my_text}>
              Your object : ("{props.getxo}")
            </div>
            
          <div className="">
            {/* Row 0----------------- */}
          <div>
            <button onClick={(e)=>{
              handleButton([0,0])
            }}  className={style.my_btn+" "}>
              <span id="00" >.</span> 
            </button>

            <button onClick={(e)=>{
              handleButton([0,1])
            }}  className={style.my_btn+" "}>  
              <span id="01">.</span>
            </button>

            <button onClick={(e)=>{
              handleButton([0,2])
            }}  className={style.my_btn+" "}>
              <span id="02">.</span> 
            </button> 

            </div>
            {/* Row 1-------------- */}
            <div>

            <button onClick={(e)=>{
              handleButton([1,0])
            }}  className={style.my_btn+" "}>
              <span id="10">.</span> 
            </button> 

            <button onClick={(e)=>{
              handleButton([1,1])
            }}  className={style.my_btn+" "}>
              <span id="11">.</span> 
            </button> 

            <button onClick={(e)=>{
              handleButton([1,2])
            }}  className={style.my_btn+" "}>
              <span id="12">.</span> 
            </button> 

            </div>
            {/* Row 2------------------ */}
            <div>

            <button onClick={(e)=>{
              handleButton([2,0])
            }}  className={style.my_btn+" "}>
              <span id="20">.</span> 
            </button> 

            <button onClick={(e)=>{
              handleButton([2,1])
            }}  className={style.my_btn+" "}>
              <span id="21">.</span> 
            </button>

            <button onClick={(e)=>{
              handleButton([2,2])
            }}  className={style.my_btn+" "}>
              <span id="22">.</span> 
            </button> 

            </div>
          </div>

          <div className={flag?style.my_turn:style.opo_turn}>
            {turn}
          </div>

           </div>
         </div> 
      </Draggable>
    )
}

export default Drag
