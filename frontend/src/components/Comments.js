import { useEffect, useState } from "react";
import Comment from "./Comment";
const Comments = ({open,comments}) => {
    const [c,setC] = useState("")
    const [a,setA] = useState(false)
    useEffect(()=>{
        if(open){
            setC("open")
            setA(true)
        }
        else if(!open && a){
            setC("close")
        }

    },[open])
    return ( 
        <div className={`comments ${c}`}>
            {comments.map((comment)=>{
                return(
                    <Comment comment={comment} key={comment.id}/>
                )
            })} 
        </div>
     );
}
 
export default Comments;