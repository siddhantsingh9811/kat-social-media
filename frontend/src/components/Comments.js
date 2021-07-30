import { useEffect, useState } from "react";
import Comment from "./Comment";
import axios from "axios";
const Comments = ({id,auth,open,comments,countIncrease}) => {
    const [c,setC] = useState("")
    const [a,setA] = useState(false)
    const [text,setText] = useState('')
    const [image,setImage] = useState('')
    const [newcomments,setNewcomments] = useState([])
    useEffect(()=>{
        if(open){
            setC("open")
            setA(true)
        }
        else if(!open && a){
            setC("close")
        }

    },[open])
    useEffect(()=>{
        if (auth.user != null){
            const get_image = axios({
                method:'GET',
                url:`http://localhost:1337/users/${auth.user.id}`
            }).then(response=>{setImage(`http://localhost:1337${response.data.image.url}`)})
        }
    },[auth])
    const handleSubmit = ()=>{

        const data = {
            text:text,
            post:id
        }
        const create_comment = axios({
            method:'post',
            url:"http://localhost:1337/comments",
            data:data,
            headers: { Authorization: `Bearer ${auth.token}` }
        }).then((response)=>{setNewcomments([...newcomments, response.data]);countIncrease()})
    }
    return ( 
        <div className={`comments ${c}`}>
            {auth.status ? 
            <div className="comment">
                <div className="top">
                    <div className="userimage" style={{backgroundImage:`url("${image}")`, backgroundSize:"cover",backgroundPosition:"center"}}></div>
                    <div className="info">
                        <div className="username">
                            {auth.user.username}
                        </div>
                        <div className="title">
                            <input type="text" placeholder="Your Comment" onChange={(e) => {setText(e.target.value)}}/>
                        </div>
                    </div>
                    <button onClick={handleSubmit}>Post</button>
                </div> 
            </div> : <div></div>}
            {newcomments.map((comment)=>{
                return(
                    <div className="comment">
                        <div className="top">
                            <div className="userimage" style={{backgroundImage:`url("${image}")`, backgroundSize:"cover",backgroundPosition:"center"}}></div>
                            <div className="info">
                                <div className="username">
                                    {auth.user.username}
                                </div>
                                <div className="title">
                                    {comment.text}
                                </div>
                            </div>
                        </div> 
                    </div>
                )
            })} 
            {comments.map((comment)=>{
                return(
                    <Comment comment={comment} key={comment.id}/>
                )
            })} 
        </div>
     );
}
 
export default Comments;