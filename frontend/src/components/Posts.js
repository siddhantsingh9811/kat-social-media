import axios from "axios";
import { useEffect, useState } from "react";
import ImagePost from "./ImagePost";
import TextPost from "./TextPost";
const Posts = ({type,auth}) => {
    const [posts,setPosts] = useState([])
    useEffect(()=>{
        if (type === "all"){
            const get_posts = axios({
                method:'GET',
                url:"http://localhost:1337/posts"
            }).then(response=>{setPosts(response.data)})
        }
        else{
            const get_posts = axios({
                method:'GET',
                url:`http://localhost:1337/posts?type=${type}`
            }).then(response=>{setPosts(response.data)})
        }
    },[type])
    return ( 
        <div className="posts">
            
            {posts.map((post)=>{
                if (post.type === "text") {
                    return <TextPost auth={auth} content={post} key={post.id}/>
                }
                else if (post.type === "image"){
                    return <ImagePost auth={auth} content={post} key={post.id}/>
                }
            })}            
        </div>
     );
}
 
export default Posts;
