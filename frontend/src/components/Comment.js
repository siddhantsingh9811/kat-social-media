import axios from "axios";
import { useEffect, useState } from "react";
const Comment = ({comment}) => {
    const [user,setUser] = useState('')
    const [image,setImage] = useState("http://localhost:1337/uploads/default_af544244c7.png")
    useEffect(()=>{
        const get_user = axios({
            method:'get',
            url:`http://localhost:1337/users/${comment.author}`
        }).then((response)=>{setUser(response.data);setImage(`http://localhost:1337${response.data.image.url}`);})
    },[])
    return ( 
        <div className="comment">
            <div className="top">
                <div className="userimage" style={{backgroundImage:`url("${image}")`, backgroundSize:"cover",backgroundPosition:"center"}}></div>
                <div className="info">
                    <div className="username">
                        {user.username}
                    </div>
                    <div className="title">
                        {comment.text}
                    </div>
                </div>
            </div> 
        </div>
     );
}
 
export default Comment;