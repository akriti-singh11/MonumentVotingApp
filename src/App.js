import React,{useReducer,useEffect} from "react";
import axios from "axios";
const initialState = {
  votes:[],
  loading:true,
  error:null,
}
function reducer(state,action){
  switch(action.type){
    case "FETCH_SUCCESS":
      return {...state,votes:action.payload,loading:false};

    case "FETCH_ERROR":
      return {...state,error:action.payload,loading:false}; 
      
    case "ADD_VOTE":
      return {...state,votes:[...state.votes,action.payload]};
    default:
      return state;    
  }
}

function App(){
  const [state,dispatch] = useReducer(reducer,initialState);

  useEffect(()=>{
    axios.get("http://localhost:5000/votes")
         .then((res)=>{
           dispatch({type:'FETCH_SUCCESS',payload:res.data});
         })
         .catch((err)=>{
          dispatch({type:'FETCH_ERROR',payload:"Failed to load data"});
         })
  },[]);

  const handleVote = (monument) =>{
    axios.post("http://localhost:5000/vote",{monument})
         .then(()=>{
           dispatch({
            type:"ADD_VOTE",
            payload:{monument,votes:1},
           });
         })
         .catch((err)=>alert("Vote failed"));
  };

  return(
    <div>
      <h1>Vote for you favorite monument</h1>
     {state.loading ? (<p>Loading</p>):state.error?(
       <p style={{color:'red'}}>{state.error}</p>
     ):(<ul onClick={(e)=>handleVote(e.target.innerText)}>
         {state.votes.map((v,index)=>(
          <li key={index}>
             {v.monument} - {v.votes} votes
          </li>
         ))}
     </ul>)}
      
    
    </div>
  );
}

export default App;