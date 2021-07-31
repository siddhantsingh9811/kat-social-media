import axios from "axios";
import { useEffect, useState } from "react";
const Users = () => {
    const [users,setUsers] = useState([])
    useEffect(()=>{
        const get_users = axios({
            method:'GET',
            url:"http://localhost:1337/users"
        }).then((response)=>{setUsers(response.data)}).catch((err)=>{console.log(err)})
    },[])
    return ( 
        
        <div className="users">
            <div className="header">
                <div className="h">Users</div>
            </div>
            <div className="display">
            {users.map((user)=>{
                return(
                    <div className="top">
                    <div className="userimage" style={{backgroundImage:`url("http://localhost:1337${user.image.url}")`, backgroundSize:"cover"}}></div>
                    <div className="info">
                        <div className="username">
                            {user.username}
                        </div>
                        <div className="title">
                            {user.posts.length} Posts
                        </div>
                    </div>
                </div> 
                )
            })}
                
                
            </div>
            
        </div>
     );
}
 
export default Users;