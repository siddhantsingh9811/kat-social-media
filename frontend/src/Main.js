import { useEffect, useState } from "react";
import Posts from "./components/Posts";
import Users from "./components/Users";
const Main = ({auth}) => {
    const [type,setType] = useState('all')
    const [o1,setO1] = useState({color:"var(--primary)",bor:"0px -1px 0px var(--primary) inset"})
    const [o2,setO2] = useState({color:"var(--secondary)",bor:"none"})
    const [o3,setO3] = useState({color:"var(--secondary)",bor:"none"})
    useEffect(()=>{
        if(type==="all"){
            setO1({color:"var(--primary)",bor:"0px -1px 0px var(--primary) inset"})
            setO2({color:"var(--secondary)",bor:"none"})
            setO3({color:"var(--secondary)",bor:"none"})
        }
        else if(type==="image"){
            setO3({color:"var(--primary)",bor:"0px -1px 0px var(--primary) inset"})
            setO2({color:"var(--secondary)",bor:"none"})
            setO1({color:"var(--secondary)",bor:"none"})
        }
        else if(type==="text"){
            setO2({color:"var(--primary)",bor:"0px -1px 0px var(--primary) inset"})
            setO3({color:"var(--secondary)",bor:"none"})
            setO1({color:"var(--secondary)",bor:"none"})
        }
        

    },[type])
    return ( 
        <div className="main">
            <div className="left"></div>
            <div className="middle">
                <div className="container">
                    <div className="header">
                        <div className="p">Posts</div>
                        <div className="options">
                            <div className="o1 o" onClick={()=>{setType('all');}} style={{color:o1.color,boxShadow:o1.bor}}>All</div>
                            <div className="o2 o" onClick={()=>{setType('text');}} style={{color:o2.color,boxShadow:o2.bor}}>Text</div>
                            <div className="o3 o" onClick={()=>{setType('image');}} style={{color:o3.color,boxShadow:o3.bor}}>Images</div>
                        </div>
                    </div>
                    <Posts type={type} auth={auth}/>
                </div>
            </div>
            <div className="right">
                <Users/>
            </div>
        </div>
         );
}
 
export default Main;