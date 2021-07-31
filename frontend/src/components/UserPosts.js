import axios from "axios";
import { useEffect, useState } from "react";
import ImagePost from "./ImagePost";
import TextPost from "./TextPost";
const UserPosts = ({type,auth}) => {
    const [posts,setPosts] = useState([])
    useEffect(()=>{
        try {
            if (type === "all"){
                const get_posts = axios({
                    method:'GET',
                    url:`http://localhost:1337/posts?author.id=${auth.user.id}`
                }).then(response=>{setPosts(response.data)})
            }
            else{
                const get_posts = axios({
                    method:'GET',
                    url:`http://localhost:1337/posts?type=${type}&author.id=${auth.user.id}`
                }).then(response=>{setPosts(response.data)})
            }
            
        } catch (error) {
            
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
 
export default UserPosts;
